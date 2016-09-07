---
title: printf函数实现
date: 2016-09-06 20:16:54
categories: 技术分享
tags:
- printf
- 函数实现
---

![](http://i4.buimg.com/567571/eae0cc18aa7647f4.png)

<!-- more -->

同样也是操作系统的课堂上面，老师说让写一下如何实现`printf`函数。所以想了解一下`printf`函数的实现原理。首先，在`The C Programming Language`第7章7.3小节：变长参数表中，作者以实现`printf`的一个最简单版本为例，介绍了如何以可移植的方式编写可处理变长参数表的函数。

```c
#include <stdarg.h>
#include <stdio.h>
#include <stdlib.h>
void minprintf(char *fmt,...){
va_list ap;
char *p,*sval;
int ival;
double dval;

va_start(ap,fmt);
for(p=fmt;*p;p++){
        if(*p != '%'){
            putchar(*p);
            continue;
        }
        switch(*++p){
    case 'd':
        ival = va_arg(ap,int);
        printf("%d",ival);
        break;
    case 'f':
        dval = va_arg(ap,double);
        printf("%f",dval);
        break;
    case 's':
        for(sval = va_arg(ap,char *);*sval;sval++)
            putchar(*sval);
        break;
    default:
        putchar(*p);
        break;
        }
    }
    va_end(ap);
}
```

由于重点在于如何处理参数，所以`minprintf`重点在于处理字符串和参数。

通过查询`Linux`  `C` `API`参考手册可以得知：

`printf`：格式化输出数据

表头文件：`#include<stdio.h>`

定义函数：`int printf(const char *format,...);`

省略号表示参数表中参数的数量和类型都是可变的。省略号只能出现在参数表的尾部。因为`minprintf`函数不需要像`printf`函数一样返回实际输出的字符数。因此，我们将它声明为以下形式：

`void minprintf(const char *format,...);`

编写`minprintf`函数的关键在于如何处理一个甚至连名字都不知道的参数表。

可喜的是，标准头文件`<stdarg.h>`中包含一组宏定义，C语言用宏来处理这些可变的参数。它们定义了如何遍历参数列表。这些宏看起来炒鸡复杂。

其原理：根据参数入栈的特点从最靠近第一个可变参数的固定参数开始，依次获取每个可变参数的地址。

[stdarg.h详解](http://blog.csdn.net/holandstone/article/details/6947119) 					

本文概要总结其实现原理：

下面以函数`fun()`为例进行讲解：

```C
 void fun(int a, int b, int c)
  {
        int d;
        ...
  }
```

正常情况下C语言的函数参数的入栈规则为`_stdcall`,它是由右至左的，即函数的最右端的参数最先入栈。即入栈的顺序为：`c-b-a-d`

其栈结构如下：

​    `0x1ffc-->d`

    `0x2000-->a`

    `0x2004-->b`

    `0x2008-->c`

对于32位的系统最小的栈单元为`sizeof(int)`。函数的每个参数都至少占一个栈单元。因此，函数的所有参数都是存储在线性连续的栈空间中的，基于这种存储结构，这样就可以从可变参数函数中必须有的第一个普通参数来寻址后续的所有可变参数的类型及其值。

对于固定参数列表的函数，我们可以直接通过&a得到a的地址。并且通过函数原型声明得到a的数据类型。

然而，对于变长参数列表的函数，我们无法采用上述方法。按照C标准可知，

> 支持变长参数的函数在函数原型声明中，必须有至少一个最左固定参数。

我们便可以通过其中的固定参数的地址。但是无论函数到底有多少个参数、以及每个参数到底是什么类型的，它们都和固定参数的传参过程是一致的，都是栈操作。如此，我们就可以推导出其他变长参数的位置。

因为栈的延伸方向为从高地址到低地址，栈底占据着最高的内存地址，先入栈的参数，地理位置最高。所以对于可变参数列表的函数 `void var_args_func(const char * fmt, ... )` 来说可以得到结论：

```c
first_vararg.addr = fmt.addr + x_sizeof(fmt); // x_sizeof !=sizeof

second_vararg.addr = first_vararg.addr + x_sizeof(first_vararg);

...... 

```

上述结论得出的如此的简单粗暴。根据这一结论实现以下算法：

```c

#include <stdarg.h>
#include <stdio.h>

void var_args_func(const char * fmt, ...)
{
    char    *ap;

    ap = ((char*)&fmt) + sizeof(fmt);
    printf("%d\n", *(int*)ap);

    ap =  ap + sizeof(int);
    printf("%d\n", *(int*)ap);

    ap =  ap + sizeof(int);
    printf("%s\n", *((char**)ap));
}

int main()
{
    var_args_func("%d %d %s\n",4,5,"hello world");
    return 0;
}

```

期望结果如图所示：

![](http://i4.buimg.com/567571/c308e26957b9a8b6.png)

上图是我在`Code::Blocks`编译器的运行结果

[VC6.0中文版下载（支持XP、Win7、Win8、Win10）](http://c.biancheng.net/cpp/html/1117.html)

[Code::Blocks下载](https://sourceforge.net/projects/codeblocks/files/Binaries/16.01/Windows/codeblocks-16.01mingw_fortran-setup.exe/download)

通过上述讲解我们已经可以明白C语言是如何处理可变参数列表的了。接下来我们就来探讨一下如何实现简单的可变参数的C语言函数。

想要了解可变参数列表函数的实现首先需要分析的是`stdarg.h`

`stdarg.h`源代码

```c
#define __va_rounded_size(TYPE)  \
  (((sizeof (TYPE) + sizeof (int) - 1) / sizeof (int)) * sizeof (int))

#if __GNUC__ < 2

#ifndef __sparc__
#define va_start(AP, LASTARG)                                           \
 (AP = ((char *) &(LASTARG) + __va_rounded_size (LASTARG)))
#else
#define va_start(AP, LASTARG)                                           \
 (__builtin_saveregs (),                                                \
  AP = ((char *) &(LASTARG) + __va_rounded_size (LASTARG)))
#endif

void va_end (va_list);          /* Defined in gnulib */
#define va_end(AP)

#define va_arg(AP, TYPE)                                                \
 (AP += __va_rounded_size (TYPE),                                       \
  *((TYPE *) (AP - __va_rounded_size (TYPE))))

#else    /* __GNUC__ >= 2 */

#ifndef __sparc__
#define va_start(AP, LASTARG)                         \
 (AP = ((char *) __builtin_next_arg ()))
#else
#define va_start(AP, LASTARG)                    \
  (__builtin_saveregs (), AP = ((char *) __builtin_next_arg ()))
#endif

void va_end (va_list);        /* Defined in libgcc.a */
#define va_end(AP)

#define va_arg(AP, TYPE)                        \
 (AP = ((char *) (AP)) += __va_rounded_size (TYPE),            \
  *((TYPE *) ((char *) (AP) - __va_rounded_size (TYPE))))

#endif    /* __GNUC__ >= 2 */

#else    /* not __GNUC__ */


typedef char *va_list;

#define __vasz(x)        ((sizeof(x)+sizeof(int)-1) & ~(sizeof(int) -1))

#define va_start(ap, parmN)    ((ap) = (va_list)&parmN + __vasz(parmN))
#define va_arg(ap, type)      \
  (*((type *)((va_list)((ap) = (void *)((va_list)(ap) + __vasz(type))) \
                            - __vasz(type))))
#define va_end(ap)


#endif /* __GNUC__ */

#endif /* _STDARG_H */
```

| 行号   | 解析                                       |
| ---- | ---------------------------------------- |
| 8    | 使用`typedef`进行了一个声明：`typedef char *va_list;` |
| 14   | 定义了用于编译器的内存对齐宏                           |
| 17   | \#`if __GNUC__ < 2`，进行`GCC`的版本判断，看当前版本是否大于2 |
| 20   | 使得ap指向函数中的第一个无名参数的首地址的宏                  |
| 31   | `va_arg`宏使得`ap`指向下一个参数，已经处理了内存对齐，其中参数的类型为`TYPE` |
| 48   | `va_end` 与`va_start`成对使用.                |

由此可知，如果想要写一个简单的可变参数列表的函数需要用到以下宏：

`void va_start( va_list arg_ptr, prev_param );` 
`type va_arg( va_list arg_ptr, type );` 
`void va_end( va_list arg_ptr );`

通过开篇给出的例子可知使用可变参数的步骤应如下：

（1）首先在函数中定义一个`va_list` 变量

（2）然后使用`va_start`初始化该变量，该宏返回的结果是第一个无名参数的首地址（该宏的第二个参数为可变参数列表中的固定参数）

（3）使用`va_arg`依次获取可变参数列表中的可变参数。（该宏的第二个参数为想要返回参数的参数类型）

（4）最后使用`va_end`结束参数获取

