<h1>
    关于我
    <date>2020/2/28</date>
</h1>

<style>
    .portal-title {
        display: inline-block;
        line-height: 1.5rem;
    }
    #portals {
        max-width: 45rem;
        margin: 1em auto 0;
        text-align: center;
        font-size: 66.6667%;
    }
    #portals>* {
        display: inline-block;
        box-sizing: border-box;
        width: 11.1%;
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
    </a><a href="/files/96e24706df7cd363.txt" target="_blank" external>
        <img src="/images/logos/gnupg.svg">
        <span class="portal-title">GnuPG</span>
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

<h2>地球 Online 人物档案</h2>
<style>
    article h2, article h3 {
        margin-bottom: 0.5rem;
    }
    #earthol {
        margin-top: 0.5em;
        display: flex;
        flex-flow: row wrap;
        justify-content: center;
    }
    #character {
        margin: 0.5em;
        font-family: "Finger Paint", "Jokerman", fantasy;
    }
    #character>* {
        width: fit-content;
        margin-left: auto;
        margin-right: auto;
    }
    #character ul {
        margin-top: 0;
        font-size: 75%;
    }
    #rpg-stats {
        background-color: rgba(0, 0, 0, 0.25);
        flex: 1;
        padding: 0.5em;
        min-width: 20rem;
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
    .rpg-stat small {
        font-size: calc(1em / 3 * 2);
        opacity: 0.75;
    }
    .prog {
        box-sizing: border-box;
        height: 1.5em;
        line-height: 1.5em;
        padding: 0 0.25em;
    }
    .prog-oppo-left {
        position: relative;
        z-index: 1;
        border-right: 0.0416rem solid rgba(127, 127, 127, 0.25);
    }
    .prog-oppo-right {
        position: absolute;
        top: 0;
        right: 0;
        border-left: 0.0416rem solid rgba(127, 127, 127, 0.25);
        text-align: right;
    }
    .prog-oppo-right>span {
        position: absolute;
        right: 0.25em;
        z-index: 2;
    }
</style>
<div id="earthol">
    <div id="rpg-stats">
        <h3>RPG Stats</h3>
        <div class="rpg-stat">
            <div class="prog" style="width: 5%; background-color: #C00;">Strength</div>
        </div>
        <div class="rpg-stat">
            <div class="prog" style="width: 30%; background-color: #CFC;">Dexterity</div>
        </div>
        <div class="rpg-stat">
            <div class="prog" style="width: 80%; background-color: #F60;">Endurance</div>
        </div>
        <div class="rpg-stat">
            <div class="prog" style="width: 70%; background-color: #09F;">Intelligence</div>
        </div>
        <h3>Personality</h3>
        <div class="rpg-stat">
            <div class="prog" style="width: 25%; background-color: #906;">Diligence</div>
        </div>
        <div class="rpg-stat">
            <div class="prog" style="width: 70%; background-color: #F36;">Kindness</div>
        </div>
        <div class="rpg-stat">
            <div class="prog" style="width: 65%; background-color: #066;">Deviation</div>
        </div>
        <div class="rpg-stat">
            <div class="prog" style="width: 75%; background-color: #fc0;">Perfectionism</div>
        </div>
        <div class="rpg-stat">
            <div class="prog prog-oppo-left" style="width: 75%; background-color: #f5a9b8;">
                <span>Feminine</span>
            </div>
            <div class="prog prog-oppo-right" style="width: 25%; background-color: #5bcefa;">
                <span>Masculine</span>
            </div>
        </div>
        <div class="rpg-stat">
            <div class="prog prog-oppo-left" style="width: 85%; background-color: #222;">
                <span>Introverted</span>
            </div>
            <div class="prog prog-oppo-right" style="width: 15%; background-color: #ddd;">
                <span>Extroverted</span>
            </div>
        </div>
        <div class="rpg-stat">
            <div class="prog prog-oppo-left" style="width: 65%; background-color: #666;">
                <span>Pessimism</span>
            </div>
            <div class="prog prog-oppo-right" style="width: 35%; background-color: #7df;">
                <span>Optimism</span>
            </div>
        </div>
        <div class="rpg-stat">
            <div class="prog prog-oppo-left" style="width: 80%; background-color: #66f;">
                <span>Liberalism</span>
            </div>
            <div class="prog prog-oppo-right" style="width: 20%; background-color: #f66;">
                <span>Conservatism</span>
            </div>
        </div>
        <div class="rpg-stat">
            <div class="prog prog-oppo-left" style="width: 90%; background-color: #0cf;">
                <span>Submission</span>
            </div>
            <div class="prog prog-oppo-right" style="width: 10%; background-color: #f00;">
                <span>Dominance</span>
            </div>
            <span class="comment" style="position: absolute; top: 0; width: 100%; z-index: 3; line-height: 1.375em; text-align: center; font-family: sans-serif; text-shadow: none;">
                <!-- https://bdsmtest.org/r/m2bkV7s3 -->
            </span>
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
            <div class="prog" style="width: 75%; background-color: #E34C26;">HTML</div>
        </div>
        <div class="rpg-stat">
            <div class="prog" style="width: 80%; background-color: #563D7C;">CSS</div>
        </div>
        <div class="rpg-stat">
            <div class="prog" style="width: 55%; background-color: #F1E05A;">JavaScript</div>
        </div>
        <div class="rpg-stat">
            <div class="prog" style="width: 50%; background-color: #555555;">C</div>
        </div>
        <div class="rpg-stat">
            <div class="prog" style="width: 65%; background-color: #178600;">C# / .NET</div>
        </div>
        <h3>Human Language</h3>
        <div class="rpg-stat">
            <div class="prog" style="width: 85%; background-color: #CC3300;">Chinese <small>Native</small></div>
        </div>
        <div class="rpg-stat">
            <div class="prog" style="width: 55%; background-color: #6600CC;">English <small>Intermediate</small></div>
        </div>
        <div class="rpg-stat">
            <div class="prog" style="width: 15%; background-color: #FFBFFF;">Japanese <small>Beginner</small></div>
        </div>
        <h3>Gaming Skills</h3>
        <div class="rpg-stat">
            <div class="prog" style="width: 55%; background-color: #f6a;">osu! <small>4.7 Stars</small></div>
        </div>
        <div class="rpg-stat">
            <div class="prog" style="width: 33%; background-color: #f6a;">osu!mania <small>2.4 Stars</small></div>
        </div>
        <div class="rpg-stat">
            <div class="prog" style="width: 40%; background-color: #a3364a;">majsoul <small>雀豪一</small></div>
        </div>
        <div class="rpg-stat">
            <div class="prog" style="width: 25%; background-color: #a3364a;">Go / Weiqi <small>11k</small></div>
        </div>
        <hr>
        <small style="white-space: initial;">* This graph isn't friendly to blind people, sorry about this.</small>
    </div>
    <div id="character">
        <div><span style="font-size: larger;">⚧</span> Lv. 17 (<span id="exp">??</span>%) <span style="font-size: smaller; opacity: 0.4;">Level locked</span></div>
        <script> $("#exp").textContent = ((new Date() - 1468339200000) / 315360000).toFixed(0); </script>
        <h3>Personality</h3>
        <div>
            <div><a href="https://en.wikipedia.org/wiki/Myers%E2%80%93Briggs_Type_Indicator">MBTI</a>: INFP</div>
            <style>
                #fav-colors>div {
                    padding: 0.5rem 0 0 1rem;
                    font-size: 87.5%;
                }
                #fav-colors>div>span {
                    display: inline-block;
                    box-sizing: content-box;
                    padding: 0.75rem 0.75rem;
                    border-radius: 50%;
                    box-shadow: 0 0 0.5em black;
                    vertical-align: middle;
                }
            </style>
            <div id="fav-colors">
                Favorite colors:
                <div>
                    <span style="background: #ccccff;"></span>
                    Periwinkle
                </div>
                <!-- <div>
                    <span style="background: #dcd0ff;"></span>
                    Pale Lavender
                </div> -->
                <div>
                    <span style="background: #f4bbff;"></span>
                    Brilliant Lavender
                </div>
                <div>
                    <span style="background: #cc99ff;"></span>
                    Pale Violet
                </div>
            </div>
        </div>
        <h3>Roles</h3>
        <div>
            <div>NEET</div>
            <div>Amateur developer</div>
            <div>Amateur translator</div>
        </div>
        <h3>Buffs & Debuffs</h3>
        <div>
            <div>
                SMA type 2
                <ul>
                    <li>STR -85%</li>
                    <li>DEX -40%</li>
                    <li>END +30%</li>
                    <li>INT +??%</li>
                    <li>SUB +60%</li>
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
                    <li>LIB +30%</li>
                </ul>
            </div>
            <div>
                Social anxiety
                <ul>
                    <li>KIN +30%</li>
                    <li>INTR +50%</li>
                </ul>
            </div>
        </div>
    </div>
</div>

<h3>已废弃的传送门 <del style="opacity: 0.5">黑历史</del></h3>
<ul>
    <!--<li><a href="https://www2.dwscdv3.com/1st-Homepage/" target="_blank">旧主页 ver.1（2013/11/6 ~ 2014/3/5）</a></li>-->
    <li><a href="https://www2.dwscdv3.com/Anonymous-Forum/" target="_blank">旧主页 ver.2（2015/4/23 ~ 2015/6/11）</a></li>
    <span class="comment">
    <!--<li><a href="https://zh.moegirl.org/User:Dwscdv3" target="_blank">萌娘百科用户页 (2014/12/24)</a></li>-->
    <!--<li>
        31813668
        <a href="http://mole.61.com/"><span class="service">摩尔庄园</span></a>
    </li>-->
    </span>
</ul>