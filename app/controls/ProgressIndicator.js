var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var app;
(function (app) {
    var controls;
    (function (controls) {
        var ProgressIndicator = (function (_super) {
            __extends(ProgressIndicator, _super);
            function ProgressIndicator() {
                _super.apply(this, arguments);
            }
            Object.defineProperty(ProgressIndicator.prototype, "typeName", {
                get: function () {
                    return ProgressIndicator.typeName;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(ProgressIndicator.prototype, "child", {
                get: function () {
                    return this._child;
                },
                set: function (value) {
                    if (this._child != value) {
                        if (this._child != null && this._child.parent == this) {
                            this._child.parent = null;
                            this._child.attachVisual(null);
                        }
                        this._child = value;
                        if (this._child != null) {
                            this._child.parent = this;
                            if (this._divElement != null)
                                this._child.attachVisual(this._divElement);
                        }
                        this.invalidateMeasure();
                    }
                },
                enumerable: true,
                configurable: true
            });
            ProgressIndicator.prototype.attachVisualOverride = function (elementContainer) {
                this._visual = this._divElement = document.createElement("div");
                if (this._child != null) {
                    this._child.attachVisual(this._divElement);
                }
                _super.prototype.attachVisualOverride.call(this, elementContainer);
            };
            ProgressIndicator.prototype.visualConnected = function (elementContainer) {
                kendo.ui.progress($(this._divElement), this.isBusy);
                _super.prototype.visualConnected.call(this, elementContainer);
            };
            ProgressIndicator.prototype.measureOverride = function (constraint) {
                var mySize = new layouts.Size();
                if (this._child != null) {
                    this._child.measure(constraint);
                    var childSize = this._child.desiredSize;
                    mySize.width = childSize.width;
                    mySize.height = childSize.height;
                }
                return mySize;
            };
            ProgressIndicator.prototype.arrangeOverride = function (finalSize) {
                var child = this._child;
                if (child != null) {
                    child.arrange(new layouts.Rect(0, 0, finalSize.width, finalSize.height));
                }
                return finalSize;
            };
            ProgressIndicator.prototype.layoutOverride = function () {
                _super.prototype.layoutOverride.call(this);
                if (this._child != null)
                    this._child.layout();
            };
            ProgressIndicator.prototype.onDependencyPropertyChanged = function (property, value, oldValue) {
                if (property == ProgressIndicator.isBusyProperty) {
                    kendo.ui.progress($(this._divElement), value);
                }
                _super.prototype.onDependencyPropertyChanged.call(this, property, value, oldValue);
            };
            Object.defineProperty(ProgressIndicator.prototype, "isBusy", {
                get: function () {
                    return this.getValue(ProgressIndicator.isBusyProperty);
                },
                set: function (value) {
                    this.setValue(ProgressIndicator.isBusyProperty, value);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(ProgressIndicator.prototype, "busyMessage", {
                get: function () {
                    return this.getValue(ProgressIndicator.busyMessageProperty);
                },
                set: function (value) {
                    this.setValue(ProgressIndicator.busyMessageProperty, value);
                },
                enumerable: true,
                configurable: true
            });
            ProgressIndicator.typeName = "app.controls.ProgressIndicator";
            ProgressIndicator.isBusyProperty = layouts.DepObject.registerProperty(ProgressIndicator.typeName, "IsBusy", false, layouts.FrameworkPropertyMetadataOptions.None);
            ProgressIndicator.busyMessageProperty = layouts.DepObject.registerProperty(ProgressIndicator.typeName, "Message", null, layouts.FrameworkPropertyMetadataOptions.None);
            return ProgressIndicator;
        }(layouts.FrameworkElement));
        controls.ProgressIndicator = ProgressIndicator;
    })(controls = app.controls || (app.controls = {}));
})(app || (app = {}));
//# sourceMappingURL=ProgressIndicator.js.map