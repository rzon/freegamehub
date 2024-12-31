!function () {
  'use strict';

  class _0x288ce1 {
    constructor() {
      this['_userData'] = null;
      this["_userDataKey"] = 'SkirtQueen_api_secret';
      this["init"]();
    }

    ['init']() {
      if (this["_userData"] = {
        'isPlaySound': true,
        'isPlayVibrate': true,
        'levelID': 0,
        'signinTime': 0,
        'skinTipsTime': 0
      }, this["readStorage"](), this["_userData"]['gameStatus'] || (this["_userData"]["gameStatus"] = {}), this['_userData']['gameStatus']["awardGold"] || (this["_userData"]["gameStatus"]["awardGold"] = 0), this["_userData"]["gameStatus"]["unlockCount"] || (this["_userData"]["gameStatus"]["unlockCount"] = 0), this["_userData"]["gameStatus"]["lastRegisterTime"] || (this["_userData"]["gameStatus"]["lastRegisterTime"] = 0), this['_userData']['gameStatus']["lastLuckyDay"] || (this["_userData"]["gameStatus"]["lastLuckyDay"] = 0), this["_userData"]["gameStatus"]['luckyCount'] || (this['_userData']["gameStatus"]["luckyCount"] = 0), this["_userData"]["gameStatus"]["homeHitLevel"] || (this["_userData"]["gameStatus"]["homeHitLevel"] = 1), !this["_userData"]['gameStatus']["skinArr"]) {
        this['_userData']["gameStatus"]['skinArr'] = [];
        this['_userData']["gameStatus"]["skinArr"]["length"] = 6;

        for (let _0x290206 = 0; _0x290206 < 6; ++_0x290206) {
          this["_userData"]['gameStatus']['skinArr'][_0x290206] = false;
        }

        this['_userData']["gameStatus"]["skinArr"][0] = true;
      }

      if (!this["_userData"]["gameStatus"]["registerArr"]) {
        this["_userData"]["gameStatus"]['registerArr'] = [];
        this['_userData']["gameStatus"]["registerArr"]['length'] = 7;

        for (let _0x14335c = 0; _0x14335c < 7; ++_0x14335c) {
          this["_userData"]["gameStatus"]["registerArr"][_0x14335c] = false;
        }
      }

      this["_userData"]['gameStatus']['skinId'] || (this["_userData"]["gameStatus"]['skinId'] = 0);
      this["_userData"]['userInfo'] || (this["_userData"]["userInfo"] = {});
      this['_userData']['userInfo']["gold"] || (this["_userData"]["userInfo"]["gold"] = 0);
      this["_userData"]["gameStatus"]["level"] || (this["_userData"]["gameStatus"]["level"] = 1);
      this["writeStorage"]();
      this["setRegisterTime"]();
      this["setLuckyDay"]();
    }

    ["readStorage"]() {
      let _0x3a30a3 = Laya['LocalStorage']["getItem"](this['_userDataKey']);

      _0x3a30a3 && (this["_userData"] = JSON["parse"](_0x3a30a3));
    }

    ["writeStorage"]() {
      this["_userData"] && Laya["LocalStorage"]["setItem"](this["_userDataKey"], JSON["stringify"](this["_userData"]));
    }

    ["clearStorage"]() {
      Laya["LocalStorage"]["removeItem"](this["_userDataKey"]);
    }

    ["isPlaySound"]() {
      return this["_userData"]["isPlaySound"];
    }

    ['setPlaySound'](_0x2bb026) {
      this['_userData']['isPlaySound'] = _0x2bb026;
      this['writeStorage']();
    }

    ["isPlayVibrate"]() {
      return this["_userData"]["isPlayVibrate"];
    }

    ['setPlayVibrate'](_0x398b85) {
      this["_userData"]["isPlayVibrate"] = _0x398b85;
      this["writeStorage"]();
    }

    ['setSkinTips'](_0x1ccc5b) {
      this['_userData']['skinTipsTime'] = _0x1ccc5b ? 0 : Math['floor'](Date["parse"](new Date()["toString"]()) / 1000);
      this["writeStorage"]();
    }

    ["isSkinTips"](_0x16bf27) {
      return Math["floor"](this["_userData"]["projectData"]["lastTime"] / 86400000) != Math['floor'](_0x16bf27 / 86400000);
    }

    get ['userInfo']() {
      return this['_userData']["userInfo"];
    }

    get ["unlockSkinData"]() {
      return this['_userData']["userInfo"]["skin"];
    }

    ['unlockSkin'](_0x4c9756) {
      this["_userData"]['gameStatus']["skinArr"][_0x4c9756] || (this["_userData"]["gameStatus"]["skinArr"][_0x4c9756] = true, this["_userData"]["gameStatus"]["unlockCount"]++, this["writeStorage"]());
    }

    ['getUnlockCount']() {
      return this["_userData"]["gameStatus"]["unlockCount"];
    }

    ["setSkinId"](_0x49c64e) {
      this["_userData"]["gameStatus"]["skinId"] = _0x49c64e;
      this["writeStorage"]();
    }

    ["getSkinId"]() {
      return this["_userData"]["gameStatus"]["skinId"];
    }

    ["getSkinArr"]() {
      return this["_userData"]['gameStatus']["skinArr"];
    }

    ["isUnlockSkin"](_0x142613, _0x58c59d) {
      return -1 != _0x142613["indexOf"](_0x58c59d);
    }

    get ['gameStatus']() {
      return this["_userData"]["gameStatus"];
    }

    get ["projectData"]() {
      return this['_userData']["projectData"];
    }

    ["setGameStausLevel"](_0xad66b4) {
      this['_userData']["gameStatus"]["level"] = _0xad66b4;
      this["writeStorage"]();
    }

    ["setAwardGold"](_0x522f16) {
      this['_userData']["gameStatus"]['awardGold'] = _0x522f16;
      this["writeStorage"]();
    }

    get ['awardGold']() {
      return this['_userData']["gameStatus"]['awardGold'];
    }

    ["setRegisterTime"]() {}

    ['setRegisterSingle'](_0x4e76ba) {
      this['_userData']["gameStatus"]["isRegister"] = _0x4e76ba;
      this["writeStorage"]();
    }

    ["getRegisterSingle"]() {
      return this['_userData']["gameStatus"]['isRegister'];
    }

    ["getRegisterArr"]() {
      return this["_userData"]["gameStatus"]["registerArr"];
    }

    ["setRegisterArr"](_0x4276a9, _0x6f0ab3) {
      this["_userData"]["gameStatus"]["registerArr"][_0x4276a9] = _0x6f0ab3;
      this["writeStorage"]();
    }

    ["getLastRegisterTime"]() {
      return this['_userData']["gameStatus"]['lastRegisterTime'];
    }

    ['setLastRegisterTime'](_0x34047a) {
      this["_userData"]['gameStatus']['lastRegisterTime'] = _0x34047a;
      this["writeStorage"]();
    }

    ["setLuckyDay"]() {
      let _0xe9caae = Math["floor"](new Date()["valueOf"]() / 1000 / 86400);

      _0xe9caae > this["_userData"]["gameStatus"]["lastLuckyDay"] && (this["_userData"]["gameStatus"]["lastLuckyDay"] = _0xe9caae, this["_userData"]['gameStatus']['luckyCount'] = 0, this["writeStorage"]());
    }

    ["setLuckyCount"](_0x564572) {
      this["_userData"]["gameStatus"]["luckyCount"] = _0x564572;
      this['writeStorage']();
    }

    ["getLuckyCount"]() {
      return this["_userData"]["gameStatus"]['luckyCount'];
    }

    ["setHomeHitLevel"](_0x412e05) {
      this["_userData"]["gameStatus"]["homeHitLevel"] = _0x412e05;
      this["writeStorage"]();
    }

    ["getHomeHitLevel"]() {
      return this["_userData"]['gameStatus']["homeHitLevel"];
    }

  }

  class _0x40c459 {
    constructor() {
      this['loadCfgList'] = [{
        'path': "jsonConfig/LevelCfg.json",
        'tag': "LevelCfg"
      }, {
        'path': 'jsonConfig/levelData.json',
        'tag': "levelData"
      }];
      this["skinCfg"] = [];
    }

    ["getLevelCfg"]() {
      return this["levelCfg"];
    }

    ["getLevelData"]() {
      return this["levelData"];
    }

    ["getObstacleData"]() {
      return this["obstacleData"];
    }

    ['init'](_0x2e35bd) {
      this["glEvent"] = _0x2e35bd;
      this["loadCfgList"]["forEach"](_0x115509 => {
        this["loadJson"](_0x115509);
      });
    }

    ["loadJson"](_0x2c9a87) {
      let _0x9d747f = this;

      Laya["loader"]["load"](_0x2c9a87["path"], Laya["Handler"]["create"](this, function (_0xe20d6e) {
        _0x9d747f["onLoadJson"](_0xe20d6e, _0x2c9a87['tag']);
      }), null, Laya['Loader']['JSON']);
    }

    ["onLoadJson"](_0x1aceb9, _0x531752) {
      switch (_0x531752) {
        case 'LevelCfg':
          this["levelCfg"] = _0x1aceb9;
      }

      null != _0x1aceb9 && this["glEvent"]["event"]('load_finish_event', {
        'target': _0x531752
      });
    }

    ['getSkinCfg']() {
      return this["skinCfg"];
    }

    ["getSkinByIndex"](_0x24619b) {
      return this["skinCfg"][_0x24619b];
    }

    ["getSkinIndexById"](_0x347682) {
      for (let _0x16f56b = 0, _0x2247b8 = this["skinCfg"]["length"]; _0x16f56b < _0x2247b8; ++_0x16f56b) {
        if (_0x347682 == this["skinCfg"][_0x16f56b]['id']) {
          return _0x16f56b;
        }
      }

      return -1;
    }

  }

  class _0x4f7226 {
    constructor() {
      this["_bgmCtx"] = null;
      this["isFire"] = false;
      this["_pathRoot"] = "res/music/";
      this["_soundCtx"] = {};
      this["_soundFile"] = ["bgm", 'button', 'coin', 'fail', "addCloth", 'dance', "eatStar", "subCloth", "victory", "endVictory"];
    }

    ["init"]() {
      let _0x4ce3dd = this["_pathRoot"],
          _0x3f901c = '',
          _0x1dfa0d = this["_soundFile"],
          _0x2fa427 = this["_soundFile"]["length"];

      for (let _0x4c5137 = 0; _0x4c5137 < _0x2fa427; ++_0x4c5137) {
        _0x3f901c = _0x1dfa0d[_0x4c5137];

        let _0x543f6a = new Laya["SoundChannel"]();

        _0x543f6a["url"] = _0x4ce3dd + _0x3f901c + ".mp3";
        "poleRotate" == _0x3f901c && (_0x543f6a["loops"] = 0);
        Laya['SoundManager']["addChannel"](_0x543f6a);
        this["_soundCtx"][_0x3f901c] = true;
      }

      Laya["stage"]['on']('DEVICE_ON_HIDE', this, this["onAppHide"]);
      Laya["stage"]['on']("DEVICE_ON_SHOW", this, this["onAppShow"]);
    }

    ['onAppHide']() {
      this["stopBGM"]();
    }

    ["onAppShow"]() {
      _0x5adfe2["gameData"]["isStart"] && this['playBGM']("bgm");
    }

    ['play'](_0x50feaf) {
      this["_soundCtx"][_0x50feaf] && _0x5adfe2["storageMgr"]['isPlaySound']() && Laya["SoundManager"]["playSound"](this["_pathRoot"] + _0x50feaf + ".mp3");
    }

    ["stop"](_0x303d02) {
      this['_soundCtx'][_0x303d02] && Laya['SoundManager']["stopSound"](this["_pathRoot"] + _0x303d02 + ".mp3");
    }

    ["stopAll"]() {
      Laya["SoundManager"]["stopAll"]();
    }

    ["playBGM"](_0x4c141d) {
      if (!_0x5adfe2['storageMgr']['isPlaySound']()) {
        return;
      }

      let _0x479bb0 = this['_pathRoot'] + _0x4c141d + ".mp3";

      Laya["Browser"]["onWeiXin"] ? (null != this["_bgmCtx"] && (this["_bgmCtx"]['stop'](), this["_bgmCtx"]["destroy"](), this['_bgmCtx'] = null), this["_bgmCtx"] = wx["createInnerAudioContext"](), this["_bgmCtx"]["src"] = _0x479bb0, this["_bgmCtx"]["loop"] = true, _0x5adfe2["storageMgr"]["isPlaySound"]() && this['_bgmCtx']["play"]()) : (Laya['SoundManager']["stopMusic"](), Laya["SoundManager"]['playMusic'](_0x479bb0, 0));
    }

    ["stopBGM"]() {
      Laya["Browser"]["onWeiXin"] ? null != this["_bgmCtx"] && this['_bgmCtx']["stop"]() : Laya["SoundManager"]["stopMusic"]();
    }

  }

  class _0x296fe7 {
    constructor() {
      this["shareStartTime"] = 0;
    }

    ["init"]() {
      Laya["stage"]['on']("DEVICE_ON_HIDE", this, this["onHideEvent"]);
      Laya['stage']['on']("DEVICE_ON_SHOW", this, this["onShowEvent"]);
    }

    ['showToast'](_0x10705b, _0x539a15) {
      if (!window['wx']) {
        return;
      }

      window['wx']["showToast"]({
        'title': _0x10705b,
        'duration': _0x539a15,
        'icon': "none"
      });
    }

    ["openShare"](_0x4fb96b = null, _0x11961a = null, _0x4d0386 = null) {
      Laya["Browser"]["onWeiXin"] ? (this['shareStartTime'] = new Date()["getTime"](), this['successShareCallback'] = _0x4fb96b, this["failShareCallback"] = new Laya["Handler"](this, this["shareFailTips"]), zs["laya"]["sdk"]['SdkService']["openShare"](zs["laya"]["platform"]["ADConfig"]["zs_share_title"], zs['laya']["platform"]["ADConfig"]['zs_share_image'])) : _0x4d0386 && _0x4d0386["run"]();
    }

    ['onHideEvent'](_0x235182) {}

    ["onShowEvent"](_0x425b20) {
      !(new Date()["getTime"]() - this["shareStartTime"] < 2000 * Math["random"]() + 2000) ? this['successShareCallback'] && this["successShareCallback"]['run']() : this["failShareCallback"] && this["failShareCallback"]["run"]();
      this["failShareCallback"] = null;
      this["successShareCallback"] = null;
      this["shareStartTime"] = new Date()["getTime"]() + 86000;
    }

    ["shareFailTips"]() {
      let _0x5b6801 = "分享失败，分享到不同的群",
          _0x1c732e = 3 * Math["random"]();

      0 < _0x1c732e && _0x1c732e < 1 ? _0x5b6801 = '分享失败，分享大于10人的群' : 1 <= _0x1c732e && _0x1c732e < 2 ? _0x5b6801 = '分享失败，分享给不同的人' : 2 <= _0x1c732e && _0x1c732e < 3 && (_0x5b6801 = '分享失败，等一下再分享');
      this["showToast"](_0x5b6801, 1200);
    }

  }

  class _0x2206b3 {
    constructor() {
      this['modelPrefabs'] = {};
      this["resource"] = [{
        'url': "res/scene/LayaScene_Scene/Conventional/Scene.ls",
        'clas': Laya["Scene"],
        'priority': 1
      }];
      this["sceneID"] = 0;
      this["isLoad"] = false;
      this["loadingScene"] = false;
    }

    ["init"](_0x40e42c) {
      this["glEvent"] = _0x40e42c;
      Laya['Browser']["onWeiXin"] ? this['loadSubpackage']("scenes", this, function (_0x151121, _0x7a521f) {
        _0x7a521f && (this["loadRes"](), this["loadSubpackage"]("sounds", this, function (_0x50da42, _0x557133) {
          _0x557133 && _0x5adfe2['soundMgr']["init"]();
        }));
      }) : (this['loadRes'](), _0x5adfe2["soundMgr"]["init"]());
    }

    ["loadSubpackage"](_0x162147, _0x4306f6, _0xd745d4) {
      Laya["Browser"]["onWeiXin"] && wx["loadSubpackage"]({
        'name': _0x162147,
        'success': function (_0xd9907a) {
          console['log']("分包加载成功 " + _0x162147);

          _0xd745d4["call"](_0x4306f6, _0xd9907a, true);
        },
        'fail': function (_0x164a7c) {
          console["error"]("分包加载失败 " + _0x162147);

          _0xd745d4["call"](_0x4306f6, _0x164a7c, false);
        }
      });
    }

    ["loadRes"]() {
      Laya['loader']["create"](this["resource"], Laya["Handler"]["create"](this, this["onLoadFinish"], null, false), Laya['Handler']["create"](this, this["onLoading"], null, false));
    }

    ['onLoadFinish'](_0x330ac0) {
      if (_0x330ac0 || (_0x330ac0 = true), _0x330ac0) {
        if (this["isLoad"]) {
          return;
        }

        this['isLoad'] = true;

        _0x5adfe2["glEvent"]["event"]("load_finish_event", {
          'target': "3dres"
        });

        this["onSceneEvent"](_0x330ac0);
      }
    }

    ["onLoading"](_0x13a45f) {
      _0x5adfe2["glEvent"]["event"]("load_pass_event", _0x13a45f);
    }

    ["isLoadingScene"]() {
      return this["loadingScene"];
    }

    ["onSceneEvent"](_0xa03138) {
      this['loadingScene'] = false;
      _0xa03138 && this['onScenes']();
    }

    ['onScenes']() {
      if (this["resource"]) {
        let _0x2ba96b = Laya["loader"]["getRes"](this["resource"][0]["url"]);

        Laya["stage"]["addChild"](_0x2ba96b);
        Laya["stage"]["setChildIndex"](_0x2ba96b, 0);
        this["mainScene"] = _0x2ba96b;
        this["mainCamera"] = _0x2ba96b["getChildByName"]("Main Camera");

        _0x5adfe2['gameMgr']["init"]();
      } else {
        console['error']("res cfg is null.");
      }
    }

  }

  class _0xb96294 extends Laya["Script"] {
    constructor() {
      super(...arguments);
      this['isMove'] = false;
      this["gameBuyCoin"] = 0;
      this["effectArr"] = [];
      this["bodyArr"] = [];
      this["bodyArrIndex"] = [];
      this["judgeArr"] = [0, 0, 0];
      this['aniState'] = 0;
      this['waitBodyArr'] = [];
      this["waitBodyParts"] = null;
      this["oriPos"] = null;
      this["oriAngle"] = null;
      this['delta'] = 20;
      this["moveDown"] = false;
      this["isEndMove"] = false;
      this["addOffx"] = 0;
      this['speed'] = 4.7;
      this["addSpeed"] = 1;
      this["count"] = 0;
      this["curentCoin"] = 0;
      this["lastCoinTime"] = 0;
      this["isTripAni"] = false;
      this["isGetAni"] = false;
    }

    ["init"](_0x313d59, _0x96b4be = 0) {
      this["single"] = _0x313d59;
      this['posSign'] = this["single"]["getChildByName"]('posSign');
      this["waitSp"] = this["single"]["getChildByName"]("dengdai");
      this["waitSp"]["active"] = false;
      this['waitAni'] = this['waitSp']["getComponent"](Laya["Animator"]);
      this["getWaitBodyChild"](this["waitSp"]);
      this["setWaitBodyArr"]();
      this["oriPos"] = this['single']['transform']["position"]["clone"]();
      this["oriAngle"] = this["single"]['transform']["rotation"]["clone"]();
      this['getBodyChild'](_0x313d59["getChildAt"](0));
      this["setBodyArr"]();
      this['animation'] = this['single']['getChildAt'](0)["getComponent"](Laya["Animator"]);
      this["playAnimation"](1);
      this["spotLight"] = this["single"]["getChildByName"]("spotLight");
      this["spotLight"]['active'] = false;
      this["effectArr"][0] = this["single"]["getChildByName"]('nsdds_01');
      this["effectArr"][1] = this["single"]["getChildByName"]("nsdds_02");
      this["effectArr"][2] = this["single"]["getChildByName"]("nsdds_03");

      for (let _0x12fefc = 0; _0x12fefc < 3; ++_0x12fefc) {
        this["effectArr"][_0x12fefc]["active"] = false;
      }

      this["effectArr"][0]["active"] = true;
    }

    ['playAnimation'](_0x4e2ce0) {
      if (_0x4e2ce0 != this["aniState"]) {
        switch (_0x4e2ce0 > 6 ? this["aniState"] <= 6 && (this["single"]["getChildAt"](0)['active'] = false, this["waitSp"]["active"] = true) : this["aniState"] > 6 && (this['single']['getChildAt'](0)["active"] = true, this['waitSp']["active"] = false), this['aniState'] = _0x4e2ce0, _0x4e2ce0) {
          case 1:
            this["animation"]["crossFade"]("idle", 0.1);
            break;

          case 2:
            this['animation']['crossFade']("walk1", 0.1);
            break;

          case 3:
            this["animation"]["crossFade"]("walk2", 0.1);
            break;

          case 4:
            this['animation']['crossFade']("walk3", 0.1);
            break;

          case 5:
            this['animation']["crossFade"]("trip", 0.1);
            break;

          case 6:
            this["animation"]['crossFade']('tiao', 0.1);
            break;

          case 7:
            this["waitAni"]['play']("wait");
            break;

          case 8:
            this["waitAni"]["crossFade"]("victory", 0.1);
            break;

          case 9:
            this["waitAni"]["crossFade"]("fail", 0.1);
        }
      }
    }

    ['setSkinArr'](_0xb7aa13) {
      for (let _0x5575f3 = 0; _0x5575f3 < 15; ++_0x5575f3) {
        _0xb7aa13[_0x5575f3] ? (this["bodyArr"][_0x5575f3]["active"] = true, this["bodyArrIndex"][_0x5575f3] = true) : (this["bodyArr"][_0x5575f3]["active"] = false, this["bodyArrIndex"][_0x5575f3] = false);
      }

      this["judgeArr"] = [1, 1, 1];
      this["effectArr"][0]["active"] = false;
    }

    ["setStart"]() {
      if (this["judgeArr"][0] > 0 && this["judgeArr"][1] > 0 && this["judgeArr"][2] > 0) {
        for (let _0x1a49a7 = 0; _0x1a49a7 < 3; ++_0x1a49a7) {
          _0x5adfe2["gameMgr"]["aiRootMgr"]["aiArr"][_0x1a49a7]['lg']["bSet"] = true;

          _0x5adfe2['gameMgr']["aiRootMgr"]["aiArr"][_0x1a49a7]['lg']["setEffect"](true);
        }

        _0x5adfe2["commonData"]["GGame"] && _0x5adfe2['commonData']['GGame']['showSkinInfo'](this["judgeArr"], this['bodyArrIndex']);
        this["spotLight"]["active"] = this["judgeArr"][0] > 0 && this["judgeArr"][1] > 0 && this['judgeArr'][2] > 0;
        this['playAnimation'](4);
      }
    }

    ["getBodyChild"](_0x31132f) {
      for (let _0x173c76 = 0; _0x173c76 < _0x31132f['numChildren']; ++_0x173c76) {
        let _0x26a377 = _0x31132f["getChildAt"](_0x173c76);

        if ("BodyParts" == _0x26a377['name']) {
          return void (this["BodyParts"] = _0x26a377);
        }

        this["getBodyChild"](_0x26a377);
      }
    }

    ['getWaitBodyChild'](_0x4246d0) {
      for (let _0x11b05f = 0; _0x11b05f < _0x4246d0["numChildren"]; ++_0x11b05f) {
        let _0x4e4a1d = _0x4246d0["getChildAt"](_0x11b05f);

        if ('BodyParts' == _0x4e4a1d["name"]) {
          return void (this["waitBodyParts"] = _0x4e4a1d);
        }

        this["getWaitBodyChild"](_0x4e4a1d);
      }
    }

    ["setBodyArr"]() {
      let _0x4c0c60 = this["single"]["getChildAt"](0),
          _0x5f1b94 = this['BodyParts']["getChildByName"]("Rank2_ShoseB");

      this["bodyArr"][0] = this['BodyParts']["getChildByName"]('Rank0_Body');
      this["bodyArr"][1] = this["BodyParts"]["getChildByName"]('Rank1_Body');
      this["bodyArr"][2] = this['BodyParts']['getChildByName']("Rank2_BodyA");
      this["bodyArr"][3] = this['BodyParts']["getChildByName"]("Rank2_BodyB");
      this["bodyArr"][4] = this["BodyParts"]["getChildByName"]("Rank2_BodyC");
      this["bodyArr"][5] = this["BodyParts"]["getChildByName"]('Rank0_Shose');
      this['bodyArr'][6] = this["BodyParts"]["getChildByName"]("Rank1_Shose");
      this['bodyArr'][7] = _0x5f1b94["getChildAt"](0);
      this['bodyArr'][8] = _0x5f1b94['getChildAt'](1);
      this["bodyArr"][9] = this["BodyParts"]["getChildByName"]("Rank2_ShoseC");
      this["bodyArr"][10] = _0x4c0c60['getChildByName']("Rank0Hair_TTGHairC");
      this["bodyArr"][11] = _0x4c0c60["getChildByName"]("Rank1Hair_TTGHairB");
      this["bodyArr"][12] = _0x4c0c60["getChildByName"]("Rank2AHair_TTGHairE1");
      this['bodyArr'][13] = _0x4c0c60['getChildByName']("Rank2BHair_TTGHairD");
      this["bodyArr"][14] = _0x4c0c60["getChildByName"]("Rank2CHair_TTGHairB1");
      this['setInitArr']();
    }

    ["setInitArr"]() {
      for (let _0x400d4d = 0; _0x400d4d < 15; ++_0x400d4d) {
        0 == _0x400d4d || 5 == _0x400d4d || 10 == _0x400d4d ? (this["bodyArr"][_0x400d4d]["active"] = true, this['bodyArrIndex'][_0x400d4d] = true) : (this['bodyArr'][_0x400d4d]["active"] = false, this["bodyArrIndex"][_0x400d4d] = false);
      }

      this["judgeArr"] = [0, 0, 0];
    }

    ["setWaitBodyArr"]() {
      let _0x48cb3e = this["waitSp"],
          _0x1c6174 = this["waitBodyParts"]['getChildByName']("Rank2_ShoseB");

      this["waitBodyArr"][0] = this['waitBodyParts']["getChildByName"]("Rank0_Body");
      this["waitBodyArr"][1] = this["waitBodyParts"]["getChildByName"]('Rank1_Body');
      this['waitBodyArr'][2] = this["waitBodyParts"]['getChildByName']("Rank2_BodyA");
      this["waitBodyArr"][3] = this['waitBodyParts']["getChildByName"]("Rank2_BodyB");
      this["waitBodyArr"][4] = this["waitBodyParts"]["getChildByName"]("Rank2_BodyC");
      this["waitBodyArr"][5] = this['waitBodyParts']["getChildByName"]("Rank0_Shose");
      this["waitBodyArr"][6] = this['waitBodyParts']["getChildByName"]("Rank1_Shose");
      this["waitBodyArr"][7] = _0x1c6174["getChildAt"](0);
      this["waitBodyArr"][8] = _0x1c6174["getChildAt"](1);
      this["waitBodyArr"][9] = this["waitBodyParts"]['getChildByName']("Rank2_ShoseC");
      this["waitBodyArr"][10] = _0x48cb3e["getChildByName"]("Rank0Hair_TTGHairC");
      this["waitBodyArr"][11] = _0x48cb3e["getChildByName"]('Rank1Hair_TTGHairB');
      this['waitBodyArr'][12] = _0x48cb3e["getChildByName"]("Rank2AHair_TTGHairE1");
      this["waitBodyArr"][13] = _0x48cb3e["getChildByName"]("Rank2BHair_TTGHairD");
      this["waitBodyArr"][14] = _0x48cb3e['getChildByName']('Rank2CHair_TTGHairB1');
    }

    ['setWaitBodyShow']() {
      for (let _0x39dbb4 = 0; _0x39dbb4 < 15; ++_0x39dbb4) {
        this['waitBodyArr'][_0x39dbb4]['active'] = this["bodyArrIndex"][_0x39dbb4];
      }
    }

    ["setMove"](_0x332d08) {
      this['isMove'] = _0x332d08;
      this['playAnimation'](2);
      _0x332d08 && this['setStart']();
    }

    ['reset']() {
      this['isMove'] = false;
      this['playAnimation'](1);
      this["effectArr"][0]["active"] = true;
      this["spotLight"]['active'] = false;
      this['isEndMove'] = false;
      this["setInitArr"]();
      this["isTripAni"] = false;
      this["addOffx"] = 0;
      this["curentCoin"] = 0;
      this["gameBuyCoin"] = 0;
      this['single']["transform"]["position"] = this["oriPos"]["clone"]();
      this["single"]['transform']['rotation'] = this['oriAngle']['clone']();
    }

    ['lateGameOver']() {}

    ["gameVictory"]() {
      this["isMove"] = false;

      _0x5adfe2["gameMgr"]["playVibrate"](false);

      _0x5adfe2['soundMgr']["stopBGM"]();

      this["single"]['transform']["position"]["clone"]()['y'] += 6;
      Laya["timer"]["once"](8000, this, function () {
        _0x5adfe2['gameMgr']['isVictory'] = true;

        _0x5adfe2["gameMgr"]["gameOver"]();
      });
    }

    ["gameFail"]() {
      this["isMove"] = false;

      _0x5adfe2["gameMgr"]["playVibrate"](false);

      _0x5adfe2["soundMgr"]["stopBGM"]();

      Laya["timer"]["once"](7000, this, function () {
        _0x5adfe2["gameMgr"]["isVictory"] = false;

        _0x5adfe2["gameMgr"]['gameOver']();
      });
    }

    ['onUpdate']() {
      this["delta"] = Laya["timer"]["delta"];
      this['delta'] > 50 && (this["delta"] = 20);
      this['isMove'] && (this["playMove"](), this["setChangeCoin"]());
    }

    ["setCarLocalAngle"](_0x3c35d7) {
      this["single"]["transform"]["position"]['clone']()['z'] > _0x5adfe2["gameMgr"]["groundMgr"]["endDis"] + 29 || (this["addOffx"] += 0.011 * -_0x3c35d7, this["addOffx"] > 0.11 && (this["addOffx"] = 0.11), this["addOffx"] < -0.11 && (this["addOffx"] = -0.11));
    }

    ["setOffx"]() {
      let _0x50a108 = this["single"]["transform"]["position"]["clone"](),
          _0x14e889 = _0x50a108["clone"]();

      _0x50a108['x'] += this["addOffx"];
      _0x50a108['x'] < -2.6 && (_0x50a108['x'] = -2.6);
      _0x50a108['x'] > 2.6 && (_0x50a108['x'] = 2.6);
      this["single"]["transform"]["position"] = _0x50a108["clone"]();
      this["calculatePos"](_0x14e889, true);
      this["addOffx"] *= 0.85;
    }

    ["playMove"]() {
      let _0xfb7adb = this["single"]["transform"]["position"]['clone'](),
          _0x20265f = _0xfb7adb["clone"]();

      if (_0xfb7adb['z'] += this["delta"] / 1000 * this['speed'] * this["addSpeed"], _0xfb7adb['z'] > _0x5adfe2["gameMgr"]["groundMgr"]["endDis"] + 29 && (_0xfb7adb['x'] *= 0.95, this["single"]["transform"]["localRotationEulerY"] += 0.4, this["single"]["transform"]["localRotationEulerY"] > 20 && (this["single"]["transform"]["localRotationEulerY"] = 20)), this["single"]["transform"]["position"] = _0xfb7adb["clone"](), this['calculatePos'](_0x20265f, false), this["calculateProp"](), _0xfb7adb['z'] > _0x5adfe2['gameMgr']["groundMgr"]['endDis'] + 29 && !this["isEndMove"] && (this["isEndMove"] = true, _0x5adfe2['gameMgr']["cameraLg"]["endMove"]()), _0xfb7adb['z'] > _0x5adfe2["gameMgr"]["groundMgr"]["endDis"] + 34 && (this["setWaitBodyShow"](), this["playAnimation"](7), _0x5adfe2["gameMgr"]["cameraLg"]["endMove2"](), this["isMove"] = false, this["getClothCount"]() ? this["gameVictory"]() : this["gameFail"]()), _0x5adfe2["commonData"]['GGame']) {
        let _0x4daaca = _0xfb7adb['z'] / (_0x5adfe2["gameMgr"]['groundMgr']["endDis"] + 29);

        _0x4daaca < 0 && (_0x4daaca = 0);
        _0x4daaca > 1 && (_0x4daaca = 1);

        _0x5adfe2["commonData"]["GGame"]["setProValue"](_0x4daaca);
      }

      this["setOffx"]();
    }

    ["calculatePos"](_0x37b110, _0x371415) {
      let _0x4621e0 = this['single']["transform"]["position"]["clone"](),
          _0x4cd2a4 = _0x5adfe2['gameMgr']["obstacleLg"]["scenePropArr"];

      for (let _0x4d1151 = 0; _0x4d1151 < _0x4cd2a4['length']; ++_0x4d1151) {
        let _0x5b5a0b = _0x4cd2a4[_0x4d1151]['item']["transform"]["position"]["clone"]()['z'] - _0x4621e0['z'];

        if (23 == _0x4cd2a4[_0x4d1151]["type"] && _0x5b5a0b > -10 && _0x5b5a0b < 10 && _0x5adfe2["utils"]["pointInBox"](_0x4621e0["clone"](), _0x4cd2a4[_0x4d1151]["item"]["getChildAt"](1))) {
          _0x371415 ? _0x4621e0['x'] = _0x37b110['x'] : _0x4621e0['x'] < 0 ? _0x4621e0['x'] = -0.2 : _0x4621e0['x'] = 0.2;
          this["single"]["transform"]["position"] = _0x4621e0["clone"]();
          break;
        }
      }
    }

    ["calculateProp"]() {
      if (this["count"]++ % 2 == 0) {
        return;
      }

      let _0x236b09 = this["single"]["transform"]["position"]["clone"](),
          _0x429186 = _0x5adfe2["gameMgr"]["obstacleLg"]["scenePropArr"];

      for (let _0x208d90 = 0; _0x208d90 < _0x429186['length']; ++_0x208d90) {
        let _0x399b35 = _0x429186[_0x208d90]["item"]["transform"]["position"]["clone"]()['z'] - _0x236b09['z'];

        if (_0x429186[_0x208d90]["isActive"] && _0x429186[_0x208d90]["item"]["active"] && _0x399b35 > -2 && _0x399b35 < 30) {
          let _0x427628 = _0x429186[_0x208d90]["item"];

          if (_0x429186[_0x208d90]['type'] > 5 && _0x429186[_0x208d90]["type"] < 21) {
            if (_0x427628 && _0x427628["parent"] && _0x5adfe2["utils"]['pointInBox'](_0x236b09, _0x427628['getChildByName']("Cube")) && (this["judgeGetCloth"](_0x427628, _0x429186[_0x208d90]["type"], _0x429186[_0x208d90]["value"]), _0x429186[_0x208d90]["isActive"] = false), _0x399b35 < 27 && _0x399b35 > -0.5 && !_0x429186[_0x208d90]["bSetCoin"]) {
              _0x429186[_0x208d90]['bSetCoin'] = true;

              let _0x29f2b4 = 0,
                  _0x52b5aa = this["gameBuyCoin"],
                  _0x1c8b46 = -1;

              6 != _0x429186[_0x208d90]["type"] && 11 != _0x429186[_0x208d90]["type"] && 16 != _0x429186[_0x208d90]["type"] && (_0x1c8b46 = _0x52b5aa >= 2000 ? Math["random"]() < 0.3 ? 1 : 2 : 1);
              _0x29f2b4 = _0x5adfe2["gameMgr"]["obstacleLg"]["setBuyCoin"](_0x427628, _0x429186[_0x208d90]['type'], _0x1c8b46);
              _0x429186[_0x208d90]["value"] = _0x29f2b4;
            }
          } else {
            if (_0x399b35 > -2 && (_0x399b35 < 5 || _0x399b35 < 21 && 3 == _0x429186[_0x208d90]["type"])) {
              switch (_0x429186[_0x208d90]["type"]) {
                case 1:
                  if (_0x5adfe2["utils"]["pointInBox"](_0x236b09, _0x427628["getChildByName"]("Cube"))) {
                    this["gameBuyCoin"] += 500;
                    _0x427628["active"] = false;
                    _0x429186[_0x208d90]["isActive"] = false;

                    let _0x4fe5c5 = _0x236b09['clone']();

                    _0x4fe5c5['y'] += 1;

                    _0x5adfe2['gameMgr']['effectMgr']["playEffect"](1, _0x4fe5c5, this['single']);

                    (_0x4fe5c5 = _0x427628["transform"]["position"]["clone"]())['y'] += 0.3;

                    _0x5adfe2["gameMgr"]["effectMgr"]['playEffect'](0, _0x4fe5c5);

                    _0x5adfe2["commonData"]['GGame']["setCoinAni"]();

                    _0x5adfe2["gameMgr"]['playVibrate'](true);

                    _0x5adfe2['soundMgr']['play']("eatStar");
                  }

                  break;

                case 2:
                  if (_0x5adfe2["utils"]["pointInBox"](_0x236b09, _0x427628["getChildByName"]('Cube'))) {
                    this["gameBuyCoin"] += 100;
                    _0x427628["active"] = false;
                    _0x429186[_0x208d90]["isActive"] = false;

                    let _0x269517 = _0x236b09['clone']();

                    _0x269517['y'] += 1;

                    _0x5adfe2["gameMgr"]["effectMgr"]['playEffect'](1, _0x269517, this["single"]);

                    (_0x269517 = _0x427628["transform"]['position']['clone']())['y'] += 0.3;

                    _0x5adfe2["gameMgr"]["effectMgr"]["playEffect"](0, _0x269517);

                    _0x5adfe2["commonData"]["GGame"]["setCoinAni"]();

                    _0x5adfe2['gameMgr']["playVibrate"](true);

                    _0x5adfe2["soundMgr"]["play"]("eatStar");
                  }

                  break;

                case 3:
                  _0x399b35 < 20 && _0x399b35 > -0.5 && !_0x429186[_0x208d90]["bCheck"] && (_0x5adfe2["gameMgr"]["obstacleLg"]['changeCloth'](_0x208d90, this['bodyArrIndex']), _0x429186[_0x208d90]["bCheck"] = true);
                  break;

                case 4:
                case 5:
                  _0x5adfe2["utils"]['pointInBox'](_0x236b09, _0x427628["getChildByName"]('Cube')) && (_0x429186[_0x208d90]["isActive"] = false, this['hideCloth'](), this["setDropCloth"]());
                  break;

                case 22:
                  for (let _0x250a20 = 0; _0x250a20 < _0x427628["numChildren"]; ++_0x250a20) {
                    let _0x325a5f = _0x427628["getChildAt"](_0x250a20);

                    if ('Cube' == _0x325a5f["name"] && _0x5adfe2["utils"]["pointInBox"](_0x236b09, _0x325a5f)) {
                      _0x429186[_0x208d90]["isActive"] = false;
                      this['hideCloth']();
                      return void this["setDropCloth"]();
                    }
                  }

              }
            }
          }
        }
      }
    }

    ["setBuyCoin"]() {
      let _0x393c5c = new Date()["valueOf"]();

      _0x393c5c - this["lastCoinTime"] > 80 && (this['lastCoinTime'] = _0x393c5c, this["curentCoin"] != this['gameBuyCoin'] && _0x5adfe2["commonData"]['GGame']["setGameBuyCoin"](this["curentCoin"]));
    }

    ["setChangeCoin"]() {
      Math["abs"](this['curentCoin'] - this["gameBuyCoin"]) < 10 && this["curentCoin"] != this["gameBuyCoin"] ? (this['curentCoin'] = this['gameBuyCoin'], _0x5adfe2['commonData']["GGame"]['setGameBuyCoin'](this["curentCoin"])) : (this["curentCoin"] < this["gameBuyCoin"] && (this['curentCoin'] += 5 + Math['floor'](Math['random']() * (this["gameBuyCoin"] - this['curentCoin']) * 0.1)), this["curentCoin"] > this['gameBuyCoin'] && (this["curentCoin"] -= 5 + Math["floor"](Math["random"]() * (this["curentCoin"] - this["gameBuyCoin"]) * 0.1)), this['setBuyCoin']());
    }

    ["setDropCloth"]() {
      this["isTripAni"] || (_0x5adfe2["gameMgr"]["playVibrate"](false), _0x5adfe2["soundMgr"]['play']("subCloth"), _0x5adfe2["commonData"]["GGame"]["showSayArr"](false), this['effectArr'][2]["active"] = false, this["effectArr"][2]["active"] = true, this["playAnimation"](5), this["isTripAni"] = true, Laya["timer"]["once"](1167, this, this["lateRevert"]));
    }

    ["hideCloth"]() {
      let _0x2e2e29 = [];

      for (let _0x183c99 = 0; _0x183c99 < this["bodyArrIndex"]["length"]; ++_0x183c99) {
        this["bodyArrIndex"][_0x183c99] && 0 != _0x183c99 && 5 != _0x183c99 && 10 != _0x183c99 && _0x2e2e29["push"](_0x183c99);
      }

      if (this["gameBuyCoin"] = Math["floor"](2 * this["gameBuyCoin"] / 3), _0x2e2e29["length"] > 0) {
        let _0x3c8ad5 = Math["floor"](Math["random"]() * _0x2e2e29['length']);

        _0x3c8ad5 = _0x2e2e29[_0x3c8ad5];
        this["bodyArrIndex"][_0x3c8ad5] = false;
        this["bodyArr"][_0x3c8ad5]["active"] = false;
        this["bodyArrIndex"][5 * Math["floor"](_0x3c8ad5 / 5)] = true;
        this["bodyArr"][5 * Math["floor"](_0x3c8ad5 / 5)]['active'] = true;
        this["judgeArr"][Math["floor"](_0x3c8ad5 / 5)] = 0;
        this['setAiFollow'](Math["floor"](_0x3c8ad5 / 5), false);
      }
    }

    ['setAiFollow'](_0x5e862e, _0x2f0802) {
      _0x5adfe2["gameMgr"]["aiRootMgr"]["aiArr"][_0x5e862e]['lg']['bSet'] = _0x2f0802;

      _0x5adfe2["gameMgr"]["aiRootMgr"]["aiArr"][_0x5e862e]['lg']["setEffect"](_0x2f0802);

      _0x5adfe2["commonData"]["GGame"] && _0x5adfe2["commonData"]["GGame"]['showSkinInfo'](this["judgeArr"], this["bodyArrIndex"]);
      this["spotLight"]['active'] = this["judgeArr"][0] > 0 && this["judgeArr"][1] > 0 && this["judgeArr"][2] > 0;

      for (let _0x3fe961 = 0; _0x3fe961 < 3; ++_0x3fe961) {
        if (this["judgeArr"][_0x3fe961] > 0) {
          return void (this["effectArr"][0]["active"] = false);
        }
      }

      this["effectArr"][0]["active"] = false;
      this["effectArr"][0]["active"] = true;
    }

    ['lateRevert']() {
      this['isTripAni'] = false;
      let _0x469992 = 0;

      for (let _0x4b5189 = 0; _0x4b5189 < 3; ++_0x4b5189) {
        this["judgeArr"][_0x4b5189] && _0x469992++;
      }

      _0x469992 > 1 ? this["playAnimation"](4) : _0x469992 > 0 ? this['playAnimation'](3) : this['playAnimation'](2);
    }

    ["getClothCount"]() {
      return this["judgeArr"][0] > 0 && this["judgeArr"][2] > 0;
    }

    ['judgeGetCloth'](_0x35876c, _0x4eb880, _0x21a171) {
      if (this["gameBuyCoin"] < _0x21a171) {
        _0x5adfe2["uiMgr"]["showToast"]("Not enough gold coins！", 2000);
      } else {
        if (this['gameBuyCoin'] -= _0x21a171, _0x35876c["active"] = false, _0x4eb880 < 11) {
          for (let _0x3ab4c7 = 0; _0x3ab4c7 < 5; ++_0x3ab4c7) {
            _0x3ab4c7 == _0x4eb880 - 6 ? (this["bodyArr"][_0x3ab4c7]['active'] = true, this['bodyArrIndex'][_0x3ab4c7] = true) : (this["bodyArr"][_0x3ab4c7]["active"] = false, this['bodyArrIndex'][_0x3ab4c7] = false);
          }
        } else {
          if (_0x4eb880 < 16) {
            for (let _0x489b5d = 0; _0x489b5d < 5; ++_0x489b5d) {
              _0x489b5d == _0x4eb880 - 11 ? (this["bodyArrIndex"][_0x489b5d + 5] = true, this["bodyArr"][_0x489b5d + 5]["active"] = true) : (this["bodyArrIndex"][_0x489b5d + 5] = false, this["bodyArr"][_0x489b5d + 5]['active'] = false);
            }
          } else {
            for (let _0x204664 = 0; _0x204664 < 5; ++_0x204664) {
              _0x204664 == _0x4eb880 - 16 ? (this["bodyArrIndex"][_0x204664 + 10] = true, this['bodyArr'][_0x204664 + 10]["active"] = true) : (this["bodyArrIndex"][_0x204664 + 10] = false, this['bodyArr'][_0x204664 + 10]["active"] = false);
            }
          }
        }

        6 == _0x4eb880 || 11 == _0x4eb880 || 16 == _0x4eb880 ? this["setDropCloth"]() : this["setGetCloth"]();
        6 == _0x4eb880 ? (this["judgeArr"][0] = 0, this["setAiFollow"](0, false)) : _0x4eb880 < 11 ? (this["judgeArr"][0]++, this["judgeArr"][0] > 2 && (this["judgeArr"][0] = 2), this["setAiFollow"](0, true)) : 11 == _0x4eb880 ? (this["judgeArr"][1] = 0, this["setAiFollow"](1, false)) : _0x4eb880 < 16 ? (this['judgeArr'][1]++, this["judgeArr"][1] > 2 && (this["judgeArr"][1] = 2), this["setAiFollow"](1, true)) : 16 == _0x4eb880 ? (this["judgeArr"][2] = 0, this['setAiFollow'](2, false)) : (this["judgeArr"][2]++, this["judgeArr"][2] > 2 && (this["judgeArr"][2] = 2), this['setAiFollow'](2, true));
      }
    }

    ["setGetCloth"]() {
      this["isGetAni"] || (_0x5adfe2["gameMgr"]["playVibrate"](false), _0x5adfe2["soundMgr"]["play"]('addCloth'), _0x5adfe2['commonData']['GGame']['showSayArr'](true), _0x5adfe2['gameMgr']["cameraLg"]["buyAni1"](), this['effectArr'][1]["active"] = false, this['effectArr'][1]['active'] = true, this["isGetAni"] = true, this['playAnimation'](6), Laya['timer']["once"](1200, this, this["lateGetRevert"]));
    }

    ['lateGetRevert']() {
      this['isGetAni'] = false;
      let _0x45c058 = 0;

      for (let _0x53ef83 = 0; _0x53ef83 < 3; ++_0x53ef83) {
        this["judgeArr"][_0x53ef83] > 0 && _0x45c058++;
      }

      _0x45c058 > 1 ? this["playAnimation"](4) : _0x45c058 > 0 ? this['playAnimation'](3) : this["playAnimation"](2);
    }

  }

  class _0x4dff27 extends Laya["Script"] {
    ["init"](_0x435625) {
      this["single"] = _0x435625;

      let _0x69a2c9 = this['single']["getChildAt"](0);

      this['skinShowSp'] = Laya["Sprite3D"]['instantiate'](_0x69a2c9);
      _0x69a2c9["transform"]["position"] = new Laya["Vector3"](0, 0, 0);
      this["showPlayer"] = _0x69a2c9;
      this["showPlayerLg"] = _0x69a2c9['addComponent'](_0xb96294);
      this["showPlayerLg"]["init"](_0x69a2c9, 0);
      this["changeSkin"]();
    }

    ['changeSkin'](_0xc9ea4a = []) {
      _0xc9ea4a && _0xc9ea4a["length"] > 0 && this["showPlayerLg"]["setSkinArr"](_0xc9ea4a);
    }

    ["setPlayerMove"](_0x2edbdb) {
      this["showPlayerLg"]["isMove"] && this["showPlayerLg"]["setCarLocalAngle"](1 * _0x2edbdb);
    }

    ["setMove"](_0x23aaf7) {
      this['showPlayerLg']["setMove"](_0x23aaf7);
    }

    ["reSetPlayer"]() {
      this["showPlayerLg"]['reset']();
    }

  }

  class _0x664899 extends Laya['Script'] {
    constructor() {
      super(...arguments);
      this["isMove"] = false;
      this["oriAngle"] = null;
      this["distance"] = null;
      this['startMp'] = null;
      this["oriDistance"] = null;
      this["oriAngle2"] = null;
      this["oriPos2"] = null;
      this["smoothness"] = 1;
      this["lastPos"] = null;
      this["startp"] = new Laya["Vector3"](0, 3.5, -5.36);
      this['startAngle'] = new Laya["Vector3"](-14.946, 0, 0);
      this["startValue"] = 0;
      this['buyAnip'] = new Laya["Vector3"](0, 2.45, -4.09);
      this["buyAniAngle"] = new Laya['Vector3'](-12.622, 0, 0);
      this["endValue"] = 0;
    }

    ["init"](_0x29c237) {
      this['single'] = _0x29c237;
      this['player'] = _0x5adfe2['gameMgr']["playerLg"]["showPlayer"];

      let _0x2bd3b4 = this["single"]["transform"]['position']['clone']();

      this["distance"] = new Laya["Vector3"](0, 0, 0);
      Laya["Vector3"]["subtract"](_0x2bd3b4, this["player"]['transform']["position"]['clone'](), this['distance']);
      this["orip"] = this["single"]["transform"]["position"]["clone"]();
      this["oriAngle"] = this['single']["transform"]["rotation"]["clone"]();
      console["log"]("光的角度： ", _0x5adfe2["gameMgr"]['light']['transform']["localRotationEulerY"]);
      _0x5adfe2["gameMgr"]["light"]["transform"]["localRotationEulerY"] += 180;
      this["oriDistance"] = this["distance"]['clone']();
      this["setStartInfo"](true);
    }

    ["setStartInfo"](_0x5caa1c) {
      _0x5caa1c ? (this["oriPos2"] = this["single"]['transform']["position"]["clone"](), this["oriAngle2"] = this["single"]['transform']["rotation"]["clone"]()) : (this["startMp"] = this["oriPos2"]['clone'](), this["single"]["transform"]["position"] = this["startMp"]["clone"](), this['single']['transform']["rotation"] = this["oriAngle2"]["clone"](), this["distance"] = this["oriDistance"]["clone"]());
    }

    ["setCameraData"](_0x4cfc05) {
      this['isMove'] = _0x4cfc05;
      _0x4cfc05 && (this["player"] = _0x5adfe2["gameMgr"]['playerLg']["showPlayer"]);
    }

    ["onLateUpdate"]() {
      let _0x3d471f = _0x5adfe2["gameMgr"]["playerLg"]["showPlayerLg"];

      if (this["isMove"] && (_0x3d471f["isMove"] || _0x3d471f["isEndMove"])) {
        let _0x4cdde2 = this["player"]["transform"]["position"]["clone"]();

        Laya["Vector3"]["add"](_0x4cdde2, this["distance"], _0x4cdde2);
        this['single']["transform"]["position"] = _0x4cdde2['clone']();
      }
    }

    ["startMove"]() {
      this["isMove"] = false;

      let _0x2c4470 = this["single"]["transform"]["position"]["clone"](),
          _0x18bfd8 = this['player']["transform"]["position"]["clone"]();

      console["log"](this['single']["transform"]["localRotationEulerY"]);

      let _0x4a1258 = _0x5adfe2["gameMgr"]["light"]["transform"]['localRotationEulerY'],
          _0x5d8496 = new Laya['Vector3'](0, 0, 0);

      Laya['Vector3']["lerp"](_0x2c4470, this["startp"], 0.8, _0x5d8496);
      _0x5d8496['x'] += 11;
      this["startValue"] = 0;
      Laya["Tween"]['to'](this, {
        'startValue': 1
      }, 2000, Laya['Ease']["linearIn"], new Laya['Handler'](this, function () {
        this["distance"] = new Laya["Vector3"](0, 0, 0);
        Laya["Vector3"]["subtract"](this["single"]['transform']["position"]['clone'](), _0x18bfd8, this["distance"]);
        console["log"](this["single"]["transform"]['localRotationEulerX']);
      }))["update"] = new Laya["Handler"](this, function () {
        _0x5adfe2["gameMgr"]["light"]["transform"]["localRotationEulerY"] = _0x4a1258 + 180 * this["startValue"];

        let _0x4bc977 = _0x5adfe2["utils"]["calculatePos"](this["startValue"], _0x2c4470, _0x5d8496, this["startp"]);

        this["single"]["transform"]["position"] = _0x4bc977["clone"]();

        let _0x3c075a = _0x18bfd8["clone"]();

        _0x3c075a['y'] += 1.13 + 0.94 * this["startValue"];
        this["single"]['transform']['lookAt'](_0x3c075a, new Laya["Vector3"](0, 1, 0), false);
      });
    }

    ["buyAni1"]() {
      let _0x4c56ed = this["single"]["transform"]["position"]['clone'](),
          _0x339508 = _0x4c56ed["clone"](),
          _0x13ef2e = this["player"]['transform']["position"]["clone"](),
          _0x4c3a40 = _0x13ef2e["clone"]();

      Laya["Vector3"]["add"](_0x13ef2e, this["buyAnip"], _0x4c3a40);
      _0x5adfe2['gameMgr']["light"]["transform"]["localRotationEulerY"];

      let _0x9ae988 = new Laya["Vector3"](0, 0, 0);

      Laya['Vector3']["lerp"](_0x4c56ed, _0x4c3a40, 0.5, _0x9ae988);
      _0x9ae988['y'] -= 0.5;
      this["startValue"] = 0;
      Laya["Tween"]['to'](this, {
        'startValue': 1
      }, 500, Laya['Ease']['quadOut'], new Laya["Handler"](this, function () {
        this["distance"] = new Laya["Vector3"](0, 0, 0);
        Laya['Vector3']["subtract"](this["single"]["transform"]["position"]["clone"](), _0x13ef2e, this["distance"]);
        Laya['timer']["once"](200, this, function () {
          this["buyAni2"]();
        });
      }))['update'] = new Laya['Handler'](this, function () {
        _0x13ef2e = this["player"]["transform"]["position"]['clone']();
        _0x4c3a40 = _0x13ef2e["clone"]();
        Laya['Vector3']["add"](_0x13ef2e, this["buyAnip"], _0x4c3a40);
        (_0x4c56ed = this["single"]["transform"]["position"]['clone']())['y'] = _0x339508['y'];
        Laya["Vector3"]["lerp"](_0x4c56ed, _0x4c3a40, 0.5, _0x9ae988);
        _0x9ae988['y'] -= 0.5;

        let _0x55709d = _0x5adfe2["utils"]["calculatePos"](this["startValue"], _0x4c56ed, _0x9ae988, _0x4c3a40);

        this["single"]["transform"]['position'] = _0x55709d["clone"]();

        let _0x3a3e8b = _0x13ef2e["clone"]();

        _0x3a3e8b['y'] += 2.07 - 0.53 * this["startValue"];
        this['single']["transform"]["lookAt"](_0x3a3e8b, new Laya["Vector3"](0, 1, 0), false);
      });
    }

    ['buyAni2']() {
      let _0x3fd51a = this["single"]["transform"]["position"]['clone'](),
          _0x3b2f6b = _0x3fd51a["clone"](),
          _0x2f400d = this["player"]['transform']["position"]['clone']();

      console["log"](this["single"]['transform']["localRotationEulerY"]);
      _0x5adfe2["gameMgr"]["light"]["transform"]['localRotationEulerY'];

      let _0x26d9d0 = _0x2f400d['clone']();

      Laya["Vector3"]["add"](_0x2f400d, this["startp"], _0x26d9d0);

      let _0x4f34a0 = new Laya["Vector3"](0, 0, 0);

      Laya["Vector3"]['lerp'](_0x3fd51a, _0x26d9d0, 0.8, _0x4f34a0);
      _0x4f34a0['x'] += 11;
      this["startValue"] = 0;
      Laya["Tween"]['to'](this, {
        'startValue': 1
      }, 500, Laya['Ease']['quadIn'], new Laya["Handler"](this, function () {
        this["distance"] = new Laya["Vector3"](0, 0, 0);
        Laya["Vector3"]["subtract"](this["single"]["transform"]["position"]["clone"](), _0x2f400d, this['distance']);
      }))["update"] = new Laya["Handler"](this, function () {
        _0x2f400d = this["player"]["transform"]['position']["clone"]();
        _0x26d9d0 = _0x2f400d['clone']();
        Laya["Vector3"]["add"](_0x2f400d, this["startp"], _0x26d9d0);
        (_0x3fd51a = this["single"]["transform"]['position']["clone"]())['y'] = _0x3b2f6b['y'];
        Laya["Vector3"]['lerp'](_0x3fd51a, _0x26d9d0, 0.5, _0x4f34a0);
        _0x4f34a0['y'] -= 0.5;

        let _0x111f84 = _0x5adfe2["utils"]["calculatePos"](this["startValue"], _0x3fd51a, _0x4f34a0, _0x26d9d0);

        this['single']["transform"]['position'] = _0x111f84["clone"]();

        let _0x32bcf1 = _0x2f400d["clone"]();

        _0x32bcf1['y'] += 1.54 + 0.53 * this["startValue"];
        this['single']["transform"]['lookAt'](_0x32bcf1, new Laya["Vector3"](0, 1, 0), false);
      });
    }

    ["endMove"]() {
      this['isMove'] = false;

      _0x5adfe2["gameMgr"]["aiRootMgr"]['hdieAi']();

      for (let _0x5aef1a = 0; _0x5aef1a < _0x5adfe2['gameMgr']['groundMgr']['endAiArr']['length']; ++_0x5aef1a) {
        _0x5adfe2['gameMgr']["groundMgr"]["endAiArr"][_0x5aef1a]['active'] = true;
      }

      let _0x5207ad = _0x5adfe2["gameMgr"]["groundMgr"]["endRoot"]["getChildByName"]("camera");

      this["single"]['transform']["position"] = _0x5207ad["transform"]["position"]["clone"]();

      let _0x2f561c = _0x5207ad['transform']['localRotationEuler']["clone"]();

      _0x2f561c['y'] += 180;
      this["single"]["transform"]["localRotationEuler"] = _0x2f561c['clone']();
      _0x5adfe2["gameMgr"]["light"]["transform"]["localRotationEulerY"] += 180;
    }

    ["endMove2"]() {
      this['isMove'] = false;

      let _0x478bc9 = this["single"]['transform']['position']["clone"](),
          _0x2b21dc = this["player"]["transform"]["position"]['clone'](),
          _0x10fa7a = new Laya['Vector3'](0, 0, 0);

      this["player"]["transform"]['getForward'](_0x10fa7a);
      Laya["Vector3"]["normalize"](_0x10fa7a, _0x10fa7a);
      Laya["Vector3"]["dot"](_0x10fa7a, new Laya["Vector3"](0, 0, 1));
      Laya["Vector3"]["subtract"](_0x478bc9, _0x2b21dc, this["distance"]);

      let _0x1ffdc3 = 0.5 * -Math['PI'],
          _0x2879d8 = _0x5adfe2["gameMgr"]["light"]["transform"]["localRotationEulerY"];

      this["endValue"] = 0;
      Laya['Tween']['to'](this, {
        'endValue': 1
      }, 1300, Laya["Ease"]["linearIn"], new Laya["Handler"](this, function () {
        _0x5adfe2["gameMgr"]["groundMgr"]["endBoyAni"]();
      }))["update"] = new Laya['Handler'](this, function () {
        let _0x4218ce = this["endValue"] * _0x1ffdc3,
            _0x1f5664 = Math["sin"](_0x4218ce),
            _0x56a93d = Math['cos'](_0x4218ce),
            _0x1a7cce = this["distance"]["clone"]();

        Laya["Vector3"]["scale"](_0x1a7cce, 1 + 0.1 * this["endValue"], _0x1a7cce);
        let _0xf34fc5 = _0x1a7cce['x'],
            _0x3875cb = _0x1a7cce['z'];
        _0x1a7cce['x'] = _0xf34fc5 * _0x56a93d - _0x3875cb * _0x1f5664;
        _0x1a7cce['z'] = _0x3875cb * _0x56a93d + _0xf34fc5 * _0x1f5664;
        Laya["Vector3"]["add"](_0x2b21dc, _0x1a7cce, _0x1a7cce);
        _0x1a7cce['y'] = this['distance']['y'] * (1 - 0.1 * this["endValue"]);
        _0x1a7cce['z'] += 3.5 * this['endValue'];
        _0x5adfe2["gameMgr"]["light"]["transform"]["localRotationEulerY"] = _0x2879d8 + 180 * this["endValue"] * 0.5;
        this["single"]["transform"]["position"] = _0x1a7cce["clone"]();

        let _0x4b79b5 = _0x2b21dc["clone"]();

        _0x4b79b5['y'] += 1;
        _0x4b79b5['z'] += 0.5 * this["endValue"];
        this["single"]["transform"]['lookAt'](_0x4b79b5, new Laya['Vector3'](0, 1, 0), false);
      });
    }

    ["reSet"]() {
      this["isMove"] = false;
      this["single"]['transform']["position"] = this["orip"]["clone"]();
      this['single']['transform']["rotation"] = this["oriAngle"]["clone"]();
      this['player'] = _0x5adfe2['gameMgr']["playerLg"]['showPlayer'];
      _0x5adfe2['gameMgr']["light"]["transform"]["localRotationEulerY"] = 30;
      this["setStartInfo"](false);
    }

  }

  class _0x2c8c98 extends Laya["Script"] {
    constructor() {
      super(...arguments);
      this["type"] = 0;
      this['isMove'] = false;
      this["aniOffy"] = null;
      this['orip'] = null;
      this['delta'] = 20;
      this['offx'] = 0;
      this["addx"] = 0.03;
      this["angle"] = 0;
    }

    ['init'](_0x51ae92, _0x2ab670) {
      this["single"] = _0x51ae92;
      this["type"] = _0x2ab670;
      this["isMove"] = true;
      this["orip"] = this['single']["transform"]["position"]["clone"]();
      this["offx"] = 5.4 * Math["random"]() - 2.7;

      for (let _0x361b88 = 0; _0x361b88 < this["single"]['numChildren']; ++_0x361b88) {
        let _0x4e944c = this['single']["getChildAt"](_0x361b88);

        "Cube" == _0x4e944c["name"] && 23 != _0x2ab670 && (_0x4e944c['active'] = false);
      }

      let _0x34b0a1 = this['single']["getChildByName"]("nsdds_04");

      _0x34b0a1 && (_0x34b0a1['active'] = false, _0x34b0a1["removeSelf"]());
      this['angle'] = 100 * Math["random"]();
    }

    ["clear"]() {
      this['single']["active"] = false;
      this['isMove'] = false;
      this["type"] > 5 && this['type'] < 22 && this["single"]["removeSelf"]();
      Laya["timer"]["clearAll"](this);
    }

    ["onLateUpdate"]() {
      this["isMove"] && (this["delta"] = Laya["timer"]["delta"], this["delta"] > 50 && (this['delta'] = 20), 1 == this['type'] && this["playAni1"](), 5 == this["type"] && this['playAni5'](), 22 == this['type'] && this['playAni22'](), this["type"] > 5 && this["type"] < 21 && this["rotateLocal"]());
    }

    ['playAni1']() {
      this["offx"] += this['addx'];
      this["offx"] > 2.7 && (this['addx'] = -0.03);
      this["offx"] < -2.7 && (this["addx"] = 0.03);
      this["single"]['transform']["position"] = new Laya["Vector3"](this['offx'], this["orip"]['y'], this["orip"]['z']);
    }

    ["playAni5"]() {
      this["offx"] += this["addx"];
      this["angle"] += 45 * this["addx"];
      this["offx"] > 2.7 && (this["addx"] = -0.03);
      this["offx"] < -2.7 && (this["addx"] = 0.03);

      let _0x3934f5 = this["single"]["getChildAt"](0);

      _0x3934f5["transform"]['position'] = new Laya["Vector3"](this["offx"], this["orip"]['y'], this['orip']['z']);
      _0x3934f5["transform"]["localRotationEulerZ"] = -this["angle"];

      let _0xd8e8ba = this["single"]["getChildByName"]("Cube"),
          _0x3572fa = _0xd8e8ba["transform"]["position"]["clone"]();

      _0xd8e8ba['transform']["position"] = new Laya["Vector3"](this['offx'], _0x3572fa['y'], _0x3572fa['z']);
    }

    ["playAni22"]() {
      this["angle"] += Laya["timer"]["delta"] / 20;
      this["single"]["getChildAt"](0)["transform"]['localRotationEulerY'] = this["angle"];
    }

    ['rotateLocal']() {
      let _0x5bb41a = this["single"]["getChildAt"](0);

      this["type"] < 8 && (this["single"]["getChildAt"](1)['transform']["localRotationEulerY"] += Laya["timer"]["delta"] / 10);
      _0x5bb41a["transform"]["localRotationEulerY"] += Laya["timer"]['delta'] / 10;
    }

  }

  class _0x248602 extends Laya["Script"] {
    constructor() {
      super(...arguments);
      this["isMove"] = false;
      this["daojuArr"] = [];
      this["propDaojuArr"] = [];
      this["scenePropArr"] = [];
      this['revivalPosArr'] = [];
      this['clothArr'] = [];
      this['changeArr'] = [];
      this["coinArr"] = [10, 20, 50, 500, 1000, 1500, 2000, 2500, 3000];
      this['count'] = 0;
    }

    ["init"](_0x1f5a98) {
      this['root'] = _0x1f5a98["getChildAt"](0);
      _0x1f5a98['active'] = true;

      for (let _0x24fe3b = 0; _0x24fe3b < this["root"]["numChildren"]; ++_0x24fe3b) {
        let _0x5f01d0 = this["root"]["getChildAt"](_0x24fe3b);

        _0x5f01d0["active"] = false;

        _0x5f01d0["addComponent"](_0x2c8c98);

        this["daojuArr"][_0x24fe3b] = _0x5f01d0;
      }

      this['getconfigData']();
    }

    ["initProp"]() {
      for (let _0x4631c2 = 0; _0x4631c2 < this["daojuArr"]["length"]; ++_0x4631c2) {
        for (let _0x315bfc = 0; _0x315bfc < 3; ++_0x315bfc) {
          let _0x446deb = this["daojuArr"][_0x4631c2],
              _0x127259 = Laya["Sprite3D"]["instantiate"](_0x446deb);

          _0x127259["name"] = _0x446deb["name"];
          Laya['Pool']["recover"](_0x446deb["name"], _0x127259);
        }
      }
    }

    ['addDaoju'](_0x42ce6e) {
      let _0x44c066 = this["daojuArr"][_0x42ce6e],
          _0x354ffe = Laya["Sprite3D"]["instantiate"](_0x44c066, this["root"]);

      _0x354ffe["name"] = _0x44c066["name"];
      return _0x354ffe;
    }

    ["obstacleReset"]() {
      this["resetData"]();
      this["getconfigData"]();
    }

    ["getconfigData"]() {
      let _0x33fe2b = _0x5adfe2["configMgr"]['getLevelCfg'](),
          _0x11a7fb = _0x5adfe2["commonData"]["newLevel"] - 1;

      _0x11a7fb > 10 && (_0x11a7fb -= 2, _0x11a7fb %= 11);
      let _0x49462b = _0x33fe2b[_0x11a7fb]["models"];

      for (let _0x1310cc = 0; _0x1310cc < _0x49462b["length"]; ++_0x1310cc) {
        let _0x564453 = _0x49462b[_0x1310cc];

        if (_0x564453["name"]['startsWith']('prop')) {
          let _0x3e1072 = Laya['Pool']["getItem"](_0x564453["name"]),
              _0x2cdd0b = _0x564453["name"],
              _0x23faa8 = parseInt(_0x2cdd0b["substr"](4, _0x2cdd0b["length"] - 3));

          _0x3e1072 || (_0x3e1072 = this["addDaoju"](_0x23faa8 - 1));
          _0x3e1072["active"] = true;

          let _0x48410a = new Laya["Vector3"](_0x564453["pos"]['x'], _0x564453['pos']['y'], _0x564453["pos"]['z']),
              _0x35c8c6 = new Laya["Vector3"](_0x564453["scale"]['x'], _0x564453["scale"]['y'], _0x564453["scale"]['z']);

          _0x3e1072['transform']["position"] = _0x48410a["clone"]();
          _0x3e1072["transform"]['localScale'] = _0x35c8c6["clone"]();
          _0x3e1072['transform']["localRotationEulerY"] = _0x564453['r'];
          3 == _0x23faa8 && (_0x3e1072["transform"]["localRotationEulerY"] = 180, this["addCloth"](_0x3e1072));
          2 == _0x23faa8 && (_0x3e1072["transform"]["localRotationEulerY"] = 180);

          let _0x4b1e7c = _0x3e1072["getComponent"](_0x2c8c98);

          _0x4b1e7c["init"](_0x3e1072, _0x23faa8);

          let _0x1bd886 = {
            'item': _0x3e1072,
            'lg': _0x4b1e7c,
            'type': _0x23faa8,
            'scale': _0x35c8c6['clone'](),
            'rotate': _0x564453['r'],
            'arr': [this["clothArr"][0], this['clothArr'][1], this['clothArr'][2]],
            'isActive': true,
            'bCheck': false,
            'bSetCoin': false
          };
          this["scenePropArr"]["push"](_0x1bd886);
        }

        if (_0x564453['name']["startsWith"]("revivalPos")) {
          let _0x4b4120 = new Laya['Vector3'](_0x564453['pos']['x'], _0x564453["pos"]['y'], _0x564453["pos"]['z']);

          this["revivalPosArr"]["push"](_0x4b4120['clone']());
        }
      }
    }

    ['setClothArr']() {
      this["clothArr"] = [];
      let _0x49ca45 = [];

      for (let _0x5edb2c = 0; _0x5edb2c < 15; ++_0x5edb2c) {
        _0x49ca45[_0x5edb2c] = _0x5edb2c;
      }

      for (let _0x351578 = 0; _0x351578 < 15; ++_0x351578) {
        let _0x5e46ef = Math['floor'](Math["random"]() * (15 - _0x351578) + _0x351578),
            _0x4e57a4 = _0x49ca45[_0x5e46ef];

        _0x49ca45[_0x5e46ef] = _0x49ca45[_0x351578];
        _0x49ca45[_0x351578] = _0x4e57a4;
      }

      this["clothArr"] = _0x49ca45;
    }

    ['addCloth'](_0x5b83c2) {
      this["setClothArr"]();
      let _0x26d32f = [];
      _0x26d32f[0] = _0x5b83c2["getChildByName"]("point1");
      _0x26d32f[1] = _0x5b83c2["getChildByName"]("point2");
      _0x26d32f[2] = _0x5b83c2["getChildByName"]("point3");

      let _0x4450af = Math["random"]();

      if (_0x4450af < 0.7) {
        _0x4450af = Math['floor'](4.2 * _0x4450af);

        for (let _0x167977 = 0; _0x167977 < 3; ++_0x167977) {
          if (_0x167977 == _0x4450af) {
            let _0x54a686 = Laya["Pool"]["getItem"]("prop21"),
                _0x513ca2 = 21;

            _0x54a686 || (_0x54a686 = this["addDaoju"](20));

            _0x26d32f[_0x167977]["addChild"](_0x54a686);

            _0x54a686["active"] = true;

            let _0x1fa157 = _0x54a686['getComponent'](_0x2c8c98);

            _0x1fa157["init"](_0x54a686, _0x513ca2);

            let _0x44779e = {
              'item': _0x54a686,
              'lg': _0x1fa157,
              'type': _0x513ca2,
              'value': 0,
              'isActive': true
            };
            this["clothArr"][_0x167977] = 15;
            this["scenePropArr"]['push'](_0x44779e);
          } else {
            let _0x5133f6 = this['clothArr'][_0x167977] + 6,
                _0x31af67 = Laya["Pool"]["getItem"]('prop' + _0x5133f6);

            _0x31af67 || (_0x31af67 = this["addDaoju"](_0x5133f6 - 1));

            _0x26d32f[_0x167977]["addChild"](_0x31af67);

            _0x31af67["transform"]["localPosition"] = new Laya['Vector3'](0, 0, 0);
            _0x31af67["active"] = true;

            let _0x1e0682 = _0x31af67["getComponent"](_0x2c8c98);

            _0x1e0682['init'](_0x31af67, _0x5133f6);

            let _0x295568 = 0,
                _0x8f7b39 = {
              'item': _0x31af67,
              'lg': _0x1e0682,
              'type': _0x5133f6,
              'value': _0x295568 = this["setBuyCoin"](_0x31af67, _0x5133f6),
              'isActive': true
            };
            this["scenePropArr"]["push"](_0x8f7b39);
          }
        }
      } else {
        for (let _0x718380 = 0; _0x718380 < 3; ++_0x718380) {
          let _0x13208a = this["clothArr"][_0x718380] + 6,
              _0x37b8fb = Laya["Pool"]["getItem"]("prop" + _0x13208a);

          _0x37b8fb || (_0x37b8fb = this['addDaoju'](_0x13208a - 1));

          _0x26d32f[_0x718380]['addChild'](_0x37b8fb);

          _0x37b8fb['transform']["localPosition"] = new Laya["Vector3"](0, 0, 0);
          _0x37b8fb["active"] = true;

          let _0x40fee0 = _0x37b8fb["getComponent"](_0x2c8c98);

          _0x40fee0['init'](_0x37b8fb, _0x13208a);

          let _0x356fd4 = 0,
              _0x405707 = {
            'item': _0x37b8fb,
            'lg': _0x40fee0,
            'type': _0x13208a,
            'value': _0x356fd4 = this["setBuyCoin"](_0x37b8fb, _0x13208a),
            'isActive': true
          };
          this["scenePropArr"]["push"](_0x405707);
        }
      }
    }

    ["setChangeArr"](_0x19228a, _0x7a6d0a) {
      let _0x417783 = [];

      for (let _0x37db6a = 0; _0x37db6a < _0x7a6d0a["length"]; ++_0x37db6a) {
        _0x7a6d0a[_0x37db6a] && _0x417783["push"](_0x37db6a);
      }

      let _0x19beca = [],
          _0x5b0c73 = this["scenePropArr"][_0x19228a]['arr'],
          _0x272f36 = _0x5adfe2["gameMgr"]["playerLg"]["showPlayerLg"]['bodyArrIndex'];

      for (let _0x1a5809 = 0; _0x1a5809 < 15; ++_0x1a5809) {
        _0x19beca[_0x1a5809] = _0x1a5809;
      }

      for (let _0x454aa7 = 0; _0x454aa7 < 15; ++_0x454aa7) {
        let _0x5c5b22 = Math["floor"](Math['random']() * (15 - _0x454aa7) + _0x454aa7),
            _0x950408 = _0x19beca[_0x5c5b22];

        _0x19beca[_0x5c5b22] = _0x19beca[_0x454aa7];
        _0x19beca[_0x454aa7] = _0x950408;
      }

      for (let _0xf07aa5 = 0; _0xf07aa5 < 15; ++_0xf07aa5) {
        _0x272f36[_0xf07aa5] || _0x19beca[_0xf07aa5] == _0x5b0c73[0] || _0x19beca[_0xf07aa5] == _0x5b0c73[1] || _0x19beca[_0xf07aa5] == _0x5b0c73[2] || _0x19beca[_0xf07aa5] == _0x417783[0] || _0x19beca[_0xf07aa5] == _0x417783[1] || _0x19beca[_0xf07aa5] == _0x417783[2] || this["changeArr"]["push"](_0x19beca[_0xf07aa5]);
      }
    }

    ["changeCloth"](_0x2732a9, _0x5659b0) {
      this['changeArr'] = [];
      this['setChangeArr'](_0x2732a9, _0x5659b0);
      let _0x11c054 = this["scenePropArr"][_0x2732a9],
          _0x513632 = this["scenePropArr"][_0x2732a9]["arr"];

      for (let _0x28caf5 = 0; _0x28caf5 < 3; ++_0x28caf5) {
        for (let _0x3fb0b5 = 0; _0x3fb0b5 < _0x5659b0["length"]; ++_0x3fb0b5) {
          if (_0x5659b0[_0x3fb0b5] && _0x3fb0b5 == _0x513632[_0x28caf5]) {
            let _0xa04e9f = _0x11c054['item']['getChildByName']("point" + (_0x28caf5 + 1)),
                _0xf1a0c9 = _0xa04e9f["getChildAt"](0);

            _0xf1a0c9["active"] = false;

            _0xf1a0c9["removeSelf"]();

            let _0x1dd7d8 = this["changeArr"][_0x28caf5] + 6,
                _0x55e6e9 = Laya["Pool"]["getItem"]("prop" + _0x1dd7d8);

            _0x55e6e9 || (_0x55e6e9 = this['addDaoju'](_0x1dd7d8 - 1));

            _0xa04e9f["addChild"](_0x55e6e9);

            _0x55e6e9["transform"]['localPosition'] = new Laya['Vector3'](0, 0, 0);
            _0x55e6e9["active"] = true;

            let _0x147ff5 = _0x55e6e9["getComponent"](_0x2c8c98);

            _0x147ff5["init"](_0x55e6e9, _0x1dd7d8);

            let _0x4bb1b1 = _0xa04e9f['transform']["position"]["clone"]();

            _0x4bb1b1['y'] = 0;

            _0x5adfe2["gameMgr"]["effectMgr"]["playEffect"](2, _0x4bb1b1);

            let _0x435716 = 0,
                _0x3c5b9d = _0x5adfe2["gameMgr"]['playerLg']["showPlayerLg"]['gameBuyCoin'],
                _0x51aba3 = -1;

            6 != _0x1dd7d8 && 11 != _0x1dd7d8 && 16 != _0x1dd7d8 && (_0x51aba3 = _0x3c5b9d >= 2000 ? Math["random"]() < 0.3 ? 1 : 2 : 1);
            let _0x488dc1 = {
              'item': _0x55e6e9,
              'lg': _0x147ff5,
              'type': _0x1dd7d8,
              'value': _0x435716 = this["setBuyCoin"](_0x55e6e9, _0x1dd7d8, _0x51aba3),
              'isActive': true
            };
            this["scenePropArr"]['push'](_0x488dc1);
            break;
          }
        }
      }
    }

    ["setBuyCoin"](_0x299033, _0x350461, _0x102e00 = -1) {
      let _0x2ab040 = 0;
      _0x2ab040 = 6 == _0x350461 || 11 == _0x350461 || 16 == _0x350461 ? 0 : 3;
      1 == _0x102e00 ? _0x2ab040 = 3 : 2 == _0x102e00 && (_0x2ab040 = 6);

      let _0x5c6deb = Math['floor'](_0x2ab040 / 3) / 3,
          _0x588167 = Math["floor"](_0x2ab040 % 3) / 3,
          _0x349d56 = _0x299033['getChildByName']("s_01c");

      _0x349d56["_render"]["material"]['tilingOffsetZ'] = _0x588167;
      _0x349d56["_render"]["material"]["tilingOffsetW"] = -_0x5c6deb;
      return this['coinArr'][_0x2ab040];
    }

    ["resetData"]() {
      let _0x50981d = this["scenePropArr"];

      for (let _0x1e0c0d = 0; _0x1e0c0d < _0x50981d["length"]; ++_0x1e0c0d) {
        _0x50981d[_0x1e0c0d]['lg']['clear']();

        Laya["Pool"]["recover"](_0x50981d[_0x1e0c0d]["item"]["name"], _0x50981d[_0x1e0c0d]["item"]);
      }

      this['scenePropArr'] = [];
    }

    ['onUpdate']() {
      if (this["count"]++ % 2 == 0) {
        return;
      }

      let _0x421d35 = this["scenePropArr"],
          _0xd76968 = _0x5adfe2["gameMgr"]["playerLg"]["showPlayer"]['transform']["position"]['clone']();

      for (let _0x103e55 = 0; _0x103e55 < _0x421d35["length"]; ++_0x103e55) {
        let _0x39d843 = _0x421d35[_0x103e55]["item"],
            _0x495c73 = _0xd76968['z'] - _0x39d843['transform']["position"]['z'];

        _0x495c73 < -50 && _0x495c73 > 50 ? _0x39d843["acitve"] && (_0x39d843["active"] = false) : _0x421d35[_0x103e55]["isActive"] && (_0x39d843["acitve"] || (_0x39d843["active"] = true));
      }
    }

  }

  class _0x2dfa6c extends Laya['Script'] {
    constructor() {
      super(...arguments);
      this["type"] = 0;
      this["name"] = '';
    }

    ['inti'](_0x5a2af3, _0x3c24ed, _0x11ae2a) {
      this['single'] = _0x5a2af3;
      this['type'] = _0x3c24ed;
      this["name"] = _0x11ae2a;
    }

    ['setLatatimeHide'](_0x767e39) {
      Laya['timer']["once"](_0x767e39, this, this['lateHide']);
    }

    ['lateHide']() {
      1 == this["type"] && this["single"]["removeSelf"]();
      this['single']['active'] = false;
      Laya['Pool']["recover"](this["name"], this["single"]);
    }

    ['onUpdate']() {}

  }

  class _0x24d78d extends Laya["Script"] {
    constructor() {
      super(...arguments);
      this['effectArr'] = [];
    }

    ['init'](_0x58a4ba) {
      this['root'] = _0x58a4ba;

      for (let _0x6b537 = 0; _0x6b537 < this["root"]['numChildren']; ++_0x6b537) {
        let _0x1c16e7 = this["root"]["getChildAt"](_0x6b537);

        _0x1c16e7["active"] = false;
        this['effectArr']['push'](_0x1c16e7);
      }

      this["initPoolEffect"]();
    }

    ["initPoolEffect"]() {
      for (let _0x46ae5a = 0; _0x46ae5a < 6; ++_0x46ae5a) {
        let _0x315d45 = Laya["Sprite3D"]["instantiate"](this["effectArr"][0], this["root"]);

        _0x315d45['addComponent'](_0x2dfa6c)["inti"](_0x315d45, 0, "nsdds_00");

        Laya["Pool"]["recover"]("nsdds_00", _0x315d45);
      }

      for (let _0x4129ee = 0; _0x4129ee < 6; ++_0x4129ee) {
        let _0x5bbb09 = Laya["Sprite3D"]['instantiate'](this["effectArr"][1], this["root"]);

        _0x5bbb09['addComponent'](_0x2dfa6c)['inti'](_0x5bbb09, 1, "nsdds_01");

        Laya["Pool"]['recover']("nsdds_01", _0x5bbb09);
      }

      for (let _0x85154c = 0; _0x85154c < 6; ++_0x85154c) {
        let _0x410f78 = Laya["Sprite3D"]["instantiate"](this["effectArr"][2], this["root"]);

        _0x410f78["addComponent"](_0x2dfa6c)["inti"](_0x410f78, 2, "nsdds_02");

        Laya["Pool"]["recover"]("nsdds_02", _0x410f78);
      }
    }

    ["addEffect"](_0x5e6a32) {
      let _0x194418 = Laya["Sprite3D"]["instantiate"](this["effectArr"][_0x5e6a32], this['root']);

      _0x194418["addComponent"](_0x2dfa6c)["inti"](_0x194418, _0x5e6a32, "nsdds_0" + _0x5e6a32);

      return _0x194418;
    }

    ["hidePurple"]() {}

    ["playEffect"](_0x2ef95d, _0x11ae06, _0x10cb45 = null) {
      let _0x2963f5 = Laya["Pool"]["getItem"]("nsdds_0" + _0x2ef95d);

      _0x2963f5 || (_0x2963f5 = this["addEffect"](_0x2ef95d));
      _0x10cb45 && _0x10cb45['addChild'](_0x2963f5);
      _0x2963f5['transform']["position"] = _0x11ae06["clone"]();
      _0x2963f5["active"] = false;
      _0x2963f5["active"] = true;

      _0x2963f5["getComponent"](_0x2dfa6c)["setLatatimeHide"](1500);
    }

    ['playEndEffect'](_0x1cb51b, _0x4095d8 = null) {
      if (_0x1cb51b) {
        let _0x17b9db = this["effectArr"][2];
        _0x17b9db["transform"]["position"] = _0x4095d8['clone']();
        _0x17b9db["active"] = false;
        _0x17b9db["active"] = true;
      } else {
        this["effectArr"][2]["active"] = false;
      }
    }

  }

  class _0x422e12 extends Laya["Script"] {
    constructor() {
      super(...arguments);
      this["singleArr"] = [];
      this["roadArr"] = [];
      this["moveRoot"] = null;
      this['endRoot'] = null;
      this["endBoy"] = null;
      this["endAiArr"] = [];
      this["sceneRoadArr"] = [];
      this["endDis"] = 0;
      this["aniValue"] = 0;
      this["count"] = 0;
    }

    ['init'](_0x23ab08) {
      this['sceneRoot'] = _0x23ab08;
      this["endScene"] = _0x23ab08['getChildByName']("endScene");
      this["roadRoot"] = _0x23ab08['getChildByName']("road");

      for (let _0x1b4c57 = 0; _0x1b4c57 < this["roadRoot"]["numChildren"]; ++_0x1b4c57) {
        let _0x57f3ea = this["roadRoot"]['getChildAt'](_0x1b4c57);

        _0x57f3ea["active"] = false;
        this["roadArr"][_0x1b4c57] = _0x57f3ea;
      }

      this["caihuaEff"] = this["endScene"]["getChildByName"]("caihua");
      this["caihuaEff"]['active'] = false;
      this["endRoot"] = this['endScene']["getChildByName"]("endRoot");
      this["endBoy"] = this["endRoot"]["getChildAt"](0);

      for (let _0x4908a7 = 0; _0x4908a7 < 4; ++_0x4908a7) {
        this["endAiArr"]["push"](this['endRoot']["getChildAt"](_0x4908a7 + 1));
        this['endAiArr'][_0x4908a7]["active"] = false;
      }

      this["getconfigData"]();
    }

    ["initRoadSp"]() {
      for (let _0x22757b = 0; _0x22757b < this['roadArr']['length']; ++_0x22757b) {
        for (let _0x5bf42d = 0; _0x5bf42d < 3; ++_0x5bf42d) {
          let _0x1781a7 = this["roadArr"][_0x22757b],
              _0x52a624 = Laya["Sprite3D"]["instantiate"](_0x1781a7, this['roadRoot']);

          _0x52a624['name'] = _0x1781a7["name"];
          Laya["Pool"]["recover"](_0x52a624["name"], _0x52a624);
        }
      }
    }

    ["addRoadSp"](_0xd84bb7) {
      let _0x33a5b9 = this['roadArr'][_0xd84bb7],
          _0x4afe37 = Laya["Sprite3D"]["instantiate"](_0x33a5b9, this['roadRoot']);

      _0x4afe37["name"] = _0x33a5b9["name"];
      return _0x4afe37;
    }

    ["getconfigData"]() {
      let _0x4f4b26 = _0x5adfe2["configMgr"]["getLevelCfg"](),
          _0x59af1a = _0x5adfe2['commonData']["newLevel"] - 1;

      _0x59af1a > 10 && (_0x59af1a -= 2, _0x59af1a %= 11);
      this["endDis"] = 0;
      let _0x1e9179 = _0x4f4b26[_0x59af1a]["models"];

      for (let _0x13507b = 0; _0x13507b < _0x1e9179["length"]; ++_0x13507b) {
        let _0x3179a8 = _0x1e9179[_0x13507b];

        if (_0x3179a8["name"]["startsWith"]('road_')) {
          let _0x59c753 = Laya["Pool"]['getItem'](_0x3179a8["name"]),
              _0x170458 = _0x3179a8['name'],
              _0x298274 = parseInt(_0x170458["substr"](6, _0x170458["length"] - 5));

          _0x59c753 || (_0x59c753 = this["addRoadSp"](_0x298274 - 1));
          _0x59c753["active"] = true;

          let _0x19a143 = new Laya["Vector3"](_0x3179a8["pos"]['x'], _0x3179a8["pos"]['y'], _0x3179a8['pos']['z']),
              _0xdda2a7 = new Laya["Vector3"](_0x3179a8['scale']['x'], _0x3179a8["scale"]['y'], _0x3179a8['scale']['z']);

          _0x59c753["transform"]["position"] = _0x19a143["clone"]();
          _0x59c753['transform']["localScale"] = _0xdda2a7["clone"]();
          _0x59c753['transform']['localRotationEulerY'] = -_0x3179a8['r'];
          this["endDis"] < _0x19a143['z'] && (this['endDis'] = _0x19a143['z']);
          let _0x419dfd = {
            'item': _0x59c753,
            'scale': _0xdda2a7["clone"](),
            'type': _0x298274,
            'rotate': _0x3179a8['r'],
            'isActive': true
          };
          this["sceneRoadArr"]["push"](_0x419dfd);
        }
      }

      this["endScene"]["transform"]['position'] = new Laya["Vector3"](0, 0, this["endDis"] + 10);
      this["setEndState"]();
    }

    ["setEndState"]() {
      this["endBoy"]["transform"]['lookAt'](new Laya["Vector3"](0, 0, 0), new Laya["Vector3"](0, 1, 0), false);
      this["endBoy"]['getComponent'](Laya['Animator'])["play"]("idle");
    }

    ['endBoyAni']() {
      this["aniValue"] = 0;
      let _0x5b9783 = this['endBoy']["transform"]["localRotationEulerY"];
      Laya["Tween"]['to'](this, {
        'aniValue': 1
      }, 500, Laya["Ease"]["linearIn"], new Laya["Handler"](this, function () {
        let _0x24f7a8 = this["endBoy"]["getComponent"](Laya["Animator"]);

        if (_0x5adfe2["gameMgr"]["playerLg"]["showPlayerLg"]['getClothCount']()) {
          _0x24f7a8["play"]('victory');

          _0x5adfe2["soundMgr"]["play"]("endVictory");

          _0x5adfe2['soundMgr']["play"]("victory");

          this["caihuaEff"]["active"] = true;
          Laya["timer"]["once"](1000, this, function () {
            _0x5adfe2['gameMgr']['playerLg']['showPlayerLg']["playAnimation"](8);

            _0x5adfe2['soundMgr']["play"]('dance');
          });

          for (let _0x4cf35e = 0; _0x4cf35e < this["endAiArr"]["length"]; ++_0x4cf35e) {
            this["endAiArr"][_0x4cf35e]['getComponent'](Laya["Animator"])["play"]("victory");
          }
        } else {
          Laya['timer']['once'](1000, this, function () {
            _0x5adfe2["gameMgr"]['playerLg']["showPlayerLg"]["playAnimation"](9);
          });
          _0x5adfe2["gameMgr"]['playerLg']['showPlayerLg']["spotLight"]["active"] = true;
          _0x5adfe2["gameMgr"]["light"]['active'] = false;

          _0x5adfe2["soundMgr"]["play"]("fail");

          _0x24f7a8['play']('fail');

          for (let _0x55d252 = 0; _0x55d252 < this['endAiArr']["length"]; ++_0x55d252) {
            this["endAiArr"][_0x55d252]["getComponent"](Laya["Animator"])["play"]('idle');
          }
        }
      }))["update"] = new Laya["Handler"](this, function () {
        this["endBoy"]["transform"]['localRotationEulerY'] = _0x5b9783 + 160 * this['aniValue'];
      });
    }

    ["reset"]() {
      this["caihuaEff"]["active"] = false;

      for (let _0x12e420 = 0; _0x12e420 < this["endAiArr"]['length']; ++_0x12e420) {
        this["endAiArr"][_0x12e420]["active"] = false;
      }

      _0x5adfe2["gameMgr"]["light"]["active"] = true;

      for (let _0x540b16 = 0; _0x540b16 < this["sceneRoadArr"]["length"]; ++_0x540b16) {
        this["sceneRoadArr"][_0x540b16]['item']["active"] = false;
        Laya["Pool"]["recover"](this['sceneRoadArr'][_0x540b16]["item"]["name"], this['sceneRoadArr'][_0x540b16]["item"]);
      }

      this["sceneRoadArr"] = [];
      this["getconfigData"]();
    }

    ["onUpdate"]() {
      if (this["count"]++ % 2 == 0) {
        return;
      }

      let _0x2152b3 = this["sceneRoadArr"],
          _0x39c48 = _0x5adfe2["gameMgr"]["playerLg"]["showPlayer"]["transform"]['position']["clone"]();

      for (let _0x2fa3e4 = 0; _0x2fa3e4 < _0x2152b3["length"]; ++_0x2fa3e4) {
        let _0x2cd1c5 = _0x2152b3[_0x2fa3e4]['item'],
            _0xbfeb2f = _0x39c48['z'] - _0x2cd1c5['transform']["position"]['z'];

        _0xbfeb2f < -50 && _0xbfeb2f > 50 ? _0x2cd1c5["active"] && (_0x2cd1c5['active'] = false) : _0x2152b3[_0x2fa3e4]['isActive'] && (_0x2cd1c5["active"] || (_0x2cd1c5["active"] = true));
      }

      let _0x14baae = this["endScene"]["transform"]["position"]["clone"]();

      _0x39c48['z'] - _0x14baae['z'] < -50 ? this["endScene"]["active"] && (this["endScene"]['active'] = false) : this["endScene"]["active"] || (this["endScene"]["active"] = true);
    }

  }

  class _0x17d94c extends Laya["Script"] {
    constructor() {
      super(...arguments);
      this["effectSp"] = null;
      this["index"] = 0;
      this['aniState'] = 0;
      this["oriPos"] = null;
      this["oriAngle"] = null;
      this["delta"] = 20;
      this["isMove"] = false;
      this["bSet"] = false;
    }

    ['init'](_0x59c59b, _0xd85d35, _0x20f57a, _0x1b66c6) {
      this["index"] = _0xd85d35;
      this["single"] = _0x59c59b;
      this["posStart"] = _0x1b66c6;
      this["posEnd"] = _0x20f57a;

      let _0x520570 = this["posStart"]["transform"]["position"]["clone"]();

      _0x520570['y'] = 0;
      this["single"]["transform"]["position"] = _0x520570["clone"]();
      this["single"]["active"] = true;
      this["oriPos"] = this["single"]["transform"]["position"]['clone']();
      this["oriAngle"] = this["single"]["transform"]['rotation']["clone"]();
      this["animation"] = this["single"]["getComponent"](Laya['Animator']);
      this['playAnimation'](1);
      this['effectSp'] = this["single"]["getChildByName"]("nsdds_08");
      this["effectSp"]["active"] = false;
    }

    ["playAnimation"](_0x2e9431) {
      switch (this["aniState"] = _0x2e9431, _0x2e9431) {
        case 1:
          this["animation"]["play"]("idle", 0);
          break;

        case 2:
          this["animation"]['play']("run", 0);
          break;

        case 3:
          this["animation"]['play']("victory", 0);
      }
    }

    ['setMove'](_0x169420) {
      this['isMove'] = _0x169420;
      this["playAnimation"](2);
    }

    ["reset"]() {
      Laya["timer"]['clearAll'](this);
      this["isMove"] = false;
      this["playAnimation"](1);
      this["bSet"] = false;
      this["setEffect"](false);
      this['single']['transform']["position"] = this["oriPos"]['clone']();
      this["single"]["transform"]["rotation"] = this['oriAngle']["clone"]();
    }

    ["setEffect"](_0x927ab4) {
      this["effectSp"]["active"] = false;
      _0x927ab4 && (this["effectSp"]['active'] = true);
    }

    ['onUpdate']() {
      this["delta"] = Laya['timer']["delta"];
      this['delta'] > 50 && (this["delta"] = 20);
    }

    ["onLateUpdate"]() {
      let _0x2b7ff3 = this["single"]['transform']["position"]["clone"](),
          _0x2f693e = this["posEnd"]["transform"]["position"]["clone"](),
          _0x3bff64 = _0x2b7ff3["clone"]();

      this['bSet'] && _0x2b7ff3['z'] < _0x5adfe2["gameMgr"]["groundMgr"]["endDis"] + 28 ? (this["single"]["active"] || (this["single"]['active'] = true), 2 != this["aniState"] && this["playAnimation"](2), Laya['Vector3']["lerp"](_0x2b7ff3, _0x2f693e, 0.1, _0x3bff64), this["single"]["transform"]["position"] = _0x3bff64["clone"]()) : _0x2f693e['z'] > 5 && _0x2b7ff3['z'] < _0x5adfe2['gameMgr']["groundMgr"]["endDis"] + 28 && (2 != this["aniState"] && this["playAnimation"](2), _0x2f693e['z'] -= 6, Laya["Vector3"]["lerp"](_0x2b7ff3, _0x2f693e, 0.1, _0x3bff64), this["single"]["transform"]["position"] = _0x3bff64["clone"](), _0x3bff64['z'] < _0x2f693e['z'] - 3 && (this["single"]["active"] = false));
    }

  }

  class _0x58acc3 extends Laya["Script"] {
    constructor() {
      super(...arguments);
      this['aiSpArr'] = [];
      this["aiArr"] = [];
      this["aiArrPos"] = [];
      this["matarr"] = [];
    }

    ["init"](_0x1bfe2e) {
      this["single"] = _0x1bfe2e;

      let _0x4a9e92 = _0x5adfe2['gameMgr']["player"]["getChildAt"](0)["getChildAt"](0);

      this["aiSpArr"][0] = this["single"]["getChildAt"](0);

      for (let _0x43a877 = 0; _0x43a877 < 2; ++_0x43a877) {
        this["aiSpArr"][_0x43a877 + 1] = Laya['Sprite3D']["instantiate"](this["aiSpArr"][0], this["single"]);
      }

      let _0x377b6a = _0x4a9e92["getChildByName"]('aiPosRoot');

      for (let _0x3c7dc1 = 0; _0x3c7dc1 < 3; ++_0x3c7dc1) {
        let _0x87911b = _0x377b6a['getChildAt'](_0x3c7dc1),
            _0x28b7a6 = _0x377b6a["getChildAt"](_0x3c7dc1 + 3),
            _0x5454ce = this['aiSpArr'][_0x3c7dc1]["addComponent"](_0x17d94c);

        _0x5454ce["init"](this["aiSpArr"][_0x3c7dc1], _0x3c7dc1, _0x28b7a6, _0x87911b);

        let _0x43a197 = {
          'item': this["aiSpArr"][_0x3c7dc1],
          'lg': _0x5454ce
        };
        this["aiArr"]["push"](_0x43a197);
      }
    }

    ["aiStartMove"]() {
      for (let _0x542626 = 0; _0x542626 < this['aiArr']["length"]; ++_0x542626) {}
    }

    ["hdieAi"]() {
      for (let _0x3539df = 0; _0x3539df < this["aiArr"]["length"]; ++_0x3539df) {
        this["aiArr"][_0x3539df]['item']["active"] = false;
      }
    }

    ["reset"]() {
      for (let _0xd6c820 = 0; _0xd6c820 < this["aiArr"]["length"]; ++_0xd6c820) {
        this["aiArr"][_0xd6c820]["item"]["active"] = true;

        this["aiArr"][_0xd6c820]['lg']['reset']();
      }
    }

  }

  class _0x1d5294 extends Laya["Script"] {
    constructor() {
      super(...arguments);
      this["permutation"] = [151, 160, 137, 91, 90, 15, 131, 13, 201, 95, 96, 53, 194, 233, 7, 225, 140, 36, 103, 30, 69, 142, 8, 99, 37, 240, 21, 10, 23, 190, 6, 148, 247, 120, 234, 75, 0, 26, 197, 62, 94, 252, 219, 203, 117, 35, 11, 32, 57, 177, 33, 88, 237, 149, 56, 87, 174, 20, 125, 136, 171, 168, 68, 175, 74, 165, 71, 134, 139, 48, 27, 166, 77, 146, 158, 231, 83, 111, 229, 122, 60, 211, 133, 230, 220, 105, 92, 41, 55, 46, 245, 40, 244, 102, 143, 54, 65, 25, 63, 161, 1, 216, 80, 73, 209, 76, 132, 187, 208, 89, 18, 169, 200, 196, 135, 130, 116, 188, 159, 86, 164, 100, 109, 198, 173, 186, 3, 64, 52, 217, 226, 250, 124, 123, 5, 202, 38, 147, 118, 126, 255, 82, 85, 212, 207, 206, 59, 227, 47, 16, 58, 17, 182, 189, 28, 42, 223, 183, 170, 213, 119, 248, 152, 2, 44, 154, 163, 70, 221, 153, 101, 155, 167, 43, 172, 9, 129, 22, 39, 253, 19, 98, 108, 110, 79, 113, 224, 232, 178, 185, 112, 104, 218, 246, 97, 228, 251, 34, 242, 193, 238, 210, 144, 12, 191, 179, 162, 241, 81, 51, 145, 235, 249, 14, 239, 107, 49, 192, 214, 31, 181, 199, 106, 157, 184, 84, 204, 176, 115, 121, 50, 45, 127, 4, 150, 254, 138, 236, 205, 93, 222, 114, 67, 29, 24, 72, 243, 141, 128, 195, 78, 66, 215, 61, 156, 180];
      this['p'] = [];
    }

    ["setNum"]() {
      this['p']["length"] = 512;

      for (let _0x204591 = 0; _0x204591 < 256; _0x204591++) {
        this['p'][256 + _0x204591] = this['p'][_0x204591] = this["permutation"][_0x204591];
      }
    }

    ['noise'](_0x568bad, _0x217762, _0x3eedb1) {
      let _0x47b81f = 255 & Math["floor"](_0x568bad),
          _0x22be00 = 255 & Math["floor"](_0x217762),
          _0x470069 = 255 & Math["floor"](_0x3eedb1);

      _0x568bad -= Math["floor"](_0x568bad);
      _0x217762 -= Math['floor'](_0x217762);
      _0x3eedb1 -= Math["floor"](_0x3eedb1);

      let _0x11278b = this["fade"](_0x568bad),
          _0x191e76 = this["fade"](_0x217762),
          _0x41b14d = this["fade"](_0x3eedb1),
          _0x58a2c9 = this['p'][_0x47b81f] + _0x22be00,
          _0xecf06f = this['p'][_0x58a2c9] + _0x470069,
          _0x85ed30 = this['p'][_0x58a2c9 + 1] + _0x470069,
          _0x152862 = this['p'][_0x47b81f + 1] + _0x22be00,
          _0xef751f = this['p'][_0x152862] + _0x470069,
          _0x5cd3b7 = this['p'][_0x152862 + 1] + _0x470069;

      return this['lerp'](_0x41b14d, this['lerp'](_0x191e76, this['lerp'](_0x11278b, this["grad"](this['p'][_0xecf06f], _0x568bad, _0x217762, _0x3eedb1), this["grad"](this['p'][_0xef751f], _0x568bad - 1, _0x217762, _0x3eedb1)), this["lerp"](_0x11278b, this["grad"](this['p'][_0x85ed30], _0x568bad, _0x217762 - 1, _0x3eedb1), this["grad"](this['p'][_0x5cd3b7], _0x568bad - 1, _0x217762 - 1, _0x3eedb1))), this["lerp"](_0x191e76, this['lerp'](_0x11278b, this["grad"](this['p'][_0xecf06f + 1], _0x568bad, _0x217762, _0x3eedb1 - 1), this['grad'](this['p'][_0xef751f + 1], _0x568bad - 1, _0x217762, _0x3eedb1 - 1)), this['lerp'](_0x11278b, this["grad"](this['p'][_0x85ed30 + 1], _0x568bad, _0x217762 - 1, _0x3eedb1 - 1), this["grad"](this['p'][_0x5cd3b7 + 1], _0x568bad - 1, _0x217762 - 1, _0x3eedb1 - 1))));
    }

    ["fade"](_0x3c35da) {
      return _0x3c35da * _0x3c35da * _0x3c35da * (_0x3c35da * (6 * _0x3c35da - 15) + 10);
    }

    ["lerp"](_0x185753, _0x5a44a4, _0x8250b2) {
      return _0x5a44a4 + _0x185753 * (_0x8250b2 - _0x5a44a4);
    }

    ["grad"](_0x2b8482, _0x38bb45, _0x781107, _0x1cf4d1) {
      let _0x1695bb = 15 & _0x2b8482,
          _0x48d893 = _0x1695bb < 8 ? _0x38bb45 : _0x781107,
          _0x583687 = _0x1695bb < 4 ? _0x781107 : 12 == _0x1695bb || 14 == _0x1695bb ? _0x38bb45 : _0x1cf4d1;

      return (0 == (1 & _0x1695bb) ? _0x48d893 : -_0x48d893) + (0 == (2 & _0x1695bb) ? _0x583687 : -_0x583687);
    }

    ["produceNoise"]() {
      let _0x13005d = 0;

      for (let _0x1be215 = 0; _0x1be215 < 10; _0x1be215 += 0.1) {
        for (let _0x52dc25 = 0; _0x52dc25 < 10; _0x52dc25 += 0.1) {
          let _0x2a23d9 = this["noise"](_0x1be215, _0x52dc25, 7.89101112131415),
              _0x3cbca1 = Math["floor"](255 * (_0x2a23d9 + 1) / 2);

          if (_0x13005d >= 10000) {
            break;
          }

          _0x5adfe2["gameData"]['noiseArr'][_0x13005d] = _0x3cbca1;
          _0x13005d++;
        }

        if (_0x13005d >= 10000) {
          break;
        }
      }
    }

  }

  class _0x3e2470 {
    ["init"]() {
      if (Laya["Browser"]['onWeiXin']) {
        let _0x341085 = window['wx'];
        this["sysInfo"] = _0x341085["getSystemInfoSync"]();
        this["launchOptions"] = _0x341085["getLaunchOptionsSync"]();
        this["openDataContext"] = _0x341085["getOpenDataContext"]();
      }
    }

    ["resetSize"](_0x3da1fb, _0x318d52) {
      window['sharedCanvas'] && (window['sharedCanvas']["width"] = _0x3da1fb, window['sharedCanvas']['height'] = _0x318d52);
    }

    ['postMessage'](_0x4c7d5d) {
      null != _0x4c7d5d && null != this["openDataContext"] && this["openDataContext"]["postMessage"](_0x4c7d5d);
    }

    ["uploadScroe"](_0x30cafa) {
      this["postMessage"]({
        'cmd': "submit_scroe",
        'score': _0x30cafa
      });
    }

    ["showFriendRank"](_0x57522a) {
      this["postMessage"]({
        'cmd': _0x57522a ? "open_friend_rank" : 'close_friend_rank'
      });
    }

    ["destroyFriendRank"]() {
      this["postMessage"]({
        'cmd': "destroy_friend_rank"
      });
    }

    ["showLiteRank"](_0x3951e2) {
      this["postMessage"]({
        'cmd': _0x3951e2 ? 'open_lite_rank' : "close_lite_rank"
      });
    }

    ["showOverFriendTips"](_0x28e3d9, _0x36ddb1) {
      this["postMessage"]({
        'cmd': _0x28e3d9 ? "open_over_friend" : "close_over_friend",
        'score': _0x36ddb1
      });
    }

    ["showLoopFriendTips"](_0x573eff, _0x43961f) {
      this["postMessage"]({
        'cmd': _0x573eff ? "open_loop_friend" : "close_loop_friend",
        'score': _0x43961f
      });
    }

    ["restartGame"]() {
      this["postMessage"]({
        'cmd': "restart_game"
      });
    }

    ["showFirstFriendTips"](_0x269398) {
      this["postMessage"]({
        'cmd': _0x269398 ? 'open_first_friend' : 'close_first_friend',
        'score': 0
      });
    }

    ['onFrientMouseEvent'](_0x9bc329) {
      this["postMessage"](_0x9bc329);
    }

  }

  class _0x11b6d0 extends Laya["Script"] {
    constructor() {
      super();
    }

    ["onAwake"]() {
      let _0x597b8c = this["owner"]["getChildByName"]("middleUI");

      this["toast"] = _0x597b8c["getChildByName"]("toast");
      this["toast"]["visible"] = false;
      this['lblToast'] = this['toast']["getChildByName"]("lblToast");
    }

    ["showText"](_0x4df008, _0x18bcc6) {
      Laya['stage']['addChildren'](this["toast"]);
      this["toast"]["pos"](Laya["stage"]["width"] / 2, Laya['stage']["height"] / 2 - 300);
      this["lblToast"]["text"] = _0x4df008;
      this["toast"]["visible"] = true;
      Laya["timer"]['once'](_0x18bcc6, this, this["hideText"]);
    }

    ["hideText"]() {
      this["toast"]["visible"] = false;
    }

    ["onDestroy"]() {}

  }

  class _0xe34cdb {
    constructor() {}

    ["showToast"](_0x2926dc, _0x211b52) {
      this["bubbleText"] ? this["bubbleText"]['showText'](_0x2926dc, _0x211b52) : Laya["Scene"]["open"]("views/popups/bubbleText.scene", false, Laya["Handler"]['create'](this, _0x4f6e77 => {
        this["bubbleText"] = _0x4f6e77["getComponent"](_0x11b6d0);
        this['bubbleText']["showText"](_0x2926dc, _0x211b52);
      }));
    }

  }

  class _0x5adfe2 {
    static get ['glEvent']() {
      return this['_eventListener'];
    }

    static get ['soundMgr']() {
      void 0 === this["_soundMgr"] && (this['_soundMgr'] = new _0x4f7226());
      return this["_soundMgr"];
    }

    static get ["storageMgr"]() {
      void 0 === this["_storageMge"] && (this["_storageMge"] = new _0x288ce1());
      return this['_storageMge'];
    }

    static get ["commonData"]() {
      return this["_commonData"];
    }

    static get ['gameData']() {
      return this["_gameData"];
    }

    static get ["utils"]() {
      return this["_utils"];
    }

    static get ["gameMgr"]() {
      return this['_gameMgr'];
    }

    static get ["configMgr"]() {
      void 0 === this["_configMgr"] && (this["_configMgr"] = new _0x40c459());
      return this["_configMgr"];
    }

    static get ["rankMgr"]() {
      void 0 === this["_rankMgr"] && (this["_rankMgr"] = new _0x3e2470());
      return this["_rankMgr"];
    }

    static get ["wxMgr"]() {
      void 0 === this["_wxMgr"] && (this["_wxMgr"] = new _0x296fe7());
      return this['_wxMgr'];
    }

    static get ['resourceMgr']() {
      void 0 === this['_resourceMgr'] && (this["_resourceMgr"] = new _0x2206b3());
      return this["_resourceMgr"];
    }

    static get ["uiMgr"]() {
      this["_uiMgr"] || (this["_uiMgr"] = new _0xe34cdb());
      return this["_uiMgr"];
    }

  }

  _0x5adfe2["_eventListener"] = new Laya["EventDispatcher"]();
  _0x5adfe2["_utils"] = new class {
    constructor() {}

    ["addClickEvent"](_0x4d75a6, _0x20cf20, _0x59d5df, _0x44653e) {
      if (_0x4d75a6["offAllCaller"](_0x20cf20), _0x4d75a6 instanceof Laya["Button"]) {
        let _0x28448b = function (_0x31f6bd) {
          _0x31f6bd["stopPropagation"]();

          _0x59d5df && (_0x5adfe2["soundMgr"]['play']("button"), _0x5adfe2["gameMgr"]["playVibrate"](true), _0x59d5df["call"](_0x20cf20, _0x31f6bd));
        };

        _0x4d75a6['on'](Laya["Event"]["CLICK"], _0x20cf20, _0x28448b);
      } else {
        let _0x4fc0c2 = 60,
            _0x1f45f2 = 1,
            _0x1b8879 = (_0x4d75a6['anchorX'], _0x4d75a6["anchorY"], _0x4d75a6['x'], _0x4d75a6['y'], _0x4d75a6["scaleX"] * _0x1f45f2),
            _0x5ef6b7 = _0x4d75a6['scaleX'] * _0x1f45f2,
            _0x37e16c = 0.9,
            _0x5686f7 = function (_0xfe5d9) {
          _0xfe5d9["stopPropagation"]();

          Laya['Tween']['to'](_0x4d75a6, {
            'scaleX': _0x37e16c,
            'scaleY': _0x37e16c
          }, _0x4fc0c2);
        };

        _0x4d75a6['on'](Laya["Event"]["MOUSE_DOWN"], _0x20cf20, _0x5686f7);

        let _0x478518 = function (_0x49508d) {
          _0x49508d["stopPropagation"]();

          Laya["Tween"]['to'](_0x4d75a6, {
            'scaleX': _0x1b8879,
            'scaleY': _0x5ef6b7
          }, _0x4fc0c2);
          _0x59d5df && _0x59d5df['call'](_0x20cf20, _0x49508d);
          (0 === _0x44653e || _0x44653e) && _0x5adfe2["soundMgr"]["play"](_0x44653e);
        };

        _0x4d75a6['on'](Laya["Event"]["MOUSE_UP"], _0x20cf20, _0x478518);

        let _0x4b5f76 = function (_0x1be45e) {
          _0x1be45e['stopPropagation']();

          Laya['Tween']['to'](_0x4d75a6, {
            'scaleX': _0x1b8879,
            'scaleY': _0x5ef6b7
          }, _0x4fc0c2);
        };

        _0x4d75a6['on'](Laya["Event"]["MOUSE_OUT"], _0x20cf20, _0x4b5f76);
      }
    }

    ["tweenShake"](_0x5508c4, _0x1b0b8a) {
      let _0x195456 = new Laya["TimeLine"](),
          _0x542c89 = _0x5508c4["pivotX"];

      _0x5508c4['pivotX'] = _0x5508c4["width"] / 2;

      _0x195456["addLabel"]("shake1", 0)['to'](_0x5508c4, {
        'rotation': _0x5508c4['rotation'] + 5
      }, 50, null, 0)['addLabel']("shake2", 0)['to'](_0x5508c4, {
        'rotation': _0x5508c4["rotation"] - 6
      }, 50, null, 0)["addLabel"]("shake3", 0)['to'](_0x5508c4, {
        'rotation': _0x5508c4['rotation'] - 13
      }, 50, null, 0)["addLabel"]('shake4', 0)['to'](_0x5508c4, {
        'rotation': _0x5508c4['rotation'] + 3
      }, 50, null, 0)["addLabel"]('shake5', 0)['to'](_0x5508c4, {
        'rotation': _0x5508c4["rotation"] - 5
      }, 50, null, 0)["addLabel"]("shake6", 0)['to'](_0x5508c4, {
        'rotation': _0x5508c4["rotation"] + 2
      }, 50, null, 0)['addLabel']("shake7", 0)['to'](_0x5508c4, {
        'rotation': _0x5508c4['rotation'] - 8
      }, 50, null, 0)["addLabel"]('shake8', 0)['to'](_0x5508c4, {
        'rotation': _0x5508c4["rotation"] + 3
      }, 50, null, 0)["addLabel"]("shake9", 0)['to'](_0x5508c4, {
        'rotation': 0
      }, 50, null, 0);

      _0x1b0b8a ? Laya["timer"]['once'](500, this, function () {
        _0x195456["destroy"]();

        _0x5508c4["rotation"] = 0;
        _0x5508c4["pivotX"] = _0x542c89;
      }) : _0x195456['on'](Laya["Event"]["COMPLETE"], this, function () {
        _0x195456["destroy"]();

        _0x5508c4['rotation'] = 0;
        _0x5508c4["pivotX"] = _0x542c89;
      });

      _0x195456["play"](0, true);
    }

    ["PointToSegDist"](_0x4272d7, _0xeceef4, _0x3f55fe, _0x2e0917, _0x22e8a2, _0x52f60c) {
      let _0x1cf1a1 = (_0x22e8a2 - _0x3f55fe) * (_0x4272d7 - _0x3f55fe) + (_0x52f60c - _0x2e0917) * (_0xeceef4 - _0x2e0917),
          _0x186279 = 0;

      if (_0x1cf1a1 < 0) {
        return _0x186279 = Math["sqrt"]((_0x4272d7 - _0x3f55fe) * (_0x4272d7 - _0x3f55fe) + (_0xeceef4 - _0x2e0917) * (_0xeceef4 - _0x2e0917));
      }

      let _0x4abf9d = (_0x22e8a2 - _0x3f55fe) * (_0x22e8a2 - _0x3f55fe) + (_0x52f60c - _0x2e0917) * (_0x52f60c - _0x2e0917);

      if (_0x1cf1a1 > _0x4abf9d) {
        return _0x186279 = Math["sqrt"]((_0x4272d7 - _0x22e8a2) * (_0x4272d7 - _0x22e8a2) + (_0xeceef4 - _0x52f60c) * (_0xeceef4 - _0x52f60c));
      }

      let _0x5dc4db = _0x1cf1a1 / _0x4abf9d,
          _0x45ea03 = _0x3f55fe + (_0x22e8a2 - _0x3f55fe) * _0x5dc4db,
          _0x18b530 = _0x2e0917 + (_0x52f60c - _0x2e0917) * _0x5dc4db;

      return _0x186279 = Math['sqrt']((_0x4272d7 - _0x45ea03) * (_0x4272d7 - _0x45ea03) + (_0x18b530 - _0xeceef4) * (_0x18b530 - _0xeceef4));
    }

    ['showCoinFly'](_0x4e3055, _0x35cbb7, _0x1a2433) {
      _0x5adfe2["commonData"]["coinFlyView"] ? (Laya["stage"]["addChild"](_0x5adfe2["commonData"]['coinFlyView']["owner"]), _0x5adfe2['commonData']['coinFlyView']["setCoinMove"](_0x4e3055, _0x35cbb7, _0x1a2433)) : Laya["Scene"]['open']('views/coinFly.scene', false, null, new Laya['Handler'](this, function () {
        _0x5adfe2["commonData"]["coinFlyView"]['setCoinMove'](_0x4e3055, _0x35cbb7, _0x1a2433);
      }));
    }

    ["showGameCoinFly"](_0xb20544, _0x2f80f5, _0x35115f = null) {
      _0x5adfe2['commonData']["gameCoinView"] ? (Laya["stage"]['addChild'](_0x5adfe2["commonData"]['gameCoinView']["owner"]), _0x5adfe2["commonData"]['gameCoinView']["setCoinMove"](_0xb20544, _0x2f80f5, _0x35115f)) : Laya['Scene']['open']('views/gameCoinView.scene', false, null, new Laya["Handler"](this, function () {
        _0x5adfe2["commonData"]["gameCoinView"]["setCoinMove"](_0xb20544, _0x2f80f5, _0x35115f);
      }));
    }

    ['calculatePos'](_0x55c4dc, _0x30c6b7, _0x5456bf, _0x508ab4) {
      let _0x1b299c = new Laya['Vector3'](0, 0, 0);

      _0x1b299c['x'] = _0x30c6b7['x'] * (1 - _0x55c4dc) * (1 - _0x55c4dc) + 2 * _0x5456bf['x'] * (1 - _0x55c4dc) * _0x55c4dc + _0x508ab4['x'] * _0x55c4dc * _0x55c4dc;
      _0x1b299c['y'] = _0x30c6b7['y'] * (1 - _0x55c4dc) * (1 - _0x55c4dc) + 2 * _0x5456bf['y'] * (1 - _0x55c4dc) * _0x55c4dc + _0x508ab4['y'] * _0x55c4dc * _0x55c4dc;
      _0x1b299c['z'] = _0x30c6b7['z'] * (1 - _0x55c4dc) * (1 - _0x55c4dc) + 2 * _0x5456bf['z'] * (1 - _0x55c4dc) * _0x55c4dc + _0x508ab4['z'] * _0x55c4dc * _0x55c4dc;
      return _0x1b299c;
    }

    ["pointInBox"](_0x4c8dc0, _0x218ec7) {
      let _0x5dea70 = new Laya["Vector3"](0, 0, 0);

      _0x218ec7['transform']['getForward'](_0x5dea70);

      Laya["Vector3"]['normalize'](_0x5dea70["clone"](), _0x5dea70);

      let _0x11c61b = _0x218ec7["transform"]["position"]["clone"](),
          _0x1917a7 = new Laya["Vector3"](0, 0, 0);

      Laya["Vector3"]["subtract"](_0x4c8dc0, _0x11c61b, _0x1917a7);

      let _0x3a9f83 = Laya["Vector3"]["dot"](_0x5dea70, _0x1917a7),
          _0x38d88a = new Laya["Vector3"](0, 0, 0);

      _0x218ec7["transform"]["getRight"](_0x38d88a);

      Laya['Vector3']["normalize"](_0x38d88a['clone'](), _0x38d88a);

      let _0x41ade8 = Laya["Vector3"]["dot"](_0x38d88a, _0x1917a7),
          _0x4c5a67 = _0x218ec7['transform']["localScale"]["clone"]();

      return Math["abs"](_0x41ade8) < _0x4c5a67['x'] / 2 && Math['abs'](_0x3a9f83) < _0x4c5a67['z'] / 2;
    }

    ["pointInBox2"](_0x4fd251, _0x379698, _0x184c1b) {
      let _0x52c7a8 = _0x379698["transform"]["position"]["clone"](),
          _0x43974e = new Laya["Vector3"](0, 0, 0);

      Laya['Vector3']["subtract"](_0x4fd251, _0x52c7a8, _0x43974e);

      let _0x92fa = new Laya["Vector3"](0, 0, 0);

      _0x379698["transform"]['getForward'](_0x92fa);

      Laya["Vector3"]["normalize"](_0x92fa["clone"](), _0x92fa);

      let _0x4fbacc = Laya["Vector3"]["dot"](_0x92fa, _0x43974e),
          _0x26ec9d = new Laya["Vector3"](0, 0, 0);

      _0x379698["transform"]["getRight"](_0x26ec9d);

      Laya["Vector3"]['normalize'](_0x26ec9d["clone"](), _0x26ec9d);

      let _0x3053cd = Laya["Vector3"]['dot'](_0x26ec9d, _0x43974e),
          _0x3fbeaa = new Laya['Vector3'](0, 0, 0);

      _0x379698["transform"]["getUp"](_0x3fbeaa);

      Laya['Vector3']["normalize"](_0x3fbeaa["clone"](), _0x3fbeaa);

      let _0x4048dd = Laya['Vector3']["dot"](_0x3fbeaa, _0x43974e);

      _0x184c1b = _0x379698["transform"]['localScale']['clone']();
      return Math["abs"](_0x3053cd) < _0x184c1b['x'] / 2 && Math["abs"](_0x4048dd) < _0x184c1b['y'] / 2 && Math["abs"](_0x4fbacc) < _0x184c1b['z'] / 2;
    }

  }();
  _0x5adfe2["_commonData"] = new class {
    constructor() {
      this["useTime"] = 1000;
      this["levelIndex"] = 0;
      this["newLevel"] = 1;
      this["maxScore"] = 0;
      this["userCoin"] = 0;
      this['skinValueArr'] = [3000, 3000, 3000, 3000, 3000, 3000];
      this['unlockCount'] = 0;
      this["skinId"] = 0;
      this["freeSkinId"] = 0;
      this["isFreeId"] = false;
      this["useSkinId"] = 0;
      this['firstMusic'] = false;
      this["userInfo"] = {};
      this["showScene"] = null;
      this["freeSkinCount"] = 0;
      this['coinFlyView'] = null;
      this["gameCoinView"] = null;
      this["userId"] = '';
      this["playerNameStr1"] = "幻墨如烟,红梅千雪,ζ街挽,浊酒倾觞,宅男费纸,清幽兰,┉深jìē酒肆┈,茄子是我打紫哒！,思初念,喃寻,倾煞刻间,将长风做刃,ぺzuì恠寂寥の夜裡〓,゛亱ωēi雨◇,橊浪sんёη巷⌒,血染韶华轻薄纱,撸至呻,》唇间温情﹎,落羽殇,臸釪樶初,像风,半面泪妆﹏,〃しáι卜jＩ理智ぐ,挽贤,盛世如你じ,半世陌影,★待ωο醉飮ぺ,逐流水袖染尘缘,荒岛晴空,寸寸旧时光,暴风★使命╮,飲濄幾番濃情,老猫念诗,孤厌,屠龙之子,胸大遮百丑,哇塞你好傻！,深者入戏,给你的爱已经停止心跳,う牆頭潶貓,因为你所以青春,笙笙千离,浊发清眸,独守孤城,清风与酒,断秋风,清风耳畔拂,灬潒個δ亚Ьαぐ,惊线辉砍月,烟凡?古楼,惊鸿殇,青衫落拓,清宵半,明朝千里别,核能气质少年,花开馥郁,烧喉酒,_斟酒独酌,→丅輩孒請ι只爱щΘ,盛夏初雨,日落山水静,↑過紆sī惗叫犯戝℅,无情有思,漆黑的子弹,干掉上帝〃来到地狱,小法师的忧伤,季末莫淺忆,云端那边,嶶笑螚讓亼瘋鋽,遠客歸心,┉地痞鎏氓┈,云书歌谣,谈笑风云,那抹烟波蓝,天阴冷随風,怪念,┈年老街,＂亇寰yàо莪怎様▂,风捎来清醒,佳人旧梦梦佳人,◣笑賅憅亼◢,无法模仿的伤,煭揂慾,野蛮の温гóυ﹏,暧昧ヽ不动情,伊人犹在，唯我相誓,幾忿揂噫濃,↓Ъμ忠情亻↑,﹎蒗歸蒗つ,乍疏雨,谁的no,軟妹聖笩,嗄ま的sα剋斯手▂,饮雪煮茶,如山中清风,一指流砂,一瞬间的火花,颜友,笑你慌,→餹∝果児♂,灬消沙狂ωǔづ,心中有海,◇zυì捨⒏鍀,枯藤古帝,嗟梦心海,甜蜜大泛滥,凉心初透,⒈生lūò魄，最爱冄己,ζ寒颩劃啲傷,╄sǐ棹榅гóυヽ,爽妹,把酒祝东风,执手不忆殇,生死皆闲事,萬裏夢魂,沐年之夏,●мǎη裑秘мì~,自我扛就别声张ぺ,花残满地殇,Hecate,红薇染露,浪漫刺客,执扇琅珠,梦离旧时光,白衬杉格子梦,退场,叶舞翩翩,对你宣说,烂故事,╰千ηiāη(~)旅,陪你一齐在乎你,旧故,久醉绕心弦,浮生醉清风,侢遇噹姩揂,不与君同,揂溫哴亾,吞咽沧桑,把你吻了又吻,一进一出一哆嗦,≒痮亱聽雨~,梦罢,醉笑红尘千场,晚巷,夏朽暖栀,゛旧茶,ぃ叹﹄夜浮кμá,泪落晕清池,独孤九贱,墨殇恋歌,陌上月,煖風撩亽醉,末言雨,信谎,┈亇是浄tǔ﹎,烟燃烟灭,Belief,仲夏☆飘雪,流年晕开时光,虐你如虐狗,惊落梧桐,你抓不住萌萌哒,爱你怎会放你走,》往亊のγí書ˇ,浪荡街痞,◇ɡù倳ㄝ孑慫,羡鱼,娷㈧醒小jiě,←偶縋你τáδ﹎,古亭白衫少年殇,忘他,听风忆雪,厡菋尐釹吢,浅眉明明眸,在你心上,琼窗梦回,残局,谎哑,♂zЦì揂гěη身,^浪γǔ銨生﹏,眉间藏你,独行千万里,﹌ō昌嚱гёη♂,半暖时光,青柠蓝,与孤独合葬,若枫如烟,顾北清歌寒,∠※猫在裙角,生性寡情,南方吴彦祖,棉花一朵,白衣无言殇,麤苼,我醉欲眠,与君共舞,?°ηι另情深︵,那颗心只属于你,怎忧,晚间情信,九句情话,浮生知星辰,满腔的辛酸灬,妳很迷人但我得回家,〃沵算ィ╄мё〆,亡暮森南,璃落幽客,恰如,一代女皇,Energy,芣悅妳ベ,昨夜西风,ヤ未央мo寒メ,≮枕歌褵яeη≯,葵雨,幻空drems,桔栀,(_jυи當敬ωǒぺ,用心爱了心痛了,爱西瓜的浪女,随心自在,暗灵古魂,倾夏暖桑榆,爷依旧如初,来一斤小鲜肉,情话喂风,鳄鱼的眼泪,是我爱你，爱的太深,灬落寞街頭,ο潞痴尋懜︶,狂舞ギ炫尊《,人若残棋,也许相爱,空气猫,輓畱嶼赱,水墨云烟,花落陌,秋雨涩,_揂家浪nν←,未若柳絮,拧巴小姐,三好学生,雪花芳香,纵酒,北枳,乌衣巷,时间是你的脸,暖如风,抚琴人,以友情的名义深爱着你,(樅嫆Ъáι首▂,夏风如歌,_橘子不甜,〆筶ьιé偶→,ぐ儚迴从偂,金鱼姬,温暖先生,ㄣ懂ωΘ再ιáī爱我,烟雨寒,紫心柔,┋τōu影孒の亽┊,扑硕迷离,↘┌天狼公爵,西窗过雨,巷里人,轻风散寂寞,时宛,魂归处,往昔ヽ如夢,羞羞脸,说等却走,孤犹,清素笔调,¤恰яù袹lù亽︷,吻你一遍,自傲称王,蘹菢裏,炼狱＆死神,＂ɡαи脆拍τυδぺ,森鹿执夏,碧水佳人,遇见鲸鱼      ,ぐ直視驕βθ,忆君柳下奕,时有幽花,楚碧瑶,情陌人已不在,乏味枪手,▲`归舟,梦里寻仙,北栀怨寒,泪沾梨花,北溟有鱼,逆光之处,_ηǎη巷мò栀↘,＊zǒμ在ιùと灬,耀眼的男神,岛是海的疤,雲胡不喜,空城不寂,莪聴聞,魁墨梓熙,噤口,书煮日月,踩ぅηíυ奶の猫`ω′,清风吹我襟,?°等君回,难免心死祝我活该,泪代替你吻我的脸,银烛秋光冷画屏,凉世弥音,ωeη柔dε獵殺者Δ,六月亦輕寒,我伴他久,空谈感伤,你若盛开，清风自来,萌妹咿呀呦,红装而蹇者,◇jιù城yǐ西,苺籽奶酱(:≡,你是远方,柠檬树上的少女,点雨落山岚,森芋暖暖,〆笑亇гυ謌▂,野橘,風聲提筆,梨花飞雪影无眠,孤雨旁,岁月审判,地灵女仙,低到尘埃ぐ,?°與風τí起ńi,清风南趋,混世大魔王,青砚,蹲得下，跳得高,燕舞飞扬,人间凶器,和她笑一场,枯叶?墨迹,眉间缘,农村城市混血儿,时光礼记,旧人难忘，静守彷徨,复制故事,风软一江水,话少又慢热,爱一路让人仁至义尽,凉城听暖,逆光下的微笑,襟上摘花,神斧霸绝苍生,爱因思念,风蛍月缓缓,伊人倾城,ㄣ她の笶莂亽兂法笩τì,違χīи笑→,清影觅,浅凝半夏,sＩ淰ɡцδー秒…,信笺揉皱,(jιǎ裝ηáη簻~,雨落微凉,醉翁著踞,┕像极るτā┑,青桥细雨,灬梂１ъēι凊風,清风微醺,﹊恠ηi廴前う,’安静Θ斤(~)跳▂,千夕殇,晚来天欲雪,旧时微风拂晓城,醉落夕风,死权掌控者,很酷不闲聊,英雄♀奶油♂,苦酒入喉,爱的无路可退,君惜沂瑾,小柠檬儿,呆萌鹿,拈花把酒,狼烟不休,荣耀彡之魂,★?勿zàι沩儺灬,那缕云后的阳光,花泪兮,恨不能相逢,青瓷如水,墨色玄离,喵哼,一眼云烟,把我辜负,﹎綪等ωΘ鱮尒冃洐↑,故事缺酒也缺你,甘之如饴,北岛旅客,红衣一袭,热情喂狂风,清风一曲欲孤心,┋戰磕蒗亽辤…,做个女魔头,﹏荒度余生o,厕所里蹲着个如来佛i,朝夕盼兮,泪满春衫袖,喊眠宝宝i,↓美腻孩zi跟ωΘ走 ,我横刀向天笑,伊人问孤影,﹎醉щò街τoμぐ,潮流麒尐,绾千念,庸人自庸,风烟倦,空有执念了残生,ヤ恩，尒菛dōμ赱ιε,〃瞳之深渊,没钱自然瘦,贫尼想借色,请告诉她，我很爱她,凯爷会发光,倚窗听花落,玻璃之情,跌落的繁花,灬煞桖江楜,劣女,书茧,是你们逼我学会装死的,柒街鯎揂,芜枯,〗鷡亽孒檞〖,抧湜不ɡòu愛~,叶子纷飞,小楼又春风,┡死亡如风,眼泪绝提,丢了幸福de猪,猩红女神,戒烟戒酒也戒了你,°幽影紫衣绝,﹊ωo有啤⒐和大扎,浪够,ぐyě孒の酒,药人,竹隐寒烟,充电五分钟，装逼俩小时,★`怕ωο妚╳,肩上风尘,睁眼望见你,季末樱花落,玛丽苏与矫情病,﹌pī孀情んuα♀,雨橙汉子,○●○—共度猫生,我３分热度却爱你好久,烟织青萝梦,窃笑,吻你眉心许下诺言,海是鱼的羁绊,攻陷,︻◣善良の劊zι扌,灬ɡuàι性笶ん←,沐子眠,★`１ιù狂顛,快感,〃潶γè冭誃の孤唥…,甩你一脸翔,深溺,蔠莪⒈苼呒ηι相伴";
      this["playerNameStr2"] = "吟花间画闲,宁负苍天不负你,慢爱ъιe说ιí别,…衆ロ難τιáo~,蒹葭青衫,若安离半冬,狂灵在世,渐行如风远,狂杀メ无赦,床欢,ぷ木槿花開,蓝樱浅蝶,…街頭扮κμ℃,安季浅空,妳涐執唸汰深,眼泪流不停,残风葬,雨敲疏棂,睫长眸澈,灬ηι説aι像雲~,★?偸ぅ月亮dε猫∪,暮光青柠,歌尽酒,过把痴情瘾,尘世闲云,旧梦离裳,爱里时光已苍白,依唸烟雨楼";
      this["playerNameStrArr"] = [];
    }

  }();
  _0x5adfe2["_gameData"] = new class {
    constructor() {
      this["isStart"] = false;
      this['gameLevel'] = 1;
      this['gameCoin'] = 0;
      this["gameMgr"] = null;
      this['poleScale'] = 1;
      this['gameCount'] = 0;
      this["killCount"] = 0;
      this["aiCount"] = 0;
      this["isDouble"] = false;
      this["levelCount"] = 0;
      this["radius"] = 20;
      this["gameState"] = 1;
      this["noiseArr"] = [];
      this['daojuArr'] = [];
      this['colorArr'] = [251, 134, 56, 249, 249, 249, 233, 205, 224, 253, 255, 253, 255, 255, 255];
      this["tipMoveArr"] = [0, 74, 19, 19, 85, 0, 138, 11, 179, 78, 215, 131, 280, 157, 335, 132, 361, 78, 337, 20, 282, 0, 221, 11, 179, 78, 145, 124, 84, 147, 19, 128];
    }

  }();
  _0x5adfe2['_gameMgr'] = new class {
    constructor() {
      this["touchMove"] = new Laya['Vector2'](0, 0);
      this["isOver"] = true;
      this["isPlay"] = true;
      this["isTouchDown"] = false;
      this["oripos"] = new Laya['Vector2'](0, 0);
      this["count"] = 0;
      this['_fieldOfView'] = null;
      this["_viewportRatio"] = null;
      this["initCamera"] = false;
      this["effectScene"] = null;
      this["effectLight"] = null;
      this['currentColor'] = 0;
      this["first"] = true;
      this['bSetSpeed'] = true;
      this["bSetCamera"] = true;
      this["ballonShowCount"] = 0;
      this["lastTime"] = 0;
      this["movex"] = 0;
      this["movey"] = 0;
      this['targetNum'] = 0;
      this["targetNum2"] = 0;
    }

    ["init"]() {
      _0x5adfe2["gameData"]["gameMgr"] = this;
      this["addEvent"]();
      this["initScene"]();
      this["ballonShowCount"] = 0;
      Laya["stage"]['on']("DEVICE_ON_HIDE", this, this["onHide"]);
      Laya["stage"]['on']("DEVICE_ON_SHOW", this, this["onShow"]);
    }

    ["initScene"]() {
      if (this["scene"] = _0x5adfe2['resourceMgr']["mainScene"], this["camera"] = this['scene']['getChildByName']("Main Camera"), Laya["Browser"]["onIOS"] && !this["initCamera"]) {
        this["initCamera"] = true;
        let _0x24b633 = this['camera'];
        this['_fieldOfView'] && this["_viewportRatio"] || (this['_fieldOfView'] = _0x24b633['fieldOfView'], this["_viewportRatio"] = _0x24b633["viewport"]["height"] / (1334 * Laya["RenderState2D"]['width'] / 750), _0x24b633["fieldOfView"] = this["_fieldOfView"] * this['_viewportRatio']);
      }

      let _0x47bac3 = this["scene"]['getChildByName']("Directional Light");

      this['light'] = _0x47bac3;
      this['scene']["addComponent"](_0x1d5294)["produceNoise"]();
      this["groundScene"] = this["scene"]["getChildByName"]("scene");
      this['groundMgr'] = this["groundScene"]["addComponent"](_0x422e12);
      this['groundMgr']["init"](this["groundScene"]);
      this["player"] = this["scene"]['getChildByName']('player');
      this["aiRoot"] = this["scene"]["getChildByName"]("aiRoot");
      this["aiRootMgr"] = this["aiRoot"]["addComponent"](_0x58acc3);
      this["aiRootMgr"]['init'](this["aiRoot"]);
      this["effectRoot"] = this["scene"]["getChildByName"]('effect');
      this["effectMgr"] = this["effectRoot"]['addComponent'](_0x24d78d);
      this["effectMgr"]["init"](this["effectRoot"]);
      this["playerLg"] = this["player"]["addComponent"](_0x4dff27);
      this["playerLg"]['init'](this["player"]["getChildAt"](0));
      this["cameraLg"] = this['camera']['addComponent'](_0x664899);
      this["cameraLg"]["init"](this["camera"]);
      this["obstacle"] = this["scene"]["getChildByName"]("obstacle");
      this["obstacleLg"] = this["obstacle"]["addComponent"](_0x248602);
      this["obstacleLg"]["init"](this["obstacle"]);
    }

    ["initEffectScene"]() {
      let _0x15426b,
          _0x3aff50 = (_0x15426b = Laya["stage"]["addChild"](new Laya['Scene3D']()))["addChild"](new Laya["DirectionLight"]());

      _0x3aff50["color"] = new Laya["Vector3"](1, 0.956, 0.839);
      _0x15426b["ambientSphericalHarmonicsIntensity"] = 1;
      _0x15426b['ambientColor'] = new Laya["Vector3"](0.8313726, 0.8313726, 0.8313726);
      _0x3aff50["intensity"] = 0.6;

      _0x3aff50["transform"]["rotate"](new Laya["Vector3"](10, -17, 0), true, false);

      var _0x45a1b3 = _0x15426b["addChild"](new Laya["Camera"](0, 0.1, 100));

      _0x45a1b3["name"] = "mainCamera";

      _0x45a1b3['transform']["translate"](new Laya["Vector3"](0, 8, -5.8));

      _0x45a1b3["transform"]["rotate"](new Laya["Vector3"](-20, 180, 0), true, false);

      _0x45a1b3["clearFlag"] = 2;
      this["effectScene"] = _0x15426b;

      let _0x2ef705 = this["scene"]["getChildByName"]("effect2")["getChildAt"](0)['getChildAt'](0);

      _0x15426b["addChild"](_0x2ef705);

      _0x2ef705["transform"]["position"] = new Laya["Vector3"](1.2, 3, 5);
      _0x2ef705["transform"]["localScale"] = new Laya["Vector3"](1734.2 / Laya["stage"]["height"] * 1.9, 2.45, 0.75);
      _0x2ef705['transform']["localRotationEuler"] = new Laya["Vector3"](20, 0, 0);
      this['effectLight'] = _0x2ef705;
    }

    ["showEffectScene"](_0x390d5e) {
      this["effectScene"] && (_0x390d5e ? (Laya["stage"]["addChild"](this["effectScene"]), this["effectScene"]["active"] = true, this["effectLight"]["active"] = false, this["effectLight"]['active'] = true) : (this["effectScene"]["active"] = false, this["effectLight"]['active'] = false));
    }

    ["gameReset"]() {
      this['isVictory'] = false;
      _0x5adfe2["gameData"]["isDouble"] = false;
      _0x5adfe2['gameData']["aiCount"] = 0;
      _0x5adfe2["gameData"]["radius"] = 20;
      _0x5adfe2["gameData"]["gameCoin"] = 0;
      _0x5adfe2["gameData"]["killCount"] = 0;
      this["playerLg"]["reSetPlayer"]();
      this["playerLg"]["changeSkin"]();
      this["cameraLg"]["reSet"]();
      this["aiRootMgr"]["reset"]();
      this['groundMgr']['reset']();
      this["obstacleLg"]["obstacleReset"]();
      this["isOver"] = true;
      _0x5adfe2["gameData"]["isStart"] = false;
    }

    ["setSky"]() {}

    ["onHide"]() {
      Laya["timer"]['scale'] = 0;
    }

    ['onShow']() {
      Laya["timer"]["scale"] = 1;
    }

    ["setGameOver"]() {
      _0x5adfe2["gameData"]["isStart"] = false;
      this["cameraLg"]["setCameraData"](false);
    }

    ['gameReviel']() {
      _0x5adfe2["gameData"]['isStart'] = true;
    }

    ["gameStart"]() {
      this["isOver"] = false;
      this["cameraLg"]["setCameraData"](true);
      this["gameStart2"]();
    }

    ["gameStart2"]() {
      _0x5adfe2['gameData']["isStart"] = true;
      this["playerLg"]["setMove"](true);
      this["aiRootMgr"]['aiStartMove']();
    }

    ["setFog"](_0x929115) {}

    ["addEvent"]() {
      Laya["stage"]['on'](Laya["Event"]["MOUSE_DOWN"], this, this["onMouseDown"]);
      Laya["stage"]['on'](Laya["Event"]['MOUSE_UP'], this, this["onMouseUp"]);
      Laya["stage"]['on'](Laya['Event']['MOUSE_MOVE'], this, this["onMouseMove"]);
      Laya["stage"]['on'](zs["laya"]["platform"]["PlatformMgr"]["GAME_RESET_START"], this, this['onContinueGame']);
      Laya["timer"]["frameLoop"](1, this, this['onUpdate']);
    }

    ["onContinueGame"]() {
      Laya['Scene']["open"]('views/home.scene', false, Laya["Handler"]['create'](this, _0x327eaa => {}));
    }

    ["onUpdate"]() {
      let _0x2aef57 = Laya["timer"]["delta"];
      _0x2aef57 > 50 && (_0x2aef57 = 20);
    }

    ["onMouseDown"](_0x26f505) {
      this["isTouchDown"] = true;
      this["oripos"] = new Laya["Vector2"](_0x26f505['stageX'], _0x26f505['stageY']);
      this["playerLg"] && _0x5adfe2["gameData"]["isStart"];
    }

    ["onMouseUp"]() {
      this['count'] = 0;
      this["isTouchDown"] = false;
      this["playerLg"] && _0x5adfe2["gameData"]['isStart'];
    }

    ["onMouseMove"](_0x482fa0) {
      if (this['cameraLg']["isMove"] && this["count"] > 0 && this["isTouchDown"]) {
        let _0x165726 = _0x482fa0['stageX'] - this["oripos"]['x'];

        _0x482fa0["stageY"];
        this["oripos"]['y'];
        this["isTouchDown"] = true;
        this["playerLg"]['setPlayerMove'](_0x165726);
      }

      this["oripos"] = new Laya["Vector2"](_0x482fa0['stageX'], _0x482fa0['stageY']);
      this["count"]++;
    }

    ["setDirection"]() {}

    ["playVibrate"](_0x248167) {
      _0x5adfe2["storageMgr"]["isPlayVibrate"]() && (_0x248167 ? zs["laya"]['sdk']["DeviceService"]["VibrateShort"]() : zs['laya']["sdk"]["DeviceService"]["VibrateLong"]());
    }

    ["destoryAll"]() {}

    ["initGame"](_0x4ae034) {}

    ["finishTarget"]() {}

    ['over']() {}

    ["gameOver"]() {
      if (this["isOver"]) {
        return void console["log"]("is game over.");
      }

      _0x5adfe2["gameData"]["gameCount"]++;
      this['isOver'] = true;
      let _0x27164c = "views/fail.scene";
      this['isVictory'] ? (_0x5adfe2['gameData']["gameCoin"] += 150 + Math["floor"](100 * Math["random"]()), _0x27164c = "views/success.scene", this["showResult"](_0x27164c)) : this["showResult"](_0x27164c);
    }

    ["showResult"](_0x36488b) {
      _0x5adfe2["glEvent"]["event"]('over_game_event', {
        'isVictory': this["isVictory"]
      });
    }

  }();
  _0x5adfe2['_uiMgr'] = null;
  _0x5adfe2["screen"] = {
    'realPxRatio': 0,
    'offsetTop': 0,
    'allScreen': false
  };

  class _0x3c5cf3 extends zs["laya"]["base"]["ZhiSeView"] {
    constructor() {
      super();
    }

    ["onAwake"]() {
      super['onAwake']();
      this['initData']();
      this["initDataBase"]();
      this["initUI"]();
      this['initEvent']();
    }

    ["onClosed"]() {
      Laya['timer']["clearAll"](this);

      _0x5adfe2["glEvent"]["offAllCaller"](this);
    }

    ["initData"]() {}

    ["initDataBase"]() {}

    ["initUI"]() {}

    ["initEvent"]() {}

    ["getChild"](_0x47c2ab, _0x261779) {
      _0x261779 || (_0x261779 = this);
      return _0x261779["getChildByName"](_0x47c2ab);
    }

  }

  class _0x2192c0 extends Laya['Script'] {
    constructor() {
      super(...arguments);
      this['moveValue'] = 0;
    }

    ["init"](_0xbe941c) {
      this["single"] = _0xbe941c;
    }

    ["setMove"](_0x289e57, _0x812113, _0x5c06f1, _0x5d7b52, _0x16c480) {
      let _0x2635da = new Laya['Vector2'](_0x289e57['x'], _0x289e57['y']),
          _0xdc2c24 = new Laya['Vector2'](_0x812113['x'], _0x812113['y']),
          _0x54a261 = new Laya["Vector2"](_0x5c06f1['x'], _0x5c06f1['y']);

      this['moveValue'] = 0;

      let _0x8e5845 = Laya["Tween"]['to'](this, {
        'moveValue': 1
      }, _0x5d7b52, Laya["Ease"]["quadInOut"], new Laya["Handler"](this, function () {
        _0x16c480 ? this["setMove"](_0xdc2c24, _0x54a261, _0x54a261, _0x5d7b52, false) : this["single"]["visible"] = false;
      })),
          _0x5cb702 = new Laya["Vector2"](0, 0);

      _0x8e5845["update"] = new Laya["Handler"](this, function () {
        if (_0x5cb702['x'] = _0x2635da['x'] * (1 - this['moveValue']) + _0xdc2c24['x'] * this['moveValue'], _0x5cb702['y'] = _0x2635da['y'] * (1 - this['moveValue']) + _0xdc2c24['y'] * this['moveValue'], this['single']['pos'](_0x5cb702['x'], _0x5cb702['y']), !_0x16c480 && this['moveValue'] > 0.5) {
          let _0x4dd191 = 2 * (1 - this["moveValue"]);

          this['single']["scale"](_0x4dd191, _0x4dd191);
        }
      });
    }

    ["gameSetMove"](_0x21d52a, _0x325590, _0x137111) {
      let _0x44fd6e = new Laya["Vector2"](0, 0);

      _0x44fd6e['x'] = 0.5 * _0x21d52a['x'] + 0.5 * _0x325590['x'];
      _0x44fd6e['y'] = 0.5 * _0x21d52a['y'] + 0.5 * _0x325590['y'];

      let _0xc8eba4 = 100 + 400 * Math['random']();

      Math["random"]() < 0.5 && (_0xc8eba4 *= -1);
      _0x44fd6e['x'] += _0xc8eba4;
      this["moveValue"] = 0;

      let _0x38dbe4 = _0x21d52a['x'] - _0x325590['x'],
          _0x24ed82 = _0x21d52a['y'] - _0x325590['y'];

      _0x137111 = 0.8 * Math["sqrt"](_0x38dbe4 * _0x38dbe4 + _0x24ed82 * _0x24ed82);
      Laya["Tween"]['to'](this, {
        'moveValue': 1
      }, _0x137111, Laya["Ease"]["linearIn"], new Laya["Handler"](this, function () {
        this["single"]["visible"] = false;
        Laya["Pool"]["recover"]("gameFlyCoin", this["single"]);
      }))["update"] = new Laya["Handler"](this, function () {
        let _0x4a9423 = this["calculatePos"](this["moveValue"], _0x21d52a, _0x44fd6e, _0x325590);

        if (this["single"]["pos"](_0x4a9423['x'], _0x4a9423['y']), this["moveValue"] > 0.75) {
          let _0x3ce131 = 4 * (1 - this['moveValue']) * 0.8;

          this["single"]['scale'](_0x3ce131, _0x3ce131);
        }
      });
    }

    ['calculatePos'](_0x197a39, _0x2b95d9, _0x3d93f4, _0x1d3e27) {
      let _0xe12df4 = new Laya["Vector2"](0, 0);

      _0xe12df4['x'] = _0x2b95d9['x'] * (1 - _0x197a39) * (1 - _0x197a39) + 2 * _0x3d93f4['x'] * (1 - _0x197a39) * _0x197a39 + _0x1d3e27['x'] * _0x197a39 * _0x197a39;
      _0xe12df4['y'] = _0x2b95d9['y'] * (1 - _0x197a39) * (1 - _0x197a39) + 2 * _0x3d93f4['y'] * (1 - _0x197a39) * _0x197a39 + _0x1d3e27['y'] * _0x197a39 * _0x197a39;
      return _0xe12df4;
    }

  }

  class _0x1cf7e4 extends _0x3c5cf3 {
    constructor() {
      super(...arguments);
      this["coinArr"] = [];
    }

    ["onAwake"]() {
      super["onAwake"]();
    }

    ["initUI"]() {
      _0x5adfe2["commonData"]["coinFlyView"] = this;

      let _0x51eafe = this["getChild"]('middleUI', this['owner']);

      _0x51eafe['on'](Laya['Event']["MOUSE_DOWN"], this, function () {});

      for (let _0x2482d8 = 0; _0x2482d8 < 10; ++_0x2482d8) {
        let _0x59241c = this["getChild"]("coin" + (_0x2482d8 + 1), _0x51eafe);

        _0x59241c["addComponent"](_0x2192c0)["init"](_0x59241c);

        this['coinArr']["push"](_0x59241c);
      }
    }

    ["setCoinMove"](_0x1278f1, _0x1ae57d, _0xb31f40 = null) {
      this["owner"]["visible"] = true;

      let _0x2fac9f = new Laya["Vector2"](0, 0);

      for (let _0x3540f5 = 0; _0x3540f5 < 10; ++_0x3540f5) {
        let _0x409d3c = this["coinArr"][_0x3540f5];
        _0x409d3c['visible'] = true;

        _0x409d3c["scale"](1, 1);

        let _0x288cee = 100 * Math["random"]() + 100,
            _0x47088b = Math["random"]() * Math['PI'] * 2;

        _0x2fac9f['x'] = _0x288cee * Math["cos"](_0x47088b) + _0x1278f1['x'];
        _0x2fac9f['y'] = _0x288cee * Math["sin"](_0x47088b) + _0x1278f1['y'];

        _0x409d3c["pos"](_0x1278f1['x'], _0x1278f1['y']);

        _0x409d3c["getComponent"](_0x2192c0)["setMove"](_0x1278f1, _0x2fac9f, _0x1ae57d, 500, true);
      }

      Laya['timer']["once"](1200, this, function () {
        this["owner"]["visible"] = false;
        _0xb31f40 && _0xb31f40();
      });
    }

  }

  class _0x5e328a extends _0x3c5cf3 {
    constructor() {
      super(...arguments);
      this["coinValue"] = null;
      this['moveValue'] = 0;
      this['sinVal'] = 0;
      this['param'] = 0;
      this["angle"] = 0;
      this["lastAngle"] = 0;
      this["isAni"] = false;
      this["lastRan"] = 6;
      this["arr"] = [200, 300, 500, 800, 1000];
    }

    ["onAwake"]() {
      super["onAwake"]();
    }

    ['initUI']() {
      let _0x277166 = this["getChild"]("topUI", this["owner"]),
          _0x5c5612 = this["getChild"]('middleUI', this["owner"]),
          _0xab086 = this["getChild"]("bottomUI", this["owner"]);

      this['coinValue'] = _0x277166["getChildByName"]("coinBg")["getChildByName"]("value");
      this["coinValue"]['text'] = _0x5adfe2['commonData']["userCoin"] + '';
      this["btnClose"] = this['getChild']("btnBack", _0x277166);
      this["btnFree"] = this["getChild"]("btnVideo", _0xab086);
      this["count"] = this['getChild']("lblLimit", _0xab086);
      this["rotateImg"] = this["getChild"]("disk", _0x5c5612);
      this["btnvideo"] = this["getChild"]("btnVideo", _0xab086);

      let _0x4b26ef = _0x5adfe2["storageMgr"]['getLuckyCount']();

      this["count"]["text"] = _0x4b26ef + '/3';
      _0x4b26ef == 0 ? (this["btnvideo"]["skin"] = "ui/common/disk/btn_disk.png", window['ifFreeBtn'] = true) : (this["btnvideo"]["skin"] = "ui/common/disk/btn_disk2.png", window["ifFreeBtn"] = false);
      //window["box_adTwo"]["visible"] = false;
    }

    ["initEvent"]() {
      _0x5adfe2["utils"]["addClickEvent"](this["btnClose"], this, this['onCloseClick']);

      _0x5adfe2["utils"]["addClickEvent"](this["btnFree"], this, this['onFreeClick']);
    }

    ["setAni"](_0x275f3b, _0x74ed11, _0xb51b26 = false) {
      let _0x255f71 = this["getChild"]('middleUI', this["owner"]);

      this["moveValue"] = _0x275f3b;
      Laya["Tween"]['to'](this, {
        'moveValue': _0x74ed11
      }, 300, Laya["Ease"]['quadInOut'], new Laya["Handler"](this, function () {
        _0xb51b26 && Laya["Scene"]["close"]("views/disk.scene");
      }))["update"] = new Laya["Handler"](this, function () {
        _0x255f71["scale"](this["moveValue"], this['moveValue']);
      });
    }

    ["onFreeClick"]() {
      if (this["isAni"]) {
        return;
      }

      let _0x287246 = _0x5adfe2["storageMgr"]["getLuckyCount"]();

      window["ifFreeBtn"] ? (this['rotateAni'](), _0x287246++, _0x5adfe2["storageMgr"]["setLuckyCount"](_0x287246), this["count"]['text'] = _0x287246 + '/3', this["btnvideo"]["skin"] = 'ui/common/disk/btn_disk2.png', window["ifFreeBtn"] = false) : platform["getInstance"]()["showReward"](() => {
        this['rotateAni']();
        _0x287246++;

        _0x5adfe2["storageMgr"]['setLuckyCount'](_0x287246);

        this["count"]["text"] = _0x287246 + '/3';
      });
    }

    ["onUpdate"]() {
      this["param"] += Laya["timer"]['delta'] / 1000 * 2;
      this["sinVal"] = Math["sin"](this["param"]) + 1;
    }

    ["rotateAni"]() {
      if (this['isAni']) {
        return;
      }

      this["isAni"] = true;
      this["angle"] = this["lastAngle"];

      let _0x4520c1 = Math['floor'](5 * Math['random']()),
          _0xa57960 = 1080 + 60 * _0x4520c1 + this["lastAngle"] + 60 * (6 - this["lastRan"]);

      this['lastRan'] = _0x4520c1;
      Laya['Tween']['to'](this, {
        'angle': _0xa57960
      }, 3000, Laya['Ease']["quadInOut"], new Laya["Handler"](this, function () {
        this["lastAngle"] = _0xa57960;
        this["isAni"] = false;
        this['showGoldAni']();
        let _0x4b592c = this["arr"][_0x4520c1];
        _0x5adfe2["commonData"]["userCoin"] += _0x4b592c;

        _0x5adfe2["storageMgr"]['setAwardGold'](_0x5adfe2["commonData"]["userCoin"]);

        _0x5adfe2["uiMgr"]["showToast"]("You Get " + _0x4b592c + " Coins", 2000);

        _0x5adfe2['glEvent']['event']("update_coin");

        this["coinValue"]["text"] = _0x5adfe2["commonData"]["userCoin"] + '';
      }))["update"] = new Laya["Handler"](this, function () {
        this["rotateImg"]["rotation"] = this["angle"];
      });
    }

    ["showGoldAni"]() {
      let _0x446604 = new Laya["Point"](0, 0);

      _0x446604['x'] = Laya["stage"]['width'] / 2;
      _0x446604['y'] = Laya['stage']["height"] / 2 - 100;

      let _0x1c2125 = new Laya["Point"](9, 48);

      _0x5adfe2["utils"]["showCoinFly"](_0x446604, _0x1c2125, null);
    }

    ["onCloseClick"]() {
      this["isAni"] || (Laya["Scene"]["close"]("views/disk.scene"));
    }

  }

  class _0x248c9f extends _0x3c5cf3 {
    ['onAwake']() {
      super["onAwake"]();
    }

    ["onOpened"]() {
      this["isStartTimer"] = true;
    }

    ["onEnable"]() {
      this['initUI']();
      this["initEvent"]();
    }

    ['initUI']() {
      let _0x484210 = this['getChild']("bottomUI", this["owner"]);

      this['btnSkip'] = this['getChild']('btnSkip', _0x484210);
      this["btnAgain"] = this['getChild']("btnAgain", _0x484210);
      _0x5adfe2["commonData"]["userCoin"] += 10;

      _0x5adfe2["storageMgr"]["setAwardGold"](_0x5adfe2["commonData"]["userCoin"]);

      _0x5adfe2["gameData"]["gameCoin"] = 0;
      this["owner"]["getChildByName"]("topUI")["getChildByName"]("coinBg")["visible"] = false;
      this['coinValue'] = this["owner"]["getChildByName"]("topUI")["getChildByName"]("coinBg")['getChildByName']('value');
      this["updateScore"]();
      _0x5adfe2["commonData"]["freeSkinCount"]++;
      //window["scrollList"]["visible"] = true;
    }

    ['initEvent']() {
      _0x5adfe2['utils']['addClickEvent'](this["btnSkip"], this, this['onAgainClick']);

      _0x5adfe2["utils"]['addClickEvent'](this["btnAgain"], this, this['onAgainClick']);
    }

    ["updateScore"]() {
      this["coinValue"]["text"] = _0x5adfe2["commonData"]['userCoin'] + '';

      _0x5adfe2['storageMgr']["setAwardGold"](_0x5adfe2["commonData"]["userCoin"]);
    }

    ["onSkinShopClick"]() {
      Laya["Scene"]['open']("views/skinShop.scene", false, Laya['Handler']["create"](this, _0x1a7e1f => {
        _0x5adfe2["gameMgr"]['gameReset']();

        this["owner"]["close"]();
      }));
    }

    ["onAgainClick"]() {
      platform["getInstance"]()["showInterstitial"](() => {
        window["isWin"] = false;
      //  window["scrollList"]["visible"] = false;

        _0x5adfe2['gameMgr']["gameReset"]();

        this['owner']["close"]();
        zs["laya"]['platform']["PlatformMgr"]['onGameOverPopUp'](false);
      });
    }

    ["onSkipClick"]() {
      platform['getInstance']()['showReward'](() => {
        window["isWin"] = false;
        // window['scrollList']['visible'] = false;

        function _0x283cde(_0x511049) {
          1 == _0x511049 ? (_0x5adfe2["commonData"]['newLevel']++, _0x5adfe2["gameMgr"]["gameReset"](), this["owner"]["close"](), zs["laya"]['tdapp']["tdAppSdk"]["event"](new zs["laya"]["tdapp"]['levelCompletedEvt'](_0x5adfe2["commonData"]["userId"], _0x5adfe2["commonData"]['newLevel'] + '')), _0x5adfe2["storageMgr"]["setGameStausLevel"](_0x5adfe2["commonData"]['newLevel']), zs["laya"]['platform']["PlatformMgr"]["onGameOverPopUp"](false)) : 2 == _0x511049 ? _0x5adfe2["uiMgr"]["showToast"]("看完视频才能跳过关卡", 2000) : _0x5adfe2['uiMgr']["showToast"]("暂无视频", 2000);
        }

        _0x5adfe2['commonData']["userCoin"] += _0x5adfe2['gameData']["gameCoin"];
        Laya["Handler"]['create'](this, _0x283cde, [1]);
      });
    }

  }

  class _0x5f0ee1 extends _0x3c5cf3 {
    constructor() {
      super(...arguments);
      this['skinId'] = 0;
      this['freeUse'] = false;
      this['model'] = null;
      this["effect"] = null;
      this["bodyArr"] = [];
      this["bodyArrIndex"] = [];
      this["movev"] = 0;
    }

    ["onAwake"]() {
      super["onAwake"]();
    }

    ["initUI"]() {
      let _0x483386 = this["getChild"]('bottomUI', this["owner"]);

      this["videoBtn"] = this["getChild"]('selectBtn', _0x483386);
      this["skipBtn"] = this["getChild"]("btnStart", _0x483386);

      let _0x3b42f2 = this["videoBtn"]['getChildByName']("img");

      zs['laya']['platform']["ADConfig"]["zs_share"] ? _0x3b42f2["skin"] = 'ui/common/home/img_feixiang.png' : _0x3b42f2['skin'] = "ui/common/home/img_guanggao.png";
      this["skinId"] = Math["floor"](6 * Math["random"]());
      this["skinId"] == _0x5adfe2["commonData"]["freeSkinId"] && (this["skinId"] = (this["skinId"] + 1) % 6);
      this["skinId"] == _0x5adfe2["commonData"]["skinId"] && (this["skinId"] = (this["skinId"] + 1) % 6);
      _0x5adfe2["commonData"]["freeSkinId"] = this["skinId"];
      this["initScene"]();
      this["show3dScene"](true);
      Laya["timer"]["frameLoop"](1, this, this["rotateFunc"]);
    }

    ["initScene"]() {
      let _0x15ab51, _0x538c94;

      if (_0x5adfe2['commonData']["showScene"]) {
        _0x5adfe2["commonData"]["showScene"]["active"] = true;
        _0x15ab51 = _0x5adfe2["commonData"]["showScene"];
        Laya['stage']["addChild"](_0x15ab51);
      } else {
        let _0x3c2231 = (_0x15ab51 = Laya["stage"]["addChild"](new Laya["Scene3D"]()))['addChild'](new Laya["DirectionLight"]());

        _0x3c2231["color"] = new Laya['Vector3'](1, 0.956, 0.839);
        _0x15ab51['ambientSphericalHarmonicsIntensity'] = 1;
        _0x15ab51["ambientColor"] = new Laya["Vector3"](0.8313726, 0.8313726, 0.8313726);
        _0x3c2231["intensity"] = 0.6;

        _0x3c2231["transform"]["rotate"](new Laya["Vector3"](10, -17, 0), true, false);

        (_0x538c94 = _0x15ab51["addChild"](new Laya["Camera"](0, 0.1, 100)))['name'] = "mainCamera";

        _0x538c94["transform"]["translate"](new Laya['Vector3'](0, 2, 5));

        _0x538c94["transform"]["rotate"](new Laya["Vector3"](-10, 0, 0), true, false);

        _0x538c94['clearFlag'] = 2;
        _0x5adfe2["commonData"]["showScene"] = _0x15ab51;
      }
    }

    ["setWeapon"](_0x4eccb4) {
      for (let _0x517522 = 0; _0x517522 < _0x4eccb4["numChildren"]; ++_0x517522) {
        let _0xf66910 = _0x4eccb4['getChildAt'](_0x517522);

        "w_01" == _0xf66910['name'] ? _0xf66910["active"] = false : "w_02" == _0xf66910["name"] ? _0xf66910["active"] = false : "w_03" == _0xf66910["name"] ? _0xf66910["active"] = false : "w_04" == _0xf66910["name"] ? _0xf66910['active'] = false : "pifu" == _0xf66910['name'] ? (this["skinRoot"] = _0xf66910, _0xf66910["active"] = false) : "mmdt12" == _0xf66910["name"] ? _0xf66910["active"] = false : this["setWeapon"](_0xf66910);
      }
    }

    ["getBodyChild"](_0xcbb043) {
      for (let _0x2b055b = 0; _0x2b055b < _0xcbb043["numChildren"]; ++_0x2b055b) {
        let _0x9e832e = _0xcbb043["getChildAt"](_0x2b055b);

        if ("BodyParts" == _0x9e832e["name"]) {
          return void (this["BodyParts"] = _0x9e832e);
        }

        this['getBodyChild'](_0x9e832e);
      }
    }

    ['setBodyArr']() {
      let _0x49df78 = this["model"]["getChildAt"](0),
          _0x18c727 = this["BodyParts"]["getChildByName"]("Rank2_ShoseB");

      this["bodyArr"][0] = this["BodyParts"]["getChildByName"]("Rank0_Body");
      this["bodyArr"][1] = this["BodyParts"]["getChildByName"]("Rank1_Body");
      this["bodyArr"][2] = this["BodyParts"]["getChildByName"]('Rank2_BodyA');
      this["bodyArr"][3] = this["BodyParts"]["getChildByName"]("Rank2_BodyB");
      this["bodyArr"][4] = this['BodyParts']["getChildByName"]("Rank2_BodyC");
      this["bodyArr"][5] = this["BodyParts"]["getChildByName"]("Rank0_Shose");
      this["bodyArr"][6] = this["BodyParts"]['getChildByName']("Rank1_Shose");
      this['bodyArr'][7] = _0x18c727['getChildAt'](0);
      this["bodyArr"][8] = _0x18c727["getChildAt"](1);
      this["bodyArr"][9] = this['BodyParts']["getChildByName"]("Rank2_ShoseC");
      this["bodyArr"][10] = _0x49df78["getChildByName"]("Rank0Hair_TTGHairC");
      this["bodyArr"][11] = _0x49df78["getChildByName"]("Rank1Hair_TTGHairB");
      this["bodyArr"][12] = _0x49df78["getChildByName"]('Rank2AHair_TTGHairE1');
      this['bodyArr'][13] = _0x49df78['getChildByName']('Rank2BHair_TTGHairD');
      this["bodyArr"][14] = _0x49df78["getChildByName"]("Rank2CHair_TTGHairB1");
      this["setInitArr"]();
    }

    ["setInitArr"]() {
      let _0x10aa1f = Math['floor'](4 * Math["random"]()) + 1,
          _0x31a3a1 = Math['floor'](4 * Math["random"]()) + 6,
          _0x274b0e = Math["floor"](4 * Math["random"]()) + 11;

      for (let _0x7b6843 = 0; _0x7b6843 < 15; ++_0x7b6843) {
        _0x7b6843 == _0x10aa1f || _0x7b6843 == _0x31a3a1 || _0x7b6843 == _0x274b0e ? (this["bodyArr"][_0x7b6843]["active"] = true, this["bodyArrIndex"][_0x7b6843] = true) : (this["bodyArr"][_0x7b6843]["active"] = false, this["bodyArrIndex"][_0x7b6843] = false);
      }
    }

    ["setEffect"]() {
      this["model"]["getChildByName"]("nsdds_01")["active"] = false;
      this["model"]["getChildByName"]("nsdds_02")['active'] = false;
      this["model"]["getChildByName"]('nsdds_03')['active'] = false;
      this["model"]["getChildByName"]('dengdai')["active"] = false;
      this["getBodyChild"](this["model"]['getChildAt'](0));
      this["setBodyArr"]();
    }

    ["show3dScene"](_0x163c31) {
      if (_0x163c31) {
        (this["model"] && (this["model"]["active"] = false), this["model"] = _0x5adfe2["gameMgr"]["playerLg"]["skinShowSp"], this['model']) && (this["setEffect"](), _0x5adfe2['commonData']["showScene"]['active'] = true, _0x5adfe2["commonData"]["showScene"]["addChild"](this["model"]), this["model"]["active"] = true, this["model"]["transform"]["localScale"] = new Laya["Vector3"](0.8, 0.8, 0.8), this["model"]['transform']['position'] = new Laya["Vector3"](0, 0.4, 0), this["model"]['getChildAt'](0)['getComponent'](Laya["Animator"])["play"]('walk3', 0));
      } else {
        this["model"] && (this["model"]['active'] = false);
        _0x5adfe2['commonData']["showScene"]['active'] = false;
        Laya["timer"]["clear"](this, this["rotateFunc"]);
      }
    }

    ["rotateFunc"]() {
      this["model"] && (this["movev"] += 0.04, this["model"]["transform"]["localRotationEulerY"] += Laya['timer']["delta"] / 30, this['model']['transform']["position"] = new Laya["Vector3"](0, 0.4 + 0.02 * Math["sin"](this['movev']), 0));
    }

    ['initEvent']() {
      _0x5adfe2["utils"]['addClickEvent'](this["videoBtn"], this, this["onVideoClick"]);

      _0x5adfe2['utils']['addClickEvent'](this["skipBtn"], this, this['onSkipBtnClick']);
    }

    ["onVideoClick"]() {
      if (this["freeUse"]) {
        Laya['Scene']["open"]('views/ggame.scene', false, Laya["Handler"]["create"](this, _0x5741f6 => {
          this["owner"]["close"]();
          _0x5adfe2["gameData"]['levelCount']++;
          _0x5adfe2["gameData"]["isDouble"] = true;

          _0x5adfe2["gameMgr"]["playerLg"]['changeSkin'](this['bodyArrIndex']);

          this["show3dScene"](false);

          _0x5adfe2["gameMgr"]["groundMgr"]['reset']();

          _0x5adfe2["gameMgr"]["obstacleLg"]['obstacleReset']();

          _0x5adfe2["glEvent"]['event']("play_game_event");
        }));
      } else {
        if (zs["laya"]["platform"]['ADConfig']["zs_share"]) {
          _0x5adfe2['wxMgr']["openShare"](Laya["Handler"]['create'](this, function () {
            Laya['Scene']['open']("views/ggame.scene", false, Laya["Handler"]['create'](this, _0x103c33 => {
              this["owner"]["close"]();
              _0x5adfe2["gameData"]['levelCount']++;

              _0x5adfe2["gameMgr"]["playerLg"]["changeSkin"](this["bodyArrIndex"]);

              this["show3dScene"](false);
              _0x5adfe2["gameData"]["isDouble"] = true;

              _0x5adfe2['gameMgr']['groundMgr']["reset"]();

              _0x5adfe2['gameMgr']["obstacleLg"]["obstacleReset"]();

              _0x5adfe2["glEvent"]["event"]("play_game_event");
            }));
          }));
        } else {
          function _0x24cc92(_0x2fe650) {
            1 == _0x2fe650 ? Laya["Scene"]["open"]('views/ggame.scene', false, Laya['Handler']["create"](this, _0x38703c => {
              this["owner"]["close"]();
              _0x5adfe2["gameData"]['levelCount']++;

              _0x5adfe2["gameMgr"]["playerLg"]["changeSkin"](this["bodyArrIndex"]);

              this["show3dScene"](false);
              _0x5adfe2['gameData']["isDouble"] = true;

              _0x5adfe2["gameMgr"]["groundMgr"]['reset']();

              _0x5adfe2["gameMgr"]["obstacleLg"]["obstacleReset"]();

              _0x5adfe2["glEvent"]["event"]("play_game_event");
            })) : 2 == _0x2fe650 ? _0x5adfe2["uiMgr"]["showToast"]("看完视频才能试用新皮肤", 2000) : _0x5adfe2["uiMgr"]["showToast"]('暂无视频', 2000);
          }

          platform["getInstance"]()['showReward'](Laya["Handler"]["create"](this, _0x24cc92, [1]));
        }
      }
    }

    ['onSkipBtnClick']() {
      Laya['Scene']["open"]("views/ggame.scene", false, Laya["Handler"]['create'](this, _0x4465c4 => {
        this['owner']["close"]();
        this['show3dScene'](false);

        _0x5adfe2["glEvent"]["event"]("play_game_event");
      }));
    }

  }

  class _0x16420b extends _0x3c5cf3 {
    constructor() {
      super(...arguments);
      this["coinArr"] = [];
    }

    ["onAwake"]() {
      super["onAwake"]();
    }

    ["initUI"]() {
      _0x5adfe2["commonData"]["gameCoinView"] = this;

      let _0x11c0e7 = this["getChild"]("middleUI", this["owner"]);

      for (let _0x4c5cd3 = 0; _0x4c5cd3 < 40; ++_0x4c5cd3) {
        let _0x3b551c = _0x11c0e7["getChildAt"](_0x4c5cd3),
            _0x9521bc = _0x3b551c['addComponent'](_0x2192c0);

        _0x3b551c["visible"] = false;

        _0x9521bc['init'](_0x3b551c);

        Laya["Pool"]["recover"]("gameFlyCoin", _0x3b551c);
      }
    }

    ["setCoinMove"](_0x6e695b, _0x5279b7, _0x270849 = null) {
      this["owner"]["visible"] = true;

      for (let _0x39ab2e = 0; _0x39ab2e < 5; ++_0x39ab2e) {
        let _0x30940f = Laya["Pool"]['getItem']("gameFlyCoin");

        _0x30940f && (_0x30940f['visible'] = true, _0x30940f["scale"](0.8, 0.8), _0x30940f["pos"](_0x6e695b['x'], _0x6e695b['y']), _0x30940f["getComponent"](_0x2192c0)['gameSetMove'](_0x6e695b, _0x5279b7, 500));
      }
    }

  }

  class _0x347e54 extends Laya["Script"] {
    constructor() {
      super(...arguments);
      this['index'] = 0;
      this["isMove"] = false;
      this["moveValue"] = 0;
      this["start"] = null;
      this['end'] = null;
    }

    ["init"](_0x50c917, _0x247cf4) {
      this['index'] = _0x247cf4;
      this['single'] = _0x50c917;
    }

    ["setMove"](_0x475a95, _0x2d7c3d, _0x145d66, _0x5c1452, _0x27d68b = null, _0x305e28 = null) {
      this["isMove"] = _0x475a95;
      this["start"] = _0x2d7c3d;
      this["end"] = _0x145d66;
      this["moveValue"] = 0;
      this['single']["visible"] = true;

      let _0x2eecdb = new Laya['Vector2'](0, 0);

      Laya['Tween']['to'](this, {
        'moveValue': 1
      }, 800, Laya["Ease"]["quadInOut"], new Laya["Handler"](this, function () {
        this["single"]["visible"] = false;

        _0x5adfe2["gameMgr"]["playVibrate"](true);

        _0x5adfe2["gameMgr"]["isOver"] ? (_0x5adfe2["commonData"]['userCoin'] += _0x5c1452, _0x27d68b && _0x305e28 && _0x27d68b(_0x305e28)) : (_0x5adfe2["gameData"]['gameCoin'] += _0x5c1452, _0x5adfe2["commonData"]["GGame"]["setTipShowArr"](this["index"]));
      }))["update"] = new Laya["Handler"](this, function () {
        _0x2eecdb['x'] = this["start"]['x'] * (1 - this["moveValue"]) + this["end"]['x'] * this["moveValue"];
        _0x2eecdb['y'] = this['start']['y'] * (1 - this["moveValue"]) + this["end"]['y'] * this["moveValue"];
        this["single"]["pos"](_0x2eecdb['x'], _0x2eecdb['y']);
      });
    }

    ["onUpdate"]() {}

  }

  class _0x595cf9 extends Laya["Script"] {
    constructor() {
      super(...arguments);
      this["single"] = null;
      this["moveValue"] = 0;
      this["count"] = 0;
      this["bAni6"] = false;
      this['aniValue'] = 0;
      this["hideStart"] = 0;
    }

    ["init"](_0x53ec2b) {
      this["single"] = _0x53ec2b;
    }

    ["aniSet1"]() {
      this["scaleAni"](1, 1.5, 500, true);
    }

    ["scaleAni"](_0x286654, _0x3b1a3e, _0x7b2e46, _0x42d555) {
      this['moveValue'] = _0x286654;
      Laya['Tween']['to'](this, {
        'moveValue': _0x3b1a3e
      }, _0x7b2e46, Laya["Ease"]["linearIn"], new Laya["Handler"](this, function () {
        _0x42d555 && this["scaleAni"](1.5, 1, 300, false);
      }))['update'] = new Laya['Handler'](this, function () {
        this["single"]["scale"](this["moveValue"], this["moveValue"]);
      });
    }

    ["aniSet2"]() {
      this['scaleAni2'](1.3, 1.5, 200, true);
    }

    ["scaleAni2"](_0xe29862, _0x416dcc, _0x31a151, _0x1e1859) {
      this['moveValue'] = _0xe29862;
      Laya["Tween"]['to'](this, {
        'moveValue': _0x416dcc
      }, _0x31a151, Laya["Ease"]["linearIn"], new Laya["Handler"](this, function () {
        _0x1e1859 ? Laya["timer"]["once"](800, this, function () {
          this["scaleAni"](1.5, 0, 200, false);
        }) : this["single"]["visible"] = false;
      }))["update"] = new Laya["Handler"](this, function () {
        this["single"]["scale"](this["moveValue"], this["moveValue"]);
        _0x1e1859 || (this["single"]["alpha"] = 1.5 - this["moveValue"]);
      });
    }

    ["aniSet3"]() {
      this["count"] = 0;
      Laya["timer"]["loop"](200, this, this["scaleAni3"]);
    }

    ["scaleAni3"]() {
      this["count"]++;
      this["single"]["visible"] = this["count"] % 2 == 1;
      this['count'] > 4 && (this["single"]['visible'] = true, Laya["timer"]["clear"](this, this["scaleAni3"]), this["scaleAni"](1.5, 0, 500, false));
    }

    ["aniSet4"]() {
      this["scaleAni4"](3, 1.5, 200, true);
    }

    ["scaleAni4"](_0xf57123, _0x342696, _0x5b80fc, _0x23a527) {
      this['moveValue'] = _0xf57123;
      Laya["Tween"]['to'](this, {
        'moveValue': _0x342696
      }, _0x5b80fc, Laya['Ease']["linearIn"], new Laya['Handler'](this, function () {
        _0x23a527 ? Laya["timer"]["once"](1200, this, function () {
          this["scaleAni"](1.5, 0, 200, false);
        }) : this["single"]["visible"] = false;
      }))["update"] = new Laya["Handler"](this, function () {
        this['single']["scale"](this["moveValue"], this['moveValue']);
        this["single"]["alpha"] = _0x23a527 ? 0.6666666666666666 * (3 - this["moveValue"]) : 1.5 - this["moveValue"];
      });
    }

    ["aniSet5"]() {
      this["scaleAni5"](2, 1, 200, true);
    }

    ["scaleAni5"](_0x20b2ed, _0x1bb596, _0x8e9bad, _0x52fd4a) {
      this["moveValue"] = _0x20b2ed;
      Laya["Tween"]['to'](this, {
        'moveValue': _0x1bb596
      }, _0x8e9bad, Laya["Ease"]["linearIn"], new Laya['Handler'](this, function () {
        _0x52fd4a ? Laya["timer"]["once"](1200, this, function () {
          this['scaleAni'](1, 0, 200, false);
        }) : this["single"]["visible"] = false;
      }))["update"] = new Laya['Handler'](this, function () {
        this["single"]["scale"](this["moveValue"], this["moveValue"]);
        this["single"]["alpha"] = _0x52fd4a ? 2 - this["moveValue"] : 1 - this["moveValue"];
      });
    }

    ["scaleAni6"]() {
      if (this["bAni6"]) {
        return;
      }

      this['single']["alpha"] = 1;
      this["bAni6"] = true;
      this["aniValue"] = 0.3;
      Laya['Tween']['to'](this, {
        'aniValue': 1.4
      }, 500, Laya["Ease"]["linearIn"], new Laya["Handler"](this, function () {
        Laya["timer"]["once"](2000, this, this["hideStartShow"]);
      }))["update"] = new Laya['Handler'](this, function () {
        this["aniValue"] < 1.2 ? this["single"]["scale"](this["aniValue"], this["aniValue"]) : this["single"]["scale"](2.4 - this["aniValue"], 2.4 - this["aniValue"]);
      });
    }

    ["hideStartShow"]() {
      this["hideStart"] = 0;
      Laya["Tween"]['to'](this, {
        'hideStart': 1
      }, 500, Laya["Ease"]["linearIn"], new Laya["Handler"](this, function () {
        this['single']["visible"] = false;
        this["bAni6"] = false;
      }))['update'] = new Laya["Handler"](this, function () {
        this['single']["alpha"] = 1 - this["hideStart"];
      });
    }

  }

  class _0x398906 extends Laya["Script"] {
    constructor() {
      super(...arguments);
      this["starArr"] = [];
      this["type"] = 0;
      this["count"] = 0;
    }

    ['init'](_0x58cec7, _0x16941f) {
      this["single"] = _0x58cec7;
      this["type"] = _0x16941f;

      for (let _0x324190 = 0; _0x324190 < 5; ++_0x324190) {
        this['starArr'][_0x324190] = this["single"]["getChildAt"](_0x324190 + 1);
      }

      Laya["timer"]["frameLoop"](8, this, this["ani"]);
    }

    ["ani"]() {
      this["count"]++;
      let _0x43ee47 = _0x5adfe2["gameData"]["noiseArr"];

      for (let _0x556af5 = 0; _0x556af5 < 5; ++_0x556af5) {
        let _0x5849d5 = 5 * (_0x43ee47[(this["count"] + 250 * _0x556af5 + 75 * this["type"]) % _0x43ee47["length"]] - 100);

        this['starArr'][_0x556af5]["alpha"] = _0x5849d5 / 255;
      }
    }

  }

  class _0x1f6b89 extends _0x3c5cf3 {
    constructor() {
      super(...arguments);
      this["addTipArr"] = [];
      this['addTipShow'] = [];
      this["addTipArr2"] = [];
      this["addTipShow2"] = [];
      this["addTipOffy"] = [];
      this['sayArr'] = [];
      this['tipImgArr'] = [];
      this['starArr'] = [];
      this['skinArr'] = [];
      this["maskArr"] = [];
      this['maskArrY'] = [0, 0, 0];
      this['maskOff'] = 0;
      this["coinAni"] = false;
      this["coinValue"] = 0;
      this["hideVlaue"] = 0;
      this["tipIndex"] = -1;
      this["moveValues"] = 0;
      this['movet'] = 0;
      this["theta"] = 0;
      this['hideStart'] = 0;
    }

    ["initData"]() {}

    ["initUI"]() {
      _0x5adfe2["gameMgr"]["playVibrate"](false);

      _0x5adfe2["commonData"]['GGame'] = this;

      let _0x5034a4 = this['getChild']("topUI", this["owner"]),
          _0x12426c = this["getChild"]('middleUI', this["owner"]);

      this["addTipBox"] = this["getChild"]("addCoin", _0x12426c);
      this["addTipShow"]["length"] = 12;
      this["addTipArr"]["length"] = 12;

      for (let _0x5a11f1 = 0; _0x5a11f1 < 12; ++_0x5a11f1) {
        this['addTipShow'][_0x5a11f1] = false;

        let _0xe0eb36 = this["addTipBox"]['getChildAt'](_0x5a11f1);

        _0xe0eb36["visible"] = false;

        _0xe0eb36["addComponent"](_0x347e54)['init'](_0xe0eb36, _0x5a11f1);

        this["addTipArr"][_0x5a11f1] = _0xe0eb36;
      }

      this['addTipBox2'] = this["getChild"]('addTip', _0x12426c);
      this['addTipShow2']["length"] = 6;
      this["addTipArr2"]["length"] = 6;
      this["addTipOffy"]['length'] = 6;

      for (let _0x436c9f = 0; _0x436c9f < 6; ++_0x436c9f) {
        this["addTipShow2"][_0x436c9f] = false;
        this["addTipOffy"][_0x436c9f] = 0;

        let _0x2836f5 = this["addTipBox2"]["getChildAt"](_0x436c9f);

        _0x2836f5['visible'] = false;
        this["addTipArr2"][_0x436c9f] = _0x2836f5;
      }

      this["gameBox"] = this["getChild"]("gameBox", _0x5034a4);

      let _0x522bf2 = this["getChild"]("proBg", this["gameBox"]);

      this["proValue"] = this["getChild"]("proValue", _0x522bf2);
      this['proValue']["scaleX"] = 0;
      this["gameBuyCoin"] = this["getChild"]("gameBuyCoin", _0x5034a4);
      this["coinBgCH"] = this['getChild']("coinBg", this["gameBuyCoin"]);
      this['gameBuyValue'] = this["getChild"]("value", this["coinBgCH"]);
      this["gameBuyValue"]['text'] = '0';
      this["tipPanel"] = this["getChild"]("tipPanel", _0x12426c);

      let _0x169495 = this["getChild"]("tp1", this["tipPanel"]),
          _0x248106 = this["getChild"]("tp2", this['tipPanel']),
          _0x1f1065 = this["getChild"]("tp3", this["tipPanel"]);

      _0x169495["visible"] = false;
      _0x248106['visible'] = false;
      _0x1f1065["visible"] = false;
      this["tipPanel"]["visible"] = false;
      Laya["timer"]["loop"](100, this, this['updateScore']);

      let _0x1a1d44 = this["getChild"]("gameBox", _0x5034a4),
          _0x56b04f = this["getChild"]("sp1", _0x1a1d44),
          _0x4cf159 = this['getChild']("sp2", _0x1a1d44),
          _0x57fef1 = this["getChild"]("sp3", _0x1a1d44);

      this["maskArrY"][0] = _0x56b04f['y'];
      this["maskArrY"][1] = _0x4cf159['y'];
      this["maskArrY"][2] = _0x57fef1['y'];
      this['maskArr'][0] = _0x56b04f;
      this["maskArr"][1] = _0x4cf159;
      this["maskArr"][2] = _0x57fef1;
      this["tipImgArr"][0] = this["getChild"]("img1", _0x1a1d44);
      this["tipImgArr"][1] = this["getChild"]('img2', _0x1a1d44);
      this["tipImgArr"][2] = this['getChild']("img3", _0x1a1d44);
      this["starArr"][0] = this["getChild"]("star1", _0x1a1d44);
      this['starArr'][1] = this["getChild"]("star2", _0x1a1d44);
      this["starArr"][2] = this["getChild"]("star3", _0x1a1d44);
      this["skinArr"][0] = this['getChild']("skin1", _0x1a1d44);
      this["skinArr"][1] = this["getChild"]("skin2", _0x1a1d44);
      this["skinArr"][2] = this["getChild"]("skin3", _0x1a1d44);
      this["startShow"] = this["getChild"]("startBox", _0x12426c);
      this["startShow"]["visible"] = false;
      this['sayBox'] = this["getChild"]("sayBox", _0x12426c);

      for (let _0x3075ad = 0; _0x3075ad < 4; ++_0x3075ad) {
        this["sayArr"][_0x3075ad] = this["sayBox"]["getChildAt"](_0x3075ad);
        this["sayArr"][_0x3075ad]["visible"] = false;

        this["sayArr"][_0x3075ad]["addComponent"](_0x595cf9)["init"](this['sayArr'][_0x3075ad]);
      }

      Laya['timer']['frameLoop'](1, this, this['fingureLoop']);

      for (let _0x5c9886 = 0; _0x5c9886 < 3; ++_0x5c9886) {
        this["starArr"][_0x5c9886]["addComponent"](_0x398906)["init"](this["starArr"][_0x5c9886], _0x5c9886);
      }

      Laya["timer"]["frameLoop"](1, this, this['setMaskOffy']);
    }

    ["setMaskOffy"]() {
      this["maskOff"] += Laya['timer']["delta"] / 10;
      this["maskOff"] > 129 && (this['maskOff'] -= 129);

      for (let _0x5a7804 = 0; _0x5a7804 < 3; ++_0x5a7804) {
        this["maskArr"][_0x5a7804]['y'] = this["maskArrY"][_0x5a7804] - this['maskOff'];
        this["maskArr"][_0x5a7804]["mask"]['y'] = this["maskOff"];
      }
    }

    ["showSkinInfo"](_0x3201fd, _0x267f97) {
      let _0x4e4b5b, _0x56964d, _0x4e6533;

      for (let _0x5e7cf9 = 0; _0x5e7cf9 < _0x267f97["length"]; ++_0x5e7cf9) {
        _0x267f97[_0x5e7cf9] && (_0x5e7cf9 < 5 ? _0x4e4b5b = _0x5e7cf9 : _0x5e7cf9 < 10 ? _0x56964d = _0x5e7cf9 : _0x4e6533 = _0x5e7cf9);
      }

      0 == _0x3201fd[0] ? (this["maskArr"][0]["visible"] = false, this["skinArr"][0]["visible"] = true, this["tipImgArr"][0]["visible"] = true, this["starArr"][0]['visible'] = false, this["skinArr"][0]["skin"] = "ui/common/game/skin/skin1.png") : 1 == _0x3201fd[0] ? (this["maskArr"][0]['visible'] = false, this["skinArr"][0]['visible'] = false, this["tipImgArr"][0]["visible"] = false, this['starArr'][0]["visible"] = true, this["starArr"][0]["getChildAt"](0)["skin"] = "ui/common/game/skin/skin" + (_0x4e4b5b + 1) + ".png") : 2 == _0x3201fd[0] && (this["maskArr"][0]["visible"] = true, this["skinArr"][0]["visible"] = true, this["tipImgArr"][0]["visible"] = false, this["starArr"][0]["visible"] = false, this["skinArr"][0]["skin"] = "ui/common/game/skin/skin" + (_0x4e4b5b + 1) + ".png");
      0 == _0x3201fd[1] ? (this['maskArr'][1]["visible"] = false, this["skinArr"][1]["visible"] = true, this["tipImgArr"][1]['visible'] = true, this['starArr'][1]["visible"] = false, this["skinArr"][1]["skin"] = "ui/common/game/skin/skin6.png") : 1 == _0x3201fd[1] ? (this['maskArr'][1]["visible"] = false, this["skinArr"][1]["visible"] = false, this['tipImgArr'][1]["visible"] = false, this["starArr"][1]["visible"] = true, this["starArr"][1]["getChildAt"](0)["skin"] = "ui/common/game/skin/skin" + (_0x56964d + 1) + '.png') : 2 == _0x3201fd[1] && (this["maskArr"][1]["visible"] = true, this["skinArr"][1]['visible'] = true, this["tipImgArr"][1]['visible'] = false, this["starArr"][1]["visible"] = false, this["skinArr"][1]['skin'] = "ui/common/game/skin/skin" + (_0x56964d + 1) + ".png");
      0 == _0x3201fd[2] ? (this["maskArr"][2]['visible'] = false, this["skinArr"][2]["visible"] = true, this["tipImgArr"][2]['visible'] = true, this['starArr'][2]["visible"] = false, this['skinArr'][2]["skin"] = 'ui/common/game/skin/skin11.png') : 1 == _0x3201fd[2] ? (this['maskArr'][2]["visible"] = false, this["skinArr"][2]["visible"] = false, this["tipImgArr"][2]['visible'] = false, this["starArr"][2]["visible"] = true, this["starArr"][2]["getChildAt"](0)['skin'] = 'ui/common/game/skin/skin' + (_0x4e6533 + 1) + ".png") : 2 == _0x3201fd[2] && (this["maskArr"][2]["visible"] = true, this["skinArr"][2]["visible"] = true, this["tipImgArr"][2]["visible"] = false, this["starArr"][2]["visible"] = false, this["skinArr"][2]["skin"] = "ui/common/game/skin/skin" + (_0x4e6533 + 1) + '.png');
    }

    ["setHpValueUi"](_0x2e4122, _0x3a8cff) {
      if (_0x2e4122 > 0) {
        let _0x232d3d = true;
        _0x3a8cff['x'] > 0 && _0x3a8cff['x'] < 750 && _0x3a8cff['y'] > -Laya["Browser"]["clientHeight"] && _0x3a8cff['y'] < Laya["Browser"]["clientHeight"] && (_0x232d3d = false);
        _0x3a8cff['x'] < 40 ? _0x3a8cff['x'] = 40 : _0x3a8cff['x'] > 710 && (_0x3a8cff['x'] = 710);
        _0x3a8cff['y'] < 30 - Laya["Browser"]["clientHeight"] / 2 && (_0x3a8cff['y'] = 30 - Laya["Browser"]["clientHeight"] / 2);
        _0x3a8cff['y'] > Laya["Browser"]["clientHeight"] / 2 - 30 && (_0x3a8cff['y'] = Laya['Browser']["clientHeight"] / 2 - 30);

        let _0x351934 = _0x3a8cff['x'] - 375,
            _0x3c1312 = -_0x3a8cff['y'],
            _0x43f20b = Math["atan2"](_0x3c1312, _0x351934);

        _0x43f20b = 180 * _0x43f20b / Math['PI'];
        _0x43f20b -= 90;
      }
    }

    ["setGameBuyCoin"](_0x476ca2) {
      this["gameBuyValue"]['text'] = _0x476ca2 + '';
      this['coinAni'] || (this["coinRevert"](), this["coinAni"] = true);
    }

    ["coinRevert"]() {
      this["coinValue"] = 1;
      Laya["Tween"]['to'](this, {
        'coinValue': 1.2
      }, 100, Laya['Ease']['linearIn'], new Laya["Handler"](this, function () {
        this["coinRevert2"]();
      }))['update'] = new Laya["Handler"](this, function () {
        this["coinBgCH"]['scale'](this["coinValue"], this["coinValue"]);
      });
    }

    ['coinRevert2']() {
      this["coinValue"] = 1.2;
      Laya["Tween"]['to'](this, {
        'coinValue': 1
      }, 100, Laya["Ease"]['linearIn'], new Laya["Handler"](this, function () {
        this["coinAni"] = false;
      }))["update"] = new Laya['Handler'](this, function () {
        this['coinBgCH']['scale'](this["coinValue"], this["coinValue"]);
      });
    }

    ['showVictory']() {
      this["onOpenWinView"]();
    }

    ["setProValue"](_0x53a689) {
      this["proValue"]["scaleX"] = 1.1 * _0x53a689;
    }

    ["hidePanle"]() {
      this['hideVlaue'] = 0;
      this["tipPanel"]["visible"] = false;
    }

    ['showEndTip'](_0x308c0b, _0x94a635) {
      this["tipPanel"]['visible'] = true;
      this["tipPanel"]['alpha'] = 1;

      let _0x246d83 = this["getChild"]('tp1', this["tipPanel"]),
          _0x458bc4 = this['getChild']("tp2", this["tipPanel"]),
          _0x564fc6 = this["getChild"]("tp3", this["tipPanel"]);

      Laya["timer"]['clear'](this, this["hidePanle"]);
      this["tipIndex"] = _0x308c0b;
      1 == _0x308c0b ? (_0x246d83["visible"] = true, _0x458bc4["visible"] = false, _0x564fc6["visible"] = false) : 2 == _0x308c0b ? (_0x246d83["visible"] = false, _0x458bc4["visible"] = true, _0x564fc6["visible"] = false) : 3 == _0x308c0b && (_0x246d83["visible"] = false, _0x458bc4["visible"] = false, _0x564fc6["visible"] = true);
      Laya["timer"]['once'](_0x94a635, this, this['hidePanle']);
    }

    ["setGameCoin"]() {
      this["userCoin"]["text"] = _0x5adfe2["gameData"]["gameCoin"] + '';
    }

    ["setCoinAni"]() {
      this["getChild"]("topUI", this["owner"]);

      let _0x314b6d = new Laya['Vector2'](375, 917),
          _0x36ee8a = new Laya['Vector2'](375, 100);

      _0x5adfe2["utils"]['showGameCoinFly'](_0x314b6d, _0x36ee8a);
    }

    ["gameStartSet"]() {
      _0x5adfe2['gameMgr']["gameStart"]();

      _0x5adfe2["soundMgr"]["playBGM"]("bgm");
    }

    ['fingureLoop']() {
      this["moveValues"] += 0.04;

      let _0x1f130e = 156 * Math["sin"](this['moveValues']);

      this["getChild"]('slider', this["startShow"])['x'] = 375 + _0x1f130e;
    }

    ['initEvent']() {
      _0x5adfe2['glEvent']['on']("over_game_event", this, this['onGameOverEvent']);

      _0x5adfe2["glEvent"]['on']("init_game_event", this, this['onGameInitEvent']);

      _0x5adfe2["glEvent"]['on']("play_game_event", this, this["onGamePlayEvent"]);

      _0x5adfe2['gameMgr']["initGame"](true);

      Laya["stage"]['on'](zs["laya"]["platform"]["PlatformMgr"]['OPEN_WIN_VIEW'], this, this["onOpenWinView"]);
      Laya["stage"]['on'](zs['laya']['platform']['PlatformMgr']["OPEN_FAILED_VIEW"], this, this["onOpenFailedView"]);
    }

    ['onUpdate']() {
      for (let _0x4b5ab0 = 0; _0x4b5ab0 < 6; ++_0x4b5ab0) {
        if (this["addTipShow2"][_0x4b5ab0]) {
          let _0x5c9f64 = this["addTipArr2"][_0x4b5ab0];
          _0x5c9f64['y'] > this['addTipOffy'][_0x4b5ab0] ? _0x5c9f64['y'] -= 0.15 * Laya["timer"]['delta'] : (_0x5c9f64["visible"] = false, this["addTipShow2"][_0x4b5ab0] = false);
        }
      }

      let _0x44fef7 = this['getChild']("tp3", this["tipPanel"]);

      this["theta"] += Laya["timer"]["delta"] / 200;

      let _0x49da14 = 1.4 + 0.2 * Math['sin'](this["theta"]);

      _0x44fef7["scale"](_0x49da14, _0x49da14);

      this['movet'] += Laya["timer"]['delta'] / 1000;
      Math["abs"](this["movet"] - Math["floor"](this['movet']) - 0.5);
    }

    ['setPlayerSignPos']() {
      let _0xc402c = _0x5adfe2["gameMgr"]['playerLg']["showPlayer"]["transform"]["position"]['clone'](),
          _0x4c0275 = _0xc402c["clone"]();

      _0xc402c['y'] += 2.5;

      _0x5adfe2["gameMgr"]["camera"]["viewport"]['project'](_0xc402c, _0x5adfe2["gameMgr"]["camera"]['projectionViewMatrix'], _0x4c0275);
    }

    ["setTipShowArr"](_0x22b9c5) {
      this["addTipShow"][_0x22b9c5] = false;
    }

    ["getHitIndex"]() {
      for (let _0x255cfd = 0; _0x255cfd < 12; ++_0x255cfd) {
        if (!this["addTipShow"][_0x255cfd]) {
          this["addTipShow"][_0x255cfd] = true;
          return _0x255cfd;
        }
      }

      return -1;
    }

    ['showAddUi'](_0x4daecf, _0x3df461) {
      let _0x5b0799 = this["getHitIndex"]();

      if (_0x5b0799 > -1) {
        let _0x25e679 = this["addTipArr"][_0x5b0799],
            _0x171ee2 = _0x4daecf["clone"](),
            _0x5d0715 = this["owner"]["getChildByName"]("topUI")["getChildByName"]("img");

        _0x5adfe2["gameMgr"]["camera"]["viewport"]["project"](_0x4daecf, _0x5adfe2["gameMgr"]["camera"]['projectionViewMatrix'], _0x171ee2);

        let _0x171cb2 = new Laya["Vector2"](_0x171ee2['x'] / Laya["stage"]["clientScaleX"], _0x171ee2['y'] / Laya['stage']['clientScaleY'] - Laya['stage']["height"] / 2),
            _0x30c642 = new Laya["Vector2"](_0x5d0715['x'], _0x5d0715['y'] - Laya["stage"]["height"] / 2);

        _0x25e679["pos"](_0x171cb2['x'], _0x171cb2['y']);

        _0x25e679["getComponent"](_0x347e54)["setMove"](true, _0x171cb2, _0x30c642, _0x3df461);
      } else {
        _0x5adfe2["gameData"]["gameCoin"] += _0x3df461;
      }
    }

    ['showSayArr'](_0x3af241) {
      let _0x53b5aa = 0;

      if (_0x3af241) {
        _0x53b5aa = Math["floor"](3 * Math["random"]() + 1);

        for (let _0x53c427 = 0; _0x53c427 < 4; ++_0x53c427) {
          this["sayArr"][_0x53c427]['visible'] = _0x53c427 == _0x53b5aa;
        }
      } else {
        for (let _0x5afc4c = 0; _0x5afc4c < 4; ++_0x5afc4c) {
          this["sayArr"][_0x5afc4c]["visible"] = false;
        }

        this["sayArr"][0]["visible"] = true;
      }

      this['sayArr'][_0x53b5aa]['getComponent'](_0x595cf9)["scaleAni6"]();
    }

    ["getHitIndex2"]() {
      for (let _0x59ed83 = 0; _0x59ed83 < 6; ++_0x59ed83) {
        if (!this["addTipShow2"][_0x59ed83]) {
          this["addTipShow2"][_0x59ed83] = true;
          return _0x59ed83;
        }
      }

      return -1;
    }

    ["showAddUi2"](_0x5589a1, _0x1dc6b7) {
      let _0x5602bc = this["getHitIndex2"]();

      if (_0x5602bc > -1) {
        let _0x9439c7 = this['addTipArr2'][_0x5602bc],
            _0x133074 = _0x5589a1['clone']();

        _0x133074['y'] += 0.5;

        _0x5adfe2["gameMgr"]["camera"]["viewport"]["project"](_0x5589a1, _0x5adfe2["gameMgr"]["camera"]["projectionViewMatrix"], _0x133074);

        _0x9439c7["pos"]((_0x133074['x'] - 10) / Laya["stage"]["clientScaleX"], _0x133074['y'] / Laya['stage']['clientScaleY'] - Laya["stage"]["height"] / 2);

        this['addTipOffy'][_0x5602bc] = _0x133074['y'] / Laya['stage']['clientScaleY'] - 120 - Laya["stage"]["height"] / 2;
        _0x9439c7["visible"] = true;
        _0x9439c7["alpha"] = 1;
        _0x9439c7["text"] = '+' + _0x1dc6b7;
      }
    }

    ['updateScore']() {}

    ["onClosed"]() {
      for (let _0x28e500 = 0; _0x28e500 < 3; ++_0x28e500) {
        this["maskArr"][_0x28e500]['destroy']();

        this["maskArr"][_0x28e500] = null;
      }

      Laya["timer"]['clearAll'](this);

      _0x5adfe2["glEvent"]["offAllCaller"](this);
    }

    ["onGameOverEvent"](_0x1e07e2) {
      _0x1e07e2 && _0x1e07e2["isVictory"] ? (_0x5adfe2['gameMgr']['setGameOver'](), _0x5adfe2['gameData']['isStart'] = false, this["showVictory"]()) : this["revivalFail"]();
    }

    ["revivalSet"]() {}

    ["revival"]() {
      _0x5adfe2["gameMgr"]['isOver'] = false;
    }

    ["revivalFail"]() {
      _0x5adfe2['soundMgr']['stop']("4fire");

      _0x5adfe2["gameMgr"]["setGameOver"]();

      this['onOpenFailedView']();
    }

    ["onOpenWinView"]() {
      this['owner']['close']();
      this["onClosed"]();
      Laya["Scene"]["open"]('views/success.scene', false, Laya["Handler"]["create"](this, () => {}));
    }

    ["onOpenFailedView"]() {
      this["owner"]["close"]();
      this["onClosed"]();
      Laya['Scene']["open"]("views/fail.scene", false, Laya['Handler']['create'](this, () => {}));
    }

    ["onGameInitEvent"]() {}

    ['onGamePlayEvent']() {
      this["getChild"]("topUI", this["owner"])['visible'] = true;
      _0x5adfe2["gameData"]["gameCoin"] = 0;

      _0x5adfe2["gameMgr"]["cameraLg"]['startMove']();

      Laya['timer']["once"](2000, this, function () {
        this['startShow']["visible"] = true;
      });
      Laya["timer"]['once'](5000, this, function () {
        this["hideStartShow"]();
      });
      Laya["timer"]["once"](3000, this, this["gameStartSet"]);
    }

    ["hideStartShow"]() {
      this["hideStart"] = 0;
      Laya["Tween"]['to'](this, {
        'hideStart': 1
      }, 500, Laya["Ease"]['linearIn'], new Laya["Handler"](this, function () {
        this['startShow']['visible'] = false;
      }))['update'] = new Laya["Handler"](this, function () {
        this["startShow"]["alpha"] = 1 - this["hideStart"];
      });
    }

    ["onBackEvent"]() {
      this["owner"]["close"]();

      _0x5adfe2["gameMgr"]["over"]();

      _0x5adfe2["gameMgr"]["initGame"](true);

      Laya["Scene"]["open"]("views/home.scene", false, Laya['Handler']["create"](this, () => {}));
    }

    ["checkOpenKnockEgg"](_0x507980) {
      zs["laya"]["platform"]["ADConfig"]['isPublicVersion']() && zs["laya"]["platform"]["ADConfig"]["zs_switch"] && zs['laya']['platform']["ADConfig"]['isOpenEgg'](null, 2) ? (zs["laya"]['platform']["ADConfig"]['zs_ready_click_video_num'] && setTimeout(() => {
        platform["getInstance"]()["showReward"](null, null, null);
      }, 1000), Laya["Scene"]["open"]("view/ad/KnockEggEnd.scene", false, null, Laya["Handler"]["create"](this, function (_0x38b69c) {
        _0x38b69c["addComponent"](zs["laya"]["platform"]["KnockEggView"]);

        Laya["stage"]['once'](zs["laya"]["platform"]["PlatformMgr"]['EGG_GET_AWARD'], this, function () {
          _0x507980 && _0x507980();
        });
      }))) : _0x507980 && _0x507980();
    }

  }

  class _0x60b9f4 extends _0x3c5cf3 {
    constructor() {
      super(...arguments);
      this['soundSkin'] = "ui/common/btn_sound_";
      this["vibrateSkin"] = "ui/common/btn_vibrate_";
      this['addTipArr2'] = [];
      this["addTipShow2"] = [];
      this["addTipOffy"] = [];
      this['upTipY1'] = 0;
      this["upTipY2"] = 0;
      this['moveValues'] = 0;
      this["arr"] = [5, -6, -13, 3, -5, 2, -8, 3];
      this['redCount'] = 0;
      this['redOffy'] = 0;
      this["moveValue"] = 0;
      this["isOther"] = false;
      this["bodyArrIndex"] = [];
    }

    ['onAwake']() {
      super["onAwake"]();
    }

    ["initUI"]() {
      let _0x5912ed = this["getChild"]("topUI", this["owner"]),
          _0xa84e80 = this["getChild"]('middleUI', this["owner"]);

      this["btnSound"] = this["getChild"]("btnSound", _0xa84e80);
      this["setSound"](_0x5adfe2["storageMgr"]["isPlaySound"]());
      this["btnVibrate"] = this["getChild"]("btnVibrate", _0xa84e80);
      this['setVibrate'](_0x5adfe2["storageMgr"]["isPlayVibrate"]());
      this["light"] = this["getChild"]("light", _0xa84e80);
      this["btnRegister"] = this["getChild"]("btnSign", _0xa84e80);
      this["redTip"] = this["btnRegister"]['getChildAt'](0);
      this["redOffy"] = this["redTip"]['y'];
      this["btnDisk"] = this["getChild"]("luckyBtn", _0xa84e80);
      this['coinValue'] = _0x5912ed['getChildByName']("coinBg")["getChildByName"]("value");

      let _0x449db4 = _0x5adfe2['storageMgr']["getHomeHitLevel"]();

      this["upLevelBtn"] = this["getChild"]('upLevelBtn', _0xa84e80);
      this["upLevelBtn2"] = this["getChild"]('upLevelBtn2', _0xa84e80);
      this["upLevelBtn2"]["visible"] = false;
      this["upLevelCoin"] = this["getChild"]('value', this["upLevelBtn"]);
      this["upLevelCoin"]['text'] = 300 + 200 * _0x449db4 + '';
      this["upLevelTxt"] = this['getChild']("txt", this["upLevelBtn"]);
      this['upLevelTxt']["text"] = "level: " + _0x449db4;
      this["btnPlay"] = this["getChild"]("btnPlay", _0xa84e80);
      this['btnPlay2'] = this['getChild']('btnPlay2', _0xa84e80);
      this["upTip1"] = this["getChild"]("img1", this["upLevelBtn"]);
      this["upTip2"] = this["getChild"]('fingure', this["upLevelBtn"]);
      this["upTipY1"] = this["upTip1"]['y'];
      this["upTipY2"] = this["upTip2"]['y'];

      let _0xb86599 = this["getChild"]("LevelBg", _0x5912ed);

      if (_0x5adfe2["commonData"]['newLevel'] != 1 && window["isWin"]) {
        _0x5adfe2['commonData']["newLevel"]--;
      }

      this['getChild']("level", _0xb86599)["text"] = "Level " + _0x5adfe2['commonData']["newLevel"] + '';
      this['addTipBox2'] = this["getChild"]('addTip', _0xa84e80);
      this["addTipShow2"]["length"] = 6;
      this["addTipArr2"]["length"] = 6;
      this["addTipOffy"]['length'] = 6;

      for (let _0x187c42 = 0; _0x187c42 < 6; ++_0x187c42) {
        this["addTipShow2"][_0x187c42] = false;
        this["addTipOffy"][_0x187c42] = 0;

        let _0x5acde3 = this['addTipBox2']["getChildAt"](_0x187c42);

        _0x5acde3["visible"] = false;
        this['addTipArr2'][_0x187c42] = _0x5acde3;
      }

      this["fingure"] = this['getChild']("fingure", _0xa84e80);
      Laya["timer"]["frameLoop"](1, this, this["fingureLoop"]);
      this["updateScore"]();
      this["skinShopBtn"] = this["getChild"]("skinBtn", _0xa84e80);
      this["setUpVideo"]();
      this["setBtnSound"]();
     // window['box_adTwo']["visible"] = true;
    }

    ["setBtnSound"]() {
      !window["WebAudioEngine"]["pause"] ? this["btnSound"]["skin"] = this["soundSkin"] + "on.png" : this['btnSound']['skin'] = this["soundSkin"] + 'off.png';
    }

    ["fingureLoop"]() {
      this["moveValues"] += 0.04;

      let _0x12d5c4 = 156 * Math['sin'](this["moveValues"]);

      this['fingure']['x'] = 353 + _0x12d5c4;
      this['upTip1']['y'] = this["upTipY1"] + 15 * Math["sin"](this["moveValues"]);
      this["upTip2"]['y'] = this["upTipY2"] + 15 * Math["sin"](this["moveValues"]);
      this["light"]["rotation"] = 20 * this['moveValues'];
      this['setRedTipShow']();
    }

    ['setRedTipShow']() {
      this['redCount']++;

      let _0x4f0d96 = Math["floor"](this["redCount"] / 4),
          _0x1c59de = 1 + 0.01 * this["arr"][_0x4f0d96 % this["arr"]["length"]];

      this["redTip"]["scale"](_0x1c59de, _0x1c59de);
      this["redTip"]['y'] = this["redOffy"] + 0.2 * this['arr'][_0x4f0d96 % this["arr"]["length"]];
    }

    ["initEvent"]() {
      _0x5adfe2["utils"]["addClickEvent"](this['btnVibrate'], this, this["onVibrateClick"]);

      _0x5adfe2['utils']["addClickEvent"](this["btnSound"], this, this['onSoundClick']);

      _0x5adfe2["utils"]["addClickEvent"](this["btnRegister"], this, this["onRegisterClick"]);

      _0x5adfe2["utils"]["addClickEvent"](this["btnDisk"], this, this["onDiskClick"]);

      _0x5adfe2["utils"]["addClickEvent"](this["upLevelBtn"], this, this['onUpLevelClick']);

      _0x5adfe2["utils"]['addClickEvent'](this["upLevelBtn2"], this, this["onUpVideoBtnClick"]);

      _0x5adfe2['utils']["addClickEvent"](this["skinShopBtn"], this, this["onSkinShopClick"]);

      this['btnPlay']['on'](Laya['Event']['MOUSE_DOWN'], this, this["onPlayGameClick"]);
      this["btnPlay2"]['on'](Laya['Event']['MOUSE_DOWN'], this, this['onPlayGameClick']);

      _0x5adfe2["glEvent"]['on']("update_coin", this, this["updateScore"]);
    }

    ['onUpLevelClick']() {
      let _0x2c41f3 = _0x5adfe2["storageMgr"]["getHomeHitLevel"](),
          _0x112fcf = 300 + 200 * _0x2c41f3;

      _0x5adfe2['commonData']['userCoin'] >= _0x112fcf ? (_0x2c41f3++, this["upLevelTxt"]["text"] = "level: " + _0x2c41f3, _0x5adfe2['commonData']["userCoin"] -= _0x112fcf, this['updateScore'](), _0x5adfe2['storageMgr']["setHomeHitLevel"](_0x2c41f3), this['upLevelCoin']["text"] = 300 + 200 * _0x2c41f3 + '', this["showAddUi2"](), this['setUpVideo']()) : _0x5adfe2["uiMgr"]["showToast"]("Not enough gold coins！", 2000);
    }

    ["onUpVideoBtnClick"]() {
      let _0x9342a = _0x5adfe2["storageMgr"]["getHomeHitLevel"]();

      _0x9342a++;
      this["upLevelTxt"]["text"] = "level: " + _0x9342a;
      this['updateScore']();

      _0x5adfe2["storageMgr"]["setHomeHitLevel"](_0x9342a);

      this["upLevelCoin"]["text"] = 300 + 200 * _0x9342a + '';
      this["showAddUi2"]();
      new Laya["Vector3"](0, 1.6, 0);
    }

    ["setUpVideo"]() {
      let _0x3acaaf = zs['laya']['platform']["ADConfig"];

      if (_0x3acaaf['zs_switch'] && _0x3acaaf['isPublicVersion']() && _0x3acaaf['zs_game_video_money']) {
        let _0x40e2d7 = 300 + 200 * _0x5adfe2["storageMgr"]['getHomeHitLevel']();

        _0x5adfe2["commonData"]["userCoin"] < _0x40e2d7 && (this["upLevelBtn2"]["visible"] = true, this['getChild']('goldBg', this["upLevelBtn"])["visible"] = false);
      }
    }

    ['onRegisterClick']() {
      Laya['Scene']['open']("views/register.scene", false);
    }

    ['onDiskClick']() {
      Laya["Scene"]['open']("views/disk.scene", false);
    }

    ["onClosed"]() {
      _0x5adfe2["glEvent"]["off"]("update_coin", this, this["updateScore"]);
    }

    ["setSound"](_0xf493d4) {
      let _0x3a9ff7 = _0xf493d4 ? "on.png" : "off.png";

      this["btnSound"]["skin"] = this['soundSkin'] + _0x3a9ff7;
      Laya['SoundManager']["muted"] = !_0xf493d4;

      _0x5adfe2["storageMgr"]["setPlaySound"](_0xf493d4);
    }

    ["setVibrate"](_0x4fec99) {
      let _0x5cc6b4 = _0x4fec99 ? 'on.png' : "off.png";

      this['btnVibrate']['skin'] = this["vibrateSkin"] + _0x5cc6b4;

      _0x5adfe2["storageMgr"]["setPlayVibrate"](_0x4fec99);
    }

    ["onSoundClick"]() {
      window['WebAudioEngine']["pause"] = !window["WebAudioEngine"]["pause"];
      this["setBtnSound"]();
    }

    ["onVibrateClick"]() {
      this["setVibrate"](!_0x5adfe2["storageMgr"]["isPlayVibrate"]());
    }

    ['onPlayGameClick']() {
      if (this["isOther"]) {
        return;
      }

      this["isOther"] = true;
      zs["laya"]['tdapp']["tdAppSdk"]["event"](new zs["laya"]['tdapp']["gameStartEvt"](_0x5adfe2["commonData"]["userId"]));
      let _0x544553 = zs["laya"]["platform"]["ADConfig"];

      if (_0x5adfe2['commonData']["newLevel"] > 1 && 1 == _0x544553['zs_skin_push_switch']) {
        let _0x296855 = () => {
          Laya["Scene"]["open"]("views/freeSkin.scene", false, Laya["Handler"]["create"](this, _0x2ae1e2 => {
            this["owner"]['close']();
          }));
        };

        _0x544553['zs_switch'] && _0x544553["isPublicVersion"]() && _0x544553['zs_start_game_video_switch'] ? this['onStartToVideo'](_0x296855) : this['onCheckAd'](_0x296855);
      } else {
        let _0x15613d = () => {
          Laya["Scene"]["open"]("views/ggame.scene", false, Laya["Handler"]["create"](this, _0x2c904f => {
            this['owner']['close']();

            _0x5adfe2["glEvent"]['event']("init_game_event", {
              'isPlay': true
            });

            _0x5adfe2["glEvent"]["event"]("play_game_event");
          }));
        };

        _0x544553["zs_switch"] && _0x544553["isPublicVersion"]() && _0x544553['zs_start_game_video_switch'] ? this["onStartToVideo"](_0x15613d) : this["onCheckAd"](_0x15613d);
      }

      // platform['getInstance']()["showInterstitial"](() => {
       

      //   //window["box_adTwo"]["visible"] = false;
      // });
    }

    ["onUpdate"]() {
      for (let _0x269642 = 0; _0x269642 < 6; ++_0x269642) {
        if (this["addTipShow2"][_0x269642]) {
          let _0x635477 = this["addTipArr2"][_0x269642];
          _0x635477['y'] > this["addTipOffy"][_0x269642] ? _0x635477['y'] -= 0.15 * Laya['timer']["delta"] : (_0x635477["visible"] = false, this["addTipShow2"][_0x269642] = false);
        }
      }
    }

    ['getHitIndex2']() {
      for (let _0x3969f6 = 0; _0x3969f6 < 6; ++_0x3969f6) {
        if (!this["addTipShow2"][_0x3969f6]) {
          this["addTipShow2"][_0x3969f6] = true;
          return _0x3969f6;
        }
      }

      return -1;
    }

    ["showAddUi2"]() {
      let _0x4b0b7e = this["getHitIndex2"]();

      if (_0x4b0b7e > -1) {
        let _0x2d1159 = this["addTipArr2"][_0x4b0b7e];

        _0x2d1159["pos"](Laya['stage']["width"] / 2, 300);

        this["addTipOffy"][_0x4b0b7e] = 100;
        _0x2d1159['visible'] = true;
      }
    }

    ["onStartToVideo"](_0x1adb60) {
      platform["getInstance"]()["showReward"](Laya["Handler"]["create"](this, () => {
        this['onCheckAd'](_0x1adb60);
      }));
    }

    ["onCheckAd"](_0x3b0df4) {
      var _0x5d2f92 = this;

      zs["laya"]['platform']['ADConfig']["isPublicVersion"]() && zs["laya"]["platform"]["ADConfig"]['zs_switch'] && zs["laya"]["platform"]["ADConfig"]["isOpenEgg"](null, 1) ? (Laya["stage"]["once"](zs['laya']["platform"]["PlatformMgr"]['EGG_GET_AWARD'], _0x5d2f92, () => {
        _0x5d2f92["setInitArr"]();

        _0x5adfe2['gameMgr']["playerLg"]["changeSkin"](_0x5d2f92["bodyArrIndex"]);

        _0x3b0df4();

        _0x5d2f92['showCustom']();
      }), zs["laya"]["platform"]['ADConfig']["zs_click_award_video_switch"] && setTimeout(() => {
        platform["getInstance"]()["showReward"](null, null, null);
      }, 1000), zs["laya"]['platform']['PlatformMgr']['showKnockEggView'](null)) : (_0x3b0df4(), this["showCustom"]());
    }

    ['showCustom']() {
      zs["laya"]["platform"]["ADConfig"]["zs_native_banner_plaid"] && zs['laya']["sdk"]['SdkService']["checkCustomAd"](null, null, null, 50, 3, 'h', 5, 0.9, 0, null);
      zs["laya"]["sdk"]["SdkService"]["checkCustomAd"](30, null, 550, null, 2, 'h', 1, 0.6, null, null);
      zs["laya"]['sdk']['SdkService']["checkCustomAd"](null, 30, 550, null, 1, 'h', 1, 0.6, null, null);
    }

    ["onRankClick"]() {
      Laya["Scene"]["open"]("views/rank.scene", false, Laya["Handler"]["create"](this, _0x46b16d => {
        this["owner"]["close"]();
      }));
    }

    ["onSkinShopClick"]() {
      this['isOther'] || (this['isOther'] = true, Laya["Scene"]["open"]("views/skinShop.scene", false, Laya["Handler"]['create'](this, _0x337484 => {
        this['owner']["close"]();
      })));
    }

    ["updateScore"]() {
      this["coinValue"]['text'] = _0x5adfe2["commonData"]['userCoin'] + '';

      _0x5adfe2['storageMgr']["setAwardGold"](_0x5adfe2['commonData']['userCoin']);
    }

    ["setInitArr"]() {
      let _0x131819 = Math['floor'](4 * Math["random"]()) + 1,
          _0x49db2f = Math["floor"](4 * Math["random"]()) + 6,
          _0x20cecf = Math["floor"](4 * Math["random"]()) + 11;

      for (let _0x42840b = 0; _0x42840b < 15; ++_0x42840b) {
        this["bodyArrIndex"][_0x42840b] = _0x42840b == _0x131819 || _0x42840b == _0x49db2f || _0x42840b == _0x20cecf;
      }
    }

  }

  class _0x55826d extends _0x3c5cf3 {
    constructor() {
      super(...arguments);
      this["_loadCount"] = 3;
      this["_loadNum"] = 0;
      this["_isLoadFinish"] = false;
      this["length"] = 492;
      this["loadPres"] = 0;
     
    }

    ["onAwake"]() {
      super["onAwake"]();
      //Laya.stage.scaleMode='fixedheight';
    }

    ["onEnable"]() {
      platform["getInstance"]()["yadstartup"]("Love-Shopping-Rush", () => {
        window['WebAudioEngine']["pause"] = Laya["LocalStorage"]["getItem"]("Love-Shopping-Rush-musicState") ? JSON['parse'](Laya["LocalStorage"]["getItem"]("Love-Shopping-Rush-musicState")) : false;
        //window['yad']["scale"](0.8, 0.8);
        //window['yad']["right"] = 0;
       // Laya["stage"]["addChild"](window["scrollList"]);
      //  Laya['stage']["addChild"](window["box_adTwo"]);
        // window["box_adTwo"]["scaleX"] = 1.4;
        // window["box_adTwo"]["scaleY"] = 1.4;
        // window["box_adTwo"]["bottom"] = 300;
        // window["box_adTwo"]['setSpaceX'](200);
      //  window["scrollList"]["scaleX"] = 1.5;
       // window["scrollList"]["scaleY"] = 1.5;
       // window["scrollList"]["bottom"] = 20;
       // window["scrollList"]["visible"] = false;
       // window["box_adTwo"]["visible"] = false;
        // window['yad']["scale"](1.2, 1.2);
        // window["yad"]["right"] = 1;
       // window["box_adTwo"]["setAlpha"] && window["box_adTwo"]["setAlpha"]();
        zs["laya"]["sdk"]["SdkService"]["initSDK"]();
        zs["laya"]["sdk"]["DeviceService"]["initDevice"]();

        _0x5adfe2["rankMgr"]["init"]();

        _0x5adfe2["resourceMgr"]["init"](_0x5adfe2['glEvent']);

        _0x5adfe2["configMgr"]['init'](_0x5adfe2["glEvent"]);

        _0x5adfe2["wxMgr"]["init"]();

        zs["laya"]["tdapp"]["tdAppSdk"]["event"](new zs["laya"]['tdapp']['startupEvt']());
        this["setPlayerName"]();
        Laya["Browser"]["onWeiXin"] && (this["_loadCount"] = 3);
        this["initLoaclalData"]();
        zs["laya"]['WebService']['UseWebApi'] = true;
        zs["laya"]['WebService']["RequestSign"] = 'jjbxd_api_secret';
        zs["laya"]['WebService']["WebApiMap"] = {
          'login': '',
          'gameCfg': '',
          'updateInfo': '',
          'logVideo': ''
        };
      });
    }

    ["setPlayerName"]() {
      _0x5adfe2["commonData"]["playerNameStrArr"] = _0x5adfe2["commonData"]["playerNameStr1"]['split'](',');
    }

    ["onPlatformCfgReady"]() {
      var _0x21c4ba = Laya['loader']['getRes']("jsonConfig/platformCfg.json");

      zs["laya"]["platform"]["PlatformMgr"]["initCFG"](_0x21c4ba);
      zs["laya"]["platform"]["PlatformMgr"]["initSoundUrl"](null, null);
      zs["laya"]['sdk']['ZSReportSdk']['loadConfig'](function (_0x5e4385) {
        zs["laya"]["platform"]["ADConfig"]["initAdSetting"](_0x21c4ba["publishVer"], _0x5e4385);
        zs["laya"]["platform"]["PlatformMgr"]["initGameAd"]();
        Laya['stage']["event"](zs["laya"]["platform"]['PlatformMgr']['AD_CONFIIG_LOADED']);
      }, function (_0x4d6818) {
        console["error"](_0x4d6818);
        zs["laya"]['platform']["ADConfig"]["initAdSetting"](_0x21c4ba['publishVer'], _0x21c4ba['adCfg']);
        zs["laya"]["platform"]["PlatformMgr"]["initGameAd"]();
      });
    }

    ["login"]() {
      zs['laya']["WebService"]["requestBaseCfg"](null);

      var _0x9dbf3a = Laya["LocalStorage"]["getItem"](zs["laya"]['WebService']['RequestSign']);

      if (_0x9dbf3a) {
        var _0x161d5b = JSON["parse"](_0x9dbf3a);

        if (_0x161d5b && _0x161d5b['lastLoginDate'] && zs["laya"]["MiscUtils"]["isToday"](_0x161d5b["lastLoginDate"])) {
          zs["laya"]['WebService']["RequestHeader"] = {
            't': _0x161d5b['t'],
            'timestamp': _0x161d5b["timestamp"]
          };
          console["log"]("1---------------登录：" + _0x161d5b["playerInfo"]["user_id"]);
          return void zs['laya']["WebService"]['requestLoginByUserId'](_0x161d5b["playerInfo"]['user_id']);
        }
      }

      zs['laya']["sdk"]["SdkService"]['login'](Laya['Handler']["create"](this, function (_0x210ad9) {
        _0x210ad9 && (console['log']("------------: ", _0x210ad9), this["loginData"] = _0x210ad9, zs["laya"]["WebService"]['requestLoginByCode'](this["loginData"]['identityId']));
      }), Laya["Handler"]["create"](this, function (_0x421ef0) {
        console['error']("login platform error:" + _0x421ef0);
        1 == _0x421ef0['code'] && (console["log"]("2---------------登录：1"), zs["laya"]["WebService"]["requestLoginByUserId"](1));
      }));
    }

    ['onNetXHRResponse'](_0x255577, _0x201883, _0x164891, _0xac93dd) {
      switch (console['log'](_0x201883 + " : response:", _0xac93dd), _0x201883) {
        case zs['laya']["WebService"]["WebApiMap"]['login']:
          var _0x21e44f = _0xac93dd['data'];
          _0x5adfe2["storageMgr"]["userInfo"]["user_id"] = _0x21e44f["user_id"];
          _0x5adfe2['commonData']["userId"] = _0x21e44f["user_id"];
          _0x5adfe2["commonData"]['userCoin'] = _0x21e44f["gold"];
          _0x5adfe2['commonData']["newLevel"] = _0x21e44f["level_id"];
          zs["laya"]["tdapp"]["tdAppSdk"]["event"](new zs['laya']["tdapp"]['loginEvt'](_0x21e44f['user_id']));
          _0x21e44f['user_id'] && zs["laya"]['platform']["PlatformMgr"]['setUserID'](_0x21e44f['user_id']);
          _0x21e44f['t'] && _0x21e44f["timestamp"] && (zs["laya"]["WebService"]['RequestHeader'] = {
            't': _0x21e44f['t'],
            'timestamp': _0x21e44f["timestamp"]
          });
          _0x21e44f["user_id"] && zs['laya']["sdk"]["ZSReportSdk"]["init"](_0x21e44f["user_id"], Laya["Browser"]["onAndroid"] ? 1 : 0);
          break;

        case zs['laya']["WebService"]["WebApiMap"]["gameCfg"]:
          console["log"]('获取游戏后台配置成功!');
          break;

        case zs["laya"]['WebService']["WebApiMap"]["logVideo"]:
          zs["laya"]["sdk"]["ZSReportSdk"]["sendVideoLog"]();
          break;

        case zs['laya']["WebService"]["WebApiMap"]["updateInfo"]:
          console["log"]("update player info success!");
      }
    }

    ["initLoaclalData"]() {
      let _0x170660 = _0x5adfe2["storageMgr"]["gameStatus"];
      _0x5adfe2["commonData"]["userCoin"] = _0x170660["awardGold"];
      _0x5adfe2['commonData']["skinId"] = _0x170660["skinId"];
      _0x5adfe2['commonData']['newLevel'] = _0x170660["level"];
    }

    ['initUI']() {
      let _0xdced44 = this["owner"]["getChildByName"]('middleUI');

      this["lblPres"] = _0xdced44["getChildByName"]('lblPres');
      this['barPres'] = _0xdced44["getChildByName"]('progress');
      this['logoName'] = _0xdced44["getChildByName"]("name");
      window["logoName"] = this["logoName"];
      this['logoName']['y'] = 100;
      Laya["timer"]["loop"](200, this, this["loopLoading"]);
    }

    ["loopLoading"]() {
      this["loadPres"] = this["loadPres"] + 0.03 * Math["random"]();
      this["loadPres"] > 1 && (this["loadPres"] = 1);
      this["onLoading"](0);
    }

    ["initEvent"]() {
      _0x5adfe2['glEvent']['on']("load_finish_event", this, this['onLoadFinish']);

      _0x5adfe2['glEvent']['on']("load_pass_event", this, this['onLoading']);
    }

    ['onLoadFinish'](_0x435b2e) {
      this["_loadNum"]++;
      this["onLoading"](0);
      this["_loadNum"] >= this["_loadCount"] && (this["barPres"]["width"] = this['length'], this["lblPres"]["text"] = "100%", this["loadFinished"] = true, this["loadGameScene"]());
    }

    ["onLoading"](_0x57bda9) {
      _0x57bda9 < this["loadPres"] ? _0x57bda9 = this['loadPres'] : this["loadPres"] = _0x57bda9;

      let _0x10ab6e = (this["_loadNum"] + _0x57bda9) / this["_loadCount"];

      _0x10ab6e > 1 && (_0x10ab6e = 1);

      let _0xca4f80 = Math["floor"](100 * _0x10ab6e);

      this['barPres']["width"] = _0x10ab6e * this["length"];
      this["lblPres"]["text"] = _0xca4f80 + '%';
    }

    ["loadGameScene"]() {
      this["openGameScene"]();
    }

    ["openGameScene"]() {
      let _0x58fea5 = this;

      zs["laya"]['platform']['PlatformMgr']["enterGamePopup"](Laya["Handler"]["create"](this, () => {
        Laya["Scene"]["open"]('views/home.scene', false, Laya['Handler']["create"](this, _0x32e6c0 => {
          Laya["timer"]['clear'](this, this['loopLoading']);
          _0x58fea5["owner"]['getChildByName']("middleUI")['visible'] = false;
        }));
      }));
    }

  }

  class _0x11f9d9 extends Laya["Script"] {
    ['onAwake']() {
      super["onAwake"]();
      this["initUI"]();
      this["initEvent"]();
    }

    ["initUI"]() {
      let _0x520169 = this['owner']['getChildByName']("middleUI");

      this['friendPanel'] = _0x520169['getChildByName']('friend');
      this['friendList'] = this['friendPanel']["getChildByName"]("list");
      this["touchArea"] = this["friendPanel"]['getChildByName']("touchArea");
      this['touchArea']["alpha"] = 0;
    }

    ['initEvent']() {
      let _0x5f132c = 0,
          _0x28e83e = 0,
          _0x4d6226 = 0,
          _0x3b493f = 0;
      this['touchArea']['on'](Laya["Event"]["MOUSE_DOWN"], this, function (_0x5bfc7) {
        _0x5bfc7['stopPropagation']();

        _0x4d6226 = 0;
        _0x28e83e = _0x5bfc7["nativeEvent"]["timeStamp"];
        _0x5f132c = _0x5bfc7["nativeEvent"]["changedTouches"][0]["clientY"];

        _0x5adfe2["rankMgr"]["onFrientMouseEvent"]({
          'cmd': 'touch_start'
        });
      });
      this["touchArea"]['on'](Laya['Event']["MOUSE_MOVE"], this, function (_0x2fb871) {
        _0x2fb871["stopPropagation"]();

        _0x4d6226 = _0x2fb871["nativeEvent"]["changedTouches"][0]["clientY"] - _0x5f132c;

        _0x5adfe2['rankMgr']['onFrientMouseEvent']({
          'cmd': "touch_move",
          'deltaY': _0x4d6226 * Laya["Browser"]["pixelRatio"]
        });
      });
      this["touchArea"]['on'](Laya['Event']["MOUSE_UP"], this, function (_0x13a710) {
        _0x13a710["stopPropagation"]();

        _0x3b493f = _0x4d6226 / (_0x13a710["nativeEvent"]['timeStamp'] - _0x28e83e);

        _0x5adfe2['rankMgr']["onFrientMouseEvent"]({
          'cmd': "touch_end",
          'speed': _0x3b493f
        });
      });
      this["touchArea"]['on'](Laya["Event"]['MOUSE_OUT'], this, function (_0x15f87a) {
        _0x15f87a["stopPropagation"]();

        _0x3b493f = _0x4d6226 / (_0x15f87a["nativeEvent"]["timeStamp"] - _0x28e83e);

        _0x5adfe2["rankMgr"]['onFrientMouseEvent']({
          'cmd': "touch_cancel",
          'speed': _0x3b493f
        });
      });
    }

    ['onDisable']() {
      this['touchArea']["offAllCaller"](this);

      _0x5adfe2["rankMgr"]["showFriendRank"](false);
    }

    ["show"]() {
      this['friendPanel']["visible"] = true;

      _0x5adfe2["rankMgr"]['resetSize'](this["friendList"]["width"], this["friendList"]["height"]);

      _0x5adfe2["rankMgr"]['showFriendRank'](true);
    }

    ["hide"]() {
      this['friendPanel']["visible"] = false;

      _0x5adfe2['rankMgr']["showFriendRank"](false);
    }

    ["getChild"](_0x424ae4) {
      this["findChild"](this["owner"], _0x424ae4);
    }

    ['findChild'](_0xeb308d, _0x3640c0) {
      if (null != _0xeb308d) {
        let _0x2f1d91 = _0x3640c0["split"]('/'),
            _0x3e1b57 = _0xeb308d;

        for (let _0x3b4dbf = 0; _0x3b4dbf < _0x2f1d91["length"]; _0x3b4dbf++) {
          if (!(_0x3e1b57 = _0x3e1b57['getChildByName'](_0x2f1d91[_0x3b4dbf]))) {
            return null;
          }
        }

        return _0x3e1b57;
      }

      return null;
    }

  }

  class _0x5b458b extends Laya["Script"] {
    ["onAwake"]() {
      super["onAwake"]();
      this["initData"]();
      this['initUI']();
    }

    ['initData']() {}

    ["initUI"]() {
      let _0x328de8 = this["owner"]["getChildByName"]('middleUI');

      this["worldPanel"] = _0x328de8['getChildByName']("world");
    }

    ["show"]() {
      this['worldPanel']["visible"] = true;
      console["error"]('未实现世界排行榜');
    }

    ['hide']() {
      this['worldPanel']["visible"] = false;
    }

    ["getChild"](_0x42854c) {}

  }

  class _0x3d31e7 extends _0x3c5cf3 {
    ["onAwake"]() {
      super["onAwake"]();
      this["initData"]();
      this["initUI"]();
    }

    ["onStart"]() {
      this["initEvent"]();
      this["onRankClick"](0);
    }

    ["initData"]() {
      this["rankFriend"] = this["owner"]["getComponent"](_0x11f9d9);
      this["rankWorld"] = this["owner"]["getComponent"](_0x5b458b);
    }

    ['initUI']() {
      let _0x1d2eb3 = this["getChild"]("topUI", this["owner"]);

      this["btnBack"] = this["getChild"]("btnBack", _0x1d2eb3);

      let _0x2775d5 = this['getChild']('middleUI', this["owner"]);

      this["tabRank"] = this["getChild"]("tabRank", _0x2775d5);
    }

    ['initEvent']() {
      _0x5adfe2["utils"]["addClickEvent"](this["btnBack"], this, this["onCloseClick"]);

      this["tabRank"]["selectHandler"] = new Laya["Handler"](this, this["onRankClick"]);
    }

    ["onRankClick"](_0x291b91) {
      1 != _0x291b91 ? (this['rankFriend'] && this["rankFriend"]["show"](), this["rankWorld"] && this["rankWorld"]["hide"]()) : (this["rankFriend"] && this["rankFriend"]['hide'](), this["rankWorld"] && this["rankWorld"]["show"]());
    }

    ["onPlayEvent"]() {}

    ["onCloseClick"]() {}

  }

  class _0x217824 extends _0x3c5cf3 {
    constructor() {
      super(...arguments);
      this["itemArr"] = [];
      this["coinArr"] = [100, 150, 200, 300, 400, 500, 1000];
      this["moveValue"] = 0;
      this['tip'] = null;
    }

    ["onAwake"]() {
      super['onAwake']();
    }

    ["initUI"]() {
      let _0x4cd6d8 = this["getChild"]("middleUI", this["owner"]);

      _0x4cd6d8['scale'](0, 0);

      this['setAni'](0, 1.44, false);
      this["btnGet"] = this["getChild"]("btnGet", _0x4cd6d8);
      this["btnGetDouble"] = this["getChild"]("btnGetDouble", _0x4cd6d8);
      this['btnClose'] = this["getChild"]("btnClose", _0x4cd6d8);

      let _0x4d144f = _0x5adfe2["storageMgr"]["getRegisterArr"]();

      if (_0x4d144f[6] && this["checkTime"]()) {
        for (let _0x1ebfad = 0; _0x1ebfad < 7; ++_0x1ebfad) {
          _0x4d144f[_0x1ebfad] = false;

          _0x5adfe2['storageMgr']["setRegisterArr"](_0x1ebfad, false);
        }
      }

      let _0x1bf8c7 = this["getChild"]("panel", _0x4cd6d8);

      for (let _0x29449d = 0; _0x29449d < 7; ++_0x29449d) {
        let _0x1840a7 = this["getChild"]('itme' + (_0x29449d + 1), _0x1bf8c7);

        if (this["itemArr"][_0x29449d] = _0x1840a7, 6 == _0x29449d) {
          let _0x5e9752 = _0x1840a7["getChildByName"]('txt1'),
              _0x289f8f = (_0x1840a7["getChildByName"]("txt2"), _0x1840a7["getChildByName"]("gold")),
              _0x111901 = _0x1840a7["getChildByName"]("img");

          _0x4d144f[_0x29449d] ? _0x111901['visible'] = true : (_0x5e9752["visible"] = true, _0x289f8f["visible"] = true, _0x111901["visible"] = false);
        } else {
          let _0x3b385b = _0x1840a7["getChildByName"]("txt1"),
              _0x4fdb26 = (_0x1840a7["getChildByName"]("txt2"), _0x1840a7['getChildByName']('gold')),
              _0x22e249 = _0x1840a7["getChildByName"]("img");

          _0x4d144f[_0x29449d] ? _0x22e249["visible"] = true : (_0x3b385b["visible"] = true, _0x4fdb26["visible"] = true, _0x22e249["visible"] = false);
        }
      }

      let _0x5181c5 = this['getChild']("tip", _0x4cd6d8);

      this["tip"] = _0x5181c5;
      _0x5adfe2['storageMgr']["getRegisterSingle"]() ? (this["btnGetDouble"]["visible"] = false, this['btnGet']["visible"] = false, _0x5181c5["visible"] = true) : (this['btnGetDouble']["visible"] = true, this["btnGet"]["visible"] = true, _0x5181c5["visible"] = false);

      let _0x57e3f3 = this["btnGetDouble"]["getChildByName"]("img");

      zs['laya']["platform"]["ADConfig"]['zs_share'] ? _0x57e3f3["skin"] = "ui/common/home/img_feixiang.png" : _0x57e3f3["skin"] = "ui/common/home/img_guanggao.png";
      this['coinValue'] = this["getChild"]("coinBg", _0x4cd6d8)["getChildByName"]("value");
      this['coinValue']['text'] = _0x5adfe2['commonData']["userCoin"] + '';
      //window["box_adTwo"]["visible"] = false;
    }

    ['showGoldAni'](_0x5e2f59) {
      let _0x59ff81 = this['getChild']("middleUI", this["owner"]),
          _0x44dec0 = this["getChild"]("gold", this["itemArr"][_0x5e2f59]),
          _0x52683e = new Laya["Point"](0, 0);

      _0x5e2f59 < 6 ? (_0x44dec0["localToGlobal"](_0x52683e, false, _0x59ff81), _0x52683e['x'] += 38, _0x52683e['y'] += 42) : (_0x44dec0['localToGlobal'](_0x52683e, false, _0x59ff81), _0x52683e['x'] += 63, _0x52683e['y'] += 50);

      let _0x5701c7 = new Laya["Point"](9, 48);

      _0x5adfe2["utils"]['showCoinFly'](_0x52683e, _0x5701c7, null);
    }

    ['setAni'](_0x1b28bb, _0x5c7861, _0x5b0fec = false) {
      let _0x4b6baa = this["getChild"]("middleUI", this["owner"]);

      this["moveValue"] = _0x1b28bb;
      Laya["Tween"]['to'](this, {
        'moveValue': _0x5c7861
      }, 300, Laya["Ease"]["quadInOut"], new Laya["Handler"](this, function () {
        _0x5b0fec && Laya["Scene"]["close"]("views/register.scene");
      }))["update"] = new Laya['Handler'](this, function () {
        _0x4b6baa["scale"](this['moveValue'], this["moveValue"]);
      });
    }

    ['initEvent']() {
      _0x5adfe2["utils"]["addClickEvent"](this["btnGet"], this, this['onGetClick']);

      _0x5adfe2['utils']["addClickEvent"](this['btnGetDouble'], this, this["onGetDoubleClick"]);

      _0x5adfe2["utils"]['addClickEvent'](this['btnClose'], this, this["onCloseClick"]);

      _0x5adfe2["utils"]["addClickEvent"](this["tip"], this, this["onCloseClick"]);
    }

    ["checkTime"]() {
      let _0x9984b5 = new Date()["valueOf"]() / 1000,
          _0x12dcb4 = _0x5adfe2["storageMgr"]["getLastRegisterTime"]();

      return Math['floor'](_0x9984b5 / 86400) > Math["floor"](_0x12dcb4 / 86400);
    }

    ['onGetClick']() {
      let _0x28487a = 0,
          _0x4cc7fc = _0x5adfe2["storageMgr"]["getRegisterArr"]();

      for (let _0x2739c5 = 0; _0x2739c5 < _0x4cc7fc["length"]; ++_0x2739c5) {
        if (!_0x4cc7fc[_0x2739c5]) {
          _0x28487a = _0x2739c5;
          break;
        }
      }

      this["setRegister"](_0x28487a);

      let _0x390a81 = new Date()["valueOf"]() / 1000;

      _0x5adfe2['storageMgr']["setLastRegisterTime"](_0x390a81);

      _0x5adfe2["storageMgr"]["setRegisterArr"](_0x28487a, true);

      _0x5adfe2['storageMgr']['setRegisterSingle'](true);

      _0x5adfe2["commonData"]["userCoin"] += this['coinArr'][_0x28487a];

      _0x5adfe2["storageMgr"]['setAwardGold'](_0x5adfe2["commonData"]["userCoin"]);

      this['coinValue']['text'] = _0x5adfe2["commonData"]["userCoin"] + '';

      _0x5adfe2["glEvent"]['event']('update_coin');

      this["showGoldAni"](_0x28487a);
      this["btnGet"]['visible'] = 0;
    }

    ['setRegister'](_0x1c9672) {
      let _0x56cc10 = this["itemArr"][_0x1c9672];

      _0x56cc10["getChildByName"]("txt1");

      _0x56cc10["getChildByName"]("txt2");

      _0x56cc10['getChildByName']("gold");

      _0x56cc10['getChildByName']("img")["visible"] = true;

      let _0x5d4871 = this["getChild"]("middleUI", this["owner"]),
          _0xc69bc2 = this['getChild']("tip", _0x5d4871);

      this['btnGetDouble']["visible"] = false;
      this["btnGet"]["visible"] = false;
      _0xc69bc2["visible"] = true;
    }

    ["onGetDoubleClick"]() {
      let _0x4fc516 = 0,
          _0x5bccb1 = _0x5adfe2["storageMgr"]["getRegisterArr"]();

      for (let _0x2c6664 = 0; _0x2c6664 < _0x5bccb1["length"]; ++_0x2c6664) {
        if (!_0x5bccb1[_0x2c6664]) {
          _0x4fc516 = _0x2c6664;
          break;
        }
      }

      zs["laya"]["platform"]['ADConfig']["zs_share"] ? _0x5adfe2["wxMgr"]["openShare"](Laya["Handler"]['create'](this, function () {
        _0x5adfe2["commonData"]["userCoin"] += 3 * this['coinArr'][_0x4fc516];

        _0x5adfe2["storageMgr"]["setAwardGold"](_0x5adfe2['commonData']["userCoin"]);

        this["showGoldAni"](_0x4fc516);
        this["setRegister"](_0x4fc516);

        _0x5adfe2["storageMgr"]["setRegisterArr"](_0x4fc516, true);

        let _0x5d49f1 = new Date()["valueOf"]() / 1000;

        _0x5adfe2["storageMgr"]['setLastRegisterTime'](_0x5d49f1);

        _0x5adfe2['storageMgr']['setRegisterSingle'](true);

        _0x5adfe2["glEvent"]["event"]('update_coin');

        _0x5adfe2["uiMgr"]['showToast']("You Get " + 3 * this["coinArr"][_0x4fc516] + " Coins", 2000);
      })) : platform["getInstance"]()["showReward"](() => {
        _0x5adfe2["commonData"]["userCoin"] += 3 * this["coinArr"][_0x4fc516];

        _0x5adfe2["storageMgr"]["setAwardGold"](_0x5adfe2["commonData"]["userCoin"]);

        this["coinValue"]["text"] = _0x5adfe2["commonData"]["userCoin"] + '';
        this['showGoldAni'](_0x4fc516);
        this["setRegister"](_0x4fc516);

        _0x5adfe2["storageMgr"]["setRegisterArr"](_0x4fc516, true);

        _0x5adfe2['storageMgr']["setRegisterSingle"](true);

        _0x5adfe2["glEvent"]["event"]("update_coin");

        _0x5adfe2['uiMgr']["showToast"]("You Get " + 3 * this["coinArr"][_0x4fc516] + " Coins", 2000);

        this["btnGetDouble"]["visible"] = false;
      });
    }

    ["onCloseClick"]() {
      this["setAni"](1, 0, true);
      //window["box_adTwo"]["visible"] = true;
    }

  }

  class _0x21f4ec extends _0x3c5cf3 {
    constructor() {
      super(...arguments);
      this["skinArr"] = [];
      this["selectIndex"] = 0;
      this["indexArr"] = [];
      this["moveIndex"] = 0;
      this["model"] = null;
      this["movev"] = 0;
      this['unlockIndex'] = 0;
      this['isCoin'] = false;
      this["randomPos"] = 0;
    }

    ["onAwake"]() {
      super['onAwake']();
    }

    ['initUI']() {
      let _0x4c2d79 = this["getChild"]("topUI", this["owner"]),
          _0x3322b0 = this['getChild']("middleUI", this["owner"]),
          _0x20fb41 = this["getChild"]("skinPanel", _0x3322b0);

      this["backBtn"] = this['getChild']("backBtn", _0x4c2d79);
      this["unLockBtn"] = this["getChild"]('unLockBtn', _0x3322b0);
      this['unlockValue'] = this["unLockBtn"]["getChildByName"]("value");
      this["getBtn"] = this["getChild"]("getBtn", _0x3322b0);
      this["light"] = this["getChild"]("light", _0x3322b0);

      let _0x944296 = _0x5adfe2["storageMgr"]['getUnlockCount']();

      _0x944296 > _0x5adfe2["commonData"]["skinValueArr"]["length"] - 1 && (_0x944296 = _0x5adfe2["commonData"]["skinValueArr"]["length"] - 1);
      this["unlockValue"]["text"] = _0x5adfe2["commonData"]['skinValueArr'][_0x944296] + '';
      this["selectIndex"] = _0x5adfe2['storageMgr']["getSkinId"]();
      this["coinValue"] = this["getChild"]("coinBg", _0x4c2d79)["getChildByName"]("value");
      this["coinValue"]['text'] = _0x5adfe2["commonData"]["userCoin"] + '';
      this['skinArr']["length"] = 6;

      _0x5adfe2["storageMgr"]["getSkinArr"]();

      for (let _0x33fdeb = 0; _0x33fdeb < 6; ++_0x33fdeb) {
        let _0x16593b = _0x20fb41["getChildAt"](_0x33fdeb + 1);

        _0x16593b['getChildByName']("lock")['visible'] = false;
        this['skinArr'][_0x33fdeb] = _0x16593b;

        _0x16593b['on'](Laya["Event"]["MOUSE_DOWN"], this, this['selectSkin'], [_0x33fdeb]);
      }

      this["skinArr"][this["selectIndex"]]["getChildByName"]("lock")["visible"] = true;
      this['setSign']();
      this["initScene"]();
      this["show3dScene"](true);
      this['setRoleSkin'](this['selectIndex']);

      let _0x429e31 = this['getBtn']["getChildByName"]("img");

      zs["laya"]["platform"]["ADConfig"]["zs_share"] ? _0x429e31["skin"] = "ui/common/home/img_feixiang.png" : _0x429e31['skin'] = "ui/common/home/img_guanggao.png";
      Laya["timer"]["frameLoop"](1, this, this["rotateFunc"]);
    }

    ["initEvent"]() {
      _0x5adfe2["utils"]["addClickEvent"](this["backBtn"], this, this["onBackClick"]);

      _0x5adfe2['utils']["addClickEvent"](this["unLockBtn"], this, this["onUnlockClick"]);

      _0x5adfe2["utils"]['addClickEvent'](this['getBtn'], this, this['onGetBtnClick']);
    }

    ["initScene"]() {
      let _0x2e68fc, _0x31c1a4;

      if (_0x5adfe2["commonData"]['showScene']) {
        _0x5adfe2["commonData"]["showScene"]["active"] = true;
        _0x2e68fc = _0x5adfe2["commonData"]["showScene"];
        Laya["stage"]["addChild"](_0x2e68fc);
      } else {
        let _0x290d03 = (_0x2e68fc = Laya["stage"]["addChild"](new Laya["Scene3D"]()))["addChild"](new Laya["DirectionLight"]());

        _0x290d03["color"] = new Laya["Vector3"](1, 0.956, 0.839);
        _0x2e68fc["ambientSphericalHarmonicsIntensity"] = 1;
        _0x2e68fc["ambientColor"] = new Laya["Vector3"](0.8313726, 0.8313726, 0.8313726);
        _0x290d03["intensity"] = 0.6;

        _0x290d03["transform"]["rotate"](new Laya["Vector3"](10, -17, 0), true, false);

        (_0x31c1a4 = _0x2e68fc["addChild"](new Laya['Camera'](0, 0.1, 100)))["name"] = "mainCamera";

        _0x31c1a4["transform"]["translate"](new Laya["Vector3"](0, 2, 5));

        _0x31c1a4["transform"]["rotate"](new Laya["Vector3"](-10, 0, 0), true, false);

        _0x31c1a4["clearFlag"] = 2;
        _0x5adfe2["commonData"]['showScene'] = _0x2e68fc;
      }
    }

    ["rotateFunc"]() {
      this["model"] && (this['movev'] += 0.04, this["model"]["transform"]['localRotationEulerY'] += Laya["timer"]["delta"] / 30, this['model']["transform"]['position'] = new Laya["Vector3"](0, 1.5 + 0.02 * Math["sin"](this["movev"]), 0), this["light"]["rotation"] += 0.5);
    }

    ["setWeapon"](_0x353600) {
      for (let _0x4bfa31 = 0; _0x4bfa31 < _0x353600["numChildren"]; ++_0x4bfa31) {
        let _0x16db13 = _0x353600["getChildAt"](_0x4bfa31);

        "w_01" == _0x16db13['name'] ? _0x16db13["active"] = false : "w_02" == _0x16db13["name"] ? _0x16db13['active'] = false : "w_03" == _0x16db13["name"] ? _0x16db13['active'] = false : "w_04" == _0x16db13["name"] ? _0x16db13['active'] = false : 'pifu' == _0x16db13["name"] ? (this["skinRoot"] = _0x16db13, _0x16db13["active"] = false) : "mmdt12" == _0x16db13["name"] ? _0x16db13['active'] = false : this["setWeapon"](_0x16db13);
      }
    }

    ["setRoleSkin"](_0x18817c) {
      if (this["model"]) {
        if (this["skinRoot"] || this["setWeapon"](this["model"]), 0 == _0x18817c) {
          this["skinRoot"]["active"] = false;
          this["model"]['getChildByName']("body")["_render"]["materials"][1]["albedoColor"] = new Laya["Vector4"](1, 1, 1, 1);
        } else {
          this["skinRoot"]["active"] = true;

          for (let _0x3f3832 = 0; _0x3f3832 < this["skinRoot"]["numChildren"]; ++_0x3f3832) {
            let _0x497695 = this["skinRoot"]['getChildAt'](_0x3f3832);

            if (_0x3f3832 == _0x18817c - 1) {
              _0x497695["active"] = true;

              let _0xd4c559 = _0x5adfe2["gameData"]['colorArr'],
                  _0x29ea35 = new Laya["Vector3"](_0xd4c559[3 * _0x3f3832] / 255, _0xd4c559[3 * _0x3f3832 + 1] / 255, _0xd4c559[3 * _0x3f3832 + 2] / 255);

              this["model"]["getChildByName"]("body")["_render"]["materials"][1]["albedoColor"] = new Laya['Vector4'](_0x29ea35['x'], _0x29ea35['y'], _0x29ea35['z'], 1);
            } else {
              _0x497695["active"] = false;
            }
          }
        }
      }
    }

    ['show3dScene'](_0x1656ab) {
      if (_0x1656ab) {
        (this["model"] = _0x5adfe2['gameMgr']["playerLg"]["skinShowSp"], this["model"]) && (this["setRoleSkin"](this["selectIndex"]), _0x5adfe2["commonData"]['showScene']['active'] = true, _0x5adfe2["commonData"]["showScene"]["addChild"](this["model"]), this["model"]["active"] = true, this['model']['transform']["localScale"] = new Laya["Vector3"](0.9, 0.9, 0.9), this["model"]["transform"]["position"] = new Laya["Vector3"](0, 1.5, 0), this['model']["getComponent"](Laya["Animator"])["play"]("idle", 0));
      } else {
        this["model"] && this["model"]['removeSelf']();
        Laya['timer']["clear"](this, this["rotateFunc"]);
        _0x5adfe2["commonData"]["showScene"]['active'] = false;
      }
    }

    ["onGetBtnClick"]() {
      zs["laya"]["platform"]["ADConfig"]["zs_share"] ? _0x5adfe2["wxMgr"]['openShare'](Laya['Handler']["create"](this, function () {
        _0x5adfe2["commonData"]["userCoin"] += 500;

        _0x5adfe2['storageMgr']["setAwardGold"](_0x5adfe2['commonData']["userCoin"]);

        this["coinValue"]['text'] = _0x5adfe2["commonData"]['userCoin'] + '';
        this["showGoldAni"]();
      })) : platform["getInstance"]()["showReward"](() => {
        _0x5adfe2["commonData"]["userCoin"] += 500;

        _0x5adfe2["storageMgr"]["setAwardGold"](_0x5adfe2["commonData"]["userCoin"]);

        this['coinValue']["text"] = _0x5adfe2["commonData"]["userCoin"] + '';
        this['showGoldAni']();
      });
    }

    ['showGoldAni']() {
      let _0x209133 = new Laya["Point"](0, 0);

      _0x209133['x'] = Laya["stage"]["width"] / 2;
      _0x209133['y'] = Laya["stage"]["height"] / 2;

      let _0x594812 = new Laya['Point'](554, 156 - (Laya["stage"]['height'] - 1334) / 2);

      _0x5adfe2['utils']["showCoinFly"](_0x209133, _0x594812, null);
    }

    ["selectSkin"](_0x8398ab) {
      if (_0x5adfe2['storageMgr']["getSkinArr"]()[_0x8398ab]) {
        this["selectIndex"] = _0x8398ab;
        this["skinArr"][this["selectIndex"]]["getChildByName"]('lock')["visible"] = true;
        this["setRoleSkin"](this['selectIndex']);

        for (let _0x5e32e2 = 0; _0x5e32e2 < this["skinArr"]["length"]; ++_0x5e32e2) {
          _0x5e32e2 != this['selectIndex'] && (this['skinArr'][_0x5e32e2]["getChildByName"]("lock")["visible"] = false);
        }

        this["show3dScene"](true);
      }
    }

    ["onUnlockClick"]() {
      _0x5adfe2["commonData"]["userCoin"] < _0x5adfe2["commonData"]["skinValueArr"][_0x5adfe2["storageMgr"]['getUnlockCount']()] ? _0x5adfe2['uiMgr']["showToast"]("钻石不足!", 2000) : this["randomUnlock"](true);
    }

    ['onVideoClick']() {
      this["isCoin"] = false;
      zs['laya']["platform"]['ADConfig']["zs_share"] ? _0x5adfe2["wxMgr"]['openShare'](Laya["Handler"]["create"](this, function () {
        this['unlockIndex'] < 0 ? this["randomUnlock"](false) : this['unlockSkin'](this["unlockIndex"]);
      })) : platform["getInstance"]()["showReward"](() => {
        this["unlockIndex"] < 0 ? this['randomUnlock'](false) : this["unlockSkin"](this["unlockIndex"]);
      });
    }

    ["onBackClick"]() {
      _0x5adfe2["storageMgr"]['setSkinId'](this["selectIndex"]);

      _0x5adfe2["commonData"]["skinId"] = this['selectIndex'];
      this["show3dScene"](false);
      _0x5adfe2['gameMgr'] && _0x5adfe2["gameMgr"]['playerLg']["changeSkin"]();
      Laya["Scene"]["open"]("views/home.scene", false, Laya['Handler']['create'](this, _0x410ec5 => {
        this["owner"]['close']();
      }));
    }

    ['randomUnlock'](_0x2ba867) {
      let _0x247a58 = _0x5adfe2["storageMgr"]["getSkinArr"]();

      this['indexArr'] = [];
      this['moveIndex'] = 0;

      for (let _0xd08d5a = 0; _0xd08d5a < _0x247a58['length']; ++_0xd08d5a) {
        _0x247a58[_0xd08d5a] || this['indexArr']["push"](_0xd08d5a);
      }

      this["isCoin"] = _0x2ba867;
      this['indexArr']["length"] > 1 ? (this["randomPos"] = 8 + Math["floor"](6 * Math["random"]()), Laya["timer"]["loop"](150, this, this["setpos"])) : 1 == this['indexArr']["length"] ? this["unlockSkin"](this["indexArr"][0]) : (_0x5adfe2['uiMgr']["showToast"]('已全部解锁', 2000), console["log"]("全部解锁"));
    }

    ["unlockSkin"](_0x21b7d4) {
      this['skinArr'][_0x21b7d4];
      this["isCoin"] && (_0x5adfe2['commonData']["userCoin"] -= _0x5adfe2['commonData']["skinValueArr"][_0x5adfe2['storageMgr']["getUnlockCount"]()], _0x5adfe2["storageMgr"]['setAwardGold'](_0x5adfe2["commonData"]['userCoin']));
      this['isCoin'] = false;

      _0x5adfe2["storageMgr"]['unlockSkin'](_0x21b7d4);

      this["selectIndex"] = _0x21b7d4;
      this["setRoleSkin"](this["selectIndex"]);
      this["skinArr"][this['selectIndex']]["getChildByName"]("lock")["visible"] = true;

      for (let _0x243868 = 0; _0x243868 < this["skinArr"]["length"]; ++_0x243868) {
        _0x243868 != this["selectIndex"] && (this["skinArr"][_0x243868]["getChildByName"]("lock")["visible"] = false);
      }

      this["setSign"]();
      this["show3dScene"](true);

      let _0x4779af = _0x5adfe2["storageMgr"]['getUnlockCount']();

      _0x4779af > _0x5adfe2["commonData"]["skinValueArr"]["length"] - 1 && (_0x4779af = _0x5adfe2["commonData"]['skinValueArr']["length"] - 1);
      this['unlockValue']["text"] = _0x5adfe2["commonData"]["skinValueArr"][_0x4779af] + '';
      this["coinValue"]["text"] = _0x5adfe2["commonData"]['userCoin'] + '';
    }

    ["setpos"]() {
      this['skinArr'][this['indexArr'][this["moveIndex"] % this["indexArr"]["length"]]];
      this["setSign2"](this["moveIndex"] % this["indexArr"]["length"]);
      _0x5adfe2["storageMgr"]["isPlayVibrate"]() && zs["laya"]['sdk']["DeviceService"]['VibrateShort']();
      this["moveIndex"]++;
      this['moveIndex'] == this["randomPos"] && (this["unlockSkin"](this["indexArr"][(this["moveIndex"] - 1) % this["indexArr"]["length"]]), Laya["timer"]["clear"](this, this["setpos"]));
    }

    ["setSign"]() {
      let _0x289701 = _0x5adfe2["storageMgr"]["getSkinArr"]();

      for (let _0x43b06f = 0; _0x43b06f < this['skinArr']["length"]; ++_0x43b06f) {
        _0x289701[_0x43b06f] ? (this["skinArr"][_0x43b06f]['getChildByName']('img1')["visible"] = false, this["skinArr"][_0x43b06f]["getChildByName"]("img2")["visible"] = true, this["skinArr"][_0x43b06f]['getChildByName']("txt")["visible"] = false) : (this["skinArr"][_0x43b06f]["getChildByName"]('img1')["visible"] = false, this["skinArr"][_0x43b06f]["getChildByName"]("img2")["visible"] = true, this["skinArr"][_0x43b06f]['getChildByName']('txt')["visible"] = true);
      }
    }

    ['setSign2'](_0xa08788) {
      for (let _0xf3d834 = 0; _0xf3d834 < this["indexArr"]["length"]; ++_0xf3d834) {
        _0xf3d834 == _0xa08788 ? (this["skinArr"][this["indexArr"][_0xf3d834]]["getChildByName"]("img1")['visible'] = true, this["skinArr"][this["indexArr"][_0xf3d834]]["getChildByName"]('img2')['visible'] = false) : (this["skinArr"][this["indexArr"][_0xf3d834]]['getChildByName']("img1")["visible"] = false, this["skinArr"][this["indexArr"][_0xf3d834]]["getChildByName"]("img2")["visible"] = true);
      }
    }

    ["onOpened"]() {}

  }

  class _0x44e03f extends _0x3c5cf3 {
    constructor() {
      super(...arguments);
      this["doubleReward"] = false;
      this["addTipArr"] = [];
      this["addTipShow"] = [];
      this["coinStart"] = null;
      this["isCoinAni"] = false;
      this['coinCount'] = 0;
      this["coinFlyValue"] = 0;
    }

    ["initData"]() {}

    ["onEnable"]() {
      this["initUI"]();
      this['initEvent']();
    }

    ["initUI"]() {
      let _0x3a2dcf = this["getChild"]("bottomUI", this["owner"]);

      this["nextBtn"] = this["getChild"]("nextBtn", _0x3a2dcf);
      this["skinShopBtn"] = this['getChild']("skinBtn", _0x3a2dcf);
      this["videoBtn"] = this["getChild"]('videoBtn', _0x3a2dcf);
      this["videoBtn"]["visible"] = true;
      this["doubleReward"] = false;

      let _0x427d6c = this["getChild"]("midddleUI", this["owner"]);

      this['addTipBox'] = this["getChild"]("addCoin", _0x427d6c);
      this["addTipShow"]["length"] = 20;
      this["addTipArr"]["length"] = 20;

      for (let _0x361d55 = 0; _0x361d55 < 20; ++_0x361d55) {
        this["addTipShow"][_0x361d55] = false;

        let _0x258c50 = this['addTipBox']["getChildAt"](_0x361d55);

        _0x258c50["visible"] = false;

        _0x258c50["addComponent"](_0x347e54)['init'](_0x258c50, _0x361d55);

        this["addTipArr"][_0x361d55] = _0x258c50;
      }

      let _0x16c3d4 = this["getChild"]("topUI", this["owner"]);

      this["coinBg"] = this["getChild"]("coinBg", _0x16c3d4);
      this['singleCoinValue'] = _0x3a2dcf['getChildByName']('coin')["getChildByName"]("value");
      this["singleCoinValue"]["text"] = Math["floor"](_0x5adfe2["gameData"]["gameCoin"]) + '';
      zs["laya"]["platform"]["ADConfig"]["zs_share"] && (this["videoBtn"]["getChildByName"]("img")['skin'] = "ui/common/home/img_feixiang.png");
      this["coinStart"] = _0x3a2dcf['getChildByName']("coin");
      this["coinValue"] = _0x16c3d4["getChildByName"]('coinBg')["getChildByName"]("value");
      this["coinValue"]["text"] = _0x5adfe2['commonData']["userCoin"] + '';
      _0x5adfe2['commonData']["newLevel"]++;
      zs["laya"]['tdapp']["tdAppSdk"]["event"](new zs["laya"]["tdapp"]["levelCompletedEvt"](_0x5adfe2["commonData"]["userId"], _0x5adfe2["commonData"]['newLevel'] + ''));

      _0x5adfe2["storageMgr"]["setGameStausLevel"](_0x5adfe2['commonData']["newLevel"]);

      _0x5adfe2["commonData"]["freeSkinCount"] = 0;
      // window['scrollList']['visible'] = true;
    }

    ['initEvent']() {
      _0x5adfe2["utils"]["addClickEvent"](this["nextBtn"], this, this["onBtnAcquire"]);

      _0x5adfe2["utils"]["addClickEvent"](this["skinShopBtn"], this, this["onSkinShopClick"]);

      _0x5adfe2['utils']["addClickEvent"](this["videoBtn"], this, this["onPlayVideoClick"]);
    }

    ["lateCoin"]() {
      _0x5adfe2["gameData"]["gameCoin"] = 0;

      _0x5adfe2["gameMgr"]["gameReset"]();

      Laya["Scene"]["close"]('views/success.scene');
      zs["laya"]['platform']["PlatformMgr"]["onGameOverPopUp"](false);
    }

    ["loopAniSet"]() {
      this["coinCount"] = 0;
      this["isCoinAni"] = true;
      this['doubleReward'] && (_0x5adfe2['gameData']['gameCoin'] *= 3, this['singleCoinValue']['value'] = Math['floor'](_0x5adfe2["gameData"]["gameCoin"]) + '');
      this["coinFlyValue"] = Math['floor'](_0x5adfe2["gameData"]["gameCoin"] / 20);
      Laya["timer"]["loop"](50, this, this["loopAni"]);
      Laya["timer"]["once"](2200, this, this["lateCoin"]);
    }

    ["loopAni"]() {
      this["coinCount"]++;
      this["coinCount"] % 3 == 0 && (_0x5adfe2["storageMgr"]["isPlayVibrate"]() && zs["laya"]['sdk']["DeviceService"]['VibrateShort'](), _0x5adfe2["soundMgr"]['play']("coin"));
      this["coinCount"] < 21 ? this["showAddUi"](this['coinFlyValue']) : (_0x5adfe2["commonData"]["userCoin"] += Math["floor"](_0x5adfe2['gameData']['gameCoin']) - 20 * this['coinFlyValue'], _0x5adfe2["storageMgr"]['setAwardGold'](_0x5adfe2["commonData"]['userCoin']), this["coinValue"]["text"] = _0x5adfe2["commonData"]["userCoin"] + '', Laya["timer"]["clear"](this, this["loopAni"]));
    }

    ["showAddUi"](_0xe8ee46) {
      let _0x187582 = this["addTipArr"][this['coinCount'] - 1],
          _0x58bb11 = this["getChild"]("bottomUI", this["owner"]),
          _0xf0b577 = new Laya['Vector2'](this["coinBg"]['x'] + 1, this["coinBg"]['y'] - Laya['stage']["height"] / 2 + 300),
          _0x598b9a = new Laya["Vector2"](this['coinStart']['x'] + _0x58bb11['x'] + 1, this["coinStart"]['y'] + _0x58bb11['y'] - Laya["stage"]["height"] / 2 - 2);

      _0x187582["pos"](_0x598b9a['x'], _0x598b9a['y']);

      _0x187582["getComponent"](_0x347e54)["setMove"](true, _0x598b9a, _0xf0b577, _0xe8ee46, this["upDateScore"], this);
    }

    ["upDateScore"](_0x7dee5e) {
      _0x7dee5e["coinValue"]["text"] = _0x5adfe2["commonData"]["userCoin"] + '';
    }

    ["onBtnAcquire"]() {
      platform["getInstance"]()['showInterstitial'](() => {
        window['isWin'] = true;
       // window["scrollList"]["visible"] = false;
        this["isCoinAni"] || this['loopAniSet']();
      });
    }

    ["onSkinShopClick"]() {
   //   window["scrollList"]["visible"] = false;
      this["isCoinAni"] || (_0x5adfe2["commonData"]["userCoin"] += Math["floor"](_0x5adfe2["gameData"]["gameCoin"]), _0x5adfe2["storageMgr"]['setAwardGold'](_0x5adfe2["commonData"]["userCoin"]), _0x5adfe2["gameData"]['gameCoin'] = 0, _0x5adfe2["gameMgr"]["gameReset"](), Laya['Scene']["open"]("views/skinShop.scene", false, Laya["Handler"]["create"](this, _0x16c30f => {
        Laya["Scene"]["close"]("views/success.scene");
      })));
    }

    ["onAcquireClick"]() {
      // window['scrollList']["visible"] = false;
      this["doubleReward"] && (_0x5adfe2["gameData"]['gameCoin'] *= 3);
      _0x5adfe2['commonData']['userCoin'] += Math['floor'](_0x5adfe2['gameData']["gameCoin"]);

      _0x5adfe2["storageMgr"]['setAwardGold'](_0x5adfe2["commonData"]["userCoin"]);

      this["coinValue"]["text"] = _0x5adfe2['commonData']["userCoin"] + '';
      _0x5adfe2["gameData"]["gameCoin"] = 0;
    }

    ['onPlayVideoClick']() {
      platform["getInstance"]()['showReward'](() => {
        window['isWin'] = true;
       // window["scrollList"]["visible"] = false;
        this["doubleReward"] = true;

        _0x5adfe2['uiMgr']["showToast"]("Get " + _0x5adfe2['gameData']["gameCoin"] * 3 + " gold coins", 2000);

        this["loopAniSet"]();
      });
    }

  }

  class _0x1c1025 {
    constructor() {}

    static ["init"]() {
      var _0x18443b = Laya['ClassUtils']["regClass"];

      _0x18443b('scripts/stackIOViews/CoinFlyView.ts', _0x1cf7e4);

      _0x18443b('scripts/stackIOViews/luckyRotate.ts', _0x5e328a);

      _0x18443b('scripts/stackIOViews/SkirtQueenFailView.ts', _0x248c9f);

      _0x18443b("scripts/stackIOViews/SkirtQueenFreeSkin.ts", _0x5f0ee1);

      _0x18443b('scripts/stackIOViews/gameCoinView.ts', _0x16420b);

      _0x18443b('scripts/stackIOViews/SkirtQueenGGame.ts', _0x1f6b89);

      _0x18443b("scripts/stackIOViews/SkirtQueenHomeView.ts", _0x60b9f4);

      _0x18443b("scripts/stackIOViews/SkirtQueenLoginView.ts", _0x55826d);

      _0x18443b("scripts/stackIOViews/popups/BubbleText.ts", _0x11b6d0);

      _0x18443b("scripts/stackIOViews/Rank/Rank.ts", _0x3d31e7);

      _0x18443b("scripts/stackIOViews/Rank/RankFriend.ts", _0x11f9d9);

      _0x18443b("scripts/stackIOViews/Rank/RankWorld.ts", _0x5b458b);

      _0x18443b("scripts/stackIOViews/RegisterView.ts", _0x217824);

      _0x18443b('scripts/stackIOViews/SkinShopView.ts', _0x21f4ec);

      _0x18443b('scripts/stackIOViews/SkirtQueenSuccessView.ts', _0x44e03f);
    }

  }

  _0x1c1025["width"] = 1080;
  _0x1c1025["height"] = 1920;
  _0x1c1025['scaleMode'] = "showall";
  _0x1c1025["screenMode"] = "none";
  _0x1c1025["alignV"] = 'center';
  _0x1c1025["alignH"] = "center";
  _0x1c1025['startScene'] = 'views/login.scene';
  _0x1c1025['sceneRoot'] = '';
  _0x1c1025["debug"] = false;
  _0x1c1025["stat"] = false;
  _0x1c1025["physicsDebug"] = false;
  _0x1c1025["exportSceneToJson"] = true;

  _0x1c1025["init"]();

  new class {
    constructor() {
      let _0x5e3b71 = Laya["Browser"]["height"] / Laya['Browser']["width"],
          _0x292fb4 = Laya['Browser']["onMobile"] ? _0x5e3b71 * _0x1c1025["width"] : _0x1c1025["height"];

      _0x5adfe2["screen"]["realPxRatio"] = _0x292fb4 / Laya['Browser']['clientHeight'];
      _0x5adfe2['screen']["allScreen"] = _0x5e3b71 > 1.8888888888888888;
      _0x5adfe2["screen"]["offsetTop"] = (_0x292fb4 - _0x1c1025["height"]) / 2;
      window["Laya3D"] ? Laya3D["init"](_0x1c1025["width"], _0x1c1025["height"]) : Laya["init"](_0x1c1025["width"], _0x1c1025["height"], Laya['WebGL']);
      Laya['Physics'] && Laya["Physics"]["enable"]();
      Laya["DebugPanel"] && Laya["DebugPanel"]['enable']();
      Laya["stage"]["scaleMode"] = _0x1c1025["scaleMode"];
      Laya['stage']["screenMode"] = _0x1c1025["screenMode"];
      Laya["stage"]["alignV"] = _0x1c1025["alignV"];
      Laya['stage']["alignH"] = _0x1c1025['alignH'];
      Laya["Browser"]["onIOS"] ? Laya["stage"]["useRetinalCanvas"] = false : Laya["stage"]["useRetinalCanvas"] = false;
      Laya['MouseManager']["multiTouchEnabled"] = false;
      Laya["URL"]["exportSceneToJson"] = _0x1c1025["exportSceneToJson"];
      (_0x1c1025["debug"] || "true" == Laya["Utils"]['getQueryString']('debug')) && Laya["enableDebugPanel"]();
      _0x1c1025["physicsDebug"] && Laya['PhysicsDebugDraw'] && Laya['PhysicsDebugDraw']["enable"]();
      _0x1c1025["stat"] && Laya["Stat"]['show']();
      Laya['alertGlobalError'](true);
      Laya["ResourceVersion"]["enable"]('version.json', Laya["Handler"]["create"](this, this['onVersionLoaded']), Laya['ResourceVersion']["FILENAME_VERSION"]);
    }

    ["onVersionLoaded"]() {
      Laya["AtlasInfoManager"]['enable']("fileconfig.json", Laya['Handler']["create"](this, this["onConfigLoaded"]));
    }

    ["onConfigLoaded"]() {
      _0x1c1025["startScene"] && Laya['Scene']["open"](_0x1c1025['startScene']);
    }

  }();
}();