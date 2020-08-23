"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Core;
(function (Core) {
    var GameObject = /** @class */ (function (_super) {
        __extends(GameObject, _super);
        // CONSTRUCTOR(S)
        function GameObject(bitmap_asset, x, y, isCentered) {
            if (x === void 0) { x = 0; }
            if (y === void 0) { y = 0; }
            if (isCentered === void 0) { isCentered = false; }
            var _this = _super.call(this, Config.Globals.AssetManifest.getResult(bitmap_asset)) || this;
            _this.isCentered = isCentered;
            _this.x = x;
            _this.y = y;
            return _this;
        }
        Object.defineProperty(GameObject.prototype, "isCentered", {
            // PUBLIC PROPERTIES
            get: function () {
                return this.m_isCentered;
            },
            set: function (value) {
                if (value) {
                    this.m_recalculateSize();
                }
                else {
                    this.regX = 0;
                    this.regY = 0;
                }
                this.m_isCentered = value;
            },
            enumerable: false,
            configurable: true
        });
        // PRIVATE METHOD(S)
        GameObject.prototype.m_recalculateSize = function () {
            this.regX = this.getBounds().width * 0.5;
            this.regY = this.getBounds().height * 0.5;
        };
        return GameObject;
    }(createjs.Bitmap));
    Core.GameObject = GameObject;
})(Core || (Core = {}));
