<h1>
    关于我
    <date>2019/1/31</date>
</h1>

<style>
    .portal-title {
        display: inline-block;
        line-height: 1.5rem;
    }
    #portals {
        max-width: 40rem;
        margin: 1em auto 0;
        text-align: center;
        font-size: 66.6667%;
    }
    #portals>* {
        display: inline-block;
        box-sizing: border-box;
        width: 12.5%;
        min-width: 5em;
        margin-bottom: 0.5em;
        padding: 0 1.2%;
        transition: transform 0.1s;
    }
    #portals>*:hover {
        transform: scale(1.15);
    }
    #portals img {
        width: 100%;
        min-width: 0;
        filter: drop-shadow(1px 1px 2px black);
    }
    #osu-logo {
        position: relative;
    }
    #osu-logo .osu-white {
        position: absolute;
        left: 0;
        top: 0;
        padding: 0 1.2%;
    }
    #osu-logo .osu-overlay {
        position: relative;
    }
    #osu-logo .osu-triangles {
        opacity: 0;
        transition: opacity 0.1s;
    }
    #osu-logo:hover .osu-triangles {
        opacity: 1;
    }
</style>
<h2>次元之门</h2>
<div id="portals">
    <a href="mailto:dwscdv3@hotmail.com">
        <img src="/images/logos/email.svg">
        <span class="portal-title">Email</span>
    </a><a href="https://github.com/Dwscdv3">
        <img src="/images/logos/github.svg">
        <span class="portal-title">GitHub</span>
    </a><a href="https://weibo.com/Dwscdv3">
        <img src="/images/logos/weibo.svg">
        <span class="portal-title">微博</span>
    </a><a href="https://steamcommunity.com/id/dwscdv3">
        <img src="/images/logos/steam.svg">
        <span class="portal-title">Steam</span>
    </a><a href="https://twitter.com/Dwscdv3">
        <img src="/images/logos/twitter.svg">
        <span class="portal-title">Twitter</span>
    </a><a href="https://t.me/Dwscdv3">
        <img src="/images/logos/telegram.svg">
        <span class="portal-title">Telegram</span>
    </a><a href="https://y.qq.com/portal/profile.html?uin=893309102">
        <img src="/images/logos/qqmusic.svg">
        <span class="portal-title">QQ音乐</span>
    </a><a id="osu-logo" href="https://osu.ppy.sh/users/4392941">
        <div class="osu-overlay">
            <img class="osu-triangles" src="/images/logos/osu-triangles.svg">
            <img class="osu-white" src="/images/logos/osu-white.svg">
        </div>
        <span class="portal-title">osu!</span>
    </a>
</div>

<h2>地球 Online™ 人物档案</h2>
<style>
    article>h2, article>h3 {
        text-align: center;
    }
    #earthol {
        margin-top: 0.5em;
        display: flex;
        flex-flow: row wrap;
    }
    #character {
        margin: 0.5em;
        flex-grow: 2;
        font-family: "Finger Paint", "Jokerman", fantasy;
    }
    #character ul {
        margin-top: 0;
    }
    #rpg-stats {
        background-color: rgba(0, 0, 0, 0.25);
        padding: 0.5em;
        flex-grow: 1;
        min-width: 15rem;
        font-family: "Finger Paint", "Comic Sans MS", sans-serif;
        user-select: none;
        white-space: nowrap;
    }
    #rpg-stats>*:first-child {
        margin-top: 0;
    }
    .rpg-stat {
        font-weight: 500;
        text-transform: uppercase;
        position: relative;
        margin: 0.5em;
    }
    .prog {
        height: 1.5em;
        line-height: 1.5em;
        padding-left: 0.25em;
    }
</style>
<div id="earthol">
    <div id="rpg-stats">
        <small style="white-space: initial;">* This graph isn't friendly to blind people, sorry about this.</small>
        <h3>RPG-Like Stats</h3>
        <div class="rpg-stat">
            <div class="prog" style="width: 6%; background-color: #C00;">Strength</div>
        </div>
        <div class="rpg-stat">
            <div class="prog" style="width: 30%; background-color: #CFC;">Dexterity</div>
        </div>
        <div class="rpg-stat">
            <div class="prog" style="width: 80%; background-color: #F60;">Endurance</div>
        </div>
        <div class="rpg-stat">
            <div class="prog" style="width: 72%; background-color: #09F;">Intelligence</div>
        </div>
        <div class="rpg-stat">
            <div class="prog" style="width: 20%; background-color: #090;">Luck</div>
        </div>
        <div class="rpg-stat">
            <div class="prog" style="width: 25%; background-color: #906;">Diligence</div>
        </div>
        <div class="rpg-stat">
            <div class="prog" style="width: 75%; background-color: #F36;">Kindness</div>
        </div>
        <div class="rpg-stat">
            <div class="prog" style="width: 70%; background-color: #066;">Deviation</div>
        </div>
        <h3>Art Skills</h3>
        <div class="rpg-stat">
            <div class="prog" style="width: 20%; background-color: #C3F;">Music</div>
        </div>
        <div class="rpg-stat">
            <div class="prog" style="width: 25%; background-color: #FC0;">Painting</div>
        </div>
        <h3>Programming Skills</h3>
        <div class="rpg-stat">
            <div class="prog" style="width: 80%; background-color: #E34C26;">HTML</div>
        </div>
        <div class="rpg-stat">
            <div class="prog" style="width: 75%; background-color: #563D7C;">CSS</div>
        </div>
        <div class="rpg-stat">
            <div class="prog" style="width: 55%; background-color: #F1E05A;">JavaScript</div>
        </div>
        <div class="rpg-stat">
            <div class="prog" style="width: 50%; background-color: #555555;">C</div>
        </div>
        <div class="rpg-stat">
            <div class="prog" style="width: 70%; background-color: #178600;">C# / .NET</div>
        </div>
        <div class="rpg-stat">
            <div class="prog" style="width: 20%; background-color: #3572A5;">Python</div>
        </div>
        <h3>Human Language</h3>
        <div class="rpg-stat">
            <div class="prog" style="width: 85%; background-color: #CC3300;">Chinese -- Native</div>
        </div>
        <div class="rpg-stat">
            <div class="prog" style="width: 55%; background-color: #6600CC;">English -- Intermediate</div>
        </div>
        <div class="rpg-stat">
            <div class="prog" style="width: 10%; background-color: #FFBFFF;">Japanese -- Beginner</div>
        </div>
        <h3>Gaming Skills</h3>
        <div class="rpg-stat">
            <div class="prog" style="width: 47%; background-color: #EE66AA;">osu! -- 4.7 Stars</div>
        </div>
        <div class="rpg-stat">
            <div class="prog" style="width: 36%; background-color: #0055BB;">LoL -- Silver I</div>
        </div>
        <div class="rpg-stat">
            <div class="prog" style="width: 22%; background-color: #A0A0A0;">FPS games -- completely noob</div>
        </div>
    </div>
    <div id="character">
        <div>Lv. 17 (<span id="exp">??</span>%) <span style="font-size: smaller; opacity: 0.4;">Level locked</span></div>
        <script> $("#exp").textContent = ((new Date() - 1468339200000) / 315360000).toFixed(0); </script>
        <div><span style="font-size: larger;">⚧</span> INFP</div>
        <h3>Occupations</h3>
        <div>NEET</div>
        <div>Amateur developer</div>
        <div>Amateur translator</div>
        <h3>Tags</h3>
        <div>Introverted</div>
        <div>Liberalist</div>
        <div>Feminist</div>
        <div>Perfectionist</div>
        <div>Pessimist</div>
        <div>Agnostic</div>
        <div><del>Fantasist</del></div>
        <span class="comment">
        <!-- <div>Masochist / Submissive</div> -->
        </span>
        <h3>Buffs & Debuffs</h3>
        <div>
            SMA type 2
            <ul>
                <li>STR -85%</li>
                <li>DEX -40%</li>
                <li>END +30%</li>
                <li>INT +??%</li>
            </ul>
        </div>
        <div>
            Scoliosis
            <ul>
                <li>DEX -15%</li>
                <li>END +10%</li>
            </ul>
        </div>
        <div>
            Gender dysphoria
            <ul>
                <li>DEV +40%</li>
            </ul>
        </div>
        <div>
            Social anxiety
            <ul>
                <li>KIN +30%</li>
            </ul>
        </div>
        <div><del>Trypophobia</del> (inactive)</div>
        <div><del>Entomophobia</del> (inactive)</div>
        <div><del>Panic disorder</del> (recovered)</div>
    </div>
</div>

<h3>已废弃的传送门 <del style="opacity: 0.5">黑历史</del></h3>
<ul>
    <!--<li><a href="https://dwscdv3.com/1st-Homepage/" target="_blank">旧主页 ver.1（2013/11/6 ~ 2014/3/5）</a></li>-->
    <li><a href="https://dwscdv3.com/Anonymous-Forum/" target="_blank">旧主页 ver.2（2015/4/23 ~ 2015/6/11）</a></li>
    <span class="comment">
    <!--<li><a href="https://zh.moegirl.org/User:Dwscdv3" target="_blank">萌娘百科用户页 (2014/12/24)</a></li>-->
    <!--<li><a href="http://tieba.baidu.com/home/main?un=_Dwscdv3_" target="_blank">中二那年</a><span class="service">百度贴吧</span></li>-->
    <!--<li>
        31813668
        <a href="http://mole.61.com/"><span class="service">摩尔庄园</span></a>
    </li>-->
    </span>
</ul>