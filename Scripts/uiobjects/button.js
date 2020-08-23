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
var UIObjects;
(function (UIObjects) {
    var Button = /** @class */ (function (_super) {
        __extends(Button, _super);
        // PRIVATE FIELDS (CLASS MEMBERS)
        // CONSTRUCTOR(S)
        function Button(bitmap_asset, x, y, isCentered) {
            if (x === void 0) { x = 0; }
            if (y === void 0) { y = 0; }
            if (isCentered === void 0) { isCentered = false; }
            var _this = _super.call(this, bitmap_asset, x, y, isCentered) || this;
            _this.isCentered = isCentered;
            // mouse events
            _this.on("mouseover", _this.m_mouseOver);
            _this.on("mouseout", _this.m_mouseOut);
            return _this;
        }
        // PRIVATE METHOD(S)
        Button.prototype.m_mouseOver = function () {
            this.alpha = 0.7; // 70% opaque - 30% transparent
        };
        Button.prototype.m_mouseOut = function () {
            this.alpha = 1.0; // 100% opaque - 0% transparent
        };
        return Button;
    }(Core.GameObject));
    UIObjects.Button = Button;
})(UIObjects || (UIObjects = {}));
