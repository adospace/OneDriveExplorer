var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var app;
(function (app) {
    var MainViewModel = (function (_super) {
        __extends(MainViewModel, _super);
        function MainViewModel(view) {
            _super.call(this);
            this.view = view;
        }
        Object.defineProperty(MainViewModel.prototype, "typeName", {
            get: function () {
                return MainViewModel.typeName;
            },
            enumerable: true,
            configurable: true
        });
        MainViewModel.typeName = "app.MainViewModel";
        return MainViewModel;
    }(layouts.DepObject));
    app.MainViewModel = MainViewModel;
})(app || (app = {}));
//# sourceMappingURL=MainViewModel.js.map