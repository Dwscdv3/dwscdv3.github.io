<h1>
    本站已迁移至 Surge
    <date>2019/1/26</date>
</h1>

## The story begins

起因大概是之前发现我的主页与 Wayback Machine 不兼容，它不识别基于 hash 的前端路由，收录的时候直接砍掉了 URL 中充当路径的这一部分。

其实我也早就想改用重定向 + History API 路由，然而 GitHub Pages 只支持 `404.html` fallback，并不支持 `200.html` fallback。如果强行用 404 的话会导致诸多问题，比如搜索引擎不收录、浏览器不记录访问历史等等。

今早在搜索如何在 GitHub Pages 上实现基于重定向的前端路由时无意中发现了 Surge.sh 这个静态网站托管服务，看起来各个方面都和 GitHub Pages 类似，唯独多了个 `200.html` fallback 功能。于是就打算迁移过去试试。

## Rewrite and migrate

不过迁移之前还有件事 —— 先实现重定向路由。

考虑一番后决定既要支持重定向路由，也要支持 hash 路由 —— 为了仍然能够兼容 GitHub Pages。（我可没打算扔下它。）顺便把之前胡乱堆砌的代码稍微重构了一下，实在是看不下去了（x

*（具体细节参见 commit 记录）*

用本机 IIS 服务器测试的时候注意到默认不包含 URL 重写模块，需要自己安装……

一番又一番调试之后差不多可以用了，虽然不知道还有没有什么遗漏的 bug。原来托管于 GitHub Pages 的站搬到了 [www2.dwscdv3.com](https://www2.dwscdv3.com/)，两者仍会保持同步，作为镜像使用。然后将 @ 和 www 解析到了 Surge 的服务器上。

## May the error be with you

在部署到 Surge 的时候发生了点小插曲。部署的时候一直提示

> <span style="color: red;">Error</span> - Deployment did not succeed.

就这一句如同废话一样的错误信息，无论重试多少次都是如此。起初怀疑是网络问题，不过想想觉得不太可能，因为账户登录和前期的配置是没有问题的。Google 了一下发现有过因后台维护导致部署失败的案例，差点以为我也赶上了。

在快要失去信心的时候拿另一个结构非常简单的项目部署了一下试试，居然成功了！这证明了之前的猜测是不正确的，部署失败只能是项目本身的问题。想起来本地 repo 里用了硬链接作为文件别名（因为 Git 不支持符号链接），怀疑是这个客户端不支持 NTFS 硬链接，试了一下，果然……（但是，硬链接不是文件系统级功能么？为什么会这样呢……）

在这个客户端的 GitHub repo 上发了个 issue，不过看起来已经无人问津大半年了。也不知道这家能坚挺多久，不过反正这 repo 同时备份在了三个地方（笔记本、GitHub、Google Drive），就算倒闭了也对我没什么影响（

## It worked, but what's the original intention?

呃…… 说到这里想起来整件事的导火索是 Wayback Machine 不兼容 hash 路由。但是，经过这番折腾，这东西仍然是各种不正常……

罢了，反正能把 URL 里那个多余的 # 去掉就挺好的对吧（