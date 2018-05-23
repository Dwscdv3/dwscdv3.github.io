<h1>
    写了个程序来致敬这爱罢工的 Wi-Fi
    <date>2017/7/1</date>
</h1>

我目前这台笔记本的 Wi-Fi 最近出了点问题，放着长时间不用的话 Wi-Fi 功能有很大的几率会被 Windows 10 禁用掉，重新启动才能恢复。虽然直到现在都不太明白问题出在哪里，但是作为整个局域网的科学上网服务器，以及时不时地需要远距离问候小娜，断网怎么行呢？于是刚刚写了个程序，当电脑闲置并且指定的适配器未连接的情况下自动重启。

但是开发过程实在是踩了很多坑（<span class="hard-to-see">说的就是你，Windows 服务</span>

### 获取网络适配器状态

Google 了一下，很轻松地就找到了 .NET 的获取所有网络接口的方法 [`System.Net.NetworkInformation.NetworkInterface.GetAllNetworkInterfaces()`](https://msdn.microsoft.com/en-us/library/system.net.networkinformation.networkinterface.getallnetworkinterfaces(v=vs.110).aspx)，以及当前状态的属性 [`System.Net.NetworkInformation.NetworkInterface.OperationalStatus`](https://msdn.microsoft.com/en-us/library/system.net.networkinformation.networkinterface.operationalstatus(v=vs.110).aspx)，然后读取注册表里的一个 "网卡1:组1|网卡2:组2…" 格式的配置字符串，如果在同一个组内的任何网卡都不在已连接状态，则重启系统。

P.S. 头一次尝试 LINQ 查询，真好用！

### 判断系统处于闲置状态

我一开始是把这个程序作为 Windows 服务写的，但是，User32 的 [`GetLastInputInfo()`](https://msdn.microsoft.com/en-us/library/windows/desktop/ms646302(v=vs.85).aspx) 只能获取到当前会话的输入数据，而服务运行在会话 0，无法通过这个 API 来判断系统闲置了多长时间。

后来又找到 [`Microsoft.Win32.SystemEvents.SessionSwitch`](https://msdn.microsoft.com/en-us/library/microsoft.win32.systemevents.sessionswitch(v=vs.110).aspx) 这个事件，于是想了个变通的办法，设置系统在闲置一段时间后锁定，这个事件就会被触发，从而判断为闲置。

不过这些都然并卵，最后全删了。原因下面会讲。

### 重新启动系统

最大的坑就在这里了。由于我最初是用 Windows 服务的方式，而 `LOCAL SERVICE` 与 `SYSTEM` 都没有关闭系统的权限，我测试了好几遍都没有成功，正一头雾水。

一开始用的是 `LOCAL SERVICE` 账户，以为权限不够，后来改成 `SYSTEM` 也没效果。难道有 `SYSTEM` 都没有的权限？接着我在[这里](https://msdn.microsoft.com/en-us/library/windows/desktop/ms684190(v=vs.85).aspx)看到了：

> The LocalSystem account has the following privileges:  
> ……  
> **SE_SHUTDOWN_NAME (disabled)**  
> ……

然后在本地安全策略里给“关闭系统”加了 `LOCAL SERVICE` 与 `SYSTEM`，但是依然不行。也许要重启应用更改？这个我没有测试，而且调试服务很麻烦的……

就在我感觉浪费了三四个小时准备弃坑之际，SardineFish 突然点醒了我，让我试试任务计划。我突然想到，任务计划可以检测闲置，这比锁屏触发事件靠谱多了，而且可以以任意用户身份执行，即使没有登录也可以，这样一来也就没有关闭系统的权限问题了！

于是我把服务改成了控制台程序，让任务计划程序在闲置 10 分钟后调用，把之前写的检测闲置的代码都删了，大功告成！？

然而并没有测试 ╮(￣▽￣)╭

大概等我睡觉之后就可以看到效果了吧  
没效果再 debug 去（

<span class="hard-to-see">P.S. 萌评论倒闭了！王八蛋开发者，<del>【数据删除】</del>，吃喝嫖赌，欠下了 3.5 个亿，带着 ta 的蝴蝶刀跑了！<br>开玩笑的，这些天承蒙照顾了，就是能不能把数据库导出给我啊😂</span>