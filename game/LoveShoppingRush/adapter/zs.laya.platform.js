window.zs = window.zs || {};

window.zs.laya = window.zs.laya || {};

(function(exports, Laya) {
    "use strict";
    class PlatformMgr extends Laya.Script {
        constructor() {
            super();
        }
        /**设置用户id，是否是新用户 */        static setUserID(user_id, is_new) {
            PlatformMgr.user_id = user_id;
            PlatformMgr.is_new = is_new;
        }
        /**初始化平台配置 以及对应的页面展示代码 */        static initCFG(data) {
            this.platformCfg = data;
            this.adViewUrl = {
                screenAd: "view/ad/FullAd_4.scene",
                floatAd: "view/ad/FloatAd.scene",
                listAd: "view/ad/FullAd.scene",
                knockEggAd: "view/ad/KnockEgg.scene",
                challenge: "view/ad/ChallengePage.scene"
            };
            this.adViewScript = {
                screenAd: FullScreeAdView_Rank,
                floatAd: HomeFloatAdView,
                listAd: FullScreeAdView_jump,
                knockEggAd: KnockEggView,
                challenge: ChallengeView
            };
            this.currentView = "";
        }
        /**初始化平台音乐文件路径 */        static initSoundUrl(openSound, clickSound) {
            this.openSound = openSound;
            this.clickSound = clickSound;
        }
        /**初始化平台广告 */        static initGameAd() {
            zs.laya.sdk.SdkService.initVideoAd(ADConfig.zs_video_adunit);
            zs.laya.sdk.SdkService.initInsertAd(ADConfig.zs_full_screen_adunit, null);
            zs.laya.sdk.SdkService.initCustomeAd(ADConfig.adUnitId1, ADConfig.adUnitId2, ADConfig.adUnitId3, ADConfig.adUnitId4, ADConfig.adUnitId5);
            zs.laya.banner.WxBannerMgr.Instance.setAdUnitId(ADConfig.zs_banner_rotate_id1, ADConfig.zs_banner_rotate_id2, ADConfig.zs_banner_rotate_id3);
        }
        static loopFullAd(time, handler, viewName) {
            if (viewName.indexOf("FullAd") == -1) return;
            Laya.stage.off(PlatformMgr.UI_VIEW_CLOSED, null, PlatformMgr.loopFullAd);
            if (time > 0 && ADConfig.zs_Fakerjump && ADConfig.zs_jump_switch && ADConfig.zs_switch && ADConfig.zs_game_star_jump_switch) {
                time--;
                viewName == "FullAd_4" ? PlatformMgr.showListAd() : PlatformMgr.showScreenAd();
                Laya.stage.frameOnce(1, this, function() {
                    Laya.stage.on(PlatformMgr.UI_VIEW_CLOSED, null, PlatformMgr.loopFullAd, [ time, handler ]);
                });
            } else {
                PlatformMgr.randomJump(2);
                PlatformMgr.showInsertAd(Laya.Handler.create(this, () => {
                    ADConfig.zs_Home_page_video && zs.laya.sdk.SdkService.playVideo();
                }));
                handler && handler.run();
            }
        }
        /**进入游戏弹窗 */        static enterGamePopup(handler) {
            if (ADConfig.zs_jump_switch && ADConfig.isPublicVersion() && ADConfig.zs_auto_full_screen_jump_switch && ADConfig.zs_Fakerjump) {
                // setTimeout(function () {
                //     if (PlatformMgr.is_new != undefined && PlatformMgr.is_new == 0) {
                //         PlatformMgr.showScreenAd();
                //     } else if (PlatformMgr.is_new == undefined) {
                //         PlatformMgr.showScreenAd();
                //     }
                // }, 5000);
                this.loopFullAd(2, handler, "FullAd_4");
            } else {
                PlatformMgr.randomJump(2);
                // PlatformMgr.showInsertAd(Laya.Handler.create(this, () => {
                                ADConfig.zs_Home_page_video && zs.laya.sdk.SdkService.playVideo();
                // }))
                                handler && handler.run();
            }
        }
        static checkEnter(Handler, view) {
            if (view == "FullAd_4") {
                PlatformMgr.showListAd();
                Laya.stage.on(PlatformMgr.UI_VIEW_CLOSED, PlatformMgr, PlatformMgr.enterOver, [ Handler ]);
                Laya.stage.off(PlatformMgr.UI_VIEW_CLOSED, PlatformMgr, PlatformMgr.checkEnter);
            }
        }
        static enterOver(Handler, view) {
            if (view == "FullAd") {
                Handler && Handler.run();
                Laya.stage.off(PlatformMgr.UI_VIEW_CLOSED, PlatformMgr, PlatformMgr.enterOver);
            }
        }
        /**游戏失败弹窗前处理 */        static onGameFaildPopUp(data) {
            // zs.laya.sdk.SdkService.hideCustomAd();
            // if (ADConfig.isBeforeGameAccount()) {
            //     Laya.stage.on(PlatformMgr.UI_VIEW_CLOSED, null, PlatformMgr.onHideExportView, [ 0, data ]);
            //     PlatformMgr.showListAd();
            //     PlatformMgr.randomJump(2);
            //     setTimeout(() => {
            //         PlatformMgr.showInsertAd(Laya.Handler.create(this, () => {
            //             ADConfig.zs_before_video1_switch && zs.laya.sdk.SdkService.playVideo();
            //         }));
            //     }, 500);
            // } else {
                console.error("fail");
                Laya.stage.event(PlatformMgr.OPEN_FAILED_VIEW, [ data ]);
            // }
        }
        /**游戏成功后弹窗处理 */        static onGameWinPopUp(data) {
            // zs.laya.sdk.SdkService.hideCustomAd();
            // if (ADConfig.isBeforeGameAccount()) {
            //     PlatformMgr.showListAd();
            //     Laya.stage.on(PlatformMgr.UI_VIEW_CLOSED, null, PlatformMgr.onHideExportView, [ 1, data ]);
            //     PlatformMgr.randomJump(2);
            //     setTimeout(() => {
            //         PlatformMgr.showInsertAd(Laya.Handler.create(this, () => {
            //             ADConfig.zs_before_video1_switch && zs.laya.sdk.SdkService.playVideo();
            //         }));
            //     }, 500);
            // } else {
                console.error("win");
                Laya.stage.event(PlatformMgr.OPEN_WIN_VIEW, [ data ]);
            // }
        }
        static onHideExportView(status, data, viewName) {
            if (viewName == "FullAd") {
                if (status == 0) {
                    Laya.stage.event(PlatformMgr.OPEN_FAILED_VIEW, [ data ]);
                } else if (status == 1) {
                    Laya.stage.event(PlatformMgr.OPEN_WIN_VIEW, [ data ]);
                }
                Laya.stage.off(PlatformMgr.UI_VIEW_CLOSED, null, PlatformMgr.onHideExportView);
            } else if (viewName == "FullAd_1" || viewName == "FullAd_4") {
                if (status == 2) {
                    if (data.viewName == viewName) {
                        Laya.stage.event(PlatformMgr.GAME_RESET_START);
                        Laya.stage.off(PlatformMgr.UI_VIEW_CLOSED, null, PlatformMgr.onHideExportView);
                        var backHome = data.isBackHome ? data.isBackHome : false;
                        if (ADConfig.isPublicVersion() && ADConfig.zs_switch && ADConfig.zs_auto_pop_ups_switch && backHome) {
                            PlatformMgr.showHomeFloatAd();
                        }
                    }
                }
            }
        }
        static onGameOverPopUp(data) {
            if (ADConfig.isAfterGameAccount()) {
                var viewName = PlatformMgr.adViewUrl.screenAd;
                viewName = viewName.substring(viewName.lastIndexOf("/") + 1, viewName.lastIndexOf("."));
                Laya.stage.on(PlatformMgr.UI_VIEW_CLOSED, null, PlatformMgr.onHideExportView, [ 2, {
                    viewName: viewName,
                    isBackHome: data.isBackHome
                } ]);
                PlatformMgr.showScreenAd(data);
            } else {
                Laya.stage.event(PlatformMgr.GAME_RESET_START);
            }
            zs.laya.platform.ADConfig.updateGameNum();
        }
        /**微信结算后插入全屏广告 */        static showInsertAd(showHandler) {
            if (!ADConfig.zs_full_screen_ad_enable) {
                showHandler && showHandler.run();
                return;
            }
            zs.laya.sdk.SdkService.loadInsertAd(Laya.Handler.create(null, function() {
                zs.laya.sdk.SdkService.showInsertAd(null, showHandler);
                Laya.LocalStorage.setItem("zs_full_screen_ad_time_stamp", Date.now().toString());
            }), Laya.Handler.create(this, function() {
                showHandler && showHandler.run();
            }));
        }
        static randomJump(time = 1, adType = "promotion") {
            if (!ADConfig.zs_auto_jump_switch) return;
            zs.laya.sdk.ZSReportSdk.loadAd(data => {
                var adData = data[adType];
                if (adData && adData.length) {
                    var func = () => {
                        time--;
                        var data = adData[Math.floor(Math.random() * adData.length)];
                        zs.laya.sdk.ZSReportSdk.navigate2Mini(data, PlatformMgr.user_id, function() {
                            time > 0 && func();
                        }, function() {
                            time > 0 && func();
                        }, function() {
                            time > 0 && func();
                        }, {
                            position: "randowJump"
                        });
                    };
                    time > 0 && func();
                }
            });
        }
        static onExportJumpCancel() {
            if (ADConfig.zs_jump_switch && ADConfig.isPublicVersion() && ADConfig.zs_full_screen_jump && ADConfig.zs_slide_jump_switch) {
                PlatformMgr.showScreenAd();
            }
        }
        static initView(view, type, data) {
            if (view instanceof Laya.View) {
                view._gameData = data;
                if (type) {
                    var script = view.getComponent(type);
                    if (script == null) {
                        script = view.addComponent(type);
                    }
                    if (script.initView) {
                        script.initView(data);
                    }
                }
            }
        }
        /**
         * showScreenAd
         */        static showScreenAd(data) {
            if (this.currentView == this.adViewUrl.screenAd) {
                return;
            }
            if (this.adViewUrl.screenAd == null) {
                console.error("showScreenAd error");
                return;
            }
            this.currentView = this.adViewUrl.screenAd;
            Laya.Scene.open(this.adViewUrl.screenAd, false, data, Laya.Handler.create(this, function(view) {
                this.initView(view, this.adViewScript.screenAd, data);
            }));
            Laya.SoundManager.playSound(this.openSound);
        }
        static hideScreenAd() {
            if (this.adViewUrl.screenAd == null) {
                return;
            }
            this.currentView = "";
            Laya.Scene.close(this.adViewUrl.screenAd);
        }
        /**
        * showListAd
        */        static showListAd(data) {
            if (this.currentView == this.adViewUrl.listAd) {
                return;
            }
            if (this.adViewUrl.listAd == null) {
                console.error("showListAd error");
                return;
            }
            this.currentView = this.adViewUrl.listAd;
            Laya.Scene.open(this.adViewUrl.listAd, false, data, Laya.Handler.create(this, function(view) {
                this.initView(view, this.adViewScript.listAd, data);
            }));
            Laya.SoundManager.playSound(this.openSound);
        }
        static hideListAd() {
            if (this.adViewUrl.listAd == null) {
                return;
            }
            this.currentView = "";
            Laya.Scene.close(this.adViewUrl.listAd);
        }
        /**
         * showHomeFloatAd
         */        static showHomeFloatAd(data) {
            if (this.currentView == this.adViewUrl.floatAd) {
                return;
            }
            if (this.adViewUrl.floatAd == null) {
                console.error("showHomeFloatAd error");
                return;
            }
            this.currentView = this.adViewUrl.floatAd;
            Laya.Scene.open(this.adViewUrl.floatAd, false, data, Laya.Handler.create(this, function(view) {
                this.initView(view, this.adViewScript.floatAd, data);
            }));
            Laya.SoundManager.playSound(this.openSound);
        }
        static hideHomeFloatAd() {
            if (this.adViewUrl.floatAd == null) {
                return;
            }
            this.currentView = "";
            Laya.Scene.close(this.adViewUrl.floatAd);
        }
        /**打开砸金蛋 */        static showKnockEggView(data) {
            if (this.currentView == this.adViewUrl.knockEggAd) {
                return;
            }
            if (this.adViewUrl.knockEggAd == null) {
                console.error("knockEggAd error");
                return;
            }
            this.currentView = this.adViewUrl.knockEggAd;
            Laya.Scene.open(this.adViewUrl.knockEggAd, false, data, Laya.Handler.create(this, function(view) {
                this.initView(view, this.adViewScript.knockEggAd, data);
            }));
        }
        static hideKnockEggAd() {
            if (this.adViewUrl.knockEggAd == null) {
                return;
            }
            this.currentView = "";
            Laya.Scene.close(this.adViewUrl.knockEggAd);
        }
        static showChallengeView(data) {
            if (this.currentView == this.adViewUrl.challenge) {
                return;
            }
            if (this.adViewUrl.challenge == null) {
                console.error("challenge error");
                return;
            }
            this.currentView = this.adViewUrl.challenge;
            Laya.Scene.open(this.adViewUrl.challenge, false, data, Laya.Handler.create(this, function(view) {
                this.initView(view, this.adViewScript.challenge, data);
            }));
        }
        static hideChallengeView() {
            if (this.adViewUrl.challenge == null) {
                return;
            }
            this.currentView = "";
            Laya.Scene.close(this.adViewUrl.challenge);
        }
    }
    PlatformMgr.autoShowVideoCount = 0;
    //开局狂点视频拉取次数限制
        PlatformMgr.autoShowVideoCount2 = 0;
    //结束狂点视频拉取次数限制
        PlatformMgr.platformCfg = null;
    PlatformMgr.user_id = 1;
    PlatformMgr.is_new = 1;
    PlatformMgr.APP_SHOW = "DEVICE_ON_SHOW";
    PlatformMgr.APP_HIDE = "DEVICE_ON_HIDE";
    PlatformMgr.APP_JUMP_CANCEL = "NAVIGATE_FAILED";
    // 跳转失败
        PlatformMgr.APP_JUMP_SUCCESS = "NAVIGATE_SUCCESS";
    //跳转成功
        PlatformMgr.AD_CONFIIG_LOADED = "AD_CONFIIG_LOADED";
    PlatformMgr.UI_VIEW_OPENED = "UI_VIEW_OPENED";
    // zs.laya.base.BaseView.EVENT_UI_VIEW_CLOSED
        PlatformMgr.UI_VIEW_CLOSED = "UI_VIEW_CLOSED";
    PlatformMgr.OPEN_WIN_VIEW = "OPEN_WIN_VIEW";
    PlatformMgr.OPEN_FAILED_VIEW = "OPEN_FAILED_VIEW";
    PlatformMgr.GAME_RESET_START = "GAME_RESET_START";
    PlatformMgr.EGG_GET_AWARD = "EGG_GET_AWARD";
    Laya.ILaya.regClass(PlatformMgr);
    Laya.ClassUtils.regClass("zs.laya.platform.PlatformMgr", PlatformMgr);
    Laya.ClassUtils.regClass("Zhise.PlatformMgr", PlatformMgr);
    /**常用的数据方法 */    class MathUtils {
        static compareVersion(v1, v2) {
            //比较版本
            v1 = v1.split(".");
            v2 = v2.split(".");
            var len = Math.max(v1.length, v2.length);
            while (v1.length < len) {
                v1.push("0");
            }
            while (v2.length < len) {
                v2.push("0");
            }
            for (var i = 0; i < len; i++) {
                var num1 = parseInt(v1[i]);
                var num2 = parseInt(v2[i]);
                if (num1 > num2) {
                    return 1;
                } else if (num1 < num2) {
                    return -1;
                }
            }
            return 0;
        }
        static isToday(date) {
            var now = new Date(Date.now());
            var target = new Date(date);
            if (now.getFullYear() != target.getFullYear() || now.getMonth() != target.getMonth() || now.getDate() != target.getDate()) {
                return false;
            } else {
                return true;
            }
        }
        /** 获取范围内的随机数 [min,max) */        static random(min, max) {
            return Math.random() * (max - min) + min << 0;
        }
        /**是否为数字 包括字符串数字*/        static IsNumber(val) {
            var regPos = /^\d+(\.\d+)?$/;
            //非负浮点数
                        var regNeg = /^(-(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*)))$/;
            //负浮点数
                        if (regPos.test(val) || regNeg.test(val)) {
                return true;
            } else {
                return false;
            }
        }
    }
    class ADConfig {
        constructor() {
            this.current_version = "1.0";
            //配置表游戏版本号
                }
        /**配置表游戏版本号  ,广告后台控制数据 */        static initAdSetting(version, webResponse) {
            this.current_version = version;
            this.response = webResponse;
            var filterSystem = webResponse.zs_banner_system ? String(webResponse.zs_banner_system).toUpperCase() : null;
            this.zs_version = webResponse.zs_number ? webResponse.zs_number : "0.0";
            var enable_banner_op = !filterSystem || !Laya.Browser.onMobile || !(filterSystem.indexOf("ANDROID") != -1 && Laya.Browser.onAndroid || filterSystem.indexOf("IOS") != -1 && !Laya.Browser.onAndroid);
            this.zs_switch = webResponse.zs_switch == 1 && enable_banner_op && this.isPublicVersion();
            this.egg_switch = webResponse.zs_switch == 1 && this.isPublicVersion();
            this.zs_video_adunit = webResponse.zs_video_adunit;
            this.zs_banner_adunit = webResponse.zs_banner_adunit;
            this.zs_full_screen_adunit = webResponse.zs_full_screen_adunit;
            this.zs_full_screen_ad_enable = webResponse.zs_full_screen_ad == 1;
            this.zs_banner_text_time = webResponse.zs_banner_text_time ? Number(webResponse.zs_banner_text_time) : 1e3;
            this.zs_banner_banner_time = webResponse.zs_banner_banner_time ? Number(webResponse.zs_banner_banner_time) : 1e3;
            this.zs_banner_refresh_time = webResponse.zs_banner_refresh_time ? Number(webResponse.zs_banner_refresh_time) : 1e3;
            this.zs_banner_move_time = webResponse.zs_banner_move_time ? Number(webResponse.zs_banner_move_time) : 1e3;
            this.zs_banner_vertical_enable = webResponse.zs_banner_vertical_enable == 1;
            this.zs_banner_horizontal_enable = webResponse.zs_banner_horizontal_enable == 1;
            this.zs_share_title = webResponse.zs_share_title;
            this.zs_share_image = webResponse.zs_share_img;
            this.zs_shield_gdt_export = webResponse.zs_shield_gdt_export == 1;
            this.zs_jump_switch = webResponse.zs_jump_switch == 1 && (zs.laya.sdk.ZSReportSdk.Instance.isFromLink() == false || this.zs_shield_gdt_export);
            this.zs_revive_type = webResponse.zs_revive_type;
            this.zs_revive_click_num = webResponse.zs_revive_click_num;
            this.zs_revive_video_num = webResponse.zs_revive_video_num;
            this.zs_revive_share_num = webResponse.zs_revive_share_num;
            this.zs_full_screen_jump = webResponse.zs_full_screen_jump == 1;
            this.zs_history_list_jump = webResponse.zs_history_list_jump == 1;
            this.zs_finish_jump = webResponse.zs_finish_jump == 1;
            this.repair_click_num = this.zs_click_award_percent = webResponse.zs_click_award_percent || [ .3, .7 ];
            this.zs_click_award_back = webResponse.zs_click_award_back ? Number(webResponse.zs_click_award_back) : .00423;
            this.zs_click_award_num = MathUtils.IsNumber(webResponse.zs_click_award_num) ? webResponse.zs_click_award_num : webResponse.zs_click_award_num || 0;
            this.zs_click_award_add = webResponse.zs_click_award_add || .1;
            this.zs_ready_click_num = MathUtils.IsNumber(webResponse.zs_ready_click_num) ? webResponse.zs_ready_click_num : webResponse.zs_ready_click_num || 0;
            this.zs_revive_countdown = webResponse.zs_revive_countdown ? Number(webResponse.zs_revive_countdown) : 10;
            this.zs_jump_style = webResponse.zs_jump_style ? Number(webResponse.zs_jump_style) : 0;
            this.zs_banner_rotate_id1 = webResponse.zs_banner_rotate_id1;
            this.zs_banner_rotate_id2 = webResponse.zs_banner_rotate_id2;
            this.zs_banner_rotate_id3 = webResponse.zs_banner_rotate_id3;
            this.zs_click_award_system = webResponse.zs_click_award_system;
            this.zs_banner_show_number = this.getNumberVal(webResponse.zs_banner_show_number, 2);
            this.zs_full_screen_rotate = this.getNumberVal(webResponse.zs_full_screen_rotate, 0) == 1;
            this.zs_unmiss_text_time = this.getNumberVal(webResponse.zs_unmiss_text_time, 0);
            this.zs_button_delay_time = this.getNumberVal(webResponse.zs_button_delay_time, 2e3);
            this.zs_button_delay_switch = this.getNumberVal(webResponse.zs_button_delay_switch, 0) == 1;
            this.zs_game_banner_show_switch = this.getNumberVal(webResponse.zs_game_banner_show_switch, 0) == 1 && this.zs_switch;
            this.zs_before_finsh_jump_switch = this.getNumberVal(webResponse.zs_before_finsh_jump_switch, 0) == 1;
            this.zs_slide_jump_switch = this.getNumberVal(webResponse.zs_slide_jump_switch, 0) == 1;
            this.zs_auto_pop_ups_switch = this.getNumberVal(webResponse.zs_slide_jump_switch, 0) == 1;
            this.zs_show_share_num = webResponse.zs_show_share_num ? webResponse.zs_show_share_num : 0;
            this.zs_start_game_video_switch = webResponse.zs_start_game_video_switch == 1;
            this.zs_skin_push_switch = webResponse.zs_skin_push_switch == 1;
            this.zs_auto_pop_ups_switch = this.getNumberVal(webResponse.zs_auto_pop_ups_switch, 0) == 1;
            this.zs_auto_full_screen_jump_switch = webResponse.zs_auto_full_screen_jump_switch == 1 ? true : false;
            this.zs_auto_jump_switch = webResponse.zs_auto_jump_switch == 1;
            this.zs_friends_playing_switch = webResponse.zs_friends_playing_switch == 1 ? true : false;
            this.zs_reminder_switch = webResponse.zs_reminder_switch == 1 ? true : false;
            this.zs_finish_switch = webResponse.zs_finish_switch == 1 ? true : false;
            this.zs_false_news_switch = webResponse.zs_false_news_switch == 1 ? true : false;
            this.zs_Fakerjump = webResponse.zs_Fakerjump == 1;
            this.zs_full_screen_banner_time = Number(webResponse.zs_full_screen_banner_time) ? Number(webResponse.zs_full_screen_banner_time) : 0;
            this.zs_game_star_jump_switch = webResponse.zs_game_star_jump_switch == 1 && this.zs_switch;
            this.zs_skin_push_switch = webResponse.zs_skin_push_switch ? Number(webResponse.zs_skin_push_switch) : 0;
            this.zs_fullscreen_native_switch = webResponse.zs_fullscreen_native_switch == 1 && this.zs_switch;
            this.zs_Screen_video_switch = Number(webResponse.zs_Screen_video_switch);
            //狂点视频次数开关
                        this.zs_Screen_video_switch2 = Number(webResponse.zs_Screen_video_switch2);
            //结算界面视频控制
                        this.zs_Game_Page_time_switch = Number(webResponse.zs_Game_Page_time_switch);
            //游戏页导出时间开关(秒)
                        this.zs_Full_screen_display = Number(webResponse.zs_Full_screen_display);
            //游戏界面全屏展示开关
                        this.zs_Video_Display_Time = Number(webResponse.zs_Video_Display_Time);
            //视频延时开关
                        this.zs_click_award_percent2 = webResponse.zs_click_award_percent2 || [ .3, .7 ];
            //结算砸金蛋banner显示进度条区间
                        this.zs_click_award_back2 = webResponse.zs_click_award_back2 ? Number(webResponse.zs_click_award_back2) : .00423;
            //结算砸金蛋不点按钮进度条回退（%）
                        this.zs_click_award_add2 = webResponse.zs_click_award_add2 || .1;
            //结算砸金蛋按钮点击一次进度条上涨（%）
                        this.zs_Push_button_up_switch = Number(webResponse.zs_Push_button_up_switch) || 0;
            //全屏按钮上移开关
                        this.adUnitId1 = webResponse.zs_native_adunit;
            this.adUnitId2 = webResponse.zs_native_adunit2;
            this.adUnitId3 = webResponse.zs_native_adunit3;
            this.adUnitId4 = webResponse.zs_native_adunit4;
            this.adUnitId5 = webResponse.zs_native_adunit5;
            this.adUnitId6 = webResponse.zs_native_adunit6;
            this.zs_skin_push_switch = webResponse.zs_skin_push_switch == 1;
            this.zs_fullscreen_native_switch = webResponse.zs_fullscreen_native_switch == 1 ? true : false;
            this.zs_Home_page_video = webResponse.zs_Home_page_video == 1 && this.zs_switch;
            this.zs_click_award_video_switch = webResponse.zs_click_award_video_switch == 1 && this.zs_switch;
            this.zs_before_video1_switch = webResponse.zs_before_video1_switch == 1 && this.zs_switch;
            this.zs_native_add_plaid = webResponse.zs_native_add_plaid == 1;
            this.zs_ready_click_video_num = webResponse.zs_ready_click_video_num == 1 && this.zs_switch;
            this.zs_native_banner_plaid = webResponse.zs_native_banner_plaid == 1;
            if (typeof wx !== "undefined") {
                wx.onShareAppMessage(function() {
                    return {
                        title: ADConfig.zs_share_title,
                        imageUrl: ADConfig.zs_share_image
                    };
                });
            }
            this.initOpenAwardNum();
        }
        static getNumberVal(val, def) {
            def = MathUtils.IsNumber(def) ? Number(def) : 0;
            return MathUtils.IsNumber(val) ? Number(val) : def;
        }
        static initOpenAwardNum() {
            //初始化砸金蛋次数
            this.open_award_num = Laya.LocalStorage.getItem(window.zs.wx.appId + "open_award_num") || 0;
            var awardNumTimestamp = Laya.LocalStorage.getItem(window.zs.wx.appId + "open_award_num_time_stamp");
            if (awardNumTimestamp == null || awardNumTimestamp == "" || MathUtils.isToday(Number(awardNumTimestamp)) == false) {
                Laya.LocalStorage.setItem(window.zs.wx.appId + "open_award_num_time_stamp", Date.now().toString());
                Laya.LocalStorage.setItem(window.zs.wx.appId + "open_award_num", 0);
                Laya.LocalStorage.setItem(window.zs.wx.appId + "open_ready_num", 0);
                Laya.LocalStorage.setItem("open_recorder_num", 0);
            }
        }
        static updateGameNum() {
            //游戏次数
            this.gameNum = Laya.LocalStorage.getItem(window.zs.wx.appId + "day_game_num") || 0;
            this.gameNum += 1;
            Laya.LocalStorage.setItem(window.zs.wx.appId + "day_game_num", this.gameNum);
            var awardNumTimestamp = Laya.LocalStorage.getItem(window.zs.wx.appId + "game_num_time_stamp");
            if (awardNumTimestamp == null || awardNumTimestamp == "" || MathUtils.isToday(Number(awardNumTimestamp)) == false) {
                Laya.LocalStorage.setItem(window.zs.wx.appId + "game_num_time_stamp", Date.now().toString());
                Laya.LocalStorage.setItem(window.zs.wx.appId + "day_game_num", this.gameNum = 0);
            }
        }
        static isPublicVersion() {
            return ADConfig.current_version != ADConfig.zs_version;
        }
        static isOpenEgg(lv, type) {
            console.log("进入砸金蛋配置" + this.egg_switch);
            if (!this.egg_switch) return false;
            if (this.zs_click_award_system) {
                var zs_click_award_system = this.zs_click_award_system.trim().toLowerCase();
                //屏蔽安卓
                                if (zs_click_award_system == "android" && Laya.Browser.onAndroid) {
                    return false;
                }
                //屏蔽ios
                                if (zs_click_award_system == "ios" && Laya.Browser.onIOS) {
                    return false;
                }
            }
            if (this.zs_click_award_since && this.zs_click_award_since > 0) {
                let gameNum = Laya.LocalStorage.getItem(window.zs.wx.appId + "day_game_num");
                console.debug("当前局数" + gameNum, this.zs_click_award_since + "局后开启砸金蛋");
                if (!gameNum || Number(gameNum) < this.zs_click_award_since) {
                    return false;
                }
            }
            let num = type == 1 ? this.zs_ready_click_num : this.zs_click_award_num;
            if (MathUtils.IsNumber(num)) {
                let openNum = type == 1 ? Laya.LocalStorage.getItem(window.zs.wx.appId + "open_ready_num") : Laya.LocalStorage.getItem(window.zs.wx.appId + "open_award_num");
                console.debug("type" + type, "限制:" + num, "已:" + openNum);
                console.log("type" + type, "限制:" + num, "已:" + openNum);
                //如果是-1则是无限制
                                if (num == -1) return true;
                if (Number(num) > Number(openNum)) return true;
            }
            console.debug("限制:" + num);
            console.log("限制:" + num);
            if (num && num.length > 0) {
                if (num.length == 1 && num[0] == -1) return true;
                var index = num.indexOf(lv);
                if (index != -1) {
                    return true;
                }
            }
            return false;
        }
        static isShareRecorder(lv) {
            if (Laya.Browser.onIOS) {
                return false;
            }
            if (MathUtils.IsNumber(ADConfig.zs_show_share_num)) {
                if (ADConfig.zs_show_share_num == -1) return true;
                var open_recorder_num = Laya.LocalStorage.getItem("open_recorder_num") || 0;
                if (Number(ADConfig.zs_show_share_num) > Number(open_recorder_num)) return true;
            }
            if (this.zs_show_share_num && this.zs_show_share_num.length > 0) {
                if (this.zs_show_share_num.length == 1 && this.zs_show_share_num[0] == -1) return true;
                var lst = [];
                if (this.zs_show_share_num.indexOf("[") >= 0) {
                    lst = JSON.parse(this.zs_show_share_num);
                } else {
                    lst = this.zs_show_share_num.split(",");
                }
                var index = lst.indexOf(lv);
                if (index != -1) {
                    return true;
                }
            }
            return false;
        }
        static enableClickRevive() {
            return this.isReviveTypeEnable("zs_revive_click_num");
        }
        static updateClickRevive() {
            this.updateReviveTypeInfo("zs_revive_click_num");
        }
        static enableVideoRevive() {
            return this.isReviveTypeEnable("zs_revive_video_num");
        }
        static updateVideoRevive() {
            this.updateReviveTypeInfo("zs_revive_video_num");
        }
        static enableShareRevive() {
            return this.isReviveTypeEnable("zs_revive_share_num");
        }
        static updateShareRevive() {
            this.updateReviveTypeInfo("zs_revive_share_num");
        }
        static isReviveTypeEnable(type) {
            if (this[type] == 0) {
                return false;
            }
            if (this[type] == -1) {
                return true;
            }
            var clickTimestamp = Laya.LocalStorage.getItem(type + "_time_stamp");
            if (clickTimestamp == null || clickTimestamp == "" || MathUtils.isToday(Number(clickTimestamp)) == false) {
                return true;
            }
            var strNum = Laya.LocalStorage.getItem(type);
            var numVal = strNum == null || strNum == "" ? 0 : Number(strNum);
            return numVal < this[type];
        }
        static updateReviveTypeInfo(type) {
            Laya.LocalStorage.setItem(type + "_time_stamp", Date.now().toString());
            var strNum = Laya.LocalStorage.getItem(type);
            var numVal = strNum == null || strNum == "" ? 0 : Number(strNum);
            numVal++;
            Laya.LocalStorage.setItem(type, numVal.toString());
        }
        /**游戏结束前 */        static isBeforeGameAccount() {
            return ADConfig.isPublicVersion() && ADConfig.zs_jump_switch && ADConfig.zs_before_finsh_jump_switch;
        }
        /**游戏结束后 */        static isAfterGameAccount() {
            return ADConfig.isPublicVersion() && ADConfig.zs_jump_switch && ADConfig.zs_full_screen_jump;
        }
    }
    ADConfig.response = null;
    ADConfig.zs_share_title = "";
    //: string;                      //分享标题
        ADConfig.zs_share_image = "";
    //: string;                      //分享图片地址
        ADConfig.zs_switch = false;
    //: boolean;                          //误触总开关(1-开 0-关)
        ADConfig.zs_version = "1.0.0";
    //: string;                //版本号（区分提审环境-无误触、正式环境-有误触）
        ADConfig.zs_video_adunit = "";
    //: string;                     //视频广告ID
        ADConfig.zs_banner_adunit = "";
    //: string;                    //广点通bannerID [废弃]
        ADConfig.zs_banner_rotate_id1 = "";
    //string                   //bannerID 1
        ADConfig.zs_banner_rotate_id2 = "";
    //string                   //bannerID 2
        ADConfig.zs_banner_rotate_id3 = "";
    //string                   //bannerID 3
        ADConfig.zs_full_screen_adunit = "";
    //: string;               //插屏广告ID
        ADConfig.zs_full_screen_ad_enable = false;
    //: boolean;           //插屏广告开启状态
        ADConfig.zs_banner_text_time = 0;
    //: number;                 //广点通文字延时移动时间（单位：毫秒）
        ADConfig.zs_banner_banner_time = 0;
    //: number;               //广点通banner延时显示时间（单位：毫秒）
        ADConfig.zs_banner_refresh_time = 0;
    //: number;              //广点通banner广告刷新时长间隔（单位：毫秒）
        ADConfig.zs_banner_move_time = 500;
    //                        //广点通文字上移动画时间长度（单位：毫秒）
        ADConfig.zs_banner_vertical_enable = false;
    //: boolean;          //广点通文字上移开关（0关，1开）
        ADConfig.zs_banner_horizontal_enable = false;
    //: boolean;        //广点通文字左右移动开关（0关，1开）
        ADConfig.zs_jump_switch = false;
    //: boolean;                     //导出位置开关（1开 0关）
        ADConfig.zs_revive_type = 0;
    //: number;                      //游戏复活方式（0不复活，1狂点复活，2视频复活，3分享复活，4普通复活）
        ADConfig.zs_revive_click_num = 0;
    //: number;                 //游戏狂点复活次数（-1不限制，0使用视频复活，N次后使用视频复活）
        ADConfig.zs_revive_video_num = 0;
    //: number;                 //游戏视频复活次数（-1不限制，0使用分享复活，N次后使用分享复活，没视频了使用分享复活）
        ADConfig.zs_revive_share_num = 0;
    //: number;                 //游戏分享复活次数（-1不限制，0使用普通复活，N次后使用普通复活）
        ADConfig.zs_continue_auto_share = false;
    //: boolean;
        ADConfig.zs_full_screen_jump = false;
    //: boolean;           //增加全屏导出位开关
        ADConfig.zs_history_list_jump = false;
    //: boolean;           //增加我的小程序列表导出位开关
        ADConfig.zs_finish_jump = false;
    //: boolean;                //增加复活页结算页导出位开关
        ADConfig.zs_revive_countdown = 10;
    //: number;               //复活倒计时
        ADConfig.zs_jump_style = 1;
    //: number;                      //结算页样式
        ADConfig.zs_shield_gdt_export = true;
    //广点通来路屏蔽导出开关
        ADConfig.zs_full_screen_rotate = false;
    //banner白点开关
        ADConfig.zs_button_delay_switch = false;
    //按钮延迟显示开关
        ADConfig.zs_button_delay_time = 2e3;
    //按钮延迟显示时间
        ADConfig.zs_game_banner_show_switch = true;
    // 游戏页面 banner展示开关（0关，1开）
        ADConfig.zs_before_finsh_jump_switch = false;
    //结算界面之前导出开关（0关，1开）
        ADConfig.zs_slide_jump_swich = false;
    //滑动触发跳转开关（0关，1开）
        ADConfig.zs_auto_pop_ups_switch = true;
    //爆款小游戏推荐自动弹窗开关（0关，1开）
        ADConfig.zs_start_game_video_switch = false;
    //开局看视频开关
        ADConfig.zs_auto_full_screen_jump_switch = false;
    //自动弹全屏开关
        ADConfig.zs_auto_jump_switch = false;
    //自动跳转开关
        ADConfig.zs_friends_playing_switch = false;
    //好友在玩开关
        ADConfig.zs_reminder_switch = false;
    // 温馨提示界面开关 
        ADConfig.zs_finish_switch = false;
    //奖励界面
        ADConfig.zs_false_news_switch = false;
    //假消息开关
        ADConfig.zs_game_star_jump_switch = false;
    //首页和游戏页 导出控制开关
        ADConfig.zs_Fakerjump = false;
    ADConfig.adUnitId6 = null;
    ADConfig.zs_Screen_video_switch = 0;
    //狂点视频次数开关
        ADConfig.zs_Screen_video_switch2 = 0;
    //结算视频次数开关
        ADConfig.zs_Game_Page_time_switch = 0;
    //游戏页导出时间开关(秒)
        ADConfig.zs_Full_screen_display = 0;
    //游戏界面全屏展示开关
        ADConfig.zs_Video_Display_Time = 0;
    //视频延时开关 
        ADConfig.zs_click_award_add2 = 0;
    //结算砸金蛋按钮点击一次进度条上涨（%）
        ADConfig.zs_click_award_percent2 = 0;
    //结算砸金蛋banner显示进度条区间
        ADConfig.zs_click_award_back2 = 0;
    //结算砸金蛋不点按钮进度条回退（%）
        ADConfig.zs_Push_button_up_switch = 0;
    //全屏按钮上移开关
        Laya.ILaya.regClass(ADConfig);
    Laya.ClassUtils.regClass("zs.laya.platform.ADConfig", ADConfig);
    Laya.ClassUtils.regClass("Zhise.ADConfig", ADConfig);
    /**-------------------------------------以下是导出相关内容-------------------------------------*/    class AdList extends Laya.Script {
        constructor() {
            super();
            this.adType = null;
            this.autoScroll = false;
            this.scrollDir = AdList.SCROLL_NONE;
            this.dragSleep = 5e3;
            this.scrollSpeed = 1;
            //2800;
                        this.waitTime = 1e3;
            this.passedTime = 0;
            this.inAutoScroll = false;
            this.adData = [];
            this.iosFilterAppIds = [];
            this.list = null;
            this.hotIds = [];
            this.maxNum = null;
            this.isDataUpdate = false;
            this.touchIndex = -1;
            this.isRandomSelect = false;
            this.changeValue = 0;
            this.unitValue = 0;
            this.isEnd = false;
            this.isClockPendulum = false;
            this.notJumpFull = false;
            this.bFixHeigt = false;
            this.position = "error";
        }
        /**导出位类型，是否自动滚动，滚动方向，ios是否屏蔽id，列表显示的最大个数，是否随机选择,是否移动一个暂停一下,是否不跳转全屏 */        requestAdData(adType, autoScroll, scrollDir, iosFilterAppIds, position, maxNum, randomSelect, isClockPendulum, notJumpFull) {
            this.adType = adType;
            this.autoScroll = autoScroll;
            this.scrollDir = scrollDir;
            this.iosFilterAppIds = iosFilterAppIds || [];
            this.maxNum = maxNum;
            this.notJumpFull = notJumpFull;
            this.isRandomSelect = randomSelect;
            this.isClockPendulum = isClockPendulum;
            this.position = position;
            if (this.scrollDir == AdList.SCROLL_VERTICAL) {
                this.list.vScrollBarSkin = "";
            } else if (this.scrollDir == AdList.SCROLL_HORIZONTAL) {
                this.list.hScrollBarSkin = "";
            }
            var self = this;
            zs.laya.sdk.ZSReportSdk.loadAd(data => {
                if (self.list) {
                    self.adData = data[self.adType.toString()];
                    self.allData = {};
                    for (let i = 0; i < self.adData.length; i++) {
                        self.allData[self.adData[i].app_title] || (self.allData[self.adData[i].app_title] = []);
                        self.allData[self.adData[i].app_title].push(self.adData[i]);
                    }
                    self.initHotIds();
                    self.freshAdList();
                }
            });
        }
        reloadData() {
            this.adData.sort(() => {
                return Math.random() > .5 ? 1 : -1;
            });
            this.list.array = this.adData;
        }
        refreshSingleItem(index) {
            var newIdx = Math.floor(Math.random() * this.adData.length);
            if (this.adData.length > 1 && newIdx == index) {
                // 防止自己换自己
                return this.refreshSingleItem(index);
            }
            console.log("新的随机数是：", newIdx);
            var newData = this.adData[newIdx];
            var oldData = this.adData[index];
            if (newData) {
                this.list.setItem(index, newData);
                this.list.setItem(newIdx, oldData);
            }
        }
        checkChange(index) {
            var key = this.adData[index].app_title;
            var checkDatas = Laya.LocalStorage.getItem("CheckDatas");
            try {
                checkDatas = JSON.parse(checkDatas);
                checkDatas || (checkDatas = {});
            } catch (e) {
                checkDatas = {};
            }
            if (!this.allData[key] || this.allData[key].length <= 1) return;
            checkDatas[key] || (checkDatas[key] = {
                cur: 0
            });
            checkDatas[key].cur++;
            this.adData[index] = this.allData[key][checkDatas[key].cur % this.allData[key].length];
            this.list.setItem(index, this.adData[index]);
            Laya.LocalStorage.setItem("CheckDatas", JSON.stringify(checkDatas));
        }
        checkData() {
            var checkDatas = Laya.LocalStorage.getItem("CheckDatas");
            try {
                checkDatas = JSON.parse(checkDatas);
                checkDatas || (checkDatas = {});
            } catch (e) {
                checkDatas = {};
            }
            for (let i = 0; i < this.adData.length; i++) {
                if (!checkDatas[this.adData[i].app_title]) {
                    checkDatas[this.adData[i].app_title] = {
                        cur: 0
                    };
                }
            }
            this.adData = [];
            for (let key in checkDatas) {
                this.allData[key] && this.adData.push(this.allData[key][checkDatas[key].cur % this.allData[key].length]);
            }
        }
        freshAdList() {
            var self = this;
            this.adData = this.adData.filter(function(elment) {
                return Laya.Browser.onAndroid || self.iosFilterAppIds.indexOf(elment.appid) == -1;
            });
            this.checkData();
            if (this.maxNum != null) {
                if (this.adData.length < this.maxNum) {
                    while (this.adData.length < this.maxNum) {
                        this.adData.push(this.adData[Math.floor(Math.random() * this.adData.length)]);
                    }
                } else if (this.adData.length > this.maxNum) {
                    while (this.adData.length > this.maxNum) {
                        this.adData.splice(Math.floor(Math.random() * this.adData.length), 1);
                    }
                }
            }
            this.reloadData();
            var unitNum = 0;
            var ceil = this.list.getCell(0);
            if (!ceil) return;
            //计算单元格对应滑动值
                        if (this.scrollDir == AdList.SCROLL_VERTICAL) {
                unitNum = Math.ceil(this.list.array.length / this.list.repeatX);
                console.log("行数：", unitNum);
                this.unitValue = (ceil.height + this.list.spaceY) / (unitNum * ceil.height + this.list.spaceY * (unitNum - 1) - this.list.height) * this.list.scrollBar.max;
                if (this.bFixHeigt) {
                    var listHeight = ceil.height * unitNum + this.list.spaceY * (unitNum - 1);
                    this.list.height = listHeight;
                }
            } else if (this.scrollDir == AdList.SCROLL_HORIZONTAL) {
                unitNum = Math.ceil(this.list.array.length / this.list.repeatY);
                this.unitValue = (ceil.width + this.list.spaceX) / (unitNum * ceil.width + this.list.spaceX * (unitNum - 1) - this.list.width) * this.list.scrollBar.max;
            }
            console.log("单元value" + this.unitValue);
            if (this.autoScroll) {
                Laya.stage.frameOnce(1, this, this.startAutoScrollAd);
            }
        }
        initHotIds() {
            var hotNum = Math.random() < .5 ? 3 : 4;
            var interval = Math.floor(this.adData.length / hotNum);
            for (var index = 0; index < hotNum; index++) {
                this.hotIds.push(Math.floor(interval * Math.random()) + index * interval);
            }
        }
        startAutoScrollAd() {
            if (!this.list) {
                return;
            }
            this.inAutoScroll = true;
        }
        onItemRender(item, index) {
            var data = this.list.array[index];
            if (!data) {
                item.visible = false;
                return;
            }
            var icon = item.getChildByName("icon");
            if (icon) {
                icon.loadImage(data.app_icon, null);
                let mask = icon.getChildByName("mask");
                if (mask) {
                    mask.width = icon.width;
                    mask.height = icon.height;
                }
            } else {
                var iconBox = item.getChildByName("iconBox");
                if (iconBox) {
                    var icon = iconBox.getChildByName("icon");
                    if (icon) {
                        icon.skin = data.app_icon;
                    }
                }
            }
            var name = item.getChildByName("name");
            if (name) {
                name.text = data.app_title;
            }
            var desc = item.getChildByName("desc");
            if (desc) {
                desc.text = data.app_desc;
            }
            // 多少人在玩
                        var people = item.getChildByName("people");
            if (people) {
                var num = Math.floor(Math.random() * 980 + 6);
                people.text = `${num / 10}万人在玩`;
            }
            if (this.isDataUpdate == true) {
                return;
            }
            var titleBg = item.getChildByName("titleBg");
            if (titleBg) {
                titleBg.index = Math.floor(titleBg.clipY * Math.random());
            }
            var tag = item.getChildByName("tag");
            if (tag) {
                if (this.hotIds.indexOf(index) > 0) {
                    tag.visible = true;
                    tag.index = Math.floor(tag.clipY * Math.random());
                } else {
                    tag.visible = false;
                }
            } else {
                var hotTag = item.getChildByName("hot");
                var newTag = item.getChildByName("new");
                hotTag && (hotTag.visible = false);
                newTag && (newTag.visible = false);
                if (this.hotIds.indexOf(index) > 0) {
                    if (hotTag && newTag) {
                        if (Math.random() < .5) {
                            hotTag.visible = true;
                        } else {
                            newTag.visible = true;
                        }
                    } else if (hotTag && !newTag) {
                        hotTag.visible = true;
                    } else if (newTag && !hotTag) {
                        newTag.visible = true;
                    }
                }
            }
        }
        onTouchEnd(e) {
            if (!this.list) {
                return;
            }
            if (!this.list.array) {
                return;
            }
            if (ADConfig.zs_slide_jump_switch && this.isRandomSelect && this.touchIndex == -1) {
                this.touchIndex = Math.floor(Math.random() * this.list.array.length);
                console.log("RandomSelect:" + this.touchIndex + " data list length:" + this.list.array.length);
            }
            this.onSelectAd(this.touchIndex);
            // console.log("onTouchEnd:" + this.touchIndex);
                        this.touchIndex = -1;
        }
        onMouseAd(e, index) {
            if (e.type == Laya.Event.MOUSE_DOWN) {
                this.touchIndex = index;
            }
            // console.log(e.type, this.touchIndex);
                }
        onSelectAd(index) {
            if (index == null || index == -1) {
                return;
            }
            if (!this.list) {
                return;
            }
            if (!this.list.array) {
                return;
            }
            var data = this.list.array[index];
            var self = this;
            self.isDataUpdate = true;
            zs.laya.sdk.ZSReportSdk.navigate2Mini(data, PlatformMgr.user_id, function() {
                Laya.stage.event(AdList.EVENT_NAVIGATE_SUCCESS);
            }, function() {
                Laya.stage.event(AdList.EVENT_NAVIGATE_FAILED);
                if (!self.notJumpFull) PlatformMgr.onExportJumpCancel();
            }, function() {
                self.list.selectedIndex = -1;
                self.checkChange(index);
                Laya.stage.event(AdList.EVENT_NAVIGATE_COMPLETED);
            }, {
                position: this.position
            });
        }
        params2String(args) {
            var params = args[0] + "=" + args[1];
            for (var index = 2; index < args.length; index += 2) {
                params += "&" + args[index] + "=" + args[index + 1];
            }
            return params;
        }
        onDragStateChanged(newState) {
            this.inAutoScroll = false;
            if (this.autoScroll && newState == 0) {
                this.passedTime = 0;
            }
        }
        onAwake() {
            this.list = this.owner;
            this.list.selectEnable = true;
            this.list.renderHandler = Laya.Handler.create(this, this.onItemRender, null, false);
            this.list.mouseHandler = Laya.Handler.create(this, this.onMouseAd, null, false);
        }
        onEnable() {
            this.owner.on(Laya.Event.MOUSE_UP, this, this.onTouchEnd);
            this.list.on(Laya.Event.MOUSE_UP, this, this.onDragStateChanged, [ 0 ]);
            this.list.on(Laya.Event.MOUSE_OUT, this, this.onDragStateChanged, [ 0 ]);
            this.list.on(Laya.Event.MOUSE_DOWN, this, this.onDragStateChanged, [ 1 ]);
        }
        onDisable() {
            this.owner.off(Laya.Event.MOUSE_UP, this, this.onTouchEnd);
            this.list.off(Laya.Event.MOUSE_UP, this, this.onDragStateChanged);
            this.list.off(Laya.Event.MOUSE_OUT, this, this.onDragStateChanged);
            this.list.off(Laya.Event.MOUSE_DOWN, this, this.onDragStateChanged);
        }
        onUpdate() {
            if (this.autoScroll && this.inAutoScroll == true && this.list && this.list.scrollBar && this.list.scrollBar.max) {
                if (this.list.scrollBar.value >= this.list.scrollBar.max) {
                    this.list.scrollBar.value = this.list.scrollBar.max;
                    this.scrollSpeed = 0 - this.scrollSpeed;
                    this.isEnd = true;
                } else if (this.list.scrollBar.value <= 0) {
                    this.list.scrollBar.value = 0;
                    this.scrollSpeed = 0 - this.scrollSpeed;
                    this.isEnd = true;
                }
                this.list.scrollBar.value += this.scrollSpeed;
                if (!this.unitValue || !this.isClockPendulum) return;
                this.isEnd = this.isEnd && this.changeValue != 0;
                this.changeValue += Math.abs(this.scrollSpeed);
                if (this.changeValue >= this.unitValue || this.isEnd) {
                    this.autoScroll = false;
                    this.isEnd = false;
                    this.changeValue = 0;
                    Laya.timer.once(this.waitTime, this, function() {
                        this.autoScroll = true;
                    });
                }
            }
            if (this.autoScroll && this.inAutoScroll == false) {
                this.passedTime += Laya.timer.delta;
                if (this.passedTime > this.dragSleep) {
                    this.startAutoScrollAd();
                }
            }
        }
        setFixHeight(val) {
            // 设置是否自动适配高度(list的height会根据内容自动变化)
            this.bFixHeigt = val;
        }
    }
    AdList.EVENT_NAVIGATE_SUCCESS = "NAVIGATE_SUCCESS";
    AdList.EVENT_NAVIGATE_FAILED = "NAVIGATE_FAILED";
    AdList.EVENT_NAVIGATE_COMPLETED = "NAVIGATE_COMPLETED";
    AdList.SCROLL_NONE = 0;
    AdList.SCROLL_VERTICAL = 1;
    AdList.SCROLL_HORIZONTAL = 2;
    Laya.ILaya.regClass(AdList);
    Laya.ClassUtils.regClass("zs.laya.platform.AdList", AdList);
    Laya.ClassUtils.regClass("Zhise.AdList", AdList);
    class AdList2 extends AdList {
        constructor() {
            super();
        }
        onItemRender(item, index) {
            var data = this.list.array[index];
            if (!data) {
                item.visible = false;
                return;
            }
            if (this.isDataUpdate == true) {
                return;
            }
            var icon = item.getChildByName("icon");
            if (icon) {
                if (index != 6) {
                    icon.visible = true;
                    icon.loadImage(data.app_icon, null);
                } else {
                    icon.visible = false;
                }
            }
            var name = item.getChildByName("name");
            if (name) {
                name.text = index != 6 ? data.app_title : "";
            }
            var desc = item.getChildByName("desc");
            if (desc) {
                desc.text = index != 6 ? data.app_desc : "";
            }
            var arrow = item.getChildByName("arrow");
            if (arrow) {
                arrow.visible = index == 6;
                if (index == 6) {
                    arrow.visible = true;
                    arrow.index = data.arrowIdx ? data.arrowIdx : 0;
                } else {
                    arrow.visible = false;
                }
            }
        }
        onSelectAd(index) {
            if (index == -1) {
                return;
            }
            var data = this.list.array[index];
            if (index == 6) {
                if (data.arrowIdx == null || data.arrowIdx == 0) {
                    data.arrowIdx = 1;
                    this.owner.event(AdList2.EVENT_AD_SWITCH_SHOW);
                } else {
                    data.arrowIdx = 0;
                    this.owner.event(AdList2.EVENT_AD_SWITCH_HIDE);
                }
                this.list.selectedIndex = -1;
                return;
            }
            var self = this;
            self.isDataUpdate = true;
            zs.laya.sdk.ZSReportSdk.navigate2Mini(data, PlatformMgr.user_id, function() {
                Laya.stage.event(AdList.EVENT_NAVIGATE_SUCCESS);
            }, function() {
                Laya.stage.event(AdList.EVENT_NAVIGATE_FAILED);
                PlatformMgr.onExportJumpCancel();
            }, function() {
                self.list.selectedIndex = -1;
                Laya.stage.event(AdList.EVENT_NAVIGATE_COMPLETED);
            }, {
                position: AdList.position
            });
        }
    }
    AdList2.EVENT_AD_SWITCH_SHOW = "EVENT_AD_SWITCH_SHOW";
    AdList2.EVENT_AD_SWITCH_HIDE = "EVENT_AD_SWITCH_HIDE";
    Laya.ILaya.regClass(AdList2);
    Laya.ClassUtils.regClass("zs.laya.platform.AdList2", AdList2);
    Laya.ClassUtils.regClass("Zhise.AdList2", AdList2);
    class ExportGameCtrl extends Laya.Script {
        constructor() {
            super();
            this.args = null;
            this.adView = null;
            this.monitorOtherPageOpen = false;
            this.visibleArr = null;
        }
        onEnable() {
            if (this.adView == null) {
                Laya.stage.on(PlatformMgr.AD_CONFIIG_LOADED, this, this.onStart);
            }
        }
        onDisable() {
            if (this.adView == null) {
                Laya.stage.off(PlatformMgr.AD_CONFIIG_LOADED, this, this.onStart);
            }
            if (this.monitorOtherPageOpen) {
                Laya.stage.off(PlatformMgr.UI_VIEW_OPENED, this, this.onViewOpened);
                Laya.stage.off(PlatformMgr.UI_VIEW_CLOSED, this, this.onViewClosed);
            }
        }
        onDestroy() {
            if (this.adView == null) {
                return;
            }
            for (var index = 0; index < this.adView.length; index++) {
                if (this.adView[index] != null) {
                    this.adView[index].destroy();
                }
            }
            this.adView = null;
        }
        onStart() {
            if (ADConfig.zs_Game_Page_time_switch && !ADConfig.zs_jump_switch) {
                Laya.stage.once("TIMER_DELAY_SHOW", this, this.onStart);
                return;
            }
            if (this.adView) {
                return;
            }
            if (ADConfig.zs_jump_switch == false || ADConfig.isPublicVersion() == false) {
                return;
            }
            var viewName = this.owner.url.substring(this.owner.url.lastIndexOf("/") + 1, this.owner.url.lastIndexOf("."));
            this.args = PlatformMgr.platformCfg.exportGameCfg[viewName];
            if (!this.args) {
                return;
            }
            this.monitorOtherPageOpen = false;
            for (var index = 0; index < this.args.length; index++) {
                var element = this.args[index];
                if (element.checkKey == null || ADConfig[element.checkKey]) {
                    this.monitorOtherPageOpen = this.monitorOtherPageOpen || element.isHide;
                }
            }
            if (this.monitorOtherPageOpen) {
                Laya.stage.on(PlatformMgr.UI_VIEW_OPENED, this, this.onViewOpened);
                Laya.stage.on(PlatformMgr.UI_VIEW_CLOSED, this, this.onViewClosed);
            }
            this.adView = [];
            for (var index = 0; index < this.args.length; index++) {
                var element = this.args[index];
                if (element.readonly) {
                    this.adView.push(null);
                } else if (element.checkKey == null || ADConfig[element.checkKey]) {
                    if (element.delayTime) {
                        Laya.timer.once(element.delayTime, this, () => {
                            Laya.loader.create(element.viewUrl, Laya.Handler.create(this, this.onPrefabReady), null, Laya.Loader.PREFAB);
                        });
                    } else {
                        Laya.loader.create(element.viewUrl, Laya.Handler.create(this, this.onPrefabReady), null, Laya.Loader.PREFAB);
                    }
                    break;
                } else {
                    this.adView.push(null);
                }
            }
        }
        onPrefabReady(prefab) {
            if (this.destroyed) {
                return;
            }
            var params = this.args[this.adView.length];
            var viewName = this.owner.url.substring(this.owner.url.lastIndexOf("/") + 1, this.owner.url.lastIndexOf("."));
            if (!this.findChildByPath(params.parentRoot)) {
                console.log(viewName + " page parentRoot " + params.parentRoot + " is null");
                return;
            }
            var scriptType = this.getViewScript(params.scriptType);
            if (scriptType == null) {
                console.log(viewName + " page" + params.viewUrl + " scriptType is null");
                return;
            }
            var view = prefab.create();
            this.findChildByPath(params.parentRoot).addChild(view);
            view.pos(params.x, params.y);
            // view.visible = this.owner.visible;
                        var script = view.getComponent(scriptType);
            if (script == null) {
                script = view.addComponent(scriptType);
            }
            if (params.adType) {
                script.initView(params);
            }
            this.adView.push(view);
            if (this.adView.length < this.args.length) {
                var next = this.args[this.adView.length];
                if (next.readonly) {
                    this.adView.push(null);
                } else if (next.checkKey == null || ADConfig[next.checkKey]) {
                    Laya.loader.create(next.viewUrl, Laya.Handler.create(this, this.onPrefabReady), null, Laya.Loader.PREFAB);
                } else {
                    this.adView.push(null);
                }
            }
        }
        getViewScript(type) {
            switch (type) {
              case "ExportScrollH":
                return ExportScrollH;
                break;

              case "ExportScrollV":
                return ExportScrollV;
                break;

              case "ExportScrollNone":
                return ExportScrollNone;
                break;

              case "ShakeExportBox":
                return ShakeExportBox;
                break;

              case "InviteBtn":
                return InviteBtn;
                break;

              case "FakeExitBtn":
                return FakeExitBtn;
                break;

              case "FloatExportBtn":
                return FloatExportBtn;
                break;

              case "ScreenExportBtn":
                return ScreenExportBtn;
                break;

              case "ExportLeftPop":
                return ExportLeftPop;
                break;

              case "ExportRightPop":
                return ExportRightPop;
                break;

              case "ExportLeftFlyBox":
                return ExportLeftFlyBox;
                break;

              case "ExportKnock":
                return ExportKnock;
                break;

              case "InviteBox":
                return InviteBox;
                break;
            }
        }
        onViewOpened(viewName) {
            if (viewName && this.adView) {
                this.visibleArr = [];
                for (var index = 0; index < this.adView.length; index++) {
                    if (this.adView[index] != null && this.args[index].isHide) {
                        this.visibleArr[index] = this.adView[index].visible;
                        this.adView[index].visible = false;
                    }
                }
            }
        }
        onViewClosed(viewName) {
            if (viewName && this.adView) {
                if (!this.visibleArr) {
                    return;
                }
                for (var index = 0; index < this.adView.length; index++) {
                    if (this.adView[index] != null && this.args[index].isHide) {
                        if (this.visibleArr[index]) {
                            this.adView[index].visible = this.visibleArr[index];
                        }
                    }
                }
            }
        }
        findChildByPath(path) {
            var nodes = path.split("/");
            var child = this.owner;
            for (var index = 0; index < nodes.length; index++) {
                child = child.getChildByName(nodes[index]);
            }
            return child;
        }
    }
    Laya.ILaya.regClass(ExportGameCtrl);
    Laya.ClassUtils.regClass("zs.laya.platform.ExportGameCtrl", ExportGameCtrl);
    Laya.ClassUtils.regClass("Zhise.ExportGameCtrl", ExportGameCtrl);
    class ExportScrollH extends Laya.Script {
        constructor() {
            super();
            this.adList = null;
        }
        initView(data) {
            this.adList = this.owner.getChildByName("adList").addComponent(AdList);
            var appConfig = PlatformMgr.platformCfg;
            /**导出位类型，是否自动滚动，滚动方向，ios是否屏蔽id，列表显示的最大个数，是否随机选择,是否移动一个暂停一下 */            this.adList.requestAdData(data.adType, true, AdList.SCROLL_HORIZONTAL, appConfig.iosFilterAppIds, data.position, null, false, data.isClockPendulum);
        }
    }
    Laya.ILaya.regClass(ExportScrollH);
    Laya.ClassUtils.regClass("zs.laya.platform.ExportScrollH", ExportScrollH);
    Laya.ClassUtils.regClass("Zhise.ExportScrollH", ExportScrollH);
    class ExportScrollV extends Laya.Script {
        constructor() {
            super();
            this.adList = null;
        }
        initView(data) {
            this.adList = this.owner.getChildByName("adList").addComponent(AdList);
            var appConfig = PlatformMgr.platformCfg;
            /**导出位类型，是否自动滚动，滚动方向，ios是否屏蔽id，列表显示的最大个数，是否随机选择,是否移动一个暂停一下 */            this.adList.requestAdData(data.adType, true, AdList.SCROLL_VERTICAL, appConfig.iosFilterAppIds, data.position, null, false, data.isClockPendulum);
        }
    }
    Laya.ILaya.regClass(ExportScrollV);
    Laya.ClassUtils.regClass("zs.laya.platform.ExportScrollV", ExportScrollV);
    Laya.ClassUtils.regClass("Zhise.ExportScrollV", ExportScrollV);
    class ExportScrollNone extends Laya.Script {
        constructor() {
            super();
            this.adList = null;
            // AdList;
                }
        initView(data) {
            this.adList = this.owner.getChildByName("adList").addComponent(AdList);
            var appConfig = PlatformMgr.platformCfg;
            this.adList.requestAdData(data.adType, false, AdList.SCROLL_NONE, appConfig.iosFilterAppIds, data.position, null, false, data.isClockPendulum);
        }
    }
    Laya.ILaya.regClass(ExportScrollNone);
    Laya.ClassUtils.regClass("zs.laya.platform.ExportScrollNone", ExportScrollNone);
    Laya.ClassUtils.regClass("Zhise.ExportScrollNone", ExportScrollNone);
    class ShakeExportIcon extends Laya.Script {
        constructor() {
            super();
            this.list = null;
            this.delayAnimTime = 1e3;
            this.animIntervalTime = 1500;
            this.animDuaration = 500;
            this.adIdx = 0;
            this.rotOffset = 20;
            this.loopTime = 8;
            this.currentAdData = null;
            this.adDataArr = null;
            this.subAnimDuaration = 0;
            this.maxNum = 4;
        }
        initAd(adArr) {
            this.adDataArr = adArr;
            this.allData = {};
            var self = this;
            for (let i = 0; i < self.adDataArr.length; i++) {
                self.allData[self.adDataArr[i].app_title] || (self.allData[self.adDataArr[i].app_title] = []);
                self.allData[self.adDataArr[i].app_title].push(self.adDataArr[i]);
            }
            self.checkData();
            this.adIdx %= this.adDataArr.length;
            this.onItemRender(this.adDataArr[this.adIdx]);
            this.owner.timerLoop(this.delayAnimTime + this.animIntervalTime, this, this.freshAdItems);
        }
        checkChange(index) {
            var key = this.adDataArr[index].app_title;
            var checkDatas = Laya.LocalStorage.getItem("CheckDatas");
            try {
                checkDatas = JSON.parse(checkDatas);
                checkDatas || (checkDatas = {});
            } catch (e) {
                checkDatas = {};
            }
            if (!this.allData[key] || this.allData[key].length <= 1) return;
            checkDatas[key] || (checkDatas[key] = {
                cur: 0
            });
            checkDatas[key].cur++;
            this.adDataArr[index] = this.allData[key][checkDatas[key].cur % this.allData[key].length];
            this.onItemRender(this.adDataArr[index]);
            Laya.LocalStorage.setItem("CheckDatas", JSON.stringify(checkDatas));
        }
        checkData() {
            var checkDatas = Laya.LocalStorage.getItem("CheckDatas");
            try {
                checkDatas = JSON.parse(checkDatas);
                checkDatas || (checkDatas = {});
            } catch (e) {
                checkDatas = {};
            }
            for (let i = 0; i < this.adDataArr.length; i++) {
                if (!checkDatas[this.adDataArr[i].app_title]) {
                    checkDatas[this.adDataArr[i].app_title] = {
                        cur: 0
                    };
                }
            }
            this.adDataArr = [];
            for (let key in checkDatas) {
                this.allData[key] && this.adDataArr.push(this.allData[key][checkDatas[key].cur % this.allData[key].length]);
            }
        }
        freshAdItems() {
            this.adIdx += this.maxNum;
            this.adIdx %= this.adDataArr.length;
            this.onItemRender(this.adDataArr[this.adIdx]);
            this.playShakeAnim(0);
        }
        playShakeAnim(idx) {
            if (idx >= this.loopTime) {
                return;
            }
            var uiComp = this.owner;
            switch (idx % this.loopTime) {
              case 0:
                Laya.Tween.to(uiComp, {
                    rotation: this.rotOffset
                }, this.subAnimDuaration, Laya.Ease.linearNone, Laya.Handler.create(this, this.playShakeAnim, [ idx + 1 ]));
                break;

              case 1:
                Laya.Tween.to(uiComp, {
                    rotation: 0
                }, this.subAnimDuaration, Laya.Ease.linearNone, Laya.Handler.create(this, this.playShakeAnim, [ idx + 1 ]));
                break;

              case 2:
                Laya.Tween.to(uiComp, {
                    rotation: this.rotOffset
                }, this.subAnimDuaration, Laya.Ease.linearNone, Laya.Handler.create(this, this.playShakeAnim, [ idx + 1 ]));
                break;

              case 3:
                Laya.Tween.to(uiComp, {
                    rotation: 0
                }, this.subAnimDuaration, Laya.Ease.linearNone, Laya.Handler.create(this, this.playShakeAnim, [ idx + 1 ]));
                break;
            }
        }
        onItemRender(adData) {
            if (adData == null) {
                if (this.currentAdData == null) {
                    this.owner.visible = false;
                }
                return;
            }
            this.currentAdData = adData;
            this.owner.visible = true;
            var item = this.owner;
            var icon = item.getChildByName("icon");
            if (icon) {
                icon.loadImage(adData.app_icon, null);
            }
            var name = item.getChildByName("name");
            if (name) {
                name.text = adData.app_title;
            }
            var desc = item.getChildByName("desc");
            if (desc) {
                desc.text = adData.app_desc;
            }
        }
        onClick() {
            var self = this;
            var data = this.adDataArr[self.adIdx];
            zs.laya.sdk.ZSReportSdk.navigate2Mini(data, PlatformMgr.user_id, function() {
                Laya.stage.event(AdList.EVENT_NAVIGATE_SUCCESS);
            }, function() {
                Laya.stage.event(AdList.EVENT_NAVIGATE_FAILED);
                PlatformMgr.onExportJumpCancel();
            }, function() {
                self.checkChange(self.adIdx);
            }, {
                position: "首页浮动导出"
            });
        }
        onStart() {
            this.subAnimDuaration = this.animDuaration / this.loopTime;
            console.log("this.subAnimDuaration", this.subAnimDuaration);
        }
    }
    Laya.ILaya.regClass(ShakeExportIcon);
    Laya.ClassUtils.regClass("zs.laya.platform.ShakeExportIcon", ShakeExportIcon);
    Laya.ClassUtils.regClass("Zhise.ShakeExportIcon", ShakeExportIcon);
    class ShakeExportBox extends Laya.Script {
        constructor() {
            super();
            this.adType = 0;
            this.iconScriptArr = [];
        }
        initView(data) {
            this.adType = data.adType;
            var num = this.owner.numChildren;
            for (var index = 0; index < num; index++) {
                var element = this.owner.getChildAt(index);
                var zsGameIcon = element.addComponent(ShakeExportIcon);
                zsGameIcon.adIdx = index;
                zsGameIcon.maxNum = num;
                this.iconScriptArr.push(zsGameIcon);
            }
            this.requestAdData();
        }
        requestAdData() {
            var self = this;
            zs.laya.sdk.ZSReportSdk.loadAd(data => {
                var adData = data[self.adType.toString()];
                adData = adData.filter(function(elment) {
                    return Laya.Browser.onAndroid || elment.appid != "wx48820730357d81a6" && elment.appid != "wxc136d75bfc63107c";
                });
                for (var index = 0; index < self.iconScriptArr.length; index++) {
                    var zsGameIcon = self.iconScriptArr[index];
                    zsGameIcon.initAd(adData);
                }
            });
        }
    }
    Laya.ILaya.regClass(ShakeExportBox);
    Laya.ClassUtils.regClass("zs.laya.platform.ShakeExportBox", ShakeExportBox);
    Laya.ClassUtils.regClass("Zhise.ShakeExportBox", ShakeExportBox);
    class FakeExitBtn extends Laya.Script {
        constructor() {
            super();
        }
        onAwake() {
            this.owner.mouseEnabled = true;
            this.owner.visible = ADConfig.zs_jump_switch && ADConfig.isPublicVersion() && ADConfig.zs_history_list_jump;
        }
        onClick() {
            Laya.SoundManager.playSound(PlatformMgr.soundClick);
            this.owner.mouseEnabled = false;
            PlatformMgr.showListAd();
            this.owner.mouseEnabled = true;
        }
    }
    Laya.ILaya.regClass(FakeExitBtn);
    Laya.ClassUtils.regClass("zs.laya.platform.FakeExitBtn", FakeExitBtn);
    Laya.ClassUtils.regClass("Zhise.FakeExitBtn", FakeExitBtn);
    class FloatExportBtn extends Laya.Script {
        constructor() {
            super();
        }
        onAwake() {
            this.owner.mouseEnabled = true;
            this.owner.visible = ADConfig.zs_jump_switch && ADConfig.isPublicVersion() && ADConfig.zs_history_list_jump;
        }
        onClick() {
            Laya.SoundManager.playSound(PlatformMgr.soundClick);
            this.owner.mouseEnabled = false;
            PlatformMgr.showHomeFloatAd();
            this.owner.mouseEnabled = true;
        }
    }
    Laya.ILaya.regClass(FloatExportBtn);
    Laya.ClassUtils.regClass("zs.laya.platform.FloatExportBtn", FloatExportBtn);
    Laya.ClassUtils.regClass("Zhise.FloatExportBtn", FloatExportBtn);
    class ScreenExportBtn extends Laya.Script {
        constructor() {
            super();
        }
        onAwake() {
            this.owner.mouseEnabled = true;
            this.owner.visible = ADConfig.zs_jump_switch && ADConfig.isPublicVersion() && ADConfig.zs_history_list_jump;
        }
        onClick() {
            Laya.SoundManager.playSound(PlatformMgr.soundClick);
            this.owner.mouseEnabled = false;
            PlatformMgr.showScreenAd();
            this.owner.mouseEnabled = true;
        }
    }
    Laya.ILaya.regClass(ScreenExportBtn);
    Laya.ClassUtils.regClass("zs.laya.platform.ScreenExportBtn", ScreenExportBtn);
    Laya.ClassUtils.regClass("Zhise.ScreenExportBtn", ScreenExportBtn);
    /**邀请或者分享按钮 */    class InviteBtn extends Laya.Script {
        constructor() {
            super();
        }
        onClick() {
            console.log("openInvite");
            Laya.SoundManager.playSound(PlatformMgr.soundClick);
            zs.laya.sdk.SdkService.openShare(zs.laya.platform.ADConfig.zs_share_title, zs.laya.platform.ADConfig.zs_share_image);
        }
    }
    Laya.ILaya.regClass(InviteBtn);
    Laya.ClassUtils.regClass("zs.laya.platform.InviteBtn", InviteBtn);
    Laya.ClassUtils.regClass("Zhise.InviteBtn", InviteBtn);
    class ExportLeftPop extends Laya.Script {
        constructor() {
            super();
            this.srcX = 0;
            this.adList = null;
            // AdList;
                        this.adCheckBox = null;
            // Laya.Image;
                }
        initView(data) {
            this.srcX = this.owner.x;
            this.adList = this.owner.getChildByName("adList").addComponent(AdList);
            this.adCheckBox = this.owner.getChildByName("adCheckBox");
            this.adCheckBox.on(Laya.Event.CLICK, this, this.updateFloatPos);
            var appConfig = PlatformMgr.platformCfg;
            this.adList.requestAdData(data.adType, true, AdList.SCROLL_VERTICAL, appConfig.iosFilterAppIds, data.position, null, false, true);
            if (ADConfig.zs_switch && !ExportLeftPop.firstEnter) {
                this.adCheckBox.selected = true;
                this.updateFloatPos();
            }
            if (ExportLeftPop.firstEnter) {
                ExportLeftPop.firstEnter = false;
            }
        }
        onDestroy() {
            this.adCheckBox.off(Laya.Event.CLICK, this, this.updateFloatPos);
        }
        updateFloatPos() {
            zs.laya.sdk.SdkService.hideUserInfoButton();
            this.adCheckBox.mouseEnabled = false;
            if (this.adCheckBox.selected) {
                Laya.Tween.to(this.owner, {
                    x: 0
                }, 500, null, Laya.Handler.create(this, this.onTweenCompleted));
            } else {
                Laya.Tween.to(this.owner, {
                    x: this.srcX
                }, 500, null, Laya.Handler.create(this, this.onTweenCompleted));
            }
        }
        onTweenCompleted() {
            this.adCheckBox.mouseEnabled = true;
            if (this.adCheckBox.selected == false) {
                zs.laya.sdk.SdkService.showUserInfoButton();
            }
        }
    }
    ExportLeftPop.firstEnter = true;
    Laya.ILaya.regClass(ExportLeftPop);
    Laya.ClassUtils.regClass("zs.laya.platform.ExportLeftPop", ExportLeftPop);
    Laya.ClassUtils.regClass("Zhise.ExportLeftPop", ExportLeftPop);
    class ExportRightPop extends Laya.Script {
        constructor() {
            super();
            this.adFrame = null;
            this.adList = null;
        }
        initView(data) {
            this.adFrame = this.owner.getChildByName("adFrame");
            this.adList = this.owner.getChildByName("adList").addComponent(AdList2);
            var appConfig = PlatformMgr.platformCfg;
            this.adList.requestAdData(data.adType, false, AdList.SCROLL_NONE, appConfig.iosFilterAppIds, data.position, 9);
            this.adList.owner.on(AdList2.EVENT_AD_SWITCH_HIDE, this, this.onAdHide);
            this.adList.owner.on(AdList2.EVENT_AD_SWITCH_SHOW, this, this.onAdShow);
        }
        onAdHide() {
            this.adList.owner.mouseEnabled = false;
            Laya.Tween.to(this.owner, {
                x: -150
            }, 500, null, Laya.Handler.create(this, this.onTweenCompleted));
        }
        onAdShow() {
            this.adList.owner.mouseEnabled = false;
            Laya.Tween.to(this.owner, {
                x: -450
            }, 500, null, Laya.Handler.create(this, this.onTweenCompleted));
        }
        onTweenCompleted() {
            this.adList.owner.mouseEnabled = true;
        }
    }
    Laya.ILaya.regClass(ExportRightPop);
    Laya.ClassUtils.regClass("zs.laya.platform.ExportRightPop", ExportRightPop);
    Laya.ClassUtils.regClass("Zhise.ExportRightPop", ExportRightPop);
    class ExportLeftFlyBox extends Laya.Script {
        constructor() {
            super();
            this.isClick = false;
            this.adData = [];
            this.unData = [];
            this.showNum = 0;
        }
        initView(params) {
            if (!ADConfig.zs_jump_switch || !ADConfig.isPublicVersion()) {
                this.owner.visible = false;
                return;
            }
            this.showNum = this.owner.numChildren;
            var self = this;
            for (var i = 0; i < this.showNum; i++) {
                var box = this.owner.getChildByName("ad_" + i);
                if (box) {
                    //播放动画
                    Laya.Tween.from(box, {
                        rotation: 360,
                        x: box.x - 500
                    }, 700, null, Laya.Handler.create(this, function() {
                        self.isClick = true;
                    }));
                }
            }
            var adType = params.adType.toString();
            zs.laya.sdk.ZSReportSdk.loadAd(data => {
                self.adData = data[adType];
                self.freshAdBox();
            });
        }
        freshAdBox() {
            var appConfig = PlatformMgr.platformCfg;
            this.adData = this.adData.filter(function(elment) {
                return Laya.Browser.onAndroid || appConfig.iosFilterAppIds.indexOf(elment.appid) == -1;
            });
            //随机选取6个数据
                        if (this.adData.length < this.showNum) {
                while (this.adData.length < this.showNum) {
                    this.adData.push(this.adData[Math.floor(Math.random() * this.adData.length)]);
                }
            } else if (this.adData.length > this.showNum) {
                while (this.adData.length > this.showNum) {
                    var data = this.adData.splice(Math.floor(Math.random() * this.adData.length), 1);
                    this.unData.push(data[0]);
                }
            }
            for (var i = 0; i < this.showNum; i++) {
                var adItemData = this.adData[i];
                if (!adItemData) {
                    continue;
                }
                var box = this.owner.getChildByName("ad_" + i);
                if (box) {
                    var icon = box.getChildByName("icon");
                    if (icon) {
                        icon.loadImage(adItemData.app_icon, null);
                    }
                    var name = box.getChildByName("name");
                    if (name) {
                        name.text = adItemData.app_title;
                    }
                    var titleBg = box.getChildByName("titleBg");
                    if (titleBg) {
                        titleBg.index = Math.floor(titleBg.clipY * Math.random());
                    }
                    var tag = box.getChildByName("tag");
                    if (tag) {
                        if (i < 2) {
                            tag.visible = true;
                            tag.index = Math.floor(tag.clipY * Math.random());
                        } else {
                            tag.visible = false;
                        }
                    }
                    box.on(Laya.Event.CLICK, this, this.onBoxClick, [ i ]);
                }
            }
        }
        onBoxClick(i) {
            if (!this.isClick) return;
            zs.laya.sdk.ZSReportSdk.navigate2Mini(this.adData[i], PlatformMgr.user_id, function() {
                Laya.stage.event(AdList.EVENT_NAVIGATE_SUCCESS);
            }, function() {
                Laya.stage.event(AdList.EVENT_NAVIGATE_FAILED);
                // PlatformMgr.onExportJumpCancel();
                                if (zs.laya.platform.ADConfig.zs_switch && zs.laya.platform.ADConfig.zs_reminder_switch) Laya.Scene.open("view/ad/ChallengePage.scene", false);
            }, function() {}, {
                position: "结算页导出"
            });
            //更换该位置的数据
                        if (this.unData.length > 0) {
                var data = this.unData.splice(Math.floor(Math.random() * this.unData.length), 1);
                this.unData.push(this.adData.splice(i, 1, data[0])[0]);
                var box = this.owner.getChildByName("ad_" + i);
                var adItemData = this.adData[i];
                if (!adItemData) {
                    return;
                }
                if (box) {
                    var icon = box.getChildByName("icon");
                    if (icon) {
                        icon.loadImage(adItemData.app_icon, null);
                    }
                    var name = box.getChildByName("name");
                    if (name) {
                        name.text = adItemData.app_title;
                    }
                    var titleBg = box.getChildByName("titleBg");
                    if (titleBg) {
                        titleBg.index = Math.floor(titleBg.clipY * Math.random());
                    }
                    var tag = box.getChildByName("tag");
                    if (tag) {
                        if (i < 2) {
                            tag.visible = true;
                            tag.index = Math.floor(tag.clipY * Math.random());
                        } else {
                            tag.visible = false;
                        }
                    }
                }
            }
        }
    }
    Laya.ILaya.regClass(ExportLeftFlyBox);
    Laya.ClassUtils.regClass("zs.laya.platform.ExportLeftFlyBox", ExportLeftFlyBox);
    Laya.ClassUtils.regClass("Zhise.ExportLeftFlyBox", ExportLeftFlyBox);
    class ExportKnock extends Laya.Script {
        constructor() {
            super();
            this.adType = "promotion";
            this.iconScriptArr = [];
            this.adData = null;
            this.allData = {};
            this.maxLength = 6;
            this.adList = null;
            this.knockAni = null;
            this.knockAniBox = null;
            this.posX = 0;
            this.posY = 0;
            this.knockIndex = 0;
        }
        onAwake() {
            super.onAwake();
            this.knockAni = this.owner["ani_knock"];
            this.adList = this.owner.getChildByName("adList");
            this.knockAniBox = this.owner.getChildByName("box_ani");
            this.knockAniBox.visible = false;
            this.adList.selectEnable = true;
            this.adList.visible = zs.laya.platform.ADConfig.isPublicVersion();
        }
        onEnable() {
            super.onEnable();
            this.initEvent();
            this.initData();
            this.knockAni.on(Laya.Event.COMPLETE, this, this.onAniComplete);
            this.startKnock();
        }
        initView(params) {
            this.adType = params.adType.toString();
        }
        initEvent() {
            this.adList.renderHandler = Laya.Handler.create(this, this.onItemRender, null, false);
            this.adList.mouseHandler = Laya.Handler.create(this, this.onMouseAd, null, false);
        }
        onItemRender(item, index) {
            var data = this.adList.array[index];
            this.refreshItemByDate(item, data);
        }
        onMouseAd(e, index) {
            if (e.type == "click") {
                zs.laya.sdk.ZSReportSdk.navigate2Mini(this.adData[index], PlatformMgr.user_id, () => {
                    Laya.stage.event(AdList.EVENT_NAVIGATE_SUCCESS);
                }, () => {
                    Laya.stage.event(AdList.EVENT_NAVIGATE_FAILED);
                }, () => {
                    this.checkChange(index);
                });
            }
        }
        refreshItemByDate(item, data) {
            var icon = item.getChildByName("icon");
            var name = item.getChildByName("name");
            icon.loadImage(data.app_icon);
            name.changeText(data.app_title);
        }
        checkChange(index) {
            var key = this.adData[index].app_title;
            var checkDatas = Laya.LocalStorage.getItem("CheckDatas");
            try {
                checkDatas = JSON.parse(checkDatas);
                checkDatas || (checkDatas = {});
            } catch (e) {
                checkDatas = {};
            }
            if (!this.allData[key] || this.allData[key].length <= 1) return;
            checkDatas[key] || (checkDatas[key] = {
                cur: 0
            });
            checkDatas[key].cur++;
            this.adData[index] = this.allData[key][checkDatas[key].cur % this.allData[key].length];
            this.adList.setItem(index, this.adData[index]);
            Laya.LocalStorage.setItem("CheckDatas", JSON.stringify(checkDatas));
        }
        initData() {
            let self = this;
            zs.laya.sdk.ZSReportSdk.loadAd(data => {
                this.adData = data[this.adType.toString()];
                self.allData = {};
                for (let i = 0; i < self.adData.length; i++) {
                    self.allData[self.adData[i].app_title] || (self.allData[self.adData[i].app_title] = []);
                    self.allData[self.adData[i].app_title].push(self.adData[i]);
                }
                this.checkData();
                this.updateItem();
            });
        }
        checkData() {
            var checkDatas = Laya.LocalStorage.getItem("CheckDatas");
            try {
                checkDatas = JSON.parse(checkDatas);
                checkDatas || (checkDatas = {});
            } catch (e) {
                checkDatas = {};
            }
            for (let i = 0; i < this.adData.length; i++) {
                if (!checkDatas[this.adData[i].app_title]) {
                    checkDatas[this.adData[i].app_title] = {
                        cur: 0
                    };
                }
            }
            this.adData = [];
            for (let key in checkDatas) {
                this.allData[key] && this.adData.push(this.allData[key][checkDatas[key].cur % this.allData[key].length]);
            }
        }
        updateItem() {
            var adData = [];
            this.adData.sort(() => {
                return Math.random() > .5 ? 1 : -1;
            });
            for (let index = 0; index < this.maxLength; index++) {
                adData.push(this.adData[index]);
            }
            this.adList.array = adData;
        }
        startKnock() {
            var enterDelay = 1e3;
            //进界面后多久开始砸导出
                        Laya.timer.once(enterDelay, this, this.knockExportIcon, null, false);
        }
        knockExportIcon() {
            var hammerTime = 5e3;
            if (this.adList && this.adList.array) {
                var idx = Math.floor(Math.random() * this.adList.array.length);
                this.knockIndex = idx;
                var cell = this.adList.getCell(idx);
                var globalPoint;
                cell.mouseEnabled = false;
                globalPoint = Laya.Point.create().setTo(cell.width / 2, cell.height / 2);
                globalPoint = cell.localToGlobal(globalPoint);
                var targetPoint = this.owner.globalToLocal(globalPoint);
                this.posX = targetPoint.x;
                this.posY = targetPoint.y;
                this.knockAniBox.pos(targetPoint.x, targetPoint.y - 27);
                this.knockAniBox.visible = true;
                this.knockAni.play(0, false);
                Laya.timer.once(hammerTime, this, this.knockExportIcon, null, false);
            }
        }
        onAniComplete() {
            this.knockAniBox.visible = false;
            var cell = this.adList.getCell(this.knockIndex);
            this.playScaleEff(cell);
        }
        playScaleEff(cell) {
            var scaleTime = 500;
            //缩小
                        Laya.Tween.to(cell, {
                scaleX: 0,
                scaleY: 0
            }, scaleTime, Laya.Ease.bounceIn, Laya.Handler.create(this, () => {
                // 换图
                this.refreshSingleItem(this.knockIndex);
                // 放大
                                Laya.Tween.to(cell, {
                    scaleX: 1,
                    scaleY: 1
                }, scaleTime, Laya.Ease.bounceIn, Laya.Handler.create(this, () => {
                    cell.mouseEnabled = true;
                }));
            }));
        }
        refreshSingleItem(index) {
            // 筛选当前没有的
            var filterArr = this.adData.filter(x => !this.adList.array.some(datas => x.app_id === datas.app_id));
            var randomIdx = Math.floor(Math.random() * filterArr.length);
            var data = filterArr[randomIdx];
            this.adList.setItem(index, data);
        }
    }
    Laya.ILaya.regClass(ExportKnock);
    Laya.ClassUtils.regClass("zs.laya.platform.ExportKnock", ExportKnock);
    Laya.ClassUtils.regClass("Zhise.ExportKnock", ExportKnock);
    class InviteBox extends Laya.Script {
        constructor() {
            super();
            this.lab_name = null;
            this.lab_invite = null;
            this.img_bg = null;
            this.adData = null;
            this.jsonUrl = null;
            this.jsonData = [];
            this.isShow = false;
        }
        initView(params) {
            this.owner.visible = false;
            let s = this;
            if (!zs.laya.platform.ADConfig.zs_switch || !zs.laya.platform.ADConfig.zs_false_news_switch) {
                this.owner.destroy();
                return;
            }
            this.jsonUrl = params && params.jsonUrl && params.jsonUrl.toString();
            if (this.jsonUrl) {
                Laya.loader.load(this.jsonUrl, Laya.Handler.create(this, function(json) {
                    for (let i = 0; i < json.length; i++) {
                        this.jsonData.push(json[i]);
                    }
                    zs.laya.sdk.ZSReportSdk.loadAd(data => {
                        let adType = params && params.adType ? params.adType : "promotion";
                        var adData = data[adType];
                        if (adData && adData.length > 0) {
                            adData = adData.filter(function(elment) {
                                return Laya.Browser.onAndroid || elment.appid != "wx48820730357d81a6" && elment.appid != "wxc136d75bfc63107c";
                            });
                            s.adData = adData[Math.floor(Math.random() * adData.length)];
                            if (!s.isShow && s.jsonData.length > 0) {
                                s.isShow = true;
                                s.initUI();
                            } else {
                                this.owner.destroy();
                            }
                        } else {
                            s.owner.destroy();
                        }
                    });
                }));
            } else {
                this.owner.destroy();
            }
        }
        onAwake() {
            this.lab_name = this.owner.getChildByName("lab_name");
            this.lab_invite = this.owner.getChildByName("lab_invite");
            this.img_bg = this.owner.getChildByName("img_bg");
        }
        initUI() {
            this.lab_name = this.owner.getChildByName("lab_name");
            this.lab_invite = this.owner.getChildByName("lab_invite");
            this.img_bg = this.owner.getChildByName("img_bg");
            this.owner.visible = true;
            let userInfo = this.jsonData[Math.floor(Math.random() * this.jsonData.length)];
            this.lab_name.text = userInfo.nickname;
            this.lab_invite.text = "邀请您一起玩   " + this.adData.app_title;
            this.img_bg.on(Laya.Event.CLICK, this, this.onBgClick);
            this.owner.y = 0 - this.owner.height;
            this.owner.centerX = 0;
            Laya.SoundManager.playSound("sound/getChat.mp3");
            zs.laya.sdk.DeviceService.VibrateShort();
            Laya.Tween.to(this.owner, {
                y: 100
            }, 500);
        }
        onBgClick() {
            zs.laya.sdk.ZSReportSdk.navigate2Mini(this.adData, PlatformMgr.user_id, function() {
                Laya.stage.event(AdList.EVENT_NAVIGATE_SUCCESS);
            }, function() {
                Laya.stage.event(AdList.EVENT_NAVIGATE_FAILED);
                if (zs.laya.platform.ADConfig.zs_switch && zs.laya.platform.ADConfig.zs_reminder_switch) PlatformMgr.showChallengeView();
            }, function() {});
            Laya.Tween.to(this.owner, {
                y: 0 - this.owner.height
            }, 500);
        }
    }
    Laya.ILaya.regClass(InviteBox);
    Laya.ClassUtils.regClass("zs.laya.platform.InviteBox", InviteBox);
    Laya.ClassUtils.regClass("Zhise.InviteBox", InviteBox);
    class ChallengeView extends zs.laya.base.ZhiSeView {
        constructor() {
            super();
            this.btn_suc = null;
            this.btn_fail = null;
            this.img_icon = null;
            this.img_avater = null;
            this.lab_invite = null;
            this.lab_name = null;
            this.lab_appName = null;
            this.adData = null;
            this.jsonData = [];
            this.jsonUrl = null;
            this.isShow = false;
        }
        onAwake() {
            super.onAwake();
            let middleUI = this.owner.getChildByName("middleUI");
            if (middleUI) {
                this.btn_suc = middleUI.getChildByName("btn_suc");
                this.btn_fail = middleUI.getChildByName("btn_fail");
                this.img_icon = middleUI.getChildByName("img_icon");
                this.img_avater = middleUI.getChildByName("img_avater");
                this.lab_invite = middleUI.getChildByName("lab_invite");
                this.lab_name = middleUI.getChildByName("lab_name");
                this.lab_appName = middleUI.getChildByName("lab_appName");
            }
        }
        onStart() {
            super.onStart();
        }
        initView(params) {
            var viewName = this.owner.url.substring(this.owner.url.lastIndexOf("/") + 1, this.owner.url.lastIndexOf("."));
            var args = PlatformMgr.platformCfg.exportGameCfg[viewName];
            this.jsonUrl = args && args[0] && args[0].jsonUrl && args[0].jsonUrl.toString() || "config/nickname.json";
            if (this.jsonUrl) {
                Laya.loader.load(this.jsonUrl, Laya.Handler.create(this, function(json) {
                    for (let i = 0; i < json.length; i++) {
                        this.jsonData.push(json[i]);
                    }
                    this.owner.visible = false;
                    let s = this;
                    zs.laya.sdk.ZSReportSdk.loadAd(data => {
                        var adData = data["promotion"];
                        adData = adData.filter(function(elment) {
                            return Laya.Browser.onAndroid || elment.appid != "wx48820730357d81a6" && elment.appid != "wxc136d75bfc63107c";
                        });
                        s.adData = adData[Math.floor(Math.random() * adData.length)];
                        if (!s.isShow && s.jsonData.length > 0) {
                            s.isShow = true;
                            s.initUI();
                        } else {
                            s.owner.destroy();
                        }
                    });
                }));
            } else {
                this.owner.destroy();
            }
        }
        initUI() {
            this.owner["visible"] = true;
            let player = this.jsonData[Math.floor(Math.random() * this.jsonData.length)];
            //PlayerData.Instance.randowData;
                        this.lab_name.text = player.nickname;
            this.lab_invite.text = '您的好友"' + this.checkStr(player.nickname) + '"向您发起挑战:';
            this.lab_appName.text = this.adData.app_title;
            this.img_avater.skin = player.avatar;
            this.img_icon.skin = this.adData.app_icon;
            this.btn_suc.on(Laya.Event.CLICK, this, this.onSucClick);
            this.btn_fail.on(Laya.Event.CLICK, this, this.closeView);
        }
        checkStr(str) {
            if (str.length >= 7) {
                str = str.substring(0, 5) + "...";
            }
            return str;
        }
        onSucClick() {
            this.owner.close();
            zs.laya.sdk.ZSReportSdk.navigate2Mini(this.adData, PlatformMgr.user_id, function() {
                Laya.stage.event(AdList.EVENT_NAVIGATE_SUCCESS);
            }, function() {
                Laya.stage.event(AdList.EVENT_NAVIGATE_FAILED);
            }, function() {});
        }
        closeView() {
            this.owner.close();
        }
    }
    Laya.ILaya.regClass(ChallengeView);
    Laya.ClassUtils.regClass("zs.laya.platform.ChallengeView", ChallengeView);
    Laya.ClassUtils.regClass("Zhise.ChallengeView", ChallengeView);
    class HomeFloatAdView extends zs.laya.base.ZhiSeView {
        constructor() {
            super();
            this.adList = null;
            this.closeBtn = null;
        }
        onAwake() {
            super.onAwake();
            var topUI = this.owner.getChildByName("topUI");
            var adListUI;
            if (topUI) {
                adListUI = topUI.getChildByName("adList");
                this.closeBtn = topUI.getChildByName("closeBtn");
            }
            var middleUI = this.owner.getChildByName("middleUI");
            if (middleUI) {
                adListUI = adListUI || middleUI.getChildByName("adList");
                this.closeBtn = this.closeBtn || middleUI.getChildByName("closeBtn");
            }
            var bottomUI = this.owner.getChildByName("bottomUI");
            if (bottomUI) {
                this.closeBtn = this.closeBtn || bottomUI.getChildByName("closeBtn");
            }
            this.adList = adListUI.addComponent(AdList);
            this.closeBtn.on(Laya.Event.CLICK, this, this.closeView);
        }
        onDestroy() {
            this.closeBtn.off(Laya.Event.CLICK, this, this.closeView);
        }
        onStart() {
            var viewName = this.owner.url.substring(this.owner.url.lastIndexOf("/") + 1, this.owner.url.lastIndexOf("."));
            var args = PlatformMgr.platformCfg.exportGameCfg[viewName];
            var appConfig = PlatformMgr.platformCfg;
            this.adList.requestAdData(args ? args[0].adType : "promotion", false, AdList.SCROLL_NONE, appConfig.iosFilterAppIds, args[0].position, 9);
        }
        closeView() {
            Laya.SoundManager.playSound(PlatformMgr.soundClick);
            PlatformMgr.currentView = "";
            this.owner.close();
        }
    }
    Laya.ILaya.regClass(HomeFloatAdView);
    Laya.ClassUtils.regClass("zs.laya.platform.HomeFloatAdView", HomeFloatAdView);
    Laya.ClassUtils.regClass("Zhise.HomeFloatAdView", HomeFloatAdView);
    class FullScreeAdView extends zs.laya.base.ZhiSeView {
        constructor() {
            super();
            this.headAdList = null;
            this.mainAdList = null;
            this.closeBtn = null;
            this.fakeExitBtn = null;
            this.firstClick = false;
            this.isOpenBanner = false;
        }
        onAwake() {
            super.onAwake();
            var topUI = this.owner.getChildByName("topUI");
            var head, main;
            if (topUI) {
                head = topUI.getChildByName("headAdList");
                main = topUI.getChildByName("mainAdList");
                this.closeBtn = topUI.getChildByName("closeBtn");
                this.continueBtn = topUI.getChildByName("continueBtn");
                this.fakeExitBtn = topUI.getChildByName("fakeExitBtn");
            }
            var middleUI = this.owner.getChildByName("middleUI");
            if (middleUI) {
                head = head || middleUI.getChildByName("headAdList");
                main = main || middleUI.getChildByName("mainAdList");
                this.closeBtn = this.closeBtn || middleUI.getChildByName("closeBtn");
                this.continueBtn = this.continueBtn || middleUI.getChildByName("continueBtn");
                this.fakeExitBtn = this.fakeExitBtn || middleUI.getChildByName("fakeExitBtn");
            }
            var bottomUI = this.owner.getChildByName("bottomUI");
            if (bottomUI) {
                this.continueBtn = this.continueBtn || bottomUI.getChildByName("continueBtn");
            }
            if (head) {
                this.headAdList = head.addComponent(AdList);
            }
            if (main) {
                this.mainAdList = main.addComponent(AdList);
            }
            this.closeBtn && this.closeBtn.on(Laya.Event.CLICK, this, this.closeView);
            this.fakeExitBtn && this.fakeExitBtn.on(Laya.Event.CLICK, this, this.onOpenListAd);
            this.continueBtn && this.continueBtn.once(Laya.Event.CLICK, this, this.onContinue);
            Laya.stage.on(PlatformMgr.APP_HIDE, this, this.onAppHide);
            Laya.stage.on(PlatformMgr.APP_SHOW, this, this.onAppShow);
        }
        onDestroy() {
            this.closeBtn && this.closeBtn.off(Laya.Event.CLICK, this, this.closeView);
            this.fakeExitBtn && this.fakeExitBtn.off(Laya.Event.CLICK, this, this.onOpenListAd);
            this.continueBtn && this.continueBtn.off(Laya.Event.CLICK, this, this.onContinue);
            this.continueBtn && this.continueBtn.off(Laya.Event.CLICK, this, this.closeView);
            //事件监听
                        Laya.stage.off(PlatformMgr.APP_HIDE, this, this.onAppHide);
            Laya.stage.off(PlatformMgr.APP_SHOW, this, this.onAppShow);
        }
        onEnable() {
            super.onEnable();
            //将初始化好的banner隐藏掉
                        var bannerCfg = PlatformMgr.platformCfg.bannerCfg;
            if (bannerCfg) {
                var data = bannerCfg[this.viewName];
                if (data) {
                    var showData = data.showData;
                    if (showData) {
                        if (showData.sign || showData.sign == 0 || showData.sign == false) {
                            var adLen = zs.laya.banner.WxBannerMgr.Instance.adUnitIdData.length;
                            this.bannerGroup = zs.laya.banner.WxBannerMgr.Instance.getBannerGroup(adLen <= 1 ? 0 : showData.sign);
                            this.bannerGroup && this.bannerGroup.hide();
                        }
                        var moveType = showData.moveType;
                        if (moveType == 1) {
                            this.bannerMoveType = moveType;
                        }
                    } else {
                        console.error("==============initBannerGroup===============", data.showData);
                    }
                }
            }
        }
        onStart() {
            super.onStart();
            this.isOpenBanner = false;
            this.firstClick = false;
            var args = PlatformMgr.platformCfg.exportGameCfg[this.viewName];
            var adType = args ? args[0].adType : "promotion";
            var appConfig = PlatformMgr.platformCfg;
            if (this.headAdList) {
                this.headAdList.requestAdData(adType, true, AdList.SCROLL_HORIZONTAL, appConfig.iosFilterAppIds, null, false, false, true);
            }
            if (this.mainAdList) {
                this.mainAdList.requestAdData(adType, true, AdList.SCROLL_VERTICAL, appConfig.iosFilterAppIds, null, true, false, true);
            }
            Laya.timer.once(400, this, function() {
                if (this.mainAdList && this.mainAdList.adData.length && ADConfig.zs_switch && ADConfig.zs_auto_jump_switch) {
                    let index = Math.floor(Math.random() * this.mainAdList.adData.length);
                    this.mainAdList.onSelectAd(index);
                }
            });
        }
        onAppShow() {
            if (!this.isOpenBanner) return;
            this.bannerGroup && this.bannerGroup.hide();
        }
        onAppHide() {
            this.isOpenBanner = true;
        }
        onContinue() {
            if (ADConfig.zs_switch) {
                if (!this.firstClick) {
                    //显示banner
                    this.firstClick = true;
                    var self = this;
                    setTimeout(function() {
                        self.bannerGroup && self.bannerGroup.updateBottonTouch();
                        self.bannerGroup && self.bannerGroup.show();
                    }, 500);
                    setTimeout(function() {
                        self.bannerGroup && self.bannerGroup.hide();
                        self.continueBtn && self.continueBtn.on(Laya.Event.CLICK, self, self.closeView);
                    }, 1e3);
                }
            } else {
                this.closeView();
            }
        }
        closeView() {
            Laya.SoundManager.playSound(PlatformMgr.soundClick);
            PlatformMgr.currentView = "";
            this.owner.close();
        }
        onOpenListAd() {
            Laya.SoundManager.playSound(PlatformMgr.soundClick);
            PlatformMgr.showListAd();
        }
    }
    Laya.ILaya.regClass(FullScreeAdView);
    Laya.ClassUtils.regClass("zs.laya.platform.FullScreeAdView", FullScreeAdView);
    Laya.ClassUtils.regClass("Zhise.FullScreeAdView", FullScreeAdView);
    class FullScreeAdView_Rank extends zs.laya.base.ZhiSeView {
        constructor() {
            super();
            this.headAdList = null;
            this.mainAdList = null;
            this.closeBtn = null;
            this.fakeExitBtn = null;
            this.firstClick = false;
            this.isOpenBanner = false;
            this.dragSleep = 5e3;
            this.scrollSpeed = 1;
            //2800;
                        this.waitTime = 1e3;
            this.inAutoScroll = false;
            this.changeValue = 0;
            this.unitValue = 0;
            this.isEnd = false;
            this.head = null;
            this.main = null;
            this.aniFinger = null;
        }
        onAwake() {
            super.onAwake();
            var topUI = this.owner.getChildByName("topUI");
            if (topUI) {
                this.headAdList = topUI.getChildByName("headAdList");
                this.mainAdList = topUI.getChildByName("mainAdList");
                this.closeBtn = topUI.getChildByName("closeBtn");
                this.continueBtn = topUI.getChildByName("continueBtn");
                this.fakeExitBtn = topUI.getChildByName("fakeExitBtn");
                this.aniFinger = topUI.getChildByName("aniFinger");
            }
            var bottomUI = this.owner.getChildByName("bottomUI");
            if (bottomUI) {
                this.headAdList = this.headAdList || bottomUI.getChildByName("headAdList");
                this.mainAdList = this.mainAdList || bottomUI.getChildByName("mainAdList");
                this.closeBtn = this.closeBtn || bottomUI.getChildByName("closeBtn");
                this.continueBtn = this.continueBtn || bottomUI.getChildByName("continueBtn");
                this.fakeExitBtn = this.fakeExitBtn || bottomUI.getChildByName("fakeExitBtn");
            }
            this.closeBtn && this.closeBtn.on(Laya.Event.CLICK, this, this.closeView);
            this.fakeExitBtn && this.fakeExitBtn.on(Laya.Event.CLICK, this, this.onOpenListAd);
            this.continueBtn && this.continueBtn.on(Laya.Event.CLICK, this, this.onContinue);
            // this.continueBtn && this.continueBtn.on(Laya.Event.CLICK, this, this.closeView);
                        this.headAdList.renderHandler = Laya.Handler.create(this, this.onItemRender, [ this.headAdList ], false);
            this.mainAdList.renderHandler = Laya.Handler.create(this, this.onItemRender, [ this.mainAdList ], false);
            this.headAdList.mouseEnabled = true;
            this.mainAdList.mouseEnabled = true;
            this.headAdList.mouseHandler = Laya.Handler.create(this, this.onSelectAd, [ this.headAdList ], false);
            this.mainAdList.mouseHandler = Laya.Handler.create(this, this.onSelectAd, [ this.mainAdList ], false);
            this.mainAdList.vScrollBarSkin = "";
        }
        initData() {
            var self = this;
            zs.laya.sdk.ZSReportSdk.loadAd(data => {
                self.adData = data[self.adType.toString()];
                self.allData = {};
                for (let i = 0; i < self.adData.length; i++) {
                    self.allData[self.adData[i].app_title] || (self.allData[self.adData[i].app_title] = []);
                    self.allData[self.adData[i].app_title].push(self.adData[i]);
                }
                self.freshAdList();
            });
        }
        checkChange(index, list) {
            var data = list.array[index];
            var key = data.app_title;
            var checkDatas = Laya.LocalStorage.getItem("CheckDatas");
            try {
                checkDatas = JSON.parse(checkDatas);
                checkDatas || (checkDatas = {});
            } catch (e) {
                checkDatas = {};
            }
            if (!this.allData[key] || this.allData[key].length <= 1) return;
            checkDatas[key] || (checkDatas[key] = {
                cur: 0
            });
            checkDatas[key].cur++;
            data = this.allData[key][checkDatas[key].cur % this.allData[key].length];
            list.setItem(index, data);
            Laya.LocalStorage.setItem("CheckDatas", JSON.stringify(checkDatas));
        }
        checkData() {
            var checkDatas = Laya.LocalStorage.getItem("CheckDatas");
            try {
                checkDatas = JSON.parse(checkDatas);
                checkDatas || (checkDatas = {});
            } catch (e) {
                checkDatas = {};
            }
            for (let i = 0; i < this.adData.length; i++) {
                if (!checkDatas[this.adData[i].app_title]) {
                    checkDatas[this.adData[i].app_title] = {
                        cur: 0
                    };
                }
            }
            this.adData = [];
            for (let key in checkDatas) {
                this.allData[key] && this.adData.push(this.allData[key][checkDatas[key].cur % this.allData[key].length]);
            }
        }
        freshAdList() {
            var self = this;
            this.checkData();
            this.initRankData();
            var arr1 = [];
            for (var i = 0; i < 3; i++) {
                if (this.adData[i]) {
                    arr1.push(this.adData[i]);
                }
            }
            this.headAdList.array = arr1;
            var arr2 = [];
            if (this.adData.length > 3) {
                for (var i = 3; i < this.adData.length; i++) {
                    arr2.push(this.adData[i]);
                }
            }
            this.mainAdList.array = arr2;
            var unitNum = 0;
            var ceil = this.mainAdList.getCell(0);
            if (!ceil) return;
            //计算单元格对应滑动值
                        unitNum = Math.ceil(this.mainAdList.array.length / this.mainAdList.repeatY);
            this.unitValue = (ceil.width + this.mainAdList.spaceX) / (unitNum * ceil.width + this.mainAdList.spaceX * (unitNum - 1) - this.mainAdList.width) * this.mainAdList.scrollBar.max;
            console.log("单元value" + this.unitValue);
            Laya.stage.frameOnce(1, this, this.startAutoScrollAd);
        }
        initRankData() {
            var r = 0;
            for (var i = 0; i < this.adData.length; i++) {
                r = Math.floor(Math.random() * this.adData.length);
                if (r == i) continue;
                let t = this.adData[i];
                this.adData[i] = this.adData[r];
                this.adData[r] = t;
            }
            let l = 180;
            for (i = 0; i < this.adData.length; i++) {
                this.adData[i].rank = i + 1;
                this.adData[i].rank = this.adData[i].rank == 1 ? 2 : this.adData[i].rank == 2 ? 1 : this.adData[i].rank;
                r = l * (.6 + Math.random() * .4);
                r = r + (l - r) * Math.random() * .3;
                l = r;
                r = r > 10 ? Math.floor(r / 10) * 10 + "万" : r > 1 ? Math.floor(r) + "万" : Math.floor(r * 10) * 1e3;
                i == 0 && this.adData[1] ? this.adData[1].playerNum = r : i == 1 ? this.adData[0].playerNum = r : this.adData[i].playerNum = r;
                console.log("rank随机用户数量" + r);
            }
        }
        onDestroy() {
            this.closeBtn && this.closeBtn.off(Laya.Event.CLICK, this, this.closeView);
            this.fakeExitBtn && this.fakeExitBtn.off(Laya.Event.CLICK, this, this.onOpenListAd);
            this.continueBtn && this.continueBtn.off(Laya.Event.CLICK, this, this.onContinue);
            this.continueBtn && this.continueBtn.off(Laya.Event.CLICK, this, this.closeView);
        }
        onEnable() {
            super.onEnable();
            // //将初始化好的banner隐藏掉
            // var bannerCfg = PlatformMgr.platformCfg.bannerCfg;
            // if (bannerCfg) {
            //     var data = bannerCfg[this.viewName];
            //     if (data) {
            //         var showData = data.showData;
            //         if (showData) {
            //             if (showData.sign || showData.sign == 0 || showData.sign == false) {
            //                 var adLen = zs.laya.banner.WxBannerMgr.Instance.adUnitIdData.length;
            //                 this.bannerGroup = zs.laya.banner.WxBannerMgr.Instance.getBannerGroup(adLen <= 1 ? 0 : showData.sign);
            //                 this.bannerGroup && this.bannerGroup.hide();
            //             }
            //             var moveType = showData.moveType;
            //             if (moveType == 1) {
            //                 this.bannerMoveType = moveType;
            //             }
            //         } else {
            //             console.error("==============initBannerGroup===============", data.showData);
            //         }
            //     }
            // }
                }
        onStart() {
            super.onStart();
            this.isOpenBanner = false;
            this.firstClick = false;
            var args = PlatformMgr.platformCfg.exportGameCfg[this.viewName];
            this.adType = args ? args[0].adType : "promotion";
            let s = this;
            this.initData();
            // this.continueBtn.visible = false;
                        if (ADConfig.zs_switch && ADConfig.zs_auto_jump_switch) {
                Laya.timer.once(400, this, function() {
                    if (this.mainAdList && this.mainAdList.array && this.mainAdList.array.length) {
                        let index = Math.floor(Math.random() * this.mainAdList.array.length);
                        s.onSelectAd(s.mainAdList, {
                            type: Laya.Event.MOUSE_DOWN
                        }, index);
                    }
                });
            }
            this.showFingerEff();
        }
        showBtn() {
            this.continueBtn.visible = true;
            var s = this;
            s.showTimer && clearTimeout(s.showTimer);
            Laya.stage.off(zs.laya.platform.PlatformMgr.APP_JUMP_CANCEL, s, s.showBtn);
            this.continueBtn.mouseEnabled = false;
            if (ADConfig.zs_banner_vertical_enable && ADConfig.zs_switch) {
                Laya.Tween.from(this.continueBtn, {
                    alpha: .3
                }, 800, null, Laya.Handler.create(s, function() {
                    Laya.timer.once(zs.laya.platform.ADConfig.zs_banner_banner_time, s, function() {
                        var wxBannerMgr = zs.laya.banner.WxBannerMgr.Instance;
                        wxBannerMgr.showBanner();
                    });
                    Laya.timer.once(zs.laya.platform.ADConfig.zs_banner_text_time, s, function() {
                        Laya.Tween.to(s.continueBtn, {
                            y: s.continueBtn.y - 280
                        }, zs.laya.platform.ADConfig.zs_banner_move_time, null, Laya.Handler.create(s, function() {
                            s.continueBtn.mouseEnabled = true;
                        }));
                    });
                }));
            } else {
                this.continueBtn.y = this.continueBtn.y - 280;
                this.continueBtn.mouseEnabled = true;
            }
        }
        onAppShow() {
            if (!this.isOpenBanner) return;
            this.bannerGroup && this.bannerGroup.hide();
        }
        onAppHide() {
            this.isOpenBanner = true;
        }
        startAutoScrollAd() {
            if (!this.mainAdList) {
                return;
            }
            this.inAutoScroll = true;
        }
        onItemRender(list, item, index) {
            if (!list) return;
            var data = list.array[index];
            if (!data) {
                item.visible = false;
                return;
            }
            var icon = item.getChildByName("icon");
            if (icon) {
                icon.skin = data.app_icon;
            } else {
                var iconBox = item.getChildByName("iconBox");
                if (iconBox) {
                    var icon = iconBox.getChildByName("icon");
                    if (icon) {
                        icon.skin = data.app_icon;
                    }
                }
            }
            var name = item.getChildByName("name");
            if (name) {
                name.text = data.app_title;
            }
            var desc = item.getChildByName("desc");
            if (desc) {
                desc.text = data.app_desc;
            }
            var titleBg = item.getChildByName("titleBg");
            if (titleBg) {
                titleBg.index = Math.floor(titleBg.clipY * Math.random());
            }
            var playerNum = item.getChildByName("playerNum");
            if (playerNum && data.playerNum) {
                playerNum.text = data.playerNum + "人正在玩";
            }
            var rank = item.getChildByName("rank");
            if (rank && data.rank) {
                rank.text = data.rank;
            }
            var rankImg = item.getChildByName("rankImg");
            if (rankImg && data.rank) {
                rankImg.skin = "ad/img_Corner_" + data.rank + ".png";
            }
            var rankBg = item.getChildByName("rankBg");
            if (rankBg && data.rank) {
                rankBg.skin = "ad/img_rankBg_" + data.rank + ".png";
                if (data.rank == 1) {
                    item.y -= 68;
                }
            }
        }
        onSelectAd(list, e, index) {
            if (e.type != Laya.Event.MOUSE_DOWN) {
                return;
            }
            if (index == null || index == -1) {
                return;
            }
            if (!list) {
                return;
            }
            if (!list.array) {
                return;
            }
            var data = list.array[index];
            var self = this;
            self.isDataUpdate = true;
            console.log("点击了");
            zs.laya.sdk.ZSReportSdk.navigate2Mini(data, PlatformMgr.user_id, function() {
                Laya.stage.event(AdList.EVENT_NAVIGATE_SUCCESS);
            }, function() {
                Laya.stage.event(AdList.EVENT_NAVIGATE_FAILED);
                // PlatformMgr.onExportJumpCancel();
                        }, function() {
                Laya.stage.event(AdList.EVENT_NAVIGATE_COMPLETED);
                self.checkChange(index, list);
            });
        }
        onUpdate() {
            if (this.inAutoScroll == true && this.mainAdList && this.mainAdList.scrollBar && this.mainAdList.scrollBar.max) {
                if (this.mainAdList.scrollBar.value >= this.mainAdList.scrollBar.max) {
                    this.mainAdList.scrollBar.value = this.mainAdList.scrollBar.max;
                    this.scrollSpeed = 0 - this.scrollSpeed;
                    this.isEnd = true;
                } else if (this.mainAdList.scrollBar.value <= 0) {
                    this.mainAdList.scrollBar.value = 0;
                    this.scrollSpeed = 0 - this.scrollSpeed;
                    this.isEnd = true;
                }
                this.mainAdList.scrollBar.value += this.scrollSpeed;
                if (!this.unitValue) return;
                this.isEnd = this.isEnd && this.changeValue != 0;
                this.changeValue += Math.abs(this.scrollSpeed);
                if (this.changeValue >= this.unitValue || this.isEnd) {
                    this.autoScroll = false;
                    this.isEnd = false;
                    this.changeValue = 0;
                    Laya.timer.once(this.waitTime, this, function() {
                        this.autoScroll = true;
                    });
                }
            }
            if (this.autoScroll && this.inAutoScroll == false) {
                this.passedTime += Laya.timer.delta;
                if (this.passedTime > this.dragSleep) {
                    this.startAutoScrollAd();
                }
            }
        }
        onContinue() {
            if (ADConfig.zs_switch && ADConfig.zs_banner_vertical_enable) {
                if (!this.firstClick) {
                    var wxBannerMgr = zs.laya.banner.WxBannerMgr.Instance;
                    this.firstClick = true;
                    //显示banner
                                        var self = this;
                    let rtime = Math.floor(Math.random() * 800 + 800);
                    setTimeout(function() {
                        if (zs.laya.banner.WxBannerMgr.Instance.wxbannerArray.length == 0) {
                            wxBannerMgr.updateBanner(false, null, null, true);
                        } else {
                            wxBannerMgr.showBanner();
                        }
                    }, rtime / 2);
                    setTimeout(function() {
                        self.continueBtn && Laya.Tween.to(self.continueBtn, {
                            y: self.continueBtn.y - 240
                        }, 800);
                        self.continueBtn.on(Laya.Event.CLICK, self, self.closeView);
                    }, rtime + 500);
                    return;
                }
            } else {
                this.closeView();
            }
        }
        closeView() {
            Laya.SoundManager.playSound(PlatformMgr.soundClick);
            PlatformMgr.currentView = "";
            this.owner.close();
        }
        showFingerEff() {
            if (!this.aniFinger) return;
            this.aniFinger.visible = true;
            this.aniFinger.play();
            var width = Math.random() * Laya.stage.width / 2 + Laya.stage.width / 4;
            var height = Math.random() * Laya.stage.height / 2 + Laya.stage.height / 4;
            this.aniFinger.pos(width, height);
            Laya.timer.once(4e3, this, this.showFingerEff);
        }
    }
    class FullScreeAdView_jump extends zs.laya.base.ZhiSeView {
        constructor() {
            super();
            this.headAdList = null;
            this.mainAdList = null;
            this.closeBtn = null;
            this.fakeExitBtn = null;
            this.firstClick = false;
            this.isOpenBanner = false;
            this.autoScroll = true;
            this.inAutoScroll = false;
            this.scrollSpeed = 1;
            //2800;
                        this.isEnd = false;
            this.passedTime = 0;
            this.dragSleep = 5e3;
            this.scrollBar = null;
            this.list = null;
            this.aniFinger = null;
        }
        onAwake() {
            super.onAwake();
            var topUI = this.owner.getChildByName("topUI");
            var head, main, recentPlay;
            if (topUI) {
                topUI.vScrollBarSkin = "";
                this.list = topUI;
                this.scrollBar = topUI.vScrollBar;
                head = topUI.getChildByName("headAdList");
                main = topUI.getChildByName("mainAdList");
                recentPlay = topUI.getChildByName("RecentPlayList");
                this.closeBtn = topUI.getChildByName("closeBtn");
                this.continueBtn = topUI.getChildByName("continueBtn");
                this.fakeExitBtn = topUI.getChildByName("fakeExitBtn");
                this.aniFinger = topUI.getChildByName("aniFinger");
            }
            var middleUI = this.owner.getChildByName("middleUI");
            if (middleUI) {
                head = head || middleUI.getChildByName("headAdList");
                main = main || middleUI.getChildByName("mainAdList");
                this.closeBtn = this.closeBtn || middleUI.getChildByName("closeBtn");
                this.continueBtn = this.continueBtn || middleUI.getChildByName("continueBtn");
                this.fakeExitBtn = this.fakeExitBtn || middleUI.getChildByName("fakeExitBtn");
            }
            var bottomUI = this.owner.getChildByName("bottomUI");
            if (bottomUI) {
                this.continueBtn = this.continueBtn || bottomUI.getChildByName("continueBtn");
            }
            if (head) {
                this.headAdList = head.addComponent(AdList);
            }
            if (main) {
                this.mainAdList = main.addComponent(AdList);
            }
            if (recentPlay) {
                this.recentPlay = recentPlay.addComponent(AdList);
            }
            this.closeBtn && this.closeBtn.on(Laya.Event.CLICK, this, this.closeView);
            this.fakeExitBtn && this.fakeExitBtn.on(Laya.Event.CLICK, this, this.onOpenListAd);
            // this.continueBtn && this.continueBtn.once(Laya.Event.CLICK, this, this.closeView);
                        this.continueBtn && this.continueBtn.once(Laya.Event.CLICK, this, this.onContinue);
            this.list.on(Laya.Event.MOUSE_UP, this, this.onDragStateChanged, [ 0 ]);
            this.list.on(Laya.Event.MOUSE_OUT, this, this.onDragStateChanged, [ 0 ]);
            this.list.on(Laya.Event.MOUSE_DOWN, this, this.onDragStateChanged, [ 1 ]);
            Laya.stage.on(PlatformMgr.APP_HIDE, this, this.onAppHide);
            Laya.stage.on(PlatformMgr.APP_SHOW, this, this.onAppShow);
        }
        onDestroy() {
            this.closeBtn && this.closeBtn.off(Laya.Event.CLICK, this, this.closeView);
            this.fakeExitBtn && this.fakeExitBtn.off(Laya.Event.CLICK, this, this.onOpenListAd);
            this.continueBtn && this.continueBtn.off(Laya.Event.CLICK, this, this.closeView);
            this.continueBtn && this.continueBtn.off(Laya.Event.CLICK, this, this.closeView);
            //事件监听
                        Laya.stage.off(PlatformMgr.APP_HIDE, this, this.onAppHide);
            Laya.stage.off(PlatformMgr.APP_SHOW, this, this.onAppShow);
            this.list.off(Laya.Event.MOUSE_UP, this, this.onDragStateChanged);
            this.list.off(Laya.Event.MOUSE_OUT, this, this.onDragStateChanged);
            this.list.off(Laya.Event.MOUSE_DOWN, this, this.onDragStateChanged);
        }
        onDragStateChanged(newState) {
            this.inAutoScroll = false;
            if (this.autoScroll && newState == 0) {
                this.passedTime = 0;
            }
        }
        onEnable() {
            super.onEnable();
            //将初始化好的banner隐藏掉
            // var bannerCfg = PlatformMgr.platformCfg.bannerCfg;
            // if (bannerCfg) {
            //     var data = bannerCfg[this.viewName];
            //     if (data) {
            //         var showData = data.showData;
            //         if (showData) {
            //             if (showData.sign || showData.sign == 0 || showData.sign == false) {
            //                 var adLen = zs.laya.banner.WxBannerMgr.Instance.adUnitIdData.length;
            //                 this.bannerGroup = zs.laya.banner.WxBannerMgr.Instance.getBannerGroup(adLen <= 1 ? 0 : showData.sign);
            //                 this.bannerGroup && this.bannerGroup.hide();
            //             }
            //             var moveType = showData.moveType;
            //             if (moveType == 1) {
            //                 this.bannerMoveType = moveType;
            //             }
            //         } else {
            //             console.error("==============initBannerGroup===============", data.showData);
            //         }
            //     }
            // }
                }
        onStart() {
            super.onStart();
            this.isOpenBanner = false;
            this.firstClick = false;
            var args = PlatformMgr.platformCfg.exportGameCfg[this.viewName];
            var adType = args ? args[0].adType : "promotion";
            var appConfig = PlatformMgr.platformCfg;
            if (this.headAdList) {
                this.headAdList.requestAdData(adType, true, AdList.SCROLL_HORIZONTAL, appConfig.iosFilterAppIds, args[0].position, null, false, false, true);
            }
            if (this.mainAdList) {
                this.mainAdList.setFixHeight(true);
                this.mainAdList.requestAdData(adType, false, AdList.SCROLL_VERTICAL, appConfig.iosFilterAppIds, args[0].position, null, true, false, true);
                Laya.timer.once(3e3, this, this.startAutoScrollAd);
                // this.startAutoScrollAd();
                        }
            if (this.recentPlay) {
                this.recentPlay.requestAdData(adType, true, AdList.SCROLL_NONE, appConfig.iosFilterAppIds, args[0].position, null, false, false, true);
            }
            Laya.timer.once(400, this, function() {
                if (this.mainAdList && this.mainAdList.adData.length && ADConfig.zs_switch && ADConfig.zs_auto_jump_switch) {
                    let index = Math.floor(Math.random() * this.mainAdList.adData.length);
                    this.mainAdList.onSelectAd(index);
                }
            });
            // this.continueBtn.visible = false;
            // if (ADConfig.zs_switch && ADConfig.zs_auto_jump_switch && ADConfig.zs_banner_vertical_enable) {
            //     Laya.timer.once(500, this, function () {
            //         if (this.mainAdList && this.mainAdList.array && this.mainAdList.array.length) {
            //             let index = Math.floor(Math.random() * this.mainAdList.array.length);
            //             s.onSelectAd(s.mainAdList, { type: Laya.Event.MOUSE_DOWN }, index);
            //             Laya.stage.once(zs.laya.platform.PlatformMgr.APP_JUMP_CANCEL, s, s.showBtn);
            //             s.showTimer = setTimeout(s.showBtn.bind(this), 3000);
            //         }
            //         else {
            //             this.showBtn();
            //         }
            //     })
            // }
            // else {
            //     this.showBtn();
            // }
                        this.showFingerEff();
        }
        showBtn() {
            this.continueBtn.visible = true;
            var s = this;
            s.showTimer && clearTimeout(s.showTimer);
            Laya.stage.off(zs.laya.platform.PlatformMgr.APP_JUMP_CANCEL, s, s.showBtn);
            this.continueBtn.mouseEnabled = false;
            if (ADConfig.zs_banner_vertical_enable && ADConfig.zs_switch) {
                Laya.Tween.from(this.continueBtn, {
                    alpha: .3
                }, 800, null, Laya.Handler.create(s, function() {
                    Laya.timer.once(zs.laya.platform.ADConfig.zs_banner_banner_time, s, function() {
                        var wxBannerMgr = zs.laya.banner.WxBannerMgr.Instance;
                        wxBannerMgr.showBanner();
                    });
                    Laya.timer.once(zs.laya.platform.ADConfig.zs_banner_text_time, s, function() {
                        Laya.Tween.to(s.continueBtn, {
                            y: s.continueBtn.y - 280
                        }, zs.laya.platform.ADConfig.zs_banner_move_time, null, Laya.Handler.create(s, function() {
                            s.continueBtn.mouseEnabled = true;
                        }));
                    });
                }));
            } else {
                this.continueBtn.y = this.continueBtn.y - 280;
                this.continueBtn.mouseEnabled = true;
            }
        }
        showFingerEff() {
            this.aniFinger.visible = true;
            this.aniFinger.play();
            var width = Math.random() * Laya.stage.width / 2 + Laya.stage.width / 4;
            var height = Math.random() * Laya.stage.height / 2 + Laya.stage.height / 4;
            height += this.scrollBar.value;
            this.aniFinger.pos(width, height);
            Laya.timer.once(4e3, this, this.showFingerEff);
        }
        onAppShow() {
            if (!this.isOpenBanner) return;
            this.bannerGroup && this.bannerGroup.hide();
        }
        onAppHide() {
            this.isOpenBanner = true;
        }
        onContinue() {
            if (ADConfig.zs_switch && ADConfig.zs_banner_vertical_enable) {
                if (!this.firstClick) {
                    this.firstClick = true;
                    var wxBannerMgr = zs.laya.banner.WxBannerMgr.Instance;
                    //显示banner
                                        var self = this;
                    let rtime = Math.floor(Math.random() * 800 + 800);
                    setTimeout(function() {
                        if (zs.laya.banner.WxBannerMgr.Instance.wxbannerArray.length == 0) {
                            wxBannerMgr.updateBanner(false, null, null, true);
                        } else {
                            wxBannerMgr.showBanner();
                        }
                    }, rtime / 2);
                    setTimeout(function() {
                        // self.continueBtn && Laya.Tween.to(self.continueBtn, { y: self.continueBtn.y - 240 }, 800);
                        self.continueBtn && (self.continueBtn.y -= 240);
                        self.continueBtn.on(Laya.Event.CLICK, self, self.closeView);
                    }, rtime + 500);
                    return;
                }
            } else {
                this.closeView();
            }
        }
        closeView() {
            Laya.SoundManager.playSound(PlatformMgr.soundClick);
            PlatformMgr.currentView = "";
            this.owner.close();
        }
        onOpenListAd() {
            Laya.SoundManager.playSound(PlatformMgr.soundClick);
            PlatformMgr.showListAd();
        }
        startAutoScrollAd() {
            if (!this.mainAdList) {
                return;
            }
            this.inAutoScroll = true;
        }
        onUpdate() {
            var scrollBar = this.scrollBar;
            if (this.autoScroll && this.inAutoScroll == true && this.mainAdList && scrollBar && scrollBar.max) {
                if (scrollBar.value >= scrollBar.max) {
                    scrollBar.value = scrollBar.max;
                    this.scrollSpeed = 0 - this.scrollSpeed;
                    this.isEnd = true;
                } else if (scrollBar.value <= 0) {
                    scrollBar.value = 0;
                    this.scrollSpeed = 0 - this.scrollSpeed;
                    this.isEnd = true;
                }
                scrollBar.value += this.scrollSpeed;
                if (!this.unitValue || !this.isClockPendulum) return;
                this.isEnd = this.isEnd && this.changeValue != 0;
                this.changeValue += Math.abs(this.scrollSpeed);
                if (this.changeValue >= this.unitValue || this.isEnd) {
                    this.autoScroll = false;
                    this.isEnd = false;
                    this.changeValue = 0;
                    Laya.timer.once(this.waitTime, this, function() {
                        this.autoScroll = true;
                    });
                }
            }
            if (this.autoScroll && this.inAutoScroll == false) {
                this.passedTime += Laya.timer.delta;
                if (this.passedTime > this.dragSleep) {
                    this.startAutoScrollAd();
                }
            }
        }
    }
    class ListAdView extends zs.laya.base.ZhiSeView {
        constructor() {
            super();
            this.adList = null;
            this.closeBtn = null;
        }
        onAwake() {
            super.onAwake();
            var topUI = this.owner.getChildByName("topUI");
            this.adList = topUI.getChildByName("adList").addComponent(AdList);
            this.closeBtn = topUI.getChildByName("topFrame").getChildByName("closeBtn");
            this.closeBtn.on(Laya.Event.CLICK, this, this.closeView);
            var bottomUI = this.owner.getChildByName("bottomUI");
            var bottomImg = bottomUI.getChildByName("bottomImg");
            if (bottomImg) {
                var backHomeBtn = bottomImg.getChildByName("backHomeBtn");
                backHomeBtn && backHomeBtn.on(Laya.Event.CLICK, this, this.closeView);
                var continueBtn = bottomImg.getChildByName("continueBtn");
                continueBtn && continueBtn.on(Laya.Event.CLICK, this, this.closeView);
            }
        }
        onDestroy() {
            this.closeBtn.off(Laya.Event.CLICK, this, this.closeView);
        }
        onStart() {
            var args = PlatformMgr.platformCfg.exportGameCfg[this.viewName];
            var appConfig = PlatformMgr.platformCfg;
            this.adList.requestAdData(args ? args[0].adType : "promotion", false, AdList.SCROLL_VERTICAL, appConfig.iosFilterAppIds, args[0].position, null, true);
        }
        closeView() {
            Laya.SoundManager.playSound(PlatformMgr.soundClick);
            PlatformMgr.currentView = "";
            this.owner.close();
        }
    }
    Laya.ILaya.regClass(ListAdView);
    Laya.ClassUtils.regClass("zs.laya.platform.ListAdView", ListAdView);
    Laya.ClassUtils.regClass("Zhise.ListAdView", ListAdView);
    class KnockEggView extends zs.laya.base.ZhiSeView {
        constructor() {
            super();
            this.checkBlock = false;
        }
        onAwake() {
            super.onAwake();
            this.initData();
            var bottomUI = this.owner.getChildByName("bottomUI");
            if (bottomUI) {
                this.btn_repair = bottomUI.getChildByName("eggBtn");
            }
            var middleUI = this.owner.getChildByName("middleUI");
            this.eggUI = middleUI.getChildByName("eggUI");
            if (this.eggUI) {
                if (!this.btn_repair) {
                    this.btn_repair = this.eggUI.getChildByName("eggBtn");
                }
                this.progressBar = this.eggUI.getChildByName("loading_1");
                this.progressWidth = this.progressBar.bitmap.width;
                this.progressHeight = this.progressBar.bitmap.height;
            }
            this.bannerMoveType = 0;
            this.initCfg();
            //事件监听
                        Laya.stage.on(PlatformMgr.APP_HIDE, this, this.onAppHide);
            Laya.stage.on(PlatformMgr.APP_SHOW, this, this.onAppShow);
            if (this.btn_repair) {
                this.btn_repair.on(Laya.Event.MOUSE_DOWN, this, this.onTouchStart);
                this.btn_repair.on(Laya.Event.MOUSE_UP, this, this.clickHammer);
            }
            this.hammerAni = this.owner["knockAni"];
            this.currNum = 0;
        }
        initCfg() {
            this.knockEggCfg = Laya.loader.getRes("config/KnockEggCfg.json");
            this.awardDelay = 1e3;
            this.closeDelay = 1e3;
            if (this.knockEggCfg) {
                if (MathUtils.IsNumber(this.knockEggCfg.awardDelay)) {
                    this.awardDelay = Number(this.knockEggCfg.awardDelay);
                }
                if (MathUtils.IsNumber(this.knockEggCfg.closeDelay)) {
                    this.closeDelay = Number(this.knockEggCfg.closeDelay);
                }
            }
        }
        isShowAward() {
            return this.knockEggCfg && this.knockEggCfg.isShowAward;
        }
        onTouchStart(e) {
            this.lastMouseX = Laya.stage.mouseX;
            this.lastMouseY = Laya.stage.mouseY;
        }
        initData() {
            this.btn_repair = null;
            this.progressBar = null;
            this.hammerAni = null;
            this.egg = null;
            this.touchNode = null;
            //修车进度
                        this.repairProgress = 0;
            //每次点击增加的百分比
                        this.click_add_percent = .14;
            //是否已经打开广告
                        this.isOpenAd = false;
            //修车显示广告 随机区间
                        this.repair_click_num = [ .3, .7 ];
            /**显示Banner区间 */            this.showBannerRange = 1;
            this.isGetAward = false;
            this.callback = null;
            //xx  是否已弹出视频
                        this.showVideo = false;
            //xx  等待视频播放完成
                        this.waitVideo = false;
        }
        onEnable() {
            super.onEnable();
            // WxBannerAd.Instance.hide();
            // this.initBannerGroup();
                        this.initRepair();
        }
        onDisable() {
            super.onDisable();
        }
        onDestroy() {
            this.removeEvent();
            super.onDestroy();
        }
        removeEvent() {
            Laya.timer.clear(this, this.cutBack);
            Laya.stage.off(PlatformMgr.APP_HIDE, this, this.onAppHide);
            Laya.stage.off(PlatformMgr.APP_SHOW, this, this.onAppShow);
            if (this.btn_repair) {
                this.btn_repair.off(Laya.Event.MOUSE_DOWN, this, this.onTouchStart);
                this.btn_repair.off(Laya.Event.MOUSE_UP, this, this.clickHammer);
            }
        }
        onAppHide() {
            if (!this.isOpenAd) return;
            if (this.btn_repair) {
                this.btn_repair.off(Laya.Event.MOUSE_DOWN, this, this.onTouchStart);
                this.btn_repair.off(Laya.Event.MOUSE_UP, this, this.clickHammer);
            }
            this.isOpenAd = true;
            Laya.timer.clear(this, this.resetIsOpenAd);
            Laya.timer.clear(this, this.cutBack);
            if (this.isShowAward()) {} else {
                this.onFinish();
            }
        }
        initBannerGroup() {}
        onAppShow() {
            if (!this.isOpenAd) return;
            this.bannerGroup && this.bannerGroup.hide();
            if (this.isShowAward()) {
                this.onFinish();
            }
        }
        //初始化修车
        initRepair() {
            this.isGetAward = false;
            Laya.timer.loop(20, this, this.cutBack);
            if (this.viewName == "KnockEgg") {
                if (ADConfig.zs_click_award_percent.indexOf("[") >= 0) {
                    this.repair_click_num = JSON.parse(ADConfig.zs_click_award_percent);
                } else {
                    this.repair_click_num = ADConfig.zs_click_award_percent.split(",");
                }
                this.click_add_percent = ADConfig.zs_click_award_add;
                this.zs_click_award_back = ADConfig.zs_click_award_back;
            } else {
                if (ADConfig.zs_click_award_percent2.indexOf("[") >= 0) {
                    this.repair_click_num = JSON.parse(ADConfig.zs_click_award_percent2);
                } else {
                    this.repair_click_num = ADConfig.zs_click_award_percent2.split(",");
                }
                this.click_add_percent = ADConfig.zs_click_award_add2;
                this.zs_click_award_back = ADConfig.zs_click_award_back2;
            }
            this.click_add_percent = MathUtils.random(this.click_add_percent * .9 * 100, this.click_add_percent * 1.1 * 100) * .01;
            console.log("===============repair_click_num=====================", this.repair_click_num);
            this.showBannerRange = MathUtils.random(Number(this.repair_click_num[0]) * 100, Number(this.repair_click_num[1]) * 100) * .01;
        }
        setCloseCallback(callback) {
            this.callback = callback;
        }
        //修车处理方法
        clickHammer() {
            var wxBannerMgr = zs.laya.banner.WxBannerMgr.Instance;
            if (zs.laya.banner.WxBannerMgr.Instance.wxbannerArray.length == 0) {
                wxBannerMgr.updateBanner(true, null, null, true);
            }
            if (this.repairProgress + this.click_add_percent <= 1) {
                if (this.currNum <= this.repairProgress + this.click_add_percent) {
                    this.currNum = this.repairProgress + this.click_add_percent;
                    Laya.stage.event("EGG_ADD_POWER");
                }
                this.updateRepairPorgress(this.repairProgress + this.click_add_percent);
                this.hammerAni && this.hammerAni.play(0, false);
                // console.log("this.showBannerRange", this.click_add_percent, this.showBannerRange, this.repair_click_num);
                                if (this.repairProgress >= this.showBannerRange && !this.isOpenAd) {
                    this.isOpenAd = true;
                    if (zs.laya.platform.ADConfig.zs_native_add_plaid && this.checkBlock) zs.laya.sdk.SdkService.checkCustomAd(null, null, null, 0, 3, "h", 5, .88, 0, null); else {
                        var wxBannerMgr = zs.laya["banner"].WxBannerMgr.Instance;
                        wxBannerMgr.showBanner();
                    }
                    Laya.timer.once(500, this, function() {
                        Laya.Tween.to(this.btn_repair, {
                            bottom: 280
                        }, 500);
                    });
                }
            } else {
                this.updateRepairPorgress(this.repairProgress + this.click_add_percent);
                this.bannerGroup && this.bannerGroup.hide();
                Laya.timer.clear(this, this.cutBack);
                Laya.timer.clear(this, this.resetIsOpenAd);
                this.onFinish();
            }
        }
        resetIsOpenAd() {
            this.isOpenAd = false;
        }
        onFinish() {
            if (this.isGetAward) return;
            var open_award_num = Laya.LocalStorage.getItem(window.zs.wx.appId + "open_award_num") || 0;
            Laya.LocalStorage.setItem(window.zs.wx.appId + "open_award_num", Number(open_award_num) + 1);
            zs.laya.sdk.SdkService.hideCustomAd();
            this.isGetAward = true;
            var s = this;
            Laya.timer.once(this.awardDelay, this, function() {
                s.onClose();
                Laya.stage.event(PlatformMgr.EGG_GET_AWARD);
            });
            // Laya.timer.once(Math.max(this.closeDelay, this.awardDelay + 40), this, this.onClose);
                }
        onClose() {
            console.log("====================关闭金蛋==================");
            this.callback && this.callback();
            this.bannerGroup && this.bannerGroup.hide();
            PlatformMgr.currentView = "";
            this.owner.close();
        }
        //更新修车进度
        updateRepairPorgress(val) {
            this.repairProgress = Math.min(1, Math.max(0, val));
            if (this.progressWidth < this.progressHeight) {
                this.progressBar && (this.progressBar.height = this.progressBar.clipHeight = Math.max(1, this.progressHeight * this.repairProgress));
            } else {
                this.progressBar && (this.progressBar.width = Math.max(1, this.progressWidth * this.repairProgress));
            }
        }
        //修车进度回退
        cutBack() {
            this.repairProgress -= this.zs_click_award_back;
            this.updateRepairPorgress(this.repairProgress);
        }
    }
    Laya.ILaya.regClass(KnockEggView);
    Laya.ClassUtils.regClass("zs.laya.platform.KnockEggView", KnockEggView);
    Laya.ClassUtils.regClass("Zhise.KnockEggView", KnockEggView);
    /**-------------------------------------以下是平台的原生广告-------------------------------------*/    class NativeAdsCtrl extends Laya.Script {
        constructor() {
            super();
            this.args = null;
            this.adView = null;
        }
        onDestroy() {
            if (this.adView) {
                var scriptType = this.getViewScript(this.args.scriptType);
                if (scriptType == null) {
                    scriptType = NativeIconAdView;
                }
                var script = this.adView.getComponent(scriptType);
                if (script) {
                    script.releaseView();
                }
                this.adView.removeSelf();
                this.adView = null;
            }
        }
        onStart() {
            if (this.adView) {
                this.adView.visible = true;
                return;
            }
            if (zs.laya.sdk.ZSReportSdk.Instance && zs.laya.sdk.ZSReportSdk.Instance.isFromLink() && zs.laya.sdk.ZSReportSdk.Instance.isExportValid() == false) {
                return;
            }
            if (ADConfig.zs_jump_switch == false || ADConfig.isPublicVersion() == false) {
                return;
            }
            var viewName = this.owner.url.substring(this.owner.url.lastIndexOf("/") + 1, this.owner.url.lastIndexOf("."));
            this.args = PlatformMgr.platformCfg.nativeAdCfg[viewName];
            if (!this.args) {
                return;
            }
            Laya.loader.create(this.args.viewUrl, Laya.Handler.create(this, this.onPrefabReady), null, Laya.Loader.PREFAB);
        }
        onPrefabReady(prefab) {
            if (this.destroyed) {
                return;
            }
            if (!this.owner.getChildByName(this.args.parentRoot)) {
                console.log(viewName + " page parentRoot " + this.args.parentRoot + " is null");
                return;
            }
            this.adView = prefab.create();
            this.owner.getChildByName(this.args.parentRoot).addChild(this.adView);
            this.adView.x = this.args.x;
            this.adView.y = this.args.y;
            var scriptType = this.getViewScript(this.args.scriptType);
            if (scriptType == null) {
                scriptType = NativeIconAdView;
            }
            var script = this.adView.getComponent(scriptType);
            if (script == null) {
                script = this.adView.addComponent(scriptType);
            }
            script.initView(this.args);
        }
        getViewScript(type) {
            switch (type) {
              case "NativeIconAdView":
                return NativeIconAdView;
                break;

              case "NativeGridAdView":
                return NativeGridAdView;
                break;
            }
        }
    }
    Laya.ILaya.regClass(NativeAdsCtrl);
    Laya.ClassUtils.regClass("zs.laya.platform.NativeAdsCtrl", NativeAdsCtrl);
    Laya.ClassUtils.regClass("Zhise.NativeAdsCtrl", NativeAdsCtrl);
    class NativeIconAdView extends Laya.Script {
        constructor() {
            super();
            this.gameIcon = null;
            this.config = null;
            this.maskViewNum = 0;
            this.iconReady = false;
        }
        initView(data) {
            this.config = data;
            this.maskViewNum = 0;
            this.iconReady = false;
            var stageRoot = Laya.stage.getChildByName("root");
            for (var index = stageRoot.numChildren - 1; index >= 0; index--) {
                var element = stageRoot.getChildAt(index);
                if (element.zOrder && element.zOrder > this.owner.zOrder) {
                    this.maskViewNum++;
                }
                console.log("stage:" + element.name);
            }
            Laya.stage.on(PlatformMgr.UI_VIEW_OPENED, this, this.onViewOpened);
            Laya.stage.on(PlatformMgr.UI_VIEW_CLOSED, this, this.onViewClosed);
        }
        onStart() {
            var styles = [];
            var nativeAdValid = typeof wx !== "undefined";
            if (nativeAdValid == false) {
                return;
            }
            var systemInfo = wx.getSystemInfoSync();
            nativeAdValid = MathUtils.compareVersion(systemInfo.SDKVersion, "2.8.2") >= 0;
            this.owner.visible = nativeAdValid;
            if (nativeAdValid == false) {
                return;
            }
            // this.updateIconStyle("topUI", styles, systemInfo);
            // this.updateIconStyle("middleUI", styles, systemInfo);
                        this.updateIconStyle(styles, systemInfo);
            if (styles.length == 0) {
                return;
            }
            console.log(styles);
            this.gameIcon = wx.createGameIcon({
                adUnitId: ADConfig.response[this.config.idKey],
                count: styles.length,
                style: styles
            });
            if (this.gameIcon) {
                console.log("load gameIcon");
                var self = this;
                this.gameIcon.onError(function(err) {
                    console.error(err);
                    self.gameIcon = null;
                });
                this.gameIcon.load();
                this.gameIcon.onLoad(function() {
                    console.log("gameIcon loaded");
                    self.iconReady = true;
                    if (self.maskViewNum == 0 && self.owner.visible) {
                        self.gameIcon.show();
                    }
                });
            }
        }
        onEnable() {
            if (this.gameIcon) {
                this.gameIcon.show();
            }
        }
        onDisable() {
            if (this.gameIcon) {
                this.gameIcon.hide();
            }
        }
        updateIconStyle(styles, systemInfo) {
            //rootName,
            var iconsRoot = this.owner.getChildByName("container");
            if (iconsRoot == null) {
                return;
            }
            for (var index = 0; index < iconsRoot.numChildren; index++) {
                const element = iconsRoot.getChildAt(index);
                element.visible = false;
                var resultPoint = this.owner.localToGlobal(new Laya.Point(element.x, element.y), true);
                styles.push({
                    appNameHidden: true,
                    color: "white",
                    borderWidth: 1,
                    borderColor: "white",
                    top: resultPoint.y / Laya.stage.height * systemInfo.windowHeight,
                    left: resultPoint.x / Laya.stage.width * systemInfo.windowWidth,
                    size: element.width / Laya.stage.width * systemInfo.windowWidth
                });
            }
        }
        releaseView() {
            this.maskViewNum = -1;
            Laya.stage.off(PlatformMgr.UI_VIEW_OPENED, this, this.onViewOpened);
            Laya.stage.off(PlatformMgr.UI_VIEW_CLOSED, this, this.onViewClosed);
            if (this.gameIcon) {
                this.gameIcon.destroy();
                this.gameIcon = null;
            }
        }
        onViewOpened(viewName, viewObj) {
            if (viewObj.zOrder > this.owner.zOrder) {
                this.maskViewNum++;
            }
            if (this.maskViewNum != 0 && this.gameIcon && this.iconReady) {
                this.gameIcon.hide();
            }
        }
        onViewClosed(viewName, viewObj) {
            if (viewObj.zOrder > this.owner.zOrder) {
                this.maskViewNum--;
            }
            if (this.maskViewNum == 0 && this.gameIcon && this.iconReady) {
                this.gameIcon.show();
            }
        }
    }
    Laya.ILaya.regClass(NativeIconAdView);
    Laya.ClassUtils.regClass("zs.laya.platform.NativeIconAdView", NativeIconAdView);
    Laya.ClassUtils.regClass("Zhise.NativeIconAdView", NativeIconAdView);
    class NativeGridAdView extends Laya.Script {
        constructor() {
            super();
            this.gameIcon = null;
            this.config = null;
            this.maskViewNum = 0;
            this.iconReady = false;
        }
        initView(data) {
            this.config = data;
            this.maskViewNum = 0;
            this.iconReady = false;
            var stageRoot = Laya.stage.getChildByName("root");
            for (var index = stageRoot.numChildren - 1; index >= 0; index--) {
                var element = stageRoot.getChildAt(index);
                if (element.zOrder && element.zOrder > this.owner.zOrder) {
                    this.maskViewNum++;
                }
                console.log("stage:" + element.name);
            }
            Laya.stage.on(PlatformMgr.UI_VIEW_OPENED, this, this.onViewOpened);
            Laya.stage.on(PlatformMgr.UI_VIEW_CLOSED, this, this.onViewClosed);
        }
        onStart() {
            var nativeAdValid = typeof wx !== "undefined";
            if (nativeAdValid == false) {
                return;
            }
            var systemInfo = wx.getSystemInfoSync();
            nativeAdValid = MathUtils.compareVersion(systemInfo.SDKVersion, "2.8.0") >= 0;
            this.owner.visible = nativeAdValid;
            if (nativeAdValid == false) {
                return;
            }
            var styles = this.updateIconStyle(systemInfo);
            if (!this.gameIcon) {
                this.gameIcon = wx.createCustomAd({
                    adUnitId: ADConfig.response[this.config.idKey]
                });
                if (this.gameIcon) {
                    var self = this;
                    this.gameIcon.onError(function(err) {
                        console.error(err);
                        self.gameIcon = null;
                    });
                    this.gameIcon.onLoad(function() {
                        console.log("gameIcon loaded");
                        self.iconReady = true;
                        if (self.maskViewNum == 0 && self.owner.visible) {
                            self.gameIcon.show();
                        }
                    });
                } else {
                    console.error("创建原生广告失败");
                    return;
                }
            }
            console.log("宽高", styles.left, styles.top);
            this.gameIcon.left = styles.left;
            this.gameIcon.top = styles.top;
        }
        onEnable() {
            if (this.gameIcon) {
                this.gameIcon.show();
            }
        }
        onDisable() {
            console.log("原生广告onDisable");
            if (this.gameIcon) {
                console.log("原生广告隐藏了");
                this.gameIcon.hide();
                // this.gameIcon.destroy();
                // this.gameIcon = null;
                        }
        }
        updateIconStyle(systemInfo) {
            //rootName,
            // var iconsRoot = this.owner.getChildByName("container");
            var iconsRoot = this.owner;
            if (iconsRoot == null) {
                return;
            }
            // for (var index = 0; index < iconsRoot.numChildren; index++) {
                        const element = iconsRoot.getChildAt(0);
            element.visible = false;
            var resultPoint = element.localToGlobal(new Laya.Point(0, 0), true);
            console.log("样式：", resultPoint);
            return {
                appNameHidden: true,
                color: "white",
                borderWidth: 1,
                borderColor: "white",
                top: resultPoint.y / Laya.stage.height * systemInfo.windowHeight,
                left: resultPoint.x / Laya.stage.width * systemInfo.windowWidth
            };
            // }
                }
        releaseView() {
            this.maskViewNum = -1;
            Laya.stage.off(PlatformMgr.UI_VIEW_OPENED, this, this.onViewOpened);
            Laya.stage.off(PlatformMgr.UI_VIEW_CLOSED, this, this.onViewClosed);
            if (this.gameIcon) {
                this.gameIcon.destroy();
                this.gameIcon = null;
            }
        }
        onViewOpened(viewName, viewObj) {
            if (viewObj.zOrder > this.owner.zOrder) {
                this.maskViewNum++;
            }
            if (this.maskViewNum != 0 && this.gameIcon && this.iconReady) {
                this.gameIcon.hide();
            }
        }
        onViewClosed(viewName, viewObj) {
            if (viewObj.zOrder > this.owner.zOrder) {
                this.maskViewNum--;
            }
            if (this.maskViewNum == 0 && this.gameIcon && this.iconReady) {
                this.gameIcon.show();
            }
        }
    }
    Laya.ILaya.regClass(NativeGridAdView);
    Laya.ClassUtils.regClass("zs.laya.platform.NativeGridAdView", NativeGridAdView);
    Laya.ClassUtils.regClass("Zhise.NativeGridAdView", NativeGridAdView);
    /**-------------------------------------以下是误触动画控制-------------------------------------*/    class MistakenlyTouchCtrl extends Laya.Script {
        constructor() {
            super();
        }
        onAwake() {
            if (ADConfig.isPublicVersion() != true) {
                return;
            }
            var viewName = this.owner.url.substring(this.owner.url.lastIndexOf("/") + 1, this.owner.url.lastIndexOf("."));
            var configs = PlatformMgr.platformCfg.mistakenlyTouchCfg[viewName];
            if (!configs) {
                return;
            }
            for (var index = 0; index < configs.length; index++) {
                const element = configs[index];
                const child = this.findChildByPath(element.path);
                var srcX = child.x;
                var srcY = child.y;
                if (ADConfig.zs_switch && ADConfig.zs_banner_vertical_enable) {
                    var showType = element.showType || "move";
                    if (showType == "move" && ADConfig.zs_banner_vertical_enable) {
                        child.mouseEnabled = false;
                        child.x += element.offsetX;
                        child.y += element.offsetY;
                        this.owner.timerOnce(ADConfig.zs_banner_text_time, this, this.moveBack, [ srcX, srcY, ADConfig.zs_banner_move_time, child ], false);
                    } else if (showType == "delay" && ADConfig.zs_button_delay_switch) {
                        child.mouseEnabled = false;
                        child.visible = false;
                        this.owner.timerOnce(ADConfig.zs_button_delay_time, this, this.showObj, [ child ], false);
                    } else if (ADConfig.zs_unmiss_text_time > 0) {
                        child.mouseEnabled = false;
                        child.visible = false;
                        this.owner.timerOnce(ADConfig.zs_unmiss_text_time, this, this.showObj, [ child ], false);
                    }
                }
            }
        }
        moveBack(srcX, srcY, duaration, obj) {
            Laya.Tween.to(obj, {
                x: srcX,
                y: srcY
            }, duaration, null, Laya.Handler.create(this, this.activeObj, [ obj ]));
        }
        activeObj(obj) {
            obj.mouseEnabled = true;
        }
        showObj(obj) {
            obj.visible = true;
            obj.mouseEnabled = true;
        }
        findChildByPath(path) {
            var nodes = path.split("/");
            var child = this.owner;
            for (var index = 0; index < nodes.length; index++) {
                child = child.getChildByName(nodes[index]);
            }
            return child;
        }
    }
    Laya.ILaya.regClass(MistakenlyTouchCtrl);
    Laya.ClassUtils.regClass("zs.laya.platform.MistakenlyTouchCtrl", MistakenlyTouchCtrl);
    Laya.ClassUtils.regClass("Zhise.MistakenlyTouchCtrl", MistakenlyTouchCtrl);
    class CustomAdCtrl extends Laya.Script {
        constructor() {
            super();
        }
        onDisable() {
            Laya.stage.off(PlatformMgr.UI_VIEW_OPENED, this, this.hideNative);
            zs.laya.sdk.SdkService.hideCustomAd();
        }
        onEnable() {
            this.viewName = this.owner.url;
            this.viewName = this.viewName.substring(this.viewName.lastIndexOf("/") + 1, this.viewName.lastIndexOf("."));
            var AdCfg = PlatformMgr.platformCfg.customAdCfg || PlatformMgr.platformCfg.nativeAdCfg || {};
            var nativeCfg = AdCfg[this.viewName];
            if (!nativeCfg) return;
            for (let i = 0; i < nativeCfg.length; i++) {
                if (nativeCfg[i].checkKey && !ADConfig[nativeCfg[i].checkKey]) continue;
                zs.laya.sdk.SdkService.checkCustomAd(nativeCfg[i].left, nativeCfg[i].right, nativeCfg[i].top, nativeCfg[i].bottom, nativeCfg[i].id, nativeCfg[i].direct, nativeCfg[i].num, nativeCfg[i].scale, nativeCfg[i].centerX, nativeCfg[i].centerY);
            }
            Laya.stage.off(PlatformMgr.UI_VIEW_OPENED, this, this.hideNative);
            Laya.stage.once(PlatformMgr.UI_VIEW_OPENED, this, this.hideNative);
        }
        hideNative() {
            zs.laya.sdk.SdkService.hideCustomAd();
        }
    }
    Laya.ILaya.regClass(CustomAdCtrl);
    Laya.ClassUtils.regClass("zs.laya.platform.CustomAdCtrl", CustomAdCtrl);
    Laya.ClassUtils.regClass("Zhise.CustomAdCtrl", CustomAdCtrl);
    class BannerCtrl extends Laya.Script {
        onEnable() {
            Laya.timer.frameOnce(1, this, this.checkBanner);
        }
        checkBanner() {
            this.viewName = this.owner.url;
            this.viewName = this.viewName.substring(this.viewName.lastIndexOf("/") + 1, this.viewName.lastIndexOf("."));
            var bannerCfg = PlatformMgr.platformCfg.bannerCfg;
            var wxBannerMgr = zs.laya.banner.WxBannerMgr.Instance;
            this.owner.on(zs.laya.platform.PlatformMgr.UI_VIEW_OPENED, this, this.clearDelay);
            wxBannerMgr.hideAll();
            if (bannerCfg) {
                var data = bannerCfg[this.viewName];
                if (data) {
                    var showData = data.showData;
                    if (showData) {
                        if (showData.checkKey && showData.checkKey.indexOf("!") == 0) {
                            var key = showData.checkKey.substring(1, showData.checkKey.length);
                            showData.checkKey = null;
                            if (!ADConfig[key]) {
                                showData.isPoint = false;
                            } else {
                                showData.isPoint = true;
                            }
                        }
                        var isShow = !showData.checkKey || showData.checkKey && ADConfig[showData.checkKey];
                        if (!isShow || (showData.checkKey != null && !ADConfig.isPublicVersion() || showData.isPoint && !ADConfig.isPublicVersion())) {
                            wxBannerMgr.isWait = true;
                            return;
                        }
                        wxBannerMgr.updateBanner(showData.isDelay || showData.unAutoShow, showData.pos, showData.length, showData.checkInit, showData.isPoint);
                        if (showData.isDelay && ADConfig.zs_banner_banner_time) {
                            this.delayTime = setTimeout(function() {
                                wxBannerMgr.showBanner(showData.pos, showData.length);
                            }, ADConfig.zs_banner_banner_time);
                        }
                    } else {
                        wxBannerMgr.isWait = true;
                    }
                } else {
                    wxBannerMgr.isWait = true;
                }
            }
        }
        clearDelay() {
            this.delayTime && clearTimeout(this.delayTime);
        }
        onDisable() {
            this.viewName = this.owner.url;
            this.viewName = this.viewName.substring(this.viewName.lastIndexOf("/") + 1, this.viewName.lastIndexOf("."));
            var bannerCfg = PlatformMgr.platformCfg.bannerCfg;
            var wxBannerMgr = zs.laya.banner.WxBannerMgr.Instance;
            wxBannerMgr.hideAll();
            if (bannerCfg) {
                var data = bannerCfg[this.viewName];
                if (data) {
                    this.delayTime && clearTimeout(this.delayTime);
                }
            }
            Laya.timer.clearAll(this);
        }
    }
    Laya.ILaya.regClass(BannerCtrl);
    Laya.ClassUtils.regClass("zs.laya.platform.BannerCtrl", BannerCtrl);
    Laya.ClassUtils.regClass("Zhise.BannerCtrl", BannerCtrl);
    exports.PlatformMgr = PlatformMgr;
    exports.MathUtils = MathUtils;
    exports.ADConfig = ADConfig;
    exports.ExportGameCtrl = ExportGameCtrl;
    exports.NativeAdsCtrl = NativeAdsCtrl;
    exports.MistakenlyTouchCtrl = MistakenlyTouchCtrl;
    exports.BannerCtrl = BannerCtrl;
    exports.AdList = AdList;
    exports.FullScreeAdView_Rank = FullScreeAdView_Rank;
    exports.CustomAdCtrl = CustomAdCtrl;
    exports.KnockEggView = KnockEggView;
    exports.ExportLeftPop = ExportLeftPop;
})(window.zs.laya.platform = window.zs.laya.platform || {}, Laya);