<h1>
    日常踩坑之 PHP 编译与配置
    <date>2017/1/17</date>
</h1>

今晚在 Debian 8 + nginx/1.6.2 上安装 PHP 7.1.0  

按照[指南](http://php.net/manual/zh/install.unix.nginx.php)一步步来，下载，解包，编译

`./configure --enable-fpm`

嗯…… 看着一堆 checking 刷啊刷，提示依赖项没安装的就安装了再来一遍。直到……

    ...  
    checking libxml2 install dir... no  
    checking for xml2-config path...  
    configure: error: xml2-config not found. Please check your libxml2 installation.

这个库。

于是我像往常一样使用 apt 大法（

    sudo apt-get install libxml2
    ...
    libxml2 is already the newest version.

喵喵喵？这一定是<ruby>我打开的方式不对<rt>大便的b u g</rt></ruby>，重新安装一下试试（

`sudo apt-get install libxml2 --reinstall`

然并卵……

这个时候就该求助万能的搜索引擎了嘛，在搜了十几分钟后终于看到了[这个回答](http://www.linuxquestions.org/questions/linux-newbie-8/xml2-config-not-found-can%27t-install-php-366764/#post1871060)。管它行不行，反正死马当活马医吧（

`sudo apt-get install libxml2-dev`

嘿，成了！

然后坐等编译十几分钟……

装完后继续按官方指南配置时看到——

> 在启动服务之前，需要修改 php-fpm.conf 配置文件，确保 php-fpm 模块使用 www-data 用户和 www-data 用户组的身份运行。

然而 /usr/local/etc/php-fpm.conf 文件中根本不存在下文中的 `Unix user/group of processes` 块，所幸在最下面的 User Contributed Notes 里找到了很多坑的解决方案（比如这个，PHP 现版本的用户身份配置在 `/usr/local/etc/php-fpm.d/www.conf` 这个文件里。

其它的坑拜备注所赐，基本上都绕过去了

嗯，服务器运维不是什么技术活，但一定是耐心活（苦笑