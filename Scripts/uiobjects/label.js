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
    var Label = /** @class */ (function (_super) {
        __extends(Label, _super);
        // CONSTRUCTOR(S)
        function Label(text, font_size, font_family, font_colour, x, y, isCentered) {
            if (text === void 0) { text = ""; }
            if (font_size === void 0) { font_size = "20px"; }
            if (font_family === void 0) { font_family = "Consolas"; }
            if (font_colour === void 0) { font_colour = "#000000"; }
            if (x === void 0) { x = 0; }
            if (y === void 0) { y = 0; }
            if (isCentered === void 0) { isCentered = false; }
            var _this = _super.call(this, text, font_size + " " + font_family, font_colour) || this;
            _this.isCentered = isCentered;
            _this.x = x;
            _this.y = y;
            return _this;
        }
        Object.defineProperty(Label.prototype, "isCentered", {
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
        Label.prototype.m_recalculateSize = function () {
            this.regX = this.getMeasuredWidth() * 0.5;
            this.regY = this.getMeasuredHeight() * 0.5;
        };
        // PUBLIC METHOD(S)
        Label.prototype.setText = function (new_text) {
            this.text = new_text;
            if (this.isCentered) {
                this.m_recalculateSize();
            }
        };
        return Label;
    }(createjs.Text));
    UIObjects.Label = Label;
})(UIObjects || (UIObjects = {}));
