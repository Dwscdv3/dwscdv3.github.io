<h1>
    赞美 systemd
    <date>2017/8/1</date>
</h1>

今天终于打算把 Shadowsocks 的加密算法升级到 AES-256-GCM 了。

从大概半个月前那场风波开始就有这个打算了，然而拖到现在一是因为我懒（笑），二是因为 iOS Cydia 上的那些个远古版本不支持新的 AEAD 类算法，如果换了的话我手机上就没得用了。（尽管明知流算法有被检测出来的风险还在用确实有点冒险……）<span class="hard-to-see">（三是我对那些阴谋论持很大的怀疑态度</span>

一开始我以为 Linux 的服务都是由 init.d 目录的 shell 脚本管理的（虽然听说过 systemd，但是一直没去了解过这个东西），于是直接复制了一份 `/etc/init.d/shadowsocks-libev`（十分愚蠢的做法，不要学我），把脚本里的 `$NAME` 等与路经有关的变量都改了名，然后 `sudo systemctl daemon-reload`。（嗯，是 systemd 的东西呢，我早该注意到的）

但是不行。出了一个很玄学的 bug，每当我启动这个新服务的时候，原服务的进程就会被终止，反之则不然。（并没有弄明白原因，如果当时去看一眼生成的 .service 文件大概就能明白了……）

以为还有什么文件冲突了，一头雾水地来回调试了将近一个小时。

后来 `sudo service shadowsocks-libev status` 看状态的时候，发现我复制的这个服务的状态第一行里有 generated 字样，而原始服务没有这个，而且那里还有一个 `/lib/systemd/system/` 开头的路径。于是突然意识到可能 shadowsocks-libev 的服务实际上并不是在 `/etc/init.d/` 这里。

打开 `/lib/systemd/system/shadowsocks-libev.service` 看了一下，这个文件并不是像 init.d 里面那样的又臭又长的脚本，而是一个只有区区十几行的简单易懂的配置文件。我抱着试一试的态度删了之前那个 init.d 服务，复制了一份这个，然后把文件里 `EnvironmentFile` 指向的那个文件也复制了一份，修改其 `$CONFFILE` 变量到另一个给手机用的 Shadowsocks JSON 配置文件，然后再次 `sudo systemctl daemon-reload`，启动服务。

嗯，这下应该没问题了，两个服务之间看上去并没有产生冲突。

最后用 `systemctl enable shadowsocks-libev-legacy.service` 设置为自启动，完工（

systemd 用起来真简单 😖