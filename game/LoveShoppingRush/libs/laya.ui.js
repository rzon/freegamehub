!function(t, e) {
    "use strict";
    class s {}
    s.touchScrollEnable = !0, s.mouseWheelEnable = !0, s.showButtons = !0, s.popupBgColor = "#000000", 
    s.popupBgAlpha = .5, s.closeDialogOnSide = !0, window.UIConfig = s;
    class i {}
    i.defaultSizeGrid = [ 4, 4, 4, 4, 0 ], i.labelColor = "#000000", i.labelPadding = [ 2, 2, 2, 2 ], 
    i.inputLabelPadding = [ 1, 1, 1, 3 ], i.buttonStateNum = 3, i.buttonLabelColors = [ "#32556b", "#32cc6b", "#ff0000", "#C0C0C0" ], 
    i.comboBoxItemColors = [ "#5e95b6", "#ffffff", "#000000", "#8fa4b1", "#ffffff" ], 
    i.scrollBarMinNum = 15, i.scrollBarDelayTime = 500;
    class h extends e.Graphics {
        constructor() {
            super(...arguments), this.autoCacheCmd = !0, this._width = 0, this._height = 0, 
            this.uv = null;
        }
        destroy() {
            super.destroy(), this._source = null, this._sizeGrid = null, this._offset = null;
        }
        get sizeGrid() {
            return this._sizeGrid;
        }
        set sizeGrid(t) {
            this._sizeGrid = t.map(t => +t), this._setChanged();
        }
        get width() {
            return this._width ? this._width : this._source ? this._source.sourceWidth : 0;
        }
        set width(t) {
            this._width != t && (this._width = t, this._setChanged());
        }
        get height() {
            return this._height ? this._height : this._source ? this._source.sourceHeight : 0;
        }
        set height(t) {
            this._height != t && (this._height = t, this._setChanged());
        }
        get source() {
            return this._source;
        }
        set source(t) {
            if (t) this._source = t, this._setChanged(); else if (this._source = null, this._drawGridCmd) {
                this._one && this._one == this._drawGridCmd && this.clear();
                let t = this.cmds;
                t && t.length > 0 && t[0] == this._drawGridCmd && t.splice(0, 1);
            }
        }
        _setChanged() {
            this._isChanged || (this._isChanged = !0, e.ILaya.timer.callLater(this, this.changeSource));
        }
        _createDrawTexture(t, s = 0, i = 0, h = 0, r = 0, a = null, l = 1, n = null, o = null, _) {
            if (!t || l < .01) return null;
            if (!t.getIsReady()) return null;
            if (h || (h = t.sourceWidth), r || (r = t.sourceHeight), t.getIsReady()) {
                var c = h / t.sourceWidth, d = r / t.sourceHeight;
                if (h = t.width * c, r = t.height * d, h <= 0 || r <= 0) return null;
                s += t.offsetX * c, i += t.offsetY * d;
            }
            return this._sp && (this._sp._renderType |= e.SpriteConst.GRAPHICS, this._sp._setRenderType(this._sp._renderType)), 
            e.DrawTextureCmd.create.call(this, t, s, i, h, r, a, l, n, o, _);
        }
        changeSource() {
            this._isChanged = !1;
            var t = this._source;
            if (t && t.bitmap) {
                var s = this.width, i = this.height, h = this._sizeGrid, r = t.sourceWidth, a = t.sourceHeight;
                if (!h || r === s && a === i) {
                    let e = this._createDrawTexture(t, this._offset ? this._offset[0] : 0, this._offset ? this._offset[1] : 0, s, i, null, 1, null, null, this.uv);
                    e && this._setDrawGridCmd(e);
                } else {
                    let r = e.Draw9GridTexture.create(t, 0, 0, s, i, h);
                    this._setDrawGridCmd(r);
                }
                this._repaint();
            }
        }
        drawBitmap(t, e, s, i, h = 0, r = 0) {
            h < .1 || r < .1 || (!t || e.width == h && e.height == r ? this.drawImage(e, s, i, h, r) : this.fillTexture(e, s, i, h, r));
        }
        static getTexture(t, s, i, h, r) {
            var a;
            return h <= 0 && (h = 1), r <= 0 && (r = 1), t.$_GID || (t.$_GID = e.Utils.getGID()), 
            a && a._getSource() || (a = e.Texture.createFromTexture(t, s, i, h, r)), a;
        }
        _setDrawGridCmd(t) {
            var e = this._source;
            if (!e || !e.bitmap) return;
            let s = this.cmds;
            if (this._one || s && !(s.length <= 0)) {
                let e = this._one;
                e ? e == this._drawGridCmd ? this._one = t : (this.clear(), this._saveToCmd(null, t), 
                this._saveToCmd(null, e)) : s.splice(0, 0, t);
            } else this._saveToCmd(null, t);
            this._drawGridCmd = t;
        }
    }
    e.ClassUtils.regClass("laya.ui.AutoBitmap", h), e.ClassUtils.regClass("Laya.AutoBitmap", h);
    class r extends e.Component {
        constructor() {
            super(...arguments), this._top = NaN, this._bottom = NaN, this._left = NaN, this._right = NaN, 
            this._centerX = NaN, this._centerY = NaN;
        }
        onReset() {
            this._top = this._bottom = this._left = this._right = this._centerX = this._centerY = NaN;
        }
        _onEnable() {
            this.owner.parent ? this._onAdded() : this.owner.once(e.Event.ADDED, this, this._onAdded);
        }
        _onDisable() {
            this.owner.off(e.Event.ADDED, this, this._onAdded), this.owner.parent && this.owner.parent.off(e.Event.RESIZE, this, this._onParentResize);
        }
        _onAdded() {
            this.owner.parent && this.owner.parent.on(e.Event.RESIZE, this, this._onParentResize), 
            this.resetLayoutX(), this.resetLayoutY();
        }
        _onParentResize() {
            var t = this.resetLayoutX(), s = this.resetLayoutY();
            (t || s) && this.owner.event(e.Event.RESIZE);
        }
        resetLayoutX() {
            var t = this.owner;
            if (!t) return !1;
            var e = t.parent;
            if (e) if (isNaN(this.centerX)) {
                if (isNaN(this.left)) isNaN(this.right) || (t.x = Math.round(e.width - t.displayWidth - this.right + t.pivotX * t.scaleX)); else if (t.x = Math.round(this.left + t.pivotX * t.scaleX), 
                !isNaN(this.right)) {
                    var s = (e._width - this.left - this.right) / (t.scaleX || .01);
                    if (s != t.width) return t.width = s, !0;
                }
            } else t.x = Math.round(.5 * (e.width - t.displayWidth) + this.centerX + t.pivotX * t.scaleX);
            return !1;
        }
        resetLayoutY() {
            var t = this.owner;
            if (!t) return !1;
            var e = t.parent;
            if (e) if (isNaN(this.centerY)) {
                if (isNaN(this.top)) isNaN(this.bottom) || (t.y = Math.round(e.height - t.displayHeight - this.bottom + t.pivotY * t.scaleY)); else if (t.y = Math.round(this.top + t.pivotY * t.scaleY), 
                !isNaN(this.bottom)) {
                    var s = (e._height - this.top - this.bottom) / (t.scaleY || .01);
                    if (s != t.height) return t.height = s, !0;
                }
            } else t.y = Math.round(.5 * (e.height - t.displayHeight) + this.centerY + t.pivotY * t.scaleY);
            return !1;
        }
        resetLayout() {
            this.owner && (this.resetLayoutX(), this.resetLayoutY());
        }
        get top() {
            return this._top;
        }
        set top(t) {
            this._top != t && (this._top = t, this.resetLayoutY());
        }
        get bottom() {
            return this._bottom;
        }
        set bottom(t) {
            this._bottom != t && (this._bottom = t, this.resetLayoutY());
        }
        get left() {
            return this._left;
        }
        set left(t) {
            this._left != t && (this._left = t, this.resetLayoutX());
        }
        get right() {
            return this._right;
        }
        set right(t) {
            this._right != t && (this._right = t, this.resetLayoutX());
        }
        get centerX() {
            return this._centerX;
        }
        set centerX(t) {
            this._centerX != t && (this._centerX = t, this.resetLayoutX());
        }
        get centerY() {
            return this._centerY;
        }
        set centerY(t) {
            this._centerY != t && (this._centerY = t, this.resetLayoutY());
        }
    }
    r.EMPTY = null, e.ILaya.regClass(r), r.EMPTY = new r(), e.ClassUtils.regClass("laya.ui.Widget", r), 
    e.ClassUtils.regClass("Laya.Widget", r);
    class a extends e.Event {}
    a.SHOW_TIP = "showtip", a.HIDE_TIP = "hidetip", e.ILaya.regClass(a), e.ClassUtils.regClass("laya.ui.UIEvent", a), 
    e.ClassUtils.regClass("Laya.UIEvent", a);
    class l {
        static fillArray(t, e, s = null) {
            var i = t.concat();
            if (e) for (var h = e.split(","), r = 0, a = Math.min(i.length, h.length); r < a; r++) {
                var l = h[r];
                i[r] = "true" == l || "false" != l && l, null != s && (i[r] = s(l));
            }
            return i;
        }
        static toColor(t) {
            return e.Utils.toHexColor(t);
        }
        static gray(t, s = !0) {
            s ? l.addFilter(t, l.grayFilter) : l.clearFilter(t, e.ColorFilter);
        }
        static addFilter(t, e) {
            var s = t.filters || [];
            s.push(e), t.filters = s;
        }
        static clearFilter(t, e) {
            var s = t.filters;
            if (null != s && s.length > 0) {
                for (var i = s.length - 1; i > -1; i--) {
                    s[i] instanceof e && s.splice(i, 1);
                }
                t.filters = s;
            }
        }
        static _getReplaceStr(t) {
            return l.escapeSequence[t];
        }
        static adptString(t) {
            return t.replace(/\\(\w)/g, l._getReplaceStr);
        }
        static getBindFun(t) {
            l._funMap || (l._funMap = new e.WeakObject());
            var s = l._funMap.get(t);
            if (null == s) {
                var i = '"' + t + '"', h = "(function(data){if(data==null)return;with(data){try{\nreturn " + (i = i.replace(/^"\${|}"$/g, "").replace(/\${/g, '"+').replace(/}/g, '+"')) + "\n}catch(e){}}})";
                s = window.Laya._runScript(h), l._funMap.set(t, s);
            }
            return s;
        }
    }
    l.grayFilter = new e.ColorFilter([ .3086, .6094, .082, 0, 0, .3086, .6094, .082, 0, 0, .3086, .6094, .082, 0, 0, 0, 0, 0, 1, 0 ]), 
    l.escapeSequence = {
        "\\n": "\n",
        "\\t": "\t"
    }, l._funMap = null, e.ClassUtils.regClass("laya.ui.UIUtils", l), e.ClassUtils.regClass("Laya.UIUtils", l);
    class n extends e.Sprite {
        constructor(t = !0) {
            super(), this._anchorX = NaN, this._anchorY = NaN, this._widget = r.EMPTY, t && (this.preinitialize(), 
            this.createChildren(), this.initialize());
        }
        destroy(t = !0) {
            super.destroy(t), this._dataSource = null, this._tag = null, this._toolTip = null;
        }
        preinitialize() {}
        createChildren() {}
        initialize() {}
        get width() {
            return this.get_width();
        }
        get_width() {
            return this._width ? this._width : this.measureWidth();
        }
        measureWidth() {
            var t = 0;
            this.commitMeasure();
            for (var e = this.numChildren - 1; e > -1; e--) {
                var s = this.getChildAt(e);
                s._visible && (t = Math.max(s._x + s.width * s.scaleX, t));
            }
            return t;
        }
        commitMeasure() {}
        get height() {
            return this.get_height();
        }
        get_height() {
            return this._height ? this._height : this.measureHeight();
        }
        measureHeight() {
            var t = 0;
            this.commitMeasure();
            for (var e = this.numChildren - 1; e > -1; e--) {
                var s = this.getChildAt(e);
                s._visible && (t = Math.max(s._y + s.height * s.scaleY, t));
            }
            return t;
        }
        get dataSource() {
            return this.get_dataSource();
        }
        get_dataSource() {
            return this._dataSource;
        }
        set dataSource(t) {
            this.set_dataSource(t);
        }
        set_dataSource(t) {
            for (var e in this._dataSource = t, this._dataSource) e in this && "function" != typeof this[e] && (this[e] = this._dataSource[e]);
        }
        get top() {
            return this.get_top();
        }
        get_top() {
            return this._widget.top;
        }
        set top(t) {
            this.set_top(t);
        }
        set_top(t) {
            t != this._widget.top && (this._getWidget().top = t);
        }
        get bottom() {
            return this.get_bottom();
        }
        get_bottom() {
            return this._widget.bottom;
        }
        set bottom(t) {
            this.set_bottom(t);
        }
        set_bottom(t) {
            t != this._widget.bottom && (this._getWidget().bottom = t);
        }
        get left() {
            return this._widget.left;
        }
        set left(t) {
            t != this._widget.left && (this._getWidget().left = t);
        }
        get right() {
            return this._widget.right;
        }
        set right(t) {
            t != this._widget.right && (this._getWidget().right = t);
        }
        get centerX() {
            return this._widget.centerX;
        }
        set centerX(t) {
            t != this._widget.centerX && (this._getWidget().centerX = t);
        }
        get centerY() {
            return this._widget.centerY;
        }
        set centerY(t) {
            t != this._widget.centerY && (this._getWidget().centerY = t);
        }
        _sizeChanged() {
            isNaN(this._anchorX) || (this.pivotX = this.anchorX * this.width), isNaN(this._anchorY) || (this.pivotY = this.anchorY * this.height), 
            this.event(e.Event.RESIZE), this._widget !== r.EMPTY && this._widget.resetLayout();
        }
        get tag() {
            return this._tag;
        }
        set tag(t) {
            this._tag = t;
        }
        get toolTip() {
            return this._toolTip;
        }
        set toolTip(t) {
            this._toolTip != t && (this._toolTip = t, null != t ? (this.on(e.Event.MOUSE_OVER, this, this.onMouseOver), 
            this.on(e.Event.MOUSE_OUT, this, this.onMouseOut)) : (this.off(e.Event.MOUSE_OVER, this, this.onMouseOver), 
            this.off(e.Event.MOUSE_OUT, this, this.onMouseOut)));
        }
        onMouseOver(t) {
            e.ILaya.stage.event(a.SHOW_TIP, this._toolTip);
        }
        onMouseOut(t) {
            e.ILaya.stage.event(a.HIDE_TIP, this._toolTip);
        }
        get gray() {
            return this._gray;
        }
        set gray(t) {
            t !== this._gray && (this._gray = t, l.gray(this, t));
        }
        get disabled() {
            return this._disabled;
        }
        set disabled(t) {
            t !== this._disabled && (this.gray = this._disabled = t, this.mouseEnabled = !t);
        }
        _getWidget() {
            return this._widget === r.EMPTY && (this._widget = this.addComponent(r)), this._widget;
        }
        set scaleX(t) {
            this.set_scaleX(t);
        }
        set_scaleX(t) {
            super.get_scaleX() != t && (super.set_scaleX(t), this.event(e.Event.RESIZE));
        }
        get scaleX() {
            return super.scaleX;
        }
        set scaleY(t) {
            this.set_scaleY(t);
        }
        set_scaleY(t) {
            super.get_scaleY() != t && (super.set_scaleY(t), this.event(e.Event.RESIZE));
        }
        get scaleY() {
            return super.scaleY;
        }
        onCompResize() {
            this._sizeChanged();
        }
        set width(t) {
            this.set_width(t);
        }
        set_width(t) {
            super.get_width() != t && (super.set_width(t), this.callLater(this._sizeChanged));
        }
        set height(t) {
            this.set_height(t);
        }
        set_height(t) {
            super.get_height() != t && (super.set_height(t), this.callLater(this._sizeChanged));
        }
        get anchorX() {
            return this.get_anchorX();
        }
        get_anchorX() {
            return this._anchorX;
        }
        set anchorX(t) {
            this.set_anchorX(t);
        }
        set_anchorX(t) {
            this._anchorX != t && (this._anchorX = t, this.callLater(this._sizeChanged));
        }
        get anchorY() {
            return this.get_anchorY();
        }
        get_anchorY() {
            return this._anchorY;
        }
        set anchorY(t) {
            this.set_anchorY(t);
        }
        set_anchorY(t) {
            this._anchorY != t && (this._anchorY = t, this.callLater(this._sizeChanged));
        }
        _childChanged(t = null) {
            this.callLater(this._sizeChanged), super._childChanged(t);
        }
    }
    e.ILaya.regClass(n), e.ClassUtils.regClass("laya.ui.UIComponent", n), e.ClassUtils.regClass("Laya.UIComponent", n);
    class o extends n {
        constructor(t = null) {
            super(), this.skin = t;
        }
        destroy(t = !0) {
            super.destroy(t), this._bitmap && this._bitmap.destroy(), this._bitmap = null;
        }
        dispose() {
            this.destroy(!0), e.ILaya.loader.clearRes(this._skin);
        }
        createChildren() {
            this.graphics = this._bitmap = new h(), this._bitmap.autoCacheCmd = !1;
        }
        get skin() {
            return this._skin;
        }
        set skin(t) {
            if (this._skin != t) if (this._skin = t, t) {
                var s = e.Loader.getRes(t);
                s ? (this.source = s, this.onCompResize()) : e.ILaya.loader.load(this._skin, e.Handler.create(this, this.setSource, [ this._skin ]), null, e.Loader.IMAGE, 1, !0, this._group);
            } else this.source = null;
        }
        get source() {
            return this._bitmap.source;
        }
        set source(t) {
            this._bitmap && (this._bitmap.source = t, this.event(e.Event.LOADED), this.repaint());
        }
        get group() {
            return this._group;
        }
        set group(t) {
            t && this._skin && e.Loader.setGroup(this._skin, t), this._group = t;
        }
        setSource(t, e = null) {
            t === this._skin && e && (this.source = e, this.onCompResize());
        }
        measureWidth() {
            return this._bitmap.width;
        }
        measureHeight() {
            return this._bitmap.height;
        }
        set width(t) {
            super.width = t, this._bitmap.width = 0 == t ? 1e-7 : t;
        }
        get width() {
            return super.width;
        }
        set height(t) {
            super.height = t, this._bitmap.height = 0 == t ? 1e-7 : t;
        }
        get height() {
            return super.height;
        }
        get sizeGrid() {
            return this._bitmap.sizeGrid ? this._bitmap.sizeGrid.join(",") : null;
        }
        set sizeGrid(t) {
            this._bitmap.sizeGrid = l.fillArray(i.defaultSizeGrid, t, Number);
        }
        set dataSource(t) {
            this._dataSource = t, "string" == typeof t ? this.skin = t : super.dataSource = t;
        }
        get dataSource() {
            return super.dataSource;
        }
    }
    e.ILaya.regClass(o), e.ClassUtils.regClass("laya.ui.Image", o), e.ClassUtils.regClass("Laya.Image", o);
    class _ extends o {
        constructor(t = null) {
            super(), this.advsListArr = [], this.resUrl = "https://unioncdn.layabox.com/config/iconlist.json", 
            this._http = new e.Browser.window.XMLHttpRequest(), this._data = [], this._resquestTime = 36e4, 
            this._playIndex = 0, this._lunboTime = 5e3, this.skin = t, this.setLoadUrl(), this.init(), 
            this.size(120, 120);
        }
        setLoadUrl() {}
        init() {
            this.isSupportJump() ? ((e.Browser.onMiniGame || e.Browser.onBDMiniGame) && e.ILaya.timer.loop(this._resquestTime, this, this.onGetAdvsListData), 
            this.onGetAdvsListData(), this.initEvent()) : this.visible = !1;
        }
        initEvent() {
            this.on(e.Event.CLICK, this, this.onAdvsImgClick);
        }
        onAdvsImgClick() {
            this.getCurrentAppidObj() && this.jumptoGame();
        }
        revertAdvsData() {
            this.advsListArr[this._playIndex] && (this.visible = !0, this.skin = this.advsListArr[this._playIndex]);
        }
        isSupportJump() {
            return e.Browser.onMiniGame ? window.wx.navigateToMiniProgram instanceof Function : !!e.Browser.onBDMiniGame;
        }
        jumptoGame() {
            var t = this.advsListArr[this._playIndex];
            parseInt(t.gameid), t.extendInfo, t.path;
            e.Browser.onMiniGame ? this.isSupportJump() && window.wx.navigateToMiniProgram({
                appId: this._appid,
                path: "",
                extraData: "",
                envVersion: "release",
                success: function() {
                    console.log("-------------跳转成功--------------");
                },
                fail: function() {
                    console.log("-------------跳转失败--------------");
                },
                complete: function() {
                    console.log("-------------跳转接口调用成功--------------"), this.updateAdvsInfo();
                }.bind(this)
            }) : e.Browser.onBDMiniGame || (this.visible = !1);
        }
        updateAdvsInfo() {
            this.visible = !1, this.onLunbo(), e.ILaya.timer.loop(this._lunboTime, this, this.onLunbo);
        }
        onLunbo() {
            this._playIndex >= this.advsListArr.length - 1 ? this._playIndex = 0 : this._playIndex += 1, 
            this.visible = !0, this.revertAdvsData();
        }
        getCurrentAppidObj() {
            return this.advsListArr[this._playIndex];
        }
        onGetAdvsListData() {
            var t = this, e = _.randRange(1e4, 1e6), s = this.resUrl + "?" + e;
            this._http.open("get", s, !0), this._http.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"), 
            this._http.responseType = "text", this._http.onerror = function(e) {
                t._onError(e);
            }, this._http.onload = function(e) {
                t._onLoad(e);
            }, this._http.send(null);
        }
        static randRange(t, e) {
            return Math.floor(Math.random() * (e - t + 1)) + t;
        }
        _onError(t) {
            this.error("Request failed Status:" + this._http.status + " text:" + this._http.statusText);
        }
        _onLoad(t) {
            var e = this._http, s = void 0 !== e.status ? e.status : 200;
            200 === s || 204 === s || 0 === s ? this.complete() : this.error("[" + e.status + "]" + e.statusText + ":" + e.responseURL);
        }
        error(t) {
            this.event(e.Event.ERROR, t);
        }
        complete() {
            try {
                this._data = this._http.response || this._http.responseText, this._data = JSON.parse(this._data), 
                this.advsListArr = this._data.list, this._appid = this._data.appid, this.updateAdvsInfo(), 
                this.revertAdvsData();
            } catch (t) {
                this.error(t.message);
            }
        }
        getAdvsQArr(t) {
            var s = [], i = e.LocalStorage.getJSON("gameObj");
            for (var h in t) {
                var r = t[h];
                i && i[r.gameid] && !r.isQiangZhi || s.push(r);
            }
            return s;
        }
        clear() {
            var t = this._http;
            t.onerror = t.onabort = t.onprogress = t.onload = null;
        }
        destroy(t = !0) {
            e.ILaya.timer.clear(this, this.onLunbo), super.destroy(!0), this.clear(), e.ILaya.timer.clear(this, this.onGetAdvsListData);
        }
    }
    e.ClassUtils.regClass("laya.ui.AdvImage", _), e.ClassUtils.regClass("Laya.AdvImage", _);
    class c extends n {
        set dataSource(t) {
            for (var e in this._dataSource = t, t) {
                var s = this.getChildByName(e);
                s ? s.dataSource = t[e] : e in this && !(this[e] instanceof Function) && (this[e] = t[e]);
            }
        }
        get dataSource() {
            return super.dataSource;
        }
        get bgColor() {
            return this._bgColor;
        }
        set bgColor(t) {
            this._bgColor = t, t ? (this._onResize(null), this.on(e.Event.RESIZE, this, this._onResize)) : (this.graphics.clear(), 
            this.off(e.Event.RESIZE, this, this._onResize));
        }
        _onResize(t) {
            this.graphics.clear(), this.graphics.drawRect(0, 0, this.width, this.height, this._bgColor);
        }
    }
    e.ILaya.regClass(c), e.ClassUtils.regClass("laya.ui.Box", c), e.ClassUtils.regClass("Laya.Box", c);
    class d extends n {
        constructor(t = null, e = "") {
            super(), this._labelColors = i.buttonLabelColors, this._state = 0, this._autoSize = !0, 
            this._stateNum = i.buttonStateNum, this._stateChanged = !1, this.skin = t, this.label = e;
        }
        destroy(t = !0) {
            super.destroy(t), this._bitmap && this._bitmap.destroy(), this._text && this._text.destroy(t), 
            this._bitmap = null, this._text = null, this._clickHandler = null, this._labelColors = this._sources = this._strokeColors = null;
        }
        createChildren() {
            this.graphics = this._bitmap = new h();
        }
        createText() {
            this._text || (this._text = new e.Text(), this._text.overflow = e.Text.HIDDEN, this._text.align = "center", 
            this._text.valign = "middle", this._text.width = this._width, this._text.height = this._height);
        }
        initialize() {
            1 !== this._mouseState && (this.mouseEnabled = !0, this._setBit(e.Const.HAS_MOUSE, !0)), 
            this._createListener(e.Event.MOUSE_OVER, this, this.onMouse, null, !1, !1), this._createListener(e.Event.MOUSE_OUT, this, this.onMouse, null, !1, !1), 
            this._createListener(e.Event.MOUSE_DOWN, this, this.onMouse, null, !1, !1), this._createListener(e.Event.MOUSE_UP, this, this.onMouse, null, !1, !1), 
            this._createListener(e.Event.CLICK, this, this.onMouse, null, !1, !1);
        }
        onMouse(t) {
            if (!1 !== this.toggle || !this._selected) return t.type === e.Event.CLICK ? (this.toggle && (this.selected = !this._selected), 
            void (this._clickHandler && this._clickHandler.run())) : void (!this._selected && (this.state = d.stateMap[t.type]));
        }
        get skin() {
            return this._skin;
        }
        set skin(t) {
            this._skin != t && (this._skin = t, t ? e.Loader.getRes(t) ? this._skinLoaded() : e.ILaya.loader.load(this._skin, e.Handler.create(this, this._skinLoaded), null, e.Loader.IMAGE, 1) : this._skinLoaded());
        }
        _skinLoaded() {
            this.callLater(this.changeClips), this._setStateChanged(), this._sizeChanged(), 
            this.event(e.Event.LOADED);
        }
        get stateNum() {
            return this._stateNum;
        }
        set stateNum(t) {
            "string" == typeof t && (t = parseInt(t)), this._stateNum != t && (this._stateNum = t < 1 ? 1 : t > 3 ? 3 : t, 
            this.callLater(this.changeClips));
        }
        changeClips() {
            var t = e.Loader.getRes(this._skin);
            if (t) {
                var s = t.sourceWidth, i = t.sourceHeight / this._stateNum;
                t.$_GID || (t.$_GID = e.Utils.getGID());
                var h = t.$_GID + "-" + this._stateNum, r = e.WeakObject.I.get(h);
                if (e.Utils.isOkTextureList(r) || (r = null), r) this._sources = r; else {
                    if (this._sources = [], 1 === this._stateNum) this._sources.push(t); else for (var a = 0; a < this._stateNum; a++) this._sources.push(e.Texture.createFromTexture(t, 0, i * a, s, i));
                    e.WeakObject.I.set(h, this._sources);
                }
                this._autoSize ? (this._bitmap.width = this._width || s, this._bitmap.height = this._height || i, 
                this._text && (this._text.width = this._bitmap.width, this._text.height = this._bitmap.height)) : this._text && (this._text.x = s);
            } else console.log("lose skin", this._skin);
        }
        measureWidth() {
            return this.runCallLater(this.changeClips), this._autoSize ? this._bitmap.width : (this.runCallLater(this.changeState), 
            this._bitmap.width + (this._text ? this._text.width : 0));
        }
        measureHeight() {
            return this.runCallLater(this.changeClips), this._text ? Math.max(this._bitmap.height, this._text.height) : this._bitmap.height;
        }
        get label() {
            return this._text ? this._text.text : null;
        }
        set label(t) {
            (this._text || t) && (this.createText(), this._text.text != t && (t && !this._text.parent && this.addChild(this._text), 
            this._text.text = (t + "").replace(/\\n/g, "\n"), this._setStateChanged()));
        }
        get selected() {
            return this._selected;
        }
        set selected(t) {
            this._selected != t && (this._selected = t, this.state = this._selected ? 2 : 0, 
            this.event(e.Event.CHANGE));
        }
        get state() {
            return this._state;
        }
        set state(t) {
            this._state != t && (this._state = t, this._setStateChanged());
        }
        changeState() {
            this._stateChanged = !1, this.runCallLater(this.changeClips);
            var t = this._state < this._stateNum ? this._state : this._stateNum - 1;
            this._sources && (this._bitmap.source = this._sources[t]), this.label && (this._text.color = this._labelColors[t], 
            this._strokeColors && (this._text.strokeColor = this._strokeColors[t]));
        }
        get labelColors() {
            return this._labelColors.join(",");
        }
        set labelColors(t) {
            this._labelColors = l.fillArray(i.buttonLabelColors, t, String), this._setStateChanged();
        }
        get strokeColors() {
            return this._strokeColors ? this._strokeColors.join(",") : "";
        }
        set strokeColors(t) {
            this._strokeColors = l.fillArray(i.buttonLabelColors, t, String), this._setStateChanged();
        }
        get labelPadding() {
            return this.createText(), this._text.padding.join(",");
        }
        set labelPadding(t) {
            this.createText(), this._text.padding = l.fillArray(i.labelPadding, t, Number);
        }
        get labelSize() {
            return this.createText(), this._text.fontSize;
        }
        set labelSize(t) {
            this.createText(), this._text.fontSize = t;
        }
        get labelStroke() {
            return this.createText(), this._text.stroke;
        }
        set labelStroke(t) {
            this.createText(), this._text.stroke = t;
        }
        get labelStrokeColor() {
            return this.createText(), this._text.strokeColor;
        }
        set labelStrokeColor(t) {
            this.createText(), this._text.strokeColor = t;
        }
        get labelBold() {
            return this.createText(), this._text.bold;
        }
        set labelBold(t) {
            this.createText(), this._text.bold = t;
        }
        get labelFont() {
            return this.createText(), this._text.font;
        }
        set labelFont(t) {
            this.createText(), this._text.font = t;
        }
        get labelAlign() {
            return this.createText(), this._text.align;
        }
        set labelAlign(t) {
            this.createText(), this._text.align = t;
        }
        get clickHandler() {
            return this._clickHandler;
        }
        set clickHandler(t) {
            this._clickHandler = t;
        }
        get text() {
            return this.createText(), this._text;
        }
        get sizeGrid() {
            return this._bitmap.sizeGrid ? this._bitmap.sizeGrid.join(",") : null;
        }
        set sizeGrid(t) {
            this._bitmap.sizeGrid = l.fillArray(i.defaultSizeGrid, t, Number);
        }
        set width(t) {
            super.set_width(t), this._autoSize && (this._bitmap.width = t, this._text && (this._text.width = t));
        }
        get width() {
            return super.get_width();
        }
        set height(t) {
            super.set_height(t), this._autoSize && (this._bitmap.height = t, this._text && (this._text.height = t));
        }
        get height() {
            return super.get_height();
        }
        set dataSource(t) {
            this._dataSource = t, "number" == typeof t || "string" == typeof t ? this.label = t + "" : super.set_dataSource(t);
        }
        get dataSource() {
            return super.get_dataSource();
        }
        get iconOffset() {
            return this._bitmap._offset ? this._bitmap._offset.join(",") : null;
        }
        set iconOffset(t) {
            this._bitmap._offset = t ? l.fillArray([ 1, 1 ], t, Number) : [];
        }
        _setStateChanged() {
            this._stateChanged || (this._stateChanged = !0, this.callLater(this.changeState));
        }
    }
    d.stateMap = {
        mouseup: 0,
        mouseover: 1,
        mousedown: 2,
        mouseout: 0
    }, e.ILaya.regClass(d), e.ClassUtils.regClass("laya.ui.Button", d), e.ClassUtils.regClass("Laya.Button", d);
    class u extends d {
        constructor(t = null, e = "") {
            super(t, e), this.toggle = !0, this._autoSize = !1;
        }
        preinitialize() {
            super.preinitialize(), this.toggle = !0, this._autoSize = !1;
        }
        initialize() {
            super.initialize(), this.createText(), this._text.align = "left", this._text.valign = "top", 
            this._text.width = 0;
        }
        set dataSource(t) {
            this._dataSource = t, t instanceof Boolean ? this.selected = t : "string" == typeof t ? this.selected = "true" === t : super.dataSource = t;
        }
        get dataSource() {
            return super.dataSource;
        }
    }
    e.ILaya.regClass(u), e.ClassUtils.regClass("laya.ui.CheckBox", u), e.ClassUtils.regClass("Laya.CheckBox", u);
    class g extends n {
        constructor(t = null, e = 1, s = 1) {
            super(), this._clipX = 1, this._clipY = 1, this._clipWidth = 0, this._clipHeight = 0, 
            this._interval = 50, this._index = 0, this._toIndex = -1, this._clipX = e, this._clipY = s, 
            this.skin = t;
        }
        destroy(t = !0) {
            super.destroy(!0), this._bitmap && this._bitmap.destroy(), this._bitmap = null, 
            this._sources = null;
        }
        dispose() {
            this.destroy(!0), e.ILaya.loader.clearRes(this._skin);
        }
        createChildren() {
            this.graphics = this._bitmap = new h();
        }
        _onDisplay(t) {
            this._isPlaying ? this._getBit(e.Const.DISPLAYED_INSTAGE) ? this.play() : this.stop() : this._autoPlay && this.play();
        }
        get skin() {
            return this._skin;
        }
        set skin(t) {
            this._skin != t && (this._skin = t, t ? e.Loader.getRes(t) ? this._skinLoaded() : e.ILaya.loader.load(this._skin, e.Handler.create(this, this._skinLoaded), null, e.Loader.IMAGE, 1) : this._bitmap.source = null);
        }
        _skinLoaded() {
            this._setClipChanged(), this._sizeChanged(), this.event(e.Event.LOADED);
        }
        get clipX() {
            return this._clipX;
        }
        set clipX(t) {
            this._clipX = t || 1, this._setClipChanged();
        }
        get clipY() {
            return this._clipY;
        }
        set clipY(t) {
            this._clipY = t || 1, this._setClipChanged();
        }
        get clipWidth() {
            return this._clipWidth;
        }
        set clipWidth(t) {
            this._clipWidth = t, this._setClipChanged();
        }
        get clipHeight() {
            return this._clipHeight;
        }
        set clipHeight(t) {
            this._clipHeight = t, this._setClipChanged();
        }
        changeClip() {
            if (this._clipChanged = !1, this._skin) {
                var t = e.Loader.getRes(this._skin);
                t ? this.loadComplete(this._skin, t) : e.ILaya.loader.load(this._skin, e.Handler.create(this, this.loadComplete, [ this._skin ]));
            }
        }
        loadComplete(t, s) {
            if (t === this._skin && s) {
                var i = this._clipWidth || Math.ceil(s.sourceWidth / this._clipX), h = this._clipHeight || Math.ceil(s.sourceHeight / this._clipY), r = this._skin + i + h, a = e.WeakObject.I.get(r);
                if (e.Utils.isOkTextureList(a) || (a = null), a) this._sources = a; else {
                    this._sources = [];
                    for (var l = 0; l < this._clipY; l++) for (var n = 0; n < this._clipX; n++) this._sources.push(e.Texture.createFromTexture(s, i * n, h * l, i, h));
                    e.WeakObject.I.set(r, this._sources);
                }
                this.index = this._index, this.event(e.Event.LOADED), this.onCompResize();
            }
        }
        get sources() {
            return this._sources;
        }
        set sources(t) {
            this._sources = t, this.index = this._index, this.event(e.Event.LOADED);
        }
        get group() {
            return this._group;
        }
        set group(t) {
            t && this._skin && e.Loader.setGroup(this._skin, t), this._group = t;
        }
        set width(t) {
            super.width = t, this._bitmap.width = t;
        }
        get width() {
            return super.width;
        }
        set height(t) {
            super.height = t, this._bitmap.height = t;
        }
        get height() {
            return super.height;
        }
        measureWidth() {
            return this.runCallLater(this.changeClip), this._bitmap.width;
        }
        measureHeight() {
            return this.runCallLater(this.changeClip), this._bitmap.height;
        }
        get sizeGrid() {
            return this._bitmap.sizeGrid ? this._bitmap.sizeGrid.join(",") : null;
        }
        set sizeGrid(t) {
            this._bitmap.sizeGrid = l.fillArray(i.defaultSizeGrid, t, Number);
        }
        get index() {
            return this._index;
        }
        set index(t) {
            this._index = t, this._bitmap && this._sources && (this._bitmap.source = this._sources[t]), 
            this.event(e.Event.CHANGE);
        }
        get total() {
            return this.runCallLater(this.changeClip), this._sources ? this._sources.length : 0;
        }
        get autoPlay() {
            return this._autoPlay;
        }
        set autoPlay(t) {
            this._autoPlay != t && (this._autoPlay = t, t ? this.play() : this.stop());
        }
        get interval() {
            return this._interval;
        }
        set interval(t) {
            this._interval != t && (this._interval = t, this._isPlaying && this.play());
        }
        get isPlaying() {
            return this._isPlaying;
        }
        set isPlaying(t) {
            this._isPlaying = t;
        }
        play(t = 0, s = -1) {
            this._isPlaying = !0, this.index = t, this._toIndex = s, this._index++, e.ILaya.timer.loop(this.interval, this, this._loop), 
            this.on(e.Event.DISPLAY, this, this._onDisplay), this.on(e.Event.UNDISPLAY, this, this._onDisplay);
        }
        _loop() {
            this._visible && this._sources && (this._index++, this._toIndex > -1 && this._index >= this._toIndex ? this.stop() : this._index >= this._sources.length && (this._index = 0), 
            this.index = this._index);
        }
        stop() {
            this._isPlaying = !1, e.ILaya.timer.clear(this, this._loop), this.event(e.Event.COMPLETE);
        }
        set dataSource(t) {
            this._dataSource = t, "number" == typeof t || "string" == typeof t ? this.index = parseInt(t) : super.dataSource = t;
        }
        get dataSource() {
            return super.dataSource;
        }
        get bitmap() {
            return this._bitmap;
        }
        _setClipChanged() {
            this._clipChanged || (this._clipChanged = !0, this.callLater(this.changeClip));
        }
    }
    e.ILaya.regClass(g), e.ClassUtils.regClass("laya.ui.Clip", g), e.ClassUtils.regClass("Laya.Clip", g);
    class p extends n {
        constructor(t = !0) {
            super(!1), this._gridSize = 11, this._bgColor = "#ffffff", this._borderColor = "#000000", 
            this._inputColor = "#000000", this._inputBgColor = "#efefef", this._colors = [], 
            this._selectedColor = "#000000", t && (this.preinitialize(), this.createChildren(), 
            this.initialize());
        }
        destroy(t = !0) {
            e.ILaya.stage.off(e.Event.MOUSE_DOWN, this, this.removeColorBox), super.destroy(t), 
            this._colorPanel && this._colorPanel.destroy(t), this._colorButton && this._colorButton.destroy(t), 
            this._colorPanel = null, this._colorTiles = null, this._colorBlock = null, this._colorInput = null, 
            this._colorButton = null, this._colors = null, this.changeHandler = null;
        }
        createChildren() {
            this.addChild(this._colorButton = new d()), this._colorPanel = new c(), this._colorPanel.size(230, 166), 
            this._colorPanel.addChild(this._colorTiles = new e.Sprite()), this._colorPanel.addChild(this._colorBlock = new e.Sprite()), 
            this._colorPanel.addChild(this._colorInput = new e.Input());
        }
        initialize() {
            this._colorButton.on(e.Event.CLICK, this, this.onColorButtonClick), this._colorBlock.pos(5, 5), 
            this._colorInput.pos(60, 5), this._colorInput.size(60, 20), this._colorInput.on(e.Event.CHANGE, this, this.onColorInputChange), 
            this._colorInput.on(e.Event.KEY_DOWN, this, this.onColorFieldKeyDown), this._colorTiles.pos(5, 30), 
            this._colorTiles.on(e.Event.MOUSE_MOVE, this, this.onColorTilesMouseMove), this._colorTiles.on(e.Event.CLICK, this, this.onColorTilesClick), 
            this._colorTiles.size(20 * this._gridSize, 12 * this._gridSize), this._colorPanel.on(e.Event.MOUSE_DOWN, this, this.onPanelMouseDown), 
            this.bgColor = this._bgColor;
        }
        onPanelMouseDown(t) {
            t.stopPropagation();
        }
        changePanel() {
            this._panelChanged = !1;
            var t = this._colorPanel.graphics;
            t.clear(!0), t.drawRect(0, 0, 230, 166, this._bgColor, this._borderColor), this.drawBlock(this._selectedColor), 
            this._colorInput.borderColor = this._borderColor, this._colorInput.bgColor = this._inputBgColor, 
            this._colorInput.color = this._inputColor, (t = this._colorTiles.graphics).clear(!0);
            for (var e = [ 0, 3355443, 6710886, 10066329, 13421772, 16777215, 16711680, 65280, 255, 16776960, 65535, 16711935 ], s = 0; s < 12; s++) for (var i = 0; i < 20; i++) {
                var h;
                h = 0 === i ? e[s] : 1 === i ? 0 : 51 * (((3 * s + i / 6) % 3 << 0) + 3 * (s / 6 << 0)) << 16 | i % 6 * 51 << 8 | (s << 0) % 6 * 51;
                var r = l.toColor(h);
                this._colors.push(r);
                var a = i * this._gridSize, n = s * this._gridSize;
                t.drawRect(a, n, this._gridSize, this._gridSize, r, "#000000");
            }
        }
        onColorButtonClick(t) {
            this._colorPanel.parent ? this.close() : this.open();
        }
        open() {
            let t = e.ILaya.stage;
            var s = this.localToGlobal(new e.Point()), i = s.x + this._colorPanel.width <= t.width ? s.x : t.width - this._colorPanel.width, h = s.y + this._colorButton.height;
            h = h + this._colorPanel.height <= t.height ? h : s.y - this._colorPanel.height, 
            this._colorPanel.pos(i, h), this._colorPanel.zOrder = 1001, t.addChild(this._colorPanel), 
            t.on(e.Event.MOUSE_DOWN, this, this.removeColorBox);
        }
        close() {
            e.ILaya.stage.off(e.Event.MOUSE_DOWN, this, this.removeColorBox), this._colorPanel.removeSelf();
        }
        removeColorBox(t = null) {
            this.close();
        }
        onColorFieldKeyDown(t) {
            13 == t.keyCode && (this._colorInput.text ? this.selectedColor = this._colorInput.text : this.selectedColor = null, 
            this.close(), t.stopPropagation());
        }
        onColorInputChange(t = null) {
            this._colorInput.text ? this.drawBlock(this._colorInput.text) : this.drawBlock("#FFFFFF");
        }
        onColorTilesClick(t) {
            this.selectedColor = this.getColorByMouse(), this.close();
        }
        onColorTilesMouseMove(t) {
            this._colorInput.focus = !1;
            var e = this.getColorByMouse();
            this._colorInput.text = e, this.drawBlock(e);
        }
        getColorByMouse() {
            var t = this._colorTiles.getMousePoint(), e = Math.floor(t.x / this._gridSize), s = Math.floor(t.y / this._gridSize);
            return this._colors[20 * s + e];
        }
        drawBlock(t) {
            var e = this._colorBlock.graphics;
            e.clear(!0);
            var s = t || "#ffffff";
            e.drawRect(0, 0, 50, 20, s, this._borderColor), t || e.drawLine(0, 0, 50, 20, "#ff0000");
        }
        get selectedColor() {
            return this._selectedColor;
        }
        set selectedColor(t) {
            this._selectedColor != t && (this._selectedColor = this._colorInput.text = t, this.drawBlock(t), 
            this.changeColor(), this.changeHandler && this.changeHandler.runWith(this._selectedColor), 
            this.event(e.Event.CHANGE, e.Event.EMPTY.setTo(e.Event.CHANGE, this, this)));
        }
        get skin() {
            return this._colorButton.skin;
        }
        set skin(t) {
            this._colorButton.once(e.Event.LOADED, this, this.changeColor), this._colorButton.skin = t;
        }
        changeColor() {
            var t = this.graphics;
            t.clear(!0);
            var e = this._selectedColor || "#000000";
            t.drawRect(0, 0, this._colorButton.width, this._colorButton.height, e);
        }
        get bgColor() {
            return this._bgColor;
        }
        set bgColor(t) {
            this._bgColor = t, this._setPanelChanged();
        }
        get borderColor() {
            return this._borderColor;
        }
        set borderColor(t) {
            this._borderColor = t, this._setPanelChanged();
        }
        get inputColor() {
            return this._inputColor;
        }
        set inputColor(t) {
            this._inputColor = t, this._setPanelChanged();
        }
        get inputBgColor() {
            return this._inputBgColor;
        }
        set inputBgColor(t) {
            this._inputBgColor = t, this._setPanelChanged();
        }
        _setPanelChanged() {
            this._panelChanged || (this._panelChanged = !0, this.callLater(this.changePanel));
        }
    }
    e.ILaya.regClass(p), e.ClassUtils.regClass("laya.ui.ColorPicker", p), e.ClassUtils.regClass("Laya.ColorPicker", p);
    class C extends n {
        constructor(t = "") {
            super(), this.text = t;
        }
        destroy(t = !0) {
            super.destroy(t), this._tf = null;
        }
        createChildren() {
            this.addChild(this._tf = new e.Text());
        }
        get text() {
            return this._tf.text;
        }
        set text(t) {
            this._tf.text != t && (t && (t = l.adptString(t + "")), this._tf.text = t, this.event(e.Event.CHANGE), 
            this._width && this._height || this.onCompResize());
        }
        changeText(t) {
            this._tf.changeText(t);
        }
        get wordWrap() {
            return this._tf.wordWrap;
        }
        set wordWrap(t) {
            this._tf.wordWrap = t;
        }
        get color() {
            return this._tf.color;
        }
        set color(t) {
            this._tf.color = t;
        }
        get font() {
            return this._tf.font;
        }
        set font(t) {
            this._tf.font = t;
        }
        get align() {
            return this._tf.align;
        }
        set align(t) {
            this._tf.align = t;
        }
        get valign() {
            return this._tf.valign;
        }
        set valign(t) {
            this._tf.valign = t;
        }
        get bold() {
            return this._tf.bold;
        }
        set bold(t) {
            this._tf.bold = t;
        }
        get italic() {
            return this._tf.italic;
        }
        set italic(t) {
            this._tf.italic = t;
        }
        get leading() {
            return this._tf.leading;
        }
        set leading(t) {
            this._tf.leading = t;
        }
        get fontSize() {
            return this._tf.fontSize;
        }
        set fontSize(t) {
            this._tf.fontSize = t;
        }
        get padding() {
            return this._tf.padding.join(",");
        }
        set padding(t) {
            this._tf.padding = l.fillArray(i.labelPadding, t, Number);
        }
        get bgColor() {
            return this._tf.bgColor;
        }
        set bgColor(t) {
            this._tf.bgColor = t;
        }
        get borderColor() {
            return this._tf.borderColor;
        }
        set borderColor(t) {
            this._tf.borderColor = t;
        }
        get stroke() {
            return this._tf.stroke;
        }
        set stroke(t) {
            this._tf.stroke = t;
        }
        get strokeColor() {
            return this._tf.strokeColor;
        }
        set strokeColor(t) {
            this._tf.strokeColor = t;
        }
        get textField() {
            return this._tf;
        }
        measureWidth() {
            return this._tf.width;
        }
        measureHeight() {
            return this._tf.height;
        }
        get width() {
            return this._width || this._tf.text ? super.width : 0;
        }
        set width(t) {
            super.width = t, this._tf.width = t;
        }
        get height() {
            return this._height || this._tf.text ? super.height : 0;
        }
        set height(t) {
            super.height = t, this._tf.height = t;
        }
        set dataSource(t) {
            this._dataSource = t, "number" == typeof t || "string" == typeof t ? this.text = t + "" : super.dataSource = t;
        }
        get dataSource() {
            return super.dataSource;
        }
        get overflow() {
            return this._tf.overflow;
        }
        set overflow(t) {
            this._tf.overflow = t;
        }
        get underline() {
            return this._tf.underline;
        }
        set underline(t) {
            this._tf.underline = t;
        }
        get underlineColor() {
            return this._tf.underlineColor;
        }
        set underlineColor(t) {
            this._tf.underlineColor = t;
        }
    }
    e.ILaya.regClass(C), e.ClassUtils.regClass("laya.ui.Label", C), e.ClassUtils.regClass("Laya.Label", C);
    class m extends n {
        constructor(t = null) {
            super(), this.isVertical = !0, this.showLabel = !0, this._max = 100, this._min = 0, 
            this._tick = 1, this._value = 0, m.label || (m.label = new C()), this.skin = t;
        }
        destroy(t = !0) {
            super.destroy(t), this._bg && this._bg.destroy(t), this._bar && this._bar.destroy(t), 
            this._progress && this._progress.destroy(t), this._bg = null, this._bar = null, 
            this._progress = null, this.changeHandler = null;
        }
        createChildren() {
            this.addChild(this._bg = new o()), this.addChild(this._bar = new d());
        }
        initialize() {
            this._bar.on(e.Event.MOUSE_DOWN, this, this.onBarMouseDown), this._bg.sizeGrid = this._bar.sizeGrid = "4,4,4,4,0", 
            this._progress && (this._progress.sizeGrid = this._bar.sizeGrid), this.allowClickBack = !0;
        }
        onBarMouseDown(t) {
            var s = e.ILaya;
            this._globalSacle || (this._globalSacle = new e.Point()), this._globalSacle.setTo(this.globalScaleX || .01, this.globalScaleY || .01), 
            this._maxMove = this.isVertical ? this.height - this._bar.height : this.width - this._bar.width, 
            this._tx = s.stage.mouseX, this._ty = s.stage.mouseY, s.stage.on(e.Event.MOUSE_MOVE, this, this.mouseMove), 
            s.stage.once(e.Event.MOUSE_UP, this, this.mouseUp), s.stage.once(e.Event.MOUSE_OUT, this, this.mouseUp), 
            this.showValueText();
        }
        showValueText() {
            if (this.showLabel) {
                var t = m.label;
                this.addChild(t), t.textField.changeText(this._value + ""), this.isVertical ? (t.x = this._bar._x + 20, 
                t.y = .5 * (this._bar.height - t.height) + this._bar._y) : (t.y = this._bar._y - 20, 
                t.x = .5 * (this._bar.width - t.width) + this._bar._x);
            }
        }
        hideValueText() {
            m.label && m.label.removeSelf();
        }
        mouseUp(t) {
            let s = e.ILaya.stage;
            s.off(e.Event.MOUSE_MOVE, this, this.mouseMove), s.off(e.Event.MOUSE_UP, this, this.mouseUp), 
            s.off(e.Event.MOUSE_OUT, this, this.mouseUp), this.sendChangeEvent(e.Event.CHANGED), 
            this.hideValueText();
        }
        mouseMove(t) {
            let s = e.ILaya.stage;
            var i = this._value;
            if (this.isVertical ? (this._bar.y += (s.mouseY - this._ty) / this._globalSacle.y, 
            this._bar._y > this._maxMove ? this._bar.y = this._maxMove : this._bar._y < 0 && (this._bar.y = 0), 
            this._value = this._bar._y / this._maxMove * (this._max - this._min) + this._min, 
            this._progress && (this._progress.height = this._bar._y + .5 * this._bar.height)) : (this._bar.x += (s.mouseX - this._tx) / this._globalSacle.x, 
            this._bar._x > this._maxMove ? this._bar.x = this._maxMove : this._bar._x < 0 && (this._bar.x = 0), 
            this._value = this._bar._x / this._maxMove * (this._max - this._min) + this._min, 
            this._progress && (this._progress.width = this._bar._x + .5 * this._bar.width)), 
            this._tx = s.mouseX, this._ty = s.mouseY, 0 != this._tick) {
                var h = Math.pow(10, (this._tick + "").length - 1);
                this._value = Math.round(Math.round(this._value / this._tick) * this._tick * h) / h;
            }
            this._value != i && this.sendChangeEvent(), this.showValueText();
        }
        sendChangeEvent(t = e.Event.CHANGE) {
            this.event(t), this.changeHandler && this.changeHandler.runWith(this._value);
        }
        get skin() {
            return this._skin;
        }
        set skin(t) {
            this._skin != t && (this._skin = t, this._skin && !e.Loader.getRes(this._skin) ? e.ILaya.loader.load([ this._skin, this._skin.replace(".png", "$bar.png") ], e.Handler.create(this, this._skinLoaded)) : this._skinLoaded());
        }
        _skinLoaded() {
            this._bg.skin = this._skin, this._bar.skin = this._skin.replace(".png", "$bar.png");
            var t = this._skin.replace(".png", "$progress.png");
            e.Loader.getRes(t) && (this._progress || (this.addChild(this._progress = new o()), 
            this._progress.sizeGrid = this._bar.sizeGrid, this.setChildIndex(this._progress, 1)), 
            this._progress.skin = t), this.setBarPoint(), this.callLater(this.changeValue), 
            this._sizeChanged(), this.event(e.Event.LOADED);
        }
        setBarPoint() {
            this.isVertical ? this._bar.x = Math.round(.5 * (this._bg.width - this._bar.width)) : this._bar.y = Math.round(.5 * (this._bg.height - this._bar.height));
        }
        measureWidth() {
            return Math.max(this._bg.width, this._bar.width);
        }
        measureHeight() {
            return Math.max(this._bg.height, this._bar.height);
        }
        _sizeChanged() {
            super._sizeChanged(), this.isVertical ? this._bg.height = this.height : this._bg.width = this.width, 
            this.setBarPoint(), this.changeValue();
        }
        get sizeGrid() {
            return this._bg.sizeGrid;
        }
        set sizeGrid(t) {
            this._bg.sizeGrid = t, this._bar.sizeGrid = t, this._progress && (this._progress.sizeGrid = this._bar.sizeGrid);
        }
        setSlider(t, e, s) {
            this._value = -1, this._min = t, this._max = e > t ? e : t, this.value = s < t ? t : s > e ? e : s;
        }
        get tick() {
            return this._tick;
        }
        set tick(t) {
            this._tick != t && (this._tick = t, this.callLater(this.changeValue));
        }
        changeValue() {
            if (0 != this.tick) {
                var t = Math.pow(10, (this._tick + "").length - 1);
                this._value = Math.round(Math.round(this._value / this._tick) * this._tick * t) / t;
            }
            this._value = this._value > this._max ? this._max : this._value < this._min ? this._min : this._value;
            var e = this._max - this._min;
            0 === e && (e = 1), this.isVertical ? (this._bar.y = (this._value - this._min) / e * (this.height - this._bar.height), 
            this._progress && (this._progress.height = this._bar._y + .5 * this._bar.height)) : (this._bar.x = (this._value - this._min) / e * (this.width - this._bar.width), 
            this._progress && (this._progress.width = this._bar._x + .5 * this._bar.width));
        }
        get max() {
            return this._max;
        }
        set max(t) {
            this._max != t && (this._max = t, this.callLater(this.changeValue));
        }
        get min() {
            return this._min;
        }
        set min(t) {
            this._min != t && (this._min = t, this.callLater(this.changeValue));
        }
        get value() {
            return this._value;
        }
        set value(t) {
            if (this._value != t) {
                var e = this._value;
                this._value = t, this.changeValue(), this._value != e && this.sendChangeEvent();
            }
        }
        get allowClickBack() {
            return this._allowClickBack;
        }
        set allowClickBack(t) {
            this._allowClickBack != t && (this._allowClickBack = t, t ? this._bg.on(e.Event.MOUSE_DOWN, this, this.onBgMouseDown) : this._bg.off(e.Event.MOUSE_DOWN, this, this.onBgMouseDown));
        }
        onBgMouseDown(t) {
            var e = this._bg.getMousePoint();
            this.isVertical ? this.value = e.y / (this.height - this._bar.height) * (this._max - this._min) + this._min : this.value = e.x / (this.width - this._bar.width) * (this._max - this._min) + this._min;
        }
        set dataSource(t) {
            this._dataSource = t, "number" == typeof t || "string" == typeof t ? this.value = Number(t) : super.dataSource = t;
        }
        get dataSource() {
            return super.dataSource;
        }
        get bar() {
            return this._bar;
        }
    }
    m.label = null, e.ILaya.regClass(m), e.ClassUtils.regClass("laya.ui.Slider", m), 
    e.ClassUtils.regClass("Laya.Slider", m);
    class v extends n {
        constructor(t = null) {
            super(), this.rollRatio = .97, this.scaleBar = !0, this.autoHide = !1, this.elasticDistance = 0, 
            this.elasticBackTime = 500, this._showButtons = s.showButtons, this._scrollSize = 1, 
            this._thumbPercent = 1, this._lastOffset = 0, this._checkElastic = !1, this._isElastic = !1, 
            this._hide = !1, this._clickOnly = !0, this._touchScrollEnable = s.touchScrollEnable, 
            this._mouseWheelEnable = s.mouseWheelEnable, this.skin = t, this.max = 1;
        }
        destroy(t = !0) {
            this.stopScroll(), this.target = null, super.destroy(t), this.upButton && this.upButton.destroy(t), 
            this.downButton && this.downButton.destroy(t), this.slider && this.slider.destroy(t), 
            this.upButton = this.downButton = null, this.slider = null, this.changeHandler = null, 
            this._offsets = null;
        }
        createChildren() {
            this.addChild(this.slider = new m()), this.addChild(this.upButton = new d()), this.addChild(this.downButton = new d());
        }
        initialize() {
            this.slider.showLabel = !1, this.slider.tick = 0, this.slider.on(e.Event.CHANGE, this, this.onSliderChange), 
            this.slider.setSlider(0, 0, 0), this.upButton.on(e.Event.MOUSE_DOWN, this, this.onButtonMouseDown), 
            this.downButton.on(e.Event.MOUSE_DOWN, this, this.onButtonMouseDown);
        }
        onSliderChange() {
            this._value != this.slider.value && (this.value = this.slider.value);
        }
        onButtonMouseDown(t) {
            var s = t.currentTarget === this.upButton;
            this.slide(s), e.ILaya.timer.once(i.scrollBarDelayTime, this, this.startLoop, [ s ]), 
            e.ILaya.stage.once(e.Event.MOUSE_UP, this, this.onStageMouseUp);
        }
        startLoop(t) {
            e.ILaya.timer.frameLoop(1, this, this.slide, [ t ]);
        }
        slide(t) {
            t ? this.value -= this._scrollSize : this.value += this._scrollSize;
        }
        onStageMouseUp(t) {
            e.ILaya.timer.clear(this, this.startLoop), e.ILaya.timer.clear(this, this.slide);
        }
        get skin() {
            return this._skin;
        }
        set skin(t) {
            " " != t && this._skin != t && (this._skin = t, this._skin && !e.Loader.getRes(this._skin) ? e.ILaya.loader.load([ this._skin, this._skin.replace(".png", "$up.png"), this._skin.replace(".png", "$down.png"), this._skin.replace(".png", "$bar.png") ], e.Handler.create(this, this._skinLoaded)) : this._skinLoaded());
        }
        _skinLoaded() {
            this.slider.skin = this._skin, this.callLater(this.changeScrollBar), this._sizeChanged(), 
            this.event(e.Event.LOADED);
        }
        changeScrollBar() {
            this.upButton.visible = this._showButtons, this.downButton.visible = this._showButtons, 
            this._showButtons && (this.upButton.skin = this._skin.replace(".png", "$up.png"), 
            this.downButton.skin = this._skin.replace(".png", "$down.png")), this.slider.isVertical ? this.slider.y = this._showButtons ? this.upButton.height : 0 : this.slider.x = this._showButtons ? this.upButton.width : 0, 
            this.resetPositions(), this.repaint();
        }
        _sizeChanged() {
            super._sizeChanged(), this.repaint(), this.resetPositions(), this.event(e.Event.CHANGE), 
            this.changeHandler && this.changeHandler.runWith(this.value);
        }
        resetPositions() {
            this.slider.isVertical ? this.slider.height = this.height - (this._showButtons ? this.upButton.height + this.downButton.height : 0) : this.slider.width = this.width - (this._showButtons ? this.upButton.width + this.downButton.width : 0), 
            this.resetButtonPosition();
        }
        resetButtonPosition() {
            this.slider.isVertical ? this.downButton.y = this.slider._y + this.slider.height : this.downButton.x = this.slider._x + this.slider.width;
        }
        measureWidth() {
            return this.slider.isVertical ? this.slider.width : 100;
        }
        measureHeight() {
            return this.slider.isVertical ? 100 : this.slider.height;
        }
        setScroll(t, e, s) {
            this.runCallLater(this._sizeChanged), this.slider.setSlider(t, e, s), this.slider.bar.visible = e > 0, 
            !this._hide && this.autoHide && (this.visible = !1);
        }
        get max() {
            return this.slider.max;
        }
        set max(t) {
            this.slider.max = t;
        }
        get min() {
            return this.slider.min;
        }
        set min(t) {
            this.slider.min = t;
        }
        get value() {
            return this._value;
        }
        set value(t) {
            t !== this._value && (this._value = t, this._isElastic || (this.slider._value != t && (this.slider._value = t, 
            this.slider.changeValue()), this._value = this.slider._value), this.event(e.Event.CHANGE), 
            this.changeHandler && this.changeHandler.runWith(this._value));
        }
        get isVertical() {
            return this.slider.isVertical;
        }
        set isVertical(t) {
            this.slider.isVertical = t;
        }
        get sizeGrid() {
            return this.slider.sizeGrid;
        }
        set sizeGrid(t) {
            this.slider.sizeGrid = t;
        }
        get scrollSize() {
            return this._scrollSize;
        }
        set scrollSize(t) {
            this._scrollSize = t;
        }
        set dataSource(t) {
            this._dataSource = t, "number" == typeof t || "string" == typeof t ? this.value = Number(t) : super.dataSource = t;
        }
        get dataSource() {
            return super.dataSource;
        }
        get thumbPercent() {
            return this._thumbPercent;
        }
        set thumbPercent(t) {
            this.runCallLater(this.changeScrollBar), this.runCallLater(this._sizeChanged), t = t >= 1 ? .99 : t, 
            this._thumbPercent = t, this.scaleBar && (this.slider.isVertical ? this.slider.bar.height = Math.max(this.slider.height * t, i.scrollBarMinNum) : this.slider.bar.width = Math.max(this.slider.width * t, i.scrollBarMinNum));
        }
        get target() {
            return this._target;
        }
        set target(t) {
            this._target && (this._target.off(e.Event.MOUSE_WHEEL, this, this.onTargetMouseWheel), 
            this._target.off(e.Event.MOUSE_DOWN, this, this.onTargetMouseDown)), this._target = t, 
            t && (this._mouseWheelEnable && this._target.on(e.Event.MOUSE_WHEEL, this, this.onTargetMouseWheel), 
            this._touchScrollEnable && this._target.on(e.Event.MOUSE_DOWN, this, this.onTargetMouseDown));
        }
        get hide() {
            return this._hide;
        }
        set hide(t) {
            this._hide = t, this.visible = !t;
        }
        get showButtons() {
            return this._showButtons;
        }
        set showButtons(t) {
            this._showButtons = t, this.callLater(this.changeScrollBar);
        }
        get touchScrollEnable() {
            return this._touchScrollEnable;
        }
        set touchScrollEnable(t) {
            this._touchScrollEnable = t, this.target = this._target;
        }
        get mouseWheelEnable() {
            return this._mouseWheelEnable;
        }
        set mouseWheelEnable(t) {
            this._mouseWheelEnable = t, this.target = this._target;
        }
        onTargetMouseWheel(t) {
            this.value -= t.delta * this._scrollSize, this.target = this._target;
        }
        onTargetMouseDown(t) {
            this.isLockedFun && !this.isLockedFun(t) || (this.event(e.Event.END), this._clickOnly = !0, 
            this._lastOffset = 0, this._checkElastic = !1, this._lastPoint || (this._lastPoint = new e.Point()), 
            this._lastPoint.setTo(e.ILaya.stage.mouseX, e.ILaya.stage.mouseY), e.ILaya.timer.clear(this, this.tweenMove), 
            e.Tween.clearTween(this), e.ILaya.stage.once(e.Event.MOUSE_UP, this, this.onStageMouseUp2), 
            e.ILaya.stage.once(e.Event.MOUSE_OUT, this, this.onStageMouseUp2), e.ILaya.timer.frameLoop(1, this, this.loop));
        }
        startDragForce() {
            this._clickOnly = !0, this._lastOffset = 0, this._checkElastic = !1, this._lastPoint || (this._lastPoint = new e.Point()), 
            this._lastPoint.setTo(e.ILaya.stage.mouseX, e.ILaya.stage.mouseY), e.ILaya.timer.clear(this, this.tweenMove), 
            e.Tween.clearTween(this), e.ILaya.stage.once(e.Event.MOUSE_UP, this, this.onStageMouseUp2), 
            e.ILaya.stage.once(e.Event.MOUSE_OUT, this, this.onStageMouseUp2), e.ILaya.timer.frameLoop(1, this, this.loop);
        }
        cancelDragOp() {
            e.ILaya.stage.off(e.Event.MOUSE_UP, this, this.onStageMouseUp2), e.ILaya.stage.off(e.Event.MOUSE_OUT, this, this.onStageMouseUp2), 
            e.ILaya.timer.clear(this, this.tweenMove), e.ILaya.timer.clear(this, this.loop), 
            this._target.mouseEnabled = !0;
        }
        checkTriggers(t = !1) {
            return this.value >= 0 && this.value - this._lastOffset <= 0 && this.triggerDownDragLimit && this.triggerDownDragLimit(t) ? (this.cancelDragOp(), 
            this.value = 0, !0) : !!(this.value <= this.max && this.value - this._lastOffset >= this.max && this.triggerUpDragLimit && this.triggerUpDragLimit(t)) && (this.cancelDragOp(), 
            this.value = this.max, !0);
        }
        get lastOffset() {
            return this._lastOffset;
        }
        startTweenMoveForce(t) {
            this._lastOffset = t, e.ILaya.timer.frameLoop(1, this, this.tweenMove, [ 200 ]);
        }
        loop() {
            var t = e.ILaya.stage.mouseY, s = e.ILaya.stage.mouseX;
            if (this._lastOffset = this.isVertical ? t - this._lastPoint.y : s - this._lastPoint.x, 
            this._clickOnly) {
                if (!(Math.abs(this._lastOffset * (this.isVertical ? e.ILaya.stage._canvasTransform.getScaleY() : e.ILaya.stage._canvasTransform.getScaleX())) > 1)) return;
                if (this._clickOnly = !1, this.checkTriggers()) return;
                this._offsets || (this._offsets = []), this._offsets.length = 0, this._target.mouseEnabled = !1, 
                !this.hide && this.autoHide && (this.alpha = 1, this.visible = !0), this.event(e.Event.START);
            } else if (this.checkTriggers()) return;
            this._offsets.push(this._lastOffset), this._lastPoint.x = s, this._lastPoint.y = t, 
            0 !== this._lastOffset && (this._checkElastic || (this.elasticDistance > 0 ? this._checkElastic || 0 == this._lastOffset || (this._lastOffset > 0 && this._value <= this.min || this._lastOffset < 0 && this._value >= this.max ? (this._isElastic = !0, 
            this._checkElastic = !0) : this._isElastic = !1) : this._checkElastic = !0), this._isElastic ? this._value <= this.min ? this._lastOffset > 0 ? this.value -= this._lastOffset * Math.max(0, 1 - (this.min - this._value) / this.elasticDistance) : (this.value -= .5 * this._lastOffset, 
            this._value >= this.min && (this._checkElastic = !1)) : this._value >= this.max && (this._lastOffset < 0 ? this.value -= this._lastOffset * Math.max(0, 1 - (this._value - this.max) / this.elasticDistance) : (this.value -= .5 * this._lastOffset, 
            this._value <= this.max && (this._checkElastic = !1))) : this.value -= this._lastOffset);
        }
        onStageMouseUp2(t) {
            if (e.ILaya.stage.off(e.Event.MOUSE_UP, this, this.onStageMouseUp2), e.ILaya.stage.off(e.Event.MOUSE_OUT, this, this.onStageMouseUp2), 
            e.ILaya.timer.clear(this, this.loop), !(this._clickOnly && this._value >= this.min && this._value <= this.max)) if (this._target.mouseEnabled = !0, 
            this._isElastic) this._value < this.min ? e.Tween.to(this, {
                value: this.min
            }, this.elasticBackTime, e.Ease.sineOut, e.Handler.create(this, this.elasticOver)) : this._value > this.max && e.Tween.to(this, {
                value: this.max
            }, this.elasticBackTime, e.Ease.sineOut, e.Handler.create(this, this.elasticOver)); else {
                if (!this._offsets) return;
                this._offsets.length < 1 && (this._offsets[0] = this.isVertical ? e.ILaya.stage.mouseY - this._lastPoint.y : e.ILaya.stage.mouseX - this._lastPoint.x);
                for (var s = 0, i = Math.min(this._offsets.length, 3), h = 0; h < i; h++) s += this._offsets[this._offsets.length - 1 - h];
                if (this._lastOffset = s / i, (s = Math.abs(this._lastOffset)) < 2) return void this.event(e.Event.END);
                s > 250 && (this._lastOffset = this._lastOffset > 0 ? 250 : -250);
                var r = Math.round(Math.abs(this.elasticDistance * (this._lastOffset / 150)));
                e.ILaya.timer.frameLoop(1, this, this.tweenMove, [ r ]);
            }
        }
        elasticOver() {
            this._isElastic = !1, !this.hide && this.autoHide && e.Tween.to(this, {
                alpha: 0
            }, 500), this.event(e.Event.END);
        }
        tweenMove(t) {
            var s;
            if ((this._lastOffset *= this.rollRatio, !this.checkTriggers(!0)) && (t > 0 && (this._lastOffset > 0 && this.value <= this.min ? (this._isElastic = !0, 
            s = .5 * -(this.min - t - this.value), this._lastOffset > s && (this._lastOffset = s)) : this._lastOffset < 0 && this.value >= this.max && (this._isElastic = !0, 
            s = .5 * -(this.max + t - this.value), this._lastOffset < s && (this._lastOffset = s))), 
            this.value -= this._lastOffset, Math.abs(this._lastOffset) < .1)) {
                if (e.ILaya.timer.clear(this, this.tweenMove), this._isElastic) return void (this._value < this.min ? e.Tween.to(this, {
                    value: this.min
                }, this.elasticBackTime, e.Ease.sineOut, e.Handler.create(this, this.elasticOver)) : this._value > this.max ? e.Tween.to(this, {
                    value: this.max
                }, this.elasticBackTime, e.Ease.sineOut, e.Handler.create(this, this.elasticOver)) : this.elasticOver());
                this.event(e.Event.END), !this.hide && this.autoHide && e.Tween.to(this, {
                    alpha: 0
                }, 500);
            }
        }
        stopScroll() {
            this.onStageMouseUp2(null), e.ILaya.timer.clear(this, this.tweenMove), e.Tween.clearTween(this);
        }
        get tick() {
            return this.slider.tick;
        }
        set tick(t) {
            this.slider.tick = t;
        }
    }
    e.ILaya.regClass(v), e.ClassUtils.regClass("laya.ui.ScrollBar", v), e.ClassUtils.regClass("Laya.ScrollBar", v);
    class f extends v {}
    e.ILaya.regClass(f), e.ClassUtils.regClass("laya.ui.VScrollBar", f), e.ClassUtils.regClass("Laya.VScrollBar", f);
    class S extends v {
        initialize() {
            super.initialize(), this.slider.isVertical = !1;
        }
    }
    e.ILaya.regClass(S), e.ClassUtils.regClass("laya.ui.HScrollBar", S), e.ClassUtils.regClass("Laya.HScrollBar", S);
    class y extends c {
        constructor() {
            super(...arguments), this.selectEnable = !1, this.totalPage = 0, this._$componentType = "List", 
            this._repeatX = 0, this._repeatY = 0, this._repeatX2 = 0, this._repeatY2 = 0, this._spaceX = 0, 
            this._spaceY = 0, this._cells = [], this._startIndex = 0, this._selectedIndex = -1, 
            this._page = 0, this._isVertical = !0, this._cellSize = 20, this._cellOffset = 0, 
            this._createdLine = 0, this._offset = new e.Point(), this._usedCache = null, this._elasticEnabled = !1, 
            this._preLen = 0;
        }
        destroy(t = !0) {
            this._content && this._content.destroy(t), this._scrollBar && this._scrollBar.destroy(t), 
            super.destroy(t), this._content = null, this._scrollBar = null, this._itemRender = null, 
            this._cells = null, this._array = null, this.selectHandler = this.renderHandler = this.mouseHandler = null;
        }
        createChildren() {
            this.addChild(this._content = new c());
        }
        set cacheAs(t) {
            super.cacheAs = t, this._scrollBar && (this._usedCache = null, "none" !== t ? this._scrollBar.on(e.Event.START, this, this.onScrollStart) : this._scrollBar.off(e.Event.START, this, this.onScrollStart));
        }
        get cacheAs() {
            return super.cacheAs;
        }
        onScrollStart() {
            this._usedCache || (this._usedCache = super.cacheAs), super.cacheAs = "none", this._scrollBar.once(e.Event.END, this, this.onScrollEnd);
        }
        onScrollEnd() {
            super.cacheAs = this._usedCache;
        }
        get content() {
            return this._content;
        }
        get vScrollBarSkin() {
            return this._scrollBar ? this._scrollBar.skin : null;
        }
        set vScrollBarSkin(t) {
            this._removePreScrollBar();
            var e = new f();
            e.name = "scrollBar", e.right = 0, e.skin = t, e.elasticDistance = this._elasticEnabled ? 200 : 0, 
            this.scrollBar = e, this.addChild(e), this._setCellChanged();
        }
        _removePreScrollBar() {
            var t = this.removeChildByName("scrollBar");
            t && t.destroy(!0);
        }
        get hScrollBarSkin() {
            return this._scrollBar ? this._scrollBar.skin : null;
        }
        set hScrollBarSkin(t) {
            this._removePreScrollBar();
            var e = new S();
            e.name = "scrollBar", e.bottom = 0, e.skin = t, e.elasticDistance = this._elasticEnabled ? 200 : 0, 
            this.scrollBar = e, this.addChild(e), this._setCellChanged();
        }
        get scrollBar() {
            return this._scrollBar;
        }
        set scrollBar(t) {
            this._scrollBar != t && (this._scrollBar = t, t && (this._isVertical = this._scrollBar.isVertical, 
            this.addChild(this._scrollBar), this._scrollBar.on(e.Event.CHANGE, this, this.onScrollBarChange)));
        }
        get itemRender() {
            return this._itemRender;
        }
        set itemRender(t) {
            if (this._itemRender != t) {
                this._itemRender = t;
                for (var e = this._cells.length - 1; e > -1; e--) this._cells[e].destroy();
                this._cells.length = 0, this._setCellChanged();
            }
        }
        set width(t) {
            t != this._width && (super.width = t, this._setCellChanged());
        }
        get width() {
            return super.width;
        }
        set height(t) {
            t != this._height && (super.height = t, this._setCellChanged());
        }
        get height() {
            return super.height;
        }
        get repeatX() {
            return this._repeatX > 0 ? this._repeatX : this._repeatX2 > 0 ? this._repeatX2 : 1;
        }
        set repeatX(t) {
            this._repeatX = t, this._setCellChanged();
        }
        get repeatY() {
            return this._repeatY > 0 ? this._repeatY : this._repeatY2 > 0 ? this._repeatY2 : 1;
        }
        set repeatY(t) {
            this._repeatY = t, this._setCellChanged();
        }
        get spaceX() {
            return this._spaceX;
        }
        set spaceX(t) {
            this._spaceX = t, this._setCellChanged();
        }
        get spaceY() {
            return this._spaceY;
        }
        set spaceY(t) {
            this._spaceY = t, this._setCellChanged();
        }
        changeCells() {
            if (this._cellChanged = !1, this._itemRender) {
                this.scrollBar = this.getChildByName("scrollBar");
                var t = this._getOneCell(), e = t.width + this._spaceX || 1, s = t.height + this._spaceY || 1;
                this._width > 0 && (this._repeatX2 = this._isVertical ? Math.round(this._width / e) : Math.ceil(this._width / e)), 
                this._height > 0 && (this._repeatY2 = this._isVertical ? Math.ceil(this._height / s) : Math.round(this._height / s));
                var i = this._width ? this._width : e * this.repeatX - this._spaceX, h = this._height ? this._height : s * this.repeatY - this._spaceY;
                this._cellSize = this._isVertical ? s : e, this._cellOffset = this._isVertical ? s * Math.max(this._repeatY2, this._repeatY) - h - this._spaceY : e * Math.max(this._repeatX2, this._repeatX) - i - this._spaceX, 
                this._isVertical && this.vScrollBarSkin ? this._scrollBar.height = h : !this._isVertical && this.hScrollBarSkin && (this._scrollBar.width = i), 
                this.setContentSize(i, h);
                var r = this._isVertical ? this.repeatX : this.repeatY, a = (this._isVertical ? this.repeatY : this.repeatX) + (this._scrollBar ? 1 : 0);
                this._createItems(0, r, a), this._createdLine = a, this._array && (this.array = this._array, 
                this.runCallLater(this.renderItems));
            }
        }
        _getOneCell() {
            if (0 === this._cells.length) {
                var t = this.createItem();
                if (this._offset.setTo(t._x, t._y), this.cacheContent) return t;
                this._cells.push(t);
            }
            return this._cells[0];
        }
        _createItems(t, e, s) {
            var i = this._content, h = this._getOneCell(), r = h.width + this._spaceX, a = h.height + this._spaceY;
            if (this.cacheContent) {
                var l = new c();
                l.cacheAs = "normal", l.pos((this._isVertical ? 0 : t) * r, (this._isVertical ? t : 0) * a), 
                this._content.addChild(l), i = l;
            } else {
                for (var n = [], o = this._cells.length - 1; o > -1; o--) {
                    var _ = this._cells[o];
                    _.removeSelf(), n.push(_);
                }
                this._cells.length = 0;
            }
            for (var d = t; d < s; d++) for (var u = 0; u < e; u++) (h = n && n.length ? n.pop() : this.createItem()).x = (this._isVertical ? u : d) * r - i._x, 
            h.y = (this._isVertical ? d : u) * a - i._y, h.name = "item" + (d * e + u), i.addChild(h), 
            this.addCell(h);
        }
        createItem() {
            var t = [];
            if ("function" == typeof this._itemRender) var s = new this._itemRender(); else s = e.SceneUtils.createComp(this._itemRender, null, null, t);
            if (0 == t.length && s._watchMap) {
                var i = s._watchMap;
                for (var h in i) for (var r = i[h], a = 0; a < r.length; a++) {
                    var l = r[a];
                    t.push(l.comp, l.prop, l.value);
                }
            }
            return t.length && (s._$bindData = t), s;
        }
        addCell(t) {
            t.on(e.Event.CLICK, this, this.onCellMouse), t.on(e.Event.RIGHT_CLICK, this, this.onCellMouse), 
            t.on(e.Event.MOUSE_OVER, this, this.onCellMouse), t.on(e.Event.MOUSE_OUT, this, this.onCellMouse), 
            t.on(e.Event.MOUSE_DOWN, this, this.onCellMouse), t.on(e.Event.MOUSE_UP, this, this.onCellMouse), 
            this._cells.push(t);
        }
        _afterInited() {
            this.initItems();
        }
        initItems() {
            if (!this._itemRender && null != this.getChildByName("item0")) {
                var t;
                this.repeatX = 1, t = 0;
                for (var e = 0; e < 1e4; e++) {
                    var s = this.getChildByName("item" + e);
                    if (!s) break;
                    this.addCell(s), t++;
                }
                this.repeatY = t;
            }
        }
        setContentSize(t, s) {
            this._content.width = t, this._content.height = s, (this._scrollBar || 0 != this._offset.x || 0 != this._offset.y) && (this._content._style.scrollRect || (this._content.scrollRect = e.Rectangle.create()), 
            this._content._style.scrollRect.setTo(-this._offset.x, -this._offset.y, t, s), this._content.scrollRect = this._content.scrollRect), 
            this.event(e.Event.RESIZE);
        }
        onCellMouse(t) {
            t.type === e.Event.MOUSE_DOWN && (this._isMoved = !1);
            var s = t.currentTarget, i = this._startIndex + this._cells.indexOf(s);
            i < 0 || (t.type === e.Event.CLICK || t.type === e.Event.RIGHT_CLICK ? this.selectEnable && !this._isMoved ? this.selectedIndex = i : this.changeCellState(s, !0, 0) : t.type !== e.Event.MOUSE_OVER && t.type !== e.Event.MOUSE_OUT || this._selectedIndex === i || this.changeCellState(s, t.type === e.Event.MOUSE_OVER, 0), 
            this.mouseHandler && this.mouseHandler.runWith([ t, i ]));
        }
        changeCellState(t, e, s) {
            var i = t.getChildByName("selectBox");
            i && (this.selectEnable = !0, i.visible = e, i.index = s);
        }
        _sizeChanged() {
            super._sizeChanged(), this.setContentSize(this.width, this.height), this._scrollBar && this.callLater(this.onScrollBarChange);
        }
        onScrollBarChange(t = null) {
            this.runCallLater(this.changeCells);
            var e = this._scrollBar.value, s = this._isVertical ? this.repeatX : this.repeatY, i = this._isVertical ? this.repeatY : this.repeatX, h = Math.floor(e / this._cellSize);
            if (this.cacheContent) a = i + 1, this._createdLine - h < a && (this._createItems(this._createdLine, s, this._createdLine + a), 
            this.renderItems(this._createdLine * s, 0), this._createdLine += a); else {
                var r = h * s, a = 0;
                if (r > this._startIndex) {
                    a = r - this._startIndex;
                    var l = !0, n = this._startIndex + s * (i + 1);
                    this._isMoved = !0;
                } else r < this._startIndex && (a = this._startIndex - r, l = !1, n = this._startIndex - 1, 
                this._isMoved = !0);
                for (var o = 0; o < a; o++) {
                    if (l) {
                        var _ = this._cells.shift();
                        this._cells[this._cells.length] = _;
                        var c = n + o;
                    } else _ = this._cells.pop(), this._cells.unshift(_), c = n - o;
                    var d = Math.floor(c / s) * this._cellSize;
                    this._isVertical ? _.y = d : _.x = d, this.renderItem(_, c);
                }
                this._startIndex = r, this.changeSelectStatus();
            }
            var u = this._content._style.scrollRect;
            this._isVertical ? (u.y = e - this._offset.y, u.x = -this._offset.x) : (u.y = -this._offset.y, 
            u.x = e - this._offset.x), this._content.scrollRect = u;
        }
        posCell(t, e) {
            if (this._scrollBar) {
                var s = this._isVertical ? this.repeatX : this.repeatY, i = (this._isVertical ? this.repeatY : this.repeatX, 
                Math.floor(e / s) * this._cellSize);
                this._isVertical ? t._y = i : t.x = i;
            }
        }
        get selectedIndex() {
            return this._selectedIndex;
        }
        set selectedIndex(t) {
            this._selectedIndex != t && (this._selectedIndex = t, this.changeSelectStatus(), 
            this.event(e.Event.CHANGE), this.selectHandler && this.selectHandler.runWith(t), 
            this.startIndex = this._startIndex);
        }
        changeSelectStatus() {
            for (var t = 0, e = this._cells.length; t < e; t++) this.changeCellState(this._cells[t], this._selectedIndex === this._startIndex + t, 1);
        }
        get selectedItem() {
            return -1 != this._selectedIndex ? this._array[this._selectedIndex] : null;
        }
        set selectedItem(t) {
            this.selectedIndex = this._array.indexOf(t);
        }
        get selection() {
            return this.getCell(this._selectedIndex);
        }
        set selection(t) {
            this.selectedIndex = this._startIndex + this._cells.indexOf(t);
        }
        get startIndex() {
            return this._startIndex;
        }
        set startIndex(t) {
            this._startIndex = t > 0 ? t : 0, this.callLater(this.renderItems);
        }
        renderItems(t = 0, e = 0) {
            for (var s = t, i = e || this._cells.length; s < i; s++) this.renderItem(this._cells[s], this._startIndex + s);
            this.changeSelectStatus();
        }
        renderItem(t, s) {
            this._array && s >= 0 && s < this._array.length ? (t.visible = !0, t._$bindData ? (t._dataSource = this._array[s], 
            this._bindData(t, this._array[s])) : t.dataSource = this._array[s], this.cacheContent || this.posCell(t, s), 
            this.hasListener(e.Event.RENDER) && this.event(e.Event.RENDER, [ t, s ]), this.renderHandler && this.renderHandler.runWith([ t, s ])) : (t.visible = !1, 
            t.dataSource = null);
        }
        _bindData(t, e) {
            for (var s = t._$bindData, i = 0, h = s.length; i < h; i++) {
                var r = s[i++], a = s[i++], n = s[i], o = l.getBindFun(n);
                r[a] = o.call(this, e);
            }
        }
        get array() {
            return this._array;
        }
        set array(t) {
            this.runCallLater(this.changeCells), this._array = t || [], this._preLen = this._array.length;
            var e = this._array.length;
            if (this.totalPage = Math.ceil(e / (this.repeatX * this.repeatY)), this._selectedIndex = this._selectedIndex < e ? this._selectedIndex : e - 1, 
            this.startIndex = this._startIndex, this._scrollBar) {
                this._scrollBar.stopScroll();
                var s = this._isVertical ? this.repeatX : this.repeatY, i = this._isVertical ? this.repeatY : this.repeatX, h = Math.ceil(e / s);
                (this._cellOffset > 0 ? this.totalPage + 1 : this.totalPage) > 1 && h >= i ? (this._scrollBar.scrollSize = this._cellSize, 
                this._scrollBar.thumbPercent = i / h, this._scrollBar.setScroll(0, (h - i) * this._cellSize + this._cellOffset, this._scrollBar.value), 
                this._scrollBar.target = this._content) : (this._scrollBar.setScroll(0, 0, 0), this._scrollBar.target = this._content);
            }
        }
        updateArray(t) {
            var e;
            if (this._array = t, this._array && ((e = this._preLen - this._startIndex) >= 0 && this.renderItems(e), 
            this._preLen = this._array.length), this._scrollBar) {
                var s = t.length, i = this._isVertical ? this.repeatX : this.repeatY, h = this._isVertical ? this.repeatY : this.repeatX, r = Math.ceil(s / i);
                r >= h && (this._scrollBar.thumbPercent = h / r, this._scrollBar.slider._max = (r - h) * this._cellSize + this._cellOffset);
            }
        }
        get page() {
            return this._page;
        }
        set page(t) {
            this._page = t, this._array && (this._page = t > 0 ? t : 0, this._page = this._page < this.totalPage ? this._page : this.totalPage - 1, 
            this.startIndex = this._page * this.repeatX * this.repeatY);
        }
        get length() {
            return this._array ? this._array.length : 0;
        }
        set dataSource(t) {
            this._dataSource = t, "number" == typeof t || "string" == typeof t ? this.selectedIndex = parseInt(t) : t instanceof Array ? this.array = t : super.dataSource = t;
        }
        get dataSource() {
            return super.dataSource;
        }
        get cells() {
            return this.runCallLater(this.changeCells), this._cells;
        }
        get elasticEnabled() {
            return this._elasticEnabled;
        }
        set elasticEnabled(t) {
            this._elasticEnabled = t, this._scrollBar && (this._scrollBar.elasticDistance = t ? 200 : 0);
        }
        refresh() {
            this.array = this._array;
        }
        getItem(t) {
            return t > -1 && t < this._array.length ? this._array[t] : null;
        }
        changeItem(t, e) {
            t > -1 && t < this._array.length && (this._array[t] = e, t >= this._startIndex && t < this._startIndex + this._cells.length && this.renderItem(this.getCell(t), t));
        }
        setItem(t, e) {
            this.changeItem(t, e);
        }
        addItem(t) {
            this._array.push(t), this.array = this._array;
        }
        addItemAt(t, e) {
            this._array.splice(e, 0, t), this.array = this._array;
        }
        deleteItem(t) {
            this._array.splice(t, 1), this.array = this._array;
        }
        getCell(t) {
            return this.runCallLater(this.changeCells), t > -1 && this._cells ? this._cells[(t - this._startIndex) % this._cells.length] : null;
        }
        scrollTo(t) {
            if (this._scrollBar) {
                var e = this._isVertical ? this.repeatX : this.repeatY;
                this._scrollBar.value = Math.floor(t / e) * this._cellSize;
            } else this.startIndex = t;
        }
        tweenTo(t, s = 200, i = null) {
            if (this._scrollBar) {
                this._scrollBar.stopScroll();
                var h = this._isVertical ? this.repeatX : this.repeatY;
                e.Tween.to(this._scrollBar, {
                    value: Math.floor(t / h) * this._cellSize
                }, s, null, i, 0, !0);
            } else this.startIndex = t, i && i.run();
        }
        _setCellChanged() {
            this._cellChanged || (this._cellChanged = !0, this.callLater(this.changeCells));
        }
        commitMeasure() {
            this.runCallLater(this.changeCells);
        }
    }
    e.ILaya.regClass(y), e.ClassUtils.regClass("laya.ui.List", y), e.ClassUtils.regClass("Laya.List", y);
    class b extends n {
        constructor(t = null, e = null) {
            super(), this._visibleNum = 6, this._itemColors = i.comboBoxItemColors, this._itemSize = 12, 
            this._labels = [], this._selectedIndex = -1, this.itemRender = null, this.skin = t, 
            this.labels = e;
        }
        destroy(t = !0) {
            super.destroy(t), this._button && this._button.destroy(t), this._list && this._list.destroy(t), 
            this._button = null, this._list = null, this._itemColors = null, this._labels = null, 
            this._selectHandler = null;
        }
        createChildren() {
            this.addChild(this._button = new d()), this._button.text.align = "left", this._button.labelPadding = "0,0,0,5", 
            this._button.on(e.Event.MOUSE_DOWN, this, this.onButtonMouseDown);
        }
        _createList() {
            this._list = new y(), this._scrollBarSkin && (this._list.vScrollBarSkin = this._scrollBarSkin), 
            this._setListEvent(this._list);
        }
        _setListEvent(t) {
            this._list.selectEnable = !0, this._list.on(e.Event.MOUSE_DOWN, this, this.onListDown), 
            this._list.mouseHandler = e.Handler.create(this, this.onlistItemMouse, null, !1), 
            this._list.scrollBar && this._list.scrollBar.on(e.Event.MOUSE_DOWN, this, this.onScrollBarDown);
        }
        onListDown(t) {
            t.stopPropagation();
        }
        onScrollBarDown(t) {
            t.stopPropagation();
        }
        onButtonMouseDown(t) {
            this.callLater(this.switchTo, [ !this._isOpen ]);
        }
        get skin() {
            return this._button.skin;
        }
        set skin(t) {
            this._button.skin != t && (this._button.skin = t, this._listChanged = !0);
        }
        measureWidth() {
            return this._button.width;
        }
        measureHeight() {
            return this._button.height;
        }
        changeList() {
            this._listChanged = !1;
            var t = this.width - 2, e = this._itemColors[2];
            this._itemHeight = this._itemSize + 6, this._list.itemRender = this.itemRender || {
                type: "Box",
                child: [ {
                    type: "Label",
                    props: {
                        name: "label",
                        x: 1,
                        padding: "3,3,3,3",
                        width: t,
                        height: this._itemHeight,
                        fontSize: this._itemSize,
                        color: e
                    }
                } ]
            }, this._list.repeatY = this._visibleNum, this._list.refresh();
        }
        onlistItemMouse(t, s) {
            var i = t.type;
            if (i === e.Event.MOUSE_OVER || i === e.Event.MOUSE_OUT) {
                if (this._isCustomList) return;
                var h = this._list.getCell(s);
                if (!h) return;
                var r = h.getChildByName("label");
                r && (i === e.Event.ROLL_OVER ? (r.bgColor = this._itemColors[0], r.color = this._itemColors[1]) : (r.bgColor = null, 
                r.color = this._itemColors[2]));
            } else i === e.Event.CLICK && (this.selectedIndex = s, this.isOpen = !1);
        }
        switchTo(t) {
            this.isOpen = t;
        }
        changeOpen() {
            this.isOpen = !this._isOpen;
        }
        set width(t) {
            super.width = t, this._button.width = this._width, this._itemChanged = !0, this._listChanged = !0;
        }
        get width() {
            return super.width;
        }
        set height(t) {
            super.height = t, this._button.height = this._height;
        }
        get height() {
            return super.height;
        }
        get labels() {
            return this._labels.join(",");
        }
        set labels(t) {
            this._labels.length > 0 && (this.selectedIndex = -1), t ? this._labels = t.split(",") : this._labels.length = 0, 
            this._itemChanged = !0;
        }
        changeItem() {
            if (this._itemChanged = !1, this._listHeight = this._labels.length > 0 ? Math.min(this._visibleNum, this._labels.length) * this._itemHeight : this._itemHeight, 
            !this._isCustomList) {
                var t = this._list.graphics;
                t.clear(!0), t.drawRect(0, 0, this.width - 1, this._listHeight, this._itemColors[4], this._itemColors[3]);
            }
            var e = this._list.array || [];
            e.length = 0;
            for (var s = 0, i = this._labels.length; s < i; s++) e.push({
                label: this._labels[s]
            });
            this._list.height = this._listHeight, this._list.array = e;
        }
        get selectedIndex() {
            return this._selectedIndex;
        }
        set selectedIndex(t) {
            this._selectedIndex != t && (this._selectedIndex = t, this._labels.length > 0 ? this.changeSelected() : this.callLater(this.changeSelected), 
            this.event(e.Event.CHANGE, [ e.Event.EMPTY.setTo(e.Event.CHANGE, this, this) ]), 
            this._selectHandler && this._selectHandler.runWith(this._selectedIndex));
        }
        changeSelected() {
            this._button.label = this.selectedLabel;
        }
        get selectHandler() {
            return this._selectHandler;
        }
        set selectHandler(t) {
            this._selectHandler = t;
        }
        get selectedLabel() {
            return this._selectedIndex > -1 && this._selectedIndex < this._labels.length ? this._labels[this._selectedIndex] : null;
        }
        set selectedLabel(t) {
            this.selectedIndex = this._labels.indexOf(t);
        }
        get visibleNum() {
            return this._visibleNum;
        }
        set visibleNum(t) {
            this._visibleNum = t, this._listChanged = !0;
        }
        get itemColors() {
            return String(this._itemColors);
        }
        set itemColors(t) {
            this._itemColors = l.fillArray(this._itemColors, t, String), this._listChanged = !0;
        }
        get itemSize() {
            return this._itemSize;
        }
        set itemSize(t) {
            this._itemSize = t, this._listChanged = !0;
        }
        get isOpen() {
            return this._isOpen;
        }
        set isOpen(t) {
            if (this._isOpen != t) if (this._isOpen = t, this._button.selected = this._isOpen, 
            this._isOpen) {
                this._list || this._createList(), this._listChanged && !this._isCustomList && this.changeList(), 
                this._itemChanged && this.changeItem();
                var s = this.localToGlobal(e.Point.TEMP.setTo(0, 0)), i = s.y + this._button.height;
                i = i + this._listHeight <= e.ILaya.stage.height ? i : s.y - this._listHeight, this._list.pos(s.x, i), 
                this._list.zOrder = 1001, e.ILaya.stage.addChild(this._list), e.ILaya.stage.once(e.Event.MOUSE_DOWN, this, this.removeList), 
                e.ILaya.stage.on(e.Event.MOUSE_WHEEL, this, this._onStageMouseWheel), this._list.selectedIndex = this._selectedIndex;
            } else this._list && this._list.removeSelf();
        }
        _onStageMouseWheel(t) {
            this._list && !this._list.contains(t.target) && this.removeList(null);
        }
        removeList(t) {
            e.ILaya.stage.off(e.Event.MOUSE_DOWN, this, this.removeList), e.ILaya.stage.off(e.Event.MOUSE_WHEEL, this, this._onStageMouseWheel), 
            this.isOpen = !1;
        }
        get scrollBarSkin() {
            return this._scrollBarSkin;
        }
        set scrollBarSkin(t) {
            this._scrollBarSkin = t;
        }
        get sizeGrid() {
            return this._button.sizeGrid;
        }
        set sizeGrid(t) {
            this._button.sizeGrid = t;
        }
        get scrollBar() {
            return this.list.scrollBar;
        }
        get button() {
            return this._button;
        }
        get list() {
            return this._list || this._createList(), this._list;
        }
        set list(t) {
            t && (t.removeSelf(), this._isCustomList = !0, this._list = t, this._setListEvent(t), 
            this._itemHeight = t.getCell(0).height + t.spaceY);
        }
        set dataSource(t) {
            this._dataSource = t, "number" == typeof t || "string" == typeof t ? this.selectedIndex = parseInt(t) : t instanceof Array ? this.labels = t.join(",") : super.dataSource = t;
        }
        get dataSource() {
            return super.dataSource;
        }
        get labelColors() {
            return this._button.labelColors;
        }
        set labelColors(t) {
            this._button.labelColors != t && (this._button.labelColors = t);
        }
        get labelPadding() {
            return this._button.text.padding.join(",");
        }
        set labelPadding(t) {
            this._button.text.padding = l.fillArray(i.labelPadding, t, Number);
        }
        get labelSize() {
            return this._button.text.fontSize;
        }
        set labelSize(t) {
            this._button.text.fontSize = t;
        }
        get labelBold() {
            return this._button.text.bold;
        }
        set labelBold(t) {
            this._button.text.bold = t;
        }
        get labelFont() {
            return this._button.text.font;
        }
        set labelFont(t) {
            this._button.text.font = t;
        }
        get stateNum() {
            return this._button.stateNum;
        }
        set stateNum(t) {
            this._button.stateNum = t;
        }
    }
    e.ILaya.regClass(b), e.ClassUtils.regClass("laya.ui.ComboBox", b), e.ClassUtils.regClass("Laya.ComboBox", b);
    class w extends n {
        constructor(t = null) {
            super(), this._value = .5, this.skin = t;
        }
        destroy(t = !0) {
            super.destroy(t), this._bg && this._bg.destroy(t), this._bar && this._bar.destroy(t), 
            this._bg = this._bar = null, this.changeHandler = null;
        }
        createChildren() {
            this.addChild(this._bg = new o()), this.addChild(this._bar = new o()), this._bar._bitmap.autoCacheCmd = !1;
        }
        get skin() {
            return this._skin;
        }
        set skin(t) {
            this._skin != t && (this._skin = t, this._skin && !e.Loader.getRes(this._skin) ? e.ILaya.loader.load(this._skin, e.Handler.create(this, this._skinLoaded), null, e.Loader.IMAGE, 1) : this._skinLoaded());
        }
        _skinLoaded() {
            this._bg.skin = this._skin, this._bar.skin = this._skin.replace(".png", "$bar.png"), 
            this.callLater(this.changeValue), this._sizeChanged(), this.event(e.Event.LOADED);
        }
        measureWidth() {
            return this._bg.width;
        }
        measureHeight() {
            return this._bg.height;
        }
        get value() {
            return this._value;
        }
        set value(t) {
            this._value != t && (t = t > 1 ? 1 : t < 0 ? 0 : t, this._value = t, this.callLater(this.changeValue), 
            this.event(e.Event.CHANGE), this.changeHandler && this.changeHandler.runWith(t));
        }
        changeValue() {
            if (this.sizeGrid) {
                var t = this.sizeGrid.split(","), e = Number(t[3]), s = Number(t[1]), i = (this.width - e - s) * this._value;
                this._bar.width = e + s + i, this._bar.visible = this._bar.width > e + s;
            } else this._bar.width = this.width * this._value;
        }
        get bar() {
            return this._bar;
        }
        get bg() {
            return this._bg;
        }
        get sizeGrid() {
            return this._bg.sizeGrid;
        }
        set sizeGrid(t) {
            this._bg.sizeGrid = this._bar.sizeGrid = t;
        }
        set width(t) {
            super.width = t, this._bg.width = this._width, this.callLater(this.changeValue);
        }
        get width() {
            return super.width;
        }
        set height(t) {
            super.height = t, this._bg.height = this._height, this._bar.height = this._height;
        }
        get height() {
            return super.height;
        }
        set dataSource(t) {
            this._dataSource = t, "number" == typeof t || "string" == typeof t ? this.value = Number(t) : super.dataSource = t;
        }
        get dataSource() {
            return super.dataSource;
        }
    }
    e.ILaya.regClass(w), e.ClassUtils.regClass("laya.ui.ProgressBar", w), e.ClassUtils.regClass("Laya.ProgressBar", w);
    class x extends d {
        constructor(t = null, e = "") {
            super(t, e), this.toggle = !1, this._autoSize = !1;
        }
        destroy(t = !0) {
            super.destroy(t), this._value = null;
        }
        preinitialize() {
            super.preinitialize(), this.toggle = !1, this._autoSize = !1;
        }
        initialize() {
            super.initialize(), this.createText(), this._text.align = "left", this._text.valign = "top", 
            this._text.width = 0, this.on(e.Event.CLICK, this, this.onClick);
        }
        onClick(t) {
            this.selected = !0;
        }
        get value() {
            return null != this._value ? this._value : this.label;
        }
        set value(t) {
            this._value = t;
        }
    }
    e.ILaya.regClass(x), e.ClassUtils.regClass("laya.ui.Radio", x), e.ClassUtils.regClass("Laya.Radio", x);
    class L extends c {
        constructor(t = null, e = null) {
            super(), this._selectedIndex = -1, this._direction = "horizontal", this._space = 0, 
            this.skin = e, this.labels = t;
        }
        preinitialize() {
            this.mouseEnabled = !0;
        }
        destroy(t = !0) {
            super.destroy(t), this._items && (this._items.length = 0), this._items = null, this.selectHandler = null;
        }
        addItem(t, e = !0) {
            var s = t, i = this._items.length;
            if (s.name = "item" + i, this.addChild(s), this.initItems(), e && i > 0) {
                var h = this._items[i - 1];
                "horizontal" == this._direction ? s.x = h._x + h.width + this._space : s.y = h._y + h.height + this._space;
            } else e && (s.x = 0, s.y = 0);
            return i;
        }
        delItem(t, e = !0) {
            var s = this._items.indexOf(t);
            if (-1 != s) {
                var i, h = t;
                this.removeChild(h);
                for (var r = s + 1, a = this._items.length; r < a; r++) {
                    var l = this._items[r];
                    l.name = "item" + (r - 1), e && ("horizontal" == this._direction ? l.x -= h.width + this._space : l.y -= h.height + this._space);
                }
                if (this.initItems(), this._selectedIndex > -1) i = this._selectedIndex < this._items.length ? this._selectedIndex : this._selectedIndex - 1, 
                this._selectedIndex = -1, this.selectedIndex = i;
            }
        }
        _afterInited() {
            this.initItems();
        }
        initItems() {
            this._items || (this._items = []), this._items.length = 0;
            for (var t = 0; t < 1e4; t++) {
                var s = this.getChildByName("item" + t);
                if (null == s) break;
                this._items.push(s), s.selected = t === this._selectedIndex, s.clickHandler = e.Handler.create(this, this.itemClick, [ t ], !1);
            }
        }
        itemClick(t) {
            this.selectedIndex = t;
        }
        get selectedIndex() {
            return this._selectedIndex;
        }
        set selectedIndex(t) {
            this._selectedIndex != t && (this.setSelect(this._selectedIndex, !1), this._selectedIndex = t, 
            this.setSelect(t, !0), this.event(e.Event.CHANGE), this.selectHandler && this.selectHandler.runWith(this._selectedIndex));
        }
        setSelect(t, e) {
            this._items && t > -1 && t < this._items.length && (this._items[t].selected = e);
        }
        get skin() {
            return this._skin;
        }
        set skin(t) {
            this._skin != t && (this._skin = t, this._skin && !e.Loader.getRes(this._skin) ? e.ILaya.loader.load(this._skin, e.Handler.create(this, this._skinLoaded), null, e.Loader.IMAGE, 1) : this._skinLoaded());
        }
        _skinLoaded() {
            this._setLabelChanged(), this.event(e.Event.LOADED);
        }
        get labels() {
            return this._labels;
        }
        set labels(t) {
            if (this._labels != t) {
                if (this._labels = t, this.removeChildren(), this._setLabelChanged(), this._labels) for (var e = this._labels.split(","), s = 0, i = e.length; s < i; s++) {
                    var h = this.createItem(this._skin, e[s]);
                    h.name = "item" + s, this.addChild(h);
                }
                this.initItems();
            }
        }
        createItem(t, e) {
            return null;
        }
        get labelColors() {
            return this._labelColors;
        }
        set labelColors(t) {
            this._labelColors != t && (this._labelColors = t, this._setLabelChanged());
        }
        get labelStroke() {
            return this._labelStroke;
        }
        set labelStroke(t) {
            this._labelStroke != t && (this._labelStroke = t, this._setLabelChanged());
        }
        get labelStrokeColor() {
            return this._labelStrokeColor;
        }
        set labelStrokeColor(t) {
            this._labelStrokeColor != t && (this._labelStrokeColor = t, this._setLabelChanged());
        }
        get strokeColors() {
            return this._strokeColors;
        }
        set strokeColors(t) {
            this._strokeColors != t && (this._strokeColors = t, this._setLabelChanged());
        }
        get labelSize() {
            return this._labelSize;
        }
        set labelSize(t) {
            this._labelSize != t && (this._labelSize = t, this._setLabelChanged());
        }
        get stateNum() {
            return this._stateNum;
        }
        set stateNum(t) {
            this._stateNum != t && (this._stateNum = t, this._setLabelChanged());
        }
        get labelBold() {
            return this._labelBold;
        }
        set labelBold(t) {
            this._labelBold != t && (this._labelBold = t, this._setLabelChanged());
        }
        get labelFont() {
            return this._labelFont;
        }
        set labelFont(t) {
            this._labelFont != t && (this._labelFont = t, this._setLabelChanged());
        }
        get labelPadding() {
            return this._labelPadding;
        }
        set labelPadding(t) {
            this._labelPadding != t && (this._labelPadding = t, this._setLabelChanged());
        }
        get direction() {
            return this._direction;
        }
        set direction(t) {
            this._direction = t, this._setLabelChanged();
        }
        get space() {
            return this._space;
        }
        set space(t) {
            this._space = t, this._setLabelChanged();
        }
        changeLabels() {
            if (this._labelChanged = !1, this._items) for (var t = 0, e = 0, s = this._items.length; e < s; e++) {
                var i = this._items[e];
                this._skin && (i.skin = this._skin), this._labelColors && (i.labelColors = this._labelColors), 
                this._labelSize && (i.labelSize = this._labelSize), this._labelStroke && (i.labelStroke = this._labelStroke), 
                this._labelStrokeColor && (i.labelStrokeColor = this._labelStrokeColor), this._strokeColors && (i.strokeColors = this._strokeColors), 
                this._labelBold && (i.labelBold = this._labelBold), this._labelPadding && (i.labelPadding = this._labelPadding), 
                this._labelAlign && (i.labelAlign = this._labelAlign), this._stateNum && (i.stateNum = this._stateNum), 
                this._labelFont && (i.labelFont = this._labelFont), "horizontal" === this._direction ? (i.y = 0, 
                i.x = t, t += i.width + this._space) : (i.x = 0, i.y = t, t += i.height + this._space);
            }
            this._sizeChanged();
        }
        commitMeasure() {
            this.runCallLater(this.changeLabels);
        }
        get items() {
            return this._items;
        }
        get selection() {
            return this._selectedIndex > -1 && this._selectedIndex < this._items.length ? this._items[this._selectedIndex] : null;
        }
        set selection(t) {
            this.selectedIndex = this._items.indexOf(t);
        }
        set dataSource(t) {
            this._dataSource = t, "number" == typeof t || "string" == typeof t ? this.selectedIndex = parseInt(t) : t instanceof Array ? this.labels = t.join(",") : super.dataSource = t;
        }
        get dataSource() {
            return super.dataSource;
        }
        _setLabelChanged() {
            this._labelChanged || (this._labelChanged = !0, this.callLater(this.changeLabels));
        }
    }
    e.ILaya.regClass(L), e.ClassUtils.regClass("laya.ui.UIGroup", L), e.ClassUtils.regClass("Laya.UIGroup", L);
    class E extends L {
        createItem(t, e) {
            return new x(t, e);
        }
    }
    e.ILaya.regClass(E), e.ClassUtils.regClass("laya.ui.RadioGroup", E), e.ClassUtils.regClass("Laya.RadioGroup", E);
    class I extends L {
        createItem(t, e) {
            return new d(t, e);
        }
    }
    e.ILaya.regClass(I), e.ClassUtils.regClass("laya.ui.Tab", I), e.ClassUtils.regClass("Laya.Tab", I);
    class B extends c {
        constructor() {
            super(...arguments), this._setIndexHandler = e.Handler.create(this, this.setIndex, null, !1);
        }
        setItems(t) {
            this.removeChildren();
            for (var e = 0, s = 0, i = t.length; s < i; s++) {
                var h = t[s];
                h && (h.name = "item" + e, this.addChild(h), e++);
            }
            this.initItems();
        }
        addItem(t) {
            t.name = "item" + this._items.length, this.addChild(t), this.initItems();
        }
        _afterInited() {
            this.initItems();
        }
        initItems() {
            this._items = [];
            for (var t = 0; t < 1e4; t++) {
                var e = this.getChildByName("item" + t);
                if (null == e) break;
                this._items.push(e), e.visible = t == this._selectedIndex;
            }
        }
        get selectedIndex() {
            return this._selectedIndex;
        }
        set selectedIndex(t) {
            this._selectedIndex != t && (this.setSelect(this._selectedIndex, !1), this._selectedIndex = t, 
            this.setSelect(this._selectedIndex, !0));
        }
        setSelect(t, e) {
            this._items && t > -1 && t < this._items.length && (this._items[t].visible = e);
        }
        get selection() {
            return this._selectedIndex > -1 && this._selectedIndex < this._items.length ? this._items[this._selectedIndex] : null;
        }
        set selection(t) {
            this.selectedIndex = this._items.indexOf(t);
        }
        get setIndexHandler() {
            return this._setIndexHandler;
        }
        set setIndexHandler(t) {
            this._setIndexHandler = t;
        }
        setIndex(t) {
            this.selectedIndex = t;
        }
        get items() {
            return this._items;
        }
        set dataSource(t) {
            if (this._dataSource = t, "number" == typeof t || "string" == typeof t) this.selectedIndex = parseInt(t); else for (var e in this._dataSource) e in this && (this[e] = this._dataSource[e]);
        }
        get dataSource() {
            return super.dataSource;
        }
    }
    e.ILaya.regClass(B), e.ClassUtils.regClass("laya.ui.ViewStack", B), e.ClassUtils.regClass("Laya.ViewStack", B);
    class k extends C {
        constructor(t = "") {
            super(), this.text = t, this.skin = this.skin;
        }
        preinitialize() {
            this.mouseEnabled = !0;
        }
        destroy(t = !0) {
            super.destroy(t), this._bg && this._bg.destroy(), this._bg = null;
        }
        createChildren() {
            this.addChild(this._tf = new e.Input()), this._tf.padding = i.inputLabelPadding, 
            this._tf.on(e.Event.INPUT, this, this._onInput), this._tf.on(e.Event.ENTER, this, this._onEnter), 
            this._tf.on(e.Event.BLUR, this, this._onBlur), this._tf.on(e.Event.FOCUS, this, this._onFocus);
        }
        _onFocus() {
            this.event(e.Event.FOCUS, this);
        }
        _onBlur() {
            this.event(e.Event.BLUR, this);
        }
        _onInput() {
            this.event(e.Event.INPUT, this);
        }
        _onEnter() {
            this.event(e.Event.ENTER, this);
        }
        initialize() {
            this.width = 128, this.height = 22;
        }
        get bg() {
            return this._bg;
        }
        set bg(t) {
            this.graphics = this._bg = t;
        }
        get skin() {
            return this._skin;
        }
        set skin(t) {
            this._skin != t && (this._skin = t, this._skin && !e.Loader.getRes(this._skin) ? e.ILaya.loader.load(this._skin, e.Handler.create(this, this._skinLoaded), null, e.Loader.IMAGE, 1) : this._skinLoaded());
        }
        _skinLoaded() {
            this._bg || (this.graphics = this._bg = new h()), this._bg.source = e.Loader.getRes(this._skin), 
            this._width && (this._bg.width = this._width), this._height && (this._bg.height = this._height), 
            this._sizeChanged(), this.event(e.Event.LOADED);
        }
        get sizeGrid() {
            return this._bg && this._bg.sizeGrid ? this._bg.sizeGrid.join(",") : null;
        }
        set sizeGrid(t) {
            this._bg || (this.graphics = this._bg = new h()), this._bg.sizeGrid = l.fillArray(i.defaultSizeGrid, t, Number);
        }
        set text(t) {
            this._tf.text != t && (t += "", this._tf.text = t, this.event(e.Event.CHANGE));
        }
        get text() {
            return super.text;
        }
        set width(t) {
            super.width = t, this._bg && (this._bg.width = t);
        }
        get width() {
            return super.width;
        }
        set height(t) {
            super.height = t, this._bg && (this._bg.height = t);
        }
        get height() {
            return super.height;
        }
        get multiline() {
            return this._tf.multiline;
        }
        set multiline(t) {
            this._tf.multiline = t;
        }
        set editable(t) {
            this._tf.editable = t;
        }
        get editable() {
            return this._tf.editable;
        }
        select() {
            this._tf.select();
        }
        get restrict() {
            return this._tf.restrict;
        }
        set restrict(t) {
            this._tf.restrict = t;
        }
        get prompt() {
            return this._tf.prompt;
        }
        set prompt(t) {
            this._tf.prompt = t;
        }
        get promptColor() {
            return this._tf.promptColor;
        }
        set promptColor(t) {
            this._tf.promptColor = t;
        }
        get maxChars() {
            return this._tf.maxChars;
        }
        set maxChars(t) {
            this._tf.maxChars = t;
        }
        get focus() {
            return this._tf.focus;
        }
        set focus(t) {
            this._tf.focus = t;
        }
        get type() {
            return this._tf.type;
        }
        set type(t) {
            this._tf.type = t;
        }
        setSelection(t, e) {
            this._tf.setSelection(t, e);
        }
    }
    e.ILaya.regClass(k), e.ClassUtils.regClass("laya.ui.TextInput", k), e.ClassUtils.regClass("Laya.TextInput", k);
    class M extends k {
        constructor(t = "") {
            super(t), this.on(e.Event.CHANGE, this, this._onTextChange);
        }
        _onTextChange() {
            this.callLater(this.changeScroll);
        }
        destroy(t = !0) {
            this._vScrollBar && this._vScrollBar.destroy(), this._hScrollBar && this._hScrollBar.destroy(), 
            this._vScrollBar = null, this._hScrollBar = null, super.destroy(t);
        }
        initialize() {
            this.width = 180, this.height = 150, this._tf.wordWrap = !0, this.multiline = !0;
        }
        set width(t) {
            super.width = t, this.callLater(this.changeScroll);
        }
        get width() {
            return super.width;
        }
        set height(t) {
            super.height = t, this.callLater(this.changeScroll);
        }
        get height() {
            return super.height;
        }
        get vScrollBarSkin() {
            return this._vScrollBar ? this._vScrollBar.skin : null;
        }
        set vScrollBarSkin(t) {
            null == this._vScrollBar && (this.addChild(this._vScrollBar = new f()), this._vScrollBar.on(e.Event.CHANGE, this, this.onVBarChanged), 
            this._vScrollBar.target = this._tf, this.callLater(this.changeScroll)), this._vScrollBar.skin = t;
        }
        get hScrollBarSkin() {
            return this._hScrollBar ? this._hScrollBar.skin : null;
        }
        set hScrollBarSkin(t) {
            null == this._hScrollBar && (this.addChild(this._hScrollBar = new S()), this._hScrollBar.on(e.Event.CHANGE, this, this.onHBarChanged), 
            this._hScrollBar.mouseWheelEnable = !1, this._hScrollBar.target = this._tf, this.callLater(this.changeScroll)), 
            this._hScrollBar.skin = t;
        }
        onVBarChanged(t) {
            this._tf.scrollY != this._vScrollBar.value && (this._tf.scrollY = this._vScrollBar.value);
        }
        onHBarChanged(t) {
            this._tf.scrollX != this._hScrollBar.value && (this._tf.scrollX = this._hScrollBar.value);
        }
        get vScrollBar() {
            return this._vScrollBar;
        }
        get hScrollBar() {
            return this._hScrollBar;
        }
        get maxScrollY() {
            return this._tf.maxScrollY;
        }
        get scrollY() {
            return this._tf.scrollY;
        }
        get maxScrollX() {
            return this._tf.maxScrollX;
        }
        get scrollX() {
            return this._tf.scrollX;
        }
        changeScroll() {
            var t = this._vScrollBar && this._tf.maxScrollY > 0, e = this._hScrollBar && this._tf.maxScrollX > 0, s = t ? this._width - this._vScrollBar.width : this._width, h = e ? this._height - this._hScrollBar.height : this._height, r = this._tf.padding || i.labelPadding;
            this._tf.width = s, this._tf.height = h, this._vScrollBar && (this._vScrollBar.x = this._width - this._vScrollBar.width - r[2], 
            this._vScrollBar.y = r[1], this._vScrollBar.height = this._height - (e ? this._hScrollBar.height : 0) - r[1] - r[3], 
            this._vScrollBar.scrollSize = 1, this._vScrollBar.thumbPercent = h / Math.max(this._tf.textHeight, h), 
            this._vScrollBar.setScroll(1, this._tf.maxScrollY, this._tf.scrollY), this._vScrollBar.visible = t), 
            this._hScrollBar && (this._hScrollBar.x = r[0], this._hScrollBar.y = this._height - this._hScrollBar.height - r[3], 
            this._hScrollBar.width = this._width - (t ? this._vScrollBar.width : 0) - r[0] - r[2], 
            this._hScrollBar.scrollSize = Math.max(.033 * s, 1), this._hScrollBar.thumbPercent = s / Math.max(this._tf.textWidth, s), 
            this._hScrollBar.setScroll(0, this.maxScrollX, this.scrollX), this._hScrollBar.visible = e);
        }
        scrollTo(t) {
            this.commitMeasure(), this._tf.scrollY = t;
        }
    }
    e.ILaya.regClass(M), e.ClassUtils.regClass("laya.ui.TextArea", M), e.ClassUtils.regClass("Laya.TextArea", M);
    class O extends c {
        constructor() {
            super(...arguments), this._oldW = 0, this._oldH = 0;
        }
        onEnable() {
            e.ILaya.stage.on("resize", this, this.onResize), this.onResize();
        }
        onDisable() {
            e.ILaya.stage.off("resize", this, this.onResize);
        }
        onResize() {
            let t = e.ILaya.stage;
            if (this.width > 0 && this.height > 0) {
                var s = Math.min(t.width / this._oldW, t.height / this._oldH);
                super.width = t.width, super.height = t.height, this.scale(s, s);
            }
        }
        set width(t) {
            super.width = t, this._oldW = t;
        }
        get width() {
            return super.width;
        }
        set height(t) {
            super.height = t, this._oldH = t;
        }
        get height() {
            return super.height;
        }
    }
    e.ILaya.regClass(O), e.ClassUtils.regClass("laya.ui.ScaleBox", O), e.ClassUtils.regClass("Laya.ScaleBox", O);
    class T extends m {
        constructor(t = null) {
            super(t), this.isVertical = !1;
        }
    }
    e.ILaya.regClass(T), e.ClassUtils.regClass("laya.ui.HSlider", T), e.ClassUtils.regClass("Laya.HSlider", T);
    class z extends c {
        constructor() {
            super(), this._usedCache = null, this._elasticEnabled = !1, this.width = this.height = 100;
        }
        destroy(t = !0) {
            super.destroy(t), this._content && this._content.destroy(t), this._vScrollBar && this._vScrollBar.destroy(t), 
            this._hScrollBar && this._hScrollBar.destroy(t), this._vScrollBar = null, this._hScrollBar = null, 
            this._content = null;
        }
        destroyChildren() {
            this._content.destroyChildren();
        }
        createChildren() {
            super.addChild(this._content = new c());
        }
        addChild(t) {
            return t.on(e.Event.RESIZE, this, this.onResize), this._setScrollChanged(), this._content.addChild(t);
        }
        onResize() {
            this._setScrollChanged();
        }
        addChildAt(t, s) {
            return t.on(e.Event.RESIZE, this, this.onResize), this._setScrollChanged(), this._content.addChildAt(t, s);
        }
        removeChild(t) {
            return t.off(e.Event.RESIZE, this, this.onResize), this._setScrollChanged(), this._content.removeChild(t);
        }
        removeChildAt(t) {
            return this.getChildAt(t).off(e.Event.RESIZE, this, this.onResize), this._setScrollChanged(), 
            this._content.removeChildAt(t);
        }
        removeChildren(t = 0, e = 2147483647) {
            return this._content.removeChildren(t, e), this._setScrollChanged(), this;
        }
        getChildAt(t) {
            return this._content.getChildAt(t);
        }
        getChildByName(t) {
            return this._content.getChildByName(t);
        }
        getChildIndex(t) {
            return this._content.getChildIndex(t);
        }
        get numChildren() {
            return this._content.numChildren;
        }
        changeScroll() {
            this._scrollChanged = !1;
            var t = this.contentWidth || 1, e = this.contentHeight || 1, s = this._vScrollBar, i = this._hScrollBar, h = s && e > this._height, r = i && t > this._width, a = h ? this._width - s.width : this._width, l = r ? this._height - i.height : this._height;
            s && (s.x = this._width - s.width, s.y = 0, s.height = this._height - (r ? i.height : 0), 
            s.scrollSize = Math.max(.033 * this._height, 1), s.thumbPercent = l / e, s.setScroll(0, e - l, s.value)), 
            i && (i.x = 0, i.y = this._height - i.height, i.width = this._width - (h ? s.width : 0), 
            i.scrollSize = Math.max(.033 * this._width, 1), i.thumbPercent = a / t, i.setScroll(0, t - a, i.value));
        }
        _sizeChanged() {
            super._sizeChanged(), this.setContentSize(this._width, this._height);
        }
        get contentWidth() {
            for (var t = 0, e = this._content.numChildren - 1; e > -1; e--) {
                var s = this._content.getChildAt(e);
                t = Math.max(s._x + s.width * s.scaleX - s.pivotX, t);
            }
            return t;
        }
        get contentHeight() {
            for (var t = 0, e = this._content.numChildren - 1; e > -1; e--) {
                var s = this._content.getChildAt(e);
                t = Math.max(s._y + s.height * s.scaleY - s.pivotY, t);
            }
            return t;
        }
        setContentSize(t, s) {
            var i = this._content;
            i.width = t, i.height = s, i._style.scrollRect || (i.scrollRect = e.Rectangle.create()), 
            i._style.scrollRect.setTo(0, 0, t, s), i.scrollRect = i.scrollRect;
        }
        set width(t) {
            super.width = t, this._setScrollChanged();
        }
        get width() {
            return super.width;
        }
        set height(t) {
            super.height = t, this._setScrollChanged();
        }
        get height() {
            return super.height;
        }
        get vScrollBarSkin() {
            return this._vScrollBar ? this._vScrollBar.skin : null;
        }
        set vScrollBarSkin(t) {
            null == this._vScrollBar && (super.addChild(this._vScrollBar = new f()), this._vScrollBar.on(e.Event.CHANGE, this, this.onScrollBarChange, [ this._vScrollBar ]), 
            this._vScrollBar.target = this._content, this._vScrollBar.elasticDistance = this._elasticEnabled ? 200 : 0, 
            this._setScrollChanged()), this._vScrollBar.skin = t;
        }
        get hScrollBarSkin() {
            return this._hScrollBar ? this._hScrollBar.skin : null;
        }
        set hScrollBarSkin(t) {
            null == this._hScrollBar && (super.addChild(this._hScrollBar = new S()), this._hScrollBar.on(e.Event.CHANGE, this, this.onScrollBarChange, [ this._hScrollBar ]), 
            this._hScrollBar.target = this._content, this._hScrollBar.elasticDistance = this._elasticEnabled ? 200 : 0, 
            this._setScrollChanged()), this._hScrollBar.skin = t;
        }
        get vScrollBar() {
            return this._vScrollBar;
        }
        get hScrollBar() {
            return this._hScrollBar;
        }
        get content() {
            return this._content;
        }
        onScrollBarChange(t) {
            var e = this._content._style.scrollRect;
            if (e) {
                var s = Math.round(t.value);
                t.isVertical ? e.y = s : e.x = s, this._content.scrollRect = e;
            }
        }
        scrollTo(t = 0, e = 0) {
            this.vScrollBar && (this.vScrollBar.value = e), this.hScrollBar && (this.hScrollBar.value = t);
        }
        refresh() {
            this.changeScroll();
        }
        set cacheAs(t) {
            super.cacheAs = t, this._usedCache = null, "none" !== t ? (this._hScrollBar && this._hScrollBar.on(e.Event.START, this, this.onScrollStart), 
            this._vScrollBar && this._vScrollBar.on(e.Event.START, this, this.onScrollStart)) : (this._hScrollBar && this._hScrollBar.off(e.Event.START, this, this.onScrollStart), 
            this._vScrollBar && this._vScrollBar.off(e.Event.START, this, this.onScrollStart));
        }
        get cacheAs() {
            return super.cacheAs;
        }
        get elasticEnabled() {
            return this._elasticEnabled;
        }
        set elasticEnabled(t) {
            this._elasticEnabled = t, this._vScrollBar && (this._vScrollBar.elasticDistance = t ? 200 : 0), 
            this._hScrollBar && (this._hScrollBar.elasticDistance = t ? 200 : 0);
        }
        onScrollStart() {
            this._usedCache || (this._usedCache = super.cacheAs), super.cacheAs = "none", this._hScrollBar && this._hScrollBar.once(e.Event.END, this, this.onScrollEnd), 
            this._vScrollBar && this._vScrollBar.once(e.Event.END, this, this.onScrollEnd);
        }
        onScrollEnd() {
            super.cacheAs = this._usedCache;
        }
        _setScrollChanged() {
            this._scrollChanged || (this._scrollChanged = !0, this.callLater(this.changeScroll));
        }
    }
    e.ILaya.regClass(z), e.ClassUtils.regClass("laya.ui.Panel", z), e.ClassUtils.regClass("Laya.Panel", z);
    class U extends m {}
    e.ILaya.regClass(U), e.ClassUtils.regClass("laya.ui.VSlider", U), e.ClassUtils.regClass("Laya.VSlider", U);
    class D extends c {
        constructor() {
            super(), this._spaceLeft = 10, this._spaceBottom = 0, this._keepStatus = !0, this.width = this.height = 200;
        }
        destroy(t = !0) {
            super.destroy(t), this._list && this._list.destroy(t), this._list = null, this._source = null, 
            this._renderHandler = null;
        }
        createChildren() {
            this.addChild(this._list = new y()), this._list.renderHandler = e.Handler.create(this, this.renderItem, null, !1), 
            this._list.repeatX = 1, this._list.on(e.Event.CHANGE, this, this.onListChange);
        }
        onListChange(t = null) {
            this.event(e.Event.CHANGE);
        }
        get keepStatus() {
            return this._keepStatus;
        }
        set keepStatus(t) {
            this._keepStatus = t;
        }
        get array() {
            return this._list.array;
        }
        set array(t) {
            this._keepStatus && this._list.array && t && this.parseOpenStatus(this._list.array, t), 
            this._source = t, this._list.array = this.getArray();
        }
        get source() {
            return this._source;
        }
        get list() {
            return this._list;
        }
        get itemRender() {
            return this._list.itemRender;
        }
        set itemRender(t) {
            this._list.itemRender = t;
        }
        get scrollBarSkin() {
            return this._list.vScrollBarSkin;
        }
        set scrollBarSkin(t) {
            this._list.vScrollBarSkin = t;
        }
        get scrollBar() {
            return this._list.scrollBar;
        }
        get mouseHandler() {
            return this._list.mouseHandler;
        }
        set mouseHandler(t) {
            this._list.mouseHandler = t;
        }
        get renderHandler() {
            return this._renderHandler;
        }
        set renderHandler(t) {
            this._renderHandler = t;
        }
        get spaceLeft() {
            return this._spaceLeft;
        }
        set spaceLeft(t) {
            this._spaceLeft = t;
        }
        get spaceBottom() {
            return this._list.spaceY;
        }
        set spaceBottom(t) {
            this._list.spaceY = t;
        }
        get selectedIndex() {
            return this._list.selectedIndex;
        }
        set selectedIndex(t) {
            this._list.selectedIndex = t;
        }
        get selectedItem() {
            return this._list.selectedItem;
        }
        set selectedItem(t) {
            this._list.selectedItem = t;
        }
        set width(t) {
            super.width = t, this._list.width = t;
        }
        get width() {
            return super.width;
        }
        set height(t) {
            super.height = t, this._list.height = t;
        }
        get height() {
            return super.height;
        }
        getArray() {
            var t = [];
            for (let e in this._source) {
                let s = this._source[e];
                this.getParentOpenStatus(s) && (s.x = this._spaceLeft * this.getDepth(s), t.push(s));
            }
            return t;
        }
        getDepth(t, e = 0) {
            return null == t.nodeParent ? e : this.getDepth(t.nodeParent, e + 1);
        }
        getParentOpenStatus(t) {
            var e = t.nodeParent;
            return null == e || !!e.isOpen && (null == e.nodeParent || this.getParentOpenStatus(e));
        }
        renderItem(t, s) {
            var i = t.dataSource;
            if (i) {
                t.left = i.x;
                var h = t.getChildByName("arrow");
                h && (i.hasChild ? (h.visible = !0, h.index = i.isOpen ? 1 : 0, h.tag = s, h.off(e.Event.CLICK, this, this.onArrowClick), 
                h.on(e.Event.CLICK, this, this.onArrowClick)) : h.visible = !1);
                var r = t.getChildByName("folder");
                r && (2 == r.clipY ? r.index = i.isDirectory ? 0 : 1 : r.index = i.isDirectory ? i.isOpen ? 1 : 0 : 2), 
                this._renderHandler && this._renderHandler.runWith([ t, s ]);
            }
        }
        onArrowClick(t) {
            var s = t.currentTarget.tag;
            this._list.array[s].isOpen = !this._list.array[s].isOpen, this.event(e.Event.OPEN), 
            this._list.array = this.getArray();
        }
        setItemState(t, e) {
            this._list.array[t] && (this._list.array[t].isOpen = e, this._list.array = this.getArray());
        }
        fresh() {
            this._list.array = this.getArray(), this.repaint();
        }
        set dataSource(t) {
            this._dataSource = t, super.dataSource = t;
        }
        get dataSource() {
            return super.dataSource;
        }
        set xml(t) {
            var e = [];
            this.parseXml(t.childNodes[0], e, null, !0), this.array = e;
        }
        parseXml(t, e, s, i) {
            var h, r = t.childNodes, a = r.length;
            if (!i) {
                h = {};
                var l = t.attributes;
                for (let t in l) {
                    var n = l[t], o = n.nodeName, _ = n.nodeValue;
                    h[o] = "true" == _ || "false" != _ && _;
                }
                h.nodeParent = s, a > 0 && (h.isDirectory = !0), h.hasChild = a > 0, e.push(h);
            }
            for (var c = 0; c < a; c++) {
                var d = r[c];
                this.parseXml(d, e, h, !1);
            }
        }
        parseOpenStatus(t, e) {
            for (var s = 0, i = e.length; s < i; s++) {
                var h = e[s];
                if (h.isDirectory) for (var r = 0, a = t.length; r < a; r++) {
                    var l = t[r];
                    if (l.isDirectory && this.isSameParent(l, h) && h.label == l.label) {
                        h.isOpen = l.isOpen;
                        break;
                    }
                }
            }
        }
        isSameParent(t, e) {
            return null == t.nodeParent && null == e.nodeParent || null != t.nodeParent && null != e.nodeParent && (t.nodeParent.label == e.nodeParent.label && this.isSameParent(t.nodeParent, e.nodeParent));
        }
        get selectedPath() {
            return this._list.selectedItem ? this._list.selectedItem.path : null;
        }
        filter(t) {
            if (Boolean(t)) {
                var e = [];
                this.getFilterSource(this._source, e, t), this._list.array = e;
            } else this._list.array = this.getArray();
        }
        getFilterSource(t, e, s) {
            s = s.toLocaleLowerCase();
            for (let i of t) !i.isDirectory && String(i.label).toLowerCase().indexOf(s) > -1 && (i.x = 0, 
            e.push(i)), i.child && i.child.length > 0 && this.getFilterSource(i.child, e, s);
        }
    }
    e.ILaya.regClass(D), e.ClassUtils.regClass("laya.ui.Tree", D), e.ClassUtils.regClass("Laya.Tree", D);
    class H extends c {
        constructor() {
            super(...arguments), this._space = 0, this._align = "none", this._itemChanged = !1;
        }
        addChild(t) {
            return t.on(e.Event.RESIZE, this, this.onResize), this._setItemChanged(), super.addChild(t);
        }
        onResize(t) {
            this._setItemChanged();
        }
        addChildAt(t, s) {
            return t.on(e.Event.RESIZE, this, this.onResize), this._setItemChanged(), super.addChildAt(t, s);
        }
        removeChildAt(t) {
            return this.getChildAt(t).off(e.Event.RESIZE, this, this.onResize), this._setItemChanged(), 
            super.removeChildAt(t);
        }
        refresh() {
            this._setItemChanged();
        }
        changeItems() {
            this._itemChanged = !1;
        }
        get space() {
            return this._space;
        }
        set space(t) {
            this._space = t, this._setItemChanged();
        }
        get align() {
            return this._align;
        }
        set align(t) {
            this._align = t, this._setItemChanged();
        }
        sortItem(t) {
            t && t.sort(function(t, e) {
                return t.y - e.y;
            });
        }
        _setItemChanged() {
            this._itemChanged || (this._itemChanged = !0, this.callLater(this.changeItems));
        }
    }
    e.ILaya.regClass(H), e.ClassUtils.regClass("laya.ui.LayoutBox", H), e.ClassUtils.regClass("Laya.LayoutBox", H);
    class A extends H {
        sortItem(t) {
            t && t.sort(function(t, e) {
                return t.x - e.x;
            });
        }
        set height(t) {
            this._height != t && (super.height = t, this.callLater(this.changeItems));
        }
        get height() {
            return super.height;
        }
        changeItems() {
            this._itemChanged = !1;
            for (var t = [], e = 0, s = 0, i = this.numChildren; s < i; s++) {
                var h = this.getChildAt(s);
                h && (t.push(h), e = this._height ? this._height : Math.max(e, h.height * h.scaleY));
            }
            this.sortItem(t);
            var r = 0;
            for (s = 0, i = t.length; s < i; s++) (h = t[s]).x = r, r += h.width * h.scaleX + this._space, 
            this._align == A.TOP ? h.y = 0 : this._align == A.MIDDLE ? h.y = .5 * (e - h.height * h.scaleY) : this._align == A.BOTTOM && (h.y = e - h.height * h.scaleY);
            this._sizeChanged();
        }
    }
    A.NONE = "none", A.TOP = "top", A.MIDDLE = "middle", A.BOTTOM = "bottom", e.ILaya.regClass(A), 
    e.ClassUtils.regClass("laya.ui.HBox", A), e.ClassUtils.regClass("Laya.HBox", A);
    class N extends H {
        set width(t) {
            this._width != t && (super.width = t, this.callLater(this.changeItems));
        }
        get width() {
            return super.width;
        }
        changeItems() {
            this._itemChanged = !1;
            for (var t = [], e = 0, s = 0, i = this.numChildren; s < i; s++) {
                var h = this.getChildAt(s);
                h && (t.push(h), e = this._width ? this._width : Math.max(e, h.width * h.scaleX));
            }
            this.sortItem(t);
            var r = 0;
            for (s = 0, i = t.length; s < i; s++) (h = t[s]).y = r, r += h.height * h.scaleY + this._space, 
            this._align == N.LEFT ? h.x = 0 : this._align == N.CENTER ? h.x = .5 * (e - h.width * h.scaleX) : this._align == N.RIGHT && (h.x = e - h.width * h.scaleX);
            this._sizeChanged();
        }
    }
    N.NONE = "none", N.LEFT = "left", N.CENTER = "center", N.RIGHT = "right", e.ILaya.regClass(N), 
    e.ClassUtils.regClass("laya.ui.VBox", N), e.ClassUtils.regClass("Laya.VBox", N);
    class P extends g {
        constructor(t = null, e = null) {
            super(), this._valueArr = "", this._indexMap = null, this._sheet = null, this._direction = "horizontal", 
            this._spaceX = 0, this._spaceY = 0, this._align = "left", this._wordsW = 0, this._wordsH = 0, 
            t && (this.skin = t), e && (this.sheet = e);
        }
        createChildren() {
            this._bitmap = new h(), this.on(e.Event.LOADED, this, this._onClipLoaded);
        }
        _onClipLoaded() {
            this.callLater(this.changeValue);
        }
        get sheet() {
            return this._sheet;
        }
        set sheet(t) {
            t += "", this._sheet = t;
            var e = t.split(" ");
            this._clipX = String(e[0]).length, this.clipY = e.length, this._indexMap = {};
            for (var s = 0; s < this._clipY; s++) for (var i = e[s].split(""), h = 0, r = i.length; h < r; h++) this._indexMap[i[h]] = s * this._clipX + h;
        }
        get value() {
            return this._valueArr ? this._valueArr : "";
        }
        set value(t) {
            t += "", this._valueArr = t, this.callLater(this.changeValue);
        }
        get direction() {
            return this._direction;
        }
        set direction(t) {
            this._direction = t, this.callLater(this.changeValue);
        }
        get spaceX() {
            return this._spaceX;
        }
        set spaceX(t) {
            this._spaceX = t, "horizontal" === this._direction && this.callLater(this.changeValue);
        }
        get spaceY() {
            return this._spaceY;
        }
        set spaceY(t) {
            this._spaceY = t, "horizontal" !== this._direction && this.callLater(this.changeValue);
        }
        set align(t) {
            this._align = t, this.callLater(this.changeValue);
        }
        get align() {
            return this._align;
        }
        changeValue() {
            var t;
            if (this._sources && (this._valueArr && (this.graphics.clear(!0), t = this._sources[0]))) {
                var e = "horizontal" === this._direction;
                e ? (this._wordsW = this._valueArr.length * (t.sourceWidth + this.spaceX), this._wordsH = t.sourceHeight) : (this._wordsW = t.sourceWidth, 
                this._wordsH = (t.sourceHeight + this.spaceY) * this._valueArr.length);
                var s = 0;
                if (this._width) switch (this._align) {
                  case "center":
                    s = .5 * (this._width - this._wordsW);
                    break;

                  case "right":
                    s = this._width - this._wordsW;
                    break;

                  default:
                    s = 0;
                }
                for (var i = 0, h = this._valueArr.length; i < h; i++) {
                    var r = this._indexMap[this._valueArr.charAt(i)];
                    this.sources[r] && (t = this.sources[r], e ? this.graphics.drawImage(t, s + i * (t.sourceWidth + this.spaceX), 0, t.sourceWidth, t.sourceHeight) : this.graphics.drawImage(t, 0 + s, i * (t.sourceHeight + this.spaceY), t.sourceWidth, t.sourceHeight));
                }
                this._width || (this._widget.resetLayoutX(), this.callLater(this._sizeChanged)), 
                this._height || (this._widget.resetLayoutY(), this.callLater(this._sizeChanged));
            }
        }
        set width(t) {
            super.width = t, this.callLater(this.changeValue);
        }
        get width() {
            return super.width;
        }
        set height(t) {
            super.height = t, this.callLater(this.changeValue);
        }
        get height() {
            return super.height;
        }
        measureWidth() {
            return this._wordsW;
        }
        measureHeight() {
            return this._wordsH;
        }
        destroy(t = !0) {
            this._valueArr = null, this._indexMap = null, this.graphics.clear(!0), this.removeSelf(), 
            this.off(e.Event.LOADED, this, this._onClipLoaded), super.destroy(t);
        }
    }
    e.ILaya.regClass(P), e.ClassUtils.regClass("laya.ui.FontClip", P), e.ClassUtils.regClass("Laya.FontClip", P);
    class Y extends e.Scene {
        constructor() {
            super(!1), this._watchMap = {}, this._anchorX = NaN, this._anchorY = NaN, this._widget = r.EMPTY, 
            this.createChildren();
        }
        static __init__() {
            e.ILaya.ClassUtils.regShortClassName([ B, d, M, p, c, O, u, g, b, n, S, T, o, C, y, z, w, x, E, v, m, I, k, Y, f, U, D, A, N, e.Animation, e.Text, P ]);
        }
        static regComponent(t, s) {
            e.ILaya.ClassUtils.regClass(t, s);
        }
        static regViewRuntime(t, s) {
            e.ILaya.ClassUtils.regClass(t, s);
        }
        static regUI(t, s) {
            e.ILaya.loader.cacheRes(t, s);
        }
        destroy(t = !0) {
            this._watchMap = null, super.destroy(t);
        }
        changeData(t) {
            var e = this._watchMap[t];
            if (e) for (var s = 0, i = e.length; s < i; s++) {
                e[s].exe(this);
            }
        }
        get top() {
            return this._widget.top;
        }
        set top(t) {
            t != this._widget.top && (this._getWidget().top = t);
        }
        get bottom() {
            return this._widget.bottom;
        }
        set bottom(t) {
            t != this._widget.bottom && (this._getWidget().bottom = t);
        }
        get left() {
            return this._widget.left;
        }
        set left(t) {
            t != this._widget.left && (this._getWidget().left = t);
        }
        get right() {
            return this._widget.right;
        }
        set right(t) {
            t != this._widget.right && (this._getWidget().right = t);
        }
        get centerX() {
            return this._widget.centerX;
        }
        set centerX(t) {
            t != this._widget.centerX && (this._getWidget().centerX = t);
        }
        get centerY() {
            return this._widget.centerY;
        }
        set centerY(t) {
            t != this._widget.centerY && (this._getWidget().centerY = t);
        }
        get anchorX() {
            return this._anchorX;
        }
        set anchorX(t) {
            this._anchorX != t && (this._anchorX = t, this.callLater(this._sizeChanged));
        }
        get anchorY() {
            return this._anchorY;
        }
        set anchorY(t) {
            this._anchorY != t && (this._anchorY = t, this.callLater(this._sizeChanged));
        }
        _sizeChanged() {
            isNaN(this._anchorX) || (this.pivotX = this.anchorX * this.width), isNaN(this._anchorY) || (this.pivotY = this.anchorY * this.height), 
            this.event(e.Event.RESIZE);
        }
        _getWidget() {
            return this._widget === r.EMPTY && (this._widget = this.addComponent(r)), this._widget;
        }
        loadUI(t) {
            var e = Y.uiMap[t];
            Y.uiMap && this.createView(e);
        }
        get dataSource() {
            return this._dataSource;
        }
        set dataSource(t) {
            for (var e in this._dataSource = t, t) {
                var s = this.getChildByName(e);
                s instanceof n ? s.dataSource = t[e] : e in this && !(this[e] instanceof Function) && (this[e] = t[e]);
            }
        }
    }
    Y.uiMap = {}, e.ILaya.regClass(Y), e.ClassUtils.regClass("laya.ui.View", Y), e.ClassUtils.regClass("Laya.View", Y);
    class R {}
    R.Dialog = null;
    class X extends e.Sprite {
        constructor() {
            super(), this.maskLayer = new e.Sprite(), this.popupEffect = (t => {
                t.scale(1, 1), t._effectTween = e.Tween.from(t, {
                    x: e.ILaya.stage.width / 2,
                    y: e.ILaya.stage.height / 2,
                    scaleX: 0,
                    scaleY: 0
                }, 300, e.Ease.backOut, e.Handler.create(this, this.doOpen, [ t ]), 0, !1, !1);
            }), this.closeEffect = (t => {
                t._effectTween = e.Tween.to(t, {
                    x: e.ILaya.stage.width / 2,
                    y: e.ILaya.stage.height / 2,
                    scaleX: 0,
                    scaleY: 0
                }, 300, e.Ease.strongOut, e.Handler.create(this, this.doClose, [ t ]), 0, !1, !1);
            }), this.popupEffectHandler = new e.Handler(this, this.popupEffect), this.closeEffectHandler = new e.Handler(this, this.closeEffect), 
            this.mouseEnabled = this.maskLayer.mouseEnabled = !0, this.zOrder = 1e3, e.ILaya.stage.addChild(this), 
            e.ILaya.stage.on(e.Event.RESIZE, this, this._onResize), s.closeDialogOnSide && this.maskLayer.on("click", this, this._closeOnSide), 
            this._onResize(null);
        }
        _closeOnSide() {
            var t = this.getChildAt(this.numChildren - 1);
            t instanceof R.Dialog && t.close();
        }
        setLockView(t) {
            this.lockLayer || (this.lockLayer = new c(), this.lockLayer.mouseEnabled = !0, this.lockLayer.size(e.ILaya.stage.width, e.ILaya.stage.height)), 
            this.lockLayer.removeChildren(), t && (t.centerX = t.centerY = 0, this.lockLayer.addChild(t));
        }
        _onResize(t = null) {
            var i = this.maskLayer.width = e.ILaya.stage.width, h = this.maskLayer.height = e.ILaya.stage.height;
            this.lockLayer && this.lockLayer.size(i, h), this.maskLayer.graphics.clear(!0), 
            this.maskLayer.graphics.drawRect(0, 0, i, h, s.popupBgColor), this.maskLayer.alpha = s.popupBgAlpha;
            for (var r = this.numChildren - 1; r > -1; r--) {
                var a = this.getChildAt(r);
                a.isPopupCenter && this._centerDialog(a);
            }
        }
        _centerDialog(t) {
            t.x = Math.round((e.ILaya.stage.width - t.width >> 1) + t.pivotX), t.y = Math.round((e.ILaya.stage.height - t.height >> 1) + t.pivotY);
        }
        open(t, s = !1, i = !1) {
            s && this._closeAll(), this._clearDialogEffect(t), t.isPopupCenter && this._centerDialog(t), 
            this.addChild(t), (t.isModal || this._getBit(e.Const.HAS_ZORDER)) && e.ILaya.timer.callLater(this, this._checkMask), 
            i && null != t.popupEffect ? t.popupEffect.runWith(t) : this.doOpen(t), this.event(e.Event.OPEN);
        }
        _clearDialogEffect(t) {
            t._effectTween && (e.Tween.clear(t._effectTween), t._effectTween = null);
        }
        doOpen(t) {
            t.onOpened(t._param);
        }
        lock(t) {
            this.lockLayer && (t ? this.addChild(this.lockLayer) : this.lockLayer.removeSelf());
        }
        close(t) {
            this._clearDialogEffect(t), t.isShowEffect && null != t.closeEffect ? t.closeEffect.runWith([ t ]) : this.doClose(t), 
            this.event(e.Event.CLOSE);
        }
        doClose(t) {
            t.removeSelf(), t.isModal && this._checkMask(), t.closeHandler && t.closeHandler.runWith(t.closeType), 
            t.onClosed(t.closeType), t.autoDestroyAtClosed && t.destroy();
        }
        closeAll() {
            this._closeAll(), this.event(e.Event.CLOSE);
        }
        _closeAll() {
            for (var t = this.numChildren - 1; t > -1; t--) {
                var e = this.getChildAt(t);
                e && null != e.close && this.doClose(e);
            }
        }
        getDialogsByGroup(t) {
            for (var e = [], s = this.numChildren - 1; s > -1; s--) {
                var i = this.getChildAt(s);
                i && i.group === t && e.push(i);
            }
            return e;
        }
        closeByGroup(t) {
            for (var e = [], s = this.numChildren - 1; s > -1; s--) {
                var i = this.getChildAt(s);
                i && i.group === t && (i.close(), e.push(i));
            }
            return e;
        }
        _checkMask() {
            this.maskLayer.removeSelf();
            for (var t = this.numChildren - 1; t > -1; t--) {
                var e = this.getChildAt(t);
                if (e && e.isModal) return void this.addChildAt(this.maskLayer, t);
            }
        }
    }
    e.ClassUtils.regClass("laya.ui.DialogManager", X), e.ClassUtils.regClass("Laya.DialogManager", X);
    class G extends Y {
        constructor() {
            super(), this.isShowEffect = !0, this.isPopupCenter = !0, this.popupEffect = G.manager.popupEffectHandler, 
            this.closeEffect = G.manager.closeEffectHandler, this._dealDragArea(), this.on(e.Event.CLICK, this, this._onClick);
        }
        static get manager() {
            return G._manager = G._manager || new X();
        }
        static set manager(t) {
            G._manager = t;
        }
        _dealDragArea() {
            var t = this.getChildByName("drag");
            t && (this.dragArea = t._x + "," + t._y + "," + t.width + "," + t.height, t.removeSelf());
        }
        get dragArea() {
            return this._dragArea ? this._dragArea.toString() : null;
        }
        set dragArea(t) {
            if (t) {
                var s = l.fillArray([ 0, 0, 0, 0 ], t, Number);
                this._dragArea = new e.Rectangle(s[0], s[1], s[2], s[3]), this.on(e.Event.MOUSE_DOWN, this, this._onMouseDown);
            } else this._dragArea = null, this.off(e.Event.MOUSE_DOWN, this, this._onMouseDown);
        }
        _onMouseDown(t) {
            var e = this.getMousePoint();
            this._dragArea.contains(e.x, e.y) ? this.startDrag() : this.stopDrag();
        }
        _onClick(t) {
            var e = t.target;
            if (e) switch (e.name) {
              case G.CLOSE:
              case G.CANCEL:
              case G.SURE:
              case G.NO:
              case G.OK:
              case G.YES:
                return void this.close(e.name);
            }
        }
        open(t = !0, e = null) {
            this._dealDragArea(), this._param = e, G.manager.open(this, t, this.isShowEffect), 
            G.manager.lock(!1);
        }
        close(t = null) {
            this.closeType = t, G.manager.close(this);
        }
        destroy(t = !0) {
            this.closeHandler = null, this.popupEffect = null, this.closeEffect = null, this._dragArea = null, 
            super.destroy(t);
        }
        show(t = !1, e = !0) {
            this._open(!1, t, e);
        }
        popup(t = !1, e = !0) {
            this._open(!0, t, e);
        }
        _open(t, e, s) {
            this.isModal = t, this.isShowEffect = s, G.manager.lock(!0), this.open(e);
        }
        get isPopup() {
            return null != this.parent;
        }
        set zOrder(t) {
            super.zOrder = t, G.manager._checkMask();
        }
        get zOrder() {
            return super.zOrder;
        }
        static setLockView(t) {
            G.manager.setLockView(t);
        }
        static lock(t) {
            G.manager.lock(t);
        }
        static closeAll() {
            G.manager.closeAll();
        }
        static getDialogsByGroup(t) {
            return G.manager.getDialogsByGroup(t);
        }
        static closeByGroup(t) {
            return G.manager.closeByGroup(t);
        }
    }
    G.CLOSE = "close", G.CANCEL = "cancel", G.SURE = "sure", G.NO = "no", G.YES = "yes", 
    G.OK = "ok", R.Dialog = G, e.ILaya.regClass(G), e.ClassUtils.regClass("laya.ui.Dialog", G), 
    e.ClassUtils.regClass("Laya.Dialog", G);
    class W extends n {
        constructor() {
            super(), this._tipBox = new n(), this._tipBox.addChild(this._tipText = new e.Text()), 
            this._tipText.x = this._tipText.y = 5, this._tipText.color = W.tipTextColor, this._defaultTipHandler = this._showDefaultTip, 
            e.ILaya.stage.on(a.SHOW_TIP, this, this._onStageShowTip), e.ILaya.stage.on(a.HIDE_TIP, this, this._onStageHideTip), 
            this.zOrder = 1100;
        }
        _onStageHideTip(t) {
            e.ILaya.timer.clear(this, this._showTip), this.closeAll(), this.removeSelf();
        }
        _onStageShowTip(t) {
            e.ILaya.timer.once(W.tipDelay, this, this._showTip, [ t ], !0);
        }
        _showTip(t) {
            if ("string" == typeof t) {
                var s = String(t);
                Boolean(s) && this._defaultTipHandler(s);
            } else t instanceof e.Handler ? t.run() : t instanceof Function && t.apply();
            e.ILaya.stage.on(e.Event.MOUSE_MOVE, this, this._onStageMouseMove), e.ILaya.stage.on(e.Event.MOUSE_DOWN, this, this._onStageMouseDown), 
            this._onStageMouseMove(null);
        }
        _onStageMouseDown(t) {
            this.closeAll();
        }
        _onStageMouseMove(t) {
            this._showToStage(this, W.offsetX, W.offsetY);
        }
        _showToStage(t, s = 0, i = 0) {
            var h = t.getBounds();
            t.x = e.ILaya.stage.mouseX + s, t.y = e.ILaya.stage.mouseY + i, t._x + h.width > e.ILaya.stage.width && (t.x -= h.width + s), 
            t._y + h.height > e.ILaya.stage.height && (t.y -= h.height + i);
        }
        closeAll() {
            e.ILaya.timer.clear(this, this._showTip), e.ILaya.stage.off(e.Event.MOUSE_MOVE, this, this._onStageMouseMove), 
            e.ILaya.stage.off(e.Event.MOUSE_DOWN, this, this._onStageMouseDown), this.removeChildren();
        }
        showDislayTip(t) {
            this.addChild(t), this._showToStage(this), e.ILaya.stage.addChild(this);
        }
        _showDefaultTip(t) {
            this._tipText.text = t;
            var s = this._tipBox.graphics;
            s.clear(!0), s.drawRect(0, 0, this._tipText.width + 10, this._tipText.height + 10, W.tipBackColor), 
            this.addChild(this._tipBox), this._showToStage(this), e.ILaya.stage.addChild(this);
        }
        get defaultTipHandler() {
            return this._defaultTipHandler;
        }
        set defaultTipHandler(t) {
            this._defaultTipHandler = t;
        }
    }
    W.offsetX = 10, W.offsetY = 15, W.tipTextColor = "#ffffff", W.tipBackColor = "#111111", 
    W.tipDelay = 200, e.ILaya.regClass(W), e.ClassUtils.regClass("laya.ui.TipManager", W), 
    e.ClassUtils.regClass("Laya.TipManager", W);
    class V extends n {
        constructor() {
            super(), this._width = this._height = 200;
            var t = new e.Texture();
            t.bitmap = new e.Texture2D(), this.texture = t;
        }
        onEnable() {
            this.postMsg({
                type: "display",
                rate: e.Laya.stage.frameRate
            }), window.wx && window.sharedCanvas && e.Laya.timer.frameLoop(1, this, this._onLoop);
        }
        onDisable() {
            this.postMsg({
                type: "undisplay"
            }), e.Laya.timer.clear(this, this._onLoop);
        }
        _onLoop() {
            let t = window.sharedCanvas;
            this.texture.sourceWidth = t.width, this.texture.sourceHeight = t.height, this.texture.bitmap.loadImageSource(t);
        }
        set width(t) {
            super.width = t, window.sharedCanvas && (window.sharedCanvas.width = t), this.callLater(this._postMsg);
        }
        get width() {
            return super.width;
        }
        set height(t) {
            super.height = t, window.sharedCanvas && (window.sharedCanvas.height = t), this.callLater(this._postMsg);
        }
        get height() {
            return super.height;
        }
        set x(t) {
            super.x = t, this.callLater(this._postMsg);
        }
        get x() {
            return super.x;
        }
        set y(t) {
            super.y = t, this.callLater(this._postMsg);
        }
        get y() {
            return super.y;
        }
        _postMsg() {
            var t = new e.Matrix();
            t.translate(this.x, this.y);
            var s = e.Laya.stage;
            t.scale(s._canvasTransform.getScaleX() * this.globalScaleX * s.transform.getScaleX(), s._canvasTransform.getScaleY() * this.globalScaleY * s.transform.getScaleY()), 
            this.postMsg({
                type: "changeMatrix",
                a: t.a,
                b: t.b,
                c: t.c,
                d: t.d,
                tx: t.tx,
                ty: t.ty,
                w: this.width,
                h: this.height
            });
        }
        postMsg(t) {
            window.wx && window.wx.getOpenDataContext && window.wx.getOpenDataContext().postMessage(t);
        }
    }
    e.ILaya.regClass(V), e.ClassUtils.regClass("laya.ui.WXOpenDataViewer", V), e.ClassUtils.regClass("Laya.WXOpenDataViewer", V), 
    t.AdvImage = _, t.AutoBitmap = h, t.Box = c, t.Button = d, t.CheckBox = u, t.Clip = g, 
    t.ColorPicker = p, t.ComboBox = b, t.Dialog = G, t.DialogManager = X, t.FontClip = P, 
    t.HBox = A, t.HScrollBar = S, t.HSlider = T, t.IUI = R, t.Image = o, t.Label = C, 
    t.LayoutBox = H, t.List = y, t.Panel = z, t.ProgressBar = w, t.Radio = x, t.RadioGroup = E, 
    t.ScaleBox = O, t.ScrollBar = v, t.Slider = m, t.Styles = i, t.Tab = I, t.TextArea = M, 
    t.TextInput = k, t.TipManager = W, t.Tree = D, t.UIComponent = n, t.UIConfig = s, 
    t.UIEvent = a, t.UIGroup = L, t.UILib = class {
        static __init__() {}
    }, t.UIUtils = l, t.VBox = N, t.VScrollBar = f, t.VSlider = U, t.View = Y, t.ViewStack = B, 
    t.WXOpenDataViewer = V, t.Widget = r;
}(window.Laya = window.Laya || {}, Laya);