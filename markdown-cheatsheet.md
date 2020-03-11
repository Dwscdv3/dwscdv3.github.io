<h1>
    简单易懂的 Markdown 魔法
</h1>

使用 Markdown 代码来点缀你的评论吧！

> 你可以通过左下角的“本文导航”快速跳转到所需章节。  
> 不适合在评论区中使用的格式（标题、列表等）这里略过不讲，但实际可用。

## 基本格式

| Markdown 代码  |     效果     |
|:--------------:|:------------:|
|    `*斜体*`    |    *斜体*    |
|   `**粗体**`   |   **粗体**   |
| `***粗斜体***` | ***粗斜体*** |
|  `~~删除线~~`  |  ~~删除线~~  |

<blockquote style="font-weight: 100">
    你可以使用 _ 下划线 来代替 * 星号。
    <br>
    请注意，基本格式符号的外侧必须是<span style="background: green"> </span><em>*空白*&nbsp;</em><span style="background: green"> </span>或<span style="background: green"> </span><em>*标点符号*&nbsp;</em><span style="background: green">，</span>不可以<span style="background: red">是</span>*中英文字符*。
</blockquote>

## 链接

```
[Markdown 格式快速参考](https://dwscdv3.com/markdown-cheatsheet)
```

[Markdown 格式快速参考](https://dwscdv3.com/markdown-cheatsheet)

> 请注意所有 Markdown 格式符号都是英文半角符号，使用中文全角符号将不会起作用。  
> 所有以 http 开头的网址将自动转换为可点击的链接，但你可以使用这种格式给链接起一个更友好的名称。

## 图片

基于上面“链接”的格式，在方括号前面加一个英文的感叹号。方括号内的文字会在图片加载失败时代替图片显示。

```
![滑稽](https://gsp0.baidu.com/5aAHeD3nKhI2p27j8IqW0jdnxx1xbK/tb/editor/images/client/image_emoticon25.png)
```

![滑稽](https://gsp0.baidu.com/5aAHeD3nKhI2p27j8IqW0jdnxx1xbK/tb/editor/images/client/image_emoticon25.png)

## 列表

### 序号列表

```
1. 机器人不得伤害人类，或坐视人类受到伤害；  
1. 除非违背第一法则，否则机器人必须服从人类命令；  
1. 除非违背第一或第二法则，否则机器人必须保护自己。
```

1. 机器人不得伤害人类，或坐视人类受到伤害；
1. 除非违背第一法则，否则机器人必须服从人类命令；
1. 除非违背第一或第二法则，否则机器人必须保护自己。

> 你不必按顺序输入前面的序号，只需要一个数字，一个小数点，和一个空格，仅此而已。浏览器会为你标上正确的序号。

### 子弹列表

```
* 任何在我出生时已经有的科技都是稀松平常的世界本来秩序的一部分；  
* 任何在我 15 - 35 岁之间诞生的科技都是将会改变世界的革命性产物；  
* 任何在我 35 岁之后诞生的科技都是违反自然规律要遭天谴的。
```

* 任何在我出生时已经有的科技都是稀松平常的世界本来秩序的一部分；
* 任何在我 15 - 35 岁之间诞生的科技都是将会改变世界的革命性产物；
* 任何在我 35 岁之后诞生的科技都是违反自然规律要遭天谴的。

> 你可以使用 + 加号 和 - 减号 来代替 * 星号。

有兴趣的话还可以搜索一下多级嵌套列表，这里略过。

## 代码

### 行内代码

使用 \` 反引号来格式化一段行内代码。

在命令行中输入 \`sudo apt update\` 以更新软件包列表。

在命令行中输入 `sudo apt update` 以更新软件包列表。

### 代码块

在开始处和结束处使用 ``` 来格式化一大段代码。你可以在开始标记的后面附上对应的语言名称，使代码变得色彩缤纷。

<pre>
``` C
#include &lt;stdio.h&gt;
int main(void) {
    puts("Hello, world!\n");
    return 0;
}
```
</pre>

``` C
#include <stdio.h>
int main(void) {
    puts("Hello, world!\n");
    return 0;
}
```

> 代码染色及配色方案由 highlight.js 提供。
