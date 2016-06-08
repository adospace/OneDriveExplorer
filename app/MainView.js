var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var app;
(function (app) {
    var MainView = (function (_super) {
        __extends(MainView, _super);
        function MainView() {
            _super.call(this);
        }
        Object.defineProperty(MainView.prototype, "typeName", {
            get: function () {
                return MainView.typeName;
            },
            enumerable: true,
            configurable: true
        });
        MainView.prototype.onNavigate = function (context) {
            var viewModel = new app.MainViewModel(this);
            this.dataContext = viewModel;
        };
        MainView.typeName = "app.MainView";
        return MainView;
    }(layouts.controls.Page));
    app.MainView = MainView;
})(app || (app = {}));
//# sourceMappingURL=MainView.js.map