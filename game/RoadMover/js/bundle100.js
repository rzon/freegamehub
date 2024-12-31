var __extends = this && this.__extends || function () {
    var a = Object.setPrototypeOf || {
        __proto__: []
    }
        instanceof Array && function (a, e) {
            a.__proto__ = e;
        } || function (a, e) {
            for (var t in e) e.hasOwnProperty(t) && (a[t] = e[t]);
        };
    return function (e, t) {
        function __() {
            this.constructor = e;
        }
        a(e, t), e.prototype = null === t ? Object.create(t) : (__.prototype = t.prototype,
            new __());
    };
}();

! function () {
    return function r(a, e, t) {
        function o(i, s) {
            if (!e[i]) {
                if (!a[i]) {
                    var h = "function" == typeof require && require;
                    if (!s && h) return h(i, !0);
                    if (n) return n(i, !0);
                    var c = new Error("Cannot find module '" + i + "'");
                    throw c.code = "MODULE_NOT_FOUND", c;
                }
                var g = e[i] = {
                    exports: {}
                };
                a[i][0].call(g.exports, function (e) {
                    return o(a[i][1][e] || e);
                }, g, g.exports, r, a, e, t);
            }
            return e[i].exports;
        }
        for (var n = "function" == typeof require && require, i = 0; i < t.length; i++) o(t[i]);
        return o;
    };
}()({
    1: [function (a, e, t) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var n = a("./page/scene/homeScene"),
            i = a("./page/scene/loadScene"),
            r = a("./page/view/gameView"),
            o = function () {
                function GameConfig() { }
                return GameConfig.init = function () {
                    var a = Laya.ClassUtils.regClass;
                    a("page/scene/homeScene.ts", n.default), a("page/scene/loadScene.ts", i.default),
                        a("page/view/gameView.ts", r.default);
                }, GameConfig.width = 750, GameConfig.height = 1334, GameConfig.scaleMode = "fixedwidth",
                    GameConfig.screenMode = "none", GameConfig.alignV = "top", GameConfig.alignH = "left",
                    GameConfig.startScene = "scene/loadpage.scene", GameConfig.sceneRoot = "", GameConfig.debug = !1,
                    GameConfig.stat = !1, GameConfig.physicsDebug = !1, GameConfig.exportSceneToJson = !0,
                    GameConfig;
            }();
        t.default = o, o.init();
    }, {
        "./page/scene/homeScene": 52,
        "./page/scene/loadScene": 53,
        "./page/view/gameView": 54
    }],
    2: [function (a, e, t) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var n = a("./GameConfig"),
            i = a("./manager/uiManager"),
            r = a("./manager/eventManager"),
            o = a("./data/gameEnum"),
            s = a("./configData"),
            h = a("./platform/platform");
        h.platform.instance.onShow(), h.platform.instance.onHide(), h.platform.instance.showShareMenu(),
            h.platform.instance.onAudioInterruptionEnd(), h.platform.instance.onMemoryWarning(),
            h.platform.instance.setKeepScreenOn(), new (function () {
                function Main() {
                    Laya.isWXPosMsg = !0, Laya.isWXOpenDataContext = !1, UIConfig.closeDialogOnSide = !1,
                        window.Laya3D ? Laya3D.init(n.default.width, n.default.height) : Laya.init(n.default.width, n.default.height, Laya.WebGL),
                        Laya.Physics && Laya.Physics.enable(), Laya.DebugPanel && Laya.DebugPanel.enable(),
                        // Laya.stage.scaleMode = n.default.scaleMode, Laya.stage.screenMode = n.default.screenMode, 
                        Laya.stage.scaleMode = Laya.Stage.SCALE_SHOWALL;
                    Laya.stage.screenMode = Laya.Stage.SCREEN_NONE;
                    Laya.stage.alignV = Laya.Stage.ALIGN_MIDDLE;
                    Laya.stage.alignH = Laya.Stage.ALIGN_CENTER;
                    Laya.URL.exportSceneToJson = n.default.exportSceneToJson, (n.default.debug || "true" == Laya.Utils.getQueryString("debug")) && Laya.enableDebugPanel(),
                        n.default.physicsDebug && Laya.PhysicsDebugDraw && Laya.PhysicsDebugDraw.enable(),
                        n.default.stat && Laya.Stat.show(), Laya.alertGlobalError = !0, s.configData.initLocal(),
                        i.uiManager.instance.init(), Laya.ResourceVersion.enable("version.json", Laya.Handler.create(this, this.onVersionLoaded), Laya.ResourceVersion.FILENAME_VERSION);
                }
                return Main.prototype.onVersionLoaded = function () {
                    CoinApp.afterShowAd = () => {
                        Laya.SoundManager.setSoundVolume(1);
                        Laya.SoundManager.muted = false;
                    }
                    CoinApp.beforeShowAd = () => {
                        Laya.SoundManager.setSoundVolume(0);
                        Laya.SoundManager.muted = true;
                    }
                    Laya.AtlasInfoManager.enable("fileconfig.json", Laya.Handler.create(this, this.onConfigLoaded));
                }, Main.prototype.onConfigLoaded = function () {
                    r.eventManager.instance.emitEvent(o.GameEvent.openLoadPage, null);
                }, Main;
            }())();
    }, {
        "./GameConfig": 1,
        "./configData": 3,
        "./data/gameEnum": 5,
        "./manager/eventManager": 21,
        "./manager/uiManager": 28,
        "./platform/platform": 55
    }],
    3: [function (a, e, t) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var n = a("./platform/platform"),
            i = function () {
                function configData() { }
                return configData.initLocal = function () {
                    if (this.systemInfo = n.platform.instance.getSystemInfoSync(), this.systemInfo) {
                        var a = this.systemInfo.model;
                        !this.systemInfo.benchmarkLevel && "0" != String(this.systemInfo.benchmarkLevel) || -1 != a.indexOf("iPhone") || (this.benchmarkLevel = this.systemInfo.benchmarkLevel);
                        var e = this.systemInfo.screenHeight,
                            t = this.systemInfo.screenWidth / e;
                        this.isLongScreen = !(t > .5), -1 != a.indexOf("iPhone") || -1 == this.benchmarkLevel || this.benchmarkLevel >= 20 ? this.sysStat = "normal" : this.sysStat = "minLevel",
                            console.warn("低高挡" + this.sysStat);
                    }
                }, configData.modeScale = 100, configData.effectScale = 70, configData.shareTime = 2e3,
                    configData.LaneSx = .7, configData.LaneSz = 1, configData.carSpeed = .005, configData.camSpeed = 2,
                    configData.camMaxtime = 1e3, configData.frameTime = 30, configData.flyTime = 2e3,
                    configData.carposy = .08, configData.chaAdy = 20, configData.subpackage = ["res"],
                    configData.apiKey = "ef40cfcb3b48b1c6ad7eb6b881dcf276", configData.apiSecret = "8e73bab666419069f9271e3c6f8a872f",
                    configData.gameversion = "09.21.01", configData.version = "1.0", configData.serverUrl = "https://fkjs.chaosuduokai.com/index/api/",
                    configData.releasePlatform = "web", configData.benchmarkLevel = -1, configData.sysStat = "normal",
                    configData.haveAd = !0, configData.haveAp = !0, configData.firstVir = !1, configData.oneCirtime = 1e4,
                    configData.awardNum = 100, configData.oneDayTask = 3, configData.openCan = !1, configData.turnTime = 3e3,
                    configData.garageLevel = 1, configData.taskLevel = 5, configData.onecarbei = 1,
                    configData;
            }();
        t.configData = i;
    }, {
        "./platform/platform": 55
    }],
    4: [function (a, e, t) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var n = a("./userData"),
            i = a("../configData"),
            r = a("../manager/tableManager"),
            o = a("../platform/platform"),
            s = a("../manager/eventManager"),
            h = a("./gameEnum"),
            c = function () {
                function currgameData() { }
                return currgameData.changeGameStat = function (a) {
                    this.gameStat = a;
                }, currgameData.setGoldBei = function () {
                    var a = 0,
                        e = 0;
                    for (var t in n.userData.carInfo) a += n.userData.carInfo[t], e += 1;
                    this.addGoldBei = 1 + (a - e) * i.configData.onecarbei / 100;
                }, currgameData.addReceive = function () {
                    this.receive += 1;
                }, currgameData.addWudi = function () {
                    this.wudis += 1;
                }, currgameData.addChacar = function () {
                    this.gchacars += 1;
                }, currgameData.addLchacar = function (a) {
                    this.lchacars += a;
                }, currgameData.addGvideo = function () {
                    this.gvideos += 1;
                }, currgameData.changeIncamtra = function (a) {
                    this.inCamtime = a, s.eventManager.instance.emitEvent(h.GameEvent.changeCamType, null);
                }, currgameData.addCurrScore = function (a) {
                    var e = r.default.getInstance().getKeyByVal("cars", "carname", a),
                        t = n.userData.carInfo[e],
                        i = Number(r.default.getInstance().getDataByKey("cars", e, "gscore").split("*")[0]),
                        o = 1;
                    currgameData.lemitnum > 0 && (o = 1 == currgameData.lemitnum ? this.ocontinscore : this.tcontinscore),
                        this.currscore += this.gamebei * (i * t) * o, s.eventManager.instance.emitEvent(h.GameEvent.addCurrScore, null);
                }, currgameData.addCurrGold = function (a) {
                    void 0 === a && (a = 1), this.currgold += Math.ceil(this.gamebei * currgameData.addGoldBei * a),
                        s.eventManager.instance.emitEvent(h.GameEvent.showGold, null);
                }, currgameData.setLevelData = function () {
                    var a = Number(r.default.getInstance().getTableLength("level")),
                        e = (n.userData.level - 1) % a + 1,
                        t = r.default.getInstance().getRowDataByKey("level", e + ""),
                        o = t.road.split("~"),
                        s = Number(o[0]),
                        h = Number(o[1]),
                        c = Math.round(Math.random() * (h - s) + s);
                    "minLevel" == i.configData.sysStat && c > 2 && (c = 2);
                    for (var g = r.default.getInstance().getDataByKey("roadir", "" + c, "roadir").split(","), p = t.lanes, d = t.lanecars.split(","), l = Number(d[0]), m = Number(d[1]), u = [], f = [], v = 6, y = 0; y < p; y++) {
                        f.push(v), v += 8;
                        var b = Math.round(Math.random() * (m - l) + l);
                        u.push(b);
                    }
                    v += 6;
                    var D = Number(t.speed),
                        w = t.carAgold.split(","),
                        x = Number(w[0]),
                        k = x + Number(w[1]),
                        M = [x, k, k + Number(w[2])];
                    this.roadnums = c, this.roaDir = g, this.roadleng = v, this.charoad = f, this.chacars = u,
                        this.carAgold = M, n.userData.level % 3 == 0 ? currgameData.camdietime > 1 ? (this.cameraType = 0,
                            currgameData.camdietime = 0) : (this.cameraType = 1, D = .8) : this.cameraType = 0,
                        this.carSpeed = D, this.levelPadding = [1, 3], this.lcarspeed = i.configData.kw * i.configData.carSpeed * currgameData.carSpeed,
                        this.baseEtime = Math.ceil(i.configData.kw / this.lcarspeed);
                }, currgameData.setbasetime = function () {
                    var a = 0;
                    for (var e in this.basenum) a += this.basenum[e], this.ebasenum.push([e, a]);
                    this.ebnum = a;
                }, currgameData.getnextime = function () {
                    for (var a, e = Math.random() * this.ebnum, t = 0; t < this.ebasenum.length; t++) {
                        var n = this.ebasenum[t],
                            i = n[0];
                        if (e <= n[1]) {
                            a = i;
                            break;
                        }
                    }
                    var r = a.split("-"),
                        o = Number(r[0]),
                        s = Number(r[1]);
                    return Math.floor(Math.random() * (s - o) * 100) / 100 + o;
                }, currgameData.changeGameBei = function (a) {
                    this.gamebei = a;
                }, currgameData.setConfigData = function () {
                    this.failExpre = [], this.sucExpre = [];
                    var a = r.default.getInstance().getTableData("chart");
                    for (var e in a) {
                        var t = a[e];
                        Number(t.id) < 0 ? this.failExpre.push(t) : this.sucExpre.push(t);
                    }
                    var n = r.default.getInstance().getDataByKey("constant", "1", "leavebei");
                    this.awardBei = n;
                    var i = r.default.getInstance().getDataByKey("constant", "1", "ocontinscore");
                    this.ocontinscore = i;
                    r.default.getInstance().getDataByKey("constant", "1", "tcontinscore");
                    this.tcontinscore = i, this.setbasetime();
                    var o = new Date();
                    o.setDate(o.getDate() + 1), o.setHours(0), o.setMinutes(0), o.setSeconds(0), o.setMilliseconds(0),
                        this.nextDaytime = o.getTime();
                }, currgameData.changeInvincible = function (a) {
                    this.invincible = a;
                }, currgameData.changeExplosion = function () {
                    this.firstExplosion = !1;
                }, currgameData.gameover = function (a, e) {
                    var t = {
                        level: n.userData.level,
                        score: currgameData.currscore,
                        revive: currgameData.receive,
                        gold: currgameData.currgold
                    };

                    o.platform.instance.request("gameover", t, function (e) {
                        n.userData.addGameWudis(currgameData.wudis), n.userData.addGameChacars(currgameData.gchacars),
                            n.userData.addGameLchacars(currgameData.lchacars), n.userData.addGameFuhuos(currgameData.receive),
                            n.userData.addGameVideos(currgameData.gvideos), n.userData.changeGameGold(currgameData.currgold),
                            a && a(e);
                    }.bind(this), function (a) {
                        e && e();
                    }.bind(this));
                }, currgameData.nextDaytime = 0, currgameData.cameraType = 0, currgameData.camdietime = 0,
                    currgameData.gameStat = 0, currgameData.inCamtime = !1, currgameData.charoad = [],
                    currgameData.chacars = [], currgameData.levelPadding = [], currgameData.carAgold = [9, 10],
                    currgameData.carSpeed = 1, currgameData.chaRoadIdx = 0, currgameData.failExpre = [],
                    currgameData.sucExpre = [], currgameData.stopPosInfo = [0, 0], currgameData.firstExplosion = !1,
                    currgameData.invincible = !1, currgameData.gamebei = 1, currgameData.currgold = 0,
                    currgameData.currscore = 0, currgameData.receive = 0, currgameData.wudis = 0, currgameData.gchacars = 0,
                    currgameData.lchacars = 0, currgameData.gvideos = 0, currgameData.continueLevel = 0,
                    currgameData.awardBei = 0, currgameData.addGoldBei = 1, currgameData.lemitnum = 0,
                    currgameData.ocontinscore = 0, currgameData.tcontinscore = 0, currgameData.basenum = {
                        "1.6-2": 5,
                        "2-3": 30,
                        "3-4": 40,
                        "4-5": 20,
                        "5-6": 15,
                        "6-7": 15,
                        "7-8": 15,
                        "8-9": 10,
                        "9-10": 5
                    }, currgameData.ebasenum = [], currgameData.ebnum = 0, currgameData;
            }();
        t.currgameData = c;
    }, {
        "../configData": 3,
        "../manager/eventManager": 21,
        "../manager/tableManager": 26,
        "../platform/platform": 55,
        "./gameEnum": 5,
        "./userData": 7
    }],
    5: [function (a, e, t) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
            function (a) {
                a.player = "player", a.task = "task", a.leavegold = "leavegold";
            }(t.GameStorage || (t.GameStorage = {})),
            function (a) {
                a.cars = "", a.gold = "coin", a.click = "button", a.gameover = "gameover";
            }(t.GameSound || (t.GameSound = {})),
            function (a) {
                a.openLoadPage = "openLoadPage", a.openHomePage = "openHomePage", a.openGameView = "openGameView",
                    a.openRank = "openRank", a.openFuhuo = "openFuhuo", a.openJiesuan = "openJiesuan",
                    a.openGameover = "openGameover", a.openGarage = "openGarage", a.openUplevelCar = "openUplevelCar",
                    a.openTask = "openTask", a.openAward = "openAward", a.openShouc = "openShouc", a.openTryPage = "openTryPage",
                    a.openPipeiPage = "openPipeiPage", a.backInSettle = "backInSettle", a.awardAddMyApp = "awardAddMyApp",
                    a.changeShowHome = "changeShowHome", a.changeTrydata = "changeTrydata", a.closePage = "closePage",
                    a.alertChart = "alertChart", a.chartManage = "chartManage", a.getChartPos = "getChartPos",
                    a.watchGarage = "watchGarage", a.saveTaskIdx = "saveTaskIdx", a.freshTaskShow = "freshTaskShow",
                    a.changeShowAward = "changeShowAward", a.upLevelCar = "upLevelCar", a.changeShowTask = "changeShowTask",
                    a.changeInkey = "changeInkey", a.repushUpani = "repushUpani", a.resetGame = "resetGame",
                    a.initScene = "initScene", a.addOneChaRoad = "addOneChaRoad", a.addOneCar = "addOneCar",
                    a.addChaCar = "addChaCar", a.addHroadCar = "addHroadCar", a.changeCameraPos = "changeCameraPos",
                    a.emitCar = "emitCar", a.readyEmitNextCar = "readyEmitNextCar", a.changeMoveTeam = "changeMoveTeam",
                    a.rePushCar = "rePushCar", a.rePushEffect = "rePushEffect", a.changeScorePos = "changeScorePos",
                    a.fuhuo = "fuhuo", a.addEffect = "addEffect", a.setEnvirSprite = "setEnvirSprite",
                    a.addEnvirPanel = "addEnvirPanel", a.addLightPai = "addLightPai", a.changeWudi = "changeWudi",
                    a.showGold = "showGold", a.checkAttack = "checkAttack", a.changeChaCarMovetype = "changeChaCarMovetype",
                    a.addChaCartoGroup = "addChaCartoGroup", a.addCurrScore = "addCurrScore", a.changeLpro = "changeLpro",
                    a.changeCamType = "changeCamType", a.addTpro = "addTpro", a.perfabReady = "perfabReady";
            }(t.GameEvent || (t.GameEvent = {})),
            function (a) {
                a.failServer = "连接服务器失败，稍后重试", a.failShare = "分享失败，请分享到不同的群", a.failVideo = "通讯失败";
            }(t.GameTxt || (t.GameTxt = {})),
            function (a) {
                a[a.default = 1] = "default", a[a.homeshare = 2] = "homeshare", a[a.fuhuo = 3] = "fuhuo",
                    a[a.jiesuan = 4] = "jiesuan", a[a.gameover = 5] = "gameover", a[a.award = 6] = "award",
                    a[a.pipei = 7] = "pipei";
            }(t.ShareType || (t.ShareType = {}));
    }, {}],
    6: [function (a, e, t) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var n = a("../manager/eventManager"),
            i = a("./userData"),
            r = a("./gameEnum"),
            o = a("../utils"),
            s = function () {
                function tryGameData() { }
                return tryGameData.getData = function () {
                    Laya.loader.load("https://gameres.chaosuduokai.com/config/ad/wxb589ea1debf37b0d.json", Laya.Handler.create(this, function (a) {
                        if (a && a.result && a.result.wxappList) {
                            var e = a.result.wxappList;
                            this.initdata(e), n.eventManager.instance.emitEvent(r.GameEvent.addTpro, .1), i.userData.getShareConfig();
                        } else this.initdata([]), n.eventManager.instance.emitEvent(r.GameEvent.addTpro, .1),
                            i.userData.getShareConfig();
                    }.bind(this)));
                }, tryGameData.initdata = function (a) {
                    for (var e = [], t = [], n = [], i = [], r = [], s = wx.getSystemInfoSync().model, h = 0; h < a.length; h++) {
                        var c = a[h];
                        if (1 != c.is_gamebox || -1 == s.indexOf("iPhone")) {
                            var g = c.app_id;
                            1 == c.category ? this.checkInAppid(g, e) || e.push(c) : 2 == c.category ? this.checkInAppid(g, t) || t.push(c) : 3 == c.category ? this.checkInAppid(g, n) || n.push(c) : 4 == c.category ? this.checkInAppid(g, i) || i.push(c) : 6 == c.category && (this.checkInAppid(g, r) || r.push(c));
                        }
                    }
                    this.jiesuanTrydata = o.utils.sortFun(e, "sort"), this.successGq = o.utils.sortFun(t, "sort"),
                        this.homeTrydata = o.utils.sortFun(n, "sort"), this.boTrydata = o.utils.sortFun(i, "sort"),
                        this.turnTrydata = o.utils.sortFun(r, "sort");
                }, tryGameData.checkInAppid = function (a, e) {
                    for (var t = !1, n = 0; n < e.length; n++) {
                        if (e[n].app_id == a) {
                            t = !0;
                            break;
                        }
                    }
                    return t;
                }, tryGameData.getNextGame = function (a, e, t) {
                    var n;
                    "bot" == a ? n = this.boTrydata : "jiesuan" == a ? n = this.jiesuanTrydata : "backhome" == a ? n = this.successGq : "turn" == a ? n = this.turnTrydata : "home" == a && (n = this.homeTrydata),
                        t > n.length && (t = n.length);
                    for (var i = [], r = 0, o = 0; o < n.length; o++) {
                        for (var s = (d = n[o]).id, h = !1, c = 0; c < e.length; c++) {
                            if (s == (p = e[c])) {
                                h = !0;
                                break;
                            }
                        }
                        if (!h) r += Number(d.sort), i.push([r, d]);
                    }
                    if (e.length >= t) {
                        var g = [];
                        for (c = 0; c < e.length; c++) {
                            var p = e[c];
                            for (o = 0; o < n.length; o++) {
                                var d;
                                if ((s = (d = n[o]).id) == p) {
                                    g.push(d);
                                    break;
                                }
                            }
                        }
                        return g;
                    }
                    for (var l, m = Math.round(Math.random() * r), u = 0; u < i.length; u++) {
                        var f = i[u],
                            v = f[0];
                        if (l = f[1].id, m > v) break;
                    }
                    return e.push(l), this.getNextGame(a, e, t);
                }, tryGameData.changeItemData = function (a, e) {
                    var t;
                    "bot" == a ? t = this.boTrydata : "jiesuan" == a ? t = this.jiesuanTrydata : "backhome" == a ? t = this.successGq : "turn" == a ? t = this.turnTrydata : "home" == a && (t = this.homeTrydata);
                    for (var n = 0, i = [], r = 0; r < t.length; r++) {
                        for (var o = t[r], s = o.id, h = !1, c = 0; c < e.length; c++) {
                            if (s == e[c]) {
                                h = !0;
                                break;
                            }
                        }
                        if (!h) n += Number(o.sort), i.push([n, o]);
                    }
                    for (var g = Math.round(Math.random() * n), p = null, d = 0; d < i.length; d++) {
                        var l = i[d],
                            m = l[0];
                        p = l[1];
                        if (g > m) break;
                    }
                    return p;
                }, tryGameData.configTryList = ["wxf2270df1410c589c", "wx86dd26029d6a9183", "wx78a54e1762bfc2ed", "wx928b7cc646e12b0b", "wx333b14d7619016c0", "wx5f71b08d1a739c57", "wx0b30450d40ed218a", "wx7fbc89e96b19fe86", "wx83b4f587009a8910", "wx065018aa1a63b995"],
                    tryGameData.jiesuanTrydata = [], tryGameData.successGq = [], tryGameData.homeTrydata = [],
                    tryGameData.boTrydata = [], tryGameData.turnTrydata = [], tryGameData;
            }();
        t.tryGameData = s;
    }, {
        "../manager/eventManager": 21,
        "../utils": 59,
        "./gameEnum": 5,
        "./userData": 7
    }],
    7: [function (a, e, t) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var n = a("../platform/platform"),
            i = a("../manager/shareManager"),
            r = a("./gameEnum"),
            o = a("../manager/eventManager"),
            s = a("../manager/taskManager"),
            h = a("../configData"),
            c = a("./tryGameData"),
            g = a("../manager/adManager"),
            p = a("../manager/tableManager"),
            d = a("../manager/storageManager"),
            l = a("./currgameData"),
            m = function () {
                function userData() { }
                return userData.solveLoginData = function () {
                    for (var a = [], e = 0; e < arguments.length; e++) a[e] = arguments[e];
                    this.solveLocalData();
                    var t, n = a[0];
                    n = "local";
                    if ("server" == n) {
                        this.openServer = !0;
                        var i = a[1];
                        this.token = i.token;
                        var o = i.userInfo;
                        this.maxScore = o.max_score, this.gold = o.gold, this.level = o.level, this.is_collect = o.is_collect,
                            this.serverTime = 1e3 * i.time, this.avatar = o.avatar, s.taskManager.initData(),
                            this.checkGameTime(), t = o.car_level;
                    } else "local" == n && (this.openServer = !1, t = []);
                    var c = p.default.getInstance().getTableData("cars"),
                        g = [];
                    for (var m in c) {
                        var u = c[m];
                        g.push(u.id);
                    }
                    for (var f = {}, v = 0; v < g.length; v++) {
                        var y = g[v];
                        f[y] = 1;
                        for (var b = 0; b < t.length; b++) {
                            var D = t[b],
                                w = D.car,
                                x = D.level;
                            if (y == w) {
                                f[y] = x, x;
                                break;
                            }
                        }
                    }
                    if (this.carInfo = f, this.isOneDay) {
                        var k = d.storageManager.getStorage(r.GameStorage.leavegold);
                        k || (k = {});
                        var M = k.gold || 0,
                            C = k.leavetime || Date.now(),
                            I = Date.now(),
                            E = this.getOneCiraward();
                        M += (I - C) / h.configData.oneCirtime * E, this.setAward(M), l.currgameData.setGoldBei(),
                            Laya.timer.loop(h.configData.oneCirtime, this, this.updateAward);
                    } else l.currgameData.addGoldBei = 1;
                    this.saveLocalData();
                }, userData.updateAward = function () {
                    this.addCarAward();
                }, userData.addCarAward = function () {
                    this.level;
                    var a = this.getOneCiraward(),
                        e = this.awardGold + Math.ceil(a);
                    this.setAward(e);
                }, userData.changeGameGold = function (a) {
                    this.gold += a, o.eventManager.instance.emitEvent(r.GameEvent.showGold, null), a >= 0 && (this.hisGetGold += a,
                        this.saveTaskPro()), o.eventManager.instance.emitEvent(r.GameEvent.changeShowTask, "car");
                    Laya.LocalStorage.setItem("userDatagold", this.gold);
                }, userData.setAward = function (a) {
                    this.level;
                    var e = 7200 * this.getOneCiraward() / (h.configData.oneCirtime / 1e3);
                    a > e && (a = e), this.awardGold = Math.ceil(a);
                }, userData.getOneCiraward = function () {
                    var a = this.level;
                    a > 1e3 && (a = 1e3);
                    return (a <= 10 ? .5 : a <= 60 ? .2 : a <= 100 ? .1 : a <= 300 ? .05 : .02) * a;
                }, userData.saveAward = function () {
                    var a = {
                        leavetime: Date.now(),
                        gold: userData.awardGold
                    };
                    d.storageManager.setStorage(r.GameStorage.leavegold, a);
                }, userData.changeTodayGold = function (a) {
                    a > 0 && (this.todaygold += a, s.taskManager.updateTodayTask(), this.saveLocalData());
                }, userData.setGameGold = function (a) {
                    this.gold = a;
                    Laya.LocalStorage.setItem("userDatagold", this.gold);
                }, userData.freshPlayerData = function (a) {
                    this.token = a.token, this.avatar = a.userInfo.avatar;
                }, userData.solveLocalData = function () {

                    var a = d.storageManager.getStorage(r.GameStorage.player);
                    a || (a = {}), a.hasOwnProperty("mute") || (a.mute = !1), a.hasOwnProperty("virbort") || (a.virbort = !0),
                        a.hasOwnProperty("lastGameTime") && (this.lastGameTime = a.lastGameTime), this.mute = a.mute,
                        this.virbort = a.virbort, this.todaygold = a.todaygold || 0, this.todaywudi = a.todaywudi || 0,
                        this.todaychacars = a.todaychacars || 0, this.todaylchacars = a.todaylchacars || 0,
                        this.todayupcars = a.todayupcars || 0, this.todaytlevel = a.todaytlevel || 0, this.todaymaxscore = a.todaymaxscore || 0,
                        this.todayvideos = a.todayvideos || 0, this.todayfuhuos = a.todayfuhuos || 0;
                }, userData.checkGameTime = function () {
                    var a = !0,
                        e = new Date(this.serverTime),
                        t = e.getFullYear(),
                        i = e.getMonth(),
                        r = e.getDate(),
                        o = new Date(),
                        h = o.getFullYear(),
                        c = o.getMonth(),
                        g = o.getDate();
                    if (t == h && i == c && r == g) {
                        if (this.isOneDay = !0, this.lastGameTime) {
                            var p = this.lastGameTime.split("_"),
                                d = Number(p[0]),
                                l = Number(p[1]),
                                m = Number(p[2]);
                            h > d || h == d && c > l || h == d && c == l && g > m || (a = !1);
                        }
                    } else this.isOneDay = !1, a = !1, n.platform.instance.showToast("同步服务器失败，请修正手机时间");
                    a ? (this.lastGameTime = h + "_" + c + "_" + g, this.todaygold = 0, this.todaywudi = 0,
                        this.todaychacars = 0, this.todaylchacars = 0, this.todayupcars = 0, this.todaytlevel = 0,
                        this.todaymaxscore = 0, this.todayvideos = 0, this.todayfuhuos = 0, s.taskManager.freshTodayTask()) : s.taskManager.initTodayTask(),
                        s.taskManager.saveLocalData();
                }, userData.saveLocalData = function () {
                    var a = {
                        mute: this.mute,
                        virbort: this.virbort,
                        lastGameTime: this.lastGameTime,
                        todaygold: this.todaygold,
                        todaywudi: this.todaywudi,
                        todaychacars: this.todaychacars,
                        todaylchacars: this.todaylchacars,
                        todayupcars: this.todayupcars,
                        todaytlevel: this.todaytlevel,
                        todaymaxscore: this.todaymaxscore,
                        todayvideos: this.todayvideos,
                        todayfuhuos: this.todayfuhuos
                    };
                    d.storageManager.setStorage(r.GameStorage.player, a);
                }, userData.upLevel = function () {
                    this.level += 1, this.level - 1 < h.configData.taskLevel && o.eventManager.instance.emitEvent(r.GameEvent.changeShowTask, "task"),
                        this.level - 1 < h.configData.garageLevel && o.eventManager.instance.emitEvent(r.GameEvent.changeShowTask, "car");
                    Laya.LocalStorage.setItem("userDatalevel", this.level);
                }, userData.upCarLevel = function (a) {
                    this.carInfo[a] = this.carInfo[a] + 1, l.currgameData.setGoldBei();
                    var str = JSON.stringify(this.carInfo);
                    Laya.LocalStorage.setItem("mycarInfo", str);
                }, userData.changeSound = function () {
                    this.mute = !this.mute, this.saveLocalData();
                }, userData.changeVirbort = function () {
                    this.virbort = !this.virbort, this.saveLocalData();
                }, userData.getConfigData = function () {
                    n.platform.instance.request("getConfig", {
                        scene_id: Number(this.loginScene)
                    }, function (a) {
                        var e = a.upconfig_free_share_video.split(","),
                            t = Number(e[0]),
                            n = Number(e[1]),
                            i = Number(e[2]);
                        this.freeUptimes = t, this.shareUptimes = n, this.videoUptimes = i, this.jiesuanVtS = Number(a.jiesuanVtS),
                            this.freeJump = Number(a.jumpfailevel);
                        var r = a.default_share_banner.split(","),
                            o = r[0],
                            s = r[1],
                            g = a.version,
                            p = h.configData.gameversion;
                        if (a.hasOwnProperty("shareSwitch") && (o = a.shareSwitch), a.hasOwnProperty("bannerSwitch") && (s = a.bannerSwitch),
                            console.warn("bs", s, o), o) {
                            var d = a.fuhuoShare;
                            userData.fuhuoShare = 1 == d;
                        } else userData.fuhuoShare = !1;
                        if (1 == o)
                            if (g == p) {
                                var l = a.share;
                                userData.canshare = 1 == l;
                            } else userData.canshare = !0;
                        else userData.canshare = !1;
                        if (1 == s)
                            if (g == p) {
                                var m = a.bannerTouch;
                                userData.bannerTouch = 1 == m;
                            } else userData.bannerTouch = !0;
                        else userData.bannerTouch = !1;
                        var u = a.delayBannerTime.split(","),
                            f = Number(a.bannerTime);
                        this.changeCreateAd(u, this.banner_video_data, f), c.tryGameData.getData();
                    }.bind(this), function (a) {
                        this.changeCreateAd([1e3, 900, 1e3], this.banner_video_data, 1e4), c.tryGameData.getData();
                    }.bind(this));
                }, userData.changeCreateAd = function (a, e, t) {
                    g.adManager.delayBannerFuhuo = Number(a[0]), g.adManager.delayBannerJinbi = Number(a[1]),
                        g.adManager.delayBannerSette = Number(a[2]);
                    var n = e.banner,
                        i = e.video;
                    g.adManager.bannerId = n.default, g.adManager.videoId = i.default, g.adManager.fuhuoBannerId = n.fuhuo,
                        g.adManager.jiesuanBannerId = n.jiesuan, g.adManager.jinbiBannerId = n.jinbi, g.adManager.loopBannerTime = Number(t),
                        h.configData.haveAd ? (g.adManager.createBanner(), g.adManager.createVideo()) : o.eventManager.instance.emitEvent(r.GameEvent.addTpro, .1);
                }, userData.getShareConfig = function () {
                    n.platform.instance.request("shareData", null, function (a) {
                        var e = a.shareContent;
                        i.shareManager.shareData = e;
                        for (var t = "", s = "", h = 0; h < e.length; h++) {
                            var c = e[h];
                            if (c.share_id == r.ShareType.default) {
                                t = c.share_title, s = c.share_img;
                                break;
                            }
                        }
                        var g = "share_id=" + r.ShareType.default + "&share_user_id=" + userData.id;
                        n.platform.instance.onShareAppMessage(t, s, g), o.eventManager.instance.emitEvent(r.GameEvent.addTpro, .1);
                    }.bind(this), function () {
                        o.eventManager.instance.emitEvent(r.GameEvent.addTpro, .1);
                    }.bind(this), "GET");
                }, userData.addGameGold = function (a, e, t) {
                    // var i = {
                    //     gold: a
                    // };
                    // n.platform.instance.request("getGold", i, e, t);
                    this.gold = this.gold + a;

                }, userData.solveTaskData = function (a, e, t) {
                    var i = "POST",
                        r = {};
                    if ("get" == a) i = "TGET";
                    else {
                        i = "POST";
                        var o = ["g_" + this.hisGetGold, "w_" + this.wudis, "c_" + this.chacars, "l_" + this.lchacars, "f_" + this.fuhuos, "v_" + this.videos];
                        r.data = o.join(";");
                    }
                    n.platform.instance.request("accountData", r, e, t, i);
                }, userData.addGameWudis = function (a) {
                    this.wudis += a;
                }, userData.addGameChacars = function (a) {
                    this.chacars += a;
                }, userData.addGameLchacars = function (a) {
                    this.lchacars += a;
                }, userData.addGameFuhuos = function (a) {
                    this.fuhuos += a;
                }, userData.addGameVideos = function (a) {
                    this.videos += a;
                }, userData.addVideos = function () {
                    this.videos += 1, this.saveTaskPro();
                }, userData.saveTaskPro = function () {
                    this.solveTaskData("post", function (a) { }.bind(this), function (a) { }.bind(this)),
                        s.taskManager.updateAchieve();
                }, userData.freshTodayTask = function (a, e, t, n, i, r, o, h) {
                    this.todaygold += a, this.todaywudi += e, this.todaychacars += t, this.todaylchacars += n,
                        this.todayfuhuos += i, this.todayvideos += r, o > userData.maxScore && (this.todaymaxscore += 1),
                        "success" == h && (this.todaytlevel += 1), s.taskManager.updateTodayTask(), this.saveLocalData();
                }, userData.freshUplevel = function () {
                    this.todayupcars += 1, s.taskManager.updateTodayTask(), this.saveLocalData();
                }, userData.freshVideo = function () {
                    this.todayvideos += 1, s.taskManager.updateTodayTask(), this.saveLocalData();
                }, userData.level = 1, userData.maxScore = 0, userData.gold = 100, userData.is_collect = 2,
                    userData.carInfo = {}, userData.avatar = "", userData.fuhuoShare = !1, userData.canshare = !1,
                    userData.bannerTouch = !1, userData.openServer = !0, userData.todaygold = 0, userData.todaywudi = 0,
                    userData.todaychacars = 0, userData.todaylchacars = 0, userData.todayupcars = 0,
                    userData.todaytlevel = 0, userData.todaymaxscore = 0, userData.todayvideos = 0,
                    userData.todayfuhuos = 0, userData.awardGold = 0, userData.isOneDay = !1, userData.banner_video_data = {
                        banner: {
                            default: "adunit-9e322b1cb7446e6f",
                            fuhuo: "adunit-9e322b1cb7446e6f",
                            jinbi: "adunit-9e322b1cb7446e6f",
                            jiesuan: "adunit-9e322b1cb7446e6f"
                        },
                        video: {
                            default: "adunit-9a9a2d0965c68de5"
                        }
                    }, userData.hisGetGold = 0, userData.wudis = 0, userData.chacars = 0, userData.lchacars = 0,
                    userData.fuhuos = 0, userData.videos = 0, userData;
            }();
        t.userData = m;
    }, {
        "../configData": 3,
        "../manager/adManager": 19,
        "../manager/eventManager": 21,
        "../manager/shareManager": 22,
        "../manager/storageManager": 25,
        "../manager/tableManager": 26,
        "../manager/taskManager": 27,
        "../platform/platform": 55,
        "./currgameData": 4,
        "./gameEnum": 5,
        "./tryGameData": 6
    }],
    8: [function (a, e, t) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var n = a("../manager/eventManager"),
            i = a("../data/gameEnum"),
            r = a("../data/currgameData"),
            o = a("../configData"),
            s = a("./oneChaRoadComp"),
            h = a("./imoveCar"),
            c = a("../data/userData"),
            g = a("../platform/platform"),
            p = function (a) {
                function carRoad() {
                    var e = a.call(this) || this;
                    return e.nowteam = [], e.moveteam = [], e.camroa1 = new Laya.Quaternion(0, 0, 0, 1),
                        e.camroa2 = new Laya.Quaternion(0, 0, 0, 1), e.emitNums = 0, e.canEmitCar = !0,
                        e.moveCamPos = [], e.camPianZ = 15, e.camPianX = 20, e.nextWudi = !1, e;
                }
                return __extends(carRoad, a), carRoad.prototype.onAwake = function () {
                    this.carRoad = this.owner;
                    var a = new Laya.Quaternion(0, 0, 0, 1);
                    a.rotateX(-Math.PI / 4, this.camroa1);
                    var e = new Laya.Quaternion(0, 0, 0, 1);
                    a.rotateY(Math.PI / 2, e), e.rotateX(-Math.PI / 4, this.camroa2), this.addEvent();
                }, carRoad.prototype.emitCar = function () {
                    this.emitNums += 1, this.emitNums > this.nowteam.length && (this.emitNums = this.nowteam.length),
                        this.startCar();
                }, carRoad.prototype.startCar = function () {
                    if (this.nowteam.length > 0 && (this.canEmitCar && this.emitNums > 0 || r.currgameData.invincible)) {
                        this.moveteam.length < 1 && n.eventManager.instance.emitEvent(i.GameEvent.chartManage, ["reset"]),
                            this.emitNums > 0 && (this.emitNums -= 1), this.canEmitCar = !1;
                        var a = this.nowteam.shift(); -
                            1 == this.moveteam.indexOf(a) && this.moveteam.push(a);
                        var e = this.carRoad.getChildAt(r.currgameData.chaRoadIdx),
                            t = e.numChildren,
                            c = this.starTeamLeng - t,
                            g = a - c;
                        e.getChildAt(g).getComponent(h.imoveCar).changeMove(h.carMove.turn);
                        var p, d, l = r.currgameData.roadnums,
                            m = this.carRoad.getChildAt(r.currgameData.chaRoadIdx).getComponent(s.oneChaRoadComp);
                        0 == m.chaIdx % 2 ? (p = l, d = 1) : (p = -1, d = -1);
                        for (var u = -m.lie * o.configData.kz, f = p * o.configData.kw - o.configData.kw * d / 2, v = o.configData.padding1, y = v, b = 0; b < this.nowteam.length; b++) {
                            var D = this.nowteam[b] - c,
                                w = e.getChildAt(D).getComponent(h.imoveCar),
                                x = w.carZ,
                                k = new Laya.Vector3(f + d * (y + x / 2), o.configData.kw * o.configData.carposy, u),
                                M = 0 == b;
                            w.changeMove(h.carMove.move1, k, M), y += v + x, k = null;
                        }
                    }
                }, carRoad.prototype.onUpdate = function () {
                    var a = Date.now();
                    if ("move" == this.camtype) {
                        var e, t, n, i, r = a - this.nextTime;
                        r > o.configData.frameTime && (r = o.configData.frameTime), this.camtime += r;
                        for (var s = 0; s < this.moveCamPos.length; s++) {
                            var h = this.moveCamPos[s],
                                c = h[1];
                            if (this.camtime <= c) {
                                e = h[0], t = h[1], n = h[2], i = h[3];
                                break;
                            }
                        }
                        if (this.camtime >= this.camneedtime && (this.camtime = this.camneedtime, this.changeCameraPos("stop"),
                            this.changeNextRoad()), t) {
                            var g = (this.camtime - e) / (t - e),
                                p = new Laya.Vector3(0, 0, 0);
                            Laya.Vector3.lerp(n, i, g, p), this.camera.transform.position = p, p = null;
                        }
                    }
                    this.nextTime = a;
                }, carRoad.prototype.addOneChaRoad = function () {
                    for (var a = [], e = 0; e < arguments.length; e++) a[e] = arguments[e];
                    var t = a[0],
                        n = (r.currgameData.roadnums, a[1]),
                        i = new Laya.Sprite3D();
                    if (this.carRoad.addChild(i), i.addComponent(s.oneChaRoadComp).initData(t, n), 0 == n) {
                        this.changeCameraPos("start");
                        for (var o = i.numChildren, h = 0; h < o; h++) this.nowteam.push(h);
                        this.starTeamLeng = this.nowteam.length;
                    }
                }, carRoad.prototype.changeNextRoad = function () {
                    r.currgameData.changeExplosion(), this.moveteam = [], this.nowteam = [], r.currgameData.chaRoadIdx += 1;
                    for (var a = this.carRoad.getChildAt(r.currgameData.chaRoadIdx).numChildren, e = 0; e < a; e++) this.nowteam.push(e);
                    this.starTeamLeng = this.nowteam.length, this.canEmitCar = !0, this.emitNums = 0,
                        r.currgameData.invincible && this.startCar();
                }, carRoad.prototype.setFollowCamera = function (a) {
                    this.camera = a;
                }, carRoad.prototype.changeCameraPos = function () {
                    for (var a = [], e = 0; e < arguments.length; e++) a[e] = arguments[e];
                    var t = a[0];
                    if ("start" == t) {
                        var n, i = this.getChaRoadPos();
                        n = 0 == r.currgameData.cameraType ? this.camroa1.clone() : this.camroa2.clone(),
                            console.log("调整照相机朝向"), this.camera.transform.rotation = n, this.camera.transform.position = i,
                            i = null, n = null;
                    } else if ("move" == t) {
                        this.camnpos = this.camera.transform.position.clone(), this.camtime = 0, this.moveCamPos = [];
                        var h, c, g = r.currgameData.chaRoadIdx,
                            p = a[1],
                            d = (r.currgameData.charoad[g],
                                r.currgameData.charoad[p], this.carRoad.getChildAt(p).getComponent(s.oneChaRoadComp)),
                            l = d.lie;
                        0 == r.currgameData.cameraType ? (h = (-l + this.camPianZ) * o.configData.kz, c = new Laya.Vector3(this.camnpos.x, this.camnpos.y, h)) : (h = -l * o.configData.kz,
                            c = new Laya.Vector3(this.camnpos.x, this.camnpos.y, h));
                        var m = Laya.Vector3.distance(this.camnpos, c),
                            u = o.configData.kw * o.configData.carSpeed * o.configData.camSpeed,
                            f = Math.ceil(m / u);
                        this.moveCamPos.push([0, f, this.camnpos, c]);
                        var v, y = d.chaIdx % 2,
                            b = r.currgameData.roadnums * o.configData.kw,
                            D = Math.ceil(b / u);
                        v = 0 == y ? new Laya.Vector3(c.x + b, c.y, c.z) : new Laya.Vector3(c.x - b, c.y, c.z),
                            this.camneedtime = f + D, this.moveCamPos.push([f, D + f, c, v]);
                    }
                    this.camtype = t, "stop" == this.camtype && r.currgameData.changeIncamtra(!1);
                }, carRoad.prototype.getChaRoadPos = function (a) {
                    void 0 === a && (a = 0);
                    var e, t, n, i = this.carRoad.getChildAt(a).getComponent(s.oneChaRoadComp),
                        h = i.lie,
                        c = i.chaIdx,
                        g = r.currgameData.roadnums;
                    if (0 == c % 2 ? (e = g, t = 1) : (e = -1, t = -1), 0 == r.currgameData.cameraType) {
                        var p = (-h + this.camPianZ) * o.configData.kz,
                            d = e * o.configData.kw - o.configData.kw * t / 2,
                            l = this.camera.transform.position.y;
                        n = new Laya.Vector3(d, l, p);
                    } else if (1 == r.currgameData.cameraType) {
                        p = -h * o.configData.kz, d = (e + this.camPianX) * o.configData.kw - o.configData.kw * t / 2,
                            l = this.camera.transform.position.y;
                        n = new Laya.Vector3(d, l, p);
                    }
                    return n;
                }, carRoad.prototype.readyEmitNextCar = function () {
                    for (var a = [], e = 0; e < arguments.length; e++) a[e] = arguments[e];
                    this.canEmitCar = !0, this.startCar();
                }, carRoad.prototype.changeMoveTeam = function (a) {
                    g.platform.instance.vibrate("short"), this.moveteam.length > 0 && r.currgameData.addChacar(),
                        this.moveteam.shift();
                    var e = r.currgameData.chaRoadIdx + 1;
                    if (this.nowteam.length < 1 && this.moveteam.length < 1)
                        if (this.nextWudi ? (this.nextWudi = !1,
                            r.currgameData.changeInvincible(!0), r.currgameData.addWudi()) : r.currgameData.changeInvincible(!1),
                            n.eventManager.instance.emitEvent(i.GameEvent.chartManage, ["reset"]), e >= r.currgameData.charoad.length) {
                            var t = o.configData.kw * r.currgameData.roadnums / 2,
                                s = 2 * o.configData.kw,
                                h = -r.currgameData.charoad[r.currgameData.chaRoadIdx] * o.configData.kz,
                                p = new Laya.Vector3(t, s, h);
                            n.eventManager.instance.emitEvent(i.GameEvent.addEffect, ["success", p]), c.userData.upLevel(),
                                n.eventManager.instance.emitEvent(i.GameEvent.openJiesuan, "success");
                        } else r.currgameData.changeIncamtra(!0), this.changeCameraPos("move", e);
                    r.currgameData.addCurrScore(a);
                    for (var d = 0, l = this.nowteam.length + this.moveteam.length, m = 0; m < r.currgameData.chacars.length; m++) {
                        var u = r.currgameData.chacars[m];
                        d += u, m >= e && (l += u);
                    }
                    var f = Math.ceil((d - l) / d * 100) / 100;
                    n.eventManager.instance.emitEvent(i.GameEvent.changeLpro, f), r.currgameData.addCurrGold(1);
                }, carRoad.prototype.resetGame = function () {
                    this.emitNums = 0, this.canEmitCar = !0, this.nowteam = [], this.moveteam = [];
                    for (var a = this.carRoad.numChildren - 1; a > -1; a--) {
                        for (var e = this.carRoad.getChildAt(a), t = e.numChildren - 1; t > -1; t--) {
                            e.getChildAt(t).getComponent(h.imoveCar).recovery();
                        }
                        e.destroy();
                    }
                    r.currgameData.invincible && r.currgameData.changeInvincible(!1), this.nextWudi = !1,
                        r.currgameData.changeExplosion(), r.currgameData.receive = 0, r.currgameData.wudis = 0,
                        r.currgameData.gchacars = 0, r.currgameData.lchacars = 0, r.currgameData.gvideos = 0,
                        r.currgameData.currgold = 0, r.currgameData.changeIncamtra(!1);
                }, carRoad.prototype.fuhuo = function () {
                    var a, e, t, c = this.carRoad.getChildAt(r.currgameData.chaRoadIdx),
                        g = c.getComponent(s.oneChaRoadComp),
                        p = r.currgameData.roadnums,
                        d = g.chaIdx,
                        l = g.lie,
                        m = d % 2,
                        u = new Laya.Quaternion(0, 0, 0, 1),
                        f = new Laya.Quaternion(0, 0, 0, 1);
                    0 == m ? (e = p, t = 1, p - 1, u.rotateY(-Math.PI / 2, f)) : (e = -1, t = -1, 0,
                        u.rotateY(Math.PI / 2, f));
                    var v = -l * o.configData.kz,
                        y = e * o.configData.kw - o.configData.kw * t / 2,
                        b = o.configData.padding1,
                        D = b;
                    (a = this.nowteam).unshift.apply(a, this.moveteam), this.moveteam = [];
                    for (var w = c.numChildren, x = this.starTeamLeng - w, k = 0; k < this.nowteam.length; k++) {
                        var M = this.nowteam[k] - x,
                            C = c.getChildAt(M).getComponent(h.imoveCar),
                            I = C.carZ,
                            E = new Laya.Vector3(y + t * (D + I / 2), o.configData.kw * o.configData.carposy, v),
                            S = f.clone();
                        C.setCarPos(E, S), D += b + I;
                    }
                    for (var L = this.carRoad.numChildren - 1, G = 0; G < L && G < r.currgameData.chaRoadIdx; G++) {
                        var T = this.carRoad.getChildAt(G),
                            _ = T.numChildren - 1;
                        if (_ > 0)
                            for (var B = _; B > -1; B--) {
                                T.getChildAt(B).getComponent(h.imoveCar).recovery();
                            }
                    }
                    n.eventManager.instance.emitEvent(i.GameEvent.chartManage, ["reset"]), this.emitNums = 0,
                        this.canEmitCar = !0;
                }, carRoad.prototype.changeWudi = function () {
                    r.currgameData.invincible || (this.nowteam.length > 0 ? (this.nextWudi = !1, r.currgameData.changeInvincible(!0),
                        r.currgameData.addWudi(), this.canEmitCar && this.startCar()) : this.nextWudi = !0);
                }, carRoad.prototype.addEvent = function () {
                    n.eventManager.instance.onEvent(i.GameEvent.addOneChaRoad, this, this.addOneChaRoad),
                        n.eventManager.instance.onEvent(i.GameEvent.changeCameraPos, this, this.changeCameraPos),
                        n.eventManager.instance.onEvent(i.GameEvent.emitCar, this, this.emitCar), n.eventManager.instance.onEvent(i.GameEvent.readyEmitNextCar, this, this.readyEmitNextCar),
                        n.eventManager.instance.onEvent(i.GameEvent.changeMoveTeam, this, this.changeMoveTeam),
                        n.eventManager.instance.onEvent(i.GameEvent.resetGame, this, this.resetGame), n.eventManager.instance.onEvent(i.GameEvent.fuhuo, this, this.fuhuo),
                        n.eventManager.instance.onEvent(i.GameEvent.changeWudi, this, this.changeWudi);
                }, carRoad.prototype.removeEvent = function () {
                    n.eventManager.instance.offEvent(i.GameEvent.addOneChaRoad, this, this.addOneChaRoad),
                        n.eventManager.instance.offEvent(i.GameEvent.changeCameraPos, this, this.changeCameraPos),
                        n.eventManager.instance.offEvent(i.GameEvent.emitCar, this, this.emitCar), n.eventManager.instance.offEvent(i.GameEvent.readyEmitNextCar, this, this.readyEmitNextCar),
                        n.eventManager.instance.offEvent(i.GameEvent.changeMoveTeam, this, this.changeMoveTeam),
                        n.eventManager.instance.offEvent(i.GameEvent.resetGame, this, this.resetGame), n.eventManager.instance.offEvent(i.GameEvent.fuhuo, this, this.fuhuo),
                        n.eventManager.instance.offEvent(i.GameEvent.changeWudi, this, this.changeWudi);
                }, carRoad.prototype.onDestroy = function () {
                    this.removeEvent();
                }, carRoad;
            }(Laya.Script3D);
        t.carRoad = p;
    }, {
        "../configData": 3,
        "../data/currgameData": 4,
        "../data/gameEnum": 5,
        "../data/userData": 7,
        "../manager/eventManager": 21,
        "../platform/platform": 55,
        "./imoveCar": 14,
        "./oneChaRoadComp": 16
    }],
    9: [function (a, e, t) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var n = a("../manager/assectManager"),
            i = a("../manager/eventManager"),
            r = a("../data/gameEnum"),
            o = a("./imoveCar"),
            s = a("../manager/tableManager"),
            h = function (a) {
                function carmods() {
                    var e = a.call(this) || this;
                    return e.chaCars = [], e.chaGl = 0, e.roadCars = [], e.roadGl = 0, e.bianhao = 0,
                        e;
                }
                return __extends(carmods, a), carmods.prototype.onAwake = function () {
                    this.allcarmods = this.owner, n.assectManager.loadPerfab("carmods", function (a) {
                        this.allcarmods = a, this.addCarsComp(), i.eventManager.instance.emitEvent(r.GameEvent.perfabReady, "carmods"),
                            this.addEvent();
                    }.bind(this));
                    var a = s.default.getInstance().getTableData("cars");
                    for (var e in a) {
                        var t = a[e],
                            o = t.carname;
                        if ("Car_E" != o) {
                            var h = t.chagl,
                                c = t.emitgl;
                            this.chaCars.push([o, this.chaGl]), this.roadCars.push([o, this.roadGl]), this.chaGl += h,
                                this.roadGl += c;
                        }
                    }
                }, carmods.prototype.addCarsComp = function () {
                    for (var a = this.allcarmods.numChildren, e = 0; e < a; e++) {
                        this.allcarmods.getChildAt(e).addComponent(o.imoveCar);
                    }
                }, carmods.prototype.addOneCar = function () {
                    for (var a = [], e = 0; e < arguments.length; e++) a[e] = arguments[e];
                    var t, n, s = a[0],
                        h = a[1];
                    if ("charoad" == h) {
                        t = Math.random() * this.chaGl;
                        for (var c = 0; c < this.chaCars.length; c++) {
                            if (!(t >= this.chaCars[c][1])) break;
                            n = this.chaCars[c][0];
                        }
                    } else if ("speedroad" == h) {
                        t = Math.random() * this.roadGl;
                        for (c = 0; c < this.roadCars.length; c++) {
                            if (!(t >= this.roadCars[c][1])) break;
                            n = this.roadCars[c][0];
                        }
                    }
                    var g = this.allcarmods.getChildByName(n),
                        p = Laya.MeshSprite3D.instantiate(g);
                    if (p.getComponent(o.imoveCar).setBianHao(this.bianhao), this.bianhao += 1, s.addChild(p),
                        "charoad" == h) {
                        var d = a[2];
                        i.eventManager.instance.emitEvent(r.GameEvent.addChaCar, d);
                    }
                }, carmods.prototype.rePushCar = function () {
                    for (var a = [], e = 0; e < arguments.length; e++) a[e] = arguments[e];
                    a[0].destroy();
                }, carmods.prototype.addEvent = function () {
                    i.eventManager.instance.onEvent(r.GameEvent.addOneCar, this, this.addOneCar), i.eventManager.instance.onEvent(r.GameEvent.rePushCar, this, this.rePushCar);
                }, carmods.prototype.removeEvent = function () {
                    i.eventManager.instance.offEvent(r.GameEvent.addOneCar, this, this.addOneCar), i.eventManager.instance.offEvent(r.GameEvent.rePushCar, this, this.rePushCar);
                }, carmods.prototype.onDestroy = function () {
                    this.removeEvent();
                }, carmods;
            }(Laya.Script3D);
        t.carmods = h;
    }, {
        "../data/gameEnum": 5,
        "../manager/assectManager": 20,
        "../manager/eventManager": 21,
        "../manager/tableManager": 26,
        "./imoveCar": 14
    }],
    10: [function (a, e, t) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var n = a("../manager/assectManager"),
            i = a("../manager/eventManager"),
            r = a("../data/gameEnum"),
            o = a("./goldComp"),
            s = a("../configData"),
            h = function (a) {
                function effectComp() {
                    var e = a.call(this) || this;
                    return e.flyJibiTime = 800, e.arrPen = [], e.goldArr = [], e.wudiArr = [], e.flygoldArr = [],
                        e.flywudiArr = [], e.flymoneyArr = [], e.flybmoneyArr = [], e.scoreArr = [], e;
                }
                return __extends(effectComp, a), effectComp.prototype.onAwake = function () {
                    this.effectBox = this.owner, n.assectManager.loadPerfab1("effects", function (a) {
                        this.sucEffect = a.getChildByName("ConfettiBlastRainbow"), this.jinbi = a.getChildByName("jibi"),
                            this.jinbi.addComponent(o.goldComp), this.flyjinbi = a.getChildByName("jibi03"),
                            this.rmb = a.getChildByName("RMB"), this.rmb1 = a.getChildByName("RMB1"), this.smoke = a.getChildByName("smoke"),
                            this.explosion = a.getChildByName("Explosion"), this.score = a.getChildByName("score");
                        var e = this.jinbi.getChildAt(0);
                        this.goldmatera = e.skinnedMeshRenderer.sharedMaterial.clone(), this.wudimatera = this.goldmatera.clone(),
                            Laya.Texture2D.load("res/LayaScene_trafficscene/Conventional/Assets/Life/Life.jpg", Laya.Handler.create(this, function (a) {
                                this.wudimatera.albedoTexture = a;
                            })), i.eventManager.instance.emitEvent(r.GameEvent.perfabReady, "effect");
                    }.bind(this)), this.addEvent();
                }, effectComp.prototype.addSucEffect = function (a) {
                    this.effectBox.addChild(this.sucEffect), this.sucEffect.transform.position = a,
                        this.sucEffect.particleSystem.looping = !1, this.sucEffect.particleSystem.play();
                }, effectComp.prototype.addPenEffect = function (a) {
                    if (this.arrPen.length < 1) {
                        var e = Laya.ShuriKenParticle3D.instantiate(this.smoke);
                        this.arrPen.push(e);
                    }
                    var t = this.arrPen.shift();
                    a.addChild(t), t.transform.localPosition = new Laya.Vector3(0, 0, 0);
                }, effectComp.prototype.addGoldsp = function () {
                    for (var a = [], e = 0; e < arguments.length; e++) a[e] = arguments[e];
                    var t = a[0];
                    if (this.goldArr.length < 1) {
                        var n = Laya.Sprite3D.instantiate(this.jinbi);
                        this.goldArr.push(n);
                    }
                    var i = this.goldArr.shift();
                    i.getChildAt(0).skinnedMeshRenderer.sharedMaterial = this.goldmatera, t.addChild(i),
                        i.name = "jibi";
                }, effectComp.prototype.addWuDisp = function () {
                    for (var a = [], e = 0; e < arguments.length; e++) a[e] = arguments[e];
                    var t = a[0];
                    if (this.wudiArr.length < 1) {
                        var n = Laya.Sprite3D.instantiate(this.jinbi);
                        this.wudiArr.push(n);
                    }
                    var i = this.wudiArr.shift();
                    i.getChildAt(0).skinnedMeshRenderer.sharedMaterial = this.wudimatera, t.addChild(i),
                        i.name = "wudi";
                }, effectComp.prototype.addFlyGold = function () {
                    for (var a = [], e = 0; e < arguments.length; e++) a[e] = arguments[e];
                    if (this.flygoldArr.length < 1) {
                        var t = Laya.Sprite3D.instantiate(this.flyjinbi);
                        this.flygoldArr.push(t);
                    }
                    var n = this.flygoldArr.shift();
                    n.getChildAt(0).skinnedMeshRenderer.sharedMaterial = this.goldmatera;
                    var i = a[0];
                    this.effectBox.addChild(n), n.transform.position = i, n.getComponent(Laya.Animator).play("default", 0, 0),
                        Laya.timer.once(this.flyJibiTime, this, function () {
                            this.rePushEffect("flygold", n);
                        }, null, !1);
                }, effectComp.prototype.addFlyWudi = function () {
                    for (var a = [], e = 0; e < arguments.length; e++) a[e] = arguments[e];
                    if (this.flywudiArr.length < 1) {
                        var t = Laya.Sprite3D.instantiate(this.flyjinbi);
                        this.flywudiArr.push(t);
                    }
                    var n = this.flywudiArr.shift();
                    n.getChildAt(0).skinnedMeshRenderer.sharedMaterial = this.wudimatera;
                    var i = a[0];
                    this.effectBox.addChild(n), n.transform.position = i, n.getComponent(Laya.Animator).play("default", 0, 0),
                        Laya.timer.once(this.flyJibiTime, this, function () {
                            this.rePushEffect("flywudi", n);
                        }, null, !1);
                }, effectComp.prototype.addFlyMoney = function () {
                    for (var a = [], e = 0; e < arguments.length; e++) a[e] = arguments[e];
                    var t, n = a[1];
                    if ("lit" == n) {
                        if (this.flymoneyArr.length < 1) {
                            var i = Laya.ShuriKenParticle3D.instantiate(this.rmb);
                            this.flymoneyArr.push(i);
                        }
                        t = this.flymoneyArr.shift();
                    } else if ("big" == n) {
                        if (this.flybmoneyArr.length < 1) {
                            i = Laya.ShuriKenParticle3D.instantiate(this.rmb1);
                            this.flybmoneyArr.push(i);
                        }
                        t = this.flybmoneyArr.shift();
                    }
                    var r = a[0];
                    r.y += s.configData.kw, this.effectBox.addChild(t), t.transform.position = r, t.particleSystem.play(),
                        t.particleSystem.looping = !1, Laya.timer.once(3e3, this, function () {
                            t.removeSelf(), "lit" == n ? this.flymoneyArr.push(t) : "big" == n && this.flybmoneyArr.push(t);
                        });
                }, effectComp.prototype.addBaoZha = function (a) {
                    this.effectBox.addChild(this.explosion), this.explosion.transform.position = a,
                        this.explosion.particleSystem.looping = !1, this.explosion.particleSystem.play();
                    for (var e = this.explosion.numChildren, t = 0; t < e; t++) {
                        var n = this.explosion.getChildAt(t);
                        n.particleSystem.looping = !1, n.particleSystem.play();
                    }
                }, effectComp.prototype.addScoresp = function () {
                    for (var a = [], e = 0; e < arguments.length; e++) a[e] = arguments[e];
                    var t = a[0],
                        n = a[1];
                    if (this.scoreArr.length < 1) {
                        var i = Laya.ShuriKenParticle3D.instantiate(this.score);
                        this.scoreArr.push(i);
                    }
                    var r = this.scoreArr.shift();
                    this.effectBox.addChild(r), r.name = t + "-" + n, r.transform.position = new Laya.Vector3(0, 0, 0),
                        r.particleSystem.play(), r.particleSystem.startDelay = 0, r.particleSystem.looping = !1;
                }, effectComp.prototype.addEffect = function () {
                    for (var a = [], e = 0; e < arguments.length; e++) a[e] = arguments[e];
                    var t = a[0];
                    if ("success" == t) {
                        var n = a[1];
                        this.addSucEffect(n);
                    } else if ("pen" == t) {
                        var i = a[1];
                        this.addPenEffect(i);
                    } else if ("gold" == t) {
                        i = a[1];
                        this.addGoldsp(i);
                    } else if ("wudi" == t) {
                        i = a[1];
                        this.addWuDisp(i);
                    } else if ("flygold" == t) {
                        var r = a[1];
                        this.addFlyGold(r);
                    } else if ("flyWudi" == t) {
                        r = a[1];
                        this.addFlyWudi(r);
                    } else if ("flymoney" == t) {
                        r = a[1];
                        this.addFlyMoney(r, "lit");
                    } else if ("bflymoney" == t) {
                        r = a[1];
                        this.addFlyMoney(r, "big");
                    } else if ("baozha" == t) {
                        (r = a[1]).y += s.configData.kw / 2, this.addBaoZha(r);
                    } else if ("score" == t) {
                        var o = a[1],
                            h = a[2];
                        this.addScoresp(o, h);
                    }
                }, effectComp.prototype.rePushEffect = function () {
                    for (var a = [], e = 0; e < arguments.length; e++) a[e] = arguments[e];
                    var t = a[0];
                    if ("success" == t);
                    else if ("pen" == t);
                    else if ("gold" == t) {
                        var n = a[1];
                        this.rePushGold(n);
                    } else if ("flygold" == t) {
                        var i = a[1];
                        this.rePushFlyGold(i);
                    } else if ("flywudi" == t) {
                        var r = a[1];
                        this.rePushFlyWudi(r);
                    }
                }, effectComp.prototype.changeScorePos = function () {
                    for (var a = [], e = 0; e < arguments.length; e++) a[e] = arguments[e];
                    for (var t, n = a[0], i = a[1], r = a[2], o = this.effectBox.numChildren - 1, s = 0; s < o; s++) {
                        var h = this.effectBox.getChildAt(s),
                            c = h.name.split("-");
                        if (2 == c.length && i == c[0] && r == c[1]) {
                            t = h;
                            break;
                        }
                    }
                    if (t)
                        if ("setpos" == n) {
                            var g = a[3];
                            t.transform.position = g;
                        } else "removescore" == n && (t.name = "mscore", t.removeSelf(), this.scoreArr.push(t));
                }, effectComp.prototype.rePushGold = function () {
                    for (var a = [], e = 0; e < arguments.length; e++) a[e] = arguments[e];
                    var t = a[0];
                    t.removeSelf(), this.goldArr.push(t);
                }, effectComp.prototype.rePushFlyGold = function () {
                    for (var a = [], e = 0; e < arguments.length; e++) a[e] = arguments[e];
                    var t = a[0];
                    t.removeSelf(), this.flygoldArr.push(t);
                }, effectComp.prototype.rePushFlyWudi = function () {
                    for (var a = [], e = 0; e < arguments.length; e++) a[e] = arguments[e];
                    var t = a[0];
                    t.removeSelf(), this.flywudiArr.push(t);
                }, effectComp.prototype.addEvent = function () {
                    i.eventManager.instance.onEvent(r.GameEvent.addEffect, this, this.addEffect), i.eventManager.instance.onEvent(r.GameEvent.rePushEffect, this, this.rePushEffect),
                        i.eventManager.instance.onEvent(r.GameEvent.changeScorePos, this, this.changeScorePos);
                }, effectComp.prototype.removeEvent = function () { }, effectComp.prototype.onDestroy = function () {
                    this.removeEvent();
                }, effectComp;
            }(Laya.Script3D);
        t.effectComp = h;
    }, {
        "../configData": 3,
        "../data/gameEnum": 5,
        "../manager/assectManager": 20,
        "../manager/eventManager": 21,
        "./goldComp": 12
    }],
    11: [function (a, e, t) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var n = a("../manager/eventManager"),
            i = a("../data/gameEnum"),
            r = a("../manager/assectManager"),
            o = a("../configData"),
            s = a("../data/currgameData"),
            h = function (a) {
                function environment() {
                    var e = a.call(this) || this;
                    return e.leftceng = 10, e.rightceng = 10, e;
                }
                return __extends(environment, a), environment.prototype.onAwake = function () {
                    this.evbox = this.owner, r.assectManager.loadPerfab("envirs", function (a) {
                        this.allEnvirs = a, n.eventManager.instance.emitEvent(i.GameEvent.perfabReady, "environment");
                    }.bind(this)), this.addEvent();
                }, environment.prototype.setEnvirSprite = function () {
                    for (var a = [], e = 0; e < arguments.length; e++) a[e] = arguments[e];
                    a[0];
                    this.nowEnvir = this.allEnvirs.getChildByName("envir1");
                    var t = this.nowEnvir.getChildByName("builds").getChildByName("light");
                    this.useLight = t.getChildByName("Barrier_C");
                }, environment.prototype.addEnvirPanel = function () {
                    for (var a = [], e = 0; e < arguments.length; e++) a[e] = arguments[e];
                    var t = a[0],
                        n = a[1];
                    this.addBianPanel(t, "left"), this.addBianPanel(n, "right");
                }, environment.prototype.addOneBuild = function (a, e, t, n, i, r, h) {
                    var c, g = a[e].x,
                        p = a[e].sp,
                        d = Math.floor(Math.random() * a[e].nume),
                        l = p.getChildAt(d),
                        m = Laya.MeshSprite3D.instantiate(l),
                        u = g / 2 + t,
                        f = n - i / 2;
                    this.evbox.addChild(m), "left" == r ? (c = new Laya.Vector3(-(u + 1) * o.configData.kw, 0, -f * o.configData.kz),
                        m.transform.rotate(h, !1, !0)) : c = new Laya.Vector3((u + s.currgameData.roadnums) * o.configData.kw, 0, -f * o.configData.kz),
                        m.transform.position = c, c = null;
                }, environment.prototype.addBianPanel = function (a, e) {
                    var t = this.nowEnvir.getChildByName("panel");
                    if ("minLevel" == o.configData.sysStat)
                        for (var n = 0; n < a.length; n++) {
                            var i = (L = a[n])[0],
                                r = L[1],
                                h = "left" == e ? this.leftceng : this.rightceng,
                                c = -(i + ((z = r - i) - 1) / 2) * o.configData.kz,
                                g = h;
                            K = "left" == e ? -(g + 1) / 2 * o.configData.kw : (s.currgameData.roadnums + (g - 1) / 2) * o.configData.kw;
                            var p = Laya.Sprite3D.instantiate(t);
                            this.evbox.addChild(p), (H = p.transform.scale.clone()).x *= g, H.z *= z;
                            var d = new Laya.Vector3(K, 0, c);
                            p.transform.position = d, p.transform.scale = H, H = null, (F = p.getChildByName("Lane_0").meshRenderer.material).tilingOffsetX = Math.round(g / 2),
                                F.tilingOffsetY = Math.round(z / 2);
                        } else {
                        var l = this.nowEnvir.getChildByName("builds"),
                            m = l.getChildByName("mbigbox"),
                            u = l.getChildByName("bigbox"),
                            f = l.getChildByName("midbox"),
                            v = l.getChildByName("smlbox"),
                            y = l.getChildByName("lsmlbox"),
                            b = l.getChildByName("trees"),
                            D = m.numChildren,
                            w = u.numChildren,
                            x = f.numChildren,
                            k = v.numChildren,
                            M = y.numChildren,
                            C = b.numChildren,
                            I = [],
                            E = 0;
                        D > 0 && (I.push([E, "mbig"]), E += 1), w > 0 && (I.push([E, "big"]), E += 4),
                            x > 0 && (I.push([E, "mid"]), E += 4), k > 0 && (I.push([E, "sml"]), E += 2),
                            M > 0 && (I.push([E, "lsml"]), E += 1), C > 0 && (I.push([E, "trees"]), E += 5);
                        var S = {
                            mbig: {
                                x: 6,
                                z: 6,
                                sp: m,
                                nume: D
                            },
                            big: {
                                x: 4,
                                z: 4,
                                sp: u,
                                nume: w
                            },
                            mid: {
                                x: 2.5,
                                z: 2.5,
                                sp: f,
                                nume: x
                            },
                            sml: {
                                x: 1,
                                z: 1,
                                sp: v,
                                nume: k
                            },
                            lsml: {
                                x: 1,
                                z: 1,
                                sp: y,
                                nume: M
                            },
                            trees: {
                                x: 1.5,
                                z: 1.5,
                                sp: b,
                                nume: C
                            }
                        };
                        for (n = 0; n < a.length; n++) {
                            i = (L = a[n])[0], r = L[1], h = "left" == e ? this.leftceng : this.rightceng;
                            for (var L, G = "left" == e ? new Laya.Vector3(0, Math.PI, 0) : new Laya.Vector3(0, 0, 0), T = 1, _ = 0; _ < 1; _++)
                                for (var B = T, P = i + 1; P < r - 1;) {
                                    for (var A, U = Math.random() * E, V = 0; V < I.length; V++) {
                                        if (!(U > I[V][0])) break;
                                        A = I[V][1];
                                    }
                                    var O = S[A].z;
                                    if ((P += O) > r - 1) {
                                        var R = P - O,
                                            j = r - 1 - P + O;
                                        if (j >= 6) {
                                            if (S[A = "mbig"].nume > 0) {
                                                R += O = S[A].z;
                                                var N = S[A].x;
                                                T = Math.max(T, N), this.addOneBuild(S, A, B, R, O, e, G);
                                                break;
                                            }
                                            A = "big";
                                        }
                                        if (j > 4) {
                                            if (S[A = "big"].nume > 0) {
                                                R += O = S[A].z;
                                                N = S[A].x;
                                                T = Math.max(T, N), this.addOneBuild(S, A, B, R, O, e, G);
                                                break;
                                            }
                                            A = "mid";
                                        }
                                        if (j > 2.5) {
                                            if (S[A = "mid"].nume > 0) {
                                                R += O = S[A].z;
                                                N = S[A].x;
                                                T = Math.max(T, N), this.addOneBuild(S, A, B, R, O, e, G);
                                                break;
                                            }
                                            A = "trees";
                                        }
                                        if (j > 1.5) {
                                            if (S[A = "trees"].nume > 0) {
                                                R += O = S[A].z;
                                                N = S[A].x;
                                                T = Math.max(T, N), this.addOneBuild(S, A, B, R, O, e, G);
                                                break;
                                            }
                                            A = "sml";
                                        }
                                        if (j > 1) {
                                            if (S[A = "sml"].nume > 0) {
                                                R += O = S[A].z;
                                                N = S[A].x;
                                                T = Math.max(T, N), this.addOneBuild(S, A, B, R, O, e, G);
                                            }
                                            break;
                                        }
                                    } else {
                                        N = S[A].x;
                                        T = Math.max(T, N), this.addOneBuild(S, A, B, P, O, e, G);
                                    }
                                }
                            var z, K;
                            c = -(i + ((z = r - i) - 1) / 2) * o.configData.kz, g = h;
                            K = "left" == e ? -(g + 1) / 2 * o.configData.kw : (s.currgameData.roadnums + (g - 1) / 2) * o.configData.kw;
                            var H;
                            p = Laya.Sprite3D.instantiate(t);
                            this.evbox.addChild(p), (H = p.transform.scale.clone()).x *= g, H.z *= z;
                            var F;
                            d = new Laya.Vector3(K, 0, c);
                            p.transform.position = d, p.transform.scale = H, H = null, (F = p.getChildByName("Lane_0").meshRenderer.material).tilingOffsetX = Math.round(g / 2),
                                F.tilingOffsetY = Math.round(z / 2);
                        }
                    }
                }, environment.prototype.addLightPai = function () {
                    for (var a = [], e = 0; e < arguments.length; e++) a[e] = arguments[e];
                    var t = a[0],
                        n = a[1],
                        i = a[2];
                    if ("light" == n) {
                        var r, h;
                        "left" == t ? (r = -1 * o.configData.kw, h = new Laya.Vector3(0, -Math.PI / 2, 0)) : (r = s.currgameData.roadnums * o.configData.kw,
                            h = new Laya.Vector3(0, Math.PI / 2, 0));
                        var c = new Laya.Vector3(r, 0, -i * o.configData.kz),
                            g = Laya.MeshSprite3D.instantiate(this.useLight);
                        this.evbox.addChild(g), g.transform.rotate(h, !1, !0), g.transform.position = c;
                    }
                }, environment.prototype.resetGame = function () {
                    for (var a = this.evbox.numChildren - 1; a > -1; a--) {
                        this.evbox.getChildAt(a).destroy();
                    }
                }, environment.prototype.addEvent = function () {
                    n.eventManager.instance.onEvent(i.GameEvent.setEnvirSprite, this, this.setEnvirSprite),
                        n.eventManager.instance.onEvent(i.GameEvent.addEnvirPanel, this, this.addEnvirPanel),
                        n.eventManager.instance.onEvent(i.GameEvent.addLightPai, this, this.addLightPai),
                        n.eventManager.instance.onEvent(i.GameEvent.resetGame, this, this.resetGame);
                }, environment.prototype.removeEvent = function () { }, environment.prototype.onDestroy = function () {
                    this.removeEvent();
                }, environment;
            }(Laya.Script3D);
        t.environment = h;
    }, {
        "../configData": 3,
        "../data/currgameData": 4,
        "../data/gameEnum": 5,
        "../manager/assectManager": 20,
        "../manager/eventManager": 21
    }],
    12: [function (a, e, t) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var n = a("../data/currgameData"),
            i = a("../configData"),
            r = a("../manager/eventManager"),
            o = a("../data/gameEnum"),
            s = function (a) {
                function goldComp() {
                    var e = a.call(this) || this;
                    return e.moveTime = 0, e.roaSpeed = new Laya.Vector3(0, 1, 0), e;
                }
                return __extends(goldComp, a), goldComp.prototype.onAwake = function () {
                    this.gold = this.owner, this.anmtor = this.gold.getComponent(Laya.Animator);
                }, goldComp.prototype.setData = function (a, e, t, r) {
                    if (this.gold || (this.gold = this.owner), this.anmtor || (this.anmtor = this.gold.getComponent(Laya.Animator)),
                        this.anmtor) {
                        this.anmtor.speed = .5;
                        var o = Math.round(10 * Math.random()) / 10;
                        this.anmtor && this.anmtor.play("default", 0, o);
                    }
                    var s;
                    this.childIdx = t, this.nextPadding = r, this.inrow = e, this.moveTime = 0, a.y += i.configData.kw / 2,
                        this.gold.transform.position = a, this.toDir = n.currgameData.roaDir[this.inrow],
                        this.npos = this.gold.transform.position.clone(), s = "up" == this.toDir ? -n.currgameData.roadleng * i.configData.kz - this.npos.z : -this.npos.z,
                        this.tpos = new Laya.Vector3(this.npos.x, this.npos.y, this.npos.z + s), a = null,
                        this.addEvent();
                }, goldComp.prototype.onUpdate = function () {
                    var a = Date.now();
                    if (this.nextTime) {
                        if (this.childIdx) {
                            if (2 == n.currgameData.gameStat) {
                                var e = n.currgameData.stopPosInfo[0],
                                    t = n.currgameData.stopPosInfo[1],
                                    r = .05 * i.configData.kz,
                                    o = i.configData.kw / 2;
                                if (this.inrow == e) {
                                    var s = n.currgameData.roaDir[e],
                                        h = this.gold.transform.position.z;
                                    if ("up" == s && h > t - o) {
                                        if (h - .1 * i.configData.kw < t + r) return this.childIdx = null, void this.recovery();
                                    } else if ("down" == s && h < t + o && h + .1 * i.configData.kw > t - r) return this.childIdx = null,
                                        void this.recovery();
                                }
                            }
                            this.gold.transform.rotate(this.roaSpeed, !1, !1);
                            var c = a - this.nextTime;
                            c > i.configData.frameTime && (c = i.configData.frameTime), this.moveTime += c;
                            var g = i.configData.kw * i.configData.carSpeed * n.currgameData.carSpeed;
                            n.currgameData.inCamtime && (g = i.configData.kw * i.configData.carSpeed * i.configData.camSpeed);
                            var p = Laya.Vector3.distance(this.npos, this.tpos) / g,
                                d = this.moveTime / p;
                            d > 1 && (d = 1);
                            var l = new Laya.Vector3(0, 0, 0);
                            if (Laya.Vector3.lerp(this.npos, this.tpos, d, l), this.gold.transform.position = l,
                                this.nextPadding && 2 != n.currgameData.gameStat) ("up" == this.toDir ? Math.abs(l.z) : Math.abs(this.npos.z - l.z)) > this.nextPadding && (this.nextPadding = null);
                            l = null, 1 == d && this.recovery();
                        }
                        this.nextTime = a;
                    } else this.nextTime = a;
                }, goldComp.prototype.recovery = function () {
                    this.childIdx = null, this.removeEvent(), r.eventManager.instance.emitEvent(o.GameEvent.rePushEffect, ["gold", this.gold]);
                }, goldComp.prototype.changeCamType = function () {
                    this.moveTime = 0, this.npos = this.gold.transform.position.clone();
                }, goldComp.prototype.addEvent = function () {
                    r.eventManager.instance.onEvent(o.GameEvent.changeCamType, this, this.changeCamType);
                }, goldComp.prototype.removeEvent = function () {
                    r.eventManager.instance.offEvent(o.GameEvent.changeCamType, this, this.changeCamType);
                }, goldComp.prototype.onDestroy = function () {
                    this.removeEvent();
                }, goldComp;
            }(Laya.Script3D);
        t.goldComp = s;
    }, {
        "../configData": 3,
        "../data/currgameData": 4,
        "../data/gameEnum": 5,
        "../manager/eventManager": 21
    }],
    13: [function (a, e, t) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var n = a("../manager/assectManager"),
            i = a("../manager/eventManager"),
            r = a("../data/gameEnum"),
            o = a("../data/currgameData"),
            s = a("../configData"),
            h = a("./oneCarRoadComp"),
            c = a("./imoveCar"),
            g = a("./goldComp"),
            p = function (a) {
                function highSpeedRoad() {
                    var e = a.call(this) || this;
                    return e.assectArr = [], e.laneArr = [], e.lineArr = [], e.bianArr = [], e.leftLightIdx = 1,
                        e.rightLightIdx = 2, e.lightdis = 5, e;
                }
                return __extends(highSpeedRoad, a), highSpeedRoad.prototype.onAwake = function () {
                    this.highSpeedRoad = this.owner, this.addEvent(), n.assectManager.loadPerfab("Lane", function (a) {
                        this.roadPan = a;
                        var e = this.roadPan.getChildByName("Lane_0"),
                            t = e.meshFilter.sharedMesh.bounds._boundBox,
                            n = t.max.x - t.min.x,
                            i = t.max.z - t.min.z;
                        s.configData.kw = n * e.transform.scale.x, s.configData.kz = i * e.transform.scale.z,
                            s.configData.padding1 = s.configData.kw / 3, s.configData.padding2 = s.configData.kw / 2 + s.configData.padding1 - s.configData.kz / 2,
                            this.readyAssect("roadpan");
                    }.bind(this)), n.assectManager.loadPerfab("RoadLine", function (a) {
                        this.roadLine = a, this.startRoa = this.roadLine.transform.rotation.clone(), this.lineScale1 = this.roadLine.transform.scale.clone(),
                            this.lineScale2 = new Laya.Vector3(this.lineScale1.z * s.configData.LaneSx, this.lineScale1.y, this.lineScale1.x);
                        var e = this.roadLine.getChildByName("RoadLine_0"),
                            t = e.meshFilter.sharedMesh.bounds._boundBox;
                        this.linewid = (t.max.x - t.min.x) * e.transform.scale.x, this.readyAssect("roadline");
                    }.bind(this)), n.assectManager.loadPerfab("roadmouth", function (a) {
                        var e = a;
                        this.roadBian = e.getChildByName("step1");
                        var t = this.roadBian.meshFilter.sharedMesh.bounds._boundBox;
                        this.bianwid = (t.max.z - t.min.z) * this.roadBian.transform.scale.z, this.readyAssect("roadbian");
                    }.bind(this));
                }, highSpeedRoad.prototype.readyAssect = function (a) {
                    this.assectArr.push(a), -1 != this.assectArr.indexOf("roadpan") && -1 != this.assectArr.indexOf("roadline") && -1 != this.assectArr.indexOf("roadbian") && i.eventManager.instance.emitEvent(r.GameEvent.perfabReady, "road");
                }, highSpeedRoad.prototype.resetGame = function () {
                    o.currgameData.stopPosInfo = [0, 0], o.currgameData.chaRoadIdx = 0, this.leftLightIdx = 1,
                        this.rightLightIdx = 2;
                    for (var a = this.highSpeedRoad.numChildren - 1; a > -1; a--) {
                        var e = this.highSpeedRoad.getChildAt(a),
                            t = e.name;
                        if ("caroad" == t) {
                            for (var n = e.numChildren - 1; n > -1; n--) {
                                var i = e.getChildAt(n);
                                if ("jibi" == i.name) {
                                    var r = i.getComponent(g.goldComp);
                                    r && r.recovery();
                                } else {
                                    var s = i.getComponent(c.imoveCar);
                                    s && s.recovery();
                                }
                            }
                            e.destroy();
                        } else "Lane" == t ? (e.removeSelf(), this.laneArr.push(e)) : "RoadLine" == t ? (e.removeSelf(),
                            this.lineArr.push(e)) : "step1" == t && (e.removeSelf(), this.bianArr.push(e));
                    }
                }, highSpeedRoad.prototype.initScene = function () {
                    o.currgameData.setLevelData(), i.eventManager.instance.emitEvent(r.GameEvent.setEnvirSprite, ["test"]);
                    for (var a = 0; a < o.currgameData.roadleng; a++) this.addrowroad(a);
                    for (var e = 0; e < o.currgameData.roadnums; e++) {
                        var t = new Laya.Sprite3D();
                        t.name = "caroad", this.highSpeedRoad.addChild(t), t.addComponent(h.oneCarRoadComp).initData(e);
                    }
                    for (var n = o.currgameData.charoad.length, s = 0, c = 0, g = [], p = [], d = 0; d < n; d++) {
                        var l = o.currgameData.charoad[d];
                        if (d % 2 == 0) {
                            var m = c += l - (f = c);
                            p.push([f, m]), c += 1;
                        } else {
                            var u = s += l - (v = s);
                            g.push([v, u]), s += 1;
                        }
                    }
                    var f = c;
                    m = c = o.currgameData.roadleng;
                    p.push([f, m]);
                    var v = s;
                    u = s = o.currgameData.roadleng;
                    g.push([v, u]), i.eventManager.instance.emitEvent(r.GameEvent.addEnvirPanel, [g, p]);
                }, highSpeedRoad.prototype.addrowroad = function (a) {
                    for (var e = o.currgameData.charoad.indexOf(a), t = 0; t < o.currgameData.roadnums; t++) {
                        if (this.laneArr.length < 1) {
                            var n = Laya.Sprite3D.instantiate(this.roadPan);
                            this.laneArr.push(n);
                        }
                        var h = this.laneArr.shift();
                        this.highSpeedRoad.addChild(h);
                        var c = new Laya.Vector3(t * s.configData.kw, 0, -a * s.configData.kz);
                        if (h.transform.position = c, c = null, 0 == t) {
                            var g = new Laya.Vector3(t * s.configData.kw - s.configData.kw / 2, 0, -a * s.configData.kz);
                            if (this.lineArr.length < 1) {
                                var p = Laya.Sprite3D.instantiate(this.roadLine);
                                this.lineArr.push(p);
                            }
                            var d = this.lineArr.shift();
                            this.highSpeedRoad.addChild(d), d.transform.scale = this.lineScale1.clone(), d.transform.position = g,
                                g = null;
                            var l = !1;
                            if (-1 != e) 0 == e % 2 && (l = !0);
                            else l = !0;
                            if (l) {
                                var m = new Laya.Vector3(t * s.configData.kw - s.configData.kw / 2 - this.bianwid / 2, 0, -a * s.configData.kz);
                                if (this.bianArr.length < 1) {
                                    var u = Laya.MeshSprite3D.instantiate(this.roadBian);
                                    this.bianArr.push(u);
                                }
                                var f = this.bianArr.shift();
                                this.highSpeedRoad.addChild(f), f.transform.position = m, m = null;
                            }
                        }
                        if (t == o.currgameData.roadnums - 1) {
                            l = !1;
                            if (-1 != e) 1 == e % 2 && (l = !0);
                            else l = !0;
                            if (l) {
                                m = new Laya.Vector3(t * s.configData.kw + s.configData.kw / 2 + this.bianwid / 2, 0, -a * s.configData.kz);
                                if (this.bianArr.length < 1) {
                                    u = Laya.MeshSprite3D.instantiate(this.roadBian);
                                    this.bianArr.push(u);
                                }
                                f = this.bianArr.shift();
                                this.highSpeedRoad.addChild(f), f.transform.position = m, m = null;
                            }
                        }
                        if (this.lineArr.length < 1) {
                            p = Laya.Sprite3D.instantiate(this.roadLine);
                            this.lineArr.push(p);
                        }
                        d = this.lineArr.shift();
                        this.highSpeedRoad.addChild(d);
                        var v = new Laya.Vector3(t * s.configData.kw + s.configData.kw / 2, 0, -a * s.configData.kz);
                        d.transform.position = v, d.transform.scale = this.lineScale1.clone(), v = null;
                    }
                    if (-1 != e && (this.addOneChaRoad(a, e), i.eventManager.instance.emitEvent(r.GameEvent.addOneChaRoad, [a, e])),
                        a == this.leftLightIdx) {
                        var y = this.leftLightIdx; -
                            1 != e && (y += 1), i.eventManager.instance.emitEvent(r.GameEvent.addLightPai, ["left", "light", y]),
                            this.leftLightIdx += this.lightdis;
                    }
                    if (a == this.rightLightIdx) {
                        y = this.rightLightIdx; -
                            1 != e && (y += 1), i.eventManager.instance.emitEvent(r.GameEvent.addLightPai, ["right", "light", y]),
                            this.rightLightIdx += this.lightdis;
                    }
                }, highSpeedRoad.prototype.addOneChaRoad = function () {
                    for (var a = [], e = 0; e < arguments.length; e++) a[e] = arguments[e];
                    var t, n, i = a[0],
                        r = o.currgameData.roadnums;
                    0 == a[1] % 2 ? (t = r, n = 1) : (t = -1, n = -1);
                    for (var h = 0; h < 10; h++) {
                        if (this.laneArr.length < 1) {
                            var c = Laya.Sprite3D.instantiate(this.roadPan);
                            this.laneArr.push(c);
                        }
                        var g = this.laneArr.shift();
                        this.highSpeedRoad.addChild(g), g.transform.position = new Laya.Vector3((h * n + t) * s.configData.kw, 0, -i * s.configData.kz);
                        for (var p = 0; p < 2; p++) {
                            if (this.lineArr.length < 1) {
                                var d = Laya.Sprite3D.instantiate(this.roadLine);
                                this.lineArr.push(d);
                            }
                            var l, m = this.lineArr.shift();
                            this.highSpeedRoad.addChild(m), m.transform.scale = this.lineScale2.clone(), l = 0 == p ? new Laya.Vector3((h * n + t) * s.configData.kw, 0, -i * s.configData.kz - s.configData.kz / 2) : new Laya.Vector3((h * n + t) * s.configData.kw, 0, -i * s.configData.kz + s.configData.kz / 2),
                                m.transform.position = l, l = null;
                        }
                    }
                }, highSpeedRoad.prototype.addEvent = function () {
                    i.eventManager.instance.onEvent(r.GameEvent.resetGame, this, this.resetGame), i.eventManager.instance.onEvent(r.GameEvent.initScene, this, this.initScene);
                }, highSpeedRoad.prototype.removeEvent = function () {
                    i.eventManager.instance.offEvent(r.GameEvent.resetGame, this, this.resetGame), i.eventManager.instance.offEvent(r.GameEvent.initScene, this, this.initScene);
                }, highSpeedRoad.prototype.onDestroy = function () {
                    this.removeEvent();
                }, highSpeedRoad;
            }(Laya.Script3D);
        t.highSpeedRoad = p;
    }, {
        "../configData": 3,
        "../data/currgameData": 4,
        "../data/gameEnum": 5,
        "../manager/assectManager": 20,
        "../manager/eventManager": 21,
        "./goldComp": 12,
        "./imoveCar": 14,
        "./oneCarRoadComp": 15
    }],
    14: [function (a, e, t) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var n, i = a("../configData"),
            r = a("../data/currgameData"),
            o = a("../manager/eventManager"),
            s = a("../data/gameEnum");
        ! function (a) {
            a[a.stop = 0] = "stop", a[a.turn = 1] = "turn", a[a.move1 = 2] = "move1", a[a.move2 = 3] = "move2",
                a[a.fly = 4] = "fly";
        }(n = t.carMove || (t.carMove = {}));
        var h = function (a) {
            function imoveCar() {
                var e = a.call(this) || this;
                return e.startRoa = new Laya.Quaternion(0, 0, 0, 1), e.moveType = n.stop, e.bsrdot = [],
                    e.startdot = [], e.endot = [], e.toSetChart = !1, e.startCheckAttack = !1, e.nroa = new Laya.Quaternion(0, 0, 0, 1),
                    e.troa = new Laya.Quaternion(0, 0, 0, 1), e.npos = new Laya.Vector3(0, 0, 0), e.tpos = new Laya.Vector3(0, 0, 0),
                    e.isNext = !1, e.showScore = !0, e.showBgold = !1, e;
            }
            return __extends(imoveCar, a), imoveCar.prototype.onAwake = function () {
                this.car = this.owner;
                var a = this.car.meshFilter.sharedMesh.bounds._boundBox,
                    e = this.car.transform.scale;
                this.carW = (a.max.x - a.min.x) * e.x, this.carZ = (a.max.z - a.min.z) * e.z;
            }, imoveCar.prototype.setBianHao = function (a) {
                this.bianhao = a;
            }, imoveCar.prototype.setData = function (a, e, t, o, s, h, c) {
                var g;
                void 0 === c && (c = null), this.inrow = h, "charoad" == a ? (this.chaIdx = t, g = this.chaIdx % 2,
                    this.toDir = 0 == g ? r.currgameData.roaDir[r.currgameData.roaDir.length - 1] : r.currgameData.roaDir[0]) : "speedroad" == a && (this.chaIdx = null,
                        this.toDir = t), this.moveType = n.stop, this.inroad = a, this.car.transform.position = e,
                    e = null;
                var p, d, l = this.startRoa.clone();
                (this.car.transform.rotation = l, l = null, "charoad" == this.inroad) ? (this.childIdx = c,
                    this.nextPadding = null, p = 1 == g ? 1 : -1, d = "up" == this.toDir ? -1 : 1, this.bsrdot = [o + p * i.configData.kw / 2, s],
                    this.startdot = [o - p * (i.configData.padding1 + this.carZ / 2), s], this.endot = [o + p * i.configData.kw / 2, s + d * (i.configData.padding2 + i.configData.kz / 2 + this.carZ / 2)],
                    1 == g ? this.car.transform.rotate(new Laya.Vector3(0, 90, 0), !1, !1) : this.car.transform.rotate(new Laya.Vector3(0, -90, 0), !1, !1),
                    this.addPenEffect()) : "speedroad" == this.inroad && (this.childIdx = o, this.nextPadding = s,
                        "up" == this.toDir && this.car.transform.rotate(new Laya.Vector3(0, 180, 0), !1, !1),
                        this.changeMove(n.move2));
                this.addEvent();
            }, imoveCar.prototype.addPenEffect = function () {
                var a = this.car.getChildByName("leftpen"),
                    e = this.car.getChildByName("rightpen");
                a.removeChildren(), e.removeChildren(), o.eventManager.instance.emitEvent(s.GameEvent.addEffect, ["pen", a]),
                    o.eventManager.instance.emitEvent(s.GameEvent.addEffect, ["pen", e]), this.changeShowTrail(!1);
            }, imoveCar.prototype.changeShowTrail = function (a) {
                var e = this.car.getChildByName("leftpen"),
                    t = this.car.getChildByName("rightpen"),
                    n = e.getChildByName("smoke"),
                    i = t.getChildByName("smoke");
                a ? (n && n.particleSystem.play(), i && i.particleSystem.play()) : (n && n.particleSystem.stop(),
                    i && i.particleSystem.stop());
            }, imoveCar.prototype.setCarPos = function (a, e) {
                this.car.transform.position = a, this.car.transform.rotation = e, a = null, e = null,
                    this.moveType = n.stop, this.startCheckAttack = !1, this.showBgold = !1, this.removeScore();
            }, imoveCar.prototype.changeMove = function () {
                for (var a = [], e = 0; e < arguments.length; e++) a[e] = arguments[e];
                var t = a[0];
                if (this.moveTime = 0, t == n.turn) {
                    var h;
                    this.changeShowTrail(!0), this.nroa = this.car.transform.rotation.clone(), h = 0 == (p = this.chaIdx % 2) ? "up" == this.toDir ? -Math.PI / 2 : Math.PI / 2 : "up" == this.toDir ? Math.PI / 2 : -Math.PI / 2,
                        this.nroa.rotateY(h, this.troa), this.startCheckAttack = !0;
                    var c = this.car.transform.position.clone();
                    this.startdot = [c.x, c.z];
                } else if (t == n.move1) this.npos = this.car.transform.position.clone(), this.tpos = a[1],
                    this.isNext = a[2] || !1;
                else if (t == n.move2) {
                    var g;
                    this.npos = this.car.transform.position.clone(), g = "up" == this.toDir ? -r.currgameData.roadleng * i.configData.kz - this.npos.z : -this.npos.z,
                        this.tpos = new Laya.Vector3(this.npos.x, this.npos.y, this.npos.z + g), this.startCheckAttack = !1;
                } else if (t == n.stop) this.showBgold = !1, this.changeShowTrail(!1), this.removeScore();
                else if (t == n.fly) {
                    this.removeScore();
                    var p = r.currgameData.chaRoadIdx % 2;
                    if (this.flyDir = 0 == p ? "toleft" : "toright", !r.currgameData.firstExplosion) {
                        r.currgameData.firstExplosion = !0;
                        var d = this.car.transform.position.clone();
                        o.eventManager.instance.emitEvent(s.GameEvent.addEffect, ["baozha", d]), d = null;
                    }
                }
                this.moveType = t;
            }, imoveCar.prototype.changeBgold = function () {
                this.showBgold = !0;
            }, imoveCar.prototype.onUpdate = function () {
                var a = Date.now();
                if (this.nextTime) {
                    if (this.startCheckAttack) {
                        var e = this.chaIdx % 2 == 0 ? r.currgameData.roadnums - 1 : 0,
                            t = this.car.getChildByName("lefthead"),
                            h = this.car.getChildByName("righthead"),
                            c = this.car.getChildByName("leftbot"),
                            g = this.car.getChildByName("rightbot"),
                            p = t.transform.position.clone(),
                            d = h.transform.position.clone(),
                            l = c.transform.position.clone(),
                            m = g.transform.position.clone();
                        o.eventManager.instance.emitEvent(s.GameEvent.checkAttack + "_" + e, [this.chaIdx, this.childIdx, p, d, l, m]);
                    }
                    if (this.moveType != n.stop && this.moveType != n.fly) {
                        if (1 != r.currgameData.gameStat && (this.moveType == n.turn || this.moveType == n.move1)) return;
                        (A = a - this.nextTime) > i.configData.frameTime && (A = i.configData.frameTime),
                            this.moveTime += A;
                        var u = i.configData.kw * i.configData.carSpeed * r.currgameData.carSpeed;
                        if (this.moveType == n.turn) {
                            1 == r.currgameData.cameraType && (u *= 1.2);
                            var f = i.configData.padding1 + this.carZ / 2 + i.configData.kw / 2,
                                v = 2 * Math.PI * f / 4 / u;
                            (P = this.moveTime / v) > 1 && (P = 1);
                            var y = (1 - P) * (1 - P) * this.startdot[0] + 2 * P * (1 - P) * this.bsrdot[0] + P * P * this.endot[0],
                                b = (1 - P) * (1 - P) * this.startdot[1] + 2 * P * (1 - P) * this.bsrdot[1] + P * P * this.endot[1],
                                D = new Laya.Vector3(y, i.configData.kw * i.configData.carposy, b),
                                w = new Laya.Quaternion(),
                                x = Math.atan(Math.abs((this.endot[1] - this.bsrdot[1]) * P / ((this.bsrdot[0] - this.startdot[0]) * (1 - P)))) / (Math.PI / 2);
                            if (Laya.Quaternion.lerp(this.nroa, this.troa, x, w), this.car.transform.rotation = w,
                                this.car.transform.position = D, P >= .5 && this.showScore && r.currgameData.lemitnum >= 1 && (this.showScore = !1,
                                    this.toSetChart = !0, o.eventManager.instance.emitEvent(s.GameEvent.addEffect, ["score", this.chaIdx, this.childIdx])),
                                1 == P) {
                                this.toSetChart = !0;
                                var k = this.car.name,
                                    M = this.get2dpos(D);
                                o.eventManager.instance.emitEvent(s.GameEvent.chartManage, ["success", this.chaIdx, this.childIdx, M, k]),
                                    this.changeShowTrail(!1), this.changeMove(n.move2), this.changeMoveTeam();
                                var C, I = D;
                                C = this.showBgold ? "bflymoney" : "flymoney", o.eventManager.instance.emitEvent(s.GameEvent.addEffect, [C, I]);
                            }
                            D = null, w = null;
                        } else if (this.moveType == n.move1) {
                            1 == r.currgameData.cameraType && (u *= 1.2);
                            v = Laya.Vector3.distance(this.npos, this.tpos) / u;
                            (P = this.moveTime / v) > 1 && (P = 1);
                            D = new Laya.Vector3(0, 0, 0);
                            Laya.Vector3.lerp(this.npos, this.tpos, P, D), this.car.transform.position = D,
                                D = null, 1 == P && (this.changeMove(n.stop), this.isNext && (this.isNext = !1,
                                    this.readyEmitCar()));
                        } else if (this.moveType == n.move2) {
                            if (r.currgameData.inCamtime && (u = i.configData.kw * i.configData.carSpeed * i.configData.camSpeed),
                                2 == r.currgameData.gameStat) {
                                var E = r.currgameData.stopPosInfo[0],
                                    S = r.currgameData.stopPosInfo[1],
                                    L = .05 * i.configData.kz,
                                    G = i.configData.kw / 2;
                                if (this.inrow == E) {
                                    var T = r.currgameData.roaDir[E],
                                        _ = this.car.transform.position.z;
                                    if ("up" == T && _ > S - G) {
                                        if (_ - this.carZ / 2 < S + L) {
                                            this.changeMove(n.stop);
                                            var B = _ + this.carZ / 2;
                                            return void (r.currgameData.stopPosInfo[1] = B);
                                        }
                                    } else if ("down" == T && _ < S + G && _ + this.carZ / 2 > S - L) {
                                        this.changeMove(n.stop);
                                        B = _ - this.carZ / 2;
                                        return void (r.currgameData.stopPosInfo[1] = B);
                                    }
                                }
                            }
                            var P;
                            v = Laya.Vector3.distance(this.npos, this.tpos) / u;
                            (P = this.moveTime / v) > 1 && (P = 1);
                            D = new Laya.Vector3(0, 0, 0);
                            Laya.Vector3.lerp(this.npos, this.tpos, P, D), this.car.transform.position = D,
                                D = null, 1 == P && (this.changeMove(n.stop), this.recovery());
                        }
                    }
                    var A;
                    if (this.moveType == n.fly) (A = a - this.nextTime) > i.configData.frameTime && (A = i.configData.frameTime),
                        this.moveTime += A, this.moveTime > i.configData.flyTime ? (this.changeMove(n.stop),
                            this.recovery()) : "toleft" == this.flyDir ? (this.car.transform.rotate(new Laya.Vector3(0, 3, 6), !1, !1),
                                this.car.transform.translate(new Laya.Vector3(-i.configData.kw / 30, i.configData.kw / 15, 0), !1)) : (this.car.transform.rotate(new Laya.Vector3(0, 3, -6), !1, !1),
                                    this.car.transform.translate(new Laya.Vector3(i.configData.kw / 30, i.configData.kw / 15, 0), !1));
                    this.toSetChart && this.setChartPos(), this.nextTime = a;
                } else this.nextTime = a;
            }, imoveCar.prototype.changeMoveTeam = function () {
                var a = this.car.name;
                o.eventManager.instance.emitEvent(s.GameEvent.changeMoveTeam, a);
            }, imoveCar.prototype.readyEmitCar = function () {
                o.eventManager.instance.emitEvent(s.GameEvent.readyEmitNextCar, null);
            }, imoveCar.prototype.recovery = function () {
                this.removeEvent(), o.eventManager.instance.emitEvent(s.GameEvent.rePushCar, this.car);
            }, imoveCar.prototype.setChartPos = function () {
                for (var a = [], e = 0; e < arguments.length; e++) a[e] = arguments[e];
                if (this.car && this.car.transform) {
                    var t = this.car.transform.position.clone();
                    o.eventManager.instance.emitEvent(s.GameEvent.changeScorePos, ["setpos", this.chaIdx, this.childIdx, t]);
                    var n = this.get2dpos(t),
                        i = n[0],
                        r = n[1];
                    t = null, o.eventManager.instance.emitEvent(s.GameEvent.getChartPos + "_" + this.chaIdx + "_" + this.childIdx, [i, r]);
                }
            }, imoveCar.prototype.get2dpos = function (a) {
                var e = new Laya.Vector3(0, 0, 0);
                r.currgameData.mainCamera.viewport.project(a, r.currgameData.mainCamera.projectionViewMatrix, e);
                var t = e.x / Laya.stage.clientScaleX,
                    n = e.y / Laya.stage.clientScaleY;
                return e = null, [t, n];
            }, imoveCar.prototype.changeSetChart = function () {
                this.toSetChart = !1, this.removeScore();
            }, imoveCar.prototype.removeScore = function () {
                this.showScore = !0, o.eventManager.instance.emitEvent(s.GameEvent.changeScorePos, ["removescore", this.chaIdx, this.childIdx]);
            }, imoveCar.prototype.changeChaCarMovetype = function () {
                for (var a = [], e = 0; e < arguments.length; e++) a[e] = arguments[e];
                var t = a[0];
                if ("getgold" == t) this.changeBgold();
                else if ("cmovetype" == t) {
                    var i = a[1];
                    this.moveType != i && (this.changeMove(i), i == n.stop && (this.toSetChart = !0,
                        o.eventManager.instance.emitEvent(s.GameEvent.chartManage, ["fail", this.chaIdx, this.childIdx])));
                }
            }, imoveCar.prototype.changeCamType = function () {
                this.moveType == n.move2 && (this.moveTime = 0, this.npos = this.car.transform.position.clone());
            }, imoveCar.prototype.addEvent = function () {
                "charoad" == this.inroad && (o.eventManager.instance.onEvent(s.GameEvent.getChartPos + "-" + this.chaIdx + "-" + this.childIdx, this, this.changeSetChart),
                    o.eventManager.instance.onEvent(s.GameEvent.changeChaCarMovetype + "-" + this.chaIdx + "-" + this.childIdx, this, this.changeChaCarMovetype)),
                    o.eventManager.instance.onEvent(s.GameEvent.changeCamType, this, this.changeCamType);
            }, imoveCar.prototype.removeEvent = function () {
                "charoad" == this.inroad && (o.eventManager.instance.offEvent(s.GameEvent.getChartPos + "-" + this.chaIdx + "-" + this.childIdx, this, this.changeSetChart),
                    o.eventManager.instance.offEvent(s.GameEvent.changeChaCarMovetype + "-" + this.chaIdx + "-" + this.childIdx, this, this.changeChaCarMovetype)),
                    o.eventManager.instance.offEvent(s.GameEvent.changeCamType, this, this.changeCamType);
            }, imoveCar.prototype.onDestroy = function () { }, imoveCar;
        }(Laya.Script3D);
        t.imoveCar = h;
    }, {
        "../configData": 3,
        "../data/currgameData": 4,
        "../data/gameEnum": 5,
        "../manager/eventManager": 21
    }],
    15: [function (a, e, t) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var n = a("../manager/eventManager"),
            i = a("../data/gameEnum"),
            r = a("./imoveCar"),
            o = a("../configData"),
            s = a("../data/currgameData"),
            h = a("./goldComp"),
            c = a("../utils"),
            g = a("../platform/platform"),
            p = a("../manager/soundManager"),
            d = function (a) {
                function oneCarRoadComp() {
                    var e = a.call(this) || this;
                    return e.childIdx = 0, e.addgold = !1, e;
                }
                return __extends(oneCarRoadComp, a), oneCarRoadComp.prototype.onAwake = function () {
                    this.hroad = this.owner;
                }, oneCarRoadComp.prototype.initData = function (a) {
                    this.row = a, this.hroad || (this.hroad = this.owner), this.addEvent(), this.initHroadCar();
                }, oneCarRoadComp.prototype.initHroadCar = function () {
                    var a = 0,
                        e = o.configData.kz * s.currgameData.roadleng;
                    for (o.configData.kw, o.configData.carSpeed, s.currgameData.carSpeed; a < e;) {
                        var t = this.addObjType();
                        if ("gold" == t || "wudi" == t) {
                            n.eventManager.instance.emitEvent(i.GameEvent.addEffect, [t, this.hroad]);
                            var c = this.hroad.numChildren - 1,
                                g = this.hroad.getChildAt(c).getComponent(h.goldComp),
                                p = .8 * o.configData.kw,
                                d = (v = (Math.random() * (s.currgameData.levelPadding[1] - s.currgameData.levelPadding[0]) + s.currgameData.levelPadding[0]) * o.configData.kz) + p / 2;
                            a += p / 2;
                            var l = new Laya.Vector3(this.row * o.configData.kw, 0, -a);
                            this.childIdx += 1, g.setData(l, this.row, this.childIdx, d), a += d;
                        } else if ("car" == t) {
                            n.eventManager.instance.emitEvent(i.GameEvent.addOneCar, [this.hroad, "speedroad"]);
                            var m = this.hroad.numChildren - 1,
                                u = this.hroad.getChildAt(m).getComponent(r.imoveCar),
                                f = u.carZ,
                                v = (Math.random() * (s.currgameData.levelPadding[1] - s.currgameData.levelPadding[0]) + s.currgameData.levelPadding[0]) * o.configData.kz,
                                y = s.currgameData.roaDir[this.row];
                            d = v + f / 2;
                            if ((a += f / 2) > e) u.recovery();
                            else {
                                l = new Laya.Vector3(this.row * o.configData.kw, o.configData.kw * o.configData.carposy, -a);
                                this.childIdx += 1, u.setData("speedroad", l, y, this.childIdx, d, this.row);
                            }
                            a += d;
                        }
                    }
                    this.distimeEmit();
                }, oneCarRoadComp.prototype.distimeEmit = function () {
                    if (2 == s.currgameData.gameStat);
                    else {
                        var a, e = s.currgameData.getnextime();
                        if (s.currgameData.inCamtime) {
                            e = 2.8;
                            var t = o.configData.kw * o.configData.carSpeed * o.configData.camSpeed;
                            a = Math.ceil(o.configData.kw / t);
                        } else this.addgold && (e = 3 * Math.random() + 1), a = s.currgameData.baseEtime;
                        var n = Math.ceil(a * e);
                        Laya.timer.once(n, this, this.addHroadCar);
                    }
                }, oneCarRoadComp.prototype.addHroadCar = function () {
                    for (var a = [], e = 0; e < arguments.length; e++) a[e] = arguments[e];
                    var t = this.addObjType();
                    if ("gold" == t || "wudi" == t) {
                        this.addgold = !0, n.eventManager.instance.emitEvent(i.GameEvent.addEffect, [t, this.hroad]);
                        var c = this.hroad.numChildren - 1,
                            g = this.hroad.getChildAt(c).getComponent(h.goldComp),
                            p = .8 * o.configData.kw,
                            d = (Math.random() * (s.currgameData.levelPadding[1] - s.currgameData.levelPadding[0]) + s.currgameData.levelPadding[0]) * o.configData.kz + p / 2;
                        u = "up" == (m = s.currgameData.roaDir[this.row]) ? p : -s.currgameData.roadleng * o.configData.kz - p;
                        var l = new Laya.Vector3(this.row * o.configData.kw, 0, u);
                        this.childIdx += 1, g.setData(l, this.row, this.childIdx, d);
                    } else {
                        this.addgold = !1, n.eventManager.instance.emitEvent(i.GameEvent.addOneCar, [this.hroad, "speedroad"]);
                        c = this.hroad.numChildren - 1;
                        var m, u, f = this.hroad.getChildAt(c).getComponent(r.imoveCar),
                            v = f.carZ;
                        u = "up" == (m = s.currgameData.roaDir[this.row]) ? v : -s.currgameData.roadleng * o.configData.kz - v;
                        l = new Laya.Vector3(this.row * o.configData.kw, o.configData.kw * o.configData.carposy, u),
                            d = (Math.random() * (s.currgameData.levelPadding[1] - s.currgameData.levelPadding[0]) + s.currgameData.levelPadding[0]) * o.configData.kz + v;
                        this.childIdx += 1, f.setData("speedroad", l, m, this.childIdx, d, this.row);
                    }
                    this.distimeEmit();
                }, oneCarRoadComp.prototype.addObjType = function () {
                    if (0 == this.row || this.row == s.currgameData.roadnums - 1) {
                        for (var a, e, t = s.currgameData.carAgold.length, n = s.currgameData.carAgold[t - 1], i = Math.random() * n, r = 0; r < t; r++) {
                            if (s.currgameData.carAgold[r] >= i) {
                                a = r;
                                break;
                            }
                        }
                        return 0 == a ? e = "car" : 1 == a ? e = "gold" : 2 == a && (e = "wudi"), e;
                    }
                    return "car";
                }, oneCarRoadComp.prototype.fuhuo = function () {
                    var a;
                    if (a = 0 == s.currgameData.chaRoadIdx % 2 ? s.currgameData.roadnums - 1 : 0, this.row == a) {
                        for (var e = this.hroad.numChildren - 1; e > -1; e--) {
                            var t = this.hroad.getChildAt(e);
                            t.name;
                            if ("jibi" == t.name) {
                                t.getComponent(h.goldComp).recovery();
                            } else {
                                if (t.getComponent(r.imoveCar)) {
                                    t.getComponent(r.imoveCar).recovery();
                                }

                            }
                            // if ("jibi" == t.name) t.getComponent(h.goldComp).recovery(); else t.getComponent(r.imoveCar).recovery();
                        }
                        s.currgameData.stopPosInfo = [0, 0], this.initHroadCar();
                    }
                }, oneCarRoadComp.prototype.checkAttack = function () {
                    for (var a = [], e = 0; e < arguments.length; e++) a[e] = arguments[e];
                    for (var t = a[0], d = a[1], l = a[2], m = a[3], u = a[4], f = a[5], v = s.currgameData.charoad[t], y = -o.configData.kz * v, b = [y - 2 * o.configData.kz, y + 2 * o.configData.kz], D = this.hroad.numChildren, w = 0; w < D; w++) {
                        var x = this.hroad.getChildAt(w);
                        if (x) {
                            var k = x.transform.position.clone(),
                                M = k.z;
                            if (M >= b[0] && M <= b[1]) {
                                var C = x.getChildByName("lefthead"),
                                    I = x.getChildByName("righthead"),
                                    E = x.getChildByName("leftbot"),
                                    S = x.getChildByName("rightbot"),
                                    L = C.transform.position.clone(),
                                    G = I.transform.position.clone(),
                                    T = E.transform.position.clone(),
                                    _ = S.transform.position.clone(),
                                    B = [
                                        [l, u, L, T],
                                        [l, u, T, _],
                                        [l, u, _, G],
                                        [l, u, G, L],
                                        [u, f, L, T],
                                        [u, f, T, _],
                                        [u, f, _, G],
                                        [u, f, G, L],
                                        [f, m, L, T],
                                        [f, m, T, _],
                                        [f, m, _, G],
                                        [f, m, G, L],
                                        [m, l, L, T],
                                        [m, l, T, _],
                                        [m, l, _, G],
                                        [m, l, G, L]
                                    ],
                                    P = x.name;
                                if ("jibi" == P || "wudi" == P) {
                                    if (1 == s.currgameData.gameStat) {
                                        for (var A = !1, U = 0; U < B.length; U++) {
                                            var V = B[U];
                                            if (A = c.utils.checkVecIntersect(V)) break;
                                        }
                                        if (A) x.getComponent(h.goldComp).recovery(), w--, g.platform.instance.vibrate("short"),
                                            "jibi" == P ? (n.eventManager.instance.emitEvent(i.GameEvent.addEffect, ["flygold", k]),
                                                p.soundManager.playEffect(i.GameSound.gold, 1), s.currgameData.addCurrGold(10),
                                                n.eventManager.instance.emitEvent(i.GameEvent.changeChaCarMovetype + "-" + t + "-" + d, ["getgold"])) : "wudi" == P && (n.eventManager.instance.emitEvent(i.GameEvent.addEffect, ["flyWudi", k]),
                                                    n.eventManager.instance.emitEvent(i.GameEvent.changeWudi, null));
                                    }
                                } else {
                                    var O = x.getComponent(r.imoveCar),
                                        R = O.moveType;
                                    if (s.currgameData.invincible) {
                                        if (R == r.carMove.fly) continue;
                                        for (A = !1, U = 0; U < B.length; U++) {
                                            V = B[U];
                                            if (A = c.utils.checkVecIntersect(V)) break;
                                        }
                                        A && (O.changeMove(r.carMove.fly), g.platform.instance.vibrate("short"));
                                    } else {
                                        if (R == r.carMove.stop) continue;
                                        for (A = !1, U = 0; U < B.length; U++) {
                                            V = B[U];
                                            if (A = c.utils.checkVecIntersect(V)) break;
                                        }
                                        if (A) {
                                            O.changeMove(r.carMove.stop), n.eventManager.instance.emitEvent(i.GameEvent.changeChaCarMovetype + "-" + t + "-" + d, ["cmovetype", r.carMove.stop]),
                                                1 == s.currgameData.gameStat && (g.platform.instance.vibrate("long"), p.soundManager.playEffect(i.GameSound.gameover, 1),
                                                    s.currgameData.changeGameStat(2), n.eventManager.instance.emitEvent(i.GameEvent.openFuhuo, null));
                                            var j = 0,
                                                N = s.currgameData.roaDir[this.row],
                                                z = 0,
                                                K = s.currgameData.stopPosInfo[1];
                                            "up" == N ? (z = x.transform.position.z + O.carZ / 2, j = 0 == K ? z : Math.max(K, z)) : (z = x.transform.position.z - O.carZ / 2,
                                                j = 0 == K ? z : Math.min(K, z)), s.currgameData.stopPosInfo = [this.row, j];
                                        }
                                    }
                                }
                                L = null, G = null, T = null, _ = null, B = null;
                            }
                        }
                    }
                    l = null, m = null, u = null, f = null;
                }, oneCarRoadComp.prototype.addChaCartoGroup = function () {
                    for (var a = [], e = 0; e < arguments.length; e++) a[e] = arguments[e];
                    var t = a[0];
                    this.hroad.addChild(t);
                }, oneCarRoadComp.prototype.addEvent = function () {
                    n.eventManager.instance.onEvent(i.GameEvent.fuhuo, this, this.fuhuo), n.eventManager.instance.onEvent(i.GameEvent.checkAttack + "_" + this.row, this, this.checkAttack);
                }, oneCarRoadComp.prototype.removeEvent = function () {
                    Laya.timer.clear(this, this.addHroadCar), n.eventManager.instance.offEvent(i.GameEvent.fuhuo, this, this.fuhuo),
                        n.eventManager.instance.offEvent(i.GameEvent.checkAttack + "_" + this.row, this, this.checkAttack);
                }, oneCarRoadComp.prototype.onDestroy = function () {
                    this.removeEvent();
                }, oneCarRoadComp;
            }(Laya.Script3D);
        t.oneCarRoadComp = d;
    }, {
        "../configData": 3,
        "../data/currgameData": 4,
        "../data/gameEnum": 5,
        "../manager/eventManager": 21,
        "../manager/soundManager": 23,
        "../platform/platform": 55,
        "../utils": 59,
        "./goldComp": 12,
        "./imoveCar": 14
    }],
    16: [function (a, e, t) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var n = a("../data/currgameData"),
            i = a("../configData"),
            r = a("../manager/eventManager"),
            o = a("../data/gameEnum"),
            s = a("./imoveCar"),
            h = a("../utils"),
            c = a("../platform/platform"),
            g = a("../manager/soundManager"),
            p = function (a) {
                function oneChaRoadComp() {
                    return a.call(this) || this;
                }
                return __extends(oneChaRoadComp, a), oneChaRoadComp.prototype.onAwake = function () {
                    this.road = this.owner;
                }, oneChaRoadComp.prototype.initData = function (a, e) {
                    this.lie = a, this.chaIdx = e, this.road || (this.road = this.owner), this.addEvent(),
                        this.addChaCar(0);
                }, oneChaRoadComp.prototype.addChaCar = function (a) {
                    a < n.currgameData.chacars[this.chaIdx] ? r.eventManager.instance.emitEvent(o.GameEvent.addOneCar, [this.road, "charoad", a + 1]) : (r.eventManager.instance.offEvent(o.GameEvent.addChaCar, this, this.addChaCar),
                        this.initRoadCarPos());
                }, oneChaRoadComp.prototype.initRoadCarPos = function () {
                    var a, e, t, r = n.currgameData.roadnums;
                    0 == this.chaIdx % 2 ? (a = r, e = 1, n.currgameData.roaDir[n.currgameData.roaDir.length - 1],
                        t = n.currgameData.roadnums - 1) : (a = -1, e = -1, n.currgameData.roaDir[0], t = 0);
                    for (var o = -this.lie * i.configData.kz, h = a * i.configData.kw - i.configData.kw * e / 2, c = i.configData.padding1, g = c, p = this.road.numChildren, d = 0; d < p; d++) {
                        var l = this.road.getChildAt(d).getComponent(s.imoveCar),
                            m = l.carZ,
                            u = new Laya.Vector3(h + e * (g + m / 2), i.configData.kw * i.configData.carposy, o);
                        l.setData("charoad", u, this.chaIdx, h, o, t, d), g += c + m;
                    }
                }, oneChaRoadComp.prototype.checkAttack = function () {
                    for (var a = [], e = 0; e < arguments.length; e++) a[e] = arguments[e];
                    if (this.chaIdx < n.currgameData.chaRoadIdx)
                        for (var t = this.chaIdx % 2 == 0 ? n.currgameData.roadnums - 1 : 0, p = a[0], d = a[1], l = a[2], m = a[3], u = a[4], f = a[5], v = n.currgameData.charoad[p], y = -i.configData.kz * v, b = [y - 2 * i.configData.kz, y + 2 * i.configData.kz], D = this.road.numChildren, w = 0; w < D; w++) {
                            var x = this.road.getChildAt(w);
                            if (x) {
                                var k = x.transform.position.clone().z;
                                if (k >= b[0] && k <= b[1]) {
                                    var M = x.getChildByName("lefthead"),
                                        C = x.getChildByName("righthead"),
                                        I = x.getChildByName("leftbot"),
                                        E = x.getChildByName("rightbot"),
                                        S = M.transform.position.clone(),
                                        L = C.transform.position.clone(),
                                        G = I.transform.position.clone(),
                                        T = E.transform.position.clone(),
                                        _ = [
                                            [l, u, S, G],
                                            [l, u, G, T],
                                            [l, u, T, L],
                                            [l, u, L, S],
                                            [u, f, S, G],
                                            [u, f, G, T],
                                            [u, f, T, L],
                                            [u, f, L, S],
                                            [f, m, S, G],
                                            [f, m, G, T],
                                            [f, m, T, L],
                                            [f, m, L, S],
                                            [m, l, S, G],
                                            [m, l, G, T],
                                            [m, l, T, L],
                                            [m, l, L, S]
                                        ],
                                        B = x.getComponent(s.imoveCar);
                                    if (B.moveType == s.carMove.move2) {
                                        for (var P = !1, A = 0; A < _.length; A++) {
                                            var U = _[A];
                                            if (P = h.utils.checkVecIntersect(U)) break;
                                        }
                                        if (P)
                                            if (n.currgameData.invincible) c.platform.instance.vibrate("short"), B.changeMove(s.carMove.fly);
                                            else {
                                                B.changeMove(s.carMove.stop), r.eventManager.instance.emitEvent(o.GameEvent.changeChaCarMovetype + "-" + p + "-" + d, ["cmovetype", s.carMove.stop]),
                                                    1 == n.currgameData.gameStat && (c.platform.instance.vibrate("long"), g.soundManager.playEffect(o.GameSound.gameover, 1),
                                                        n.currgameData.changeGameStat(2), r.eventManager.instance.emitEvent(o.GameEvent.openFuhuo, null));
                                                var V = 0,
                                                    O = n.currgameData.roaDir[t],
                                                    R = 0,
                                                    j = n.currgameData.stopPosInfo[1];
                                                "up" == O ? (R = x.transform.position.z + B.carZ / 2, V = 0 == j ? R : Math.max(j, R)) : (R = x.transform.position.z - B.carZ / 2,
                                                    V = 0 == j ? R : Math.min(j, R)), n.currgameData.stopPosInfo = [t, V];
                                            }
                                    }
                                }
                            }
                        }
                }, oneChaRoadComp.prototype.addEvent = function () {
                    r.eventManager.instance.onEvent(o.GameEvent.addChaCar, this, this.addChaCar);
                    var a = this.chaIdx % 2 == 0 ? n.currgameData.roadnums - 1 : 0;
                    r.eventManager.instance.onEvent(o.GameEvent.checkAttack + "_" + a, this, this.checkAttack);
                }, oneChaRoadComp.prototype.removeEvent = function () {
                    r.eventManager.instance.offEvent(o.GameEvent.addChaCar, this, this.addChaCar);
                    var a = this.chaIdx % 2 == 0 ? n.currgameData.roadnums - 1 : 0;
                    r.eventManager.instance.offEvent(o.GameEvent.checkAttack + "_" + a, this, this.checkAttack);
                }, oneChaRoadComp.prototype.onDestroy = function () {
                    this.removeEvent();
                }, oneChaRoadComp;
            }(Laya.Script3D);
        t.oneChaRoadComp = p;
    }, {
        "../configData": 3,
        "../data/currgameData": 4,
        "../data/gameEnum": 5,
        "../manager/eventManager": 21,
        "../manager/soundManager": 23,
        "../platform/platform": 55,
        "../utils": 59,
        "./imoveCar": 14
    }],
    17: [function (a, e, t) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var n = a("../manager/eventManager"),
            i = a("../data/gameEnum"),
            r = a("./carmods"),
            o = a("./highSpeedRoad"),
            s = a("./carRoad"),
            h = a("./effectComp"),
            c = a("./toolsComp"),
            g = a("../data/currgameData"),
            p = a("./environment"),
            d = function (a) {
                function sceneWorld() {
                    var e = a.call(this) || this;
                    return e.assectArr = [], e;
                }
                return __extends(sceneWorld, a), sceneWorld.prototype.onAwake = function () {
                    this.addEvent(), this.scene = this.owner, this.camera = new Laya.Camera(), this.light = new Laya.DirectionLight();
                    var a = new Laya.Sprite3D(),
                        e = new Laya.Sprite3D(),
                        t = new Laya.Sprite3D(),
                        n = new Laya.Sprite3D(),
                        i = new Laya.Sprite3D(),
                        d = new Laya.Sprite3D();
                    this.light.transform.translate(new Laya.Vector3(0, 3, 0)), this.light.transform.rotate(new Laya.Vector3(-50, -30, 0), !1, !1),
                        this.light.diffuseColor = new Laya.Vector3(.3, .3, .3), this.light.intensity = .3,
                        this.camera.transform.rotate(new Laya.Vector3(-45, 0, 0), !1, !1), this.camera.transform.translate(new Laya.Vector3(1.5, 15, 0), !1),
                        this.scene.addChild(this.camera), this.scene.addChild(this.light), this.scene.addChild(d),
                        this.scene.addChild(a), this.scene.addChild(e), this.scene.addChild(t), this.scene.addChild(n),
                        this.scene.addChild(i), i.addComponent(h.effectComp), d.addComponent(c.toolsComp),
                        a.addComponent(r.carmods), e.addComponent(p.environment), t.addComponent(o.highSpeedRoad),
                        n.addComponent(s.carRoad).setFollowCamera(this.camera), this.camera.fieldOfView = 18,
                        g.currgameData.mainCamera = this.camera;
                }, sceneWorld.prototype.perfabReady = function (a) {
                    this.assectArr.push(a), -1 != this.assectArr.indexOf("carmods") && -1 != this.assectArr.indexOf("road") && -1 != this.assectArr.indexOf("effect") && -1 != this.assectArr.indexOf("tools") && -1 != this.assectArr.indexOf("environment") && (n.eventManager.instance.emitEvent(i.GameEvent.initScene, null),
                        n.eventManager.instance.emitEvent(i.GameEvent.addTpro, .1), this.removeEvent());
                }, sceneWorld.prototype.addEvent = function () {
                    n.eventManager.instance.onEvent(i.GameEvent.perfabReady, this, this.perfabReady);
                }, sceneWorld.prototype.removeEvent = function () {
                    n.eventManager.instance.offEvent(i.GameEvent.perfabReady, this, this.perfabReady);
                }, sceneWorld.prototype.onDestroy = function () {
                    this.removeEvent();
                }, sceneWorld;
            }(Laya.Script3D);
        t.sceneWorld = d;
    }, {
        "../data/currgameData": 4,
        "../data/gameEnum": 5,
        "../manager/eventManager": 21,
        "./carRoad": 8,
        "./carmods": 9,
        "./effectComp": 10,
        "./environment": 11,
        "./highSpeedRoad": 13,
        "./toolsComp": 18
    }],
    18: [function (a, e, t) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var n = a("../manager/eventManager"),
            i = a("../data/gameEnum"),
            r = a("../manager/assectManager"),
            o = function (a) {
                function toolsComp() {
                    return a.call(this) || this;
                }
                return __extends(toolsComp, a), toolsComp.prototype.onAwake = function () {
                    r.assectManager.loadPerfab("tools", function (a) {
                        n.eventManager.instance.emitEvent(i.GameEvent.perfabReady, "tools");
                    }.bind(this)), this.addEvent();
                }, toolsComp.prototype.addEvent = function () { }, toolsComp.prototype.removeEvent = function () { },
                    toolsComp.prototype.onDestroy = function () {
                        this.removeEvent();
                    }, toolsComp;
            }(Laya.Script3D);
        t.toolsComp = o;
    }, {
        "../data/gameEnum": 5,
        "../manager/assectManager": 20,
        "../manager/eventManager": 21
    }],
    19: [function (a, e, t) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var n = a("./eventManager"),
            i = a("../platform/platform"),
            r = a("./statistics"),
            o = a("../configData"),
            s = a("../data/gameEnum"),
            h = a("../page/perfab/gameBanner"),
            c = function () {
                function adManager() { }
                return adManager.getDelayTime = function (a) {
                    return "fuhuo" == a ? this.delayBannerFuhuo : "jinbi" == a ? this.delayBannerJinbi : "jiesuan" == a ? this.delayBannerSette : "default" == a ? 0 : void 0;
                }, adManager.emitAddTpro = function () {
                    this.emitLpro || (this.emitLpro = !0, n.eventManager.instance.emitEvent(s.GameEvent.addTpro, .1));
                }, adManager.createBanner = function () {
                    var a = o.configData.systemInfo,
                        e = a.screenWidth * this.bannerWid,
                        t = a.screenHeight;
                    this.botBanner = wx.createBannerAd({
                        adUnitId: this.bannerId,
                        style: {
                            left: 0,
                            top: t,
                            width: e
                        }
                    }), Laya.timer.once(this.createBtime, this, this.emitAddTpro), this.botBanner.onLoad(function (a) {
                        this.emitAddTpro();
                    }.bind(this)), this.botBanner.onError(function (a) {
                        this.emitAddTpro(), this.botBanner = !1, this.createNewBanner = !1;
                    }.bind(this)), this.botBanner.onResize(function (a) {
                        this.changeBannerStyle(a, this.botBanner);
                    }.bind(this));
                    var n = this.fuhuoBannerId;
                    this.createClickBanner(n, "fuhuo");
                    var i = this.jinbiBannerId;
                    this.createClickBanner(i, "jinbi");
                    var r = this.jiesuanBannerId;
                    this.createClickBanner(r, "jiesuan");
                }, adManager.createClickBanner = function (a, e) {
                    var t = o.configData.systemInfo,
                        n = t.screenWidth * this.bannerWid,
                        i = t.screenHeight,
                        r = wx.createBannerAd({
                            adUnitId: a,
                            style: {
                                left: 0,
                                top: i,
                                width: n
                            }
                        });
                    r.onLoad(function (a) { }.bind(this)), r.onError(function (a) {
                        r = !1, this.clickBanner[e] = !1;
                    }.bind(this)), r.onResize(function (a) {
                        this.changeBannerStyle(a, r);
                    }.bind(this)), this.clickBanner[e] = r;
                }, adManager.createOneBanner = function () {
                    var a = o.configData.systemInfo,
                        e = a.screenWidth * this.bannerWid,
                        t = a.screenHeight,
                        n = wx.createBannerAd({
                            adUnitId: this.bannerId,
                            style: {
                                left: 0,
                                top: t,
                                width: e
                            }
                        });
                    n.onLoad(function (a) {
                        this.oldBanner && this.oldBanner.destroy(), this.oldBanner = this.botBanner, this.newBanner = n,
                            this.haveLoop = !0;
                    }.bind(this)), n.onError(function (a) {
                        this.createNewBanner = !1;
                    }.bind(this)), n.onResize(function (a) {
                        this.changeBannerStyle(a, n);
                    }.bind(this));
                }, adManager.desToryOldBanner = function () {
                    this.oldBanner && this.oldBanner.destroy(), this.oldBanner = null, this.newBanner && (this.botBanner = this.newBanner);
                }, adManager.changeBannerStyle = function (a, e) {
                    var t = a.width,
                        n = a.height,
                        i = o.configData.systemInfo,
                        r = i.screenWidth,
                        s = i.screenHeight;
                    i.model;
                    o.configData.isLongScreen && (s -= o.configData.chaAdy), e.style.top = s - n, e.style.left = (r - t) / 2;
                }, adManager.loopShowBanner = function (a, e) {
                    // this.desToryOldBanner(), this.createNewBanner && o.configData.haveAd && this.createOneBanner(), 
                    // (e || this.inShow) && this.changeShowBanner("show", a, "default");
                }, adManager.changeShowBanner = function (a, e, t) {
                    // var n;
                    // this.inShow = "show" == a, o.configData.haveAd && ("default" == t ? (n = this.botBanner, 
                    // "hide" == a && this.oldBanner && this.oldBanner.hide()) : "fuhuo" == t ? (n = this.clickBanner[t]) || "show" != a || (this.botBanner ? n = this.botBanner : this.clickBanner.jinbi ? n = this.clickBanner.jinbi : this.clickBanner.jiesuan && (n = this.clickBanner.jiesuan)) : "jinbi" == t ? (n = this.clickBanner[t]) || "show" != a || (this.botBanner ? n = this.botBanner : this.clickBanner.fuhuo ? n = this.clickBanner.fuhuo : this.clickBanner.jiesuan && (n = this.clickBanner.jiesuan)) : "jiesuan" == t && ((n = this.clickBanner[t]) || "show" != a || (this.botBanner ? n = this.botBanner : this.clickBanner.fuhuo ? n = this.clickBanner.fuhuo : this.clickBanner.jinbi && (n = this.clickBanner.jinbi))));
                    // var i, s = h.gameBanner.getInstance();
                    // n ? "show" == a ? (n.show(), i = "default" == t ? this.haveLoop ? r.bannerType.loopdefault : r.bannerType.default : "fuhuo" == t ? r.bannerType.fuhuo : "jinbi" == t ? r.bannerType.jiesuan : "jiesuan" == t ? r.bannerType.gameover : r.bannerType.other, 
                    // r.statistics.reportShowBanner(i), s.parent && s.removeSelf()) : n.hide() : !1 || (s.removeSelf(), 
                    // "show" == a && e && e.addChild(s));
                }, adManager.checkAbanner = function (a) {
                    var e;
                    return "default" == a ? e = this.botBanner : "fuhuo" == a ? (e = this.clickBanner[a]) || (this.botBanner ? e = this.botBanner : this.clickBanner.jinbi ? e = this.clickBanner.jinbi : this.clickBanner.jiesuan && (e = this.clickBanner.jiesuan)) : "jinbi" == a ? (e = this.clickBanner[a]) || (this.botBanner ? e = this.botBanner : this.clickBanner.fuhuo ? e = this.clickBanner.fuhuo : this.clickBanner.jiesuan && (e = this.clickBanner.jiesuan)) : "jiesuan" == a && ((e = this.clickBanner[a]) || (this.botBanner ? e = this.botBanner : this.clickBanner.fuhuo ? e = this.clickBanner.fuhuo : this.clickBanner.jinbi && (e = this.clickBanner.jinbi))),
                        e ? [e, "banner"] : [h.gameBanner.getInstance(), "gamebanner"];
                }, adManager.createVideo = function () {
                    this.videoAd = wx.createRewardedVideoAd({
                        adUnitId: this.videoId
                    }), this.videoAd.load(), this.videoAd.onLoad(function () {
                        this.haveVideo = !0;
                    }.bind(this)), this.videoAd.onClose(function (a) {
                        this.closeVideoFun(a);
                    }.bind(this)), this.videoAd.onError(function (a) {
                        this.haveVideo = !1;
                    }.bind(this));
                }, adManager.showVideo = function (a, e) {
                    // this.videoAd && (this.videoAd && this.videoAd.show().catch(function(a) {
                    //     i.platform.instance.showToast("今日视频已看完");
                    // }), this.closeVideoCall = a, r.statistics.reportLookVideo(e));
                    // this.closeVideoCall = a;
                    this.closeVideoCall && (this.closeVideoCall(true), this.closeVideoCall = null);
                }, adManager.errorVideo = function (a) { }, adManager.closeVideoFun = function (a) {
                    this.closeVideoCall && (this.closeVideoCall(a.isEnded), this.closeVideoCall = null);
                }, adManager.createInterAd = function () {
                    (function (a, e) {
                        a = a.split("."), e = e.split(".");
                        for (var t = Math.max(a.length, e.length); a.length < t;) a.push("0");
                        for (; e.length < t;) e.push("0");
                        for (var n = 0; n < t; n++) {
                            var i = parseInt(a[n]),
                                r = parseInt(e[n]);
                            if (i > r) return 1;
                            if (i < r) return -1;
                        }
                        return 0;
                    })(o.configData.systemInfo.SDKVersion, "2.6.0") >= 0 ? (this.interSad = wx.createInterstitialAd({
                        adUnitId: "adunit-fab6394ab3fdbe27"
                    }), this.interSad.onLoad(function () {
                        this.isHaveInterAd = !0;
                    }.bind(this)), this.interSad.onError(function (a) {
                        this.isHaveInterAd = !1;
                    }.bind(this))) : this.isHaveInterAd = !1;
                }, adManager.showInterAd = function () {
                    this.isHaveInterAd && this.interSad.show();
                }, adManager.bannerWid = .9, adManager.clickBanner = {}, adManager.haveVideo = !1,
                    adManager.delayBannerFuhuo = 0, adManager.delayBannerJinbi = 0, adManager.delayBannerSette = 0,
                    adManager.loopBannerTime = 0, adManager.createBtime = 500, adManager.emitLpro = !1,
                    adManager.createNewBanner = !0, adManager.haveLoop = !1, adManager.inShow = !1,
                    adManager.closeVideoCall = null, adManager.isHaveInterAd = !1, adManager;
            }();
        t.adManager = c;
    }, {
        "../configData": 3,
        "../data/gameEnum": 5,
        "../page/perfab/gameBanner": 43,
        "../platform/platform": 55,
        "./eventManager": 21,
        "./statistics": 24
    }],
    20: [function (a, e, t) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var n = a("../configData"),
            i = function () {
                function assectManager() { }
                return assectManager.loadPerfab = function (a, e) {
                    Laya.Sprite3D.load("res/LayaScene_trafficscene/Conventional/" + a + ".lh", Laya.Handler.create(this, function (a) {
                        var t = a.transform.scale.clone(),
                            i = new Laya.Vector3(0, 0, 0);
                        Laya.Vector3.scale(t, n.configData.modeScale, i), a.transform.scale = i, e && e(a);
                    }));
                }, assectManager.loadPerfab1 = function (a, e) {
                    Laya.Sprite3D.load("res/LayaScene_trafficscene/Conventional/" + a + ".lh", Laya.Handler.create(this, function (a) {
                        var t = a.transform.scale.clone(),
                            i = new Laya.Vector3(0, 0, 0);
                        Laya.Vector3.scale(t, n.configData.effectScale, i), a.transform.scale = i, e && e(a);
                    }));
                }, assectManager;
            }();
        t.assectManager = i;
    }, {
        "../configData": 3
    }],
    21: [function (a, e, t) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var n = function () {
            function eventManager() {
                this.dispatcher = new Laya.EventDispatcher();
            }
            return eventManager.prototype.onEvent = function (a, e, t) {
                this.dispatcher.on(a, e, t);
            }, eventManager.prototype.emitEvent = function (a, e) {
                this.dispatcher.event(a, e);
            }, eventManager.prototype.offEvent = function (a, e, t) {
                this.dispatcher.off(a, e, t);
            }, eventManager.prototype.onceEvent = function (a, e, t) {
                this.dispatcher.once(a, e, t);
            }, eventManager.instance = new eventManager(), eventManager;
        }();
        t.eventManager = n;
    }, {}],
    22: [function (a, e, t) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var n = a("../platform/platform"),
            i = a("./statistics"),
            r = a("../data/userData"),
            o = a("../configData"),
            s = function () {
                function shareManager() { }
                return shareManager.share = function (a, e) {
                    var t = "",
                        o = "",
                        s = "";
                    if (this.shareData)
                        for (var h = 0; h < this.shareData.length; h++) {
                            var c = this.shareData[h];
                            if (c.share_id == a) {
                                t = c.share_title, o = c.share_img;
                                break;
                            }
                        }
                    s += "share_id=" + a + "&share_user_id=" + r.userData.id, this.isInshare = !0, this.shareCall = e,
                        this.outTime = Date.now(), n.platform.instance.shareAppMessage(t, o, s), i.statistics.reportStartShare(a);
                }, shareManager.backShare = function () {
                    if (this.isInshare) {
                        this.isInshare = !1;
                        var a = !1;
                        Date.now() - this.outTime > o.configData.shareTime && (a = !0), this.shareCall && this.shareCall(a),
                            this.shareCall = null;
                    }
                }, shareManager.shareMod = 0, shareManager.isInshare = !1, shareManager.shareCall = null,
                    shareManager;
            }();
        t.shareManager = s;
    }, {
        "../configData": 3,
        "../data/userData": 7,
        "../platform/platform": 55,
        "./statistics": 24
    }],
    23: [function (a, e, t) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var n = a("../data/gameEnum"),
            i = a("../data/userData"),
            r = function () {
                function soundManager() {
                    Laya.SoundManager.autoReleaseSound = !1;
                }
                return soundManager.playSound = function (a, e) {
                    i.userData.mute || (this.soundCn[a] ? this.continuePlay(a) : this.soundCn[a] = Laya.SoundManager.playMusic(a, e));
                }, soundManager.playEffect = function (a, e, t) {
                    if (void 0 === t && (t = 1), !i.userData.mute) {
                        var r = "";
                        a == n.GameSound.cars ? (t > 7 && (t = 7), r = "sound/" + t + ".mp3") : r = "sound/" + a + ".mp3",
                            this.soundCn[a] = Laya.SoundManager.playSound(r, e);
                    }
                }, soundManager.stopSound = function (a) {
                    Laya.SoundManager.stopSound(a);
                }, soundManager.pauseSound = function (a) {
                    var e = this.soundCn[a];
                    e && e.pause();
                }, soundManager.continuePlay = function (a) {
                    var e = this.soundCn[a];
                    e && !i.userData.mute && e.resume();
                }, soundManager.soundCn = {}, soundManager;
            }();
        t.soundManager = r;
    }, {
        "../data/gameEnum": 5,
        "../data/userData": 7
    }],
    24: [function (a, e, t) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var n = a("../platform/platform"),
            i = function () {
                function statistics() { }
                return statistics.reportClickTryGame = function (a, e, t) {
                    var i = {
                        appid: a,
                        jump: t,
                        category: e
                    };
                    n.platform.instance.request("clickWxapp", i, function (a) { }, null);
                }, statistics.reportClickShare = function (a, e) {
                    var t = {
                        share_id: a,
                        share_user_id: e
                    };
                    n.platform.instance.request("clickShare", t, function (a) { }, null);
                }, statistics.reportStartShare = function (a) {
                    var e = {
                        share_id: a
                    };
                    n.platform.instance.request("recordShare", e, function (a) { }, null);
                }, statistics.reportLookVideo = function (a) {
                    var e = {
                        ad_type: a
                    };
                    n.platform.instance.request("viewVideo", e, function (a) { }, null);
                }, statistics.reportShowBanner = function (a) { }, statistics;
            }();
        t.statistics = i,
            function (a) {
                a[a.fuhuo = 1] = "fuhuo", a[a.jiesuan = 2] = "jiesuan", a[a.award = 3] = "award",
                    a[a.start = 4] = "start";
            }(t.videoType || (t.videoType = {})),
            function (a) {
                a[a.default = 1] = "default", a[a.loopdefault = 2] = "loopdefault", a[a.fuhuo = 3] = "fuhuo",
                    a[a.jiesuan = 4] = "jiesuan", a[a.gameover = 5] = "gameover", a[a.other = 6] = "other";
            }(t.bannerType || (t.bannerType = {}));
    }, {
        "../platform/platform": 55
    }],
    25: [function (a, e, t) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var n = function () {
            function storageManager() { }
            return storageManager.setStorage = function (a, e) {
                var t;
                t = "object" == typeof e ? JSON.stringify(e) : e, Laya.LocalStorage.setItem(a, t);
            }, storageManager.getStorage = function (a) {
                var e, t = Laya.LocalStorage.getItem(a);
                return t && (e = JSON.parse(t)), e;
            }, storageManager.clearStorage = function (a) {
                Laya.LocalStorage.removeItem(a);
            }, storageManager;
        }();
        t.storageManager = n;
    }, {}],
    26: [function (a, e, t) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var n = function () {
            function tableManager() {
                this.tableData = Laya.loader.getRes("res/tableData.json");
            }
            return tableManager.getInstance = function () {
                return this.instance || (this.instance = new tableManager()), this.instance;
            }, tableManager.prototype.getDataByKey = function (a, e, t) {
                var n = this.tableData[a];
                if (!n) return !1;
                var i = n[e];
                return !!i && i[t];
            }, tableManager.prototype.getRowDataByKey = function (a, e) {
                var t = this.tableData[a];
                return !!t && t[e];
            }, tableManager.prototype.getTableLength = function (a) {
                var e = this.tableData[a];
                return !!e && Object.keys(e).length;
            }, tableManager.prototype.getTableData = function (a) {
                var e = this.tableData[a];
                return e || !1;
            }, tableManager.prototype.getKeyByVal = function (a, e, t) {
                var n = this.tableData[a];
                if (!n) return !1;
                for (var i, r = Object.keys(n), o = 0; o < r.length; o++) {
                    if (n[r[o]][e] == t) {
                        i = r[o];
                        break;
                    }
                }
                return i;
            }, tableManager;
        }();
        t.default = n;
    }, {}],
    27: [function (a, e, t) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var n = a("./tableManager"),
            i = a("./storageManager"),
            r = a("../data/gameEnum"),
            o = a("../platform/platform"),
            s = a("../data/userData"),
            h = a("../utils"),
            c = a("./eventManager"),
            g = a("../configData"),
            p = function () {
                function taskManager() { }
                return taskManager.initData = function () {
                    var a = n.default.getInstance().getTableData("tasks"),
                        e = [],
                        t = [];
                    for (var i in a) {
                        var r = a[i],
                            o = r.type,
                            s = r.id,
                            h = r.task,
                            c = r.award.split(",");
                        if ("alltask" != h) {
                            if ("task" == o) c.forEach(function (a, t) {
                                var n = a.split("%"),
                                    i = s + "_" + t,
                                    r = Number(n[0]),
                                    o = Number(n[1]);
                                e.push({
                                    taskid: i,
                                    taskname: h,
                                    tasknums: r,
                                    taskaward: o,
                                    tasktype: "task"
                                });
                            });
                            else if ("achieve" == o) {
                                c.forEach(function (a, e) {
                                    var n = a.split("%"),
                                        i = s + "_" + e,
                                        r = Number(n[0]),
                                        o = Number(n[1]);
                                    t.push({
                                        taskid: i,
                                        taskname: h,
                                        tasknums: r,
                                        taskaward: o,
                                        tasktype: "achieve"
                                    });
                                });
                                var p = Number(r.addachieve),
                                    d = Number(c[c.length - 1].split("%")[1]),
                                    l = Number(c[c.length - 1].split("%")[0]),
                                    m = c.length - 1;
                                this.achieveAdd[h] = {
                                    baseid: s,
                                    basenums: l,
                                    baseidx: m,
                                    addnums: p,
                                    addaward: d
                                };
                            }
                        } else if ("task" == o) {
                            var u = c[0].split("%"),
                                f = s + "_0",
                                v = (Number(u[0]), Number(u[1]));
                            this.alltask = {
                                taskid: f,
                                taskname: h,
                                tasknums: g.configData.oneDayTask,
                                taskaward: v,
                                compnums: 0,
                                receive: 1,
                                lesscomp: g.configData.oneDayTask - 0,
                                tasktype: "task"
                            };
                        }
                    }
                    this.taskData = e, this.baseAchieve = t, this.getInitTaskPro();
                }, taskManager.getInitTaskPro = function () {
                    s.userData.solveTaskData("get", function (a) {
                        var e = a.data,
                            t = {};
                        if (e)
                            for (var n = e.split(";"), i = 0; i < n.length; i++) {
                                var r = n[i].split("_"),
                                    o = r[0],
                                    h = Number(r[1]);
                                t[o] = h;
                            }
                        t.hasOwnProperty("g") ? s.userData.hisGetGold = t.g : s.userData.hisGetGold = s.userData.gold,
                            t.hasOwnProperty("w") ? s.userData.wudis = t.w : s.userData.wudis = 0, t.hasOwnProperty("c") ? s.userData.chacars = t.c : s.userData.chacars = 0,
                            t.hasOwnProperty("l") ? s.userData.lchacars = t.l : s.userData.lchacars = 0, t.hasOwnProperty("f") ? s.userData.fuhuos = t.f : s.userData.fuhuos = 0,
                            t.hasOwnProperty("v") ? s.userData.videos = t.v : s.userData.videos = 0, s.userData.solveTaskData("post", function (a) { }.bind(this), function (a) { }.bind(this)),
                            this.getcompAchieve();
                    }.bind(this), function () {
                        console.log("获取任务数据失败");
                    }.bind(this));
                }, taskManager.getcompAchieve = function () {
                    o.platform.instance.request("achievementStatus", {}, function (a) {
                        var e = a.list;
                        this.initAchieve(e);
                    }.bind(this), function (a) {
                        this.initAchieve([]);
                    }.bind(this));
                }, taskManager.initAchieve = function (a) {
                    var e = [],
                        t = [];
                    this.initAchieve2(a, this.baseAchieve);
                    for (var n = 0; n < this.baseAchieve.length; n++) {
                        for (var i = this.baseAchieve[n], r = i.taskid, o = 1, h = 0; h < a.length; h++) {
                            var c = a[h];
                            if (r == c.task_id) o = 0 == c.status ? 3 : 0;
                        }
                        var g = i.taskname,
                            p = i.tasknums,
                            d = i.taskaward,
                            l = 0;
                        switch (g) {
                            case "getgold":
                                l = s.userData.hisGetGold;
                                break;

                            case "wudi":
                                l = s.userData.wudis;
                                break;

                            case "chacars":
                                l = s.userData.chacars;
                                break;

                            case "lchacars":
                                l = s.userData.lchacars;
                                break;

                            case "upcars":
                                var m = 0;
                                for (var u in s.userData.carInfo) {
                                    m += s.userData.carInfo[u] - 1;
                                }
                                l = m;
                                break;

                            case "tlevel":
                                l = s.userData.level - 1;
                                break;

                            case "videos":
                                l = s.userData.videos;
                                break;

                            case "fuhuos":
                                l = s.userData.fuhuos;
                                break;

                            case "toscore":
                                l = s.userData.maxScore;
                                break;

                            default:
                                console.error("未定义任务", g);
                        }
                        1 == o && l >= p && (t.push(r), o = 3), l >= p && (l = p);
                        var f = {
                            taskid: r,
                            taskname: g,
                            tasknums: p,
                            taskaward: d,
                            compnums: l,
                            receive: o,
                            lesscomp: p - l,
                            tasktype: "achieve"
                        };
                        e.push(f);
                    }
                    t.length > 0 && this.achievementComplete(t), this.addAchieveData(e), this.achieveData = this.sortTask(e);
                }, taskManager.initAchieve2 = function (a, e) {
                    for (var t = [], i = 0; i < a.length; i++) {
                        for (var r = a[i].task_id, o = !1, s = 0; s < e.length; s++) {
                            if (r == e[s].taskid) {
                                o = !0;
                                break;
                            }
                        }
                        o || t.push(r);
                    }
                    for (var h = 0; h < t.length; h++) {
                        var c = t[h],
                            g = c.split("_"),
                            p = Number(g[0]),
                            d = Number(g[1]),
                            l = n.default.getInstance().getRowDataByKey("tasks", p + ""),
                            m = l.award.split(","),
                            u = Number(l.addachieve),
                            f = m[m.length - 1].split("%"),
                            v = Number(f[0]),
                            y = Number(f[1]),
                            b = 0,
                            D = 0;
                        d > m.length - 1 && (b = v + (d - m.length + 1) * u, D = y);
                        var w = l.task;
                        e.push({
                            taskid: c,
                            taskname: w,
                            tasknums: b,
                            taskaward: D,
                            tasktype: "achieve"
                        });
                    }
                }, taskManager.setItemData = function (a, e, t, n) {
                    var i = {
                        taskid: e.baseid + "_" + (t + 1),
                        taskname: a,
                        tasknums: e.basenums + e.addnums * (t + 1 - e.baseidx),
                        taskaward: e.addaward,
                        compnums: 0,
                        receive: 1,
                        lesscomp: 0,
                        tasktype: "achieve"
                    },
                        r = i.taskname,
                        o = i.tasknums,
                        h = i.receive,
                        c = i.taskid,
                        g = 0;
                    switch (r) {
                        case "getgold":
                            g = s.userData.hisGetGold;
                            break;

                        case "wudi":
                            g = s.userData.wudis;
                            break;

                        case "chacars":
                            g = s.userData.chacars;
                            break;

                        case "lchacars":
                            g = s.userData.lchacars;
                            break;

                        case "upcars":
                            var p = 0;
                            for (var d in s.userData.carInfo) {
                                p += s.userData.carInfo[d] - 1;
                            }
                            g = p;
                            break;

                        case "tlevel":
                            g = s.userData.level - 1;
                            break;

                        case "videos":
                            g = s.userData.videos;
                            break;

                        case "fuhuos":
                            g = s.userData.fuhuos;
                            break;

                        case "toscore":
                            g = s.userData.maxScore;
                            break;

                        default:
                            console.error("未定义任务", r);
                    }
                    return 1 == h && g >= o && (n.push(c), h = 3), g >= o && (g = o), i.compnums = g,
                        i.receive = h, i.lesscomp = o - g, i;
                }, taskManager.freshTodayTask = function () {
                    for (var a = []; a.length < g.configData.oneDayTask;) {
                        var e = Math.floor(Math.random() * this.taskData.length),
                            t = this.taskData.splice(e, 1)[0];
                        t.compnums = 0, t.receive = 1, t.lesscomp = t.tasknums - 0, a.push(t);
                    }
                    this.todayTaskData = this.sortTask(a), this.todayTaskData.unshift(this.alltask);
                }, taskManager.initTodayTask = function () {
                    var a = i.storageManager.getStorage(r.GameStorage.task);
                    a.hasOwnProperty("todaytask") ? this.todayTaskData = a.todaytask : this.freshTodayTask();
                }, taskManager.updateAchieve = function () {
                    for (var a = this.achieveData, e = 0; e < a.length; e++) {
                        var t = a[e],
                            n = t.taskname,
                            i = 0;
                        switch (n) {
                            case "getgold":
                                i = s.userData.hisGetGold;
                                break;

                            case "wudi":
                                i = s.userData.wudis;
                                break;

                            case "chacars":
                                i = s.userData.chacars;
                                break;

                            case "lchacars":
                                i = s.userData.lchacars;
                                break;

                            case "upcars":
                                var o = 0;
                                for (var h in s.userData.carInfo) {
                                    o += s.userData.carInfo[h] - 1;
                                }
                                i = o;
                                break;

                            case "tlevel":
                                i = s.userData.level - 1;
                                break;

                            case "videos":
                                i = s.userData.videos;
                                break;

                            case "fuhuos":
                                i = s.userData.fuhuos;
                                break;

                            case "toscore":
                                i = s.userData.maxScore;
                                break;

                            default:
                                console.error("未定义任务", n);
                        }
                        var g = t.receive,
                            p = t.tasknums;
                        1 == g && i >= p && (g = 3), i > p && (i = p), t.receive = g, t.compnums = i, t.lesscomp = p - i;
                    }
                    this.addAchieveData(a), this.achieveData = this.sortTask(a), c.eventManager.instance.emitEvent(r.GameEvent.changeShowTask, "task");
                }, taskManager.updateTodayTask = function () {
                    for (var a = this.todayTaskData, e = 0, t = 0; t < a.length; t++) {
                        var n = a[t],
                            i = n.taskname,
                            o = 0;
                        if ("alltask" != i) {
                            switch (i) {
                                case "getgold":
                                    o = s.userData.todaygold;
                                    break;

                                case "wudi":
                                    o = s.userData.todaywudi;
                                    break;

                                case "chacars":
                                    o = s.userData.todaychacars;
                                    break;

                                case "lchacars":
                                    o = s.userData.todaylchacars;
                                    break;

                                case "upcars":
                                    o = s.userData.todayupcars;
                                    break;

                                case "tlevel":
                                    o = s.userData.todaytlevel;
                                    break;

                                case "maxscore":
                                    o = s.userData.todaymaxscore;
                                    break;

                                case "videos":
                                    o = s.userData.todayvideos;
                                    break;

                                case "fuhuos":
                                    o = s.userData.todayfuhuos;
                                    break;

                                default:
                                    console.error("未定义今日任务", i);
                            }
                            var h = n.receive,
                                g = n.tasknums;
                            1 == h && o >= g && (h = 3), o > g && (o = g), 3 != h && 0 != h || (e += 1), n.receive = h,
                                n.compnums = o, n.lesscomp = g - o;
                        }
                    }
                    for (var p = 0; p < a.length; p++) {
                        var d = a[p],
                            l = d.taskname,
                            m = d.receive;
                        if ("alltask" == l && 1 == m) {
                            var u = d.tasknums;
                            e >= u && (e = u, m = 3);
                            var f = e - u;
                            d.receive = m, d.compnums = e, d.lesscomp = f;
                            break;
                        }
                    }
                    this.todayTaskData = this.sortTask(a), this.adjustTodayTask(), this.saveLocalData(),
                        c.eventManager.instance.emitEvent(r.GameEvent.changeShowTask, "task");
                }, taskManager.adjustTodayTask = function () {
                    for (var a = !1, e = this.todayTaskData.length - 1, t = (this.todayTaskData.length,
                        0); t < this.todayTaskData.length; t++) {
                        var n = this.todayTaskData[t];
                        if ("alltask" != n.taskname) {
                            var i = n.receive;
                            3 != i && 1 != i || t;
                        } else a = !0, e = t;
                    }
                    if (a) {
                        var r = this.todayTaskData.splice(e, 1)[0];
                        this.todayTaskData.unshift(r);
                    }
                }, taskManager.achievementComplete = function (a) {
                    var e = {
                        achievement: a.join(",")
                    };
                    o.platform.instance.request("achievementComplete", e, function (a) { }.bind(this), function (a) { }.bind(this));
                }, taskManager.getAchieveAward = function (a, e) {
                    var t = {
                        task_id: a,
                        gold: e
                    };
                    o.platform.instance.request("achievementSuccess", t, function (t) {
                        this.changeATreceive("achieve", a), s.userData.changeGameGold(e), s.userData.changeTodayGold(e),
                            c.eventManager.instance.emitEvent(r.GameEvent.freshTaskShow, null);
                    }.bind(this), function () { }.bind(this));
                }, taskManager.getTodayTaskAward = function (a, e) {
                    var t = {
                        gold: e
                    };
                    o.platform.instance.request("getGold", t, function (t) {
                        this.changeATreceive("task", a), s.userData.changeGameGold(e), s.userData.changeTodayGold(e),
                            c.eventManager.instance.emitEvent(r.GameEvent.freshTaskShow, null);
                    }.bind(this), function () {
                        o.platform.instance.showToast("领取任务奖励失败，点击重试");
                    }.bind(this));
                }, taskManager.changeATreceive = function (a, e) {
                    if ("achieve" == a)
                        for (var t = 0; t < this.achieveData.length; t++) {
                            var n = this.achieveData[t];
                            if (n.taskid == e) {
                                n.receive = 0;
                                break;
                            }
                        } else if ("task" == a)
                        for (t = 0; t < this.todayTaskData.length; t++) {
                            var i = this.todayTaskData[t];
                            if (i.taskid == e) {
                                i.receive = 0;
                                break;
                            }
                        }
                    c.eventManager.instance.emitEvent(r.GameEvent.changeShowTask, "task");
                }, taskManager.saveLocalData = function () {
                    var a = {
                        todaytask: this.todayTaskData
                    };
                    i.storageManager.setStorage(r.GameStorage.task, a);
                }, taskManager.addAchieveData = function (a) {
                    for (var e = 0, t = 0, n = 0, i = 0, r = 0, o = 0, s = 0, h = 0, c = !0, g = !0, p = !0, d = !0, l = !0, m = !0, u = !0, f = !0, v = 0; v < a.length; v++) {
                        var y = a[v],
                            b = y.taskname,
                            D = Number(y.taskid.split("_")[1]),
                            w = y.receive;
                        switch (b) {
                            case "getgold":
                                break;

                            case "wudi":
                                e = Math.max(e, D), 2 != w && 1 != w || (c = !1);
                                break;

                            case "chacars":
                                t = Math.max(t, D), 2 != w && 1 != w || (g = !1);
                                break;

                            case "lchacars":
                                n = Math.max(n, D), 2 != w && 1 != w || (p = !1);
                                break;

                            case "upcars":
                                i = Math.max(i, D), 2 != w && 1 != w || (d = !1);
                                break;

                            case "tlevel":
                                r = Math.max(r, D), 2 != w && 1 != w || (l = !1);
                                break;

                            case "videos":
                                o = Math.max(o, D), 2 != w && 1 != w || (m = !1);
                                break;

                            case "fuhuos":
                                s = Math.max(s, D), 2 != w && 1 != w || (u = !1);
                                break;

                            case "toscore":
                                h = Math.max(h, D), 2 != w && 1 != w || (f = !1);
                                break;

                            default:
                                console.error("未定义任务", b);
                        }
                    }
                    var x = [];
                    for (var k in this.achieveAdd) {
                        var M = this.achieveAdd[k];
                        switch (k) {
                            case "getgold":
                                break;

                            case "wudi":
                                if (c) {
                                    var C = this.setItemData(k, M, e, x);
                                    a.push(C);
                                }
                                break;

                            case "chacars":
                                if (g) {
                                    C = this.setItemData(k, M, t, x);
                                    a.push(C);
                                }
                                break;

                            case "lchacars":
                                if (p) {
                                    C = this.setItemData(k, M, n, x);
                                    a.push(C);
                                }
                                break;

                            case "upcars":
                                if (d) {
                                    C = this.setItemData(k, M, i, x);
                                    a.push(C);
                                }
                                break;

                            case "tlevel":
                                if (l) {
                                    C = this.setItemData(k, M, r, x);
                                    a.push(C);
                                }
                                break;

                            case "videos":
                                if (m) {
                                    C = this.setItemData(k, M, o, x);
                                    a.push(C);
                                }
                                break;

                            case "fuhuos":
                                if (u) {
                                    C = this.setItemData(k, M, s, x);
                                    a.push(C);
                                }
                                break;

                            case "toscore":
                                if (f) {
                                    C = this.setItemData(k, M, h, x);
                                    a.push(C);
                                }
                        }
                    }
                    x.length > 0 && this.achievementComplete(x);
                }, taskManager.sortTask = function (a) {
                    h.utils.sortFun(a, "receive", "down");
                    for (var e = [], t = [], n = [], i = [], r = 0; r < a.length; r++) {
                        var o = a[r],
                            s = o.receive;
                        3 == s ? e.push(o) : 2 == s ? t.push(o) : 1 == s ? n.push(o) : 0 == s && i.push(o);
                    }
                    var c = [];
                    return h.utils.sortFun(n, "lesscomp"), c.push.apply(c, e), c.push.apply(c, t), c.push.apply(c, n),
                        c.push.apply(c, i), a = null, c;
                }, taskManager.baseAchieve = [], taskManager.achieveData = [], taskManager.taskData = [],
                    taskManager.todayTaskData = [], taskManager.achieveAdd = {}, taskManager.taskName = {
                        getgold: "获得%个金币",
                        wudi: "获得%次无敌",
                        chacars: "加塞%辆车辆",
                        lchacars: "连续加塞%辆车",
                        upcars: "升级%次车辆",
                        tlevel: "通关%次",
                        maxscore: "突破%次最高分",
                        videos: "观看%次视频广告",
                        fuhuos: "复活%次",
                        toscore: "达到%分数",
                        alltask: "完成所有任务"
                    }, taskManager;
            }();
        t.taskManager = p;
    }, {
        "../configData": 3,
        "../data/gameEnum": 5,
        "../data/userData": 7,
        "../platform/platform": 55,
        "../utils": 59,
        "./eventManager": 21,
        "./storageManager": 25,
        "./tableManager": 26
    }],
    28: [function (a, e, t) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var n = a("../page/comp/btncomp"),
            i = a("../data/gameEnum"),
            r = a("./eventManager"),
            o = a("../page/dialog/rankDialog"),
            s = a("../page/dialog/fuhuoDialog"),
            h = a("../page/dialog/jiesuanDialog"),
            c = a("../page/dialog/gameoverDialog"),
            g = a("../page/perfab/chart"),
            p = a("../page/dialog/garageDialog"),
            d = a("../page/dialog/upcarDialog"),
            l = a("../page/dialog/taskDialog"),
            m = a("../configData"),
            u = a("../page/dialog/awardDialog"),
            f = a("./adManager"),
            v = a("../data/userData"),
            y = a("../data/currgameData"),
            b = a("../page/dialog/shoucangDialog"),
            D = a("../platform/platform"),
            w = a("../utils"),
            x = a("../page/dialog/trygameDialog"),
            k = a("../page/dialog/pipeiDialog"),
            M = function () {
                function uiManager() {
                    this.events = [i.GameEvent.openLoadPage, i.GameEvent.openHomePage, i.GameEvent.openGameView, i.GameEvent.openRank, i.GameEvent.openFuhuo, i.GameEvent.openJiesuan, i.GameEvent.openGameover, i.GameEvent.openGarage, i.GameEvent.openUplevelCar, i.GameEvent.openTask, i.GameEvent.openAward, i.GameEvent.openShouc, i.GameEvent.openTryPage, i.GameEvent.openPipeiPage, i.GameEvent.alertChart];
                }
                return uiManager.prototype.init = function () {
                    for (var a = 0; a < this.events.length; a++) {
                        var e = this.events[a];
                        r.eventManager.instance.onEvent(e, this, this[e]);
                    }
                }, uiManager.adaptPage = function (a, e, t, n) {
                    if (void 0 === n && (n = null), a.width = Laya.stage.width, a.height = Laya.stage.height,
                        n && (n.width = Laya.stage.width, n.height = Laya.stage.height, n.y = 0), m.configData.isLongScreen)
                        for (var i = 0; i < e.length; i++) {
                            e[i].y += 68;
                        }
                    "dialog" == t && (a.anchorX = .5, a.anchorY = .5, a.x = Laya.stage.width / 2, a.y = Laya.stage.height / 2);
                }, uiManager.prototype.openLoadPage = function () {
                    for (var a = [], e = 0; e < arguments.length; e++) a[e] = arguments[e];
                    this.openScene("scene/loadpage.scene", !0);
                }, uiManager.prototype.openHomePage = function () {
                    for (var a = [], e = 0; e < arguments.length; e++) a[e] = arguments[e];
                    this.openScene("scene/homepage.scene", !0);
                }, uiManager.prototype.openGameView = function () {
                    for (var a = [], e = 0; e < arguments.length; e++) a[e] = arguments[e];
                    this.openView("view/gamepage.scene", !0);
                }, uiManager.prototype.openRank = function () {
                    for (var a = [], e = 0; e < arguments.length; e++) a[e] = arguments[e];
                    var t = o.default.getInstance();
                    t.popupEffect = null, t.closeEffect = null, this.openDialog(t, !0);
                }, uiManager.prototype.openFuhuo = function () {
                    var t = new s.fuhuoDialog();
                    this.openDialog(t, !0);
                }, uiManager.prototype.openJiesuan = function () {
                    for (var a = [], e = 0; e < arguments.length; e++) a[e] = arguments[e];
                    var t = a[0];
                    if (y.currgameData.currgold > 0) {
                        var n = new h.jiesuanDialog(t);
                        this.openDialog(n, !0);
                    } else this.openGameover(t);
                }, uiManager.prototype.openGameover = function () {
                    for (var a = [], e = 0; e < arguments.length; e++) a[e] = arguments[e];
                    var t = a[0];
                    this.openGameoverPage(t);
                    // Laya.LocalStorage.etItem("maxScore",1);
                    // y.currgameData.gameover(function(e) {
                    //     v.userData.freshTodayTask(y.currgameData.currgold, y.currgameData.wudis, y.currgameData.gchacars, y.currgameData.lchacars, y.currgameData.receive, y.currgameData.gvideos, y.currgameData.currscore, t);
                    //     var n = e.max_score;
                    //     if (v.userData.maxScore < n && (v.userData.maxScore = n, D.platform.instance.setOpenStorage({
                    //         score: v.userData.maxScore
                    //     })), a.length > 1) {
                    //         var i = a[1];
                    //         w.utils.flyGoldFunc(i, function() {
                    //             this.openGameoverPage(t);
                    //         }.bind(this));
                    //     } else this.openGameoverPage(t);
                    // }.bind(this), function() {
                    //     D.platform.instance.showToast(i.GameTxt.failServer), console.error("结算失败"), this.openGameoverPage(t);
                    // }.bind(this));
                }, uiManager.prototype.openGameoverPage = function (a) {
                    var e = new c.gameoverDialog(a);
                    this.openDialog(e, !0);
                }, uiManager.prototype.openGarage = function () {
                    for (var a = [], e = 0; e < arguments.length; e++) a[e] = arguments[e];
                    var t = new p.garageDialog();
                    this.openDialog(t, !0);
                }, uiManager.prototype.openUplevelCar = function () {
                    for (var a = [], e = 0; e < arguments.length; e++) a[e] = arguments[e];
                    var t = new d.upcarDialog();
                    this.openDialog(t, !1);
                }, uiManager.prototype.openTask = function () {
                    for (var a = [], e = 0; e < arguments.length; e++) a[e] = arguments[e];
                    var t = new l.taskDialog();
                    this.openDialog(t, !0);
                }, uiManager.prototype.openAward = function () {
                    for (var a = [], e = 0; e < arguments.length; e++) a[e] = arguments[e];
                    var t = new u.awardDialog();
                    this.openDialog(t, !0);
                }, uiManager.prototype.openShouc = function () {
                    for (var a = [], e = 0; e < arguments.length; e++) a[e] = arguments[e];
                    var t = new b.shoucangDialog();
                    this.openDialog(t, !0);
                }, uiManager.prototype.openTryPage = function () {
                    for (var a = [], e = 0; e < arguments.length; e++) a[e] = arguments[e];
                    var t = new x.trygameDialog();
                    this.openDialog(t, !0);
                }, uiManager.prototype.openPipeiPage = function () {
                    for (var a = [], e = 0; e < arguments.length; e++) a[e] = arguments[e];
                    var t = new k.pipeiDialog();
                    this.openDialog(t, !0);
                }, uiManager.prototype.alertChart = function () {
                    // for (var a = [], e = 0; e < arguments.length; e++) a[e] = arguments[e];
                    // var t = a[0], n = a[1], i = a[2], r = new g.chart(t, n, i);
                    // a[3].addChild(r);
                }, uiManager.prototype.openScene = function (a, e, t) {
                    void 0 === t && (t = null), Laya.Scene.open(a, e, t);
                }, uiManager.prototype.openView = function (a, e) {
                    Laya.View.open(a, e);
                }, uiManager.prototype.openDialog = function (a, e) {
                    a.popup(e);
                }, uiManager.openEffect1 = function (a, e) {
                    a.scale(1, 1), Laya.Tween.from(a, {
                        x: Laya.stage.width / 2,
                        y: Laya.stage.height / 2,
                        scaleX: 0,
                        scaleY: 0
                    }, 300, Laya.Ease.backOut, Laya.Handler.create(a, function () {
                        e && e();
                    }), 0, !1, !1);
                }, uiManager.closeEffect1 = function (a, e) {
                    Laya.Tween.to(a, {
                        x: Laya.stage.width / 2,
                        y: Laya.stage.height / 2,
                        scaleX: 0,
                        scaleY: 0
                    }, 300, Laya.Ease.strongOut, Laya.Handler.create(this, function () {
                        e();
                    }), 0, !1, !1);
                }, uiManager.addBtnComp = function (a) {
                    for (var e = 0; e < a.length; e++) {
                        a[e].addComponent(n.btncomp);
                    }
                }, uiManager.removeBtnComp = function (a) {
                    for (var e = 0; e < a.length; e++) {
                        var t = a[e].getComponent(n.btncomp);
                        t && t.destroy();
                    }
                }, uiManager.instance = new uiManager(), uiManager;
            }();
        t.uiManager = M;
    }, {
        "../configData": 3,
        "../data/currgameData": 4,
        "../data/gameEnum": 5,
        "../data/userData": 7,
        "../page/comp/btncomp": 29,
        "../page/dialog/awardDialog": 30,
        "../page/dialog/fuhuoDialog": 31,
        "../page/dialog/gameoverDialog": 32,
        "../page/dialog/garageDialog": 33,
        "../page/dialog/jiesuanDialog": 34,
        "../page/dialog/pipeiDialog": 35,
        "../page/dialog/rankDialog": 36,
        "../page/dialog/shoucangDialog": 37,
        "../page/dialog/taskDialog": 38,
        "../page/dialog/trygameDialog": 39,
        "../page/dialog/upcarDialog": 40,
        "../page/perfab/chart": 42,
        "../platform/platform": 55,
        "../utils": 59,
        "./adManager": 19,
        "./eventManager": 21
    }],
    29: [function (a, e, t) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var n = a("../../data/gameEnum"),
            i = a("../../manager/soundManager"),
            r = function (a) {
                function btncomp() {
                    var e = a.call(this) || this;
                    return e.soundType = n.GameSound.click, e;
                }
                return __extends(btncomp, a), btncomp.prototype.onAwake = function () {
                    this.btn = this.owner, this.addEvent();
                }, btncomp.prototype.playBtnSound = function () {
                    i.soundManager.playEffect(n.GameSound.click, 1);
                }, btncomp.prototype.addEvent = function () {
                    this.btn.on(Laya.Event.CLICK, this, this.playBtnSound);
                }, btncomp.prototype.removeEvent = function () {
                    this.btn.off(Laya.Event.CLICK, this, this.playBtnSound);
                }, btncomp.prototype.onDestroy = function () {
                    this.removeEvent();
                }, btncomp;
            }(Laya.Script);
        t.btncomp = r;
    }, {
        "../../data/gameEnum": 5,
        "../../manager/soundManager": 23
    }],
    30: [function (a, e, t) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var n = a("../../ui/layaMaxUI"),
            i = a("../../manager/eventManager"),
            r = a("../../data/gameEnum"),
            o = a("../../manager/uiManager"),
            s = a("../perfab/goldtit"),
            h = a("../../data/userData"),
            c = a("../../utils"),
            g = a("../../platform/platform"),
            p = a("../../manager/adManager"),
            d = a("../../manager/shareManager"),
            l = a("../../manager/statistics"),
            m = function (a) {
                function awardDialog() {
                    return a.call(this) || this;
                }
                return __extends(awardDialog, a), awardDialog.prototype.onAwake = function () {
                    this.autoDestroyAtClosed = !0, o.uiManager.adaptPage(this, [this.contbox], "dialog"),
                        i.eventManager.instance.emitEvent(r.GameEvent.changeShowHome, !1), this.nawardgold = h.userData.awardGold,
                        this.onegold.value = c.utils.changeGoldTostr(this.nawardgold) + "", this.beigold.value = c.utils.changeGoldTostr(3 * this.nawardgold) + "",
                        this.awardtxt.text = "Get Gold+" + this.nawardgold, p.adManager.haveVideo ? this.icon.skin = "game/currency/videoblue.png" : h.userData.canshare ? this.icon.skin = "game/currency/shareblue.png" : (this.beibtn.visible = !1,
                            this.onebtn.x = 159), this.addEvent();
                    var a = new s.goldtit("award");
                    this.headbox.addChild(a);
                }, awardDialog.prototype.oneAwardFunc = function () {
                    this.setBtnEnable(!1);
                    var a = this.nawardgold;
                    h.userData.addGameGold(a, function () {
                        var e = h.userData.awardGold - this.nawardgold;
                        h.userData.awardGold = e, i.eventManager.instance.emitEvent(r.GameEvent.changeShowAward, null),
                            h.userData.saveAward(), c.utils.flyGoldFunc(this, this.closePage.bind(this)), h.userData.changeGameGold(a);
                    }.bind(this), function () {
                        this.setBtnEnable(!0), g.platform.instance.showToast(r.GameTxt.failServer);
                    }.bind(this));
                }, awardDialog.prototype.beiAwardFunc = function () {
                    this.setBtnEnable(!1), p.adManager.haveVideo ? p.adManager.showVideo(this.sucBeiAward.bind(this), l.videoType.award) : h.userData.canshare ? d.shareManager.share(r.ShareType.award, this.sucBeiAward.bind(this)) : g.platform.instance.showToast("暂无视频，明日再来");
                }, awardDialog.prototype.sucBeiAward = function (a) {
                    if (a) {
                        var e = 3 * this.nawardgold;
                        h.userData.addGameGold(e, function () {
                            var a = h.userData.awardGold - this.nawardgold;
                            h.userData.awardGold = a, i.eventManager.instance.emitEvent(r.GameEvent.changeShowAward, null),
                                h.userData.changeGameGold(e), h.userData.saveAward(), c.utils.flyGoldFunc(this, this.closePage.bind(this));
                        }.bind(this), function () {
                            this.setBtnEnable(!0), g.platform.instance.showToast(r.GameTxt.failServer);
                        }.bind(this));
                    } else this.setBtnEnable(!0);
                }, awardDialog.prototype.setBtnEnable = function (a) {
                    this.onebtn.mouseEnabled = a, this.beibtn.mouseEnabled = a;
                }, awardDialog.prototype.closePage = function () {
                    this.close(), i.eventManager.instance.emitEvent(r.GameEvent.changeShowHome, !0);
                }, awardDialog.prototype.addEvent = function () {
                    var a = [this.onebtn, this.beibtn, this.closebtn];
                    o.uiManager.addBtnComp(a), this.onebtn.on(Laya.Event.CLICK, this, this.oneAwardFunc),
                        this.beibtn.on(Laya.Event.CLICK, this, this.beiAwardFunc), this.closebtn.on(Laya.Event.CLICK, this, this.closePage);
                }, awardDialog.prototype.removeEvent = function () {
                    this.onebtn.off(Laya.Event.CLICK, this, this.oneAwardFunc), this.beibtn.off(Laya.Event.CLICK, this, this.beiAwardFunc),
                        this.closebtn.off(Laya.Event.CLICK, this, this.closePage);
                    var a = [this.onebtn, this.beibtn, this.closebtn];
                    o.uiManager.removeBtnComp(a);
                }, awardDialog.prototype.onDestroy = function () {
                    this.removeEvent();
                }, awardDialog;
            }(n.ui.dialog.awardpageUI);
        t.awardDialog = m;
    }, {
        "../../data/gameEnum": 5,
        "../../data/userData": 7,
        "../../manager/adManager": 19,
        "../../manager/eventManager": 21,
        "../../manager/shareManager": 22,
        "../../manager/statistics": 24,
        "../../manager/uiManager": 28,
        "../../platform/platform": 55,
        "../../ui/layaMaxUI": 58,
        "../../utils": 59,
        "../perfab/goldtit": 44
    }],
    31: [function (a, e, t) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var n = a("../../ui/layaMaxUI"),
            i = a("../../manager/eventManager"),
            r = a("../../data/gameEnum"),
            o = a("../../data/currgameData"),
            s = a("../../manager/uiManager"),
            h = a("../../data/userData"),
            c = a("../../utils"),
            g = a("../../manager/adManager"),
            p = a("../../manager/shareManager"),
            d = a("../../platform/platform"),
            l = a("../perfab/trypanel"),
            m = a("../../manager/statistics"),
            u = function (a) {
                function fuhuoDialog() {
                    var e = a.call(this) || this;
                    return e.fuhuoTime = 15, e.maxTime = 15, e.frameTime = 200, e.inPage = !0, e;
                }
                return __extends(fuhuoDialog, a), fuhuoDialog.prototype.onAwake = function () {
                    this.autoDestroyAtClosed = !0,
                        this.lesstime.value = "",
                        //  this.lessmask = new Laya.Sprite(), 
                        // this.proimg.mask = this.lessmask, 
                        // this.changeMaskPro(), 
                        this.sharefuhuobtn.visible = h.userData.fuhuoShare,
                        this.videofuhuobtn.visible = true, !this.videofuhuobtn.visible && this.sharefuhuobtn.visible && this.sharefuhuobtn.pos(this.videofuhuobtn.x, this.videofuhuobtn.y),
                        // h.userData.bannerTouch ? c.utils.delayShowAd("fuhuo", this.botbox, this) : c.utils.afterShowAd("fuhuo", this.botbox, this), 
                        this.trybox.removeChildren();
                    // var a = l.trypanel.getInstance();
                    // this.trybox.addChild(a), 
                    this.addEvent();
                }, fuhuoDialog.prototype.update = function () {
                    // if (this.inPage) {
                    //     if (this.fuhuoTime -= this.frameTime / 1e3, this.fuhuoTime <= -1) return void this.toNextPage();
                    //     var a = Math.ceil(this.fuhuoTime) + "";
                    //     this.lesstime.value != a && (this.lesstime.value = a), this.changeMaskPro();
                    // }
                }, fuhuoDialog.prototype.changeMaskPro = function () {
                    // var a = this.proimg.width, e = this.fuhuoTime / this.maxTime;
                    // e > 1 && (e = 1);
                    // var t = 360 * (1 - e) - 90;
                    // this.lessmask.graphics.drawPie(0, 0, a, -90, t, "#fff"), this.lessmask.pos(a / 2, a / 2);
                }, fuhuoDialog.prototype.toNextPage = function () {
                    g.adManager.changeShowBanner("hide", this, "fuhuo"), this.trybox.removeChildren(),
                        i.eventManager.instance.emitEvent(r.GameEvent.openJiesuan, "fail");
                }, fuhuoDialog.prototype.toFuhuo = function () {
                    for (var a = [], e = 0; e < arguments.length; e++) a[e] = arguments[e];
                    this.inPage = !1;
                    var t = a[0];
                    //视频
                    CoinApp.showRewarded(() => {
                        //给奖励
                        this.sucFuhuo("fuhuo");
                    }, () => {
                        //视频没看完
                        promptText("No video or midway shutdown.");
                    })


                    // this.fuhuotype = t, "share" == t ? p.shareManager.share(r.ShareType.fuhuo, this.sucFuhuo.bind(this)) : g.adManager.showVideo(this.sucFuhuo.bind(this), m.videoType.fuhuo);
                }, fuhuoDialog.prototype.sucFuhuo = function (a) {
                    this.inPage = !0, a ? ("share" != this.fuhuotype && o.currgameData.addGvideo(),
                        i.eventManager.instance.emitEvent(r.GameEvent.fuhuo, null), o.currgameData.changeGameStat(1),
                        o.currgameData.addReceive(), this.closePage()) : d.platform.instance.showToast("通讯失败");
                }, fuhuoDialog.prototype.closePage = function () {
                    this.trybox.removeChildren(), g.adManager.changeShowBanner("hide", this, "fuhuo"),
                        this.close();
                }, fuhuoDialog.prototype.addEvent = function () {
                    var a = [this.jumpbtn, this.sharefuhuobtn, this.videofuhuobtn];
                    s.uiManager.addBtnComp(a), this.jumpbtn.on(Laya.Event.CLICK, this, this.toNextPage),
                        this.sharefuhuobtn.on(Laya.Event.CLICK, this, this.toFuhuo, ["share"]), this.videofuhuobtn.on(Laya.Event.CLICK, this, this.toFuhuo, ["video"]),
                        Laya.timer.loop(this.frameTime, this, this.update);
                }, fuhuoDialog.prototype.removeEvent = function () {
                    this.jumpbtn.off(Laya.Event.CLICK, this, this.toNextPage), this.sharefuhuobtn.off(Laya.Event.CLICK, this, this.toFuhuo),
                        this.videofuhuobtn.off(Laya.Event.CLICK, this, this.toFuhuo), Laya.timer.clear(this, this.update);
                    var a = [this.jumpbtn, this.sharefuhuobtn, this.videofuhuobtn];
                    s.uiManager.removeBtnComp(a);
                }, fuhuoDialog.prototype.onDestroy = function () {
                    this.removeEvent();
                }, fuhuoDialog;
            }(n.ui.dialog.fuhuopageUI);
        t.fuhuoDialog = u;
    }, {
        "../../data/currgameData": 4,
        "../../data/gameEnum": 5,
        "../../data/userData": 7,
        "../../manager/adManager": 19,
        "../../manager/eventManager": 21,
        "../../manager/shareManager": 22,
        "../../manager/statistics": 24,
        "../../manager/uiManager": 28,
        "../../platform/platform": 55,
        "../../ui/layaMaxUI": 58,
        "../../utils": 59,
        "../perfab/trypanel": 51
    }],
    32: [function (a, e, t) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var n = a("../../ui/layaMaxUI"),
            i = a("../../manager/eventManager"),
            r = a("../../data/gameEnum"),
            o = a("../../data/currgameData"),
            s = a("../../manager/uiManager"),
            h = a("../../data/userData"),
            c = a("../../utils"),
            g = a("../perfab/trygameItem"),
            p = a("../../data/tryGameData"),
            d = a("../../manager/shareManager"),
            l = a("../../manager/adManager"),
            m = function (a) {
                function gameoverDialog(e) {
                    var t = a.call(this) || this;
                    return t.showTryGame = !0, t.type = e, t;
                }
                return __extends(gameoverDialog, a), gameoverDialog.prototype.onAwake = function () {
                    var a, e;
                    this.autoDestroyAtClosed = !0, s.uiManager.adaptPage(this, [this.topbox], "dialog"),
                        this.addEvent(), h.userData.bannerTouch ? c.utils.delayShowAd("jiesuan", this.botbox, this) : c.utils.afterShowAd("jiesuan", this.botbox, this),
                        this.nlevel.value = h.userData.level + "",
                        "fail" == this.type ? (1 == o.currgameData.cameraType && (o.currgameData.camdietime += 1),
                            a = "game/gameover/errorlevel.png", e = "game/gameover/onetime.png", o.currgameData.currscore = 0,
                            o.currgameData.continueLevel = 0) : (a = "game/gameover/suclevel.png", e = "game/gameover/nextlevel.png",
                                o.currgameData.continueLevel += 1), this.titimg.skin = a, this.btnimg.skin = e,
                        this.trylist.itemRender = g.trygameItem, this.trylist.renderHandler = Laya.Handler.create(this, this.renderTryGame, null, !1),
                        this.trylist.repeatX = 3, this.trylist.repeatY = 2, this.trylist.spaceX = 15, this.trylist.spaceY = 15,
                        this.trylist.x = 15, this.trylist.y = 15;
                    var t = p.tryGameData.getNextGame("jiesuan", [], 6);
                    this.trylist.array = t;
                }, gameoverDialog.prototype.renderTryGame = function (a) {
                    var e = a.dataSource;
                    a.setShow(e);
                }, gameoverDialog.prototype.changetryData = function (a) {
                    for (var e = this.trylist.array, t = [], n = 0, i = 0; i < e.length; i++) {
                        var r = e[i].id;
                        r == a && (n = i), t.push(r);
                    }
                    var o = p.tryGameData.changeItemData("jiesuan", t);
                    o && (e[n] = o), this.trylist.array = e, this.trylist.refresh();
                }, gameoverDialog.prototype.backHome = function () {
                    this.resetGame(), i.eventManager.instance.emitEvent(r.GameEvent.openHomePage, null);
                }, gameoverDialog.prototype.restartGame = function () {
                    this.resetGame(), i.eventManager.instance.emitEvent(r.GameEvent.openGameView, null);
                }, gameoverDialog.prototype.toShare = function () {
                    this.showTryGame = !1, d.shareManager.share(r.ShareType.gameover, function () {
                        this.showTryGame = !0;
                    }.bind(this));
                }, gameoverDialog.prototype.resetGame = function () {
                    l.adManager.changeShowBanner("hide", this, "jiesuan"), this.close(), i.eventManager.instance.emitEvent(r.GameEvent.resetGame, null),
                        o.currgameData.changeGameStat(0), o.currgameData.changeGameBei(1), i.eventManager.instance.emitEvent(r.GameEvent.initScene, null);
                }, gameoverDialog.prototype.openTrygame = function () {
                    this.showTryGame && (l.adManager.changeShowBanner("hide", this.parent, "jiesuan"),
                        i.eventManager.instance.emitEvent(r.GameEvent.openTryPage, null));
                }, gameoverDialog.prototype.addEvent = function () {
                    var a = [this.backhome, this.restartbtn, this.sharebtn];
                    s.uiManager.addBtnComp(a), this.backhome.on(Laya.Event.CLICK, this, this.backHome),
                        this.restartbtn.on(Laya.Event.CLICK, this, this.restartGame), this.sharebtn.on(Laya.Event.CLICK, this, this.toShare),
                        i.eventManager.instance.onEvent(r.GameEvent.changeTrydata, this, this.changetryData),
                        i.eventManager.instance.onEvent(r.GameEvent.backInSettle, this, this.openTrygame);
                }, gameoverDialog.prototype.removeEvent = function () {
                    this.backhome.off(Laya.Event.CLICK, this, this.backHome), this.restartbtn.off(Laya.Event.CLICK, this, this.restartGame),
                        this.sharebtn.off(Laya.Event.CLICK, this, this.toShare), i.eventManager.instance.offEvent(r.GameEvent.changeTrydata, this, this.changetryData),
                        i.eventManager.instance.offEvent(r.GameEvent.backInSettle, this, this.openTrygame);
                    var a = [this.backhome, this.restartbtn, this.sharebtn];
                    s.uiManager.removeBtnComp(a);
                }, gameoverDialog.prototype.onDestroy = function () {
                    this.removeEvent();
                }, gameoverDialog;
            }(n.ui.dialog.gameoverpageUI);
        t.gameoverDialog = m;
    }, {
        "../../data/currgameData": 4,
        "../../data/gameEnum": 5,
        "../../data/tryGameData": 6,
        "../../data/userData": 7,
        "../../manager/adManager": 19,
        "../../manager/eventManager": 21,
        "../../manager/shareManager": 22,
        "../../manager/uiManager": 28,
        "../../ui/layaMaxUI": 58,
        "../../utils": 59,
        "../perfab/trygameItem": 48
    }],
    33: [function (a, e, t) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var n = a("../../ui/layaMaxUI"),
            i = a("../../manager/eventManager"),
            r = a("../../data/gameEnum"),
            o = a("../perfab/caritem1"),
            s = a("../../manager/tableManager"),
            h = a("../../manager/uiManager"),
            c = a("../perfab/goldtit"),
            g = a("../../data/userData"),
            p = a("../../utils"),
            d = a("../../configData"),
            l = function (a) {
                function garageDialog() {
                    var e = a.call(this) || this;
                    return e.carData = [], e;
                }
                return __extends(garageDialog, a), garageDialog.prototype.onAwake = function () {
                    h.uiManager.adaptPage(this, [this.contbox, this.botbox], "dialog"), this.autoDestroyAtClosed = !0,
                        i.eventManager.instance.emitEvent(r.GameEvent.changeShowHome, !1);
                    var a = new c.goldtit("garage");
                    this.headbox.addChild(a), this.carlist.itemRender = o.caritem1, this.carlist.repeatX = 2,
                        this.carlist.spaceX = 25, this.carlist.spaceY = 10, this.carlist.vScrollBarSkin = "",
                        this.carlist.renderHandler = Laya.Handler.create(this, this.renderFunc, null, !1),
                        this.initList(), this.changeShowinfo(), this.addEvent();
                }, garageDialog.prototype.renderFunc = function (a, e) {
                    a.setShow(this.carData[e]);
                }, garageDialog.prototype.initList = function () {
                    var a = s.default.getInstance().getTableData("cars");
                    for (var e in a) {
                        var t = a[e],
                            n = t.carcname;
                        if ("Car_E" != t.carname) {
                            var i = t.cartex,
                                r = t.id,
                                o = g.userData.carInfo[r];
                            this.carData.push({
                                carid: r,
                                carcname: n,
                                cartex: i,
                                carlevel: o
                            });
                        }
                    }
                    this.carlist.array = this.carData, this.carlist.x = (this.contbox.width - this.carlist.width) / 2;
                }, garageDialog.prototype.playUpAni = function () {
                    p.utils.addUpani(this.effect1, 250 / 260, 80 / 240), p.utils.addUpani(this.effect2, 210 / 260, 80 / 240);
                }, garageDialog.prototype.openUplevelPage = function () {
                    i.eventManager.instance.emitEvent(r.GameEvent.openUplevelCar, null);
                }, garageDialog.prototype.closePage = function () {
                    i.eventManager.instance.emitEvent(r.GameEvent.repushUpani, null), this.close(),
                        i.eventManager.instance.emitEvent(r.GameEvent.changeShowHome, !0);
                }, garageDialog.prototype.changeGold = function () {
                    for (var a = 0; a < this.carData.length; a++) {
                        var e = this.carData[a],
                            t = e.carid,
                            n = g.userData.carInfo[t];
                        e.carlevel = n;
                    }
                    this.carlist.array = this.carData, this.carlist.refresh();
                }, garageDialog.prototype.upLevelCar = function () {
                    this.changeShowinfo(), this.playUpAni();
                }, garageDialog.prototype.changeShowinfo = function () {
                    var a = 0,
                        e = 0;
                    for (var t in g.userData.carInfo) a += g.userData.carInfo[t], e += 1;
                    this.alvtxt.text = "(Lv." + a + ")", this.agtxt.text = "+" + (a - e) * d.configData.onecarbei + "%";
                }, garageDialog.prototype.addEvent = function () {
                    var a = [this.closebtn, this.uplevelbtn];
                    h.uiManager.addBtnComp(a), this.closebtn.on(Laya.Event.CLICK, this, this.closePage),
                        this.uplevelbtn.on(Laya.Event.CLICK, this, this.openUplevelPage), i.eventManager.instance.onEvent(r.GameEvent.showGold, this, this.changeGold),
                        i.eventManager.instance.onEvent(r.GameEvent.upLevelCar, this, this.upLevelCar);
                }, garageDialog.prototype.removeEvent = function () {
                    this.closebtn.on(Laya.Event.CLICK, this, this.closePage), this.uplevelbtn.on(Laya.Event.CLICK, this, this.openUplevelPage),
                        i.eventManager.instance.offEvent(r.GameEvent.showGold, this, this.changeGold), i.eventManager.instance.offEvent(r.GameEvent.upLevelCar, this, this.upLevelCar);
                    var a = [this.closebtn, this.uplevelbtn];
                    h.uiManager.removeBtnComp(a);
                }, garageDialog.prototype.onDestroy = function () {
                    this.removeEvent();
                }, garageDialog;
            }(n.ui.dialog.garagepageUI);
        t.garageDialog = l;
    }, {
        "../../configData": 3,
        "../../data/gameEnum": 5,
        "../../data/userData": 7,
        "../../manager/eventManager": 21,
        "../../manager/tableManager": 26,
        "../../manager/uiManager": 28,
        "../../ui/layaMaxUI": 58,
        "../../utils": 59,
        "../perfab/caritem1": 41,
        "../perfab/goldtit": 44
    }],
    34: [function (a, e, t) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var n = a("../../ui/layaMaxUI"),
            i = a("../../manager/eventManager"),
            r = a("../../data/gameEnum"),
            o = a("../../manager/uiManager"),
            s = a("../perfab/goldtit"),
            h = a("../../data/userData"),
            c = a("../../utils"),
            g = a("../../manager/adManager"),
            p = a("../../data/currgameData"),
            d = a("../../manager/tableManager"),
            l = a("../../manager/shareManager"),
            m = a("../../platform/platform"),
            u = a("../../configData"),
            f = a("../perfab/trypanel"),
            v = a("../../manager/statistics"),
            y = function (a) {
                function jiesuanDialog(e) {
                    var t = a.call(this) || this;
                    return t.oneaward = 0, t.beiaward = 0, t.inJiesuan = !0, t.type = e, t;
                }
                return __extends(jiesuanDialog, a), jiesuanDialog.prototype.onAwake = function () {
                    this.autoDestroyAtClosed = !0,
                        // o.uiManager.adaptPage(this, [ this.topbox, this.botbox, this.trybox ], "dialog"), 
                        i.eventManager.instance.emitEvent(r.GameEvent.closePage, null);
                    // var a = new s.goldtit("jiesuan");
                    // this.headbox.addChild(a), 
                    this.gamegold.text = "Get Gold+" + p.currgameData.currgold;
                    g.adManager.haveVideo = true;
                    var e, t = Number(d.default.getInstance().getDataByKey("constant", "1", "continscore").split("*")[0]);
                    0 == (e = "fail" == this.type ? 0 : Math.floor(t * p.currgameData.continueLevel * p.currgameData.addGoldBei)) ? this.contingold.visible = !1 : this.contingold.text = "Winning streak +" + e + " gold coins",
                        this.oneaward = p.currgameData.currgold + e, this.beiaward = 3 * p.currgameData.currgold + e,
                        this.goldtxt.value = 3 * Math.ceil(p.currgameData.currgold) + "", g.adManager.haveVideo ? this.iconimg.skin = "game/currency/videoblue.png" : h.userData.canshare ? this.iconimg.skin = "game/currency/shareblue.png" : this.beibtn.visible = !1,
                        // h.userData.bannerTouch ? c.utils.delayShowAd("jinbi", this.botbox, this) : c.utils.afterShowAd("jinbi", this.botbox, this), 
                        this.trybox.removeChildren();
                    // var n = f.trypanel.getInstance();
                    // this.trybox.addChild(n),
                    this.addEvent();
                }, jiesuanDialog.prototype.beiFunc = function () {
                    //视频
                    CoinApp.showRewarded(() => {
                        //给奖励
                        this.sucJiaBei(true);
                    }, () => {
                        //视频没看完
                        promptText("No video or midway shutdown.");
                    })

                    // this.inJiesuan && (this.setBtnEnable(!1), g.adManager.haveVideo ? g.adManager.showVideo(this.sucJiaBei.bind(this), v.videoType.jiesuan) : h.userData.canshare ? l.shareManager.share(r.ShareType.jiesuan, this.sucJiaBei.bind(this)) : this.toNextPage());
                }, jiesuanDialog.prototype.sucJiaBei = function (a) {
                    console.log("jiesuanDialog.prototype.sucJiaBei");
                    g.adManager.haveVideo && p.currgameData.addGvideo(), p.currgameData.currgold = this.beiaward;
                    this.inJiesuan = true;
                    this.setBtnEnable(!1), g.adManager.changeShowBanner("hide", this, "jinbi"),
                    this.trybox.removeChildren(), i.eventManager.instance.emitEvent(r.GameEvent.openGameover, [this.type, this]);

                    h.userData.gold += this.beiaward;

                    Laya.LocalStorage.setItem("userDatagold", h.userData.gold);
                }, jiesuanDialog.prototype.toNextPage = function () {
                    CoinApp.showInterstitial(() => {
                        this.inJiesuan = true;
                        console.log("jiesuanDialog.prototype.toNextPage");
                        this.inJiesuan ? (this.setBtnEnable(!1), g.adManager.changeShowBanner("hide", this, "jinbi"),

                            this.trybox.removeChildren(), i.eventManager.instance.emitEvent(r.GameEvent.openGameover, [this.type, this])) : m.platform.instance.showToast("服务器响应中，请稍后");

                        h.userData.gold += this.oneaward;

                        Laya.LocalStorage.setItem("userDatagold", h.userData.gold);
                    })

                }, jiesuanDialog.prototype.setBtnEnable = function (a) {
                    this.inJiesuan = a;
                }, jiesuanDialog.prototype.shineAni = function () {
                    this.shineimg.rotation += 1;
                }, jiesuanDialog.prototype.addEvent = function () {
                    var a = [this.beibtn, this.jumpbtn];
                    o.uiManager.addBtnComp(a), this.beibtn.on(Laya.Event.CLICK, this, this.beiFunc),
                        this.jumpbtn.on(Laya.Event.CLICK, this, this.toNextPage), Laya.timer.loop(u.configData.frameTime, this, this.shineAni);
                }, jiesuanDialog.prototype.removeEvent = function () {
                    this.beibtn.off(Laya.Event.CLICK, this, this.beiFunc), this.jumpbtn.off(Laya.Event.CLICK, this, this.toNextPage),
                        Laya.timer.clear(this, this.shineAni);
                    var a = [this.beibtn, this.jumpbtn];
                    o.uiManager.removeBtnComp(a);
                }, jiesuanDialog.prototype.onDestroy = function () {
                    this.removeEvent();
                }, jiesuanDialog;
            }(n.ui.dialog.jiesuanpageUI);
        t.jiesuanDialog = y;
    }, {
        "../../configData": 3,
        "../../data/currgameData": 4,
        "../../data/gameEnum": 5,
        "../../data/userData": 7,
        "../../manager/adManager": 19,
        "../../manager/eventManager": 21,
        "../../manager/shareManager": 22,
        "../../manager/statistics": 24,
        "../../manager/tableManager": 26,
        "../../manager/uiManager": 28,
        "../../platform/platform": 55,
        "../../ui/layaMaxUI": 58,
        "../../utils": 59,
        "../perfab/goldtit": 44,
        "../perfab/trypanel": 51
    }],
    35: [function (a, e, t) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var n = a("../../ui/layaMaxUI"),
            i = a("../../manager/uiManager"),
            r = a("../../platform/platform"),
            o = a("../perfab/shareCanvas"),
            s = a("../../manager/adManager"),
            h = a("../../manager/eventManager"),
            c = a("../../data/gameEnum"),
            g = a("../../utils"),
            p = a("../../manager/shareManager"),
            d = a("../../configData"),
            l = function (a) {
                function pipeiDialog() {
                    var e = a.call(this) || this;
                    return e.timenum = 5, e.isInpage = !0, e.addscalex = .1, e.mxscale = 1.1, e.miscale = 1,
                        e.scalenum = 0, e;
                }
                return __extends(pipeiDialog, a), pipeiDialog.getInstance = function () {
                    return this.instance || (this.instance = new pipeiDialog()), this.instance;
                }, pipeiDialog.prototype.onAwake = function () {
                    i.uiManager.adaptPage(this, [this.bgbox, this.upbox], "dialog"), this.autoDestroyAtClosed = !1,
                        this.openview.height = Laya.stage.height, this.openview.y = 0;
                    var a = this.titimg.y + this.upbox.y,
                        e = this.listpos.y + this.bgbox.y,
                        t = this.titimg.x + this.upbox.x;
                    r.platform.instance.postOpenData({
                        type: "setPipeiPos",
                        listy: e,
                        tity: a,
                        titx: t
                    });
                }, pipeiDialog.prototype.openEffect1 = function () {
                    i.uiManager.openEffect1(this, function () {
                        this.opencanvas = o.shareCanvas.getInstance(), this.openview.addChild(this.opencanvas);
                    }.bind(this));
                }, pipeiDialog.prototype.closeEffect1 = function (a) {
                    i.uiManager.closeEffect1(this, function () {
                        r.platform.instance.postOpenData({
                            type: "closePipei"
                        }), Laya.timer.once(100, this, function () {
                            s.adManager.changeShowBanner("hide", this, "default"), this.removeEvent(), this.close(),
                                h.eventManager.instance.emitEvent(c.GameEvent.openGameView, null);
                        });
                    }.bind(this));
                }, pipeiDialog.prototype.onEnable = function () {
                    this.scalenum = 0, this.sharebtn.scale(1, 1), this.timenum = 5, this.lesstime.text = this.timenum + "秒",
                        this.isInpage = !0, this.openEffect1(), this.delayBanner(), this.setHeadList(),
                        this.addEvent();
                }, pipeiDialog.prototype.update = function () {
                    this.isInpage && (this.timenum -= 1, this.timenum >= 0 ? this.lesstime.text = this.timenum + "秒" : (this.closePage(),
                        Laya.timer.clear(this, this.update)));
                }, pipeiDialog.prototype.update1 = function () {
                    if (this.scalenum += 1, console.log("呼吸"), this.scalenum % 9 == 1) {
                        console.log("放大");
                        var a = this.sharebtn.scaleX;
                        (a >= this.mxscale || a <= this.miscale) && (this.addscalex *= -1), a += this.addscalex,
                            this.sharebtn.scaleX = a, this.sharebtn.scaleY = a;
                    }
                }, pipeiDialog.prototype.setHeadList = function () {
                    var a = Math.ceil(10 * Math.random()) + 10;
                    r.platform.instance.request("robots?number=" + a, {}, function (a) {
                        for (var e = 0; e < a.length; e++) {
                            var t = a[e],
                                n = Math.ceil(9e3 * Math.random()) + 60;
                            t.score = n;
                        }
                        r.platform.instance.postOpenData({
                            type: "pipeiData",
                            data: a
                        });
                    }.bind(this), function () {
                        r.platform.instance.showToast("获取匹配数据失败，即将开始"), r.platform.instance.postOpenData({
                            type: "pipeiData",
                            data: []
                        }), Laya.timer.once(2e3, this, this.closePage);
                    }.bind(this));
                }, pipeiDialog.prototype.delayBanner = function () {
                    g.utils.afterShowAd("default", this.botbox, this);
                }, pipeiDialog.prototype.openShare = function () {
                    this.isInpage = !1, Laya.timer.clear(this, this.closePage), p.shareManager.share(c.ShareType.pipei, function (a) {
                        this.isInpage = !0;
                    }.bind(this));
                }, pipeiDialog.prototype.closePage = function () {
                    this.closeEffect1(null);
                }, pipeiDialog.prototype.addEvent = function () {
                    var a = [this.sharebtn];
                    i.uiManager.addBtnComp(a), this.sharebtn.on(Laya.Event.CLICK, this, this.openShare),
                        Laya.timer.loop(1e3, this, this.update), Laya.timer.loop(d.configData.frameTime, this, this.update1);
                }, pipeiDialog.prototype.removeEvent = function () {
                    this.sharebtn.off(Laya.Event.CLICK, this, this.openShare);
                    var a = [this.sharebtn];
                    i.uiManager.removeBtnComp(a), Laya.timer.clear(this, this.update), Laya.timer.clear(this, this.update1);
                }, pipeiDialog;
            }(n.ui.dialog.pipeipageUI);
        t.pipeiDialog = l;
    }, {
        "../../configData": 3,
        "../../data/gameEnum": 5,
        "../../manager/adManager": 19,
        "../../manager/eventManager": 21,
        "../../manager/shareManager": 22,
        "../../manager/uiManager": 28,
        "../../platform/platform": 55,
        "../../ui/layaMaxUI": 58,
        "../../utils": 59,
        "../perfab/shareCanvas": 46
    }],
    36: [function (a, e, t) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var n = a("../../ui/layaMaxUI"),
            i = a("../perfab/shareCanvas"),
            r = a("../../platform/platform"),
            o = a("../../manager/uiManager"),
            s = a("../../manager/eventManager"),
            h = a("../../data/gameEnum"),
            c = a("../../configData"),
            g = a("../perfab/rankitem"),
            p = a("../../data/userData"),
            d = function (a) {
                function rankDialog() {
                    var e = a.call(this) || this;
                    return e.selIdx = 0, e.freshFri = !0, e.freshTod = !0, e.freshWod = !0, e.data1 = [],
                        e.todayData = [], e.todayMdata = {}, e.worldData = [], e.worldMdata = {}, e;
                }
                return __extends(rankDialog, a), rankDialog.getInstance = function () {
                    return this.instance || (this.instance = new rankDialog()), this.instance;
                }, rankDialog.prototype.onAwake = function () {
                    o.uiManager.adaptPage(this, [this.bgbox, this.upbox, this.ranklist], "dialog"),
                        this.autoDestroyAtClosed = !1, this.openview.height = Laya.stage.height, this.openview.y = 0;
                    var a = this.listpos.y,
                        e = this.mypos.y;
                    if (c.configData.isLongScreen) {
                        a += 68, e += 68;
                    }
                    if (-1 == p.userData.avatar.indexOf("https://wx.qlogo.cn")) {
                        var t = this.btnbox.x,
                            n = this.upbox.y + this.btnbox.y,
                            i = this.btnbox.width,
                            s = this.btnbox.height;
                        r.platform.instance.createLoginBtn(i, s, t, n);
                    }
                    r.platform.instance.postOpenData({
                        type: "setListPos",
                        listy: a,
                        itemy: e
                    }), this.ranklist.repeatX = 1, this.ranklist.height = 695, this.ranklist.width = g.rankitem.wid,
                        this.ranklist.array = this.data1, this.ranklist.itemRender = g.rankitem, this.ranklist.x = (Laya.stage.width - g.rankitem.wid) / 2,
                        this.ranklist.spaceY = 15, this.ranklist.visible = !1, this.ranklist.vScrollBarSkin = "",
                        this.ranklist.renderHandler = Laya.Handler.create(this, this.freshList1, null, !1),
                        this.myitem = new g.rankitem(), this.myitem.x = (Laya.stage.width - g.rankitem.wid) / 2,
                        this.myitem.y = e, this.addChild(this.myitem);
                }, rankDialog.prototype.freshList1 = function (a, e) {
                    a.setShow(this.data1[e]);
                }, rankDialog.prototype.onEnable = function () {
                    s.eventManager.instance.emitEvent(h.GameEvent.changeShowHome, !1), this.freshFri = !0,
                        this.freshTod = !0, this.freshWod = !0, this.selIdx = 0, this.sendFriend(), this.changeBtnShow(),
                        o.uiManager.openEffect1(this, function () {
                            this.opencanvas = i.shareCanvas.getInstance(), this.openview.addChild(this.opencanvas);
                        }.bind(this)), this.addEvent(), r.platform.instance.showLoginBtn();
                }, rankDialog.prototype.changeBtnShow = function () {
                    var a = this.fribtn.getChildByName("btntxt"),
                        e = this.todaybtn.getChildByName("btntxt"),
                        t = this.worldbtn.getChildByName("btntxt");
                    a.skin = 0 == this.selIdx ? "game/rank/friendtxt2.png" : "game/rank/friendtxt1.png",
                        e.skin = 1 == this.selIdx ? "game/rank/todaytxt2.png" : "game/rank/todaytxt1.png",
                        t.skin = 2 == this.selIdx ? "game/rank/worldtxt2.png" : "game/rank/worldtxt1.png",
                        this.fribtn.skin = 0 == this.selIdx ? "game/rank/btn_yellow_bg.png" : "game/rank/btn_blue_bg.png",
                        this.todaybtn.skin = 1 == this.selIdx ? "game/rank/btn_yellow_bg.png" : "game/rank/btn_blue_bg.png",
                        this.worldbtn.skin = 2 == this.selIdx ? "game/rank/btn_yellow_bg.png" : "game/rank/btn_blue_bg.png",
                        0 == this.selIdx ? (this.openview.visible = !0, this.ranklist.visible = !1, this.myitem.visible = !1) : (this.openview.visible = !1,
                            this.ranklist.visible = !0, this.myitem.visible = !0);
                }, rankDialog.prototype.changeListShow = function () {
                    1 == this.selIdx ? (this.data1 = this.todayData, this.myitem.setShow(this.todayMdata)) : 2 == this.selIdx && (this.data1 = this.worldData,
                        this.myitem.setShow(this.worldMdata)), this.ranklist.array = this.data1, this.ranklist.refresh(),
                        this.ranklist.scrollTo(0);
                }, rankDialog.prototype.changeEnable = function (a) {
                    this.fribtn.mouseEnabled = a, this.todaybtn.mouseEnabled = a, this.worldbtn.mouseEnabled = a;
                }, rankDialog.prototype.sendFriend = function () {
                    r.platform.instance.postOpenData({
                        type: "friend",
                        fresh: this.freshFri
                    }), this.freshFri = !1;
                }, rankDialog.prototype.backFunc = function (a) {
                    void 0 === a && (a = "close"), r.platform.instance.hideLoginBtn(), o.uiManager.closeEffect1(this, function () {
                        r.platform.instance.postOpenData({
                            type: "closerank"
                        }), Laya.timer.once(50, this, function () {
                            this.close(), this.removeEvent(), s.eventManager.instance.emitEvent(h.GameEvent.changeShowHome, [!0, a]);
                        });
                    }.bind(this));
                }, rankDialog.prototype.startGame = function () {
                    this.backFunc("start");
                }, rankDialog.prototype.openFriRank = function () {
                    0 != this.selIdx && (this.selIdx = 0, this.changeBtnShow(), this.sendFriend());
                }, rankDialog.prototype.openTodRank = function () {
                    1 != this.selIdx && (this.selIdx = 1, this.changeBtnShow(), this.freshTod ? (this.changeEnable(!1),
                        r.platform.instance.request("todayRanking", {}, function (a) {
                            for (var e, t = !1, n = [], i = 0; i < a.length; i++) {
                                var o = a[i];
                                1 == o.oneself && (t = !0, (e = o).rank = i + 1), o.score < 1 || n.push(o);
                            }
                            t ? (c.configData.openCan ? r.platform.instance.postOpenData({
                                type: "todayBest",
                                rdata: n,
                                mdata: e,
                                fresh: this.freshTod
                            }) : (this.todayData = n, this.todayMdata = e, this.changeListShow()), this.freshTod = !1,
                                this.changeEnable(!0)) : this.getmyRankData(a, 1);
                        }.bind(this), function (a) {
                            console.error("获取今日排行出错"), this.getmyRankData([], 1);
                        }.bind(this))) : c.configData.openCan ? r.platform.instance.postOpenData({
                            type: "todayBest",
                            fresh: this.freshTod
                        }) : this.changeListShow());
                }, rankDialog.prototype.openWorRank = function () {
                    2 != this.selIdx && (this.selIdx = 2, this.changeBtnShow(), this.freshWod ? (this.changeEnable(!1),
                        r.platform.instance.request("worldRanking", {}, function (a) {
                            for (var e, t = !1, n = [], i = 0; i < a.length; i++) {
                                var o = a[i];
                                1 == o.oneself && (t = !0, (e = o).rank = i + 1), o.score < 1 || n.push(o);
                            }
                            t ? (c.configData.openCan ? r.platform.instance.postOpenData({
                                type: "world",
                                rdata: n,
                                mdata: e,
                                fresh: this.freshWod
                            }) : (this.worldData = n, this.worldMdata = e, this.changeListShow()), this.freshWod = !1,
                                this.changeEnable(!0)) : this.getmyRankData(a, 2);
                        }.bind(this), function (a) {
                            console.error("获取世界排行出错"), this.getmyRankData([], 2);
                        }.bind(this))) : c.configData.openCan ? r.platform.instance.postOpenData({
                            type: "world",
                            fresh: this.freshWod
                        }) : this.changeListShow());
                }, rankDialog.prototype.getmyRankData = function (a, e) {
                    var t = {
                        type: e
                    };
                    r.platform.instance.request("myRank", t, function (t) {
                        t.rank >= 1e3 && (t.rank = "- -"), c.configData.openCan ? r.platform.instance.postOpenData({
                            type: 1 == e ? "todayBest" : "world",
                            rdata: a,
                            mdata: t,
                            fresh: 1 == e ? this.freshTod : this.freshWod
                        }) : 1 == e ? (this.todayData = a, this.todayMdata = t, this.changeListShow()) : 2 == e && (this.worldData = a,
                            this.worldMdata = t, this.changeListShow()), 1 == e ? this.freshTod = !1 : this.freshWod = !1,
                            this.changeEnable(!0);
                    }.bind(this), function (a) {
                        this.changeEnable(!0);
                    }.bind(this));
                }, rankDialog.prototype.addEvent = function () {
                    var a = [this.homebtn, this.fribtn, this.todaybtn, this.worldbtn, this.startbtn];
                    o.uiManager.addBtnComp(a), this.homebtn.on(Laya.Event.CLICK, this, this.backFunc),
                        this.fribtn.on(Laya.Event.CLICK, this, this.openFriRank), this.todaybtn.on(Laya.Event.CLICK, this, this.openTodRank),
                        this.worldbtn.on(Laya.Event.CLICK, this, this.openWorRank), this.startbtn.on(Laya.Event.CLICK, this, this.startGame);
                }, rankDialog.prototype.removeEvent = function () {
                    this.homebtn.off(Laya.Event.CLICK, this, this.backFunc), this.fribtn.off(Laya.Event.CLICK, this, this.openFriRank),
                        this.todaybtn.off(Laya.Event.CLICK, this, this.openTodRank), this.worldbtn.off(Laya.Event.CLICK, this, this.openWorRank),
                        this.startbtn.off(Laya.Event.CLICK, this, this.startGame);
                    var a = [this.homebtn, this.fribtn, this.todaybtn, this.worldbtn, this.startbtn];
                    o.uiManager.removeBtnComp(a);
                }, rankDialog.prototype.onDestroy = function () {
                    this.removeEvent();
                }, rankDialog;
            }(n.ui.dialog.rankpageUI);
        t.default = d;
    }, {
        "../../configData": 3,
        "../../data/gameEnum": 5,
        "../../data/userData": 7,
        "../../manager/eventManager": 21,
        "../../manager/uiManager": 28,
        "../../platform/platform": 55,
        "../../ui/layaMaxUI": 58,
        "../perfab/rankitem": 45,
        "../perfab/shareCanvas": 46
    }],
    37: [function (a, e, t) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var n = a("../../ui/layaMaxUI"),
            i = a("../../manager/uiManager"),
            r = a("../../manager/eventManager"),
            o = a("../../data/gameEnum"),
            s = function (a) {
                function shoucangDialog() {
                    return a.call(this) || this;
                }
                return __extends(shoucangDialog, a), shoucangDialog.prototype.onAwake = function () {
                    r.eventManager.instance.emitEvent(o.GameEvent.changeShowHome, !1), this.addEvent();
                }, shoucangDialog.prototype.closePage = function () {
                    this.close(), r.eventManager.instance.emitEvent(o.GameEvent.changeShowHome, !0);
                }, shoucangDialog.prototype.addMyApp = function () {
                    this.closePage();
                }, shoucangDialog.prototype.addEvent = function () {
                    var a = [this.closebtn];
                    i.uiManager.addBtnComp(a), this.closebtn.on(Laya.Event.CLICK, this, this.closePage),
                        r.eventManager.instance.onEvent(o.GameEvent.awardAddMyApp, this, this.addMyApp);
                }, shoucangDialog.prototype.removeEvent = function () {
                    this.closebtn.off(Laya.Event.CLICK, this, this.closePage), r.eventManager.instance.offEvent(o.GameEvent.awardAddMyApp, this, this.addMyApp);
                    var a = [this.closebtn];
                    i.uiManager.removeBtnComp(a);
                }, shoucangDialog.prototype.onDestroy = function () {
                    this.removeEvent();
                }, shoucangDialog;
            }(n.ui.dialog.shoucangpageUI);
        t.shoucangDialog = s;
    }, {
        "../../data/gameEnum": 5,
        "../../manager/eventManager": 21,
        "../../manager/uiManager": 28,
        "../../ui/layaMaxUI": 58
    }],
    38: [function (a, e, t) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var n = a("../../ui/layaMaxUI"),
            i = a("../../manager/eventManager"),
            r = a("../../data/gameEnum"),
            o = a("../../manager/uiManager"),
            s = a("../perfab/goldtit"),
            h = a("../perfab/taskitem"),
            c = a("../../manager/taskManager"),
            g = a("../../utils"),
            p = a("../../data/currgameData"),
            d = function (a) {
                function taskDialog() {
                    var e = a.call(this) || this;
                    return e.taskData = [], e.achiveData = [], e.nowSelect = "achieve", e.saveAcheArr = [],
                        e.saveTaskArr = [], e;
                }
                return __extends(taskDialog, a), taskDialog.prototype.onAwake = function () {
                    this.autoDestroyAtClosed = !0, o.uiManager.adaptPage(this, [this.contbox], "dialog"),
                        i.eventManager.instance.emitEvent(r.GameEvent.changeShowHome, !1), this.tasklist.itemRender = h.taskitem,
                        this.tasklist.repeatX = 1, this.tasklist.spaceY = 10, this.tasklist.vScrollBarSkin = "",
                        this.tasklist.renderHandler = Laya.Handler.create(this, this.renderList, null, !1),
                        this.selectShow(), this.addEvent();
                    var a = new s.goldtit("task");
                    this.headbox.addChild(a);
                }, taskDialog.prototype.renderList = function (a, e) {
                    var t = a.dataSource;
                    a.setShow(t, e);
                }, taskDialog.prototype.changeShow = function () {
                    for (var a = [], e = 0; e < arguments.length; e++) a[e] = arguments[e];
                    var t = a[0];
                    this.nowSelect != t && (this.nowSelect = t, this.selectShow());
                }, taskDialog.prototype.saveTaskIdx = function () {
                    for (var a = [], e = 0; e < arguments.length; e++) a[e] = arguments[e];
                    var t = a[0],
                        n = a[1],
                        i = a[2];
                    "achieve" == t ? this.saveAcheArr.push([n, i, null]) : "task" == t && this.saveTaskArr.push([n, i, null]);
                }, taskDialog.prototype.selectShow = function () {
                    "achieve" == this.nowSelect ? this.changeShowAchieve() : "task" == this.nowSelect && this.changeShowTask();
                }, taskDialog.prototype.changeShowAchieve = function () {
                    this.taskbg.skin = "game/task/alertbg1.png", this.todaytime.visible = !1;
                    for (var a = JSON.parse(JSON.stringify(c.taskManager.achieveData)), e = 0; e < a.length; e++)
                        for (var t = a[e], n = t.taskid, i = 0; i < this.saveAcheArr.length; i++) {
                            var r = this.saveAcheArr[i];
                            if (n == r[0]) {
                                a.splice(e, 1), r[2] = t, e--;
                                break;
                            }
                        }
                    for (var o = 0; o < this.saveAcheArr.length; o++) {
                        var s = this.saveAcheArr[o],
                            h = s[1],
                            g = s[2];
                        a.splice(h, 0, g);
                    }
                    this.tasklist.array = a, this.tasklist.refresh();
                }, taskDialog.prototype.changeShowTask = function () {
                    this.taskbg.skin = "game/task/alertbg2.png", this.todaytime.visible = !0;
                    for (var a = JSON.parse(JSON.stringify(c.taskManager.todayTaskData)), e = 0; e < a.length; e++)
                        for (var t = a[e], n = t.taskid, i = 0; i < this.saveTaskArr.length; i++) {
                            var r = this.saveTaskArr[i];
                            if (n == r[0]) {
                                a.splice(e, 1), r[2] = t, e--;
                                break;
                            }
                        }
                    for (var o = 0; o < this.saveTaskArr.length; o++) {
                        var s = this.saveTaskArr[o],
                            h = s[1],
                            g = s[2];
                        a.splice(h, 0, g);
                    }
                    this.tasklist.array = a, this.tasklist.refresh();
                }, taskDialog.prototype.showGold = function () {
                    g.utils.flyGoldFunc(this, null);
                }, taskDialog.prototype.closePage = function () {
                    this.close(), i.eventManager.instance.emitEvent(r.GameEvent.changeShowHome, !0);
                }, taskDialog.prototype.update = function () {
                    var a = Date.now(),
                        e = Math.floor((p.currgameData.nextDaytime - a) / 1e3);
                    this.changeTimeToh(e);
                }, taskDialog.prototype.changeTimeToh = function (a) {
                    var e = Math.floor(a / 60 / 60),
                        t = Math.floor(a / 60 - 60 * e),
                        n = a % 60 % 60,
                        i = e > 9 ? e + "" : "0" + e,
                        r = t > 9 ? t + "" : "0" + t,
                        o = n > 9 ? n + "" : "0" + n;
                    this.todaytime.text = "下次免费：" + i + "小时" + r + "分" + o + "秒";
                }, taskDialog.prototype.addEvent = function () {
                    var a = [this.achievebtn, this.todaybtn, this.closebtn];
                    o.uiManager.addBtnComp(a), this.achievebtn.on(Laya.Event.CLICK, this, this.changeShow, ["achieve"]),
                        this.todaybtn.on(Laya.Event.CLICK, this, this.changeShow, ["task"]), this.closebtn.on(Laya.Event.CLICK, this, this.closePage),
                        i.eventManager.instance.onEvent(r.GameEvent.saveTaskIdx, this, this.saveTaskIdx),
                        i.eventManager.instance.onEvent(r.GameEvent.freshTaskShow, this, this.selectShow),
                        i.eventManager.instance.onEvent(r.GameEvent.showGold, this, this.showGold), Laya.timer.loop(1e3, this, this.update);
                }, taskDialog.prototype.removeEvent = function () {
                    this.achievebtn.off(Laya.Event.CLICK, this, this.changeShow), this.todaybtn.off(Laya.Event.CLICK, this, this.changeShow),
                        this.closebtn.off(Laya.Event.CLICK, this, this.closePage), i.eventManager.instance.offEvent(r.GameEvent.saveTaskIdx, this, this.saveTaskIdx),
                        i.eventManager.instance.offEvent(r.GameEvent.freshTaskShow, this, this.selectShow),
                        i.eventManager.instance.offEvent(r.GameEvent.showGold, this, this.showGold), Laya.timer.clear(this, this.update);
                    var a = [this.achievebtn, this.todaybtn, this.closebtn];
                    o.uiManager.removeBtnComp(a);
                }, taskDialog.prototype.onDestroy = function () {
                    this.removeEvent();
                }, taskDialog;
            }(n.ui.dialog.taskpageUI);
        t.taskDialog = d;
    }, {
        "../../data/currgameData": 4,
        "../../data/gameEnum": 5,
        "../../manager/eventManager": 21,
        "../../manager/taskManager": 27,
        "../../manager/uiManager": 28,
        "../../ui/layaMaxUI": 58,
        "../../utils": 59,
        "../perfab/goldtit": 44,
        "../perfab/taskitem": 47
    }],
    39: [function (a, e, t) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var n = a("../../ui/layaMaxUI"),
            i = a("../../manager/uiManager"),
            r = a("../perfab/tryitem3"),
            o = a("../../data/tryGameData"),
            s = a("../../manager/eventManager"),
            h = a("../../data/gameEnum"),
            c = a("../../data/currgameData"),
            g = function (a) {
                function trygameDialog() {
                    var e = a.call(this) || this;
                    return e.trydata = [], e;
                }
                return __extends(trygameDialog, a), trygameDialog.prototype.onAwake = function () {
                    this.autoDestroyAtClosed = !0, i.uiManager.adaptPage(this, [this.contbox], "dialog"),
                        this.addEvent(), this.trylist.repeatX = 2, this.trylist.repeatY = 5, this.trylist.spaceX = 20,
                        this.trylist.spaceY = 20, this.trylist.itemRender = r.tryitem3, this.trylist.renderHandler = Laya.Handler.create(this, this.renderShow, null, !1),
                        this.trydata = o.tryGameData.getNextGame("backhome", [], 10), this.trylist.array = this.trydata,
                        this.trylist.x = (this.width - this.trylist.width) / 2;
                }, trygameDialog.prototype.renderShow = function (a, e) {
                    var t = this.trydata[e];
                    a.setShow(t);
                }, trygameDialog.prototype.backHome = function () {
                    this.resetGame(), s.eventManager.instance.emitEvent(h.GameEvent.openHomePage, null);
                }, trygameDialog.prototype.restartGame = function () {
                    this.resetGame(), s.eventManager.instance.emitEvent(h.GameEvent.openGameView, null);
                }, trygameDialog.prototype.resetGame = function () {
                    this.close(), s.eventManager.instance.emitEvent(h.GameEvent.resetGame, null), c.currgameData.changeGameStat(0),
                        c.currgameData.changeGameBei(1), s.eventManager.instance.emitEvent(h.GameEvent.initScene, null);
                }, trygameDialog.prototype.addEvent = function () {
                    var a = [this.homebtn, this.startbtn];
                    i.uiManager.addBtnComp(a), this.homebtn.on(Laya.Event.CLICK, this, this.backHome),
                        this.startbtn.on(Laya.Event.CLICK, this, this.restartGame);
                }, trygameDialog.prototype.removeEvent = function () {
                    this.homebtn.off(Laya.Event.CLICK, this, this.backHome), this.startbtn.off(Laya.Event.CLICK, this, this.restartGame);
                    var a = [this.homebtn, this.startbtn];
                    i.uiManager.removeBtnComp(a);
                }, trygameDialog.prototype.onDestroy = function () {
                    this.removeEvent();
                }, trygameDialog;
            }(n.ui.dialog.trygamepageUI);
        t.trygameDialog = g;
    }, {
        "../../data/currgameData": 4,
        "../../data/gameEnum": 5,
        "../../data/tryGameData": 6,
        "../../manager/eventManager": 21,
        "../../manager/uiManager": 28,
        "../../ui/layaMaxUI": 58,
        "../perfab/tryitem3": 50
    }],
    40: [function (a, e, t) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var n = a("../../ui/layaMaxUI"),
            i = a("../../manager/uiManager"),
            r = function (a) {
                function upcarDialog() {
                    return a.call(this) || this;
                }
                return __extends(upcarDialog, a), upcarDialog.prototype.onAwake = function () {
                    this.autoDestroyAtClosed = !0, this.addEvent();
                }, upcarDialog.prototype.closePage = function () {
                    this.close();
                }, upcarDialog.prototype.addEvent = function () {
                    var a = [this.closebtn];
                    i.uiManager.addBtnComp(a), this.closebtn.on(Laya.Event.CLICK, this, this.closePage);
                }, upcarDialog.prototype.removeEvent = function () { }, upcarDialog.prototype.onDestroy = function () { },
                    upcarDialog;
            }(n.ui.dialog.upcarpageUI);
        t.upcarDialog = r;
    }, {
        "../../manager/uiManager": 28,
        "../../ui/layaMaxUI": 58
    }],
    41: [function (a, e, t) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var n = a("../../ui/layaMaxUI"),
            i = a("../../manager/eventManager"),
            r = a("../../data/gameEnum"),
            o = a("../../manager/tableManager"),
            s = a("../../data/userData"),
            h = a("../../manager/uiManager"),
            c = a("../../platform/platform"),
            g = a("../../utils"),
            p = a("../../configData"),
            d = function (a) {
                function caritem1() {
                    return a.call(this) || this;
                }
                return __extends(caritem1, a), caritem1.prototype.onAwake = function () {
                    this.autoDestroyAtClosed = !0, this.addEvent();
                }, caritem1.prototype.setShow = function (a) {
                    if (a && this.carname) {
                        a.carid;
                        var e = a.carcname,
                            t = a.cartex,
                            n = "lv" + a.carlevel;
                        this.carname.text = e + "", this.carimg.skin = "game/Car_Render/" + t + ".png",
                            this.lvtxt.text = n, this.lvbg.width = 35 + 4 * n.length, this.watchGarage(a);
                    }
                }, caritem1.prototype.watchGarage = function () {
                    for (var a = [], e = 0; e < arguments.length; e++) a[e] = arguments[e];
                    var t = this.dataSource || a[0];
                    if (t) {
                        var n = t.carid,
                            i = t.carlevel,
                            r = o.default.getInstance().getDataByKey("cars", n, "upcost").split("+"),
                            h = Number(r[0]),
                            c = Number(r[1].split("*")[0]),
                            p = Math.ceil(i * c + h);
                        this.costtxt.text = g.utils.changeGoldTostr(p) + "", p <= s.userData.gold ? this.upinfo.visible = !0 : this.upinfo.visible = !1;
                    }
                }, caritem1.prototype.upcar = function () {
                    var a = this.dataSource.carid,
                        e = this.dataSource.carlevel,
                        t = o.default.getInstance().getDataByKey("cars", a, "upcost").split("+"),
                        n = Number(t[0]),
                        h = Number(t[1].split("*")[0]),
                        g = Math.ceil(e * h + n);
                    if (g <= s.userData.gold) {
                        var p = {
                            car_role: a,
                            mode: 4,
                            gold: g
                        };
                        c.platform.instance.showToast("升级成功"), s.userData.upCarLevel(a), s.userData.freshUplevel(),
                            s.userData.changeGameGold(-g), this.playUpAni(), i.eventManager.instance.emitEvent(r.GameEvent.upLevelCar, null);
                    } else c.platform.instance.showToast("金币不足");
                }, caritem1.prototype.update = function () { }, caritem1.prototype.playUpAni = function () {
                    g.utils.addUpani(this);
                }, caritem1.prototype.addEvent = function () {
                    var a = [this.upbtn];
                    h.uiManager.addBtnComp(a), this.upbtn.on(Laya.Event.CLICK, this, this.upcar), i.eventManager.instance.onEvent(r.GameEvent.watchGarage, this, this.watchGarage),
                        Laya.timer.once(p.configData.frameTime, this, this.update);
                }, caritem1.prototype.removeEvent = function () {
                    this.upbtn.off(Laya.Event.CLICK, this, this.upcar), i.eventManager.instance.offEvent(r.GameEvent.watchGarage, this, this.watchGarage);
                    var a = [this.upbtn];
                    h.uiManager.removeBtnComp(a);
                }, caritem1.prototype.onDestroy = function () {
                    this.removeEvent();
                }, caritem1;
            }(n.ui.perfab.caritem1UI);
        t.caritem1 = d;
    }, {
        "../../configData": 3,
        "../../data/gameEnum": 5,
        "../../data/userData": 7,
        "../../manager/eventManager": 21,
        "../../manager/tableManager": 26,
        "../../manager/uiManager": 28,
        "../../platform/platform": 55,
        "../../ui/layaMaxUI": 58,
        "../../utils": 59
    }],
    42: [function (a, e, t) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var n = a("../../ui/layaMaxUI"),
            i = a("../../manager/eventManager"),
            r = a("../../data/gameEnum"),
            o = a("../../data/currgameData"),
            s = function (a) {
                function chart(e, t, n) {
                    var i = a.call(this) || this;
                    return i.chay = 20, i.icontype = e, i.row = t, i.idx = n, i;
                }
                return __extends(chart, a), chart.prototype.onAwake = function () {
                    var a = "game/expression/";
                    if (this.icontype < 0) {
                        var e = Math.floor(Math.random() * o.currgameData.failExpre.length);
                        a += o.currgameData.failExpre[e].expression + ".png";
                    } else {
                        var t = o.currgameData.sucExpre.length;
                        e = this.icontype % t;
                        a += o.currgameData.sucExpre[e].expression + ".png";
                    }
                    this.iconimg.skin = a, this.addEvent(), this.playAnm();
                }, chart.prototype.playAnm = function () {
                    this.alertbox.scale(.1, .1), Laya.Tween.to(this.alertbox, {
                        scaleX: .6,
                        scaleY: .6
                    }, 500, null), Laya.Tween.to(this.alertbox, {
                        scaleX: 0,
                        scaleY: 0
                    }, 300, null, Laya.Handler.create(this, function () { }), 1e3), Laya.timer.once(3e3, this, function () {
                        this.removeEvent(), this.destroy();
                    });
                }, chart.prototype.setChartPos = function () {
                    for (var a = [], e = 0; e < arguments.length; e++) a[e] = arguments[e];
                    var t = a[0],
                        n = a[1];
                    this.alertbox.x = t, this.alertbox.y = n - this.chay;
                }, chart.prototype.addEvent = function () {
                    i.eventManager.instance.onEvent(r.GameEvent.getChartPos + "_" + this.row + "_" + this.idx, this, this.setChartPos);
                }, chart.prototype.removeEvent = function () {
                    i.eventManager.instance.emitEvent(r.GameEvent.getChartPos + "-" + this.row + "-" + this.idx, null),
                        i.eventManager.instance.offEvent(r.GameEvent.getChartPos + "_" + this.row + "_" + this.idx, this, this.setChartPos);
                }, chart;
            }(n.ui.perfab.chartUI);
        t.chart = s;
    }, {
        "../../data/currgameData": 4,
        "../../data/gameEnum": 5,
        "../../manager/eventManager": 21,
        "../../ui/layaMaxUI": 58
    }],
    43: [function (a, e, t) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var n = a("../../ui/layaMaxUI"),
            i = a("../../manager/adManager"),
            r = a("../../configData"),
            o = a("../../manager/uiManager"),
            s = a("../../data/tryGameData"),
            h = a("../../manager/soundManager"),
            c = a("../../data/gameEnum"),
            g = a("../../platform/platform"),
            p = a("../../manager/statistics"),
            d = function (a) {
                function gameBanner() {
                    var e = a.call(this) || this;
                    e.mwidth = 750, e.mheight = 260, e.autoDestroyAtClosed = !1, e.mwidth = 750 * i.adManager.bannerWid,
                        e.mheight = 260 * i.adManager.bannerWid, e.size(750, 260);
                    var t = r.configData.systemInfo,
                        n = (t.model, t.screenHeight),
                        o = n * ((Laya.stage.height - e.mheight) / Laya.stage.height);
                    r.configData.isLongScreen && (o -= 20);
                    var s = n * (e.mheight / Laya.stage.height);
                    return e.style = {
                        top: o,
                        realHeight: s
                    }, e.x = 0, e.y = Laya.stage.height * (o / n), e;
                }
                return __extends(gameBanner, a), gameBanner.getInstance = function () {
                    return this.instance || (this.instance = new gameBanner()), this.instance;
                }, gameBanner.prototype.onAwake = function () {
                    var a = [this.bannerimg];
                    o.uiManager.addBtnComp(a), this.bannerimg.width = this.mwidth, this.bannerimg.height = this.mheight,
                        this.bannerimg.x = (this.width - this.bannerimg.width) / 2, this.bannerimg.on(Laya.Event.CLICK, this, this.toapp);
                }, gameBanner.prototype.onEnable = function () {
                    this.changeBanShow();
                }, gameBanner.prototype.changeBanShow = function () {
                    if (this.dataSource) {
                        var a = s.tryGameData.changeItemData("bot", [this.dataSource.id]);
                        a && (this.dataSource = a);
                    } else this.dataSource = s.tryGameData.getNextGame("bot", [], 1)[0];
                    if (this.bannerimg && this.dataSource) {
                        var e = this.dataSource.app_img;
                        this.bannerimg.skin = e;
                    }
                }, gameBanner.prototype.toapp = function () {
                    h.soundManager.playEffect(c.GameSound.click, 1);
                    var a = this.dataSource;
                    if (a) {
                        var e = a.app_id,
                            t = a.app_path,
                            n = a.category;
                        a.id;
                        g.platform.instance.navigateToMiniProgram(e, t, function (a) {
                            p.statistics.reportClickTryGame(e, n, a), this.changeBanShow();
                        }.bind(this));
                    }
                }, gameBanner.prototype.onDestroy = function () {
                    console.error("banner被销毁");
                }, gameBanner;
            }(n.ui.perfab.gameBannerUI);
        t.gameBanner = d;
    }, {
        "../../configData": 3,
        "../../data/gameEnum": 5,
        "../../data/tryGameData": 6,
        "../../manager/adManager": 19,
        "../../manager/soundManager": 23,
        "../../manager/statistics": 24,
        "../../manager/uiManager": 28,
        "../../platform/platform": 55,
        "../../ui/layaMaxUI": 58
    }],
    44: [function (a, e, t) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var n = a("../../ui/layaMaxUI"),
            i = a("../../manager/eventManager"),
            r = a("../../data/gameEnum"),
            o = a("../../utils"),
            s = a("../../data/currgameData"),
            h = a("../../data/userData"),
            c = a("../../manager/uiManager"),
            g = function (a) {
                function goldtit(e) {
                    var t = a.call(this) || this;
                    return t.rangeMove = [220, 235], t.startLeng = 220, t.frameTime = 30, t.inPage = e,
                        t;
                }
                return __extends(goldtit, a), goldtit.prototype.onAwake = function () {
                    this.autoDestroyAtClosed = !0, this.startLeng = 220, this.mappbtn.x = this.startLeng,
                        this.changeShowMapp(), this.showGold(), this.addEvent();
                }, goldtit.prototype.changeShowMapp = function () {
                    "home" == this.inPage && 0 == h.userData.is_collect ? this.mappbtn.visible = !0 : this.mappbtn.visible = !1;
                }, goldtit.prototype.showGold = function () {
                    "gameview" == this.inPage ? o.utils.goldShow(s.currgameData.currgold, this.goldtxt, this.goldbg) : o.utils.goldShow(h.userData.gold, this.goldtxt, this.goldbg);
                }, goldtit.prototype.update = function () {
                    if (this.mappbtn.visible) {
                        this.startLeng += 1;
                        var a, e = this.rangeMove[1] - this.rangeMove[0],
                            t = Math.ceil((this.startLeng - this.rangeMove[0]) % (2 * e));
                        a = t > e ? this.rangeMove[1] - t + e : this.rangeMove[0] + t, Math.ceil(this.mappbtn.x) != a && (this.mappbtn.x = a);
                    }
                }, goldtit.prototype.openShouc = function () {
                    i.eventManager.instance.emitEvent(r.GameEvent.openShouc, null);
                }, goldtit.prototype.changeMappShow = function () {
                    this.mappbtn.visible && 2 == h.userData.is_collect && (this.mappbtn.visible = !1);
                }, goldtit.prototype.addEvent = function () {
                    var a = [this.mappbtn];
                    c.uiManager.addBtnComp(a), this.mappbtn.on(Laya.Event.CLICK, this, this.openShouc),
                        Laya.timer.loop(this.frameTime, this, this.update), i.eventManager.instance.onEvent(r.GameEvent.showGold, this, this.showGold),
                        i.eventManager.instance.onEvent(r.GameEvent.awardAddMyApp, this, this.changeMappShow);
                }, goldtit.prototype.removeEvent = function () {
                    this.mappbtn.off(Laya.Event.CLICK, this, this.openShouc), Laya.timer.clear(this, this.update),
                        i.eventManager.instance.offEvent(r.GameEvent.showGold, this, this.showGold), i.eventManager.instance.offEvent(r.GameEvent.awardAddMyApp, this, this.changeMappShow);
                    var a = [this.mappbtn];
                    c.uiManager.removeBtnComp(a);
                }, goldtit.prototype.onDestroy = function () {
                    this.removeEvent();
                }, goldtit;
            }(n.ui.perfab.goldboxUI);
        t.goldtit = g;
    }, {
        "../../data/currgameData": 4,
        "../../data/gameEnum": 5,
        "../../data/userData": 7,
        "../../manager/eventManager": 21,
        "../../manager/uiManager": 28,
        "../../ui/layaMaxUI": 58,
        "../../utils": 59
    }],
    45: [function (a, e, t) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var n = a("../../ui/layaMaxUI"),
            i = a("../../utils"),
            r = function (a) {
                function rankitem() {
                    var e = a.call(this) || this;
                    return e.size(rankitem.wid, rankitem.hei), e;
                }
                return __extends(rankitem, a), rankitem.prototype.onAwake = function () {
                    var a = new Laya.Image("game/rank/zheimg.png");
                    a.width = this.icon.width, a.height = this.icon.height, this.icon.mask = a;
                }, rankitem.prototype.setShow = function (a) {
                    if (a && a.openid) {
                        var e = a.nickname,
                            t = a.rank,
                            n = a.oneself,
                            r = a.score,
                            o = (a.openid, a.avatar);
                        this.bg1.skin = 1 == n ? "game/rank/rankmy.png" : "game/rank/rankta.png", this.icon.skin = o,
                            t <= 3 ? (this.idximg.visible = !0, this.idximg.skin = "game/rank/icon" + t + ".png",
                                this.idxlab.visible = !1) : (this.idxlab.visible = !0, this.idximg.visible = !1),
                            this.idxlab.text = t + "", this.nickname.text = i.utils.cutnameshow(e) + "", this.score.text = r + "";
                    }
                }, rankitem.wid = 600, rankitem.hei = 85, rankitem;
            }(n.ui.perfab.rankitemUI);
        t.rankitem = r;
    }, {
        "../../ui/layaMaxUI": 58,
        "../../utils": 59
    }],
    46: [function (a, e, t) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var n = function (a) {
            function shareCanvas() {
                return a.call(this) || this;
            }
            return __extends(shareCanvas, a), shareCanvas.getInstance = function () {
                return this.instance || (this.instance = new shareCanvas()), this.instance;
            }, shareCanvas.prototype.onAwake = function () {
                this.autoDestroyAtClosed = !1;
            }, shareCanvas.prototype.addEvent = function () { }, shareCanvas.prototype.removeEvent = function () { },
                shareCanvas.prototype.onDestroy = function () {
                    console.log("销毁开放域");
                }, shareCanvas;
        }(a("../../ui/layaMaxUI").ui.perfab.opencontextUI);
        t.shareCanvas = n;
    }, {
        "../../ui/layaMaxUI": 58
    }],
    47: [function (a, e, t) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var n = a("../../ui/layaMaxUI"),
            i = a("../../manager/taskManager"),
            r = a("../../manager/uiManager"),
            o = a("../../manager/eventManager"),
            s = a("../../data/gameEnum"),
            h = a("../../data/currgameData"),
            c = function (a) {
                function taskitem() {
                    return a.call(this) || this;
                }
                return __extends(taskitem, a), taskitem.prototype.onAwake = function () {
                    this.addEvent();
                }, taskitem.prototype.setShow = function (a, e) {
                    if (a && this.taskbtn) {
                        this.idx = e;
                        var t, n = a.compnums,
                            r = a.receive,
                            o = Math.ceil(a.taskaward * h.currgameData.addGoldBei),
                            s = (a.taskid,
                                a.taskname),
                            c = a.tasknums,
                            g = i.taskManager.taskName[s];
                        t = -1 != g.indexOf("%") ? g.replace("%", c) : g, this.taskname.text = t, this.protxt.text = n + "/" + c,
                            this.goldtxt.text = o + "", this.protip.width = n / c * 140, this.changeBtnShow(r);
                    }
                }, taskitem.prototype.checkGetTask = function () {
                    if (this.dataSource) {
                        var a = this.dataSource.receive,
                            e = this.dataSource.taskid,
                            t = this.dataSource.tasktype,
                            n = Math.ceil(this.dataSource.taskaward * h.currgameData.addGoldBei);
                        console.log(t, e, a, this.idx), 3 == a && (o.eventManager.instance.emitEvent(s.GameEvent.saveTaskIdx, [t, e, this.idx]),
                            "achieve" == t ? i.taskManager.getAchieveAward(e, n) : "task" == t && i.taskManager.getTodayTaskAward(e, n));
                    }
                }, taskitem.prototype.changeBtnShow = function (a) {
                    3 == a ? (this.taskbtn.skin = "game/task/btn_yellow_bg.png", this.btnimg.skin = "game/task/lingqutxt.png") : 2 == a ? (this.taskbtn.skin = "game/task/btn_yellow_bg.png",
                        this.btnimg.skin = "game/task/qwctxt.png") : 1 == a ? (this.taskbtn.skin = "game/task/btn_blue_bg.png",
                            this.btnimg.skin = "game/task/prcesstxt.png") : 0 == a && (this.taskbtn.skin = "game/task/btn_blue_bg.png",
                                this.btnimg.skin = "game/task/yilingqu.png");
                }, taskitem.prototype.addEvent = function () {
                    var a = [this.taskbtn];
                    r.uiManager.addBtnComp(a), this.taskbtn.on(Laya.Event.CLICK, this, this.checkGetTask);
                }, taskitem.prototype.removeEvent = function () {
                    var a = [this.taskbtn];
                    r.uiManager.removeBtnComp(a), this.taskbtn.off(Laya.Event.CLICK, this, this.checkGetTask);
                }, taskitem.prototype.onDestroy = function () {
                    this.removeEvent();
                }, taskitem;
            }(n.ui.perfab.taskitemUI);
        t.taskitem = c;
    }, {
        "../../data/currgameData": 4,
        "../../data/gameEnum": 5,
        "../../manager/eventManager": 21,
        "../../manager/taskManager": 27,
        "../../manager/uiManager": 28,
        "../../ui/layaMaxUI": 58
    }],
    48: [function (a, e, t) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var n = a("../../ui/layaMaxUI"),
            i = a("../../manager/soundManager"),
            r = a("../../data/gameEnum"),
            o = a("../../platform/platform"),
            s = a("../../manager/statistics"),
            h = a("../../manager/eventManager"),
            c = function (a) {
                function trygameItem() {
                    var e = a.call(this) || this;
                    return e.size(trygameItem.wid, trygameItem.hei), e;
                }
                return __extends(trygameItem, a), trygameItem.prototype.onAwake = function () {
                    this.setShow(this.dataSource), this.autoDestroyAtClosed = !0, this.addEvent();
                }, trygameItem.prototype.addEvent = function () {
                    this.on(Laya.Event.CLICK, this, this.toapp);
                }, trygameItem.prototype.removeEvent = function () {
                    this.off(Laya.Event.CLICK, this, this.toapp);
                }, trygameItem.prototype.onDestroy = function () {
                    this.removeEvent();
                }, trygameItem.prototype.setShow = function (a) {
                    if (a && this.icon) {
                        var e = a.app_img;
                        this.icon.skin = e;
                    }
                }, trygameItem.prototype.toapp = function () {
                    i.soundManager.playEffect(r.GameSound.click, 1);
                    var a = this.dataSource;
                    if (a) {
                        var e = a.app_id,
                            t = a.app_path,
                            n = a.category,
                            c = a.id;
                        o.platform.instance.navigateToMiniProgram(e, t, function (a) {
                            s.statistics.reportClickTryGame(e, n, a), h.eventManager.instance.emitEvent(r.GameEvent.changeTrydata, c);
                        }.bind(this));
                    }
                }, trygameItem.wid = 184, trygameItem.hei = 244, trygameItem;
            }(n.ui.perfab.tryitem1UI);
        t.trygameItem = c;
    }, {
        "../../data/gameEnum": 5,
        "../../manager/eventManager": 21,
        "../../manager/soundManager": 23,
        "../../manager/statistics": 24,
        "../../platform/platform": 55,
        "../../ui/layaMaxUI": 58
    }],
    49: [function (a, e, t) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var n = a("../../ui/layaMaxUI"),
            i = a("../../manager/soundManager"),
            r = a("../../data/gameEnum"),
            o = a("../../platform/platform"),
            s = a("../../manager/statistics"),
            h = a("../../manager/eventManager"),
            c = a("../../configData"),
            g = function (a) {
                function tryitem2() {
                    var e = a.call(this) || this;
                    return e.size(tryitem2.wid, tryitem2.hei), e;
                }
                return __extends(tryitem2, a), tryitem2.prototype.onAwake = function () { }, tryitem2.prototype.onEnable = function () {
                    this.addEvent();
                }, tryitem2.prototype.setShow = function (a) {
                    if (a && this.appimg) {
                        var e = a.app_img;
                        this.appimg.skin = e, Laya.timer.once(c.configData.turnTime, this, this.changetryitem);
                    }
                }, tryitem2.prototype.changetryitem = function () {
                    if (this.dataSource) {
                        var a = this.dataSource.id;
                        h.eventManager.instance.emitEvent(r.GameEvent.changeTrydata, a);
                    }
                }, tryitem2.prototype.addEvent = function () {
                    this.on(Laya.Event.CLICK, this, this.toapp);
                }, tryitem2.prototype.toapp = function () {
                    i.soundManager.playEffect(r.GameSound.click, 1);
                    var a = this.dataSource;
                    if (a) {
                        var e = a.app_id,
                            t = a.app_path,
                            n = a.category,
                            c = a.id;
                        Laya.timer.once(50, this, function () {
                            h.eventManager.instance.emitEvent(r.GameEvent.changeInkey, [{
                                type: "mousedown"
                            }]);
                        }), o.platform.instance.navigateToMiniProgram(e, t, function (a) {
                            s.statistics.reportClickTryGame(e, n, a), Laya.timer.once(50, this, function () {
                                h.eventManager.instance.emitEvent(r.GameEvent.changeInkey, [{
                                    type: "mouseout"
                                }]);
                            }), h.eventManager.instance.emitEvent(r.GameEvent.changeTrydata, c);
                        }.bind(this));
                    }
                }, tryitem2.prototype.removeEvent = function () {
                    this.off(Laya.Event.CLICK, this, this.toapp), Laya.timer.clear(this, this.changetryitem);
                }, tryitem2.prototype.onDisable = function () {
                    this.removeEvent();
                }, tryitem2.prototype.onDestroy = function () {
                    this.removeEvent();
                }, tryitem2.wid = 144, tryitem2.hei = 144, tryitem2;
            }(n.ui.perfab.tryitem2UI);
        t.tryitem2 = g;
    }, {
        "../../configData": 3,
        "../../data/gameEnum": 5,
        "../../manager/eventManager": 21,
        "../../manager/soundManager": 23,
        "../../manager/statistics": 24,
        "../../platform/platform": 55,
        "../../ui/layaMaxUI": 58
    }],
    50: [function (a, e, t) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var n = a("../../ui/layaMaxUI"),
            i = a("../../manager/soundManager"),
            r = a("../../data/gameEnum"),
            o = a("../../platform/platform"),
            s = a("../../manager/statistics"),
            h = function (a) {
                function tryitem3() {
                    var e = a.call(this) || this;
                    return e.size(tryitem3.wid, tryitem3.hei), e;
                }
                return __extends(tryitem3, a), tryitem3.prototype.onAwake = function () {
                    this.autoDestroyAtClosed = !0, this.addEvent();
                }, tryitem3.prototype.setShow = function (a) {
                    if (a && this.appimg) {
                        var e = a.app_img;
                        this.appimg.skin = e, this.appimg.size(tryitem3.wid, tryitem3.hei);
                    }
                }, tryitem3.prototype.toapp = function () {
                    i.soundManager.playEffect(r.GameSound.click, 1);
                    var a = this.dataSource;
                    if (a) {
                        var e = a.app_id,
                            t = a.app_path,
                            n = a.category;
                        o.platform.instance.navigateToMiniProgram(e, t, function (a) {
                            s.statistics.reportClickTryGame(e, n, a);
                        }.bind(this));
                    }
                }, tryitem3.prototype.addEvent = function () {
                    this.on(Laya.Event.CLICK, this, this.toapp);
                }, tryitem3.prototype.removeEvent = function () {
                    this.off(Laya.Event.CLICK, this, this.toapp);
                }, tryitem3.prototype.onDestroy = function () {
                    this.removeEvent();
                }, tryitem3.wid = 330, tryitem3.hei = 216, tryitem3;
            }(n.ui.perfab.tryitem3UI);
        t.tryitem3 = h;
    }, {
        "../../data/gameEnum": 5,
        "../../manager/soundManager": 23,
        "../../manager/statistics": 24,
        "../../platform/platform": 55,
        "../../ui/layaMaxUI": 58
    }],
    51: [function (a, e, t) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var n = a("../../ui/layaMaxUI"),
            i = a("./tryitem2"),
            r = a("../../data/tryGameData"),
            o = a("../../manager/eventManager"),
            s = a("../../data/gameEnum"),
            h = function (a) {
                function trypanel() {
                    var e = a.call(this) || this;
                    return e.listdata = [], e.addnum = 1, e.canscro = !0, e.inkey = !1, e;
                }
                return __extends(trypanel, a), trypanel.getInstance = function () {
                    return this.instance || (this.instance = new trypanel()), this.instance;
                }, trypanel.prototype.onAwake = function () {
                    this.autoDestroyAtClosed = !1, this.trylist.repeatY = 1, this.trylist.repeatX = 4,
                        this.trylist.spaceX = 10, this.trylist.itemRender = i.tryitem2, this.trylist.renderHandler = Laya.Handler.create(this, this.renderTryGame, null, !1);
                }, trypanel.prototype.renderTryGame = function (a, e) {
                    a.setShow(this.listdata[e]);
                }, trypanel.prototype.changetryData = function (a) {
                    for (var e = this.trylist.array, t = [], n = 0, i = 0; i < e.length; i++) {
                        var o = e[i].id;
                        o == a && (n = i), t.push(o);
                    }
                    var s = r.tryGameData.changeItemData("turn", t);
                    s && (e[n] = s), this.trylist.array = e, this.trylist.refresh();
                }, trypanel.prototype.onEnable = function () {
                    this.listdata = r.tryGameData.getNextGame("turn", [], 4), this.trylist.array = this.listdata,
                        this.trylist.refresh(), this.trylist.scrollTo(0), this.canscro = !0, this.inkey = !1,
                        this.addEvent();
                }, trypanel.prototype.onDisable = function () {
                    this.removeEvent();
                }, trypanel.prototype.update = function () { }, trypanel.prototype.changeScro = function (a) {
                    console.log(a.type), "mousedown" == a.type ? this.inkey = !0 : "mouseout" == a.type && (this.inkey = !1);
                }, trypanel.prototype.addEvent = function () {
                    this.trylist.on(Laya.Event.MOUSE_DOWN, this, this.changeScro), this.trylist.on(Laya.Event.MOUSE_OUT, this, this.changeScro),
                        o.eventManager.instance.onEvent(s.GameEvent.changeInkey, this, this.changeScro),
                        o.eventManager.instance.onEvent(s.GameEvent.changeTrydata, this, this.changetryData),
                        Laya.timer.frameLoop(1, this, this.update);
                }, trypanel.prototype.removeEvent = function () {
                    this.trylist.off(Laya.Event.MOUSE_DOWN, this, this.changeScro), this.trylist.off(Laya.Event.MOUSE_OUT, this, this.changeScro),
                        Laya.timer.clear(this, this.update), o.eventManager.instance.offEvent(s.GameEvent.changeInkey, this, this.changeScro),
                        o.eventManager.instance.offEvent(s.GameEvent.changeTrydata, this, this.changetryData);
                }, trypanel.prototype.onDestroy = function () {
                    this.removeEvent();
                }, trypanel;
            }(n.ui.perfab.trypanelUI);
        t.trypanel = h;
    }, {
        "../../data/gameEnum": 5,
        "../../data/tryGameData": 6,
        "../../manager/eventManager": 21,
        "../../ui/layaMaxUI": 58,
        "./tryitem2": 49
    }],
    52: [function (a, e, t) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var n = a("../../ui/layaMaxUI"),
            i = a("../../manager/eventManager"),
            r = a("../../data/gameEnum"),
            o = a("../perfab/goldtit"),
            s = a("../../data/userData"),
            h = a("../../configData"),
            c = a("../../manager/uiManager"),
            g = a("../../utils"),
            p = a("../../platform/platform"),
            d = a("../../manager/adManager"),
            l = a("../../data/currgameData"),
            m = a("../../manager/shareManager"),
            u = a("../../manager/taskManager"),
            f = a("../../manager/tableManager"),
            v = a("../../manager/statistics"),
            y = a("../../data/tryGameData"),
            b = function (a) {
                function homeScene() {
                    var e = a.call(this) || this;
                    return e.frameTime = h.configData.frameTime, e.oneTime = 1e4, e.runTime = 0, e.hometrydata = [],
                        e.addscalex = .1, e.mxscale = 1.1, e.miscale = 1, e.scalenum = 0, e.changeAds = 0,
                        e.trychangetime = 0, e;
                }
                return __extends(homeScene, a), homeScene.prototype.onAwake = function () {
                    h.configData.firstVir && (this.garagebtn.visible = !1, this.taskbtn.visible = !0,
                        this.awardbtn.visible = !1, this.rankbtn.pos(this.garagebtn.x, this.garagebtn.y),
                        this.sharebtn.pos(this.taskbtn.x, this.taskbtn.y)), d.adManager.haveVideo ? (this.startBtn.visible = !0,
                            this.startBtnVideo.visible = !0, this.novideoStart.visible = !1, this.aniBtn = this.startBtnVideo) : (this.startBtn.visible = !1,
                                this.startBtnVideo.visible = !1, this.novideoStart.visible = !0, this.aniBtn = this.novideoStart),
                        this.autoDestroyAtClosed = !0, c.uiManager.adaptPage(this, [this.topbox, this.botbox], "scene");
                    var a = new o.goldtit("home");
                    this.taskbtn.visible = false;
                    this.sharebtn.visible = false;
                    this.rankbtn.visible = false;
                    this.awardbtn.visible = false;
                    if (this.headbox.addChild(a), this.changeSetBtn("sound"), this.changeSetBtn("virbort"),
                        this.changeShowSet(), this.setAwardtxt(), this.awardbtn.visible && (this.cirmask = new Laya.Sprite(),
                            this.cirimg.mask = this.cirmask, this.changeMaskPro()), !h.configData.topoint) {
                        var e = a.star.x,
                            t = this.topbox.y + this.headbox.y + a.star.y;
                        h.configData.topoint = new Laya.Point(e, t);
                    }
                    this.changeShowTask("task"), this.changeShowTask("car"), this.hometrydata = y.tryGameData.getNextGame("home", [], 1),
                        this.setShowTry(), this.addEvent(), this.animateTryimg(this.tryimg1);
                }, homeScene.prototype.setShowTry = function () {
                    var a = this.hometrydata[0];
                    this.hometrydata[1];
                    // this.settryshow(a, this.tryimg1);
                }, homeScene.prototype.settryshow = function (a, e) {
                    var t = a.app_img;
                    e.skin = t;
                }, homeScene.prototype.toapp = function (a) {
                    var e;
                    if (1 == a ? e = this.hometrydata[0] : 2 == a && (e = this.hometrydata[1]), e) {
                        var t = e.app_id,
                            n = e.app_path,
                            i = e.category;
                        e.id;
                        p.platform.instance.navigateToMiniProgram(t, n, function (e) {
                            v.statistics.reportClickTryGame(t, i, e), this.changeTryData(a);
                        }.bind(this));
                    }
                }, homeScene.prototype.changeTryData = function (a) {
                    for (var e = this.hometrydata, t = [], n = a - 1, i = 0; i < e.length; i++) {
                        var r = e[i].id;
                        t.push(r);
                    }
                    var o, s = y.tryGameData.changeItemData("home", t);
                    (s && (e[n] = s), this.hometrydata = e, s) && (1 == a && (o = this.tryimg1), this.settryshow(s, o));
                }, homeScene.prototype.update = function () {
                    if (this.runTime += this.frameTime, this.changeMaskPro(), this.scalenum += 1, this.scalenum % 9 == 1) {
                        var a = this.aniBtn.scaleX;
                        (a >= this.mxscale || a <= this.miscale) && (this.addscalex *= -1), a += this.addscalex,
                            this.aniBtn.scaleX = a, this.aniBtn.scaleY = a;
                    }
                    var e = Math.ceil(this.runTime / d.adManager.loopBannerTime);
                    this.changeAds < e && this.changeShowAd();
                }, homeScene.prototype.animateTryimg = function (a) {
                    // this.trychangetime += 1, a.skin.length > 1 && (Laya.Tween.to(a, {
                    //     rotation: -40
                    // }, 200, null, null, 0), Laya.Tween.to(a, {
                    //     rotation: 40
                    // }, 400, null, null, 200), Laya.Tween.to(a, {
                    //     rotation: -40
                    // }, 400, null, null, 600), Laya.Tween.to(a, {
                    //     rotation: 0
                    // }, 200, null, Laya.Handler.create(this, function() {
                    //     this.trychangetime % 3 == 0 && this.changeTryData(1);
                    //     var e = 1e3 * Math.random() + 200;
                    //     Laya.timer.once(e, this, this.animateTryimg, [ a ], !1);
                    // }), 1e3));
                }, homeScene.prototype.changeShowAd = function () {
                    this.changeAds += 1, d.adManager.loopShowBanner(this.parent, this.visible);
                }, homeScene.prototype.changeMaskPro = function () {
                    if (s.userData.openServer && this.awardbtn.visible) {
                        var a = this.runTime % this.oneTime,
                            e = a / this.oneTime;
                        e >= 1 && (e = 1);
                        var t = this.cirimg.width,
                            n = 360 * e - 90;
                        this.cirmask.graphics.clear(), this.cirmask.graphics.drawPie(0, 0, t, -90, n, "#fff"),
                            this.cirmask.pos(t / 2, t / 2), this.lastCha || (this.lastCha = a), this.lastCha > a && this.setAwardtxt(),
                            this.lastCha = a;
                    }
                }, homeScene.prototype.setAwardtxt = function () {
                    g.utils.goldShow(s.userData.awardGold, this.awardtxt, null);
                }, homeScene.prototype.openGameVideo = function () {
                    //视频
                    CoinApp.showRewarded(() => {
                        //给奖励
                        l.currgameData.changeGameBei(2), this.openGame();
                    }, () => {
                        //视频没看完
                        promptText("No video or midway shutdown.");
                    })

                    // d.adManager.haveVideo = true;
                    // d.adManager.haveVideo ? d.adManager.showVideo(function(a) {
                    //     a ? (l.currgameData.addGvideo(), l.currgameData.changeGameBei(2), this.openGame()) : (this.openGame(), 
                    //     p.platform.instance.showToast("通讯失败，一倍开始"));
                    // }.bind(this), v.videoType.start) : (p.platform.instance.showToast("视频广告看完了，一倍开始"), 
                    // this.openGame());
                    // d.adManager.showVideo(function(a) {
                    //     a ? (l.currgameData.addGvideo(), l.currgameData.changeGameBei(2), this.openGame()) : (this.openGame(), 
                    //     p.platform.instance.showToast("通讯失败，一倍开始"));
                    // }.bind(this), v.videoType.start)
                }, homeScene.prototype.openGame = function () {
                    d.adManager.changeShowBanner("hide", this, "default"), i.eventManager.instance.emitEvent(r.GameEvent.openGameView, null),
                        this.close();
                    // CoinApp.showInterstitial(() => {
                    //     d.adManager.changeShowBanner("hide", this, "default"), i.eventManager.instance.emitEvent(r.GameEvent.openGameView, null),
                    //         this.close();
                    // });
                }, homeScene.prototype.openRank = function () {
                    s.userData.openServer ? i.eventManager.instance.emitEvent(r.GameEvent.openRank, null) : p.platform.instance.showToast("本地模式，无排行榜");
                }, homeScene.prototype.openGarage = function () {
                    s.userData.openServer ? s.userData.level >= h.configData.garageLevel ? i.eventManager.instance.emitEvent(r.GameEvent.openGarage, null) : p.platform.instance.showToast('车库："通过第' + h.configData.garageLevel + '关解锁"') : p.platform.instance.showToast("本地模式，无车库");
                }, homeScene.prototype.toShare = function () {
                    m.shareManager.share(r.ShareType.homeshare, null);
                }, homeScene.prototype.openTask = function () {
                    s.userData.openServer ? s.userData.level >= h.configData.taskLevel ? i.eventManager.instance.emitEvent(r.GameEvent.openTask, null) : p.platform.instance.showToast('任务："通过第' + h.configData.taskLevel + '关解锁"') : p.platform.instance.showToast("本地模式，无任务");
                }, homeScene.prototype.openArard = function () {
                    if (s.userData.openServer)
                        if (s.userData.awardGold >= h.configData.awardNum) i.eventManager.instance.emitEvent(r.GameEvent.openAward, null);
                        else {
                            var a = s.userData.awardGold;
                            Math.floor(a) > 0 && Number(this.awardtxt.text) > 0 && (this.awardbtn.mouseEnabled = !1,
                                s.userData.addGameGold(a, function () {
                                    var e = s.userData.awardGold - a;
                                    s.userData.awardGold = e, this.setAwardtxt(), g.utils.flyGoldFunc(this, null), s.userData.changeGameGold(a),
                                        s.userData.saveAward(), this.awardbtn.mouseEnabled = !0;
                                }.bind(this), function () {
                                    p.platform.instance.showToast(r.GameTxt.failServer), this.awardbtn.mouseEnabled = !0;
                                }));
                        }
                    else p.platform.instance.showToast("本地模式，无奖励");
                }, homeScene.prototype.changeShowSet = function () {
                    var a = !this.setbox.visible;
                    this.setbox.visible = a;
                }, homeScene.prototype.changeSound = function () {
                    s.userData.changeSound(), this.changeSetBtn("sound");
                }, homeScene.prototype.changeVirbort = function () {
                    s.userData.changeVirbort(), this.changeSetBtn("virbort");
                }, homeScene.prototype.openKefu = function () {
                    p.platform.instance.openCustomerServiceConversation();
                }, homeScene.prototype.changeSetBtn = function (a) {
                    if ("sound" == a) {
                        var e = s.userData.mute;
                        this.soundbtn.skin = e ? "game/home/setimgs/soundclose.png" : "game/home/setimgs/soundopen.png";
                    } else if ("virbort" == a) {
                        var t = s.userData.virbort;
                        this.virbortbtn.skin = t ? "game/home/setimgs/virbortopen.png" : "game/home/setimgs/virbortclose.png";
                    }
                }, homeScene.prototype.changeShowHome = function () {
                    for (var a = [], e = 0; e < arguments.length; e++) a[e] = arguments[e];
                    if (a.length > 1 && "start" == a[1]) this.openGame();
                    else {
                        var t = a[0];
                        this.visible = t, g.utils.changeAdShow(t, this);
                    }
                }, homeScene.prototype.addMyApp = function () {
                    var a = new Laya.Point(Laya.stage.width / 2, Laya.stage.height / 2),
                        e = h.configData.topoint;
                    g.utils.flyGoldAni(a, e, this.parent, function () { }.bind(this));
                }, homeScene.prototype.changeShowTask = function () {
                    for (var a = [], e = 0; e < arguments.length; e++) a[e] = arguments[e];
                    var t = a[0];
                    if ("task" == t) {
                        for (var n = 0, i = 0; i < u.taskManager.achieveData.length; i++) {
                            3 == u.taskManager.achieveData[i].receive && (n += 1);
                        }
                        for (var r = 0; r < u.taskManager.todayTaskData.length; r++) {
                            3 == u.taskManager.todayTaskData[r].receive && (n += 1);
                        }
                        n > 9 && (n = 9), n > 0 && s.userData.level >= h.configData.taskLevel ? (this.redot.visible = !0,
                            this.redtxt.text = n + "") : this.redot.visible = !1;
                    } else if ("car" == t)
                        if (s.userData.level >= h.configData.garageLevel) {
                            var o, c;
                            for (var g in s.userData.carInfo) {
                                var p = s.userData.carInfo[g];
                                o || (o = p, c = g), o > p && (o = p, c = g);
                            }
                            var d = f.default.getInstance().getDataByKey("cars", c + "", "upcost").split("+"),
                                l = Number(d[0]),
                                m = Number(d[1].split("*")[0]),
                                v = Math.ceil(o * m + l);
                            s.userData.gold >= v ? this.creddot.visible = !0 : this.creddot.visible = !1;
                        } else this.creddot.visible = !1;
                }, homeScene.prototype.addEvent = function () {
                    var a = [this.startBtnVideo, this.startBtn, this.novideoStart, this.rankbtn, this.garagebtn, this.sharebtn, this.taskbtn, this.awardbtn, this.setbtn, this.soundbtn, this.virbortbtn, this.kefubtn, this.tryimg1];
                    c.uiManager.addBtnComp(a), this.startBtnVideo.on(Laya.Event.CLICK, this, this.openGameVideo),
                        this.startBtn.on(Laya.Event.CLICK, this, this.openGame), this.novideoStart.on(Laya.Event.CLICK, this, this.openGame),
                        this.rankbtn.on(Laya.Event.CLICK, this, this.openRank), this.garagebtn.on(Laya.Event.CLICK, this, this.openGarage),
                        this.sharebtn.on(Laya.Event.CLICK, this, this.toShare), this.taskbtn.on(Laya.Event.CLICK, this, this.openTask),
                        this.awardbtn.on(Laya.Event.CLICK, this, this.openArard), this.setbtn.on(Laya.Event.CLICK, this, this.changeShowSet),
                        this.soundbtn.on(Laya.Event.CLICK, this, this.changeSound), this.virbortbtn.on(Laya.Event.CLICK, this, this.changeVirbort),
                        this.virbortbtn.visible = false, this.kefubtn.visible = false,
                        this.kefubtn.on(Laya.Event.CLICK, this, this.openKefu), this.tryimg1.on(Laya.Event.CLICK, this, this.toapp, [1]),
                        i.eventManager.instance.onEvent(r.GameEvent.changeShowHome, this, this.changeShowHome),
                        i.eventManager.instance.onEvent(r.GameEvent.awardAddMyApp, this, this.addMyApp),
                        i.eventManager.instance.onEvent(r.GameEvent.changeShowAward, this, this.setAwardtxt),
                        i.eventManager.instance.onEvent(r.GameEvent.changeShowTask, this, this.changeShowTask),
                        this.changeShowAd(), Laya.timer.loop(this.frameTime, this, this.update);
                }, homeScene.prototype.removeEvent = function () {
                    this.startBtnVideo.off(Laya.Event.CLICK, this, this.openGameVideo), this.startBtn.off(Laya.Event.CLICK, this, this.openGame),
                        this.novideoStart.off(Laya.Event.CLICK, this, this.openGame), this.rankbtn.off(Laya.Event.CLICK, this, this.openRank),
                        this.garagebtn.off(Laya.Event.CLICK, this, this.openGarage), this.sharebtn.off(Laya.Event.CLICK, this, this.toShare),
                        this.taskbtn.off(Laya.Event.CLICK, this, this.openTask), this.awardbtn.off(Laya.Event.CLICK, this, this.openArard),
                        this.setbtn.off(Laya.Event.CLICK, this, this.changeShowSet), this.soundbtn.off(Laya.Event.CLICK, this, this.changeSound),
                        this.virbortbtn.off(Laya.Event.CLICK, this, this.changeVirbort), this.kefubtn.off(Laya.Event.CLICK, this, this.openKefu),
                        this.tryimg1.off(Laya.Event.CLICK, this, this.toapp), i.eventManager.instance.offEvent(r.GameEvent.changeShowHome, this, this.changeShowHome),
                        i.eventManager.instance.offEvent(r.GameEvent.awardAddMyApp, this, this.addMyApp),
                        i.eventManager.instance.offEvent(r.GameEvent.changeShowAward, this, this.setAwardtxt),
                        i.eventManager.instance.offEvent(r.GameEvent.changeShowTask, this, this.changeShowTask),
                        Laya.timer.clear(this, this.update), Laya.timer.clear(this, this.animateTryimg);
                    var a = [this.startBtnVideo, this.startBtn, this.novideoStart, this.rankbtn, this.garagebtn, this.sharebtn, this.taskbtn, this.awardbtn, this.setbtn, this.soundbtn, this.virbortbtn, this.kefubtn, this.tryimg1];
                    c.uiManager.removeBtnComp(a);
                }, homeScene.prototype.onDestroy = function () {
                    this.removeEvent();
                }, homeScene;
            }(n.ui.scene.homepageUI);
        t.default = b;
    }, {
        "../../configData": 3,
        "../../data/currgameData": 4,
        "../../data/gameEnum": 5,
        "../../data/tryGameData": 6,
        "../../data/userData": 7,
        "../../manager/adManager": 19,
        "../../manager/eventManager": 21,
        "../../manager/shareManager": 22,
        "../../manager/statistics": 24,
        "../../manager/tableManager": 26,
        "../../manager/taskManager": 27,
        "../../manager/uiManager": 28,
        "../../platform/platform": 55,
        "../../ui/layaMaxUI": 58,
        "../../utils": 59,
        "../perfab/goldtit": 44
    }],
    53: [function (a, e, t) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var n = a("../../ui/layaMaxUI"),
            i = a("../../manager/eventManager"),
            r = a("../../data/gameEnum"),
            o = a("../../game/sceneWorld"),
            s = a("../../configData"),
            h = a("../../data/currgameData"),
            c = a("../../platform/platform"),
            g = a("../../manager/uiManager"),
            p = a("../../data/userData"),
            d = a("../../utils"),
            l = function (a) {
                function loadScene() {
                    var e = a.call(this) || this;
                    //this.visible=false;
                    return e.npro = 0, e.tpro = 0, e.proSpeed = .01, e;
                }
                return __extends(loadScene, a), loadScene.prototype.onAwake = function () {
                    this.autoDestroyAtClosed = !0, g.uiManager.adaptPage(this, [this.logo, this.probox], "scene", this.bg),
                        this.pro.value = 0, this.addEvent(), this.loadSubPackage(), d.utils.initConfig();
                }, loadScene.prototype.loadSubPackage = function () {
                    // if (s.configData.subpackage.length > 0 && "undefined" == typeof wx) {
                    //     var a = s.configData.subpackage[0];
                    //     if (wx.loadSubpackage) wx.loadSubpackage({
                    //         name: a,
                    //         success: function(a) {
                    //             s.configData.subpackage.shift(), this.loadSubPackage();
                    //         }.bind(this),
                    //         fail: function() {
                    //             this.loadSubPackage();
                    //         }.bind(this)
                    //     }); else c.platform.instance.showToast("微信版本过低，请升级微信");
                    // } else 
                    // this.loadSubPackage();
                    this.load2dAssect(), Laya.loader.load("res/tableData.json", Laya.Handler.create(this, function () {
                        h.currgameData.setConfigData(),
                            this.addTpro(.1);
                        for (var i = 1; i <= 10; i++) {
                            p.userData.carInfo[i] = 1;
                        };

                        //  c.platform.instance.login(function(a) {
                        //     this.addTpro(.1), p.userData.solveLoginData("server", a), c.platform.instance.setOpenStorage({
                        //         score: p.userData.maxScore
                        //     });
                        //     var e = a.userInfo.openid;
                        //     this.initOpenContext(e), p.userData.getConfigData();
                        // }.bind(this), function(a) {
                        //     c.platform.instance.showToast("连接服务器失败，启用本地模式"), this.addTpro(.4), p.userData.solveLoginData("local");
                        // }.bind(this)), 
                        this.addTpro(.4);
                        this.addScene3d();


                        var ttt = Laya.LocalStorage.getItem("mycarInfo");
                        if (ttt) {
                            p.userData.carInfo = JSON.parse(ttt);
                        }

                        var userDatalevel = Laya.LocalStorage.getItem("userDatalevel");
                        if (userDatalevel) {
                            p.userData.level = parseInt(userDatalevel);
                        }

                        var userDatagold = Laya.LocalStorage.getItem("userDatagold");
                        if (userDatagold) {
                            p.userData.gold = parseInt(userDatagold);
                        }

                    }));
                }, loadScene.prototype.load2dAssect = function () {
                    Laya.loader.load(["res/atlas/game/home.atlas", "res/atlas/game/rank.atlas", "res/atlas/game/upgrade.atlas"], Laya.Handler.create(this, function () {
                        this.addTpro(.1);
                        this.load3dAssect();
                    }));
                }, loadScene.prototype.load3dAssect = function () {
                    Laya.Scene3D.load(["res/LayaScene_trafficscene/Conventional/carmods.lh",
                        "res/LayaScene_trafficscene/Conventional/effects.lh",
                        "res/LayaScene_trafficscene/Conventional/envirs.lh",
                        "res/LayaScene_trafficscene/Conventional/Lane.lh",
                        "res/LayaScene_trafficscene/Conventional/RoadLine.lh",
                        "res/LayaScene_trafficscene/Conventional/roadmouth.lh",
                        "res/LayaScene_trafficscene/Conventional/star.lh",
                        "res/LayaScene_trafficscene/Conventional/StripedLines.lh",

                        "res/LayaScene_trafficscene/Conventional/tools.lh",
                    ], Laya.Handler.create(this, function () {
                        this.addTpro(.5);
                    }));
                },
                    loadScene.prototype.addTpro = function (a) {
                        this.tpro += a;
                    }, loadScene.prototype.update = function () {
                        this.npro < this.tpro && (this.npro += this.proSpeed, this.setLoadPro(), this.npro >= 1 && (Laya.timer.clear(this, this.update),
                            this.addHomePage(), this.close()));
                    }, loadScene.prototype.addScene3d = function () {
                        var a = new Laya.Scene3D();
                        Laya.stage.addChild(a), Laya.stage.setChildIndex(a, 0), a.addComponent(o.sceneWorld);
                    }, loadScene.prototype.addHomePage = function () {
                        i.eventManager.instance.emitEvent(r.GameEvent.openHomePage, null), -1 == p.userData.avatar.indexOf("https://wx.qlogo.cn") && c.platform.instance.createHomeBtn(Laya.stage.width, Laya.stage.height, 0, 0);
                    }, loadScene.prototype.setLoadPro = function () {

                        this.pro.value = this.npro > 1 ? 1 : this.npro, this.loadtxt.text = Math.ceil(100 * this.npro) + "%";
                        console.log("当前进度：" + Math.ceil(100 * this.npro));
                    }, loadScene.prototype.initOpenContext = function (a) {
                        c.platform.instance.postOpenData({
                            type: "setId",
                            appid: a,
                            width: Laya.stage.width,
                            height: Laya.stage.height
                        });
                    }, loadScene.prototype.addEvent = function () {
                        Laya.timer.loop(50, this, this.update), i.eventManager.instance.onEvent(r.GameEvent.addTpro, this, this.addTpro);
                    }, loadScene.prototype.removeEvent = function () {
                        Laya.timer.clear(this, this.update), i.eventManager.instance.offEvent(r.GameEvent.addTpro, this, this.addTpro);
                    }, loadScene.prototype.onDestroy = function () {
                        this.removeEvent();
                    }, loadScene;
            }(n.ui.scene.loadpageUI);
        t.default = l;
    }, {
        "../../configData": 3,
        "../../data/currgameData": 4,
        "../../data/gameEnum": 5,
        "../../data/userData": 7,
        "../../game/sceneWorld": 17,
        "../../manager/eventManager": 21,
        "../../manager/uiManager": 28,
        "../../platform/platform": 55,
        "../../ui/layaMaxUI": 58,
        "../../utils": 59
    }],
    54: [function (a, e, t) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var n = a("../../ui/layaMaxUI"),
            i = a("../../manager/eventManager"),
            r = a("../../data/gameEnum"),
            o = a("../../data/currgameData"),
            s = a("../../manager/uiManager"),
            h = a("../perfab/goldtit"),
            c = a("../../data/userData"),
            g = a("../../manager/soundManager"),
            p = a("../../manager/tableManager"),
            d = function (a) {
                function gameView() {
                    var e = a.call(this) || this;
                    return e.chartIdx = 0, e.soundIdx = 0, e.txtArr = [], e.proMaxwidth = 440, e;
                }
                return __extends(gameView, a), gameView.prototype.onAwake = function () {
                    s.uiManager.adaptPage(this, [this.topbox], "view");
                    var a = new h.goldtit("gameview");
                    this.headbox.addChild(a), this.autoDestroyAtClosed = !0, o.currgameData.changeGameStat(1);
                    var e = this.nlebox.getChildByName("ltxt"),
                        t = this.tlebox.getChildByName("ltxt");
                    e.value = c.userData.level + "", t.value = c.userData.level + 1 + "",
                        this.changeLpro(0), this.addEvent();
                    Laya.LocalStorage.setItem("userDatalevel", c.userData.level);
                }, gameView.prototype.changeTap = function () {
                    i.eventManager.instance.emitEvent(r.GameEvent.emitCar, null);
                }, gameView.prototype.chartManage = function () {
                    for (var a = [], e = 0; e < arguments.length; e++) a[e] = arguments[e];
                    var t = a[0];
                    if ("reset" != t) {
                        var n = a[1],
                            s = a[2];
                        if ("fail" == t ? this.chartIdx = -1 : "success" == t && (this.chartIdx <= 0 ? (this.firstA = !0,
                            this.chartIdx = Math.floor(Math.random() * o.currgameData.sucExpre.length)) : (this.firstA = !1,
                                this.chartIdx += 1)), this.chartIdx < 0 ? (o.currgameData.lemitnum = 0, i.eventManager.instance.emitEvent(r.GameEvent.alertChart, [this.chartIdx, n, s, this.parent])) : this.firstA ? (o.currgameData.lemitnum = 0,
                                    i.eventManager.instance.emitEvent(r.GameEvent.getChartPos + "-" + n + "-" + s, null),
                                    this.soundIdx = 0, g.soundManager.playEffect(r.GameSound.cars, 1, this.soundIdx)) : (o.currgameData.addLchacar(1),
                                        i.eventManager.instance.emitEvent(r.GameEvent.alertChart, [this.chartIdx, n, s, this.parent]),
                                        this.soundIdx += 1, g.soundManager.playEffect(r.GameSound.cars, 1, this.soundIdx),
                                        o.currgameData.lemitnum += 1), "success" == t) {
                            var h = a[3],
                                c = a[4];
                            // this.addScoreTxt(h[0], h[1], c);
                        }
                    } else this.chartIdx = 0;
                }, gameView.prototype.addScoreTxt = function (a, e, t) {
                    if (this.txtArr.length < 1) {
                        var n = new Laya.Label();
                        n.fontSize = 56, n.color = "#ffe400", n.stroke = 2, n.strokeColor = "#000000", n.anchorX = .5,
                            n.anchorY = 1, this.txtArr.push(n);
                    }
                    var i = p.default.getInstance().getKeyByVal("cars", "carname", t),
                        r = c.userData.carInfo[i],
                        s = Number(p.default.getInstance().getDataByKey("cars", i, "gscore").split("*")[0]),
                        h = 1;
                    o.currgameData.lemitnum > 0 && (h = 1 == o.currgameData.lemitnum ? o.currgameData.ocontinscore : o.currgameData.tcontinscore);
                    var g = Math.floor(o.currgameData.gamebei * (s * r) * h),
                        d = this.txtArr.shift();
                    d.text = "+" + g, this.addChild(d), d.scale(.5, .5), d.x = a, d.y = e, Laya.Tween.to(d, {
                        scaleX: 1,
                        scaleY: 1,
                        y: e - 100
                    }, 400, null, Laya.Handler.create(this, function () {
                        d.removeSelf(), this.txtArr.push(d);
                    }));
                }, gameView.prototype.getWudi = function () {
                    o.currgameData.changeInvincible(!0), i.eventManager.instance.emitEvent(r.GameEvent.changeWudi, null);
                }, gameView.prototype.closePage = function () {
                    this.close();
                }, gameView.prototype.showCurrScore = function () {
                    // this.score.value = o.currgameData.currscore + "";
                }, gameView.prototype.changeLpro = function (a) {
                    this.protip.width = this.proMaxwidth * a;
                }, gameView.prototype.addEvent = function () {
                    this.on(Laya.Event.MOUSE_DOWN, this, this.changeTap), this.wudibtn.on(Laya.Event.CLICK, this, this.getWudi),
                        i.eventManager.instance.onEvent(r.GameEvent.closePage, this, this.closePage), i.eventManager.instance.onEvent(r.GameEvent.chartManage, this, this.chartManage),
                        i.eventManager.instance.onEvent(r.GameEvent.addCurrScore, this, this.showCurrScore),
                        i.eventManager.instance.onEvent(r.GameEvent.changeLpro, this, this.changeLpro);
                }, gameView.prototype.removeEvent = function () {
                    this.off(Laya.Event.MOUSE_DOWN, this, this.changeTap), i.eventManager.instance.offEvent(r.GameEvent.closePage, this, this.closePage),
                        i.eventManager.instance.offEvent(r.GameEvent.chartManage, this, this.chartManage),
                        i.eventManager.instance.offEvent(r.GameEvent.addCurrScore, this, this.showCurrScore),
                        i.eventManager.instance.offEvent(r.GameEvent.changeLpro, this, this.changeLpro);
                }, gameView.prototype.onDestroy = function () {
                    this.removeEvent();
                }, gameView;
            }(n.ui.view.gamepageUI);
        t.default = d;
    }, {
        "../../data/currgameData": 4,
        "../../data/gameEnum": 5,
        "../../data/userData": 7,
        "../../manager/eventManager": 21,
        "../../manager/soundManager": 23,
        "../../manager/tableManager": 26,
        "../../manager/uiManager": 28,
        "../../ui/layaMaxUI": 58,
        "../perfab/goldtit": 44
    }],
    55: [function (a, e, t) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var n = a("./wx/wxPlatform"),
            i = a("../configData"),
            r = a("../data/userData"),
            o = a("./web/webPlatform"),
            s = function () {
                function platform() {
                    "wx" == i.configData.releasePlatform ? this.channel = new n.wxPlatform() : "web" == i.configData.releasePlatform && (this.channel = new o.webPlatform());
                }
                return platform.prototype.require = function () { }, platform.prototype.login = function (a, e) {
                    this.channel.login(a, e);
                }, platform.prototype.createHomeBtn = function (a, e, t, n) {
                    // this.channel.createHomeBtn(a, e, t, n);
                }, platform.prototype.createLoginBtn = function (a, e, t, n) {
                    this.channel.createLoginBtn(a, e, t, n);
                }, platform.prototype.showLoginBtn = function () {
                    this.channel.showLoginBtn();
                }, platform.prototype.hideLoginBtn = function () {
                    this.channel.hideLoginBtn();
                }, platform.prototype.request = function (a, e, t, n, i) {
                    void 0 === i && (i = "POST"), r.userData.openServer ? this.channel.request(a, e, t, n, i) : n && n(null);
                }, platform.prototype.getChannel = function () {
                    return this.channel.getChannel();
                }, platform.prototype.postOpenData = function (a) {
                    this.channel.postOpenData(a);
                }, platform.prototype.setOpenStorage = function (a) {
                    this.channel.setOpenStorage(a);
                }, platform.prototype.onShow = function () {
                    this.channel.onShow();
                }, platform.prototype.showShare = function () {
                    this.channel.showShare();
                }, platform.prototype.onHide = function () {
                    this.channel.onHide();
                }, platform.prototype.onShareAppMessage = function (a, e, t) {
                    this.channel.onShareAppMessage(a, e, t);
                }, platform.prototype.shareAppMessage = function (a, e, t) {
                    this.channel.shareAppMessage(a, e, t);
                }, platform.prototype.showToast = function (a) {
                    this.channel.showToast(a);
                }, platform.prototype.openCustomerServiceConversation = function () {
                    this.channel.openCustomerServiceConversation();
                }, platform.prototype.vibrate = function (a) {
                    r.userData.virbort && this.channel.vibrate(a);
                }, platform.prototype.getUserInfo = function (a) {
                    this.channel.getUserInfo(a);
                }, platform.prototype.navigateToMiniProgram = function (a, e, t) {
                    this.channel.navigateToMiniProgram(a, e, t);
                }, platform.prototype.onAudioInterruptionEnd = function () {
                    this.channel.onAudioInterruptionEnd();
                }, platform.prototype.showShareMenu = function () {
                    this.channel.showShareMenu();
                }, platform.prototype.onMemoryWarning = function () {
                    this.channel.onMemoryWarning();
                }, platform.prototype.setKeepScreenOn = function () {
                    this.channel.setKeepScreenOn();
                }, platform.prototype.getSystemInfoSync = function () {
                    return this.channel.getSystemInfoSync();
                }, platform.prototype.encrypt = function (a) {
                    return this.channel.encrypt(a);
                }, platform.prototype.checkEquals = function (a, e) {
                    return this.encrypt(a) == e || (this.showToast("请不要作弊"), !1);
                }, platform.instance = new platform(), platform;
            }();
        t.platform = s;
    }, {
        "../configData": 3,
        "../data/userData": 7,
        "./web/webPlatform": 56,
        "./wx/wxPlatform": 57
    }],
    56: [function (a, e, t) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var n = function () {
            function webPlatform() {
                this.canvibrate = !0;
            }
            return webPlatform.prototype.login = function (a) {
                a && a();
            }, webPlatform.prototype.encrypt = function (a) { }, webPlatform.prototype.request = function (a, e, t, n) {
                void 0 === n && (n = "POST");
            }, webPlatform.prototype.postOpenData = function (a) { }, webPlatform.prototype.setOpenStorage = function (a) { },
                webPlatform.prototype.onShow = function () { }, webPlatform.prototype.checkUpdate = function () { },
                webPlatform.prototype.onHide = function () { }, webPlatform.prototype.onShareAppMessage = function (a, e, t) { },
                webPlatform.prototype.shareAppMessage = function (a, e, t) { }, webPlatform.prototype.showToast = function (a) { },
                webPlatform.prototype.vibrate = function (a) { }, webPlatform.prototype.showShareMenu = function () { },
                webPlatform.prototype.openCustomerServiceConversation = function () { }, webPlatform.prototype.navigateToMiniProgram = function (a, e, t) { },
                webPlatform.prototype.onAudioInterruptionEnd = function () { }, webPlatform.prototype.setKeepScreenOn = function () { },
                webPlatform.prototype.onMemoryWarning = function () { }, webPlatform.prototype.getSystemInfoSync = function () {
                    return null;
                }, webPlatform;
        }();
        t.webPlatform = n;
    }, {}],
    57: [function (a, e, t) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var n = a("../../data/userData"),
            i = a("../../configData"),
            r = a("../../manager/eventManager"),
            o = a("../../data/gameEnum"),
            s = a("../../manager/shareManager"),
            h = a("../../manager/statistics"),
            c = function () {
                function wxPlatform() {
                    this.canvibrate = !0;
                }
                return wxPlatform.prototype.login = function (a, e) {
                    wx.login({
                        success: function (t) {
                            var i = {
                                code: t.code
                            },
                                r = wx.getLaunchOptionsSync(),
                                o = r.query,
                                s = r.scene;
                            n.userData.loginScene = Number(s);
                            var h, c = r.referrerInfo;
                            if (c && (h = c.appId), h && (i.channel = h), o) {
                                var g = o.pathid,
                                    p = o.share_id,
                                    d = o.share_user_id;
                                g && (i.source = g), p && (i.share_id = p), d && (i.share_user_id = d);
                            }
                            this.request("loginInit", i, a, e);
                        }.bind(this),
                        fail: function (a) {
                            this.showToast("微信登陆失败,进入本地模式"), e && e(null);
                        }.bind(this)
                    });
                }, wxPlatform.prototype.encrypt = function (a) {
                    return window.md5.hex_hmac_md5(i.configData.apiSecret, a);
                }, wxPlatform.prototype.showLoginBtn = function () {
                    this.loginBtn && this.loginBtn.show();
                }, wxPlatform.prototype.hideLoginBtn = function () {
                    this.loginBtn && this.loginBtn.hide();
                }, wxPlatform.prototype.createLoginBtn = function (a, e, t, n) {
                    this.loginBtn = this.createUserBtn(a, e, t, n), this.loginBtn.onTap(function (a) {
                        -1 != a.errMsg.indexOf("ok") ? (this.freshUserData(a), this.loginBtn.destroy()) : (console.error("用户拒绝了授权"),
                            this.showToast("查看排行需授权"));
                    }.bind(this));
                }, wxPlatform.prototype.createHomeBtn = function (a, e, t, n) {
                    this.loginBtn1 = this.createUserBtn(a, e, t, n), this.loginBtn1.onTap(function (a) {
                        -1 != a.errMsg.indexOf("ok") && this.freshUserData(a), this.loginBtn1.destroy(),
                            this.showToast("点击按钮，开始游戏");
                    }.bind(this));
                }, wxPlatform.prototype.createUserBtn = function (a, e, t, n) {
                    var r = i.configData.systemInfo.screenHeight,
                        o = i.configData.systemInfo.screenWidth,
                        s = Laya.stage.width,
                        h = Laya.stage.height,
                        c = o * t / s,
                        g = r * n / h,
                        p = o * a / s,
                        d = r * e / h;
                    return wx.createUserInfoButton({
                        type: "image",
                        image: "",
                        style: {
                            left: c,
                            top: g,
                            width: p,
                            height: d
                        },
                        withCredentials: !0
                    });
                }, wxPlatform.prototype.freshUserData = function (a) {
                    var e = {
                        iv: a.iv,
                        encrypted_data: a.encryptedData
                    };
                    this.request("authorizedLogin", e, function (a) {
                        n.userData.freshPlayerData(a);
                    }, function () { });
                }, wxPlatform.prototype.request = function (a, e, t, r, o) {
                    if (void 0 === o && (o = "POST"), "POST" == o || "TGET" == o) {
                        e.apiKey = i.configData.apiKey, e.timestamp = Date.now(), e.version = i.configData.version,
                            "loginInit" != a && (e.token = n.userData.token);
                        for (var s = Object.keys(e).sort(), h = "", c = 0; c < s.length; c++) h += encodeURIComponent(e[s[c]]);
                        var g = window.md5.hex_hmac_md5(i.configData.apiSecret, h);
                        e.apiSign = g;
                    }
                    "TGET" == o && (o = "GET"), wx.request({
                        url: i.configData.serverUrl + a,
                        data: e,
                        method: o,
                        success: function (a) {
                            if (a.data && 0 == a.data.code) {
                                var e = a.data.result;
                                t && t(e);
                            } else r && r(null);
                        },
                        fail: function () {
                            r && r(null);
                        }
                    });
                }, wxPlatform.prototype.postOpenData = function (a) {
                    wx.getOpenDataContext().postMessage(a);
                }, wxPlatform.prototype.setOpenStorage = function (a) {
                    var e = [];
                    for (var t in a) {
                        var n = {
                            key: String(t),
                            value: String(a[t])
                        };
                        e.push(n);
                    }
                    wx.setUserCloudStorage({
                        KVDataList: e,
                        success: function () { },
                        fail: function () { }
                    });
                }, wxPlatform.prototype.onShow = function () {
                    wx.onShow(function (a) {
                        var e = a.scene,
                            t = (a.query, a.shareTicket, a.referrerInfo);
                        if (t) t.appId, t.extraData;
                        if (r.eventManager.instance.emitEvent(o.GameEvent.backInSettle, null), s.shareManager.backShare(),
                            n.userData.token && a.query && a.query.share_user_id && h.statistics.reportClickShare(a.query.share_id, a.query.share_user_id),
                            e && 1089 == e && 2 != n.userData.is_collect) {
                            this.request("updateCollect", {
                                is_collect: 2
                            }, function (a) {
                                n.userData.is_collect = 2;
                            }.bind(this), function (a) { }.bind(this));
                        }
                        this.checkUpdate();
                    }.bind(this));
                }, wxPlatform.prototype.checkUpdate = function () {
                    if ("function" == typeof wx.getUpdateManager) {
                        var a = wx.getUpdateManager();
                        a.onCheckForUpdate(function (a) { }), a.onUpdateReady(function () {
                            a.applyUpdate();
                        }), a.onUpdateFailed(function () { });
                    }
                }, wxPlatform.prototype.onHide = function () {
                    wx.onHide(function (a) {
                        n.userData.saveAward();
                    });
                }, wxPlatform.prototype.onShareAppMessage = function (a, e, t) {
                    var n;
                    n = {
                        title: a,
                        imageUrl: e,
                        query: t
                    }, wx.onShareAppMessage(function () {
                        return n;
                    });
                }, wxPlatform.prototype.shareAppMessage = function (a, e, t) {
                    var n;
                    n = {
                        title: a,
                        imageUrl: e,
                        query: t
                    }, wx.shareAppMessage(n);
                }, wxPlatform.prototype.showToast = function (a) {
                    wx.showToast({
                        title: a,
                        icon: "none",
                        duration: 1e3
                    });
                }, wxPlatform.prototype.vibrate = function (a) {
                    "undefined" != typeof wx && this.canvibrate && (this.canvibrate = !1, "short" == a ? wx.vibrateShort({
                        complete: function () {
                            this.canvibrate = !0;
                        }.bind(this)
                    }) : "long" == a ? wx.vibrateLong({
                        complete: function () {
                            this.canvibrate = !0;
                        }.bind(this)
                    }) : this.canvibrate = !0);
                }, wxPlatform.prototype.showShareMenu = function () {
                    "undefined" != typeof wx && wx.showShareMenu({
                        withShareTicket: !0
                    });
                }, wxPlatform.prototype.openCustomerServiceConversation = function () {
                    wx.openCustomerServiceConversation({});
                }, wxPlatform.prototype.navigateToMiniProgram = function (a, e, t) {
                    wx.navigateToMiniProgram({
                        appId: a,
                        path: e,
                        success: function () {
                            t && t(1);
                        },
                        fail: function () {
                            t && t(0);
                        }
                    });
                }, wxPlatform.prototype.onAudioInterruptionEnd = function () {
                    wx.onAudioInterruptionEnd && wx.onAudioInterruptionEnd(function () { });
                }, wxPlatform.prototype.setKeepScreenOn = function () {
                    wx.setKeepScreenOn && wx.setKeepScreenOn({
                        keepScreenOn: !0
                    });
                }, wxPlatform.prototype.onMemoryWarning = function () {
                    wx.onMemoryWarning && wx.onMemoryWarning(function (a) {
                        var e = "";
                        a && a.level && (e = a.level), console.error("内存告警：" + e);
                    });
                }, wxPlatform.prototype.getSystemInfoSync = function () {
                    if (wx.getSystemInfoSync) return wx.getSystemInfoSync();
                }, wxPlatform;
            }();
        t.wxPlatform = c;
    }, {
        "../../configData": 3,
        "../../data/gameEnum": 5,
        "../../data/userData": 7,
        "../../manager/eventManager": 21,
        "../../manager/shareManager": 22,
        "../../manager/statistics": 24
    }],
    58: [function (a, e, t) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var n = Laya.ClassUtils.regClass;
        ! function (a) {
            ! function (a) {
                var e = function (a) {
                    function awardpageUI() {
                        return a.call(this) || this;
                    }
                    return __extends(awardpageUI, a), awardpageUI.prototype.createChildren = function () {
                        a.prototype.createChildren.call(this), this.createView(awardpageUI.uiView);
                    }, awardpageUI.uiView = {
                        type: "Dialog",
                        props: {
                            width: 750,
                            height: 1334
                        },
                        compId: 2,
                        child: [{
                            type: "Box",
                            props: {
                                width: 750,
                                var: "contbox",
                                height: 1100
                            },
                            compId: 3,
                            child: [{
                                type: "Box",
                                props: {
                                    y: 23,
                                    x: 0,
                                    width: 750,
                                    var: "headbox"
                                },
                                compId: 23
                            }, {
                                type: "Image",
                                props: {
                                    y: 200,
                                    x: 85,
                                    skin: "game/currency/dialogbg2.png"
                                },
                                compId: 4,
                                child: [{
                                    type: "Image",
                                    props: {
                                        y: 110,
                                        x: 25,
                                        width: 530,
                                        skin: "game/currency/ldialogbg.png",
                                        sizeGrid: "15,15,15,15",
                                        height: 460
                                    },
                                    compId: 5
                                }, {
                                    type: "Image",
                                    props: {
                                        y: 298,
                                        x: 278,
                                        var: "shineimg",
                                        skin: "game/currency/shineimg.png",
                                        scaleY: .7,
                                        scaleX: .7,
                                        anchorY: .5,
                                        anchorX: .5
                                    },
                                    compId: 6
                                }, {
                                    type: "Sprite",
                                    props: {
                                        y: 35,
                                        x: 193,
                                        texture: "game/currency/rctxt.png"
                                    },
                                    compId: 7
                                }, {
                                    type: "Label",
                                    props: {
                                        y: 506,
                                        x: 80,
                                        text: "通过关卡越多，日常收益越多！",
                                        fontSize: 30,
                                        color: "#9fb3ee"
                                    },
                                    compId: 8
                                }, {
                                    type: "Label",
                                    props: {
                                        y: 445,
                                        x: 196,
                                        var: "awardtxt",
                                        text: "Get Gold+150",
                                        fontSize: 30,
                                        color: "#fff"
                                    },
                                    compId: 9
                                }, {
                                    type: "Image",
                                    props: {
                                        y: 298,
                                        x: 278,
                                        skin: "game/currency/manygold.png",
                                        anchorY: .5,
                                        anchorX: .5
                                    },
                                    compId: 10
                                }, {
                                    type: "Button",
                                    props: {
                                        y: 610,
                                        x: 20,
                                        var: "onebtn",
                                        stateNum: 1,
                                        skin: "game/currency/btn_one.png"
                                    },
                                    compId: 11,
                                    child: [{
                                        type: "Sprite",
                                        props: {
                                            y: 22,
                                            x: 120,
                                            texture: "game/currency/goldicon.png",
                                            scaleY: .8,
                                            scaleX: .8
                                        },
                                        compId: 16
                                    }, {
                                        type: "FontClip",
                                        props: {
                                            y: 44,
                                            x: 162,
                                            var: "onegold",
                                            value: "12.4k",
                                            skin: "game/currency/numtest.png",
                                            sheet: "0123456789k.",
                                            scaleY: .4,
                                            scaleX: .35,
                                            anchorY: .5,
                                            anchorX: 0,
                                            align: "left"
                                        },
                                        compId: 18
                                    }]
                                }, {
                                    type: "Button",
                                    props: {
                                        y: 610,
                                        x: 299,
                                        var: "beibtn",
                                        stateNum: 1,
                                        skin: "game/currency/btn_blue_bg1.png"
                                    },
                                    compId: 15,
                                    child: [{
                                        type: "Image",
                                        props: {
                                            y: 19,
                                            x: 5,
                                            var: "icon",
                                            skin: "game/currency/videoblue.png",
                                            scaleY: .8,
                                            scaleX: .8
                                        },
                                        compId: 21
                                    }, {
                                        type: "Sprite",
                                        props: {
                                            y: 22,
                                            x: 73,
                                            texture: "game/currency/goldicon.png",
                                            scaleY: .8,
                                            scaleX: .8
                                        },
                                        compId: 19
                                    }, {
                                        type: "Sprite",
                                        props: {
                                            y: 0,
                                            x: 205,
                                            texture: "game/award/sanbeitxt.png",
                                            scaleY: .6,
                                            scaleX: .6
                                        },
                                        compId: 22
                                    }, {
                                        type: "FontClip",
                                        props: {
                                            y: 44,
                                            x: 127,
                                            var: "beigold",
                                            value: "123",
                                            skin: "game/currency/numtest.png",
                                            sheet: "0123456789k.",
                                            scaleY: .4,
                                            scaleX: .35,
                                            anchorY: .5,
                                            anchorX: 0,
                                            align: "left"
                                        },
                                        compId: 20
                                    }]
                                }]
                            }, {
                                type: "Sprite",
                                props: {
                                    y: 1010,
                                    x: 345,
                                    var: "closebtn",
                                    texture: "game/currency/close2.png"
                                },
                                compId: 14
                            }]
                        }],
                        loadList: ["game/currency/dialogbg2.png", "game/currency/ldialogbg.png", "game/currency/shineimg.png", "game/currency/rctxt.png", "game/currency/manygold.png", "game/currency/btn_one.png", "game/currency/goldicon.png", "game/currency/numtest.png", "game/currency/btn_blue_bg1.png", "game/currency/videoblue.png", "game/award/sanbeitxt.png", "game/currency/close2.png"],
                        loadList3D: []
                    }, awardpageUI;
                }(Laya.Dialog);
                a.awardpageUI = e, n("ui.dialog.awardpageUI", e);
                var t = function (a) {
                    function fuhuopageUI() {
                        return a.call(this) || this;
                    }
                    return __extends(fuhuopageUI, a), fuhuopageUI.prototype.createChildren = function () {
                        a.prototype.createChildren.call(this), this.createView(fuhuopageUI.uiView);
                    }, fuhuopageUI.uiView = {
                        type: "Dialog",
                        props: {
                            width: 750,
                            height: 1334
                        },
                        compId: 2,
                        child: [{
                            type: "Box",
                            props: {
                                x: 0,
                                width: 750,
                                var: "topbox"
                            },
                            compId: 9,
                            child: [{
                                type: "Sprite",
                                props: {
                                    texture: "game/fuhuo/lxleveltxt.png"
                                },
                                compId: 10
                            }, {
                                type: "Sprite",
                                props: {
                                    y: 220,
                                    x: 255,
                                    texture: "game/fuhuo/cdtimebg.png"
                                },
                                compId: 11
                            }, {
                                type: "Image",
                                props: {
                                    y: 220,
                                    x: 255,
                                    width: 240,
                                    var: "proimg",
                                    skin: "game/fuhuo/cdtime.png",
                                    height: 240
                                },
                                compId: 12
                            }, {
                                type: "FontClip",
                                props: {
                                    y: 340,
                                    x: 375,
                                    var: "lesstime",
                                    value: "15",
                                    skin: "game/currency/numtest.png",
                                    sheet: "0123456789k.",
                                    scaleY: 1.5,
                                    scaleX: 1.5,
                                    anchorY: .5,
                                    anchorX: .5
                                },
                                compId: 14
                            }]
                        }, {
                            type: "Box",
                            props: {
                                y: 994,
                                x: 0,
                                width: 750,
                                var: "botbox",
                                height: 340
                            },
                            compId: 5,
                            child: [{
                                type: "Button",
                                props: {
                                    y: 0,
                                    x: 219,
                                    var: "sharefuhuobtn",
                                    stateNum: 1,
                                    skin: "game/currency/btn_blue_bg.png"
                                },
                                compId: 6,
                                child: [{
                                    type: "Sprite",
                                    props: {
                                        y: 22,
                                        x: 34,
                                        texture: "game/fuhuo/sharefuhuo.png"
                                    },
                                    compId: 16
                                }]
                            }, {
                                type: "Button",
                                props: {
                                    y: -100,
                                    x: 219,
                                    var: "videofuhuobtn",
                                    stateNum: 1,
                                    skin: "game/currency/btn_yellow_bg.png"
                                },
                                compId: 15,
                                child: [{
                                    type: "Sprite",
                                    props: {
                                        y: 22,
                                        x: 18,
                                        texture: "game/fuhuo/videofuhuo.png"
                                    },
                                    compId: 17
                                }]
                            }, {
                                type: "Button",
                                props: {
                                    y: 85,
                                    x: 280,
                                    var: "jumpbtn",
                                    stateNum: 1,
                                    skin: "game/currency/jumptxt.png"
                                },
                                compId: 7
                            }]
                        }, {
                            type: "Box",
                            props: {
                                y: 484,
                                x: 0,
                                width: 750,
                                var: "trybox",
                                height: 196
                            },
                            compId: 18
                        }],
                        loadList: ["game/fuhuo/lxleveltxt.png", "game/fuhuo/cdtimebg.png", "game/fuhuo/cdtime.png", "game/currency/numtest.png", "game/currency/btn_blue_bg.png", "game/fuhuo/sharefuhuo.png", "game/currency/btn_yellow_bg.png", "game/fuhuo/videofuhuo.png", "game/currency/jumptxt.png"],
                        loadList3D: []
                    }, fuhuopageUI;
                }(Laya.Dialog);
                a.fuhuopageUI = t, n("ui.dialog.fuhuopageUI", t);
                var i = function (a) {
                    function gameoverpageUI() {
                        return a.call(this) || this;
                    }
                    return __extends(gameoverpageUI, a), gameoverpageUI.prototype.createChildren = function () {
                        a.prototype.createChildren.call(this), this.createView(gameoverpageUI.uiView);
                    }, gameoverpageUI.uiView = {
                        type: "Dialog",
                        props: {
                            width: 750,
                            height: 1334
                        },
                        compId: 2,
                        child: [{
                            type: "Box",
                            props: {
                                y: 260,
                                x: 0,
                                width: 750,
                                var: "topbox",
                                height: 930
                            },
                            compId: 7,
                            child: [{
                                type: "FontClip",
                                props: {
                                    y: 36.8,
                                    x: 406.4,
                                    var: "nlevel",
                                    value: "23",
                                    skin: "game/currency/numtest.png",
                                    sheet: "0123456789k.",
                                    scaleY: .8,
                                    scaleX: .8,
                                    anchorY: .5,
                                    anchorX: 1,
                                    align: "right"
                                },
                                compId: 8
                            }, {
                                type: "Label",
                                props: {
                                    y: 19.800000000000004,
                                    x: 300.4,
                                    text: "LV",
                                    fontSize: 34,
                                    color: "#fff"
                                },
                                compId: 9
                            }, {
                                type: "Image",
                                props: {
                                    y: 75,
                                    x: 375,
                                    var: "titimg",
                                    skin: "game/gameover/errorlevel.png",
                                    anchorX: .5
                                },
                                compId: 10
                            }, {
                                type: "Image",
                                props: {
                                    y: 360,
                                    x: 67,
                                    width: 615,
                                    var: "trybg",
                                    skin: "game/gameover/listbg.png",
                                    sizeGrid: "50,50,50,50",
                                    visible: false,
                                    height: 536
                                },
                                compId: 17,
                                child: [{
                                    type: "List",
                                    props: {
                                        y: 18,
                                        x: 16,
                                        width: 580,
                                        var: "trylist",
                                        height: 500
                                    },
                                    compId: 18
                                }]
                            }]
                        }, {
                            type: "Box",
                            props: {
                                y: 1020,
                                x: 0,
                                width: 750,
                                var: "botbox",
                                height: 120
                            },
                            compId: 3,
                            child: [{
                                type: "Sprite",
                                props: {
                                    y: 0,
                                    x: 50,
                                    var: "backhome",
                                    texture: "game/gameover/homebtn.png"
                                },
                                compId: 4
                            }, {
                                type: "Button",
                                props: {
                                    y: 0,
                                    x: 219,
                                    var: "restartbtn",
                                    stateNum: 1,
                                    skin: "game/currency/btn_yellow_bg.png"
                                },
                                compId: 5,
                                child: [{
                                    type: "Image",
                                    props: {
                                        y: 52,
                                        x: 155,
                                        var: "btnimg",
                                        skin: "game/gameover/onetime.png",
                                        anchorY: .5,
                                        anchorX: .5
                                    },
                                    compId: 19
                                }]
                            }, {
                                type: "Sprite",
                                props: {
                                    y: 0,
                                    x: 590,
                                    visible: false,
                                    var: "sharebtn",
                                    texture: "game/gameover/sharebtn.png"
                                },
                                compId: 6
                            }]
                        }],
                        loadList: ["game/currency/numtest.png", "game/gameover/errorlevel.png", "game/gameview/maxscorebg.png", "game/gameover/rightshow.png", "game/gameover/listbg.png", "game/gameover/homebtn.png", "game/currency/btn_yellow_bg.png", "game/gameover/onetime.png", "game/gameover/sharebtn.png"],
                        loadList3D: []
                    }, gameoverpageUI;
                }(Laya.Dialog);
                a.gameoverpageUI = i, n("ui.dialog.gameoverpageUI", i);
                var r = function (a) {
                    function garagepageUI() {
                        return a.call(this) || this;
                    }
                    return __extends(garagepageUI, a), garagepageUI.prototype.createChildren = function () {
                        a.prototype.createChildren.call(this), this.createView(garagepageUI.uiView);
                    }, garagepageUI.uiView = {
                        type: "Dialog",
                        props: {
                            width: 750,
                            height: 1334
                        },
                        compId: 2,
                        child: [{
                            type: "Box",
                            props: {
                                width: 750,
                                var: "contbox"
                            },
                            compId: 5,
                            child: [{
                                type: "Box",
                                props: {
                                    y: 23,
                                    x: 0,
                                    width: 750,
                                    var: "headbox"
                                },
                                compId: 18
                            }, {
                                type: "Image",
                                props: {
                                    y: 144.5,
                                    x: 45,
                                    skin: "game/currency/dialogbg1.png",
                                    sizeGrid: "20,20,20,20",
                                    height: 1050
                                },
                                compId: 3,
                                child: [{
                                    type: "Image",
                                    props: {
                                        y: 122,
                                        x: 30,
                                        width: 600,
                                        skin: "game/currency/ldialogbg.png",
                                        sizeGrid: "20,20,20,20",
                                        height: 830
                                    },
                                    compId: 4
                                }, {
                                    type: "Label",
                                    props: {
                                        y: 142,
                                        x: 165,
                                        text: "High score of upgraded car!",
                                        fontSize: 30,
                                        color: "#9fb3ee"
                                    },
                                    compId: 27
                                }, {
                                    type: "Sprite",
                                    props: {
                                        y: 38,
                                        x: 287,
                                        texture: "game/Garage/carkutxt.png"
                                    },
                                    compId: 8
                                }, {
                                    type: "Box",
                                    props: {
                                        y: 950,
                                        x: 0,
                                        width: 660,
                                        height: 100
                                    },
                                    compId: 20,
                                    child: [{
                                        type: "Label",
                                        props: {
                                            y: 35,
                                            x: 70,
                                            text: "All LV",
                                            fontSize: 30,
                                            color: "#fff"
                                        },
                                        compId: 21
                                    }, {
                                        type: "Label",
                                        props: {
                                            y: 34,
                                            x: 165,
                                            var: "alvtxt",
                                            text: "(Lv.10)",
                                            fontSize: 30,
                                            color: "#ffd200"
                                        },
                                        compId: 22
                                    }, {
                                        type: "Label",
                                        props: {
                                            y: 35,
                                            x: 400,
                                            text: "Gold",
                                            fontSize: 30,
                                            color: "#fff"
                                        },
                                        compId: 23
                                    }, {
                                        type: "Label",
                                        props: {
                                            y: 35,
                                            x: 463,
                                            var: "agtxt",
                                            text: "+5%",
                                            fontSize: 30,
                                            color: "#ffd200"
                                        },
                                        compId: 24
                                    }, {
                                        type: "Box",
                                        props: {
                                            y: -10,
                                            x: 50,
                                            width: 250,
                                            var: "effect1",
                                            height: 80
                                        },
                                        compId: 25
                                    }, {
                                        type: "Box",
                                        props: {
                                            y: -10,
                                            x: 389,
                                            width: 210,
                                            var: "effect2",
                                            height: 80
                                        },
                                        compId: 26
                                    }]
                                }]
                            }, {
                                type: "List",
                                props: {
                                    y: 325,
                                    x: 100,
                                    var: "carlist",
                                    height: 750
                                },
                                compId: 16
                            }, {
                                type: "Image",
                                props: {
                                    y: 120,
                                    x: 656,
                                    var: "closebtn",
                                    skin: "game/currency/close1.png"
                                },
                                compId: 12
                            }]
                        }, {
                            type: "Box",
                            props: {
                                y: 1180,
                                x: 0,
                                width: 750,
                                visible: !1,
                                var: "botbox",
                                height: 110
                            },
                            compId: 13,
                            child: [{
                                type: "Button",
                                props: {
                                    y: 3,
                                    x: 219,
                                    var: "uplevelbtn",
                                    stateNum: 1,
                                    skin: "game/currency/btn_yellow_bg.png"
                                },
                                compId: 14,
                                child: [{
                                    type: "Sprite",
                                    props: {
                                        y: 25,
                                        x: 47,
                                        texture: "game/currency/upcartxt.png"
                                    },
                                    compId: 15
                                }]
                            }]
                        }],
                        loadList: ["game/currency/dialogbg1.png", "game/currency/ldialogbg.png", "game/Garage/carkutxt.png", "game/currency/close1.png", "game/currency/btn_yellow_bg.png", "game/currency/upcartxt.png"],
                        loadList3D: []
                    }, garagepageUI;
                }(Laya.Dialog);
                a.garagepageUI = r, n("ui.dialog.garagepageUI", r);
                var o = function (a) {
                    function jiesuanpageUI() {
                        return a.call(this) || this;
                    }
                    return __extends(jiesuanpageUI, a), jiesuanpageUI.prototype.createChildren = function () {
                        a.prototype.createChildren.call(this), this.createView(jiesuanpageUI.uiView);
                    }, jiesuanpageUI.uiView = {
                        type: "Dialog",
                        props: {
                            width: 750,
                            height: 1334
                        },
                        compId: 2,
                        child: [{
                            type: "Box",
                            props: {
                                y: 0,
                                x: 0,
                                width: 750,
                                var: "topbox",
                                height: 1050
                            },
                            compId: 6,
                            child: [{
                                type: "Box",
                                props: {
                                    y: 23,
                                    x: 0,
                                    width: 750,
                                    var: "headbox"
                                },
                                compId: 17
                            }, {
                                type: "Image",
                                props: {
                                    y: 371,
                                    x: 375,
                                    var: "shineimg",
                                    skin: "game/currency/shineimg.png",
                                    anchorY: .5,
                                    anchorX: .5
                                },
                                compId: 8
                            }, {
                                type: "Sprite",
                                props: {
                                    y: 9,
                                    x: 0,
                                    texture: "game/award/currsuc.png"
                                },
                                compId: 7
                            }, {
                                type: "Image",
                                props: {
                                    y: 371,
                                    x: 375,
                                    skin: "game/currency/manygold.png",
                                    anchorY: .5,
                                    anchorX: .5
                                },
                                compId: 9
                            }, {
                                type: "Label",
                                props: {
                                    y: 538,
                                    x: 256,
                                    var: "gamegold",
                                    text: "Get Gold+100",
                                    fontSize: 38,
                                    color: "#fff"
                                },
                                compId: 10
                            }, {
                                type: "Label",
                                props: {
                                    y: 589,
                                    x: 228,
                                    var: "contingold",
                                    text: "+50连续通关加成",
                                    fontSize: 38,
                                    color: "#fdcf40"
                                },
                                compId: 11
                            }]
                        }, {
                            type: "Box",
                            props: {
                                y: 1114,
                                x: 0,
                                width: 750,
                                var: "botbox",
                                height: 220
                            },
                            compId: 3,
                            child: [{
                                type: "Button",
                                props: {
                                    y: -200,
                                    x: 218,
                                    var: "beibtn",
                                    stateNum: 1,
                                    skin: "game/currency/btn_blue_bg1.png",
                                    scaleY: 1.2,
                                    scaleX: 1.2
                                },
                                compId: 4,
                                child: [{
                                    type: "Image",
                                    props: {
                                        y: 45,
                                        x: 34,
                                        var: "iconimg",
                                        skin: "game/currency/shareblue.png",
                                        scaleY: .8,
                                        scaleX: .8,
                                        anchorY: .5,
                                        anchorX: .5
                                    },
                                    compId: 12
                                }, {
                                    type: "Sprite",
                                    props: {
                                        y: 22,
                                        x: 74,
                                        texture: "game/currency/goldicon.png",
                                        scaleY: .8,
                                        scaleX: .8
                                    },
                                    compId: 13
                                }, {
                                    type: "Sprite",
                                    props: {
                                        y: 0,
                                        x: 203,
                                        texture: "game/award/sanbeitxt.png",
                                        scaleY: .6,
                                        scaleX: .6
                                    },
                                    compId: 16
                                }, {
                                    type: "FontClip",
                                    props: {
                                        y: 25,
                                        x: 128,
                                        var: "goldtxt",
                                        value: "999",
                                        skin: "game/currency/numtest.png",
                                        sheet: "0123456789k.",
                                        scaleY: .5,
                                        scaleX: .5
                                    },
                                    compId: 15
                                }]
                            }, {
                                type: "Button",
                                props: {
                                    y: 0,
                                    x: 280,
                                    var: "jumpbtn",
                                    stateNum: 1,
                                    skin: "game/currency/jumptxt2.png"
                                },
                                compId: 5
                            }]
                        }, {
                            type: "Box",
                            props: {
                                y: 649,
                                x: 0,
                                width: 750,
                                var: "trybox",
                                height: 196
                            },
                            compId: 21
                        }],
                        loadList: ["game/currency/shineimg.png", "game/award/currsuc.png", "game/currency/manygold.png", "game/currency/btn_blue_bg1.png", "game/currency/shareblue.png", "game/currency/goldicon.png", "game/award/sanbeitxt.png", "game/currency/numtest.png", "game/currency/jumptxt2.png"],
                        loadList3D: []
                    }, jiesuanpageUI;
                }(Laya.Dialog);
                a.jiesuanpageUI = o, n("ui.dialog.jiesuanpageUI", o);
                var s = function (a) {
                    function pipeipageUI() {
                        return a.call(this) || this;
                    }
                    return __extends(pipeipageUI, a), pipeipageUI.prototype.createChildren = function () {
                        a.prototype.createChildren.call(this), this.createView(pipeipageUI.uiView);
                    }, pipeipageUI.uiView = {
                        type: "Dialog",
                        props: {
                            width: 750,
                            height: 1334
                        },
                        compId: 2,
                        child: [{
                            type: "Box",
                            props: {
                                y: 0,
                                x: 0,
                                width: 750,
                                var: "bgbox",
                                height: 1334
                            },
                            compId: 9,
                            child: [{
                                type: "Image",
                                props: {
                                    y: 329,
                                    x: 55,
                                    width: 640,
                                    skin: "game/pipei/contbg.png",
                                    sizeGrid: "20,20,20,20",
                                    height: 610
                                },
                                compId: 4
                            }, {
                                type: "Image",
                                props: {
                                    y: 230,
                                    x: 55,
                                    width: 640,
                                    skin: "game/pipei/titbg.png",
                                    sizeGrid: "20,20,20,20",
                                    height: 100
                                },
                                compId: 3
                            }, {
                                type: "Image",
                                props: {
                                    y: 370,
                                    x: 0,
                                    width: 1,
                                    var: "listpos",
                                    height: 1
                                },
                                compId: 11
                            }]
                        }, {
                            type: "Box",
                            props: {
                                y: 0,
                                x: 0,
                                width: 750,
                                var: "openview",
                                height: 1334
                            },
                            compId: 8
                        }, {
                            type: "Box",
                            props: {
                                width: 750,
                                var: "upbox",
                                height: 1334
                            },
                            compId: 10,
                            child: [{
                                type: "Sprite",
                                props: {
                                    y: 253,
                                    x: 88,
                                    visible: !1,
                                    var: "titimg",
                                    texture: "game/pipei/pipeitit.png"
                                },
                                compId: 6
                            }, {
                                type: "Label",
                                props: {
                                    y: 264,
                                    x: 476,
                                    var: "lesstime",
                                    fontSize: 40,
                                    color: "#3a4e84"
                                },
                                compId: 7
                            }]
                        }, {
                            type: "Box",
                            props: {
                                y: 1184,
                                x: 0,
                                width: 750,
                                var: "botbox",
                                height: 150
                            },
                            compId: 12,
                            child: [{
                                type: "Image",
                                props: {
                                    y: 52,
                                    x: 374,
                                    var: "sharebtn",
                                    skin: "game/pipei/friendbtn.png",
                                    anchorY: .5,
                                    anchorX: .5
                                },
                                compId: 5
                            }]
                        }],
                        loadList: ["game/pipei/contbg.png", "game/pipei/titbg.png", "game/pipei/pipeitit.png", "game/pipei/friendbtn.png"],
                        loadList3D: []
                    }, pipeipageUI;
                }(Laya.Dialog);
                a.pipeipageUI = s, n("ui.dialog.pipeipageUI", s);
                var h = function (a) {
                    function rankpageUI() {
                        return a.call(this) || this;
                    }
                    return __extends(rankpageUI, a), rankpageUI.prototype.createChildren = function () {
                        a.prototype.createChildren.call(this), this.createView(rankpageUI.uiView);
                    }, rankpageUI.uiView = {
                        type: "Dialog",
                        props: {
                            width: 750,
                            height: 1334
                        },
                        compId: 2,
                        child: [{
                            type: "Box",
                            props: {
                                width: 750,
                                var: "bgbox",
                                height: 1334
                            },
                            compId: 21,
                            child: [{
                                type: "Sprite",
                                props: {
                                    y: 176,
                                    x: 45,
                                    texture: "game/currency/dialogbg1.png"
                                },
                                compId: 8,
                                child: [{
                                    type: "Image",
                                    props: {
                                        y: 115,
                                        x: 15,
                                        width: 630,
                                        skin: "game/currency/ldialogbg.png",
                                        sizeGrid: "20,20,20,20",
                                        height: 830
                                    },
                                    compId: 10
                                }]
                            }, {
                                type: "Image",
                                props: {
                                    y: 1009,
                                    x: 60,
                                    width: 630,
                                    skin: "game/rank/rankmybg.png",
                                    sizeGrid: "30,10,30,10"
                                },
                                compId: 7
                            }, {
                                type: "Box",
                                props: {
                                    y: 310,
                                    x: 100,
                                    var: "listpos"
                                },
                                compId: 23
                            }, {
                                type: "Box",
                                props: {
                                    y: 1030,
                                    x: 100,
                                    var: "mypos"
                                },
                                compId: 24
                            }]
                        }, {
                            type: "Box",
                            props: {
                                y: 0,
                                x: 0,
                                width: 750,
                                var: "openview",
                                height: 1334
                            },
                            compId: 5
                        }, {
                            type: "Box",
                            props: {
                                width: 750,
                                var: "upbox",
                                height: 1334
                            },
                            compId: 22,
                            child: [{
                                type: "Sprite",
                                props: {
                                    y: 40,
                                    x: 30,
                                    var: "homebtn",
                                    texture: "game/currency/homebtn.png"
                                },
                                compId: 6
                            }, {
                                type: "Button",
                                props: {
                                    y: 1197,
                                    x: 219,
                                    var: "startbtn",
                                    stateNum: 1,
                                    skin: "game/currency/btn_yellow_bg.png"
                                },
                                compId: 11,
                                child: [{
                                    type: "Sprite",
                                    props: {
                                        y: 92,
                                        x: 192,
                                        // texture: "game/rank/startgametxt.png"
                                    },
                                    compId: 12
                                }]
                            }, {
                                type: "Box",
                                props: {
                                    y: 202,
                                    x: 0,
                                    width: 750,
                                    var: "btnbox",
                                    height: 70
                                },
                                compId: 13,
                                child: [{
                                    type: "Button",
                                    props: {
                                        y: 7,
                                        x: 87,
                                        var: "fribtn",
                                        stateNum: 1,
                                        skin: "game/rank/btn_yellow_bg.png"
                                    },
                                    compId: 15,
                                    child: [{
                                        type: "Image",
                                        props: {
                                            y: 31,
                                            x: 90,
                                            skin: "game/rank/friendtxt1.png",
                                            name: "btntxt",
                                            anchorY: .5,
                                            anchorX: .5
                                        },
                                        compId: 16
                                    }]
                                }, {
                                    type: "Button",
                                    props: {
                                        y: 7,
                                        x: 285,
                                        var: "todaybtn",
                                        stateNum: 1,
                                        skin: "game/rank/btn_blue_bg.png"
                                    },
                                    compId: 17,
                                    child: [{
                                        type: "Image",
                                        props: {
                                            y: 31,
                                            x: 90,
                                            skin: "game/rank/todaytxt1.png",
                                            name: "btntxt",
                                            anchorY: .5,
                                            anchorX: .5
                                        },
                                        compId: 18
                                    }]
                                }, {
                                    type: "Button",
                                    props: {
                                        y: 7,
                                        x: 482,
                                        var: "worldbtn",
                                        stateNum: 1,
                                        skin: "game/rank/btn_blue_bg.png"
                                    },
                                    compId: 19,
                                    child: [{
                                        type: "Image",
                                        props: {
                                            y: 31,
                                            x: 90,
                                            skin: "game/rank/worldtxt1.png",
                                            name: "btntxt",
                                            anchorY: .5,
                                            anchorX: .5
                                        },
                                        compId: 20
                                    }]
                                }]
                            }]
                        }, {
                            type: "List",
                            props: {
                                y: 310,
                                x: 100,
                                width: "100",
                                var: "ranklist",
                                height: "100"
                            },
                            compId: 25
                        }],
                        loadList: ["game/currency/dialogbg1.png", "game/currency/ldialogbg.png", "game/rank/rankmybg.png", "game/currency/homebtn.png", "game/currency/btn_yellow_bg.png", "game/rank/startgametxt.png", "game/rank/btn_yellow_bg.png", "game/rank/friendtxt1.png", "game/rank/btn_blue_bg.png", "game/rank/todaytxt1.png", "game/rank/worldtxt1.png"],
                        loadList3D: []
                    }, rankpageUI;
                }(Laya.Dialog);
                a.rankpageUI = h, n("ui.dialog.rankpageUI", h);
                var c = function (a) {
                    function shoucangpageUI() {
                        return a.call(this) || this;
                    }
                    return __extends(shoucangpageUI, a), shoucangpageUI.prototype.createChildren = function () {
                        a.prototype.createChildren.call(this), this.createView(shoucangpageUI.uiView);
                    }, shoucangpageUI.uiView = {
                        type: "Dialog",
                        props: {
                            width: 750,
                            height: 1334
                        },
                        compId: 2,
                        child: [{
                            type: "Sprite",
                            props: {
                                y: 189,
                                x: 55,
                                texture: "game/home/shoucang.png"
                            },
                            compId: 3
                        }, {
                            type: "Button",
                            props: {
                                y: 983,
                                x: 219,
                                var: "closebtn",
                                stateNum: 1,
                                skin: "game/currency/btn_yellow_bg.png"
                            },
                            compId: 4,
                            child: [{
                                type: "Sprite",
                                props: {
                                    y: 27,
                                    x: 56,
                                    texture: "game/home/closebtn.png"
                                },
                                compId: 5
                            }]
                        }],
                        loadList: ["game/home/shoucang.png", "game/currency/btn_yellow_bg.png", "game/home/closebtn.png"],
                        loadList3D: []
                    }, shoucangpageUI;
                }(Laya.Dialog);
                a.shoucangpageUI = c, n("ui.dialog.shoucangpageUI", c);
                var g = function (a) {
                    function taskawardpageUI() {
                        return a.call(this) || this;
                    }
                    return __extends(taskawardpageUI, a), taskawardpageUI.prototype.createChildren = function () {
                        a.prototype.createChildren.call(this), this.createView(taskawardpageUI.uiView);
                    }, taskawardpageUI.uiView = {
                        type: "Dialog",
                        props: {
                            width: 750,
                            height: 1334
                        },
                        compId: 2,
                        child: [{
                            type: "Box",
                            props: {
                                y: 100,
                                width: 750,
                                var: "contbox"
                            },
                            compId: 6,
                            child: [{
                                type: "Image",
                                props: {
                                    y: 100,
                                    x: 85,
                                    skin: "game/currency/dialogbg2.png"
                                },
                                compId: 7,
                                child: [{
                                    type: "Image",
                                    props: {
                                        y: 110,
                                        x: 25,
                                        width: 530,
                                        skin: "game/currency/ldialogbg.png",
                                        sizeGrid: "15,15,15,15",
                                        height: 460
                                    },
                                    compId: 8
                                }, {
                                    type: "Image",
                                    props: {
                                        y: 298,
                                        x: 278,
                                        var: "shineimg",
                                        skin: "game/currency/shineimg.png",
                                        scaleY: .7,
                                        scaleX: .7,
                                        anchorY: .5,
                                        anchorX: .5
                                    },
                                    compId: 9
                                }, {
                                    type: "Sprite",
                                    props: {
                                        y: 35,
                                        x: 190,
                                        texture: "game/lingqu/sanbeitxt1.png"
                                    },
                                    compId: 10
                                }, {
                                    type: "Label",
                                    props: {
                                        y: 506,
                                        x: 41,
                                        text: "观看短短的视频，就可以3倍领取哦！",
                                        fontSize: 30,
                                        color: "#9fb3ee"
                                    },
                                    compId: 11
                                }, {
                                    type: "Label",
                                    props: {
                                        y: 445,
                                        x: 196,
                                        text: "Get Gold+100",
                                        fontSize: 30,
                                        color: "#fff"
                                    },
                                    compId: 12
                                }, {
                                    type: "Image",
                                    props: {
                                        y: 298,
                                        x: 278,
                                        skin: "game/currency/manygold.png",
                                        anchorY: .5,
                                        anchorX: .5
                                    },
                                    compId: 13
                                }, {
                                    type: "Button",
                                    props: {
                                        y: 601,
                                        x: 134,
                                        stateNum: 1,
                                        skin: "game/currency/btn_yellow_bg.png"
                                    },
                                    compId: 14,
                                    child: [{
                                        type: "Sprite",
                                        props: {
                                            y: 27,
                                            x: 67,
                                            texture: "game/lingqu/sanbeitxt2.png"
                                        },
                                        compId: 15
                                    }]
                                }]
                            }, {
                                type: "Sprite",
                                props: {
                                    y: 910,
                                    x: 314,
                                    texture: "game/currency/jumptxt2.png"
                                },
                                compId: 17
                            }, {
                                type: "Sprite",
                                props: {
                                    y: 1e3,
                                    x: 345,
                                    texture: "game/currency/close2.png"
                                },
                                compId: 18
                            }]
                        }],
                        loadList: ["game/currency/dialogbg2.png", "game/currency/ldialogbg.png", "game/currency/shineimg.png", "game/lingqu/sanbeitxt1.png", "game/currency/manygold.png", "game/currency/btn_yellow_bg.png", "game/lingqu/sanbeitxt2.png", "game/currency/jumptxt2.png", "game/currency/close2.png"],
                        loadList3D: []
                    }, taskawardpageUI;
                }(Laya.Dialog);
                a.taskawardpageUI = g, n("ui.dialog.taskawardpageUI", g);
                var p = function (a) {
                    function taskpageUI() {
                        return a.call(this) || this;
                    }
                    return __extends(taskpageUI, a), taskpageUI.prototype.createChildren = function () {
                        a.prototype.createChildren.call(this), this.createView(taskpageUI.uiView);
                    }, taskpageUI.uiView = {
                        type: "Dialog",
                        props: {
                            width: 750,
                            height: 1334
                        },
                        compId: 2,
                        child: [{
                            type: "Box",
                            props: {
                                width: 750,
                                var: "contbox",
                                height: 1250
                            },
                            compId: 15,
                            child: [{
                                type: "Box",
                                props: {
                                    y: 23,
                                    x: 0,
                                    width: 750,
                                    var: "headbox"
                                },
                                compId: 16
                            }, {
                                type: "Image",
                                props: {
                                    y: 260,
                                    x: 45,
                                    skin: "game/currency/dialogbg1.png",
                                    sizeGrid: "30,300,400,300",
                                    height: 860
                                },
                                compId: 5,
                                child: [{
                                    type: "Image",
                                    props: {
                                        y: 32,
                                        x: 15,
                                        var: "taskbg",
                                        skin: "game/task/alertbg2.png"
                                    },
                                    compId: 6
                                }, {
                                    type: "Box",
                                    props: {
                                        y: 34,
                                        x: 27,
                                        width: 268,
                                        var: "achievebtn",
                                        height: 77
                                    },
                                    compId: 12,
                                    child: [{
                                        type: "Image",
                                        props: {
                                            y: 42,
                                            x: 77,
                                            skin: "game/task/chengjiutxt.png",
                                            anchorY: .5
                                        },
                                        compId: 7
                                    }]
                                }, {
                                    type: "Box",
                                    props: {
                                        y: 34,
                                        x: 360,
                                        width: 268,
                                        var: "todaybtn",
                                        height: 77
                                    },
                                    compId: 13,
                                    child: [{
                                        type: "Image",
                                        props: {
                                            y: 42,
                                            x: 37,
                                            skin: "game/task/tasktxt.png",
                                            anchorY: .5
                                        },
                                        compId: 8
                                    }]
                                }, {
                                    type: "Label",
                                    props: {
                                        y: 142,
                                        x: 0,
                                        width: 660,
                                        visible: !1,
                                        var: "todaytime",
                                        text: "刷新时间15小时23分12秒",
                                        fontSize: 30,
                                        color: "#9fb3ee",
                                        align: "center"
                                    },
                                    compId: 9
                                }, {
                                    type: "Sprite",
                                    props: {
                                        y: 903,
                                        x: 300,
                                        var: "closebtn",
                                        texture: "game/currency/close2.png"
                                    },
                                    compId: 10
                                }]
                            }, {
                                type: "List",
                                props: {
                                    y: 438,
                                    x: 75,
                                    width: 600,
                                    var: "tasklist",
                                    height: 615
                                },
                                compId: 11
                            }]
                        }],
                        loadList: ["game/currency/dialogbg1.png", "game/task/alertbg2.png", "game/task/chengjiutxt.png", "game/task/tasktxt.png", "game/currency/close2.png"],
                        loadList3D: []
                    }, taskpageUI;
                }(Laya.Dialog);
                a.taskpageUI = p, n("ui.dialog.taskpageUI", p);
                var d = function (a) {
                    function trygamepageUI() {
                        return a.call(this) || this;
                    }
                    return __extends(trygamepageUI, a), trygamepageUI.prototype.createChildren = function () {
                        a.prototype.createChildren.call(this), this.createView(trygamepageUI.uiView);
                    }, trygamepageUI.uiView = {
                        type: "Dialog",
                        props: {
                            width: 750,
                            height: 1334
                        },
                        compId: 2,
                        child: [{
                            type: "Box",
                            props: {
                                y: 0,
                                x: 0,
                                width: 750,
                                var: "contbox",
                                height: 1334
                            },
                            compId: 8,
                            child: [{
                                type: "List",
                                props: {
                                    y: 50,
                                    x: 375,
                                    var: "trylist"
                                },
                                compId: 3
                            }, {
                                type: "Button",
                                props: {
                                    y: 1202,
                                    x: 375,
                                    var: "startbtn",
                                    stateNum: 1,
                                    skin: "game/currency/btn_yellow_bg.png",
                                    bottom: 80,
                                    anchorY: .5,
                                    anchorX: .5
                                },
                                compId: 4,
                                child: [{
                                    type: "Sprite",
                                    props: {
                                        y: 27,
                                        x: 192,
                                        // texture: "game/rank/startgametxt.png"
                                    },
                                    compId: 5
                                }]
                            }, {
                                type: "Box",
                                props: {
                                    y: 100,
                                    x: 100,
                                    width: 150,
                                    var: "homebtn",
                                    height: 150,
                                    anchorY: .5,
                                    anchorX: .5
                                },
                                compId: 6,
                                child: [{
                                    type: "Sprite",
                                    props: {
                                        y: 43,
                                        x: 45,
                                        texture: "game/currency/homebtn.png"
                                    },
                                    compId: 7
                                }]
                            }]
                        }],
                        loadList: ["game/currency/btn_yellow_bg.png", "game/rank/startgametxt.png", "game/currency/homebtn.png"],
                        loadList3D: []
                    }, trygamepageUI;
                }(Laya.Dialog);
                a.trygamepageUI = d, n("ui.dialog.trygamepageUI", d);
                var l = function (a) {
                    function upcarpageUI() {
                        return a.call(this) || this;
                    }
                    return __extends(upcarpageUI, a), upcarpageUI.prototype.createChildren = function () {
                        a.prototype.createChildren.call(this), this.createView(upcarpageUI.uiView);
                    }, upcarpageUI.uiView = {
                        type: "Dialog",
                        props: {
                            width: 750,
                            height: 1334
                        },
                        compId: 2,
                        child: [{
                            type: "Box",
                            props: {
                                y: 200,
                                x: 0,
                                width: 750,
                                var: "contbox"
                            },
                            compId: 3,
                            child: [{
                                type: "Sprite",
                                props: {
                                    y: 100,
                                    x: 85,
                                    texture: "game/currency/dialogbg2.png"
                                },
                                compId: 4,
                                child: [{
                                    type: "Image",
                                    props: {
                                        y: 100,
                                        x: 25,
                                        width: 530,
                                        skin: "game/currency/ldialogbg.png",
                                        sizeGrid: "15,15,15,15",
                                        height: 460
                                    },
                                    compId: 5
                                }, {
                                    type: "Image",
                                    props: {
                                        y: 322,
                                        x: 278,
                                        var: "shineimg",
                                        skin: "game/currency/shineimg.png",
                                        scaleY: .7,
                                        scaleX: .7,
                                        anchorY: .5,
                                        anchorX: .5
                                    },
                                    compId: 9
                                }, {
                                    type: "Sprite",
                                    props: {
                                        y: 30,
                                        x: 187,
                                        texture: "game/upcar/uptxt.png"
                                    },
                                    compId: 6
                                }, {
                                    type: "Label",
                                    props: {
                                        y: 128,
                                        x: 140,
                                        text: "High score of upgraded car",
                                        fontSize: 30,
                                        color: "#9fb3ee"
                                    },
                                    compId: 7
                                }, {
                                    type: "Label",
                                    props: {
                                        y: 699,
                                        x: 104,
                                        text: "下次免费：19小时23分20秒",
                                        fontSize: 30,
                                        color: "#3f3c63"
                                    },
                                    compId: 8
                                }, {
                                    type: "Image",
                                    props: {
                                        y: 322,
                                        x: 278,
                                        anchorY: .5,
                                        anchorX: .5
                                    },
                                    compId: 10
                                }, {
                                    type: "Button",
                                    props: {
                                        y: 581,
                                        x: 134,
                                        var: "upbtn",
                                        stateNum: 1,
                                        skin: "game/currency/btn_yellow_bg.png"
                                    },
                                    compId: 11,
                                    child: [{
                                        type: "Sprite",
                                        props: {
                                            y: 22,
                                            x: 17,
                                            texture: "game/upcar/免费领取.png"
                                        },
                                        compId: 12
                                    }]
                                }]
                            }, {
                                type: "Image",
                                props: {
                                    y: 69.5,
                                    x: 627,
                                    var: "closebtn",
                                    skin: "game/currency/close1.png"
                                },
                                compId: 13
                            }]
                        }],
                        loadList: ["game/currency/dialogbg2.png", "game/currency/ldialogbg.png", "game/currency/shineimg.png", "game/upcar/uptxt.png", "game/currency/btn_yellow_bg.png", "game/upcar/免费领取.png", "game/currency/close1.png"],
                        loadList3D: []
                    }, upcarpageUI;
                }(Laya.Dialog);
                a.upcarpageUI = l, n("ui.dialog.upcarpageUI", l);
            }(a.dialog || (a.dialog = {}));
        }(t.ui || (t.ui = {})),
            function (a) {
                ! function (a) {
                    var e = function (a) {
                        function caritem1UI() {
                            return a.call(this) || this;
                        }
                        return __extends(caritem1UI, a), caritem1UI.prototype.createChildren = function () {
                            a.prototype.createChildren.call(this), this.createView(caritem1UI.uiView);
                        }, caritem1UI.uiView = {
                            type: "Scene",
                            props: {
                                width: 260,
                                height: 240
                            },
                            compId: 2,
                            child: [{
                                type: "Image",
                                props: {
                                    y: 0,
                                    x: 0,
                                    width: 260,
                                    skin: "game/Garage/cardbg.png",
                                    sizeGrid: "20,20,20,20",
                                    height: 240
                                },
                                compId: 3,
                                child: [{
                                    type: "Image",
                                    props: {
                                        y: 120,
                                        x: 130,
                                        var: "shineimg",
                                        skin: "game/currency/shineimg.png",
                                        scaleY: .4,
                                        scaleX: .4,
                                        anchorY: .5,
                                        anchorX: .5
                                    },
                                    compId: 10
                                }, {
                                    type: "Image",
                                    props: {
                                        y: 21,
                                        x: 23,
                                        width: 38,
                                        var: "lvbg",
                                        skin: "game/Garage/levelbg.png",
                                        sizeGrid: "10,10,10,10",
                                        height: 36
                                    },
                                    compId: 4,
                                    child: [{
                                        type: "Label",
                                        props: {
                                            x: 8,
                                            width: 38,
                                            var: "lvtxt",
                                            valign: "middle",
                                            text: "lv1",
                                            height: 36,
                                            fontSize: 20,
                                            color: "#fff",
                                            align: "left"
                                        },
                                        compId: 6
                                    }]
                                }, {
                                    type: "Image",
                                    props: {
                                        y: 18,
                                        x: 200,
                                        var: "upinfo",
                                        skin: "game/upcar/upimg.png"
                                    },
                                    compId: 8
                                }, {
                                    type: "Label",
                                    props: {
                                        y: 23,
                                        x: 0,
                                        width: 260,
                                        var: "carname",
                                        valign: "middle",
                                        text: "汽车",
                                        fontSize: 30,
                                        color: "#115f83",
                                        align: "center"
                                    },
                                    compId: 9
                                }, {
                                    type: "Image",
                                    props: {
                                        y: 120,
                                        x: 130,
                                        width: 140,
                                        var: "carimg",
                                        height: 140,
                                        anchorY: .5,
                                        anchorX: .5
                                    },
                                    compId: 11
                                }, {
                                    type: "Button",
                                    props: {
                                        y: 174,
                                        x: 130,
                                        var: "upbtn",
                                        stateNum: 1,
                                        skin: "game/upcar/upbtn.png",
                                        labelSize: 40,
                                        anchorX: .5
                                    },
                                    compId: 13,
                                    child: [{
                                        type: "Sprite",
                                        props: {
                                            y: 9,
                                            x: 10,
                                            texture: "game/currency/goldicon.png",
                                            scaleY: .6,
                                            scaleX: .6
                                        },
                                        compId: 14
                                    }, {
                                        type: "Label",
                                        props: {
                                            y: 12,
                                            x: 45,
                                            var: "costtxt",
                                            text: "1500",
                                            fontSize: 24,
                                            color: "#fff"
                                        },
                                        compId: 15
                                    }]
                                }]
                            }],
                            loadList: ["game/Garage/cardbg.png", "game/currency/shineimg.png", "game/Garage/levelbg.png", "game/upcar/upimg.png", "game/upcar/upbtn.png", "game/currency/goldicon.png"],
                            loadList3D: []
                        }, caritem1UI;
                    }(Laya.Scene);
                    a.caritem1UI = e, n("ui.perfab.caritem1UI", e);
                    var t = function (a) {
                        function chartUI() {
                            return a.call(this) || this;
                        }
                        return __extends(chartUI, a), chartUI.prototype.createChildren = function () {
                            a.prototype.createChildren.call(this), this.createView(chartUI.uiView);
                        }, chartUI.uiView = {
                            type: "Scene",
                            props: {
                                width: 200,
                                height: 200
                            },
                            compId: 2,
                            child: [{
                                type: "Image",
                                props: {
                                    y: 180,
                                    x: 180,
                                    width: 200,
                                    var: "alertbox",
                                    skin: "game/expression/Sth.png",
                                    sizeGrid: "10,10,10,10",
                                    height: 200,
                                    anchorY: .9,
                                    anchorX: .9
                                },
                                compId: 3,
                                child: [{
                                    type: "Image",
                                    props: {
                                        y: 25,
                                        x: 25,
                                        width: 150,
                                        var: "iconimg",
                                        skin: "game/expression/005-lol.png",
                                        height: 150
                                    },
                                    compId: 5
                                }]
                            }],
                            loadList: ["game/expression/Sth.png", "game/expression/005-lol.png"],
                            loadList3D: []
                        }, chartUI;
                    }(Laya.Scene);
                    a.chartUI = t, n("ui.perfab.chartUI", t);
                    var i = function (a) {
                        function gameBannerUI() {
                            return a.call(this) || this;
                        }
                        return __extends(gameBannerUI, a), gameBannerUI.prototype.createChildren = function () {
                            a.prototype.createChildren.call(this), this.createView(gameBannerUI.uiView);
                        }, gameBannerUI.uiView = {
                            type: "Scene",
                            props: {
                                width: 750,
                                height: 260
                            },
                            compId: 2,
                            child: [{
                                type: "Image",
                                props: {
                                    y: 0,
                                    x: 0,
                                    width: 750,
                                    var: "bannerimg",
                                    height: 260
                                },
                                compId: 3
                            }],
                            loadList: [],
                            loadList3D: []
                        }, gameBannerUI;
                    }(Laya.Scene);
                    a.gameBannerUI = i, n("ui.perfab.gameBannerUI", i);
                    var r = function (a) {
                        function goldboxUI() {
                            return a.call(this) || this;
                        }
                        return __extends(goldboxUI, a), goldboxUI.prototype.createChildren = function () {
                            a.prototype.createChildren.call(this), this.createView(goldboxUI.uiView);
                        }, goldboxUI.uiView = {
                            type: "Scene",
                            props: {
                                width: 750,
                                height: 60
                            },
                            compId: 2,
                            child: [{
                                type: "Sprite",
                                props: {
                                    y: 4,
                                    x: 235,
                                    var: "mappbtn",
                                    texture: "game/currency/addmyappbtn.png"
                                },
                                compId: 10
                            }, {
                                type: "Image",
                                props: {
                                    y: 7,
                                    x: 35,
                                    width: 190,
                                    var: "goldbg",
                                    skin: "game/currency/goldtxtbg.png",
                                    sizeGrid: "20,56,20,56",
                                    height: 46
                                },
                                compId: 3,
                                child: [{
                                    type: "Label",
                                    props: {
                                        x: 58,
                                        var: "goldtxt",
                                        valign: "middle",
                                        text: "123.2k",
                                        height: 40,
                                        fontSize: 35,
                                        color: "#fff",
                                        align: "left"
                                    },
                                    compId: 9
                                }]
                            }, {
                                type: "Image",
                                props: {
                                    y: 4,
                                    x: 29,
                                    var: "star",
                                    skin: "game/currency/goldicon.png"
                                },
                                compId: 5
                            }],
                            loadList: ["game/currency/addmyappbtn.png", "game/currency/goldtxtbg.png", "game/currency/goldicon.png"],
                            loadList3D: []
                        }, goldboxUI;
                    }(Laya.Scene);
                    a.goldboxUI = r, n("ui.perfab.goldboxUI", r);
                    var o = function (a) {
                        function opencontextUI() {
                            return a.call(this) || this;
                        }
                        return __extends(opencontextUI, a), opencontextUI.prototype.createChildren = function () {
                            a.prototype.createChildren.call(this), this.createView(opencontextUI.uiView);
                        }, opencontextUI.uiView = {
                            type: "Scene",
                            props: {
                                width: 750,
                                height: 1334
                            },
                            compId: 2,
                            child: [{
                                type: "WXOpenDataViewer",
                                props: {
                                    y: 0,
                                    x: 0,
                                    width: 750,
                                    iconSign: "wx",
                                    height: 1334,
                                    runtime: "laya.ui.WXOpenDataViewer"
                                },
                                compId: 3
                            }],
                            loadList: [],
                            loadList3D: []
                        }, opencontextUI;
                    }(Laya.Scene);
                    a.opencontextUI = o, n("ui.perfab.opencontextUI", o);
                    var s = function (a) {
                        function rankitemUI() {
                            return a.call(this) || this;
                        }
                        return __extends(rankitemUI, a), rankitemUI.prototype.createChildren = function () {
                            a.prototype.createChildren.call(this), this.createView(rankitemUI.uiView);
                        }, rankitemUI.uiView = {
                            type: "Scene",
                            props: {
                                width: 600,
                                height: 85
                            },
                            compId: 2,
                            child: [{
                                type: "Image",
                                props: {
                                    y: 42,
                                    x: 300,
                                    width: 600,
                                    var: "bg1",
                                    sizeGrid: "20,20,20,20",
                                    height: 85,
                                    anchorY: .5,
                                    anchorX: .5
                                },
                                compId: 3
                            }, {
                                type: "Image",
                                props: {
                                    y: 42,
                                    x: 43,
                                    var: "idximg",
                                    anchorY: .5,
                                    anchorX: .5
                                },
                                compId: 4
                            }, {
                                type: "Label",
                                props: {
                                    y: 42,
                                    x: 43,
                                    var: "idxlab",
                                    valign: "middle",
                                    text: "1",
                                    fontSize: 34,
                                    color: "#01568a",
                                    anchorY: .5,
                                    anchorX: .5,
                                    align: "left"
                                },
                                compId: 5
                            }, {
                                type: "Image",
                                props: {
                                    y: 11,
                                    x: 80,
                                    width: 62,
                                    var: "icon",
                                    height: 62
                                },
                                compId: 6
                            }, {
                                type: "Label",
                                props: {
                                    y: 27,
                                    x: 164,
                                    var: "nickname",
                                    text: "小明",
                                    fontSize: 30,
                                    color: "#01568a"
                                },
                                compId: 7
                            }, {
                                type: "Label",
                                props: {
                                    y: 25,
                                    x: 568,
                                    var: "score",
                                    text: "14",
                                    fontSize: 34,
                                    color: "#01568a",
                                    anchorX: 1,
                                    align: "right"
                                },
                                compId: 8
                            }],
                            loadList: [],
                            loadList3D: []
                        }, rankitemUI;
                    }(Laya.Scene);
                    a.rankitemUI = s, n("ui.perfab.rankitemUI", s);
                    var h = function (a) {
                        function taskitemUI() {
                            return a.call(this) || this;
                        }
                        return __extends(taskitemUI, a), taskitemUI.prototype.createChildren = function () {
                            a.prototype.createChildren.call(this), this.createView(taskitemUI.uiView);
                        }, taskitemUI.uiView = {
                            type: "Scene",
                            props: {
                                width: 600,
                                height: 132
                            },
                            compId: 2,
                            child: [{
                                type: "Image",
                                props: {
                                    y: 0,
                                    x: 0,
                                    width: 600,
                                    skin: "game/task/rankbg.png",
                                    sizeGrid: "15,15,15,15",
                                    height: 132
                                },
                                compId: 3,
                                child: [{
                                    type: "Image",
                                    props: {
                                        y: 19,
                                        x: 19,
                                        var: "taskicon",
                                        skin: "game/task/taskwudi.png"
                                    },
                                    compId: 5
                                }, {
                                    type: "Label",
                                    props: {
                                        y: 19,
                                        x: 131,
                                        var: "taskname",
                                        text: "收藏小游戏",
                                        fontSize: 30,
                                        color: "#01568a"
                                    },
                                    compId: 6
                                }, {
                                    type: "Label",
                                    props: {
                                        y: 81,
                                        x: 135,
                                        text: "进度：",
                                        fontSize: 28,
                                        color: "#6178bb"
                                    },
                                    compId: 7
                                }, {
                                    type: "Image",
                                    props: {
                                        y: 78,
                                        x: 207,
                                        width: 144,
                                        var: "probg",
                                        skin: "game/task/process2.png",
                                        height: 34
                                    },
                                    compId: 9,
                                    child: [{
                                        type: "Image",
                                        props: {
                                            y: 2,
                                            x: 2,
                                            width: 1,
                                            var: "protip",
                                            skin: "game/task/process2$bar.png",
                                            sizeGrid: "15,15,15,15"
                                        },
                                        compId: 10
                                    }, {
                                        type: "Label",
                                        props: {
                                            width: 144,
                                            var: "protxt",
                                            valign: "middle",
                                            text: "2/5",
                                            strokeColor: "#2b3b69",
                                            stroke: 2,
                                            height: 34,
                                            fontSize: 22,
                                            color: "#ffffff",
                                            align: "center"
                                        },
                                        compId: 11
                                    }]
                                }, {
                                    type: "Button",
                                    props: {
                                        y: 58,
                                        x: 410,
                                        var: "taskbtn",
                                        stateNum: 1,
                                        skin: "game/task/btn_yellow_bg.png"
                                    },
                                    compId: 12,
                                    child: [{
                                        type: "Image",
                                        props: {
                                            y: 26,
                                            x: 73,
                                            var: "btnimg",
                                            skin: "game/task/yilingqu.png",
                                            anchorY: .5,
                                            anchorX: .5
                                        },
                                        compId: 13
                                    }]
                                }, {
                                    type: "Sprite",
                                    props: {
                                        y: 16,
                                        x: 436.5,
                                        texture: "game/currency/goldicon.png",
                                        scaleY: .6,
                                        scaleX: .6
                                    },
                                    compId: 14
                                }, {
                                    type: "Label",
                                    props: {
                                        y: 19,
                                        x: 482,
                                        var: "goldtxt",
                                        valign: "middle",
                                        text: "50",
                                        fontSize: 25,
                                        color: "#ffdb46",
                                        align: "left"
                                    },
                                    compId: 15
                                }]
                            }],
                            loadList: ["game/task/rankbg.png", "game/task/taskwudi.png", "game/task/process2.png", "game/task/process2$bar.png", "game/task/btn_yellow_bg.png", "game/task/yilingqu.png", "game/currency/goldicon.png"],
                            loadList3D: []
                        }, taskitemUI;
                    }(Laya.Scene);
                    a.taskitemUI = h, n("ui.perfab.taskitemUI", h);
                    var c = function (a) {
                        function tryitem1UI() {
                            return a.call(this) || this;
                        }
                        return __extends(tryitem1UI, a), tryitem1UI.prototype.createChildren = function () {
                            a.prototype.createChildren.call(this), this.createView(tryitem1UI.uiView);
                        }, tryitem1UI.uiView = {
                            type: "Scene",
                            props: {
                                width: 188,
                                height: 247
                            },
                            compId: 2,
                            child: [{
                                type: "Image",
                                props: {
                                    y: 123,
                                    x: 94,
                                    width: 188,
                                    var: "icon",
                                    height: 247,
                                    anchorY: .5,
                                    anchorX: .5
                                },
                                compId: 3
                            }],
                            loadList: [],
                            loadList3D: []
                        }, tryitem1UI;
                    }(Laya.Scene);
                    a.tryitem1UI = c, n("ui.perfab.tryitem1UI", c);
                    var g = function (a) {
                        function tryitem2UI() {
                            return a.call(this) || this;
                        }
                        return __extends(tryitem2UI, a), tryitem2UI.prototype.createChildren = function () {
                            a.prototype.createChildren.call(this), this.createView(tryitem2UI.uiView);
                        }, tryitem2UI.uiView = {
                            type: "Scene",
                            props: {
                                width: 144,
                                height: 144
                            },
                            compId: 2,
                            child: [{
                                type: "Image",
                                props: {
                                    y: 0,
                                    x: 0,
                                    width: 144,
                                    var: "appimg",
                                    skin: "game/fuhuo/tryappimg.png",
                                    height: 144
                                },
                                compId: 3
                            }],
                            loadList: ["game/fuhuo/tryappimg.png"],
                            loadList3D: []
                        }, tryitem2UI;
                    }(Laya.Scene);
                    a.tryitem2UI = g, n("ui.perfab.tryitem2UI", g);
                    var p = function (a) {
                        function tryitem3UI() {
                            return a.call(this) || this;
                        }
                        return __extends(tryitem3UI, a), tryitem3UI.prototype.createChildren = function () {
                            a.prototype.createChildren.call(this), this.createView(tryitem3UI.uiView);
                        }, tryitem3UI.uiView = {
                            type: "Scene",
                            props: {
                                width: 330,
                                height: 216
                            },
                            compId: 2,
                            child: [{
                                type: "Image",
                                props: {
                                    y: 108,
                                    x: 165,
                                    width: 330,
                                    var: "appimg",
                                    height: 216,
                                    anchorY: .5,
                                    anchorX: .5
                                },
                                compId: 3
                            }],
                            loadList: [],
                            loadList3D: []
                        }, tryitem3UI;
                    }(Laya.Scene);
                    a.tryitem3UI = p, n("ui.perfab.tryitem3UI", p);
                    var d = function (a) {
                        function trypanelUI() {
                            return a.call(this) || this;
                        }
                        return __extends(trypanelUI, a), trypanelUI.prototype.createChildren = function () {
                            a.prototype.createChildren.call(this), this.createView(trypanelUI.uiView);
                        }, trypanelUI.uiView = {
                            type: "Scene",
                            props: {
                                width: 750,
                                height: 198
                            },
                            compId: 2,
                            child: [{
                                type: "Image",
                                props: {
                                    y: 0,
                                    x: 0,
                                    width: 750,
                                    skin: "game/fuhuo/tryappbg.png",
                                    height: 198
                                },
                                compId: 3
                            }, {
                                type: "List",
                                props: {
                                    y: 27,
                                    x: 100,
                                    width: 600,
                                    var: "trylist",
                                    height: 144
                                },
                                compId: 4
                            }],
                            loadList: ["game/fuhuo/tryappbg.png"],
                            loadList3D: []
                        }, trypanelUI;
                    }(Laya.Scene);
                    a.trypanelUI = d, n("ui.perfab.trypanelUI", d);
                }(a.perfab || (a.perfab = {}));
            }(t.ui || (t.ui = {})),
            function (a) {
                ! function (a) {
                    var e = function (a) {
                        function homepageUI() {
                            return a.call(this) || this;
                        }
                        return __extends(homepageUI, a), homepageUI.prototype.createChildren = function () {
                            a.prototype.createChildren.call(this), this.loadScene("scene/homepage");
                        }, homepageUI;
                    }(Laya.Scene);
                    a.homepageUI = e, n("ui.scene.homepageUI", e);
                    var t = function (a) {
                        function loadpageUI() {
                            return a.call(this) || this;
                        }
                        return __extends(loadpageUI, a), loadpageUI.prototype.createChildren = function () {
                            a.prototype.createChildren.call(this), this.loadScene("scene/loadpage");
                        }, loadpageUI;
                    }(Laya.Scene);
                    a.loadpageUI = t, n("ui.scene.loadpageUI", t);
                }(a.scene || (a.scene = {}));
            }(t.ui || (t.ui = {})),
            function (a) {
                ! function (a) {
                    var e = function (a) {
                        function gamepageUI() {
                            return a.call(this) || this;
                        }
                        return __extends(gamepageUI, a), gamepageUI.prototype.createChildren = function () {
                            a.prototype.createChildren.call(this), this.loadScene("view/gamepage");
                        }, gamepageUI;
                    }(Laya.View);
                    a.gamepageUI = e, n("ui.view.gamepageUI", e);
                }(a.view || (a.view = {}));
            }(t.ui || (t.ui = {}));
    }, {}],
    59: [function (a, e, t) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var n = a("./manager/adManager"),
            i = a("./configData"),
            r = a("./manager/eventManager"),
            o = a("./data/gameEnum"),
            s = function () {
                function utils() { }
                return utils.initConfig = function () {
                    r.eventManager.instance.onEvent(o.GameEvent.repushUpani, this, this.repushUpani);
                }, utils.checkVecIntersect = function (a) {
                    var e, t, n = a[0],
                        i = a[1],
                        r = a[2],
                        o = a[3],
                        s = n.x,
                        h = n.z,
                        c = i.x,
                        g = i.z,
                        p = r.x,
                        d = r.z,
                        l = c - s,
                        m = g - h,
                        u = o.x - p,
                        f = o.z - d;
                    return t = (u * (h - d) - f * (s - p)) / (-u * m + l * f), (e = (-m * (s - p) + l * (h - d)) / (-u * m + l * f)) >= 0 && e <= 1 && t >= 0 && t <= 1;
                }, utils.flyGoldFunc = function (a, e) {
                    var t = new Laya.Point(Laya.stage.width / 2, Laya.stage.height / 2),
                        n = i.configData.topoint;
                    utils.flyGoldAni(t, n, a, e);
                }, utils.flyGoldAni = function (a, e, t, n) {
                    for (var i, r, o, s, h, c, g, p, d = t.parent || Laya.stage, l = function () {
                        m.imgarr.length < 1 && (i = new Laya.Image("game/currency/goldicon.png"), m.imgarr.push(i));
                        var t = m.imgarr.shift();
                        d.addChild(t), t.x = a.x, t.y = a.y, t.name = "" + u, r = 150 + 10 * [-1, 1][Math.round(Math.random())],
                            o = a.x + Math.cos(Math.PI / 5 * u) * r, s = a.y + Math.sin(Math.PI / 5 * u) * r,
                            4, h = Math.sqrt((a.x - o) * (a.x - o) + (a.y - s) * (a.y - s)), c = Math.floor(h / 4) / .5,
                            Laya.Tween.to(t, {
                                x: o,
                                y: s
                            }, c, Laya.Ease.sineIn), g = Math.sqrt((e.x - o) * (e.x - o) + (e.y - s) * (e.y - s)),
                            p = 1.5 * Math.floor(g / 4), Laya.Tween.to(t, {
                                x: e.x,
                                y: e.y
                            }, p, Laya.Ease.sineIn, Laya.Handler.create(m, function () {
                                "9" == t.name && (n && n(), n = null), Laya.Tween.clearAll(t), t.removeSelf(), this.imgarr.push(t);
                            }), c + 100);
                    }, m = this, u = 0; u < 10; u++) l();
                }, utils.sortFun = function (a, e, t) {
                    var n;
                    return void 0 === t && (t = "up"), a.sort((n = e, function (a, e) {
                        var i = a[n],
                            r = e[n];
                        return "up" == t ? i - r : r - i;
                    })), a;
                }, utils.delayShowAd = function (a, e, t) {
                    // var r = n.adManager.checkAbanner(a);
                    // if (r) {
                    //     var o = e.height, s = r[0].style, h = (s.top, s.realHeight, i.configData.systemInfo.screenHeight, 
                    //     (t.height - Laya.stage.height) / 2);
                    //     e.y = h + Laya.stage.height - o - 50;
                    //     var c = n.adManager.getDelayTime(a);
                    //     "gamebanner" == r[1] && (c = 0), c > 0 ? Laya.timer.once(c, null, this.tweenShowAd, [ a, e, t ]) : this.afterShowAd(a, e, t);
                    // }
                }, utils.tweenShowAd = function (a, e, t) {
                    // var r = n.adManager.checkAbanner(a);
                    // if (r) {
                    //     var o = e.height, s = r[0].style, h = s.top + s.realHeight / 2, c = i.configData.systemInfo.screenHeight, g = (t.height - Laya.stage.height) / 2 + Laya.stage.height * (h - s.realHeight / 2) / c - o;
                    //     isNaN(g) && (g = Laya.stage.height - o - 250), i.configData.isLongScreen && (g -= 100), 
                    //     Laya.Tween.to(e, {
                    //         y: g
                    //     }, 300, null, null, 900, !1, !1), n.adManager.changeShowBanner("show", t.parent, a);
                    // }
                }, utils.afterShowAd = function (a, e, t) {
                    // var r = n.adManager.checkAbanner(a);
                    // if (r) {
                    //     var o = e.height, s = r[0].style, h = s.top + s.realHeight / 2, c = i.configData.systemInfo.screenHeight, g = (t.height - Laya.stage.height) / 2 + Laya.stage.height * (h - s.realHeight / 2) / c - o;
                    //     isNaN(g) && (g = Laya.stage.height - o - 250), i.configData.isLongScreen && (g -= 100), 
                    //     e.y = g, n.adManager.changeShowBanner("show", t.parent, a);
                    // }
                }, utils.changeAdShow = function (a, e) {
                    // var t = null;
                    // e && (t = e.parent);
                    // var i = a ? "show" : "hide";
                    // n.adManager.changeShowBanner(i, t, "default");
                }, utils.changeGoldTostr = function (a) {
                    return a > 1e3 ? (a / 1e3).toFixed(1) + "k" : a + "";
                }, utils.goldShow = function (a, e, t) {
                    var n = this.changeGoldTostr(a);
                    if (e.text = n, t) {
                        var i = n.length;
                        t.width = 160 + 10 * (i - 2);
                    }
                }, utils.getRemainTime = function (a) {
                    var e = Date.now(),
                        t = Math.floor((a - e) / 1e3),
                        n = Math.floor(t / 60 / 60);
                    return [n, Math.floor(t / 60 - 60 * n), t % 60 % 60];
                }, utils.repushUpani = function () {
                    Laya.timer.clearAll(this);
                }, utils.addUpani = function (a, e, t) {
                    void 0 === e && (e = 1), void 0 === t && (t = 1);
                    var n = new Laya.Animation();
                    n.loadAnimation("ani/upani.ani"), a.addChild(n), n.name = "upani", n.scale(e, t),
                        1 == t ? (n.x = 130, n.y = 120) : (n.x = a.width / 2, n.y = a.height / 2), n.play(0, !1),
                        Laya.timer.once(2e3, this, function () {
                            n.destroy();
                        });
                }, utils.cutnameshow = function (a) {
                    var e = a.slice(0, 4);
                    return a.length > 4 && (e += ".."), e;
                }, utils.imgarr = [], utils.upaniArr = [], utils;
            }();
        t.utils = s;
    }, {
        "./configData": 3,
        "./data/gameEnum": 5,
        "./manager/adManager": 19,
        "./manager/eventManager": 21
    }]
}, {}, [2]);