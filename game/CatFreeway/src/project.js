window.__require = function e(t, a, i) {
    function r(o, s) {
        if (!a[o]) {
            if (!t[o]) {
                var c = o.split("/");
                if (c = c[c.length - 1],
                !t[c]) {
                    var h = "function" == typeof __require && __require;
                    if (!s && h)
                        return h(c, !0);
                    if (n)
                        return n(c, !0);
                    throw new Error("Cannot find module '" + o + "'")
                }
            }
            var l = a[o] = {
                exports: {}
            };
            t[o][0].call(l.exports, function(e) {
                return r(t[o][1][e] || e)
            }, l, l.exports, e, t, a, i)
        }
        return a[o].exports
    }
    for (var n = "function" == typeof __require && __require, o = 0; o < i.length; o++)
        r(i[o]);
    return r
}({
    AniTools: [function(e, t, a) {
        "use strict";
        cc._RF.push(t, "18c17VlhIBJXrARXU8zD1n1", "AniTools");
        var i = {
            doLabStrAni: function(e, t, a) {
                e.node.stopAllActions(),
                e.string = "";
                var i = t.split("")
                  , r = 0
                  , n = a / i.length;
                e.node.runAction(cc.sequence(cc.callFunc(function() {
                    e.string = e.string + i[r],
                    r++
                }), cc.delayTime(n)).repeat(i.length))
            },
            gunNumLabAni: function(e, t) {
                var a = parseInt(e.string);
                if (t != a) {
                    var i = 0
                      , r = t - a >= 50 ? 50 : t - a;
                    e.node.runAction(cc.sequence(cc.callFunc(function() {
                        i >= r - 1 ? e.string = t : (a++,
                        e.string = a),
                        i++
                    }), cc.delayTime(.02)).repeat(r))
                }
            },
            openUIAni: function(e, t, a, i) {
                e.opacity = 0,
                t.scale = 0,
                e.runAction(cc.fadeTo(a, 150)),
                t.runAction(cc.sequence(cc.scaleTo(a, 1).easing(cc.easeBackOut()), cc.callFunc(i)))
            },
            fireColorArr: ["#F5CD4D", "#F77986", "#D0F057", "#7ACCE8", "#E365EE"],
            fireworksAni: function(e, t, a, i) {
                for (var r = 0; r < t; r++) {
                    var n = ToolsJs.newSprite("fire" + this.returnRanNum(1, 4));
                    n.scale = .3 + .5 * Math.random(),
                    n.position = a,
                    n.color = cc.color(this.fireColorArr[this.returnRanNum(0, this.fireColorArr.length - 1)]),
                    e.addChild(n, 88);
                    var o = this.returnRanNum(i - 15, i + 15)
                      , s = this.returnRanNum(300, 1e3);
                    this.fireObjAni(n, o, s, 350, .005 * r)
                }
            },
            fireObjAni: function(e, t, a, i) {
                var r = arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : 0
                  , n = .1 + .5 * Math.random();
                e.runAction(cc.rotateBy(n, this.returnRanNum(-360, 360)).repeatForever());
                var o = cc.misc.degreesToRadians(t)
                  , s = cc.v2(Math.cos(o) * a, Math.sin(o) * a)
                  , c = a / i;
                e.runAction(cc.sequence(cc.delayTime(r), cc.jumpBy(c, cc.v2(1.5 * s.x, 0), a, 1), cc.removeSelf(!0)))
            },
            bombAni: function(e, t, a, i, r) {
                var n = arguments.length > 5 && void 0 !== arguments[5] ? arguments[5] : "#FFFFFF"
                  , o = ToolsJs.newSprite(t);
                o.color = cc.color(n);
                var s = this.returnRanNum(-180, 180);
                return this.bombObjAni(o, s, a, i, r),
                o
            },
            bombObjAni: function(e, t, a, i, r) {
                t = t || this.returnRanNum(-180, 180);
                var n = cc.misc.degreesToRadians(t)
                  , o = cc.v2(Math.cos(n) * a, Math.sin(n) * a)
                  , s = a / i
                  , c = r ? 0 : e.scale;
                e.runAction(cc.sequence(cc.spawn(cc.scaleTo(s + .1, c), cc.moveBy(s, o).easing(cc.easeQuadraticActionOut())), cc.fadeOut(.1), cc.removeSelf(!0)))
            },
            playAni: function(e, t) {
                e.getComponent(cc.Animation).play(t)
            },
            stopAni: function(e, t) {
                e.getComponent(cc.Animation).stop(t)
            },
            addNodeAni: function(e, t, a, i, r, n, o) {
                for (var s = e.getComponent(cc.Animation), c = [], h = i; h <= r; h++) {
                    var l = new cc.SpriteFrame(cc.url.raw("resources/" + t + h + ".png"));
                    c.push(l)
                }
                var d = cc.AnimationClip.createWithSpriteFrames(c, 5);
                d.name = a,
                d.speed = o,
                d.wrapMode = n ? cc.WrapMode.Loop : cc.WrapMode.Normal,
                s.addClip(d)
            },
            addGlodAni: function(e, t, a, i, r) {
                i > 30 && (i = 30);
                for (var n = 0; n < i; n++) {
                    var o = GameUiTools.newSprite("texture/glod.png");
                    e.addChild(o, 20),
                    o.position = t,
                    o.scale = .5,
                    this.glodAni(o, 800, 150, a)
                }
                null != r && e.runAction(cc.sequence(cc.delayTime(1), cc.callFunc(function() {
                    r()
                })))
            },
            glodAni: function(e, t, a, i) {
                var r = cc.degreesToRadians(this.returnRanNum(0, 360))
                  , n = cc.v2(e.x + a * Math.cos(r), e.y + a * Math.sin(r))
                  , o = a / t
                  , s = cc.pDistance(n, i) / t
                  , c = .1 * Math.random() + .1;
                e.runAction(cc.sequence(cc.scaleTo(c, -.5, .5), cc.scaleTo(c, .5, .5)).repeatForever()),
                e.runAction(cc.sequence(cc.moveTo(o, n).easing(cc.easeQuadraticActionInOut()), cc.moveTo(s, i).easing(cc.easeQuadraticActionInOut()), cc.removeSelf(!0)))
            },
            returnRanNum: function(e, t) {
                return e + Math.floor(Math.random() * (t - e + 1))
            },
            danMuAni: function(e, t, a, i) {
                for (var r = 0; r < a; r++) {
                    var n = t[this.returnRanNum(0, t.length - 1)]
                      , o = this.createText(n, e)
                      , s = this.returnRanNum(i + 80, i - 80);
                    o.position = cc.v2(e.width / 2 + o.width * o.scale, s);
                    var c = this.returnRanNum(3, 4) + .5 * Math.random();
                    o.runAction(cc.sequence(cc.delayTime(.3 * r), cc.moveBy(c, cc.v2(-e.width - o.width * o.scale * 2, 0)), cc.removeSelf(!0)))
                }
            },
            LabColorArr: ["#000000", "#FF0202", "#3F02FF", "#02FFCC", "#2AFF02", "#FFC202", "#9AFF02"],
            createText: function(e, t) {
                var a = new cc.Node
                  , i = a.addComponent(cc.Label)
                  , r = this.returnRanNum(0, this.LabColorArr.length - 1);
                return a.color = cc.color(this.LabColorArr[r]),
                i.string = e,
                a.scale = .8 + .5 * Math.random(),
                t.addChild(a, 20),
                a
            }
        };
        window.AniTools = i,
        cc._RF.pop()
    }
    , {}],
    Car: [function(e, t, a) {
        "use strict";
        cc._RF.push(t, "646e5FPk7NIHLaNwLuSwrUg", "Car");
        var i = e("GameConfig");
        cc.Class({
            extends: cc.Component,
            properties: {
                isInter: !1
            },
            onLoad: function() {
                this.isInter = !1,
                this.yin = this.node.getChildByName("yin")
            },
            onCollisionEnter: function(e, t) {
                i.GAME_OVER_BOOL ? (this.InterNode = e.node,
                this.isInter = !0) : (this.interAni(e.node, t.node),
                this.isInter = !0)
            },
            interAni: function(e, t) {
                t.x,
                e.x;
                e.zIndex = 10,
                t.zIndex = 10;
                var a = Math.atan2(e.y - t.y, e.x - t.x)
                  , i = cc.v2(100 * Math.cos(a), 100 * Math.sin(a));
                e.CarJs.isInter || (e.stopAllActions(),
                e.runAction(cc.sequence(cc.moveBy(1, i), cc.callFunc(function() {
                    e.stopAllActions()
                }, this)))),
                t.CarJs.isInter || (t.stopAllActions(),
                t.runAction(cc.sequence(cc.moveBy(1, cc.v2(-i.x, -i.y)), cc.callFunc(function() {
                    t.stopAllActions()
                }, this)))),
                t.CarJs.isInter = !0,
                e.CarJs.isInter = !0
            },
            carMove: function(e) {
                var t = cc.misc.degreesToRadians(this.node.angle);
                this.node.x += -Math.sin(t) * e,
                this.node.y += Math.cos(t) * e
            },
            update: function() {
                var e = this.node.parent.convertToWorldSpaceAR(cc.v2(this.node.x + 8, this.node.y - 5));
                this.yin.position = this.node.convertToNodeSpaceAR(e)
            }
        }),
        cc._RF.pop()
    }
    , {
        GameConfig: "GameConfig"
    }],
    CostomPanel: [function(e, t, a) {
        "use strict";
        cc._RF.push(t, "73a20O1a4NMVrL9h1JWv+zd", "CostomPanel");
        var i = e("GameConfig");
        cc.Class({
            extends: cc.Component,
            properties: {
                car: cc.Node,
                title: cc.Node,
                parAni: cc.Animation,
                nextBtn: cc.Node
            },
            onLoad: function() {
                document.getElementById("btnDiv").style.display ="none";
                this.node.opacity = 0,
                this.parAni.node.opacity = 0,
                this.node.runAction(cc.sequence(cc.fadeIn(.2), cc.callFunc(function() {
                    this.starAni()
                }, this))),
                this.nextBtn.scale = 0,
                this.nextBtn.on("click", this.nextCostom, this),
                this.node.on("click", this.nextCostom, this),
                this.mainNode = this.node.getChildByName("mainNode"),
                cc.winSize.height < 1280 && (this.mainNode.scale = cc.winSize.height / 1280),
                this.isClick = !1
            },
            start: function() {
                this.nextBtn.scale = 0
            },
            nextCostom: function() {
                this.isClick && (this.isClick = !1,
                i.mainGameJs.nextCostom(),
                this.node.destroy())
            },
            starAni: function() {
                this.parAni.node.runAction(cc.sequence(cc.fadeIn(.05), cc.callFunc(function() {
                    this.parAni.play()
                }, this))),
                this.car.runAction(cc.sequence(cc.moveTo(.2, cc.v2(0, -80)), cc.skewTo(.15, -30, 0), cc.skewTo(.15, 0, 0), cc.callFunc(function() {
                    this.nextBtn.scaleY = .1,
                    this.nextBtn.runAction(cc.sequence(cc.scaleTo(.15, 1, .1), cc.scaleTo(.15, .9, 1.1), cc.scaleTo(.15, 1, 1))),
                    this.isClick = !0
                }, this))),
                this.title.runAction(cc.sequence(cc.fadeTo(.8, 180), cc.fadeTo(.8, 255)).repeatForever())
            }
        }),
        cc._RF.pop()
    }
    , {
        GameConfig: "GameConfig"
    }],
    GameConfig: [function(e, t, a) {
        "use strict";
        cc._RF.push(t, "f0663sWtfNKCKOL+Hvnt0cI", "GameConfig");
        var i = {
            GameClubButton: null,
            GameScene: null,
            launchScene: null,
            Bros: null,
            caS: null,
            MAIN_MENU_NUM: "Classic",
            gameScore: 0,
            standScore: 30,
            GAME_OVER_BOOL: !0,
            publicGameBool: !1,
            ranLinkData: null,
            recGameData: null,
            InfoData: null,
            endShow0: null,
            endShow1: null,
            endShow2: null,
            endShow3: null,
            infoGameName: null,
            showText: null,
            startText: null,
            moreGameText: null,
            playAgainText: null,
            playNum: 0,
            noTouchBool: !0,
            returnRanNum: function(e, t) {
                return e + Math.floor(Math.random() * (t - e + 1))
            }
        };
        t.exports = i,
        cc._RF.pop()
    }
    , {}],
    GameUiTools: [function(e, t, a) {
        "use strict";
        cc._RF.push(t, "b21e8tF461OFalpptyeuAE2", "GameUiTools");
        e("GameConfig");
        var i = {
            newSprite: function(e, t) {
                var a = new cc.Node;
                return t ? (e = e.split(".")[0],
                a.addComponent(cc.Sprite).spriteFrame = GameTools.love2048FrameCache.getSpriteFrame(e)) : a.addComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame("res/raw-assets/resources/" + e),
                a
            },
            setNodeSpriteFrame: function(e, t) {
                e.getComponent(cc.Sprite).spriteFrame = GameTools.love2048FrameCache.getSpriteFrame(t)
            },
            setButtonClickEvents: function(e, t, a, i, r) {
                var n = new Array;
                void 0 == t.length ? n[0] = t : n = t;
                for (var o = 0; o < n.length; o++) {
                    var s = new cc.Component.EventHandler;
                    s.target = e.node,
                    s.component = e.node.name,
                    s.handler = a,
                    void 0 == t.length ? s.customEventData = i : s.customEventData = o;
                    var c = n[o].addComponent(cc.Button);
                    c.clickEvents.push(s),
                    (void 0 == r || r) && (c.transition = cc.Button.Transition.SCALE,
                    c.duration = .1,
                    c.zoomScale = 1.2)
                }
            },
            scheduleOnce: function(e, t, a) {
                e.runAction(cc.sequence(cc.delayTime(a), cc.callFunc(t, e)))
            },
            loadingScene: function(e, t) {
                t ? cc.loader.loadRes("panel/LoadingLayer", function(t, a) {
                    var i = cc.instantiate(a);
                    cc.director.getScene().children[0].addChild(i),
                    cc.director.preloadScene(e, function() {
                        cc.director.loadScene(e)
                    })
                }) : cc.director.preloadScene(e, function() {
                    cc.director.loadScene(e)
                })
            },
            loadingLayer: function(e) {
                cc.loader.loadRes(e, function(e, t) {
                    if (!e) {
                        var a = cc.instantiate(t);
                        cc.director.getScene().children[0].addChild(a, 100)
                    }
                })
            }
        };
        t.exports = i,
        cc._RF.pop()
    }
    , {
        GameConfig: "GameConfig"
    }],
    HttpManagerJs: [function(e, t, a) {
        "use strict";
        var i;
        function r(e, t, a) {
            return t in e ? Object.defineProperty(e, t, {
                value: a,
                enumerable: !0,
                configurable: !0,
                writable: !0
            }) : e[t] = a,
            e
        }
        cc._RF.push(t, "197e1hfNnxIcJx73V3VhUxY", "HttpManagerJs");
        var n = e("GameConfig")
          , o = (r(i = {
            URL: "",
            cacheList: null,
            isBusy: null,
            req: null,
            perform: null,
            retGameId: 0
        }, "cacheList", []),
        r(i, "ctor", function() {}),
        r(i, "checkHave", function() {
            this.isBusy || this.sendOne()
        }),
        r(i, "httpInitUrl", function(e) {
            //console.log("data", this.URL,e),
            this.retGameId = e
        }),
        r(i, "send", function(e, t, a, i) {
            this.cacheList.push({
                type: e,
                data: t,
                func: a,
                target: i
            }),
            this.isBusy || this.sendOne()
        }),
        r(i, "sendOne", function() {
            
        }),
        r(i, "onDataHandler", function() {
            var t = n.launchScene
                  , a = n.Bros;
                n.caS;
                cc.director.loadScene(t, null, function() {
                    if (a) {
                        "";
                        var e = document.getElementById("GameDiv");
                        e && (e.style.backgroundImage = "")
                    }
                    cc.loader.onProgress = null,
                    console.log("Success to load scene222: " + t)
                })
        }),
        r(i, "returnLanguage", function() {
            return ("en-US").toLocaleLowerCase()
        }),
        r(i, "onErrorHandler", function() {
            cc.log("\u7f51\u7edc\u9519\u8bef"),
            this.isBusy = !1,
            this.perform.target ? this.perform.func.call(this.perform.target, -1) : this.perform.func(-1)
        }),
        r(i, "onTimeoutHandler", function() {
            cc.log("\u8bf7\u6c42\u8d85\u65f6"),
            this.isBusy = !1,
            this.perform.target ? this.perform.func.call(this.perform.target, -1) : this.perform.func(-1)
        }),
        r(i, "clearAll", function() {
            for (var e = this.cacheList.length, t = 0; t < e; t++) {
                var a = this.cacheList[t];
                a && (a.target ? a.func.call(a.target, -1) : a.func(-1))
            }
            this.cacheList.length = 0
        }),
        i);
        t.exports = o,
        cc._RF.pop()
    }
    , {
        GameConfig: "GameConfig"
    }],
    LanguageSetJs: [function(e, t, a) {
        "use strict";
        cc._RF.push(t, "4754e8KuPZJCqklCNyKpG29", "LanguageSetJs");
        t.exports = {
            language_1: {
                game_name: "\u300c\u89c1\u7f1d\u63d2\u8f66\u300d",
                game_name1: "\u89c1\u7f1d\u63d2\u8f66",
                game_info: "\u628a\u63e1\u65f6\u673a\uff0c\u63d2\u5165\u8f66\u8f86\u3002",
                txtStart: "\u5f00\u59cb",
                txtMore: "\u66f4\u591a\u6e38\u620f",
                txtAgain: "\u518d\u73a9\u4e00\u6b21",
                txtShare1: "\u5728\u6e38\u620f\u4e2d ",
                txtShare2: "\u5f97\u5206\u4e86\uff0c\u597d\u554a!\u4f60\u548c\u6211\u4e00\u8d77\u6765\u6bd4\u8d5b!",
                bgRgb: "#3698C5",
                gameT1: "\u5173\u6ce8\u6211\u4eec",
                gameT2: "\u7eb8\u724c\u63a5\u9f99",
                gameT3: "\u9526\u4e0a\u6dfb\u82b1",
                gameUrl1: "http://g.regogame.com/game/9/",
                gameUrl2: "http://g.regogame.com/game/3/",
                gameT11: "\u5173\u6ce8\u5fae\u4fe1",
                gameT12: "\u5173\u6ce8Kakao",
                gameT13: "\u5173\u6ce8Line",
                gameEndL: "\u6e38 \u620f \u7ed3 \u675f",
                gameEndL1: "\u7a0d \u5019 \u67e5 \u770b \u5206 \u6570"
            },
            language_2: {
                game_name: "\u300cSeam Slotting\u300d",
                game_name1: "Seam Slotting",
                game_info: "Seize the time and insert the vehicle.",
                txtStart: "Start",
                txtMore: "More Game",
                txtAgain: "Play Again",
                txtShare1: "In Game ",
                txtShare2: " Let's play together!",
                bgRgb: "#3698C5",
                gameT1: "Follow Us",
                gameT2: "Thousand Flower",
                gameT3: "Eliminate Star",
                gameUrl1: "http://g.fromgame.com/game/53",
                gameUrl2: "http://g.fromgame.com/game/13",
                gameT11: "Focus WeChat",
                gameT12: "Focus Kakao",
                gameT13: "Focus Line",
                gameEndL: "Game OVer",
                gameEndL1: "View the score later"
            }
        },
        cc._RF.pop()
    }
    , {}],
    LoadSceneJs: [function(e, t, a) {
        "use strict";
        cc._RF.push(t, "3ef908fwfNIwJsOjET8tCh2", "LoadSceneJs");
        var i = {
            goToCover: function(e, t, a, i, r) {
                var n = e;
                n = null == n || void 0 == n || e,
                console.log("LoadBoolBeforeLoadS", n),
                this.needShow = !1,
                n && n ? (this.needShow = !0,
                showMyAds()) : this.needShow = !1,
                this.needShow ? (void 0 == preloader && this.startGoToGame(a, i, r),
                resCompleteFlag = !0,
                adCompleteFlag && resCompleteFlag && this.startGoToGame(a, i, r)) : this.startGoToGame(a, i, r)
            },
            startGoToGame: function(e, t, a) {
                console.log("goToScene"),
                noAdGoToScene()
            }
        };
        t.exports = i,
        cc._RF.pop()
    }
    , {}],
    MainGameJS: [function(e, t, a) {
        "use strict";
        cc._RF.push(t, "0e7a8SkMLxEY7nCB1Bqi8WZ", "MainGameJS");
        var i = e("GameConfig")
          , r = e("GameUiTools")
          , n = e("MainManage");
        cc.Class({
            extends: cc.Component,
            properties: {
                gameEndLay: cc.Node,
                startBgNode: cc.Node,
                sceneScore: cc.Label,
                gameOverT1: cc.Label,
                gameOverT2: cc.Label,
                mainGame: cc.Node,
                gameCamera: cc.Node
            },
            onLoad: function() {
                this.gameOveEndBool = !1,
                this.gameOverNum = 0,
                this.gameWidth = cc.winSize.width,
                this.gameHeight = cc.winSize.height,
                i.playNum >= 2 && (this.startBgNode.active = !1),
                i.playNum++,
                this.addTouchEvents(),
                r.loadingLayer("panel/LinkIconSpr"),
                cc.director.getCollisionManager().enabled = !0,
                cc.director.getCollisionManager().enabledDebugDraw = !1,
                i.mainGameJs = this,
                i.publicGameBool || this.play()
            },
            play: function() {
                console.log(1);
                var e = this;
                adBreak({
                    type: "next",
                    name: "restart-game",
                    beforeBreak: function() {
                        e.enableButtons()
                    },
                    afterBreak: function() {
                        e.enableButtons()
                    }
                })
            },
            enableButtons: function() {},
            addTouchEvents: function() {
                this.node.on(cc.Node.EventType.TOUCH_START, function(e) {
                    if (i.GAME_OVER_BOOL && i.noTouchBool) {
                       
                        this.lastPos = e.getLocation();
                        var t = this.getNextMoveCar();
                        return null != t && this.setCarRotate(t),
                        !0
                    }
                }, this),
                this.node.on(cc.Node.EventType.TOUCH_MOVE, this.on_touch_move, this),
                this.node.on(cc.Node.EventType.TOUCH_END, this.on_touch_end, this)
            },
            on_touch_move: function(e) {},
            on_touch_end: function() {},
            gameEnd: function() {
                i.GAME_OVER_BOOL = !1,
                n.gameOverShowText(i.gameScore, 1),
                this.gameEnd1()
            },
            gameEnd1: function() {
                this.gameOveEndBool = !0,
                this.initEndLayer()
            },
            initEndLayer: function() {
                n.gotoEndLayer()
            },
            start: function() {
                this.initGame()
            },
            update: function(e) {
                i.GAME_OVER_BOOL && (this.updateCarMove(),
                this.updateAddOtherCar(),
                this.updateCarRotate(),
                this.updateCarTail()),
                this.gameOverGoToOVer()
            },
            gameOverGoToOVer: function() {
                this.gameOveEndBool && (this.gameOverNum++,
                this.gameOverNum >= 900 && (this.gameOverNum = 0,
                this.gameOveEndBool = !1))
            },
            initGame: function() {
                if(window["start"]){
                    document.getElementById("btnDiv").style.display = "block";
                }
                
                console.log("initGame")
                this.sliderItem = this.mainGame.getChildByName("slider").getComponent("SliderItem"),
                this.nextLab = this.sliderItem.node.getChildByName("nextLab").getComponent(cc.Label),
                this.lastLab = this.sliderItem.node.getChildByName("lastLab").getComponent(cc.Label),
                this.tempWidth = 95,
                this.addCarWidth = 90,
                this.starRotateX = 10,
                i.gameScore = ToolsJs.getStorage("ChaCheScore") || 1,
                this.maxCostomNum = 7,
                this.costomNum = (i.gameScore - 1) % this.maxCostomNum + 1,
                this.maxHeigth = 300,
                this.minHeigth = 100,
                this.setCostomDiff(),
                this.bgArr = [],
                this.roadArr = [],
                this.otherCarArr = [],
                this.carArr = [],
                this.treeArr = [],
                this.initMapBg(),
                this.initRoads(),
                this.initCar(),
                this.addCar(),
                this.roadIndex = 0,
                this.tempTail = 0,
                this.addCarTemp = 0,
                i.GAME_OVER_BOOL = !0,
                i.noTouchBool = !0
            },
            initMapBg: function() {
                for (var e = 0; e < this.bgNum; e++) {
                    var t = ToolsJs.newSprite("bg" + this.costomNum);
                    t.height = this.gameHeight;
                    var a = this.bgArr.length * t.height;
                    t.groupIndex = 1,
                    this.mainGame.addChild(t, o.bg),
                    t.position = cc.v2(0, a),
                    this.bgArr.push(t)
                }
            },
            initTreeBg: function(e, t, a) {
                for (var i = 0; i < 35; i++) {
                    var r = ToolsJs.newSprite("tree" + ToolsJs.returnRandom(1, 7));
                    r.x = ToolsJs.returnRandom(e.x - e.width / 2, e.x + e.width / 2),
                    r.y = ToolsJs.returnRandom(e.y - e.height / 2, e.y + e.height / 2),
                    r.groupIndex = 1,
                    this.mainGame.addChild(r, o.tree);
                    var n = ToolsJs.getToNodePos(a, this.mainGame);
                    this.isInterRoad(r) || this.isInterTree(r) ? r.destroy() : Math.abs(r.x - t.x) <= t.width / 2 + r.width / 2 ? r.destroy() : Math.abs(r.y - n.y) <= a.height / 2 + r.height / 2 ? r.destroy() : this.treeArr.push(r)
                }
            },
            initRoads: function() {
                for (var e = 0, t = 0; t < this.bgNum; t++) {
                    var a = this.createRoad()
                      , i = null;
                    1 == (i = 0 == t ? ToolsJs.returnRandom(1, 2) : 1 == this.roadArr[this.roadArr.length - 1].dir ? 2 : 1) ? this.initTreeBg(this.bgArr[t], a, a.road_L) : this.initTreeBg(this.bgArr[t], a, a.road_R),
                    this.roadArr.push(a),
                    a.road_L.active = 1 == i,
                    a.road_R.active = 1 != i,
                    a.dir = i,
                    e++
                }
                this.minRoadY = -this.roadArr[0].height / 2,
                this.maxRoadY = -this.roadArr[0].height / 2 + this.roadArr[0].height * this.bgNum,
                this.gameCamera.position = this.getCameraPos(this.roadArr[0]),
                this.maxCarNum = e * this.carNum,
                this.toCarNum = 0
            },
            createRoad: function() {
                var e = ToolsJs.clonePrefabs("road_" + this.costomNum);
                e.height = this.gameHeight;
                var t = this.roadArr.length * e.height;
                e.road_L = e.getChildByName("road_L"),
                e.road_L.y = e.y + ToolsJs.returnRandom(-this.gameHeight / 2 + 1.5 * e.road_L.height, this.gameHeight / 2 - 1.5 * e.road_L.height),
                e.road_R = e.getChildByName("road_R"),
                e.road_R.y = e.y + ToolsJs.returnRandom(-this.gameHeight / 2 + 1.5 * e.road_L.height, this.gameHeight / 2 - 1.5 * e.road_L.height);
                var a = s[this.costomNum - 1];
                for (var i in a)
                    a.hasOwnProperty(i) && (e[i] = a[i]);
                return e.road_L.active = !1,
                e.road_R.active = !1,
                this.mainGame.addChild(e, o.road),
                e.position = cc.v2(0, t),
                e
            },
            addCar: function() {
                for (var e = 0; e < this.roadArr.length; e++)
                    for (var t = 0; t < this.carNum; t++) {
                        if (this.roadArr[e].road_L.active) {
                            var a = this.createCar(-90);
                            a.dir = 3,
                            a.road = this.roadArr[e].road_L,
                            this.setCarInfo(a, t)
                        }
                        if (this.roadArr[e].road_R.active) {
                            var i = this.createCar(90);
                            i.dir = 4,
                            i.road = this.roadArr[e].road_R,
                            this.setCarInfo(i, t)
                        }
                    }
            },
            setCarInfo: function(e) {
                e.isMove = !1;
                var t = ToolsJs.getToNodePos(e.road, this.mainGame);
                if (null == e.road.carArr || 0 == e.road.carArr.length) {
                    e.road.carArr = [];
                    var a = 3 == e.dir ? 1 : -1;
                    e.x = t.x + (e.road.width / 2 - this.tempWidth - this.addCarWidth) * a
                } else {
                    var i = e.road.carArr[e.road.carArr.length - 1]
                      , r = 3 == e.dir ? -1 : 1;
                    e.x = i.x + (e.height / 2 + i.height / 2 + 30) * r
                }
                e.y = t.y,
                this.carArr.push(e),
                e.road.carArr.push(e)
            },
            initCar: function() {
                if (1 != i.gameScore) {
                    var e = this.bgNum * this.roadArr[0].height
                      , t = Math.floor(e / 350)
                      , a = s[this.costomNum - 1]
                      , r = this.roadArr[0];
                    this.lastOtherCar = null;
                    for (var n = 0; n < a.carPoxs.length; n++)
                        for (var o = 0; o < t; o++) {
                            var c = 1 == a.carDirs[n] ? 0 : 180
                              , h = this.createCar(c)
                              , l = 1 == a.carDirs[n] ? -r.height / 2 : -r.height / 2 + r.height * this.bgNum;
                            if (0 != o) {
                                var d = 1 == a.carDirs[n] ? 1 : -1
                                  , u = this.lastOtherCar.height + ToolsJs.returnRandom(this.minHeigth, this.maxHeigth);
                                l = this.lastOtherCar.y + u * d
                            } else
                                l += ToolsJs.returnRandom(-h.height, h.height);
                            h.position = cc.v2(r.width * a.carPoxs[n], l),
                            h.isMove = !0,
                            h.dir = a.carDirs[n],
                            this.otherCarArr.push(h),
                            this.lastOtherCar = h
                        }
                }
            },
            addOtherCar: function() {
                var e = s[this.costomNum - 1];
                if (e.isTwo || !(Math.random() <= .5)) {
                    var t = ToolsJs.returnRandom(0, e.carNum - 1)
                      , a = 1 == e.carDirs[t] ? 0 : 180
                      , i = this.createCar(a);
                    i.dir = e.carDirs[t];
                    var r = 1 == i.dir ? this.minRoadY - i.height / 2 : this.maxRoadY + i.height / 2;
                    if (i.position = cc.v2(this.roadArr[0].width * e.carPoxs[t], r),
                    null != e.randomNum) {
                        var n = this.roadArr[0].width * e.randomNum[t];
                        i.x += ToolsJs.returnRandom(-n, n)
                    }
                    i.isMove = !0,
                    this.isInterOtherCar(i) ? i.destroy() : this.otherCarArr.push(i)
                }
            },
            createCar: function(e) {
                var t = ToolsJs.clonePrefabs("car" + this.getCarType(), this.mainGame, null, o.car);
                return t.groupIndex = 1,
                t.CarJs = t.getComponent("Car"),
                t.CarJs.isMove = !1,
                t.angle = e || 0,
                t.rightTail = new cc.Node,
                t.rightTail.position = cc.v2(.2 * t.width, .4 * -t.height),
                t.addChild(t.rightTail),
                t.leftTail = new cc.Node,
                t.leftTail.position = cc.v2(.2 * -t.width, .4 * -t.height),
                t.addChild(t.leftTail),
                t.scale = .85,
                t
            },
            getCarType: function() {
                return i.gameScore <= 5 ? ToolsJs.returnRandom(5, 12) : i.gameScore <= 10 ? ToolsJs.returnRandom(5, 15) : ToolsJs.returnRandom(1, 15)
            },
            updateCarMove: function() {
                for (var e = 0; e < this.otherCarArr.length; e++) {
                    var t = this.otherCarArr[e];
                    t.isMove && (t.CarJs.carMove(this.moveSpeed),
                    1 == t.dir && t.y - t.height / 2 > this.maxRoadY ? (t.destroy(),
                    this.otherCarArr.splice(e, 1)) : 2 == t.dir && t.y + t.height / 2 < this.minRoadY ? (t.destroy(),
                    this.otherCarArr.splice(e, 1)) : t.isInter && (t.destroy(),
                    this.otherCarArr.splice(e, 1)))
                }
            },
            updateAddOtherCar: function() {
                this.addCarTemp++,
                this.addCarTemp >= this.addCarTime && (this.addCarTemp = ToolsJs.returnRandom(0, .5 * this.addCarTime),
                this.addOtherCar())
            },
            updateCarRotate: function() {
                for (var e = 0; e < this.carArr.length; e++) {
                    var t = this.carArr[e];
                    if (t.isMove) {
                        if (t.isRotate)
                            t.angle += t.rSpeed;
                        else {
                            var a = 3 == t.dir ? 1 : -1
                              , r = ToolsJs.getToNodePos(t.road, this.mainGame).x + (t.road.width / 2 - this.tempWidth - this.starRotateX) * a;
                            Math.abs(t.x - r) <= this.moveSpeed && (t.isRotate = !0,
                            this.setCarRSpeed(t))
                        }
                        t.CarJs.carMove(this.moveSpeed),
                        Math.abs(t.toRo - t.angle) <= Math.abs(t.rSpeed) && (t.angle = t.toRo,
                        this.carArr.splice(this.carArr.indexOf(t), 1),
                        this.otherCarArr.push(t),
                        this.toCarNum++,
                        this.toCarNum == this.maxCarNum ? (this.sliderItem.updateToValue(1),
                        this.sliderItem.setToValue(1),
                        i.GAME_OVER_BOOL = !1,
                        ToolsJs.clonePrefabs("CostomPanel", this.node)) : this.carArr.length % this.carNum == 0 && (i.noTouchBool = !1,
                        this.cameraMoveAct()),
                        this.sliderItem.updateToValue(this.toCarNum / this.maxCarNum)),
                        t.CarJs.isInter && this.gameOverAni(t, t.CarJs.InterNode)
                    } else if (null != t.initX) {
                        var n = t.initX > t.x ? 1 : -1;
                        Math.abs(t.initX - t.x) > this.moveSpeed ? t.x += this.moveSpeed * n : t.x = t.initX
                    }
                }
            },
            isInterRoad: function(e) {
                for (var t = 0; t < this.roadArr.length; t++) {
                    var a = this.roadArr[t];
                    if (ToolsJs.isRectInterRect(a, e))
                        return !0
                }
                return !1
            },
            isInterTree: function(e) {
                for (var t = 0; t < this.treeArr.length; t++) {
                    var a = this.treeArr[t];
                    if (e != a && ToolsJs.isRectInterRect(a, e))
                        return !0
                }
                return !1
            },
            isInterOtherCar: function(e) {
                for (var t = 0; t < this.otherCarArr.length; t++)
                    if (ToolsJs.isRectInterRect(this.otherCarArr[t], e))
                        return !0;
                return !1
            },
            setCarRotate: function(e) {
                this.roadArr[0].isTwo ? 3 == e.dir ? e.toRo = -180 : e.toRo = 0 : 3 == e.dir ? e.toRo = -180 : e.toRo = 180,
                e.isMove = !0,
                ToolsJs.playAudio("shaChe"),
                e.road.carArr.splice(0, 1),
                e.road.carArr.length > 0 ? this.setCarPos(e.road.carArr[0]) : i.noTouchBool = !1
            },
            getNextMoveCar: function() {
                for (var e = 0; e < this.carArr.length; e++) {
                    var t = this.carArr[e];
                    if (!t.isMove)
                        return t
                }
                return null
            },
            setCarRSpeed: function(e) {
                var t = s[this.costomNum - 1]
                  , a = 0;
                a = 4 == e.dir ? Math.abs(this.roadArr[0].width * t.carPoxs[t.carPoxs.length - 1] - e.x) : Math.abs(this.roadArr[0].width * t.carPoxs[0] - e.x);
                var i = Math.PI * a * 2 / 4 / this.moveSpeed;
                e.rSpeed = -90 / i,
                t.isTwo || 4 != e.dir || (e.rSpeed = -e.rSpeed),
                e.isRotate = !0
            },
            setCarPos: function(e) {
                for (var t = ToolsJs.getToNodePos(e.road, this.mainGame), a = 3 == e.dir ? 1 : -1, i = t.x + (e.road.width / 2 - this.tempWidth - this.addCarWidth) * a - e.road.carArr[0].x, r = 0; r < e.road.carArr.length; r++) {
                    var n = e.road.carArr[r];
                    n.initX = n.x + i
                }
            },
            getCameraPos: function(e) {
                var t = cc.v2(0, 0);
                return e.road_R.active ? t.x = this.bgArr[0].width / 2 - this.gameWidth / 2 : t.x = -this.bgArr[0].width / 2 + this.gameWidth / 2,
                t.y = e.y,
                t
            },
            isCameraMove: function(e) {
                return !(1 == e.road_L.active && e.road_L.carArr.length > 0) && !(1 == e.road_R.active && e.road_R.carArr.length > 0)
            },
            cameraMoveAct: function() {
                if (this.roadIndex != this.roadArr.length - 1) {
                    this.roadIndex += 1,
                    i.noTouchBool = !1;
                    var e = this.getCameraPos(this.roadArr[this.roadIndex]);
                    this.gameCamera.runAction(cc.sequence(cc.moveTo(.8, e), cc.callFunc(function() {
                        i.noTouchBool = !0
                    }, this)))
                }
            },
            nextCostom: function() {
                document.getElementById("btnDiv").style.display = "block";
                i.gameScore++,
                ToolsJs.setStorage("ChaCheScore", i.gameScore),
                this.costomNum = (i.gameScore - 1) % this.maxCostomNum + 1,
                this.removeObjForArr(this.bgArr),
                this.removeObjForArr(this.carArr),
                this.removeObjForArr(this.otherCarArr),
                this.removeObjForArr(this.roadArr),
                this.removeObjForArr(this.treeArr),
                this.bgArr = [],
                this.roadArr = [],
                this.otherCarArr = [],
                this.carArr = [],
                this.treeArr = [],
                this.setCostomDiff(),
                this.sliderItem.setToValue(0),
                this.initMapBg(),
                this.initRoads(),
                this.initCar(),
                this.addCar(),
                this.roadIndex = 0,
                i.GAME_OVER_BOOL = !0,
                i.noTouchBool = !0
            },
            updateCostomLab: function() {
                this.nextLab.string = i.gameScore + 1,
                this.lastLab.string = i.gameScore
            },
            setCostomDiff: function() {
                this.bgNum = 2 + Math.floor(i.gameScore / 3),
                this.bgNum >= 8 && (this.bgNum = 8),
                this.moveSpeed = 10 + .2 * i.gameScore,
                this.moveSpeed >= 13 && (this.moveSpeed = 13),
                this.addCarTime = 60 - i.gameScore,
                this.addCarTime <= 30 && (this.addCarTime = 30),
                this.carNum = 5 + Math.floor(i.gameScore / 3),
                this.carNum >= 10 && (this.carNum = 10),
                this.updateCostomLab()
            },
            removeObjForArr: function(e) {
                for (var t = 0; t < e.length; t++) {
                    e[t].destroy()
                }
                e = []
            },
            updateCarTail: function() {
                if (this.tempTail++,
                this.tempTail >= 3) {
                    this.tempTail = 0;
                    for (var e = 0; e < this.carArr.length; e++) {
                        var t = this.carArr[e];
                        t.isMove && (this.tailAni(t, t.rightTail),
                        this.tailAni(t, t.leftTail))
                    }
                }
            },
            tailAni: function(e, t) {
                var a = ToolsJs.newSprite("particle_texture");
                a.groupIndex = 1,
                a.position = ToolsJs.getToNodePos(t, this.mainGame),
                a.scale = 1 + .2 * Math.random(),
                a.opacity = 255,
                a.color = cc.color("#E6E5E5"),
                a.x += ToolsJs.returnRandom(-3, 3),
                this.mainGame.addChild(a, e.zIndex - 1);
                var i = a.scale / 2;
                a.runAction(cc.sequence(cc.spawn(cc.fadeOut(i), cc.scaleTo(i, 2.5)), cc.removeSelf(!0)))
            },
            gameOverAni: function(e, t) {
                document.getElementById("btnDiv").style.display = "none";
                i.GAME_OVER_BOOL = !1,
                i.publicGameBool || (adBreak({
                    type: "next",
                    name: "restart-game"
                }),
                console.log("showAds gameOverAni")),
                ToolsJs.playAudio("interCar");
                var a = t.x < e.x ? 15 : -15;
                e.zIndex = 10,
                t.zIndex = 20;
                var r = Math.atan2(e.y - t.y, e.x - t.x)
                  , n = cc.v2(50 * Math.cos(r), 50 * Math.sin(r))
                  , o = ToolsJs.getDistance(e.position, t.position) / 2;
                this.interCarAni(cc.v2(Math.cos(r) * o + t.x, Math.sin(r) * o + t.y)),
                e.runAction(cc.rotateBy(.2, a).repeatForever()),
                e.runAction(cc.sequence(cc.moveBy(1, n), cc.callFunc(function() {
                    e.stopAllActions(),
                    this.gameEnd(),
                    i.GAME_OVER_BOOL = !1
                }, this))),
                t.runAction(cc.rotateBy(.2, -a).repeatForever()),
                t.runAction(cc.sequence(cc.moveBy(1, cc.v2(-n.x, -n.y)), cc.callFunc(function() {
                    t.stopAllActions()
                }, this))),
                t.CarJs.isInter = !0,
                e.CarJs.isInter = !0,
                this.shakeBGAni()
            },
            interCarAni: function(e) {
                for (var t = 0; t < 3; t++) {
                    var a = ToolsJs.newSprite("interPar");
                    a.groupIndex = 1,
                    this.mainGame.addChild(a, o.interPar),
                    a.position = e,
                    a.opacity = 150,
                    a.scale = 0,
                    a.runAction(cc.sequence(cc.delayTime(.3 * t), cc.spawn(cc.scaleTo(.5, 3).easing(cc.easeQuadraticActionOut()), cc.fadeOut(.5, 150)), cc.removeSelf(!0)))
                }
                for (var i = 0; i < 30; i++) {
                    var r = ToolsJs.returnRandom(150, 350)
                      , n = AniTools.bombAni(this.mainGame, "circle_2", r, 300, !1);
                    n.width = 10,
                    n.height = 10,
                    n.groupIndex = 1,
                    n.position = e,
                    this.mainGame.addChild(n, o.interPar)
                }
            },
            shakeBGAni: function() {
                this.gameCamera.runAction(cc.sequence(cc.moveBy(.05, cc.v2(3, 3)), cc.moveBy(.05, cc.v2(-3, 3)), cc.moveBy(.05, cc.v2(-3, -3)), cc.moveBy(.05, cc.v2(3, -3))).repeat(3))
            }
        });
        var o = {
            bg: 0,
            road: 1,
            interPar: 2,
            car: 3
        }
          , s = [{
            roadId: 1,
            isTwo: !0,
            carNum: 3,
            carPoxs: [-.23, 0, .23],
            carDirs: [2, 2, 1]
        }, {
            roadId: 2,
            isTwo: !0,
            carNum: 2,
            carPoxs: [-.2, .2],
            carDirs: [2, 1]
        }, {
            roadId: 3,
            isTwo: !0,
            carNum: 4,
            carPoxs: [-.28, -.1, .1, .28],
            carDirs: [2, 1, 2, 1]
        }, {
            roadId: 4,
            isTwo: !0,
            carNum: 2,
            carPoxs: [-.23, .23],
            carDirs: [2, 1]
        }, {
            roadId: 5,
            isTwo: !1,
            carNum: 1,
            carPoxs: [0],
            carDirs: [2]
        }, {
            roadId: 6,
            isTwo: !0,
            carNum: 4,
            carPoxs: [-.28, -.1, .1, .28],
            carDirs: [2, 1, 2, 1]
        }, {
            roadId: 7,
            isTwo: !0,
            carNum: 3,
            carPoxs: [-.25, -.02, .25],
            carDirs: [2, 1, 1]
        }];
        cc._RF.pop()
    }
    , {
        GameConfig: "GameConfig",
        GameUiTools: "GameUiTools",
        MainManage: "MainManage"
    }],
    MainManage: [function(e, t, a) {
        "use strict";
        cc._RF.push(t, "946adGkxvdBmZXnlD952XtK", "MainManage");
        var i = e("HttpManagerJs")
          , r = e("LanguageSetJs")
          , n = e("GameConfig")
          , o = e("LoadSceneJs")
          , s = e("GameUiTools")
          , c = {
            gameHttpId: 0,
            subScoreHttp: null,
            gameNameText: null,
            gameInfoText: null,
            txtStartText: null,
            txtMoreText: null,
            txtAgainText: null,
            gameEndLText: null,
            gameEndL1Text: null,
            bgLayRgb: null,
            gameEndName1: null,
            gameEndName2: null,
            gameEndUrl1: null,
            gameEndUrl2: null,
            langugeType: 1,
            ranLinkData: null,
            adShowBefore: !1,
            adShowAfter: !0,
            endLayCol: null,
            moreBtnBgCol: null,
            moreBtnTextCol: null,
            recGameData: null,
            recGameUrl: null,
            recGameDelPau: null,
            recGameDelPer: null,
            recGameimg1: null,
            recGameimg2: null,
            recGamePos: null,
            InfoData: null,
            endShow0: null,
            endShow1: null,
            endShow2: null,
            endShow3: null,
            infoGameName: null,
            showText: null,
            startText: null,
            moreGameText: null,
            playAgainText: null,
            endHttpShowInfo: null,
            moreGameUrl: null,
            init: function(e, t, a) {
                if (!n.publicGameBool) {
                    if (n.playNum >= 1)
                        return;
                    n.playNum++
                }
                n.launchScene = e,
                n.Bros = t,
                n.caS = a,
                this.curType = 1,
               
               
               
                i.httpInitUrl(this.gameHttpId);
                var r = this.initLanguage();
                this.gameNameText = r.game_name,
                this.gameInfoText = r.game_info,
                this.txtStartText = r.txtStart,
                this.txtMoreText = r.txtMore,
                this.txtAgainText = r.txtAgain,
                this.gameEndLText = r.gameEndL,
                this.gameEndL1Text = r.gameEndL1,
                this.bgLayRgb = r.bgRgb,
                this.gameEndName1 = r.gameT2,
                this.gameEndName2 = r.gameT3,
                this.gameEndUrl1 = r.gameUrl1,
                this.gameEndUrl2 = r.gameUrl2,
                this.langugeType = this.curType,
                n.publicGameBool || o.goToCover(this.adShowBefore, this.adShowAfter, e, t, a)
            },
            getHttpGameId: function() {
               
            },
            gameOverShowText: function(e, t) {
            },
           
            ajaxOnLogoResult: function() {},
            ajaxLoad: function(e, t, a) {
               
            },
            scoreResult: function(e) {
                if (null != e.currentTarget.response && "" != e.currentTarget.response) {
                    var t = JSON.parse(e.currentTarget.response);
                    cc.log("endshow", t.content),
                    c.endHttpShowInfo = t.content
                }
            },
            initLanguage: function() {
                var e = null;
                return 1 != 1 ? (this.curType = 1,
                e = r.language_1) : (cc.log("\u82f1\u6587"),
                this.curType = 2,
                e = r.language_2),
                e
            },
            getLinkGameReturn: function(e, t, a, i) {
                if (console.log("err0", e),
                console.log("err1", t),
                console.log("err2", a),
                console.log("err3", i),
                0 == e) {
                    this.ranLinkData = t,
                    console.log("LoadMainGameScnee");
                    var r = n.launchScene
                      , s = n.Bros
                      , c = n.caS;
                    o.goToCover(this.adShowBefore, this.adShowAfter, r, s, c)
                }
            },
            ranRecGameData: function() {
                if (null != this.recGameData && "" != this.recGameData) {
                    this.returnBool = !1;
                    var e = this.recGameData.length
                      , t = n.returnRanNum(1, e) - 1;
                    cc.log("ranNNN", t),
                    this.recGameUrl = this.recGameData[t].data_link,
                    this.recGameDelPer = this.recGameData[t].delay_per,
                    this.recGameDelPau = this.recGameData[t].delay_pau,
                    this.recGameimg1 = this.recGameData[t].img_1,
                    this.recGameimg2 = this.recGameData[t].img_2,
                    this.recGamePos = this.recGameData[t].poistion
                }
            },
            ranLinkUrl: function() {
                if (null != this.ranLinkData && this.ranLinkData.gameList && null != this.ranLinkData.gameList) {
                    var e = this.ranLinkData.gameList.length
                      , t = n.returnRanNum(1, e) - 1;
                    return cc.log("templ", t, this.ranLinkData.gameList),
                    cc.log("url", this.ranLinkData.gameList[0].gameName, this.ranLinkData.gameList[0].gameUrl),
                    t
                }
                return null
            },
            gotoEndLayer: function() {
                this.showGameEndLayer()
            },
            showGameEndLayer: function() {
                s.loadingLayer("panel/GameOverLayer")
            }
        };
        t.exports = c,
        cc._RF.pop()
    }
    , {
        GameConfig: "GameConfig",
        GameUiTools: "GameUiTools",
        HttpManagerJs: "HttpManagerJs",
        LanguageSetJs: "LanguageSetJs",
        LoadSceneJs: "LoadSceneJs"
    }],
    SliderItem: [function(e, t, a) {
        "use strict";
        cc._RF.push(t, "28e6fzQYSxBGJOBBsAQ2k1v", "SliderItem"),
        cc.Class({
            extends: cc.Component,
            properties: {
                sliderValue: cc.Node,
                toSpeed: 2
            },
            onLoad: function() {
                this.sliderWidth = this.sliderValue.width,
                this.toWidth = 0,
                this.setToValue(0)
            },
            updateToValue: function(e) {
                this.toWidth = this.sliderWidth * e
            },
            setToValue: function(e) {
                this.toWidth = this.sliderWidth * e,
                this.sliderValue.width = this.toWidth
            },
            update: function(e) {
                this.sliderWidth != this.toWidth && (Math.abs(this.sliderValue.width - this.toWidth) <= this.toSpeed ? this.sliderValue.width = this.toWidth : this.toWidth >= this.sliderValue.width ? this.sliderValue.width += this.toSpeed : this.sliderValue.width -= this.toSpeed)
            }
        }),
        cc._RF.pop()
    }
    , {}],
    ToolsJs: [function(e, t, a) {
        "use strict";
        cc._RF.push(t, "6d4709PjWlFP5QT7x6QXYPx", "ToolsJs");
        var i = {
            SpriteFrameJs: null,
            AudioArrJs: null,
            setStorage: function(e, t, a) {
                a && (t = JSON.stringify(t)),
                cc.sys.localStorage.setItem(e, t)
            },
            getStorage: function(e, t) {
                var a = cc.sys.localStorage.getItem(e);
                return isNaN(a) || (a = parseInt(a)),
                "NaN" == a.toString() && (a = null),
                t && null != a && (a = JSON.parse(a)),
                a
            },
            logJsonObject: function(e) {
                console.log(JSON.stringify(e))
            },
            loadJson: function(e, t) {},
            writeJson: function(e, t) {
                if (cc.sys.isBrowser) {
                    console.log("\u6d4f\u89c8\u5668");
                    var a = new Blob([e],{
                        type: "application/json"
                    })
                      , i = document.createElement("a");
                    i.download = t,
                    i.innerHTML = "Download File",
                    null != window.webkitURL ? i.href = window.webkitURL.createObjectURL(a) : (i.href = window.URL.createObjectURL(a),
                    i.onclick = destroyClickedElement,
                    i.style.display = "none",
                    document.body.appendChild(i)),
                    i.click()
                }
            },
            addNoArr: function(e, t) {
                return e.indexOf(t) < 0 && (e.push(t),
                !0)
            },
            newSprite: function(e) {
                if (null != this.SpriteFrameJs.getSpriteFrame(e)) {
                    var t = new cc.Node;
                    return t.addComponent(cc.Sprite).spriteFrame = this.SpriteFrameJs.getSpriteFrame(e),
                    t
                }
                return null
            },
            setTexture: function(e, t) {
                e.getComponent(cc.Sprite).spriteFrame = this.SpriteFrameJs.getSpriteFrame(t)
            },
            clonePrefabs: function(e, t, a) {
                var i = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : 0
                  , r = this.PrefabArrJs.getPrefabs(e);
                if (null != r) {
                    var n = cc.instantiate(r);
                    return null != t && t.addChild(n, i),
                    null != a && (n.position = a),
                    n
                }
                return console.log("\u514b\u9686\u9884\u5236\u4f53\u5931\u8d25:" + e),
                null
            },
            newLabel: function(e, t) {
                var a = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 20
                  , i = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : .5
                  , r = arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : .5
                  , n = arguments.length > 5 && void 0 !== arguments[5] ? arguments[5] : 0
                  , o = new cc.Node;
                o.anchorX = i,
                o.anchorY = r;
                var s = o.addComponent(cc.Label);
                return s.string = e,
                s.fontSize = a,
                t.addChild(o, n),
                o
            },
            playAudio: function(e) {
                var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : .3
                  , a = arguments.length > 2 && void 0 !== arguments[2] && arguments[2];
                return null != this.AudioArrJs ? this.AudioArrJs.playAudio(e, t, a) : cc.audioEngine.play(cc.url.raw("resources/music/" + e + ".mp3"), a, t)
            },
            stopAudio: function(e) {
                null != e && cc.audioEngine.stop(e)
            },
            newAduioSource: function(e) {
                var t = void 0;
                if (null != this.AudioArrJs)
                    t = this.AudioArrJs.getAudioClip(e);
                else {
                    if (null == e)
                        return console.log("clip\u4e0d\u80fd\u4e3a\u7a7a\uff01"),
                        null;
                    t = e
                }
                var a = new cc.Node;
                return a.addComponent(cc.AudioSource).clip = t,
                a.getComponent(cc.AudioSource)
            },
            delayTimeCall: function(e, t, a, i) {
                e.runAction(cc.sequence(cc.delayTime(a), cc.callFunc(t, i)))
            },
            getDistance: function(e, t) {
                return e.sub(t).mag()
            },
            getToNodePos: function(e, t) {
                var a = e.parent.convertToWorldSpaceAR(e.position);
                return t.convertToNodeSpaceAR(a)
            },
            getToWorldPosAR: function(e) {
                return e.parent.convertToWorldSpaceAR(e.position)
            },
            getToWorldPos: function(e) {
                return e.parent.convertToWorldSpace(e.position)
            },
            isBoxContainPos: function(e, t) {
                return e.getBoundingBox().contains(t)
            },
            isBoxContainWorldPos: function(e, t) {
                return e.getBoundingBoxToWorld().contains(t)
            },
            isRectInterRect: function(e, t) {
                return e.getBoundingBoxToWorld().intersects(t.getBoundingBoxToWorld())
            },
            returnRandom: function(e, t) {
                return e + Math.floor(Math.random() * (t - e + 1))
            },
            returnCurrentLanType: function() {
                var e = 1;
                switch (cc.sys.language) {
                case cc.sys.LANGUAGE_CHINESE:
                    "zh-TW" == window.navigator.language || "zh-tw" == window.navigator.language || "zh-HK" == window.navigator.language || "zh-hk" == window.navigator.language ? (cc.log("\u7e41\u4f53"),
                    e = 2) : (cc.log("\u7b80\u4f53"),
                    e = 1);
                    break;
                case cc.sys.LANGUAGE_KOREAN:
                    e = 4;
                    break;
                default:
                    e = 3
                }
                return 3
            }
        };
        window.ToolsJs = i,
        cc._RF.pop()
    }
    , {}],
    gameOverJs: [function(e, t, a) {
        "use strict";
        cc._RF.push(t, "3621brbM61BsYFG7fM/74TL", "gameOverJs");
        var i = e("GameUiTools")
          , r = e("GameConfig")
          , n = e("MainManage");
        cc.Class({
            extends: cc.Component,
            properties: {
                bgLayer: cc.Node,
                scoreBg: cc.Node,
                overScoreT: cc.Label,
                overInfoT: cc.Label,
                moreBtn: cc.Button,
                leftBtn: cc.Button,
                rightBtn: cc.Button,
                midGameText: cc.Label,
                leftBtnText: cc.Label,
                rightBtnText: cc.Label,
                tipLab: cc.Label,
                titleSpr: cc.Node
            },
            onLoad: function() {
                window["gameOverJs"]=this,
                this.bgLayer.opacity = 0,
                this.standardScore = r.standScore,
                this.game_max_score = 1e3,
                this.rigthBtnGameName = null,
                this.rightBtnGameUrl = null,
                this.UIPosChange(),
                this.addClickBtns();
                var e = ToolsJs.returnCurrentLanType();
                this.tipLab.string = 1 == e ? "\u70b9\u51fb\u7ee7\u7eed" : 2 == e ? "\u9ede\u64ca\u7e7c\u7e8c" : 4 == e ? "\ud074\ub9ad \ud558\uc5ec \uacc4\uc18d" : "Click Continue",
                this.tipLab.node.opacity = 0,
                this.tipLab.node.runAction(cc.sequence(cc.fadeIn(1), cc.delayTime(1), cc.fadeOut(1)).repeatForever()),
                this.scoreBg.scale = 0,
                this.moreBtn.node.opacity = 255,
                 this.moreBtn.node.removeFromParent(),
                this.scoreBg.runAction(cc.sequence(cc.scaleTo(.3, 1).easing(cc.easeBackOut()), cc.callFunc(function() {
                    this.moreBtn.node.runAction(cc.fadeIn(.5))
                }, this))),
                this.bgLayer.runAction(cc.fadeTo(.3, 200))
            },
            UIPosChange: function() {
                var e = ToolsJs.returnCurrentLanType();
                this.overScoreT.string = 1 == e ? "\u7b2c" + r.gameScore + "\u5173" : 2 == e ? "\u7b2c" + r.gameScore + "\u5173" : 4 == e ? "\uad00\ubb38" + r.gameScore : "Level:" + r.gameScore,
                console.log("lang", n.langugeType);
                var t = null;
                t = 1 == n.langugeType ? this.getContentByScore(r.gameScore, n.gameNameText) : this.getContentByScore2(r.gameScore, n.gameNameText),
                console.log("nihao", n.endHttpShowInfo),
                null != n.endHttpShowInfo && "" != n.endHttpShowInfo && (cc.log("gototo"),
                t = n.endHttpShowInfo),
                this.overInfoT.string = t;
                var a = this.overInfoT.node.height;
                if (this.overInfoT.node.height = Math.ceil(t.length * this.overInfoT.fontSize / this.overInfoT.node.width) * a,
                t = 1 == n.langugeType ? this.getContentByScore3(r.gameScore, n.gameNameText) : this.getContentByScore4(r.gameScore, n.gameNameText),
                document.title = t,
                this.midGameText.string = n.txtMoreText,
                this.leftBtnText.string = n.txtAgainText,
                this.tempArr = this.gameFocus(),
                null != n.ranLinkUrl()) {
                    var i = n.ranLinkUrl()
                      , o = n.ranLinkData.gameList[i].gameName;
                    this.rigthBtnGameName = o,
                    this.rightBtnGameUrl = n.ranLinkData.gameList[i].gameUrl
                }
                null != this.rigthBtnGameName && "" != this.rigthBtnGameName ? this.rightBtnText.string = this.rigthBtnGameName : this.rightBtnText.string = this.tempArr[0]
            },
            gameFocus: function() {
                var e = []
                  , t = null
                  , a = null;
                return Math.random() <= .5 ? (t = n.gameEndName1,
                a = n.gameEndUrl1) : (t = n.gameEndName2,
                a = n.gameEndUrl2),
                e.push(t),
                e.push(a),
                e
            },
            addClickBtns: function() {
                var e = this;
                e.moreBtn.node.on(cc.Node.EventType.TOUCH_START, function(e) {}),
                e.moreBtn.node.on(cc.Node.EventType.TOUCH_END, function(e) {
                    console.log("MoreGame"),
                    window.location.href = n.moreGameUrl
                }),
                e.leftBtn.node.on(cc.Node.EventType.TOUCH_START, function(e) {}),
                e.leftBtn.node.on(cc.Node.EventType.TOUCH_END, function(e) {
                    r.GAME_OVER_BOOL = !0,
                    r.gameScore = 0,
                    i.loadingScene("MainGameScene")
                }),
                this.node.on("click", function() {
                    this.restGame();
                    //window["H5JS"].showRewardedVideo()
                }, this),
                e.rightBtn.node.on(cc.Node.EventType.TOUCH_START, function(e) {}),
                e.rightBtn.node.on(cc.Node.EventType.TOUCH_END, function(t) {
                    var a = null;
                    a = null != e.rightBtnGameUrl && "" != e.rightBtnGameUrl ? e.rightBtnGameUrl : e.tempArr[1],
                    window.location.href = a
                })
            },
            restGame:function() {
                  r.publicGameBool || adBreak({
                    type: "next",
                    name: "restart-game"
                   }),
                  r.GAME_OVER_BOOL = !0,
                  r.gameScore = 0,
                  i.loadingScene("MainGameScene");
                  

            },
            getContentByScore: function(e, t) {
                var a = "\u53ea\u5f97\u4e861\u5173\uff0c\u5168\u7403\u72ec\u4e00\u4e2a\uff01"
                  , i = parseInt(.3 * this.standardScore)
                  , r = parseInt(1.5 * this.standardScore)
                  , n = parseInt(2.5 * this.standardScore)
                  , o = parseInt(4 * this.standardScore);
                if (e > 0 && e <= i)
                    a = "\u51fb\u8d25\u4e86\u5168\u740315%\u73a9\u5bb6\uff01";
                else if (e > i && e <= this.standardScore)
                    a = "\u51fb\u8d25\u4e86\u5168\u740350%\u73a9\u5bb6\uff01";
                else if (e > this.standardScore && e <= r) {
                    a = "\u51fb\u8d25\u4e86\u5168\u7403" + (Math.floor(12 * (e - this.standardScore) / (r - this.standardScore)) + 80) + "%\u73a9\u5bb6\uff01"
                } else if (e > r && e <= n) {
                    a = "\u51fb\u8d25\u4e86\u5168\u7403" + (Math.floor(7 * (e - r) / (n - r)) + 92) + "%\u73a9\u5bb6\uff01"
                } else if (e > n && e <= o)
                    a = "\u51fb\u8d25\u4e8699%\u73a9\u5bb6\uff01";
                else if (e > o && e < this.game_max_score) {
                    Math.ceil(17 * (e - o) / (this.game_max_score - o));
                    a = "\u51fb\u8d25\u4e86100%\u73a9\u5bb6\uff01"
                } else
                    e >= this.game_max_score && (a = "\u51fb\u8d25\u4e86100%\u73a9\u5bb6\uff01");
                return a
            },
            getContentByScore3: function(e, t) {
                var a = "\u6211\u771f\u662f\u592a\u5389\u5bb3\uff0c\u5728" + t + "\u4e2d\u7adf\u7136\u5f97\u4e860\u5173\uff0c\u5168\u7403\u53ea\u67091\u4e2a\u4eba\u5f970\u5173\uff01"
                  , i = parseInt(.3 * this.standardScore)
                  , r = parseInt(1.5 * this.standardScore)
                  , n = parseInt(2.5 * this.standardScore)
                  , o = parseInt(4 * this.standardScore);
                if (e > 0 && e <= i)
                    a = "\u6211\u5728" + t + "\u4e2d\u5f97\u4e86" + e + "\u5173\uff0c\u771f\u662f\u592a\u68d2\u4e86\uff0c\u518d\u7ec3\u7ec3\u5c31\u80fd\u8fbe\u5230\u6e38\u5203\u6709\u4f59\u7684\u5883\u754c\uff01";
                else if (e > i && e <= this.standardScore)
                    a = "\u6211\u5728" + t + "\u4e2d\u5f97\u4e86" + e + "\u5173\uff0c\u771f\u662f\u592a\u68d2\u4e86\uff0c\u518d\u7ec3\u7ec3\u5c31\u80fd\u8fbe\u5230\u6e38\u5203\u6709\u4f59\u7684\u5883\u754c\uff01";
                else if (e > this.standardScore && e <= r) {
                    a = "\u6211\u5728" + t + "\u4e2d\u5f97\u4e86" + e + "\u5173\uff0c\u51fb\u8d25\u4e86\u5168\u7403" + (Math.floor(12 * (e - this.standardScore) / (r - this.standardScore)) + 80) + "%\u7684\u73a9\u5bb6\uff0c\u8fdb\u5165\u4e86\u4fe1\u624b\u62c8\u6765\u7684\u5883\u754c\uff01"
                } else if (e > r && e <= n) {
                    a = "\u6211\u5728" + t + "\u4e2d\u5f97\u4e86" + e + "\u5173\uff0c\u51fb\u8d25\u4e86\u5168\u7403" + (Math.floor(7 * (e - r) / (n - r)) + 92) + "%\u7684\u73a9\u5bb6\uff0c\u8fdb\u5165\u4e86\u8fd0\u7528\u81ea\u5982\u7684\u5883\u754c\uff01"
                } else if (e > n && e <= o)
                    a = "\u6211\u5728" + t + "\u4e2d\u5f97\u4e86" + e + "\u5173\uff0c\u51fb\u8d25\u4e86\u5168\u740399%\u7684\u73a9\u5bb6\uff0c\u8fbe\u5230\u4e86\u884c\u4e91\u6d41\u6c34\u7684\u5883\u754c\uff01";
                else if (e > o && e < this.game_max_score) {
                    a = "\u6211\u5728" + t + "\u4e2d\u5f97\u4e86" + e + "\u5173\uff0c\u636e\u8bf4\u5168\u7403\u53ea\u6709 " + (20 - Math.ceil(17 * (e - o) / (this.game_max_score - o))) + "\u4e2a\u4eba\u8fbe\u5230\u8fd9\u4e2a\u6c34\u5e73\uff0c\u72ec\u5b64\u6c42\u8d25\uff01"
                }
                return e >= this.game_max_score && (a = "\u6211\u5728" + t + "\u4e2d\u5f97\u4e86" + e + "\u5173\uff0c\u8d85\u8d8a\u4e86\u72ec\u5b64\u6c42\u8d25\uff0c\u5fc3\u6709\u7075\u7280\uff01"),
                a
            },
            strlen: function(e) {
                for (var t = 0, a = 0; a < e.length; a++) {
                    var i = e.charCodeAt(a);
                    i >= 1 && i <= 126 || 65376 <= i && i <= 65439 ? t++ : t += 2
                }
                return t
            },
            getContentByScore2: function(e, t) {
                var a = "Only 0, the only one in the world!"
                  , i = parseInt(.3 * this.standardScore)
                  , r = parseInt(1.5 * this.standardScore)
                  , n = parseInt(2.5 * this.standardScore)
                  , o = parseInt(4 * this.standardScore);
                if (e >= this.game_max_score)
                    a = "Heart has sharp: beyond seeking defeat alone!";
                else if (e > 0 && e <= i)
                    a = "Easy to do: great!";
                else if (e > i && e <= this.standardScore)
                    a = "Easy to do: great!";
                else if (e > this.standardScore && e <= r) {
                    a = "Handy: beat " + (Math.floor(12 * (e - this.standardScore) / (r - this.standardScore)) + 80) + "% of the players!"
                } else if (e > r && e <= n) {
                    Math.floor(7 * (e - r) / (n - r));
                    a = "Easy to use: defeated " + showper3 + "% players!"
                } else if (e > n && e <= o)
                    a = "Xingyunshuishui: defeated 99% of the players!";
                else if (e > o && e < this.game_max_score) {
                    Math.ceil(17 * (e - o) / (this.game_max_score - o));
                    a = "The world's top players, seeking defeat alone!"
                }
                return a
            },
            getContentByScore4: function(e, t) {
                var a = "I'm awesome\uff0cin" + t + "get 0 score\uff0conly one person in the world has a 0\uff01"
                  , i = parseInt(.3 * this.standardScore)
                  , r = parseInt(1.5 * this.standardScore)
                  , n = parseInt(2.5 * this.standardScore)
                  , o = parseInt(4 * this.standardScore);
                if (e >= this.game_max_score)
                    a = "I got " + e + " points in the game, defeating all players worldwide, waiting for you to fight!";
                else if (e > 0 && e <= i)
                    a = "I got " + e + " points in the game, really great\uff01";
                else if (e > i && e <= this.standardScore)
                    a = "I got " + e + " points in the game, really great\uff01";
                else if (e > this.standardScore && e <= r) {
                    a = "I got in the game in " + e + " points, beating out " + (Math.floor(12 * (e - this.standardScore) / (r - this.standardScore)) + 80) + "% of global players\uff01"
                } else if (e > r && e <= n) {
                    a = "I got in the game in " + e + " points, beating out " + (Math.floor(7 * (e - r) / (n - r)) + 92) + "% of global players\uff01"
                } else if (e > n && e <= o)
                    a = "I got in the game in " + e + " points, beating out 99% of global players\uff01";
                else if (e > o && e < this.game_max_score) {
                    a = "I got " + e + " points in the game, it said to be the world's only " + (20 - Math.ceil(17 * (e - o) / (this.game_max_score - o))) + " people to reach this level! Have you?"
                }
                return a
            },
            start: function() {}
        }),
        cc._RF.pop()
    }
    , {
        GameConfig: "GameConfig",
        GameUiTools: "GameUiTools",
        MainManage: "MainManage"
    }],
    initGameJs: [function(e, t, a) {
        "use strict";
        cc._RF.push(t, "9738294nSVJJZyLQAJ1Zo8L", "initGameJs"),
        cc.Class({
            extends: cc.Component,
            properties: {},
            onLoad: function() {
                this.platFromNum = 1,
                this.judgeCurPlatform(),
                this.adapterScreen()
            },
            judgeCurPlatform: function() {
                console.log(navigator.userAgent);
                var e = function() {
                    var e = navigator.userAgent
                      , t = /(?:Windows Phone)/.test(e)
                      , a = /(?:SymbianOS)/.test(e) || t
                      , i = /(?:Android)/.test(e)
                      , r = /(?:Firefox)/.test(e)
                      , n = (/(?:Chrome|CriOS)/.test(e),
                    /(?:iPad|PlayBook)/.test(e) || i && !/(?:Mobile)/.test(e) || r && /(?:Tablet)/.test(e))
                      , o = /(?:iPhone)/.test(e) && !n;
                    return {
                        isTablet: n,
                        isPhone: o,
                        isAndroid: i,
                        isPc: !o && !i && !a
                    }
                }();
                e.isAndroid || e.isPhone ? this.platFromNum = 1 : e.isTablet ? this.platFromNum = 2 : e.isPc && (this.platFromNum = 3)
            },
            adapterScreen: function() {
                var e = cc.find("Canvas").getComponent(cc.Canvas);
                2 == this.platFromNum || 3 == this.platFromNum ? (e.fitWidth = !0,
                e.fitHeight = !0) : (e.fitWidth = !0,
                e.fitHeight = !1)
            }
        }),
        cc._RF.pop()
    }
    , {}],
    linkHttpIconJs: [function(e, t, a) {
        "use strict";
        cc._RF.push(t, "95474fr0oNDP7SAidILF03q", "linkHttpIconJs");
        var i = e("MainManage")
          , r = e("GameConfig");
        cc.Class({
            extends: cc.Component,
            properties: {
                iconSpr: cc.Node,
                iconSpr1: cc.Node
            },
            onLoad: function() {
                if (this._imageArr = [],
                this.stopUpdateBool = !0,
                this.gameWidth = cc.director.getWinSize().width,
                this.gameHeight = cc.director.getWinSize().height,
                null != i.recGameData && "" != i.recGameData && null != i.recGameimg1 && "" != i.recGameimg1) {
                    var e = 50 - this.gameWidth / 2
                      , t = this.gameHeight - 50 - this.gameHeight / 2;
                    null != i.recGamePos && "" != i.recGamePos && (1 == i.recGamePos ? (e = 50 - this.gameWidth / 2,
                    t = this.gameHeight - 50 - this.gameHeight / 2) : 2 == i.recGamePos ? (e = this.gameWidth - 50 - this.gameWidth / 2,
                    t = this.gameHeight - 50 - this.gameHeight / 2) : 3 == i.recGamePos ? (e = this.gameWidth - 50 - this.gameWidth / 2,
                    t = 50 - this.gameHeight / 2) : 4 == i.recGamePos && (e = 50 - this.gameWidth / 2,
                    t = 50 - this.gameHeight / 2));
                    var a = i.recGameimg1
                      , r = i.recGameimg2
                      , n = this.iconSpr
                      , o = this.iconSpr1
                      , s = this;
                    cc.loader.load(a, function(a, i) {
                        n.getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(i),
                        s.iconSpr.opacity = 0,
                        s.iconSpr.x = e,
                        s.iconSpr.y = t,
                        s._imageArr.push(s.iconSpr)
                    }),
                    cc.loader.load(r, function(a, i) {
                        o.getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(i),
                        s.iconSpr1.opacity = 0,
                        s.iconSpr1.x = e,
                        s.iconSpr1.y = t,
                        s._imageArr.push(s.iconSpr1)
                    })
                }
                this.addTouchEvents()
            },
            showLinkPic: function() {
                var e = 0
                  , t = 0;
                e = null != i.recGameDelPau ? i.recGameDelPau : 6,
                cc.log("dMainManager.recGameDelPer", i.recGameDelPer),
                t = null != i.recGameDelPer ? i.recGameDelPer : .7,
                this._imageArr[0].opacity = 255,
                this._imageArr[0].runAction(cc.repeatForever(cc.sequence(cc.delayTime(e), cc.rotateBy(t, 0, 180), cc.callFunc(function() {
                    this._imageArr[0].setRotation(0),
                    this._imageArr[0].opacity = 0,
                    this._imageArr[1].opacity = 255
                }, this), cc.delayTime(e), cc.callFunc(function() {
                    this.flowerAction(this._imageArr[1], t)
                }, this), cc.delayTime(t), cc.callFunc(function() {
                    this._imageArr[1].opacity = 0,
                    this._imageArr[0].opacity = 255
                }, this))))
            },
            flowerAction: function(e, t) {
                e.runAction(cc.sequence(cc.rotateBy(t, 0, 180), cc.callFunc(function() {
                    e.setRotation(0)
                })))
            },
            start: function() {},
            addTouchEvents: function() {
                var e = this
                  , t = {
                    event: cc.EventListener.TOUCH_ONE_BY_ONE,
                    onTouchBegan: function(t, a) {
                        var n = t.getLocation();
                        if (e._imageArr.length >= 2) {
                            var o = Math.abs(n.x - e.gameWidth / 2 - e._imageArr[0].x)
                              , s = Math.abs(n.y - e.gameHeight / 2 - e._imageArr[0].y);
                            o <= 30 && s <= 30 && (r.noTouchBool = !1,
                            null != i.recGameUrl && "" != i.recGameUrl && (e._imageArr[0].runAction(cc.sequence(cc.scaleTo(.1, .8), cc.scaleTo(.1, 1), cc.callFunc(function() {
                                window.location.href = i.recGameUrl
                            }))),
                            e._imageArr[1].runAction(cc.sequence(cc.scaleTo(.1, .8), cc.scaleTo(.1, 1)))),
                            console.log("touchLinkHttp"))
                        }
                        return !0
                    },
                    onTouchMoved: function(e, t) {},
                    onTouchEnded: function(e, t) {}
                };
                cc.eventManager.addListener(t, e.node)
            },
            update: function(e) {
                this.stopUpdateBool && this._imageArr.length >= 2 && (this.stopUpdateBool = !1,
                this.showLinkPic())
            }
        }),
        cc._RF.pop()
    }
    , {
        GameConfig: "GameConfig",
        MainManage: "MainManage"
    }],
    resArr: [function(e, t, a) {
        "use strict";
        cc._RF.push(t, "bbdfa8ym+pAWqzZHw+yX3Mm", "resArr"),
        cc.Class({
            extends: cc.Component,
            properties: {
                SpriteFrameArr: [cc.SpriteFrame],
                PrefabArr: [cc.Prefab],
                audiosArr: {
                    type: cc.AudioClip,
                    default: []
                }
            },
            onLoad: function() {
                void 0 != ToolsJs && (ToolsJs.PrefabArrJs = this,
                ToolsJs.SpriteFrameJs = this,
                ToolsJs.AudioArrJs = this),
                this.addPrefabs(),
                this.addSpriteFrame(),
                this.audioClipDic = {};
                for (var e = 0; e < this.audiosArr.length; e++) {
                    var t = this.audiosArr[e];
                    this.audioClipDic[t.name] = t
                }
            },
            playAudio: function(e) {
                if(window.isMute){
                    return;
                }
                var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : .3
                  , a = arguments.length > 2 && void 0 !== arguments[2] && arguments[2];
                return null != this.audioClipDic[e] ? cc.audioEngine.play(this.audioClipDic[e], a, t) : (console.log("\u6ca1\u6709\u627e\u5230\u97f3\u9891\uff1a" + e),
                null)
            },
            getAudioClip: function(e) {
                return null != this.audioClipDic[e] ? this.audioClipDic[e] : (console.log("\u6ca1\u6709\u627e\u5230\u97f3\u9891\uff1a" + e),
                null)
            },
            addSpriteFrame: function() {
                this.spriteArr = {};
                for (var e = 0; e < this.SpriteFrameArr.length; e++) {
                    var t = this.SpriteFrameArr[e];
                    null != t && (this.spriteArr[t.name] = t)
                }
            },
            getSpriteFrame: function(e) {
                return null != this.spriteArr[e] ? this.spriteArr[e] : (console.log("\u6ca1\u6709\u6dfb\u52a0\u56fe\u7247\uff1a" + e),
                null)
            },
            addPrefabs: function() {
                this.prefabsArr = {};
                for (var e = 0; e < this.PrefabArr.length; e++) {
                    var t = this.PrefabArr[e];
                    this.prefabsArr[t.name] = t
                }
            },
            getPrefabs: function(e) {
                return null != this.prefabsArr[e] ? this.prefabsArr[e] : (console.log("\u6ca1\u6709\u9884\u5236\u4f53\uff1a" + e),
                null)
            }
        }),
        cc._RF.pop()
    }
    , {}],
    seeScorePanel: [function(e, t, a) {
        "use strict";
        cc._RF.push(t, "0259dUddQdJ9JEt2s13IyDJ", "seeScorePanel");
        var i = e("../commonJs/GameConfig");
        cc.Class({
            extends: cc.Component,
            properties: {
                scoreBg: cc.Node,
                overLab: cc.Label,
                seeScoreLab: cc.Label
            },
            onLoad: function() {
                var e = this;
                this.overLab.node.y += 50,
                this.seeScoreLab.node.y += 50,
                this.isClick = !1,
                this.node.on("click", function() {
                    e.isClick && (e.isClick = !1,
                    i.publicGameBool || adBreak({
                        type: "next",
                        name: "restart-game"
                    }),
                    i.mainGameJs.gameEnd(),
                    e.node.runAction(cc.sequence(cc.fadeOut(.5), cc.removeSelf(!0))))
                }, this)
            },
            start: function() {
                this.openAni();
            },
            openAni: function() {
                this.node.runAction(cc.sequence(cc.fadeIn(.5), cc.callFunc(function() {
                    this.isClick = !0
                }, this))),
                this.overLab.node.runAction(cc.moveBy(.5, cc.v2(0, -50))),
                this.seeScoreLab.node.runAction(cc.moveBy(.5, cc.v2(0, -50)))
            },
            initLab: function() {
                var e = ToolsJs.returnCurrentLanType();
                2 == e ? (this.overLab.string = "\u904a \u6232 \u7d50 \u675f",
                this.seeScoreLab.string = "\u9ede\u64ca\u67e5\u770b\u5206\u6578") : 3 == e ? (this.overLab.string = "Game Over",
                this.seeScoreLab.string = "Click to view the score") : 4 == e && (this.overLab.string = "\uac8c\uc784 \uc885\ub8cc",
                this.seeScoreLab.string = "\ud074\ub9ad \ud558\uc5ec \uc810\uc218 \ubcf4\uae30")
            }
        }),
        cc._RF.pop()
    }
    , {
        "../commonJs/GameConfig": "GameConfig"
    }],
    startGameJs: [function(e, t, a) {
        "use strict";
        cc._RF.push(t, "280c3rsZJJKnZ9RqbALVwtK", "startGameJs");
        e("GameUiTools"),
        e("HttpManagerJs");
        var i = e("MainManage")
          , r = (e("LoadSceneJs"),
        e("GameConfig"));
        cc.Class({
            extends: cc.Component,
            properties: {
                titleSpr: cc.Node,
                carSpr: cc.Node,
                startBtn: cc.Node,
                showInfoT: cc.Label,
                startT: cc.Label
            },
            onLoad: function() {
                var e = this;
                document.getElementById("guideImg").style.display = "block";
                window["startGameJs"]=this;
                r.publicGameBool && i.init(),
                this.showInfoT.string = "",
                //this.showInfoT.string = i.gameInfoText,
                this.isClick = !1,
                this.startBtn.on("click", function() {
                    e.onGameClick();
                }, this),
                this.node.on("touchend", function() {
                    this.onGameClick();
                }, this)
            },
            start: function() {
                this.initTitle();
            },
            onGameClick:function(){
                var e = this;
                this.node.active = false;
                window["start"]=true;
                    e.isClick && (e.isClick = !1,
                    e.node.x = -2e6);
                    document.getElementById("btnDiv").style.display = "block";
                    document.getElementById("guideImg").style.display = "none";
            },
            initTitle: function() {
                var e = ToolsJs.returnCurrentLanType();
                1 != e && ToolsJs.setTexture(this.titleSpr, "title_" + e),
                this.carSpr.y = this.titleSpr.y - .3 * this.titleSpr.height,
                this.carSpr.runAction(cc.sequence(cc.moveTo(1, cc.v2(this.titleSpr.x + .4 * this.titleSpr.width, this.carSpr.y)), cc.callFunc(function() {
                    this.isClick = !0,
                    this.carSpr.getChildByName("montion").active = !1
                }, this))),
                this.initTitleAni(),
                this.startBtn.runAction(cc.sequence(cc.scaleTo(.8, 1.2), cc.scaleTo(.8, 1)).repeatForever()),
                this.initLab()
            },
            initLab: function() {
                var e = ToolsJs.returnCurrentLanType();
                1 == e ? this.startT.string = "\u5f00\u59cb\u6e38\u620f" : 2 == e ? this.startT.string = "\u958b\u59cb\u904a\u6232" : 3 == e ? this.startT.string = "Start Game" : 4 == e && (this.startT.string = "\uac8c\uc784 \uc2dc\uc791")
            },
            initTitleAni: function() {
                for (var e = 0; e < this.titleSpr.children.length; e++) {
                    var t = this.titleSpr.children[e]
                      , a = Math.random() >= .5 ? 8 : -8
                      , i = .8 + .3 * Math.random();
                    t.runAction(cc.sequence(cc.skewBy(i, a, 0), cc.skewBy(i, -a, 0), cc.skewBy(i, -a, 0), cc.skewBy(i, a, 0)).repeatForever())
                }
            }
        }),
        cc._RF.pop()
    }
    , {
        GameConfig: "GameConfig",
        GameUiTools: "GameUiTools",
        HttpManagerJs: "HttpManagerJs",
        LoadSceneJs: "LoadSceneJs",
        MainManage: "MainManage"
    }]
}, {}, ["HttpManagerJs", "LanguageSetJs", "LoadSceneJs", "AniTools", "Car", "CostomPanel", "MainGameJS", "SliderItem", "ToolsJs", "initGameJs", "resArr", "seeScorePanel", "MainManage", "GameConfig", "GameUiTools", "gameOverJs", "linkHttpIconJs", "startGameJs"]);
