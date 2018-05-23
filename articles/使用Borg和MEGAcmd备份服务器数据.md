<h1>
    使用 Borg 和 MEGAcmd 备份服务器数据
    <date>2017/11/23</date>
</h1>

## [BorgBackup](https://www.borgbackup.org/)

BorgBackup（简称 Borg）是一个支持去重、压缩和加密的增量备份工具。

官方文档的 [快速入门](https://borgbackup.readthedocs.io/en/stable/quickstart.html)（英文）

太长不想看？好吧…… 复制！粘贴！拿起键盘就是干！（滑稽

### 配置

``` bash
sudo mkdir -p /backup/borg
sudo borg init /backup/borg  # 如要自己保管密钥可以加上 --encryption=keyfile 参数
# 输入一个可靠的口令
```

### borg-main.sh（由 [官方文档](https://borgbackup.readthedocs.io/en/stable/quickstart.html#automating-backups) 修改）

``` bash
#!/bin/sh

export BORG_REPO=/backup/borg  # 之前 init 的目录

SCRIPT_DIR=${0%/*}  # 获取当前脚本的目录，解释：https://stackoverflow.com/questions/6393551/what-is-the-meaning-of-0-in-a-bash-script

info() { printf "\n%s %s\n\n" "$( date )" "$*" >&2; }
trap 'echo $( date ) Backup interrupted >&2; exit 2' INT TERM

info "Starting backup"
borg create \
    --verbose \             # 详细输出，主要用于检查是否备份了多余的文件
    --filter AME \
    --list \
    --stats \
    --show-rc \
    --compression lzma,2 \  # 这是我选择的压缩参数。附几个算法之间的对比测试（zlib 参考 gzip）：https://catchchallenger.first-world.info/wiki/Quick_Benchmark:_Gzip_vs_Bzip2_vs_LZMA_vs_XZ_vs_LZ4_vs_LZO
                            # 其它可选的值：
                            # lz4（默认，速度更快）
                            # zlib,0~9（均衡）
                            # lzma,0~9（体积更小）
    --exclude-caches \
    --exclude-from "$SCRIPT_DIR/borg-exclude.txt" \  # 加载外部排除规则
    ::'{hostname}-{now}' \  # 命名格式
    /etc \                  # 配置目录
    /home \                 # 用户个人目录
    /root \                 # root 用户目录
    /var \                  # 各种重要数据
    # 自行添加其它需要备份的目录
backup_exit=$?

info "Pruning repository"
borg prune \  # 清理过期的备份
    --list \
    --prefix '{hostname}-' \
    --show-rc \
    --keep-daily 7 \
    --keep-weekly 4 \
    --keep-monthly 12 \
    --keep-yearly 99 \
prune_exit=$?

global_exit=$(( backup_exit > prune_exit ? backup_exit : prune_exit ))
if [ ${global_exit} -eq 1 ]; then
    info "Backup and/or Prune finished with a warning"
fi
if [ ${global_exit} -gt 1 ]; then
    info "Backup and/or Prune finished with an error"
fi
exit ${global_exit}
```

### borg-exclude.txt

请自行添加其它的排除规则，语法见 [官方文档](https://borgbackup.readthedocs.io/en/stable/usage/help.html#borg-patterns)

```
fm:/home/*/.cache/*
fm:/var/cache/*
fm:/*/node_modules/*
fm:/*/gocode/*
fm:/*/.nuget/*
pp:/var/tmp
```

## [MEGAcmd](https://mega.nz/cmd)

这是官方的命令行工具，不要与 [t3rm1n4l/megacmd](https://github.com/t3rm1n4l/megacmd) 搞混。

``` bash
# 从官网下载 MEGAcmd 软件包：https://mega.nz/cmd
# 或从源代码编译：https://github.com/meganz/MEGAcmd
# 或直接从命令行下载（下方链接适用于 Debian 9）
wget https://mega.nz/linux/MEGAsync/Debian_9.0/amd64/megacmd-Debian_9.0_amd64.deb
# 此示例适用于 Debian 家族
sudo dpkg -i megacmd-Debian_9.0_amd64.deb   # 安装软件包
sudo apt -f install                         # 处理依赖
```

## 把它们组合起来！

这里假设你把上述所有文件都放在了同一个目录。

### main.sh

``` bash
#!/bin/sh

SCRIPT_DIR=${0%/*}

# 在调用 Borg 之前可以顺便导出一些其它的东西一起备份，比如 mysqldump --all-databases > /root/mysqldump.sql
# 或者导出已安装的软件包列表，等等

"$SCRIPT_DIR/borg-main.sh"

# 根据需要自行替换路径
LOCAL_PATH="/backup"
REMOTE_PATH="/Backup/MyServer1"

# 以下命令理论上只需执行一遍，但可能需要定期执行任意 mega-* 命令以唤醒服务同步文件
# 将它们写在脚本里可以避免时不时地手动维护状态
# 重复执行时会抛出碍眼的错误信息，所以用 &> /dev/null 将标准输出重定向到黑洞
mega-login 邮箱 密码 &> /dev/null
mega-mkdir -p $REMOTE_PATH &> /dev/null  # -p 递归创建目录
mega-sync $LOCAL_PATH $REMOTE_PATH &> /dev/null
```

### crontab

``` bash
sudo crontab -e
```

``` crontab
0 0 * * * /你的路径/main.sh &> /你的路径/main.log
```

## 放在最后的前言

警告：尽管 MEGA 声称自己是“重视隐私保密的公司”，但为了保险起见请不要关闭 Borg 的加密，并使用足够安全的口令，除非你的数据没有任何的保密价值。

我的目的是每天备份 VPS 里的重要数据，以便在某些不可控因素下（机房故障、<del>封号</del>）可以方便地找回自己的数据并转移到另一家服务。因为并不想因此担负额外的开支才选择了免费的云存储，在此之前我分别尝试了 Google Drive 与 Dropbox，但前者的验证机制过于复杂，后者空间太小不够用，最终选择了 MEGA。BorgBackup 是 Google Drive 命令行工具的作者在 README.md 里推荐的。