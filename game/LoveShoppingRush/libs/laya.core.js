window.Laya = function (t) {
    "use strict";
    class e { }
    e.animationInterval = 50, e.isAntialias = !1, e.isAlpha = !1, e.premultipliedAlpha = !0,
        e.isStencil = !0, e.preserveDrawingBuffer = !1, e.webGL2D_MeshAllocMaxMem = !0,
        e.is2DPixelArtGame = !1, e.useWebGL2 = !0, e.allowGPUInstanceDynamicBatch = !0,
        e.useRetinalCanvas = !1, window.Config = e;
    class i {
        static regClass(t) {
            i.__classMap[t.name] = t;
        }
    }
    i.Laya = null, i.Timer = null, i.WorkerLoader = null, i.Dragging = null, i.GraphicsBounds = null,
        i.Sprite = null, i.TextRender = null, i.TextAtlas = null, i.timer = null, i.systemTimer = null,
        i.startTimer = null, i.updateTimer = null, i.lateTimer = null, i.physicsTimer = null,
        i.stage = null, i.Loader = null, i.loader = null, i.TTFLoader = null, i.SoundManager = null,
        i.WebAudioSound = null, i.AudioSound = null, i.ShaderCompile = null, i.ClassUtils = null,
        i.SceneUtils = null, i.Context = null, i.Render = null, i.MouseManager = null, i.Text = null,
        i.Browser = null, i.WebGL = null, i.Pool = null, i.Utils = null, i.Graphics = null,
        i.Submit = null, i.Stage = null, i.Resource = null, i.__classMap = {};
    class s {
        static getPoolBySign(t) {
            return s._poolDic[t] || (s._poolDic[t] = []);
        }
        static clearBySign(t) {
            s._poolDic[t] && (s._poolDic[t].length = 0);
        }
        static recover(t, e) {
            e[s.POOLSIGN] || (e[s.POOLSIGN] = !0, s.getPoolBySign(t).push(e));
        }
        static recoverByClass(t) {
            if (t) {
                var e = t.__className || t.constructor._$gid;
                e && s.recover(e, t);
            }
        }
        static _getClassSign(t) {
            var e = t.__className || t._$gid;
            return e || (t._$gid = e = s._CLSID + "", s._CLSID++), e;
        }
        static createByClass(t) {
            return s.getItemByClass(s._getClassSign(t), t);
        }
        static getItemByClass(t, e) {
            if (!s._poolDic[t]) return new e();
            var i = s.getPoolBySign(t);
            if (i.length) {
                var r = i.pop();
                r[s.POOLSIGN] = !1;
            } else r = new e();
            return r;
        }
        static getItemByCreateFun(t, e, i = null) {
            var r = s.getPoolBySign(t), a = r.length ? r.pop() : e.call(i);
            return a[s.POOLSIGN] = !1, a;
        }
        static getItem(t) {
            var e = s.getPoolBySign(t), i = e.length ? e.pop() : null;
            return i && (i[s.POOLSIGN] = !1), i;
        }
    }
    s._CLSID = 0, s.POOLSIGN = "__InPool", s._poolDic = {};
    class r {
        static create(t) {
            var e = s.getItemByClass("AlphaCmd", r);
            return e.alpha = t, e;
        }
        recover() {
            s.recover("AlphaCmd", this);
        }
        run(t, e, i) {
            t.alpha(this.alpha);
        }
        get cmdID() {
            return r.ID;
        }
    }
    r.ID = "Alpha";
    class a {
        static create(t, e, i, r, n, h, o) {
            var l = s.getItemByClass("DrawCircleCmd", a);
            return l.x = t, l.y = e, l.radius = i, l.fillColor = r, l.lineColor = n, l.lineWidth = h,
                l.vid = o, l;
        }
        recover() {
            this.fillColor = null, this.lineColor = null, s.recover("DrawCircleCmd", this);
        }
        run(t, e, i) {
            t._drawCircle(this.x + e, this.y + i, this.radius, this.fillColor, this.lineColor, this.lineWidth, this.vid);
        }
        get cmdID() {
            return a.ID;
        }
    }
    a.ID = "DrawCircle";
    class n {
        static create(t, e, i, r, a) {
            var h = s.getItemByClass("DrawCurvesCmd", n);
            return h.x = t, h.y = e, h.points = i, h.lineColor = r, h.lineWidth = a, h;
        }
        recover() {
            this.points = null, this.lineColor = null, s.recover("DrawCurvesCmd", this);
        }
        run(t, e, i) {
            this.points && t.drawCurves(this.x + e, this.y + i, this.points, this.lineColor, this.lineWidth);
        }
        get cmdID() {
            return n.ID;
        }
    }
    n.ID = "DrawCurves";
    class h {
        static create(t, e, i, r, a) {
            var n = s.getItemByClass("DrawImageCmd", h);
            return n.texture = t, t._addReference(), n.x = e, n.y = i, n.width = r, n.height = a,
                n;
        }
        recover() {
            this.texture && this.texture._removeReference(), this.texture = null, s.recover("DrawImageCmd", this);
        }
        run(t, e, i) {
            this.texture && t.drawTexture(this.texture, this.x + e, this.y + i, this.width, this.height);
        }
        get cmdID() {
            return h.ID;
        }
    }
    h.ID = "DrawImage";
    class o {
        static create(t, e, i, r, a, n, h) {
            var l = s.getItemByClass("DrawLineCmd", o);
            return l.fromX = t, l.fromY = e, l.toX = i, l.toY = r, l.lineColor = a, l.lineWidth = n,
                l.vid = h, l;
        }
        recover() {
            s.recover("DrawLineCmd", this);
        }
        run(t, e, i) {
            t._drawLine(e, i, this.fromX, this.fromY, this.toX, this.toY, this.lineColor, this.lineWidth, this.vid);
        }
        get cmdID() {
            return o.ID;
        }
    }
    o.ID = "DrawLine";
    class l {
        static create(t, e, i, r, a, n) {
            var h = s.getItemByClass("DrawLinesCmd", l);
            return h.x = t, h.y = e, h.points = i, h.lineColor = r, h.lineWidth = a, h.vid = n,
                h;
        }
        recover() {
            this.points = null, this.lineColor = null, s.recover("DrawLinesCmd", this);
        }
        run(t, e, i) {
            this.points && t._drawLines(this.x + e, this.y + i, this.points, this.lineColor, this.lineWidth, this.vid);
        }
        get cmdID() {
            return l.ID;
        }
    }
    l.ID = "DrawLines";
    class _ {
        static create(t, e, i, r, a) {
            var n = s.getItemByClass("DrawPathCmd", _);
            return n.x = t, n.y = e, n.paths = i, n.brush = r, n.pen = a, n;
        }
        recover() {
            this.paths = null, this.brush = null, this.pen = null, s.recover("DrawPathCmd", this);
        }
        run(t, e, i) {
            this.paths && t._drawPath(this.x + e, this.y + i, this.paths, this.brush, this.pen);
        }
        get cmdID() {
            return _.ID;
        }
    }
    _.ID = "DrawPath";
    class u {
        static create(t, e, i, r, a, n, h, o, l) {
            var _ = s.getItemByClass("DrawPieCmd", u);
            return _.x = t, _.y = e, _.radius = i, _._startAngle = r, _._endAngle = a, _.fillColor = n,
                _.lineColor = h, _.lineWidth = o, _.vid = l, _;
        }
        recover() {
            this.fillColor = null, this.lineColor = null, s.recover("DrawPieCmd", this);
        }
        run(t, e, i) {
            t._drawPie(this.x + e, this.y + i, this.radius, this._startAngle, this._endAngle, this.fillColor, this.lineColor, this.lineWidth, this.vid);
        }
        get cmdID() {
            return u.ID;
        }
        get startAngle() {
            return 180 * this._startAngle / Math.PI;
        }
        set startAngle(t) {
            this._startAngle = t * Math.PI / 180;
        }
        get endAngle() {
            return 180 * this._endAngle / Math.PI;
        }
        set endAngle(t) {
            this._endAngle = t * Math.PI / 180;
        }
    }
    u.ID = "DrawPie";
    class c {
        static create(t, e, i, r, a, n, h, o) {
            var l = s.getItemByClass("DrawPolyCmd", c);
            return l.x = t, l.y = e, l.points = i, l.fillColor = r, l.lineColor = a, l.lineWidth = n,
                l.isConvexPolygon = h, l.vid = o, l;
        }
        recover() {
            this.points = null, this.fillColor = null, this.lineColor = null, s.recover("DrawPolyCmd", this);
        }
        run(t, e, i) {
            this.points && t._drawPoly(this.x + e, this.y + i, this.points, this.fillColor, this.lineColor, this.lineWidth, this.isConvexPolygon, this.vid);
        }
        get cmdID() {
            return c.ID;
        }
    }
    c.ID = "DrawPoly";
    class d {
        static create(t, e, i, r, a, n, h) {
            var o = s.getItemByClass("DrawRectCmd", d);
            return o.x = t, o.y = e, o.width = i, o.height = r, o.fillColor = a, o.lineColor = n,
                o.lineWidth = h, o;
        }
        recover() {
            this.fillColor = null, this.lineColor = null, s.recover("DrawRectCmd", this);
        }
        run(t, e, i) {
            t.drawRect(this.x + e, this.y + i, this.width, this.height, this.fillColor, this.lineColor, this.lineWidth);
        }
        get cmdID() {
            return d.ID;
        }
    }
    d.ID = "DrawRect";
    class p {
        constructor(t = 1, e = 0, i = 0, s = 1, r = 0, a = 0, n = 0) {
            if (this._bTransform = !1, null != p._createFun) return p._createFun(t, e, i, s, r, a, n);
            this.a = t, this.b = e, this.c = i, this.d = s, this.tx = r, this.ty = a, this._checkTransform();
        }
        identity() {
            return this.a = this.d = 1, this.b = this.tx = this.ty = this.c = 0, this._bTransform = !1,
                this;
        }
        _checkTransform() {
            return this._bTransform = 1 !== this.a || 0 !== this.b || 0 !== this.c || 1 !== this.d;
        }
        setTranslate(t, e) {
            return this.tx = t, this.ty = e, this;
        }
        translate(t, e) {
            return this.tx += t, this.ty += e, this;
        }
        scale(t, e) {
            return this.a *= t, this.d *= e, this.c *= t, this.b *= e, this.tx *= t, this.ty *= e,
                this._bTransform = !0, this;
        }
        rotate(t) {
            var e = Math.cos(t), i = Math.sin(t), s = this.a, r = this.c, a = this.tx;
            return this.a = s * e - this.b * i, this.b = s * i + this.b * e, this.c = r * e - this.d * i,
                this.d = r * i + this.d * e, this.tx = a * e - this.ty * i, this.ty = a * i + this.ty * e,
                this._bTransform = !0, this;
        }
        skew(t, e) {
            var i = Math.tan(t), s = Math.tan(e), r = this.a, a = this.b;
            return this.a += s * this.c, this.b += s * this.d, this.c += i * r, this.d += i * a,
                this;
        }
        invertTransformPoint(t) {
            var e = this.a, i = this.b, s = this.c, r = this.d, a = this.tx, n = e * r - i * s, h = r / n, o = -i / n, l = -s / n, _ = e / n, u = (s * this.ty - r * a) / n, c = -(e * this.ty - i * a) / n;
            return t.setTo(h * t.x + l * t.y + u, o * t.x + _ * t.y + c);
        }
        transformPoint(t) {
            return t.setTo(this.a * t.x + this.c * t.y + this.tx, this.b * t.x + this.d * t.y + this.ty);
        }
        transformPointN(t) {
            return t.setTo(this.a * t.x + this.c * t.y, this.b * t.x + this.d * t.y);
        }
        getScaleX() {
            return 0 === this.b ? this.a : Math.sqrt(this.a * this.a + this.b * this.b);
        }
        getScaleY() {
            return 0 === this.c ? this.d : Math.sqrt(this.c * this.c + this.d * this.d);
        }
        invert() {
            var t = this.a, e = this.b, i = this.c, s = this.d, r = this.tx, a = t * s - e * i;
            return this.a = s / a, this.b = -e / a, this.c = -i / a, this.d = t / a, this.tx = (i * this.ty - s * r) / a,
                this.ty = -(t * this.ty - e * r) / a, this;
        }
        setTo(t, e, i, s, r, a) {
            return this.a = t, this.b = e, this.c = i, this.d = s, this.tx = r, this.ty = a,
                this;
        }
        concat(t) {
            var e = this.a, i = this.c, s = this.tx;
            return this.a = e * t.a + this.b * t.c, this.b = e * t.b + this.b * t.d, this.c = i * t.a + this.d * t.c,
                this.d = i * t.b + this.d * t.d, this.tx = s * t.a + this.ty * t.c + t.tx, this.ty = s * t.b + this.ty * t.d + t.ty,
                this;
        }
        static mul(t, e, i) {
            var s = t.a, r = t.b, a = t.c, n = t.d, h = t.tx, o = t.ty, l = e.a, _ = e.b, u = e.c, c = e.d, d = e.tx, p = e.ty;
            return 0 !== _ || 0 !== u ? (i.a = s * l + r * u, i.b = s * _ + r * c, i.c = a * l + n * u,
                i.d = a * _ + n * c, i.tx = l * h + u * o + d, i.ty = _ * h + c * o + p) : (i.a = s * l,
                    i.b = r * c, i.c = a * l, i.d = n * c, i.tx = l * h + d, i.ty = c * o + p), i;
        }
        static mul16(t, e, i) {
            var s = t.a, r = t.b, a = t.c, n = t.d, h = t.tx, o = t.ty, l = e.a, _ = e.b, u = e.c, c = e.d, d = e.tx, p = e.ty;
            return 0 !== _ || 0 !== u ? (i[0] = s * l + r * u, i[1] = s * _ + r * c, i[4] = a * l + n * u,
                i[5] = a * _ + n * c, i[12] = l * h + u * o + d, i[13] = _ * h + c * o + p) : (i[0] = s * l,
                    i[1] = r * c, i[4] = a * l, i[5] = n * c, i[12] = l * h + d, i[13] = c * o + p),
                i;
        }
        scaleEx(t, e) {
            var i = this.a, s = this.b, r = this.c, a = this.d;
            0 !== s || 0 !== r ? (this.a = t * i, this.b = t * s, this.c = e * r, this.d = e * a) : (this.a = t * i,
                this.b = 0 * a, this.c = 0 * i, this.d = e * a), this._bTransform = !0;
        }
        rotateEx(t) {
            var e = Math.cos(t), i = Math.sin(t), s = this.a, r = this.b, a = this.c, n = this.d;
            0 !== r || 0 !== a ? (this.a = e * s + i * a, this.b = e * r + i * n, this.c = -i * s + e * a,
                this.d = -i * r + e * n) : (this.a = e * s, this.b = i * n, this.c = -i * s, this.d = e * n),
                this._bTransform = !0;
        }
        clone() {
            var t = p.create();
            return t.a = this.a, t.b = this.b, t.c = this.c, t.d = this.d, t.tx = this.tx, t.ty = this.ty,
                t._bTransform = this._bTransform, t;
        }
        copyTo(t) {
            return t.a = this.a, t.b = this.b, t.c = this.c, t.d = this.d, t.tx = this.tx, t.ty = this.ty,
                t._bTransform = this._bTransform, t;
        }
        toString() {
            return this.a + "," + this.b + "," + this.c + "," + this.d + "," + this.tx + "," + this.ty;
        }
        destroy() {
            this.recover();
        }
        recover() {
            s.recover("Matrix", this.identity());
        }
        static create() {
            return s.getItemByClass("Matrix", p);
        }
    }
    p.EMPTY = new p(), p.TEMP = new p(), p._createFun = null;
    class f {
        constructor(t = 0, e = 0) {
            this.x = t, this.y = e;
        }
        static create() {
            return s.getItemByClass("Point", f);
        }
        setTo(t, e) {
            return this.x = t, this.y = e, this;
        }
        reset() {
            return this.x = this.y = 0, this;
        }
        recover() {
            s.recover("Point", this.reset());
        }
        distance(t, e) {
            return Math.sqrt((this.x - t) * (this.x - t) + (this.y - e) * (this.y - e));
        }
        toString() {
            return this.x + "," + this.y;
        }
        normalize() {
            var t = Math.sqrt(this.x * this.x + this.y * this.y);
            if (t > 0) {
                var e = 1 / t;
                this.x *= e, this.y *= e;
            }
        }
        copy(t) {
            return this.setTo(t.x, t.y);
        }
    }
    f.TEMP = new f(), f.EMPTY = new f();
    class g {
        constructor(t = 0, e = 0, i = 0, s = 0) {
            this.x = t, this.y = e, this.width = i, this.height = s;
        }
        get right() {
            return this.x + this.width;
        }
        get bottom() {
            return this.y + this.height;
        }
        setTo(t, e, i, s) {
            return this.x = t, this.y = e, this.width = i, this.height = s, this;
        }
        reset() {
            return this.x = this.y = this.width = this.height = 0, this;
        }
        recover() {
            this != g.TEMP && this != g.EMPTY ? s.recover("Rectangle", this.reset()) : console.log("recover Temp or Empty:", this);
        }
        static create() {
            return s.getItemByClass("Rectangle", g);
        }
        copyFrom(t) {
            return this.x = t.x, this.y = t.y, this.width = t.width, this.height = t.height,
                this;
        }
        contains(t, e) {
            return !(this.width <= 0 || this.height <= 0) && (t >= this.x && t < this.right && e >= this.y && e < this.bottom);
        }
        intersects(t) {
            return !(t.x > this.x + this.width || t.x + t.width < this.x || t.y > this.y + this.height || t.y + t.height < this.y);
        }
        intersection(t, e = null) {
            return this.intersects(t) ? (e || (e = new g()), e.x = Math.max(this.x, t.x), e.y = Math.max(this.y, t.y),
                e.width = Math.min(this.right, t.right) - e.x, e.height = Math.min(this.bottom, t.bottom) - e.y,
                e) : null;
        }
        union(t, e = null) {
            return e || (e = new g()), this.clone(e), t.width <= 0 || t.height <= 0 ? e : (e.addPoint(t.x, t.y),
                e.addPoint(t.right, t.bottom), this);
        }
        clone(t = null) {
            return t || (t = new g()), t.x = this.x, t.y = this.y, t.width = this.width, t.height = this.height,
                t;
        }
        toString() {
            return this.x + "," + this.y + "," + this.width + "," + this.height;
        }
        equals(t) {
            return !(!t || t.x !== this.x || t.y !== this.y || t.width !== this.width || t.height !== this.height);
        }
        addPoint(t, e) {
            return this.x > t && (this.width += this.x - t, this.x = t), this.y > e && (this.height += this.y - e,
                this.y = e), this.width < t - this.x && (this.width = t - this.x), this.height < e - this.y && (this.height = e - this.y),
                this;
        }
        _getBoundPoints() {
            var t = g._temB;
            return t.length = 0, 0 == this.width || 0 == this.height ? t : (t.push(this.x, this.y, this.x + this.width, this.y, this.x, this.y + this.height, this.x + this.width, this.y + this.height),
                t);
        }
        static _getBoundPointS(t, e, i, s) {
            var r = g._temA;
            return r.length = 0, 0 == i || 0 == s ? r : (r.push(t, e, t + i, e, t, e + s, t + i, e + s),
                r);
        }
        static _getWrapRec(t, e = null) {
            if (!t || t.length < 1) return e ? e.setTo(0, 0, 0, 0) : g.TEMP.setTo(0, 0, 0, 0);
            e = e || g.create();
            var i, s, r, a, n, h = t.length, o = f.TEMP;
            for (r = n = -(s = a = 99999), i = 0; i < h; i += 2) o.x = t[i], o.y = t[i + 1],
                s = s < o.x ? s : o.x, a = a < o.y ? a : o.y, r = r > o.x ? r : o.x, n = n > o.y ? n : o.y;
            return e.setTo(s, a, r - s, n - a);
        }
        isEmpty() {
            return this.width <= 0 || this.height <= 0;
        }
    }
    g.EMPTY = new g(), g.TEMP = new g(), g._temB = [], g._temA = [];
    class m { }
    m.ARRAY_BUFFER_TYPE_DATA = 0, m.ARRAY_BUFFER_TYPE_CMD = 1, m.ARRAY_BUFFER_REF_REFERENCE = 0,
        m.ARRAY_BUFFER_REF_COPY = 1, m.UPLOAD_SHADER_UNIFORM_TYPE_ID = 0, m.UPLOAD_SHADER_UNIFORM_TYPE_DATA = 1;
    class v {
        static __init__() {
            var t = m.instance;
            v._depthFunc = t.LESS, v._blendEquation = t.FUNC_ADD, v._blendEquationRGB = t.FUNC_ADD,
                v._blendEquationAlpha = t.FUNC_ADD, v._sFactor = t.ONE, v._dFactor = t.ZERO, v._sFactorAlpha = t.ONE,
                v._dFactorAlpha = t.ZERO, v._activedTextureID = t.TEXTURE0, v._glTextureIDs = [t.TEXTURE0, t.TEXTURE1, t.TEXTURE2, t.TEXTURE3, t.TEXTURE4, t.TEXTURE5, t.TEXTURE6, t.TEXTURE7];
        }
        static useProgram(t, e) {
            return v._useProgram !== e && (t.useProgram(e), v._useProgram = e, !0);
        }
        static setDepthTest(t, e) {
            e !== v._depthTest && (v._depthTest = e, e ? t.enable(t.DEPTH_TEST) : t.disable(t.DEPTH_TEST));
        }
        static setDepthMask(t, e) {
            e !== v._depthMask && (v._depthMask = e, t.depthMask(e));
        }
        static setDepthFunc(t, e) {
            e !== v._depthFunc && (v._depthFunc = e, t.depthFunc(e));
        }
        static setBlend(t, e) {
            e !== v._blend && (v._blend = e, e ? t.enable(t.BLEND) : t.disable(t.BLEND));
        }
        static setBlendEquation(t, e) {
            e !== v._blendEquation && (v._blendEquation = e, v._blendEquationRGB = v._blendEquationAlpha = null,
                t.blendEquation(e));
        }
        static setBlendEquationSeparate(t, e, i) {
            e === v._blendEquationRGB && i === v._blendEquationAlpha || (v._blendEquationRGB = e,
                v._blendEquationAlpha = i, v._blendEquation = null, t.blendEquationSeparate(e, i));
        }
        static setBlendFunc(t, e, i, s = !1) {
            (s || e !== v._sFactor || i !== v._dFactor) && (v._sFactor = e, v._dFactor = i,
                v._sFactorRGB = null, v._dFactorRGB = null, v._sFactorAlpha = null, v._dFactorAlpha = null,
                t.blendFunc(e, i));
        }
        static setBlendFuncSeperate(t, e, i, s, r) {
            e === v._sFactorRGB && i === v._dFactorRGB && s === v._sFactorAlpha && r === v._dFactorAlpha || (v._sFactorRGB = e,
                v._dFactorRGB = i, v._sFactorAlpha = s, v._dFactorAlpha = r, v._sFactor = null,
                v._dFactor = null, t.blendFuncSeparate(e, i, s, r));
        }
        static setCullFace(t, e) {
            e !== v._cullFace && (v._cullFace = e, e ? t.enable(t.CULL_FACE) : t.disable(t.CULL_FACE));
        }
        static setFrontFace(t, e) {
            e !== v._frontFace && (v._frontFace = e, t.frontFace(e));
        }
        static activeTexture(t, e) {
            v._activedTextureID !== e && (t.activeTexture(e), v._activedTextureID = e);
        }
        static bindTexture(t, e, i) {
            v._activeTextures[v._activedTextureID - t.TEXTURE0] !== i && (t.bindTexture(e, i),
                v._activeTextures[v._activedTextureID - t.TEXTURE0] = i);
        }
        static __init_native() {
            if (i.Render.supportWebGLPlusRendering) {
                var t = v;
                t.activeTexture = t.activeTextureForNative, t.bindTexture = t.bindTextureForNative;
            }
        }
        static useProgramForNative(t, e) {
            return t.useProgram(e), !0;
        }
        static setDepthTestForNative(t, e) {
            e ? t.enable(t.DEPTH_TEST) : t.disable(t.DEPTH_TEST);
        }
        static setDepthMaskForNative(t, e) {
            t.depthMask(e);
        }
        static setDepthFuncForNative(t, e) {
            t.depthFunc(e);
        }
        static setBlendForNative(t, e) {
            e ? t.enable(t.BLEND) : t.disable(t.BLEND);
        }
        static setBlendFuncForNative(t, e, i) {
            t.blendFunc(e, i);
        }
        static setCullFaceForNative(t, e) {
            e ? t.enable(t.CULL_FACE) : t.disable(t.CULL_FACE);
        }
        static setFrontFaceForNative(t, e) {
            t.frontFace(e);
        }
        static activeTextureForNative(t, e) {
            t.activeTexture(e);
        }
        static bindTextureForNative(t, e, i) {
            t.bindTexture(e, i);
        }
        static bindVertexArrayForNative(t, e) {
            t.bindVertexArray(e);
        }
    }
    v._activeTextures = new Array(8), v._useProgram = null, v._depthTest = !0, v._depthMask = !0,
        v._blend = !1, v._cullFace = !1, v.mainContext = null;
    class T {
        constructor(t = null, e = null, i = null, s = !1) {
            this.once = !1, this._id = 0, this.setTo(t, e, i, s);
        }
        setTo(t, e, i, s = !1) {
            return this._id = T._gid++, this.caller = t, this.method = e, this.args = i, this.once = s,
                this;
        }
        run() {
            if (null == this.method) return null;
            var t = this._id, e = this.method.apply(this.caller, this.args);
            return this._id === t && this.once && this.recover(), e;
        }
        runWith(t) {
            if (null == this.method) return null;
            var e = this._id;
            if (null == t) var i = this.method.apply(this.caller, this.args); else i = this.args || t.unshift ? this.args ? this.method.apply(this.caller, this.args.concat(t)) : this.method.apply(this.caller, t) : this.method.call(this.caller, t);
            return this._id === e && this.once && this.recover(), i;
        }
        clear() {
            return this.caller = null, this.method = null, this.args = null, this;
        }
        recover() {
            this._id > 0 && (this._id = 0, T._pool.push(this.clear()));
        }
        static create(t, e, i = null, s = !0) {
            return T._pool.length ? T._pool.pop().setTo(t, e, i, s) : new T(t, e, i, s);
        }
    }
    T._pool = [], T._gid = 1;
    class x {
        hasListener(t) {
            return !!(this._events && this._events[t]);
        }
        event(t, e = null) {
            if (!this._events || !this._events[t]) return !1;
            var i = this._events[t];
            if (i.run) i.once && delete this._events[t], null != e ? i.runWith(e) : i.run(); else {
                for (var s = 0, r = i.length; s < r; s++) {
                    var a = i[s];
                    a && (null != e ? a.runWith(e) : a.run()), a && !a.once || (i.splice(s, 1), s--,
                        r--);
                }
                0 === i.length && this._events && delete this._events[t];
            }
            return !0;
        }
        on(t, e, i, s = null) {
            return this._createListener(t, e, i, s, !1);
        }
        once(t, e, i, s = null) {
            return this._createListener(t, e, i, s, !0);
        }
        _createListener(t, e, i, s, r, a = !0) {
            a && this.off(t, e, i, r);
            var n = y.create(e || this, i, s, r);
            this._events || (this._events = {});
            var h = this._events;
            return h[t] ? h[t].run ? h[t] = [h[t], n] : h[t].push(n) : h[t] = n, this;
        }
        off(t, e, i, s = !1) {
            if (!this._events || !this._events[t]) return this;
            var r = this._events[t];
            if (null != r) if (r.run) e && r.caller !== e || null != i && r.method !== i || s && !r.once || (delete this._events[t],
                r.recover()); else {
                for (var a = 0, n = 0, h = r.length; n < h; n++) {
                    var o = r[n];
                    o ? !o || e && o.caller !== e || null != i && o.method !== i || s && !o.once || (a++,
                        r[n] = null, o.recover()) : a++;
                }
                a === h && delete this._events[t];
            }
            return this;
        }
        offAll(t = null) {
            var e = this._events;
            if (!e) return this;
            if (t) this._recoverHandlers(e[t]), delete e[t]; else {
                for (var i in e) this._recoverHandlers(e[i]);
                this._events = null;
            }
            return this;
        }
        offAllCaller(t) {
            if (t && this._events) for (var e in this._events) this.off(e, t, null);
            return this;
        }
        _recoverHandlers(t) {
            if (t) if (t.run) t.recover(); else for (var e = t.length - 1; e > -1; e--) t[e] && (t[e].recover(),
                t[e] = null);
        }
        isMouseEvent(t) {
            return x.MOUSE_EVENTS[t] || !1;
        }
    }
    x.MOUSE_EVENTS = {
        rightmousedown: !0,
        rightmouseup: !0,
        rightclick: !0,
        mousedown: !0,
        mouseup: !0,
        mousemove: !0,
        mouseover: !0,
        mouseout: !0,
        click: !0,
        doubleclick: !0
    };
    class y extends T {
        constructor(t, e, i, s) {
            super(t, e, i, s);
        }
        recover() {
            this._id > 0 && (this._id = 0, y._pool.push(this.clear()));
        }
        static create(t, e, i = null, s = !0) {
            return y._pool.length ? y._pool.pop().setTo(t, e, i, s) : new y(t, e, i, s);
        }
    }
    y._pool = [];
    class E {
        constructor(t) {
            this._url = E.formatURL(t), this._path = E.getPath(t);
        }
        get url() {
            return this._url;
        }
        get path() {
            return this._path;
        }
        static set basePath(t) {
            E._basePath = i.Laya._getUrlPath(), E._basePath = E.formatURL(t);
        }
        static get basePath() {
            return E._basePath;
        }
        static formatURL(t) {
            if (!t) return "null path";
            if (t.indexOf(":") > 0) return t;
            if (null != E.customFormat && (t = E.customFormat(t)), t.indexOf(":") > 0) return t;
            var e = t.charAt(0);
            if ("." === e) return E._formatRelativePath(E._basePath + t);
            if ("~" === e) return E.rootPath + t.substring(1);
            if ("d" === e) {
                if (0 === t.indexOf("data:image")) return t;
            } else if ("/" === e) return t;
            return E._basePath + t;
        }
        static _formatRelativePath(t) {
            for (var e = t.split("/"), i = 0, s = e.length; i < s; i++) ".." == e[i] && (e.splice(i - 1, 2),
                i -= 2);
            return e.join("/");
        }
        static getPath(t) {
            var e = t.lastIndexOf("/");
            return e > 0 ? t.substr(0, e + 1) : "";
        }
        static getFileName(t) {
            var e = t.lastIndexOf("/");
            return e > 0 ? t.substr(e + 1) : t;
        }
        static getAdptedFilePath(t) {
            if (!E.exportSceneToJson || !t) return t;
            var e, i, s;
            for (i = E._adpteTypeList.length, e = 0; e < i; e++) s = E._adpteTypeList[e], t = t.replace(s[0], s[1]);
            return t;
        }
    }
    E.version = {}, E.exportSceneToJson = !1, E._basePath = "", E.rootPath = "", E.customFormat = function (t) {
        var e = E.version[t];
        return !window.conch && e && (t += "?v=" + e), t;
    }, E._adpteTypeList = [[".scene3d", ".json"], [".scene", ".json"], [".taa", ".json"], [".prefab", ".json"]];
    class b extends x {
        constructor() {
            super(), this._id = 0, this._url = null, this._cpuMemory = 0, this._gpuMemory = 0,
                this._destroyed = !1, this._referenceCount = 0, this.lock = !1, this.name = null,
                this._id = ++b._uniqueIDCounter, this._destroyed = !1, this._referenceCount = 0,
                b._idResourcesMap[this.id] = this, this.lock = !1;
        }
        static get cpuMemory() {
            return b._cpuMemory;
        }
        static get gpuMemory() {
            return b._gpuMemory;
        }
        static _addCPUMemory(t) {
            b._cpuMemory += t;
        }
        static _addGPUMemory(t) {
            b._gpuMemory += t;
        }
        static _addMemory(t, e) {
            b._cpuMemory += t, b._gpuMemory += e;
        }
        static getResourceByID(t) {
            return b._idResourcesMap[t];
        }
        static getResourceByURL(t, e = 0) {
            return b._urlResourcesMap[t][e];
        }
        static destroyUnusedResources() {
            for (var t in b._idResourcesMap) {
                var e = b._idResourcesMap[t];
                e.lock || 0 !== e._referenceCount || e.destroy();
            }
        }
        get id() {
            return this._id;
        }
        get url() {
            return this._url;
        }
        get cpuMemory() {
            return this._cpuMemory;
        }
        get gpuMemory() {
            return this._gpuMemory;
        }
        get destroyed() {
            return this._destroyed;
        }
        get referenceCount() {
            return this._referenceCount;
        }
        _setCPUMemory(t) {
            var e = t - this._cpuMemory;
            this._cpuMemory = t, b._addCPUMemory(e);
        }
        _setGPUMemory(t) {
            var e = t - this._gpuMemory;
            this._gpuMemory = t, b._addGPUMemory(e);
        }
        _setCreateURL(t) {
            var e;
            (t = E.formatURL(t), this._url !== t) && (this._url && ((e = b._urlResourcesMap[this._url]).splice(e.indexOf(this), 1),
                0 === e.length && delete b._urlResourcesMap[this._url]), t && ((e = b._urlResourcesMap[t]) || (b._urlResourcesMap[t] = e = []),
                    e.push(this)), this._url = t);
        }
        _addReference(t = 1) {
            this._referenceCount += t;
        }
        _removeReference(t = 1) {
            this._referenceCount -= t;
        }
        _clearReference() {
            this._referenceCount = 0;
        }
        _recoverResource() { }
        _disposeResource() { }
        _activeResource() { }
        destroy() {
            var t;
            this._destroyed || (this._destroyed = !0, this.lock = !1, this._disposeResource(),
                delete b._idResourcesMap[this.id], this._url && ((t = b._urlResourcesMap[this._url]) && (t.splice(t.indexOf(this), 1),
                    0 === t.length && delete b._urlResourcesMap[this._url]), i.Loader.loadedMap[this._url] == this && delete i.Loader.loadedMap[this._url]));
        }
    }
    b._uniqueIDCounter = 0, b._idResourcesMap = {}, b._urlResourcesMap = {}, b._cpuMemory = 0,
        b._gpuMemory = 0;
    class w extends b {
        constructor() {
            super(), this._width = -1, this._height = -1;
        }
        get width() {
            return this._width;
        }
        set width(t) {
            this._width = t;
        }
        get height() {
            return this._height;
        }
        set height(t) {
            this._height = t;
        }
        _getSource() {
            throw "Bitmap: must override it.";
        }
    }
    var C, A, R, M, S;
    (C = t.FilterMode || (t.FilterMode = {}))[C.Point = 0] = "Point", C[C.Bilinear = 1] = "Bilinear",
        C[C.Trilinear = 2] = "Trilinear", (A = t.TextureFormat || (t.TextureFormat = {}))[A.R8G8B8 = 0] = "R8G8B8",
        A[A.R8G8B8A8 = 1] = "R8G8B8A8", A[A.R5G6B5 = 16] = "R5G6B5", A[A.Alpha8 = 2] = "Alpha8",
        A[A.DXT1 = 3] = "DXT1", A[A.DXT5 = 4] = "DXT5", A[A.ETC1RGB = 5] = "ETC1RGB", A[A.PVRTCRGB_2BPPV = 9] = "PVRTCRGB_2BPPV",
        A[A.PVRTCRGBA_2BPPV = 10] = "PVRTCRGBA_2BPPV", A[A.PVRTCRGB_4BPPV = 11] = "PVRTCRGB_4BPPV",
        A[A.PVRTCRGBA_4BPPV = 12] = "PVRTCRGBA_4BPPV", A[A.R32G32B32A32 = 15] = "R32G32B32A32",
        A[A.R16G16B16A16 = 17] = "R16G16B16A16", (R = t.WarpMode || (t.WarpMode = {}))[R.Repeat = 0] = "Repeat",
        R[R.Clamp = 1] = "Clamp";
    class I extends w {
        constructor(e, i) {
            super(), this._wrapModeU = t.WarpMode.Repeat, this._wrapModeV = t.WarpMode.Repeat,
                this._filterMode = t.FilterMode.Bilinear, this._readyed = !1, this._width = -1,
                this._height = -1, this._format = e, this._mipmap = i, this._anisoLevel = 1, this._glTexture = m.instance.createTexture();
        }
        get mipmap() {
            return this._mipmap;
        }
        get format() {
            return this._format;
        }
        get wrapModeU() {
            return this._wrapModeU;
        }
        set wrapModeU(t) {
            this._wrapModeU !== t && (this._wrapModeU = t, -1 !== this._width && this._setWarpMode(m.instance.TEXTURE_WRAP_S, t));
        }
        get wrapModeV() {
            return this._wrapModeV;
        }
        set wrapModeV(t) {
            this._wrapModeV !== t && (this._wrapModeV = t, -1 !== this._height && this._setWarpMode(m.instance.TEXTURE_WRAP_T, t));
        }
        get filterMode() {
            return this._filterMode;
        }
        set filterMode(t) {
            t !== this._filterMode && (this._filterMode = t, -1 !== this._width && -1 !== this._height && this._setFilterMode(t));
        }
        get anisoLevel() {
            return this._anisoLevel;
        }
        set anisoLevel(t) {
            t !== this._anisoLevel && (this._anisoLevel = Math.max(1, Math.min(16, t)), -1 !== this._width && -1 !== this._height && this._setAnisotropy(t));
        }
        get mipmapCount() {
            return this._mipmapCount;
        }
        get defaulteTexture() {
            throw "BaseTexture:must override it.";
        }
        _getFormatByteCount() {
            switch (this._format) {
                case t.TextureFormat.R8G8B8:
                    return 3;

                case t.TextureFormat.R8G8B8A8:
                    return 4;

                case t.TextureFormat.R5G6B5:
                case t.TextureFormat.Alpha8:
                    return 1;

                case t.TextureFormat.R16G16B16A16:
                    return 2;

                case t.TextureFormat.R32G32B32A32:
                    return 4;

                default:
                    throw "Texture2D: unknown format.";
            }
        }
        _isPot(t) {
            return 0 == (t & t - 1);
        }
        _getGLFormat() {
            var e, i = m.instance, s = m.layaGPUInstance;
            switch (this._format) {
                case t.TextureFormat.R8G8B8:
                case t.TextureFormat.R5G6B5:
                    e = i.RGB;
                    break;

                case t.TextureFormat.R8G8B8A8:
                    e = i.RGBA;
                    break;

                case t.TextureFormat.Alpha8:
                    e = i.ALPHA;
                    break;

                case t.TextureFormat.R32G32B32A32:
                case t.TextureFormat.R16G16B16A16:
                    e = i.RGBA;
                    break;

                case t.TextureFormat.DXT1:
                    if (!s._compressedTextureS3tc) throw "BaseTexture: not support DXT1 format.";
                    e = s._compressedTextureS3tc.COMPRESSED_RGB_S3TC_DXT1_EXT;
                    break;

                case t.TextureFormat.DXT5:
                    if (!s._compressedTextureS3tc) throw "BaseTexture: not support DXT5 format.";
                    e = s._compressedTextureS3tc.COMPRESSED_RGBA_S3TC_DXT5_EXT;
                    break;

                case t.TextureFormat.ETC1RGB:
                    if (!s._compressedTextureEtc1) throw "BaseTexture: not support ETC1RGB format.";
                    e = s._compressedTextureEtc1.COMPRESSED_RGB_ETC1_WEBGL;
                    break;

                case t.TextureFormat.PVRTCRGB_2BPPV:
                    if (!s._compressedTexturePvrtc) throw "BaseTexture: not support PVRTCRGB_2BPPV format.";
                    e = s._compressedTexturePvrtc.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;
                    break;

                case t.TextureFormat.PVRTCRGBA_2BPPV:
                    if (!s._compressedTexturePvrtc) throw "BaseTexture: not support PVRTCRGBA_2BPPV format.";
                    e = s._compressedTexturePvrtc.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG;
                    break;

                case t.TextureFormat.PVRTCRGB_4BPPV:
                    if (!s._compressedTexturePvrtc) throw "BaseTexture: not support PVRTCRGB_4BPPV format.";
                    e = s._compressedTexturePvrtc.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;
                    break;

                case t.TextureFormat.PVRTCRGBA_4BPPV:
                    if (!s._compressedTexturePvrtc) throw "BaseTexture: not support PVRTCRGBA_4BPPV format.";
                    e = s._compressedTexturePvrtc.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;
                    break;

                default:
                    throw "BaseTexture: unknown texture format.";
            }
            return e;
        }
        _setFilterMode(e) {
            var i = m.instance;
            switch (v.bindTexture(i, this._glTextureType, this._glTexture), e) {
                case t.FilterMode.Point:
                    this._mipmap ? i.texParameteri(this._glTextureType, i.TEXTURE_MIN_FILTER, i.NEAREST_MIPMAP_NEAREST) : i.texParameteri(this._glTextureType, i.TEXTURE_MIN_FILTER, i.NEAREST),
                        i.texParameteri(this._glTextureType, i.TEXTURE_MAG_FILTER, i.NEAREST);
                    break;

                case t.FilterMode.Bilinear:
                    this._mipmap ? i.texParameteri(this._glTextureType, i.TEXTURE_MIN_FILTER, i.LINEAR_MIPMAP_NEAREST) : i.texParameteri(this._glTextureType, i.TEXTURE_MIN_FILTER, i.LINEAR),
                        i.texParameteri(this._glTextureType, i.TEXTURE_MAG_FILTER, i.LINEAR);
                    break;

                case t.FilterMode.Trilinear:
                    this._mipmap ? i.texParameteri(this._glTextureType, i.TEXTURE_MIN_FILTER, i.LINEAR_MIPMAP_LINEAR) : i.texParameteri(this._glTextureType, i.TEXTURE_MIN_FILTER, i.LINEAR),
                        i.texParameteri(this._glTextureType, i.TEXTURE_MAG_FILTER, i.LINEAR);
                    break;

                default:
                    throw new Error("BaseTexture:unknown filterMode value.");
            }
        }
        _setWarpMode(e, i) {
            var s = m.instance;
            if (v.bindTexture(s, this._glTextureType, this._glTexture), this._isPot(this._width) && this._isPot(this._height)) switch (i) {
                case t.WarpMode.Repeat:
                    s.texParameteri(this._glTextureType, e, s.REPEAT);
                    break;

                case t.WarpMode.Clamp:
                    s.texParameteri(this._glTextureType, e, s.CLAMP_TO_EDGE);
            } else s.texParameteri(this._glTextureType, e, s.CLAMP_TO_EDGE);
        }
        _setAnisotropy(t) {
            var e = m.layaGPUInstance._extTextureFilterAnisotropic;
            if (e) {
                t = Math.max(t, 1);
                var i = m.instance;
                v.bindTexture(i, this._glTextureType, this._glTexture), t = Math.min(i.getParameter(e.MAX_TEXTURE_MAX_ANISOTROPY_EXT), t),
                    i.texParameterf(this._glTextureType, e.TEXTURE_MAX_ANISOTROPY_EXT, t);
            }
        }
        _disposeResource() {
            this._glTexture && (m.instance.deleteTexture(this._glTexture), this._glTexture = null,
                this._setGPUMemory(0));
        }
        _getSource() {
            return this._readyed ? this._glTexture : null;
        }
        generateMipmap() {
            this._isPot(this.width) && this._isPot(this.height) && m.instance.generateMipmap(this._glTextureType);
        }
    }
    I._rgbmRange = 5, I.FORMAT_R8G8B8 = 0, I.FORMAT_R8G8B8A8 = 1, I.FORMAT_ALPHA8 = 2,
        I.FORMAT_DXT1 = 3, I.FORMAT_DXT5 = 4, I.FORMAT_ETC1RGB = 5, I.FORMAT_PVRTCRGB_2BPPV = 9,
        I.FORMAT_PVRTCRGBA_2BPPV = 10, I.FORMAT_PVRTCRGB_4BPPV = 11, I.FORMAT_PVRTCRGBA_4BPPV = 12,
        I.RENDERTEXTURE_FORMAT_RGBA_HALF_FLOAT = 14, I.FORMAT_R32G32B32A32 = 15, I.FORMAT_DEPTH_16 = 0,
        I.FORMAT_STENCIL_8 = 1, I.FORMAT_DEPTHSTENCIL_16_8 = 2, I.FORMAT_DEPTHSTENCIL_NONE = 3,
        I.FILTERMODE_POINT = 0, I.FILTERMODE_BILINEAR = 1, I.FILTERMODE_TRILINEAR = 2, I.WARPMODE_REPEAT = 0,
        I.WARPMODE_CLAMP = 1;
    class P {
        constructor(t = null) {
            this._xd_ = !0, this._allocated_ = 8, this._pos_ = 0, this._length = 0, t ? (this._u8d_ = new Uint8Array(t),
                this._d_ = new DataView(this._u8d_.buffer), this._length = this._d_.byteLength) : this._resizeBuffer(this._allocated_);
        }
        static getSystemEndian() {
            if (!P._sysEndian) {
                var t = new ArrayBuffer(2);
                new DataView(t).setInt16(0, 256, !0), P._sysEndian = 256 === new Int16Array(t)[0] ? P.LITTLE_ENDIAN : P.BIG_ENDIAN;
            }
            return P._sysEndian;
        }
        get buffer() {
            var t = this._d_.buffer;
            return t.byteLength === this._length ? t : t.slice(0, this._length);
        }
        get endian() {
            return this._xd_ ? P.LITTLE_ENDIAN : P.BIG_ENDIAN;
        }
        set endian(t) {
            this._xd_ = t === P.LITTLE_ENDIAN;
        }
        set length(t) {
            this._allocated_ < t ? this._resizeBuffer(this._allocated_ = Math.floor(Math.max(t, 2 * this._allocated_))) : this._allocated_ > t && this._resizeBuffer(this._allocated_ = t),
                this._length = t;
        }
        get length() {
            return this._length;
        }
        _resizeBuffer(t) {
            try {
                var e = new Uint8Array(t);
                null != this._u8d_ && (this._u8d_.length <= t ? e.set(this._u8d_) : e.set(this._u8d_.subarray(0, t))),
                    this._u8d_ = e, this._d_ = new DataView(e.buffer);
            } catch (e) {
                throw "Invalid typed array length:" + t;
            }
        }
        getString() {
            return this.readString();
        }
        readString() {
            return this._rUTF(this.getUint16());
        }
        getFloat32Array(t, e) {
            return this.readFloat32Array(t, e);
        }
        readFloat32Array(t, e) {
            var i = t + e;
            i = i > this._length ? this._length : i;
            var s = new Float32Array(this._d_.buffer.slice(t, i));
            return this._pos_ = i, s;
        }
        getUint8Array(t, e) {
            return this.readUint8Array(t, e);
        }
        readUint8Array(t, e) {
            var i = t + e;
            i = i > this._length ? this._length : i;
            var s = new Uint8Array(this._d_.buffer.slice(t, i));
            return this._pos_ = i, s;
        }
        getInt16Array(t, e) {
            return this.readInt16Array(t, e);
        }
        readInt16Array(t, e) {
            var i = t + e;
            i = i > this._length ? this._length : i;
            var s = new Int16Array(this._d_.buffer.slice(t, i));
            return this._pos_ = i, s;
        }
        getFloat32() {
            return this.readFloat32();
        }
        readFloat32() {
            if (this._pos_ + 4 > this._length) throw "getFloat32 error - Out of bounds";
            var t = this._d_.getFloat32(this._pos_, this._xd_);
            return this._pos_ += 4, t;
        }
        getFloat64() {
            return this.readFloat64();
        }
        readFloat64() {
            if (this._pos_ + 8 > this._length) throw "getFloat64 error - Out of bounds";
            var t = this._d_.getFloat64(this._pos_, this._xd_);
            return this._pos_ += 8, t;
        }
        writeFloat32(t) {
            this._ensureWrite(this._pos_ + 4), this._d_.setFloat32(this._pos_, t, this._xd_),
                this._pos_ += 4;
        }
        writeFloat64(t) {
            this._ensureWrite(this._pos_ + 8), this._d_.setFloat64(this._pos_, t, this._xd_),
                this._pos_ += 8;
        }
        getInt32() {
            return this.readInt32();
        }
        readInt32() {
            if (this._pos_ + 4 > this._length) throw "getInt32 error - Out of bounds";
            var t = this._d_.getInt32(this._pos_, this._xd_);
            return this._pos_ += 4, t;
        }
        getUint32() {
            return this.readUint32();
        }
        readUint32() {
            if (this._pos_ + 4 > this._length) throw "getUint32 error - Out of bounds";
            var t = this._d_.getUint32(this._pos_, this._xd_);
            return this._pos_ += 4, t;
        }
        writeInt32(t) {
            this._ensureWrite(this._pos_ + 4), this._d_.setInt32(this._pos_, t, this._xd_),
                this._pos_ += 4;
        }
        writeUint32(t) {
            this._ensureWrite(this._pos_ + 4), this._d_.setUint32(this._pos_, t, this._xd_),
                this._pos_ += 4;
        }
        getInt16() {
            return this.readInt16();
        }
        readInt16() {
            if (this._pos_ + 2 > this._length) throw "getInt16 error - Out of bounds";
            var t = this._d_.getInt16(this._pos_, this._xd_);
            return this._pos_ += 2, t;
        }
        getUint16() {
            return this.readUint16();
        }
        readUint16() {
            if (this._pos_ + 2 > this._length) throw "getUint16 error - Out of bounds";
            var t = this._d_.getUint16(this._pos_, this._xd_);
            return this._pos_ += 2, t;
        }
        writeUint16(t) {
            this._ensureWrite(this._pos_ + 2), this._d_.setUint16(this._pos_, t, this._xd_),
                this._pos_ += 2;
        }
        writeInt16(t) {
            this._ensureWrite(this._pos_ + 2), this._d_.setInt16(this._pos_, t, this._xd_),
                this._pos_ += 2;
        }
        getUint8() {
            return this.readUint8();
        }
        readUint8() {
            if (this._pos_ + 1 > this._length) throw "getUint8 error - Out of bounds";
            return this._u8d_[this._pos_++];
        }
        writeUint8(t) {
            this._ensureWrite(this._pos_ + 1), this._d_.setUint8(this._pos_, t), this._pos_++;
        }
        _getUInt8(t) {
            return this._readUInt8(t);
        }
        _readUInt8(t) {
            return this._d_.getUint8(t);
        }
        _getUint16(t) {
            return this._readUint16(t);
        }
        _readUint16(t) {
            return this._d_.getUint16(t, this._xd_);
        }
        _getMatrix() {
            return this._readMatrix();
        }
        _readMatrix() {
            return new p(this.getFloat32(), this.getFloat32(), this.getFloat32(), this.getFloat32(), this.getFloat32(), this.getFloat32());
        }
        _rUTF(t) {
            var e, i, s = this._pos_ + t, r = String.fromCharCode, a = this._u8d_, n = [], h = 0;
            for (n.length = 1e3; this._pos_ < s;) if ((e = a[this._pos_++]) < 128) 0 != e && (n[h++] = r(e)); else if (e < 224) n[h++] = r((63 & e) << 6 | 127 & a[this._pos_++]); else if (e < 240) i = a[this._pos_++],
                n[h++] = r((31 & e) << 12 | (127 & i) << 6 | 127 & a[this._pos_++]); else {
                const t = (15 & e) << 18 | (127 & (i = a[this._pos_++])) << 12 | (127 & a[this._pos_++]) << 6 | 127 & a[this._pos_++];
                if (t >= 65536) {
                    const e = t - 65536, i = 55296 | e >> 10, s = 56320 | 1023 & e;
                    n[h++] = r(i), n[h++] = r(s);
                } else n[h++] = r(t);
            }
            return n.length = h, n.join("");
        }
        getCustomString(t) {
            return this.readCustomString(t);
        }
        readCustomString(t) {
            for (var e, i = "", s = 0, r = String.fromCharCode, a = this._u8d_; t > 0;) if ((e = a[this._pos_]) < 128) i += r(e),
                this._pos_++, t--; else for (s = e - 128, this._pos_++, t -= s; s > 0;) e = a[this._pos_++],
                    i += r(a[this._pos_++] << 8 | e), s--;
            return i;
        }
        get pos() {
            return this._pos_;
        }
        set pos(t) {
            this._pos_ = t;
        }
        get bytesAvailable() {
            return this._length - this._pos_;
        }
        clear() {
            this._pos_ = 0, this.length = 0;
        }
        __getBuffer() {
            return this._d_.buffer;
        }
        writeUTFBytes(t) {
            for (var e = 0, i = (t += "").length; e < i; e++) {
                var s = t.charCodeAt(e);
                if (s <= 127) this.writeByte(s); else if (s <= 2047) this._ensureWrite(this._pos_ + 2),
                    this._u8d_.set([192 | s >> 6, 128 | 63 & s], this._pos_), this._pos_ += 2; else if (s >= 55296 && s <= 56319) {
                        e++;
                        const i = t.charCodeAt(e);
                        if (!Number.isNaN(i) && i >= 56320 && i <= 57343) {
                            const t = 64 + (1023 & s), e = 1023 & i, r = 240 | t >> 8 & 63, a = 128 | t >> 2 & 63, n = 128 | (3 & t) << 4 | e >> 6 & 15, h = 128 | 63 & e;
                            this._ensureWrite(this._pos_ + 4), this._u8d_.set([r, a, n, h], this._pos_), this._pos_ += 4;
                        }
                    } else s <= 65535 ? (this._ensureWrite(this._pos_ + 3), this._u8d_.set([224 | s >> 12, 128 | s >> 6 & 63, 128 | 63 & s], this._pos_),
                        this._pos_ += 3) : (this._ensureWrite(this._pos_ + 4), this._u8d_.set([240 | s >> 18, 128 | s >> 12 & 63, 128 | s >> 6 & 63, 128 | 63 & s], this._pos_),
                            this._pos_ += 4);
            }
        }
        writeUTFString(t) {
            var e = this.pos;
            this.writeUint16(1), this.writeUTFBytes(t);
            var i = this.pos - e - 2;
            this._d_.setUint16(e, i, this._xd_);
        }
        readUTFString() {
            return this.readUTFBytes(this.getUint16());
        }
        getUTFString() {
            return this.readUTFString();
        }
        readUTFBytes(t = -1) {
            if (0 === t) return "";
            var e = this.bytesAvailable;
            if (t > e) throw "readUTFBytes error - Out of bounds";
            return t = t > 0 ? t : e, this._rUTF(t);
        }
        getUTFBytes(t = -1) {
            return this.readUTFBytes(t);
        }
        writeByte(t) {
            this._ensureWrite(this._pos_ + 1), this._d_.setInt8(this._pos_, t), this._pos_ += 1;
        }
        readByte() {
            if (this._pos_ + 1 > this._length) throw "readByte error - Out of bounds";
            return this._d_.getInt8(this._pos_++);
        }
        getByte() {
            return this.readByte();
        }
        _ensureWrite(t) {
            this._length < t && (this._length = t), this._allocated_ < t && (this.length = t);
        }
        writeArrayBuffer(t, e = 0, i = 0) {
            if (e < 0 || i < 0) throw "writeArrayBuffer error - Out of bounds";
            0 == i && (i = t.byteLength - e), this._ensureWrite(this._pos_ + i);
            var s = new Uint8Array(t);
            this._u8d_.set(s.subarray(e, e + i), this._pos_), this._pos_ += i;
        }
        readArrayBuffer(t) {
            var e;
            return e = this._u8d_.buffer.slice(this._pos_, this._pos_ + t), this._pos_ = this._pos_ + t,
                e;
        }
    }
    P.BIG_ENDIAN = "bigEndian", P.LITTLE_ENDIAN = "littleEndian", P._sysEndian = null,
        (M = t.RenderTextureFormat || (t.RenderTextureFormat = {}))[M.R8G8B8 = 0] = "R8G8B8",
        M[M.R8G8B8A8 = 1] = "R8G8B8A8", M[M.Alpha8 = 2] = "Alpha8", M[M.R16G16B16A16 = 14] = "R16G16B16A16",
        M[M.Depth = 15] = "Depth", M[M.ShadowMap = 16] = "ShadowMap", (S = t.RenderTextureDepthFormat || (t.RenderTextureDepthFormat = {}))[S.DEPTH_16 = 0] = "DEPTH_16",
        S[S.STENCIL_8 = 1] = "STENCIL_8", S[S.DEPTHSTENCIL_24_8 = 2] = "DEPTHSTENCIL_24_8",
        S[S.DEPTHSTENCIL_NONE = 3] = "DEPTHSTENCIL_NONE", S[S.DEPTHSTENCIL_16_8 = 2] = "DEPTHSTENCIL_16_8";
    class L {
        static get maxTextureCount() {
            return this._maxTextureCount;
        }
        static get maxTextureSize() {
            return this._maxTextureSize;
        }
        static get shaderCapailityLevel() {
            return this._shaderCapailityLevel;
        }
        static supportTextureFormat(e) {
            switch (e) {
                case t.TextureFormat.R32G32B32A32:
                    return !(!m.layaGPUInstance._isWebGL2 && !m.layaGPUInstance._oesTextureFloat);

                case t.TextureFormat.R16G16B16A16:
                    return !(!m.layaGPUInstance._isWebGL2 && !m.layaGPUInstance._oesTextureHalfFloat);

                default:
                    return !0;
            }
        }
        static supportRenderTextureFormat(e) {
            switch (e) {
                case t.RenderTextureFormat.R16G16B16A16:
                    return !!(m.layaGPUInstance._isWebGL2 && m.layaGPUInstance._extColorBufferFloat || m.layaGPUInstance._oesTextureHalfFloat && m.layaGPUInstance._oesTextureHalfFloatLinear);

                case t.RenderTextureFormat.Depth:
                    return !(!m.layaGPUInstance._isWebGL2 && !m.layaGPUInstance._webgl_depth_texture);

                case t.RenderTextureFormat.ShadowMap:
                    return !!m.layaGPUInstance._isWebGL2;

                default:
                    return !0;
            }
        }
    }
    class D {
        static __init__() {
            for (var t = 0; t < 256; ++t) {
                var e = t - 127;
                e < -27 ? (D._baseTable[0 | t] = 0, D._baseTable[256 | t] = 32768, D._shiftTable[0 | t] = 24,
                    D._shiftTable[256 | t] = 24) : e < -14 ? (D._baseTable[0 | t] = 1024 >> -e - 14,
                        D._baseTable[256 | t] = 1024 >> -e - 14 | 32768, D._shiftTable[0 | t] = -e - 1,
                        D._shiftTable[256 | t] = -e - 1) : e <= 15 ? (D._baseTable[0 | t] = e + 15 << 10,
                            D._baseTable[256 | t] = e + 15 << 10 | 32768, D._shiftTable[0 | t] = 13, D._shiftTable[256 | t] = 13) : e < 128 ? (D._baseTable[0 | t] = 31744,
                                D._baseTable[256 | t] = 64512, D._shiftTable[0 | t] = 24, D._shiftTable[256 | t] = 24) : (D._baseTable[0 | t] = 31744,
                                    D._baseTable[256 | t] = 64512, D._shiftTable[0 | t] = 13, D._shiftTable[256 | t] = 13);
            }
            for (D._mantissaTable[0] = 0, t = 1; t < 1024; ++t) {
                var i = t << 13;
                for (e = 0; 0 == (8388608 & i);) e -= 8388608, i <<= 1;
                i &= -8388609, e += 947912704, D._mantissaTable[t] = i | e;
            }
            for (t = 1024; t < 2048; ++t) D._mantissaTable[t] = 939524096 + (t - 1024 << 13);
            for (D._exponentTable[0] = 0, t = 1; t < 31; ++t) D._exponentTable[t] = t << 23;
            for (D._exponentTable[31] = 1199570944, D._exponentTable[32] = 2147483648, t = 33; t < 63; ++t) D._exponentTable[t] = 2147483648 + (t - 32 << 23);
            for (D._exponentTable[63] = 3347054592, D._offsetTable[0] = 0, t = 1; t < 64; ++t) D._offsetTable[t] = 32 === t ? 0 : 1024;
        }
        static roundToFloat16Bits(t) {
            D._floatView[0] = t;
            var e = D._uint32View[0], i = e >> 23 & 511;
            return D._baseTable[i] + ((8388607 & e) >> D._shiftTable[i]);
        }
        static convertToNumber(t) {
            var e = t >> 10;
            return D._uint32View[0] = D._mantissaTable[D._offsetTable[e] + (1023 & t)] + D._exponentTable[e],
                D._floatView[0];
        }
    }
    D._buffer = new ArrayBuffer(4), D._floatView = new Float32Array(D._buffer), D._uint32View = new Uint32Array(D._buffer),
        D._baseTable = new Uint32Array(512), D._shiftTable = new Uint32Array(512), D._mantissaTable = new Uint32Array(2048),
        D._exponentTable = new Uint32Array(64), D._offsetTable = new Uint32Array(64);
    class B extends I {
        constructor(e = 0, i = 0, s = t.TextureFormat.R8G8B8A8, r = !0, a = !1) {
            super(s, r);
            var n = m.instance;
            this._glTextureType = n.TEXTURE_2D, this._width = e, this._height = i, this._canRead = a,
                this._setWarpMode(n.TEXTURE_WRAP_S, this._wrapModeU), this._setWarpMode(n.TEXTURE_WRAP_T, this._wrapModeV),
                this._setFilterMode(this._filterMode), this._setAnisotropy(this._anisoLevel);
            var h = this._gpuCompressFormat();
            if (r) {
                var o = Math.max(Math.ceil(Math.log2(e)) + 1, Math.ceil(Math.log2(i)) + 1);
                if (!h) for (var l = 0; l < o; l++) this._setPixels(null, l, Math.max(e >> l, 1), Math.max(i >> l, 1));
                this._mipmapCount = o, this._setGPUMemory(e * i * 4 * (1 + 1 / 3));
            } else h || this._setPixels(null, 0, e, i), this._mipmapCount = 1, this._setGPUMemory(e * i * 4);
        }
        static __init__() {
            var e = new Uint8Array(3);
            e[0] = 128, e[1] = 128, e[2] = 128, B.grayTexture = new B(1, 1, t.TextureFormat.R8G8B8, !1, !1),
                B.grayTexture.setPixels(e), B.grayTexture.lock = !0, e[0] = 255, e[1] = 255, e[2] = 255,
                B.whiteTexture = new B(1, 1, t.TextureFormat.R8G8B8, !1, !1), B.whiteTexture.setPixels(e),
                B.whiteTexture.lock = !0, e[0] = 0, e[1] = 0, e[2] = 0, B.blackTexture = new B(1, 1, t.TextureFormat.R8G8B8, !1, !1),
                B.blackTexture.setPixels(e), B.blackTexture.lock = !0;
        }
        static _parse(e, i = null, s = null) {
            var r = s ? new B(s[0], s[1], s[2], s[3], s[4]) : new B(0, 0);
            switch (i && (r.wrapModeU = i.wrapModeU, r.wrapModeV = i.wrapModeV, r.filterMode = i.filterMode,
                r.anisoLevel = i.anisoLevel), r._format) {
                case t.TextureFormat.R8G8B8:
                case t.TextureFormat.R8G8B8A8:
                    r.loadImageSource(e);
                    break;

                case t.TextureFormat.DXT1:
                case t.TextureFormat.DXT5:
                case t.TextureFormat.ETC1RGB:
                case t.TextureFormat.PVRTCRGB_2BPPV:
                case t.TextureFormat.PVRTCRGBA_2BPPV:
                case t.TextureFormat.PVRTCRGB_4BPPV:
                case t.TextureFormat.PVRTCRGBA_4BPPV:
                    r.setCompressData(e);
                    break;

                default:
                    throw "Texture2D:unkonwn format.";
            }
            return r;
        }
        static _SimpleAnimatorTextureParse(e, i = null, s = null) {
            var r, a, n = new P(e);
            switch (n.readUTFString()) {
                case "LAYAANIMATORTEXTURE:0000":
                    var h, o = n.readInt32(), l = n.readInt32();
                    r = new Float32Array(o * o * 4), a = new Float32Array(n.readArrayBuffer(4 * l)),
                        r.set(a, 0), (h = new B(o, o, t.TextureFormat.R32G32B32A32, !1, !1)).setPixels(r, 0),
                        h.filterMode = t.FilterMode.Point;
                    break;

                case "LAYACOMPRESSANIMATORTEXTURE:0000":
                    o = n.readInt32(), l = n.readInt32();
                    if (r = new Uint16Array(n.readArrayBuffer(2 * l)), L.supportTextureFormat(t.TextureFormat.R16G16B16A16)) (a = new Uint16Array(o * o * 4)).set(r, 0),
                        (h = new B(o, o, t.TextureFormat.R16G16B16A16, !1, !1)).setPixels(a, 0), h.filterMode = t.FilterMode.Point; else {
                        console.log("The platform does not support 16-bit floating-point textures"), L.supportTextureFormat(t.TextureFormat.R32G32B32A32) || console.error("The platform does not support 32-bit floating-point textures"),
                            a = new Float32Array(o * o * 4);
                        for (var _ = 0, u = r.length; _ < u; _++) a[_] = D.convertToNumber(r[_]);
                        (h = new B(o, o, t.TextureFormat.R32G32B32A32, !1, !1)).setPixels(a, 0), h.filterMode = t.FilterMode.Point;
                    }
                    break;

                default:
                    throw "Laya3D:unknow version.";
            }
            return h;
        }
        static load(t, e) {
            i.loader.create(t, e, null, i.Loader.TEXTURE2D);
        }
        get defaulteTexture() {
            return B.grayTexture;
        }
        _gpuCompressFormat() {
            return this._format == t.TextureFormat.DXT1 || this._format == t.TextureFormat.DXT5 || this._format == t.TextureFormat.ETC1RGB || this._format == t.TextureFormat.PVRTCRGB_2BPPV || this._format == t.TextureFormat.PVRTCRGBA_2BPPV || this._format == t.TextureFormat.PVRTCRGB_4BPPV || this._format == t.TextureFormat.PVRTCRGBA_4BPPV;
        }
        _setPixels(e, i, s, r) {
            var a = m.instance, n = this._glTextureType, h = this._getGLFormat();
            switch (v.bindTexture(a, n, this._glTexture), this.format) {
                case t.TextureFormat.R8G8B8:
                    a.pixelStorei(a.UNPACK_ALIGNMENT, 1), a.texImage2D(n, i, h, s, r, 0, h, a.UNSIGNED_BYTE, e),
                        a.pixelStorei(a.UNPACK_ALIGNMENT, 4);
                    break;

                case t.TextureFormat.R5G6B5:
                    a.pixelStorei(a.UNPACK_ALIGNMENT, 2), a.texImage2D(n, i, h, s, r, 0, h, a.UNSIGNED_SHORT_5_6_5, e),
                        a.pixelStorei(a.UNPACK_ALIGNMENT, 4);
                    break;

                case t.TextureFormat.R32G32B32A32:
                    m.layaGPUInstance._isWebGL2 ? a.texImage2D(n, i, a.RGBA32F, s, r, 0, h, a.FLOAT, e) : a.texImage2D(n, i, a.RGBA, s, r, 0, h, a.FLOAT, e);
                    break;

                case t.TextureFormat.R16G16B16A16:
                    m.layaGPUInstance._isWebGL2 ? a.texImage2D(n, i, a.RGBA16F, s, r, 0, h, a.HALF_FLOAT, e) : a.texImage2D(n, i, a.RGBA, s, r, 0, h, m.layaGPUInstance._oesTextureHalfFloat.HALF_FLOAT_OES, e);
                    break;

                default:
                    a.texImage2D(n, i, h, s, r, 0, h, a.UNSIGNED_BYTE, e);
            }
        }
        _calcualatesCompressedDataSize(e, i, s) {
            switch (e) {
                case t.TextureFormat.DXT1:
                case t.TextureFormat.ETC1RGB:
                    return (i + 3 >> 2) * (s + 3 >> 2) * 8;

                case t.TextureFormat.DXT5:
                    return (i + 3 >> 2) * (s + 3 >> 2) * 16;

                case t.TextureFormat.PVRTCRGB_4BPPV:
                case t.TextureFormat.PVRTCRGBA_4BPPV:
                    return Math.floor((Math.max(i, 8) * Math.max(s, 8) * 4 + 7) / 8);

                case t.TextureFormat.PVRTCRGB_2BPPV:
                case t.TextureFormat.PVRTCRGBA_2BPPV:
                    return Math.floor((Math.max(i, 16) * Math.max(s, 8) * 2 + 7) / 8);

                default:
                    return 0;
            }
        }
        _pharseDDS(e) {
            var i = new Int32Array(e, 0, 31);
            if (542327876 != i[0]) throw "Invalid magic number in DDS header";
            if (!(4 & i[20])) throw "Unsupported format, must contain a FourCC code";
            var s = i[21];
            switch (this._format) {
                case t.TextureFormat.DXT1:
                    if (827611204 !== s) throw "the FourCC code is not same with texture format.";
                    break;

                case t.TextureFormat.DXT5:
                    if (894720068 !== s) throw "the FourCC code is not same with texture format.";
                    break;

                default:
                    throw "unknown texture format.";
            }
            var r = 1;
            if (131072 & i[2]) {
                if (r = Math.max(1, i[7]), !this._mipmap) throw "the mipmap is not same with Texture2D.";
            } else if (this._mipmap) throw "the mipmap is not same with Texture2D.";
            var a = i[4], n = i[3];
            this._width = a, this._height = n;
            var h = i[1] + 4;
            this._upLoadCompressedTexImage2D(e, a, n, r, h, 0);
        }
        _pharseKTX(e) {
            var i = new Uint8Array(e, 0, 12);
            if (171 != i[0] || 75 != i[1] || 84 != i[2] || 88 != i[3] || 32 != i[4] || 49 != i[5] || 49 != i[6] || 187 != i[7] || 13 != i[8] || 10 != i[9] || 26 != i[10] || 10 != i[11]) throw "Invalid fileIdentifier in KTX header";
            var s = new Int32Array(i.buffer, i.length, 13);
            switch (s[4]) {
                case m.layaGPUInstance._compressedTextureEtc1.COMPRESSED_RGB_ETC1_WEBGL:
                    this._format = t.TextureFormat.ETC1RGB;
                    break;

                default:
                    throw "unknown texture format.";
            }
            var r = s[11], a = s[6], n = s[7];
            this._width = a, this._height = n;
            var h = 64 + s[12];
            this._upLoadCompressedTexImage2D(e, a, n, r, h, 4);
        }
        _pharsePVR(e) {
            var i = new Int32Array(e, 0, 13);
            if (55727696 != i[0]) throw "Invalid magic number in PVR header";
            switch (i[2]) {
                case 0:
                    this._format = t.TextureFormat.PVRTCRGB_2BPPV;
                    break;

                case 2:
                    this._format = t.TextureFormat.PVRTCRGB_4BPPV;
                    break;

                case 1:
                    this._format = t.TextureFormat.PVRTCRGBA_2BPPV;
                    break;

                case 3:
                    this._format = t.TextureFormat.PVRTCRGBA_4BPPV;
                    break;

                default:
                    throw "Texture2D:unknown PVR format.";
            }
            var s = i[11], r = i[7], a = i[6];
            this._width = r, this._height = a;
            var n = i[12] + 52;
            this._upLoadCompressedTexImage2D(e, r, a, s, n, 0);
        }
        _upLoadCompressedTexImage2D(t, e, i, s, r, a) {
            var n = m.instance, h = this._glTextureType;
            v.bindTexture(n, h, this._glTexture);
            for (var o = this._getGLFormat(), l = r, _ = 0; _ < s; _++) {
                l += a;
                var u = this._calcualatesCompressedDataSize(this._format, e, i), c = new Uint8Array(t, l, u);
                n.compressedTexImage2D(h, _, o, e, i, 0, c), e = Math.max(e >> 1, 1), i = Math.max(i >> 1, 1),
                    l += u;
            }
            var d = l;
            this._setGPUMemory(d), this._readyed = !0, this._activeResource();
        }
        loadImageSource(e, s = !1) {
            var r = m.instance, a = e.width, n = e.height;
            this._width = a, this._height = n, this._isPot(a) && this._isPot(n) || (this._mipmap = !1),
                this._setWarpMode(r.TEXTURE_WRAP_S, this._wrapModeU), this._setWarpMode(r.TEXTURE_WRAP_T, this._wrapModeV),
                this._setFilterMode(this._filterMode), v.bindTexture(r, this._glTextureType, this._glTexture);
            var h = this._getGLFormat();
            i.Render.isConchApp ? (e.setPremultiplyAlpha && e.setPremultiplyAlpha(s), r.texImage2D(this._glTextureType, 0, r.RGBA, r.RGBA, r.UNSIGNED_BYTE, e)) : (s && r.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL, !0),
                this.format == t.TextureFormat.R5G6B5 ? r.texImage2D(this._glTextureType, 0, r.RGB, r.RGB, r.UNSIGNED_SHORT_5_6_5, e) : r.texImage2D(this._glTextureType, 0, h, h, r.UNSIGNED_BYTE, e),
                s && r.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL, !1)), this._mipmap ? (r.generateMipmap(this._glTextureType),
                    this._setGPUMemory(a * n * 4 * (1 + 1 / 3))) : this._setGPUMemory(a * n * 4), this._canRead && (i.Render.isConchApp ? this._pixels = new Uint8Array(e._nativeObj.getImageData(0, 0, a, n)) : (i.Browser.canvas.size(a, n),
                        i.Browser.canvas.clear(), i.Browser.context.drawImage(e, 0, 0, a, n), this._pixels = new Uint8Array(i.Browser.context.getImageData(0, 0, a, n).data.buffer))),
                this._readyed = !0, this._activeResource();
        }
        setPixels(t, e = 0) {
            if (this._gpuCompressFormat()) throw "Texture2D:the format is GPU compression format.";
            if (!t) throw "Texture2D:pixels can't be null.";
            var i = Math.max(this._width >> e, 1), s = Math.max(this._height >> e, 1), r = i * s * this._getFormatByteCount();
            if (t.length < r) throw "Texture2D:pixels length should at least " + r + ".";
            this._setPixels(t, e, i, s), this._canRead && (this._pixels = t), this._readyed = !0,
                this._activeResource();
        }
        setSubPixels(e, i, s, r, a, n = 0) {
            if (this._gpuCompressFormat()) throw "Texture2D:the format is GPU compression format.";
            if (!a) throw "Texture2D:pixels can't be null.";
            var h = m.instance, o = this._glTextureType;
            v.bindTexture(h, o, this._glTexture);
            var l = this._getGLFormat();
            switch (this.format) {
                case t.TextureFormat.R8G8B8:
                    h.pixelStorei(h.UNPACK_ALIGNMENT, 1), h.texSubImage2D(o, n, e, i, s, r, l, h.UNSIGNED_BYTE, a),
                        h.pixelStorei(h.UNPACK_ALIGNMENT, 4);
                    break;

                case t.TextureFormat.R5G6B5:
                    h.pixelStorei(h.UNPACK_ALIGNMENT, 2), h.texSubImage2D(o, n, e, i, s, r, l, h.UNSIGNED_SHORT_5_6_5, a),
                        h.pixelStorei(h.UNPACK_ALIGNMENT, 4);
                    break;

                case t.TextureFormat.R32G32B32A32:
                    h.texSubImage2D(o, n, e, i, s, r, l, h.FLOAT, a);
                    break;

                default:
                    h.texSubImage2D(o, n, e, i, s, r, l, h.UNSIGNED_BYTE, a);
            }
            this._readyed = !0, this._activeResource();
        }
        setCompressData(e) {
            switch (this._format) {
                case t.TextureFormat.DXT1:
                case t.TextureFormat.DXT5:
                    this._pharseDDS(e);
                    break;

                case t.TextureFormat.ETC1RGB:
                    this._pharseKTX(e);
                    break;

                case t.TextureFormat.PVRTCRGB_2BPPV:
                case t.TextureFormat.PVRTCRGBA_2BPPV:
                case t.TextureFormat.PVRTCRGB_4BPPV:
                case t.TextureFormat.PVRTCRGBA_4BPPV:
                    this._pharsePVR(e);
                    break;

                default:
                    throw "Texture2D:unkonwn format.";
            }
        }
        getPixels() {
            if (this._canRead) return this._pixels;
            throw new Error("Texture2D: must set texture canRead is true.");
        }
    }
    B.TEXTURE2D = "TEXTURE2D", B.grayTexture = null, B.whiteTexture = null, B.blackTexture = null;
    class F extends b {
        constructor() {
            super();
        }
    }
    class O {
        static mat2MatArray(t, e) {
            var i = t, s = e;
            return s[0] = i.a, s[1] = i.b, s[2] = O.EMPTYMAT4_ARRAY[2], s[3] = O.EMPTYMAT4_ARRAY[3],
                s[4] = i.c, s[5] = i.d, s[6] = O.EMPTYMAT4_ARRAY[6], s[7] = O.EMPTYMAT4_ARRAY[7],
                s[8] = O.EMPTYMAT4_ARRAY[8], s[9] = O.EMPTYMAT4_ARRAY[9], s[10] = O.EMPTYMAT4_ARRAY[10],
                s[11] = O.EMPTYMAT4_ARRAY[11], s[12] = i.tx, s[13] = i.ty, s[14] = O.EMPTYMAT4_ARRAY[14],
                s[15] = O.EMPTYMAT4_ARRAY[15], e;
        }
        static restoreTempArray() {
            O.TEMPMAT4_ARRAY[0] = 1, O.TEMPMAT4_ARRAY[1] = 0, O.TEMPMAT4_ARRAY[4] = 0, O.TEMPMAT4_ARRAY[5] = 1,
                O.TEMPMAT4_ARRAY[12] = 0, O.TEMPMAT4_ARRAY[13] = 0;
        }
        static clear() {
            O.worldScissorTest = !1, O.worldAlpha = 1;
        }
    }
    O._MAXSIZE = 99999999, O.EMPTYMAT4_ARRAY = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1],
        O.TEMPMAT4_ARRAY = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1], O.worldMatrix4 = O.TEMPMAT4_ARRAY,
        O.worldMatrix = new p(), O.matWVP = null, O.worldAlpha = 1, O.worldScissorTest = !1,
        O.width = 0, O.height = 0;
    class N extends I {
        constructor(e, i, s = t.RenderTextureFormat.R8G8B8, r = t.RenderTextureDepthFormat.DEPTH_16) {
            super(s, !1), this._mgrKey = 0, this._glTextureType = m.instance.TEXTURE_2D, this._width = e,
                this._height = i, this._depthStencilFormat = r, this._create(e, i), this.lock = !0;
        }
        static get currentActive() {
            return N._currentActive;
        }
        get depthStencilFormat() {
            return this._depthStencilFormat;
        }
        get defaulteTexture() {
            return B.grayTexture;
        }
        getIsReady() {
            return !0;
        }
        get sourceWidth() {
            return this._width;
        }
        get sourceHeight() {
            return this._height;
        }
        get offsetX() {
            return 0;
        }
        get offsetY() {
            return 0;
        }
        _create(e, i) {
            var s = m.instance;
            this._frameBuffer = s.createFramebuffer(), v.bindTexture(s, this._glTextureType, this._glTexture);
            var r = this._getGLFormat();
            if (s.texImage2D(this._glTextureType, 0, r, e, i, 0, r, s.UNSIGNED_BYTE, null),
                this._setGPUMemory(e * i * 4), s.bindFramebuffer(s.FRAMEBUFFER, this._frameBuffer),
                s.framebufferTexture2D(s.FRAMEBUFFER, s.COLOR_ATTACHMENT0, s.TEXTURE_2D, this._glTexture, 0),
                this._depthStencilFormat !== t.RenderTextureDepthFormat.DEPTHSTENCIL_NONE) switch (this._depthStencilBuffer = s.createRenderbuffer(),
                s.bindRenderbuffer(s.RENDERBUFFER, this._depthStencilBuffer), this._depthStencilFormat) {
                    case t.RenderTextureDepthFormat.DEPTH_16:
                        s.renderbufferStorage(s.RENDERBUFFER, s.DEPTH_COMPONENT16, e, i), s.framebufferRenderbuffer(s.FRAMEBUFFER, s.DEPTH_ATTACHMENT, s.RENDERBUFFER, this._depthStencilBuffer);
                        break;

                    case t.RenderTextureDepthFormat.STENCIL_8:
                        s.renderbufferStorage(s.RENDERBUFFER, s.STENCIL_INDEX8, e, i), s.framebufferRenderbuffer(s.FRAMEBUFFER, s.STENCIL_ATTACHMENT, s.RENDERBUFFER, this._depthStencilBuffer);
                        break;

                    case t.RenderTextureDepthFormat.DEPTHSTENCIL_24_8:
                        s.renderbufferStorage(s.RENDERBUFFER, s.DEPTH_STENCIL, e, i), s.framebufferRenderbuffer(s.FRAMEBUFFER, s.DEPTH_STENCIL_ATTACHMENT, s.RENDERBUFFER, this._depthStencilBuffer);
                }
            s.bindFramebuffer(s.FRAMEBUFFER, null), s.bindRenderbuffer(s.RENDERBUFFER, null),
                this._setWarpMode(s.TEXTURE_WRAP_S, this._wrapModeU), this._setWarpMode(s.TEXTURE_WRAP_T, this._wrapModeV),
                this._setFilterMode(this._filterMode), this._setAnisotropy(this._anisoLevel), this._readyed = !0,
                this._activeResource();
        }
        generateMipmap() {
            this._isPot(this.width) && this._isPot(this.height) ? (this._mipmap = !0, m.instance.generateMipmap(this._glTextureType),
                this._setFilterMode(this._filterMode), this._setGPUMemory(this.width * this.height * 4 * (1 + 1 / 3))) : (this._mipmap = !1,
                    this._setGPUMemory(this.width * this.height * 4));
        }
        static pushRT() {
            N.rtStack.push({
                rt: N._currentActive,
                w: O.width,
                h: O.height
            });
        }
        static popRT() {
            var t = m.instance, e = N.rtStack.pop();
            e && (N._currentActive != e.rt && (m.instance.bindFramebuffer(t.FRAMEBUFFER, e.rt ? e.rt._frameBuffer : null),
                N._currentActive = e.rt), t.viewport(0, 0, e.w, e.h), O.width = e.w, O.height = e.h);
        }
        start() {
            var t = m.instance;
            m.instance.bindFramebuffer(t.FRAMEBUFFER, this._frameBuffer), this._lastRT = N._currentActive,
                N._currentActive = this, this._readyed = !0, t.viewport(0, 0, this._width, this._height),
                this._lastWidth = O.width, this._lastHeight = O.height, O.width = this._width, O.height = this._height,
                F.activeShader = null;
        }
        end() {
            var t = m.instance;
            t.bindFramebuffer(t.FRAMEBUFFER, null), N._currentActive = null, this._readyed = !0;
        }
        restore() {
            var t = m.instance;
            this._lastRT != N._currentActive && (m.instance.bindFramebuffer(t.FRAMEBUFFER, this._lastRT ? this._lastRT._frameBuffer : null),
                N._currentActive = this._lastRT), this._readyed = !0, t.viewport(0, 0, this._lastWidth, this._lastHeight),
                O.width = this._lastWidth, O.height = this._lastHeight, F.activeShader = null;
        }
        clear(t = 0, e = 0, i = 0, s = 1) {
            var r = m.instance;
            r.clearColor(t, e, i, s);
            var a = r.COLOR_BUFFER_BIT;
            switch (this._depthStencilFormat) {
                case r.DEPTH_COMPONENT16:
                    a |= r.DEPTH_BUFFER_BIT;
                    break;

                case r.STENCIL_INDEX8:
                    a |= r.STENCIL_BUFFER_BIT;
                    break;

                case r.DEPTH_STENCIL:
                    a |= r.DEPTH_BUFFER_BIT, a |= r.STENCIL_BUFFER_BIT;
            }
            r.clear(a);
        }
        getData(t, e, s, r) {
            if (i.Render.isConchApp && 2 == window.conchConfig.threadMode) throw "native 2 thread mode use getDataAsync";
            var a = m.instance;
            if (a.bindFramebuffer(a.FRAMEBUFFER, this._frameBuffer), !(a.checkFramebufferStatus(a.FRAMEBUFFER) === a.FRAMEBUFFER_COMPLETE)) return a.bindFramebuffer(a.FRAMEBUFFER, null),
                null;
            var n = new Uint8Array(this._width * this._height * 4), h = this._getGLFormat();
            return a.readPixels(t, e, s, r, h, a.UNSIGNED_BYTE, n), a.bindFramebuffer(a.FRAMEBUFFER, null),
                n;
        }
        getDataAsync(t, e, i, s, r) {
            var a = m.instance;
            a.bindFramebuffer(a.FRAMEBUFFER, this._frameBuffer), a.readPixelsAsync(t, e, i, s, a.RGBA, a.UNSIGNED_BYTE, function (t) {
                r(new Uint8Array(t));
            }), a.bindFramebuffer(a.FRAMEBUFFER, null);
        }
        recycle() { }
        _disposeResource() {
            if (this._frameBuffer) {
                var t = m.instance;
                t.deleteTexture(this._glTexture), t.deleteFramebuffer(this._frameBuffer), t.deleteRenderbuffer(this._depthStencilBuffer),
                    this._glTexture = null, this._frameBuffer = null, this._depthStencilBuffer = null,
                    this._setGPUMemory(0);
            }
        }
    }
    N.rtStack = [], N.defuv = [0, 0, 1, 0, 1, 1, 0, 1], N.flipyuv = [0, 1, 1, 1, 1, 0, 0, 0];
    class U {
        static getRT(e, i) {
            return i |= 0, (e |= 0) >= 1e4 && console.error("getRT error! w too big"), new N(e, i, t.RenderTextureFormat.R8G8B8A8, -1);
        }
        static releaseRT(t) {
            t.destroy();
        }
    }
    U.dict = {};
    class G {
        static _init_(t) {
            G.fns = [G.BlendNormal, G.BlendAdd, G.BlendMultiply, G.BlendScreen, G.BlendOverlay, G.BlendLight, G.BlendMask, G.BlendDestinationOut, G.BlendAddOld],
                G.targetFns = [G.BlendNormalTarget, G.BlendAddTarget, G.BlendMultiplyTarget, G.BlendScreenTarget, G.BlendOverlayTarget, G.BlendLightTarget, G.BlendMask, G.BlendDestinationOut, G.BlendAddTargetOld];
        }
        static BlendNormal(t) {
            v.setBlendFunc(t, t.ONE, t.ONE_MINUS_SRC_ALPHA, !0);
        }
        static BlendAddOld(t) {
            v.setBlendFunc(t, t.ONE, t.DST_ALPHA, !0);
        }
        static BlendAdd(t) {
            v.setBlendFunc(t, t.ONE, t.ONE, !0);
        }
        static BlendMultiply(t) {
            v.setBlendFunc(t, t.DST_COLOR, t.ONE_MINUS_SRC_ALPHA, !0);
        }
        static BlendScreen(t) {
            v.setBlendFunc(t, t.ONE, t.ONE, !0);
        }
        static BlendOverlay(t) {
            v.setBlendFunc(t, t.ONE, t.ONE_MINUS_SRC_COLOR, !0);
        }
        static BlendLight(t) {
            v.setBlendFunc(t, t.ONE, t.ONE, !0);
        }
        static BlendNormalTarget(t) {
            v.setBlendFunc(t, t.ONE, t.ONE_MINUS_SRC_ALPHA, !0);
        }
        static BlendAddTargetOld(t) {
            v.setBlendFunc(t, t.ONE, t.DST_ALPHA, !0);
        }
        static BlendAddTarget(t) {
            v.setBlendFunc(t, t.ONE, t.ONE, !0);
        }
        static BlendMultiplyTarget(t) {
            v.setBlendFunc(t, t.DST_COLOR, t.ONE_MINUS_SRC_ALPHA, !0);
        }
        static BlendScreenTarget(t) {
            v.setBlendFunc(t, t.ONE, t.ONE, !0);
        }
        static BlendOverlayTarget(t) {
            v.setBlendFunc(t, t.ONE, t.ONE_MINUS_SRC_COLOR, !0);
        }
        static BlendLightTarget(t) {
            v.setBlendFunc(t, t.ONE, t.ONE, !0);
        }
        static BlendMask(t) {
            v.setBlendFunc(t, t.ZERO, t.SRC_ALPHA, !0);
        }
        static BlendDestinationOut(t) {
            v.setBlendFunc(t, t.ZERO, t.ZERO, !0);
        }
    }
    G.activeBlendFunction = null, G.NAMES = ["normal", "add", "multiply", "screen", "overlay", "light", "mask", "destination-out", "add_old"],
        G.TOINT = {
            normal: 0,
            add: 1,
            multiply: 2,
            screen: 3,
            overlay: 4,
            light: 5,
            mask: 6,
            "destination-out": 7,
            lighter: 1,
            lighter_old: 8,
            add_old: 8
        }, G.NORMAL = "normal", G.MASK = "mask", G.LIGHTER = "lighter";
    class k {
        constructor(t, e, i) {
            this._value = 0, this._name2int = t, this._int2name = e, this._int2nameMap = i;
        }
        add(t) {
            return this._value |= "string" == typeof t ? this._name2int[t] : t, this._value;
        }
        addInt(t) {
            return this._value |= t, this._value;
        }
        remove(t) {
            return this._value &= "string" == typeof t ? ~this._name2int[t] : ~t, this._value;
        }
        isDefine(t) {
            return (this._value & t) === t;
        }
        getValue() {
            return this._value;
        }
        setValue(t) {
            this._value = t;
        }
        toNameDic() {
            var t = this._int2nameMap[this._value];
            return t || k._toText(this._value, this._int2name, this._int2nameMap);
        }
        static _reg(t, e, i, s) {
            i[t] = e, s[e] = t;
        }
        static _toText(t, e, i) {
            var s = i[t];
            if (s) return s;
            for (var r = {}, a = 1, n = 0; n < 32 && !((a = 1 << n) > t); n++) if (t & a) {
                var h = e[a];
                h && (r[h] = "");
            }
            return i[t] = r, r;
        }
        static _toInt(t, e) {
            for (var i = t.split("."), s = 0, r = 0, a = i.length; r < a; r++) {
                var n = e[i[r]];
                if (!n) throw new Error("Defines to int err:" + t + "/" + i[r]);
                s |= n;
            }
            return s;
        }
    }
    class W extends k {
        constructor() {
            super(W.__name2int, W.__int2name, W.__int2nameMap);
        }
        static __init__() {
            W.reg("TEXTURE2D", W.TEXTURE2D), W.reg("PRIMITIVE", W.PRIMITIVE), W.reg("GLOW_FILTER", W.FILTERGLOW),
                W.reg("BLUR_FILTER", W.FILTERBLUR), W.reg("COLOR_FILTER", W.FILTERCOLOR), W.reg("COLOR_ADD", W.COLORADD),
                W.reg("WORLDMAT", W.WORLDMAT), W.reg("FILLTEXTURE", W.FILLTEXTURE), W.reg("MVP3D", W.MVP3D);
        }
        static reg(t, e) {
            this._reg(t, e, W.__name2int, W.__int2name);
        }
        static toText(t, e, i) {
            return this._toText(t, e, i);
        }
        static toInt(t) {
            return this._toInt(t, W.__name2int);
        }
    }
    W.TEXTURE2D = 1, W.PRIMITIVE = 4, W.FILTERGLOW = 8, W.FILTERBLUR = 16, W.FILTERCOLOR = 32,
        W.COLORADD = 64, W.WORLDMAT = 128, W.FILLTEXTURE = 256, W.SKINMESH = 512, W.MVP3D = 2048,
        W.NOOPTMASK = W.FILTERGLOW | W.FILTERBLUR | W.FILTERCOLOR | W.FILLTEXTURE, W.__name2int = {},
        W.__int2name = [], W.__int2nameMap = [];
    class V {
        static show(t = 0, e = 0) {
            V._StatRender.show(t, e);
        }
        static enable() {
            V._StatRender.enable();
        }
        static hide() {
            V._StatRender.hide();
        }
        static clear() {
            V.trianglesFaces = V.renderBatches = V.savedRenderBatches = V.shaderCall = V.spriteRenderUseCacheCount = V.frustumCulling = V.octreeNodeCulling = V.canvasNormal = V.canvasBitmap = V.canvasReCache = 0;
        }
        static set onclick(t) {
            V._StatRender.set_onclick(t);
        }
    }
    V.FPS = 0, V.loopCount = 0, V.shaderCall = 0, V.renderBatches = 0, V.savedRenderBatches = 0,
        V.trianglesFaces = 0, V.spriteCount = 0, V.spriteRenderUseCacheCount = 0, V.frustumCulling = 0,
        V.octreeNodeCulling = 0, V.canvasNormal = 0, V.canvasBitmap = 0, V.canvasReCache = 0,
        V.renderSlow = !1, V._fpsData = [], V._timer = 0, V._count = 0, V._StatRender = null;
    class Y {
        constructor() {
            this._strsToID = {}, this._idToStrs = [], this._length = 0;
        }
        add(t) {
            var e = this._strsToID[t];
            return null != e ? e : (this._idToStrs[this._length] = t, this._strsToID[t] = this._length++);
        }
        getID(t) {
            var e = this._strsToID[t];
            return null == e ? -1 : e;
        }
        getName(t) {
            var e = this._idToStrs[t];
            return null == e ? void 0 : e;
        }
    }
    class X extends F {
        constructor(t, e, i = null, s = null, r = null) {
            if (super(), this._attribInfo = null, this.customCompile = !1, this._curActTexIndex = 0,
                this.tag = {}, this._program = null, this._params = null, this._paramsMap = {},
                !t || !e) throw "Shader Error";
            this._attribInfo = r, this._id = ++X._count, this._vs = t, this._ps = e, this._nameMap = s || {},
                null != i && (X.sharders[i] = this), this.recreateResource(), this.lock = !0;
        }
        static getShader(t) {
            return X.sharders[t];
        }
        static create(t, e, i = null, s = null, r = null) {
            return new X(t, e, i, s, r);
        }
        static withCompile(t, e, i, s) {
            if (i && X.sharders[i]) return X.sharders[i];
            var r = X._preCompileShader[X.SHADERNAME2ID * t];
            if (!r) throw new Error("withCompile shader err!" + t);
            return r.createShader(e, i, s, null);
        }
        static withCompile2D(t, e, i, s, r, a = null) {
            if (s && X.sharders[s]) return X.sharders[s];
            var n = X._preCompileShader[X.SHADERNAME2ID * t + e];
            if (!n) throw new Error("withCompile shader err!" + t + " " + e);
            return n.createShader(i, s, r, a);
        }
        static addInclude(t, e) {
            i.ShaderCompile.addInclude(t, e);
        }
        static preCompile(t, e, s, r) {
            var a = X.SHADERNAME2ID * t;
            X._preCompileShader[a] = new i.ShaderCompile(e, s, r);
        }
        static preCompile2D(t, e, s, r, a) {
            var n = X.SHADERNAME2ID * t + e;
            X._preCompileShader[n] = new i.ShaderCompile(s, r, a);
        }
        recreateResource() {
            this._compile(), this._setGPUMemory(0);
        }
        _disposeResource() {
            v.mainContext.deleteShader(this._vshader), v.mainContext.deleteShader(this._pshader),
                v.mainContext.deleteProgram(this._program), this._vshader = this._pshader = this._program = null,
                this._params = null, this._paramsMap = {}, this._setGPUMemory(0), this._curActTexIndex = 0;
        }
        _compile() {
            if (this._vs && this._ps && !this._params) {
                var t;
                this._reCompile = !0, this._params = [], this.customCompile && (t = i.ShaderCompile.preGetParams(this._vs, this._ps));
                var e, s, r, a = v.mainContext;
                this._program = a.createProgram(), this._vshader = X._createShader(a, this._vs, a.VERTEX_SHADER),
                    this._pshader = X._createShader(a, this._ps, a.FRAGMENT_SHADER), a.attachShader(this._program, this._vshader),
                    a.attachShader(this._program, this._pshader);
                var n = this._attribInfo ? this._attribInfo.length : 0;
                for (s = 0; s < n; s += 2) a.bindAttribLocation(this._program, this._attribInfo[s + 1], this._attribInfo[s]);
                if (a.linkProgram(this._program), !this.customCompile && !a.getProgramParameter(this._program, a.LINK_STATUS)) throw a.getProgramInfoLog(this._program);
                var h = this.customCompile ? t.uniforms.length : a.getProgramParameter(this._program, a.ACTIVE_UNIFORMS);
                for (s = 0; s < h; s++) {
                    var o = this.customCompile ? t.uniforms[s] : a.getActiveUniform(this._program, s);
                    (e = {
                        vartype: "uniform",
                        glfun: null,
                        ivartype: 1,
                        location: a.getUniformLocation(this._program, o.name),
                        name: o.name,
                        type: o.type,
                        isArray: !1,
                        isSame: !1,
                        preValue: null,
                        indexOfParams: 0
                    }).name.indexOf("[0]") > 0 && (e.name = e.name.substr(0, e.name.length - 3), e.isArray = !0,
                        e.location = a.getUniformLocation(this._program, e.name)), this._params.push(e);
                }
                for (s = 0, r = this._params.length; s < r; s++) switch ((e = this._params[s]).indexOfParams = s,
                    e.index = 1, e.value = [e.location, null], e.codename = e.name, e.name = this._nameMap[e.codename] ? this._nameMap[e.codename] : e.codename,
                    this._paramsMap[e.name] = e, e._this = this, e.uploadedValue = [], e.type) {
                        case a.INT:
                            e.fun = e.isArray ? this._uniform1iv : this._uniform1i;
                            break;

                        case a.FLOAT:
                            e.fun = e.isArray ? this._uniform1fv : this._uniform1f;
                            break;

                        case a.FLOAT_VEC2:
                            e.fun = e.isArray ? this._uniform_vec2v : this._uniform_vec2;
                            break;

                        case a.FLOAT_VEC3:
                            e.fun = e.isArray ? this._uniform_vec3v : this._uniform_vec3;
                            break;

                        case a.FLOAT_VEC4:
                            e.fun = e.isArray ? this._uniform_vec4v : this._uniform_vec4;
                            break;

                        case a.SAMPLER_2D:
                            e.fun = this._uniform_sampler2D;
                            break;

                        case a.SAMPLER_CUBE:
                            e.fun = this._uniform_samplerCube;
                            break;

                        case a.FLOAT_MAT4:
                            e.glfun = a.uniformMatrix4fv, e.fun = this._uniformMatrix4fv;
                            break;

                        case a.BOOL:
                            e.fun = this._uniform1i;
                            break;

                        case a.FLOAT_MAT2:
                        case a.FLOAT_MAT3:
                        default:
                            throw new Error("compile shader err!");
                    }
            }
        }
        static _createShader(t, e, i) {
            var s = t.createShader(i);
            return t.shaderSource(s, e), t.compileShader(s), t.getShaderParameter(s, t.COMPILE_STATUS) ? s : (console.log(t.getShaderInfoLog(s)),
                null);
        }
        getUniform(t) {
            return this._paramsMap[t];
        }
        _uniform1f(t, e) {
            var i = t.uploadedValue;
            return i[0] !== e ? (v.mainContext.uniform1f(t.location, i[0] = e), 1) : 0;
        }
        _uniform1fv(t, e) {
            if (e.length < 4) {
                var i = t.uploadedValue;
                return i[0] !== e[0] || i[1] !== e[1] || i[2] !== e[2] || i[3] !== e[3] ? (v.mainContext.uniform1fv(t.location, e),
                    i[0] = e[0], i[1] = e[1], i[2] = e[2], i[3] = e[3], 1) : 0;
            }
            return v.mainContext.uniform1fv(t.location, e), 1;
        }
        _uniform_vec2(t, e) {
            var i = t.uploadedValue;
            return i[0] !== e[0] || i[1] !== e[1] ? (v.mainContext.uniform2f(t.location, i[0] = e[0], i[1] = e[1]),
                1) : 0;
        }
        _uniform_vec2v(t, e) {
            if (e.length < 2) {
                var i = t.uploadedValue;
                return i[0] !== e[0] || i[1] !== e[1] || i[2] !== e[2] || i[3] !== e[3] ? (v.mainContext.uniform2fv(t.location, e),
                    i[0] = e[0], i[1] = e[1], i[2] = e[2], i[3] = e[3], 1) : 0;
            }
            return v.mainContext.uniform2fv(t.location, e), 1;
        }
        _uniform_vec3(t, e) {
            var i = t.uploadedValue;
            return i[0] !== e[0] || i[1] !== e[1] || i[2] !== e[2] ? (v.mainContext.uniform3f(t.location, i[0] = e[0], i[1] = e[1], i[2] = e[2]),
                1) : 0;
        }
        _uniform_vec3v(t, e) {
            return v.mainContext.uniform3fv(t.location, e), 1;
        }
        _uniform_vec4(t, e) {
            var i = t.uploadedValue;
            return i[0] !== e[0] || i[1] !== e[1] || i[2] !== e[2] || i[3] !== e[3] ? (v.mainContext.uniform4f(t.location, i[0] = e[0], i[1] = e[1], i[2] = e[2], i[3] = e[3]),
                1) : 0;
        }
        _uniform_vec4v(t, e) {
            return v.mainContext.uniform4fv(t.location, e), 1;
        }
        _uniformMatrix2fv(t, e) {
            return v.mainContext.uniformMatrix2fv(t.location, !1, e), 1;
        }
        _uniformMatrix3fv(t, e) {
            return v.mainContext.uniformMatrix3fv(t.location, !1, e), 1;
        }
        _uniformMatrix4fv(t, e) {
            return v.mainContext.uniformMatrix4fv(t.location, !1, e), 1;
        }
        _uniform1i(t, e) {
            var i = t.uploadedValue;
            return i[0] !== e ? (v.mainContext.uniform1i(t.location, i[0] = e), 1) : 0;
        }
        _uniform1iv(t, e) {
            return v.mainContext.uniform1iv(t.location, e), 1;
        }
        _uniform_ivec2(t, e) {
            var i = t.uploadedValue;
            return i[0] !== e[0] || i[1] !== e[1] ? (v.mainContext.uniform2i(t.location, i[0] = e[0], i[1] = e[1]),
                1) : 0;
        }
        _uniform_ivec2v(t, e) {
            return v.mainContext.uniform2iv(t.location, e), 1;
        }
        _uniform_vec3i(t, e) {
            var i = t.uploadedValue;
            return i[0] !== e[0] || i[1] !== e[1] || i[2] !== e[2] ? (v.mainContext.uniform3i(t.location, i[0] = e[0], i[1] = e[1], i[2] = e[2]),
                1) : 0;
        }
        _uniform_vec3vi(t, e) {
            return v.mainContext.uniform3iv(t.location, e), 1;
        }
        _uniform_vec4i(t, e) {
            var i = t.uploadedValue;
            return i[0] !== e[0] || i[1] !== e[1] || i[2] !== e[2] || i[3] !== e[3] ? (v.mainContext.uniform4i(t.location, i[0] = e[0], i[1] = e[1], i[2] = e[2], i[3] = e[3]),
                1) : 0;
        }
        _uniform_vec4vi(t, e) {
            return v.mainContext.uniform4iv(t.location, e), 1;
        }
        _uniform_sampler2D(t, e) {
            var i = v.mainContext, s = t.uploadedValue;
            return null == s[0] ? (s[0] = this._curActTexIndex, i.uniform1i(t.location, this._curActTexIndex),
                v.activeTexture(i, i.TEXTURE0 + this._curActTexIndex), v.bindTexture(i, i.TEXTURE_2D, e),
                this._curActTexIndex++, 1) : (v.activeTexture(i, i.TEXTURE0 + s[0]), v.bindTexture(i, i.TEXTURE_2D, e),
                    0);
        }
        _uniform_samplerCube(t, e) {
            var i = v.mainContext, s = t.uploadedValue;
            return null == s[0] ? (s[0] = this._curActTexIndex, i.uniform1i(t.location, this._curActTexIndex),
                v.activeTexture(i, i.TEXTURE0 + this._curActTexIndex), v.bindTexture(i, i.TEXTURE_CUBE_MAP, e),
                this._curActTexIndex++, 1) : (v.activeTexture(i, i.TEXTURE0 + s[0]), v.bindTexture(i, i.TEXTURE_CUBE_MAP, e),
                    0);
        }
        _noSetValue(t) {
            console.log("no....:" + t.name);
        }
        uploadOne(t, e) {
            v.useProgram(v.mainContext, this._program);
            var i = this._paramsMap[t];
            i.fun.call(this, i, e);
        }
        uploadTexture2D(t) {
            var e = v;
            e._activeTextures[0] !== t && (e.bindTexture(v.mainContext, m.instance.TEXTURE_2D, t),
                e._activeTextures[0] = t);
        }
        upload(t, e = null) {
            F.activeShader = F.bindShader = this;
            var i = v.mainContext;
            v.useProgram(i, this._program), this._reCompile ? (e = this._params, this._reCompile = !1) : e = e || this._params;
            for (var s, r, a = e.length, n = 0, h = 0; h < a; h++) null !== (r = t[(s = e[h]).name]) && (n += s.fun.call(this, s, r));
            V.shaderCall += n;
        }
        uploadArray(t, e, i) {
            F.activeShader = this, F.bindShader = this, v.useProgram(v.mainContext, this._program);
            this._params;
            for (var s, r, a = 0, n = e - 2; n >= 0; n -= 2) (r = this._paramsMap[t[n]]) && null != (s = t[n + 1]) && (i && i[r.name] && i[r.name].bind(),
                a += r.fun.call(this, r, s));
            V.shaderCall += a;
        }
        getParams() {
            return this._params;
        }
        setAttributesLocation(t) {
            this._attribInfo = t;
        }
    }
    X._count = 0, X._preCompileShader = {}, X.SHADERNAME2ID = 2e-4, X.nameKey = new Y(),
        X.sharders = new Array(32);
    class H extends X {
        constructor(t, e, i = null, s = null, r = null) {
            super(t, e, i, s, r), this._params2dQuick2 = null, this._shaderValueWidth = 0, this._shaderValueHeight = 0;
        }
        _disposeResource() {
            super._disposeResource(), this._params2dQuick2 = null;
        }
        upload2dQuick2(t) {
            this.upload(t, this._params2dQuick2 || this._make2dQuick2());
        }
        _make2dQuick2() {
            if (!this._params2dQuick2) {
                this._params2dQuick2 = [];
                for (var t, e = this._params, i = 0, s = e.length; i < s; i++) "size" !== (t = e[i]).name && this._params2dQuick2.push(t);
            }
            return this._params2dQuick2;
        }
        static create(t, e, i = null, s = null, r = null) {
            return new H(t, e, i, s, r);
        }
    }
    class z {
        constructor(t, e) {
            this.defines = new W(), this.size = [0, 0], this.alpha = 1, this.ALPHA = 1, this.subID = 0,
                this.ref = 1, this._cacheID = 0, this.clipMatDir = [i.Context._MAXSIZE, 0, 0, i.Context._MAXSIZE],
                this.clipMatPos = [0, 0], this.clipOff = [0, 0], this.mainID = t, this.subID = e,
                this.textureHost = null, this.texture = null, this.color = null, this.colorAdd = null,
                this.u_mmat2 = null, this._cacheID = t | e, this._inClassCache = z._cache[this._cacheID],
                t > 0 && !this._inClassCache && (this._inClassCache = z._cache[this._cacheID] = [],
                    this._inClassCache._length = 0), this.clear();
        }
        static _initone(t, e) {
            z._typeClass[t] = e, z._cache[t] = [], z._cache[t]._length = 0;
        }
        static __init__() { }
        setValue(t) { }
        _ShaderWithCompile() {
            return X.withCompile2D(0, this.mainID, this.defines.toNameDic(), this.mainID | this.defines._value, H.create, this._attribLocation);
        }
        upload() {
            var t = O;
            O.worldMatrix4 === O.TEMPMAT4_ARRAY || this.defines.addInt(W.WORLDMAT), this.mmat = t.worldMatrix4,
                O.matWVP && (this.defines.addInt(W.MVP3D), this.u_MvpMatrix = O.matWVP.elements);
            var e = X.sharders[this.mainID | this.defines._value] || this._ShaderWithCompile();
            e._shaderValueWidth !== t.width || e._shaderValueHeight !== t.height ? (this.size[0] = t.width,
                this.size[1] = t.height, e._shaderValueWidth = t.width, e._shaderValueHeight = t.height,
                e.upload(this, null)) : e.upload(this, e._params2dQuick2 || e._make2dQuick2());
        }
        setFilters(t) {
            if (this.filters = t, t) for (var e, i = t.length, s = 0; s < i; s++) (e = t[s]) && (this.defines.add(e.type),
                e.action.setValue(this));
        }
        clear() {
            this.defines._value = this.subID, this.clipOff[0] = 0;
        }
        release() {
            --this.ref < 1 && (this._inClassCache && (this._inClassCache[this._inClassCache._length++] = this),
                this.clear(), this.filters = null, this.ref = 1, this.clipOff[0] = 0);
        }
        static create(t, e) {
            var i = z._cache[t | e];
            return i._length ? i[--i._length] : new z._typeClass[t | e](e);
        }
    }
    z._cache = [], z._typeClass = [], z.TEMPMAT4_ARRAY = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1];
    class K {
        constructor() {
            this.clear();
        }
        clear() {
            this.submitType = -1, this.blendShader = this.other = 0;
        }
        copyFrom(t) {
            this.other = t.other, this.blendShader = t.blendShader, this.submitType = t.submitType;
        }
        copyFrom2(t, e, i) {
            this.other = i, this.submitType = e;
        }
        equal3_2(t, e, i) {
            return this.submitType === e && this.other === i && this.blendShader === t.blendShader;
        }
        equal4_2(t, e, i) {
            return this.submitType === e && this.other === i && this.blendShader === t.blendShader;
        }
        equal_3(t) {
            return this.submitType === t.submitType && this.blendShader === t.blendShader;
        }
        equal(t) {
            return this.other === t.other && this.submitType === t.submitType && this.blendShader === t.blendShader;
        }
    }
    class j {
        constructor() {
            this._ref = 1, this._key = new K();
        }
        renderSubmit() {
            return this.fun.apply(this._this, this.args), 1;
        }
        getRenderType() {
            return 0;
        }
        releaseRender() {
            if (--this._ref < 1) {
                var t = j.POOL;
                t[t._length++] = this;
            }
        }
        static create(t, e, i) {
            var s = j.POOL._length ? j.POOL[--j.POOL._length] : new j();
            return s.fun = e, s.args = t, s._this = i, s._ref = 1, s._key.clear(), s;
        }
    }
    j.POOL = [], j.POOL._length = 0;
    class q {
        constructor() { }
        get type() {
            return -1;
        }
    }
    q.BLUR = 16, q.COLOR = 32, q.GLOW = 8, q._filter = function (t, e, i, s) {
        var r = e, a = this._next;
        if (a) {
            var n = t.filters, h = n.length;
            if (1 == h && n[0].type == q.COLOR) return e.save(), e.setColorFilter(n[0]), a._fun.call(a, t, e, i, s),
                void e.restore();
            var o, l = z.create(W.TEXTURE2D, 0), _ = f.TEMP, u = r._curMat, c = p.create();
            u.copyTo(c);
            var d = 0, m = 0, v = null, T = t._cacheStyle.filterCache || null;
            if (T && 0 == t.getRepaint()) {
                if ((t._cacheStyle.hasGlowFilter || !1) && (d = 50, m = 25), (o = t.getBounds()).width <= 0 || o.height <= 0) return;
                o.width += d, o.height += d, _.x = o.x * c.a + o.y * c.c, _.y = o.y * c.d + o.x * c.b,
                    o.x = _.x, o.y = _.y, _.x = o.width * c.a + o.height * c.c, _.y = o.height * c.d + o.width * c.b,
                    o.width = _.x, o.height = _.y;
            } else {
                t._isHaveGlowFilter() && (d = 50, m = 25), (o = new g()).copyFrom(t.getSelfBounds()),
                    o.x += t.x, o.y += t.y, o.x -= t.pivotX + 4, o.y -= t.pivotY + 4;
                var x = o.x, y = o.y;
                if (o.width += d + 8, o.height += d + 8, _.x = o.x * c.a + o.y * c.c, _.y = o.y * c.d + o.x * c.b,
                    o.x = _.x, o.y = _.y, _.x = o.width * c.a + o.height * c.c, _.y = o.height * c.d + o.width * c.b,
                    o.width = _.x, o.height = _.y, o.width <= 0 || o.height <= 0) return;
                T && U.releaseRT(T), v = U.getRT(o.width, o.height);
                var E = T = U.getRT(o.width, o.height);
                t._getCacheStyle().filterCache = T, r.pushRT(), r.useRT(v);
                var b = t.x - x + m, w = t.y - y + m;
                a._fun.call(a, t, e, b, w), r.useRT(E);
                for (var C = 0; C < h; C++) {
                    0 != C && (r.useRT(v), r.drawTarget(E, 0, 0, o.width, o.height, p.TEMP.identity(), l, null, G.TOINT.overlay),
                        r.useRT(E));
                    var A = n[C];
                    switch (A.type) {
                        case q.BLUR:
                        case q.GLOW:
                            A._glRender && A._glRender.render(v, e, o.width, o.height, A);
                            break;

                        case q.COLOR:
                            r.setColorFilter(A), r.drawTarget(v, 0, 0, o.width, o.height, p.EMPTY.identity(), z.create(W.TEXTURE2D, 0)),
                                r.setColorFilter(null);
                    }
                }
                r.popRT();
            }
            if (i = i - m - t.x, s = s - m - t.y, _.setTo(i, s), c.transformPoint(_), i = _.x + o.x,
                s = _.y + o.y, r._drawRenderTexture(T, i, s, o.width, o.height, p.TEMP.identity(), 1, N.defuv),
                v) {
                var R = j.create([v], function (t) {
                    t.destroy();
                }, this);
                v = null, e.addRenderObject(R);
            }
            c.destroy();
        }
    };
    class Q {
        static toRadian(t) {
            return t * Q._pi2;
        }
        static toAngle(t) {
            return t * Q._pi;
        }
        static toHexColor(t) {
            if (t < 0 || isNaN(t)) return null;
            for (var e = t.toString(16); e.length < 6;) e = "0" + e;
            return "#" + e;
        }
        static getGID() {
            return Q._gid++;
        }
        static concatArray(t, e) {
            if (!e) return t;
            if (!t) return e;
            var i, s = e.length;
            for (i = 0; i < s; i++) t.push(e[i]);
            return t;
        }
        static clearArray(t) {
            return t ? (t.length = 0, t) : t;
        }
        static copyArray(t, e) {
            if (t || (t = []), !e) return t;
            t.length = e.length;
            var i, s = e.length;
            for (i = 0; i < s; i++) t[i] = e[i];
            return t;
        }
        static getGlobalRecByPoints(t, e, i, s, r) {
            var a, n;
            a = f.create().setTo(e, i), a = t.localToGlobal(a), n = f.create().setTo(s, r),
                n = t.localToGlobal(n);
            var h = g._getWrapRec([a.x, a.y, n.x, n.y]);
            return a.recover(), n.recover(), h;
        }
        static getGlobalPosAndScale(t) {
            return Q.getGlobalRecByPoints(t, 0, 0, 1, 1);
        }
        static bind(t, e) {
            return t.bind(e);
        }
        static updateOrder(t) {
            if (!t || t.length < 2) return !1;
            for (var e, i, s, r = 1, a = t.length; r < a;) {
                for (s = t[e = r], i = t[e]._zOrder; --e > -1 && t[e]._zOrder > i;) t[e + 1] = t[e];
                t[e + 1] = s, r++;
            }
            return !0;
        }
        static transPointList(t, e, i) {
            var s, r = t.length;
            for (s = 0; s < r; s += 2) t[s] += e, t[s + 1] += i;
        }
        static parseInt(t, e = 0) {
            var i = parseInt(t, e);
            return isNaN(i) ? 0 : i;
        }
        static getFileExtension(t) {
            Q._extReg.lastIndex = t.lastIndexOf(".");
            var e = Q._extReg.exec(t);
            return e && e.length > 1 ? e[1].toLowerCase() : null;
        }
        static getFilecompatibleExtension(t) {
            var e = t.split("."), i = e.length;
            return e.length > 2 ? e[i - 2] + "." + e[i - 1] : null;
        }
        static getTransformRelativeToWindow(t, e, i) {
            var s = Q.gStage, r = Q.getGlobalPosAndScale(t), a = s._canvasTransform.clone(), n = a.tx, h = a.ty;
            a.rotate(-Math.PI / 180 * s.canvasDegree), a.scale(s.clientScaleX, s.clientScaleY);
            var o, l, _, u, c = s.canvasDegree % 180 != 0;
            return c ? (o = i + r.y, l = e + r.x, o *= a.d, l *= a.a, 90 == s.canvasDegree ? (o = n - o,
                l += h) : (o += n, l = h - l)) : (o = e + r.x, l = i + r.y, o *= a.a, l *= a.d,
                    o += n, l += h), l += s._safariOffsetY, c ? (_ = a.d * r.height, u = a.a * r.width) : (_ = a.a * r.width,
                        u = a.d * r.height), {
                x: o,
                y: l,
                scaleX: _,
                scaleY: u
            };
        }
        static fitDOMElementInArea(t, e, i, s, r, a) {
            t._fitLayaAirInitialized || (t._fitLayaAirInitialized = !0, t.style.transformOrigin = t.style.webKittransformOrigin = "left top",
                t.style.position = "absolute");
            var n = Q.getTransformRelativeToWindow(e, i, s);
            t.style.transform = t.style.webkitTransform = "scale(" + n.scaleX + "," + n.scaleY + ") rotate(" + Q.gStage.canvasDegree + "deg)",
                t.style.width = r + "px", t.style.height = a + "px", t.style.left = n.x + "px",
                t.style.top = n.y + "px";
        }
        static isOkTextureList(t) {
            if (!t) return !1;
            var e, i, s = t.length;
            for (e = 0; e < s; e++) if (!(i = t[e]) || !i._getSource()) return !1;
            return !0;
        }
        static isOKCmdList(t) {
            if (!t) return !1;
            var e, i = t.length;
            for (e = 0; e < i; e++) t[e];
            return !0;
        }
        static getQueryString(t) {
            if (i.Browser.onMiniGame) return null;
            if (!window.location || !window.location.search) return null;
            var e = new RegExp("(^|&)" + t + "=([^&]*)(&|$)"), s = window.location.search.substr(1).match(e);
            return null != s ? unescape(s[2]) : null;
        }
    }
    Q.gStage = null, Q._gid = 1, Q._pi = 180 / Math.PI, Q._pi2 = Math.PI / 180, Q._extReg = /\.(\w+)\??/g,
        Q.parseXMLFromString = function (t) {
            var e;
            if (t = t.replace(/>\s+</g, "><"), (e = new DOMParser().parseFromString(t, "text/xml")).firstChild.textContent.indexOf("This page contains the following errors") > -1) throw new Error(e.firstChild.firstChild.textContent);
            return e;
        };
    class Z {
        constructor(t) {
            if (this.arrColor = [], null == t || "none" == t) return this.strColor = "#00000000",
                this.numColor = 0, void (this.arrColor = [0, 0, 0, 0]);
            var e, i, s;
            if ("string" == typeof t) if (t.indexOf("rgba(") >= 0 || t.indexOf("rgb(") >= 0) {
                var r, a, n = t;
                for (r = n.indexOf("("), a = n.indexOf(")"), n = n.substring(r + 1, a), this.arrColor = n.split(","),
                    i = this.arrColor.length, e = 0; e < i; e++) this.arrColor[e] = parseFloat(this.arrColor[e]),
                        e < 3 && (this.arrColor[e] = Math.round(this.arrColor[e]));
                s = 4 == this.arrColor.length ? 256 * (256 * (256 * this.arrColor[0] + this.arrColor[1]) + this.arrColor[2]) + Math.round(255 * this.arrColor[3]) : 256 * (256 * this.arrColor[0] + this.arrColor[1]) + this.arrColor[2],
                    this.strColor = t;
            } else {
                if (this.strColor = t, "#" === t.charAt(0) && (t = t.substr(1)), 3 === (i = t.length) || 4 === i) {
                    var h = "";
                    for (e = 0; e < i; e++) h += t[e] + t[e];
                    t = h;
                }
                s = parseInt(t, 16);
            } else s = t, this.strColor = Q.toHexColor(s);
            this.strColor.indexOf("rgba") >= 0 || 9 === this.strColor.length ? (this.arrColor = [((4278190080 & s) >>> 24) / 255, ((16711680 & s) >> 16) / 255, ((65280 & s) >> 8) / 255, (255 & s) / 255],
                this.numColor = (4278190080 & s) >>> 24 | (16711680 & s) >> 8 | (65280 & s) << 8 | (255 & s) << 24) : (this.arrColor = [((16711680 & s) >> 16) / 255, ((65280 & s) >> 8) / 255, (255 & s) / 255, 1],
                    this.numColor = 4278190080 | (16711680 & s) >> 16 | 65280 & s | (255 & s) << 16),
                this.arrColor.__id = ++Z._COLODID;
        }
        static _initDefault() {
            for (var t in Z._DEFAULT = {}, Z._COLOR_MAP) Z._SAVE[t] = Z._DEFAULT[t] = new Z(Z._COLOR_MAP[t]);
            return Z._DEFAULT;
        }
        static _initSaveMap() {
            for (var t in Z._SAVE_SIZE = 0, Z._SAVE = {}, Z._DEFAULT) Z._SAVE[t] = Z._DEFAULT[t];
        }
        static create(t) {
            var e = t + "", i = Z._SAVE[e];
            return null != i ? i : (Z._SAVE_SIZE < 1e3 && Z._initSaveMap(), Z._SAVE[e] = new Z(t));
        }
    }
    Z._SAVE = {}, Z._SAVE_SIZE = 0, Z._COLOR_MAP = {
        purple: "#800080",
        orange: "#ffa500",
        white: "#FFFFFF",
        red: "#FF0000",
        green: "#00FF00",
        blue: "#0000FF",
        black: "#000000",
        yellow: "#FFFF00",
        gray: "#808080"
    }, Z._DEFAULT = Z._initDefault(), Z._COLODID = 1;
    class $ extends q {
        constructor(t = null) {
            super(), t || (t = this._copyMatrix($.IDENTITY_MATRIX)), this._mat = new Float32Array(16),
                this._alpha = new Float32Array(4), this.setByMatrix(t);
        }
        gray() {
            return this.setByMatrix($.GRAY_MATRIX);
        }
        color(t = 0, e = 0, i = 0, s = 1) {
            return this.setByMatrix([1, 0, 0, 0, t, 0, 1, 0, 0, e, 0, 0, 1, 0, i, 0, 0, 0, 1, s]);
        }
        setColor(t) {
            var e = Z.create(t).arrColor, i = [0, 0, 0, 0, 256 * e[0], 0, 0, 0, 0, 256 * e[1], 0, 0, 0, 0, 256 * e[2], 0, 0, 0, 1, 0];
            return this.setByMatrix(i);
        }
        setByMatrix(t) {
            this._matrix != t && this._copyMatrix(t);
            for (var e = 0, i = 0, s = 0; s < 20; s++) s % 5 != 4 ? this._mat[e++] = t[s] : this._alpha[i++] = t[s];
            return this;
        }
        get type() {
            return q.COLOR;
        }
        adjustColor(t, e, i, s) {
            return this.adjustHue(s), this.adjustContrast(e), this.adjustBrightness(t), this.adjustSaturation(i),
                this;
        }
        adjustBrightness(t) {
            return 0 == (t = this._clampValue(t, 100)) || isNaN(t) ? this : this._multiplyMatrix([1, 0, 0, 0, t, 0, 1, 0, 0, t, 0, 0, 1, 0, t, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1]);
        }
        adjustContrast(t) {
            if (0 == (t = this._clampValue(t, 100)) || isNaN(t)) return this;
            var e, i = (e = t < 0 ? 127 + t / 100 * 127 : 127 * (e = 0 == (e = t % 1) ? $.DELTA_INDEX[t] : $.DELTA_INDEX[t << 0] * (1 - e) + $.DELTA_INDEX[1 + (t << 0)] * e) + 127) / 127, s = .5 * (127 - e);
            return this._multiplyMatrix([i, 0, 0, 0, s, 0, i, 0, 0, s, 0, 0, i, 0, s, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1]);
        }
        adjustSaturation(t) {
            if (0 == (t = this._clampValue(t, 100)) || isNaN(t)) return this;
            var e = 1 + (t > 0 ? 3 * t / 100 : t / 100), i = 1 - e, s = .3086 * i, r = .6094 * i, a = .082 * i;
            return this._multiplyMatrix([s + e, r, a, 0, 0, s, r + e, a, 0, 0, s, r, a + e, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1]);
        }
        adjustHue(t) {
            if (0 == (t = this._clampValue(t, 180) / 180 * Math.PI) || isNaN(t)) return this;
            var e = Math.cos(t), i = Math.sin(t), s = .213, r = .715, a = .072;
            return this._multiplyMatrix([s + e * (1 - s) + i * -s, r + e * -r + i * -r, a + e * -a + i * (1 - a), 0, 0, s + e * -s + .143 * i, r + e * (1 - r) + .14 * i, a + e * -a + -.283 * i, 0, 0, s + e * -s + -.787 * i, r + e * -r + i * r, a + e * (1 - a) + i * a, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1]);
        }
        reset() {
            return this.setByMatrix(this._copyMatrix($.IDENTITY_MATRIX));
        }
        _multiplyMatrix(t) {
            var e = [];
            this._matrix = this._fixMatrix(this._matrix);
            for (var i = 0; i < 5; i++) {
                for (var s = 0; s < 5; s++) e[s] = this._matrix[s + 5 * i];
                for (s = 0; s < 5; s++) {
                    for (var r = 0, a = 0; a < 5; a++) r += t[s + 5 * a] * e[a];
                    this._matrix[s + 5 * i] = r;
                }
            }
            return this.setByMatrix(this._matrix);
        }
        _clampValue(t, e) {
            return Math.min(e, Math.max(-e, t));
        }
        _fixMatrix(t = null) {
            return null == t ? $.IDENTITY_MATRIX : (t.length < $.LENGTH ? t = t.slice(0, t.length).concat($.IDENTITY_MATRIX.slice(t.length, $.LENGTH)) : t.length > $.LENGTH && (t = t.slice(0, $.LENGTH)),
                t);
        }
        _copyMatrix(t) {
            var e = $.LENGTH;
            this._matrix || (this._matrix = []);
            for (var i = 0; i < e; i++) this._matrix[i] = t[i];
            return this._matrix;
        }
    }
    $.DELTA_INDEX = [0, .01, .02, .04, .05, .06, .07, .08, .1, .11, .12, .14, .15, .16, .17, .18, .2, .21, .22, .24, .25, .27, .28, .3, .32, .34, .36, .38, .4, .42, .44, .46, .48, .5, .53, .56, .59, .62, .65, .68, .71, .74, .77, .8, .83, .86, .89, .92, .95, .98, 1, 1.06, 1.12, 1.18, 1.24, 1.3, 1.36, 1.42, 1.48, 1.54, 1.6, 1.66, 1.72, 1.78, 1.84, 1.9, 1.96, 2, 2.12, 2.25, 2.37, 2.5, 2.62, 2.75, 2.87, 3, 3.2, 3.4, 3.6, 3.8, 4, 4.3, 4.7, 4.9, 5, 5.5, 6, 6.5, 6.8, 7, 7.3, 7.5, 7.8, 8, 8.4, 8.7, 9, 9.4, 9.6, 9.8, 10],
        $.GRAY_MATRIX = [.3086, .6094, .082, 0, 0, .3086, .6094, .082, 0, 0, .3086, .6094, .082, 0, 0, 0, 0, 0, 1, 0],
        $.IDENTITY_MATRIX = [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1],
        $.LENGTH = 25;
    class J {
        constructor() {
            this.colorFlt = null, this.uv = null;
        }
        static create(t, e, i, r, a, n, h, o, l, _) {
            var u = s.getItemByClass("DrawTextureCmd", J);
            return u.texture = t, t._addReference(), u.x = e, u.y = i, u.width = r, u.height = a,
                u.matrix = n, u.alpha = h, u.color = o, u.blendMode = l, u.uv = null == _ ? null : _,
                o && (u.colorFlt = new $(), u.colorFlt.setColor(o)), u;
        }
        recover() {
            this.texture && this.texture._removeReference(), this.texture = null, this.matrix = null,
                s.recover("DrawTextureCmd", this);
        }
        run(t, e, i) {
            this.texture && t.drawTextureWithTransform(this.texture, this.x, this.y, this.width, this.height, this.matrix, e, i, this.alpha, this.blendMode, this.colorFlt, this.uv);
        }
        get cmdID() {
            return J.ID;
        }
    }
    J.ID = "DrawTexture";
    class tt {
        static create(t, e, i, r, a, n, h, o) {
            var l = s.getItemByClass("FillTextureCmd", tt);
            return l.texture = t, l.x = e, l.y = i, l.width = r, l.height = a, l.type = n, l.offset = h,
                l.other = o, l;
        }
        recover() {
            this.texture = null, this.offset = null, this.other = null, s.recover("FillTextureCmd", this);
        }
        run(t, e, i) {
            t.fillTexture(this.texture, this.x + e, this.y + i, this.width, this.height, this.type, this.offset, this.other);
        }
        get cmdID() {
            return tt.ID;
        }
    }
    tt.ID = "FillTexture";
    class et {
        static create() {
            return s.getItemByClass("RestoreCmd", et);
        }
        recover() {
            s.recover("RestoreCmd", this);
        }
        run(t, e, i) {
            t.restore();
        }
        get cmdID() {
            return et.ID;
        }
    }
    et.ID = "Restore";
    class it {
        static create(t, e, i) {
            var r = s.getItemByClass("RotateCmd", it);
            return r.angle = t, r.pivotX = e, r.pivotY = i, r;
        }
        recover() {
            s.recover("RotateCmd", this);
        }
        run(t, e, i) {
            t._rotate(this.angle, this.pivotX + e, this.pivotY + i);
        }
        get cmdID() {
            return it.ID;
        }
    }
    it.ID = "Rotate";
    class st {
        static create(t, e, i, r) {
            var a = s.getItemByClass("ScaleCmd", st);
            return a.scaleX = t, a.scaleY = e, a.pivotX = i, a.pivotY = r, a;
        }
        recover() {
            s.recover("ScaleCmd", this);
        }
        run(t, e, i) {
            t._scale(this.scaleX, this.scaleY, this.pivotX + e, this.pivotY + i);
        }
        get cmdID() {
            return st.ID;
        }
    }
    st.ID = "Scale";
    class rt {
        static create(t, e, i) {
            var r = s.getItemByClass("TransformCmd", rt);
            return r.matrix = t, r.pivotX = e, r.pivotY = i, r;
        }
        recover() {
            this.matrix = null, s.recover("TransformCmd", this);
        }
        run(t, e, i) {
            t._transform(this.matrix, this.pivotX + e, this.pivotY + i);
        }
        get cmdID() {
            return rt.ID;
        }
    }
    rt.ID = "Transform";
    class at {
        static create(t, e) {
            var i = s.getItemByClass("TranslateCmd", at);
            return i.tx = t, i.ty = e, i;
        }
        recover() {
            s.recover("TranslateCmd", this);
        }
        run(t, e, i) {
            t.translate(this.tx, this.ty);
        }
        get cmdID() {
            return at.ID;
        }
    }
    at.ID = "Translate";
    class nt {
        constructor() {
            this._controlPoints = [new f(), new f(), new f()], this._calFun = this.getPoint2;
        }
        _switchPoint(t, e) {
            var i = this._controlPoints.shift();
            i.setTo(t, e), this._controlPoints.push(i);
        }
        getPoint2(t, e) {
            var i = this._controlPoints[0], s = this._controlPoints[1], r = this._controlPoints[2], a = Math.pow(1 - t, 2) * i.x + 2 * t * (1 - t) * s.x + Math.pow(t, 2) * r.x, n = Math.pow(1 - t, 2) * i.y + 2 * t * (1 - t) * s.y + Math.pow(t, 2) * r.y;
            e.push(a, n);
        }
        getPoint3(t, e) {
            var i = this._controlPoints[0], s = this._controlPoints[1], r = this._controlPoints[2], a = this._controlPoints[3], n = Math.pow(1 - t, 3) * i.x + 3 * s.x * t * (1 - t) * (1 - t) + 3 * r.x * t * t * (1 - t) + a.x * Math.pow(t, 3), h = Math.pow(1 - t, 3) * i.y + 3 * s.y * t * (1 - t) * (1 - t) + 3 * r.y * t * t * (1 - t) + a.y * Math.pow(t, 3);
            e.push(n, h);
        }
        insertPoints(t, e) {
            var i, s;
            for (s = 1 / (t = t > 0 ? t : 5), i = 0; i <= 1; i += s) this._calFun(i, e);
        }
        getBezierPoints(t, e = 5, i = 2) {
            var s, r;
            if ((r = t.length) < 2 * (i + 1)) return [];
            var a = [];
            switch (i) {
                case 2:
                    this._calFun = this.getPoint2;
                    break;

                case 3:
                    this._calFun = this.getPoint3;
                    break;

                default:
                    return [];
            }
            for (; this._controlPoints.length <= i;) this._controlPoints.push(f.create());
            for (s = 0; s < 2 * i; s += 2) this._switchPoint(t[s], t[s + 1]);
            for (s = 2 * i; s < r; s += 2) this._switchPoint(t[s], t[s + 1]), s / 2 % i == 0 && this.insertPoints(e, a);
            return a;
        }
    }
    nt.I = new nt();
    class ht {
        static multiply(t, e, i) {
            return (t.x - i.x) * (e.y - i.y) - (e.x - i.x) * (t.y - i.y);
        }
        static dis(t, e) {
            return (t.x - e.x) * (t.x - e.x) + (t.y - e.y) * (t.y - e.y);
        }
        static _getPoints(t, e = !1, i = null) {
            for (ht._mPointList || (ht._mPointList = []); ht._mPointList.length < t;) ht._mPointList.push(new f());
            return i || (i = []), i.length = 0, e ? ht.getFrom(i, ht._mPointList, t) : ht.getFromR(i, ht._mPointList, t),
                i;
        }
        static getFrom(t, e, i) {
            var s;
            for (s = 0; s < i; s++) t.push(e[s]);
            return t;
        }
        static getFromR(t, e, i) {
            var s;
            for (s = 0; s < i; s++) t.push(e.pop());
            return t;
        }
        static pListToPointList(t, e = !1) {
            var i, s = t.length / 2, r = ht._getPoints(s, e, ht._tempPointList);
            for (i = 0; i < s; i++) r[i].setTo(t[i + i], t[i + i + 1]);
            return r;
        }
        static pointListToPlist(t) {
            var e, i, s = t.length, r = ht._temPList;
            for (r.length = 0, e = 0; e < s; e++) i = t[e], r.push(i.x, i.y);
            return r;
        }
        static scanPList(t) {
            return Q.copyArray(t, ht.pointListToPlist(ht.scan(ht.pListToPointList(t, !0))));
        }
        static scan(t) {
            var e, i, s, r, a, n = 0, h = t.length, o = {};
            for ((r = ht._temArr).length = 0, e = (h = t.length) - 1; e >= 0; e--) (a = (s = t[e]).x + "_" + s.y) in o || (o[a] = !0,
                r.push(s));
            for (h = r.length, Q.copyArray(t, r), e = 1; e < h; e++) (t[e].y < t[n].y || t[e].y == t[n].y && t[e].x < t[n].x) && (n = e);
            for (s = t[0], t[0] = t[n], t[n] = s, e = 1; e < h - 1; e++) {
                for (n = e, i = e + 1; i < h; i++) (ht.multiply(t[i], t[n], t[0]) > 0 || 0 == ht.multiply(t[i], t[n], t[0]) && ht.dis(t[0], t[i]) < ht.dis(t[0], t[n])) && (n = i);
                s = t[e], t[e] = t[n], t[n] = s;
            }
            if ((r = ht._temArr).length = 0, t.length < 3) return Q.copyArray(r, t);
            for (r.push(t[0], t[1], t[2]), e = 3; e < h; e++) {
                for (; r.length >= 2 && ht.multiply(t[e], r[r.length - 1], r[r.length - 2]) >= 0;) r.pop();
                t[e] && r.push(t[e]);
            }
            return r;
        }
    }
    ht._tempPointList = [], ht._temPList = [], ht._temArr = [];
    class ot {
        constructor(t) {
            this.setValue(t);
        }
        static create(t) {
            if (t) {
                var e = t instanceof Z ? t : Z.create(t);
                return e._drawStyle || (e._drawStyle = new ot(t));
            }
            return ot.DEFAULT;
        }
        setValue(t) {
            this._color = t ? t instanceof Z ? t : Z.create(t) : Z.create("#000000");
        }
        reset() {
            this._color = Z.create("#000000");
        }
        toInt() {
            return this._color.numColor;
        }
        equal(t) {
            return "string" == typeof t ? this._color.strColor === t : t instanceof Z && this._color.numColor === t.numColor;
        }
        toColorStr() {
            return this._color.strColor;
        }
    }
    ot.DEFAULT = new ot("#000000");
    class lt {
        constructor() {
            this._lastOriX = 0, this._lastOriY = 0, this.paths = [], this._curPath = null;
        }
        beginPath(t) {
            this.paths.length = 1, this._curPath = this.paths[0] = new _t(), this._curPath.convex = t;
        }
        closePath() {
            this._curPath.loop = !0;
        }
        newPath() {
            this._curPath = new _t(), this.paths.push(this._curPath);
        }
        addPoint(t, e) {
            this._curPath.path.push(t, e);
        }
        push(t, e) {
            this._curPath ? this._curPath.path.length > 0 && (this._curPath = new _t(), this.paths.push(this._curPath)) : (this._curPath = new _t(),
                this.paths.push(this._curPath));
            var i = this._curPath;
            i.path = t.slice(), i.convex = e;
        }
        reset() {
            this.paths.length = 0;
        }
    }
    class _t {
        constructor() {
            this.path = [], this.loop = !1, this.convex = !1;
        }
    }
    class ut {
        constructor(t = ut.TYPE_2D) {
            this.clipInfoID = -1, this._mesh = null, this._blendFn = null, this._id = 0, this._renderType = 0,
                this._parent = null, this._key = new K(), this._startIdx = 0, this._numEle = 0,
                this._ref = 1, this.shaderValue = null, this._renderType = t, this._id = ++ut.ID;
        }
        static __init__() {
            var t = ut.RENDERBASE = new ut(-1);
            t.shaderValue = new z(0, 0), t.shaderValue.ALPHA = 1, t._ref = 4294967295;
        }
        getID() {
            return this._id;
        }
        getRenderType() {
            return this._renderType;
        }
        toString() {
            return "ibindex:" + this._startIdx + " num:" + this._numEle + " key=" + this._key;
        }
        renderSubmit() {
            return 1;
        }
        releaseRender() { }
    }
    ut.TYPE_2D = 1e4, ut.TYPE_CANVAS = 10003, ut.TYPE_CMDSETRT = 10004, ut.TYPE_CUSTOM = 10005,
        ut.TYPE_BLURRT = 10006, ut.TYPE_CMDDESTORYPRERT = 10007, ut.TYPE_DISABLESTENCIL = 10008,
        ut.TYPE_OTHERIBVB = 10009, ut.TYPE_PRIMITIVE = 10010, ut.TYPE_RT = 10011, ut.TYPE_BLUR_RT = 10012,
        ut.TYPE_TARGET = 10013, ut.TYPE_CHANGE_VALUE = 10014, ut.TYPE_SHAPE = 10015, ut.TYPE_TEXTURE = 10016,
        ut.TYPE_FILLTEXTURE = 10017, ut.KEY_ONCE = -1, ut.KEY_FILLRECT = 1, ut.KEY_DRAWTEXTURE = 2,
        ut.KEY_VG = 3, ut.KEY_TRIANGLES = 4, ut.ID = 1, ut.preRender = null;
    class ct {
        constructor() { }
        static _createArray() {
            var t = [];
            return t._length = 0, t;
        }
        static _init() {
            var t = ct._namemap = {};
            return t[ct.TYPE_ALPHA] = "ALPHA", t[ct.TYPE_FILESTYLE] = "fillStyle", t[ct.TYPE_FONT] = "font",
                t[ct.TYPE_LINEWIDTH] = "lineWidth", t[ct.TYPE_STROKESTYLE] = "strokeStyle", t[ct.TYPE_ENABLEMERGE] = "_mergeID",
                t[ct.TYPE_MARK] = t[ct.TYPE_TRANSFORM] = t[ct.TYPE_TRANSLATE] = [], t[ct.TYPE_TEXTBASELINE] = "textBaseline",
                t[ct.TYPE_TEXTALIGN] = "textAlign", t[ct.TYPE_GLOBALCOMPOSITEOPERATION] = "_nBlendType",
                t[ct.TYPE_SHADER] = "shader", t[ct.TYPE_FILTERS] = "filters", t[ct.TYPE_COLORFILTER] = "_colorFiler",
                t;
        }
        isSaveMark() {
            return !1;
        }
        restore(t) {
            this._dataObj[this._valueName] = this._value, ct.POOL[ct.POOL._length++] = this,
                this._newSubmit && (t._curSubmit = ut.RENDERBASE);
        }
        static save(t, e, i, s) {
            if ((t._saveMark._saveuse & e) !== e) {
                t._saveMark._saveuse |= e;
                var r = ct.POOL, a = r._length > 0 ? r[--r._length] : new ct();
                a._value = i[a._valueName = ct._namemap[e]], a._dataObj = i, a._newSubmit = s;
                var n = t._save;
                n[n._length++] = a;
            }
        }
    }
    ct.TYPE_ALPHA = 1, ct.TYPE_FILESTYLE = 2, ct.TYPE_FONT = 8, ct.TYPE_LINEWIDTH = 256,
        ct.TYPE_STROKESTYLE = 512, ct.TYPE_MARK = 1024, ct.TYPE_TRANSFORM = 2048, ct.TYPE_TRANSLATE = 4096,
        ct.TYPE_ENABLEMERGE = 8192, ct.TYPE_TEXTBASELINE = 16384, ct.TYPE_TEXTALIGN = 32768,
        ct.TYPE_GLOBALCOMPOSITEOPERATION = 65536, ct.TYPE_CLIPRECT = 131072, ct.TYPE_CLIPRECT_STENCIL = 262144,
        ct.TYPE_IBVB = 524288, ct.TYPE_SHADER = 1048576, ct.TYPE_FILTERS = 2097152, ct.TYPE_FILTERS_TYPE = 4194304,
        ct.TYPE_COLORFILTER = 8388608, ct.POOL = ct._createArray(), ct._namemap = ct._init();
    class dt {
        constructor() {
            this._globalClipMatrix = new p(), this._clipInfoID = -1, this._clipRect = new g(),
                this.incache = !1;
        }
        isSaveMark() {
            return !1;
        }
        restore(t) {
            this._globalClipMatrix.copyTo(t._globalClipMatrix), this._clipRect.clone(t._clipRect),
                t._clipInfoID = this._clipInfoID, dt.POOL[dt.POOL._length++] = this, t._clipInCache = this.incache;
        }
        static save(t) {
            if ((t._saveMark._saveuse & ct.TYPE_CLIPRECT) != ct.TYPE_CLIPRECT) {
                t._saveMark._saveuse |= ct.TYPE_CLIPRECT;
                var e = dt.POOL, i = e._length > 0 ? e[--e._length] : new dt();
                t._globalClipMatrix.copyTo(i._globalClipMatrix), t._clipRect.clone(i._clipRect),
                    i._clipInfoID = t._clipInfoID, i.incache = t._clipInCache;
                var s = t._save;
                s[s._length++] = i;
            }
        }
    }
    dt.POOL = ct._createArray();
    class pt {
        constructor() {
            this._saveuse = 0;
        }
        isSaveMark() {
            return !0;
        }
        restore(t) {
            t._saveMark = this._preSaveMark, pt.POOL[pt.POOL._length++] = this;
        }
        static Create(t) {
            var e = pt.POOL, i = e._length > 0 ? e[--e._length] : new pt();
            return i._saveuse = 0, i._preSaveMark = t._saveMark, t._saveMark = i, i;
        }
    }
    pt.POOL = ct._createArray();
    class ft {
        constructor() {
            this._matrix = new p();
        }
        isSaveMark() {
            return !1;
        }
        restore(t) {
            t._curMat = this._savematrix, ft.POOL[ft.POOL._length++] = this;
        }
        static save(t) {
            var e = t._saveMark;
            if ((e._saveuse & ct.TYPE_TRANSFORM) !== ct.TYPE_TRANSFORM) {
                e._saveuse |= ct.TYPE_TRANSFORM;
                var i = ft.POOL, s = i._length > 0 ? i[--i._length] : new ft();
                s._savematrix = t._curMat, t._curMat = t._curMat.copyTo(s._matrix);
                var r = t._save;
                r[r._length++] = s;
            }
        }
    }
    ft.POOL = ct._createArray();
    class gt {
        constructor() {
            this._mat = new p();
        }
        isSaveMark() {
            return !1;
        }
        restore(t) {
            this._mat.copyTo(t._curMat), gt.POOL[gt.POOL._length++] = this;
        }
        static save(t) {
            var e = gt.POOL, i = e._length > 0 ? e[--e._length] : new gt();
            t._curMat.copyTo(i._mat);
            var s = t._save;
            s[s._length++] = i;
        }
    }
    gt.POOL = ct._createArray();
    class mt {
        constructor() {
            this._nativeVertexArrayObject = m.layaGPUInstance.createVertexArray();
        }
        bind() {
            mt._curBindedBufferState !== this && (m.layaGPUInstance.bindVertexArray(this._nativeVertexArrayObject),
                mt._curBindedBufferState = this);
        }
        unBind() {
            if (mt._curBindedBufferState !== this) throw "BufferState: must call bind() function first.";
            m.layaGPUInstance.bindVertexArray(null), mt._curBindedBufferState = null;
        }
        destroy() {
            m.layaGPUInstance.deleteVertexArray(this._nativeVertexArrayObject);
        }
        bindForNative() {
            m.instance.bindVertexArray(this._nativeVertexArrayObject), mt._curBindedBufferState = this;
        }
        unBindForNative() {
            m.instance.bindVertexArray(null), mt._curBindedBufferState = null;
        }
    }
    class vt extends mt {
        constructor() {
            super();
        }
    }
    class Tt {
        constructor() {
            this._byteLength = 0, this._glBuffer = m.instance.createBuffer();
        }
        get bufferUsage() {
            return this._bufferUsage;
        }
        _bindForVAO() { }
        bind() {
            return !1;
        }
        destroy() {
            this._glBuffer && (m.instance.deleteBuffer(this._glBuffer), this._glBuffer = null);
        }
    }
    class xt { }
    xt.loopStTm = 0, xt.loopCount = 0;
    class yt extends Tt {
        constructor() {
            super(), this._maxsize = 0, this._upload = !0, this._uploadSize = 0, this._bufferSize = 0,
                this._u8Array = null;
        }
        static __int__(t) { }
        get bufferLength() {
            return this._buffer.byteLength;
        }
        set byteLength(t) {
            this.setByteLength(t);
        }
        setByteLength(t) {
            this._byteLength !== t && (t <= this._bufferSize || this._resizeBuffer(2 * t + 256, !0),
                this._byteLength = t);
        }
        needSize(t) {
            var e = this._byteLength;
            if (t) {
                var i = this._byteLength + t;
                i <= this._bufferSize || this._resizeBuffer(i << 1, !0), this._byteLength = i;
            }
            return e;
        }
        _bufferData() {
            this._maxsize = Math.max(this._maxsize, this._byteLength), xt.loopCount % 30 == 0 && (this._buffer.byteLength > this._maxsize + 64 && (this._buffer = this._buffer.slice(0, this._maxsize + 64),
                this._bufferSize = this._buffer.byteLength, this._checkArrayUse()), this._maxsize = this._byteLength),
                this._uploadSize < this._buffer.byteLength && (this._uploadSize = this._buffer.byteLength,
                    m.instance.bufferData(this._bufferType, this._uploadSize, this._bufferUsage)), m.instance.bufferSubData(this._bufferType, 0, new Uint8Array(this._buffer, 0, this._byteLength));
        }
        _bufferSubData(t = 0, e = 0, i = 0) {
            if (this._maxsize = Math.max(this._maxsize, this._byteLength), xt.loopCount % 30 == 0 && (this._buffer.byteLength > this._maxsize + 64 && (this._buffer = this._buffer.slice(0, this._maxsize + 64),
                this._bufferSize = this._buffer.byteLength, this._checkArrayUse()), this._maxsize = this._byteLength),
                this._uploadSize < this._buffer.byteLength && (this._uploadSize = this._buffer.byteLength,
                    m.instance.bufferData(this._bufferType, this._uploadSize, this._bufferUsage)), e || i) {
                var s = this._buffer.slice(e, i);
                m.instance.bufferSubData(this._bufferType, t, s);
            } else m.instance.bufferSubData(this._bufferType, t, this._buffer);
        }
        _checkArrayUse() { }
        _bind_uploadForVAO() {
            return !!this._upload && (this._upload = !1, this._bindForVAO(), this._bufferData(),
                !0);
        }
        _bind_upload() {
            return !!this._upload && (this._upload = !1, this.bind(), this._bufferData(), !0);
        }
        _bind_subUpload(t = 0, e = 0, i = 0) {
            return !!this._upload && (this._upload = !1, this.bind(), this._bufferSubData(t, e, i),
                !0);
        }
        _resizeBuffer(t, e) {
            var i = this._buffer;
            if (t <= i.byteLength) return this;
            var s = this._u8Array;
            if (e && i && i.byteLength > 0) {
                var r = new ArrayBuffer(t), a = s && s.buffer == i ? s : new Uint8Array(i);
                (s = this._u8Array = new Uint8Array(r)).set(a, 0), i = this._buffer = r;
            } else i = this._buffer = new ArrayBuffer(t), this._u8Array = null;
            return this._checkArrayUse(), this._upload = !0, this._bufferSize = i.byteLength,
                this;
        }
        append(t) {
            var e, i;
            this._upload = !0, e = t.byteLength, t instanceof Uint8Array ? (this._resizeBuffer(this._byteLength + e, !0),
                i = new Uint8Array(this._buffer, this._byteLength)) : t instanceof Uint16Array ? (this._resizeBuffer(this._byteLength + e, !0),
                    i = new Uint16Array(this._buffer, this._byteLength)) : t instanceof Float32Array && (this._resizeBuffer(this._byteLength + e, !0),
                        i = new Float32Array(this._buffer, this._byteLength)), i.set(t, 0), this._byteLength += e,
                this._checkArrayUse();
        }
        appendU16Array(t, e) {
            this._resizeBuffer(this._byteLength + 2 * e, !0);
            var i = new Uint16Array(this._buffer, this._byteLength, e);
            if (6 == e) i[0] = t[0], i[1] = t[1], i[2] = t[2], i[3] = t[3], i[4] = t[4], i[5] = t[5]; else if (e >= 100) i.set(new Uint16Array(t.buffer, 0, e)); else for (var s = 0; s < e; s++) i[s] = t[s];
            this._byteLength += 2 * e, this._checkArrayUse();
        }
        appendEx(t, e) {
            var i;
            this._upload = !0, i = t.byteLength, this._resizeBuffer(this._byteLength + i, !0),
                new e(this._buffer, this._byteLength).set(t, 0), this._byteLength += i, this._checkArrayUse();
        }
        appendEx2(t, e, i, s = 1) {
            var r, a, n;
            for (this._upload = !0, r = i * s, this._resizeBuffer(this._byteLength + r, !0),
                a = new e(this._buffer, this._byteLength), n = 0; n < i; n++) a[n] = t[n];
            this._byteLength += r, this._checkArrayUse();
        }
        getBuffer() {
            return this._buffer;
        }
        setNeedUpload() {
            this._upload = !0;
        }
        getNeedUpload() {
            return this._upload;
        }
        upload() {
            var t = m.instance, e = this._bind_upload();
            return t.bindBuffer(this._bufferType, null), this._bufferType == t.ARRAY_BUFFER && (Tt._bindedVertexBuffer = null),
                this._bufferType == t.ELEMENT_ARRAY_BUFFER && (Tt._bindedIndexBuffer = null), F.activeShader = null,
                e;
        }
        subUpload(t = 0, e = 0, i = 0) {
            var s = m.instance, r = this._bind_subUpload();
            return s.bindBuffer(this._bufferType, null), this._bufferType == s.ARRAY_BUFFER && (Tt._bindedVertexBuffer = null),
                this._bufferType == s.ELEMENT_ARRAY_BUFFER && (Tt._bindedIndexBuffer = null), F.activeShader = null,
                r;
        }
        _disposeResource() {
            this._upload = !0, this._uploadSize = 0;
        }
        clear() {
            this._byteLength = 0, this._upload = !0;
        }
    }
    yt.FLOAT32 = 4, yt.SHORT = 2;
    class Et extends yt {
        constructor(t = 35044) {
            super(), this._bufferUsage = t, this._bufferType = m.instance.ELEMENT_ARRAY_BUFFER,
                this._buffer = new ArrayBuffer(8);
        }
        _checkArrayUse() {
            this._uint16Array && (this._uint16Array = new Uint16Array(this._buffer));
        }
        getUint16Array() {
            return this._uint16Array || (this._uint16Array = new Uint16Array(this._buffer));
        }
        _bindForVAO() {
            var t = m.instance;
            t.bindBuffer(t.ELEMENT_ARRAY_BUFFER, this._glBuffer);
        }
        bind() {
            if (Tt._bindedIndexBuffer !== this._glBuffer) {
                var t = m.instance;
                return t.bindBuffer(t.ELEMENT_ARRAY_BUFFER, this._glBuffer), Tt._bindedIndexBuffer = this._glBuffer,
                    !0;
            }
            return !1;
        }
        destory() {
            this._uint16Array = null, this._buffer = null;
        }
        disposeResource() {
            this._disposeResource();
        }
    }
    Et.create = function (t = 35044) {
        return new Et(t);
    };
    class bt extends yt {
        constructor(t, e) {
            super(), this._vertexStride = t, this._bufferUsage = e, this._bufferType = m.instance.ARRAY_BUFFER,
                this._buffer = new ArrayBuffer(8), this._floatArray32 = new Float32Array(this._buffer),
                this._uint32Array = new Uint32Array(this._buffer);
        }
        get vertexStride() {
            return this._vertexStride;
        }
        getFloat32Array() {
            return this._floatArray32;
        }
        appendArray(t) {
            var e = this._byteLength >> 2;
            this.setByteLength(this._byteLength + 4 * t.length), this.getFloat32Array().set(t, e),
                this._upload = !0;
        }
        _checkArrayUse() {
            this._floatArray32 && (this._floatArray32 = new Float32Array(this._buffer)), this._uint32Array && (this._uint32Array = new Uint32Array(this._buffer));
        }
        deleteBuffer() {
            super._disposeResource();
        }
        _bindForVAO() {
            var t = m.instance;
            t.bindBuffer(t.ARRAY_BUFFER, this._glBuffer);
        }
        bind() {
            if (Tt._bindedVertexBuffer !== this._glBuffer) {
                var t = m.instance;
                return t.bindBuffer(t.ARRAY_BUFFER, this._glBuffer), Tt._bindedVertexBuffer = this._glBuffer,
                    !0;
            }
            return !1;
        }
        destroy() {
            super.destroy(), this._byteLength = 0, this._upload = !0, this._buffer = null, this._floatArray32 = null;
        }
    }
    bt.create = function (t, e = 35048) {
        return new bt(t, e);
    };
    class wt {
        constructor(t, i, s) {
            this._stride = 0, this.vertNum = 0, this.indexNum = 0, this._applied = !1, this._quadNum = 0,
                this.canReuse = !1, this._stride = t, this._vb = new bt(t, m.instance.DYNAMIC_DRAW),
                i ? this._vb._resizeBuffer(i, !1) : e.webGL2D_MeshAllocMaxMem && this._vb._resizeBuffer(65536 * t, !1),
                this._ib = new Et(), s && this._ib._resizeBuffer(s, !1);
        }
        cloneWithNewVB() {
            var t = new wt(this._stride, 0, 0);
            return t._ib = this._ib, t._quadNum = this._quadNum, t._attribInfo = this._attribInfo,
                t;
        }
        cloneWithNewVBIB() {
            var t = new wt(this._stride, 0, 0);
            return t._attribInfo = this._attribInfo, t;
        }
        getVBW() {
            return this._vb.setNeedUpload(), this._vb;
        }
        getVBR() {
            return this._vb;
        }
        getIBR() {
            return this._ib;
        }
        getIBW() {
            return this._ib.setNeedUpload(), this._ib;
        }
        createQuadIB(t) {
            this._quadNum = t, this._ib._resizeBuffer(6 * t * 2, !1), this._ib.byteLength = this._ib.bufferLength;
            for (var e = this._ib.getUint16Array(), i = 0, s = 0, r = 0; r < t; r++) e[i++] = s,
                e[i++] = s + 2, e[i++] = s + 1, e[i++] = s, e[i++] = s + 3, e[i++] = s + 2, s += 4;
            this._ib.setNeedUpload();
        }
        setAttributes(t) {
            if (this._attribInfo = t, this._attribInfo.length % 3 != 0) throw "Mesh2D setAttributes error!";
        }
        configVAO(t) {
            if (!this._applied) {
                this._applied = !0, this._vao || (this._vao = new vt()), this._vao.bind(), this._vb._bindForVAO(),
                    this._ib.setNeedUpload(), this._ib._bind_uploadForVAO();
                for (var e = this._attribInfo.length / 3, i = 0, s = 0; s < e; s++) {
                    var r = this._attribInfo[i + 1], a = this._attribInfo[i], n = this._attribInfo[i + 2];
                    t.enableVertexAttribArray(s), t.vertexAttribPointer(s, r, a, !1, this._stride, n),
                        i += 3;
                }
                this._vao.unBind();
            }
        }
        useMesh(t) {
            this._applied || this.configVAO(t), this._vao.bind(), this._vb.bind(), this._ib._bind_upload() || this._ib.bind(),
                this._vb._bind_upload() || this._vb.bind();
        }
        getEleNum() {
            return this._ib.getBuffer().byteLength / 2;
        }
        releaseMesh() { }
        destroy() { }
        clearVB() {
            this._vb.clear();
        }
    }
    wt._gvaoid = 0;
    class Ct extends wt {
        constructor() {
            super(Ct.const_stride, 4, 4), this.canReuse = !0, this.setAttributes(Ct._fixattriInfo),
                Ct._fixib ? (this._ib = Ct._fixib, this._quadNum = Ct._maxIB) : (this.createQuadIB(Ct._maxIB),
                    Ct._fixib = this._ib);
        }
        static __int__() {
            Ct._fixattriInfo = [5126, 4, 0, 5121, 4, 16, 5121, 4, 20];
        }
        static getAMesh(t) {
            var e = null;
            return e = Ct._POOL.length ? Ct._POOL.pop() : new Ct(), t && e._vb._resizeBuffer(65536 * Ct.const_stride, !1),
                e;
        }
        releaseMesh() {
            this._vb.setByteLength(0), this.vertNum = 0, this.indexNum = 0, Ct._POOL.push(this);
        }
        destroy() {
            this._vb.destroy(), this._vb.deleteBuffer();
        }
        addQuad(t, e, i, s) {
            var r = this._vb, a = r._byteLength >> 2;
            r.setByteLength(a + Ct.const_stride << 2);
            var n = r._floatArray32 || r.getFloat32Array(), h = r._uint32Array, o = a, l = s ? 255 : 0;
            n[o++] = t[0], n[o++] = t[1], n[o++] = e[0], n[o++] = e[1], h[o++] = i, h[o++] = l,
                n[o++] = t[2], n[o++] = t[3], n[o++] = e[2], n[o++] = e[3], h[o++] = i, h[o++] = l,
                n[o++] = t[4], n[o++] = t[5], n[o++] = e[4], n[o++] = e[5], h[o++] = i, h[o++] = l,
                n[o++] = t[6], n[o++] = t[7], n[o++] = e[6], n[o++] = e[7], h[o++] = i, h[o++] = l,
                r._upload = !0;
        }
    }
    Ct.const_stride = 24, Ct._maxIB = 16384, Ct._POOL = [];
    class At extends wt {
        constructor() {
            super(At.const_stride, 4, 4), this.canReuse = !0, this.setAttributes(At._fixattriInfo);
        }
        static __init__() {
            At._fixattriInfo = [5126, 4, 0, 5121, 4, 16, 5121, 4, 20];
        }
        static getAMesh(t) {
            var e;
            return e = At._POOL.length ? At._POOL.pop() : new At(), t && e._vb._resizeBuffer(65536 * At.const_stride, !1),
                e;
        }
        addData(t, e, i, s, r) {
            var a = this._vb, n = this._ib, h = t.length >> 1, o = a.needSize(h * At.const_stride) >> 2, l = a._floatArray32 || a.getFloat32Array(), _ = a._uint32Array, u = 0, c = s.a, d = s.b, p = s.c, f = s.d, g = s.tx, m = s.ty, v = 0;
            for (v = 0; v < h; v++) {
                var T = t[u], x = t[u + 1];
                l[o] = T * c + x * p + g, l[o + 1] = T * d + x * f + m, l[o + 2] = e[u], l[o + 3] = e[u + 1],
                    _[o + 4] = r, _[o + 5] = 255, o += 6, u += 2;
            }
            a.setNeedUpload();
            var y = this.vertNum, E = i.length, b = n.needSize(i.byteLength), w = n.getUint16Array(), C = b >> 1;
            if (y > 0) {
                var A = C + E, R = 0;
                for (v = C; v < A; v++, R++) w[v] = i[R] + y;
            } else w.set(i, C);
            n.setNeedUpload(), this.vertNum += h, this.indexNum += i.length;
        }
        releaseMesh() {
            this._vb.setByteLength(0), this._ib.setByteLength(0), this.vertNum = 0, this.indexNum = 0,
                At._POOL.push(this);
        }
        destroy() {
            this._ib.destroy(), this._vb.destroy(), this._ib.disposeResource(), this._vb.deleteBuffer();
        }
    }
    At.const_stride = 24, At._POOL = [];
    class Rt extends wt {
        constructor() {
            super(Rt.const_stride, 4, 4), this.canReuse = !0, this.setAttributes(Rt._fixattriInfo);
        }
        static __init__() {
            Rt._fixattriInfo = [5126, 2, 0, 5121, 4, 8];
        }
        static getAMesh(t) {
            var e;
            return e = Rt._POOL.length ? Rt._POOL.pop() : new Rt(), t && e._vb._resizeBuffer(65536 * Rt.const_stride, !1),
                e;
        }
        addVertAndIBToMesh(t, e, i, s) {
            for (var r = this._vb.needSize(e.length / 2 * Rt.const_stride) >> 2, a = this._vb._floatArray32 || this._vb.getFloat32Array(), n = this._vb._uint32Array, h = 0, o = e.length / 2, l = 0; l < o; l++) a[r++] = e[h],
                a[r++] = e[h + 1], h += 2, n[r++] = i;
            this._vb.setNeedUpload(), this._ib.append(new Uint16Array(s)), this._ib.setNeedUpload(),
                this.vertNum += o, this.indexNum += s.length;
        }
        releaseMesh() {
            this._vb.setByteLength(0), this._ib.setByteLength(0), this.vertNum = 0, this.indexNum = 0,
                Rt._POOL.push(this);
        }
        destroy() {
            this._ib.destroy(), this._vb.destroy(), this._ib.disposeResource(), this._vb.deleteBuffer();
        }
    }
    Rt.const_stride = 12, Rt._POOL = [];
    class Mt {
        constructor(t, e) {
            this.submitStartPos = 0, this.submitEndPos = 0, this.touches = [], this.submits = [],
                this.sprite = null, this.meshlist = [], this.cachedClipInfo = new p(), this.oldTx = 0,
                this.oldTy = 0, this.invMat = new p(), this.context = t, this.sprite = e, t._globalClipMatrix.copyTo(this.cachedClipInfo);
        }
        startRec() {
            let t = this.context;
            t._charSubmitCache && t._charSubmitCache._enable && (t._charSubmitCache.enable(!1, t),
                t._charSubmitCache.enable(!0, t)), t._incache = !0, this.touches.length = 0, t.touches = this.touches,
                t._globalClipMatrix.copyTo(this.cachedClipInfo), this.submits.length = 0, this.submitStartPos = t._submits._length;
            for (var e = 0, i = this.meshlist.length; e < i; e++) {
                var s = this.meshlist[e];
                s.canReuse ? s.releaseMesh() : s.destroy();
            }
            this.meshlist.length = 0, this._mesh = Ct.getAMesh(!1), this._pathMesh = Rt.getAMesh(!1),
                this._triangleMesh = At.getAMesh(!1), this.meshlist.push(this._mesh), this.meshlist.push(this._pathMesh),
                this.meshlist.push(this._triangleMesh), t._curSubmit = ut.RENDERBASE, this._oldMesh = t._mesh,
                this._oldPathMesh = t._pathMesh, this._oldTriMesh = t._triangleMesh, this._oldMeshList = t.meshlist,
                t._mesh = this._mesh, t._pathMesh = this._pathMesh, t._triangleMesh = this._triangleMesh,
                t.meshlist = this.meshlist, this.oldTx = t._curMat.tx, this.oldTy = t._curMat.ty,
                t._curMat.tx = 0, t._curMat.ty = 0, t._curMat.copyTo(this.invMat), this.invMat.invert();
        }
        endRec() {
            let t = this.context;
            t._charSubmitCache && t._charSubmitCache._enable && (t._charSubmitCache.enable(!1, t),
                t._charSubmitCache.enable(!0, t));
            var e = t._submits;
            this.submitEndPos = e._length;
            for (var i = this.submitEndPos - this.submitStartPos, s = 0; s < i; s++) this.submits.push(e[this.submitStartPos + s]);
            e._length -= i, t._mesh = this._oldMesh, t._pathMesh = this._oldPathMesh, t._triangleMesh = this._oldTriMesh,
                t.meshlist = this._oldMeshList, t._curSubmit = ut.RENDERBASE, t._curMat.tx = this.oldTx,
                t._curMat.ty = this.oldTy, t.touches = null, t._incache = !1;
        }
        isCacheValid() {
            var t = this.context._globalClipMatrix;
            return t.a == this.cachedClipInfo.a && t.b == this.cachedClipInfo.b && t.c == this.cachedClipInfo.c && t.d == this.cachedClipInfo.d && t.tx == this.cachedClipInfo.tx && t.ty == this.cachedClipInfo.ty;
        }
        flushsubmit() {
            var t = ut.RENDERBASE;
            this.submits.forEach(function (e) {
                e != ut.RENDERBASE && (ut.preRender = t, t = e, e.renderSubmit());
            });
        }
        releaseMem() { }
    }
    Mt.matI = new p();
    var St = "/*\r\n\ttexture和fillrect使用的。\r\n*/\r\nattribute vec4 posuv;\r\nattribute vec4 attribColor;\r\nattribute vec4 attribFlags;\r\n//attribute vec4 clipDir;\r\n//attribute vec2 clipRect;\r\nuniform vec4 clipMatDir;\r\nuniform vec2 clipMatPos;\t\t// 这个是全局的，不用再应用矩阵了。\r\nvarying vec2 cliped;\r\nuniform vec2 size;\r\nuniform vec2 clipOff;\t\t\t// 使用要把clip偏移。cacheas normal用. 只用了[0]\r\n#ifdef WORLDMAT\r\n\tuniform mat4 mmat;\r\n#endif\r\n#ifdef MVP3D\r\n\tuniform mat4 u_MvpMatrix;\r\n#endif\r\nvarying vec4 v_texcoordAlpha;\r\nvarying vec4 v_color;\r\nvarying float v_useTex;\r\n\r\nvoid main() {\r\n\r\n\tvec4 pos = vec4(posuv.xy,0.,1.);\r\n#ifdef WORLDMAT\r\n\tpos=mmat*pos;\r\n#endif\r\n\tvec4 pos1  =vec4((pos.x/size.x-0.5)*2.0,(0.5-pos.y/size.y)*2.0,0.,1.0);\r\n#ifdef MVP3D\r\n\tgl_Position=u_MvpMatrix*pos1;\r\n#else\r\n\tgl_Position=pos1;\r\n#endif\r\n\tv_texcoordAlpha.xy = posuv.zw;\r\n\t//v_texcoordAlpha.z = attribColor.a/255.0;\r\n\tv_color = attribColor/255.0;\r\n\tv_color.xyz*=v_color.w;//反正后面也要预乘\r\n\t\r\n\tv_useTex = attribFlags.r/255.0;\r\n\tfloat clipw = length(clipMatDir.xy);\r\n\tfloat cliph = length(clipMatDir.zw);\r\n\t\r\n\tvec2 clpos = clipMatPos.xy;\r\n\t#ifdef WORLDMAT\r\n\t\t// 如果有mmat，需要修改clipMatPos,因为 这是cacheas normal （如果不是就错了）， clipMatPos被去掉了偏移\r\n\t\tif(clipOff[0]>0.0){\r\n\t\t\tclpos.x+=mmat[3].x;\t//tx\t最简单处理\r\n\t\t\tclpos.y+=mmat[3].y;\t//ty\r\n\t\t}\r\n\t#endif\r\n\tvec2 clippos = pos.xy - clpos;\t//pos已经应用矩阵了，为了减的有意义，clip的位置也要缩放\r\n\tif(clipw>20000. && cliph>20000.)\r\n\t\tcliped = vec2(0.5,0.5);\r\n\telse {\r\n\t\t//转成0到1之间。/clipw/clipw 表示clippos与normalize之后的clip朝向点积之后，再除以clipw\r\n\t\tcliped=vec2( dot(clippos,clipMatDir.xy)/clipw/clipw, dot(clippos,clipMatDir.zw)/cliph/cliph);\r\n\t}\r\n\r\n}", It = "/*\r\n\ttexture和fillrect使用的。\r\n*/\r\n#if defined(GL_FRAGMENT_PRECISION_HIGH)// 原来的写法会被我们自己的解析流程处理，而我们的解析是不认内置宏的，导致被删掉，所以改成 if defined 了\r\nprecision highp float;\r\n#else\r\nprecision mediump float;\r\n#endif\r\n\r\nvarying vec4 v_texcoordAlpha;\r\nvarying vec4 v_color;\r\nvarying float v_useTex;\r\nuniform sampler2D texture;\r\nvarying vec2 cliped;\r\n\r\n#ifdef BLUR_FILTER\r\nuniform vec4 strength_sig2_2sig2_gauss1;\r\nuniform vec2 blurInfo;\r\n\r\n#define PI 3.141593\r\n\r\nfloat getGaussian(float x, float y){\r\n    return strength_sig2_2sig2_gauss1.w*exp(-(x*x+y*y)/strength_sig2_2sig2_gauss1.z);\r\n}\r\n\r\nvec4 blur(){\r\n    const float blurw = 9.0;\r\n    vec4 vec4Color = vec4(0.0,0.0,0.0,0.0);\r\n    vec2 halfsz=vec2(blurw,blurw)/2.0/blurInfo;    \r\n    vec2 startpos=v_texcoordAlpha.xy-halfsz;\r\n    vec2 ctexcoord = startpos;\r\n    vec2 step = 1.0/blurInfo;  //每个像素      \r\n    \r\n    for(float y = 0.0;y<=blurw; ++y){\r\n        ctexcoord.x=startpos.x;\r\n        for(float x = 0.0;x<=blurw; ++x){\r\n            //TODO 纹理坐标的固定偏移应该在vs中处理\r\n            vec4Color += texture2D(texture, ctexcoord)*getGaussian(x-blurw/2.0,y-blurw/2.0);\r\n            ctexcoord.x+=step.x;\r\n        }\r\n        ctexcoord.y+=step.y;\r\n    }\r\n    return vec4Color;\r\n}\r\n#endif\r\n\r\n#ifdef COLOR_FILTER\r\nuniform vec4 colorAlpha;\r\nuniform mat4 colorMat;\r\n#endif\r\n\r\n#ifdef GLOW_FILTER\r\nuniform vec4 u_color;\r\nuniform vec4 u_blurInfo1;\r\nuniform vec4 u_blurInfo2;\r\n#endif\r\n\r\n#ifdef COLOR_ADD\r\nuniform vec4 colorAdd;\r\n#endif\r\n\r\n#ifdef FILLTEXTURE\t\r\nuniform vec4 u_TexRange;//startu,startv,urange, vrange\r\n#endif\r\nvoid main() {\r\n\tif(cliped.x<0.) discard;\r\n\tif(cliped.x>1.) discard;\r\n\tif(cliped.y<0.) discard;\r\n\tif(cliped.y>1.) discard;\r\n\t\r\n#ifdef FILLTEXTURE\t\r\n   vec4 color= texture2D(texture, fract(v_texcoordAlpha.xy)*u_TexRange.zw + u_TexRange.xy);\r\n#else\r\n   vec4 color= texture2D(texture, v_texcoordAlpha.xy);\r\n#endif\r\n\r\n   if(v_useTex<=0.)color = vec4(1.,1.,1.,1.);\r\n   color.a*=v_color.w;\r\n   //color.rgb*=v_color.w;\r\n   color.rgb*=v_color.rgb;\r\n   gl_FragColor=color;\r\n   \r\n   #ifdef COLOR_ADD\r\n\tgl_FragColor = vec4(colorAdd.rgb,colorAdd.a*gl_FragColor.a);\r\n\tgl_FragColor.xyz *= colorAdd.a;\r\n   #endif\r\n   \r\n   #ifdef BLUR_FILTER\r\n\tgl_FragColor =   blur();\r\n\tgl_FragColor.w*=v_color.w;   \r\n   #endif\r\n   \r\n   #ifdef COLOR_FILTER\r\n\tmat4 alphaMat =colorMat;\r\n\r\n\talphaMat[0][3] *= gl_FragColor.a;\r\n\talphaMat[1][3] *= gl_FragColor.a;\r\n\talphaMat[2][3] *= gl_FragColor.a;\r\n\r\n\tgl_FragColor = gl_FragColor * alphaMat;\r\n\tgl_FragColor += colorAlpha/255.0*gl_FragColor.a;\r\n   #endif\r\n   \r\n   #ifdef GLOW_FILTER\r\n\tconst float c_IterationTime = 10.0;\r\n\tfloat floatIterationTotalTime = c_IterationTime * c_IterationTime;\r\n\tvec4 vec4Color = vec4(0.0,0.0,0.0,0.0);\r\n\tvec2 vec2FilterDir = vec2(-(u_blurInfo1.z)/u_blurInfo2.x,-(u_blurInfo1.w)/u_blurInfo2.y);\r\n\tvec2 vec2FilterOff = vec2(u_blurInfo1.x/u_blurInfo2.x/c_IterationTime * 2.0,u_blurInfo1.y/u_blurInfo2.y/c_IterationTime * 2.0);\r\n\tfloat maxNum = u_blurInfo1.x * u_blurInfo1.y;\r\n\tvec2 vec2Off = vec2(0.0,0.0);\r\n\tfloat floatOff = c_IterationTime/2.0;\r\n\tfor(float i = 0.0;i<=c_IterationTime; ++i){\r\n\t\tfor(float j = 0.0;j<=c_IterationTime; ++j){\r\n\t\t\tvec2Off = vec2(vec2FilterOff.x * (i - floatOff),vec2FilterOff.y * (j - floatOff));\r\n\t\t\tvec4Color += texture2D(texture, v_texcoordAlpha.xy + vec2FilterDir + vec2Off)/floatIterationTotalTime;\r\n\t\t}\r\n\t}\r\n\tgl_FragColor = vec4(u_color.rgb,vec4Color.a * u_blurInfo2.z);\r\n\tgl_FragColor.rgb *= gl_FragColor.a;   \r\n   #endif\r\n   \r\n}", Pt = "attribute vec4 position;\r\nattribute vec4 attribColor;\r\n//attribute vec4 clipDir;\r\n//attribute vec2 clipRect;\r\nuniform vec4 clipMatDir;\r\nuniform vec2 clipMatPos;\r\n#ifdef WORLDMAT\r\n\tuniform mat4 mmat;\r\n#endif\r\nuniform mat4 u_mmat2;\r\n//uniform vec2 u_pos;\r\nuniform vec2 size;\r\nvarying vec4 color;\r\n//vec4 dirxy=vec4(0.9,0.1, -0.1,0.9);\r\n//vec4 clip=vec4(100.,30.,300.,600.);\r\nvarying vec2 cliped;\r\nvoid main(){\r\n\t\r\n#ifdef WORLDMAT\r\n\tvec4 pos=mmat*vec4(position.xy,0.,1.);\r\n\tgl_Position =vec4((pos.x/size.x-0.5)*2.0,(0.5-pos.y/size.y)*2.0,pos.z,1.0);\r\n#else\r\n\tgl_Position =vec4((position.x/size.x-0.5)*2.0,(0.5-position.y/size.y)*2.0,position.z,1.0);\r\n#endif\t\r\n\tfloat clipw = length(clipMatDir.xy);\r\n\tfloat cliph = length(clipMatDir.zw);\r\n\tvec2 clippos = position.xy - clipMatPos.xy;\t//pos已经应用矩阵了，为了减的有意义，clip的位置也要缩放\r\n\tif(clipw>20000. && cliph>20000.)\r\n\t\tcliped = vec2(0.5,0.5);\r\n\telse {\r\n\t\t//clipdir是带缩放的方向，由于上面clippos是在缩放后的空间计算的，所以需要把方向先normalize一下\r\n\t\tcliped=vec2( dot(clippos,clipMatDir.xy)/clipw/clipw, dot(clippos,clipMatDir.zw)/cliph/cliph);\r\n\t}\r\n  //pos2d.x = dot(clippos,dirx);\r\n  color=attribColor/255.;\r\n}", Lt = "precision mediump float;\r\n//precision mediump float;\r\nvarying vec4 color;\r\n//uniform float alpha;\r\nvarying vec2 cliped;\r\nvoid main(){\r\n\t//vec4 a=vec4(color.r, color.g, color.b, 1);\r\n\t//a.a*=alpha;\r\n    gl_FragColor= color;// vec4(color.r, color.g, color.b, alpha);\r\n\tgl_FragColor.rgb*=color.a;\r\n\tif(cliped.x<0.) discard;\r\n\tif(cliped.x>1.) discard;\r\n\tif(cliped.y<0.) discard;\r\n\tif(cliped.y>1.) discard;\r\n}", Dt = "attribute vec2 position;\r\nattribute vec2 texcoord;\r\nattribute vec4 color;\r\nuniform vec2 size;\r\nuniform float offsetX;\r\nuniform float offsetY;\r\nuniform mat4 mmat;\r\nuniform mat4 u_mmat2;\r\nvarying vec2 v_texcoord;\r\nvarying vec4 v_color;\r\nvoid main() {\r\n  vec4 pos=mmat*u_mmat2*vec4(offsetX+position.x,offsetY+position.y,0,1 );\r\n  gl_Position = vec4((pos.x/size.x-0.5)*2.0,(0.5-pos.y/size.y)*2.0,pos.z,1.0);\r\n  v_color = color;\r\n  v_color.rgb *= v_color.a;\r\n  v_texcoord = texcoord;  \r\n}", Bt = "precision mediump float;\r\nvarying vec2 v_texcoord;\r\nvarying vec4 v_color;\r\nuniform sampler2D texture;\r\nuniform float alpha;\r\nvoid main() {\r\n\tvec4 t_color = texture2D(texture, v_texcoord);\r\n\tgl_FragColor = t_color.rgba * v_color;\r\n\tgl_FragColor *= alpha;\r\n}";
    class Ft {
        constructor() {
            this.ALPHA = 1, this.defines = new W(), this.shaderType = 0, this.fillStyle = ot.DEFAULT,
                this.strokeStyle = ot.DEFAULT;
        }
        destroy() {
            this.defines = null, this.filters = null;
        }
        static __init__() {
            X.preCompile2D(0, W.TEXTURE2D, St, It, null), X.preCompile2D(0, W.PRIMITIVE, Pt, Lt, null),
                X.preCompile2D(0, W.SKINMESH, Dt, Bt, null);
        }
    }
    class Ot {
        constructor() {
            var t = m.instance;
            this.ib = Et.create(t.DYNAMIC_DRAW), this.vb = bt.create(8);
        }
        static getInstance() {
            return Ot.instance = Ot.instance || new Ot();
        }
        addSkinMesh(t) {
            t.getData2(this.vb, this.ib, this.vb._byteLength / 32);
        }
        reset() {
            this.vb.clear(), this.ib.clear();
        }
    }
    class Nt {
        static createLine2(t, e, i, s, r, a) {
            if (t.length < 4) return null;
            var n = Nt.tempData.length > t.length + 2 ? Nt.tempData : new Array(t.length + 2);
            n[0] = t[0], n[1] = t[1];
            var h = 2, o = 0, l = t.length;
            for (o = 2; o < l; o += 2) Math.abs(t[o] - t[o - 2]) + Math.abs(t[o + 1] - t[o - 1]) > .01 && (n[h++] = t[o],
                n[h++] = t[o + 1]);
            a && Math.abs(t[0] - n[h - 2]) + Math.abs(t[1] - n[h - 1]) > .01 && (n[h++] = t[0],
                n[h++] = t[1]);
            var _ = r;
            l = h / 2;
            var u, c, d, p, f, g, m, v, T, x, y, E, b, w, C, A, R, M, S, I, P = i / 2;
            for (d = n[0], p = n[1], x = d - (f = n[2]), T = (T = -(p - (g = n[3]))) / (I = Math.sqrt(T * T + x * x)) * P,
                x = x / I * P, _.push(d - T, p - x, d + T, p + x), o = 1; o < l - 1; o++) d = n[2 * (o - 1)],
                    p = n[2 * (o - 1) + 1], f = n[2 * o], g = n[2 * o + 1], m = n[2 * (o + 1)], v = n[2 * (o + 1) + 1],
                    x = d - f, E = f - m, C = (-(T = (T = -(p - g)) / (I = Math.sqrt(T * T + x * x)) * P) + d) * (-(x = x / I * P) + g) - (-T + f) * (-x + p),
                    M = (-(y = (y = -(g - v)) / (I = Math.sqrt(y * y + E * E)) * P) + m) * (-(E = E / I * P) + g) - (-y + f) * (-E + v),
                    S = (b = -x + p - (-x + g)) * (R = -y + f - (-y + m)) - (A = -E + v - (-E + g)) * (w = -T + f - (-T + d)),
                    Math.abs(S) < .1 ? (S += 10.1, _.push(f - T, g - x, f + T, g + x)) : (u = (w * M - R * C) / S,
                        c = (A * C - b * M) / S, _.push(u, c, f - (u - f), g - (c - g)));
            for (d = n[h - 4], p = n[h - 3], x = d - (f = n[h - 2]), T = (T = -(p - (g = n[h - 1]))) / (I = Math.sqrt(T * T + x * x)) * P,
                x = x / I * P, _.push(f - T, g - x, f + T, g + x), o = 1; o < l; o++) e.push(s + 2 * (o - 1), s + 2 * (o - 1) + 1, s + 2 * o + 1, s + 2 * o + 1, s + 2 * o, s + 2 * (o - 1));
            return _;
        }
        static createLineTriangle(t, e, i, s, r, a, n) {
            var h = t.slice(), o = h.length, l = h[0], _ = h[1], u = h[2], c = (h[2], 0), d = 0, p = 0, f = 0, g = o / 2;
            if (!(g <= 1) && 2 != g) {
                for (var m = new Array(4 * g), v = 0, T = 0, x = 0; x < g - 1; x++) l = h[T++],
                    _ = h[T++], u = h[T++], f = h[T++] - _, 0 != (p = u - l) && 0 != f && (c = Math.sqrt(p * p + f * f)) > .001 && (m[d = 4 * v] = l,
                        m[d + 1] = _, m[d + 2] = p / c, m[d + 3] = f / c, v++);
                for (s ? (l = h[o - 2], _ = h[o - 1], u = h[0], f = h[1] - _, 0 != (p = u - l) && 0 != f && (c = Math.sqrt(p * p + f * f)) > .001 && (m[d = 4 * v] = l,
                    m[d + 1] = _, m[d + 2] = p / c, m[d + 3] = f / c, v++)) : (m[d = 4 * v] = l, m[d + 1] = _,
                        m[d + 2] = p / c, m[d + 3] = f / c, v++), T = 0, x = 0; x < g; x++) l = h[T], _ = h[T + 1],
                            u = h[T + 2], h[T + 3];
            }
        }
    }
    Nt.tempData = new Array(256);
    class Ut {
        constructor(t, e, i) {
            this.i = t, this.x = e, this.y = i, this.prev = null, this.next = null, this.z = null,
                this.prevZ = null, this.nextZ = null, this.steiner = !1;
        }
    }
    class Gt {
        static earcut(t, e, i) {
            i = i || 2;
            var s, r, a, n, h, o, l, _ = e && e.length, u = _ ? e[0] * i : t.length, c = Gt.linkedList(t, 0, u, i, !0), d = [];
            if (!c) return d;
            if (_ && (c = Gt.eliminateHoles(t, e, c, i)), t.length > 80 * i) {
                s = a = t[0], r = n = t[1];
                for (var p = i; p < u; p += i) (h = t[p]) < s && (s = h), (o = t[p + 1]) < r && (r = o),
                    h > a && (a = h), o > n && (n = o);
                l = 0 !== (l = Math.max(a - s, n - r)) ? 1 / l : 0;
            }
            return Gt.earcutLinked(c, d, i, s, r, l), d;
        }
        static linkedList(t, e, i, s, r) {
            var a, n;
            if (r === Gt.signedArea(t, e, i, s) > 0) for (a = e; a < i; a += s) n = Gt.insertNode(a, t[a], t[a + 1], n); else for (a = i - s; a >= e; a -= s) n = Gt.insertNode(a, t[a], t[a + 1], n);
            return n && Gt.equals(n, n.next) && (Gt.removeNode(n), n = n.next), n;
        }
        static filterPoints(t, e) {
            if (!t) return t;
            e || (e = t);
            var i, s = t;
            do {
                if (i = !1, s.steiner || !Gt.equals(s, s.next) && 0 !== Gt.area(s.prev, s, s.next)) s = s.next; else {
                    if (Gt.removeNode(s), (s = e = s.prev) === s.next) break;
                    i = !0;
                }
            } while (i || s !== e);
            return e;
        }
        static earcutLinked(t, e, i, s, r, a, n = null) {
            if (t) {
                !n && a && Gt.indexCurve(t, s, r, a);
                for (var h, o, l = t; t.prev !== t.next;) if (h = t.prev, o = t.next, a ? Gt.isEarHashed(t, s, r, a) : Gt.isEar(t)) e.push(h.i / i),
                    e.push(t.i / i), e.push(o.i / i), Gt.removeNode(t), t = o.next, l = o.next; else if ((t = o) === l) {
                        n ? 1 === n ? (t = Gt.cureLocalIntersections(t, e, i), Gt.earcutLinked(t, e, i, s, r, a, 2)) : 2 === n && Gt.splitEarcut(t, e, i, s, r, a) : Gt.earcutLinked(Gt.filterPoints(t, null), e, i, s, r, a, 1);
                        break;
                    }
            }
        }
        static isEar(t) {
            var e = t.prev, i = t, s = t.next;
            if (Gt.area(e, i, s) >= 0) return !1;
            for (var r = t.next.next; r !== t.prev;) {
                if (Gt.pointInTriangle(e.x, e.y, i.x, i.y, s.x, s.y, r.x, r.y) && Gt.area(r.prev, r, r.next) >= 0) return !1;
                r = r.next;
            }
            return !0;
        }
        static isEarHashed(t, e, i, s) {
            var r = t.prev, a = t, n = t.next;
            if (Gt.area(r, a, n) >= 0) return !1;
            for (var h = r.x < a.x ? r.x < n.x ? r.x : n.x : a.x < n.x ? a.x : n.x, o = r.y < a.y ? r.y < n.y ? r.y : n.y : a.y < n.y ? a.y : n.y, l = r.x > a.x ? r.x > n.x ? r.x : n.x : a.x > n.x ? a.x : n.x, _ = r.y > a.y ? r.y > n.y ? r.y : n.y : a.y > n.y ? a.y : n.y, u = Gt.zOrder(h, o, e, i, s), c = Gt.zOrder(l, _, e, i, s), d = t.nextZ; d && d.z <= c;) {
                if (d !== t.prev && d !== t.next && Gt.pointInTriangle(r.x, r.y, a.x, a.y, n.x, n.y, d.x, d.y) && Gt.area(d.prev, d, d.next) >= 0) return !1;
                d = d.nextZ;
            }
            for (d = t.prevZ; d && d.z >= u;) {
                if (d !== t.prev && d !== t.next && Gt.pointInTriangle(r.x, r.y, a.x, a.y, n.x, n.y, d.x, d.y) && Gt.area(d.prev, d, d.next) >= 0) return !1;
                d = d.prevZ;
            }
            return !0;
        }
        static cureLocalIntersections(t, e, i) {
            var s = t;
            do {
                var r = s.prev, a = s.next.next;
                !Gt.equals(r, a) && Gt.intersects(r, s, s.next, a) && Gt.locallyInside(r, a) && Gt.locallyInside(a, r) && (e.push(r.i / i),
                    e.push(s.i / i), e.push(a.i / i), Gt.removeNode(s), Gt.removeNode(s.next), s = t = a),
                    s = s.next;
            } while (s !== t);
            return s;
        }
        static splitEarcut(t, e, i, s, r, a) {
            var n = t;
            do {
                for (var h = n.next.next; h !== n.prev;) {
                    if (n.i !== h.i && Gt.isValidDiagonal(n, h)) {
                        var o = Gt.splitPolygon(n, h);
                        return n = Gt.filterPoints(n, n.next), o = Gt.filterPoints(o, o.next), Gt.earcutLinked(n, e, i, s, r, a),
                            void Gt.earcutLinked(o, e, i, s, r, a);
                    }
                    h = h.next;
                }
                n = n.next;
            } while (n !== t);
        }
        static eliminateHoles(t, e, i, s) {
            var r, a, n, h, o, l = [];
            for (r = 0, a = e.length; r < a; r++) n = e[r] * s, h = r < a - 1 ? e[r + 1] * s : t.length,
                (o = Gt.linkedList(t, n, h, s, !1)) === o.next && (o.steiner = !0), l.push(Gt.getLeftmost(o));
            for (l.sort(Gt.compareX), r = 0; r < l.length; r++) Gt.eliminateHole(l[r], i), i = Gt.filterPoints(i, i.next);
            return i;
        }
        static compareX(t, e) {
            return t.x - e.x;
        }
        static eliminateHole(t, e) {
            if (e = Gt.findHoleBridge(t, e)) {
                var i = Gt.splitPolygon(e, t);
                Gt.filterPoints(i, i.next);
            }
        }
        static findHoleBridge(t, e) {
            var i, s = e, r = t.x, a = t.y, n = -1 / 0;
            do {
                if (a <= s.y && a >= s.next.y && s.next.y !== s.y) {
                    var h = s.x + (a - s.y) * (s.next.x - s.x) / (s.next.y - s.y);
                    if (h <= r && h > n) {
                        if (n = h, h === r) {
                            if (a === s.y) return s;
                            if (a === s.next.y) return s.next;
                        }
                        i = s.x < s.next.x ? s : s.next;
                    }
                }
                s = s.next;
            } while (s !== e);
            if (!i) return null;
            if (r === n) return i.prev;
            var o, l = i, _ = i.x, u = i.y, c = 1 / 0;
            for (s = i.next; s !== l;) r >= s.x && s.x >= _ && r !== s.x && Gt.pointInTriangle(a < u ? r : n, a, _, u, a < u ? n : r, a, s.x, s.y) && ((o = Math.abs(a - s.y) / (r - s.x)) < c || o === c && s.x > i.x) && Gt.locallyInside(s, t) && (i = s,
                c = o), s = s.next;
            return i;
        }
        static indexCurve(t, e, i, s) {
            var r = t;
            do {
                null === r.z && (r.z = Gt.zOrder(r.x, r.y, e, i, s)), r.prevZ = r.prev, r.nextZ = r.next,
                    r = r.next;
            } while (r !== t);
            r.prevZ.nextZ = null, r.prevZ = null, Gt.sortLinked(r);
        }
        static sortLinked(t) {
            var e, i, s, r, a, n, h, o, l = 1;
            do {
                for (i = t, t = null, a = null, n = 0; i;) {
                    for (n++, s = i, h = 0, e = 0; e < l && (h++, s = s.nextZ); e++);
                    for (o = l; h > 0 || o > 0 && s;) 0 !== h && (0 === o || !s || i.z <= s.z) ? (r = i,
                        i = i.nextZ, h--) : (r = s, s = s.nextZ, o--), a ? a.nextZ = r : t = r, r.prevZ = a,
                        a = r;
                    i = s;
                }
                a.nextZ = null, l *= 2;
            } while (n > 1);
            return t;
        }
        static zOrder(t, e, i, s, r) {
            return (t = 1431655765 & ((t = 858993459 & ((t = 252645135 & ((t = 16711935 & ((t = 32767 * (t - i) * r) | t << 8)) | t << 4)) | t << 2)) | t << 1)) | (e = 1431655765 & ((e = 858993459 & ((e = 252645135 & ((e = 16711935 & ((e = 32767 * (e - s) * r) | e << 8)) | e << 4)) | e << 2)) | e << 1)) << 1;
        }
        static getLeftmost(t) {
            var e = t, i = t;
            do {
                e.x < i.x && (i = e), e = e.next;
            } while (e !== t);
            return i;
        }
        static pointInTriangle(t, e, i, s, r, a, n, h) {
            return (r - n) * (e - h) - (t - n) * (a - h) >= 0 && (t - n) * (s - h) - (i - n) * (e - h) >= 0 && (i - n) * (a - h) - (r - n) * (s - h) >= 0;
        }
        static isValidDiagonal(t, e) {
            return t.next.i !== e.i && t.prev.i !== e.i && !Gt.intersectsPolygon(t, e) && Gt.locallyInside(t, e) && Gt.locallyInside(e, t) && Gt.middleInside(t, e);
        }
        static area(t, e, i) {
            return (e.y - t.y) * (i.x - e.x) - (e.x - t.x) * (i.y - e.y);
        }
        static equals(t, e) {
            return t.x === e.x && t.y === e.y;
        }
        static intersects(t, e, i, s) {
            return !!(Gt.equals(t, e) && Gt.equals(i, s) || Gt.equals(t, s) && Gt.equals(i, e)) || Gt.area(t, e, i) > 0 != Gt.area(t, e, s) > 0 && Gt.area(i, s, t) > 0 != Gt.area(i, s, e) > 0;
        }
        static intersectsPolygon(t, e) {
            var i = t;
            do {
                if (i.i !== t.i && i.next.i !== t.i && i.i !== e.i && i.next.i !== e.i && Gt.intersects(i, i.next, t, e)) return !0;
                i = i.next;
            } while (i !== t);
            return !1;
        }
        static locallyInside(t, e) {
            return Gt.area(t.prev, t, t.next) < 0 ? Gt.area(t, e, t.next) >= 0 && Gt.area(t, t.prev, e) >= 0 : Gt.area(t, e, t.prev) < 0 || Gt.area(t, t.next, e) < 0;
        }
        static middleInside(t, e) {
            var i = t, s = !1, r = (t.x + e.x) / 2, a = (t.y + e.y) / 2;
            do {
                i.y > a != i.next.y > a && i.next.y !== i.y && r < (i.next.x - i.x) * (a - i.y) / (i.next.y - i.y) + i.x && (s = !s),
                    i = i.next;
            } while (i !== t);
            return s;
        }
        static splitPolygon(t, e) {
            var i = new Ut(t.i, t.x, t.y), s = new Ut(e.i, e.x, e.y), r = t.next, a = e.prev;
            return t.next = e, e.prev = t, i.next = r, r.prev = i, s.next = i, i.prev = s, a.next = s,
                s.prev = a, s;
        }
        static insertNode(t, e, i, s) {
            var r = new Ut(t, e, i);
            return s ? (r.next = s.next, r.prev = s, s.next.prev = r, s.next = r) : (r.prev = r,
                r.next = r), r;
        }
        static removeNode(t) {
            t.next.prev = t.prev, t.prev.next = t.next, t.prevZ && (t.prevZ.nextZ = t.nextZ),
                t.nextZ && (t.nextZ.prevZ = t.prevZ);
        }
        static signedArea(t, e, i, s) {
            for (var r = 0, a = e, n = i - s; a < i; a += s) r += (t[n] - t[a]) * (t[a + 1] + t[n + 1]),
                n = a;
            return r;
        }
    }
    class kt { }
    kt.BYTES_PE = 4, kt.BYTES_PIDX = 2, kt.defaultMatrix4 = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1],
        kt.defaultMinusYMatrix4 = [1, 0, 0, 0, 0, -1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1], kt.uniformMatrix3 = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0],
        kt._TMPARRAY = [], kt._OFFSETX = 0, kt._OFFSETY = 0;
    class Wt extends ut {
        constructor(t = ut.TYPE_2D) {
            super(t);
        }
        renderSubmit() {
            if (0 === this._numEle || !this._mesh || 0 == this._numEle) return 1;
            var t = this.shaderValue.textureHost;
            if (t) {
                var e = t._getSource();
                if (!e) return 1;
                this.shaderValue.texture = e;
            }
            var i = v.mainContext;
            return this._mesh.useMesh(i), this.shaderValue.upload(), G.activeBlendFunction !== this._blendFn && (v.setBlend(i, !0),
                this._blendFn(i), G.activeBlendFunction = this._blendFn), i.drawElements(i.TRIANGLES, this._numEle, i.UNSIGNED_SHORT, this._startIdx),
                V.renderBatches++, V.trianglesFaces += this._numEle / 3, 1;
        }
        releaseRender() {
            ut.RENDERBASE != this && --this._ref < 1 && (Wt.POOL[Wt._poolSize++] = this, this.shaderValue.release(),
                this.shaderValue = null, this._mesh = null, this._parent && (this._parent.releaseRender(),
                    this._parent = null));
        }
        static create(t, e, i) {
            var s = Wt._poolSize ? Wt.POOL[--Wt._poolSize] : new Wt();
            s._ref = 1, s._mesh = e, s._key.clear(), s._startIdx = e.indexNum * kt.BYTES_PIDX,
                s._numEle = 0;
            var r = t._nBlendType;
            s._blendFn = t._targets ? G.targetFns[r] : G.fns[r], s.shaderValue = i, s.shaderValue.setValue(t._shader2D);
            var a = t._shader2D.filters;
            return a && s.shaderValue.setFilters(a), s;
        }
        static createShape(t, e, i, s) {
            var r = Wt._poolSize ? Wt.POOL[--Wt._poolSize] : new Wt();
            r._mesh = e, r._numEle = i, r._startIdx = 2 * e.indexNum, r._ref = 1, r.shaderValue = s,
                r.shaderValue.setValue(t._shader2D);
            var a = t._nBlendType;
            return r._key.blendShader = a, r._blendFn = t._targets ? G.targetFns[a] : G.fns[a],
                r;
        }
    }
    Wt._poolSize = 0, Wt.POOL = [];
    class Vt extends ut {
        constructor() {
            super(ut.TYPE_2D), this._matrix = new p(), this._matrix4 = kt.defaultMatrix4.concat(),
                this.shaderValue = new z(0, 0);
        }
        static create(t, e, i) {
            var s = Vt.POOL._length ? Vt.POOL[--Vt.POOL._length] : new Vt();
            s.canv = t, s._ref = 1, s._numEle = 0;
            var r = s.shaderValue;
            return r.alpha = e, r.defines.setValue(0), i && i.length && r.setFilters(i), s;
        }
        renderSubmit() {
            var t = O.worldAlpha, e = O.worldMatrix4, i = O.worldMatrix, s = O.worldFilters, r = O.worldShaderDefines, a = this.shaderValue, n = this._matrix, h = this._matrix4, o = p.TEMP;
            return p.mul(n, i, o), h[0] = o.a, h[1] = o.b, h[4] = o.c, h[5] = o.d, h[12] = o.tx,
                h[13] = o.ty, O.worldMatrix = o.clone(), O.worldMatrix4 = h, O.worldAlpha = O.worldAlpha * a.alpha,
                a.filters && a.filters.length && (O.worldFilters = a.filters, O.worldShaderDefines = a.defines),
                this.canv.flushsubmit(), O.worldAlpha = t, O.worldMatrix4 = e, O.worldMatrix.destroy(),
                O.worldMatrix = i, O.worldFilters = s, O.worldShaderDefines = r, 1;
        }
        releaseRender() {
            if (--this._ref < 1) {
                var t = Vt.POOL;
                this._mesh = null, t[t._length++] = this;
            }
        }
        getRenderType() {
            return ut.TYPE_CANVAS;
        }
    }
    Vt.POOL = [], Vt.POOL._length = 0;
    class Yt {
        constructor() {
            this.blendType = 0, this._ref = 1, this._key = new K();
        }
        renderSubmit() {
            var t = v.mainContext;
            this._mesh.useMesh(t);
            var e = this.srcRT;
            return e && (this.shaderValue.texture = e._getSource(), this.shaderValue.upload(),
                this.blend(), V.renderBatches++, V.trianglesFaces += this._numEle / 3, t.drawElements(t.TRIANGLES, this._numEle, t.UNSIGNED_SHORT, this._startIdx)),
                1;
        }
        blend() {
            if (G.activeBlendFunction !== G.fns[this.blendType]) {
                var t = v.mainContext;
                t.enable(t.BLEND), G.fns[this.blendType](t), G.activeBlendFunction = G.fns[this.blendType];
            }
        }
        getRenderType() {
            return 0;
        }
        releaseRender() {
            if (--this._ref < 1) {
                var t = Yt.POOL;
                t[t._length++] = this;
            }
        }
        static create(t, e, i, s) {
            var r = Yt.POOL._length ? Yt.POOL[--Yt.POOL._length] : new Yt();
            if (r._mesh = e, r.srcRT = s, r._startIdx = e.indexNum * kt.BYTES_PIDX, r._ref = 1,
                r._key.clear(), r._numEle = 0, r.blendType = t._nBlendType, r._key.blendShader = r.blendType,
                r.shaderValue = i, r.shaderValue.setValue(t._shader2D), t._colorFiler) {
                var a = t._colorFiler;
                i.defines.add(a.type), i.colorMat = a._mat, i.colorAlpha = a._alpha;
            }
            return r;
        }
    }
    Yt.POOL = [], Yt.POOL._length = 0;
    class Xt extends ut {
        constructor(t = ut.TYPE_2D) {
            super(t);
        }
        releaseRender() {
            --this._ref < 1 && (Xt.POOL[Xt._poolSize++] = this, this.shaderValue.release(),
                this._mesh = null, this._parent && (this._parent.releaseRender(), this._parent = null));
        }
        renderSubmit() {
            if (0 === this._numEle) return 1;
            var t = this.shaderValue.textureHost;
            if (t) {
                var e = t ? t._getSource() : null;
                if (!e) return 1;
            }
            var i = v.mainContext;
            this._mesh.useMesh(i);
            var s = ut.preRender, r = ut.preRender._key;
            return 0 === this._key.blendShader && this._key.submitType === r.submitType && this._key.blendShader === r.blendShader && F.activeShader && ut.preRender.clipInfoID == this.clipInfoID && s.shaderValue.defines._value === this.shaderValue.defines._value && 0 == (this.shaderValue.defines._value & W.NOOPTMASK) ? F.activeShader.uploadTexture2D(e) : (G.activeBlendFunction !== this._blendFn && (v.setBlend(i, !0),
                this._blendFn(i), G.activeBlendFunction = this._blendFn), this.shaderValue.texture = e,
                this.shaderValue.upload()), i.drawElements(i.TRIANGLES, this._numEle, i.UNSIGNED_SHORT, this._startIdx),
                V.renderBatches++, V.trianglesFaces += this._numEle / 3, 1;
        }
        static create(t, e, i) {
            var s = Xt._poolSize ? Xt.POOL[--Xt._poolSize] : new Xt(ut.TYPE_TEXTURE);
            s._mesh = e, s._key.clear(), s._key.submitType = ut.KEY_DRAWTEXTURE, s._ref = 1,
                s._startIdx = e.indexNum * kt.BYTES_PIDX, s._numEle = 0;
            var r = t._nBlendType;
            if (s._key.blendShader = r, s._blendFn = t._targets ? G.targetFns[r] : G.fns[r],
                s.shaderValue = i, t._colorFiler) {
                var a = t._colorFiler;
                i.defines.add(a.type), i.colorMat = a._mat, i.colorAlpha = a._alpha;
            }
            return s;
        }
    }
    Xt._poolSize = 0, Xt.POOL = [];
    class Ht {
        constructor() {
            this._data = [], this._ndata = 0, this._clipid = -1, this._clipMatrix = new p(),
                this._enable = !1;
        }
        clear() {
            this._tex = null, this._imgId = -1, this._ndata = 0, this._enable = !1, this._colorFiler = null;
        }
        destroy() {
            this.clear(), this._data.length = 0, this._data = null;
        }
        add(t, e, i, s, r, a) {
            this._ndata > 0 && (this._tex != e || this._imgId != i || this._clipid >= 0 && this._clipid != t._clipInfoID) && this.submit(t),
                this._clipid = t._clipInfoID, t._globalClipMatrix.copyTo(this._clipMatrix), this._tex = e,
                this._imgId = i, this._colorFiler = t._colorFiler, this._data[this._ndata] = s,
                this._data[this._ndata + 1] = r, this._data[this._ndata + 2] = a, this._ndata += 3;
        }
        getPos() {
            return 0 == Ht.__nPosPool ? new Array(8) : Ht.__posPool[--Ht.__nPosPool];
        }
        enable(t, e) {
            t !== this._enable && (this._enable = t, this._enable || this.submit(e));
        }
        submit(t) {
            var e = this._ndata;
            if (e) {
                var i = t._mesh, s = t._colorFiler;
                t._colorFiler = this._colorFiler;
                var r = Xt.create(t, i, z.create(W.TEXTURE2D, 0));
                t._submits[t._submits._length++] = t._curSubmit = r, r.shaderValue.textureHost = this._tex,
                    r._key.other = this._imgId, t._colorFiler = s, t._copyClipInfo(r, this._clipMatrix),
                    r.clipInfoID = this._clipid;
                for (var a = 0; a < e; a += 3) i.addQuad(this._data[a], this._data[a + 1], this._data[a + 2], !0),
                    Ht.__posPool[Ht.__nPosPool++] = this._data[a];
                e /= 3, r._numEle += 6 * e, i.indexNum += 6 * e, i.vertNum += 4 * e, t._drawCount += e,
                    this._ndata = 0, xt.loopCount % 100 == 0 && (this._data.length = 0);
            }
        }
    }
    Ht.__posPool = [], Ht.__nPosPool = 0;
    class zt {
        constructor(t = 0, e = 0, i = 0) {
            this.atlasID = 0, this._width = 0, this._height = 0, this._texCount = 0, this._rowInfo = null,
                this._cells = null, this._used = 0, this._cells = null, this._rowInfo = null, this.atlasID = i,
                this._init(t, e);
        }
        addRect(t, e, i, s) {
            return !!this._get(e, i, s) && (this._fill(s.x, s.y, e, i, t), this._texCount++,
                !0);
        }
        _release() {
            this._cells = null, this._rowInfo = null;
        }
        _init(t, e) {
            return this._width = t, this._height = e, this._release(), 0 != this._width && (this._cells = new Uint8Array(this._width * this._height * 3),
                this._rowInfo = new Uint8Array(this._height), this._used = 0, this._clear(), !0);
        }
        _get(t, e, i) {
            if (t > this._width || e > this._height) return !1;
            for (var s = -1, r = -1, a = this._width, n = this._height, h = this._cells, o = 0; o < n; o++) if (!(this._rowInfo[o] < t)) for (var l = 0; l < a;) {
                var _ = 3 * (o * a + l);
                if (0 != h[_] || h[_ + 1] < t || h[_ + 2] < e) l += h[_ + 1]; else {
                    s = l, r = o;
                    for (var u = 0; u < t; u++) if (h[3 * u + _ + 2] < e) {
                        s = -1;
                        break;
                    }
                    if (!(s < 0)) return i.x = s, i.y = r, !0;
                    l += h[_ + 1];
                }
            }
            return !1;
        }
        _fill(t, e, i, s, r) {
            var a = this._width, n = this._height;
            this._check(t + i <= a && e + s <= n);
            for (var h = e; h < s + e; ++h) {
                this._check(this._rowInfo[h] >= i), this._rowInfo[h] -= i;
                for (var o = 0; o < i; o++) {
                    var l = 3 * (t + h * a + o);
                    this._check(0 == this._cells[l]), this._cells[l] = r, this._cells[l + 1] = i, this._cells[l + 2] = s;
                }
            }
            if (t > 0) for (h = 0; h < s; ++h) {
                var _ = 0;
                for (o = t - 1; o >= 0 && 0 == this._cells[3 * ((e + h) * a + o)]; --o, ++_);
                for (o = _; o > 0; --o) this._cells[3 * ((e + h) * a + t - o) + 1] = o, this._check(o > 0);
            }
            if (e > 0) for (o = t; o < t + i; ++o) {
                for (_ = 0, h = e - 1; h >= 0 && 0 == this._cells[3 * (o + h * a)]; --h, _++);
                for (h = _; h > 0; --h) this._cells[3 * (o + (e - h) * a) + 2] = h, this._check(h > 0);
            }
            this._used += i * s / (this._width * this._height);
        }
        _check(t) {
            0 == t && console.log("xtexMerger 错误啦");
        }
        _clear() {
            this._texCount = 0;
            for (var t = 0; t < this._height; t++) this._rowInfo[t] = this._width;
            for (var e = 0; e < this._height; e++) for (var i = 0; i < this._width; i++) {
                var s = 3 * (e * this._width + i);
                this._cells[s] = 0, this._cells[s + 1] = this._width - i, this._cells[s + 2] = this._width - e;
            }
        }
    }
    class Kt extends b {
        constructor(t, e) {
            super(), this._texW = 0, this._texH = 0, this.__destroyed = !1, this._discardTm = 0,
                this.genID = 0, this.bitmap = {
                    id: 0,
                    _glTexture: null
                }, this.curUsedCovRate = 0, this.curUsedCovRateAtlas = 0, this.lastTouchTm = 0,
                this.ri = null, this._texW = t || Kt.gTextRender.atlasWidth, this._texH = e || Kt.gTextRender.atlasWidth,
                this.bitmap.id = this.id, this.lock = !0;
        }
        recreateResource() {
            if (!this._source) {
                var t = m.instance, e = this._source = t.createTexture();
                this.bitmap._glTexture = e, v.bindTexture(t, t.TEXTURE_2D, e), t.texImage2D(t.TEXTURE_2D, 0, t.RGBA, this._texW, this._texH, 0, t.RGBA, t.UNSIGNED_BYTE, null),
                    t.texParameteri(t.TEXTURE_2D, t.TEXTURE_MIN_FILTER, t.LINEAR), t.texParameteri(t.TEXTURE_2D, t.TEXTURE_MAG_FILTER, t.LINEAR),
                    t.texParameteri(t.TEXTURE_2D, t.TEXTURE_WRAP_S, t.CLAMP_TO_EDGE), t.texParameteri(t.TEXTURE_2D, t.TEXTURE_WRAP_T, t.CLAMP_TO_EDGE),
                    Kt.gTextRender.debugUV && this.fillWhite();
            }
        }
        addChar(t, e, s, r = null) {
            if (Kt.gTextRender.isWan1Wan) return this.addCharCanvas(t, e, s, r);
            !this._source && this.recreateResource();
            var a = m.instance;
            v.bindTexture(a, a.TEXTURE_2D, this._source), !i.Render.isConchApp && a.pixelStorei(a.UNPACK_PREMULTIPLY_ALPHA_WEBGL, !0);
            var n, h, o, l, _ = t.data;
            return t.data instanceof Uint8ClampedArray && (_ = new Uint8Array(_.buffer)), a.texSubImage2D(a.TEXTURE_2D, 0, e, s, t.width, t.height, a.RGBA, a.UNSIGNED_BYTE, _),
                !i.Render.isConchApp && a.pixelStorei(a.UNPACK_PREMULTIPLY_ALPHA_WEBGL, !1), n = e / this._texW,
                h = s / this._texH, o = (e + t.width) / this._texW, l = (s + t.height) / this._texH,
                (r = r || new Array(8))[0] = n, r[1] = h, r[2] = o, r[3] = h, r[4] = o, r[5] = l,
                r[6] = n, r[7] = l, r;
        }
        addCharCanvas(t, e, s, r = null) {
            !this._source && this.recreateResource();
            var a, n, h, o, l = m.instance;
            return v.bindTexture(l, l.TEXTURE_2D, this._source), !i.Render.isConchApp && l.pixelStorei(l.UNPACK_PREMULTIPLY_ALPHA_WEBGL, !0),
                l.texSubImage2D(l.TEXTURE_2D, 0, e, s, l.RGBA, l.UNSIGNED_BYTE, t), !i.Render.isConchApp && l.pixelStorei(l.UNPACK_PREMULTIPLY_ALPHA_WEBGL, !1),
                i.Render.isConchApp ? (a = e / this._texW, n = s / this._texH, h = (e + t.width) / this._texW,
                    o = (s + t.height) / this._texH) : (a = (e + 1) / this._texW, n = (s + 1) / this._texH,
                        h = (e + t.width - 1) / this._texW, o = (s + t.height - 1) / this._texH), (r = r || new Array(8))[0] = a,
                r[1] = n, r[2] = h, r[3] = n, r[4] = h, r[5] = o, r[6] = a, r[7] = o, r;
        }
        fillWhite() {
            !this._source && this.recreateResource();
            var t = m.instance, e = new Uint8Array(this._texW * this._texH * 4);
            e.fill(255), t.texSubImage2D(t.TEXTURE_2D, 0, 0, 0, this._texW, this._texH, t.RGBA, t.UNSIGNED_BYTE, e);
        }
        discard() {
            i.stage.setGlobalRepaint(), this.destroy();
        }
        static getTextTexture(t, e) {
            return new Kt(t, e);
        }
        destroy() {
            this.__destroyed = !0;
            var t = m.instance;
            this._source && t.deleteTexture(this._source), this._source = null;
        }
        static clean() {
            var t = xt.loopStTm;
            if (0 === Kt.cleanTm && (Kt.cleanTm = t), t - Kt.cleanTm >= Kt.gTextRender.checkCleanTextureDt) {
                for (var e = 0; e < Kt.poolLen; e++) {
                    var i = Kt.pool[e];
                    t - i._discardTm >= Kt.gTextRender.destroyUnusedTextureDt && (i.destroy(), Kt.pool[e] = Kt.pool[Kt.poolLen - 1],
                        Kt.poolLen--, e--);
                }
                Kt.cleanTm = t;
            }
        }
        touchRect(t, e) {
            this.lastTouchTm != e && (this.curUsedCovRate = 0, this.curUsedCovRateAtlas = 0,
                this.lastTouchTm = e);
            var s = Kt.gTextRender.atlasWidth * Kt.gTextRender.atlasWidth, r = i.TextAtlas.atlasGridW * i.TextAtlas.atlasGridW;
            this.curUsedCovRate += t.bmpWidth * t.bmpHeight / s, this.curUsedCovRateAtlas += Math.ceil(t.bmpWidth / i.TextAtlas.atlasGridW) * Math.ceil(t.bmpHeight / i.TextAtlas.atlasGridW) / (s / r);
        }
        get texture() {
            return this;
        }
        _getSource() {
            return this._source;
        }
        drawOnScreen(t, e) { }
    }
    Kt.gTextRender = null, Kt.pool = new Array(10), Kt.poolLen = 0, Kt.cleanTm = 0;
    class jt {
        constructor() {
            this.texWidth = 1024, this.texHeight = 1024, this.texture = null, this.charMaps = {},
                this.texHeight = this.texWidth = i.TextRender.atlasWidth, this.texture = Kt.getTextTexture(this.texWidth, this.texHeight),
                this.texWidth / jt.atlasGridW > 256 && (jt.atlasGridW = Math.ceil(this.texWidth / 256)),
                this.atlasgrid = new zt(this.texWidth / jt.atlasGridW, this.texHeight / jt.atlasGridW, this.texture.id);
        }
        setProtecteDist(t) { }
        getAEmpty(t, e, i) {
            var s = this.atlasgrid.addRect(1, Math.ceil(t / jt.atlasGridW), Math.ceil(e / jt.atlasGridW), i);
            return s && (i.x *= jt.atlasGridW, i.y *= jt.atlasGridW), s;
        }
        get usedRate() {
            return this.atlasgrid._used;
        }
        destroy() {
            for (var t in this.charMaps) {
                this.charMaps[t].deleted = !0;
            }
            this.texture.discard();
        }
        printDebugInfo() { }
    }
    jt.atlasGridW = 16;
    class qt {
        setTo(t, e, i) {
            return this.type = t, this.currentTarget = e, this.target = i, this;
        }
        stopPropagation() {
            this._stoped = !0;
        }
        get touches() {
            if (!this.nativeEvent) return null;
            var t = this.nativeEvent.touches;
            if (t) for (var e = i.stage, s = 0, r = t.length; s < r; s++) {
                var a = t[s], n = f.TEMP;
                n.setTo(a.clientX, a.clientY), e._canvasTransform.invertTransformPoint(n), e.transform.invertTransformPoint(n),
                    a.stageX = n.x, a.stageY = n.y;
            }
            return t;
        }
        get altKey() {
            return this.nativeEvent.altKey;
        }
        get ctrlKey() {
            return this.nativeEvent.ctrlKey;
        }
        get shiftKey() {
            return this.nativeEvent.shiftKey;
        }
        get charCode() {
            return this.nativeEvent.charCode;
        }
        get keyLocation() {
            return this.nativeEvent.location || this.nativeEvent.keyLocation;
        }
        get stageX() {
            return i.stage.mouseX;
        }
        get stageY() {
            return i.stage.mouseY;
        }
    }
    qt.EMPTY = new qt(), qt.MOUSE_DOWN = "mousedown", qt.MOUSE_UP = "mouseup", qt.CLICK = "click",
        qt.RIGHT_MOUSE_DOWN = "rightmousedown", qt.RIGHT_MOUSE_UP = "rightmouseup", qt.RIGHT_CLICK = "rightclick",
        qt.MOUSE_MOVE = "mousemove", qt.MOUSE_OVER = "mouseover", qt.MOUSE_OUT = "mouseout",
        qt.MOUSE_WHEEL = "mousewheel", qt.ROLL_OVER = "mouseover", qt.ROLL_OUT = "mouseout",
        qt.DOUBLE_CLICK = "doubleclick", qt.CHANGE = "change", qt.CHANGED = "changed", qt.RESIZE = "resize",
        qt.ADDED = "added", qt.REMOVED = "removed", qt.DISPLAY = "display", qt.UNDISPLAY = "undisplay",
        qt.ERROR = "error", qt.COMPLETE = "complete", qt.LOADED = "loaded", qt.READY = "ready",
        qt.PROGRESS = "progress", qt.INPUT = "input", qt.RENDER = "render", qt.OPEN = "open",
        qt.MESSAGE = "message", qt.CLOSE = "close", qt.KEY_DOWN = "keydown", qt.KEY_PRESS = "keypress",
        qt.KEY_UP = "keyup", qt.FRAME = "enterframe", qt.DRAG_START = "dragstart", qt.DRAG_MOVE = "dragmove",
        qt.DRAG_END = "dragend", qt.ENTER = "enter", qt.SELECT = "select", qt.BLUR = "blur",
        qt.FOCUS = "focus", qt.VISIBILITY_CHANGE = "visibilitychange", qt.FOCUS_CHANGE = "focuschange",
        qt.PLAYED = "played", qt.PAUSED = "paused", qt.STOPPED = "stopped", qt.START = "start",
        qt.END = "end", qt.COMPONENT_ADDED = "componentadded", qt.COMPONENT_REMOVED = "componentremoved",
        qt.RELEASED = "released", qt.LINK = "link", qt.LABEL = "label", qt.FULL_SCREEN_CHANGE = "fullscreenchange",
        qt.DEVICE_LOST = "devicelost", qt.TRANSFORM_CHANGED = "transformchanged", qt.ANIMATION_CHANGED = "animationchanged",
        qt.TRAIL_FILTER_CHANGE = "trailfilterchange", qt.TRIGGER_ENTER = "triggerenter",
        qt.TRIGGER_STAY = "triggerstay", qt.TRIGGER_EXIT = "triggerexit";
    class Qt extends x {
        constructor(t = null, e = null, i = 0, s = 0) {
            super(), this.uvrect = [0, 0, 1, 1], this._destroyed = !1, this._referenceCount = 0,
                this.$_GID = 0, this.offsetX = 0, this.offsetY = 0, this._w = 0, this._h = 0, this.sourceWidth = 0,
                this.sourceHeight = 0, this.url = null, this.scaleRate = 1, this.setTo(t, e, i, s);
        }
        static moveUV(t, e, i) {
            for (var s = 0; s < 8; s += 2) i[s] += t, i[s + 1] += e;
            return i;
        }
        static create(t, e, i, s, r, a = 0, n = 0, h = 0, o = 0) {
            return Qt._create(t, e, i, s, r, a, n, h, o);
        }
        static _create(t, e, i, s, r, a = 0, n = 0, h = 0, o = 0, l = null) {
            var _, u = t instanceof Qt, c = u ? t.uv : Qt.DEF_UV, d = u ? t.bitmap : t;
            d.width && e + s > d.width && (s = d.width - e), d.height && i + r > d.height && (r = d.height - i),
                l ? (_ = l).setTo(d, null, h || s, o || r) : _ = new Qt(d, null, h || s, o || r),
                _.width = s, _.height = r, _.offsetX = a, _.offsetY = n;
            var p = 1 / d.width, f = 1 / d.height;
            e *= p, i *= f, s *= p, r *= f;
            var g = _.uv[0], m = _.uv[1], v = _.uv[4], T = _.uv[5], x = v - g, y = T - m, E = Qt.moveUV(c[0], c[1], [e, i, e + s, i, e + s, i + r, e, i + r]);
            _.uv = new Float32Array([g + E[0] * x, m + E[1] * y, v - (1 - E[2]) * x, m + E[3] * y, v - (1 - E[4]) * x, T - (1 - E[5]) * y, g + E[6] * x, T - (1 - E[7]) * y]);
            var b = d.scaleRate;
            return b && 1 != b ? (_.sourceWidth /= b, _.sourceHeight /= b, _.width /= b, _.height /= b,
                _.scaleRate = b) : _.scaleRate = 1, _;
        }
        static createFromTexture(t, e, i, s, r) {
            var a = t.scaleRate;
            1 != a && (e *= a, i *= a, s *= a, r *= a);
            var n = g.TEMP.setTo(e - t.offsetX, i - t.offsetY, s, r), h = n.intersection(Qt._rect1.setTo(0, 0, t.width, t.height), Qt._rect2);
            return h ? Qt.create(t, h.x, h.y, h.width, h.height, h.x - n.x, h.y - n.y, s, r) : null;
        }
        get uv() {
            return this._uv;
        }
        set uv(t) {
            this.uvrect[0] = Math.min(t[0], t[2], t[4], t[6]), this.uvrect[1] = Math.min(t[1], t[3], t[5], t[7]),
                this.uvrect[2] = Math.max(t[0], t[2], t[4], t[6]) - this.uvrect[0], this.uvrect[3] = Math.max(t[1], t[3], t[5], t[7]) - this.uvrect[1],
                this._uv = t;
        }
        get width() {
            return this._w ? this._w : this.bitmap ? this.uv && this.uv !== Qt.DEF_UV ? (this.uv[2] - this.uv[0]) * this.bitmap.width : this.bitmap.width : 0;
        }
        set width(t) {
            this._w = t, this.sourceWidth || (this.sourceWidth = t);
        }
        get height() {
            return this._h ? this._h : this.bitmap ? this.uv && this.uv !== Qt.DEF_UV ? (this.uv[5] - this.uv[1]) * this.bitmap.height : this.bitmap.height : 0;
        }
        set height(t) {
            this._h = t, this.sourceHeight || (this.sourceHeight = t);
        }
        get bitmap() {
            return this._bitmap;
        }
        set bitmap(t) {
            this._bitmap && this._bitmap._removeReference(this._referenceCount), this._bitmap = t,
                t && t._addReference(this._referenceCount);
        }
        get destroyed() {
            return this._destroyed;
        }
        _addReference() {
            this._bitmap && this._bitmap._addReference(), this._referenceCount++;
        }
        _removeReference() {
            this._bitmap && this._bitmap._removeReference(), this._referenceCount--;
        }
        _getSource(t = null) {
            return this._destroyed || !this._bitmap ? null : (this.recoverBitmap(t), this._bitmap.destroyed ? null : this.bitmap._getSource());
        }
        _onLoaded(t, e) {
            if (e) if (e == this); else if (e instanceof Qt) {
                var i = e;
                Qt._create(e, 0, 0, i.width, i.height, 0, 0, i.sourceWidth, i.sourceHeight, this);
            } else this.bitmap = e, this.sourceWidth = this._w = e.width, this.sourceHeight = this._h = e.height; else;
            t && t.run(), this.event(qt.READY, this);
        }
        getIsReady() {
            return !this._destroyed && !!this._bitmap;
        }
        setTo(t = null, e = null, i = 0, s = 0) {
            this.bitmap = t, this.sourceWidth = i, this.sourceHeight = s, t && (this._w = t.width,
                this._h = t.height, this.sourceWidth = this.sourceWidth || t.width, this.sourceHeight = this.sourceHeight || t.height),
                this.uv = e || Qt.DEF_UV;
        }
        load(t, e = null) {
            this._destroyed || i.loader.load(t, T.create(this, this._onLoaded, [e]), null, "htmlimage", 1, !0);
        }
        getTexturePixels(t, e, s, r) {
            var a, n, h, o = this.bitmap, l = this._w, _ = this._h, u = this.sourceWidth, c = this.sourceHeight, d = o.width, p = o.height, f = this.offsetX, g = this.offsetY;
            let m = s, v = r;
            if (t + s > l + f && (m -= t + s - l - f), t + s > u && (s -= t + s - u), e + r > _ + g && (v -= e + r - _ - g),
                e + r > c && (r -= e + r - c), s <= 0 || r <= 0) return null;
            let T = f > t ? f - t : 0, x = g > e ? g - e : 0, y = t > f ? t - f : 0, E = e > g ? e - g : 0;
            m -= T, v -= x;
            var b = 4 * s, w = null;
            try {
                w = o.getPixels();
            } catch (t) { }
            if (w) {
                if (0 == t && 0 == e && s == d && r == p) return w;
                let i = this._uv.slice(), o = Math.round(i[0] * d), l = Math.round(i[1] * p);
                var C = new Uint8Array(s * r * 4);
                for (a = 4 * o + 4 * y + (n = (l + E) * (b = 4 * d)), h = 0; h < v; h++) C.set(w.slice(a, a + 4 * m), 4 * s * (h + x) + 4 * T),
                    a += b;
                return C;
            }
            var A = new i.Context();
            A.size(s, r), A.asBitmap = !0;
            var R = null;
            if (0 != t || 0 != e || s != d || r != p) {
                var M = (R = this._uv.slice())[0], S = R[1], I = (R[2] - M) / l, P = (R[7] - S) / _;
                R = [M + y * I, S + E * P, M + (y + m) * I, S + E * P, M + (y + m) * I, S + (E + v) * P, M + y * I, S + (E + v) * P];
            }
            A._drawTextureM(this, T, x, m, v, null, 1, R), A._targets.start(), A.flush(), A._targets.end(),
                A._targets.restore();
            var L = A._targets.getData(0, 0, s, r);
            for (A.destroy(), C = new Uint8Array(s * r * 4), a = 0, n = (r - 1) * b, h = r - 1; h >= 0; h--) C.set(L.slice(n, n + b), a),
                a += b, n -= b;
            return C;
        }
        getPixels(t, e, i, s) {
            return window.conch ? this._nativeObj.getImageData(t, e, i, s) : this.getTexturePixels(t, e, i, s);
        }
        recoverBitmap(t = null) {
            var e = this._bitmap.url;
            if (!this._destroyed && (!this._bitmap || this._bitmap.destroyed) && e) {
                let s = i.Loader.loadedMap[e];
                s ? (this.bitmap = s, t && t()) : i.loader.load(e, T.create(this, function (e) {
                    this.bitmap = e, t && t();
                }), null, "htmlimage", 1, !0);
            }
        }
        disposeBitmap() {
            !this._destroyed && this._bitmap && this._bitmap.destroy();
        }
        destroy(t = !1) {
            if (!this._destroyed) {
                this._destroyed = !0;
                var e = this._bitmap;
                e && (e._removeReference(this._referenceCount), (0 === e.referenceCount || t) && e.destroy(),
                    e = null), this.url && this === i.loader.getRes(this.url) && i.Loader.clearRes(this.url);
            }
        }
    }
    Qt.DEF_UV = new Float32Array([0, 0, 1, 0, 1, 1, 0, 1]), Qt.NO_UV = new Float32Array([0, 0, 0, 0, 0, 0, 0, 0]),
        Qt.INV_UV = new Float32Array([0, 1, 1, 1, 1, 0, 0, 0]), Qt._rect1 = new g(), Qt._rect2 = new g();
    class Zt {
        constructor(t) {
            this._font = "14px Arial", this._family = "Arial", this._size = 14, this._italic = !1,
                this._bold = !1, this._id = Zt._gfontID++, this.setFont(t || this._font);
        }
        static Parse(t) {
            if (t === Zt._lastFont) return Zt._lastFontInfo;
            var e = Zt._cache[t];
            return e || (e = Zt._cache[t] = new Zt(t)), Zt._lastFont = t, Zt._lastFontInfo = e,
                e;
        }
        setFont(t) {
            this._font = t;
            var e = t.split(" "), i = e.length;
            if (i < 2) 1 == i && e[0].indexOf("px") > 0 && (this._size = parseInt(e[0])); else {
                for (var s = -1, r = 0; r < i; r++) if (e[r].indexOf("px") > 0 || e[r].indexOf("pt") > 0) {
                    s = r, this._size = parseInt(e[r]), this._size <= 0 && (console.error("font parse error:" + t),
                        this._size = 14);
                    break;
                }
                var a = s + 1, n = e[a];
                for (a++; a < i; a++) n += " " + e[a];
                this._family = n.split(",")[0], this._italic = e.indexOf("italic") >= 0, this._bold = e.indexOf("bold") >= 0;
            }
        }
    }
    Zt.EMPTY = new Zt(null), Zt._cache = {}, Zt._gfontID = 0, Zt._lastFont = "";
    class $t {
        constructor() {
            this.save = [], this.toUpperCase = null, this.width = -1, this.pageChars = [], this.startID = 0,
                this.startIDStroke = 0, this.lastGCCnt = 0, this.splitRender = !1, this.scalex = 1,
                this.scaley = 1;
        }
        setText(t) {
            this.changed = !0, this._text = t, this.width = -1, this.cleanCache();
        }
        toString() {
            return this._text;
        }
        get length() {
            return this._text ? this._text.length : 0;
        }
        charCodeAt(t) {
            return this._text ? this._text.charCodeAt(t) : NaN;
        }
        charAt(t) {
            return this._text ? this._text.charAt(t) : null;
        }
        cleanCache() {
            let t = this.pageChars;
            for (var e in t) {
                let s = t[e];
                var i = s.tex;
                1 == s.words.length && i && i.ri && i.destroy();
            }
            this.pageChars = [], this.startID = 0, this.scalex = 1, this.scaley = 1;
        }
    }
    class Jt {
        constructor() {
            this.char = "", this.deleted = !1, this.uv = new Array(8), this.pos = 0, this.orix = 0,
                this.oriy = 0, this.touchTick = 0, this.isSpace = !1;
        }
        touch() {
            var t = xt.loopCount;
            this.touchTick != t && this.tex.touchRect(this, t), this.touchTick = t;
        }
    }
    class te {
        constructor() {
            this.fontsz = 16;
        }
        getWidth(t, e) {
            return 0;
        }
        scale(t, e) { }
        get canvasWidth() {
            return 0;
        }
        set canvasWidth(t) { }
        getCharBmp(t, e, i, s, r, a, n, h, o, l, _ = null) {
            return null;
        }
    }
    class ee {
        static __init__() {
            var t = window.Laya || i.Laya;
            if (ee._window) return ee._window;
            var e = ee._window = window, s = ee._document = e.document, r = ee.userAgent = e.navigator.userAgent, a = e.navigator.maxTouchPoints || 0, n = e.navigator.platform;
            "my" in ee.window && ("tb" in ee.window.my ? (window.tbMiniGame(t, t), t.TBMiniAdapter ? t.TBMiniAdapter.enable() : console.error("请先添加淘宝适配库,详细教程：https://ldc2.layabox.com/doc/?language=zh&nav=zh-ts-5-6-0")) : r.indexOf("AlipayMiniGame") > -1 && (window.aliPayMiniGame(t, t),
                t.ALIMiniAdapter ? t.ALIMiniAdapter.enable() : console.error("请先添加阿里小游戏适配库,详细教程：https://ldc2.layabox.com/doc/?language=zh&nav=zh-ts-5-6-0"))),
                -1 == r.indexOf("OPPO") && r.indexOf("MiniGame") > -1 && "wx" in ee.window && ("tt" in ee.window ? (window.ttMiniGame(t, t),
                    t.TTMiniAdapter ? t.TTMiniAdapter.enable() : console.error("请引入字节跳动小游戏的适配库")) : "bl" in ee.window ? (window.biliMiniGame(t, t),
                        t.BLMiniAdapter ? t.BLMiniAdapter.enable() : console.error("请引入bilibili小游戏的适配库,详细教程：https://ldc2.layabox.com/doc/?language=zh&nav=zh-ts-5-7-0")) : "qq" in ee.window ? (window.qqMiniGame(t, t),
                            t.QQMiniAdapter ? t.QQMiniAdapter.enable() : console.error("请引入手机QQ小游戏的适配库,详细教程：https://ldc2.layabox.com/doc/?language=zh&nav=zh-ts-5-0-0")) : (window.wxMiniGame(t, t),
                                t.MiniAdpter ? t.MiniAdpter.enable() : console.error("请先添加小游戏适配库,详细教程：https://ldc2.layabox.com/doc/?nav=zh-ts-5-0-0"))),
                "hbs" in ee.window && (window.hwMiniGame(t, t), t.HWMiniAdapter ? t.HWMiniAdapter.enable() : console.error("请先添加小游戏适配库!")),
                r.indexOf("SwanGame") > -1 && (window.bdMiniGame(t, t), t.BMiniAdapter ? t.BMiniAdapter.enable() : console.error("请先添加百度小游戏适配库,详细教程：https://ldc2.layabox.com/doc/?language=zh&nav=zh-ts-5-1-0")),
                r.indexOf("QuickGame") > -1 && (window.miMiniGame(t, t), t.KGMiniAdapter ? t.KGMiniAdapter.enable() : console.error("请先添加小米小游戏适配库,详细教程：https://ldc2.layabox.com/doc/?language=zh&nav=zh-ts-5-2-0")),
                r.indexOf("OPPO") > -1 && r.indexOf("MiniGame") > -1 && (window.qgMiniGame(t, t),
                    t.QGMiniAdapter ? t.QGMiniAdapter.enable() : console.error("请先添加OPPO小游戏适配库,详细教程：https://ldc2.layabox.com/doc/?language=zh&nav=zh-ts-5-3-0")),
                r.indexOf("VVGame") > -1 && (window.vvMiniGame(t, t), t.VVMiniAdapter ? t.VVMiniAdapter.enable() : console.error("请先添加VIVO小游戏适配库,详细教程：https://ldc2.layabox.com/doc/?language=zh&nav=zh-ts-5-4-0")),
                e.trace = console.log, e.requestAnimationFrame = e.requestAnimationFrame || e.webkitRequestAnimationFrame || e.mozRequestAnimationFrame || e.oRequestAnimationFrame || e.msRequestAnimationFrame || function (t) {
                    return e.setTimeout(t, 1e3 / 60);
                };
            var h = s.body.style;
            h.margin = 0, h.overflow = "hidden", h["-webkit-user-select"] = "none", h["-webkit-tap-highlight-color"] = "rgba(200,200,200,0)";
            for (var o = s.getElementsByTagName("meta"), l = 0, _ = !1, u = "width=device-width,initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no"; l < o.length;) {
                var c = o[l];
                if ("viewport" == c.name) {
                    c.content = u, _ = !0;
                    break;
                }
                l++;
            }
            return _ || ((c = s.createElement("meta")).name = "viewport", c.content = u, s.getElementsByTagName("head")[0].appendChild(c)),
                ee.onMobile = !!window.isConchApp || r.indexOf("Mobile") > -1, ee.onIOS = !!r.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),
                ee.onIPhone = r.indexOf("iPhone") > -1, ee.onMac = r.indexOf("Mac OS X") > -1, ee.onIPad = r.indexOf("iPad") > -1 || "MacIntel" === n && a > 1,
                ee.onAndroid = r.indexOf("Android") > -1 || r.indexOf("Adr") > -1, ee.onWP = r.indexOf("Windows Phone") > -1,
                ee.onQQBrowser = r.indexOf("QQBrowser") > -1, ee.onMQQBrowser = r.indexOf("MQQBrowser") > -1 || r.indexOf("Mobile") > -1 && r.indexOf("QQ") > -1,
                ee.onIE = !!e.ActiveXObject || "ActiveXObject" in e, ee.onWeiXin = r.indexOf("MicroMessenger") > -1,
                ee.onSafari = r.indexOf("Safari") > -1, ee.onPC = !ee.onMobile, ee.onMiniGame = r.indexOf("MiniGame") > -1,
                ee.onBDMiniGame = r.indexOf("SwanGame") > -1, ee.onLayaRuntime = !!ee.window.conch,
                r.indexOf("OPPO") > -1 && r.indexOf("MiniGame") > -1 ? (ee.onQGMiniGame = !0, ee.onMiniGame = !1) : "qq" in ee.window && r.indexOf("MiniGame") > -1 ? (ee.onQQMiniGame = !0,
                    ee.onMiniGame = !1) : "bl" in ee.window && r.indexOf("MiniGame") > -1 ? (ee.onBLMiniGame = !0,
                        ee.onMiniGame = !1) : "tt" in ee.window && r.indexOf("MiniGame") > -1 && (ee.onTTMiniGame = !0,
                            ee.onMiniGame = !1), ee.onHWMiniGame = "hbs" in ee.window, ee.onVVMiniGame = r.indexOf("VVGame") > -1,
                ee.onKGMiniGame = r.indexOf("QuickGame") > -1, r.indexOf("AlipayMiniGame") > -1 && (ee.onAlipayMiniGame = !0,
                    ee.onMiniGame = !1), (r.indexOf("TB/") > -1 || r.indexOf("Taobao/") > -1 || r.indexOf("TM/") > -1) && (ee.onTBMiniGame = !0),
                e;
        }
        static createElement(t) {
            return ee.__init__(), ee._document.createElement(t);
        }
        static getElementById(t) {
            return ee.__init__(), ee._document.getElementById(t);
        }
        static removeElement(t) {
            t && t.parentNode && t.parentNode.removeChild(t);
        }
        static now() {
            return Date.now();
        }
        static get clientWidth() {
            return ee.__init__(), ee._window.innerWidth || ee._document.body.clientWidth;
        }
        static get clientHeight() {
            return ee.__init__(), ee._window.innerHeight || ee._document.body.clientHeight || ee._document.documentElement.clientHeight;
        }
        static get width() {
            return ee.__init__(), (i.stage && i.stage.canvasRotation ? ee.clientHeight : ee.clientWidth) * ee.pixelRatio;
        }
        static get height() {
            return ee.__init__(), (i.stage && i.stage.canvasRotation ? ee.clientWidth : ee.clientHeight) * ee.pixelRatio;
        }
        static get pixelRatio() {
            return ee._pixelRatio < 0 && (ee.__init__(), ee.userAgent.indexOf("Mozilla/6.0(Linux; Android 6.0; HUAWEI NXT-AL10 Build/HUAWEINXT-AL10)") > -1 ? ee._pixelRatio = 2 : (ee._pixelRatio = ee._window.devicePixelRatio || 1,
                ee._pixelRatio < 1 && (ee._pixelRatio = 1))), ee._pixelRatio;
        }
        static get container() {
            return ee._container || (ee.__init__(), ee._container = ee.createElement("div"),
                ee._container.id = "layaContainer", ee._document.body.appendChild(ee._container)),
                ee._container;
        }
        static set container(t) {
            ee._container = t;
        }
        static get window() {
            return ee._window || ee.__init__();
        }
        static get document() {
            return ee.__init__(), ee._document;
        }
    }
    ee._pixelRatio = -1, ee.mainCanvas = null, ee.hanzi = new RegExp("^[一-龥]$"), ee.fontMap = [],
        ee.measureText = function (t, e) {
            var i = ee.hanzi.test(t);
            if (i && ee.fontMap[e]) return ee.fontMap[e];
            var s = ee.context;
            s.font = e;
            var r = s.measureText(t);
            return i && (ee.fontMap[e] = r), r;
        };
    class ie extends te {
        constructor(t, e, i = !0, s = !0, r = !1) {
            super(), this.ctx = null, this.lastScaleX = 1, this.lastScaleY = 1, this.maxTexW = 0,
                this.maxTexH = 0, this.scaleFontSize = !0, this.showDbgInfo = !1, this.supportImageData = !0,
                this.maxTexW = t, this.maxTexH = e, this.scaleFontSize = i, this.supportImageData = s,
                this.showDbgInfo = r, ie.canvas || (ie.canvas = ee.createElement("canvas"), ie.canvas.width = 1024,
                    ie.canvas.height = 512, ie.canvas.style.left = "-10000px", ie.canvas.style.position = "absolute",
                    document.body.appendChild(ie.canvas), this.ctx = ie.canvas.getContext("2d"));
        }
        get canvasWidth() {
            return ie.canvas.width;
        }
        set canvasWidth(t) {
            ie.canvas.width != t && (ie.canvas.width = t, t > 2048 && console.warn("画文字设置的宽度太大，超过2048了"),
                this.ctx.setTransform(1, 0, 0, 1, 0, 0), this.ctx.scale(this.lastScaleX, this.lastScaleY));
        }
        getWidth(t, e) {
            return this.ctx ? (this.ctx._lastFont != t && (this.ctx.font = t, this.ctx._lastFont = t),
                this.ctx.measureText(e).width) : 0;
        }
        scale(t, e) {
            if (!this.supportImageData) return this.lastScaleX = t, void (this.lastScaleY = e);
            this.lastScaleX == t && this.lastScaleY == e || (this.ctx.setTransform(t, 0, 0, e, 0, 0),
                this.lastScaleX = t, this.lastScaleY = e);
        }
        getCharBmp(t, e, i, s, r, a, n, h, o, l, _ = null) {
            if (!this.supportImageData) return this.getCharCanvas(t, e, i, s, r, a, n, h, o, l);
            var u = this.ctx, c = this.fontsz;
            u.font != e && (u.font = e, u._lastFont = e), a.width = u.measureText(t).width;
            var d = a.width * this.lastScaleX, p = a.height * this.lastScaleY;
            d += (n + o) * this.lastScaleX, p += (h + l) * this.lastScaleY, d = Math.ceil(d),
                p = Math.ceil(p);
            var f = (d = Math.min(d, ie.canvas.width)) + 2 * i + 1, g = (p = Math.min(p, ie.canvas.height)) + 2 * i + 1;
            _ && (f = Math.max(f, _[0] + _[2] + 1), g = Math.max(g, _[1] + _[3] + 1)), u.clearRect(0, 0, f / this.lastScaleX + 1, g / this.lastScaleY + 1),
                u.save(), u.textBaseline = "middle", i > 0 && (u.strokeStyle = r, u.lineWidth = i,
                    u.strokeText(t, n, h + c / 2)), s && (u.fillStyle = s, u.fillText(t, n, h + c / 2)),
                this.showDbgInfo && (u.strokeStyle = "#ff0000", u.strokeRect(1, 1, d - 2, p - 2),
                    u.strokeStyle = "#00ff00", u.strokeRect(n, h, a.width, a.height)), _ && (-1 == _[2] && (_[2] = Math.ceil((a.width + 2 * i) * this.lastScaleX)),
                        _[2] <= 0 && (_[2] = 1));
            var m = _ ? u.getImageData(_[0], _[1], _[2], _[3] + 1) : u.getImageData(0, 0, d, p + 1);
            return u.restore(), a.bmpWidth = m.width, a.bmpHeight = m.height, m;
        }
        getCharCanvas(t, e, i, s, r, a, n, h, o, l) {
            var _ = this.ctx;
            _.font != e && (_.font = e, _._lastFont = e), a.width = _.measureText(t).width;
            var u = a.width * this.lastScaleX, c = a.height * this.lastScaleY;
            u += (n + o) * this.lastScaleX, c += (h + l) * this.lastScaleY + 1, u = Math.min(u, this.maxTexW),
                c = Math.min(c, this.maxTexH), ie.canvas.width = Math.min(u + 1, this.maxTexW),
                ie.canvas.height = Math.min(c + 1, this.maxTexH), _.font = e, _.clearRect(0, 0, u + 1 + i, c + 1 + i),
                _.setTransform(1, 0, 0, 1, 0, 0), _.save(), this.scaleFontSize && _.scale(this.lastScaleX, this.lastScaleY),
                _.translate(n, h), _.textAlign = "left";
            var d = this.fontsz;
            return _.textBaseline = "middle", i > 0 ? (_.strokeStyle = r, _.fillStyle = s, _.lineWidth = i,
                _.fillAndStrokeText ? _.fillAndStrokeText(t, 0, d / 2) : (_.strokeText(t, 0, d / 2),
                    _.fillText(t, 0, d / 2))) : s && (_.fillStyle = s, _.fillText(t, 0, d / 2)), this.showDbgInfo && (_.strokeStyle = "#ff0000",
                        _.strokeRect(0, 0, u, c), _.strokeStyle = "#00ff00", _.strokeRect(0, 0, a.width, a.height)),
                _.restore(), a.bmpWidth = ie.canvas.width, a.bmpHeight = ie.canvas.height, ie.canvas;
        }
    }
    ie.canvas = null;
    class se extends te {
        constructor() {
            super(), this.lastFont = "", this.lastScaleX = 1, this.lastScaleY = 1;
        }
        getWidth(t, e) {
            return window.conchTextCanvas ? (window.conchTextCanvas.font = t, this.lastFont = t,
                window.conchTextCanvas.measureText(e).width) : 0;
        }
        scale(t, e) {
            this.lastScaleX = t, this.lastScaleY = e;
        }
        getCharBmp(t, e, i, s, r, a, n, h, o, l, _ = null) {
            if (!window.conchTextCanvas) return null;
            window.conchTextCanvas.font = e, this.lastFont = e;
            a.width = window.conchTextCanvas.measureText(t).width, a.height;
            window.conchTextCanvas.scale && window.conchTextCanvas.scale(this.lastScaleX, this.lastScaleY);
            var u = Z.create(r).numColor, c = Z.create(s).numColor, d = window.conchTextCanvas.getTextBitmapData(t, c, i > 2 ? 2 : i, u);
            return a.bmpWidth = d.width, a.bmpHeight = d.height, d;
        }
    }
    class re {
        constructor() {
            this.fontSizeInfo = {}, this.mapFont = {}, this.fontID = 0, this.mapColor = [],
                this.colorID = 0, this.fontScaleX = 1, this.fontScaleY = 1, this._curStrPos = 0,
                this.textAtlases = [], this.isoTextures = [], this.lastFont = null, this.fontSizeW = 0,
                this.fontSizeH = 0, this.fontSizeOffX = 0, this.fontSizeOffY = 0, this.renderPerChar = !0,
                this.tmpAtlasPos = new f(), this.textureMem = 0, i.TextAtlas = jt;
            var t = !1, e = i.Laya.MiniAdpter;
            e && e.systemInfo && e.systemInfo.system && (t = "ios 10.1.1" === e.systemInfo.system.toLowerCase()),
                (i.Browser.onMiniGame || i.Browser.onTTMiniGame || i.Browser.onBLMiniGame || i.Browser.onAlipayMiniGame || i.Browser.onTBMiniGame) && !t && (re.isWan1Wan = !0),
                this.charRender = i.Render.isConchApp ? new se() : new ie(2048, 2048, re.scaleFontWithCtx, !re.isWan1Wan, !1),
                re.textRenderInst = this, i.Laya.textRender = this, re.atlasWidth2 = re.atlasWidth * re.atlasWidth;
        }
        setFont(t) {
            if (this.lastFont != t) {
                this.lastFont = t;
                var e = this.getFontSizeInfo(t._family), i = e >> 24, s = e >> 16 & 255, r = e >> 8 & 255, a = 255 & e, n = t._size / re.standardFontSize;
                this.fontSizeOffX = Math.ceil(i * n), this.fontSizeOffY = Math.ceil(s * n), this.fontSizeW = Math.ceil(r * n),
                    this.fontSizeH = Math.ceil(a * n), t._font.indexOf("italic") >= 0 ? this.fontStr = t._font.replace("italic", "") : this.fontStr = t._font;
            }
        }
        getNextChar(t) {
            var e = t.length, i = this._curStrPos;
            if (!t.substring) return null;
            if (i >= e) return null;
            for (var s = i, r = 0; s < e; s++) {
                var a = t.charCodeAt(s);
                if (a >>> 11 == 27) {
                    if (1 == r) break;
                    r = 1, s++;
                } else if (65038 === a || 65039 === a); else if (8205 == a) r = 2; else if (0 == r) r = 1; else if (1 == r) break;
            }
            return this._curStrPos = s, t.substring(i, s);
        }
        filltext(t, e, s, r, a, n, h, o, l, _ = 0) {
            if (!(e.length <= 0)) {
                var u = Zt.Parse(a), c = 0;
                switch (l) {
                    case "center":
                        c = i.Context.ENUM_TEXTALIGN_CENTER;
                        break;

                    case "right":
                        c = i.Context.ENUM_TEXTALIGN_RIGHT;
                }
                this._fast_filltext(t, e, null, s, r, u, n, h, o, c, _);
            }
        }
        fillWords(t, e, i, s, r, a, n, h) {
            if (e && !(e.length <= 0)) {
                var o = "string" == typeof r ? Zt.Parse(r) : r;
                this._fast_filltext(t, null, e, i, s, o, a, n, h, 0, 0);
            }
        }
        _fast_filltext(t, e, s, r, a, n, h, o, l, _, u = 0) {
            if ((!e || e.length >= 1) && !(s && s.length < 1)) {
                if (l < 0 && (l = 0), this.setFont(n), this.fontScaleX = this.fontScaleY = 1, re.scaleFontWithCtx) {
                    var c = 1, d = 1;
                    if (i.Render.isConchApp && !window.conchTextCanvas.scale || (c = t.getMatScaleX(),
                        d = t.getMatScaleY()), c < 1e-4 || d < .1) return;
                    c > 1 && (this.fontScaleX = c), d > 1 && (this.fontScaleY = d);
                }
                n._italic && (t._italicDeg = 13);
                var p = e, f = !s && e instanceof $t, g = e && e.toString(), m = !!s, v = f ? p.pageChars : [], T = 0;
                switch (f ? (g = p._text, (T = p.width) < 0 && (T = p.width = this.charRender.getWidth(this.fontStr, g))) : T = g ? this.charRender.getWidth(this.fontStr, g) : 0,
                _) {
                    case i.Context.ENUM_TEXTALIGN_CENTER:
                        r -= T / 2;
                        break;

                    case i.Context.ENUM_TEXTALIGN_RIGHT:
                        r -= T;
                }
                p && v && this.hasFreedText(v) && (v = p.pageChars = []);
                var x = null, y = this.renderPerChar = !f || re.forceSplitRender || m || f && p.splitRender;
                if (!v || v.length < 1) if (f && (p.scalex = this.fontScaleX, p.scaley = this.fontScaleY),
                    y) {
                    var E, b = 0, w = 0;
                    for (this._curStrPos = 0; ;) {
                        if (s) {
                            var C = s[this._curStrPos++];
                            C ? (E = C.char, b = C.x, w = C.y) : E = null;
                        } else E = this.getNextChar(g);
                        if (!E) break;
                        if (!(x = this.getCharRenderInfo(E, n, h, o, l, !1))) break;
                        if (x.isSpace); else {
                            var A = v[x.tex.id];
                            if (A) A = A.words; else {
                                var R = {
                                    texgen: x.tex.genID,
                                    tex: x.tex,
                                    words: []
                                };
                                v[x.tex.id] = R, A = R.words;
                            }
                            A.push({
                                ri: x,
                                x: b,
                                y: w,
                                w: x.bmpWidth / this.fontScaleX,
                                h: x.bmpHeight / this.fontScaleY
                            }), b += x.width;
                        }
                    }
                } else {
                    var M = i.Render.isConchApp ? 0 : n._size / 3 | 0, S = re.noAtlas || (T + M + M) * this.fontScaleX > re.atlasWidth;
                    x = this.getCharRenderInfo(g, n, h, o, l, S), v[0] = {
                        texgen: x.tex.genID,
                        tex: x.tex,
                        words: [{
                            ri: x,
                            x: 0,
                            y: 0,
                            w: x.bmpWidth / this.fontScaleX,
                            h: x.bmpHeight / this.fontScaleY
                        }]
                    };
                }
                this._drawResortedWords(t, r, a, v), t._italicDeg = 0;
            }
        }
        _drawResortedWords(t, e, s, r) {
            var a = !!t._charSubmitCache && t._charSubmitCache._enable, n = t._curMat;
            r.length;
            for (var h in r) {
                var o = r[h];
                if (o) {
                    var l = o.words, _ = l.length;
                    if (!(_ <= 0)) for (var u = r[h].tex, c = 0; c < _; c++) {
                        var d = l[c], p = d.ri;
                        if (!p.isSpace) {
                            if (p.touch(), t.drawTexAlign = !0, i.Render.isConchApp) t._drawTextureM(u.texture, e + d.x - p.orix, s + d.y - p.oriy, d.w, d.h, null, 1, p.uv); else {
                                let i = u;
                                t._inner_drawTexture(i.texture, i.id, e + d.x - p.orix, s + d.y - p.oriy, d.w, d.h, n, p.uv, 1, a);
                            }
                            t.touches && t.touches.push(p);
                        }
                    }
                }
            }
        }
        hasFreedText(t) {
            for (let s in t) {
                var e = t[s];
                if (e) {
                    var i = e.tex;
                    if (i.__destroyed || i.genID != e.texgen) return !0;
                }
            }
            return !1;
        }
        getCharRenderInfo(t, e, s, r, a, n = !1) {
            var h = this.mapFont[e._family];
            null == h && (this.mapFont[e._family] = h = this.fontID++);
            var o = t + "_" + h + "_" + e._size + "_" + s;
            a > 0 && (o += "_" + r + a), e._bold && (o += "P"), 1 == this.fontScaleX && 1 == this.fontScaleY || (o += (20 * this.fontScaleX | 0) + "_" + (20 * this.fontScaleY | 0));
            var l, _, u = 0, c = this.textAtlases.length;
            if (!n) for (u = 0; u < c; u++) if (l = (_ = this.textAtlases[u]).charMaps[o]) return l.touch(),
                l;
            l = new Jt(), this.charRender.scale(this.fontScaleX, this.fontScaleY), l.char = t,
                l.height = e._size;
            var d = i.Render.isConchApp ? 0 : e._size / 3 | 0, p = null;
            a || (a = 0);
            var f = Math.ceil((this.charRender.getWidth(this.fontStr, t) + 2 * a) * this.fontScaleX);
            if (f > this.charRender.canvasWidth && (this.charRender.canvasWidth = Math.min(2048, f + 2 * d)),
                n) {
                if (this.charRender.fontsz = e._size, p = this.charRender.getCharBmp(t, this.fontStr, a, s, r, l, d, d, d, d, null)) {
                    var g = Kt.getTextTexture(p.width, p.height);
                    g.addChar(p, 0, 0, l.uv), l.tex = g, l.orix = d, l.oriy = d, g.ri = l, this.isoTextures.push(g);
                }
            } else {
                var m = t.length, v = 1 * a, T = Math.ceil((this.fontSizeW + 2 * v) * this.fontScaleX), x = Math.ceil((this.fontSizeH + 2 * v) * this.fontScaleY);
                re.imgdtRect[0] = (d - this.fontSizeOffX - v) * this.fontScaleX | 0, re.imgdtRect[1] = (d - this.fontSizeOffY - v) * this.fontScaleY | 0,
                    this.renderPerChar || 1 == m ? (re.imgdtRect[2] = Math.max(f, T), re.imgdtRect[3] = Math.max(f, x)) : (re.imgdtRect[2] = -1,
                        re.imgdtRect[3] = x), this.charRender.fontsz = e._size, (p = this.charRender.getCharBmp(t, this.fontStr, a, s, r, l, d, d, d, d, re.imgdtRect)) && (_ = this.addBmpData(p, l),
                            re.isWan1Wan ? (l.orix = d, l.oriy = d) : (l.orix = this.fontSizeOffX + v, l.oriy = this.fontSizeOffY + v),
                            _.charMaps[o] = l);
            }
            return l;
        }
        addBmpData(t, e) {
            for (var i, s = t.width, r = t.height, a = this.textAtlases.length, n = !1, h = 0; h < a && !(n = (i = this.textAtlases[h]).getAEmpty(s, r, this.tmpAtlasPos)); h++);
            if (!n) {
                if (i = new jt(), this.textAtlases.push(i), !(n = i.getAEmpty(s, r, this.tmpAtlasPos))) throw "err1";
                this.cleanAtlases();
            }
            return n && (i.texture.addChar(t, this.tmpAtlasPos.x, this.tmpAtlasPos.y, e.uv),
                e.tex = i.texture), i;
        }
        GC() {
            for (var t = 0, e = this.textAtlases.length, i = re.destroyAtlasDt, s = 0, r = xt.loopCount, a = -1, n = 0, h = null, o = null; t < e; t++) {
                if (h = (o = this.textAtlases[t]).texture) {
                    h.curUsedCovRate, s += h.curUsedCovRateAtlas;
                    var l = o.usedRate - h.curUsedCovRateAtlas;
                    n < l && (n = l, a = t);
                }
                r - o.texture.lastTouchTm > i && (re.showLog && console.log(o.texture.id), o.destroy(),
                    this.textAtlases[t] = this.textAtlases[e - 1], e--, t--, a = -1);
            }
            for (this.textAtlases.length = e, e = this.isoTextures.length, t = 0; t < e; t++) r - (h = this.isoTextures[t]).lastTouchTm > re.destroyUnusedTextureDt && (h.ri.deleted = !0,
                h.ri.tex = null, h.destroy(), this.isoTextures[t] = this.isoTextures[e - 1], e--,
                t--);
            this.isoTextures.length = e;
            var _ = this.textAtlases.length > 1 && this.textAtlases.length - s >= 2;
            (re.atlasWidth * re.atlasWidth * 4 * this.textAtlases.length > re.cleanMem || _ || re.simClean) && (re.simClean = !1,
                re.showLog && console.log("清理使用率低的贴图。总使用率:", s, ":", this.textAtlases.length, "最差贴图:" + a),
                a >= 0 && ((o = this.textAtlases[a]).destroy(), this.textAtlases[a] = this.textAtlases[this.textAtlases.length - 1],
                    this.textAtlases.length = this.textAtlases.length - 1)), Kt.clean();
        }
        cleanAtlases() { }
        getCharBmp(t) { }
        checkBmpLine(t, e, i, s) {
            this.bmpData32.buffer != t.data.buffer && (this.bmpData32 = new Uint32Array(t.data.buffer));
            for (var r = t.width * e + i, a = i; a < s; a++) if (0 != this.bmpData32[r++]) return !0;
            return !1;
        }
        updateBbx(t, e, i = !1) {
            var s = t.width, r = t.height, a = 0, n = e[1], h = 0, o = n;
            if (this.checkBmpLine(t, n, 0, s)) for (; ;) {
                if ((o = (n + h) / 2 | 0) + 1 >= n) {
                    e[1] = o;
                    break;
                }
                this.checkBmpLine(t, o, 0, s) ? n = o : h = o;
            }
            if (e[3] > r) e[3] = r; else if (o = n = e[3], h = r, this.checkBmpLine(t, n, 0, s)) for (; ;) {
                if ((o = (n + h) / 2 | 0) - 1 <= n) {
                    e[3] = o;
                    break;
                }
                this.checkBmpLine(t, o, 0, s) ? n = o : h = o;
            }
            if (!i) {
                var l = e[0], _ = s * e[1];
                for (o = e[1]; o < e[3]; o++) {
                    for (a = 0; a < l; a++) if (0 != this.bmpData32[_ + a]) {
                        l = a;
                        break;
                    }
                    _ += s;
                }
                e[0] = l;
                var u = e[2];
                for (_ = s * e[1], o = e[1]; o < e[3]; o++) {
                    for (a = u; a < s; a++) if (0 != this.bmpData32[_ + a]) {
                        u = a;
                        break;
                    }
                    _ += s;
                }
                e[2] = u;
            }
        }
        getFontSizeInfo(t) {
            var e = this.fontSizeInfo[t];
            if (null != e) return e;
            var s = "bold " + re.standardFontSize + "px " + t;
            if (re.isWan1Wan) {
                this.fontSizeW = 1.5 * this.charRender.getWidth(s, "有"), this.fontSizeH = 1.5 * re.standardFontSize;
                var r = this.fontSizeW << 8 | this.fontSizeH;
                return this.fontSizeInfo[t] = r, r;
            }
            re.pixelBBX[0] = re.standardFontSize / 2, re.pixelBBX[1] = re.standardFontSize / 2,
                re.pixelBBX[2] = re.standardFontSize, re.pixelBBX[3] = re.standardFontSize;
            var a = 16, n = 16;
            this.charRender.scale(1, 1), re.tmpRI.height = re.standardFontSize, this.charRender.fontsz = re.standardFontSize;
            var h = this.charRender.getCharBmp("g", s, 0, "red", null, re.tmpRI, a, n, 16, 16);
            i.Render.isConchApp && (h.data = new Uint8ClampedArray(h.data)), this.bmpData32 = new Uint32Array(h.data.buffer),
                this.updateBbx(h, re.pixelBBX, !1), h = this.charRender.getCharBmp("有", s, 0, "red", null, re.tmpRI, n, n, 16, 16),
                i.Render.isConchApp && (h.data = new Uint8ClampedArray(h.data)), this.bmpData32 = new Uint32Array(h.data.buffer),
                re.pixelBBX[2] < a + re.tmpRI.width && (re.pixelBBX[2] = a + re.tmpRI.width), this.updateBbx(h, re.pixelBBX, !1),
                i.Render.isConchApp && (a = 0, n = 0);
            var o = Math.max(a - re.pixelBBX[0], 0) << 24 | Math.max(n - re.pixelBBX[1], 0) << 16 | re.pixelBBX[2] - re.pixelBBX[0] << 8 | re.pixelBBX[3] - re.pixelBBX[1];
            return this.fontSizeInfo[t] = o, o;
        }
        printDbgInfo() {
            for (var t in console.log("图集个数:" + this.textAtlases.length + ",每个图集大小:" + re.atlasWidth + "x" + re.atlasWidth, " 用canvas:", re.isWan1Wan),
                console.log("图集占用空间:" + re.atlasWidth * re.atlasWidth * 4 / 1024 / 1024 * this.textAtlases.length + "M"),
                console.log("缓存用到的字体:"), this.mapFont) {
                var e = this.getFontSizeInfo(t), i = e >> 24, s = e >> 16 & 255, r = e >> 8 & 255, a = 255 & e;
                console.log("    " + t, " off:", i, s, " size:", r, a);
            }
            var n = 0;
            console.log("缓存数据:");
            var h = 0, o = 0;
            this.textAtlases.forEach(function (t) {
                var e = t.texture.id, i = xt.loopCount - t.texture.lastTouchTm, s = i > 0 ? i + "帧以前" : "当前帧";
                for (var r in h += t.texture.curUsedCovRate, o += t.texture.curUsedCovRateAtlas,
                    console.log("--图集(id:" + e + ",当前使用率:" + (1e3 * t.texture.curUsedCovRate | 0) + "‰", "当前图集使用率:", (100 * t.texture.curUsedCovRateAtlas | 0) + "%", "图集使用率:", 100 * t.usedRate | 0, "%, 使用于:" + s + ")--:"),
                    t.charMaps) {
                    var a = t.charMaps[r];
                    console.log("     off:", a.orix, a.oriy, " bmp宽高:", a.bmpWidth, a.bmpHeight, "无效:", a.deleted, "touchdt:", xt.loopCount - a.touchTick, "位置:", a.uv[0] * re.atlasWidth | 0, a.uv[1] * re.atlasWidth | 0, "字符:", a.char, "key:", r),
                        n++;
                }
            }), console.log("独立贴图文字(" + this.isoTextures.length + "个):"), this.isoTextures.forEach(function (t) {
                console.log("    size:", t._texW, t._texH, "touch间隔:", xt.loopCount - t.lastTouchTm, "char:", t.ri.char);
            }), console.log("总缓存:", n, "总使用率:", h, "总当前图集使用率:", o);
        }
        showAtlas(t, e, s, r, a, n) {
            if (!this.textAtlases[t]) return console.log("没有这个图集"), null;
            var h = new i.Sprite(), o = this.textAtlases[t].texture, l = {
                width: re.atlasWidth,
                height: re.atlasWidth,
                sourceWidth: re.atlasWidth,
                sourceHeight: re.atlasWidth,
                offsetX: 0,
                offsetY: 0,
                getIsReady: function () {
                    return !0;
                },
                _addReference: function () { },
                _removeReference: function () { },
                _getSource: function () {
                    return o._getSource();
                },
                bitmap: {
                    id: o.id
                },
                _uv: Qt.DEF_UV
            };
            return h.size = function (t, i) {
                return this.width = t, this.height = i, h.graphics.clear(), h.graphics.drawRect(0, 0, h.width, h.height, e),
                    h.graphics.drawTexture(l, 0, 0, h.width, h.height), this;
            }, h.graphics.drawRect(0, 0, a, n, e), h.graphics.drawTexture(l, 0, 0, a, n), h.pos(s, r),
                i.stage.addChild(h), h;
        }
        filltext_native(t, e, s, r, a, n, h, o, l, _, u = 0) {
            if (!(e && e.length <= 0 || s && s.length < 1)) {
                var c = Zt.Parse(n), d = 0;
                switch (_) {
                    case "center":
                        d = i.Context.ENUM_TEXTALIGN_CENTER;
                        break;

                    case "right":
                        d = i.Context.ENUM_TEXTALIGN_RIGHT;
                }
                return this._fast_filltext(t, e, s, r, a, c, h, o, l, d, u);
            }
        }
    }
    re.useOldCharBook = !1, re.atlasWidth = 1024, re.noAtlas = !1, re.forceSplitRender = !1,
        re.forceWholeRender = !1, re.scaleFontWithCtx = !0, re.standardFontSize = 32, re.destroyAtlasDt = 10,
        re.checkCleanTextureDt = 2e3, re.destroyUnusedTextureDt = 3e3, re.cleanMem = 104857600,
        re.isWan1Wan = !1, re.showLog = !1, re.debugUV = !1, re.tmpRI = new Jt(), re.pixelBBX = [0, 0, 0, 0],
        re.imgdtRect = [0, 0, 0, 0], re.simClean = !1, Kt.gTextRender = re;
    class ae {
        constructor() {
            if (this._tmpMatrix = new p(), this._drawTexToDrawTri_Vert = new Float32Array(8),
                this._drawTexToDrawTri_Index = new Uint16Array([0, 1, 2, 0, 2, 3]), this._tempUV = new Float32Array(8),
                this._drawTriUseAbsMatrix = !1, this._id = ++ae._COUNT, this._other = null, this._renderNextSubmitIndex = 0,
                this._path = null, this._drawCount = 1, this._width = ae._MAXSIZE, this._height = ae._MAXSIZE,
                this._renderCount = 0, this._submits = null, this._curSubmit = null, this._submitKey = new K(),
                this._mesh = null, this._pathMesh = null, this._triangleMesh = null, this.meshlist = [],
                this._transedPoints = new Array(8), this._temp4Points = new Array(8), this._clipRect = ae.MAXCLIPRECT,
                this._globalClipMatrix = new p(ae._MAXSIZE, 0, 0, ae._MAXSIZE, 0, 0), this._clipInCache = !1,
                this._clipInfoID = 0, this._clipID_Gen = 0, this._lastMatScaleX = 1, this._lastMatScaleY = 1,
                this._lastMat_a = 1, this._lastMat_b = 0, this._lastMat_c = 0, this._lastMat_d = 1,
                this._nBlendType = 0, this._save = null, this._targets = null, this._charSubmitCache = null,
                this._saveMark = null, this._shader2D = new Ft(), this.sprite = null, this._italicDeg = 0,
                this._lastTex = null, this._fillColor = 0, this._flushCnt = 0, this.defTexture = null,
                this._colorFiler = null, this.drawTexAlign = !1, this._incache = !1, this.isMain = !1,
                ae._contextcount++, ae._textRender = ae._textRender || new re(), !this.defTexture) {
                var t = new B(2, 2);
                t.setPixels(new Uint8Array(16)), t.lock = !0, this.defTexture = new Qt(t);
            }
            this._lastTex = this.defTexture, this.clear();
        }
        static __init__() {
            ae.MAXCLIPRECT = new g(0, 0, ae._MAXSIZE, ae._MAXSIZE), ne.DEFAULT = new ne();
        }
        drawImage(...t) { }
        getImageData(...t) { }
        measureText(t) {
            return null;
        }
        setTransform(...t) { }
        $transform(t, e, i, s, r, a) { }
        get lineJoin() {
            return "";
        }
        set lineJoin(t) { }
        get lineCap() {
            return "";
        }
        set lineCap(t) { }
        get miterLimit() {
            return "";
        }
        set miterLimit(t) { }
        clearRect(t, e, i, s) { }
        _drawRect(t, e, i, s, r) {
            V.renderBatches++, r && (this.fillStyle = r), this.fillRect(t, e, i, s, null);
        }
        drawTexture2(t, e, i, s, r, a) { }
        transformByMatrix(t, e, i) {
            this.transform(t.a, t.b, t.c, t.d, t.tx + e, t.ty + i);
        }
        saveTransform(t) {
            this.save();
        }
        restoreTransform(t) {
            this.restore();
        }
        drawRect(t, e, i, s, r, a, n) {
            null != r && (this.fillStyle = r, this.fillRect(t, e, i, s)), null != a && (this.strokeStyle = a,
                this.lineWidth = n, this.strokeRect(t, e, i, s));
        }
        alpha(t) {
            this.globalAlpha *= t;
        }
        _transform(t, e, i) {
            this.translate(e, i), this.transform(t.a, t.b, t.c, t.d, t.tx, t.ty), this.translate(-e, -i);
        }
        _rotate(t, e, i) {
            this.translate(e, i), this.rotate(t), this.translate(-e, -i);
        }
        _scale(t, e, i, s) {
            this.translate(i, s), this.scale(t, e), this.translate(-i, -s);
        }
        _drawLine(t, e, i, s, r, a, n, h, o) {
            this.beginPath(), this.strokeStyle = n, this.lineWidth = h, this.moveTo(t + i, e + s),
                this.lineTo(t + r, e + a), this.stroke();
        }
        _drawLines(t, e, i, s, r, a) {
            this.beginPath(), this.strokeStyle = s, this.lineWidth = r, this.addPath(i.slice(), !1, !1, t, e),
                this.stroke();
        }
        drawCurves(t, e, i, s, r) {
            this.beginPath(), this.strokeStyle = s, this.lineWidth = r, this.moveTo(t + i[0], e + i[1]);
            for (var a = 2, n = i.length; a < n;) this.quadraticCurveTo(t + i[a++], e + i[a++], t + i[a++], e + i[a++]);
            this.stroke();
        }
        _fillAndStroke(t, e, i, s = !1) {
            null != t && (this.fillStyle = t, this.fill()), null != e && i > 0 && (this.strokeStyle = e,
                this.lineWidth = i, this.stroke());
        }
        _drawCircle(t, e, i, s, r, a, n) {
            V.renderBatches++, this.beginPath(!0), this.arc(t, e, i, 0, ae.PI2), this.closePath(),
                this._fillAndStroke(s, r, a);
        }
        _drawPie(t, e, i, s, r, a, n, h, o) {
            this.beginPath(), this.moveTo(t, e), this.arc(t, e, i, s, r), this.closePath(),
                this._fillAndStroke(a, n, h);
        }
        _drawPoly(t, e, i, s, r, a, n, h) {
            this.beginPath(), this.addPath(i.slice(), !0, n, t, e), this.closePath(), this._fillAndStroke(s, r, a, n);
        }
        _drawPath(t, e, i, s, r) {
            this.beginPath();
            for (var a = 0, n = i.length; a < n; a++) {
                var h = i[a];
                switch (h[0]) {
                    case "moveTo":
                        this.moveTo(t + h[1], e + h[2]);
                        break;

                    case "lineTo":
                        this.lineTo(t + h[1], e + h[2]);
                        break;

                    case "arcTo":
                        this.arcTo(t + h[1], e + h[2], t + h[3], e + h[4], h[5]);
                        break;

                    case "closePath":
                        this.closePath();
                }
            }
            null != s && (this.fillStyle = s.fillStyle, this.fill()), null != r && (this.strokeStyle = r.strokeStyle,
                this.lineWidth = r.lineWidth || 1, this.lineJoin = r.lineJoin, this.lineCap = r.lineCap,
                this.miterLimit = r.miterLimit, this.stroke());
        }
        static set2DRenderConfig() {
            var t = m.instance;
            v.setBlend(t, !0), v.setBlendEquation(t, t.FUNC_ADD), G.activeBlendFunction = null,
                v.setBlendFunc(t, t.ONE, t.ONE_MINUS_SRC_ALPHA), v.setDepthTest(t, !1), v.setCullFace(t, !1),
                v.setDepthMask(t, !0), v.setFrontFace(t, t.CCW), t.viewport(0, 0, O.width, O.height);
        }
        clearBG(t, e, i, s) {
            var r = v.mainContext;
            r.clearColor(t, e, i, s), r.clear(r.COLOR_BUFFER_BIT);
        }
        _getSubmits() {
            return this._submits;
        }
        _releaseMem(t = !1) {
            if (this._submits) {
                this._curMat && this._curMat.destroy(), this._curMat = null, this._shader2D.destroy(),
                    this._shader2D = null, this._charSubmitCache.clear();
                for (var e = 0, i = this._submits._length; e < i; e++) this._submits[e].releaseRender();
                var s;
                for (this._submits.length = 0, this._submits._length = 0, this._submits = null,
                    this._curSubmit = null, this._path = null, this._save = null, e = 0, s = this.meshlist.length; e < s; e++) {
                    this.meshlist[e].destroy();
                }
                this.meshlist.length = 0, this.sprite = null, t || (this._targets && this._targets.destroy(),
                    this._targets = null);
            }
        }
        destroy(t = !1) {
            --ae._contextcount, this.sprite = null, this._releaseMem(t), this._charSubmitCache.destroy(),
                this._mesh.destroy(), t || (this._targets && this._targets.destroy(), this._targets = null);
        }
        clear() {
            this._submits || (this._other = ne.DEFAULT, this._curMat = p.create(), this._charSubmitCache = new Ht(),
                this._mesh = Ct.getAMesh(this.isMain), this.meshlist.push(this._mesh), this._pathMesh = Rt.getAMesh(this.isMain),
                this.meshlist.push(this._pathMesh), this._triangleMesh = At.getAMesh(this.isMain),
                this.meshlist.push(this._triangleMesh), this._submits = [], this._save = [pt.Create(this)],
                this._save.length = 10, this._shader2D = new Ft()), this._submitKey.clear(), this._mesh.clearVB(),
                this._drawCount = 1, this._other = ne.DEFAULT, this._other.lineWidth = this._shader2D.ALPHA = 1,
                this._nBlendType = 0, this._clipRect = ae.MAXCLIPRECT, this._curSubmit = ut.RENDERBASE,
                ut.RENDERBASE._ref = 16777215, ut.RENDERBASE._numEle = 0, this._shader2D.fillStyle = this._shader2D.strokeStyle = ot.DEFAULT;
            for (var t = 0, e = this._submits._length; t < e; t++) this._submits[t].releaseRender();
            this._submits._length = 0, this._curMat.identity(), this._other.clear(), this._saveMark = this._save[0],
                this._save._length = 1;
        }
        size(e, i) {
            this._width == e && this._height == i || (this._width = e, this._height = i, this._targets && (this._targets.destroy(),
                this._targets = new N(e, i, t.RenderTextureFormat.R8G8B8A8, -1)), this.isMain && (v.mainContext.viewport(0, 0, e, i),
                    O.width = e, O.height = i)), 0 === e && 0 === i && this._releaseMem();
        }
        set asBitmap(e) {
            if (e) {
                let e = this._targets;
                if (!this._width || !this._height) throw Error("asBitmap no size!");
                e && e.width == this._width && e.height == this._height || (e && e.destroy(), this._targets = new N(this._width, this._height, t.RenderTextureFormat.R8G8B8A8, -1));
            } else this._targets && this._targets.destroy(), this._targets = null;
        }
        getMatScaleX() {
            return this._lastMat_a == this._curMat.a && this._lastMat_b == this._curMat.b ? this._lastMatScaleX : (this._lastMatScaleX = this._curMat.getScaleX(),
                this._lastMat_a = this._curMat.a, this._lastMat_b = this._curMat.b, this._lastMatScaleX);
        }
        getMatScaleY() {
            return this._lastMat_c == this._curMat.c && this._lastMat_d == this._curMat.d ? this._lastMatScaleY : (this._lastMatScaleY = this._curMat.getScaleY(),
                this._lastMat_c = this._curMat.c, this._lastMat_d = this._curMat.d, this._lastMatScaleY);
        }
        setFillColor(t) {
            this._fillColor = t;
        }
        getFillColor() {
            return this._fillColor;
        }
        set fillStyle(t) {
            this._shader2D.fillStyle.equal(t) || (ct.save(this, ct.TYPE_FILESTYLE, this._shader2D, !1),
                this._shader2D.fillStyle = ot.create(t), this._submitKey.other = -this._shader2D.fillStyle.toInt());
        }
        get fillStyle() {
            return this._shader2D.fillStyle;
        }
        set globalAlpha(t) {
            (t = Math.floor(1e3 * t) / 1e3) != this._shader2D.ALPHA && (ct.save(this, ct.TYPE_ALPHA, this._shader2D, !1),
                this._shader2D.ALPHA = t);
        }
        get globalAlpha() {
            return this._shader2D.ALPHA;
        }
        set textAlign(t) {
            this._other.textAlign === t || (this._other = this._other.make(), ct.save(this, ct.TYPE_TEXTALIGN, this._other, !1),
                this._other.textAlign = t);
        }
        get textAlign() {
            return this._other.textAlign;
        }
        set textBaseline(t) {
            this._other.textBaseline === t || (this._other = this._other.make(), ct.save(this, ct.TYPE_TEXTBASELINE, this._other, !1),
                this._other.textBaseline = t);
        }
        get textBaseline() {
            return this._other.textBaseline;
        }
        set globalCompositeOperation(t) {
            var e = G.TOINT[t];
            null == e || this._nBlendType === e || (ct.save(this, ct.TYPE_GLOBALCOMPOSITEOPERATION, this, !0),
                this._curSubmit = ut.RENDERBASE, this._nBlendType = e);
        }
        get globalCompositeOperation() {
            return G.NAMES[this._nBlendType];
        }
        set strokeStyle(t) {
            this._shader2D.strokeStyle.equal(t) || (ct.save(this, ct.TYPE_STROKESTYLE, this._shader2D, !1),
                this._shader2D.strokeStyle = ot.create(t), this._submitKey.other = -this._shader2D.strokeStyle.toInt());
        }
        get strokeStyle() {
            return this._shader2D.strokeStyle;
        }
        translate(t, e) {
            0 === t && 0 === e || (gt.save(this), this._curMat._bTransform ? (ft.save(this),
                this._curMat.tx += t * this._curMat.a + e * this._curMat.c, this._curMat.ty += t * this._curMat.b + e * this._curMat.d) : (this._curMat.tx = t,
                    this._curMat.ty = e));
        }
        set lineWidth(t) {
            this._other.lineWidth === t || (this._other = this._other.make(), ct.save(this, ct.TYPE_LINEWIDTH, this._other, !1),
                this._other.lineWidth = t);
        }
        get lineWidth() {
            return this._other.lineWidth;
        }
        save() {
            this._save[this._save._length++] = pt.Create(this);
        }
        restore() {
            var t = this._save._length, e = this._nBlendType;
            if (!(t < 1)) {
                for (var i = t - 1; i >= 0; i--) {
                    var s = this._save[i];
                    if (s.restore(this), s.isSaveMark()) return void (this._save._length = i);
                }
                e != this._nBlendType && (this._curSubmit = ut.RENDERBASE);
            }
        }
        set font(t) {
            this._other = this._other.make(), ct.save(this, ct.TYPE_FONT, this._other, !1);
        }
        fillText(t, e, i, s, r, a, n = 0, h = "") {
            ae._textRender.filltext(this, t, e, i, s, r, h, n, a);
        }
        drawText(t, e, i, s, r, a) {
            ae._textRender.filltext(this, t, e, i, s, r, null, 0, a);
        }
        fillWords(t, e, i, s, r) {
            ae._textRender.fillWords(this, t, e, i, s, r, null, 0);
        }
        strokeWord(t, e, i, s, r, a, n) {
            ae._textRender.filltext(this, t, e, i, s, null, r, a, n);
        }
        fillBorderText(t, e, i, s, r, a, n, h) {
            ae._textRender.filltext(this, t, e, i, s, r, a, n, h);
        }
        fillBorderWords(t, e, i, s, r, a, n) {
            ae._textRender.fillWords(this, t, e, i, s, r, a, n);
        }
        _fast_filltext(t, e, i, s, r, a, n, h, o = 0) {
            ae._textRender._fast_filltext(this, t, null, e, i, s, r, a, n, h, o);
        }
        _fillRect(t, e, i, s, r) {
            var a = this._curSubmit, n = a && a._key.submitType === ut.KEY_DRAWTEXTURE && a._key.blendShader === this._nBlendType;
            this._mesh.vertNum + 4 > ae._MAXVERTNUM && (this._mesh = Ct.getAMesh(this.isMain),
                this.meshlist.push(this._mesh), n = !1), n && (n = n && this.isSameClipInfo(a)),
                this.transformQuad(t, e, i, s, 0, this._curMat, this._transedPoints), this.clipedOff(this._transedPoints) || (this._mesh.addQuad(this._transedPoints, Qt.NO_UV, r, !1),
                    n || (a = this._curSubmit = Xt.create(this, this._mesh, z.create(W.TEXTURE2D, 0)),
                        this._submits[this._submits._length++] = a, this._copyClipInfo(a, this._globalClipMatrix),
                        a.shaderValue.textureHost = this._lastTex, a._key.other = this._lastTex && this._lastTex.bitmap ? this._lastTex.bitmap.id : -1,
                        a._renderType = ut.TYPE_TEXTURE), this._curSubmit._numEle += 6, this._mesh.indexNum += 6,
                    this._mesh.vertNum += 4);
        }
        fillRect(t, e, i, s, r) {
            var a = r ? ot.create(r) : this._shader2D.fillStyle, n = this.mixRGBandAlpha(a.toInt());
            this._fillRect(t, e, i, s, n);
        }
        fillTexture(t, e, s, r, a, n, h, o) {
            t._getSource() ? this._fillTexture(t, t.width, t.height, t.uvrect, e, s, r, a, n, h.x, h.y) : this.sprite && i.systemTimer.callLater(this, this._repaintSprite);
        }
        _fillTexture(t, e, i, s, r, a, n, h, o, l, _) {
            var u = this._curSubmit;
            this._mesh.vertNum + 4 > ae._MAXVERTNUM && (this._mesh = Ct.getAMesh(this.isMain),
                this.meshlist.push(this._mesh));
            var c = !0, d = !0;
            switch (o) {
                case "repeat":
                    break;

                case "repeat-x":
                    d = !1;
                    break;

                case "repeat-y":
                    c = !1;
                    break;

                case "no-repeat":
                    c = d = !1;
            }
            var p = this._temp4Points, f = 0, g = 0, m = 0, v = 0, T = 0, x = 0;
            if (l < 0 ? (m = r, f = -l % e / e) : m = r + l, _ < 0 ? (v = a, g = -_ % i / i) : v = a + _,
                T = r + n, x = a + h, !c && (T = Math.min(T, r + l + e)), !d && (x = Math.min(x, a + _ + i)),
                !(T < r || x < a || m > T || v > x)) {
                var y = (T - r - l) / e, E = (x - a - _) / i;
                if (this.transformQuad(m, v, T - m, x - v, 0, this._curMat, this._transedPoints),
                    p[0] = f, p[1] = g, p[2] = y, p[3] = g, p[4] = y, p[5] = E, p[6] = f, p[7] = E,
                    !this.clipedOff(this._transedPoints)) {
                    var b = this._mixRGBandAlpha(4294967295, this._shader2D.ALPHA);
                    this._mesh.addQuad(this._transedPoints, p, b, !0);
                    var w = z.create(W.TEXTURE2D, 0);
                    w.defines.add(W.FILLTEXTURE), w.u_TexRange = s.concat(), u = this._curSubmit = Xt.create(this, this._mesh, w),
                        this._submits[this._submits._length++] = u, this._copyClipInfo(u, this._globalClipMatrix),
                        u.shaderValue.textureHost = t, u._renderType = ut.TYPE_TEXTURE, this._curSubmit._numEle += 6,
                        this._mesh.indexNum += 6, this._mesh.vertNum += 4;
                }
                this.breakNextMerge();
            }
        }
        setColorFilter(t) {
            ct.save(this, ct.TYPE_COLORFILTER, this, !0), this._colorFiler = t, this._curSubmit = ut.RENDERBASE;
        }
        drawTexture(t, e, i, s, r) {
            this._drawTextureM(t, e, i, s, r, null, 1, null);
        }
        drawTextures(t, e, s, r) {
            if (t._getSource()) for (var a = e.length / 2, n = 0, h = t.bitmap.id, o = 0; o < a; o++) this._inner_drawTexture(t, h, e[n++] + s, e[n++] + r, 0, 0, null, null, 1, !1); else this.sprite && i.systemTimer.callLater(this, this._repaintSprite);
        }
        _drawTextureAddSubmit(t, e) {
            var i = null;
            i = Xt.create(this, this._mesh, z.create(W.TEXTURE2D, 0)), this._submits[this._submits._length++] = i,
                i.shaderValue.textureHost = e, i._key.other = t, i._renderType = ut.TYPE_TEXTURE,
                this._curSubmit = i;
        }
        _drawTextureM(t, e, i, s, r, a, n, h) {
            var o = this.sprite;
            return !!t._getSource(function () {
                o && o.repaint();
            }) && this._inner_drawTexture(t, t.bitmap.id, e, i, s, r, a, h, n, !1);
        }
        _drawRenderTexture(t, e, i, s, r, a, n, h) {
            return this._inner_drawTexture(t, -1, e, i, s, r, a, h, 1, !1);
        }
        submitDebugger() {
            this._submits[this._submits._length++] = j.create([], function () { }, this);
        }
        _copyClipInfo(t, e) {
            var i = t.shaderValue.clipMatDir;
            i[0] = e.a, i[1] = e.b, i[2] = e.c, i[3] = e.d;
            var s = t.shaderValue.clipMatPos;
            s[0] = e.tx, s[1] = e.ty, t.clipInfoID = this._clipInfoID, this._clipInCache && (t.shaderValue.clipOff[0] = 1);
        }
        isSameClipInfo(t) {
            return t.clipInfoID === this._clipInfoID;
        }
        _useNewTex2DSubmit(t, e) {
            this._mesh.vertNum + e > ae._MAXVERTNUM && (this._mesh = Ct.getAMesh(this.isMain),
                this.meshlist.push(this._mesh));
            var i = Xt.create(this, this._mesh, z.create(W.TEXTURE2D, 0));
            this._submits[this._submits._length++] = this._curSubmit = i, i.shaderValue.textureHost = t,
                this._copyClipInfo(i, this._globalClipMatrix);
        }
        _drawTexRect(t, e, i, s, r) {
            this.transformQuad(t, e, i, s, this._italicDeg, this._curMat, this._transedPoints);
            var a = this._transedPoints;
            a[0] = a[0] + .5 | 0, a[1] = a[1] + .5 | 0, a[2] = a[2] + .5 | 0, a[3] = a[3] + .5 | 0,
                a[4] = a[4] + .5 | 0, a[5] = a[5] + .5 | 0, a[6] = a[6] + .5 | 0, a[7] = a[7] + .5 | 0,
                this.clipedOff(this._transedPoints) || (this._mesh.addQuad(this._transedPoints, r, this._fillColor, !0),
                    this._curSubmit._numEle += 6, this._mesh.indexNum += 6, this._mesh.vertNum += 4);
        }
        drawCallOptimize(t) {
            return this._charSubmitCache.enable(t, this), t;
        }
        _inner_drawTexture(t, e, i, s, r, a, n, h, o, l) {
            if (!(r <= 0 || a <= 0)) {
                var _ = this._curSubmit._key;
                if (h = h || t._uv, _.submitType === ut.KEY_TRIANGLES && _.other === e) {
                    var u = this._drawTexToDrawTri_Vert;
                    u[0] = i, u[1] = s, u[2] = i + r, u[3] = s, u[4] = i + r, u[5] = s + a, u[6] = i,
                        u[7] = s + a, this._drawTriUseAbsMatrix = !0;
                    var c = this._tempUV;
                    return c[0] = h[0], c[1] = h[1], c[2] = h[2], c[3] = h[3], c[4] = h[4], c[5] = h[5],
                        c[6] = h[6], c[7] = h[7], this.drawTriangles(t, 0, 0, u, c, this._drawTexToDrawTri_Index, n, o, null, null),
                        this._drawTriUseAbsMatrix = !1, !0;
                }
                var d = this._mesh, p = this._curSubmit, f = l ? this._charSubmitCache.getPos() : this._transedPoints;
                if (this.transformQuad(i, s, r || t.width, a || t.height, this._italicDeg, n || this._curMat, f),
                    this.drawTexAlign) {
                    var g = Math.round;
                    f[0] = g(f[0]), f[1] = g(f[1]), f[2] = g(f[2]), f[3] = g(f[3]), f[4] = g(f[4]),
                        f[5] = g(f[5]), f[6] = g(f[6]), f[7] = g(f[7]), this.drawTexAlign = !1;
                }
                var m = this._mixRGBandAlpha(4294967295, this._shader2D.ALPHA * o);
                if (l) return this._charSubmitCache.add(this, t, e, f, h, m), !0;
                this._drawCount++;
                var v = e >= 0 && _.submitType === ut.KEY_DRAWTEXTURE && _.other === e;
                return v && (v = v && this.isSameClipInfo(p)), this._lastTex = t, d.vertNum + 4 > ae._MAXVERTNUM && (d = this._mesh = Ct.getAMesh(this.isMain),
                    this.meshlist.push(d), v = !1), d.addQuad(f, h, m, !0), v || (this._submits[this._submits._length++] = this._curSubmit = p = Xt.create(this, d, z.create(W.TEXTURE2D, 0)),
                        p.shaderValue.textureHost = t, p._key.other = e, this._copyClipInfo(p, this._globalClipMatrix)),
                    p._numEle += 6, d.indexNum += 6, d.vertNum += 4, !0;
            }
        }
        transform4Points(t, e, i) {
            var s = e.tx, r = e.ty, a = e.a, n = e.b, h = e.c, o = e.d, l = t[0], _ = t[1], u = t[2], c = t[3], d = t[4], p = t[5], f = t[6], g = t[7];
            e._bTransform ? (i[0] = l * a + _ * h + s, i[1] = l * n + _ * o + r, i[2] = u * a + c * h + s,
                i[3] = u * n + c * o + r, i[4] = d * a + p * h + s, i[5] = d * n + p * o + r, i[6] = f * a + g * h + s,
                i[7] = f * n + g * o + r) : (i[0] = l + s, i[1] = _ + r, i[2] = u + s, i[3] = c + r,
                    i[4] = d + s, i[5] = p + r, i[6] = f + s, i[7] = g + r);
        }
        clipedOff(t) {
            return this._clipRect.width <= 0 || this._clipRect.height <= 0;
        }
        transformQuad(t, e, i, s, r, a, n) {
            var h = 0;
            0 != r && (h = Math.tan(r * Math.PI / 180) * s);
            var o = t + i, l = e + s, _ = a.tx, u = a.ty, c = a.a, d = a.b, p = a.c, f = a.d, g = t + h, m = e, v = o + h, T = e, x = o, y = l, E = t, b = l;
            a._bTransform ? (n[0] = g * c + m * p + _, n[1] = g * d + m * f + u, n[2] = v * c + T * p + _,
                n[3] = v * d + T * f + u, n[4] = x * c + y * p + _, n[5] = x * d + y * f + u, n[6] = E * c + b * p + _,
                n[7] = E * d + b * f + u) : (n[0] = g + _, n[1] = m + u, n[2] = v + _, n[3] = T + u,
                    n[4] = x + _, n[5] = y + u, n[6] = E + _, n[7] = b + u);
        }
        pushRT() {
            this.addRenderObject(j.create(null, N.pushRT, this));
        }
        popRT() {
            this.addRenderObject(j.create(null, N.popRT, this)), this.breakNextMerge();
        }
        useRT(t) {
            this.addRenderObject(j.create([t], function (t) {
                if (!t) throw "error useRT";
                t.start(), t.clear(0, 0, 0, 0);
            }, this)), this.breakNextMerge();
        }
        RTRestore(t) {
            this.addRenderObject(j.create([t], function (t) {
                t.restore();
            }, this)), this.breakNextMerge();
        }
        breakNextMerge() {
            this._curSubmit = ut.RENDERBASE;
        }
        _repaintSprite() {
            this.sprite && this.sprite.repaint();
        }
        drawTextureWithTransform(t, e, i, s, r, a, n, h, o, l, _ = null, u) {
            var c, d = this._curMat;
            l && (c = this.globalCompositeOperation, this.globalCompositeOperation = l);
            var f = this._colorFiler;
            if (_ && this.setColorFilter(_), !a) return this._drawTextureM(t, e + n, i + h, s, r, d, o, u),
                l && (this.globalCompositeOperation = c), void (_ && this.setColorFilter(f));
            var g = this._tmpMatrix;
            g.a = a.a, g.b = a.b, g.c = a.c, g.d = a.d, g.tx = a.tx + n, g.ty = a.ty + h, g._bTransform = a._bTransform,
                a && d._bTransform ? (p.mul(g, d, g), (a = g)._bTransform = !0) : (g.tx += d.tx,
                    g.ty += d.ty, a = g), this._drawTextureM(t, e, i, s, r, a, o, u), l && (this.globalCompositeOperation = c),
                _ && this.setColorFilter(f);
        }
        _flushToTarget(t, e) {
            O.worldScissorTest = !1;
            var i = m.instance;
            i.disable(i.SCISSOR_TEST);
            var s = O.worldAlpha, r = O.worldMatrix4, a = O.worldMatrix;
            O.worldMatrix = p.EMPTY, O.restoreTempArray(), O.worldMatrix4 = O.TEMPMAT4_ARRAY,
                O.worldAlpha = 1, F.activeShader = null, e.start(), t._submits._length > 0 && e.clear(0, 0, 0, 0),
                t._curSubmit = ut.RENDERBASE, t.flush(), t.clear(), e.restore(), t._curSubmit = ut.RENDERBASE,
                F.activeShader = null, O.worldAlpha = s, O.worldMatrix4 = r, O.worldMatrix = a;
        }
        drawCanvas(t, e, i, s, r) {
            if (t) {
                var a, n = t.context;
                if (n._targets) n._submits._length > 0 && (a = j.create([n, n._targets], this._flushToTarget, this),
                    this._submits[this._submits._length++] = a), this._drawRenderTexture(n._targets, e, i, s, r, null, 1, N.flipyuv),
                    this._curSubmit = ut.RENDERBASE; else {
                    var h = t;
                    h.touches && h.touches.forEach(function (t) {
                        t.touch();
                    }), a = Vt.create(t, this._shader2D.ALPHA, this._shader2D.filters), this._submits[this._submits._length++] = a,
                        a._key.clear();
                    var o = a._matrix;
                    this._curMat.copyTo(o);
                    var l = o.tx, _ = o.ty;
                    o.tx = o.ty = 0, o.transformPoint(f.TEMP.setTo(e, i)), o.translate(f.TEMP.x + l, f.TEMP.y + _),
                        p.mul(h.invMat, o, o), this._curSubmit = ut.RENDERBASE;
                }
            }
        }
        drawTarget(t, e, i, s, r, a, n, h = null, o = -1) {
            if (this._drawCount++, this._mesh.vertNum + 4 > ae._MAXVERTNUM && (this._mesh = Ct.getAMesh(this.isMain),
                this.meshlist.push(this._mesh)), this.transformQuad(e, i, s, r, 0, a || this._curMat, this._transedPoints),
                !this.clipedOff(this._transedPoints)) {
                this._mesh.addQuad(this._transedPoints, h || Qt.DEF_UV, 4294967295, !0);
                var l = this._curSubmit = Yt.create(this, this._mesh, n, t);
                return l.blendType = -1 == o ? this._nBlendType : o, this._copyClipInfo(l, this._globalClipMatrix),
                    l._numEle = 6, this._mesh.indexNum += 6, this._mesh.vertNum += 4, this._submits[this._submits._length++] = l,
                    this._curSubmit = ut.RENDERBASE, !0;
            }
            return this._curSubmit = ut.RENDERBASE, !1;
        }
        drawTriangles(t, e, s, r, a, n, h, o, l, _, u = 4294967295) {
            if (t._getSource()) {
                var c = null;
                _ && (c = this.globalCompositeOperation, this.globalCompositeOperation = _), this._drawCount++;
                var d = this._tmpMatrix, f = this._triangleMesh, g = null, m = !1;
                l && (g = this._colorFiler, this._colorFiler = l, this._curSubmit = ut.RENDERBASE,
                    m = g != l);
                var v = t.bitmap, T = this._curSubmit._key, x = T.submitType === ut.KEY_TRIANGLES && T.other === v.id && T.blendShader == this._nBlendType;
                if (f.vertNum + r.length / 2 > ae._MAXVERTNUM && (f = this._triangleMesh = At.getAMesh(this.isMain),
                    this.meshlist.push(f), x = !1), !x) {
                    var y = this._curSubmit = Xt.create(this, f, z.create(W.TEXTURE2D, 0));
                    y.shaderValue.textureHost = t, y._renderType = ut.TYPE_TEXTURE, y._key.submitType = ut.KEY_TRIANGLES,
                        y._key.other = v.id, this._copyClipInfo(y, this._globalClipMatrix), this._submits[this._submits._length++] = y;
                }
                var E = this._mixRGBandAlpha(u, this._shader2D.ALPHA * o);
                this._drawTriUseAbsMatrix ? f.addData(r, a, n, h, E) : (h ? (d.a = h.a, d.b = h.b,
                    d.c = h.c, d.d = h.d, d.tx = h.tx + e, d.ty = h.ty + s) : (d.a = 1, d.b = 0, d.c = 0,
                        d.d = 1, d.tx = e, d.ty = s), p.mul(d, this._curMat, d), f.addData(r, a, n, d || this._curMat, E)),
                    this._curSubmit._numEle += n.length, m && (this._colorFiler = g, this._curSubmit = ut.RENDERBASE),
                    _ && (this.globalCompositeOperation = c);
            } else this.sprite && i.systemTimer.callLater(this, this._repaintSprite);
        }
        transform(t, e, i, s, r, a) {
            ft.save(this), p.mul(p.TEMP.setTo(t, e, i, s, r, a), this._curMat, this._curMat),
                this._curMat._checkTransform();
        }
        _transformByMatrix(t, e, i) {
            t.setTranslate(e, i), p.mul(t, this._curMat, this._curMat), t.setTranslate(0, 0),
                this._curMat._bTransform = !0;
        }
        setTransformByMatrix(t) {
            t.copyTo(this._curMat);
        }
        rotate(t) {
            ft.save(this), this._curMat.rotateEx(t);
        }
        scale(t, e) {
            ft.save(this), this._curMat.scaleEx(t, e);
        }
        clipRect(t, e, i, s) {
            dt.save(this), this._clipRect == ae.MAXCLIPRECT ? this._clipRect = new g(t, e, i, s) : (this._clipRect.width = i,
                this._clipRect.height = s, this._clipRect.x = t, this._clipRect.y = e), this._clipID_Gen++,
                this._clipID_Gen %= 1e4, this._clipInfoID = this._clipID_Gen;
            var r = this._globalClipMatrix, a = r.tx, n = r.ty, h = a + r.a, o = n + r.d;
            if (this._clipRect.width >= ae._MAXSIZE ? (r.a = r.d = ae._MAXSIZE, r.b = r.c = r.tx = r.ty = 0) : (this._curMat._bTransform ? (r.tx = this._clipRect.x * this._curMat.a + this._clipRect.y * this._curMat.c + this._curMat.tx,
                r.ty = this._clipRect.x * this._curMat.b + this._clipRect.y * this._curMat.d + this._curMat.ty,
                r.a = this._clipRect.width * this._curMat.a, r.b = this._clipRect.width * this._curMat.b,
                r.c = this._clipRect.height * this._curMat.c, r.d = this._clipRect.height * this._curMat.d) : (r.tx = this._clipRect.x + this._curMat.tx,
                    r.ty = this._clipRect.y + this._curMat.ty, r.a = this._clipRect.width, r.b = r.c = 0,
                    r.d = this._clipRect.height), this._incache && (this._clipInCache = !0)), r.a > 0 && r.d > 0) {
                var l = r.tx + r.a, _ = r.ty + r.d;
                l <= a || _ <= n || r.tx >= h || r.ty >= o ? (r.a = -.1, r.d = -.1) : (r.tx < a && (r.a -= a - r.tx,
                    r.tx = a), l > h && (r.a -= l - h), r.ty < n && (r.d -= n - r.ty, r.ty = n), _ > o && (r.d -= _ - o),
                    r.a <= 0 && (r.a = -.1), r.d <= 0 && (r.d = -.1));
            }
        }
        drawMesh(t, e, i, s, r, a, n, h, o = 0) { }
        addRenderObject(t) {
            this._submits[this._submits._length++] = t;
        }
        submitElement(t, e) {
            this.isMain;
            var i = this._submits, s = i._length;
            e < 0 && (e = i._length);
            for (var r = ut.RENDERBASE; t < e;) this._renderNextSubmitIndex = t + 1, i[t] !== ut.RENDERBASE ? (ut.preRender = r,
                t += (r = i[t]).renderSubmit()) : t++;
            return s;
        }
        flush() {
            this._clipID_Gen = 0;
            var t = this.submitElement(0, this._submits._length);
            this._path && this._path.reset(), Ot.instance && Ot.getInstance().reset(), this._curSubmit = ut.RENDERBASE;
            for (var e = 0, i = this.meshlist.length; e < i; e++) {
                var s = this.meshlist[e];
                s.canReuse ? s.releaseMesh() : s.destroy();
            }
            return this.meshlist.length = 0, this._mesh = Ct.getAMesh(this.isMain), this._pathMesh = Rt.getAMesh(this.isMain),
                this._triangleMesh = At.getAMesh(this.isMain), this.meshlist.push(this._mesh, this._pathMesh, this._triangleMesh),
                this._flushCnt++, this._flushCnt % 60 == 0 && this.isMain && re.textRenderInst && re.textRenderInst.GC(),
                t;
        }
        beginPath(t = !1) {
            this._getPath().beginPath(t);
        }
        closePath() {
            this._path.closePath();
        }
        addPath(t, e, i, s, r) {
            for (var a = 0, n = 0, h = t.length / 2; n < h; n++) {
                var o = t[a] + s, l = t[a + 1] + r;
                t[a] = o, t[a + 1] = l, a += 2;
            }
            this._getPath().push(t, i);
        }
        fill() {
            var t = this._curMat, e = this._getPath(), i = this._curSubmit, s = i._key.submitType === ut.KEY_VG && i._key.blendShader === this._nBlendType;
            s && (s = s && this.isSameClipInfo(i)), s || (this._curSubmit = this.addVGSubmit(this._pathMesh));
            for (var r, a = this.mixRGBandAlpha(this.fillStyle.toInt()), n = 0, h = 0, o = e.paths.length; h < o; h++) {
                var l = e.paths[h], _ = l.path.length / 2;
                if (!(_ < 3 || 3 == _ && !l.convex)) {
                    var u, c, d, p, f = l.path.concat(), g = 0;
                    if (t._bTransform) for (g = 0; g < _; g++) c = (u = g << 1) + 1, d = f[u], p = f[c],
                        f[u] = t.a * d + t.c * p + t.tx, f[c] = t.b * d + t.d * p + t.ty; else for (g = 0; g < _; g++) c = (u = g << 1) + 1,
                            d = f[u], p = f[c], f[u] = d + t.tx, f[c] = p + t.ty;
                    this._pathMesh.vertNum + _ > ae._MAXVERTNUM && (this._curSubmit._numEle += n, n = 0,
                        this._pathMesh = Rt.getAMesh(this.isMain), this._curSubmit = this.addVGSubmit(this._pathMesh));
                    var m = this._pathMesh.vertNum;
                    if (l.convex) {
                        var v = _ - 2;
                        r = new Array(3 * v);
                        for (var T = 0, x = 0; x < v; x++) r[T++] = m, r[T++] = x + 1 + m, r[T++] = x + 2 + m;
                    } else if (r = Gt.earcut(f, null, 2), m > 0) for (var y = 0; y < r.length; y++) r[y] += m;
                    this._pathMesh.addVertAndIBToMesh(this, f, a, r), n += r.length;
                }
            }
            this._curSubmit._numEle += n;
        }
        addVGSubmit(t) {
            var e = Wt.createShape(this, t, 0, z.create(W.PRIMITIVE, 0));
            return e._key.submitType = ut.KEY_VG, this._submits[this._submits._length++] = e,
                this._copyClipInfo(e, this._globalClipMatrix), e;
        }
        stroke() {
            if (this.lineWidth > 0) {
                var t = this.mixRGBandAlpha(this.strokeStyle._color.numColor), e = this._getPath(), i = this._curSubmit, s = i._key.submitType === ut.KEY_VG && i._key.blendShader === this._nBlendType;
                s && (s = s && this.isSameClipInfo(i)), s || (this._curSubmit = this.addVGSubmit(this._pathMesh));
                for (var r = 0, a = 0, n = e.paths.length; a < n; a++) {
                    var h = e.paths[a];
                    if (!(h.path.length <= 0)) {
                        var o = [], l = [], _ = 2 * h.path.length;
                        if (!(_ < 2)) {
                            this._pathMesh.vertNum + _ > ae._MAXVERTNUM && (this._curSubmit._numEle += r, r = 0,
                                this._pathMesh = Rt.getAMesh(this.isMain), this.meshlist.push(this._pathMesh), this._curSubmit = this.addVGSubmit(this._pathMesh)),
                                Nt.createLine2(h.path, o, this.lineWidth, this._pathMesh.vertNum, l, h.loop);
                            var u, c, d, p, f = l.length / 2, g = this._curMat, m = 0;
                            if (g._bTransform) for (m = 0; m < f; m++) c = (u = m << 1) + 1, d = l[u], p = l[c],
                                l[u] = g.a * d + g.c * p + g.tx, l[c] = g.b * d + g.d * p + g.ty; else for (m = 0; m < f; m++) c = (u = m << 1) + 1,
                                    d = l[u], p = l[c], l[u] = d + g.tx, l[c] = p + g.ty;
                            this._pathMesh.addVertAndIBToMesh(this, l, t, o), r += o.length;
                        }
                    }
                }
                this._curSubmit._numEle += r;
            }
        }
        moveTo(t, e) {
            var i = this._getPath();
            i.newPath(), i._lastOriX = t, i._lastOriY = e, i.addPoint(t, e);
        }
        lineTo(t, e) {
            var i = this._getPath();
            Math.abs(t - i._lastOriX) < .001 && Math.abs(e - i._lastOriY) < .001 || (i._lastOriX = t,
                i._lastOriY = e, i.addPoint(t, e));
        }
        arcTo(t, e, i, s, r) {
            var a = 0, n = 0, h = 0, o = this._path._lastOriX - t, l = this._path._lastOriY - e, _ = Math.sqrt(o * o + l * l);
            if (!(_ <= 1e-6)) {
                var u = o / _, c = l / _, d = i - t, p = s - e, f = d * d + p * p, g = Math.sqrt(f);
                if (!(g <= 1e-6)) {
                    var m = d / g, v = p / g, T = u + m, x = c + v, y = Math.sqrt(T * T + x * x);
                    if (!(y <= 1e-6)) {
                        var E = T / y, b = x / y, w = Math.acos(E * u + b * c), C = Math.PI / 2 - w, A = (_ = r / Math.tan(C)) * u + t, R = _ * c + e, M = Math.sqrt(_ * _ + r * r), S = t + E * M, I = e + b * M, P = 0, L = 0;
                        if (u * v - c * m >= 0) {
                            var D = 2 * C / ae.SEGNUM;
                            P = Math.sin(D), L = Math.cos(D);
                        } else D = 2 * -C / ae.SEGNUM, P = Math.sin(D), L = Math.cos(D);
                        var B = this._path._lastOriX, F = this._path._lastOriY, O = A, N = R;
                        (Math.abs(O - this._path._lastOriX) > .1 || Math.abs(N - this._path._lastOriY) > .1) && (n = O,
                            h = N, B = O, F = N, this._path._lastOriX = n, this._path._lastOriY = h, this._path.addPoint(n, h));
                        var U = A - S, G = R - I;
                        for (a = 0; a < ae.SEGNUM; a++) {
                            var k = U * L + G * P, W = -U * P + G * L;
                            n = k + S, h = W + I, (Math.abs(B - n) > .1 || Math.abs(F - h) > .1) && (this._path._lastOriX = n,
                                this._path._lastOriY = h, this._path.addPoint(n, h), B = n, F = h), U = k, G = W;
                        }
                    }
                }
            }
        }
        arc(t, e, i, s, r, a = !1, n = !0) {
            var h, o, l = 0, _ = 0, u = 0, c = 0, d = 0;
            if (_ = r - s, a) if (Math.abs(_) >= 2 * Math.PI) _ = 2 * -Math.PI; else for (; _ > 0;) _ -= 2 * Math.PI; else if (Math.abs(_) >= 2 * Math.PI) _ = 2 * Math.PI; else for (; _ < 0;) _ += 2 * Math.PI;
            var p = this.getMatScaleX(), f = this.getMatScaleY(), g = i * (p > f ? p : f), m = 2 * Math.PI * g;
            o = 0 | Math.max(m / 10, 10);
            var v = this._getPath();
            for (h = 0; h <= o; h++) l = s + _ * (h / o), u = Math.cos(l), d = e + Math.sin(l) * i,
                (c = t + u * i) == this._path._lastOriX && d == this._path._lastOriY || v.addPoint(c, d);
            u = Math.cos(r), d = e + Math.sin(r) * i, (c = t + u * i) == this._path._lastOriX && d == this._path._lastOriY || v.addPoint(c, d);
        }
        quadraticCurveTo(t, e, i, s) {
            for (var r = nt.I.getBezierPoints([this._path._lastOriX, this._path._lastOriY, t, e, i, s], 30, 2), a = 0, n = r.length / 2; a < n; a++) this.lineTo(r[2 * a], r[2 * a + 1]);
            this.lineTo(i, s);
        }
        mixRGBandAlpha(t) {
            return this._mixRGBandAlpha(t, this._shader2D.ALPHA);
        }
        _mixRGBandAlpha(t, e) {
            if (e >= 1) return t;
            var i = (4278190080 & t) >>> 24;
            return 0 != i ? i *= e : i = 255 * e, 16777215 & t | i << 24;
        }
        strokeRect(t, e, i, s, r) {
            if (this.lineWidth > 0) {
                var a = this.mixRGBandAlpha(this.strokeStyle._color.numColor), n = this.lineWidth / 2;
                this._fillRect(t - n, e - n, i + this.lineWidth, this.lineWidth, a), this._fillRect(t - n, e - n + s, i + this.lineWidth, this.lineWidth, a),
                    this._fillRect(t - n, e + n, this.lineWidth, s - this.lineWidth, a), this._fillRect(t - n + i, e + n, this.lineWidth, s - this.lineWidth, a);
            }
        }
        clip() { }
        drawParticle(t, e, i) {
            i.x = t, i.y = e, this._submits[this._submits._length++] = i;
        }
        _getPath() {
            return this._path || (this._path = new lt());
        }
        get canvas() {
            return this._canvas;
        }
        _fillTexture_h(t, e, i, s, r, a, n, h) {
            s <= 0 && console.error("_fillTexture_h error: oriw must>0");
            for (var o = a, l = Math.floor(h / s), _ = h % s, u = 0; u < l; u++) this._inner_drawTexture(t, e, o, n, s, r, this._curMat, i, 1, !1),
                o += s;
            if (_ > 0) {
                var c = i[2] - i[0], d = i[0] + c * (_ / s), p = ae.tmpuv1;
                p[0] = i[0], p[1] = i[1], p[2] = d, p[3] = i[3], p[4] = d, p[5] = i[5], p[6] = i[6],
                    p[7] = i[7], this._inner_drawTexture(t, e, o, n, _, r, this._curMat, p, 1, !1);
            }
        }
        _fillTexture_v(t, e, i, s, r, a, n, h) {
            r <= 0 && console.error("_fillTexture_v error: orih must>0");
            for (var o = n, l = Math.floor(h / r), _ = h % r, u = 0; u < l; u++) this._inner_drawTexture(t, e, a, o, s, r, this._curMat, i, 1, !1),
                o += r;
            if (_ > 0) {
                var c = i[7] - i[1], d = i[1] + c * (_ / r), p = ae.tmpuv1;
                p[0] = i[0], p[1] = i[1], p[2] = i[2], p[3] = i[3], p[4] = i[4], p[5] = d, p[6] = i[6],
                    p[7] = d, this._inner_drawTexture(t, e, a, o, s, _, this._curMat, p, 1, !1);
            }
        }
        drawTextureWithSizeGrid(t, e, i, s, r, a, n, h) {
            if (t._getSource()) {
                e += n, i += h;
                var o = t.uv, l = t.bitmap.width, _ = t.bitmap.height, u = a[0], c = a[3], d = a[1], p = a[2], f = a[4], g = !1;
                s == l && (c = d = 0), r == _ && (u = p = 0);
                var m = u / _, v = c / l, T = d / l, x = p / _;
                if (c + d > s) {
                    var y = s;
                    g = !0, s = c + d, this.save(), this.clipRect(0 + e, 0 + i, y, r);
                }
                var E = t.bitmap.id, b = this._curMat, w = this._tempUV, C = o[0], A = o[1], R = o[4], M = o[5], S = C, I = A, P = R, L = M;
                if (c && u && (P = C + v, L = A + m, w[0] = C, w[1] = A, w[2] = P, w[3] = A, w[4] = P,
                    w[5] = L, w[6] = C, w[7] = L, this._inner_drawTexture(t, E, e, i, c, u, b, w, 1, !1)),
                    d && u && (S = R - T, I = A, P = R, L = A + m, w[0] = S, w[1] = I, w[2] = P, w[3] = I,
                        w[4] = P, w[5] = L, w[6] = S, w[7] = L, this._inner_drawTexture(t, E, s - d + e, 0 + i, d, u, b, w, 1, !1)),
                    c && p && (S = C, I = M - x, P = C + v, L = M, w[0] = S, w[1] = I, w[2] = P, w[3] = I,
                        w[4] = P, w[5] = L, w[6] = S, w[7] = L, this._inner_drawTexture(t, E, 0 + e, r - p + i, c, p, b, w, 1, !1)),
                    d && p && (S = R - T, I = M - x, P = R, L = M, w[0] = S, w[1] = I, w[2] = P, w[3] = I,
                        w[4] = P, w[5] = L, w[6] = S, w[7] = L, this._inner_drawTexture(t, E, s - d + e, r - p + i, d, p, b, w, 1, !1)),
                    u && (S = C + v, I = A, P = R - T, L = A + m, w[0] = S, w[1] = I, w[2] = P, w[3] = I,
                        w[4] = P, w[5] = L, w[6] = S, w[7] = L, f ? this._fillTexture_h(t, E, w, t.width - c - d, u, c + e, i, s - c - d) : this._inner_drawTexture(t, E, c + e, i, s - c - d, u, b, w, 1, !1)),
                    p && (S = C + v, I = M - x, P = R - T, L = M, w[0] = S, w[1] = I, w[2] = P, w[3] = I,
                        w[4] = P, w[5] = L, w[6] = S, w[7] = L, f ? this._fillTexture_h(t, E, w, t.width - c - d, p, c + e, r - p + i, s - c - d) : this._inner_drawTexture(t, E, c + e, r - p + i, s - c - d, p, b, w, 1, !1)),
                    c && (S = C, I = A + m, P = C + v, L = M - x, w[0] = S, w[1] = I, w[2] = P, w[3] = I,
                        w[4] = P, w[5] = L, w[6] = S, w[7] = L, f ? this._fillTexture_v(t, E, w, c, t.height - u - p, e, u + i, r - u - p) : this._inner_drawTexture(t, E, e, u + i, c, r - u - p, b, w, 1, !1)),
                    d && (S = R - T, I = A + m, P = R, L = M - x, w[0] = S, w[1] = I, w[2] = P, w[3] = I,
                        w[4] = P, w[5] = L, w[6] = S, w[7] = L, f ? this._fillTexture_v(t, E, w, d, t.height - u - p, s - d + e, u + i, r - u - p) : this._inner_drawTexture(t, E, s - d + e, u + i, d, r - u - p, b, w, 1, !1)),
                    S = C + v, I = A + m, P = R - T, L = M - x, w[0] = S, w[1] = I, w[2] = P, w[3] = I,
                    w[4] = P, w[5] = L, w[6] = S, w[7] = L, f) {
                    var D = ae.tmpUVRect;
                    D[0] = S, D[1] = I, D[2] = P - S, D[3] = L - I, this._fillTexture(t, t.width - c - d, t.height - u - p, D, c + e, u + i, s - c - d, r - u - p, "repeat", 0, 0);
                } else this._inner_drawTexture(t, E, c + e, u + i, s - c - d, r - u - p, b, w, 1, !1);
                g && this.restore();
            }
        }
    }
    ae.ENUM_TEXTALIGN_DEFAULT = 0, ae.ENUM_TEXTALIGN_CENTER = 1, ae.ENUM_TEXTALIGN_RIGHT = 2,
        ae._SUBMITVBSIZE = 32e3, ae._MAXSIZE = 99999999, ae._MAXVERTNUM = 65535, ae.MAXCLIPRECT = null,
        ae._COUNT = 0, ae.SEGNUM = 32, ae._contextcount = 0, ae.PI2 = 2 * Math.PI, ae._textRender = null,
        ae.tmpuv1 = [0, 0, 0, 0, 0, 0, 0, 0], ae.tmpUV = [0, 0, 0, 0, 0, 0, 0, 0], ae.tmpUVRect = [0, 0, 0, 0];
    class ne {
        constructor() {
            this.lineWidth = 1;
        }
        clear() {
            this.lineWidth = 1, this.textAlign = this.textBaseline = null;
        }
        make() {
            return this === ne.DEFAULT ? new ne() : this;
        }
    }
    class he {
        static _uint8ArraySlice() {
            for (var t = this.length, e = new Uint8Array(this.length), i = 0; i < t; i++) e[i] = this[i];
            return e;
        }
        static _float32ArraySlice() {
            for (var t = this.length, e = new Float32Array(this.length), i = 0; i < t; i++) e[i] = this[i];
            return e;
        }
        static _uint16ArraySlice(...t) {
            var e, i, s;
            if (0 === t.length) for (e = this.length, i = new Uint16Array(e), s = 0; s < e; s++) i[s] = this[s]; else if (2 === t.length) {
                var r = t[0], a = t[1];
                if (a > r) for (e = a - r, i = new Uint16Array(e), s = r; s < a; s++) i[s - r] = this[s]; else i = new Uint16Array(0);
            }
            return i;
        }
        static _nativeRender_enable() { }
        static enable() {
            return !0;
        }
        static inner_enable() {
            return Float32Array.prototype.slice || (Float32Array.prototype.slice = he._float32ArraySlice),
                Uint16Array.prototype.slice || (Uint16Array.prototype.slice = he._uint16ArraySlice),
                Uint8Array.prototype.slice || (Uint8Array.prototype.slice = he._uint8ArraySlice),
                !0;
        }
        static onStageResize(t, e) {
            null != v.mainContext && (v.mainContext.viewport(0, 0, t, e), O.width = t, O.height = e);
        }
    }
    he._isWebGL2 = !1, he.isNativeRender_enable = !1;
    !function () {
        var t = {};
        function synthesizeGLError(e, i) {
            var s;
            t[e] = !0, void 0 !== i && (s = i, window.console && window.console.error && window.console.error(s));
        }
        var e = function WebGLVertexArrayObjectOES(t) {
            var e = t.gl;
            this.ext = t, this.isAlive = !0, this.hasBeenBound = !1, this.elementArrayBuffer = null,
                this.attribs = new Array(t.maxVertexAttribs);
            for (var i = 0; i < this.attribs.length; i++) {
                var s = new WebGLVertexArrayObjectOES.VertexAttrib(e);
                this.attribs[i] = s;
            }
            this.maxAttrib = 0;
        };
        (e.VertexAttrib = function (t) {
            this.enabled = !1, this.buffer = null, this.size = 4, this.type = t.FLOAT, this.normalized = !1,
                this.stride = 16, this.offset = 0, this.cached = "", this.recache();
        }).prototype.recache = function () {
            this.cached = [this.size, this.type, this.normalized, this.stride, this.offset].join(":");
        };
        var i = function (e) {
            var i = this;
            this.gl = e, function (e) {
                var i = e.getError;
                e.getError = function () {
                    var s;
                    do {
                        (s = i.apply(e)) != e.NO_ERROR && (t[s] = !0);
                    } while (s != e.NO_ERROR);
                    for (var r in t) if (t[r]) return delete t[r], parseInt(r);
                    return e.NO_ERROR;
                };
            }(e);
            var s = this.original = {
                getParameter: e.getParameter,
                enableVertexAttribArray: e.enableVertexAttribArray,
                disableVertexAttribArray: e.disableVertexAttribArray,
                bindBuffer: e.bindBuffer,
                getVertexAttrib: e.getVertexAttrib,
                vertexAttribPointer: e.vertexAttribPointer
            };
            e.getParameter = function (t) {
                return t == i.VERTEX_ARRAY_BINDING_OES ? i.currentVertexArrayObject == i.defaultVertexArrayObject ? null : i.currentVertexArrayObject : s.getParameter.apply(this, arguments);
            }, e.enableVertexAttribArray = function (t) {
                var e = i.currentVertexArrayObject;
                return e.maxAttrib = Math.max(e.maxAttrib, t), e.attribs[t].enabled = !0, s.enableVertexAttribArray.apply(this, arguments);
            }, e.disableVertexAttribArray = function (t) {
                var e = i.currentVertexArrayObject;
                return e.maxAttrib = Math.max(e.maxAttrib, t), e.attribs[t].enabled = !1, s.disableVertexAttribArray.apply(this, arguments);
            }, e.bindBuffer = function (t, r) {
                switch (t) {
                    case e.ARRAY_BUFFER:
                        i.currentArrayBuffer = r;
                        break;

                    case e.ELEMENT_ARRAY_BUFFER:
                        i.currentVertexArrayObject.elementArrayBuffer = r;
                }
                return s.bindBuffer.apply(this, arguments);
            }, e.getVertexAttrib = function (t, r) {
                var a = i.currentVertexArrayObject.attribs[t];
                switch (r) {
                    case e.VERTEX_ATTRIB_ARRAY_BUFFER_BINDING:
                        return a.buffer;

                    case e.VERTEX_ATTRIB_ARRAY_ENABLED:
                        return a.enabled;

                    case e.VERTEX_ATTRIB_ARRAY_SIZE:
                        return a.size;

                    case e.VERTEX_ATTRIB_ARRAY_STRIDE:
                        return a.stride;

                    case e.VERTEX_ATTRIB_ARRAY_TYPE:
                        return a.type;

                    case e.VERTEX_ATTRIB_ARRAY_NORMALIZED:
                        return a.normalized;

                    default:
                        return s.getVertexAttrib.apply(this, arguments);
                }
            }, e.vertexAttribPointer = function (t, e, r, a, n, h) {
                var o = i.currentVertexArrayObject;
                o.maxAttrib = Math.max(o.maxAttrib, t);
                var l = o.attribs[t];
                return l.buffer = i.currentArrayBuffer, l.size = e, l.type = r, l.normalized = a,
                    l.stride = n, l.offset = h, l.recache(), s.vertexAttribPointer.apply(this, arguments);
            }, e.instrumentExtension && e.instrumentExtension(this, "OES_vertex_array_object"),
                e.canvas.addEventListener("webglcontextrestored", function () {
                    var t;
                    t = "OESVertexArrayObject emulation library context restored", window.console && window.console.log && window.console.log(t),
                        i.reset_();
                }, !0), this.reset_();
        };
        i.prototype.VERTEX_ARRAY_BINDING_OES = 34229, i.prototype.reset_ = function () {
            if (void 0 !== this.vertexArrayObjects) for (var t = 0; t < this.vertexArrayObjects.length; ++t) this.vertexArrayObjects.isAlive = !1;
            var i = this.gl;
            this.maxVertexAttribs = i.getParameter(i.MAX_VERTEX_ATTRIBS), this.defaultVertexArrayObject = new e(this),
                this.currentVertexArrayObject = null, this.currentArrayBuffer = null, this.vertexArrayObjects = [this.defaultVertexArrayObject],
                this.bindVertexArrayOES(null);
        }, i.prototype.createVertexArrayOES = function () {
            var t = new e(this);
            return this.vertexArrayObjects.push(t), t;
        }, i.prototype.deleteVertexArrayOES = function (t) {
            t.isAlive = !1, this.vertexArrayObjects.splice(this.vertexArrayObjects.indexOf(t), 1),
                this.currentVertexArrayObject == t && this.bindVertexArrayOES(null);
        }, i.prototype.isVertexArrayOES = function (t) {
            return !!(t && t instanceof e && t.hasBeenBound && t.ext == this);
        }, i.prototype.bindVertexArrayOES = function (t) {
            var e = this.gl;
            if (!t || t.isAlive) {
                var i = this.original, s = this.currentVertexArrayObject;
                this.currentVertexArrayObject = t || this.defaultVertexArrayObject, this.currentVertexArrayObject.hasBeenBound = !0;
                var r = this.currentVertexArrayObject;
                if (s != r) {
                    s && r.elementArrayBuffer == s.elementArrayBuffer || i.bindBuffer.call(e, e.ELEMENT_ARRAY_BUFFER, r.elementArrayBuffer);
                    for (var a = this.currentArrayBuffer, n = Math.max(s ? s.maxAttrib : 0, r.maxAttrib), h = 0; h <= n; h++) {
                        var o = r.attribs[h], l = s ? s.attribs[h] : null;
                        if (s && o.enabled == l.enabled || (o.enabled ? i.enableVertexAttribArray.call(e, h) : i.disableVertexAttribArray.call(e, h)),
                            o.enabled) {
                            var _ = !1;
                            s && o.buffer == l.buffer || (a != o.buffer && (i.bindBuffer.call(e, e.ARRAY_BUFFER, o.buffer),
                                a = o.buffer), _ = !0), (_ || o.cached != l.cached) && i.vertexAttribPointer.call(e, h, o.size, o.type, o.normalized, o.stride, o.offset);
                        }
                    }
                    this.currentArrayBuffer != a && i.bindBuffer.call(e, e.ARRAY_BUFFER, this.currentArrayBuffer);
                }
            } else synthesizeGLError(e.INVALID_OPERATION, "bindVertexArrayOES: attempt to bind deleted arrayObject");
        }, window._setupVertexArrayObject = function (t) {
            var e = t.getSupportedExtensions;
            t.getSupportedExtensions = function () {
                var t = e.call(this) || [];
                return t.indexOf("OES_vertex_array_object") < 0 && t.push("OES_vertex_array_object"),
                    t;
            };
            var s = t.getExtension;
            t.getExtension = function (t) {
                var e = s.call(this, t);
                return e || ("OES_vertex_array_object" !== t ? null : (this.__OESVertexArrayObject || (console.log("Setup OES_vertex_array_object polyfill"),
                    this.__OESVertexArrayObject = new i(this)), this.__OESVertexArrayObject));
            };
        };
    }();
    class oe {
        constructor(t, e) {
            this._gl = null, this._vaoExt = null, this._angleInstancedArrays = null, this._isWebGL2 = !1,
                this._oesTextureHalfFloat = null, this._oes_element_index_uint = null, this._oesTextureHalfFloatLinear = null,
                this._oesTextureFloat = null, this._extShaderTextureLod = null, this._extTextureFilterAnisotropic = null,
                this._compressedTextureS3tc = null, this._compressedTexturePvrtc = null, this._compressedTextureEtc1 = null,
                this._webgl_depth_texture = null, this._extColorBufferFloat = null, this._gl = t,
                this._isWebGL2 = e;
            var s = t.getParameter(t.MAX_TEXTURE_IMAGE_UNITS), r = t.getParameter(t.MAX_TEXTURE_SIZE);
            e ? (this._extColorBufferFloat = this._getExtension("EXT_color_buffer_float"), L._shaderCapailityLevel = 35) : (i.Render.isConchApp || window._setupVertexArrayObject && window._setupVertexArrayObject(t),
                this._vaoExt = this._getExtension("OES_vertex_array_object"), this._angleInstancedArrays = this._getExtension("ANGLE_instanced_arrays"),
                this._oesTextureHalfFloat = this._getExtension("OES_texture_half_float"), this._oesTextureHalfFloatLinear = this._getExtension("OES_texture_half_float_linear"),
                this._oesTextureFloat = this._getExtension("OES_texture_float"), this._oes_element_index_uint = this._getExtension("OES_element_index_uint"),
                this._extShaderTextureLod = this._getExtension("EXT_shader_texture_lod"), this._webgl_depth_texture = this._getExtension("WEBGL_depth_texture"),
                L._shaderCapailityLevel = 30), this._extTextureFilterAnisotropic = this._getExtension("EXT_texture_filter_anisotropic"),
                this._compressedTextureS3tc = this._getExtension("WEBGL_compressed_texture_s3tc"),
                this._compressedTexturePvrtc = this._getExtension("WEBGL_compressed_texture_pvrtc"),
                this._compressedTextureEtc1 = this._getExtension("WEBGL_compressed_texture_etc1"),
                L._maxTextureCount = s, L._maxTextureSize = r;
        }
        _getExtension(t) {
            var e = oe._extentionVendorPrefixes;
            for (var i in e) {
                var s = this._gl.getExtension(e[i] + t);
                if (s) return s;
            }
            return null;
        }
        createVertexArray() {
            return this._isWebGL2 ? this._gl.createVertexArray() : this._vaoExt.createVertexArrayOES();
        }
        bindVertexArray(t) {
            this._isWebGL2 ? this._gl.bindVertexArray(t) : this._vaoExt.bindVertexArrayOES(t);
        }
        deleteVertexArray(t) {
            this._isWebGL2 ? this._gl.deleteVertexArray(t) : this._vaoExt.deleteVertexArrayOES(t);
        }
        isVertexArray(t) {
            this._isWebGL2 ? this._gl.isVertexArray(t) : this._vaoExt.isVertexArrayOES(t);
        }
        drawElementsInstanced(t, e, i, s, r) {
            this._isWebGL2 ? this._gl.drawElementsInstanced(t, e, i, s, r) : this._angleInstancedArrays.drawElementsInstancedANGLE(t, e, i, s, r);
        }
        drawArraysInstanced(t, e, i, s) {
            this._isWebGL2 ? this._gl.drawArraysInstanced(t, e, i, s) : this._angleInstancedArrays.drawArraysInstancedANGLE(t, e, i, s);
        }
        vertexAttribDivisor(t, e) {
            this._isWebGL2 ? this._gl.vertexAttribDivisor(t, e) : this._angleInstancedArrays.vertexAttribDivisorANGLE(t, e);
        }
        supportInstance() {
            return !(!this._isWebGL2 && !this._angleInstancedArrays || !e.allowGPUInstanceDynamicBatch);
        }
        supportElementIndexUint32() {
            return !(!this._isWebGL2 && !this._oes_element_index_uint);
        }
    }
    oe._extentionVendorPrefixes = ["", "WEBKIT_", "MOZ_"];
    class le {
        constructor(t, e, s) {
            this._timeId = 0, le._mainCanvas = s;
            let r = le._mainCanvas.source;
            r.id = "layaCanvas", r.width = t, r.height = e, le.isConchApp && document.body.appendChild(r),
                this.initRender(le._mainCanvas, t, e), window.requestAnimationFrame(function loop(t) {
                    i.stage._loop();
                    window.requestAnimationFrame(loop);
                }), i.stage.on("visibilitychange", this, this._onVisibilitychange);
        }
        _onVisibilitychange() {
            i.stage.isVisibility ? 0 != this._timeId && window.clearInterval(this._timeId) : this._timeId = window.setInterval(this._enterFrame, 1e3);
        }
        initRender(t, i, s) {
            var r = m.instance = v.mainContext = function (t) {
                var i, s = ["webgl2", "webgl", "experimental-webgl", "webkit-3d", "moz-webgl"];
                e.useWebGL2 && !ee.onBDMiniGame || s.shift();
                for (var r = 0; r < s.length; r++) {
                    try {
                        i = t.getContext(s[r], {
                            stencil: e.isStencil,
                            alpha: e.isAlpha,
                            antialias: e.isAntialias,
                            premultipliedAlpha: e.premultipliedAlpha,
                            preserveDrawingBuffer: e.preserveDrawingBuffer
                        });
                    } catch (t) { }
                    if (i) return "webgl2" === s[r] && (he._isWebGL2 = !0), i;
                }
                return null;
            }(le._mainCanvas.source);
            if (!r) return !1;
            m.instance = r, m.layaGPUInstance = new oe(r, he._isWebGL2), t.size(i, s), ae.__init__(),
                ut.__init__();
            var a = new ae();
            return a.isMain = !0, le._context = a, t._setContext(a), W.__init__(), z.__init__(),
                Ft.__init__(), yt.__int__(r), G._init_(r), !0;
        }
        _enterFrame(t = null) {
            i.stage._loop();
        }
        static get context() {
            return le._context;
        }
        static get canvas() {
            return le._mainCanvas.source;
        }
    }
    le.supportWebGLPlusAnimation = !1, le.supportWebGLPlusRendering = !1, le.isConchApp = !1,
        le.isConchApp = null != window.conch, le.isConchApp ? le.supportWebGLPlusRendering = !1 : null != window.qq && null != window.qq.webglPlus && (le.supportWebGLPlusRendering = !1);
    class _e {
        static create(t, e, i, r, a, n, h, o, l, _, u) {
            var c = s.getItemByClass("DrawTrianglesCmd", _e);
            if (c.texture = t, c.x = e, c.y = i, c.vertices = r, c.uvs = a, c.indices = n, c.matrix = h,
                c.alpha = o, l) {
                c.color = new $();
                var d = Z.create(l).arrColor;
                c.color.color(255 * d[0], 255 * d[1], 255 * d[2], 255 * d[3]);
            }
            return c.blendMode = _, c.colorNum = u, c;
        }
        recover() {
            this.texture = null, this.vertices = null, this.uvs = null, this.indices = null,
                this.matrix = null, s.recover("DrawTrianglesCmd", this);
        }
        run(t, e, i) {
            t.drawTriangles(this.texture, this.x + e, this.y + i, this.vertices, this.uvs, this.indices, this.matrix, this.alpha, this.color, this.blendMode, this.colorNum);
        }
        get cmdID() {
            return _e.ID;
        }
    }
    _e.ID = "DrawTriangles";
    class ue {
        constructor() { }
        static create(t, e, i, r, a, n) {
            var h = s.getItemByClass("Draw9GridTexture", ue);
            return h.texture = t, t._addReference(), h.x = e, h.y = i, h.width = r, h.height = a,
                h.sizeGrid = n, h;
        }
        recover() {
            this.texture._removeReference(), s.recover("Draw9GridTexture", this);
        }
        run(t, e, i) {
            t.drawTextureWithSizeGrid(this.texture, this.x, this.y, this.width, this.height, this.sizeGrid, e, i);
        }
        get cmdID() {
            return ue.ID;
        }
    }
    ue.ID = "Draw9GridTexture";
    class ce {
        static create() {
            return s.getItemByClass("SaveCmd", ce);
        }
        recover() {
            s.recover("SaveCmd", this);
        }
        run(t, e, i) {
            t.save();
        }
        get cmdID() {
            return ce.ID;
        }
    }
    ce.ID = "Save";
    class de {
        constructor() {
            this._cacheBoundsType = !1;
        }
        destroy() {
            this._graphics = null, this._cacheBoundsType = !1, this._temp && (this._temp.length = 0),
                this._rstBoundPoints && (this._rstBoundPoints.length = 0), this._bounds && this._bounds.recover(),
                this._bounds = null, s.recover("GraphicsBounds", this);
        }
        static create() {
            return s.getItemByClass("GraphicsBounds", de);
        }
        reset() {
            this._temp && (this._temp.length = 0);
        }
        getBounds(t = !1) {
            return (!this._bounds || !this._temp || this._temp.length < 1 || t != this._cacheBoundsType) && (this._bounds = g._getWrapRec(this.getBoundPoints(t), this._bounds)),
                this._cacheBoundsType = t, this._bounds;
        }
        getBoundPoints(t = !1) {
            return (!this._temp || this._temp.length < 1 || t != this._cacheBoundsType) && (this._temp = this._getCmdPoints(t)),
                this._cacheBoundsType = t, this._rstBoundPoints = Q.copyArray(this._rstBoundPoints, this._temp);
        }
        _getCmdPoints(t = !1) {
            var e, i = this._graphics.cmds;
            if ((e = this._temp || (this._temp = [])).length = 0, i || null == this._graphics._one || (de._tempCmds.length = 0,
                de._tempCmds.push(this._graphics._one), i = de._tempCmds), !i) return e;
            var s = de._tempMatrixArrays;
            s.length = 0;
            var p = de._initMatrix;
            p.identity();
            for (var f, m, v = de._tempMatrix, T = 0, x = i.length; T < x; T++) switch ((f = i[T]).cmdID) {
                case r.ID:
                case ce.ID:
                    s.push(p), p = p.clone();
                    break;

                case et.ID:
                    p = s.pop();
                    break;

                case st.ID:
                    v.identity(), v.translate(-f.pivotX, -f.pivotY), v.scale(f.scaleX, f.scaleY), v.translate(f.pivotX, f.pivotY),
                        this._switchMatrix(p, v);
                    break;

                case it.ID:
                    v.identity(), v.translate(-f.pivotX, -f.pivotY), v.rotate(f.angle), v.translate(f.pivotX, f.pivotY),
                        this._switchMatrix(p, v);
                    break;

                case at.ID:
                    v.identity(), v.translate(f.tx, f.ty), this._switchMatrix(p, v);
                    break;

                case rt.ID:
                    v.identity(), v.translate(-f.pivotX, -f.pivotY), v.concat(f.matrix), v.translate(f.pivotX, f.pivotY),
                        this._switchMatrix(p, v);
                    break;

                case h.ID:
                case tt.ID:
                    de._addPointArrToRst(e, g._getBoundPointS(f.x, f.y, f.width, f.height), p);
                    break;

                case J.ID:
                    p.copyTo(v), f.matrix && v.concat(f.matrix), de._addPointArrToRst(e, g._getBoundPointS(f.x, f.y, f.width, f.height), v);
                    break;

                case h.ID:
                    if (m = f.texture, t) f.width && f.height ? de._addPointArrToRst(e, g._getBoundPointS(f.x, f.y, f.width, f.height), p) : de._addPointArrToRst(e, g._getBoundPointS(f.x, f.y, m.width, m.height), p); else {
                        var y = (f.width || m.sourceWidth) / m.width, E = (f.height || m.sourceHeight) / m.height, b = y * m.sourceWidth, w = E * m.sourceHeight, C = m.offsetX > 0 ? m.offsetX : 0, A = m.offsetY > 0 ? m.offsetY : 0;
                        C *= y, A *= E, de._addPointArrToRst(e, g._getBoundPointS(f.x - C, f.y - A, b, w), p);
                    }
                    break;

                case tt.ID:
                    f.width && f.height ? de._addPointArrToRst(e, g._getBoundPointS(f.x, f.y, f.width, f.height), p) : (m = f.texture,
                        de._addPointArrToRst(e, g._getBoundPointS(f.x, f.y, m.width, m.height), p));
                    break;

                case J.ID:
                    var R;
                    f.matrix ? (p.copyTo(v), v.concat(f.matrix), R = v) : R = p, t ? f.width && f.height ? de._addPointArrToRst(e, g._getBoundPointS(f.x, f.y, f.width, f.height), R) : (m = f.texture,
                        de._addPointArrToRst(e, g._getBoundPointS(f.x, f.y, m.width, m.height), R)) : (m = f.texture,
                            y = (f.width || m.sourceWidth) / m.width, E = (f.height || m.sourceHeight) / m.height,
                            b = y * m.sourceWidth, w = E * m.sourceHeight, C = m.offsetX > 0 ? m.offsetX : 0,
                            A = m.offsetY > 0 ? m.offsetY : 0, C *= y, A *= E, de._addPointArrToRst(e, g._getBoundPointS(f.x - C, f.y - A, b, w), R));
                    break;

                case d.ID:
                    de._addPointArrToRst(e, g._getBoundPointS(f.x, f.y, f.width, f.height), p);
                    break;

                case a.ID:
                    de._addPointArrToRst(e, g._getBoundPointS(f.x - f.radius, f.y - f.radius, f.radius + f.radius, f.radius + f.radius), p);
                    break;

                case o.ID:
                    var M;
                    de._tempPoints.length = 0, M = .5 * f.lineWidth, f.fromX == f.toX ? de._tempPoints.push(f.fromX + M, f.fromY, f.toX + M, f.toY, f.fromX - M, f.fromY, f.toX - M, f.toY) : f.fromY == f.toY ? de._tempPoints.push(f.fromX, f.fromY + M, f.toX, f.toY + M, f.fromX, f.fromY - M, f.toX, f.toY - M) : de._tempPoints.push(f.fromX, f.fromY, f.toX, f.toY),
                        de._addPointArrToRst(e, de._tempPoints, p);
                    break;

                case n.ID:
                    de._addPointArrToRst(e, nt.I.getBezierPoints(f.points), p, f.x, f.y);
                    break;

                case l.ID:
                case c.ID:
                    de._addPointArrToRst(e, f.points, p, f.x, f.y);
                    break;

                case _.ID:
                    de._addPointArrToRst(e, this._getPathPoints(f.paths), p, f.x, f.y);
                    break;

                case u.ID:
                    de._addPointArrToRst(e, this._getPiePoints(f.x, f.y, f.radius, f.startAngle, f.endAngle), p);
                    break;

                case _e.ID:
                    de._addPointArrToRst(e, this._getTriAngBBXPoints(f.vertices), p);
                    break;

                case ue.ID:
                    de._addPointArrToRst(e, this._getDraw9GridBBXPoints(f), p);
            }
            return e.length > 200 ? e = Q.copyArray(e, g._getWrapRec(e)._getBoundPoints()) : e.length > 8 && (e = ht.scanPList(e)),
                e;
        }
        _switchMatrix(t, e) {
            e.concat(t), e.copyTo(t);
        }
        static _addPointArrToRst(t, e, i, s = 0, r = 0) {
            var a, n;
            for (n = e.length, a = 0; a < n; a += 2) de._addPointToRst(t, e[a] + s, e[a + 1] + r, i);
        }
        static _addPointToRst(t, e, i, s) {
            var r = f.TEMP;
            r.setTo(e || 0, i || 0), s.transformPoint(r), t.push(r.x, r.y);
        }
        _getPiePoints(t, e, i, s, r) {
            var a = de._tempPoints;
            de._tempPoints.length = 0;
            var n = Math.PI / 180, h = r - s;
            if (h >= 360 || h <= -360) return a.push(t - i, e - i), a.push(t + i, e - i), a.push(t + i, e + i),
                a.push(t - i, e + i), a;
            a.push(t, e);
            var o = h % 360;
            o < 0 && (o += 360);
            var l = s + o, _ = s * n, u = l * n;
            a.push(t + i * Math.cos(_), e + i * Math.sin(_)), a.push(t + i * Math.cos(u), e + i * Math.sin(u));
            for (var c = 90 * Math.ceil(s / 90), d = 90 * Math.floor(l / 90), p = c; p <= d; p += 90) {
                var f = p * n;
                a.push(t + i * Math.cos(f), e + i * Math.sin(f));
            }
            return a;
        }
        _getTriAngBBXPoints(t) {
            var e = t.length;
            if (e < 2) return [];
            for (var i = t[0], s = t[1], r = i, a = s, n = 2; n < e;) {
                var h = t[n++], o = t[n++];
                i > h && (i = h), s > o && (s = o), r < h && (r = h), a < o && (a = o);
            }
            return [i, s, r, s, r, a, i, a];
        }
        _getDraw9GridBBXPoints(t) {
            var e = t.width, i = t.height;
            return [0, 0, e, 0, e, i, 0, i];
        }
        _getPathPoints(t) {
            var e, i, s, r = de._tempPoints;
            for (r.length = 0, i = t.length, e = 0; e < i; e++) (s = t[e]).length > 1 && (r.push(s[1], s[2]),
                s.length > 3 && r.push(s[3], s[4]));
            return r;
        }
    }
    de._tempMatrix = new p(), de._initMatrix = new p(), de._tempPoints = [], de._tempMatrixArrays = [],
        de._tempCmds = [];
    class pe { }
    pe.ALPHA = 1, pe.TRANSFORM = 2, pe.BLEND = 4, pe.CANVAS = 8, pe.FILTERS = 16, pe.MASK = 32,
        pe.CLIP = 64, pe.STYLE = 128, pe.TEXTURE = 256, pe.GRAPHICS = 512, pe.LAYAGL3D = 1024,
        pe.CUSTOM = 2048, pe.ONECHILD = 4096, pe.CHILDS = 8192, pe.REPAINT_NONE = 0, pe.REPAINT_NODE = 1,
        pe.REPAINT_CACHE = 2, pe.REPAINT_ALL = 3;
    class fe {
        static create(t, e, i, r) {
            var a = s.getItemByClass("ClipRectCmd", fe);
            return a.x = t, a.y = e, a.width = i, a.height = r, a;
        }
        recover() {
            s.recover("ClipRectCmd", this);
        }
        run(t, e, i) {
            t.clipRect(this.x + e, this.y + i, this.width, this.height);
        }
        get cmdID() {
            return fe.ID;
        }
    }
    fe.ID = "ClipRect";
    class ge {
        static create(t, e) {
            var i = s.getItemByClass("DrawTexturesCmd", ge);
            return i.texture = t, t._addReference(), i.pos = e, i;
        }
        recover() {
            this.texture._removeReference(), this.texture = null, this.pos = null, s.recover("DrawTexturesCmd", this);
        }
        run(t, e, i) {
            t.drawTextures(this.texture, this.pos, e, i);
        }
        get cmdID() {
            return ge.ID;
        }
    }
    ge.ID = "DrawTextures";
    class me {
        constructor() {
            this._textIsWorldText = !1, this._fontColor = 4294967295, this._strokeColor = 0,
                this._fontObj = me._defFontObj, this._nTexAlign = 0;
        }
        static create(t, e, i, r, a, n, h, o, l) {
            var _ = s.getItemByClass("FillTextCmd", me);
            return _.text = t, _._textIsWorldText = t instanceof $t, _._words = e, _.x = i,
                _.y = r, _.font = a, _.color = n, _.textAlign = h, _._lineWidth = o, _._borderColor = l,
                _;
        }
        recover() {
            s.recover("FillTextCmd", this);
        }
        run(t, e, s) {
            i.stage.isGlobalRepaint() && this._textIsWorldText && this._text.cleanCache(), this._words ? ae._textRender.fillWords(t, this._words, this.x + e, this.y + s, this._fontObj, this._color, this._borderColor, this._lineWidth) : this._textIsWorldText ? t._fast_filltext(this._text, this.x + e, this.y + s, this._fontObj, this._color, this._borderColor, this._lineWidth, this._nTexAlign, 0) : ae._textRender.filltext(t, this._text, this.x + e, this.y + s, this.font, this.color, this._borderColor, this._lineWidth, this._textAlign);
        }
        get cmdID() {
            return me.ID;
        }
        get text() {
            return this._text;
        }
        set text(t) {
            this._text = t, this._textIsWorldText = t instanceof $t, this._textIsWorldText && this._text.cleanCache();
        }
        get font() {
            return this._font;
        }
        set font(t) {
            this._font = t, this._fontObj = Zt.Parse(t), this._textIsWorldText && this._text.cleanCache();
        }
        get color() {
            return this._color;
        }
        set color(t) {
            this._color = t, this._fontColor = Z.create(t).numColor, this._textIsWorldText && this._text.cleanCache();
        }
        get textAlign() {
            return this._textAlign;
        }
        set textAlign(t) {
            switch (this._textAlign = t, t) {
                case "center":
                    this._nTexAlign = i.Context.ENUM_TEXTALIGN_CENTER;
                    break;

                case "right":
                    this._nTexAlign = i.Context.ENUM_TEXTALIGN_RIGHT;
                    break;

                default:
                    this._nTexAlign = i.Context.ENUM_TEXTALIGN_DEFAULT;
            }
            this._textIsWorldText && this._text.cleanCache();
        }
    }
    me.ID = "FillText", me._defFontObj = new Zt(null);
    class ve {
        constructor() { }
        static regCacheByFunction(t, e) {
            var i;
            ve.unRegCacheByFunction(t, e), i = {
                tryDispose: t,
                getCacheList: e
            }, ve._cacheList.push(i);
        }
        static unRegCacheByFunction(t, e) {
            var i, s;
            for (s = ve._cacheList.length, i = 0; i < s; i++) if (ve._cacheList[i].tryDispose == t && ve._cacheList[i].getCacheList == e) return void ve._cacheList.splice(i, 1);
        }
        static forceDispose() {
            var t, e = ve._cacheList.length;
            for (t = 0; t < e; t++) ve._cacheList[t].tryDispose(!0);
        }
        static beginCheck(t = 15e3) {
            i.systemTimer.loop(t, null, ve._checkLoop);
        }
        static stopCheck() {
            i.systemTimer.clear(null, ve._checkLoop);
        }
        static _checkLoop() {
            var t = ve._cacheList;
            if (!(t.length < 1)) {
                var e, s, r = i.Browser.now();
                for (s = e = t.length; e > 0 && (ve._index++, ve._index = ve._index % s, t[ve._index].tryDispose(!1),
                    !(i.Browser.now() - r > ve.loopTimeLimit));) e--;
            }
        }
    }
    ve.loopTimeLimit = 2, ve._cacheList = [], ve._index = 0;
    class Te {
        constructor() {
            this.useDic = {}, this.shapeDic = {}, this.shapeLineDic = {}, this._id = 0, this._checkKey = !1,
                this._freeIdArray = [], ve.regCacheByFunction(this.startDispose.bind(this), this.getCacheList.bind(this));
        }
        static getInstance() {
            return Te.instance = Te.instance || new Te();
        }
        getId() {
            return this._id++;
        }
        addShape(t, e) {
            this.shapeDic[t] = e, this.useDic[t] || (this.useDic[t] = !0);
        }
        addLine(t, e) {
            this.shapeLineDic[t] = e, this.shapeLineDic[t] || (this.shapeLineDic[t] = !0);
        }
        getShape(t) {
            this._checkKey && null != this.useDic[t] && (this.useDic[t] = !0);
        }
        deleteShape(t) {
            this.shapeDic[t] && (this.shapeDic[t] = null, delete this.shapeDic[t]), this.shapeLineDic[t] && (this.shapeLineDic[t] = null,
                delete this.shapeLineDic[t]), null != this.useDic[t] && delete this.useDic[t];
        }
        getCacheList() {
            var t, e = [];
            for (t in this.shapeDic) e.push(this.shapeDic[t]);
            for (t in this.shapeLineDic) e.push(this.shapeLineDic[t]);
            return e;
        }
        startDispose(t) {
            var e;
            for (e in this.useDic) this.useDic[e] = !1;
            this._checkKey = !0;
        }
        endDispose() {
            if (this._checkKey) {
                var t;
                for (t in this.useDic) this.useDic[t] || this.deleteShape(t);
                this._checkKey = !1;
            }
        }
    }
    class xe {
        constructor() {
            this._sp = null, this._one = null, this._render = this._renderEmpty, this._cmds = null,
                this._vectorgraphArray = null, this._graphicBounds = null, this.autoDestroy = !1,
                this._createData();
        }
        _createData() { }
        _clearData() { }
        _destroyData() { }
        destroy() {
            this.clear(!0), this._graphicBounds && this._graphicBounds.destroy(), this._graphicBounds = null,
                this._vectorgraphArray = null, this._sp && (this._sp._renderType = 0, this._sp._setRenderType(0),
                    this._sp = null), this._destroyData();
        }
        clear(t = !0) {
            if (t) {
                var e = this._one;
                if (this._cmds) {
                    var i, s = this._cmds.length;
                    for (i = 0; i < s; i++) (e = this._cmds[i]).recover();
                    this._cmds.length = 0;
                } else e && e.recover();
            } else this._cmds = null;
            if (this._one = null, this._render = this._renderEmpty, this._clearData(), this._sp && (this._sp._renderType &= ~pe.GRAPHICS,
                this._sp._setRenderType(this._sp._renderType)), this._repaint(), this._vectorgraphArray) {
                for (i = 0, s = this._vectorgraphArray.length; i < s; i++) Te.getInstance().deleteShape(this._vectorgraphArray[i]);
                this._vectorgraphArray.length = 0;
            }
        }
        _clearBoundsCache() {
            this._graphicBounds && this._graphicBounds.reset();
        }
        _initGraphicBounds() {
            this._graphicBounds || (this._graphicBounds = de.create(), this._graphicBounds._graphics = this);
        }
        _repaint() {
            this._clearBoundsCache(), this._sp && this._sp.repaint();
        }
        _isOnlyOne() {
            return !this._cmds || 0 === this._cmds.length;
        }
        get cmds() {
            return this._cmds;
        }
        set cmds(t) {
            this._sp && (this._sp._renderType |= pe.GRAPHICS, this._sp._setRenderType(this._sp._renderType)),
                this._cmds = t, this._render = this._renderAll, this._repaint();
        }
        getBounds(t = !1) {
            return this._initGraphicBounds(), this._graphicBounds.getBounds(t);
        }
        getBoundPoints(t = !1) {
            return this._initGraphicBounds(), this._graphicBounds.getBoundPoints(t);
        }
        drawImage(t, e = 0, i = 0, s = 0, r = 0) {
            if (!t) return null;
            if (s || (s = t.sourceWidth), r || (r = t.sourceHeight), t.getIsReady()) {
                var a = s / t.sourceWidth, n = r / t.sourceHeight;
                if (s = t.width * a, r = t.height * n, s <= 0 || r <= 0) return null;
                e += t.offsetX * a, i += t.offsetY * n;
            }
            this._sp && (this._sp._renderType |= pe.GRAPHICS, this._sp._setRenderType(this._sp._renderType));
            var o = h.create.call(this, t, e, i, s, r);
            return null == this._one ? (this._one = o, this._render = this._renderOneImg) : this._saveToCmd(null, o),
                this._repaint(), o;
        }
        drawTexture(t, e = 0, i = 0, s = 0, r = 0, a = null, n = 1, h = null, o = null, l) {
            if (!t || n < .01) return null;
            if (!t.getIsReady()) return null;
            if (s || (s = t.sourceWidth), r || (r = t.sourceHeight), t.getIsReady()) {
                var _ = s / t.sourceWidth, u = r / t.sourceHeight;
                if (s = t.width * _, r = t.height * u, s <= 0 || r <= 0) return null;
                e += t.offsetX * _, i += t.offsetY * u;
            }
            this._sp && (this._sp._renderType |= pe.GRAPHICS, this._sp._setRenderType(this._sp._renderType));
            var c = J.create.call(this, t, e, i, s, r, a, n, h, o, l);
            return this._repaint(), this._saveToCmd(null, c);
        }
        drawTextures(t, e) {
            return t ? this._saveToCmd(le._context.drawTextures, ge.create.call(this, t, e)) : null;
        }
        drawTriangles(t, e, i, s, r, a, n = null, h = 1, o = null, l = null, _) {
            return this._saveToCmd(le._context.drawTriangles, _e.create.call(this, t, e, i, s, r, a, n, h, o, l, _));
        }
        fillTexture(t, e, i, s = 0, r = 0, a = "repeat", n = null) {
            return t && t.getIsReady() ? this._saveToCmd(le._context._fillTexture, tt.create.call(this, t, e, i, s, r, a, n || f.EMPTY, {})) : null;
        }
        _saveToCmd(t, e) {
            return this._sp && (this._sp._renderType |= pe.GRAPHICS, this._sp._setRenderType(this._sp._renderType)),
                null == this._one ? (this._one = e, this._render = this._renderOne) : (this._render = this._renderAll,
                    0 === (this._cmds || (this._cmds = [])).length && this._cmds.push(this._one), this._cmds.push(e)),
                this._repaint(), e;
        }
        clipRect(t, e, i, s) {
            return this._saveToCmd(le._context.clipRect, fe.create.call(this, t, e, i, s));
        }
        fillText(t, e, s, r, a, n) {
            return this._saveToCmd(le._context.fillText, me.create.call(this, t, null, e, s, r || i.Text.defaultFontStr(), a, n, 0, ""));
        }
        fillBorderText(t, e, s, r, a, n, h, o) {
            return this._saveToCmd(le._context.fillText, me.create.call(this, t, null, e, s, r || i.Text.defaultFontStr(), a, n, h, o));
        }
        fillWords(t, e, s, r, a) {
            return this._saveToCmd(le._context.fillText, me.create.call(this, null, t, e, s, r || i.Text.defaultFontStr(), a));
        }
        fillBorderWords(t, e, s, r, a, n, h) {
            return this._saveToCmd(le._context.fillText, me.create.call(this, null, t, e, s, r || i.Text.defaultFontStr(), a, "", h, n));
        }
        strokeText(t, e, s, r, a, n, h) {
            return this._saveToCmd(le._context.fillText, me.create.call(this, t, null, e, s, r || i.Text.defaultFontStr(), null, h, n, a));
        }
        alpha(t) {
            return this._saveToCmd(le._context.alpha, r.create.call(this, t));
        }
        transform(t, e = 0, i = 0) {
            return this._saveToCmd(le._context._transform, rt.create.call(this, t, e, i));
        }
        rotate(t, e = 0, i = 0) {
            return this._saveToCmd(le._context._rotate, it.create.call(this, t, e, i));
        }
        scale(t, e, i = 0, s = 0) {
            return this._saveToCmd(le._context._scale, st.create.call(this, t, e, i, s));
        }
        translate(t, e) {
            return this._saveToCmd(le._context.translate, at.create.call(this, t, e));
        }
        save() {
            return this._saveToCmd(le._context._save, ce.create.call(this));
        }
        restore() {
            return this._saveToCmd(le._context.restore, et.create.call(this));
        }
        replaceText(t) {
            this._repaint();
            var e = this._cmds;
            if (e) {
                for (var i = e.length - 1; i > -1; i--) if (this._isTextCmd(e[i])) return e[i].text = t,
                    !0;
            } else if (this._one && this._isTextCmd(this._one)) return this._one.text = t, !0;
            return !1;
        }
        _isTextCmd(t) {
            return t.cmdID == me.ID;
        }
        replaceTextColor(t) {
            this._repaint();
            var e = this._cmds;
            if (e) for (var i = e.length - 1; i > -1; i--) this._isTextCmd(e[i]) && this._setTextCmdColor(e[i], t); else this._one && this._isTextCmd(this._one) && this._setTextCmdColor(this._one, t);
        }
        _setTextCmdColor(t, e) {
            switch (t.cmdID) {
                case me.ID:
                    t.color = e;
            }
        }
        loadImage(t, e = 0, s = 0, r = 0, a = 0, n = null) {
            var h = i.Loader.getRes(t);
            h ? h.getIsReady() ? this.drawImage(h, e, s, r, a) : h.once(qt.READY, this, this.drawImage, [h, e, s, r, a]) : ((h = new Qt()).load(t),
                i.Loader.cacheTexture(t, h), h.once(qt.READY, this, this.drawImage, [h, e, s, r, a])),
                null != n && (h.getIsReady() ? n.call(this._sp) : h.on(qt.READY, this._sp, n));
        }
        _renderEmpty(t, e, i, s) { }
        _renderAll(t, e, i, s) {
            for (var r = this._cmds, a = 0, n = r.length; a < n; a++) r[a].run(e, i, s);
        }
        _renderOne(t, e, i, s) {
            e.sprite = t, this._one.run(e, i, s);
        }
        _renderOneImg(t, e, i, s) {
            e.sprite = t, this._one.run(e, i, s);
        }
        drawLine(t, e, i, s, r, a = 1) {
            var n = a < 1 || a % 2 == 0 ? 0 : .5;
            return this._saveToCmd(le._context._drawLine, o.create.call(this, t + n, e + n, i + n, s + n, r, a, 0));
        }
        drawLines(t, e, i, s, r = 1) {
            if (!i || i.length < 4) return null;
            var a = r < 1 || r % 2 == 0 ? 0 : .5;
            return this._saveToCmd(le._context._drawLines, l.create.call(this, t + a, e + a, i, s, r, 0));
        }
        drawCurves(t, e, i, s, r = 1) {
            return this._saveToCmd(le._context.drawCurves, n.create.call(this, t, e, i, s, r));
        }
        drawRect(t, e, i, s, r, a = null, n = 1) {
            var h = n >= 1 && a ? n / 2 : 0, o = a ? n : 0;
            return this._saveToCmd(le._context.drawRect, d.create.call(this, t + h, e + h, i - o, s - o, r, a, n));
        }
        drawCircle(t, e, i, s, r = null, n = 1) {
            var h = n >= 1 && r ? n / 2 : 0;
            return this._saveToCmd(le._context._drawCircle, a.create.call(this, t, e, i - h, s, r, n, 0));
        }
        drawPie(t, e, i, s, r, a, n = null, h = 1) {
            var o = h >= 1 && n ? h / 2 : 0, l = n ? h : 0;
            return this._saveToCmd(le._context._drawPie, u.create.call(this, t + o, e + o, i - l, Q.toRadian(s), Q.toRadian(r), a, n, h, 0));
        }
        drawPoly(t, e, i, s, r = null, a = 1) {
            var n = !1;
            n = !(i.length > 6);
            var h = a >= 1 && r ? a % 2 == 0 ? 0 : .5 : 0;
            return this._saveToCmd(le._context._drawPoly, c.create.call(this, t + h, e + h, i, s, r, a, n, 0));
        }
        drawPath(t, e, i, s = null, r = null) {
            return this._saveToCmd(le._context._drawPath, _.create.call(this, t, e, i, s, r));
        }
        draw9Grid(t, e = 0, i = 0, s = 0, r = 0, a = null) {
            this._saveToCmd(null, ue.create(t, e, i, s, r, a));
        }
    }
    class ye { }
    ye.NOT_ACTIVE = 1, ye.ACTIVE_INHIERARCHY = 2, ye.AWAKED = 4, ye.NOT_READY = 8, ye.DISPLAY = 16,
        ye.HAS_ZORDER = 32, ye.HAS_MOUSE = 64, ye.DISPLAYED_INSTAGE = 128, ye.DRAWCALL_OPTIMIZE = 256;
    class Ee {
        static __init__() {
            Ee.map[pe.ALPHA | pe.TRANSFORM | pe.GRAPHICS] = Ee.alpha_transform_drawLayaGL, Ee.map[pe.ALPHA | pe.GRAPHICS] = Ee.alpha_drawLayaGL,
                Ee.map[pe.TRANSFORM | pe.GRAPHICS] = Ee.transform_drawLayaGL, Ee.map[pe.TRANSFORM | pe.CHILDS] = Ee.transform_drawNodes,
                Ee.map[pe.ALPHA | pe.TRANSFORM | pe.TEXTURE] = Ee.alpha_transform_drawTexture, Ee.map[pe.ALPHA | pe.TEXTURE] = Ee.alpha_drawTexture,
                Ee.map[pe.TRANSFORM | pe.TEXTURE] = Ee.transform_drawTexture, Ee.map[pe.GRAPHICS | pe.CHILDS] = Ee.drawLayaGL_drawNodes;
        }
        static transform_drawTexture(t, e, i, s) {
            t._style;
            var r = t.texture;
            e.saveTransform(Ee.curMat), e.transformByMatrix(t.transform, i, s);
            var a = t._width || r.sourceWidth, n = t._height || r.sourceHeight, h = a / r.sourceWidth, o = n / r.sourceHeight;
            if (a = r.width * h, n = r.height * o, a <= 0 || n <= 0) return null;
            var l = -t.pivotX + r.offsetX * h, _ = -t.pivotY + r.offsetY * o;
            e.drawTexture(r, l, _, a, n), e.restoreTransform(Ee.curMat);
        }
        static alpha_drawTexture(t, e, i, s) {
            var r, a = t._style, n = t.texture;
            if ((r = a.alpha) > .01 || t._needRepaint()) {
                var h = e.globalAlpha;
                e.globalAlpha *= r, e.drawTexture(n, i - a.pivotX + n.offsetX, s - a.pivotY + n.offsetY, t._width || n.width, t._height || n.height),
                    e.globalAlpha = h;
            }
        }
        static alpha_transform_drawTexture(t, e, i, s) {
            var r, a = t._style, n = t.texture;
            if ((r = a.alpha) > .01 || t._needRepaint()) {
                var h = e.globalAlpha;
                e.globalAlpha *= r, e.saveTransform(Ee.curMat), e.transformByMatrix(t.transform, i, s),
                    e.drawTexture(n, -a.pivotX + n.offsetX, -a.pivotY + n.offsetY, t._width || n.width, t._height || n.height),
                    e.restoreTransform(Ee.curMat), e.globalAlpha = h;
            }
        }
        static alpha_transform_drawLayaGL(t, e, i, s) {
            var r, a = t._style;
            if ((r = a.alpha) > .01 || t._needRepaint()) {
                var n = e.globalAlpha;
                e.globalAlpha *= r, e.saveTransform(Ee.curMat), e.transformByMatrix(t.transform, i, s),
                    t._graphics && t._graphics._render(t, e, -a.pivotX, -a.pivotY), e.restoreTransform(Ee.curMat),
                    e.globalAlpha = n;
            }
        }
        static alpha_drawLayaGL(t, e, i, s) {
            var r, a = t._style;
            if ((r = a.alpha) > .01 || t._needRepaint()) {
                var n = e.globalAlpha;
                e.globalAlpha *= r, t._graphics && t._graphics._render(t, e, i - a.pivotX, s - a.pivotY),
                    e.globalAlpha = n;
            }
        }
        static transform_drawLayaGL(t, e, i, s) {
            var r = t._style;
            e.saveTransform(Ee.curMat), e.transformByMatrix(t.transform, i, s), t._graphics && t._graphics._render(t, e, -r.pivotX, -r.pivotY),
                e.restoreTransform(Ee.curMat);
        }
        static transform_drawNodes(t, e, i, s) {
            var r = t._getBit(ye.DRAWCALL_OPTIMIZE) && e.drawCallOptimize(!0), a = t._style;
            e.saveTransform(Ee.curMat), e.transformByMatrix(t.transform, i, s), i = -a.pivotX,
                s = -a.pivotY;
            var n, h = t._children, o = h.length;
            if (a.viewport) {
                var l, _, u = a.viewport, c = u.x, d = u.y, p = u.right, f = u.bottom;
                for (g = 0; g < o; ++g) (n = h[g])._visible && (l = n._x) < p && l + n.width > c && (_ = n._y) < f && _ + n.height > d && n.render(e, i, s);
            } else for (var g = 0; g < o; ++g) (n = h[g])._visible && n.render(e, i, s);
            e.restoreTransform(Ee.curMat), r && e.drawCallOptimize(!1);
        }
        static drawLayaGL_drawNodes(t, e, i, s) {
            var r = t._getBit(ye.DRAWCALL_OPTIMIZE) && e.drawCallOptimize(!0), a = t._style;
            i -= a.pivotX, s -= a.pivotY, t._graphics && t._graphics._render(t, e, i, s);
            var n, h = t._children, o = h.length;
            if (a.viewport) {
                var l, _, u = a.viewport, c = u.x, d = u.y, p = u.right, f = u.bottom;
                for (g = 0; g < o; ++g) (n = h[g])._visible && (l = n._x) < p && l + n.width > c && (_ = n._y) < f && _ + n.height > d && n.render(e, i, s);
            } else for (var g = 0; g < o; ++g) (n = h[g])._visible && n.render(e, i, s);
            r && e.drawCallOptimize(!1);
        }
    }
    Ee.map = [], Ee.curMat = new p();
    class be {
        constructor(t, e) {
            if (Ee.map[t]) return this._fun = Ee.map[t], void (this._next = be.NORENDER);
            switch (this._next = e || be.NORENDER, t) {
                case 0:
                    return void (this._fun = this._no);

                case pe.ALPHA:
                    return void (this._fun = this._alpha);

                case pe.TRANSFORM:
                    return void (this._fun = this._transform);

                case pe.BLEND:
                    return void (this._fun = this._blend);

                case pe.CANVAS:
                    return void (this._fun = this._canvas);

                case pe.MASK:
                    return void (this._fun = this._mask);

                case pe.CLIP:
                    return void (this._fun = this._clip);

                case pe.STYLE:
                    return void (this._fun = this._style);

                case pe.GRAPHICS:
                    return void (this._fun = this._graphics);

                case pe.CHILDS:
                    return void (this._fun = this._children);

                case pe.CUSTOM:
                    return void (this._fun = this._custom);

                case pe.TEXTURE:
                    return void (this._fun = this._texture);

                case pe.FILTERS:
                    return void (this._fun = q._filter);

                case be.INIT:
                    return void (this._fun = be._initRenderFun);
            }
            this.onCreate(t);
        }
        static __init__() {
            var t, e, i;
            for (Ee.__init__(), i = new be(be.INIT, null), e = be.renders.length = 2 * pe.CHILDS,
                t = 0; t < e; t++) be.renders[t] = i;
            be.renders[0] = new be(0, null);
        }
        static _initRenderFun(t, e, i, s) {
            var r = t._renderType;
            (be.renders[r] = be._getTypeRender(r))._fun(t, e, i, s);
        }
        static _getTypeRender(t) {
            if (Ee.map[t]) return new be(t, null);
            for (var e = null, i = pe.CHILDS; i > 0;) i & t && (e = new be(i, e)), i >>= 1;
            return e;
        }
        onCreate(t) { }
        _style(t, e, i, s) {
            var r = t._style;
            null != r.render && r.render(t, e, i, s);
            var a = this._next;
            a._fun.call(a, t, e, i, s);
        }
        _no(t, e, i, s) { }
        _custom(t, e, i, s) {
            t.customRender(e, i, s), this._next._fun.call(this._next, t, e, 0, 0);
        }
        _clip(t, e, i, s) {
            var r = this._next;
            if (r != be.NORENDER) {
                var a = t._style.scrollRect, n = a.width, h = a.height;
                0 !== n && 0 !== h && (e.save(), e.clipRect(i, s, n, h), r._fun.call(r, t, e, i - a.x, s - a.y),
                    e.restore());
            }
        }
        _texture(t, e, i, s) {
            var r = t.texture;
            if (r._getSource()) {
                var a = t._width || r.sourceWidth, n = t._height || r.sourceHeight, h = a / r.sourceWidth, o = n / r.sourceHeight;
                if (a = r.width * h, n = r.height * o, a <= 0 || n <= 0) return;
                var l = i - t.pivotX + r.offsetX * h, _ = s - t.pivotY + r.offsetY * o;
                e.drawTexture(r, l, _, a, n);
            }
            var u = this._next;
            u != be.NORENDER && u._fun.call(u, t, e, i, s);
        }
        _graphics(t, e, i, s) {
            var r = t._style, a = t._graphics;
            a && a._render(t, e, i - r.pivotX, s - r.pivotY);
            var n = this._next;
            n != be.NORENDER && n._fun.call(n, t, e, i, s);
        }
        _image(t, e, i, s) {
            var r = t._style;
            e.drawTexture2(i, s, r.pivotX, r.pivotY, t.transform, t._graphics._one);
        }
        _image2(t, e, i, s) {
            var r = t._style;
            e.drawTexture2(i, s, r.pivotX, r.pivotY, t.transform, t._graphics._one);
        }
        _alpha(t, e, i, s) {
            var r;
            if ((r = t._style.alpha) > .01 || t._needRepaint()) {
                var a = e.globalAlpha;
                e.globalAlpha *= r;
                var n = this._next;
                n._fun.call(n, t, e, i, s), e.globalAlpha = a;
            }
        }
        _transform(t, e, i, s) {
            var r = t.transform, a = this._next;
            t._style;
            r && a != be.NORENDER ? (e.save(), e.transform(r.a, r.b, r.c, r.d, r.tx + i, r.ty + s),
                a._fun.call(a, t, e, 0, 0), e.restore()) : a != be.NORENDER && a._fun.call(a, t, e, i, s);
        }
        _children(t, e, i, s) {
            var r, a = t._style, n = t._children, h = n.length;
            i -= t.pivotX, s -= t.pivotY;
            var o = t._getBit(ye.DRAWCALL_OPTIMIZE) && e.drawCallOptimize(!0);
            if (a.viewport) {
                var l, _, u = a.viewport, c = u.x, d = u.y, p = u.right, f = u.bottom;
                for (g = 0; g < h; ++g) (r = n[g])._visible && (l = r._x) < p && l + r.width > c && (_ = r._y) < f && _ + r.height > d && r.render(e, i, s);
            } else for (var g = 0; g < h; ++g) (r = n[g])._visible && r.render(e, i, s);
            o && e.drawCallOptimize(!1);
        }
        _canvas(t, e, s, r) {
            var a = t._cacheStyle, n = this._next;
            if (a.enableCanvasRender) {
                "bitmap" === a.cacheAs ? V.canvasBitmap++ : V.canvasNormal++;
                var h = !1, o = !1;
                if (a.canvas) {
                    var l = a.canvas, _ = (l.context, l.touches);
                    if (_) for (var u = 0; u < _.length; u++) if (_[u].deleted) {
                        o = !0;
                        break;
                    }
                    h = l.isCacheValid && !l.isCacheValid();
                }
                if (t._needRepaint() || !a.canvas || o || h || i.stage.isGlobalRepaint()) if ("normal" === a.cacheAs) {
                    if (e._targets) return void n._fun.call(n, t, e, s, r);
                    this._canvas_webgl_normal_repaint(t, e);
                } else this._canvas_repaint(t, e, s, r);
                var c = a.cacheRect;
                e.drawCanvas(a.canvas, s + c.x, r + c.y, c.width, c.height);
            } else n._fun.call(n, t, e, s, r);
        }
        _canvas_repaint(t, e, i, s) {
            var r, a, n, h, o, l, _, u, c, d = t._cacheStyle, p = this._next, f = d.canvas, g = d.cacheAs;
            if (_ = (c = d._calculateCacheRect(t, g, i, s)).x, u = c.y, o = (h = d.cacheRect).width * _,
                l = h.height * u, a = h.x, n = h.y, "bitmap" === g && (o > 2048 || l > 2048)) return console.warn("cache bitmap size larger than 2048,cache ignored"),
                    d.releaseContext(), void p._fun.call(p, t, e, i, s);
            if (f || (d.createContext(), f = d.canvas), (r = f.context).sprite = t, (f.width != o || f.height != l) && f.size(o, l),
                "bitmap" === g ? r.asBitmap = !0 : "normal" === g && (r.asBitmap = !1), r.clear(),
                1 != _ || 1 != u) {
                var m = r;
                m.save(), m.scale(_, u), p._fun.call(p, t, r, -a, -n), m.restore(), t._applyFilters();
            } else m = r, p._fun.call(p, t, r, -a, -n), t._applyFilters();
            d.staticCache && (d.reCache = !1), V.canvasReCache++;
        }
        _canvas_webgl_normal_repaint(t, e) {
            var i = t._cacheStyle, s = this._next, r = i.canvas, a = i.cacheAs;
            i._calculateCacheRect(t, a, 0, 0), r || (r = new Mt(e, t), i.canvas = r);
            var n = r.context;
            r.startRec(), s._fun.call(s, t, n, t.pivotX, t.pivotY), t._applyFilters(), V.canvasReCache++,
                r.endRec();
        }
        _blend(t, e, i, s) {
            var r = t._style, a = this._next;
            r.blendMode ? (e.save(), e.globalCompositeOperation = r.blendMode, a._fun.call(a, t, e, i, s),
                e.restore()) : a._fun.call(a, t, e, i, s);
        }
        _mask(t, e, i, s) {
            var r = this._next, a = t.mask, n = e;
            if (a) {
                n.save();
                var h = n.globalCompositeOperation, o = new g();
                if (o.copyFrom(a.getBounds()), o.width = Math.round(o.width), o.height = Math.round(o.height),
                    o.x = Math.round(o.x), o.y = Math.round(o.y), o.width > 0 && o.height > 0) {
                    var l = o.width, _ = o.height, u = U.getRT(l, _);
                    n.breakNextMerge(), n.pushRT(), n.addRenderObject(j.create([n, u, l, _], be.tmpTarget, this)),
                        a.render(n, -o.x, -o.y), n.breakNextMerge(), n.popRT(), n.save();
                    let e = .1;
                    n.clipRect(i + o.x - t.getStyle().pivotX + e, s + o.y - t.getStyle().pivotY + e, l - 2 * e, _ - 2 * e),
                        r._fun.call(r, t, n, i, s), n.restore(), h = n.globalCompositeOperation, n.addRenderObject(j.create(["mask"], be.setBlendMode, this));
                    var c = z.create(W.TEXTURE2D, 0), d = Qt.INV_UV;
                    n.drawTarget(u, i + o.x - t.getStyle().pivotX, s + o.y - t.getStyle().pivotY, l, _, p.TEMP.identity(), c, d, 6),
                        n.addRenderObject(j.create([u], be.recycleTarget, this)), n.addRenderObject(j.create([h], be.setBlendMode, this));
                }
                n.restore();
            } else r._fun.call(r, t, e, i, s);
        }
        static tmpTarget(t, e, i, s) {
            e.start(), e.clear(0, 0, 0, 0);
        }
        static recycleTarget(t) {
            U.releaseRT(t);
        }
        static setBlendMode(t) {
            var e = v.mainContext;
            G.targetFns[G.TOINT[t]](e);
        }
    }
    be.INIT = 69905, be.renders = [], be.NORENDER = new be(0, null), be.tempUV = new Array(8);
    class we extends w {
        constructor(t = !1) {
            super(), this._source = t ? ee.createElement("canvas") : this, this.lock = !0;
        }
        get source() {
            return this._source;
        }
        _getSource() {
            return this._source;
        }
        clear() {
            this._ctx && (this._ctx.clear ? this._ctx.clear() : this._ctx.clearRect(0, 0, this._width, this._height)),
                this._texture && (this._texture.destroy(), this._texture = null);
        }
        destroy() {
            super.destroy(), this._setCPUMemory(0), this._ctx && this._ctx.destroy && this._ctx.destroy(),
                this._ctx = null;
        }
        release() { }
        get context() {
            return this._ctx ? this._ctx : (this._source == this ? this._ctx = new i.Context() : this._ctx = this._source.getContext(i.Render.isConchApp ? "layagl" : "2d"),
                this._ctx._canvas = this, this._ctx);
        }
        _setContext(t) {
            this._ctx = t;
        }
        getContext(t, e = null) {
            return this.context;
        }
        getMemSize() {
            return 0;
        }
        size(t, e) {
            (this._width != t || this._height != e || this._source && (this._source.width != t || this._source.height != e)) && (this._width = t,
                this._height = e, this._setCPUMemory(t * e * 4), this._ctx && this._ctx.size && this._ctx.size(t, e),
                this._source && (this._source.height = e, this._source.width = t), this._texture && (this._texture.destroy(),
                    this._texture = null));
        }
        getTexture() {
            if (!this._texture) {
                var t = new B();
                t.loadImageSource(this.source), this._texture = new Qt(t);
            }
            return this._texture;
        }
        toBase64(t, e) {
            if (this._source) {
                if (i.Render.isConchApp) {
                    var s = window;
                    if (2 == s.conchConfig.threadMode) throw "native 2 thread mode use toBase64Async";
                    var r = this._ctx._targets.sourceWidth, a = this._ctx._targets.sourceHeight, n = this._ctx._targets.getData(0, 0, r, a);
                    return s.conchToBase64FlipY ? s.conchToBase64FlipY(t, e, n.buffer, r, a) : s.conchToBase64(t, e, n.buffer, r, a);
                }
                return this._source.toDataURL(t, e);
            }
            return null;
        }
        toBase64Async(t, e, i) {
            var s = this._ctx._targets.sourceWidth, r = this._ctx._targets.sourceHeight;
            this._ctx._targets.getDataAsync(0, 0, s, r, function (a) {
                let n = window;
                var h = n.conchToBase64FlipY ? n.conchToBase64FlipY(t, e, a.buffer, s, r) : n.conchToBase64(t, e, a.buffer, s, r);
                i(h);
            });
        }
    }
    class Ce {
        contains(t, e) {
            return !!Ce._isHitGraphic(t, e, this.hit) && !Ce._isHitGraphic(t, e, this.unHit);
        }
        static _isHitGraphic(t, e, i) {
            if (!i) return !1;
            var s, r, a, n = i.cmds;
            if (!n && i._one && ((n = Ce._cmds).length = 1, n[0] = i._one), !n) return !1;
            for (r = n.length, s = 0; s < r; s++) if (a = n[s]) {
                switch (a.cmdID) {
                    case "Translate":
                        t -= a.tx, e -= a.ty;
                }
                if (Ce._isHitCmd(t, e, a)) return !0;
            }
            return !1;
        }
        static _isHitCmd(t, e, i) {
            if (!i) return !1;
            var s = !1;
            switch (i.cmdID) {
                case "DrawRect":
                    Ce._rect.setTo(i.x, i.y, i.width, i.height), s = Ce._rect.contains(t, e);
                    break;

                case "DrawCircle":
                    s = (t -= i.x) * t + (e -= i.y) * e < i.radius * i.radius;
                    break;

                case "DrawPoly":
                    t -= i.x, e -= i.y, s = Ce._ptInPolygon(t, e, i.points);
            }
            return s;
        }
        static _ptInPolygon(t, e, i) {
            var s = Ce._ptPoint;
            s.setTo(t, e);
            var r, a, n, h, o, l = 0;
            o = i.length;
            for (var _ = 0; _ < o; _ += 2) {
                if (r = i[_], a = i[_ + 1], n = i[(_ + 2) % o], a != (h = i[(_ + 3) % o])) if (!(s.y < Math.min(a, h))) if (!(s.y >= Math.max(a, h))) (s.y - a) * (n - r) / (h - a) + r > s.x && l++;
            }
            return l % 2 == 1;
        }
        get hit() {
            return this._hit || (this._hit = new i.Graphics()), this._hit;
        }
        set hit(t) {
            this._hit = t;
        }
        get unHit() {
            return this._unHit || (this._unHit = new i.Graphics()), this._unHit;
        }
        set unHit(t) {
            this._unHit = t;
        }
    }
    Ce._cmds = [], Ce._rect = new g(), Ce._ptPoint = new f();
    class Ae {
        static regClass(t, e) {
            Ae._classMap[t] = e;
        }
        static regShortClassName(t) {
            for (var e = 0; e < t.length; e++) {
                var i = t[e], s = i.name;
                Ae._classMap[s] = i;
            }
        }
        static getRegClass(t) {
            return Ae._classMap[t];
        }
        static getClass(t) {
            var e = Ae._classMap[t] || Ae._classMap["Laya." + t] || t, s = i.Laya;
            return "string" == typeof e ? i.__classMap[e] || s[t] : e;
        }
        static getInstance(t) {
            var e = Ae.getClass(t);
            return e ? new e() : (console.warn("[error] Undefined class:", t), null);
        }
        static createByJson(t, e = null, i = null, s = null, r = null) {
            "string" == typeof t && (t = JSON.parse(t));
            var a = t.props;
            if (!e && !(e = r ? r.runWith(t) : Ae.getInstance(a.runtime || t.type))) return null;
            var n = t.child;
            if (n) for (var h = 0, o = n.length; h < o; h++) {
                var l = n[h];
                if ("render" !== l.props.name && "render" !== l.props.renderType || !e._$set_itemRender) if ("Graphic" == l.type) Ae._addGraphicsToSprite(l, e); else if (Ae._isDrawType(l.type)) Ae._addGraphicToSprite(l, e, !0); else {
                    var _ = Ae.createByJson(l, null, i, s, r);
                    "Script" === l.type ? "owner" in _ ? _.owner = e : "target" in _ && (_.target = e) : "mask" == l.props.renderType ? e.mask = _ : e.addChild(_);
                } else e.itemRender = l;
            }
            if (a) for (var u in a) {
                var c = a[u];
                "var" === u && i ? i[c] = e : c instanceof Array && e[u] instanceof Function ? e[u].apply(e, c) : e[u] = c;
            }
            return s && t.customProps && s.runWith([e, t]), e.created && e.created(), e;
        }
        static _addGraphicsToSprite(t, e) {
            var i = t.child;
            if (i && !(i.length < 1)) {
                var s, r, a = Ae._getGraphicsFromSprite(t, e), n = 0, h = 0;
                for (t.props && (n = Ae._getObjVar(t.props, "x", 0), h = Ae._getObjVar(t.props, "y", 0)),
                    0 != n && 0 != h && a.translate(n, h), r = i.length, s = 0; s < r; s++) Ae._addGraphicToGraphics(i[s], a);
                0 != n && 0 != h && a.translate(-n, -h);
            }
        }
        static _addGraphicToSprite(t, e, i = !1) {
            var s = i ? Ae._getGraphicsFromSprite(t, e) : e.graphics;
            Ae._addGraphicToGraphics(t, s);
        }
        static _getGraphicsFromSprite(t, e) {
            if (!t || !t.props) return e.graphics;
            var i = t.props.renderType;
            if ("hit" === i || "unHit" === i) {
                var s = e._style.hitArea || (e.hitArea = new Ce());
                s[i] || (s[i] = new xe());
                var r = s[i];
            }
            return r || (r = e.graphics), r;
        }
        static _getTransformData(t) {
            var e;
            ("pivotX" in t || "pivotY" in t) && (e = e || new p()).translate(-Ae._getObjVar(t, "pivotX", 0), -Ae._getObjVar(t, "pivotY", 0));
            var i = Ae._getObjVar(t, "scaleX", 1), s = Ae._getObjVar(t, "scaleY", 1), r = Ae._getObjVar(t, "rotation", 0);
            Ae._getObjVar(t, "skewX", 0), Ae._getObjVar(t, "skewY", 0);
            return 1 == i && 1 == s && 0 == r || ((e = e || new p()).scale(i, s), e.rotate(.0174532922222222 * r)),
                e;
        }
        static _addGraphicToGraphics(t, e) {
            var i, s;
            if ((i = t.props) && (s = Ae.DrawTypeDic[t.type])) {
                var r = e, a = Ae._getParams(i, s[1], s[2], s[3]), n = Ae._tM;
                (n || 1 != Ae._alpha) && (r.save(), n && r.transform(n), 1 != Ae._alpha && r.alpha(Ae._alpha)),
                    r[s[0]].apply(r, a), (n || 1 != Ae._alpha) && r.restore();
            }
        }
        static _adptLineData(t) {
            return t[2] = parseFloat(t[0]) + parseFloat(t[2]), t[3] = parseFloat(t[1]) + parseFloat(t[3]),
                t;
        }
        static _adptTextureData(t) {
            return t[0] = i.Loader.getRes(t[0]), t;
        }
        static _adptLinesData(t) {
            return t[2] = Ae._getPointListByStr(t[2]), t;
        }
        static _isDrawType(t) {
            return "Image" !== t && t in Ae.DrawTypeDic;
        }
        static _getParams(t, e, i = 0, s = null) {
            var r, a, n, h = Ae._temParam;
            for (h.length = e.length, a = e.length, r = 0; r < a; r++) h[r] = Ae._getObjVar(t, e[r][0], e[r][1]);
            return Ae._alpha = Ae._getObjVar(t, "alpha", 1), (n = Ae._getTransformData(t)) ? (i || (i = 0),
                n.translate(h[i], h[i + 1]), h[i] = h[i + 1] = 0, Ae._tM = n) : Ae._tM = null, s && Ae[s] && (h = Ae[s](h)),
                h;
        }
        static _getPointListByStr(t) {
            var e, i, s = t.split(",");
            for (i = s.length, e = 0; e < i; e++) s[e] = parseFloat(s[e]);
            return s;
        }
        static _getObjVar(t, e, i) {
            return e in t ? t[e] : i;
        }
    }
    Ae.DrawTypeDic = {
        Rect: ["drawRect", [["x", 0], ["y", 0], ["width", 0], ["height", 0], ["fillColor", null], ["lineColor", null], ["lineWidth", 1]]],
        Circle: ["drawCircle", [["x", 0], ["y", 0], ["radius", 0], ["fillColor", null], ["lineColor", null], ["lineWidth", 1]]],
        Pie: ["drawPie", [["x", 0], ["y", 0], ["radius", 0], ["startAngle", 0], ["endAngle", 0], ["fillColor", null], ["lineColor", null], ["lineWidth", 1]]],
        Image: ["drawTexture", [["x", 0], ["y", 0], ["width", 0], ["height", 0]]],
        Texture: ["drawTexture", [["skin", null], ["x", 0], ["y", 0], ["width", 0], ["height", 0]], 1, "_adptTextureData"],
        FillTexture: ["fillTexture", [["skin", null], ["x", 0], ["y", 0], ["width", 0], ["height", 0], ["repeat", null]], 1, "_adptTextureData"],
        FillText: ["fillText", [["text", ""], ["x", 0], ["y", 0], ["font", null], ["color", null], ["textAlign", null]], 1],
        Line: ["drawLine", [["x", 0], ["y", 0], ["toX", 0], ["toY", 0], ["lineColor", null], ["lineWidth", 0]], 0, "_adptLineData"],
        Lines: ["drawLines", [["x", 0], ["y", 0], ["points", ""], ["lineColor", null], ["lineWidth", 0]], 0, "_adptLinesData"],
        Curves: ["drawCurves", [["x", 0], ["y", 0], ["points", ""], ["lineColor", null], ["lineWidth", 0]], 0, "_adptLinesData"],
        Poly: ["drawPoly", [["x", 0], ["y", 0], ["points", ""], ["fillColor", null], ["lineColor", null], ["lineWidth", 1]], 0, "_adptLinesData"]
    }, Ae._temParam = [], Ae._classMap = {};
    class Re {
        reset() {
            return this.bounds && this.bounds.recover(), this.userBounds && this.userBounds.recover(),
                this.bounds = null, this.userBounds = null, this.temBM = null, this;
        }
        recover() {
            s.recover("BoundsStyle", this.reset());
        }
        static create() {
            return s.getItemByClass("BoundsStyle", Re);
        }
    }
    class Me {
        constructor() {
            this.reset();
        }
        needBitmapCache() {
            return this.cacheForFilters || !!this.mask;
        }
        needEnableCanvasRender() {
            return "none" != this.userSetCache || this.cacheForFilters || !!this.mask;
        }
        releaseContext() {
            if (this.canvas && this.canvas.size) {
                s.recover("CacheCanvas", this.canvas), this.canvas.size(0, 0);
                try {
                    this.canvas.width = 0, this.canvas.height = 0;
                } catch (t) { }
            }
            this.canvas = null;
        }
        createContext() {
            if (!this.canvas) {
                this.canvas = s.getItem("CacheCanvas") || new we(!1);
                var t = this.canvas.context;
                t || (t = this.canvas.getContext("2d"));
            }
        }
        releaseFilterCache() {
            var t = this.filterCache;
            t && (t.destroy(), t.recycle(), this.filterCache = null);
        }
        recover() {
            this !== Me.EMPTY && s.recover("SpriteCache", this.reset());
        }
        reset() {
            return this.releaseContext(), this.releaseFilterCache(), this.cacheAs = "none",
                this.enableCanvasRender = !1, this.userSetCache = "none", this.cacheForFilters = !1,
                this.staticCache = !1, this.reCache = !0, this.mask = null, this.maskParent = null,
                this.filterCache = null, this.filters = null, this.hasGlowFilter = !1, this.cacheRect && this.cacheRect.recover(),
                this.cacheRect = null, this;
        }
        static create() {
            return s.getItemByClass("SpriteCache", Me);
        }
        _calculateCacheRect(t, e, i, s) {
            var r, a = t._cacheStyle;
            if (a.cacheRect || (a.cacheRect = g.create()), "bitmap" === e ? ((r = t.getSelfBounds()).width = r.width + 2 * Me.CANVAS_EXTEND_EDGE,
                r.height = r.height + 2 * Me.CANVAS_EXTEND_EDGE, r.x = r.x - t.pivotX, r.y = r.y - t.pivotY,
                r.x = r.x - Me.CANVAS_EXTEND_EDGE, r.y = r.y - Me.CANVAS_EXTEND_EDGE, r.x = Math.floor(r.x + i) - i,
                r.y = Math.floor(r.y + s) - s, r.width = Math.floor(r.width), r.height = Math.floor(r.height),
                a.cacheRect.copyFrom(r)) : a.cacheRect.setTo(-t._style.pivotX, -t._style.pivotY, 1, 1),
                r = a.cacheRect, t._style.scrollRect) {
                var n = t._style.scrollRect;
                r.x -= n.x, r.y -= n.y;
            }
            return Me._scaleInfo.setTo(1, 1), Me._scaleInfo;
        }
    }
    Me.EMPTY = new Me(), Me._scaleInfo = new f(), Me.CANVAS_EXTEND_EDGE = 16;
    class Se {
        constructor() {
            this.reset();
        }
        reset() {
            return this.scaleX = this.scaleY = 1, this.skewX = this.skewY = 0, this.pivotX = this.pivotY = this.rotation = 0,
                this.alpha = 1, this.scrollRect && this.scrollRect.recover(), this.scrollRect = null,
                this.viewport && this.viewport.recover(), this.viewport = null, this.hitArea = null,
                this.dragging = null, this.blendMode = null, this;
        }
        recover() {
            this !== Se.EMPTY && s.recover("SpriteStyle", this.reset());
        }
        static create() {
            return s.getItemByClass("SpriteStyle", Se);
        }
    }
    Se.EMPTY = new Se();
    class Ie extends x {
        constructor() {
            super(), this._bits = 0, this._children = Ie.ARRAY_EMPTY, this._extUIChild = Ie.ARRAY_EMPTY,
                this._parent = null, this.name = "", this.destroyed = !1, this.createGLBuffer();
        }
        createGLBuffer() { }
        _setBit(t, e) {
            t === ye.DISPLAY && (this._getBit(t) != e && this._updateDisplayedInstage());
            e ? this._bits |= t : this._bits &= ~t;
        }
        _getBit(t) {
            return 0 != (this._bits & t);
        }
        _setUpNoticeChain() {
            this._getBit(ye.DISPLAY) && this._setBitUp(ye.DISPLAY);
        }
        _setBitUp(t) {
            var e = this;
            for (e._setBit(t, !0), e = e._parent; e;) {
                if (e._getBit(t)) return;
                e._setBit(t, !0), e = e._parent;
            }
        }
        on(t, e, i, s = null) {
            return t !== qt.DISPLAY && t !== qt.UNDISPLAY || this._getBit(ye.DISPLAY) || this._setBitUp(ye.DISPLAY),
                this._createListener(t, e, i, s, !1);
        }
        once(t, e, i, s = null) {
            return t !== qt.DISPLAY && t !== qt.UNDISPLAY || this._getBit(ye.DISPLAY) || this._setBitUp(ye.DISPLAY),
                this._createListener(t, e, i, s, !0);
        }
        destroy(t = !0) {
            this.destroyed = !0, this._destroyAllComponent(), this._parent && this._parent.removeChild(this),
                this._children && (t ? this.destroyChildren() : this.removeChildren()), this.onDestroy(),
                this._children = null, this.offAll();
        }
        onDestroy() { }
        destroyChildren() {
            if (this._children) for (var t = 0, e = this._children.length; t < e; t++) this._children[0].destroy(!0);
        }
        addChild(t) {
            if (!t || this.destroyed || t === this) return t;
            if (t._zOrder && this._setBit(ye.HAS_ZORDER, !0), t._parent === this) {
                var e = this.getChildIndex(t);
                e !== this._children.length - 1 && (this._children.splice(e, 1), this._children.push(t),
                    this._childChanged());
            } else t._parent && t._parent.removeChild(t), this._children === Ie.ARRAY_EMPTY && (this._children = []),
                this._children.push(t), t._setParent(this), this._childChanged();
            return t;
        }
        addInputChild(t) {
            if (this._extUIChild == Ie.ARRAY_EMPTY) this._extUIChild = [t]; else {
                if (this._extUIChild.indexOf(t) >= 0) return null;
                this._extUIChild.push(t);
            }
            return null;
        }
        removeInputChild(t) {
            var e = this._extUIChild.indexOf(t);
            e >= 0 && this._extUIChild.splice(e, 1);
        }
        addChildren(...t) {
            for (var e = 0, i = t.length; e < i;) this.addChild(t[e++]);
        }
        addChildAt(t, e) {
            if (!t || this.destroyed || t === this) return t;
            if (t._zOrder && this._setBit(ye.HAS_ZORDER, !0), e >= 0 && e <= this._children.length) {
                if (t._parent === this) {
                    var i = this.getChildIndex(t);
                    this._children.splice(i, 1), this._children.splice(e, 0, t), this._childChanged();
                } else t._parent && t._parent.removeChild(t), this._children === Ie.ARRAY_EMPTY && (this._children = []),
                    this._children.splice(e, 0, t), t._setParent(this);
                return t;
            }
            throw new Error("appendChildAt:The index is out of bounds");
        }
        getChildIndex(t) {
            return this._children.indexOf(t);
        }
        getChildByName(t) {
            var e = this._children;
            if (e) for (var i = 0, s = e.length; i < s; i++) {
                var r = e[i];
                if (r.name === t) return r;
            }
            return null;
        }
        getChildAt(t) {
            return this._children[t] || null;
        }
        setChildIndex(t, e) {
            var i = this._children;
            if (e < 0 || e >= i.length) throw new Error("setChildIndex:The index is out of bounds.");
            var s = this.getChildIndex(t);
            if (s < 0) throw new Error("setChildIndex:node is must child of this object.");
            return i.splice(s, 1), i.splice(e, 0, t), this._childChanged(), t;
        }
        _childChanged(t = null) { }
        removeChild(t) {
            if (!this._children) return t;
            var e = this._children.indexOf(t);
            return this.removeChildAt(e);
        }
        removeSelf() {
            return this._parent && this._parent.removeChild(this), this;
        }
        removeChildByName(t) {
            var e = this.getChildByName(t);
            return e && this.removeChild(e), e;
        }
        removeChildAt(t) {
            var e = this.getChildAt(t);
            return e && (this._children.splice(t, 1), e._setParent(null)), e;
        }
        removeChildren(t = 0, e = 2147483647) {
            if (this._children && this._children.length > 0) {
                var i = this._children;
                if (0 === t && e >= i.length - 1) {
                    var s = i;
                    this._children = Ie.ARRAY_EMPTY;
                } else s = i.splice(t, e - t);
                for (var r = 0, a = s.length; r < a; r++) s[r]._setParent(null);
            }
            return this;
        }
        replaceChild(t, e) {
            var i = this._children.indexOf(e);
            return i > -1 ? (this._children.splice(i, 1, t), e._setParent(null), t._setParent(this),
                t) : null;
        }
        get numChildren() {
            return this._children.length;
        }
        get parent() {
            return this._parent;
        }
        _setParent(t) {
            this._parent !== t && (t ? (this._parent = t, this._onAdded(), this.event(qt.ADDED),
                this._getBit(ye.DISPLAY) && (this._setUpNoticeChain(), t.displayedInStage && this._displayChild(this, !0)),
                t._childChanged(this)) : (this._onRemoved(), this.event(qt.REMOVED), this._parent._childChanged(),
                    this._getBit(ye.DISPLAY) && this._displayChild(this, !1), this._parent = t));
        }
        get displayedInStage() {
            return this._getBit(ye.DISPLAY) ? this._getBit(ye.DISPLAYED_INSTAGE) : (this._setBitUp(ye.DISPLAY),
                this._getBit(ye.DISPLAYED_INSTAGE));
        }
        _updateDisplayedInstage() {
            var t;
            t = this;
            for (var e = i.stage, s = !1; t;) {
                if (t._getBit(ye.DISPLAY)) {
                    s = t._getBit(ye.DISPLAYED_INSTAGE);
                    break;
                }
                if (t === e || t._getBit(ye.DISPLAYED_INSTAGE)) {
                    s = !0;
                    break;
                }
                t = t._parent;
            }
            this._setBit(ye.DISPLAYED_INSTAGE, s);
        }
        _setDisplay(t) {
            this._getBit(ye.DISPLAYED_INSTAGE) !== t && (this._setBit(ye.DISPLAYED_INSTAGE, t),
                t ? this.event(qt.DISPLAY) : this.event(qt.UNDISPLAY));
        }
        _displayChild(t, e) {
            var i = t._children;
            if (i) for (var s = 0, r = i.length; s < r; s++) {
                var a = i[s];
                a._getBit(ye.DISPLAY) && (a._children.length > 0 ? this._displayChild(a, e) : a._setDisplay(e));
            }
            t._setDisplay(e);
        }
        contains(t) {
            if (t === this) return !0;
            for (; t;) {
                if (t._parent === this) return !0;
                t = t._parent;
            }
            return !1;
        }
        timerLoop(t, e, s, r = null, a = !0, n = !1) {
            (this.scene ? this.scene.timer : i.timer).loop(t, e, s, r, a, n);
        }
        timerOnce(t, e, s, r = null, a = !0) {
            (this.scene ? this.scene.timer : i.timer)._create(!1, !1, t, e, s, r, a);
        }
        frameLoop(t, e, s, r = null, a = !0) {
            (this.scene ? this.scene.timer : i.timer)._create(!0, !0, t, e, s, r, a);
        }
        frameOnce(t, e, s, r = null, a = !0) {
            (this.scene ? this.scene.timer : i.timer)._create(!0, !1, t, e, s, r, a);
        }
        clearTimer(t, e) {
            (this.scene ? this.scene.timer : i.timer).clear(t, e);
        }
        callLater(t, e = null) {
            (this.scene ? this.scene.timer : i.timer).callLater(this, t, e);
        }
        runCallLater(t) {
            (this.scene ? this.scene.timer : i.timer).runCallLater(this, t);
        }
        get scene() {
            return this._scene;
        }
        get active() {
            return !this._getBit(ye.NOT_READY) && !this._getBit(ye.NOT_ACTIVE);
        }
        set active(t) {
            if (t = !!t, !this._getBit(ye.NOT_ACTIVE) !== t) {
                if (this._activeChangeScripts && 0 !== this._activeChangeScripts.length) throw t ? "Node: can't set the main inActive node active in hierarchy,if the operate is in main inActive node or it's children script's onDisable Event." : "Node: can't set the main active node inActive in hierarchy,if the operate is in main active node or it's children script's onEnable Event.";
                this._setBit(ye.NOT_ACTIVE, !t), this._parent && this._parent.activeInHierarchy && (t ? this._processActive() : this._processInActive());
            }
        }
        get activeInHierarchy() {
            return this._getBit(ye.ACTIVE_INHIERARCHY);
        }
        _onActive() {
            V.spriteCount++;
        }
        _onInActive() {
            V.spriteCount--;
        }
        _onActiveInScene() { }
        _onInActiveInScene() { }
        _parse(t, e) { }
        _setBelongScene(t) {
            if (!this._scene) {
                this._scene = t, this._onActiveInScene();
                for (var e = 0, i = this._children.length; e < i; e++) this._children[e]._setBelongScene(t);
            }
        }
        _setUnBelongScene() {
            if (this._scene !== this) {
                this._onInActiveInScene(), this._scene = null;
                for (var t = 0, e = this._children.length; t < e; t++) this._children[t]._setUnBelongScene();
            }
        }
        onAwake() { }
        onEnable() { }
        _processActive() {
            this._activeChangeScripts || (this._activeChangeScripts = []), this._activeHierarchy(this._activeChangeScripts),
                this._activeScripts();
        }
        _activeHierarchy(t) {
            if (this._setBit(ye.ACTIVE_INHIERARCHY, !0), this._components) for (var e = 0, i = this._components.length; e < i; e++) {
                var s = this._components[e];
                s._isScript() ? s._enabled && t.push(s) : s._setActive(!0);
            }
            for (this._onActive(), e = 0, i = this._children.length; e < i; e++) {
                var r = this._children[e];
                !r._getBit(ye.NOT_ACTIVE) && !r._getBit(ye.NOT_READY) && r._activeHierarchy(t);
            }
            this._getBit(ye.AWAKED) || (this._setBit(ye.AWAKED, !0), this.onAwake()), this.onEnable();
        }
        _activeScripts() {
            for (var t = 0, e = this._activeChangeScripts.length; t < e; t++) {
                var i = this._activeChangeScripts[t];
                i._awaked || (i._awaked = !0, i._onAwake()), i._onEnable();
            }
            this._activeChangeScripts.length = 0;
        }
        _processInActive() {
            this._activeChangeScripts || (this._activeChangeScripts = []), this._inActiveHierarchy(this._activeChangeScripts),
                this._inActiveScripts();
        }
        _inActiveHierarchy(t) {
            if (this._onInActive(), this._components) for (var e = 0, i = this._components.length; e < i; e++) {
                var s = this._components[e];
                s._setActive(!1), s._isScript() && s._enabled && t.push(s);
            }
            for (this._setBit(ye.ACTIVE_INHIERARCHY, !1), e = 0, i = this._children.length; e < i; e++) {
                var r = this._children[e];
                r && !r._getBit(ye.NOT_ACTIVE) && r._inActiveHierarchy(t);
            }
            this.onDisable();
        }
        _inActiveScripts() {
            for (var t = 0, e = this._activeChangeScripts.length; t < e; t++) this._activeChangeScripts[t].onDisable();
            this._activeChangeScripts.length = 0;
        }
        onDisable() { }
        _onAdded() {
            if (this._activeChangeScripts && 0 !== this._activeChangeScripts.length) throw "Node: can't set the main inActive node active in hierarchy,if the operate is in main inActive node or it's children script's onDisable Event.";
            var t = this._parent.scene;
            t && this._setBelongScene(t), this._parent.activeInHierarchy && this.active && this._processActive();
        }
        _onRemoved() {
            if (this._activeChangeScripts && 0 !== this._activeChangeScripts.length) throw "Node: can't set the main active node inActive in hierarchy,if the operate is in main active node or it's children script's onEnable Event.";
            this._parent.activeInHierarchy && this.active && this._processInActive(), this._parent.scene && this._setUnBelongScene();
        }
        _addComponentInstance(t) {
            this._components = this._components || [], this._components.push(t), t.owner = this,
                t._onAdded(), this.activeInHierarchy && t._setActive(!0);
        }
        _destroyComponent(t) {
            if (this._components) for (var e = 0, i = this._components.length; e < i; e++) {
                var s = this._components[e];
                if (s === t) {
                    s._destroy(), this._components.splice(e, 1);
                    break;
                }
            }
        }
        _destroyAllComponent() {
            if (this._components) {
                for (var t = 0, e = this._components.length; t < e; t++) {
                    var i = this._components[t];
                    i && i._destroy();
                }
                this._components.length = 0;
            }
        }
        _cloneTo(t, e, i) {
            var s = t;
            if (this._components) for (var r = 0, a = this._components.length; r < a; r++) {
                var n = s.addComponent(this._components[r].constructor);
                this._components[r]._cloneTo(n);
            }
        }
        addComponentIntance(t) {
            if (t.owner) throw "Node:the component has belong to other node.";
            if (t.isSingleton && this.getComponent(t.constructor)) throw "Node:the component is singleton,can't add the second one.";
            return this._addComponentInstance(t), t;
        }
        addComponent(t) {
            var e = s.createByClass(t);
            if (e._destroyed = !1, e.isSingleton && this.getComponent(t)) throw "无法实例" + t + "组件，" + t + "组件已存在！";
            return this._addComponentInstance(e), e;
        }
        getComponent(t) {
            if (this._components) for (var e = 0, i = this._components.length; e < i; e++) {
                var s = this._components[e];
                if (s instanceof t) return s;
            }
            return null;
        }
        getComponents(t) {
            var e;
            if (this._components) for (var i = 0, s = this._components.length; i < s; i++) {
                var r = this._components[i];
                r instanceof t && (e = e || []).push(r);
            }
            return e;
        }
        get timer() {
            return this.scene ? this.scene.timer : i.timer;
        }
    }
    Ie.ARRAY_EMPTY = [], Ae.regClass("laya.display.Node", Ie), Ae.regClass("Laya.Node", Ie);
    class Pe extends Ie {
        constructor() {
            super(), this._x = 0, this._y = 0, this._width = 0, this._height = 0, this._visible = !0,
                this._mouseState = 0, this._zOrder = 0, this._renderType = 0, this._transform = null,
                this._tfChanged = !1, this._repaint = pe.REPAINT_NONE, this._texture = null, this._style = Se.EMPTY,
                this._cacheStyle = Me.EMPTY, this._boundStyle = null, this._graphics = null, this.mouseThrough = !1,
                this.autoSize = !1, this.hitTestPrior = !1;
        }
        destroy(t = !0) {
            super.destroy(t), this._style && this._style.recover(), this._cacheStyle && this._cacheStyle.recover(),
                this._boundStyle && this._boundStyle.recover(), this._style = null, this._cacheStyle = null,
                this._boundStyle = null, this._transform = null, this._graphics && this._graphics.autoDestroy && this._graphics.destroy(),
                this._graphics = null, this.texture = null;
        }
        updateZOrder() {
            Q.updateOrder(this._children) && this.repaint();
        }
        _getBoundsStyle() {
            return this._boundStyle || (this._boundStyle = Re.create()), this._boundStyle;
        }
        _setCustomRender() { }
        set customRenderEnable(t) {
            t && (this._renderType |= pe.CUSTOM, this._setRenderType(this._renderType), this._setCustomRender());
        }
        get cacheAs() {
            return this._cacheStyle.cacheAs;
        }
        _setCacheAs(t) { }
        set cacheAs(t) {
            t !== this._cacheStyle.userSetCache && (this.mask && "normal" === t || (this._setCacheAs(t),
                this._getCacheStyle().userSetCache = t, this._checkCanvasEnable(), this.repaint()));
        }
        _checkCanvasEnable() {
            var t = this._cacheStyle.needEnableCanvasRender();
            this._getCacheStyle().enableCanvasRender = t, t ? (this._cacheStyle.needBitmapCache() ? this._cacheStyle.cacheAs = "bitmap" : this._cacheStyle.cacheAs = this._cacheStyle.userSetCache,
                this._cacheStyle.reCache = !0, this._renderType |= pe.CANVAS) : (this._cacheStyle.cacheAs = "none",
                    this._cacheStyle.releaseContext(), this._renderType &= ~pe.CANVAS), this._setCacheAs(this._cacheStyle.cacheAs),
                this._setRenderType(this._renderType);
        }
        get staticCache() {
            return this._cacheStyle.staticCache;
        }
        set staticCache(t) {
            this._getCacheStyle().staticCache = t, t || this.reCache();
        }
        reCache() {
            this._cacheStyle.reCache = !0, this._repaint |= pe.REPAINT_CACHE;
        }
        getRepaint() {
            return this._repaint;
        }
        _setX(t) {
            this._x = t;
        }
        _setY(t) {
            this._y = t;
        }
        _setWidth(t, e) { }
        _setHeight(t, e) { }
        get x() {
            return this._x;
        }
        set x(t) {
            if (!this.destroyed && this._x !== t) {
                this._setX(t), this.parentRepaint(pe.REPAINT_CACHE);
                var e = this._cacheStyle.maskParent;
                e && e.repaint(pe.REPAINT_CACHE);
            }
        }
        get y() {
            return this._y;
        }
        set y(t) {
            if (!this.destroyed && this._y !== t) {
                this._setY(t), this.parentRepaint(pe.REPAINT_CACHE);
                var e = this._cacheStyle.maskParent;
                e && e.repaint(pe.REPAINT_CACHE);
            }
        }
        get width() {
            return this.get_width();
        }
        set width(t) {
            this.set_width(t);
        }
        set_width(t) {
            this._width !== t && (this._width = t, this._setWidth(this.texture, t), this._setTranformChange());
        }
        get_width() {
            return this.autoSize ? this.texture ? this.texture.width : this._graphics || 0 !== this._children.length ? this.getSelfBounds().width : 0 : this._width || (this.texture ? this.texture.width : 0);
        }
        get height() {
            return this.get_height();
        }
        set height(t) {
            this.set_height(t);
        }
        set_height(t) {
            this._height !== t && (this._height = t, this._setHeight(this.texture, t), this._setTranformChange());
        }
        get_height() {
            return this.autoSize ? this.texture ? this.texture.height : this._graphics || 0 !== this._children.length ? this.getSelfBounds().height : 0 : this._height || (this.texture ? this.texture.height : 0);
        }
        get displayWidth() {
            return this.width * this.scaleX;
        }
        get displayHeight() {
            return this.height * this.scaleY;
        }
        setSelfBounds(t) {
            this._getBoundsStyle().userBounds = t;
        }
        getBounds() {
            return this._getBoundsStyle().bounds = g._getWrapRec(this._boundPointsToParent());
        }
        getSelfBounds() {
            return this._boundStyle && this._boundStyle.userBounds ? this._boundStyle.userBounds : this._graphics || 0 !== this._children.length || this._texture ? this._getBoundsStyle().bounds = g._getWrapRec(this._getBoundPointsM(!1)) : g.TEMP.setTo(0, 0, this.width, this.height);
        }
        _boundPointsToParent(t = !1) {
            var e = 0, i = 0;
            this._style && (e = this.pivotX, i = this.pivotY, t = t || 0 !== this._style.rotation,
                this._style.scrollRect && (e += this._style.scrollRect.x, i += this._style.scrollRect.y));
            var s = this._getBoundPointsM(t);
            if (!s || s.length < 1) return s;
            if (8 != s.length && (s = t ? ht.scanPList(s) : g._getWrapRec(s, g.TEMP)._getBoundPoints()),
                !this.transform) return Q.transPointList(s, this._x - e, this._y - i), s;
            var r, a = f.TEMP, n = s.length;
            for (r = 0; r < n; r += 2) a.x = s[r], a.y = s[r + 1], this.toParentPoint(a), s[r] = a.x,
                s[r + 1] = a.y;
            return s;
        }
        getGraphicBounds(t = !1) {
            return this._graphics ? this._graphics.getBounds(t) : g.TEMP.setTo(0, 0, 0, 0);
        }
        _getBoundPointsM(t = !1) {
            if (this._boundStyle && this._boundStyle.userBounds) return this._boundStyle.userBounds._getBoundPoints();
            if (this._boundStyle || this._getBoundsStyle(), this._boundStyle.temBM || (this._boundStyle.temBM = []),
                this._style.scrollRect) {
                var e = Q.clearArray(this._boundStyle.temBM), i = g.TEMP;
                return i.copyFrom(this._style.scrollRect), Q.concatArray(e, i._getBoundPoints()),
                    e;
            }
            var s, r, a, n;
            this._graphics ? s = this._graphics.getBoundPoints() : (s = Q.clearArray(this._boundStyle.temBM),
                this._texture && ((i = g.TEMP).setTo(0, 0, this.width || this._texture.width, this.height || this._texture.height),
                    Q.concatArray(s, i._getBoundPoints())));
            for (var h = 0, o = (n = this._children).length; h < o; h++) (r = n[h]) instanceof Pe && !0 === r._visible && (a = r._boundPointsToParent(t)) && (s = s ? Q.concatArray(s, a) : a);
            return s;
        }
        _getCacheStyle() {
            return this._cacheStyle === Me.EMPTY && (this._cacheStyle = Me.create()), this._cacheStyle;
        }
        getStyle() {
            return this._style === Se.EMPTY && (this._style = Se.create()), this._style;
        }
        setStyle(t) {
            this._style = t;
        }
        get scaleX() {
            return this._style.scaleX;
        }
        set scaleX(t) {
            this.set_scaleX(t);
        }
        _setScaleX(t) {
            this._style.scaleX = t;
        }
        get scaleY() {
            return this._style.scaleY;
        }
        set scaleY(t) {
            this.set_scaleY(t);
        }
        _setScaleY(t) {
            this._style.scaleY = t;
        }
        set_scaleX(t) {
            this.getStyle().scaleX !== t && (this._setScaleX(t), this._setTranformChange());
        }
        get_scaleX() {
            return this._style.scaleX;
        }
        set_scaleY(t) {
            this.getStyle().scaleY !== t && (this._setScaleY(t), this._setTranformChange());
        }
        get_scaleY() {
            return this._style.scaleY;
        }
        get rotation() {
            return this._style.rotation;
        }
        set rotation(t) {
            this.getStyle().rotation !== t && (this._setRotation(t), this._setTranformChange());
        }
        _setRotation(t) {
            this._style.rotation = t;
        }
        get skewX() {
            return this._style.skewX;
        }
        set skewX(t) {
            this.getStyle().skewX !== t && (this._setSkewX(t), this._setTranformChange());
        }
        _setSkewX(t) {
            this._style.skewX = t;
        }
        get skewY() {
            return this._style.skewY;
        }
        set skewY(t) {
            this.getStyle().skewY !== t && (this._setSkewY(t), this._setTranformChange());
        }
        _setSkewY(t) {
            this._style.skewY = t;
        }
        _createTransform() {
            return p.create();
        }
        _adjustTransform() {
            this._tfChanged = !1;
            var t = this._style, e = t.scaleX, i = t.scaleY, s = t.skewX, r = t.skewY, a = t.rotation, n = this._transform || (this._transform = this._createTransform());
            if (a || 1 !== e || 1 !== i || 0 !== s || 0 !== r) {
                n._bTransform = !0;
                var h = .0174532922222222 * (a - s), o = .0174532922222222 * (a + r), l = Math.cos(o), _ = Math.sin(o), u = Math.sin(h), c = Math.cos(h);
                n.a = e * l, n.b = e * _, n.c = -i * u, n.d = i * c, n.tx = n.ty = 0;
            } else n.identity(), this._renderType &= ~pe.TRANSFORM, this._setRenderType(this._renderType);
            return n;
        }
        _setTransform(t) { }
        get transform() {
            return this._tfChanged ? this._adjustTransform() : this._transform;
        }
        set transform(t) {
            this.set_transform(t);
        }
        get_transform() {
            return this._tfChanged ? this._adjustTransform() : this._transform;
        }
        set_transform(t) {
            this._tfChanged = !1;
            var e = this._transform || (this._transform = this._createTransform());
            t.copyTo(e), this._setTransform(e), t && (this._x = e.tx, this._y = e.ty, e.tx = e.ty = 0),
                t ? this._renderType |= pe.TRANSFORM : this._renderType &= ~pe.TRANSFORM, this._setRenderType(this._renderType),
                this.parentRepaint();
        }
        _setPivotX(t) {
            this.getStyle().pivotX = t;
        }
        _getPivotX() {
            return this._style.pivotX;
        }
        _setPivotY(t) {
            this.getStyle().pivotY = t;
        }
        _getPivotY() {
            return this._style.pivotY;
        }
        get pivotX() {
            return this._getPivotX();
        }
        set pivotX(t) {
            this._setPivotX(t), this.repaint();
        }
        get pivotY() {
            return this._getPivotY();
        }
        set pivotY(t) {
            this._setPivotY(t), this.repaint();
        }
        _setAlpha(t) {
            this._style.alpha !== t && (this.getStyle().alpha = t, 1 !== t ? this._renderType |= pe.ALPHA : this._renderType &= ~pe.ALPHA,
                this._setRenderType(this._renderType), this.parentRepaint());
        }
        _getAlpha() {
            return this._style.alpha;
        }
        get alpha() {
            return this._getAlpha();
        }
        set alpha(t) {
            t = t < 0 ? 0 : t > 1 ? 1 : t, this._setAlpha(t);
        }
        get visible() {
            return this.get_visible();
        }
        set visible(t) {
            this.set_visible(t);
        }
        get_visible() {
            return this._visible;
        }
        set_visible(t) {
            this._visible !== t && (this._visible = t, this.parentRepaint(pe.REPAINT_ALL));
        }
        _setBlendMode(t) { }
        get blendMode() {
            return this._style.blendMode;
        }
        set blendMode(t) {
            this._setBlendMode(t), this.getStyle().blendMode = t, t && "source-over" != t ? this._renderType |= pe.BLEND : this._renderType &= ~pe.BLEND,
                this._setRenderType(this._renderType), this.parentRepaint();
        }
        get graphics() {
            return this._graphics || (this.graphics = new xe(), this._graphics.autoDestroy = !0),
                this._graphics;
        }
        _setGraphics(t) { }
        _setGraphicsCallBack() { }
        set graphics(t) {
            this._graphics && (this._graphics._sp = null), this._graphics = t, t ? (this._setGraphics(t),
                this._renderType |= pe.GRAPHICS, t._sp = this) : this._renderType &= ~pe.GRAPHICS,
                this._setRenderType(this._renderType), this.repaint();
        }
        get scrollRect() {
            return this._style.scrollRect;
        }
        _setScrollRect(t) { }
        set scrollRect(t) {
            this.getStyle().scrollRect = t, this._setScrollRect(t), this.repaint(), t ? this._renderType |= pe.CLIP : this._renderType &= ~pe.CLIP,
                this._setRenderType(this._renderType);
        }
        pos(t, e, i = !1) {
            if (this._x !== t || this._y !== e) {
                if (this.destroyed) return this;
                if (i) {
                    this._setX(t), this._setY(e), this.parentRepaint(pe.REPAINT_CACHE);
                    var s = this._cacheStyle.maskParent;
                    s && s.repaint(pe.REPAINT_CACHE);
                } else this.x = t, this.y = e;
            }
            return this;
        }
        pivot(t, e) {
            return this.pivotX = t, this.pivotY = e, this;
        }
        size(t, e) {
            return this.width = t, this.height = e, this;
        }
        scale(t, e, i = !1) {
            var s = this.getStyle();
            if (s.scaleX != t || s.scaleY != e) {
                if (this.destroyed) return this;
                i ? (this._setScaleX(t), this._setScaleY(e), this._setTranformChange()) : (this.scaleX = t,
                    this.scaleY = e);
            }
            return this;
        }
        skew(t, e) {
            return this.skewX = t, this.skewY = e, this;
        }
        render(t, e, i) {
            be.renders[this._renderType]._fun(this, t, e + this._x, i + this._y), this._repaint = 0;
        }
        drawToCanvas(t, e, i, s) {
            return Pe.drawToCanvas(this, this._renderType, t, e, i, s);
        }
        drawToTexture(t, e, i, s, r = null) {
            return Pe.drawToTexture(this, this._renderType, t, e, i, s, r);
        }
        drawToTexture3D(t, e, i) {
            throw "not implement";
        }
        static drawToCanvas(t, e, i, s, r, a) {
            r -= t.x, a -= t.y, r |= 0, a |= 0, i |= 0, s |= 0;
            var n = new ae();
            n.size(i, s), n.asBitmap = !0, n._targets.start(), n._targets.clear(0, 0, 0, 0),
                be.renders[e]._fun(t, n, r, a), n.flush(), n._targets.end(), n._targets.restore();
            var h = n._targets.getData(0, 0, i, s);
            n.destroy();
            for (var o = new ImageData(i, s), l = 4 * i, _ = o.data, u = s - 1, c = u * l, d = 0; u >= 0; u--) _.set(h.subarray(d, d + l), c),
                c -= l, d += l;
            var p = new we(!0);
            return p.size(i, s), p.getContext("2d").putImageData(o, 0, 0), p;
        }
        static drawToTexture(t, e, i, s, r, a, n = null) {
            Pe.drawtocanvCtx || (Pe.drawtocanvCtx = new ae()), r -= t.x, a -= t.y, r |= 0, a |= 0,
                i |= 0, s |= 0;
            var h = n ? Pe.drawtocanvCtx : new ae();
            if (h.clear(), h.size(i, s), n ? h._targets = n : h.asBitmap = !0, h._targets && (h._targets.start(),
                h._targets.clear(0, 0, 0, 0), be.renders[e]._fun(t, h, r, a), h.flush(), h._targets.end(),
                h._targets.restore()), !n) {
                var o = new Qt(h._targets, Qt.INV_UV);
                return h.destroy(!0), o;
            }
            return t._repaint = 0, n;
        }
        customRender(t, e, i) {
            this._repaint = pe.REPAINT_ALL;
        }
        _applyFilters() { }
        get filters() {
            return this._cacheStyle.filters;
        }
        _setColorFilter(t) { }
        set filters(t) {
            t && 0 === t.length && (t = null), this._cacheStyle.filters != t && (this._getCacheStyle().filters = t ? t.slice() : null,
                t && t.length ? (this._setColorFilter(t[0]), this._renderType |= pe.FILTERS) : (this._setColorFilter(null),
                    this._renderType &= ~pe.FILTERS), this._setRenderType(this._renderType), t && t.length > 0 ? (this._getBit(ye.DISPLAY) || this._setBitUp(ye.DISPLAY),
                        1 == t.length && t[0] instanceof $ || (this._getCacheStyle().cacheForFilters = !0,
                            this._checkCanvasEnable())) : this._cacheStyle.cacheForFilters && (this._cacheStyle.cacheForFilters = !1,
                                this._checkCanvasEnable()), this._getCacheStyle().hasGlowFilter = this._isHaveGlowFilter(),
                this.repaint());
        }
        _isHaveGlowFilter() {
            var t, e;
            if (this.filters) for (t = 0; t < this.filters.length; t++) if (this.filters[t].type == q.GLOW) return !0;
            for (t = 0, e = this._children.length; t < e; t++) if (this._children[t]._isHaveGlowFilter()) return !0;
            return !1;
        }
        localToGlobal(t, e = !1, s = null) {
            !0 === e && (t = new f(t.x, t.y));
            var r = this;
            for (s = s || i.stage; r && !r.destroyed && r != s;) t = r.toParentPoint(t), r = r.parent;
            return t;
        }
        globalToLocal(t, e = !1, s = null) {
            e && (t = new f(t.x, t.y));
            var r = this, a = [];
            for (s = s || i.stage; r && !r.destroyed && r != s;) a.push(r), r = r.parent;
            for (var n = a.length - 1; n >= 0;) t = (r = a[n]).fromParentPoint(t), n--;
            return t;
        }
        toParentPoint(t) {
            if (!t) return t;
            t.x -= this.pivotX, t.y -= this.pivotY, this.transform && this._transform.transformPoint(t),
                t.x += this._x, t.y += this._y;
            var e = this._style.scrollRect;
            return e && (t.x -= e.x, t.y -= e.y), t;
        }
        fromParentPoint(t) {
            if (!t) return t;
            t.x -= this._x, t.y -= this._y;
            var e = this._style.scrollRect;
            return e && (t.x += e.x, t.y += e.y), this.transform && this._transform.invertTransformPoint(t),
                t.x += this.pivotX, t.y += this.pivotY, t;
        }
        fromStagePoint(t) {
            return t;
        }
        on(t, e, i, s = null) {
            return 1 !== this._mouseState && this.isMouseEvent(t) ? (this.mouseEnabled = !0,
                this._setBit(ye.HAS_MOUSE, !0), this._parent && this._onDisplay(), this._createListener(t, e, i, s, !1)) : super.on(t, e, i, s);
        }
        once(t, e, i, s = null) {
            return 1 !== this._mouseState && this.isMouseEvent(t) ? (this.mouseEnabled = !0,
                this._setBit(ye.HAS_MOUSE, !0), this._parent && this._onDisplay(), this._createListener(t, e, i, s, !0)) : super.once(t, e, i, s);
        }
        _onDisplay(t) {
            if (1 !== this._mouseState) {
                var e = this;
                for (e = e.parent; e && 1 !== e._mouseState && !e._getBit(ye.HAS_MOUSE);) e.mouseEnabled = !0,
                    e._setBit(ye.HAS_MOUSE, !0), e = e.parent;
            }
        }
        _setParent(t) {
            super._setParent(t), t && this._getBit(ye.HAS_MOUSE) && this._onDisplay();
        }
        loadImage(t, e = null) {
            if (t) {
                var s = i.Loader.textureMap[E.formatURL(t)];
                s || ((s = new Qt()).load(t), i.Loader.cacheTexture(t, s)), this.texture = s, s.getIsReady() ? loaded.call(this) : s.once(qt.READY, this, loaded);
            } else this.texture = null, loaded.call(this);
            function loaded() {
                this.repaint(pe.REPAINT_ALL), e && e.run();
            }
            return this;
        }
        static fromImage(t) {
            return new Pe().loadImage(t);
        }
        repaint(t = pe.REPAINT_CACHE) {
            this._repaint & t || (this._repaint |= t, this.parentRepaint(t)), this._cacheStyle && this._cacheStyle.maskParent && this._cacheStyle.maskParent.repaint(t);
        }
        _needRepaint() {
            return this._repaint & pe.REPAINT_CACHE && this._cacheStyle.enableCanvasRender && this._cacheStyle.reCache;
        }
        _childChanged(t = null) {
            this._children.length ? this._renderType |= pe.CHILDS : this._renderType &= ~pe.CHILDS,
                this._setRenderType(this._renderType), t && this._getBit(ye.HAS_ZORDER) && i.systemTimer.callLater(this, this.updateZOrder),
                this.repaint(pe.REPAINT_ALL);
        }
        parentRepaint(t = pe.REPAINT_CACHE) {
            var e = this._parent;
            !e || e._repaint & t || (e._repaint |= t, e.parentRepaint(t));
        }
        get stage() {
            return i.stage;
        }
        get hitArea() {
            return this._style.hitArea;
        }
        set hitArea(t) {
            this.getStyle().hitArea = t;
        }
        _setMask(t) { }
        get mask() {
            return this._cacheStyle.mask;
        }
        set mask(t) {
            t && this.mask && this.mask._cacheStyle.maskParent || (this._getCacheStyle().mask = t,
                this._setMask(t), this._checkCanvasEnable(), t ? t._getCacheStyle().maskParent = this : this.mask && (this.mask._getCacheStyle().maskParent = null),
                this._renderType |= pe.MASK, this._setRenderType(this._renderType), this.parentRepaint(pe.REPAINT_ALL));
        }
        get mouseEnabled() {
            return this._mouseState > 1;
        }
        set mouseEnabled(t) {
            this._mouseState = t ? 2 : 1;
        }
        startDrag(t = null, e = !1, s = 0, r = 300, a = null, n = !1, h = .92) {
            this._style.dragging || (this.getStyle().dragging = new i.Dragging()), this._style.dragging.start(this, t, e, s, r, a, n, h);
        }
        stopDrag() {
            this._style.dragging && this._style.dragging.stop();
        }
        _setDisplay(t) {
            t || this._cacheStyle && (this._cacheStyle.releaseContext(), this._cacheStyle.releaseFilterCache(),
                this._cacheStyle.hasGlowFilter && (this._cacheStyle.hasGlowFilter = !1)), super._setDisplay(t);
        }
        hitTestPoint(t, e) {
            var i = this.globalToLocal(f.TEMP.setTo(t, e));
            return t = i.x, e = i.y, (this._style.hitArea ? this._style.hitArea : this._width > 0 && this._height > 0 ? g.TEMP.setTo(0, 0, this._width, this._height) : this.getSelfBounds()).contains(t, e);
        }
        getMousePoint() {
            return this.globalToLocal(f.TEMP.setTo(i.stage.mouseX, i.stage.mouseY));
        }
        get globalScaleX() {
            for (var t = 1, e = this; e && e !== i.stage;) t *= e.scaleX, e = e.parent;
            return t;
        }
        get globalRotation() {
            for (var t = 0, e = this; e && e !== i.stage;) t += e.rotation, e = e.parent;
            return t;
        }
        get globalScaleY() {
            for (var t = 1, e = this; e && e !== i.stage;) t *= e.scaleY, e = e.parent;
            return t;
        }
        get mouseX() {
            return this.getMousePoint().x;
        }
        get mouseY() {
            return this.getMousePoint().y;
        }
        get zOrder() {
            return this._zOrder;
        }
        set zOrder(t) {
            this._zOrder != t && (this._zOrder = t, this._parent && (t && this._parent._setBit(ye.HAS_ZORDER, !0),
                i.systemTimer.callLater(this._parent, this.updateZOrder)));
        }
        get texture() {
            return this._texture;
        }
        _setTexture(t) { }
        set texture(t) {
            "string" == typeof t ? this.loadImage(t) : this._texture != t && (this._texture && this._texture._removeReference(),
                this._texture = t, t && t._addReference(), this._setTexture(t), this._setWidth(this._texture, this.width),
                this._setHeight(this._texture, this.height), t ? this._renderType |= pe.TEXTURE : this._renderType &= ~pe.TEXTURE,
                this._setRenderType(this._renderType), this.repaint());
        }
        get viewport() {
            return this._style.viewport;
        }
        set viewport(t) {
            var e;
            "string" == typeof t && ((e = t.split(",")).length > 3 && (t = new g(parseFloat(e[0]), parseFloat(e[1]), parseFloat(e[2]), parseFloat(e[3]))));
            this.getStyle().viewport = t;
        }
        _setRenderType(t) { }
        _setTranformChange() {
            this._tfChanged = !0, this._renderType |= pe.TRANSFORM, this.parentRepaint(pe.REPAINT_CACHE);
        }
        _setBgStyleColor(t, e, i, s, r) { }
        _setBorderStyleColor(t, e, i, s, r, a) { }
        captureMouseEvent(t) {
            i.MouseManager.instance.setCapture(this, t);
        }
        releaseMouseEvent() {
            i.MouseManager.instance.releaseCapture();
        }
        set drawCallOptimize(t) {
            this._setBit(ye.DRAWCALL_OPTIMIZE, t);
        }
        get drawCallOptimize() {
            return this._getBit(ye.DRAWCALL_OPTIMIZE);
        }
    }
    Ae.regClass("laya.display.Sprite", Pe), Ae.regClass("Laya.Sprite", Pe);
    class Le extends Se {
        constructor() {
            super(...arguments), this.italic = !1;
        }
        reset() {
            return super.reset(), this.italic = !1, this.align = "left", this.wordWrap = !1,
                this.leading = 0, this.padding = [0, 0, 0, 0], this.bgColor = null, this.borderColor = null,
                this.asPassword = !1, this.stroke = 0, this.strokeColor = "#000000", this.bold = !1,
                this.underline = !1, this.underlineColor = null, this.currBitmapFont = null, this;
        }
        recover() {
            this !== Le.EMPTY && s.recover("TextStyle", this.reset());
        }
        static create() {
            return s.getItemByClass("TextStyle", Le);
        }
        render(t, e, i, s) {
            (this.bgColor || this.borderColor) && e.drawRect(i, s, t.width, t.height, this.bgColor, this.borderColor, 1);
        }
    }
    Le.EMPTY = new Le();
    class De extends Pe {
        constructor() {
            super(), this._textWidth = 0, this._textHeight = 0, this._lines = [], this._lineWidths = [],
                this._startX = 0, this._startY = 0, this._charSize = {}, this._valign = "top", this._fontSize = De.defaultFontSize,
                this._font = De.defaultFont, this._color = "#000000", this._singleCharRender = !1,
                this.overflow = De.VISIBLE, this._style = Le.EMPTY;
        }
        static defaultFontStr() {
            return De.defaultFontSize + "px " + De.defaultFont;
        }
        getStyle() {
            return this._style === Le.EMPTY && (this._style = Le.create()), this._style;
        }
        _getTextStyle() {
            return this._style === Le.EMPTY && (this._style = Le.create()), this._style;
        }
        static registerBitmapFont(t, e) {
            De._bitmapFonts || (De._bitmapFonts = {}), De._bitmapFonts[t] = e;
        }
        static unregisterBitmapFont(t, e = !0) {
            if (De._bitmapFonts && De._bitmapFonts[t]) {
                var i = De._bitmapFonts[t];
                e && i.destroy(), delete De._bitmapFonts[t];
            }
        }
        destroy(t = !0) {
            super.destroy(t), this._clipPoint = null, this._lines = null, this._lineWidths = null,
                this._words && this._words.forEach(function (t) {
                    t.cleanCache();
                }), this._words = null, this._charSize = null;
        }
        _getBoundPointsM(t = !1) {
            var e = g.TEMP;
            return e.setTo(0, 0, this.width, this.height), e._getBoundPoints();
        }
        getGraphicBounds(t = !1) {
            var e = g.TEMP;
            return e.setTo(0, 0, this.width, this.height), e;
        }
        get width() {
            return this._width ? this._width : this.textWidth + this.padding[1] + this.padding[3];
        }
        set width(t) {
            t != this._width && (super.set_width(t), this.isChanged = !0, this.borderColor && this._setBorderStyleColor(0, 0, this.width, this.height, this.borderColor, 1));
        }
        _getCSSStyle() {
            return this._style;
        }
        get height() {
            return this._height ? this._height : this.textHeight;
        }
        set height(t) {
            t != this._height && (super.set_height(t), this.isChanged = !0, this.borderColor && this._setBorderStyleColor(0, 0, this.width, this.height, this.borderColor, 1));
        }
        get textWidth() {
            return this._isChanged && i.systemTimer.runCallLater(this, this.typeset), this._textWidth;
        }
        get textHeight() {
            return this._isChanged && i.systemTimer.runCallLater(this, this.typeset), this._textHeight;
        }
        get text() {
            return this._text || "";
        }
        get_text() {
            return this._text || "";
        }
        set_text(t) {
            this._text !== t && (this.lang(t + ""), this.isChanged = !0, this.event(qt.CHANGE),
                this.borderColor && this._setBorderStyleColor(0, 0, this.width, this.height, this.borderColor, 1));
        }
        set text(t) {
            this.set_text(t);
        }
        lang(t, e = null, i = null, s = null, r = null, a = null, n = null, h = null, o = null, l = null, _ = null) {
            if (t = De.langPacks && De.langPacks[t] ? De.langPacks[t] : t, arguments.length < 2) this._text = t; else {
                for (var u = 0, c = arguments.length; u < c; u++) t = t.replace("{" + u + "}", arguments[u + 1]);
                this._text = t;
            }
        }
        get font() {
            return this._font;
        }
        set font(t) {
            this._style.currBitmapFont && (this._getTextStyle().currBitmapFont = null, this.scale(1, 1)),
                De._bitmapFonts && De._bitmapFonts[t] && (this._getTextStyle().currBitmapFont = De._bitmapFonts[t]),
                this._font = t, this.isChanged = !0;
        }
        get fontSize() {
            return this._fontSize;
        }
        set fontSize(t) {
            this._fontSize != t && (this._fontSize = t, this.isChanged = !0);
        }
        get bold() {
            return this._style.bold;
        }
        set bold(t) {
            this._getTextStyle().bold = t, this.isChanged = !0;
        }
        get color() {
            return this._color;
        }
        set color(t) {
            this.set_color(t);
        }
        get_color() {
            return this._color;
        }
        set_color(t) {
            this._color != t && (this._color = t, !this._isChanged && this._graphics ? this._graphics.replaceTextColor(this.color) : this.isChanged = !0);
        }
        get italic() {
            return this._style.italic;
        }
        set italic(t) {
            this._getTextStyle().italic = t, this.isChanged = !0;
        }
        get align() {
            return this._style.align;
        }
        set align(t) {
            this._getTextStyle().align = t, this.isChanged = !0;
        }
        get valign() {
            return this._valign;
        }
        set valign(t) {
            this._valign = t, this.isChanged = !0;
        }
        get wordWrap() {
            return this._style.wordWrap;
        }
        set wordWrap(t) {
            this._getTextStyle().wordWrap = t, this.isChanged = !0;
        }
        get leading() {
            return this._style.leading;
        }
        set leading(t) {
            this._getTextStyle().leading = t, this.isChanged = !0;
        }
        get padding() {
            return this._style.padding;
        }
        set padding(t) {
            if ("string" == typeof t) {
                var e, i, s;
                for (s = (e = t.split(",")).length; e.length < 4;) e.push(0);
                for (i = 0; i < s; i++) e[i] = parseFloat(e[i]) || 0;
                t = e;
            }
            this._getTextStyle().padding = t, this.isChanged = !0;
        }
        get bgColor() {
            return this._style.bgColor;
        }
        set bgColor(t) {
            this.set_bgColor(t);
        }
        set_bgColor(t) {
            this._getTextStyle().bgColor = t, this._renderType |= pe.STYLE, this._setBgStyleColor(0, 0, this.width, this.height, t),
                this._setRenderType(this._renderType), this.isChanged = !0;
        }
        get_bgColor() {
            return this._style.bgColor;
        }
        get borderColor() {
            return this._style.borderColor;
        }
        set borderColor(t) {
            this._getTextStyle().borderColor = t, this._renderType |= pe.STYLE, this._setBorderStyleColor(0, 0, this.width, this.height, t, 1),
                this._setRenderType(this._renderType), this.isChanged = !0;
        }
        get stroke() {
            return this._style.stroke;
        }
        set stroke(t) {
            this._getTextStyle().stroke = t, this.isChanged = !0;
        }
        get strokeColor() {
            return this._style.strokeColor;
        }
        set strokeColor(t) {
            this._getTextStyle().strokeColor = t, this.isChanged = !0;
        }
        set isChanged(t) {
            this._isChanged !== t && (this._isChanged = t, t && i.systemTimer.callLater(this, this.typeset));
        }
        _getContextFont() {
            return (this.italic ? "italic " : "") + (this.bold ? "bold " : "") + this.fontSize + "px " + (i.Browser.onIPhone && De.fontFamilyMap[this.font] || this.font);
        }
        _isPassWordMode() {
            var t = this._style.asPassword;
            return "prompt" in this && this.prompt == this._text && (t = !1), t;
        }
        _getPassWordTxt(t) {
            var e;
            e = "";
            for (var i = t.length; i > 0; i--) e += "●";
            return e;
        }
        _renderText() {
            var t = this.padding, e = this._lines.length;
            this.overflow != De.VISIBLE && (e = Math.min(e, Math.floor((this.height - t[0] - t[2]) / (this.leading + this._charSize.height)) + 1));
            var s = this.scrollY / (this._charSize.height + this.leading) | 0, r = this.graphics;
            r.clear(!0);
            var a = this._getContextFont();
            i.Browser.context.font = a;
            var n = t[3], h = "left", o = this._lines, l = this.leading + this._charSize.height, _ = this._style.currBitmapFont;
            _ && (l = this.leading + _.getMaxHeight());
            var u = t[0];
            if (!_ && this._width > 0 && this._textWidth <= this._width && ("right" == this.align ? (h = "right",
                n = this._width - t[1]) : "center" == this.align && (h = "center", n = .5 * this._width + t[3] - t[1])),
                this._height > 0) {
                var c = this._textHeight > this._height ? "top" : this.valign;
                "middle" === c ? u = .5 * (this._height - e * l) + t[0] - t[2] : "bottom" === c && (u = this._height - e * l - t[2]);
            }
            var d = this._style;
            if (_ && _.autoScaleSize) var p = _.fontSize / this.fontSize;
            if (this._clipPoint) {
                var f, g;
                if (r.save(), _ && _.autoScaleSize) f = this._width ? this._width - t[3] - t[1] : this._textWidth,
                    g = this._height ? this._height - t[0] - t[2] : this._textHeight, f *= p, g *= p,
                    r.clipRect(t[3], t[0], f, g); else r.clipRect(t[3], t[0], this._width ? this._width - t[3] - t[1] : this._textWidth, this._height ? this._height - t[0] - t[2] : this._textHeight);
                this.repaint();
            }
            var m = d.asPassword;
            "prompt" in this && this.prompt == this._text && (m = !1);
            for (var v = 0, T = 0, x = Math.min(this._lines.length, e + s) || 1, y = s; y < x; y++) {
                var E, b = o[y];
                if (m) {
                    var w = b.length;
                    b = "";
                    for (var C = w; C > 0; C--) b += "●";
                }
                if (null == b && (b = ""), v = n - (this._clipPoint ? this._clipPoint.x : 0), T = u + l * y - (this._clipPoint ? this._clipPoint.y : 0),
                    this.underline && this._drawUnderline(h, v, T, y), _) {
                    var A = this.width;
                    _.autoScaleSize && (A = this.width * p), _._drawText(b, this, v, T, this.align, A);
                } else this._words || (this._words = []), this._words.length > y - s ? E = this._words[y - s] : (E = new $t(),
                    this._words.push(E)), E.setText(b), E.splitRender = this._singleCharRender, d.stroke ? r.fillBorderText(E, v, T, a, this.color, h, d.stroke, d.strokeColor) : r.fillText(E, v, T, a, this.color, h);
            }
            if (_ && _.autoScaleSize) {
                var R = 1 / p;
                this.scale(R, R);
            }
            this._clipPoint && r.restore(), this._startX = n, this._startY = u;
        }
        _drawUnderline(t, e, i, s) {
            var r = this._lineWidths[s];
            switch (t) {
                case "center":
                    e -= r / 2;
                    break;

                case "right":
                    e -= r;
            }
            i += this._charSize.height, this._graphics.drawLine(e, i, e + r, i, this.underlineColor || this.color, 1);
        }
        typeset() {
            if (this._isChanged = !1, !this._text) return this._clipPoint = null, this._textWidth = this._textHeight = 0,
                void this.graphics.clear(!0);
            i.Render.isConchApp ? window.conchTextCanvas.font = this._getContextFont() : i.Browser.context.font = this._getContextFont(),
                this._lines.length = 0, this._lineWidths.length = 0, this._isPassWordMode() ? this._parseLines(this._getPassWordTxt(this._text)) : this._parseLines(this._text),
                this._evalTextSize(), this._checkEnabledViewportOrNot() ? this._clipPoint || (this._clipPoint = new f(0, 0)) : this._clipPoint = null,
                this._renderText();
        }
        _evalTextSize() {
            var t, e;
            t = Math.max.apply(this, this._lineWidths), this._style.currBitmapFont ? e = this._lines.length * (this._style.currBitmapFont.getMaxHeight() + this.leading) + this.padding[0] + this.padding[2] : (e = this._lines.length * (this._charSize.height + this.leading) + this.padding[0] + this.padding[2],
                this._lines.length && (e -= this.leading)), t == this._textWidth && e == this._textHeight || (this._textWidth = t,
                    this._textHeight = e);
        }
        _checkEnabledViewportOrNot() {
            return this.overflow == De.SCROLL && (this._width > 0 && this._textWidth > this._width || this._height > 0 && this._textHeight > this._height);
        }
        changeText(t) {
            this._text !== t && (this.lang(t + ""), this._graphics && this._graphics.replaceText(this._text) || this.typeset());
        }
        _parseLines(t) {
            var e = this.wordWrap || this.overflow == De.HIDDEN;
            if (e) var s = this._getWordWrapWidth();
            var r = this._style.currBitmapFont;
            if (r) this._charSize.width = r.getMaxWidth(), this._charSize.height = r.getMaxHeight(); else {
                var a = null;
                (a = i.Render.isConchApp ? window.conchTextCanvas.measureText(De._testWord) : i.Browser.context.measureText(De._testWord)) || (a = {
                    width: 100
                }), this._charSize.width = a.width, this._charSize.height = a.height || this.fontSize;
            }
            for (var n = t.replace(/\r\n/g, "\n").split("\n"), h = 0, o = n.length; h < o; h++) {
                var l = n[h];
                e ? this._parseLine(l, s) : (this._lineWidths.push(this._getTextWidth(l)), this._lines.push(l));
            }
        }
        _parseLine(t, e) {
            var i = this._lines, s = 0, r = 0, a = 0, n = 0;
            if ((r = this._getTextWidth(t)) <= e) return i.push(t), void this._lineWidths.push(r);
            r = this._charSize.width, 0 == (s = Math.floor(e / r)) && (s = 1), a = r = this._getTextWidth(t.substring(0, s));
            for (var h = s, o = t.length; h < o; h++) if ((a += r = this._getTextWidth(t.charAt(h))) > e) if (this.wordWrap) {
                var l = t.substring(n, h);
                if (l.charCodeAt(l.length - 1) < 255) {
                    var _ = /(?:\w|-)+$/.exec(l);
                    _ && (h = _.index + n, 0 == _.index ? h += l.length : l = t.substring(n, h));
                }
                if (i.push(l), this._lineWidths.push(a - r), n = h, !(h + s < o)) {
                    i.push(t.substring(n, o)), this._lineWidths.push(this._getTextWidth(i[i.length - 1])),
                        n = -1;
                    break;
                }
                h += s, a = r = this._getTextWidth(t.substring(n, h)), h--;
            } else if (this.overflow == De.HIDDEN) return i.push(t.substring(0, h)), void this._lineWidths.push(this._getTextWidth(i[i.length - 1]));
            this.wordWrap && -1 != n && (i.push(t.substring(n, o)), this._lineWidths.push(this._getTextWidth(i[i.length - 1])));
        }
        _getTextWidth(t) {
            var e = this._style.currBitmapFont;
            if (e) return e.getTextWidth(t);
            if (i.Render.isConchApp) return window.conchTextCanvas.measureText(t).width;
            return (i.Browser.context.measureText(t) || {
                width: 100
            }).width;
        }
        _getWordWrapWidth() {
            var t, e = this.padding, s = this._style.currBitmapFont;
            return (t = s && s.autoScaleSize ? this._width * (s.fontSize / this.fontSize) : this._width) <= 0 && (t = this.wordWrap ? 100 : i.Browser.width),
                t <= 0 && (t = 100), t - e[3] - e[1];
        }
        getCharPoint(t, e = null) {
            this._isChanged && i.systemTimer.runCallLater(this, this.typeset);
            for (var s = 0, r = this._lines, a = 0, n = 0, h = r.length; n < h; n++) {
                if (t < (s += r[n].length)) {
                    var o = n;
                    break;
                }
                a = s;
            }
            var l = (this.italic ? "italic " : "") + (this.bold ? "bold " : "") + this.fontSize + "px " + this.font;
            i.Browser.context.font = l;
            var _ = this._getTextWidth(this._text.substring(a, t));
            return (e || new f()).setTo(this._startX + _ - (this._clipPoint ? this._clipPoint.x : 0), this._startY + o * (this._charSize.height + this.leading) - (this._clipPoint ? this._clipPoint.y : 0));
        }
        set scrollX(t) {
            if (!(this.overflow != De.SCROLL || this.textWidth < this._width) && this._clipPoint) {
                t = t < this.padding[3] ? this.padding[3] : t;
                var e = this._textWidth - this._width;
                t = t > e ? e : t, this._clipPoint.x = t, this._renderText();
            }
        }
        get scrollX() {
            return this._clipPoint ? this._clipPoint.x : 0;
        }
        set scrollY(t) {
            if (!(this.overflow != De.SCROLL || this.textHeight < this._height) && this._clipPoint) {
                t = t < this.padding[0] ? this.padding[0] : t;
                var e = this._textHeight - this._height;
                t = t > e ? e : t, this._clipPoint.y = t, this._renderText();
            }
        }
        get scrollY() {
            return this._clipPoint ? this._clipPoint.y : 0;
        }
        get maxScrollX() {
            return this.textWidth < this._width ? 0 : this._textWidth - this._width;
        }
        get maxScrollY() {
            return this.textHeight < this._height ? 0 : this._textHeight - this._height;
        }
        get lines() {
            return this._isChanged && this.typeset(), this._lines;
        }
        get underlineColor() {
            return this._style.underlineColor;
        }
        set underlineColor(t) {
            this._getTextStyle().underlineColor = t, this._isChanged || this._renderText();
        }
        get underline() {
            return this._style.underline;
        }
        set underline(t) {
            this._getTextStyle().underline = t;
        }
        set singleCharRender(t) {
            this._singleCharRender = t;
        }
        get singleCharRender() {
            return this._singleCharRender;
        }
    }
    De.VISIBLE = "visible", De.SCROLL = "scroll", De.HIDDEN = "hidden", De.defaultFontSize = 12,
        De.defaultFont = "Arial", De.isComplexText = !1, De.fontFamilyMap = {
            "报隶": "报隶-简",
            "黑体": "黑体-简",
            "楷体": "楷体-简",
            "兰亭黑": "兰亭黑-简",
            "隶变": "隶变-简",
            "凌慧体": "凌慧体-简",
            "翩翩体": "翩翩体-简",
            "苹方": "苹方-简",
            "手札体": "手札体-简",
            "宋体": "宋体-简",
            "娃娃体": "娃娃体-简",
            "魏碑": "魏碑-简",
            "行楷": "行楷-简",
            "雅痞": "雅痞-简",
            "圆体": "圆体-简"
        }, De._testWord = "游", De.CharacterCache = !0, De.RightToLeft = !1, i.regClass(De),
        Ae.regClass("laya.display.Text", De), Ae.regClass("Laya.Text", De);
    class Be extends De {
        constructor() {
            super(), this._multiline = !1, this._editable = !0, this._maxChars = 1e5, this._type = "text",
                this._prompt = "", this._promptColor = "#A9A9A9", this._originColor = "#000000",
                this._content = "", Be.IOS_IFRAME = i.Browser.onIOS && i.Browser.window.top != i.Browser.window.self,
                this._width = 100, this._height = 20, this.multiline = !1, this.overflow = De.SCROLL,
                this.on(qt.MOUSE_DOWN, this, this._onMouseDown), this.on(qt.UNDISPLAY, this, this._onUnDisplay);
        }
        static __init__() {
            if (Be._createInputElement(), i.Browser.onMobile) {
                var t = !1;
                (i.Browser.onMiniGame || i.Browser.onBDMiniGame || i.Browser.onQGMiniGame || i.Browser.onKGMiniGame || i.Browser.onVVMiniGame || i.Browser.onAlipayMiniGame || i.Browser.onQQMiniGame || i.Browser.onBLMiniGame || i.Browser.onTTMiniGame || i.Browser.onHWMiniGame || i.Browser.onTBMiniGame) && (t = !0),
                    i.Render.canvas.addEventListener(Be.IOS_IFRAME ? t ? "touchend" : "click" : "touchend", Be._popupInputMethod);
            }
        }
        static _popupInputMethod(t) {
            Be.isInputting && Be.inputElement.focus();
        }
        static _createInputElement() {
            Be._initInput(Be.area = i.Browser.createElement("textarea")), Be._initInput(Be.input = i.Browser.createElement("input")),
                Be.inputContainer = i.Browser.createElement("div"), Be.inputContainer.style.position = "absolute",
                Be.inputContainer.style.zIndex = 1e5, i.Browser.container.appendChild(Be.inputContainer),
                Be.inputContainer.setPos = function (t, e) {
                    Be.inputContainer.style.left = t + "px", Be.inputContainer.style.top = e + "px";
                };
        }
        static _initInput(t) {
            var e = t.style;
            e.cssText = "position:absolute;overflow:hidden;resize:none;transform-origin:0 0;-webkit-transform-origin:0 0;-moz-transform-origin:0 0;-o-transform-origin:0 0;",
                e.resize = "none", e.backgroundColor = "transparent", e.border = "none", e.outline = "none",
                e.zIndex = 1, t.addEventListener("input", Be._processInputting), t.addEventListener("mousemove", Be._stopEvent),
                t.addEventListener("mousedown", Be._stopEvent), t.addEventListener("touchmove", Be._stopEvent),
                t.setFontFace = function (e) {
                    t.style.fontFamily = e;
                }, i.Render.isConchApp || (t.setColor = function (e) {
                    t.style.color = e;
                }, t.setFontSize = function (e) {
                    t.style.fontSize = e + "px";
                });
        }
        static _processInputting(t) {
            var e = Be.inputElement.target;
            if (e) {
                var i = Be.inputElement.value;
                e._restrictPattern && (i = i.replace(/\u2006|\x27/g, ""), e._restrictPattern.test(i) && (i = i.replace(e._restrictPattern, ""),
                    Be.inputElement.value = i)), e._text = i, e.event(qt.INPUT);
            }
        }
        static _stopEvent(t) {
            "touchmove" == t.type && t.preventDefault(), t.stopPropagation && t.stopPropagation();
        }
        setSelection(t, e) {
            this.focus = !0, Be.inputElement.selectionStart = t, Be.inputElement.selectionEnd = e;
        }
        get multiline() {
            return this._multiline;
        }
        set multiline(t) {
            this._multiline = t, this.valign = t ? "top" : "middle";
        }
        get nativeInput() {
            return this._multiline ? Be.area : Be.input;
        }
        _onUnDisplay(t = null) {
            this.focus = !1;
        }
        _onMouseDown(t) {
            this.focus = !0;
        }
        _syncInputTransform() {
            var t = this.nativeInput, e = Q.getTransformRelativeToWindow(this, this.padding[3], this.padding[0]), s = this._width - this.padding[1] - this.padding[3], r = this._height - this.padding[0] - this.padding[2];
            i.Render.isConchApp ? (t.setScale(e.scaleX, e.scaleY), t.setSize(s, r), t.setPos(e.x, e.y)) : (Be.inputContainer.style.transform = Be.inputContainer.style.webkitTransform = "scale(" + e.scaleX + "," + e.scaleY + ") rotate(" + i.stage.canvasDegree + "deg)",
                t.style.width = s + "px", t.style.height = r + "px", Be.inputContainer.style.left = e.x + "px",
                Be.inputContainer.style.top = e.y + "px");
        }
        select() {
            this.nativeInput.select();
        }
        get focus() {
            return this._focus;
        }
        set focus(t) {
            var e = this.nativeInput;
            this._focus !== t && (t ? (e.target ? e.target._focusOut() : this._setInputMethod(),
                e.target = this, this._focusIn()) : (e.target = null, this._focusOut(), i.Browser.document.body.scrollTop = 0,
                    e.blur(), i.Render.isConchApp ? e.setPos(-1e4, -1e4) : Be.inputContainer.contains(e) && Be.inputContainer.removeChild(e)));
        }
        _setInputMethod() {
            Be.input.parentElement && Be.inputContainer.removeChild(Be.input), Be.area.parentElement && Be.inputContainer.removeChild(Be.area),
                Be.inputElement = this._multiline ? Be.area : Be.input, Be.inputContainer.appendChild(Be.inputElement),
                De.RightToLeft && (Be.inputElement.style.direction = "rtl");
        }
        _focusIn() {
            Be.isInputting = !0;
            var t = this.nativeInput;
            Be.input && (Be.input.type = this._type), this._focus = !0;
            var e = t.style;
            e.whiteSpace = this.wordWrap ? "pre-wrap" : "nowrap", this._setPromptColor(), t.readOnly = !this._editable,
                i.Render.isConchApp && (t.setType(this._type), t.setForbidEdit(!this._editable)),
                t.maxLength = this._maxChars;
            this.padding;
            if (t.value = this._content, t.placeholder = this._prompt, i.stage.off(qt.KEY_DOWN, this, this._onKeyDown),
                i.stage.on(qt.KEY_DOWN, this, this._onKeyDown), i.stage.focus = this, this.event(qt.FOCUS),
                i.Browser.onPC && t.focus(), !(i.Browser.onMiniGame || i.Browser.onBDMiniGame || i.Browser.onQGMiniGame || i.Browser.onKGMiniGame || i.Browser.onVVMiniGame || i.Browser.onAlipayMiniGame || i.Browser.onQQMiniGame || i.Browser.onBLMiniGame || i.Browser.onTTMiniGame || i.Browser.onHWMiniGame || i.Browser.onTBMiniGame)) {
                this._text;
                this._text = null;
            }
            this.typeset(), t.setColor(this._originColor), t.setFontSize(this.fontSize), t.setFontFace(i.Browser.onIPhone && De.fontFamilyMap[this.font] || this.font),
                i.Render.isConchApp && t.setMultiAble && t.setMultiAble(this._multiline), e.lineHeight = this.leading + this.fontSize + "px",
                e.fontStyle = this.italic ? "italic" : "normal", e.fontWeight = this.bold ? "bold" : "normal",
                e.textAlign = this.align, e.padding = "0 0", this._syncInputTransform(), !i.Render.isConchApp && i.Browser.onPC && i.systemTimer.frameLoop(1, this, this._syncInputTransform);
        }
        _setPromptColor() {
            Be.promptStyleDOM = i.Browser.getElementById("promptStyle"), Be.promptStyleDOM || (Be.promptStyleDOM = i.Browser.createElement("style"),
                Be.promptStyleDOM.setAttribute("id", "promptStyle"), i.Browser.document.head.appendChild(Be.promptStyleDOM)),
                Be.promptStyleDOM.innerText = "input::-webkit-input-placeholder, textarea::-webkit-input-placeholder {color:" + this._promptColor + "}input:-moz-placeholder, textarea:-moz-placeholder {color:" + this._promptColor + "}input::-moz-placeholder, textarea::-moz-placeholder {color:" + this._promptColor + "}input:-ms-input-placeholder, textarea:-ms-input-placeholder {color:" + this._promptColor + "}";
        }
        _focusOut() {
            Be.isInputting && (Be.isInputting = !1, this._focus = !1, this._text = null, this._content = this.nativeInput.value,
                this._content ? (super.set_text(this._content), super.set_color(this._originColor)) : (super.set_text(this._prompt),
                    super.set_color(this._promptColor)), i.stage.off(qt.KEY_DOWN, this, this._onKeyDown),
                i.stage.focus = null, this.event(qt.BLUR), this.event(qt.CHANGE), i.Render.isConchApp && this.nativeInput.blur(),
                i.Browser.onPC && i.systemTimer.clear(this, this._syncInputTransform));
        }
        _onKeyDown(t) {
            13 === t.keyCode && (i.Browser.onMobile && !this._multiline && (this.focus = !1),
                this.event(qt.ENTER));
        }
        set text(t) {
            super.set_color(this._originColor), t += "", this._focus ? (this.nativeInput.value = t || "",
                this.event(qt.CHANGE)) : (this._multiline || (t = t.replace(/\r?\n/g, "")), this._content = t,
                    t ? super.set_text(t) : (super.set_text(this._prompt), super.set_color(this.promptColor)));
        }
        get text() {
            return this._focus ? this.nativeInput.value : this._content || "";
        }
        changeText(t) {
            this._content = t, this._focus ? (this.nativeInput.value = t || "", this.event(qt.CHANGE)) : super.changeText(t);
        }
        set color(t) {
            this._focus && this.nativeInput.setColor(t), super.set_color(this._content ? t : this._promptColor),
                this._originColor = t;
        }
        get color() {
            return super.color;
        }
        set bgColor(t) {
            super.set_bgColor(t), i.Render.isConchApp && this.nativeInput.setBgColor(t);
        }
        get bgColor() {
            return super.bgColor;
        }
        get restrict() {
            return this._restrictPattern ? this._restrictPattern.source : "";
        }
        set restrict(t) {
            t ? ((t = "[^" + t + "]").indexOf("^^") > -1 && (t = t.replace("^^", "")), this._restrictPattern = new RegExp(t, "g")) : this._restrictPattern = null;
        }
        set editable(t) {
            this._editable = t, i.Render.isConchApp && Be.input.setForbidEdit(!t);
        }
        get editable() {
            return this._editable;
        }
        get maxChars() {
            return this._maxChars;
        }
        set maxChars(t) {
            t <= 0 && (t = 1e5), this._maxChars = t;
        }
        get prompt() {
            return this._prompt;
        }
        set prompt(t) {
            !this._text && t && super.set_color(this._promptColor), this.promptColor = this._promptColor,
                this._text ? super.set_text(this._text == this._prompt ? t : this._text) : super.set_text(t),
                this._prompt = De.langPacks && De.langPacks[t] ? De.langPacks[t] : t;
        }
        get promptColor() {
            return this._promptColor;
        }
        set promptColor(t) {
            this._promptColor = t, this._content || super.set_color(t);
        }
        get type() {
            return this._type;
        }
        set type(t) {
            this._getTextStyle().asPassword = "password" === t, this._type = t;
        }
    }
    Be.TYPE_TEXT = "text", Be.TYPE_PASSWORD = "password", Be.TYPE_EMAIL = "email", Be.TYPE_URL = "url",
        Be.TYPE_NUMBER = "number", Be.TYPE_RANGE = "range", Be.TYPE_DATE = "date", Be.TYPE_MONTH = "month",
        Be.TYPE_WEEK = "week", Be.TYPE_TIME = "time", Be.TYPE_DATE_TIME = "datetime", Be.TYPE_DATE_TIME_LOCAL = "datetime-local",
        Be.TYPE_SEARCH = "search", Be.IOS_IFRAME = !1, Be.inputHeight = 45, Be.isInputting = !1,
        Ae.regClass("laya.display.Input", Be), Ae.regClass("Laya.Input", Be);
    class Fe {
        constructor() {
            this.preOvers = [], this.preDowns = [], this.preRightDowns = [], this.enable = !0,
                this._event = new qt(), this._lastClickTime = 0;
        }
        _clearTempArrs() {
            Fe._oldArr.length = 0, Fe._newArr.length = 0, Fe._tEleArr.length = 0;
        }
        getTouchFromArr(t, e) {
            var i, s, r;
            for (s = e.length, i = 0; i < s; i++) if ((r = e[i]).id == t) return r;
            return null;
        }
        removeTouchFromArr(t, e) {
            var i;
            for (i = e.length - 1; i >= 0; i--) e[i].id == t && e.splice(i, 1);
        }
        createTouchO(t, e) {
            var i;
            return (i = s.getItem("TouchData") || {}).id = e, i.tar = t, i;
        }
        onMouseDown(t, e, i = !1) {
            var s, r, a, n;
            this.enable && (s = this.getTouchFromArr(e, this.preOvers), a = this.getEles(t, null, Fe._tEleArr),
                s ? s.tar = t : (r = this.createTouchO(t, e), this.preOvers.push(r)), ee.onMobile && this.sendEvents(a, qt.MOUSE_OVER),
                n = i ? this.preDowns : this.preRightDowns, (s = this.getTouchFromArr(e, n)) ? s.tar = t : (r = this.createTouchO(t, e),
                    n.push(r)), this.sendEvents(a, i ? qt.MOUSE_DOWN : qt.RIGHT_MOUSE_DOWN), this._clearTempArrs());
        }
        sendEvents(t, e) {
            var i, s, r;
            for (s = t.length, this._event._stoped = !1, r = t[0], i = 0; i < s; i++) {
                var a = t[i];
                if (a.destroyed) return;
                if (a.event(e, this._event.setTo(e, a, r)), this._event._stoped) break;
            }
        }
        getEles(t, e = null, i = null) {
            for (i ? i.length = 0 : i = []; t && t != e;) i.push(t), t = t.parent;
            return i;
        }
        checkMouseOutAndOverOfMove(t, e, i = 0) {
            var s, r, a, n;
            if (e != t) if (e.contains(t)) r = this.getEles(t, e, Fe._tEleArr), this.sendEvents(r, qt.MOUSE_OVER); else if (t.contains(e)) r = this.getEles(e, t, Fe._tEleArr),
                this.sendEvents(r, qt.MOUSE_OUT); else {
                var h, o, l;
                for ((r = Fe._tEleArr).length = 0, h = this.getEles(e, null, Fe._oldArr), o = this.getEles(t, null, Fe._newArr),
                    n = h.length, a = 0; a < n; a++) {
                    if (s = h[a], (l = o.indexOf(s)) >= 0) {
                        o.splice(l, o.length - l);
                        break;
                    }
                    r.push(s);
                }
                r.length > 0 && this.sendEvents(r, qt.MOUSE_OUT), o.length > 0 && this.sendEvents(o, qt.MOUSE_OVER);
            }
        }
        onMouseMove(t, e) {
            var i, s;
            this.enable && ((i = this.getTouchFromArr(e, this.preOvers)) ? (this.checkMouseOutAndOverOfMove(t, i.tar),
                i.tar = t, s = this.getEles(t, null, Fe._tEleArr)) : (s = this.getEles(t, null, Fe._tEleArr),
                    this.sendEvents(s, qt.MOUSE_OVER), this.preOvers.push(this.createTouchO(t, e))),
                this.sendEvents(s, qt.MOUSE_MOVE), this._clearTempArrs());
        }
        getLastOvers() {
            return Fe._tEleArr.length = 0, this.preOvers.length > 0 && this.preOvers[0].tar ? this.getEles(this.preOvers[0].tar, null, Fe._tEleArr) : (Fe._tEleArr.push(i.stage),
                Fe._tEleArr);
        }
        stageMouseOut() {
            var t;
            t = this.getLastOvers(), this.preOvers.length = 0, this.sendEvents(t, qt.MOUSE_OUT);
        }
        onMouseUp(t, e, i = !1) {
            if (this.enable) {
                var r, a, n, h, o, l, _, u, c = ee.onMobile;
                if (a = this.getEles(t, null, Fe._tEleArr), this.sendEvents(a, i ? qt.MOUSE_UP : qt.RIGHT_MOUSE_UP),
                    u = i ? this.preDowns : this.preRightDowns, r = this.getTouchFromArr(e, u)) {
                    var d, p = ee.now();
                    if (d = p - this._lastClickTime < 300, this._lastClickTime = p, t == r.tar) _ = a; else for (n = this.getEles(r.tar, null, Fe._oldArr),
                        (_ = Fe._newArr).length = 0, o = n.length, h = 0; h < o; h++) l = n[h], a.indexOf(l) >= 0 && _.push(l);
                    _.length > 0 && this.sendEvents(_, i ? qt.CLICK : qt.RIGHT_CLICK), i && d && this.sendEvents(_, qt.DOUBLE_CLICK),
                        this.removeTouchFromArr(e, u), r.tar = null, s.recover("TouchData", r);
                } else;
                (r = this.getTouchFromArr(e, this.preOvers)) && c && ((_ = this.getEles(r.tar, null, _)) && _.length > 0 && this.sendEvents(_, qt.MOUSE_OUT),
                    this.removeTouchFromArr(e, this.preOvers), r.tar = null, s.recover("TouchData", r)),
                    this._clearTempArrs();
            }
        }
    }
    Fe.I = new Fe(), Fe._oldArr = [], Fe._newArr = [], Fe._tEleArr = [];
    class Oe {
        constructor() {
            this.mouseX = 0, this.mouseY = 0, this.disableMouseEvent = !1, this.mouseDownTime = 0,
                this.mouseMoveAccuracy = 2, this._event = new qt(), this._captureSp = null, this._captureChain = [],
                this._captureExlusiveMode = !1, this._hitCaputreSp = !1, this._point = new f(),
                this._rect = new g(), this._lastMoveTimer = 0, this._prePoint = new f(), this._touchIDs = {},
                this._curTouchID = NaN, this._id = 1;
        }
        __init__(t, e) {
            this._stage = t;
            var i = this;
            e.oncontextmenu = function (t) {
                if (Oe.enabled) return !1;
            }, e.addEventListener("mousedown", function (t) {
                Oe.enabled && (ee.onIE || t.cancelable && t.preventDefault(), i.mouseDownTime = ee.now(),
                    i.runEvent(t));
            }), e.addEventListener("mouseup", function (t) {
                Oe.enabled && (t.cancelable && t.preventDefault(), i.mouseDownTime = -ee.now(),
                    i.runEvent(t));
            }, !0), e.addEventListener("mousemove", function (t) {
                if (Oe.enabled) {
                    t.cancelable && t.preventDefault();
                    var e = ee.now();
                    if (e - i._lastMoveTimer < 10) return;
                    i._lastMoveTimer = e, i.runEvent(t);
                }
            }, !0), e.addEventListener("mouseout", function (t) {
                Oe.enabled && i.runEvent(t);
            }), e.addEventListener("mouseover", function (t) {
                Oe.enabled && i.runEvent(t);
            }), e.addEventListener("touchstart", function (t) {
                Oe.enabled && (Oe._isFirstTouch || Be.isInputting || t.cancelable && t.preventDefault(),
                    i.mouseDownTime = ee.now(), i.runEvent(t));
            }), e.addEventListener("touchend", function (t) {
                Oe.enabled ? (Oe._isFirstTouch || Be.isInputting || t.cancelable && t.preventDefault(),
                    Oe._isFirstTouch = !1, i.mouseDownTime = -ee.now(), i.runEvent(t)) : i._curTouchID = NaN;
            }, !0), e.addEventListener("touchmove", function (t) {
                Oe.enabled && (t.cancelable && t.preventDefault(), i.runEvent(t));
            }, !0), e.addEventListener("touchcancel", function (t) {
                Oe.enabled ? (t.cancelable && t.preventDefault(), i.runEvent(t)) : i._curTouchID = NaN;
            }, !0), e.addEventListener("mousewheel", function (t) {
                Oe.enabled && i.runEvent(t);
            }), e.addEventListener("DOMMouseScroll", function (t) {
                Oe.enabled && i.runEvent(t);
            });
        }
        initEvent(t, e = null) {
            var i;
            this._event._stoped = !1, this._event.nativeEvent = e || t, this._target = null,
                this._point.setTo(t.pageX || t.clientX, t.pageY || t.clientY), this._stage._canvasTransform && (this._stage._canvasTransform.invertTransformPoint(this._point),
                    this.mouseX = this._point.x, this.mouseY = this._point.y), this._event.touchId = t.identifier || 0,
                this._tTouchID = this._event.touchId, (i = Fe.I._event)._stoped = !1, i.nativeEvent = this._event.nativeEvent,
                i.touchId = this._event.touchId;
        }
        checkMouseWheel(t) {
            this._event.delta = t.wheelDelta ? .025 * t.wheelDelta : -t.detail;
            for (var e = Fe.I.getLastOvers(), i = 0, s = e.length; i < s; i++) {
                var r = e[i];
                r.event(qt.MOUSE_WHEEL, this._event.setTo(qt.MOUSE_WHEEL, r, this._target));
            }
        }
        onMouseMove(t) {
            Fe.I.onMouseMove(t, this._tTouchID);
        }
        onMouseDown(t) {
            if (Be.isInputting && i.stage.focus && i.stage.focus.focus && !i.stage.focus.contains(this._target)) {
                var e = i.stage.focus._tf || i.stage.focus, s = t._tf || t;
                s instanceof Be && s.multiline == e.multiline ? e._focusOut() : e.focus = !1;
            }
            Fe.I.onMouseDown(t, this._tTouchID, this._isLeftMouse);
        }
        onMouseUp(t) {
            Fe.I.onMouseUp(t, this._tTouchID, this._isLeftMouse);
        }
        check(t, e, i, s) {
            this._point.setTo(e, i), t.fromParentPoint(this._point), e = this._point.x, i = this._point.y;
            var r = t._style.scrollRect;
            if (r && (this._rect.setTo(r.x, r.y, r.width, r.height), !this._rect.contains(e, i))) return !1;
            if (!this.disableMouseEvent) {
                if (t.hitTestPrior && !t.mouseThrough && !this.hitTest(t, e, i)) return !1;
                for (var a = t._children.length - 1; a > -1; a--) {
                    var n = t._children[a];
                    if (!n.destroyed && n._mouseState > 1 && n._visible && this.check(n, e, i, s)) return !0;
                }
                for (a = t._extUIChild.length - 1; a >= 0; a--) {
                    var h = t._extUIChild[a];
                    if (!h.destroyed && h._mouseState > 1 && h._visible && this.check(h, e, i, s)) return !0;
                }
            }
            var o = !(!t.hitTestPrior || t.mouseThrough || this.disableMouseEvent) || this.hitTest(t, e, i);
            return o ? (this._target = t, s.call(this, t), this._target == this._hitCaputreSp && (this._hitCaputreSp = !0)) : s === this.onMouseUp && t === this._stage && (this._target = this._stage,
                s.call(this, this._target)), o;
        }
        hitTest(t, e, i) {
            var s = !1;
            t.scrollRect && (e -= t._style.scrollRect.x, i -= t._style.scrollRect.y);
            var r = t._style.hitArea;
            return r && r._hit ? r.contains(e, i) : ((t.width > 0 && t.height > 0 || t.mouseThrough || r) && (s = t.mouseThrough ? t.getGraphicBounds().contains(e, i) : (r || this._rect.setTo(0, 0, t.width, t.height)).contains(e, i)),
                s);
        }
        _checkAllBaseUI(t, e, i) {
            var s = this.handleExclusiveCapture(this.mouseX, this.mouseY, i);
            return !!s || (s = this.check(this._stage, this.mouseX, this.mouseY, i), this.handleCapture(this.mouseX, this.mouseY, i) || s);
        }
        check3DUI(t, e, i) {
            for (var s = this._stage._3dUI, r = 0, a = !1; r < s.length; r++) {
                var n = s[r];
                this._stage._curUIBase = n, !n.destroyed && n._mouseState > 1 && n._visible && (a = a || this.check(n, this.mouseX, this.mouseY, i));
            }
            return this._stage._curUIBase = this._stage, a;
        }
        handleExclusiveCapture(t, e, i) {
            if (this._captureExlusiveMode && this._captureSp && this._captureChain.length > 0) {
                var s;
                this._point.setTo(t, e);
                for (var r = 0; r < this._captureChain.length; r++) (s = this._captureChain[r]).fromParentPoint(this._point);
                return this._target = s, i.call(this, s), !0;
            }
            return !1;
        }
        handleCapture(t, e, i) {
            if (!this._hitCaputreSp && this._captureSp && this._captureChain.length > 0) {
                var s;
                this._point.setTo(t, e);
                for (var r = 0; r < this._captureChain.length; r++) (s = this._captureChain[r]).fromParentPoint(this._point);
                return this._target = s, i.call(this, s), !0;
            }
            return !1;
        }
        runEvent(t) {
            var e, i, s;
            switch ("mousemove" !== t.type && (this._prePoint.x = this._prePoint.y = -1e6),
            t.type) {
                case "mousedown":
                    this._touchIDs[0] = this._id++, Oe._isTouchRespond ? Oe._isTouchRespond = !1 : (this._isLeftMouse = 0 === t.button,
                        this.initEvent(t), this._checkAllBaseUI(this.mouseX, this.mouseY, this.onMouseDown));
                    break;

                case "mouseup":
                    this._isLeftMouse = 0 === t.button, this.initEvent(t), this._checkAllBaseUI(this.mouseX, this.mouseY, this.onMouseUp);
                    break;

                case "mousemove":
                    Math.abs(this._prePoint.x - t.clientX) + Math.abs(this._prePoint.y - t.clientY) >= this.mouseMoveAccuracy && (this._prePoint.x = t.clientX,
                        this._prePoint.y = t.clientY, this.initEvent(t), this._checkAllBaseUI(this.mouseX, this.mouseY, this.onMouseMove));
                    break;

                case "touchstart":
                    Oe._isTouchRespond = !0, this._isLeftMouse = !0;
                    var r = t.changedTouches;
                    for (e = 0, i = r.length; e < i; e++) s = r[e], (Oe.multiTouchEnabled || isNaN(this._curTouchID)) && (this._curTouchID = s.identifier,
                        this._id % 200 == 0 && (this._touchIDs = {}), this._touchIDs[s.identifier] = this._id++,
                        this.initEvent(s, t), this._checkAllBaseUI(this.mouseX, this.mouseY, this.onMouseDown));
                    break;

                case "touchend":
                case "touchcancel":
                    Oe._isTouchRespond = !0, this._isLeftMouse = !0;
                    var a = t.changedTouches;
                    for (e = 0, i = a.length; e < i; e++) {
                        if (s = a[e], Oe.multiTouchEnabled || s.identifier == this._curTouchID) this._curTouchID = NaN,
                            this.initEvent(s, t), this._checkAllBaseUI(this.mouseX, this.mouseY, this.onMouseUp) || this.onMouseUp(null);
                    }
                    break;

                case "touchmove":
                    var n = t.changedTouches;
                    for (e = 0, i = n.length; e < i; e++) s = n[e], (Oe.multiTouchEnabled || s.identifier == this._curTouchID) && (this.initEvent(s, t),
                        this._checkAllBaseUI(this.mouseX, this.mouseY, this.onMouseMove));
                    break;

                case "wheel":
                case "mousewheel":
                case "DOMMouseScroll":
                    this.checkMouseWheel(t);
                    break;

                case "mouseout":
                    Fe.I.stageMouseOut();
                    break;

                case "mouseover":
                    this._stage.event(qt.MOUSE_OVER, this._event.setTo(qt.MOUSE_OVER, this._stage, this._stage));
            }
        }
        setCapture(t, e = !1) {
            this._captureSp = t, this._captureExlusiveMode = e, this._captureChain.length = 0,
                this._captureChain.push(t);
            for (var s = t; s != i.stage && s != i.stage._curUIBase && (s = s.parent);) this._captureChain.splice(0, 0, s);
        }
        releaseCapture() {
            console.log("release capture"), this._captureSp = null;
        }
    }
    Oe.instance = new Oe(), Oe.enabled = !0, Oe.multiTouchEnabled = !0, Oe._isFirstTouch = !0;
    class Ne {
        constructor() {
            this._pool = [], this._map = {}, this._laters = [];
        }
        _update() {
            let t = this._laters, e = t.length;
            if (e > 0) {
                for (let i = 0, s = e - 1; i <= s; i++) {
                    let e = t[i];
                    this._map[e.key] = null, null !== e.method && (e.run(), e.clear()), this._pool.push(e),
                        i === s && (s = t.length - 1);
                }
                t.length = 0;
            }
        }
        _getHandler(t, e) {
            var s = t ? t.$_GID || (t.$_GID = i.Utils.getGID()) : 0, r = e.$_TID || (e.$_TID = i.Timer._mid++);
            return this._map[s + "." + r];
        }
        callLater(t, e, i = null) {
            if (null == this._getHandler(t, e)) {
                let a;
                (a = this._pool.length ? this._pool.pop() : new Ue()).caller = t, a.method = e,
                    a.args = i;
                var s = t ? t.$_GID : 0, r = e.$_TID;
                a.key = s + "." + r, this._map[a.key] = a, this._laters.push(a);
            }
        }
        runCallLater(t, e) {
            var i = this._getHandler(t, e);
            i && null != i.method && (this._map[i.key] = null, i.run(), i.clear());
        }
    }
    Ne.I = new Ne();
    class Ue {
        clear() {
            this.caller = null, this.method = null, this.args = null;
        }
        run() {
            var t = this.caller;
            if (t && t.destroyed) return this.clear();
            var e = this.method, i = this.args;
            null != e && (i ? e.apply(t, i) : e.call(t));
        }
    }
    class Ge { }
    Ge.createShaderCondition = function (t) {
        var e = "(function() {return " + t + ";})";
        return window.Laya._runScript(e);
    }, Ge.changeWebGLSize = function (t, e) {
        he.onStageResize(t, e);
    };
    class ke extends Pe {
        constructor() {
            super(), this.offset = new f(), this._frameRate = "fast", this.designWidth = 0,
                this.designHeight = 0, this.canvasRotation = !1, this.canvasDegree = 0, this.renderingEnabled = !0,
                this.screenAdaptationEnabled = !0, this._canvasTransform = new p(), this._screenMode = "none",
                this._scaleMode = "noscale", this._alignV = "top", this._alignH = "left", this._bgColor = "black",
                this._mouseMoveTime = 0, this._renderCount = 0, this._safariOffsetY = 0, this._frameStartTime = 0,
                this._previousOrientation = ee.window.orientation, this._wgColor = [0, 0, 0, 1],
                this._scene3Ds = [], this._globalRepaintSet = !1, this._globalRepaintGet = !1, this._3dUI = [],
                this._curUIBase = null, this.useRetinalCanvas = !1, super.set_transform(this._createTransform()),
                this.mouseEnabled = !0, this.hitTestPrior = !0, this.autoSize = !1, this._setBit(ye.DISPLAYED_INSTAGE, !0),
                this._setBit(ye.ACTIVE_INHIERARCHY, !0), this._isFocused = !0, this._isVisibility = !0,
                this.useRetinalCanvas = e.useRetinalCanvas;
            var t = ee.window;
            t.addEventListener("focus", () => {
                this._isFocused = !0, this.event(qt.FOCUS), this.event(qt.FOCUS_CHANGE);
            }), t.addEventListener("blur", () => {
                this._isFocused = !1, this.event(qt.BLUR), this.event(qt.FOCUS_CHANGE), this._isInputting() && (Be.inputElement.target.focus = !1);
            });
            var i = "visibilityState", s = "visibilitychange", r = t.document;
            void 0 !== r.hidden ? (s = "visibilitychange", i = "visibilityState") : void 0 !== r.mozHidden ? (s = "mozvisibilitychange",
                i = "mozVisibilityState") : void 0 !== r.msHidden ? (s = "msvisibilitychange", i = "msVisibilityState") : void 0 !== r.webkitHidden && (s = "webkitvisibilitychange",
                    i = "webkitVisibilityState"), t.document.addEventListener(s, () => {
                        "hidden" == ee.document[i] ? (this._isVisibility = !1, this._isInputting() && (Be.inputElement.target.focus = !1)) : this._isVisibility = !0,
                            this.renderingEnabled = this._isVisibility, this.event(qt.VISIBILITY_CHANGE);
                    }),

                    // t.addEventListener("resize", () => {
                    //     var t = ee.window.orientation;
                    //     null != t && t != this._previousOrientation && this._isInputting() && (Be.inputElement.target.focus = !1),
                    //         this._previousOrientation = t, this._isInputting() || (ee.onSafari && (this._safariOffsetY = (ee.window.__innerHeight || ee.document.body.clientHeight || ee.document.documentElement.clientHeight) - ee.window.innerHeight),
                    //             this._resetCanvas());
                    // }), 
                    // t.addEventListener("orientationchange", t => {
                    //     this._resetCanvas();
                    // }), 
                    
                    t.addEventListener("resize", () => {
                        var orientation = ee.window.orientation;
                        if (orientation != null && orientation != this._previousOrientation && this._isInputting()) {
                            Be["inputElement"].target.focus = false;
                        }
                        this._previousOrientation = orientation;
                        if (this._isInputting())
                            return;
                        if (ee.onSafari){
                            this._safariOffsetY = (ee.window.__innerHeight || ee.document.body.clientHeight || ee.document.documentElement.clientHeight) - ee.window.innerHeight;
                            this._safariOffsetY =Math.max(0,this._safariOffsetY);
                        }
                            
                        this._resetCanvas();
                    }),
        
                    t.addEventListener("orientationchange", (e) => {
                        if (ee.onSafari) {
                            clearTimeout(this._timeoutId);
                            this._timeoutId = setTimeout(() => {
                                this._safariOffsetY = (ee.window.__innerHeight || ee.document.body.clientHeight || ee.document.documentElement.clientHeight) - ee.window.innerHeight;
                                this._safariOffsetY =Math.max(0,this._safariOffsetY);
                                this._resetCanvas();
        
                            }, 0.5e3);
                        } else {
                            this._resetCanvas();
                        }
                    }),

                    this.on(qt.MOUSE_MOVE, this, this._onmouseMove), ee.onMobile && this.on(qt.MOUSE_DOWN, this, this._onmouseMove);
        }
        _isInputting() {
            return ee.onMobile && Be.isInputting;
        }
        set width(t) {
            this.designWidth = t, super.set_width(t), i.systemTimer.callLater(this, this._changeCanvasSize);
        }
        get width() {
            return super.get_width();
        }
        set height(t) {
            this.designHeight = t, super.set_height(t), i.systemTimer.callLater(this, this._changeCanvasSize);
        }
        get height() {
            return super.get_height();
        }
        set transform(t) {
            super.set_transform(t);
        }
        get transform() {
            return this._tfChanged && this._adjustTransform(), this._transform = this._transform || this._createTransform();
        }
        get isFocused() {
            return this._isFocused;
        }
        get isVisibility() {
            return this._isVisibility;
        }
        _changeCanvasSize() {
            this.setScreenSize(ee.clientWidth * ee.pixelRatio, ee.clientHeight * ee.pixelRatio);
        }
        _resetCanvas() {
            this.screenAdaptationEnabled && this._changeCanvasSize();
        }
        setScreenSize(t, e) {
            var i = !1;
            if (this._screenMode !== ke.SCREEN_NONE && (i = (t / e < 1 ? ke.SCREEN_VERTICAL : ke.SCREEN_HORIZONTAL) !== this._screenMode)) {
                var s = e;
                e = t, t = s;
            }
            this.canvasRotation = i;
            var r = le._mainCanvas, a = r.source.style, n = this._canvasTransform.identity(), h = this._scaleMode, o = t / this.designWidth, l = e / this.designHeight, _ = this.useRetinalCanvas ? t : this.designWidth, u = this.useRetinalCanvas ? e : this.designHeight, c = t, d = e, p = ee.pixelRatio;
            switch (this._width = this.designWidth, this._height = this.designHeight, h) {
                case ke.SCALE_NOSCALE:
                    o = l = 1, c = this.designWidth, d = this.designHeight;
                    break;

                case ke.SCALE_SHOWALL:
                    o = l = Math.min(o, l), _ = c = Math.round(this.designWidth * o), u = d = Math.round(this.designHeight * l);
                    break;

                case ke.SCALE_NOBORDER:
                    o = l = Math.max(o, l), c = Math.round(this.designWidth * o), d = Math.round(this.designHeight * l);
                    break;

                case ke.SCALE_FULL:
                    o = l = 1, this._width = _ = t, this._height = u = e;
                    break;

                case ke.SCALE_FIXED_WIDTH:
                    l = o, this._height = u = Math.round(e / o);
                    break;

                case ke.SCALE_FIXED_HEIGHT:
                    o = l, this._width = _ = Math.round(t / l);
                    break;

                case ke.SCALE_FIXED_AUTO:
                    t / e < this.designWidth / this.designHeight ? (l = o, this._height = u = Math.round(e / o)) : (o = l,
                        this._width = _ = Math.round(t / l));
            }
            this.useRetinalCanvas && (c = _ = t, d = u = e), o *= this.scaleX, l *= this.scaleY,
                1 === o && 1 === l ? this.transform.identity() : (this.transform.a = this._formatData(o / (c / _)),
                    this.transform.d = this._formatData(l / (d / u))), r.size(_, u), Ge.changeWebGLSize(_, u),
                n.scale(c / _ / p, d / u / p), this._alignH === ke.ALIGN_LEFT ? this.offset.x = 0 : this._alignH === ke.ALIGN_RIGHT ? this.offset.x = t - c : this.offset.x = .5 * (t - c) / p,
                this._alignV === ke.ALIGN_TOP ? this.offset.y = 0 : this._alignV === ke.ALIGN_BOTTOM ? this.offset.y = e - d : this.offset.y = .5 * (e - d) / p,
                this.offset.x = Math.round(this.offset.x), this.offset.y = Math.round(this.offset.y),
                n.translate(this.offset.x, this.offset.y), this._safariOffsetY && n.translate(0, this._safariOffsetY),
                this.canvasDegree = 0, i && (this._screenMode === ke.SCREEN_HORIZONTAL ? (n.rotate(Math.PI / 2),
                    n.translate(e / p, 0), this.canvasDegree = 90) : (n.rotate(-Math.PI / 2), n.translate(0, t / p),
                        this.canvasDegree = -90)), n.a = this._formatData(n.a), n.d = this._formatData(n.d),
                n.tx = this._formatData(n.tx), n.ty = this._formatData(n.ty), super.set_transform(this.transform),
                a.transformOrigin = a.webkitTransformOrigin = a.msTransformOrigin = a.mozTransformOrigin = a.oTransformOrigin = "0px 0px 0px",
                a.transform = a.webkitTransform = a.msTransform = a.mozTransform = a.oTransform = "matrix(" + n.toString() + ")",
                a.width = _, a.height = u, this._safariOffsetY && n.translate(0, -this._safariOffsetY),
                n.translate(parseInt(a.left) || 0, parseInt(a.top) || 0), this.visible = !0, this._repaint |= pe.REPAINT_CACHE,
                this.event(qt.RESIZE);
        }
        _formatData(t) {
            return Math.abs(t) < 1e-6 ? 0 : Math.abs(1 - t) < .001 ? t > 0 ? 1 : -1 : t;
        }
        get scaleMode() {
            return this._scaleMode;
        }
        set scaleMode(t) {
            this._scaleMode = t, i.systemTimer.callLater(this, this._changeCanvasSize);
        }
        get alignH() {
            return this._alignH;
        }
        set alignH(t) {
            this._alignH = t, i.systemTimer.callLater(this, this._changeCanvasSize);
        }
        get alignV() {
            return this._alignV;
        }
        set alignV(t) {
            this._alignV = t, i.systemTimer.callLater(this, this._changeCanvasSize);
        }
        get bgColor() {
            return this._bgColor;
        }
        set bgColor(t) {
            this._bgColor = t, this._wgColor = t ? Z.create(t).arrColor : null, le.canvas.style.background = t || "none";
        }
        get mouseX() {
            return Math.round(Oe.instance.mouseX / this.clientScaleX);
        }
        get mouseY() {
            return Math.round(Oe.instance.mouseY / this.clientScaleY);
        }
        getMousePoint() {
            return f.TEMP.setTo(this.mouseX, this.mouseY);
        }
        get clientScaleX() {
            return this._transform ? this._transform.getScaleX() : 1;
        }
        get clientScaleY() {
            return this._transform ? this._transform.getScaleY() : 1;
        }
        get screenMode() {
            return this._screenMode;
        }
        set screenMode(t) {
            this._screenMode = t;
        }
        repaint(t = pe.REPAINT_CACHE) {
            this._repaint |= t;
        }
        parentRepaint(t = pe.REPAINT_CACHE) { }
        _loop() {
            return this._globalRepaintGet = this._globalRepaintSet, this._globalRepaintSet = !1,
                this.render(le._context, 0, 0), !0;
        }
        getFrameTm() {
            return this._frameStartTime;
        }
        _onmouseMove(t) {
            this._mouseMoveTime = ee.now();
        }
        getTimeFromFrameStart() {
            return ee.now() - this._frameStartTime;
        }
        set visible(t) {
            this.visible !== t && (super.set_visible(t), le._mainCanvas.source.style.visibility = t ? "visible" : "hidden");
        }
        get visible() {
            return super.visible;
        }
        render(t, e, i) {
            if (window.conch) this.renderToNative(t, e, i); else {
                if (this._frameRate === ke.FRAME_SLEEP) {
                    var s = ee.now();
                    if (!(s - this._frameStartTime >= 1e3)) return;
                    this._frameStartTime = s;
                } else {
                    if (!this._visible) return this._renderCount++, void (this._renderCount % 5 == 0 && (Ne.I._update(),
                        V.loopCount++, xt.loopCount = V.loopCount, this._updateTimers()));
                    this._frameStartTime = ee.now(), xt.loopStTm = this._frameStartTime;
                }
                this._renderCount++;
                var r = (this._frameRate === ke.FRAME_MOUSE ? this._frameStartTime - this._mouseMoveTime < 2e3 ? ke.FRAME_FAST : ke.FRAME_SLOW : this._frameRate) !== ke.FRAME_SLOW, a = this._renderCount % 2 == 0;
                if (V.renderSlow = !r, r || a) {
                    if (Ne.I._update(), V.loopCount++, xt.loopCount = V.loopCount, this.renderingEnabled) {
                        for (var n = 0, h = this._scene3Ds.length; n < h; n++) this._scene3Ds[n]._update();
                        t.clear(), super.render(t, e, i), V._StatRender.renderNotCanvas(t, e, i);
                    }
                    this.renderingEnabled && (ke.clear(this._bgColor), t.flush(), Te.instance && Te.getInstance().endDispose()),
                        this._updateTimers();
                }
            }
        }
        renderToNative(t, e, i) {
            if (this._renderCount++, this._visible) {
                if (Ne.I._update(), V.loopCount++, xt.loopCount = V.loopCount, this.renderingEnabled) {
                    for (var s = 0, r = this._scene3Ds.length; s < r; s++) this._scene3Ds[s]._update();
                    t.clear(), super.render(t, e, i), V._StatRender.renderNotCanvas(t, e, i);
                }
                this.renderingEnabled && (ke.clear(this._bgColor), t.flush(), Te.instance && Te.getInstance().endDispose()),
                    this._updateTimers();
            } else this._renderCount % 5 == 0 && (Ne.I._update(), V.loopCount++, xt.loopCount = V.loopCount,
                this._updateTimers());
        }
        _updateTimers() {
            i.systemTimer._update(), i.startTimer._update(), i.physicsTimer._update(), i.updateTimer._update(),
                i.lateTimer._update(), i.timer._update();
        }
        set fullScreenEnabled(t) {
            var e = ee.document, i = le.canvas;
            t ? (i.addEventListener("mousedown", this._requestFullscreen), i.addEventListener("touchstart", this._requestFullscreen),
                e.addEventListener("fullscreenchange", this._fullScreenChanged), e.addEventListener("mozfullscreenchange", this._fullScreenChanged),
                e.addEventListener("webkitfullscreenchange", this._fullScreenChanged), e.addEventListener("msfullscreenchange", this._fullScreenChanged)) : (i.removeEventListener("mousedown", this._requestFullscreen),
                    i.removeEventListener("touchstart", this._requestFullscreen), e.removeEventListener("fullscreenchange", this._fullScreenChanged),
                    e.removeEventListener("mozfullscreenchange", this._fullScreenChanged), e.removeEventListener("webkitfullscreenchange", this._fullScreenChanged),
                    e.removeEventListener("msfullscreenchange", this._fullScreenChanged));
        }
        get frameRate() {
            return i.Render.isConchApp ? this._frameRateNative : this._frameRate;
        }
        set frameRate(t) {
            if (i.Render.isConchApp) {
                var e = window.conch;
                switch (t) {
                    case ke.FRAME_FAST:
                        e.config.setLimitFPS(60);
                        break;

                    case ke.FRAME_MOUSE:
                        e.config.setMouseFrame(2e3);
                        break;

                    case ke.FRAME_SLOW:
                        e.config.setSlowFrame(!0);
                        break;

                    case ke.FRAME_SLEEP:
                        e.config.setLimitFPS(1);
                }
                this._frameRateNative = t;
            } else this._frameRate = t;
        }
        _requestFullscreen() {
            var t = ee.document.documentElement;
            t.requestFullscreen ? t.requestFullscreen() : t.mozRequestFullScreen ? t.mozRequestFullScreen() : t.webkitRequestFullscreen ? t.webkitRequestFullscreen() : t.msRequestFullscreen && t.msRequestFullscreen();
        }
        _fullScreenChanged() {
            i.stage.event(qt.FULL_SCREEN_CHANGE);
        }
        exitFullscreen() {
            var t = ee.document;
            t.exitFullscreen ? t.exitFullscreen() : t.mozCancelFullScreen ? t.mozCancelFullScreen() : t.webkitExitFullscreen && t.webkitExitFullscreen();
        }
        isGlobalRepaint() {
            return this._globalRepaintGet;
        }
        setGlobalRepaint() {
            this._globalRepaintSet = !0;
        }
        add3DUI(t) {
            var e = t.rootView;
            this._3dUI.indexOf(e) >= 0 || this._3dUI.push(e);
        }
        remove3DUI(t) {
            var e = t.rootView, i = this._3dUI.indexOf(e);
            return i >= 0 && (this._3dUI.splice(i, 1), !0);
        }
    }
    ke.SCALE_NOSCALE = "noscale", ke.SCALE_EXACTFIT = "exactfit", ke.SCALE_SHOWALL = "showall",
        ke.SCALE_NOBORDER = "noborder", ke.SCALE_FULL = "full", ke.SCALE_FIXED_WIDTH = "fixedwidth",
        ke.SCALE_FIXED_HEIGHT = "fixedheight", ke.SCALE_FIXED_AUTO = "fixedauto", ke.ALIGN_LEFT = "left",
        ke.ALIGN_RIGHT = "right", ke.ALIGN_CENTER = "center", ke.ALIGN_TOP = "top", ke.ALIGN_MIDDLE = "middle",
        ke.ALIGN_BOTTOM = "bottom", ke.SCREEN_NONE = "none", ke.SCREEN_HORIZONTAL = "horizontal",
        ke.SCREEN_VERTICAL = "vertical", ke.FRAME_FAST = "fast", ke.FRAME_SLOW = "slow",
        ke.FRAME_MOUSE = "mouse", ke.FRAME_SLEEP = "sleep", ke.clear = function (t) {
            ae.set2DRenderConfig();
            var s = m.instance;
            O.worldScissorTest && s.disable(s.SCISSOR_TEST);
            var r = le.context, a = 0 == r._submits._length || e.preserveDrawingBuffer ? Z.create(t).arrColor : i.stage._wgColor;
            a ? r.clearBG(a[0], a[1], a[2], a[3]) : r.clearBG(0, 0, 0, 0), O.clear();
        }, Ae.regClass("laya.display.Stage", ke), Ae.regClass("Laya.Stage", ke);
    class We {
        static __init__() {
            We._addEvent("keydown"), We._addEvent("keypress"), We._addEvent("keyup");
        }
        static _addEvent(t) {
            i.Browser.document.addEventListener(t, function (e) {
                We._dispatch(e, t);
            }, !0);
        }
        static _dispatch(t, e) {
            if (We.enabled) {
                We._event._stoped = !1, We._event.nativeEvent = t, We._event.keyCode = t.keyCode || t.which || t.charCode,
                    "keydown" === e ? We._pressKeys[We._event.keyCode] = !0 : "keyup" === e && (We._pressKeys[We._event.keyCode] = null);
                for (var s = i.stage.focus && null != i.stage.focus.event && i.stage.focus.displayedInStage ? i.stage.focus : i.stage, r = s; r;) r.event(e, We._event.setTo(e, r, s)),
                    r = r.parent;
            }
        }
        static hasKeyDown(t) {
            return We._pressKeys[t];
        }
    }
    We._pressKeys = {}, We.enabled = !0, We._event = new qt();
    class Ve extends x {
        constructor() {
            super(...arguments), this.isStopped = !1;
        }
        set volume(t) { }
        get volume() {
            return 1;
        }
        get position() {
            return 0;
        }
        get duration() {
            return 0;
        }
        play() { }
        stop() {
            this.completeHandler && this.completeHandler.runWith(!1);
        }
        pause() { }
        resume() { }
        __runComplete(t) {
            t && t.runWith(!0);
        }
    }
    class Ye extends Ve {
        constructor(t) {
            super(), this._audio = null, this._onEnd = this.__onEnd.bind(this), this._resumePlay = this.__resumePlay.bind(this),
                t.addEventListener("ended", this._onEnd), this._audio = t;
        }
        __onEnd(t) {
            if (1 == this.loops) return this.completeHandler && (i.systemTimer.once(10, this, this.__runComplete, [this.completeHandler], !1),
                this.completeHandler = null), this.stop(), void this.event(qt.COMPLETE);
            this.loops > 0 && this.loops--, this.startTime = 0, this.play();
        }
        __resumePlay() {
            if (this._audio && this._audio.removeEventListener("canplay", this._resumePlay),
                !this.isStopped) try {
                    this._audio.currentTime = this.startTime, ee.container.appendChild(this._audio),
                        this._audio.play();
                } catch (t) {
                    this.event(qt.ERROR);
                }
        }
        play() {
            this.isStopped = !1;
            try {
                this._audio.playbackRate = i.SoundManager.playbackRate, this._audio.currentTime = this.startTime;
            } catch (t) {
                return void this._audio.addEventListener("canplay", this._resumePlay);
            }
            i.SoundManager.addChannel(this), ee.container.appendChild(this._audio), "play" in this._audio && this._audio.play();
        }
        get position() {
            return this._audio ? this._audio.currentTime : 0;
        }
        get duration() {
            return this._audio ? this._audio.duration : 0;
        }
        stop() {
            super.stop(), this.isStopped = !0, i.SoundManager.removeChannel(this), this.completeHandler = null,
                this._audio && ("pause" in this._audio && i.Render.isConchApp && this._audio.stop(),
                    this._audio.pause(), this._audio.removeEventListener("ended", this._onEnd), this._audio.removeEventListener("canplay", this._resumePlay),
                    i.Browser.onIE || this._audio != i.AudioSound._musicAudio && i.Pool.recover("audio:" + this.url, this._audio),
                    ee.removeElement(this._audio), this._audio = null, i.SoundManager.autoReleaseSound && i.SoundManager.disposeSoundLater(this.url));
        }
        pause() {
            this.isStopped = !0, i.SoundManager.removeChannel(this), "pause" in this._audio && this._audio.pause(),
                i.SoundManager.autoReleaseSound && i.SoundManager.disposeSoundLater(this.url);
        }
        resume() {
            var t = this._audio;
            t && (this.isStopped = !1, 0 == t.readyState && (t.src = this.url, t.addEventListener("canplay", this._resumePlay),
                t.load()), i.SoundManager.addChannel(this), "play" in t && t.play());
        }
        set volume(t) {
            this._audio && (this._audio.volume = t);
        }
        get volume() {
            return this._audio ? this._audio.volume : 1;
        }
    }
    class Xe extends x {
        constructor() {
            super(...arguments), this.loaded = !1;
        }
        dispose() {
            var t = Xe._audioCache[this.url];
            s.clearBySign("audio:" + this.url), t && (le.isConchApp || (t.src = ""), delete Xe._audioCache[this.url]);
        }
        static _initMusicAudio() {
            Xe._musicAudio || (Xe._musicAudio || (Xe._musicAudio = ee.createElement("audio")),
                le.isConchApp || ee.document.addEventListener("mousedown", Xe._makeMusicOK));
        }
        static _makeMusicOK() {
            ee.document.removeEventListener("mousedown", Xe._makeMusicOK), Xe._musicAudio.src ? Xe._musicAudio.play() : (Xe._musicAudio.src = "",
                Xe._musicAudio.load());
        }
        load(t) {
            var e;
            if (t = E.formatURL(t), this.url = t, t == i.SoundManager._bgMusic ? (Xe._initMusicAudio(),
                (e = Xe._musicAudio).src != t && (Xe._audioCache[e.src] = null, e = null)) : e = Xe._audioCache[t],
                e && e.readyState >= 2) this.event(qt.COMPLETE); else {
                e || (t == i.SoundManager._bgMusic ? (Xe._initMusicAudio(), e = Xe._musicAudio) : e = ee.createElement("audio"),
                    Xe._audioCache[t] = e, e.src = t), e.addEventListener("canplaythrough", onLoaded),
                    e.addEventListener("error", onErr);
                var s = this;
                this.audio = e, e.load ? e.load() : onErr();
            }
            function onLoaded() {
                offs(), s.loaded = !0, s.event(qt.COMPLETE);
            }
            function onErr() {
                e.load = null, offs(), s.event(qt.ERROR);
            }
            function offs() {
                e.removeEventListener("canplaythrough", onLoaded), e.removeEventListener("error", onErr);
            }
        }
        play(t = 0, e = 0) {
            if (!this.url) return null;
            var r, a;
            if (!(r = this.url == i.SoundManager._bgMusic ? Xe._musicAudio : Xe._audioCache[this.url])) return null;
            a = s.getItem("audio:" + this.url), le.isConchApp ? a || ((a = ee.createElement("audio")).src = this.url) : this.url == i.SoundManager._bgMusic ? (Xe._initMusicAudio(),
                (a = Xe._musicAudio).src = this.url) : a = a || r.cloneNode(!0);
            var n = new Ye(a);
            return n.url = this.url, n.loops = e, n.startTime = t, n.play(), i.SoundManager.addChannel(n),
                n;
        }
        get duration() {
            var t;
            return (t = Xe._audioCache[this.url]) ? t.duration : 0;
        }
    }
    Xe._audioCache = {};
    class He extends Ve {
        constructor() {
            super(), this.bufferSource = null, this._currentTime = 0, this._volume = 1, this._startTime = 0,
                this._pauseTime = 0, this.context = i.WebAudioSound.ctx, this._onPlayEnd = Q.bind(this.__onPlayEnd, this),
                this.context.createGain ? this.gain = this.context.createGain() : this.gain = this.context.createGainNode();
        }
        play() {
            if (i.SoundManager.addChannel(this), this.isStopped = !1, this._clearBufferSource(),
                this.audioBuffer) {
                if (this.startTime >= this.duration) return stop();
                var t = this.context, e = this.gain, s = t.createBufferSource();
                this.bufferSource = s, s.buffer = this.audioBuffer, s.connect(e), e && e.disconnect(),
                    e.connect(t.destination), s.onended = this._onPlayEnd, this._startTime = ee.now(),
                    this.gain.gain.setTargetAtTime ? this.gain.gain.setTargetAtTime(this._volume, this.context.currentTime, He.SetTargetDelay) : this.gain.gain.value = this._volume,
                    0 == this.loops && (s.loop = !0), s.playbackRate.setTargetAtTime ? s.playbackRate.setTargetAtTime(i.SoundManager.playbackRate, this.context.currentTime, He.SetTargetDelay) : s.playbackRate.value = i.SoundManager.playbackRate,
                    s.start(0, this.startTime), this._currentTime = 0;
            }
        }
        __onPlayEnd() {
            if (1 == this.loops) return this.completeHandler && (i.timer.once(10, this, this.__runComplete, [this.completeHandler], !1),
                this.completeHandler = null), this.stop(), void this.event(qt.COMPLETE);
            this.loops > 0 && this.loops--, this.startTime = 0, this.play();
        }
        get position() {
            return this.bufferSource ? (ee.now() - this._startTime) / 1e3 + this.startTime : 0;
        }
        get duration() {
            return this.audioBuffer ? this.audioBuffer.duration : 0;
        }
        _clearBufferSource() {
            if (this.bufferSource) {
                var t = this.bufferSource;
                t.stop ? t.stop(0) : t.noteOff(0), t.disconnect(0), t.onended = null, He._tryCleanFailed || this._tryClearBuffer(t),
                    this.bufferSource = null;
            }
        }
        _tryClearBuffer(t) {
            try {
                t.buffer = null;
            } catch (t) {
                He._tryCleanFailed = !0;
            }
        }
        stop() {
            super.stop(), this._clearBufferSource(), this.audioBuffer = null, this.gain && this.gain.disconnect(),
                this.isStopped = !0, i.SoundManager.removeChannel(this), this.completeHandler = null,
                i.SoundManager.autoReleaseSound && i.SoundManager.disposeSoundLater(this.url);
        }
        pause() {
            this.isStopped || (this._pauseTime = this.position), this._clearBufferSource(),
                this.gain && this.gain.disconnect(), this.isStopped = !0, i.SoundManager.removeChannel(this),
                i.SoundManager.autoReleaseSound && i.SoundManager.disposeSoundLater(this.url);
        }
        resume() {
            this.startTime = this._pauseTime, this.play();
        }
        set volume(t) {
            this._volume = t, this.isStopped || (this.gain.gain.setTargetAtTime ? this.gain.gain.setTargetAtTime(t, this.context.currentTime, He.SetTargetDelay) : this.gain.gain.value = t);
        }
        get volume() {
            return this._volume;
        }
    }
    He._tryCleanFailed = !1, He.SetTargetDelay = .001;
    class ze extends x {
        constructor() {
            super(...arguments), this.loaded = !1, this._disposed = !1;
        }
        static decode() {
            ze.buffs.length <= 0 || ze.isDecoding || (ze.isDecoding = !0, ze.tInfo = ze.buffs.shift(),
                ze.ctx.decodeAudioData(ze.tInfo.buffer, ze._done, ze._fail));
        }
        static _done(t) {
            ze.e.event("loaded:" + ze.tInfo.url, t), ze.isDecoding = !1, ze.decode();
        }
        static _fail() {
            ze.e.event("err:" + ze.tInfo.url, null), ze.isDecoding = !1, ze.decode();
        }
        static _playEmptySound() {
            if (null != ze.ctx) {
                var t = ze.ctx.createBufferSource();
                t.buffer = ze._miniBuffer, t.connect(ze.ctx.destination), t.start(0, 0, 0);
            }
        }
        static _unlock() {
            ze._unlocked || (ze._playEmptySound(), "running" == ze.ctx.state && (window.document.removeEventListener("mousedown", ze._unlock, !0),
                window.document.removeEventListener("touchend", ze._unlock, !0), window.document.removeEventListener("touchstart", ze._unlock, !0),
                ze._unlocked = !0));
        }
        static initWebAudio() {
            "running" != ze.ctx.state && (ze._unlock(), window.document.addEventListener("mousedown", ze._unlock, !0),
                window.document.addEventListener("touchend", ze._unlock, !0), window.document.addEventListener("touchstart", ze._unlock, !0));
        }
        load(t) {
            var e = this;
            if (t = E.formatURL(t), this.url = t, this.audioBuffer = ze._dataCache[t], this.audioBuffer) this._loaded(this.audioBuffer); else if (ze.e.on("loaded:" + t, this, this._loaded),
                ze.e.on("err:" + t, this, this._err), !ze.__loadingSound[t]) {
                ze.__loadingSound[t] = !0;
                var i = new XMLHttpRequest();
                i.open("GET", t, !0), i.responseType = "arraybuffer", i.onload = function () {
                    e._disposed ? e._removeLoadEvents() : (e.data = i.response, ze.buffs.push({
                        buffer: e.data,
                        url: e.url
                    }), ze.decode());
                }, i.onerror = function (t) {
                    e._err();
                }, i.send();
            }
        }
        _err() {
            this._removeLoadEvents(), ze.__loadingSound[this.url] = !1, this.event(qt.ERROR);
        }
        _loaded(t) {
            this._removeLoadEvents(), this._disposed || (this.audioBuffer = t, ze._dataCache[this.url] = this.audioBuffer,
                this.loaded = !0, this.event(qt.COMPLETE));
        }
        _removeLoadEvents() {
            ze.e.off("loaded:" + this.url, this, this._loaded), ze.e.off("err:" + this.url, this, this._err);
        }
        __playAfterLoaded() {
            if (this.__toPlays) {
                var t, e, i, s;
                for (e = (i = this.__toPlays).length, t = 0; t < e; t++) (s = i[t])[2] && !s[2].isStopped && this.play(s[0], s[1], s[2]);
                this.__toPlays.length = 0;
            }
        }
        play(t = 0, e = 0, s = null) {
            return s = s || new He(), this.audioBuffer || this.url && (this.__toPlays || (this.__toPlays = []),
                this.__toPlays.push([t, e, s]), this.once(qt.COMPLETE, this, this.__playAfterLoaded),
                this.load(this.url)), s.url = this.url, s.loops = e, s.audioBuffer = this.audioBuffer,
                s.startTime = t, s.play(), i.SoundManager.addChannel(s), s;
        }
        get duration() {
            return this.audioBuffer ? this.audioBuffer.duration : 0;
        }
        dispose() {
            this._disposed = !0, delete ze._dataCache[this.url], delete ze.__loadingSound[this.url],
                this.audioBuffer = null, this.data = null, this.__toPlays = [];
        }
    }
    ze._dataCache = {}, ze.webAudioEnabled = window.AudioContext || window.webkitAudioContext || window.mozAudioContext,
        ze.ctx = ze.webAudioEnabled ? new (window.AudioContext || window.webkitAudioContext || window.mozAudioContext)() : void 0,
        ze.buffs = [], ze.isDecoding = !1, ze._miniBuffer = ze.ctx ? ze.ctx.createBuffer(1, 1, 22050) : void 0,
        ze.e = new x(), ze._unlocked = !1, ze.__loadingSound = {};
    class Ke {
        static __init__() {
            var t = i.Browser.window, e = !!(t.AudioContext || t.webkitAudioContext || t.mozAudioContext);
            return e && ze.initWebAudio(), Ke._soundClass = e ? ze : Xe, Xe._initMusicAudio(),
                Ke._musicClass = Xe, e;
        }
        static addChannel(t) {
            Ke._channels.indexOf(t) >= 0 || Ke._channels.push(t);
        }
        static removeChannel(t) {
            var e;
            for (e = Ke._channels.length - 1; e >= 0; e--) Ke._channels[e] == t && Ke._channels.splice(e, 1);
        }
        static disposeSoundLater(t) {
            Ke._lastSoundUsedTimeDic[t] = i.Browser.now(), Ke._isCheckingDispose || (Ke._isCheckingDispose = !0,
                i.timer.loop(5e3, null, Ke._checkDisposeSound));
        }
        static _checkDisposeSound() {
            var t, e = i.Browser.now(), s = !1;
            for (t in Ke._lastSoundUsedTimeDic) e - Ke._lastSoundUsedTimeDic[t] > 3e4 ? (delete Ke._lastSoundUsedTimeDic[t],
                Ke.disposeSoundIfNotUsed(t)) : s = !0;
            s || (Ke._isCheckingDispose = !1, i.timer.clear(null, Ke._checkDisposeSound));
        }
        static disposeSoundIfNotUsed(t) {
            var e;
            for (e = Ke._channels.length - 1; e >= 0; e--) if (Ke._channels[e].url == t) return;
            Ke.destroySound(t);
        }
        static set autoStopMusic(t) {
            i.stage.off(qt.BLUR, null, Ke._stageOnBlur), i.stage.off(qt.FOCUS, null, Ke._stageOnFocus),
                i.stage.off(qt.VISIBILITY_CHANGE, null, Ke._visibilityChange), Ke._autoStopMusic = t,
                t && (i.stage.on(qt.BLUR, null, Ke._stageOnBlur), i.stage.on(qt.FOCUS, null, Ke._stageOnFocus),
                    i.stage.on(qt.VISIBILITY_CHANGE, null, Ke._visibilityChange));
        }
        static get autoStopMusic() {
            return Ke._autoStopMusic;
        }
        static _visibilityChange() {
            i.stage.isVisibility ? Ke._stageOnFocus() : Ke._stageOnBlur();
        }
        static _stageOnBlur() {
            Ke._isActive = !1, Ke._musicChannel && (Ke._musicChannel.isStopped || (Ke._blurPaused = !0,
                Ke._musicChannel.pause())), Ke.stopAllSound(), i.stage.once(qt.MOUSE_DOWN, null, Ke._stageOnFocus);
        }
        static _recoverWebAudio() {
            ze.ctx && "running" != ze.ctx.state && ze.ctx.resume && ze.ctx.resume();
        }
        static _stageOnFocus() {
            Ke._isActive = !0, Ke._recoverWebAudio(), i.stage.off(qt.MOUSE_DOWN, null, Ke._stageOnFocus),
                Ke._blurPaused && Ke._musicChannel && Ke._musicChannel.isStopped && (Ke._blurPaused = !1,
                    Ke._musicChannel.resume());
        }
        static set muted(t) {
            t != Ke._muted && (t && Ke.stopAllSound(), Ke.musicMuted = t, Ke._muted = t);
        }
        static get muted() {
            return Ke._muted;
        }
        static set soundMuted(t) {
            Ke._soundMuted = t;
        }
        static get soundMuted() {
            return Ke._soundMuted;
        }
        static set musicMuted(t) {
            t != Ke._musicMuted && (t ? (Ke._bgMusic && Ke._musicChannel && !Ke._musicChannel.isStopped ? i.Render.isConchApp ? Ke._musicChannel._audio && (Ke._musicChannel._audio.muted = !0) : Ke._musicChannel.pause() : Ke._musicChannel = null,
                Ke._musicMuted = t) : (Ke._musicMuted = t, Ke._bgMusic && Ke._musicChannel && (i.Render.isConchApp ? Ke._musicChannel._audio && (Ke._musicChannel._audio.muted = !1) : Ke._musicChannel.resume())));
        }
        static get musicMuted() {
            return Ke._musicMuted;
        }
        static get useAudioMusic() {
            return Ke._useAudioMusic;
        }
        static set useAudioMusic(t) {
            Ke._useAudioMusic = t, Ke._musicClass = t ? Xe : null;
        }
        static playSound(t, e = 1, s = null, r = null, a = 0) {
            if (!Ke._isActive || !t) return null;
            if (Ke._muted) return null;
            if (Ke._recoverWebAudio(), (t = E.formatURL(t)) == Ke._bgMusic) {
                if (Ke._musicMuted) return null;
            } else {
                if (i.Render.isConchApp) {
                    var n = Q.getFileExtension(t);
                    if ("wav" != n && "ogg" != n) return alert("The sound only supports wav or ogg format,for optimal performance reason,please refer to the official website document."),
                        null;
                }
                if (Ke._soundMuted) return null;
            }
            var h, o;
            return i.Browser.onBDMiniGame || i.Browser.onMiniGame || i.Browser.onKGMiniGame || i.Browser.onQGMiniGame || i.Browser.onVVMiniGame || i.Browser.onAlipayMiniGame || i.Browser.onQQMiniGame || i.Browser.onBLMiniGame || i.Browser.onTTMiniGame || i.Browser.onHWMiniGame || i.Browser.onTBMiniGame || (h = i.loader.getRes(t)),
                r || (r = Ke._soundClass), h || ((h = new r()).load(t), i.Browser.onBDMiniGame || i.Browser.onMiniGame || i.Browser.onKGMiniGame || i.Browser.onQGMiniGame || i.Browser.onVVMiniGame || i.Browser.onAlipayMiniGame || i.Browser.onQQMiniGame || i.Browser.onBLMiniGame || i.Browser.onTTMiniGame || i.Browser.onHWMiniGame || i.Browser.onTBMiniGame || i.Loader.cacheRes(t, h)),
                (o = h.play(a, e)) ? (o.url = t, o.volume = t == Ke._bgMusic ? Ke.musicVolume : Ke.soundVolume,
                    o.completeHandler = s, o) : null;
        }
        static destroySound(t) {
            var e = i.loader.getRes(t);
            e && (i.Loader.clearRes(t), e.dispose());
        }
        static playMusic(t, e = 0, i = null, s = 0) {
            return t = E.formatURL(t), Ke._bgMusic = t, Ke._musicChannel && Ke._musicChannel.stop(),
                Ke._musicChannel = Ke.playSound(t, e, i, Ke._musicClass, s);
        }
        static stopSound(t) {
            var e, i;
            for (t = E.formatURL(t), e = Ke._channels.length - 1; e >= 0; e--) (i = Ke._channels[e]).url == t && i.stop();
        }
        static stopAll() {
            var t;
            for (Ke._bgMusic = null, t = Ke._channels.length - 1; t >= 0; t--) Ke._channels[t].stop();
        }
        static stopAllSound() {
            var t, e;
            for (t = Ke._channels.length - 1; t >= 0; t--) (e = Ke._channels[t]).url != Ke._bgMusic && e.stop();
        }
        static stopMusic() {
            Ke._musicChannel && Ke._musicChannel.stop(), Ke._bgMusic = null;
        }
        static setSoundVolume(t, e = null) {
            var i, s;
            if (e) e = E.formatURL(e), Ke._setVolume(e, t); else for (Ke.soundVolume = t, i = Ke._channels.length - 1; i >= 0; i--) (s = Ke._channels[i]).url != Ke._bgMusic && (s.volume = t);
        }
        static setMusicVolume(t) {
            Ke.musicVolume = t, Ke._setVolume(Ke._bgMusic, t);
        }
        static _setVolume(t, e) {
            var i, s;
            for (t = E.formatURL(t), i = Ke._channels.length - 1; i >= 0; i--) (s = Ke._channels[i]).url == t && (s.volume = e);
        }
    }
    Ke.musicVolume = 1, Ke.soundVolume = 1, Ke.playbackRate = 1, Ke._useAudioMusic = !0,
        Ke._muted = !1, Ke._soundMuted = !1, Ke._musicMuted = !1, Ke._bgMusic = null, Ke._musicChannel = null,
        Ke._channels = [], Ke._blurPaused = !1, Ke._isActive = !0, Ke._lastSoundUsedTimeDic = {},
        Ke._isCheckingDispose = !1, Ke.autoReleaseSound = !0;
    class je {
        create() {
            return this.json ? i.SceneUtils.createByData(null, this.json) : null;
        }
    }
    class qe {
        constructor() {
            this._fontCharDic = {}, this._fontWidthMap = {}, this._maxWidth = 0, this._spaceWidth = 10,
                this.fontSize = 12, this.autoScaleSize = !1, this.letterSpacing = 0;
        }
        loadFont(t, e) {
            this._path = t, this._complete = e, t && -1 !== t.indexOf(".fnt") ? i.loader.load([{
                url: t,
                type: i.Loader.XML
            }, {
                url: t.replace(".fnt", ".png"),
                type: i.Loader.IMAGE
            }], T.create(this, this._onLoaded)) : console.error('Bitmap font configuration information must be a ".fnt" file');
        }
        _onLoaded() {
            this.parseFont(i.Loader.getRes(this._path), i.Loader.getRes(this._path.replace(".fnt", ".png"))),
                this._complete && this._complete.run();
        }
        parseFont(t, e) {
            if (null != t && null != e) {
                this._texture = e;
                var i = t.getElementsByTagName("info");
                if (!i[0].getAttributeNode) return this.parseFont2(t, e);
                this.fontSize = parseInt(i[0].getAttributeNode("size").nodeValue);
                var s = i[0].getAttributeNode("padding").nodeValue.split(",");
                this._padding = [parseInt(s[0]), parseInt(s[1]), parseInt(s[2]), parseInt(s[3])];
                var r = t.getElementsByTagName("char"), a = 0;
                for (a = 0; a < r.length; a++) {
                    var n = r[a], h = parseInt(n.getAttributeNode("id").nodeValue), o = parseInt(n.getAttributeNode("xoffset").nodeValue) / 1, l = parseInt(n.getAttributeNode("yoffset").nodeValue) / 1, _ = parseInt(n.getAttributeNode("xadvance").nodeValue) / 1, u = new g();
                    u.x = parseInt(n.getAttributeNode("x").nodeValue), u.y = parseInt(n.getAttributeNode("y").nodeValue),
                        u.width = parseInt(n.getAttributeNode("width").nodeValue), u.height = parseInt(n.getAttributeNode("height").nodeValue);
                    var c = Qt.create(e, u.x, u.y, u.width, u.height, o, l);
                    this._maxWidth = Math.max(this._maxWidth, _ + this.letterSpacing), this._fontCharDic[h] = c,
                        this._fontWidthMap[h] = _;
                }
            }
        }
        parseFont2(t, e) {
            if (null != t && null != e) {
                this._texture = e;
                var i = t.getElementsByTagName("info");
                this.fontSize = parseInt(i[0].attributes.size.nodeValue);
                var s = i[0].attributes.padding.nodeValue.split(",");
                this._padding = [parseInt(s[0]), parseInt(s[1]), parseInt(s[2]), parseInt(s[3])];
                var r = t.getElementsByTagName("char"), a = 0;
                for (a = 0; a < r.length; a++) {
                    var n = r[a].attributes, h = parseInt(n.id.nodeValue), o = parseInt(n.xoffset.nodeValue) / 1, l = parseInt(n.yoffset.nodeValue) / 1, _ = parseInt(n.xadvance.nodeValue) / 1, u = new g();
                    u.x = parseInt(n.x.nodeValue), u.y = parseInt(n.y.nodeValue), u.width = parseInt(n.width.nodeValue),
                        u.height = parseInt(n.height.nodeValue);
                    var c = Qt.create(e, u.x, u.y, u.width, u.height, o, l);
                    this._maxWidth = Math.max(this._maxWidth, _ + this.letterSpacing), this._fontCharDic[h] = c,
                        this._fontWidthMap[h] = _;
                }
            }
        }
        getCharTexture(t) {
            return this._fontCharDic[t.charCodeAt(0)];
        }
        destroy() {
            if (this._texture) {
                for (var t in this._fontCharDic) {
                    var e = this._fontCharDic[t];
                    e && e.destroy();
                }
                this._texture.destroy(), this._fontCharDic = null, this._fontWidthMap = null, this._texture = null,
                    this._complete = null, this._padding = null;
            }
        }
        setSpaceWidth(t) {
            this._spaceWidth = t;
        }
        getCharWidth(t) {
            var e = t.charCodeAt(0);
            return this._fontWidthMap[e] ? this._fontWidthMap[e] + this.letterSpacing : " " === t ? this._spaceWidth + this.letterSpacing : 0;
        }
        getTextWidth(t) {
            for (var e = 0, i = 0, s = t.length; i < s; i++) e += this.getCharWidth(t.charAt(i));
            return e;
        }
        getMaxWidth() {
            return this._maxWidth;
        }
        getMaxHeight() {
            return this.fontSize;
        }
        _drawText(t, e, i, s, r, a) {
            var n, h = this.getTextWidth(t), o = 0;
            "center" === r && (o = (a - h) / 2), "right" === r && (o = a - h);
            for (var l = 0, _ = 0, u = t.length; _ < u; _++) (n = this.getCharTexture(t.charAt(_))) && (e.graphics.drawImage(n, i + l + o, s),
                l += this.getCharWidth(t.charAt(_)));
        }
    }
    Ae.regClass("laya.display.BitmapFont", qe), Ae.regClass("Laya.BitmapFont", qe);
    class Qe extends x {
        constructor() {
            super(...arguments), this._http = new XMLHttpRequest();
        }
        send(t, e = null, i = "get", s = "text", r = null) {

            this._responseType = s,
                this._data = null, (ee.onVVMiniGame || ee.onQGMiniGame || ee.onQQMiniGame || ee.onAlipayMiniGame || ee.onBLMiniGame || ee.onHWMiniGame ||
                    ee.onTTMiniGame || ee.onTBMiniGame) && (t = Qe._urlEncode(t)),
                this._url = t;
            var a = this, n = this._http;

            t = E.getAdptedFilePath(t), n.open(i, t, !0);
            let h = !1;
            if (r) for (var o = 0; o < r.length; o++) n.setRequestHeader(r[o++], r[o]);
            else window.conch || (e && "string" != typeof e ? (n.setRequestHeader("Content-Type", "application/json"),
                h = !0) : n.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"));
            let l = "arraybuffer" !== s ? "text" : "arraybuffer";
            n.responseType = l, n.dataType && (n.dataType = l),
                n.onerror = function (t) {
                    a._onError(t);
                }, n.onabort = function (t) {
                    a._onAbort(t);
                }, n.onprogress = function (t) {
                    a._onProgress(t);
                }, n.onload = function (t) {
                    a._onLoad(t);
                },

                // ee.onBLMiniGame && ee.onAndroid && !e && (e = {}),

                e && (e = {})
            n.send(e);
        }
        _onProgress(t) {
            t && t.lengthComputable && this.event(qt.PROGRESS, t.loaded / t.total);
        }
        _onAbort(t) {
            this.error("Request was aborted by user");
        }
        _onError(t) {
            this.error("Request failed Status:" + this._http.status + " text:" + this._http.statusText);
        }
        _onLoad(t) {
            var e = this._http, i = void 0 !== e.status ? e.status : 200;
            200 === i || 204 === i || 0 === i ? this.complete() : this.error("[" + e.status + "]" + e.statusText + ":" + e.responseURL);
        }
        error(t) {
            this.clear(), console.warn(this.url, t), this.event(qt.ERROR, t);
        }
        complete() {
            this.clear();
            var t = !0;
            try {
                "json" === this._responseType ? this._data = JSON.parse(this._http.responseText) : "xml" === this._responseType ? this._data = Q.parseXMLFromString(this._http.responseText) : this._data = this._http.response || this._http.responseText;
            } catch (e) {
                t = !1, this.error(e.message);
            }
            t && this.event(qt.COMPLETE, this._data instanceof Array ? [this._data] : this._data);
        }
        clear() {
            var t = this._http;
            t.onerror = t.onabort = t.onprogress = t.onload = null;
        }
        get url() {
            return this._url;
        }
        get data() {
            return this._data;
        }
        get http() {
            return this._http;
        }
    }
    Qe._urlEncode = encodeURI;
    class Ze extends x {
        constructor() {
            super(...arguments), this._customParse = !1;
        }
        static getTypeFromUrl(t) {
            var e = Q.getFileExtension(t);
            return e ? Ze.typeMap[e] : (console.warn("Not recognize the resources suffix", t),
                "text");
        }
        load(t, e = null, s = !0, r = null, a = !1, n = i.WorkerLoader.enable) {
            if (t) {
                var h;
                if (Ze.setGroup(t, "666"), this._url = t, 0 === t.indexOf("data:image") ? e = Ze.IMAGE : t = E.formatURL(t),
                    this._type = e || (e = Ze.getTypeFromUrl(this._url)), this._cache = s, this._useWorkerLoader = n,
                    this._data = null, n && i.WorkerLoader.enableWorkerLoader(), h = Ze.loadedMap[t],
                    !a && h) return this._data = h, this.event(qt.PROGRESS, 1), void this.event(qt.COMPLETE, this._data);
                if (r && Ze.setGroup(t, r), null != Ze.parserMap[e]) return this._customParse = !0,
                    void (Ze.parserMap[e] instanceof T ? Ze.parserMap[e].runWith(this) : Ze.parserMap[e].call(null, this));
                this._loadResourceFilter(e, t);
            } else this.onLoaded(null);
        }
        _loadResourceFilter(t, e) {
            this._loadResource(t, e);
        }
        _loadResource(t, e) {
            switch (t) {
                case Ze.IMAGE:
                case "htmlimage":
                case "nativeimage":
                    this._loadImage(e);
                    break;

                case Ze.SOUND:
                    this._loadSound(e);
                    break;

                case Ze.TTF:
                    this._loadTTF(e);
                    break;

                case Ze.ATLAS:
                case Ze.PREFAB:
                case Ze.PLF:
                    this._loadHttpRequestWhat(e, Ze.JSON);
                    break;

                case Ze.FONT:
                    this._loadHttpRequestWhat(e, Ze.XML);
                    break;

                case Ze.PLFB:
                    this._loadHttpRequestWhat(e, Ze.BUFFER);
                    break;

                default:
                    this._loadHttpRequestWhat(e, t);
            }
        }
        _loadHttpRequest(t, e, i, s, r, a, n, h) {
            ee.onVVMiniGame || ee.onHWMiniGame ? this._http = new Qe() : this._http || (this._http = new Qe()),
                a && this._http.on(qt.PROGRESS, r, a),

                s && this._http.on(qt.COMPLETE, i, s),

                this._http.on(qt.ERROR, n, h),
                this._http.send(t, null, "get", e);
        }
        _loadHtmlImage(t, e, i, s, r) {
            var a;
            function clear() {
                var e = a;
                e.onload = null, e.onerror = null, delete Ze._imgCache[t];
            }
            (a = new ee.window.Image()).crossOrigin = "", a.onload = function () {
                clear(), i.call(e, a);
            }, a.onerror = function () {
                clear(), r.call(s);
            }
            if (t.indexOf('ui/common/game/guide_hand1.png,ui/common/game/guide_hand2.png') != -1)
                t = "";
            // console.error(t.indexOf('bin/ui/common/game/guide_hand1.png,ui/common/game/guide_hand2.png'));
            a.src = t, Ze._imgCache[t] = a;
        }
        _loadHttpRequestWhat(t, e) {
            Ze.preLoadedMap[t] ? this.onLoaded(Ze.preLoadedMap[t]) : this._loadHttpRequest(t, e, this, this.onLoaded, this, this.onProgress, this, this.onError);
        }
        _loadTTF(t) {
            t = E.formatURL(t);
            var e = new i.TTFLoader();
            e.complete = T.create(this, this.onLoaded), e.load(t);
        }
        _loadImage(t, e = !0) {
            var i = this;
            e && (t = E.formatURL(t));
            var s = function () {
                i.event(qt.ERROR, "Load image failed");
            };
            if ("nativeimage" === this._type) this._loadHtmlImage(t, this, this.onLoaded, this, s); else {
                var r = Q.getFileExtension(t);
                "ktx" === r || "pvr" === r ? this._loadHttpRequest(t, Ze.BUFFER, this, this.onLoaded, this, this.onProgress, this, this.onError) : this._loadHtmlImage(t, this, this.onLoaded, this, s);
            }
        }
        _loadSound(t) {
            var e = new Ke._soundClass(), i = this;
            function clear() {
                e.offAll();
            }
            e.on(qt.COMPLETE, this, function () {
                clear(), i.onLoaded(e);
            }), e.on(qt.ERROR, this, function () {
                clear(), e.dispose(), i.event(qt.ERROR, "Load sound failed");
            }), e.load(t);
        }
        onProgress(t) {
            this._type === Ze.ATLAS ? this.event(qt.PROGRESS, .3 * t) : this._originType == Ze.HIERARCHY ? this.event(qt.PROGRESS, t / 3) : this.event(qt.PROGRESS, t);
        }
        onError(t) {
            this.event(qt.ERROR, t);
        }
        onLoaded(e = null) {
            if ((c = this._type) == Ze.PLFB) this.parsePLFBData(e), this.complete(e); else if (c == Ze.PLF) this.parsePLFData(e),
                this.complete(e); else if (c === Ze.IMAGE) {
                    let s;
                    if (e instanceof ArrayBuffer) {
                        let i;
                        switch (u = Q.getFileExtension(this._url)) {
                            case "ktx":
                                i = t.TextureFormat.ETC1RGB;
                                break;

                            case "pvr":
                                i = t.TextureFormat.PVRTCRGBA_4BPPV;
                                break;

                            default:
                                return void console.error("unknown format", u);
                        }
                        (s = new B(0, 0, i, !1, !1)).wrapModeU = t.WarpMode.Clamp, s.wrapModeV = t.WarpMode.Clamp,
                            s.setCompressData(e), s._setCreateURL(this.url);
                    } else e instanceof B ? s = e : ((s = new B(e.width, e.height, 1, !1, !1)).wrapModeU = t.WarpMode.Clamp,
                        s.wrapModeV = t.WarpMode.Clamp, s.loadImageSource(e, !0), s._setCreateURL(e.src));
                    var i = new Qt(s);
                    i.url = this._url, this.complete(i);
                } else if (c === Ze.SOUND || "nativeimage" === c) this.complete(e); else if ("htmlimage" === c) {
                    let i = new B(e.width, e.height, 1, !1, !1);
                    i.wrapModeU = t.WarpMode.Clamp, i.wrapModeV = t.WarpMode.Clamp, i.loadImageSource(e, !0),
                        i._setCreateURL(e.src), this.complete(i);
                } else if (c === Ze.ATLAS) {
                    if (e.frames) {
                        var s = [];
                        if (!this._data) {
                            if (this._data = e, e.meta && e.meta.image) {
                                s = e.meta.image.split(",");
                                var r = this._url.indexOf("/") >= 0 ? "/" : "\\", a = this._url.lastIndexOf(r), n = a >= 0 ? this._url.substr(0, a + 1) : "", h = null;
                                ee.onAndroid && e.meta.compressTextureAndroid && (h = ".ktx"), ee.onIOS && e.meta.compressTextureIOS && (h = ".pvr");
                                for (var o = 0, l = s.length; o < l; o++) s[o] = h ? n + s[o].replace(".png", h) : n + s[o];
                            } else s = [this._url.replace(".json", ".png")];
                            s.reverse(), e.toLoads = s, e.pics = [];
                        }
                        this.event(qt.PROGRESS, .3 + 1 / s.length * .6);
                        var _ = E.formatURL(s.pop()), u = Q.getFileExtension(_), c = Ze.IMAGE;
                        return "pvr" != u && "ktx" != u || (c = Ze.BUFFER), this._loadResourceFilter(c, _);
                    }
                    if (!(e instanceof B)) if (e instanceof ArrayBuffer) {
                        let i = this._http.url;
                        let s;
                        switch (u = Q.getFileExtension(i)) {
                            case "ktx":
                                s = t.TextureFormat.ETC1RGB;
                                break;

                            case "pvr":
                                s = t.TextureFormat.PVRTCRGBA_4BPPV;
                                break;

                            default:
                                return void console.error("unknown format", u);
                        }
                        let r = new B(0, 0, s, !1, !1);
                        r.wrapModeU = t.WarpMode.Clamp, r.wrapModeV = t.WarpMode.Clamp, r.setCompressData(e),
                            r._setCreateURL(i), e = r;
                    } else {
                        let i = new B(e.width, e.height, 1, !1, !1);
                        i.wrapModeU = t.WarpMode.Clamp, i.wrapModeV = t.WarpMode.Clamp, i.loadImageSource(e, !0),
                            i._setCreateURL(e.src), e = i;
                    }
                    if (this._data.pics.push(e), this._data.toLoads.length > 0) {
                        this.event(qt.PROGRESS, .3 + 1 / this._data.toLoads.length * .6);
                        _ = E.formatURL(this._data.toLoads.pop()), u = Q.getFileExtension(_), c = Ze.IMAGE;
                        return "pvr" != u && "ktx" != u || (c = Ze.BUFFER), this._loadResourceFilter(c, _);
                    }
                    var d = this._data.frames, p = this._url.split("?")[0], f = this._data.meta && this._data.meta.prefix ? this._data.meta.prefix : p.substring(0, p.lastIndexOf(".")) + "/", g = this._data.pics, m = E.formatURL(this._url), v = Ze.atlasMap[m] || (Ze.atlasMap[m] = []);
                    v.dir = f;
                    var T = 1;
                    if (this._data.meta && this._data.meta.scale && 1 != this._data.meta.scale) for (var x in T = parseFloat(this._data.meta.scale),
                        d) {
                        var y, b = d[x], w = g[b.frame.idx ? b.frame.idx : 0];
                        _ = E.formatURL(f + x);
                        w.scaleRate = T, y = Qt._create(w, b.frame.x, b.frame.y, b.frame.w, b.frame.h, b.spriteSourceSize.x, b.spriteSourceSize.y, b.sourceSize.w, b.sourceSize.h, Ze.getRes(_)),
                            Ze.cacheTexture(_, y), y.url = _, v.push(_);
                    } else for (x in d) w = g[(b = d[x]).frame.idx ? b.frame.idx : 0], _ = E.formatURL(f + x),
                        y = Qt._create(w, b.frame.x, b.frame.y, b.frame.w, b.frame.h, b.spriteSourceSize.x, b.spriteSourceSize.y, b.sourceSize.w, b.sourceSize.h, Ze.getRes(_)),
                        Ze.cacheTexture(_, y), y.url = _, v.push(_);
                    delete this._data.pics, this.complete(this._data);
                } else if (c === Ze.FONT) {
                    if (!e._source) return this._data = e, this.event(qt.PROGRESS, .5), this._loadResourceFilter(Ze.IMAGE, this._url.replace(".fnt", ".png"));
                    var C = new qe();
                    C.parseFont(this._data, new Qt(e));
                    var A = this._url.split(".fnt")[0].split("/"), R = A[A.length - 1];
                    De.registerBitmapFont(R, C), this._data = C, this.complete(this._data);
                } else if (c === Ze.PREFAB) {
                    var M = new je();
                    M.json = e, this.complete(M);
                } else this.complete(e);
        }
        parsePLFData(t) {
            var e, i, s;
            for (e in t) switch (s = t[e], e) {
                case "json":
                case "text":
                    for (i in s) Ze.preLoadedMap[E.formatURL(i)] = s[i];
                    break;

                default:
                    for (i in s) Ze.preLoadedMap[E.formatURL(i)] = s[i];
            }
        }
        parsePLFBData(t) {
            var e, i, s;
            for (s = (e = new P(t)).getInt32(), i = 0; i < s; i++) this.parseOnePLFBFile(e);
        }
        parseOnePLFBFile(t) {
            var e, i, s;
            i = t.getUTFString(), e = t.getInt32(), s = t.readArrayBuffer(e), Ze.preLoadedMap[E.formatURL(i)] = s;
        }
        complete(t) {
            this._data = t, this._customParse ? this.event(qt.LOADED, t instanceof Array ? [t] : t) : (Ze._loaders.push(this),
                Ze._isWorking || Ze.checkNext());
        }
        static checkNext() {
            Ze._isWorking = !0;
            for (var t = ee.now(); Ze._startIndex < Ze._loaders.length;) if (Ze._loaders[Ze._startIndex].endLoad(),
                Ze._startIndex++, ee.now() - t > Ze.maxTimeOut) return console.warn("loader callback cost a long time:" + (ee.now() - t) + " url=" + Ze._loaders[Ze._startIndex - 1].url),
                    void i.systemTimer.frameOnce(1, null, Ze.checkNext);
            Ze._loaders.length = 0, Ze._startIndex = 0, Ze._isWorking = !1;
        }
        endLoad(t = null) {
            t && (this._data = t), this._cache && Ze.cacheRes(this._url, this._data), this.event(qt.PROGRESS, 1),
                this.event(qt.COMPLETE, this.data instanceof Array ? [this.data] : this.data);
        }
        get url() {
            return this._url;
        }
        get type() {
            return this._type;
        }
        get cache() {
            return this._cache;
        }
        get data() {
            return this._data;
        }
        static clearRes(t) {
            t = E.formatURL(t);
            var e = Ze.getAtlas(t);
            if (e) {
                for (var i = 0, s = e.length; i < s; i++) {
                    var r = e[i], a = Ze.getRes(r);
                    delete Ze.textureMap[r], a && a.destroy();
                }
                e.length = 0, delete Ze.atlasMap[t];
            }
            var n = Ze.textureMap[t];
            n && (n.destroy(), delete Ze.textureMap[t]), Ze.loadedMap[t] && delete Ze.loadedMap[t];
        }
        static clearTextureRes(t) {
            t = E.formatURL(t);
            var e = Ze.getAtlas(t);
            if (e && e.length > 0) e.forEach(function (t) {
                var e = Ze.getRes(t);
                e instanceof Qt && e.disposeBitmap();
            }); else {
                var i = Ze.getRes(t);
                i instanceof Qt && i.disposeBitmap();
            }
        }
        static getRes(t) {
            var e = Ze.textureMap[E.formatURL(t)];
            return e || Ze.loadedMap[E.formatURL(t)];
        }
        static getAtlas(t) {
            return Ze.atlasMap[E.formatURL(t)];
        }
        static cacheRes(t, e) {
            t = E.formatURL(t), null != Ze.loadedMap[t] ? console.warn("Resources already exist,is repeated loading:", t) : e instanceof Qt ? (Ze.loadedMap[t] = e.bitmap,
                Ze.textureMap[t] = e) : Ze.loadedMap[t] = e;
        }
        static cacheTexture(t, e) {
            t = E.formatURL(t), null != Ze.textureMap[t] ? console.warn("Resources already exist,is repeated loading:", t) : Ze.textureMap[t] = e;
        }
        static setGroup(t, e) {
            Ze.groupMap[e] || (Ze.groupMap[e] = []), Ze.groupMap[e].push(t);
        }
        static clearResByGroup(t) {
            if (Ze.groupMap[t]) {
                var e, i = Ze.groupMap[t], s = i.length;
                for (e = 0; e < s; e++) Ze.clearRes(i[e]);
                i.length = 0;
            }
        }
    }
    Ze.TEXT = "text", Ze.JSON = "json", Ze.PREFAB = "prefab", Ze.XML = "xml", Ze.BUFFER = "arraybuffer",
        Ze.IMAGE = "image", Ze.SOUND = "sound", Ze.ATLAS = "atlas", Ze.FONT = "font", Ze.TTF = "ttf",
        Ze.PLF = "plf", Ze.PLFB = "plfb", Ze.HIERARCHY = "HIERARCHY", Ze.MESH = "MESH",
        Ze.MATERIAL = "MATERIAL", Ze.TEXTURE2D = "TEXTURE2D", Ze.TEXTURECUBE = "TEXTURECUBE",
        Ze.ANIMATIONCLIP = "ANIMATIONCLIP", Ze.AVATAR = "AVATAR", Ze.TERRAINHEIGHTDATA = "TERRAINHEIGHTDATA",
        Ze.TERRAINRES = "TERRAIN", Ze.typeMap = {
            ttf: "ttf",
            png: "image",
            jpg: "image",
            jpeg: "image",
            ktx: "image",
            pvr: "image",
            txt: "text",
            json: "json",
            prefab: "prefab",
            xml: "xml",
            als: "atlas",
            atlas: "atlas",
            mp3: "sound",
            ogg: "sound",
            wav: "sound",
            part: "json",
            fnt: "font",
            plf: "plf",
            plfb: "plfb",
            scene: "json",
            ani: "json",
            sk: "arraybuffer"
        }, Ze.parserMap = {}, Ze.maxTimeOut = 100, Ze.groupMap = {}, Ze.loadedMap = {},
        Ze.atlasMap = {}, Ze.textureMap = {}, Ze.preLoadedMap = {}, Ze._imgCache = {}, Ze._loaders = [],
        Ze._isWorking = !1, Ze._startIndex = 0;
    class $e {
        static enable(t, e = null) {
            i.loader.load(t, T.create(null, $e._onInfoLoaded, [e]), null, Ze.JSON);
        }
        static _onInfoLoaded(t, e) {
            var i, s, r, a, n;
            for (i in e) for (s = (r = e[i])[0], n = (r = r[1]).length, a = 0; a < n; a++) $e._fileLoadDic[s + r[a]] = i;
            t && t.run();
        }
        static getFileLoadPath(t) {
            return $e._fileLoadDic[t] || t;
        }
    }
    $e._fileLoadDic = {};
    class Je extends x {
        constructor() {
            super(), this.retryNum = 1, this.retryDelay = 0, this.maxLoader = 5, this._loaders = [],
                this._loaderCount = 0, this._resInfos = [], this._infoPool = [], this._maxPriority = 5,
                this._failRes = {}, this._statInfo = {
                    count: 1,
                    loaded: 1
                };
            for (var t = 0; t < this._maxPriority; t++) this._resInfos[t] = [];
        }
        getProgress() {
            return this._statInfo.loaded / this._statInfo.count;
        }
        resetProgress() {
            this._statInfo.count = this._statInfo.loaded = 1;
        }
        create(t, e = null, i = null, s = null, r = null, a = null, n = 1, h = !0) {
            this._create(t, !0, e, i, s, r, a, n, h);
        }
        _create(t, e, i = null, s = null, r = null, a = null, n = null, h = 1, o = !0) {
            if (t instanceof Array) {
                var l = !0, _ = t, u = _.length, c = 0;
                if (s) var d = T.create(s.caller, s ? s.method : null, s.args, !1);
                for (var p = 0; p < u; p++) {
                    var f = _[p];
                    "string" == typeof f && (f = _[p] = {
                        url: f
                    }), f.progress = 0;
                }
                for (p = 0; p < u; p++) {
                    f = _[p];
                    var g = s ? T.create(null, function (t, e) {
                        t.progress = e;
                        for (var i = 0, s = 0; s < u; s++) {
                            i += _[s].progress;
                        }
                        var r = i / u;
                        d.runWith(r);
                    }, [f], !1) : null, m = s || i ? T.create(null, function (t, e = null) {
                        c++, t.progress = 1, e || (l = !1), c === u && i && i.runWith(l);
                    }, [f]) : null;
                    this._createOne(f.url, e, m, g, f.type || r, f.constructParams || a, f.propertyParams || n, f.priority || h, o);
                }
            } else this._createOne(t, e, i, s, r, a, n, h, o);
        }
        _createOne(t, e, s = null, r = null, a = null, n = null, h = null, o = 1, l = !0) {
            var _ = this.getRes(t);
            if (_) !e && _ instanceof b && _._addReference(), r && r.runWith(1), s && s.runWith(_); else {
                var u = Je.createMap[Q.getFilecompatibleExtension(t)] ? Q.getFilecompatibleExtension(t) : Q.getFileExtension(t);
                if (a || (a = Je.createMap[u] ? Je.createMap[u][0] : null), !a) return void this.load(t, s, r, a, o, l);
                if (!Ze.parserMap[a]) return void this.load(t, s, r, a, o, l);
                this._createLoad(t, T.create(null, function (r) {
                    r && (!e && r instanceof b && r._addReference(), r._setCreateURL(t)), s && s.runWith(r),
                        i.loader.event(t);
                }), r, a, n, h, o, l, !0);
            }
        }
        load(t, e = null, s = null, r = null, a = 1, n = !0, h = null, o = !1, l = i.WorkerLoader.enable) {
            if (t instanceof Array) return this._loadAssets(t, e, s, r, a, n, h);
            var _;
            if (_ = r === Ze.IMAGE ? Ze.textureMap[E.formatURL(t)] : Ze.loadedMap[E.formatURL(t)],
                o || null == _) {
                var u;
                u = t, (t = $e.getFileLoadPath(t)) != u && "nativeimage" !== r ? r = Ze.ATLAS : u = null;
                var c = Je._resMap[t];
                c ? (e && (u ? e && c._createListener(qt.COMPLETE, this, this._resInfoLoaded, [u, e], !1, !1) : e && c._createListener(qt.COMPLETE, e.caller, e.method, e.args, !1, !1)),
                    s && c._createListener(qt.PROGRESS, s.caller, s.method, s.args, !1, !1)) : ((c = this._infoPool.length ? this._infoPool.pop() : new ti()).url = t,
                        c.type = r, c.cache = n, c.group = h, c.ignoreCache = o, c.useWorkerLoader = l,
                        c.originalUrl = u, e && c.on(qt.COMPLETE, e.caller, e.method, e.args), s && c.on(qt.PROGRESS, s.caller, s.method, s.args),
                        Je._resMap[t] = c, a = a < this._maxPriority ? a : this._maxPriority - 1, this._resInfos[a].push(c),
                        this._statInfo.count++, this.event(qt.PROGRESS, this.getProgress()), this._next());
            } else i.systemTimer.callLater(this, function () {
                s && s.runWith(1), e && e.runWith(_ instanceof Array ? [_] : _), this._loaderCount || this.event(qt.COMPLETE);
            });
            return this;
        }
        _resInfoLoaded(t, e) {
            e.runWith(Ze.getRes(t));
        }
        _createLoad(t, e = null, s = null, r = null, a = null, n = null, h = 1, o = !0, l = !1) {
            if (t instanceof Array) return this._loadAssets(t, e, s, r, h, o);
            var _ = Ze.getRes(t);
            if (null != _) i.systemTimer.frameOnce(1, this, function () {
                s && s.runWith(1), e && e.runWith(_), this._loaderCount || this.event(qt.COMPLETE);
            }); else {
                var u = Je._resMap[t];
                u ? (e && u._createListener(qt.COMPLETE, e.caller, e.method, e.args, !1, !1), s && u._createListener(qt.PROGRESS, s.caller, s.method, s.args, !1, !1)) : ((u = this._infoPool.length ? this._infoPool.pop() : new ti()).url = t,
                    u.type = r, u.cache = !1, u.ignoreCache = l, u.originalUrl = null, u.group = null,
                    u.createCache = o, u.createConstructParams = a, u.createPropertyParams = n, e && u.on(qt.COMPLETE, e.caller, e.method, e.args),
                    s && u.on(qt.PROGRESS, s.caller, s.method, s.args), Je._resMap[t] = u, h = h < this._maxPriority ? h : this._maxPriority - 1,
                    this._resInfos[h].push(u), this._statInfo.count++, this.event(qt.PROGRESS, this.getProgress()),
                    this._next());
            }
            return this;
        }
        _next() {
            if (!(this._loaderCount >= this.maxLoader)) {
                for (var t = 0; t < this._maxPriority; t++) for (var e = this._resInfos[t]; e.length > 0;) {
                    var i = e.shift();
                    if (i) return this._doLoad(i);
                }
                this._loaderCount || this.event(qt.COMPLETE);
            }
        }
        _doLoad(t) {
            this._loaderCount++;
            var e = this._loaders.length ? this._loaders.pop() : new Ze();
            e.on(qt.COMPLETE, null, onLoaded), e.on(qt.PROGRESS, null, function (e) {
                t.event(qt.PROGRESS, e);
            }), e.on(qt.ERROR, null, function (t) {
                onLoaded(null);
            });
            var i = this;
            function onLoaded(s = null) {
                e.offAll(), e._data = null, e._customParse = !1, i._loaders.push(e), i._endLoad(t, s instanceof Array ? [s] : s),
                    i._loaderCount--, i._next();
            }
            e._constructParams = t.createConstructParams, e._propertyParams = t.createPropertyParams,
                e._createCache = t.createCache, e.load(t.url, t.type, t.cache, t.group, t.ignoreCache, t.useWorkerLoader);
        }
        _endLoad(t, e) {
            var s = t.url;
            if (null == e) {
                var r = this._failRes[s] || 0;
                if (r < this.retryNum) return console.warn("[warn]Retry to load:", s), this._failRes[s] = r + 1,
                    void i.systemTimer.once(this.retryDelay, this, this._addReTry, [t], !1);
                Ze.clearRes(s), console.warn("[error]Failed to load:", s), this.event(qt.ERROR, s);
            }
            this._failRes[s] && (this._failRes[s] = 0), delete Je._resMap[s], t.originalUrl && (e = Ze.getRes(t.originalUrl)),
                t.event(qt.COMPLETE, e), t.offAll(), this._infoPool.push(t), this._statInfo.loaded++,
                this.event(qt.PROGRESS, this.getProgress());
        }
        _addReTry(t) {
            this._resInfos[this._maxPriority - 1].push(t), this._next();
        }
        clearRes(t) {
            Ze.clearRes(t);
        }
        clearTextureRes(t) {
            Ze.clearTextureRes(t);
        }
        getRes(t) {
            return Ze.getRes(t);
        }
        cacheRes(t, e) {
            Ze.cacheRes(t, e);
        }
        setGroup(t, e) {
            Ze.setGroup(t, e);
        }
        clearResByGroup(t) {
            Ze.clearResByGroup(t);
        }
        static cacheRes(t, e) {
            Ze.cacheRes(t, e);
        }
        clearUnLoaded() {
            for (var t = 0; t < this._maxPriority; t++) {
                for (var e = this._resInfos[t], i = e.length - 1; i > -1; i--) {
                    var s = e[i];
                    s && (s.offAll(), this._infoPool.push(s));
                }
                e.length = 0;
            }
            this._loaderCount = 0, Je._resMap = {};
        }
        cancelLoadByUrls(t) {
            if (t) for (var e = 0, i = t.length; e < i; e++) this.cancelLoadByUrl(t[e]);
        }
        cancelLoadByUrl(t) {
            for (var e = 0; e < this._maxPriority; e++) for (var i = this._resInfos[e], s = i.length - 1; s > -1; s--) {
                var r = i[s];
                r && r.url === t && (i[s] = null, r.offAll(), this._infoPool.push(r));
            }
            Je._resMap[t] && delete Je._resMap[t];
        }
        _loadAssets(t, e = null, i = null, s = null, r = 1, a = !0, n = null) {
            for (var h = t.length, o = 0, l = 0, _ = [], u = !0, c = 0; c < h; c++) {
                let h, o = t[c];
                (h = "string" == typeof o ? {
                    url: o,
                    type: s,
                    size: 1,
                    priority: r
                } : o).size || (h.size = 1), h.progress = 0, l += h.size, _.push(h);
                var d = i ? T.create(null, loadProgress, [h], !1) : null, p = e || i ? T.create(null, loadComplete, [h]) : null;
                this.load(h.url, p, d, h.type, h.priority || 1, a, h.group || n, !1, h.useWorkerLoader);
            }
            function loadComplete(t, i = null) {
                o++, t.progress = 1, i || (u = !1), o === h && e && e.runWith(u);
            }
            function loadProgress(t, e) {
                if (null != i) {
                    t.progress = e;
                    for (var s = 0, r = 0; r < _.length; r++) {
                        var a = _[r];
                        if (a) {
                            let t = null == a.progress ? 0 : a.progress;
                            s += null == a.size ? 0 : a.size * t;
                        }
                    }
                    var n = s / l;
                    i.runWith(n);
                }
            }
            return this;
        }
        decodeBitmaps(t) {
            var e, s, r = t.length;
            for (s = i.Render._context, e = 0; e < r; e++) {
                var a, n;
                if (a = Ze.getAtlas(t[e])) this._decodeTexture(a[0], s); else (n = this.getRes(t[e])) && n instanceof Qt && this._decodeTexture(n, s);
            }
        }
        _decodeTexture(t, e) {
            var i = t.bitmap;
            if (t && i) {
                var s = i.source || i.image;
                if (s && s instanceof HTMLImageElement) {
                    e.drawImage(s, 0, 0, 1, 1);
                    e.getImageData(0, 0, 1, 1);
                }
            }
        }
    }
    Je._resMap = {}, Je.createMap = {
        atlas: [null, Ze.ATLAS]
    };
    class ti extends x { }
    class ei {
        static __init__() {
            return ei._baseClass || (ei._baseClass = ii, ii.init()), ei.items = ei._baseClass.items,
                ei.support = ei._baseClass.support, ei.support;
        }
        static setItem(t, e) {
            ei._baseClass.setItem(t, e);
        }
        static getItem(t) {
            return ei._baseClass.getItem(t);
        }
        static setJSON(t, e) {
            ei._baseClass.setJSON(t, e);
        }
        static getJSON(t) {
            return ei._baseClass.getJSON(t);
        }
        static removeItem(t) {
            ei._baseClass.removeItem(t);
        }
        static clear() {
            ei._baseClass.clear();
        }
    }
    ei.support = !1;
    class ii {
        static init() {
            try {
                ii.support = !0, ii.items = window.localStorage, ii.setItem("laya", "1"), ii.removeItem("laya");
            } catch (t) {
                ii.support = !1;
            }
            ii.support || console.log("LocalStorage is not supprot or browser is private mode.");
        }
        static setItem(t, e) {
            try {
                ii.support && ii.items.setItem(t, e);
            } catch (t) {
                console.warn("set localStorage failed", t);
            }
        }
        static getItem(t) {
            return ii.support ? ii.items.getItem(t) : null;
        }
        static setJSON(t, e) {
            try {
                ii.support && ii.items.setItem(t, JSON.stringify(e));
            } catch (t) {
                console.warn("set localStorage failed", t);
            }
        }
        static getJSON(t) {
            try {
                return JSON.parse(ii.support ? ii.items.getItem(t) : null);
            } catch (e) {
                return ii.items.getItem(t);
            }
        }
        static removeItem(t) {
            ii.support && ii.items.removeItem(t);
        }
        static clear() {
            ii.support && ii.items.clear();
        }
    }
    ii.support = !1;
    class si {
        load(t) {
            this._url = t;
            var e = t.toLowerCase().split(".ttf")[0].split("/");
            this.fontName = e[e.length - 1], i.Render.isConchApp ? this._loadConch() : window.FontFace ? this._loadWithFontFace() : this._loadWithCSS();
        }
        _loadConch() {
            this._http = new Qe(), this._http.on(qt.ERROR, this, this._onErr), this._http.on(qt.COMPLETE, this, this._onHttpLoaded),
                this._http.send(this._url, null, "get", Ze.BUFFER);
        }
        _onHttpLoaded(t = null) {
            window.conchTextCanvas.setFontFaceFromBuffer(this.fontName, t), this._clearHttp(),
                this._complete();
        }
        _clearHttp() {
            this._http && (this._http.off(qt.ERROR, this, this._onErr), this._http.off(qt.COMPLETE, this, this._onHttpLoaded),
                this._http = null);
        }
        _onErr() {
            this._clearHttp(), this.err && (this.err.runWith("fail:" + this._url), this.err = null);
        }
        _complete() {
            i.systemTimer.clear(this, this._complete), i.systemTimer.clear(this, this._checkComplete),
                this._div && this._div.parentNode && (this._div.parentNode.removeChild(this._div),
                    this._div = null), this.complete && (this.complete.runWith(this), this.complete = null);
        }
        _checkComplete() {
            i.Browser.measureText(si._testString, this._fontTxt).width != this._txtWidth && this._complete();
        }
        _loadWithFontFace() {
            var t = new window.FontFace(this.fontName, "url('" + this._url + "')");
            document.fonts.add(t);
            var e = this;
            t.loaded.then(function () {
                e._complete();
            }), t.load();
        }
        _createDiv() {
            this._div = ee.createElement("div"), this._div.innerHTML = "laya";
            var t = this._div.style;
            t.fontFamily = this.fontName, t.position = "absolute", t.left = "-100px", t.top = "-100px",
                document.body.appendChild(this._div);
        }
        _loadWithCSS() {
            var t = ee.createElement("style");
            t.type = "text/css", document.body.appendChild(t), t.textContent = "@font-face { font-family:'" + this.fontName + "'; src:url('" + this._url + "');}",
                this._fontTxt = "40px " + this.fontName, this._txtWidth = ee.measureText(si._testString, this._fontTxt).width;
            var e = this;
            t.onload = function () {
                i.systemTimer.once(1e4, e, e._complete);
            }, i.systemTimer.loop(20, this, this._checkComplete), this._createDiv();
        }
    }
    si._testString = "LayaTTFFont";
    class ri {
        static linearNone(t, e, i, s) {
            return i * t / s + e;
        }
        static linearIn(t, e, i, s) {
            return i * t / s + e;
        }
        static linearInOut(t, e, i, s) {
            return i * t / s + e;
        }
        static linearOut(t, e, i, s) {
            return i * t / s + e;
        }
        static bounceIn(t, e, i, s) {
            return i - ri.bounceOut(s - t, 0, i, s) + e;
        }
        static bounceInOut(t, e, i, s) {
            return t < .5 * s ? .5 * ri.bounceIn(2 * t, 0, i, s) + e : .5 * ri.bounceOut(2 * t - s, 0, i, s) + .5 * i + e;
        }
        static bounceOut(t, e, i, s) {
            return (t /= s) < 1 / 2.75 ? i * (7.5625 * t * t) + e : t < 2 / 2.75 ? i * (7.5625 * (t -= 1.5 / 2.75) * t + .75) + e : t < 2.5 / 2.75 ? i * (7.5625 * (t -= 2.25 / 2.75) * t + .9375) + e : i * (7.5625 * (t -= 2.625 / 2.75) * t + .984375) + e;
        }
        static backIn(t, e, i, s, r = 1.70158) {
            return i * (t /= s) * t * ((r + 1) * t - r) + e;
        }
        static backInOut(t, e, i, s, r = 1.70158) {
            return (t /= .5 * s) < 1 ? .5 * i * (t * t * ((1 + (r *= 1.525)) * t - r)) + e : i / 2 * ((t -= 2) * t * ((1 + (r *= 1.525)) * t + r) + 2) + e;
        }
        static backOut(t, e, i, s, r = 1.70158) {
            return i * ((t = t / s - 1) * t * ((r + 1) * t + r) + 1) + e;
        }
        static elasticIn(t, e, i, s, r = 0, a = 0) {
            var n;
            return 0 == t ? e : 1 == (t /= s) ? e + i : (a || (a = .3 * s), !r || i > 0 && r < i || i < 0 && r < -i ? (r = i,
                n = a / 4) : n = a / ri.PI2 * Math.asin(i / r), -r * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * s - n) * ri.PI2 / a) + e);
        }
        static elasticInOut(t, e, i, s, r = 0, a = 0) {
            var n;
            return 0 == t ? e : 2 == (t /= .5 * s) ? e + i : (a || (a = s * (.3 * 1.5)), !r || i > 0 && r < i || i < 0 && r < -i ? (r = i,
                n = a / 4) : n = a / ri.PI2 * Math.asin(i / r), t < 1 ? r * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * s - n) * ri.PI2 / a) * -.5 + e : r * Math.pow(2, -10 * (t -= 1)) * Math.sin((t * s - n) * ri.PI2 / a) * .5 + i + e);
        }
        static elasticOut(t, e, i, s, r = 0, a = 0) {
            var n;
            return 0 == t ? e : 1 == (t /= s) ? e + i : (a || (a = .3 * s), !r || i > 0 && r < i || i < 0 && r < -i ? (r = i,
                n = a / 4) : n = a / ri.PI2 * Math.asin(i / r), r * Math.pow(2, -10 * t) * Math.sin((t * s - n) * ri.PI2 / a) + i + e);
        }
        static strongIn(t, e, i, s) {
            return i * (t /= s) * t * t * t * t + e;
        }
        static strongInOut(t, e, i, s) {
            return (t /= .5 * s) < 1 ? .5 * i * t * t * t * t * t + e : .5 * i * ((t -= 2) * t * t * t * t + 2) + e;
        }
        static strongOut(t, e, i, s) {
            return i * ((t = t / s - 1) * t * t * t * t + 1) + e;
        }
        static sineInOut(t, e, i, s) {
            return .5 * -i * (Math.cos(Math.PI * t / s) - 1) + e;
        }
        static sineIn(t, e, i, s) {
            return -i * Math.cos(t / s * ri.HALF_PI) + i + e;
        }
        static sineOut(t, e, i, s) {
            return i * Math.sin(t / s * ri.HALF_PI) + e;
        }
        static quintIn(t, e, i, s) {
            return i * (t /= s) * t * t * t * t + e;
        }
        static quintInOut(t, e, i, s) {
            return (t /= .5 * s) < 1 ? .5 * i * t * t * t * t * t + e : .5 * i * ((t -= 2) * t * t * t * t + 2) + e;
        }
        static quintOut(t, e, i, s) {
            return i * ((t = t / s - 1) * t * t * t * t + 1) + e;
        }
        static quartIn(t, e, i, s) {
            return i * (t /= s) * t * t * t + e;
        }
        static quartInOut(t, e, i, s) {
            return (t /= .5 * s) < 1 ? .5 * i * t * t * t * t + e : .5 * -i * ((t -= 2) * t * t * t - 2) + e;
        }
        static quartOut(t, e, i, s) {
            return -i * ((t = t / s - 1) * t * t * t - 1) + e;
        }
        static cubicIn(t, e, i, s) {
            return i * (t /= s) * t * t + e;
        }
        static cubicInOut(t, e, i, s) {
            return (t /= .5 * s) < 1 ? .5 * i * t * t * t + e : .5 * i * ((t -= 2) * t * t + 2) + e;
        }
        static cubicOut(t, e, i, s) {
            return i * ((t = t / s - 1) * t * t + 1) + e;
        }
        static quadIn(t, e, i, s) {
            return i * (t /= s) * t + e;
        }
        static quadInOut(t, e, i, s) {
            return (t /= .5 * s) < 1 ? .5 * i * t * t + e : .5 * -i * (--t * (t - 2) - 1) + e;
        }
        static quadOut(t, e, i, s) {
            return -i * (t /= s) * (t - 2) + e;
        }
        static expoIn(t, e, i, s) {
            return 0 == t ? e : i * Math.pow(2, 10 * (t / s - 1)) + e - .001 * i;
        }
        static expoInOut(t, e, i, s) {
            return 0 == t ? e : t == s ? e + i : (t /= .5 * s) < 1 ? .5 * i * Math.pow(2, 10 * (t - 1)) + e : .5 * i * (2 - Math.pow(2, -10 * --t)) + e;
        }
        static expoOut(t, e, i, s) {
            return t == s ? e + i : i * (1 - Math.pow(2, -10 * t / s)) + e;
        }
        static circIn(t, e, i, s) {
            return -i * (Math.sqrt(1 - (t /= s) * t) - 1) + e;
        }
        static circInOut(t, e, i, s) {
            return (t /= .5 * s) < 1 ? .5 * -i * (Math.sqrt(1 - t * t) - 1) + e : .5 * i * (Math.sqrt(1 - (t -= 2) * t) + 1) + e;
        }
        static circOut(t, e, i, s) {
            return i * Math.sqrt(1 - (t = t / s - 1) * t) + e;
        }
    }
    ri.HALF_PI = .5 * Math.PI, ri.PI2 = 2 * Math.PI;
    class ai {
        constructor() {
            this.gid = 0, this.repeat = 1, this._count = 0;
        }
        static to(t, e, i, r = null, a = null, n = 0, h = !1, o = !0) {
            return s.getItemByClass("tween", ai)._create(t, e, i, r, a, n, h, !0, o, !0);
        }
        static from(t, e, i, r = null, a = null, n = 0, h = !1, o = !0) {
            return s.getItemByClass("tween", ai)._create(t, e, i, r, a, n, h, !1, o, !0);
        }
        to(t, e, i, s = null, r = null, a = 0, n = !1) {
            return this._create(t, e, i, s, r, a, n, !0, !1, !0);
        }
        from(t, e, i, s = null, r = null, a = 0, n = !1) {
            return this._create(t, e, i, s, r, a, n, !1, !1, !0);
        }
        _create(t, e, s, r, a, n, h, o, l, _) {
            if (!t) throw new Error("Tween:target is null");
            this._target = t, this._duration = s, this._ease = r || e.ease || ai.easeNone, this._complete = a || e.complete,
                this._delay = n, this._props = [], this._usedTimer = 0, this._startTimer = ee.now(),
                this._usedPool = l, this._delayParam = null, this.update = e.update;
            var u = t.$_GID || (t.$_GID = Q.getGID());
            return ai.tweenMap[u] ? (h && ai.clearTween(t), ai.tweenMap[u].push(this)) : ai.tweenMap[u] = [this],
                _ ? n <= 0 ? this.firstStart(t, e, o) : (this._delayParam = [t, e, o], i.timer.once(n, this, this.firstStart, this._delayParam)) : this._initProps(t, e, o),
                this;
        }
        firstStart(t, e, i) {
            this._delayParam = null, t.destroyed ? this.clear() : (this._initProps(t, e, i),
                this._beginLoop());
        }
        _initProps(t, e, i) {
            for (var s in e) if ("number" == typeof t[s]) {
                var r = i ? t[s] : e[s], a = i ? e[s] : t[s];
                this._props.push([s, r, a - r]), i || (t[s] = r);
            }
        }
        _beginLoop() {
            i.timer.frameLoop(1, this, this._doEase);
        }
        _doEase() {
            this._updateEase(ee.now());
        }
        _updateEase(t) {
            var e = this._target;
            if (e) {
                if (e.destroyed) return ai.clearTween(e);
                var i = this._usedTimer = t - this._startTimer - this._delay;
                if (!(i < 0)) {
                    if (i >= this._duration) return this.complete();
                    for (var s = i > 0 ? this._ease(i, 0, 1, this._duration) : 0, r = this._props, a = 0, n = r.length; a < n; a++) {
                        var h = r[a];
                        e[h[0]] = h[1] + s * h[2];
                    }
                    this.update && this.update.run();
                }
            }
        }
        set progress(t) {
            var e = t * this._duration;
            this._startTimer = ee.now() - this._delay - e;
        }
        complete() {
            if (this._target) {
                i.timer.runTimer(this, this.firstStart);
                for (var t = this._target, e = this._props, s = this._complete, r = 0, a = e.length; r < a; r++) {
                    var n = e[r];
                    t[n[0]] = n[1] + n[2];
                }
                this.update && this.update.run(), this._count++, 0 != this.repeat && this._count >= this.repeat ? (this.clear(),
                    s && s.run()) : this.restart();
            }
        }
        pause() {
            var t;
            i.timer.clear(this, this._beginLoop), i.timer.clear(this, this._doEase), i.timer.clear(this, this.firstStart),
                (t = ee.now() - this._startTimer - this._delay) < 0 && (this._usedTimer = t);
        }
        setStartTime(t) {
            this._startTimer = t;
        }
        static clearAll(t) {
            if (t && t.$_GID) {
                var e = ai.tweenMap[t.$_GID];
                if (e) {
                    for (var i = 0, s = e.length; i < s; i++) e[i]._clear();
                    e.length = 0;
                }
            }
        }
        static clear(t) {
            t.clear();
        }
        static clearTween(t) {
            ai.clearAll(t);
        }
        clear() {
            this._target && (this._remove(), this._clear());
        }
        _clear() {
            this.pause(), i.timer.clear(this, this.firstStart), this._complete = null, this._target = null,
                this._ease = null, this._props = null, this._delayParam = null, this.repeat = 1,
                this._usedPool && (this.update = null, s.recover("tween", this));
        }
        recover() {
            this._usedPool = !0, this._clear();
        }
        _remove() {
            var t = ai.tweenMap[this._target.$_GID];
            if (t) for (var e = 0, i = t.length; e < i; e++) if (t[e] === this) {
                t.splice(e, 1);
                break;
            }
        }
        restart() {
            if (this.pause(), this._usedTimer = 0, this._startTimer = ee.now(), this._delayParam) i.timer.once(this._delay, this, this.firstStart, this._delayParam); else {
                for (var t = this._props, e = 0, s = t.length; e < s; e++) {
                    var r = t[e];
                    this._target[r[0]] = r[1];
                }
                i.timer.once(this._delay, this, this._beginLoop);
            }
        }
        resume() {
            this._usedTimer >= this._duration || (this._startTimer = ee.now() - this._usedTimer - this._delay,
                this._delayParam ? this._usedTimer < 0 ? i.timer.once(-this._usedTimer, this, this.firstStart, this._delayParam) : this.firstStart.apply(this, this._delayParam) : this._beginLoop());
        }
        static easeNone(t, e, i, s) {
            return i * t / s + e;
        }
    }
    ai.tweenMap = [];
    class ni {
        constructor() {
            this.ratio = .92, this.maxOffset = 60, this._dragging = !1, this._clickOnly = !0;
        }
        start(t, e, s, r, a, n, h, o = .92) {
            this.clearTimer(), this.target = t, this.area = e, this.hasInertia = s, this.elasticDistance = e ? r : 0,
                this.elasticBackTime = a, this.data = n, this._disableMouseEvent = h, this.ratio = o,
                this._parent = t.parent, this._clickOnly = !0, this._dragging = !0, this._elasticRateX = this._elasticRateY = 1,
                this._lastX = this._parent.mouseX, this._lastY = this._parent.mouseY, i.stage.on(qt.MOUSE_UP, this, this.onStageMouseUp),
                i.stage.on(qt.MOUSE_OUT, this, this.onStageMouseUp), i.systemTimer.frameLoop(1, this, this.loop);
        }
        clearTimer() {
            i.systemTimer.clear(this, this.loop), i.systemTimer.clear(this, this.tweenMove),
                this._tween && (this._tween.recover(), this._tween = null);
        }
        stop() {
            this._dragging && (Oe.instance.disableMouseEvent = !1, i.stage.off(qt.MOUSE_UP, this, this.onStageMouseUp),
                i.stage.off(qt.MOUSE_OUT, this, this.onStageMouseUp), this._dragging = !1, this.target && this.area && this.backToArea(),
                this.clear());
        }
        loop() {
            var t = this._parent.getMousePoint(), e = t.x, s = t.y, r = e - this._lastX, a = s - this._lastY;
            if (this._clickOnly) {
                if (!(Math.abs(r * i.stage._canvasTransform.getScaleX()) > 1 || Math.abs(a * i.stage._canvasTransform.getScaleY()) > 1)) return;
                this._clickOnly = !1, this._offsets || (this._offsets = []), this._offsets.length = 0,
                    this.target.event(qt.DRAG_START, this.data), Oe.instance.disableMouseEvent = this._disableMouseEvent;
            } else this._offsets.push(r, a);
            0 === r && 0 === a || (this._lastX = e, this._lastY = s, this.target.x += r * this._elasticRateX,
                this.target.y += a * this._elasticRateY, this.area && this.checkArea(), this.target.event(qt.DRAG_MOVE, this.data));
        }
        checkArea() {
            if (this.elasticDistance <= 0) this.backToArea(); else {
                if (this.target._x < this.area.x) var t = this.area.x - this.target._x; else t = this.target._x > this.area.x + this.area.width ? this.target._x - this.area.x - this.area.width : 0;
                if (this._elasticRateX = Math.max(0, 1 - t / this.elasticDistance), this.target._y < this.area.y) var e = this.area.y - this.target.y; else e = this.target._y > this.area.y + this.area.height ? this.target._y - this.area.y - this.area.height : 0;
                this._elasticRateY = Math.max(0, 1 - e / this.elasticDistance);
            }
        }
        backToArea() {
            this.target.x = Math.min(Math.max(this.target._x, this.area.x), this.area.x + this.area.width),
                this.target.y = Math.min(Math.max(this.target._y, this.area.y), this.area.y + this.area.height);
        }
        onStageMouseUp(t) {
            if (Oe.instance.disableMouseEvent = !1, i.stage.off(qt.MOUSE_UP, this, this.onStageMouseUp),
                i.stage.off(qt.MOUSE_OUT, this, this.onStageMouseUp), i.systemTimer.clear(this, this.loop),
                !this._clickOnly && this.target) if (this.hasInertia) {
                    this._offsets.length < 1 && this._offsets.push(this._parent.mouseX - this._lastX, this._parent.mouseY - this._lastY),
                        this._offsetX = this._offsetY = 0;
                    for (var e = this._offsets.length, s = Math.min(e, 6), r = this._offsets.length - s, a = e - 1; a > r; a--) this._offsetY += this._offsets[a--],
                        this._offsetX += this._offsets[a];
                    this._offsetX = this._offsetX / s * 2, this._offsetY = this._offsetY / s * 2, Math.abs(this._offsetX) > this.maxOffset && (this._offsetX = this._offsetX > 0 ? this.maxOffset : -this.maxOffset),
                        Math.abs(this._offsetY) > this.maxOffset && (this._offsetY = this._offsetY > 0 ? this.maxOffset : -this.maxOffset),
                        i.systemTimer.frameLoop(1, this, this.tweenMove);
                } else this.elasticDistance > 0 ? this.checkElastic() : this.clear();
        }
        checkElastic() {
            var t = NaN, e = NaN;
            if (this.target.x < this.area.x ? t = this.area.x : this.target._x > this.area.x + this.area.width && (t = this.area.x + this.area.width),
                this.target.y < this.area.y ? e = this.area.y : this.target._y > this.area.y + this.area.height && (e = this.area.y + this.area.height),
                isNaN(t) && isNaN(e)) this.clear(); else {
                var i = {};
                isNaN(t) || (i.x = t), isNaN(e) || (i.y = e), this._tween = ai.to(this.target, i, this.elasticBackTime, ri.sineOut, T.create(this, this.clear), 0, !1, !1);
            }
        }
        tweenMove() {
            this._offsetX *= this.ratio * this._elasticRateX, this._offsetY *= this.ratio * this._elasticRateY,
                this.target.x += this._offsetX, this.target.y += this._offsetY, this.area && this.checkArea(),
                this.target.event(qt.DRAG_MOVE, this.data), (Math.abs(this._offsetX) < 1 && Math.abs(this._offsetY) < 1 || this._elasticRateX < .5 || this._elasticRateY < .5) && (i.systemTimer.clear(this, this.tweenMove),
                    this.elasticDistance > 0 ? this.checkElastic() : this.clear());
        }
        clear() {
            if (this.target) {
                this.clearTimer();
                var t = this.target;
                this.target = null, this._parent = null, t.event(qt.DRAG_END, this.data);
            }
        }
    }
    class hi {
        constructor() {
            this._id = Q.getGID(), this._resetComp();
        }
        get id() {
            return this._id;
        }
        get enabled() {
            return this._enabled;
        }
        set enabled(t) {
            this._enabled != t && (this._enabled = t, this.owner && (t ? this.owner.activeInHierarchy && this._onEnable() : this.owner.activeInHierarchy && this._onDisable()));
        }
        get isSingleton() {
            return !0;
        }
        get destroyed() {
            return this._destroyed;
        }
        _isScript() {
            return !1;
        }
        _resetComp() {
            this._indexInList = -1, this._enabled = !0, this._awaked = !1, this.owner = null;
        }
        _getIndexInList() {
            return this._indexInList;
        }
        _setIndexInList(t) {
            this._indexInList = t;
        }
        _onAdded() { }
        _onAwake() { }
        _onEnable() { }
        _onDisable() { }
        _onDestroy() { }
        onReset() { }
        _parse(t, e = null) { }
        _parseInteractive(t = null, e = null) { }
        _cloneTo(t) { }
        _setActive(t) {
            t ? (this._awaked || (this._awaked = !0, this._onAwake()), this._enabled && this._onEnable()) : this._enabled && this._onDisable();
        }
        destroy() {
            this.owner && this.owner._destroyComponent(this);
        }
        _destroy() {
            this.owner.activeInHierarchy && this._enabled && this._setActive(!1), this._onDestroy(),
                this._destroyed = !0, this.onReset !== hi.prototype.onReset ? (this.onReset(), this._resetComp(),
                    s.recoverByClass(this)) : this._resetComp();
        }
    }
    class oi extends Pe {
        constructor() {
            super(), this.wrapMode = 0, this._interval = e.animationInterval, this._isReverse = !1,
                this._frameRateChanged = !1, this._setBitUp(ye.DISPLAY);
        }
        play(t = 0, e = !0, i = "") {
            this._isPlaying = !0, this._actionName = i, this.index = "string" == typeof t ? this._getFrameByLabel(t) : t,
                this.loop = e, this._isReverse = this.wrapMode === oi.WRAP_REVERSE, 0 == this.index && this._isReverse && (this.index = this.count - 1),
                this.interval > 0 && this.timerLoop(this.interval, this, this._frameLoop, null, !0, !0);
        }
        get interval() {
            return this._interval;
        }
        set interval(t) {
            this._interval != t && (this._frameRateChanged = !0, this._interval = t, this._isPlaying && t > 0 && this.timerLoop(t, this, this._frameLoop, null, !0, !0));
        }
        _getFrameByLabel(t) {
            for (var e = 0; e < this._count; e++) {
                var i = this._labels[e];
                if (i && i.indexOf(t) > -1) return e;
            }
            return 0;
        }
        _frameLoop() {
            if (this._isReverse) {
                if (this._index--, this._index < 0) {
                    if (!this.loop) return this._index = 0, this.stop(), void this.event(qt.COMPLETE);
                    this.wrapMode == oi.WRAP_PINGPONG ? (this._index = this._count > 0 ? 1 : 0, this._isReverse = !1) : this._index = this._count - 1,
                        this.event(qt.COMPLETE);
                }
            } else if (this._index++, this._index >= this._count) {
                if (!this.loop) return this._index--, this.stop(), void this.event(qt.COMPLETE);
                this.wrapMode == oi.WRAP_PINGPONG ? (this._index = this._count - 2 >= 0 ? this._count - 2 : 0,
                    this._isReverse = !0) : this._index = 0, this.event(qt.COMPLETE);
            }
            this.index = this._index;
        }
        _setControlNode(t) {
            this._controlNode && (this._controlNode.off(qt.DISPLAY, this, this._resumePlay),
                this._controlNode.off(qt.UNDISPLAY, this, this._resumePlay)), this._controlNode = t,
                t && t != this && (t.on(qt.DISPLAY, this, this._resumePlay), t.on(qt.UNDISPLAY, this, this._resumePlay));
        }
        _setDisplay(t) {
            super._setDisplay(t), this._resumePlay();
        }
        _resumePlay() {
            this._isPlaying && (this._controlNode.displayedInStage ? this.play(this._index, this.loop, this._actionName) : this.clearTimer(this, this._frameLoop));
        }
        stop() {
            this._isPlaying = !1, this.clearTimer(this, this._frameLoop);
        }
        get isPlaying() {
            return this._isPlaying;
        }
        addLabel(t, e) {
            this._labels || (this._labels = {}), this._labels[e] || (this._labels[e] = []),
                this._labels[e].push(t);
        }
        removeLabel(t) {
            if (t) {
                if (this._labels) for (var e in this._labels) this._removeLabelFromList(this._labels[e], t);
            } else this._labels = null;
        }
        _removeLabelFromList(t, e) {
            if (t) for (var i = t.length - 1; i >= 0; i--) t[i] == e && t.splice(i, 1);
        }
        gotoAndStop(t) {
            this.index = "string" == typeof t ? this._getFrameByLabel(t) : t, this.stop();
        }
        get index() {
            return this._index;
        }
        set index(t) {
            if (this._index = t, this._displayToIndex(t), this._labels && this._labels[t]) for (var e = this._labels[t], i = 0, s = e.length; i < s; i++) this.event(qt.LABEL, e[i]);
        }
        _displayToIndex(t) { }
        get count() {
            return this._count;
        }
        clear() {
            return this.stop(), this._labels = null, this;
        }
    }
    oi.WRAP_POSITIVE = 0, oi.WRAP_REVERSE = 1, oi.WRAP_PINGPONG = 2, Ae.regClass("laya.display.AnimationBase", oi),
        Ae.regClass("Laya.AnimationBase", oi);
    class li {
        static subtractVector3(t, e, i) {
            i[0] = t[0] - e[0], i[1] = t[1] - e[1], i[2] = t[2] - e[2];
        }
        static lerp(t, e, i) {
            return t * (1 - i) + e * i;
        }
        static scaleVector3(t, e, i) {
            i[0] = t[0] * e, i[1] = t[1] * e, i[2] = t[2] * e;
        }
        static lerpVector3(t, e, i, s) {
            var r = t[0], a = t[1], n = t[2];
            s[0] = r + i * (e[0] - r), s[1] = a + i * (e[1] - a), s[2] = n + i * (e[2] - n);
        }
        static lerpVector4(t, e, i, s) {
            var r = t[0], a = t[1], n = t[2], h = t[3];
            s[0] = r + i * (e[0] - r), s[1] = a + i * (e[1] - a), s[2] = n + i * (e[2] - n),
                s[3] = h + i * (e[3] - h);
        }
        static slerpQuaternionArray(t, e, i, s, r, a, n) {
            var h, o, l, _, u, c = t[e + 0], d = t[e + 1], p = t[e + 2], f = t[e + 3], g = i[s + 0], m = i[s + 1], v = i[s + 2], T = i[s + 3];
            return (o = c * g + d * m + p * v + f * T) < 0 && (o = -o, g = -g, m = -m, v = -v,
                T = -T), 1 - o > 1e-6 ? (h = Math.acos(o), l = Math.sin(h), _ = Math.sin((1 - r) * h) / l,
                    u = Math.sin(r * h) / l) : (_ = 1 - r, u = r), a[n + 0] = _ * c + u * g, a[n + 1] = _ * d + u * m,
                a[n + 2] = _ * p + u * v, a[n + 3] = _ * f + u * T, a;
        }
        static getRotation(t, e, i, s) {
            return Math.atan2(s - e, i - t) / Math.PI * 180;
        }
        static sortBigFirst(t, e) {
            return t == e ? 0 : e > t ? 1 : -1;
        }
        static sortSmallFirst(t, e) {
            return t == e ? 0 : e > t ? -1 : 1;
        }
        static sortNumBigFirst(t, e) {
            return parseFloat(e) - parseFloat(t);
        }
        static sortNumSmallFirst(t, e) {
            return parseFloat(t) - parseFloat(e);
        }
        static sortByKey(t, e = !1, i = !0) {
            var s;
            return s = e ? i ? li.sortNumBigFirst : li.sortBigFirst : i ? li.sortNumSmallFirst : li.sortSmallFirst,
                function (e, i) {
                    return s(e[t], i[t]);
                };
        }
    }
    class _i extends oi {
        constructor() {
            super(), void 0 === _i._sortIndexFun && (_i._sortIndexFun = li.sortByKey("index", !1, !0));
        }
        static _sortIndexFun(t, e) {
            return t.index - e.index;
        }
        _setUp(t, e) {
            this._targetDic = t, this._animationData = e, this.interval = 1e3 / e.frameRate,
                e.parsed ? (this._count = e.count, this._labels = e.labels, this._usedFrames = e.animationNewFrames) : (this._usedFrames = [],
                    this._calculateDatas(), e.parsed = !0, e.labels = this._labels, e.count = this._count,
                    e.animationNewFrames = this._usedFrames);
        }
        clear() {
            return super.clear(), this._targetDic = null, this._animationData = null, this;
        }
        _displayToIndex(t) {
            if (this._animationData) {
                t < 0 && (t = 0), t > this._count && (t = this._count);
                var e, i = this._animationData.nodes, s = i.length;
                for (e = 0; e < s; e++) this._displayNodeToFrame(i[e], t);
            }
        }
        _displayNodeToFrame(t, e, i = null) {
            i || (i = this._targetDic);
            var s = i[t.target];
            if (s) {
                var r, a, n, h, o = t.frames, l = t.keys, _ = l.length;
                for (h = 0; h < _; h++) n = (a = o[r = l[h]]).length > e ? a[e] : a[a.length - 1],
                    s[r] = n;
                var u, c = t.funkeys;
                if (0 != (_ = c.length)) for (h = 0; h < _; h++) void 0 !== (u = o[r = c[h]])[e] && s[r] && s[r].apply(s, u[e]);
            }
        }
        _calculateDatas() {
            if (this._animationData) {
                var t, e, i = this._animationData.nodes, s = i.length;
                for (this._count = 0, t = 0; t < s; t++) e = i[t], this._calculateKeyFrames(e);
                this._count += 1;
            }
        }
        _calculateKeyFrames(t) {
            var e, i, s = t.keyframes, r = t.target;
            for (e in t.frames || (t.frames = {}), t.keys ? t.keys.length = 0 : t.keys = [],
                t.funkeys ? t.funkeys.length = 0 : t.funkeys = [], t.initValues || (t.initValues = {}),
                s) {
                var a = -1 != e.indexOf("()");
                if (i = s[e], a && (e = e.substr(0, e.length - 2)), t.frames[e] || (t.frames[e] = []),
                    a) {
                    t.funkeys.push(e);
                    for (var n = t.frames[e], h = 0; h < i.length; h++) {
                        var o = i[h];
                        n[o.index] = o.value, o.index > this._count && (this._count = o.index);
                    }
                } else this._targetDic && this._targetDic[r] && (t.initValues[e] = this._targetDic[r][e]),
                    i.sort(_i._sortIndexFun), t.keys.push(e), this._calculateNodePropFrames(i, t.frames[e], e, r);
            }
        }
        resetNodes() {
            if (this._targetDic && this._animationData) {
                var t, e, i, s = this._animationData.nodes, r = s.length;
                for (t = 0; t < r; t++) if (i = (e = s[t]).initValues) {
                    var a, n = this._targetDic[e.target];
                    if (n) for (a in i) n[a] = i[a];
                }
            }
        }
        _calculateNodePropFrames(t, e, i, s) {
            var r, a = t.length - 1;
            for (e.length = t[a].index + 1, r = 0; r < a; r++) this._dealKeyFrame(t[r]), this._calculateFrameValues(t[r], t[r + 1], e);
            0 == a && (e[0] = t[0].value, this._usedFrames && (this._usedFrames[t[0].index] = !0)),
                this._dealKeyFrame(t[r]);
        }
        _dealKeyFrame(t) {
            t.label && "" != t.label && this.addLabel(t.label, t.index);
        }
        _calculateFrameValues(t, e, i) {
            var s, r, a = t.index, n = e.index, h = t.value, o = e.value - t.value, l = n - a, _ = this._usedFrames;
            if (n > this._count && (this._count = n), t.tween) for (null == (r = ri[t.tweenMethod]) && (r = ri.linearNone),
                s = a; s < n; s++) i[s] = r(s - a, h, o, l), _ && (_[s] = !0); else for (s = a; s < n; s++) i[s] = h;
            _ && (_[t.index] = !0, _[e.index] = !0), i[e.index] = e.value;
        }
    }
    Ae.regClass("laya.display.FrameAnimation", _i), Ae.regClass("Laya.FrameAnimation", _i);
    class ui {
        constructor() {
            this._obj = {}, ui._maps.push(this);
        }
        static __init__() {
            ui.I = new ui(), ui.supportWeakMap || i.systemTimer.loop(ui.delInterval, null, ui.clearCache);
        }
        static clearCache() {
            for (var t = 0, e = ui._maps.length; t < e; t++) {
                ui._maps[t]._obj = {};
            }
        }
        set(t, e) {
            null != t && (ui.supportWeakMap || ("string" == typeof t || "number" == typeof t ? this._obj[t] = e : (t.$_GID || (t.$_GID = Q.getGID()),
                this._obj[t.$_GID] = e)));
        }
        get(t) {
            return null == t ? null : ui.supportWeakMap ? void 0 : "string" == typeof t || "number" == typeof t ? this._obj[t] : this._obj[t.$_GID];
        }
        del(t) {
            null != t && (ui.supportWeakMap || ("string" == typeof t || "number" == typeof t ? delete this._obj[t] : delete this._obj[this._obj.$_GID]));
        }
        has(t) {
            return null != t && (ui.supportWeakMap ? void 0 : "string" == typeof t || "number" == typeof t ? null != this._obj[t] : null != this._obj[this._obj.$_GID]);
        }
    }
    ui.supportWeakMap = !1, ui.delInterval = 6e5, ui._maps = [];
    class ci {
        static __init() {
            ci._funMap = new ui();
        }
        static getBindFun(t) {
            var e = ci._funMap.get(t);
            if (null == e) {
                var i = '"' + t + '"', s = "(function(data){if(data==null)return;with(data){try{\nreturn " + (i = i.replace(/^"\${|}"$/g, "").replace(/\${/g, '"+').replace(/}/g, '+"')) + "\n}catch(e){}}})";
                e = window.Laya._runScript(s), ci._funMap.set(t, e);
            }
            return e;
        }
        static createByData(t, e) {
            var i = pi.create();
            if ((t = ci.createComp(e, t, t, null, i))._setBit(ye.NOT_READY, !0), "_idMap" in t && (t._idMap = i._idMap),
                e.animations) {
                var s, r, a, n = [], h = e.animations, o = h.length;
                for (s = 0; s < o; s++) {
                    switch (r = new _i(), a = h[s], r._setUp(i._idMap, a), t[a.name] = r, r._setControlNode(t),
                    a.action) {
                        case 1:
                            r.play(0, !1);
                            break;

                        case 2:
                            r.play(0, !0);
                    }
                    n.push(r);
                }
                t._aniList = n;
            }
            return "Scene" === t._$componentType && t._width > 0 && null == e.props.hitTestPrior && !t.mouseThrough && (t.hitTestPrior = !0),
                i.beginLoad(t), t;
        }
        static createInitTool() {
            return pi.create();
        }
        static createComp(t, e = null, s = null, r = null, a = null) {
            if ("Scene3D" == t.type || "Sprite3D" == t.type) {
                var n = [], h = i.Laya.Utils3D._createSceneByJsonForMaker(t, n, a);
                return "Sprite3D" == t.type ? i.Laya.StaticBatchManager.combine(h, n) : i.Laya.StaticBatchManager.combine(null, n),
                    h;
            }
            if (!(e = e || ci.getCompInstance(t))) return t.props && t.props.runtime ? console.warn("runtime not found:" + t.props.runtime) : console.warn("can not create:" + t.type),
                null;
            var o = t.child;
            if (o) for (var l = "List" == e._$componentType, _ = 0, u = o.length; _ < u; _++) {
                var c = o[_];
                if ("itemRender" in e && ("render" == c.props.name || "render" === c.props.renderType)) e.itemRender = c; else if ("Graphic" == c.type) i.ClassUtils._addGraphicsToSprite(c, e); else if (i.ClassUtils._isDrawType(c.type)) i.ClassUtils._addGraphicToSprite(c, e, !0); else {
                    if (l) {
                        var d = [], p = ci.createComp(c, null, s, d, a);
                        d.length && (p._$bindData = d);
                    } else p = ci.createComp(c, null, s, r, a);
                    "Script" == c.type ? p instanceof hi ? e._addComponentInstance(p) : "owner" in p ? p.owner = e : "target" in p && (p.target = e) : "mask" == c.props.renderType || "mask" == c.props.name ? e.mask = p : p instanceof Ie && e.addChild(p);
                }
            }
            var f = t.props;
            for (var g in f) {
                var m = f[g];
                "string" == typeof m && (m.indexOf("@node:") >= 0 || m.indexOf("@Prefab:") >= 0) ? a && a.addNodeRef(e, g, m) : ci.setCompValue(e, g, m, s, r);
            }
            return e._afterInited && e._afterInited(), t.compId && a && a._idMap && (a._idMap[t.compId] = e),
                e;
        }
        static setCompValue(t, e, s, r = null, a = null) {
            if ("string" == typeof s && s.indexOf("${") > -1) {
                if (ci._sheet || (ci._sheet = i.ClassUtils.getClass("laya.data.Table")), !ci._sheet) return void console.warn("Can not find class Sheet");
                if (a) a.push(t, e, s); else if (r) {
                    -1 == s.indexOf("].") && (s = s.replace(".", "[0]."));
                    var n, h, o = new di(t, e, s);
                    o.exe(r);
                    for (var l = s.replace(/\[.*?\]\./g, "."); null != (n = ci._parseWatchData.exec(l));) {
                        for (var _ = n[1]; null != (h = ci._parseKeyWord.exec(_));) {
                            var u = h[0], c = r._watchMap[u] || (r._watchMap[u] = []);
                            c.push(o), ci._sheet.I.notifer.on(u, r, r.changeData, [u]);
                        }
                        (c = r._watchMap[_] || (r._watchMap[_] = [])).push(o), ci._sheet.I.notifer.on(_, r, r.changeData, [_]);
                    }
                }
            } else "var" === e && r ? r[s] = t : t[e] = "true" === s || "false" !== s && s;
        }
        static getCompInstance(t) {
            if ("UIView" == t.type && t.props && t.props.pageData) return ci.createByData(null, t.props.pageData);
            var e = t.props && t.props.runtime || t.type, r = i.ClassUtils.getClass(e);
            if (!r) throw "Can not find class " + e;
            if ("Script" === t.type && r.prototype._doAwake) {
                var a = s.createByClass(r);
                return a._destroyed = !1, a;
            }
            return t.props && "renderType" in t.props && "instance" == t.props.renderType ? (r.instance || (r.instance = new r()),
                r.instance) : new r();
        }
    }
    ci._parseWatchData = /\${(.*?)}/g, ci._parseKeyWord = /[a-zA-Z_][a-zA-Z0-9_]*(?:(?:\.[a-zA-Z_][a-zA-Z0-9_]*)+)/g;
    class di {
        constructor(t, e, i) {
            this.comp = t, this.prop = e, this.value = i;
        }
        exe(t) {
            var e = ci.getBindFun(this.value);
            this.comp[this.prop] = e.call(this, t);
        }
    }
    class pi {
        reset() {
            this._nodeRefList = null, this._initList = null, this._idMap = null, this._loadList = null,
                this._scene = null;
        }
        recover() {
            this.reset(), s.recover("InitTool", this);
        }
        static create() {
            var t = s.getItemByClass("InitTool", pi);
            return t._idMap = [], t;
        }
        addLoadRes(t, e = null) {
            this._loadList || (this._loadList = []), i.loader.getRes(t) || (e ? this._loadList.push({
                url: t,
                type: e
            }) : this._loadList.push(t));
        }
        addNodeRef(t, e, i) {
            this._nodeRefList || (this._nodeRefList = []), this._nodeRefList.push([t, e, i]),
                i.indexOf("@Prefab:") >= 0 && this.addLoadRes(i.replace("@Prefab:", ""), Ze.PREFAB);
        }
        setNodeRef() {
            if (this._nodeRefList) if (this._idMap) {
                var t, e, i;
                for (e = this._nodeRefList.length, t = 0; t < e; t++) (i = this._nodeRefList[t])[0][i[1]] = this.getReferData(i[2]);
                this._nodeRefList = null;
            } else this._nodeRefList = null;
        }
        getReferData(t) {
            if (t.indexOf("@Prefab:") >= 0) return Ze.getRes(t.replace("@Prefab:", ""));
            if (t.indexOf("@arr:") >= 0) {
                var e, i, s, r;
                for (s = (e = (t = t.replace("@arr:", "")).split(",")).length, i = 0; i < s; i++) r = e[i],
                    e[i] = r ? this._idMap[r.replace("@node:", "")] : null;
                return e;
            }
            return this._idMap[t.replace("@node:", "")];
        }
        addInitItem(t) {
            this._initList || (this._initList = []), this._initList.push(t);
        }
        doInits() {
            this._initList && (this._initList = null);
        }
        finish() {
            this.setNodeRef(), this.doInits(), this._scene._setBit(ye.NOT_READY, !1), this._scene.parent && this._scene.parent.activeInHierarchy && this._scene.active && this._scene._processActive(),
                this._scene.event("onViewCreated"), this.recover();
        }
        beginLoad(t) {
            this._scene = t, !this._loadList || this._loadList.length < 1 ? this.finish() : i.loader.load(this._loadList, T.create(this, this.finish));
        }
    }
    class fi {
        show(t = 0, e = 0) { }
        enable() { }
        hide() { }
        set_onclick(t) { }
        isCanvasRender() {
            return !0;
        }
        renderNotCanvas(t, e, i) { }
    }
    class gi extends fi {
        constructor() {
            super(...arguments), this._show = !1, this._useCanvas = !1, this._height = 100,
                this._view = [];
        }
        show(t = 0, e = 0) {
            ee.onMiniGame || i.Render.isConchApp || ee.onBDMiniGame || ee.onKGMiniGame || ee.onQGMiniGame || ee.onQQMiniGame || ee.onAlipayMiniGame || ee.onBLMiniGame || ee.onTTMiniGame || ee.onHWMiniGame || ee.onTBMiniGame || (this._useCanvas = !0),
                this._show = !0, V._fpsData.length = 60, this._view[0] = {
                    title: "FPS(WebGL)",
                    value: "_fpsStr",
                    color: "yellow",
                    units: "int"
                }, this._view[1] = {
                    title: "Sprite",
                    value: "_spriteStr",
                    color: "white",
                    units: "int"
                }, this._view[2] = {
                    title: "RenderBatches",
                    value: "renderBatches",
                    color: "white",
                    units: "int"
                }, this._view[3] = {
                    title: "SavedRenderBatches",
                    value: "savedRenderBatches",
                    color: "white",
                    units: "int"
                }, this._view[4] = {
                    title: "CPUMemory",
                    value: "cpuMemory",
                    color: "yellow",
                    units: "M"
                }, this._view[5] = {
                    title: "GPUMemory",
                    value: "gpuMemory",
                    color: "yellow",
                    units: "M"
                }, this._view[6] = {
                    title: "Shader",
                    value: "shaderCall",
                    color: "white",
                    units: "int"
                }, this._view[7] = {
                    title: "Canvas",
                    value: "_canvasStr",
                    color: "white",
                    units: "int"
                }, le.is3DMode && (this._view[0].title = "FPS(3D)", this._view[8] = {
                    title: "TriFaces",
                    value: "trianglesFaces",
                    color: "white",
                    units: "int"
                }, this._view[9] = {
                    title: "FrustumCulling",
                    value: "frustumCulling",
                    color: "white",
                    units: "int"
                }, this._view[10] = {
                    title: "OctreeNodeCulling",
                    value: "octreeNodeCulling",
                    color: "white",
                    units: "int"
                }), this._useCanvas ? this.createUIPre(t, e) : this.createUI(t, e), this.enable();
        }
        createUIPre(t, e) {
            var i = ee.pixelRatio;
            this._width = 180 * i, this._vx = 120 * i, this._height = i * (12 * this._view.length + 3 * i) + 4,
                gi._fontSize = 12 * i;
            for (var s = 0; s < this._view.length; s++) this._view[s].x = 4, this._view[s].y = s * gi._fontSize + 2 * i;
            this._canvas || (this._canvas = new we(!0), this._canvas.size(this._width, this._height),
                this._ctx = this._canvas.getContext("2d"), this._ctx.textBaseline = "top", this._ctx.font = gi._fontSize + "px Arial",
                this._canvas.source.style.cssText = "pointer-events:none;background:rgba(150,150,150,0.8);z-index:100000;position: absolute;direction:ltr;left:" + t + "px;top:" + e + "px;width:" + this._width / i + "px;height:" + this._height / i + "px;"),
                ee.onKGMiniGame || ee.container.appendChild(this._canvas.source), this._first = !0,
                this.loop(), this._first = !1;
        }
        createUI(t, e) {
            var i = this._sp, s = ee.pixelRatio;
            i || (i = new Pe(), this._leftText = new De(), this._leftText.pos(5, 5), this._leftText.color = "#ffffff",
                i.addChild(this._leftText), this._txt = new De(), this._txt.pos(130 * s, 5), this._txt.color = "#ffffff",
                i.addChild(this._txt), this._sp = i), i.pos(t, e);
            for (var r = "", a = 0; a < this._view.length; a++) {
                r += this._view[a].title + "\n";
            }
            this._leftText.text = r;
            var n = 138 * s, h = s * (12 * this._view.length + 3 * s) + 4;
            this._txt.fontSize = gi._fontSize * s, this._leftText.fontSize = gi._fontSize * s,
                i.size(n, h), i.graphics.clear(), i.graphics.alpha(.5), i.graphics.drawRect(0, 0, n + 110, h + 30, "#999999"),
                i.graphics.alpha(2), this.loop();
        }
        enable() {
            i.systemTimer.frameLoop(1, this, this.loop);
        }
        hide() {
            this._show = !1, i.systemTimer.clear(this, this.loop), this._canvas && ee.removeElement(this._canvas.source);
        }
        set_onclick(t) {
            this._sp && this._sp.on("click", this._sp, t), this._canvas && (this._canvas.source.onclick = t,
                this._canvas.source.style.pointerEvents = "");
        }
        loop() {
            V._count++;
            var t = ee.now();
            if (!(t - V._timer < 1e3)) {
                var e = V._count;
                if (V.FPS = Math.round(1e3 * e / (t - V._timer)), this._show) {
                    V.trianglesFaces = Math.round(V.trianglesFaces / e), this._useCanvas ? V.renderBatches = Math.round(V.renderBatches / e) : V.renderBatches = Math.round(V.renderBatches / e) - 1,
                        V.savedRenderBatches = Math.round(V.savedRenderBatches / e), V.shaderCall = Math.round(V.shaderCall / e),
                        V.spriteRenderUseCacheCount = Math.round(V.spriteRenderUseCacheCount / e), V.canvasNormal = Math.round(V.canvasNormal / e),
                        V.canvasBitmap = Math.round(V.canvasBitmap / e), V.canvasReCache = Math.ceil(V.canvasReCache / e),
                        V.frustumCulling = Math.round(V.frustumCulling / e), V.octreeNodeCulling = Math.round(V.octreeNodeCulling / e);
                    var i = V.FPS > 0 ? Math.floor(1e3 / V.FPS).toString() : " ";
                    V._fpsStr = V.FPS + (V.renderSlow ? " slow" : "") + " " + i, V._spriteStr = V.spriteCount + (V.spriteRenderUseCacheCount ? "/" + V.spriteRenderUseCacheCount : ""),
                        V._canvasStr = V.canvasReCache + "/" + V.canvasNormal + "/" + V.canvasBitmap, V.cpuMemory = b.cpuMemory,
                        V.gpuMemory = b.gpuMemory, this._useCanvas ? this.renderInfoPre() : this.renderInfo(),
                        V.clear();
                }
                V._count = 0, V._timer = t;
            }
        }
        renderInfoPre() {
            var t, e, i = 0;
            if (this._canvas) {
                var s = this._ctx;
                for (s.clearRect(this._first ? 0 : this._vx, 0, this._width, this._height), i = 0; i < this._view.length; i++) t = this._view[i],
                    this._first && (s.fillStyle = "white", s.fillText(t.title, t.x, t.y)), s.fillStyle = t.color,
                    e = V[t.value], "M" == t.units && (e = Math.floor(e / 1048576 * 100) / 100 + " M"),
                    s.fillText(e + "", t.x + this._vx, t.y);
            }
        }
        renderInfo() {
            for (var t = "", e = 0; e < this._view.length; e++) {
                var i = this._view[e], s = V[i.value];
                "M" == i.units && (s = Math.floor(s / 1048576 * 100) / 100 + " M"), "K" == i.units && (s = Math.floor(s / 1024 * 100) / 100 + " K"),
                    t += s + "\n";
            }
            this._txt.text = t;
        }
        isCanvasRender() {
            return this._useCanvas;
        }
        renderNotCanvas(t, e, i) {
            this._show && this._sp && this._sp.render(t, 0, 0);
        }
    }
    gi._fontSize = 12;
    class mi {
        constructor(t = !0) {
            this.scale = 1, this.currTimer = Date.now(), this.currFrame = 0, this._delta = 0,
                this._lastTimer = Date.now(), this._map = [], this._handlers = [], this._temp = [],
                this._count = 0, t && mi.gSysTimer && mi.gSysTimer.frameLoop(1, this, this._update);
        }
        get delta() {
            return this._delta;
        }
        _update() {
            if (this.scale <= 0) return this._lastTimer = Date.now(), void (this._delta = 0);
            var t = this.currFrame = this.currFrame + this.scale, e = Date.now(), i = e - this._lastTimer > 3e4;
            this._delta = (e - this._lastTimer) * this.scale;
            var s = this.currTimer = this.currTimer + this._delta;
            this._lastTimer = e;
            var r = this._handlers;
            this._count = 0;
            for (var a = 0, n = r.length; a < n; a++) {
                var h = r[a];
                if (null !== h.method) {
                    var o = h.userFrame ? t : s;
                    if (o >= h.exeTime) if (h.repeat) if (!h.jumpFrame || i) h.exeTime += h.delay, h.run(!1),
                        o > h.exeTime && (h.exeTime += Math.ceil((o - h.exeTime) / h.delay) * h.delay); else for (; o >= h.exeTime;) h.exeTime += h.delay,
                            h.run(!1); else h.run(!0);
                } else this._count++;
            }
            (this._count > 30 || t % 200 == 0) && this._clearHandlers();
        }
        _clearHandlers() {
            for (var t = this._handlers, e = 0, i = t.length; e < i; e++) {
                var s = t[e];
                null !== s.method ? this._temp.push(s) : this._recoverHandler(s);
            }
            this._handlers = this._temp, t.length = 0, this._temp = t;
        }
        _recoverHandler(t) {
            this._map[t.key] == t && (this._map[t.key] = null), t.clear(), mi._pool.push(t);
        }
        _create(t, e, i, s, r, a, n) {
            if (!i) return r.apply(s, a), null;
            if (n) {
                var h = this._getHandler(s, r);
                if (h) return h.repeat = e, h.userFrame = t, h.delay = i, h.caller = s, h.method = r,
                    h.args = a, h.exeTime = i + (t ? this.currFrame : this.currTimer + Date.now() - this._lastTimer),
                    h;
            }
            return (h = mi._pool.length > 0 ? mi._pool.pop() : new vi()).repeat = e, h.userFrame = t,
                h.delay = i, h.caller = s, h.method = r, h.args = a, h.exeTime = i + (t ? this.currFrame : this.currTimer + Date.now() - this._lastTimer),
                this._indexHandler(h), this._handlers.push(h), h;
        }
        _indexHandler(t) {
            var e = t.caller, s = t.method, r = e ? e.$_GID || (e.$_GID = i.Utils.getGID()) : 0, a = s.$_TID || (s.$_TID = 1e5 * mi._mid++);
            t.key = r + a, this._map[t.key] = t;
        }
        once(t, e, i, s = null, r = !0) {
            this._create(!1, !1, t, e, i, s, r);
        }
        loop(t, e, i, s = null, r = !0, a = !1) {
            var n = this._create(!1, !0, t, e, i, s, r);
            n && (n.jumpFrame = a);
        }
        frameOnce(t, e, i, s = null, r = !0) {
            this._create(!0, !1, t, e, i, s, r);
        }
        frameLoop(t, e, i, s = null, r = !0) {
            this._create(!0, !0, t, e, i, s, r);
        }
        toString() {
            return " handlers:" + this._handlers.length + " pool:" + mi._pool.length;
        }
        clear(t, e) {
            var i = this._getHandler(t, e);
            i && (this._map[i.key] = null, i.key = 0, i.clear());
        }
        clearAll(t) {
            if (t) for (var e = 0, i = this._handlers.length; e < i; e++) {
                var s = this._handlers[e];
                s.caller === t && (this._map[s.key] = null, s.key = 0, s.clear());
            }
        }
        _getHandler(t, e) {
            var s = t ? t.$_GID || (t.$_GID = i.Utils.getGID()) : 0, r = e.$_TID || (e.$_TID = 1e5 * mi._mid++);
            return this._map[s + r];
        }
        callLater(t, e, i = null) {
            Ne.I.callLater(t, e, i);
        }
        runCallLater(t, e) {
            Ne.I.runCallLater(t, e);
        }
        runTimer(t, e) {
            var i = this._getHandler(t, e);
            i && null != i.method && (this._map[i.key] = null, i.run(!0));
        }
        pause() {
            this.scale = 0;
        }
        resume() {
            this.scale = 1;
        }
    }
    mi.gSysTimer = null, mi._pool = [], mi._mid = 1;
    class vi {
        clear() {
            this.caller = null, this.method = null, this.args = null;
        }
        run(t) {
            var e = this.caller;
            if (e && e.destroyed) return this.clear();
            var i = this.method, s = this.args;
            t && this.clear(), null != i && (s ? i.apply(e, s) : i.call(e));
        }
    }
    class Ti extends z {
        constructor(t) {
            super(W.SKINMESH, 0), this.offsetX = 300, this.offsetY = 0;
            var e = v.mainContext, i = 8 * kt.BYTES_PE;
            this.position = [2, e.FLOAT, !1, i, 0], this.texcoord = [2, e.FLOAT, !1, i, 2 * kt.BYTES_PE],
                this.color = [4, e.FLOAT, !1, i, 4 * kt.BYTES_PE];
        }
    }
    class xi extends z {
        constructor(t) {
            super(W.PRIMITIVE, 0), this._attribLocation = ["position", 0, "attribColor", 1];
        }
    }
    class yi extends z {
        constructor(t = 0) {
            super(W.TEXTURE2D, t), this.strength = 0, this.blurInfo = null, this.colorMat = null,
                this.colorAlpha = null, this._attribLocation = ["posuv", 0, "attribColor", 1, "attribFlags", 2];
        }
        clear() {
            this.texture = null, this.shader = null, this.defines._value = this.subID;
        }
    }
    class Ei {
        constructor(t) {
            this.codes = {}, this.funs = {}, this.curUseID = -1, this.funnames = "", this.script = t;
            for (var e, s, r = 0; !((r = t.indexOf("#begin", r)) < 0);) {
                for (s = r + 5; !((s = t.indexOf("#end", s)) < 0) && "i" === t.charAt(s + 4);) s += 5;
                if (s < 0) throw "add include err,no #end:" + t;
                e = t.indexOf("\n", r);
                var a = i.ShaderCompile.splitToWords(t.substr(r, e - r), null);
                "code" == a[1] ? this.codes[a[2]] = t.substr(e + 1, s - e - 1) : "function" == a[1] && (e = t.indexOf("function", r),
                    e += "function".length, this.funs[a[3]] = t.substr(e + 1, s - e - 1), this.funnames += a[3] + ";"),
                    r = s + 1;
            }
        }
        getWith(t = null) {
            var e = t ? this.codes[t] : this.script;
            if (!e) throw "get with error:" + t;
            return e;
        }
        getFunsScript(t) {
            var e = "";
            for (var i in this.funs) t.indexOf(i + ";") >= 0 && (e += this.funs[i]);
            return e;
        }
    }
    class bi {
        constructor(t) {
            this.childs = [], this.text = "", this.useFuns = "", this.z = 0, this.includefiles = t;
        }
        setParent(t) {
            t.childs.push(this), this.z = t.z + 1, this.parent = t;
        }
        setCondition(t, e) {
            t && (this.conditionType = e, t = t.replace(/(\s*$)/g, ""), this.condition = function () {
                return this[t];
            }, this.condition.__condition = t);
        }
        toscript(t, e) {
            return this._toscript(t, e, ++bi.__id);
        }
        _toscript(t, e, s) {
            if (this.childs.length < 1 && !this.text) return e;
            e.length;
            if (this.condition) {
                var r = !!this.condition.call(t);
                if (this.conditionType === i.ShaderCompile.IFDEF_ELSE && (r = !r), !r) return e;
            }
            if (this.noCompile && this.text && e.push(this.text), this.childs.length > 0 && this.childs.forEach(function (i, r, a) {
                i._toscript(t, e, s);
            }), this.includefiles.length > 0 && this.useFuns.length > 0) for (var a, n = 0, h = this.includefiles.length; n < h; n++) this.includefiles[n].curUseID != s && (a = this.includefiles[n].file.getFunsScript(this.useFuns)).length > 0 && (this.includefiles[n].curUseID = s,
                e[0] = a + e[0]);
            return e;
        }
    }
    bi.__id = 1;
    class wi {
        constructor(t, e, i) {
            this.defs = {};
            let s = this;
            function _compile(t) {
                t = t.replace(wi._clearCR, "");
                var e = [], i = new bi(e);
                return s._compileToTree(i, t.split("\n"), 0, e, s.defs), i;
            }
            var r = Date.now();
            this._VS = _compile(t), this._PS = _compile(e), this._nameMap = i, Date.now() - r > 2 && console.log("ShaderCompile use time:" + (Date.now() - r) + "  size:" + t.length + "/" + e.length);
        }
        static __init__() {
            var t = m.instance;
            wi.shaderParamsMap = {
                float: t.FLOAT,
                int: t.INT,
                bool: t.BOOL,
                vec2: t.FLOAT_VEC2,
                vec3: t.FLOAT_VEC3,
                vec4: t.FLOAT_VEC4,
                ivec2: t.INT_VEC2,
                ivec3: t.INT_VEC3,
                ivec4: t.INT_VEC4,
                bvec2: t.BOOL_VEC2,
                bvec3: t.BOOL_VEC3,
                bvec4: t.BOOL_VEC4,
                mat2: t.FLOAT_MAT2,
                mat3: t.FLOAT_MAT3,
                mat4: t.FLOAT_MAT4,
                sampler2D: t.SAMPLER_2D,
                samplerCube: t.SAMPLER_CUBE
            };
        }
        static _parseOne(t, e, i, s, r, a) {
            var n = {
                type: wi.shaderParamsMap[i[s + 1]],
                name: i[s + 2],
                size: isNaN(parseInt(i[s + 3])) ? 1 : parseInt(i[s + 3])
            };
            return a && ("attribute" == r ? t.push(n) : e.push(n)), ":" == i[s + 3] && (n.type = i[s + 4],
                s += 2), s += 2;
        }
        static addInclude(t, e) {
            if (!e || 0 === e.length) throw new Error("add shader include file err:" + t);
            if (wi.includes[t]) throw new Error("add shader include file err, has add:" + t);
            wi.includes[t] = new Ei(e);
        }
        static preGetParams(t, e) {
            var i, s, r = [t, e], a = {}, n = [], h = [], o = {}, l = [];
            a.attributes = n, a.uniforms = h, a.defines = o;
            for (var _ = 0; _ < 2; _++) {
                r[_] = r[_].replace(wi._removeAnnotation, "");
                var u, c = r[_].match(wi._reg);
                for (i = 0, s = c.length; i < s; i++) {
                    var d = c[i];
                    if ("attribute" == d || "uniform" == d) i = wi._parseOne(n, h, c, i, d, !0); else {
                        if ("#define" == d) {
                            l[d = c[++i]] = 1;
                            continue;
                        }
                        if ("#ifdef" == d) {
                            o[u = c[++i]] = o[u] || [];
                            for (i++; i < s; i++) if ("attribute" == (d = c[i]) || "uniform" == d) i = wi._parseOne(n, h, c, i, d, l[u]); else if ("#else" == d) for (i++; i < s; i++) if ("attribute" == (d = c[i]) || "uniform" == d) i = wi._parseOne(n, h, c, i, d, !l[u]); else if ("#endif" == d) break;
                        }
                    }
                }
            }
            return a;
        }
        static splitToWords(t, e) {
            for (var i, s, r = [], a = -1, n = 0, h = t.length; n < h; n++) if (i = t.charAt(n),
                " \t=+-*/&%!<>()'\",;".indexOf(i) >= 0) {
                if (a >= 0 && n - a > 1 && (s = t.substr(a, n - a), r.push(s)), '"' == i || "'" == i) {
                    var o = t.indexOf(i, n + 1);
                    if (o < 0) throw "Sharder err:" + t;
                    r.push(t.substr(n + 1, o - n - 1)), n = o, a = -1;
                    continue;
                }
                "(" == i && e && r.length > 0 && (s = r[r.length - 1] + ";", "vec4;main;".indexOf(s) < 0 && (e.useFuns += s)),
                    a = -1;
            } else a < 0 && (a = n);
            return a < h && h - a > 1 && (s = t.substr(a, h - a), r.push(s)), r;
        }
        _compileToTree(t, e, i, s, r) {
            var a, n, h, o, l, _, u, c, d, p, f;
            for (d = i; d < e.length; d++) if (!((h = e[d]).length < 1) && 0 !== (_ = h.indexOf("//"))) {
                if (_ >= 0 && (h = h.substr(0, _)), a = c || new bi(s), c = null, a.text = h, a.noCompile = !0,
                    (_ = h.indexOf("#")) >= 0) {
                    for (o = "#", f = _ + 1, p = h.length; f < p; f++) {
                        var g = h.charAt(f);
                        if (" " === g || "\t" === g || "?" === g) break;
                        o += g;
                    }
                    switch (a.name = o, o) {
                        case "#ifdef":
                        case "#ifndef":
                            if (a.src = h, a.noCompile = null != h.match(/[!&|()=<>]/), a.noCompile ? console.log("function():Boolean{return " + h.substr(_ + a.name.length) + "}") : (u = h.replace(/^\s*/, "").split(/\s+/),
                                a.setCondition(u[1], "#ifdef" === o ? wi.IFDEF_YES : wi.IFDEF_ELSE), a.text = "//" + a.text),
                                a.setParent(t), t = a, r) for (u = h.substr(f).split(wi._splitToWordExps3), f = 0; f < u.length; f++) (h = u[f]).length && (r[h] = !0);
                            continue;

                        case "#if":
                            if (a.src = h, a.noCompile = !0, a.setParent(t), t = a, r) for (u = h.substr(f).split(wi._splitToWordExps3),
                                f = 0; f < u.length; f++) (h = u[f]).length && "defined" != h && (r[h] = !0);
                            continue;

                        case "#else":
                            a.src = h, n = (t = t.parent).childs[t.childs.length - 1], a.noCompile = n.noCompile,
                                a.noCompile || (a.condition = n.condition, a.conditionType = n.conditionType == wi.IFDEF_YES ? wi.IFDEF_ELSE : wi.IFDEF_YES,
                                    a.text = "//" + a.text + " " + n.text + " " + a.conditionType), a.setParent(t),
                                t = a;
                            continue;

                        case "#endif":
                            n = (t = t.parent).childs[t.childs.length - 1], a.noCompile = n.noCompile, a.noCompile || (a.text = "//" + a.text),
                                a.setParent(t);
                            continue;

                        case "#include":
                            u = wi.splitToWords(h, null);
                            var m = wi.includes[u[1]];
                            if (!m) throw "ShaderCompile error no this include file:" + u[1];
                            if ((_ = u[0].indexOf("?")) < 0) {
                                a.setParent(t), h = m.getWith("with" == u[2] ? u[3] : null), this._compileToTree(a, h.split("\n"), 0, s, r),
                                    a.text = "";
                                continue;
                            }
                            a.setCondition(u[0].substr(_ + 1), wi.IFDEF_YES), a.text = m.getWith("with" == u[2] ? u[3] : null);
                            break;

                        case "#import":
                            l = (u = wi.splitToWords(h, null))[1], s.push({
                                node: a,
                                file: wi.includes[l],
                                ofs: a.text.length
                            });
                            continue;
                    }
                } else {
                    if ((n = t.childs[t.childs.length - 1]) && !n.name) {
                        s.length > 0 && wi.splitToWords(h, n), c = a, n.text += "\n" + h;
                        continue;
                    }
                    s.length > 0 && wi.splitToWords(h, a);
                }
                a.setParent(t);
            }
        }
        createShader(t, e, i, s) {
            var r = {}, a = "";
            if (t) for (var n in t) a += "#define " + n + "\n", r[n] = !0;
            var h = this._VS.toscript(r, []), o = this._PS.toscript(r, []);
            return (i || X.create)(a + h.join("\n"), a + o.join("\n"), e, this._nameMap, s);
        }
    }
    wi.IFDEF_NO = 0, wi.IFDEF_YES = 1, wi.IFDEF_ELSE = 2, wi.IFDEF_PARENT = 3, wi._removeAnnotation = new RegExp("(/\\*([^*]|[\\r\\\n]|(\\*+([^*/]|[\\r\\n])))*\\*+/)|(//.*)", "g"),
        wi._reg = new RegExp("(\".*\")|('.*')|([#\\w\\*-\\.+/()=<>{}\\\\]+)|([,;:\\\\])", "g"),
        wi._splitToWordExps = new RegExp("[(\".*\")]+|[('.*')]+|([ \\t=\\+\\-*/&%!<>!%(),;])", "g"),
        wi.includes = {}, wi._clearCR = new RegExp("\r", "g"), wi._splitToWordExps3 = new RegExp("[ \\t=\\+\\-*/&%!<>!%(),;\\|]", "g");
    class Ci extends x {
        constructor() {
            super(), this.worker = new Worker(Ci.workerPath);
            let t = this;
            this.worker.onmessage = function (e) {
                t.workerMessage(e.data);
            };
        }
        static __init__() {
            return null == Ci._preLoadFun && (!!Worker && (Ci._preLoadFun = Ze.prototype._loadImage,
                Ze.prototype._loadImage = Ci.prototype._loadImage, Ci.I || (Ci.I = new Ci()), !0));
        }
        static workerSupported() {
            return !!Worker;
        }
        static enableWorkerLoader() {
            Ci._tryEnabled || (Ci.enable = !0, Ci._tryEnabled = !0);
        }
        static set enable(t) {
            Ci._enable != t && (Ci._enable = t, t && null == Ci._preLoadFun && (Ci._enable = Ci.__init__()));
        }
        static get enable() {
            return Ci._enable;
        }
        workerMessage(t) {
            if (t) switch (t.type) {
                case "Image":
                    this.imageLoaded(t);
                    break;

                case "Disable":
                    Ci.enable = !1;
            }
        }
        imageLoaded(t) {
            if (t.dataType && "imageBitmap" == t.dataType) {
                var e = t.imageBitmap;
                console.log("load:", t.url), this.event(t.url, e);
            } else this.event(t.url, null);
        }
        loadImage(t) {
            this.worker.postMessage(t);
        }
        _loadImage(t) {
            var e = this;
            let i = e.type;
            if (this._useWorkerLoader && Ci._enable) {
                t = E.formatURL(t);
                var s = function (r) {
                    if (Ci.I.off(t, e, s), r) {
                        var a = r;
                        "nativeimage" !== i && (a = new B()).loadImageSource(r), e.onLoaded(a);
                    } else Ci._preLoadFun.call(e, t);
                };
                Ci.I.on(t, e, s), Ci.I.loadImage(t);
            } else Ci._preLoadFun.call(e, t);
        }
    }
    Ci.workerPath = "libs/workerloader.js", Ci._enable = !1, Ci._tryEnabled = !1;
    class Ai {
        static set cursor(t) {
            Ai._style.cursor = t;
        }
        static get cursor() {
            return Ai._style.cursor;
        }
        static __init__() {
            Ai._style = ee.document.body.style;
        }
        static hide() {
            "none" != Ai.cursor && (Ai._preCursor = Ai.cursor, Ai.cursor = "none");
        }
        static show() {
            "none" == Ai.cursor && (Ai._preCursor ? Ai.cursor = Ai._preCursor : Ai.cursor = "auto");
        }
    }
    class Ri extends wt {
        constructor(t) {
            super(Ri.const_stride, 4 * t * Ri.const_stride, 4), this.canReuse = !0, this.setAttributes(Ri._fixattriInfo),
                this.createQuadIB(t), this._quadNum = t;
        }
        static __init__() {
            var t = m.instance;
            Ri._fixattriInfo = [t.FLOAT, 4, 0, t.FLOAT, 3, 16, t.FLOAT, 3, 28, t.FLOAT, 4, 40, t.FLOAT, 4, 56, t.FLOAT, 3, 72, t.FLOAT, 2, 84, t.FLOAT, 4, 92, t.FLOAT, 1, 108, t.FLOAT, 1, 112];
        }
        setMaxParticleNum(t) {
            this._vb._resizeBuffer(4 * t * Ri.const_stride, !1), this.createQuadIB(t);
        }
        static getAMesh(t) {
            if (Ri._POOL.length) {
                var e = Ri._POOL.pop();
                return e.setMaxParticleNum(t), e;
            }
            return new Ri(t);
        }
        releaseMesh() {
            this._vb.setByteLength(0), this.vertNum = 0, this.indexNum = 0, Ri._POOL.push(this);
        }
        destroy() {
            this._ib.destroy(), this._vb.destroy(), this._vb.deleteBuffer();
        }
    }
    Ri.const_stride = 116, Ri._POOL = [];
    class Mi extends w { }
    Mi.create = function (e, i, s) {
        var r = new B(e, i, s, !1, !1);
        return r.wrapModeU = t.WarpMode.Clamp, r.wrapModeV = t.WarpMode.Clamp, r;
    };
    class Si {
        static __init(t) {
            t.forEach(function (t) {
                t.__init$ && t.__init$();
            });
        }
        static init(e, s, ...r) {
            if (!Si._isinit) {
                Si._isinit = !0, ArrayBuffer.prototype.slice || (ArrayBuffer.prototype.slice = Si._arrayBufferSlice),
                    ee.__init__();
                var a = ee.mainCanvas = new we(!0), n = a.source.style;
                if (n.position = "absolute", n.top = n.left = "0px", n.background = "#000000", ee.onKGMiniGame || ee.onAlipayMiniGame || ee.container.appendChild(a.source),
                    ee.canvas = new we(!0), ee.context = ee.canvas.getContext("2d"), ee.supportWebAudio = Ke.__init__(),
                    ee.supportLocalStorage = ei.__init__(), Si.systemTimer = new mi(!1), t.systemTimer = mi.gSysTimer = Si.systemTimer,
                    Si.startTimer = new mi(!1), Si.physicsTimer = new mi(!1), Si.updateTimer = new mi(!1),
                    Si.lateTimer = new mi(!1), Si.timer = new mi(!1), t.startTimer = i.startTimer = Si.startTimer,
                    t.lateTimer = i.lateTimer = Si.lateTimer, t.updateTimer = i.updateTimer = Si.updateTimer,
                    i.systemTimer = Si.systemTimer, t.timer = i.timer = Si.timer, t.physicsTimer = i.physicsTimer = Si.physicsTimer,
                    Si.loader = new Je(), i.Laya = Si, t.loader = i.loader = Si.loader, ui.__init__(),
                    ci.__init(), Ai.__init__(), he.inner_enable(), r) for (var h = 0, o = r.length; h < o; h++) r[h] && r[h].enable && r[h].enable();
                return i.Render.isConchApp && Si.enableNative(), Si.enableWebGLPlus(), ve.beginCheck(),
                    t.stage = Si.stage = new ke(), i.stage = Si.stage, Q.gStage = Si.stage, E.rootPath = E._basePath = Si._getUrlPath(),
                    Ct.__int__(), Rt.__init__(), At.__init__(), Si.render = new le(0, 0, ee.mainCanvas),
                    t.render = Si.render, Si.stage.size(e, s), window.stage = Si.stage, v.__init__(),
                    Ri.__init__(), wi.__init__(), be.__init__(), We.__init__(), Oe.instance.__init__(Si.stage, le.canvas),
                    Be.__init__(), Ke.autoStopMusic = !0, V._StatRender = new gi(), z._initone(W.TEXTURE2D, yi),
                    z._initone(W.TEXTURE2D | W.FILTERGLOW, yi), z._initone(W.PRIMITIVE, xi), z._initone(W.SKINMESH, Ti),
                    le.canvas;
            }
        }
        static _getUrlPath() {
            return E.getPath(location.protocol + "//" + location.host + location.pathname);
        }
        static _arrayBufferSlice(t, e) {
            var i = new Uint8Array(this, t, e - t), s = new Uint8Array(i.length);
            return s.set(i), s.buffer;
        }
        static alertGlobalError(t) {
            var e = 0;
            ee.window.onerror = t ? function (t, i, s, r, a) {
                e++ < 5 && a && this.alert("出错啦，请把此信息截图给研发商\n" + t + "\n" + a.stack);
            } : null;
        }
        static _runScript(t) {
            return ee.window[Si._evcode](t);
        }
        static enableDebugPanel(t = "libs/laya.debugtool.js") {
            if (window.Laya.DebugPanel) window.Laya.DebugPanel.enable(); else {
                var e = ee.createElement("script");
                e.onload = function () {
                    window.Laya.DebugPanel.enable();
                }, e.src = t, ee.document.body.appendChild(e);
            }
        }
        static enableWebGLPlus() {
            v.__init_native();
        }
        static enableNative() {
            Si.isNativeRender_enable || (Si.isNativeRender_enable = !0, le.supportWebGLPlusRendering && (X.prototype.uploadTexture2D = function (t) {
                var e = m.instance;
                e.bindTexture(e.TEXTURE_2D, t);
            }), O.width = ee.window.innerWidth, O.height = ee.window.innerHeight, ee.measureText = function (t, e) {
                return window.conchTextCanvas.font = e, window.conchTextCanvas.measureText(t);
            }, ke.clear = function (t) {
                ae.set2DRenderConfig();
                var e = Z.create(t).arrColor, i = m.instance;
                e && i.clearColor(e[0], e[1], e[2], e[3]), i.clear(i.COLOR_BUFFER_BIT | i.DEPTH_BUFFER_BIT | i.STENCIL_BUFFER_BIT),
                    O.clear();
            }, Pe.drawToCanvas = Pe.drawToTexture = function (t, e, i, s, r, a) {
                r -= t.x, a -= t.y, r |= 0, a |= 0, i |= 0, s |= 0;
                var n = new we(!1), h = n.getContext("2d");
                return n.size(i, s), h.asBitmap = !0, h._targets.start(), be.renders[e]._fun(t, h, r, a),
                    h.flush(), h._targets.end(), h._targets.restore(), n;
            }, Object.defineProperty(N.prototype, "uv", {
                get: function () {
                    return this._uv;
                },
                set: function (t) {
                    this._uv = t;
                }
            }), we.prototype.getTexture = function () {
                return this._texture || (this._texture = this.context._targets, this._texture.uv = N.flipyuv,
                    this._texture.bitmap = this._texture), this._texture;
            });
        }
    }
    Si.stage = null, Si.systemTimer = null, Si.startTimer = null, Si.physicsTimer = null,
        Si.updateTimer = null, Si.lateTimer = null, Si.timer = null, Si.loader = null, Si.version = "2.9.0",
        Si._isinit = !1, Si.isWXOpenDataContext = !1, Si.isWXPosMsg = !1, Si.__classmap = null,
        Si.Config = e, Si.TextRender = re, Si.EventDispatcher = x, Si.SoundChannel = Ve,
        Si.Stage = ke, Si.Render = le, Si.Browser = ee, Si.Sprite = Pe, Si.Node = Ie, Si.Context = ae,
        Si.WebGL = he, Si.Handler = T, Si.RunDriver = Ge, Si.Utils = Q, Si.Input = Be, Si.Loader = Ze,
        Si.LocalStorage = ei, Si.SoundManager = Ke, Si.URL = E, Si.Event = qt, Si.Matrix = p,
        Si.HTMLImage = Mi, Si.Laya = Si, Si._evcode = "eval", Si.isNativeRender_enable = !1,
        Si.__classmap = i.__classMap, i.Timer = mi, i.Dragging = ni, i.GraphicsBounds = de,
        i.Sprite = Pe, i.TextRender = re, i.Loader = Ze, i.TTFLoader = si, i.WebAudioSound = ze,
        i.SoundManager = Ke, i.ShaderCompile = wi, i.ClassUtils = Ae, i.SceneUtils = ci,
        i.Context = ae, i.Render = le, i.MouseManager = Oe, i.Text = De, i.Browser = ee,
        i.WebGL = he, i.AudioSound = Xe, i.Pool = s, i.Utils = Q, i.Graphics = xe, i.Submit = Wt,
        i.Stage = ke, i.Resource = b, i.WorkerLoader = Ci;
    var Ii = window._layalibs;
    if (Ii) {
        Ii.sort(function (t, e) {
            return t.i - e.i;
        });
        for (var Pi = 0; Pi < Ii.length; Pi++) Ii[Pi].f(window, window.document, Si);
    }
    let Li = window;
    Li.Laya ? (Li.Laya.Laya = Si, Object.assign(Li.Laya, Si)) : Li.Laya = Si;
    var Di, Bi = Si.__init, Fi = Si.init, Oi = Si.version, Ni = Si.alertGlobalError, Ui = Si.enableDebugPanel;
    function _static(t, e) {
        for (var i = 0, s = e.length; i < s; i += 2) if ("length" == e[i]) t.length = e[i + 1].call(t); else {
            function tmp() {
                var s = e[i], r = e[i + 1];
                Object.defineProperty(t, s, {
                    get: function () {
                        return delete this[s], this[s] = r.call(this);
                    },
                    set: function (t) {
                        delete this[s], this[s] = t;
                    },
                    enumerable: !0,
                    configurable: !0
                });
            }
            tmp();
        }
    }
    class Gi extends hi {
        get isSingleton() {
            return !1;
        }
        _onAwake() {
            this.onAwake(), this.onStart !== Gi.prototype.onStart && i.startTimer.callLater(this, this.onStart);
        }
        _onEnable() {
            var t = Gi.prototype;
            this.onTriggerEnter !== t.onTriggerEnter && this.owner.on(qt.TRIGGER_ENTER, this, this.onTriggerEnter),
                this.onTriggerStay !== t.onTriggerStay && this.owner.on(qt.TRIGGER_STAY, this, this.onTriggerStay),
                this.onTriggerExit !== t.onTriggerExit && this.owner.on(qt.TRIGGER_EXIT, this, this.onTriggerExit),
                this.onMouseDown !== t.onMouseDown && this.owner.on(qt.MOUSE_DOWN, this, this.onMouseDown),
                this.onMouseUp !== t.onMouseUp && this.owner.on(qt.MOUSE_UP, this, this.onMouseUp),
                this.onClick !== t.onClick && this.owner.on(qt.CLICK, this, this.onClick), this.onStageMouseDown !== t.onStageMouseDown && i.stage.on(qt.MOUSE_DOWN, this, this.onStageMouseDown),
                this.onStageMouseUp !== t.onStageMouseUp && i.stage.on(qt.MOUSE_UP, this, this.onStageMouseUp),
                this.onStageClick !== t.onStageClick && i.stage.on(qt.CLICK, this, this.onStageClick),
                this.onStageMouseMove !== t.onStageMouseMove && i.stage.on(qt.MOUSE_MOVE, this, this.onStageMouseMove),
                this.onDoubleClick !== t.onDoubleClick && this.owner.on(qt.DOUBLE_CLICK, this, this.onDoubleClick),
                this.onRightClick !== t.onRightClick && this.owner.on(qt.RIGHT_CLICK, this, this.onRightClick),
                this.onMouseMove !== t.onMouseMove && this.owner.on(qt.MOUSE_MOVE, this, this.onMouseMove),
                this.onMouseOver !== t.onMouseOver && this.owner.on(qt.MOUSE_OVER, this, this.onMouseOver),
                this.onMouseOut !== t.onMouseOut && this.owner.on(qt.MOUSE_OUT, this, this.onMouseOut),
                this.onKeyDown !== t.onKeyDown && i.stage.on(qt.KEY_DOWN, this, this.onKeyDown),
                this.onKeyPress !== t.onKeyPress && i.stage.on(qt.KEY_PRESS, this, this.onKeyPress),
                this.onKeyUp !== t.onKeyUp && i.stage.on(qt.KEY_UP, this, this.onKeyUp), this.onUpdate !== t.onUpdate && i.updateTimer.frameLoop(1, this, this.onUpdate),
                this.onLateUpdate !== t.onLateUpdate && i.lateTimer.frameLoop(1, this, this.onLateUpdate),
                this.onPreRender !== t.onPreRender && i.lateTimer.frameLoop(1, this, this.onPreRender),
                this.onEnable();
        }
        _onDisable() {
            this.owner.offAllCaller(this), i.stage.offAllCaller(this), i.startTimer.clearAll(this),
                i.updateTimer.clearAll(this), i.lateTimer.clearAll(this);
        }
        _isScript() {
            return !0;
        }
        _onDestroy() {
            this.onDestroy();
        }
        onAwake() { }
        onEnable() { }
        onStart() { }
        onTriggerEnter(t, e, i) { }
        onTriggerStay(t, e, i) { }
        onTriggerExit(t, e, i) { }
        onMouseDown(t) { }
        onMouseUp(t) { }
        onClick(t) { }
        onStageMouseDown(t) { }
        onStageMouseUp(t) { }
        onStageClick(t) { }
        onStageMouseMove(t) { }
        onDoubleClick(t) { }
        onRightClick(t) { }
        onMouseMove(t) { }
        onMouseOver(t) { }
        onMouseOut(t) { }
        onKeyDown(t) { }
        onKeyPress(t) { }
        onKeyUp(t) { }
        onUpdate() { }
        onLateUpdate() { }
        onPreRender() { }
        onPostRender() { }
        onDisable() { }
        onDestroy() { }
    }
    class ki extends _i {
        constructor() {
            super(...arguments), this._nodeIDAniDic = {};
        }
        _parseNodeList(t) {
            this._nodeList || (this._nodeList = []), this._nodeDefaultProps[t.compId] = t.props,
                t.compId && this._nodeList.push(t.compId);
            var e = t.child;
            if (e) {
                var i, s = e.length;
                for (i = 0; i < s; i++) this._parseNodeList(e[i]);
            }
        }
        _calGraphicData(t) {
            var e;
            if (this._setUp(null, t), this._createGraphicData(), this._nodeIDAniDic) for (e in this._nodeIDAniDic) this._nodeIDAniDic[e] = null;
        }
        _createGraphicData() {
            var t, e, i = [], s = this.count, r = this._usedFrames;
            for (r || (r = []), t = 0; t < s; t++) !r[t] && e || (e = this._createFrameGraphic(t)),
                i.push(e);
            this._gList = i;
        }
        _createFrameGraphic(t) {
            var e = new xe();
            return ki._rootMatrix || (ki._rootMatrix = new p()), this._updateNodeGraphic(this._rootNode, t, ki._rootMatrix, e),
                e;
        }
        _updateNodeGraphic(t, e, i, s, r = 1) {
            var a, n, h;
            (a = this._nodeGDic[t.compId] = this._getNodeGraphicData(t.compId, e, this._nodeGDic[t.compId])).resultTransform || (a.resultTransform = new p()),
                n = a.resultTransform, p.mul(a.transform, i, n);
            var o = a.alpha * r;
            if (!(o < .01)) {
                a.skin && (h = this._getTextureByUrl(a.skin)) && (n._checkTransform() ? (s.drawTexture(h, 0, 0, a.width, a.height, n, o),
                    a.resultTransform = null) : s.drawTexture(h, n.tx, n.ty, a.width, a.height, null, o));
                var l, _, u = t.child;
                if (u) for (_ = u.length, l = 0; l < _; l++) this._updateNodeGraphic(u[l], e, n, s, o);
            }
        }
        _updateNoChilds(t, e) {
            if (t.skin) {
                var i = this._getTextureByUrl(t.skin);
                if (i) {
                    var s = t.transform;
                    s._checkTransform(), !s._bTransform ? e.drawTexture(i, s.tx, s.ty, t.width, t.height, null, t.alpha) : e.drawTexture(i, 0, 0, t.width, t.height, s.clone(), t.alpha);
                }
            }
        }
        _updateNodeGraphic2(t, e, i) {
            var s;
            if (s = this._nodeGDic[t.compId] = this._getNodeGraphicData(t.compId, e, this._nodeGDic[t.compId]),
                t.child) {
                var r, a, n, h = s.transform;
                h._checkTransform(), a = (r = !h._bTransform) && (0 != h.tx || 0 != h.ty), (n = h._bTransform || 1 != s.alpha) && i.save(),
                    1 != s.alpha && i.alpha(s.alpha), r ? a && i.translate(h.tx, h.ty) : i.transform(h.clone());
                var o, l, _, u = t.child;
                if (s.skin && (o = this._getTextureByUrl(s.skin)) && i.drawImage(o, 0, 0, s.width, s.height),
                    u) for (_ = u.length, l = 0; l < _; l++) this._updateNodeGraphic2(u[l], e, i);
                n ? i.restore() : r ? a && i.translate(-h.tx, -h.ty) : i.transform(h.clone().invert());
            } else this._updateNoChilds(s, i);
        }
        _calculateKeyFrames(t) {
            super._calculateKeyFrames(t), this._nodeIDAniDic[t.target] = t;
        }
        getNodeDataByID(t) {
            return this._nodeIDAniDic[t];
        }
        _getParams(t, e, i, s) {
            var r = ki._temParam;
            r.length = e.length;
            var a, n = e.length;
            for (a = 0; a < n; a++) r[a] = this._getObjVar(t, e[a][0], i, e[a][1], s);
            return r;
        }
        _getObjVar(t, e, i, s, r) {
            if (e in t) {
                var a = t[e];
                return i >= a.length && (i = a.length - 1), t[e][i];
            }
            return e in r ? r[e] : s;
        }
        _getNodeGraphicData(t, e, i) {
            i || (i = new Wi()), i.transform ? i.transform.identity() : i.transform = new p();
            var s = this.getNodeDataByID(t);
            if (!s) return i;
            var r, a, n, h = s.frames, o = this._getParams(h, ki._drawTextureCmd, e, this._nodeDefaultProps[t]), l = o[0], _ = o[5], u = o[6], c = o[13], d = o[14], f = o[7], g = o[8], m = o[9], v = o[11], T = o[12];
            r = o[3], a = o[4], 0 != r && 0 != a || (l = null), -1 == r && (r = 0), -1 == a && (a = 0),
                i.skin = l, i.width = r, i.height = a, l && ((n = this._getTextureByUrl(l)) ? (r || (r = n.sourceWidth),
                    a || (a = n.sourceHeight)) : console.warn("lost skin:", l, ",you may load pics first")),
                i.alpha = o[10];
            var x = i.transform;
            0 != c && (_ = c * r), 0 != d && (u = d * a), 0 == _ && 0 == u || x.translate(-_, -u);
            var y = null;
            if (m || 1 !== f || 1 !== g || v || T) {
                (y = ki._tempMt).identity(), y._bTransform = !0;
                var E = .0174532922222222 * (m - v), b = .0174532922222222 * (m + T), w = Math.cos(b), C = Math.sin(b), A = Math.sin(E), R = Math.cos(E);
                y.a = f * w, y.b = f * C, y.c = -g * A, y.d = g * R, y.tx = y.ty = 0;
            }
            return y && (x = p.mul(x, y, x)), x.translate(o[1], o[2]), i;
        }
        _getTextureByUrl(t) {
            return Ze.getRes(t);
        }
        setAniData(t, e = null) {
            if (t.animations) {
                this._nodeDefaultProps = {}, this._nodeGDic = {}, this._nodeList && (this._nodeList.length = 0),
                    this._rootNode = t, this._parseNodeList(t);
                var i, s, r = {}, a = [], n = t.animations, h = n.length;
                for (i = 0; i < h; i++) if (s = n[i], this._labels = null, (!e || e == s.name) && s) {
                    try {
                        this._calGraphicData(s);
                    } catch (t) {
                        console.warn("parse animation fail:" + s.name + ",empty animation created"), this._gList = [];
                    }
                    var o = {};
                    o.interval = 1e3 / s.frameRate, o.frames = this._gList, o.labels = this._labels,
                        o.name = s.name, a.push(o), r[s.name] = o;
                }
                this.animationList = a, this.animationDic = r;
            }
            ki._temParam.length = 0;
        }
        parseByData(t) {
            var e, i;
            e = t.nodeRoot, i = t.aniO, delete t.nodeRoot, delete t.aniO, this._nodeDefaultProps = {},
                this._nodeGDic = {}, this._nodeList && (this._nodeList.length = 0), this._rootNode = e,
                this._parseNodeList(e), this._labels = null;
            try {
                this._calGraphicData(i);
            } catch (t) {
                console.warn("parse animation fail:" + i.name + ",empty animation created"), this._gList = [];
            }
            var s = t;
            return s.interval = 1e3 / i.frameRate, s.frames = this._gList, s.labels = this._labels,
                s.name = i.name, s;
        }
        setUpAniData(t) {
            if (t.animations) {
                var e, i, s = {}, r = [], a = t.animations, n = a.length;
                for (e = 0; e < n; e++) if (i = a[e]) {
                    var h = {};
                    h.name = i.name, h.aniO = i, h.nodeRoot = t, r.push(h), s[i.name] = h;
                }
                this.animationList = r, this.animationDic = s;
            }
        }
        _clear() {
            this.animationList = null, this.animationDic = null, this._gList = null, this._nodeGDic = null;
        }
        static parseAnimationByData(t) {
            var e;
            return ki._I || (ki._I = new ki()), e = ki._I.parseByData(t), ki._I._clear(), e;
        }
        static parseAnimationData(t) {
            var e;
            return ki._I || (ki._I = new ki()), ki._I.setUpAniData(t), (e = {}).animationList = ki._I.animationList,
                e.animationDic = ki._I.animationDic, ki._I._clear(), e;
        }
    }
    ki._drawTextureCmd = [["skin", null], ["x", 0], ["y", 0], ["width", -1], ["height", -1], ["pivotX", 0], ["pivotY", 0], ["scaleX", 1], ["scaleY", 1], ["rotation", 0], ["alpha", 1], ["skewX", 0], ["skewY", 0], ["anchorX", 0], ["anchorY", 0]],
        ki._temParam = [], ki._tempMt = new p();
    class Wi {
        constructor() {
            this.alpha = 1;
        }
    }
    class Vi extends oi {
        constructor() {
            super(), this._setControlNode(this);
        }
        destroy(t = !0) {
            this.stop(), super.destroy(t), this._frames = null, this._labels = null;
        }
        play(t = 0, e = !0, i = "") {
            i && this._setFramesFromCache(i, !0), super.play(t, e, i);
        }
        _setFramesFromCache(t, e = !1) {
            if (this._url && (t = this._url + "#" + t), t && Vi.framesMap[t]) {
                var i = Vi.framesMap[t];
                return i instanceof Array ? (this._frames = Vi.framesMap[t], this._count = this._frames.length) : (i.nodeRoot && (Vi.framesMap[t] = ki.parseAnimationByData(i),
                    i = Vi.framesMap[t]), this._frames = i.frames, this._count = this._frames.length,
                    this._frameRateChanged || (this._interval = i.interval), this._labels = this._copyLabels(i.labels)),
                    !0;
            }
            return e && console.log("ani not found:", t), !1;
        }
        _copyLabels(t) {
            if (!t) return null;
            var e, i;
            for (i in e = {}, t) e[i] = Q.copyArray([], t[i]);
            return e;
        }
        _frameLoop() {
            this._visible && this._style.alpha > .01 && this._frames && super._frameLoop();
        }
        _displayToIndex(t) {
            this._frames && (this.graphics = this._frames[t]);
        }
        get frames() {
            return this._frames;
        }
        set frames(t) {
            this._frames = t, t && (this._count = t.length, this._actionName && this._setFramesFromCache(this._actionName, !0),
                this.index = this._index);
        }
        set source(t) {
            t.indexOf(".ani") > -1 ? this.loadAnimation(t) : t.indexOf(".json") > -1 || t.indexOf("als") > -1 || t.indexOf("atlas") > -1 ? this.loadAtlas(t) : this.loadImages(t.split(","));
        }
        set autoAnimation(t) {
            this.play(0, !0, t);
        }
        set autoPlay(t) {
            t ? this.play() : this.stop();
        }
        clear() {
            return super.clear(), this.stop(), this.graphics = null, this._frames = null, this._labels = null,
                this;
        }
        loadImages(t, e = "") {
            return this._url = "", this._setFramesFromCache(e) || (this.frames = Vi.framesMap[e] ? Vi.framesMap[e] : Vi.createFrames(t, e)),
                this;
        }
        loadAtlas(t, e = null, s = "") {
            this._url = "";
            var r = this;
            if (!r._setFramesFromCache(s)) {
                function onLoaded(i) {
                    t === i && (r.frames = Vi.framesMap[s] ? Vi.framesMap[s] : Vi.createFrames(t, s),
                        e && e.run());
                }
                Ze.getAtlas(t) ? onLoaded(t) : i.loader.load(t, T.create(null, onLoaded, [t]), null, Ze.ATLAS);
            }
            return this;
        }
        loadAnimation(t, e = null, s = null) {
            this._url = t;
            return this._actionName || (this._actionName = ""), this._setFramesFromCache(this._actionName) ? (this._setFramesFromCache(this._actionName, !0),
                this.index = 0, e && e.run()) : !s || Ze.getAtlas(s) ? this._loadAnimationData(t, e, s) : i.loader.load(s, T.create(this, this._loadAnimationData, [t, e, s]), null, Ze.ATLAS),
                this;
        }
        _loadAnimationData(t, e = null, s = null) {
            if (!s || Ze.getAtlas(s)) {
                var r = this;
                Ze.getRes(t) ? onLoaded(t) : i.loader.load(t, T.create(null, onLoaded, [t]), null, Ze.JSON);
            } else console.warn("atlas load fail:" + s);
            function onLoaded(i) {
                if (Ze.getRes(i)) {
                    if (t === i) {
                        var s;
                        if (Vi.framesMap[t + "#"]) r._setFramesFromCache(r._actionName, !0), r.index = 0,
                            r._resumePlay(); else {
                            var a = ki.parseAnimationData(Ze.getRes(t));
                            if (!a) return;
                            var n, h, o = a.animationList, l = o.length;
                            for (n = 0; n < l; n++) s = o[n], Vi.framesMap[t + "#" + s.name] = s, h || (h = s);
                            h && (Vi.framesMap[t + "#"] = h, r._setFramesFromCache(r._actionName, !0), r.index = 0),
                                r._resumePlay();
                        }
                        e && e.run();
                    }
                    Ze.clearRes(t);
                } else Vi.framesMap[t + "#"] && (r._setFramesFromCache(r._actionName, !0), r.index = 0,
                    r._resumePlay(), e && e.run());
            }
        }
        static createFrames(t, e) {
            var i;
            if ("string" == typeof t) {
                var s = Ze.getAtlas(t);
                if (s && s.length) {
                    i = [];
                    for (var r = 0, a = s.length; r < a; r++) {
                        var n = new xe();
                        n.drawImage(Ze.getRes(s[r]), 0, 0), i.push(n);
                    }
                }
            } else if (t instanceof Array) for (i = [], r = 0, a = t.length; r < a; r++) (n = new xe()).loadImage(t[r], 0, 0),
                i.push(n);
            return e && (Vi.framesMap[e] = i), i;
        }
        static clearCache(t) {
            var e, i = Vi.framesMap, s = t + "#";
            for (e in i) e !== t && 0 !== e.indexOf(s) || delete Vi.framesMap[e];
        }
    }
    Vi.framesMap = {}, i.regClass(Vi), Ae.regClass("laya.display.Animation", Vi), Ae.regClass("Laya.Animation", Vi);
    class Yi extends _i {
        constructor() {
            super(...arguments), this._initData = {};
        }
        set target(t) {
            this._target && this._target.off(Yi.EFFECT_BEGIN, this, this._onOtherBegin), this._target = t,
                this._target && this._target.on(Yi.EFFECT_BEGIN, this, this._onOtherBegin), this._addEvent();
        }
        get target() {
            return this._target;
        }
        _onOtherBegin(t) {
            t !== this && this.stop();
        }
        set playEvent(t) {
            this._playEvent = t, t && this._addEvent();
        }
        _addEvent() {
            this._target && this._playEvent && (this._setControlNode(this._target), this._target.on(this._playEvent, this, this._onPlayAction));
        }
        _onPlayAction() {
            this.play(0, !1);
        }
        play(t = 0, e = !0, i = "") {
            this._target && (this._target.event(Yi.EFFECT_BEGIN, [this]), this._recordInitData(),
                super.play(t, e, i));
        }
        _recordInitData() {
            var t, e, i;
            if (this._aniKeys) for (e = this._aniKeys.length, t = 0; t < e; t++) i = this._aniKeys[t],
                this._initData[i] = this._target[i];
        }
        set effectClass(t) {
            if (this._effectClass = Ae.getClass(t), this._effectClass) {
                var e = this._effectClass.uiView;
                if (e) {
                    var i = e.animations;
                    if (i && i[0]) {
                        var s = i[0];
                        this._setUp({}, s), s.nodes && s.nodes[0] && (this._aniKeys = s.nodes[0].keys);
                    }
                }
            }
        }
        set effectData(t) {
            if (t) {
                var e = t.animations;
                if (e && e[0]) {
                    var i = e[0];
                    this._setUp({}, i), i.nodes && i.nodes[0] && (this._aniKeys = i.nodes[0].keys);
                }
            }
        }
        _displayToIndex(t) {
            if (this._animationData) {
                t < 0 && (t = 0), t > this._count && (t = this._count);
                var e, i = this._animationData.nodes, s = i.length;
                for (s = s > 1 ? 1 : s, e = 0; e < s; e++) this._displayNodeToFrame(i[e], t);
            }
        }
        _displayNodeToFrame(t, e, i = null) {
            if (this._target) {
                var s, r, a, n, h, o, l, _, u, c = this._target, d = t.frames, p = t.keys, f = p.length, g = t.secondFrames;
                for (n = 0; n < f; n++) r = d[s = p[n]], -1 == (h = g[s]) ? a = this._initData[s] : e < h ? (_ = (l = t.keyframes[s])[0]).tween ? (null == (o = ri[_.tweenMethod]) && (o = ri.linearNone),
                    u = l[1], a = o(e, this._initData[s], u.value - this._initData[s], u.index)) : a = this._initData[s] : a = r.length > e ? r[e] : r[r.length - 1],
                    c[s] = a;
            }
        }
        _calculateKeyFrames(t) {
            super._calculateKeyFrames(t);
            var e, i, s = t.keyframes, r = (t.target, {});
            for (e in t.secondFrames = r, s) (i = s[e]).length <= 1 ? r[e] = -1 : r[e] = i[1].index;
        }
    }
    Yi.EFFECT_BEGIN = "effectbegin", Ae.regClass("laya.display.EffectAnimation", Yi),
        Ae.regClass("Laya.EffectAnimation", Yi);
    class Xi extends x {
        constructor() {
            super(), this._completeHandler = new T(this, this.onOneLoadComplete), this.reset();
        }
        reset() {
            this._toLoadList = [], this._isLoading = !1, this.totalCount = 0;
        }
        get leftCount() {
            return this._isLoading ? this._toLoadList.length + 1 : this._toLoadList.length;
        }
        get loadedCount() {
            return this.totalCount - this.leftCount;
        }
        load(t, e = !1, i = !0) {
            var s, r;
            if (t instanceof Array) for (r = t.length, s = 0; s < r; s++) this._addToLoadList(t[s], e); else this._addToLoadList(t, e);
            i && this._checkNext();
        }
        _addToLoadList(t, e = !1) {
            this._toLoadList.indexOf(t) >= 0 || Ze.getRes(t) || (e ? this._toLoadList.push({
                url: t
            }) : this._toLoadList.push(t), this.totalCount++);
        }
        _checkNext() {
            if (!this._isLoading) {
                if (0 == this._toLoadList.length) return void this.event(qt.COMPLETE);
                var t;
                "string" == typeof (t = this._toLoadList.pop()) ? this.loadOne(t) : this.loadOne(t.url, !0);
            }
        }
        loadOne(t, e = !1) {
            this._curUrl = t;
            var s = Q.getFileExtension(this._curUrl);
            e ? i.loader.create(t, this._completeHandler) : Xi.LoadableExtensions[s] ? i.loader.load(t, this._completeHandler, null, Xi.LoadableExtensions[s]) : t != $e.getFileLoadPath(t) || Xi.No3dLoadTypes[s] || !Je.createMap[s] ? i.loader.load(t, this._completeHandler) : i.loader.create(t, this._completeHandler);
        }
        onOneLoadComplete() {
            this._isLoading = !1, Ze.getRes(this._curUrl) || console.log("Fail to load:", this._curUrl);
            var t, e = Q.getFileExtension(this._curUrl);
            Xi.LoadableExtensions[e] && ((t = Ze.getRes(this._curUrl)) && t instanceof je && (t = t.json),
                t && (t.loadList && this.load(t.loadList, !1, !1), t.loadList3D && this.load(t.loadList3D, !0, !1)));
            "sk" == e && this.load(this._curUrl.replace(".sk", ".png"), !1, !1), this.event(qt.PROGRESS, this.getProgress()),
                this._checkNext();
        }
        getProgress() {
            return this.loadedCount / this.totalCount;
        }
    }
    Xi.LoadableExtensions = {
        scene: Ze.JSON,
        scene3d: Ze.JSON,
        ani: Ze.JSON,
        ui: Ze.JSON,
        prefab: Ze.PREFAB
    }, Xi.No3dLoadTypes = {
        png: !0,
        jpg: !0,
        txt: !0
    };
    class Hi extends Pe {
        constructor(t = !0) {
            super(), this.autoDestroyAtClosed = !1, this.url = null, this._viewCreated = !1,
                this._$componentType = "Scene", Hi.unDestroyedScenes.push(this), this._scene = this,
                t && this.createChildren();
        }
        createChildren() { }
        static setUIMap(t) {
            let e = i.loader.getRes(t);
            if (!e) throw "请提前加载uimap的json，再使用该接口设置！";
            for (let t in e) i.Loader.loadedMap[E.formatURL(t + ".scene")] = e[t];
        }
        loadScene(t) {
            var e = t.indexOf(".") > -1 ? t : t + ".scene", s = i.loader.getRes(e);
            if (s) this.createView(s); else {
                this._setBit(ye.NOT_READY, !0), i.loader.resetProgress();
                var r = new Xi();
                r.on(qt.COMPLETE, this, this._onSceneLoaded, [e]), r.load(e);
            }
        }
        _onSceneLoaded(t) {
            this.createView(i.Loader.getRes(t));
        }
        createView(t) {
            t && !this._viewCreated && (this._viewCreated = !0, ci.createByData(this, t));
        }
        getNodeByID(t) {
            return this._idMap ? this._idMap[t] : null;
        }
        open(t = !0, e = null) {
            t && Hi.closeAll(), Hi.root.addChild(this), this.onOpened(e);
        }
        onOpened(t) { }
        close(t = null) {
            this.onClosed(t), this.autoDestroyAtClosed ? this.destroy() : this.removeSelf();
        }
        onClosed(t = null) { }
        destroy(t = !0) {
            this._idMap = null, super.destroy(t);
            for (var e = Hi.unDestroyedScenes, i = e.length - 1; i > -1; i--) if (e[i] === this) return void e.splice(i, 1);
        }
        set scaleX(t) {
            super.get_scaleX() != t && (super.set_scaleX(t), this.event(qt.RESIZE));
        }
        get scaleX() {
            return super.scaleX;
        }
        set scaleY(t) {
            super.get_scaleY() != t && (super.set_scaleY(t), this.event(qt.RESIZE));
        }
        get scaleY() {
            return super.scaleY;
        }
        get width() {
            if (this._width) return this._width;
            for (var t = 0, e = this.numChildren - 1; e > -1; e--) {
                var i = this.getChildAt(e);
                i._visible && (t = Math.max(i._x + i.width * i.scaleX, t));
            }
            return t;
        }
        set width(t) {
            super.get_width() != t && (super.set_width(t), this.callLater(this._sizeChanged));
        }
        get height() {
            if (this._height) return this._height;
            for (var t = 0, e = this.numChildren - 1; e > -1; e--) {
                var i = this.getChildAt(e);
                i._visible && (t = Math.max(i._y + i.height * i.scaleY, t));
            }
            return t;
        }
        set height(t) {
            super.get_height() != t && (super.set_height(t), this.callLater(this._sizeChanged));
        }
        _sizeChanged() {
            this.event(qt.RESIZE);
        }
        static get root() {
            return Hi._root || (Hi._root = i.stage.addChild(new Pe()), Hi._root.name = "root",
                i.stage.on("resize", null, () => {
                    Hi._root.size(i.stage.width, i.stage.height), Hi._root.event(qt.RESIZE);
                }), Hi._root.size(i.stage.width, i.stage.height), Hi._root.event(qt.RESIZE)), Hi._root;
        }
        get timer() {
            return this._timer || i.timer;
        }
        set timer(t) {
            this._timer = t;
        }
        static load(t, e = null, s = null) {
            i.loader.resetProgress();
            var r = new Xi();
            function onProgress(t) {
                Hi._loadPage && Hi._loadPage.event("progress", t), s && s.runWith(t);
            }
            r.on(qt.PROGRESS, null, onProgress), r.once(qt.COMPLETE, null, function () {
                r.off(qt.PROGRESS, null, onProgress);
                var s = i.Loader.getRes(t);
                if (!s) throw "Can not find scene:" + t;
                if (!s.props) throw "Scene data is error:" + t;
                var a = s.props.runtime ? s.props.runtime : s.type, n = i.ClassUtils.getClass(a);
                if ("instance" == s.props.renderType) var h = n.instance || (n.instance = new n()); else h = new n();
                if (!(h && h instanceof Ie)) throw "Can not find scene:" + a;
                h.url = t, h._viewCreated ? e && e.runWith(h) : (h.on("onViewCreated", null, function () {
                    e && e.runWith(h);
                }), h.createView(s)), Hi.hideLoadingPage();
            }), r.load(t);
        }
        static open(t, e = !0, i = null, s = null, r = null) {
            if (i instanceof T) {
                var a = s;
                s = i, i = a;
            }
            Hi.showLoadingPage(), Hi.load(t, T.create(null, this._onSceneLoaded, [e, s, i]), r);
        }
        static _onSceneLoaded(t, e, i, s) {
            s.open(t, i), e && e.runWith(s);
        }
        static close(t, e = "") {
            for (var i = !1, s = Hi.unDestroyedScenes, r = 0, a = s.length; r < a; r++) {
                var n = s[r];
                n && n.parent && n.url === t && n.name == e && (n.close(), i = !0);
            }
            return i;
        }
        static closeAll() {
            for (var t = Hi.root, e = 0, i = t.numChildren; e < i; e++) {
                var s = t.getChildAt(0);
                s instanceof Hi ? s.close() : s.removeSelf();
            }
        }
        static destroy(t, e = "") {
            for (var i = !1, s = [].concat(Hi.unDestroyedScenes), r = 0, a = s.length; r < a; r++) {
                var n = s[r];
                n.url !== t || n.name != e || n.destroyed || (n.destroy(), i = !0);
            }
            return i;
        }
        static gc() {
            b.destroyUnusedResources();
        }
        static setLoadingPage(t) {
            Hi._loadPage != t && (Hi._loadPage = t);
        }
        static showLoadingPage(t = null, e = 500) {
            Hi._loadPage && (i.systemTimer.clear(null, Hi._showLoading), i.systemTimer.clear(null, Hi._hideLoading),
                i.systemTimer.once(e, null, Hi._showLoading, [t], !1));
        }
        static _showLoading(t) {
            i.stage.addChild(Hi._loadPage), Hi._loadPage.onOpened(t);
        }
        static _hideLoading() {
            Hi._loadPage.close();
        }
        static hideLoadingPage(t = 500) {
            Hi._loadPage && (i.systemTimer.clear(null, Hi._showLoading), i.systemTimer.clear(null, Hi._hideLoading),
                i.systemTimer.once(t, null, Hi._hideLoading));
        }
    }
    Hi.unDestroyedScenes = [], i.regClass(Hi), Ae.regClass("laya.display.Scene", Hi),
        Ae.regClass("Laya.Scene", Hi);
    class zi {
        static create(t) {
            var e = s.getItemByClass("DrawParticleCmd", zi);
            return e._templ = t, e;
        }
        recover() {
            this._templ = null, s.recover("DrawParticleCmd", this);
        }
        run(t, e, i) {
            t.drawParticle(e, i, this._templ);
        }
        get cmdID() {
            return zi.ID;
        }
    }
    zi.ID = "DrawParticleCmd";
    class Ki {
        constructor() { }
        paramChanged() {
            Si.systemTimer.callLater(this, this.buildFilter);
        }
        buildFilter() {
            this._target && this.addFilter(this._target);
        }
        addFilter(t) {
            var e;
            t && (t.filters ? (e = t.filters).indexOf(this._filter) < 0 && (e.push(this._filter),
                t.filters = Q.copyArray([], e)) : t.filters = [this._filter]);
        }
        removeFilter(t) {
            t && (t.filters = null);
        }
        set target(t) {
            this._target != t && (this._target = t, this.paramChanged());
        }
    }
    class ji {
        render(t, e, i, s, r) {
            var a = z.create(W.TEXTURE2D, 0);
            this.setShaderInfo(a, r, t.width, t.height), e.drawTarget(t, 0, 0, i, s, p.EMPTY.identity(), a);
        }
        setShaderInfo(t, e, i, s) {
            t.defines.add(q.BLUR);
            var r = t;
            ji.blurinfo[0] = i, ji.blurinfo[1] = s, r.blurInfo = ji.blurinfo;
            var a = e.strength / 3, n = a * a;
            e.strength_sig2_2sig2_gauss1[0] = e.strength, e.strength_sig2_2sig2_gauss1[1] = n,
                e.strength_sig2_2sig2_gauss1[2] = 2 * n, e.strength_sig2_2sig2_gauss1[3] = 1 / (2 * Math.PI * n),
                r.strength_sig2_2sig2_gauss1 = e.strength_sig2_2sig2_gauss1;
        }
    }
    ji.blurinfo = new Array(2);
    class qi extends q {
        constructor(t = 4) {
            super(), this.strength_sig2_2sig2_gauss1 = [], this.strength = t, this._glRender = new ji();
        }
        get type() {
            return q.BLUR;
        }
        getStrenth_sig2_2sig2_native() {
            this.strength_sig2_native || (this.strength_sig2_native = new Float32Array(4));
            var t = this.strength / 3, e = t * t;
            return this.strength_sig2_native[0] = this.strength, this.strength_sig2_native[1] = e,
                this.strength_sig2_native[2] = 2 * e, this.strength_sig2_native[3] = 1 / (2 * Math.PI * e),
                this.strength_sig2_native;
        }
    }
    class Qi extends hi {
        constructor() {
            super(...arguments), this.duration = 1e3, this.delay = 0, this.repeat = 0, this.autoDestroyAtComplete = !0;
        }
        _onAwake() {
            this.target = this.target || this.owner, this.autoDestroyAtComplete && (this._comlete = T.create(this.target, this.target.destroy, null, !1)),
                this.eventName ? this.owner.on(this.eventName, this, this._exeTween) : this._exeTween();
        }
        _exeTween() {
            this._tween = this._doTween(), this._tween.repeat = this.repeat;
        }
        _doTween() {
            return null;
        }
        onReset() {
            this.duration = 1e3, this.delay = 0, this.repeat = 0, this.ease = null, this.target = null,
                this.eventName && (this.owner.off(this.eventName, this, this._exeTween), this.eventName = null),
                this._comlete && (this._comlete.recover(), this._comlete = null), this._tween && (this._tween.clear(),
                    this._tween = null);
        }
    }
    class Zi {
        setShaderInfo(t, e, i, s) {
            t.defines.add(s.type);
            var r = t;
            r.u_blurInfo1 = s._sv_blurInfo1;
            var a = s._sv_blurInfo2;
            a[0] = e, a[1] = i, r.u_blurInfo2 = a, r.u_color = s.getColor();
        }
        render(t, e, i, s, r) {
            var a = i, n = s, h = z.create(W.TEXTURE2D, 0);
            this.setShaderInfo(h, a, n, r);
            var o = z.create(W.TEXTURE2D, 0), l = p.TEMP.identity();
            e.drawTarget(t, 0, 0, a, n, l, h), e.drawTarget(t, 0, 0, a, n, l, o);
        }
    }
    class $i extends q {
        constructor(t, e = 4, i = 6, s = 6) {
            super(), this._elements = new Float32Array(9), this._sv_blurInfo1 = new Array(4),
                this._sv_blurInfo2 = [0, 0, 1, 0], this._color = new Z(t), this.blur = Math.min(e, 20),
                this.offX = i, this.offY = s, this._sv_blurInfo1[0] = this._sv_blurInfo1[1] = this.blur,
                this._sv_blurInfo1[2] = i, this._sv_blurInfo1[3] = -s, this._glRender = new Zi();
        }
        get type() {
            return qi.GLOW;
        }
        get offY() {
            return this._elements[6];
        }
        set offY(t) {
            this._elements[6] = t, this._sv_blurInfo1[3] = -t;
        }
        get offX() {
            return this._elements[5];
        }
        set offX(t) {
            this._elements[5] = t, this._sv_blurInfo1[2] = t;
        }
        getColor() {
            return this._color.arrColor;
        }
        get blur() {
            return this._elements[4];
        }
        set blur(t) {
            this._elements[4] = t, this._sv_blurInfo1[0] = this._sv_blurInfo1[1] = t;
        }
        getColorNative() {
            this._color_native || (this._color_native = new Float32Array(4));
            var t = this.getColor();
            return this._color_native[0] = t[0], this._color_native[1] = t[1], this._color_native[2] = t[2],
                this._color_native[3] = t[3], this._color_native;
        }
        getBlurInfo1Native() {
            return this._blurInof1_native || (this._blurInof1_native = new Float32Array(4)),
                this._blurInof1_native[0] = this._blurInof1_native[1] = this.blur, this._blurInof1_native[2] = this.offX,
                this._blurInof1_native[3] = this.offY, this._blurInof1_native;
        }
        getBlurInfo2Native() {
            return this._blurInof2_native || (this._blurInof2_native = new Float32Array(4)),
                this._blurInof2_native[2] = 1, this._blurInof2_native;
        }
    }
    class Ji { }
    Ji.STANDARD = 0, Ji.LEFT = 1, Ji.RIGHT = 2, Ji.NUM_PAD = 3;
    class ts { }
    ts.NUMBER_0 = 48, ts.NUMBER_1 = 49, ts.NUMBER_2 = 50, ts.NUMBER_3 = 51, ts.NUMBER_4 = 52,
        ts.NUMBER_5 = 53, ts.NUMBER_6 = 54, ts.NUMBER_7 = 55, ts.NUMBER_8 = 56, ts.NUMBER_9 = 57,
        ts.A = 65, ts.B = 66, ts.C = 67, ts.D = 68, ts.E = 69, ts.F = 70, ts.G = 71, ts.H = 72,
        ts.I = 73, ts.J = 74, ts.K = 75, ts.L = 76, ts.M = 77, ts.N = 78, ts.O = 79, ts.P = 80,
        ts.Q = 81, ts.R = 82, ts.S = 83, ts.T = 84, ts.U = 85, ts.V = 86, ts.W = 87, ts.X = 88,
        ts.Y = 89, ts.Z = 90, ts.F1 = 112, ts.F2 = 113, ts.F3 = 114, ts.F4 = 115, ts.F5 = 116,
        ts.F6 = 117, ts.F7 = 118, ts.F8 = 119, ts.F9 = 120, ts.F10 = 121, ts.F11 = 122,
        ts.F12 = 123, ts.F13 = 124, ts.F14 = 125, ts.F15 = 126, ts.NUMPAD = 21, ts.NUMPAD_0 = 96,
        ts.NUMPAD_1 = 97, ts.NUMPAD_2 = 98, ts.NUMPAD_3 = 99, ts.NUMPAD_4 = 100, ts.NUMPAD_5 = 101,
        ts.NUMPAD_6 = 102, ts.NUMPAD_7 = 103, ts.NUMPAD_8 = 104, ts.NUMPAD_9 = 105, ts.NUMPAD_ADD = 107,
        ts.NUMPAD_DECIMAL = 110, ts.NUMPAD_DIVIDE = 111, ts.NUMPAD_ENTER = 108, ts.NUMPAD_MULTIPLY = 106,
        ts.NUMPAD_SUBTRACT = 109, ts.SEMICOLON = 186, ts.EQUAL = 187, ts.COMMA = 188, ts.MINUS = 189,
        ts.PERIOD = 190, ts.SLASH = 191, ts.BACKQUOTE = 192, ts.LEFTBRACKET = 219, ts.BACKSLASH = 220,
        ts.RIGHTBRACKET = 221, ts.QUOTE = 222, ts.ALTERNATE = 18, ts.BACKSPACE = 8, ts.CAPS_LOCK = 20,
        ts.COMMAND = 15, ts.CONTROL = 17, ts.DELETE = 46, ts.ENTER = 13, ts.ESCAPE = 27,
        ts.PAGE_UP = 33, ts.PAGE_DOWN = 34, ts.END = 35, ts.HOME = 36, ts.LEFT = 37, ts.UP = 38,
        ts.RIGHT = 39, ts.DOWN = 40, ts.SHIFT = 16, ts.SPACE = 32, ts.TAB = 9, ts.INSERT = 45;
    class es {
        constructor() { }
        static getMCDName(t) {
            return es._typeToNameDic[t];
        }
        static showRenderTypeInfo(t, e = !1) {
            if (e || !es.showedDic[t]) {
                if (es.showedDic[t] = !0, !es._rendertypeToStrDic[t]) {
                    var i, s = [];
                    for (i = 1; i <= t;) i & t && s.push(es.getMCDName(i & t)), i <<= 1;
                    es._rendertypeToStrDic[t] = s.join(",");
                }
                console.log("cmd:", es._rendertypeToStrDic[t]);
            }
        }
        static __init__() {
            es._typeToNameDic[pe.ALPHA] = "ALPHA", es._typeToNameDic[pe.TRANSFORM] = "TRANSFORM",
                es._typeToNameDic[pe.TEXTURE] = "TEXTURE", es._typeToNameDic[pe.GRAPHICS] = "GRAPHICS",
                es._typeToNameDic[pe.ONECHILD] = "ONECHILD", es._typeToNameDic[pe.CHILDS] = "CHILDS",
                es._typeToNameDic[pe.TRANSFORM | pe.ALPHA] = "TRANSFORM|ALPHA", es._typeToNameDic[pe.CANVAS] = "CANVAS",
                es._typeToNameDic[pe.BLEND] = "BLEND", es._typeToNameDic[pe.FILTERS] = "FILTERS",
                es._typeToNameDic[pe.MASK] = "MASK", es._typeToNameDic[pe.CLIP] = "CLIP", es._typeToNameDic[pe.LAYAGL3D] = "LAYAGL3D";
        }
        render(t, e, i) {
            es._addType(this._renderType), es.showRenderTypeInfo(this._renderType), be.renders[this._renderType]._fun(this, t, e + this._x, i + this._y),
                this._repaint = 0;
        }
        _stageRender(t, e, s) {
            es._countStart(), es._PreStageRender.call(i.stage, t, e, s), es._countEnd();
        }
        static _countStart() {
            var t;
            for (t in es._countDic) es._countDic[t] = 0;
        }
        static _countEnd() {
            es._i++, es._i > 60 && (es.showCountInfo(), es._i = 0);
        }
        static _addType(t) {
            es._countDic[t] ? es._countDic[t] += 1 : es._countDic[t] = 1;
        }
        static showCountInfo() {
            var t;
            for (t in console.log("==================="), es._countDic) console.log("count:" + es._countDic[t]),
                es.showRenderTypeInfo(t, !0);
        }
        static enableQuickTest() {
            es.__init__(), Pe.prototype.render = es.prototype.render, es._PreStageRender = ke.prototype.render,
                ke.prototype.render = es.prototype._stageRender;
        }
    }
    es.showedDic = {}, es._rendertypeToStrDic = {}, es._typeToNameDic = {}, es._countDic = {},
        es._i = 0;
    class is extends Pe {
        constructor() {
            super(), this.visible = !1, this.on(qt.ADDED, this, this._onParentChange), this.on(qt.REMOVED, this, this._onParentChange);
        }
        _onParentChange() {
            this.target = this.parent;
        }
        play(t = 1, e = null) {
            isNaN(t) && (t = 1), this.url && (this.stop(), this._channel = Ke.playSound(this.url, t, e));
        }
        stop() {
            this._channel && !this._channel.isStopped && this._channel.stop(), this._channel = null;
        }
        _setPlayAction(t, e, i, s = !0) {
            this[i] && t && (s ? t.on(e, this, this[i]) : t.off(e, this, this[i]));
        }
        _setPlayActions(t, e, i, s = !0) {
            if (t && e) {
                var r, a, n = e.split(",");
                for (a = n.length, r = 0; r < a; r++) this._setPlayAction(t, n[r], i, s);
            }
        }
        set playEvent(t) {
            this._playEvents = t, t && this._tar && this._setPlayActions(this._tar, t, "play");
        }
        set target(t) {
            this._tar && (this._setPlayActions(this._tar, this._playEvents, "play", !1), this._setPlayActions(this._tar, this._stopEvents, "stop", !1)),
                this._tar = t, this._tar && (this._setPlayActions(this._tar, this._playEvents, "play", !0),
                    this._setPlayActions(this._tar, this._stopEvents, "stop", !0));
        }
        set stopEvent(t) {
            this._stopEvents = t, t && this._tar && this._setPlayActions(this._tar, t, "stop");
        }
    }
    Ae.regClass("laya.media.SoundNode", is), Ae.regClass("Laya.SoundNode", is);
    class ss {
        static enable(t, e, s = 2) {
            ss.type = s, i.loader.load(t, T.create(null, ss.onManifestLoaded, [e]), null, Ze.JSON);
        }
        static onManifestLoaded(t, e) {
            ss.manifest = e, E.customFormat = ss.addVersionPrefix, t.run(), e || console.warn("资源版本清单文件不存在，不使用资源版本管理。忽略ERR_FILE_NOT_FOUND错误。");
        }
        static addVersionPrefix(t) {
            return t = E.getAdptedFilePath(t), ss.manifest && ss.manifest[t] ? ss.type == ss.FILENAME_VERSION ? ss.manifest[t] : ss.manifest[t] + "/" + t : t;
        }
    }
    ss.FOLDER_VERSION = 1, ss.FILENAME_VERSION = 2, ss.type = ss.FOLDER_VERSION;
    class rs extends x {
        constructor(t = null, e = 0, i = null, s = null) {
            super(), this.disableInput = !1, this.protocols = [], this._byteClass = i || P,
                this.protocols = s, this.endian = rs.BIG_ENDIAN, t && e > 0 && e < 65535 && this.connect(t, e);
        }
        get input() {
            return this._input;
        }
        get output() {
            return this._output;
        }
        get connected() {
            return this._connected;
        }
        get endian() {
            return this._endian;
        }
        set endian(t) {
            this._endian = t, null != this._input && (this._input.endian = t), null != this._output && (this._output.endian = t);
        }
        connect(t, e) {
            var i = "ws://" + t + ":" + e;
            this.connectByUrl(i);
        }
        connectByUrl(t) {
            null != this._socket && this.close(), this._socket && this.cleanSocket(), this.protocols && 0 != this.protocols.length ? this._socket = new ee.window.WebSocket(t, this.protocols) : this._socket = new ee.window.WebSocket(t),
                this._socket.binaryType = "arraybuffer", this._output = new this._byteClass(), this._output.endian = this.endian,
                this._input = new this._byteClass(), this._input.endian = this.endian, this._addInputPosition = 0,
                this._socket.onopen = (t => {
                    this._onOpen(t);
                }), this._socket.onmessage = (t => {
                    this._onMessage(t);
                }), this._socket.onclose = (t => {
                    this._onClose(t);
                }), this._socket.onerror = (t => {
                    this._onError(t);
                });
        }
        cleanSocket() {
            this.close(), this._connected = !1, this._socket.onopen = null, this._socket.onmessage = null,
                this._socket.onclose = null, this._socket.onerror = null, this._socket = null;
        }
        close() {
            if (null != this._socket) try {
                this._socket.close();
            } catch (t) { }
        }
        _onOpen(t) {
            this._connected = !0, this.event(qt.OPEN, t);
        }
        _onMessage(t) {
            if (t && t.data) {
                var e = t.data;
                if (this.disableInput && e) this.event(qt.MESSAGE, e); else {
                    this._input.length > 0 && this._input.bytesAvailable < 1 && (this._input.clear(),
                        this._addInputPosition = 0);
                    var i = this._input.pos;
                    !this._addInputPosition && (this._addInputPosition = 0), this._input.pos = this._addInputPosition,
                        e && ("string" == typeof e ? this._input.writeUTFBytes(e) : this._input.writeArrayBuffer(e),
                            this._addInputPosition = this._input.pos, this._input.pos = i), this.event(qt.MESSAGE, e);
                }
            }
        }
        _onClose(t) {
            this._connected = !1, this.event(qt.CLOSE, t);
        }
        _onError(t) {
            this.event(qt.ERROR, t);
        }
        send(t) {
            this._socket.send(t);
        }
        flush() {
            if (this._output && this._output.length > 0) {
                var t;
                try {
                    this._socket && this._socket.send(this._output.__getBuffer().slice(0, this._output.length));
                } catch (e) {
                    t = e;
                }
                this._output.endian = this.endian, this._output.clear(), t && this.event(qt.ERROR, t);
            }
        }
    }
    rs.LITTLE_ENDIAN = "littleEndian", rs.BIG_ENDIAN = "bigEndian", (Di = t.TextureDecodeFormat || (t.TextureDecodeFormat = {}))[Di.Normal = 0] = "Normal",
        Di[Di.RGBM = 1] = "RGBM";
    class as extends I {
        constructor() {
            var e = m.instance;
            super(e.RGB, !1), this._glTextureType = e.TEXTURE_2D, this._width = 1, this._height = 1,
                this._wrapModeU = this._wrapModeV = t.WarpMode.Clamp, this._filterMode = t.FilterMode.Bilinear,
                this._setWarpMode(e.TEXTURE_WRAP_S, this._wrapModeU), this._setWarpMode(e.TEXTURE_WRAP_T, this._wrapModeV),
                this._setFilterMode(this._filterMode), this._needUpdate = !1, this._readyed = !0,
                as._videoTexturePool.push(this);
        }
        static _update() {
            for (var t = as._videoTexturePool, e = 0, i = t.length; e < i; e++) {
                var s = t[e];
                s && s._updateVideoData();
            }
        }
        get video() {
            return this._video;
        }
        set video(t) {
            t && t instanceof HTMLVideoElement && (this._video = t, Si.Browser.onMobile && (this._video["x5-playsInline"] = !0,
                this._video["x5-playsinline"] = !0, this._video.x5PlaysInline = !0, this._video.playsInline = !0,
                this._video["webkit-playsInline"] = !0, this._video["webkit-playsinline"] = !0,
                this._video.webkitPlaysInline = !0, this._video.playsinline = !0, this._video.style.playsInline = !0,
                this._video.crossOrigin = "anonymous", this._video.setAttribute("crossorigin", "anonymous"),
                this._video.setAttribute("playsinline", "true"), this._video.setAttribute("x5-playsinline", "true"),
                this._video.setAttribute("webkit-playsinline", "true"), this._video.autoplay = !0));
        }
        _updateVideoData() {
            if (this._video && this._needUpdate) {
                var t = m.instance;
                v.bindTexture(t, this._glTextureType, this._glTexture), t.texImage2D(this._glTextureType, 0, t.RGB, t.RGB, t.UNSIGNED_BYTE, this._video);
            }
        }
        videoPlay() {
            this._video.play(), this._needUpdate = !0;
        }
        videoPause() {
            this._video.pause(), this._needUpdate = !1;
        }
        destroy() {
            super.destroy(), this._video = null;
        }
    }
    as._videoTexturePool = new Array();
    class ns {
        constructor() {
            this.reset();
        }
        setData(t, e, i, s) {
            return this.char = t, this.charNum = t.charCodeAt(0), this.x = this.y = 0, this.width = e,
                this.height = i, this.style = s, this.isWord = !ns._isWordRegExp.test(t), this;
        }
        reset() {
            return this.x = this.y = this.width = this.height = 0, this.isWord = !1, this.char = null,
                this.charNum = 0, this.style = null, this;
        }
        recover() {
            s.recover("HTMLChar", this.reset());
        }
        static create() {
            return s.getItemByClass("HTMLChar", ns);
        }
        _isChar() {
            return !0;
        }
        _getCSSStyle() {
            return this.style;
        }
    }
    ns._isWordRegExp = new RegExp("[\\w.]", "");
    class hs {
        static enable() {
            hs._logdiv || (hs._logdiv = ee.createElement("div"), hs._logdiv.style.cssText = "border:white;padding:4px;overflow-y:auto;z-index:1000000;background:rgba(100,100,100,0.6);color:white;position: absolute;left:0px;top:0px;width:50%;height:50%;",
                ee.document.body.appendChild(hs._logdiv), hs._btn = ee.createElement("button"),
                hs._btn.innerText = "Hide", hs._btn.style.cssText = "z-index:1000001;position: absolute;left:10px;top:10px;",
                hs._btn.onclick = hs.toggle, ee.document.body.appendChild(hs._btn));
        }
        static toggle() {
            var t = hs._logdiv.style;
            "" === t.display ? (hs._btn.innerText = "Show", t.display = "none") : (hs._btn.innerText = "Hide",
                t.display = "");
        }
        static print(t) {
            hs._logdiv && (hs._count >= hs.maxCount && hs.clear(), hs._count++, hs._logdiv.innerText += t + "\n",
                hs.autoScrollToBottom && hs._logdiv.scrollHeight - hs._logdiv.scrollTop - hs._logdiv.clientHeight < 50 && (hs._logdiv.scrollTop = hs._logdiv.scrollHeight));
        }
        static clear() {
            hs._logdiv.innerText = "", hs._count = 0;
        }
    }
    hs._count = 0, hs.maxCount = 50, hs.autoScrollToBottom = !0;
    let os = 300;
    class ls {
        constructor(t, e, i, s) {
            this.scale = 1, this.datas = new Array(os), this.datapos = 0, this.id = t, this.color = e,
                this.name = i, this.scale = s;
        }
        addData(t) {
            this.datas[this.datapos] = t, this.datapos++, this.datapos %= os;
        }
    }
    class _s extends Pe {
        constructor() {
            super(), this.datas = [], this.xdata = new Array(_s.DATANUM), this.ydata = new Array(_s.DATANUM),
                this.hud_width = 800, this.hud_height = 200, this.gMinV = 0, this.gMaxV = 100, this.textSpace = 40,
                this.sttm = 0, _s.inst = this, this._renderType |= pe.CUSTOM, this._setRenderType(this._renderType),
                this._setCustomRender(), this.addDataDef(0, 16777215, "frame", 1), this.addDataDef(1, 65280, "update", 1),
                this.addDataDef(2, 16711680, "flush", 1), _s._now = performance ? performance.now.bind(performance) : Date.now;
        }
        now() {
            return _s._now();
        }
        start() {
            this.sttm = _s._now();
        }
        end(t) {
            var e = _s._now() - this.sttm;
            this.updateValue(t, e);
        }
        config(t, e) {
            this.hud_width = t, this.hud_height = e;
        }
        addDataDef(t, e, i, s) {
            this.datas[t] = new ls(t, e, i, s);
        }
        updateValue(t, e) {
            this.datas[t].addData(e);
        }
        v2y(t) {
            this._y, this.hud_height, this.gMinV, this.gMaxV;
            return this._y + this.hud_height * (1 - (t - this.gMinV) / this.gMaxV);
        }
        drawHLine(t, e, i, s) {
            var r = this._x, a = (this._x, this.hud_width, this.v2y(e));
            t.fillText(s, r, a - 6, null, "green", null), r += this.textSpace, t.fillStyle = i,
                t.fillRect(r, a, this._x + this.hud_width, 1, null);
        }
        customRender(t, e, i) {
            var s = performance.now();
            _s._lastTm <= 0 && (_s._lastTm = s), this.updateValue(0, s - _s._lastTm), _s._lastTm = s,
                t.save(), t.fillRect(this._x, this._y, this.hud_width, this.hud_height + 4, "#000000cc"),
                t.globalAlpha = .9, this.drawHLine(t, 0, "green", "    0"), this.drawHLine(t, 10, "green", "  10"),
                this.drawHLine(t, 16.667, "red", " "), this.drawHLine(t, 20, "green", "50|20"),
                this.drawHLine(t, 33.334, "yellow", ""), this.drawHLine(t, 16.667 * 3, "yellow", ""),
                this.drawHLine(t, 66.668, "yellow", ""), this.drawHLine(t, 50, "green", "20|50"),
                this.drawHLine(t, 100, "green", "10|100");
            for (var r = 0, a = this.datas.length; r < a; r++) {
                var n = this.datas[r];
                if (n) {
                    var h = n.datas.length, o = (this.hud_width - this.textSpace) / h, l = n.datapos, _ = this._x + this.textSpace;
                    t.fillStyle = n.color;
                    for (var u = h; l < u; l++) {
                        var c = this.v2y(n.datas[l] * n.scale);
                        t.fillRect(_, c, o, this.hud_height + this._y - c, null), _ += o;
                    }
                    for (l = 0; l < n.datapos; l++) c = this.v2y(n.datas[l] * n.scale), t.fillRect(_, c, o, this.hud_height + this._y - c, null),
                        _ += o;
                }
            }
            t.restore();
        }
    }
    _s._lastTm = 0, _s._now = null, _s.DATANUM = 300, _s.drawTexTm = 0;
    class us {
        constructor() {
            this.maxCount = 1e3;
        }
        getCacheList() {
            return s.getPoolBySign(this.sign);
        }
        tryDispose(t) {
            var e;
            (e = s.getPoolBySign(this.sign)).length > this.maxCount && e.splice(this.maxCount, e.length - this.maxCount);
        }
        static addPoolCacheManager(t, e = 100) {
            var i;
            (i = new us()).sign = t, i.maxCount = e, ve.regCacheByFunction(Q.bind(i.tryDispose, i), Q.bind(i.getCacheList, i));
        }
    }
    class cs extends x {
        constructor() {
            super(...arguments), this._tweenDic = {}, this._tweenDataList = [], this._currTime = 0,
                this._lastTime = 0, this._startTime = 0, this._index = 0, this._gidIndex = 0, this._firstTweenDic = {},
                this._startTimeSort = !1, this._endTimeSort = !1, this._loopKey = !1, this.scale = 1,
                this._frameRate = 60, this._frameIndex = 0, this._total = 0;
        }
        static to(t, e, i, s = null, r = 0) {
            return new cs().to(t, e, i, s, r);
        }
        static from(t, e, i, s = null, r = 0) {
            return new cs().from(t, e, i, s, r);
        }
        to(t, e, i, s = null, r = 0) {
            return this._create(t, e, i, s, r, !0);
        }
        from(t, e, i, s = null, r = 0) {
            return this._create(t, e, i, s, r, !1);
        }
        _create(t, e, i, r, a, n) {
            var h = s.getItemByClass("tweenData", ds);
            return h.isTo = n, h.type = 0, h.target = t, h.duration = i, h.data = e, h.startTime = this._startTime + a,
                h.endTime = h.startTime + h.duration, h.ease = r, this._startTime = Math.max(h.endTime, this._startTime),
                this._tweenDataList.push(h), this._startTimeSort = !0, this._endTimeSort = !0, this;
        }
        addLabel(t, e) {
            var i = s.getItemByClass("tweenData", ds);
            return i.type = 1, i.data = t, i.endTime = i.startTime = this._startTime + e, this._labelDic || (this._labelDic = {}),
                this._labelDic[t] = i, this._tweenDataList.push(i), this;
        }
        removeLabel(t) {
            if (this._labelDic && this._labelDic[t]) {
                var e = this._labelDic[t];
                if (e) {
                    var i = this._tweenDataList.indexOf(e);
                    i > -1 && this._tweenDataList.splice(i, 1);
                }
                delete this._labelDic[t];
            }
        }
        gotoTime(t) {
            if (null != this._tweenDataList && 0 != this._tweenDataList.length) {
                var e, i, r, a;
                for (var n in this._firstTweenDic) if (i = this._firstTweenDic[n]) for (var h in i) h in i.diyTarget && (i.diyTarget[h] = i[h]);
                for (n in this._tweenDic) (e = this._tweenDic[n]).clear(), delete this._tweenDic[n];
                if (this._index = 0, this._gidIndex = 0, this._currTime = t, this._lastTime = ee.now(),
                    null == this._endTweenDataList || this._endTimeSort) {
                    this._endTimeSort = !1, this._endTweenDataList = r = this._tweenDataList.concat(),
                        r.sort(function (t, e) {
                            return t.endTime > e.endTime ? 1 : t.endTime < e.endTime ? -1 : 0;
                        });
                } else r = this._endTweenDataList;
                for (var o = 0, l = r.length; o < l; o++) if (0 == (a = r[o]).type) {
                    if (!(t >= a.endTime)) break;
                    this._index = Math.max(this._index, o + 1);
                    var _ = a.data;
                    if (a.isTo) for (var u in _) a.target[u] = _[u];
                }
                for (o = 0, l = this._tweenDataList.length; o < l; o++) 0 == (a = this._tweenDataList[o]).type && t >= a.startTime && t < a.endTime && (this._index = Math.max(this._index, o + 1),
                    this._gidIndex++, (e = s.getItemByClass("tween", ai))._create(a.target, a.data, a.duration, a.ease, T.create(this, this._animComplete, [this._gidIndex]), 0, !1, a.isTo, !0, !1),
                    e.setStartTime(this._currTime - (t - a.startTime)), e._updateEase(this._currTime),
                    e.gid = this._gidIndex, this._tweenDic[this._gidIndex] = e);
            }
        }
        gotoLabel(t) {
            if (null != this._labelDic) {
                var e = this._labelDic[t];
                e && this.gotoTime(e.startTime);
            }
        }
        pause() {
            i.timer.clear(this, this._update);
        }
        resume() {
            this.play(this._currTime, this._loopKey);
        }
        play(t = 0, e = !1) {
            if (this._tweenDataList) {
                if (this._startTimeSort) {
                    this._startTimeSort = !1, this._tweenDataList.sort(function (t, e) {
                        return t.startTime > e.startTime ? 1 : t.startTime < e.startTime ? -1 : 0;
                    });
                    for (var s = 0, r = this._tweenDataList.length; s < r; s++) {
                        var a = this._tweenDataList[s];
                        if (null != a && 0 == a.type) {
                            var n = a.target, h = n.$_GID || (n.$_GID = Q.getGID()), o = null;
                            for (var l in null == this._firstTweenDic[h] ? ((o = {}).diyTarget = n, this._firstTweenDic[h] = o) : o = this._firstTweenDic[h],
                                a.data) null == o[l] && (o[l] = n[l]);
                        }
                    }
                }
                "string" == typeof t ? this.gotoLabel(t) : this.gotoTime(t), this._loopKey = e,
                    this._lastTime = ee.now(), i.timer.frameLoop(1, this, this._update);
            }
        }
        _update() {
            if (this._currTime >= this._startTime) {
                if (!this._loopKey) {
                    for (var t in this._tweenDic) (e = this._tweenDic[t]).complete();
                    return this.pause(), void this._complete();
                }
                if (this._complete(), !this._tweenDataList) return;
                this.gotoTime(0);
            }
            var e, i = ee.now(), r = i - this._lastTime, a = this._currTime += r * this.scale;
            for (t in this._lastTime = i, this._tweenDic) (e = this._tweenDic[t])._updateEase(a);
            if (0 != this._tweenDataList.length && this._index < this._tweenDataList.length) {
                var n = this._tweenDataList[this._index];
                a >= n.startTime && (this._index++, 0 == n.type ? (this._gidIndex++, (e = s.getItemByClass("tween", ai))._create(n.target, n.data, n.duration, n.ease, T.create(this, this._animComplete, [this._gidIndex]), 0, !1, n.isTo, !0, !1),
                    e.setStartTime(a), e.gid = this._gidIndex, this._tweenDic[this._gidIndex] = e, e._updateEase(a)) : this.event(qt.LABEL, n.data));
            }
        }
        _animComplete(t) {
            this._tweenDic[t] && delete this._tweenDic[t];
        }
        _complete() {
            this.event(qt.COMPLETE);
        }
        get index() {
            return this._frameIndex;
        }
        set index(t) {
            this._frameIndex = t, this.gotoTime(this._frameIndex / this._frameRate * 1e3);
        }
        get total() {
            return this._total = Math.floor(this._startTime / 1e3 * this._frameRate), this._total;
        }
        reset() {
            var t, e, s;
            if (this._labelDic) for (t in this._labelDic) delete this._labelDic[t];
            for (t in this._tweenDic) this._tweenDic[t].clear(), delete this._tweenDic[t];
            for (t in this._firstTweenDic) delete this._firstTweenDic[t];
            if (this._endTweenDataList = null, this._tweenDataList && this._tweenDataList.length) for (s = this._tweenDataList.length,
                e = 0; e < s; e++) this._tweenDataList[e] && this._tweenDataList[e].destroy();
            this._tweenDataList.length = 0, this._currTime = 0, this._lastTime = 0, this._startTime = 0,
                this._index = 0, this._gidIndex = 0, this.scale = 1, i.timer.clear(this, this._update);
        }
        destroy() {
            this.reset(), this._labelDic = null, this._tweenDic = null, this._tweenDataList = null,
                this._firstTweenDic = null;
        }
    }
    class ds {
        constructor() {
            this.type = 0, this.isTo = !0;
        }
        destroy() {
            this.target = null, this.ease = null, this.data = null, this.isTo = !0, this.type = 0,
                s.recover("tweenData", this);
        }
    }
    class ps {
        characterMapContains(t) {
            for (var e = 0; e < ps.charsMap.length; ++e) if (ps.charsMap[e][0] === t) return !0;
            return !1;
        }
        getCharRep(t) {
            for (var e = 0; e < ps.charsMap.length; ++e) if (ps.charsMap[e][0] === t) return ps.charsMap[e];
            return !1;
        }
        getCombCharRep(t, e) {
            for (var i = 0; i < ps.combCharsMap.length; ++i) if (ps.combCharsMap[i][0][0] === t && ps.combCharsMap[i][0][1] === e) return ps.combCharsMap[i];
            return !1;
        }
        isTransparent(t) {
            for (var e = 0; e < ps.transChars.length; ++e) if (ps.transChars[e] === t) return !0;
            return !1;
        }
        getOriginalCharsFromCode(t) {
            var e;
            for (e = 0; e < ps.charsMap.length; ++e) if (ps.charsMap[e].indexOf(t) > -1) return String.fromCharCode(ps.charsMap[e][0]);
            for (e = 0; e < ps.combCharsMap.length; ++e) if (ps.combCharsMap[e].indexOf(t) > -1) return String.fromCharCode(ps.combCharsMap[e][0][0]) + String.fromCharCode(ps.combCharsMap[e][0][1]);
            return String.fromCharCode(t);
        }
        convertArabic(t) {
            for (var e, i, s = "", r = 0; r < t.length; ++r) {
                var a = t.charCodeAt(r);
                if (this.characterMapContains(a)) {
                    for (var n = null, h = null, o = r - 1, l = r + 1; o >= 0 && this.isTransparent(t.charCodeAt(o)); --o);
                    for ((!(e = !!(n = o >= 0 ? t.charCodeAt(o) : null) && this.getCharRep(n)) || null == e[2] && null == e[3]) && (n = null); l < t.length && this.isTransparent(t.charCodeAt(l)); ++l);
                    if ((!(e = !!(h = l < t.length ? t.charCodeAt(l) : null) && this.getCharRep(h)) || null == e[3] && null == e[4]) && (h = null),
                        1604 === a && null != h && (1570 === h || 1571 === h || 1573 === h || 1575 === h)) {
                        i = this.getCombCharRep(a, h), s += null != n ? String.fromCharCode(i[4]) : String.fromCharCode(i[1]),
                            ++r;
                        continue;
                    }
                    if (e = this.getCharRep(a), null != n && null != h && null != e[3]) {
                        s += String.fromCharCode(e[3]);
                        continue;
                    }
                    if (null != n && null != e[4]) {
                        s += String.fromCharCode(e[4]);
                        continue;
                    }
                    if (null != h && null != e[2]) {
                        s += String.fromCharCode(e[2]);
                        continue;
                    }
                    s += String.fromCharCode(e[1]);
                } else s += String.fromCharCode(a);
            }
            return s;
        }
        convertArabicBack(t) {
            var e, i, s = "";
            for (i = 0; i < t.length; ++i) e = t.charCodeAt(i), s += this.getOriginalCharsFromCode(e);
            return s;
        }
    }
    ps.charsMap = [[1569, 65152, null, null, null], [1570, 65153, null, null, 65154], [1571, 65155, null, null, 65156], [1572, 65157, null, null, 65158], [1573, 65159, null, null, 65160], [1574, 65161, 65163, 65164, 65162], [1575, 65165, null, null, 65166], [1576, 65167, 65169, 65170, 65168], [1577, 65171, null, null, 65172], [1578, 65173, 65175, 65176, 65174], [1579, 65177, 65179, 65180, 65178], [1580, 65181, 65183, 65184, 65182], [1581, 65185, 65187, 65188, 65186], [1582, 65189, 65191, 65192, 65190], [1583, 65193, null, null, 65194], [1584, 65195, null, null, 65196], [1585, 65197, null, null, 65198], [1586, 65199, null, null, 65200], [1587, 65201, 65203, 65204, 65202], [1588, 65205, 65207, 65208, 65206], [1589, 65209, 65211, 65212, 65210], [1590, 65213, 65215, 65216, 65214], [1591, 65217, 65219, 65220, 65218], [1592, 65221, 65223, 65224, 65222], [1593, 65225, 65227, 65228, 65226], [1594, 65229, 65231, 65232, 65230], [1600, 1600, 1600, 1600, 1600], [1601, 65233, 65235, 65236, 65234], [1602, 65237, 65239, 65240, 65238], [1603, 65241, 65243, 65244, 65242], [1604, 65245, 65247, 65248, 65246], [1605, 65249, 65251, 65252, 65250], [1606, 65253, 65255, 65256, 65254], [1607, 65257, 65259, 65260, 65258], [1608, 65261, null, null, 65262], [1609, 65263, null, null, 65264], [1610, 65265, 65267, 65268, 65266], [1662, 64342, 64344, 64345, 64343], [1740, 64508, 64510, 64511, 64509], [1670, 64378, 64380, 64381, 64379], [1705, 64398, 64400, 64401, 64399], [1711, 64402, 64404, 64405, 64403], [1688, 64394, null, null, 64395]],
        ps.combCharsMap = [[[1604, 1570], 65269, null, null, 65270], [[1604, 1571], 65271, null, null, 65272], [[1604, 1573], 65273, null, null, 65274], [[1604, 1575], 65275, null, null, 65276]],
        ps.transChars = [1552, 1554, 1555, 1556, 1557, 1611, 1612, 1613, 1614, 1615, 1616, 1617, 1618, 1619, 1620, 1621, 1622, 1623, 1624, 1648, 1750, 1751, 1752, 1753, 1754, 1755, 1756, 1759, 1760, 1761, 1762, 1763, 1764, 1767, 1768, 1770, 1771, 1772, 1773];
    class fs {
        static ArrayMul(t, e, i) {
            if (t) if (e) for (var s, r, a, n, h = 0; h < 4; h++) s = t[h], r = t[h + 4], a = t[h + 8],
                n = t[h + 12], i[h] = s * e[0] + r * e[1] + a * e[2] + n * e[3], i[h + 4] = s * e[4] + r * e[5] + a * e[6] + n * e[7],
                i[h + 8] = s * e[8] + r * e[9] + a * e[10] + n * e[11], i[h + 12] = s * e[12] + r * e[13] + a * e[14] + n * e[15]; else fs.copyArray(t, i); else fs.copyArray(e, i);
        }
        static copyArray(t, e) {
            if (t && e) for (var i = 0; i < t.length; i++) e[i] = t[i];
        }
    }
    return t.AlphaCmd = r, t.Animation = Vi, t.AnimationBase = oi, t.ArabicReshaper = ps,
        t.AtlasGrid = zt, t.AtlasInfoManager = $e, t.AudioSound = Xe, t.AudioSoundChannel = Ye,
        t.BasePoly = Nt, t.BaseShader = F, t.BaseTexture = I, t.Bezier = nt, t.Bitmap = w,
        t.BitmapFont = qe, t.BlendMode = G, t.BlurFilter = qi, t.BlurFilterGLRender = ji,
        t.BlurFilterSetter = class extends Ki {
            constructor() {
                super(), this._strength = 4, this._filter = new qi(this.strength);
            }
            buildFilter() {
                this._filter = new qi(this.strength), super.buildFilter();
            }
            get strength() {
                return this._strength;
            }
            set strength(t) {
                this._strength = t;
            }
        }, t.BoundsStyle = Re, t.Browser = ee, t.Buffer = Tt, t.Buffer2D = yt, t.BufferState2D = vt,
        t.BufferStateBase = mt, t.ButtonEffect = class {
            constructor() {
                this._curState = 0, this.effectScale = 1.5, this.tweenTime = 300;
            }
            set target(t) {
                this._tar = t, t.on(qt.MOUSE_DOWN, this, this.toChangedState), t.on(qt.MOUSE_UP, this, this.toInitState),
                    t.on(qt.MOUSE_OUT, this, this.toInitState);
            }
            toChangedState() {
                this._curState = 1, this._curTween && ai.clear(this._curTween), this._curTween = ai.to(this._tar, {
                    scaleX: this.effectScale,
                    scaleY: this.effectScale
                }, this.tweenTime, ri[this.effectEase], T.create(this, this.tweenComplete));
            }
            toInitState() {
                2 != this._curState && (this._curTween && ai.clear(this._curTween), this._curState = 2,
                    this._curTween = ai.to(this._tar, {
                        scaleX: 1,
                        scaleY: 1
                    }, this.tweenTime, ri[this.backEase], T.create(this, this.tweenComplete)));
            }
            tweenComplete() {
                this._curState = 0, this._curTween = null;
            }
        }, t.Byte = P, t.CONST3D2D = kt, t.CacheManger = ve, t.CacheStyle = Me, t.CallLater = Ne,
        t.CharRenderInfo = Jt, t.CharRender_Canvas = ie, t.CharRender_Native = se, t.CharSubmitCache = Ht,
        t.ClassUtils = Ae, t.ClipRectCmd = fe, t.ColorFilter = $, t.ColorFilterSetter = class extends Ki {
            constructor() {
                super(), this._brightness = 0, this._contrast = 0, this._saturation = 0, this._hue = 0,
                    this._red = 0, this._green = 0, this._blue = 0, this._alpha = 0, this._filter = new $();
            }
            buildFilter() {
                this._filter.reset(), this._filter.color(this.red, this.green, this.blue, this.alpha),
                    this._filter.adjustHue(this.hue), this._filter.adjustContrast(this.contrast), this._filter.adjustBrightness(this.brightness),
                    this._filter.adjustSaturation(this.saturation), super.buildFilter();
            }
            get brightness() {
                return this._brightness;
            }
            set brightness(t) {
                this._brightness = t, this.paramChanged();
            }
            get contrast() {
                return this._contrast;
            }
            set contrast(t) {
                this._contrast = t, this.paramChanged();
            }
            get saturation() {
                return this._saturation;
            }
            set saturation(t) {
                this._saturation = t, this.paramChanged();
            }
            get hue() {
                return this._hue;
            }
            set hue(t) {
                this._hue = t, this.paramChanged();
            }
            get red() {
                return this._red;
            }
            set red(t) {
                this._red = t, this.paramChanged();
            }
            get green() {
                return this._green;
            }
            set green(t) {
                this._green = t, this.paramChanged();
            }
            get blue() {
                return this._blue;
            }
            set blue(t) {
                this._blue = t, this.paramChanged();
            }
            get color() {
                return this._color;
            }
            set color(t) {
                var e;
                this._color = t, e = Z.create(t), this._red = 255 * e.arrColor[0], this._green = 255 * e.arrColor[1],
                    this._blue = 255 * e.arrColor[2], this.paramChanged();
            }
            get alpha() {
                return this._alpha;
            }
            set alpha(t) {
                this._alpha = t, this.paramChanged();
            }
        }, t.ColorUtils = Z, t.CommandEncoder = class {
            constructor(t, e, i, s) {
                this._idata = [];
            }
            getArrayData() {
                return this._idata;
            }
            getPtrID() {
                return 0;
            }
            beginEncoding() { }
            endEncoding() { }
            clearEncoding() {
                this._idata.length = 0;
            }
            getCount() {
                return this._idata.length;
            }
            add_ShaderValue(t) {
                this._idata.push(t);
            }
            addShaderUniform(t) {
                this.add_ShaderValue(t);
            }
        }, t.CommonScript = class extends hi {
            get isSingleton() {
                return !1;
            }
            constructor() {
                super();
            }
            onAwake() { }
            onEnable() { }
            onStart() { }
            onUpdate() { }
            onLateUpdate() { }
            onDisable() { }
            onDestroy() { }
        }, t.Component = hi, t.Config = e, t.Const = ye, t.Context = ae, t.Dragging = ni,
        t.Draw9GridTexture = ue, t.DrawCircleCmd = a, t.DrawCurvesCmd = n, t.DrawImageCmd = h,
        t.DrawLineCmd = o, t.DrawLinesCmd = l, t.DrawParticleCmd = zi, t.DrawPathCmd = _,
        t.DrawPieCmd = u, t.DrawPolyCmd = c, t.DrawRectCmd = d, t.DrawStyle = ot, t.DrawTextureCmd = J,
        t.DrawTexturesCmd = ge, t.DrawTrianglesCmd = _e, t.Earcut = Gt, t.EarcutNode = Ut,
        t.Ease = ri, t.EffectAnimation = Yi, t.EffectBase = Qi, t.Event = qt, t.EventDispatcher = x,
        t.FadeIn = class extends Qi {
            _doTween() {
                return this.target.alpha = 0, ai.to(this.target, {
                    alpha: 1
                }, this.duration, ri[this.ease], this._comlete, this.delay);
            }
        }, t.FadeOut = class extends Qi {
            _doTween() {
                return this.target.alpha = 1, ai.to(this.target, {
                    alpha: 0
                }, this.duration, ri[this.ease], this._comlete, this.delay);
            }
        }, t.FillTextCmd = me, t.FillTextureCmd = tt, t.Filter = q, t.FilterSetterBase = Ki,
        t.FontInfo = Zt, t.FrameAnimation = _i, t.GlowFilter = $i, t.GlowFilterGLRender = Zi,
        t.GlowFilterSetter = class extends Ki {
            constructor() {
                super(), this._color = "#ff0000", this._blur = 4, this._offX = 6, this._offY = 6,
                    this._filter = new $i(this._color);
            }
            buildFilter() {
                this._filter = new $i(this.color, this.blur, this.offX, this.offY), super.buildFilter();
            }
            get color() {
                return this._color;
            }
            set color(t) {
                this._color = t, this.paramChanged();
            }
            get blur() {
                return this._blur;
            }
            set blur(t) {
                this._blur = t, this.paramChanged();
            }
            get offX() {
                return this._offX;
            }
            set offX(t) {
                this._offX = t, this.paramChanged();
            }
            get offY() {
                return this._offY;
            }
            set offY(t) {
                this._offY = t, this.paramChanged();
            }
        }, t.GrahamScan = ht, t.GraphicAnimation = ki, t.Graphics = xe, t.GraphicsBounds = de,
        t.HTMLCanvas = we, t.HTMLChar = ns, t.HTMLImage = Mi, t.HalfFloatUtils = D, t.Handler = T,
        t.HitArea = Ce, t.HttpRequest = Qe, t.ICharRender = te, t.ILaya = i, t.IStatRender = fi,
        t.IndexBuffer2D = Et, t.InlcudeFile = Ei, t.Input = Be, t.KeyBoardManager = We,
        t.KeyLocation = Ji, t.Keyboard = ts, t.Laya = Si, t.LayaGL = m, t.LayaGLQuickRunner = Ee,
        t.LayaGLRunner = class {
            static uploadShaderUniforms(t, e, i, s) {
                for (var r = i._data, a = e.getArrayData(), n = 0, h = 0, o = a.length; h < o; h++) {
                    var l = a[h];
                    if (s || -1 !== l.textureID) {
                        var _ = r[l.dataOffset];
                        null != _ && (n += l.fun.call(l.caller, l, _));
                    }
                }
                return n;
            }
            static uploadCustomUniform(t, e, i, s) {
                var r = 0, a = e[i];
                return a && null != s && (r += a.fun.call(a.caller, a, s)), r;
            }
            static uploadShaderUniformsForNative(t, e, i) {
                var s = m.UPLOAD_SHADER_UNIFORM_TYPE_ID;
                i._runtimeCopyValues.length > 0 && (s = m.UPLOAD_SHADER_UNIFORM_TYPE_DATA);
                var r = i._data;
                return m.instance.uploadShaderUniforms(e, r, s);
            }
        }, t.LayaGPU = oe, t.Loader = Ze, t.LoaderManager = Je, t.LocalStorage = ei, t.Log = hs,
        t.MathUtil = li, t.MatirxArray = fs, t.Matrix = p, t.Mesh2D = wt, t.MeshParticle2D = Ri,
        t.MeshQuadTexture = Ct, t.MeshTexture = At, t.MeshVG = Rt, t.Mouse = Ai, t.MouseManager = Oe,
        t.Node = Ie, t.Path = lt, t.PerfData = ls, t.PerfHUD = _s, t.Point = f, t.Pool = s,
        t.PoolCache = us, t.Prefab = je, t.PrimitiveSV = xi, t.QuickTestTool = es, t.Rectangle = g,
        t.Render = le, t.RenderInfo = xt, t.RenderSprite = be, t.RenderState2D = O, t.RenderTexture2D = N,
        t.Resource = b, t.ResourceVersion = ss, t.RestoreCmd = et, t.RotateCmd = it, t.RunDriver = Ge,
        t.SaveBase = ct, t.SaveClipRect = dt, t.SaveCmd = ce, t.SaveMark = pt, t.SaveTransform = ft,
        t.SaveTranslate = gt, t.ScaleCmd = st, t.Scene = Hi, t.SceneLoader = Xi, t.SceneUtils = ci,
        t.Script = Gi, t.Shader = X, t.Shader2D = Ft, t.Shader2X = H, t.ShaderCompile = wi,
        t.ShaderDefines2D = W, t.ShaderDefinesBase = k, t.ShaderNode = bi, t.ShaderValue = class {
            constructor() { }
        }, t.SkinMeshBuffer = Ot, t.SkinSV = Ti, t.Socket = rs, t.Sound = class extends x {
            load(t) { }
            play(t = 0, e = 0) {
                return null;
            }
            get duration() {
                return 0;
            }
            dispose() { }
        }, t.SoundChannel = Ve, t.SoundManager = Ke, t.SoundNode = is, t.Sprite = Pe, t.SpriteConst = pe,
        t.SpriteStyle = Se, t.Stage = ke, t.Stat = V, t.StatUI = gi, t.StringKey = Y, t.Submit = Wt,
        t.SubmitBase = ut, t.SubmitCMD = j, t.SubmitCanvas = Vt, t.SubmitKey = K, t.SubmitTarget = Yt,
        t.SubmitTexture = Xt, t.System = class {
            static changeDefinition(t, e) {
                window.Laya[t] = e;
                var i = t + "=classObj";
                window.eval(i);
            }
        }, t.SystemUtils = L, t.TTFLoader = si, t.Text = De, t.TextAtlas = jt, t.TextRender = re,
        t.TextStyle = Le, t.TextTexture = Kt, t.Texture = Qt, t.Texture2D = B, t.TextureSV = yi,
        t.TimeLine = cs, t.Timer = mi, t.TouchManager = Fe, t.TransformCmd = rt, t.TranslateCmd = at,
        t.Tween = ai, t.URL = E, t.Utils = Q, t.Value2D = z, t.VectorGraphManager = Te,
        t.VertexArrayObject = class {
            constructor() { }
        }, t.VertexBuffer2D = bt, t.VideoTexture = as, t.WeakObject = ui, t.WebAudioSound = ze,
        t.WebAudioSoundChannel = He, t.WebGL = he, t.WebGLCacheAsNormalCanvas = Mt, t.WebGLContext = v,
        t.WebGLRTMgr = U, t.WordText = $t, t.WorkerLoader = Ci, t.__init = Bi, t._static = _static,
        t.alertGlobalError = Ni, t.enableDebugPanel = Ui, t.init = Fi, t.isWXOpenDataContext = void 0,
        t.isWXPosMsg = void 0, t.version = Oi, t.static = _static, t;
}({});