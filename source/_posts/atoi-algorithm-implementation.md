---
title: atoi函数实现
date: 2016-09-06 14:56:48
categories: 技术分享
tags:
- atoi
- 函数实现
---

操作系统课上，老师提出了一个问题：

> 当我们通过键盘输入10000的时候，我们是通过键盘打出字符‘1’、‘0’、‘0’、‘0’、‘0’的。然而系统可以将其识别为数字10000。似不似感觉炒鸡神奇。老师给我们提示了一个函数：`atoi`

通过查询C语言API得知`atoi()`函数如下：

`atoi()`函数用来将字符串转换成整数`(int)`，其原型为：

`int atoi (const char * str);`

【函数说明】atoi() 函数会扫描参数 str 字符串，跳过前面的空白字符（例如空格，tab缩进等，可以通过 [isspace()](http://c.biancheng.net/cpp/html/120.html) 函数来检测），直到遇上数字或正负符号才开始做转换，而再遇到非数字或字符串结束时('\0')才结束转换，并将结果返回。

【返回值】返回转换后的整型数；如果 str 不能转换成 int 或者 str 为空字符串，那么将返回 0。

温馨提示：

ANSI C 规范定义了 [stof()](http://c.biancheng.net/cpp/html/124.html)、[atoi()](http://c.biancheng.net/cpp/html/125.html)、[atol()](http://c.biancheng.net/cpp/html/126.html)、[strtod()](http://c.biancheng.net/cpp/html/128.html)、[strtol()](http://c.biancheng.net/cpp/html/129.html)、[strtoul()](http://c.biancheng.net/cpp/html/130.html) 共6个可以将字符串转换为数字的函数，大家可以对比学习。另外在 C99 / C++11 规范中又新增了5个函数，分别是 atoll()、strtof()、strtold()、strtoll()、strtoull()，在此不做介绍，请大家自行学习。

范例如下：

```c
/* atoi example */
#include <stdio.h>      /* printf, fgets */
#include <stdlib.h>     /* atoi */

int main ()
{
  int i;
  char buffer[256];
  printf ("Enter a number: ");
  fgets (buffer, 256, stdin);
  i = atoi (buffer);
  printf ("The value entered is %d. Its double is %d.\n",i,i*2);
  return 0;
}
```

Output:

```
Enter a number: 73
The value entered is 73. Its double is 146.
```

通过了解`atoi()`函数之后可以发现，要想实现`atoi()`函数要注意一下问题：

- 跳过前面的空白字符
- 遇到数字或字符号要开始转换
- 再遇到非数字或字符串结束时结束转换
- 异常输入的情况输入0

上述几点都是通过API提取出来的，包括了函数的开始条件以及结束条件。但是API中忽略了一个很重要的问题那就是没有考虑***溢出***的情况。

> 注意：考虑溢出的情况，应该将输入数据与`int`值所能表示的最大值`INT_MAX`和最小值`INT_MIN`进行比较

`C`中`int`类型32位,范围是-2147483648到2147483647.

（1）最轻微的上溢是 `INT_MAX + 1` ：结果是 `INT_MIN`。 
（2）最严重的上溢是 `INT_MAX + INT_MAX` ：结果是 -2。 
（3）最轻微的下溢是 `INT_MIN - 1` ：结果是 `INT_MAX`。 
（4）最严重的下溢是 `INT_MIN +INT_MIN` ：结果是 0。

atoi函数的实现如下：

```c
#include <stdio.h>
#include <stdlib.h>

#define INT_MAX ((int)0x7FFFFFFF)
#define INT_MIN ((int)0x80000000)
int myatoi(const char * str);
bool vaild = true;

int myatoi(const char * str)
{
    bool minus = false;
    long long result = 0;
    vaild = false;
    if(str==NULL)
        return 0;
    while(*str==' ')
        str++;
    if(*str=='-'){
        minus = true;
        str++;
    }
    else if(*str=='+'){
        str++;
    }
    if(*str<'0'||*str>'9')
        return 0;
    vaild = true;
    while(*str>='0'&&*str<='9'){
        result = result*10+(*str-'0');
        if((minus && result>INT_MAX+1LL)|| (!minus && result>INT_MAX)){
            vaild = false;
            return 0 ;
        }
        str++;
    }
    if(minus)
        result*=-1;
    return (int)result;
}
int main()
{
    int i,j;
    char buffer[256];
    printf("please input number: ");
    fgets(buffer,256,stdin);
    i = atoi(buffer);
    j = myatoi(buffer);
    printf("The value entered is %d. Its double is %d.\n",i,i*2);
    printf("The value entered is %d. Its double is %d.\n",j,j*2);

    return 0 ;
}

```

output:

```
please input number: 2147483647
The value entered is 2147483647. Its double is -2.
The value entered is 2147483647. Its double is -2.
please input number: -2147483648
The value entered is -2147483648. Its double is 0.
The value entered is -2147483648. Its double is 0.
please input number: 2147483648
The value entered is -2147483648. Its double is 0.
The value entered is 0. Its double is 0.
please input number: -2147483649
The value entered is 2147483647. Its double is -2.
The value entered is 0. Its double is 0.
```

> 注意:C语言自带的`atoi()`函数没有考虑到数据溢出的情况。

 `if((minus && result>INT_MAX+1LL)|| (!minus && result>INT_MAX))`

当输入的数据带负号时，并且结果的绝对值>2147483648，说明已达到下溢；当输入的数据不带负号，并且结果的绝对值>2147483647,说明已达到上溢。

[`在线C++ shell`](http://cpp.sh/)

