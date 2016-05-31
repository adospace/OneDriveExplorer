var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var app;
(function (app) {
    var LoginView = (function (_super) {
        __extends(LoginView, _super);
        function LoginView() {
            _super.call(this);
        }
        Object.defineProperty(LoginView.prototype, "typeName", {
            get: function () {
                return LoginView.typeName;
            },
            enumerable: true,
            configurable: true
        });
        LoginView.prototype.onNavigate = function (context) {
            var viewModel = new app.LoginViewModel(this, context.returnUri);
            this.dataContext = viewModel;
            //var userManager = UserManager.current;
            //if (userManager.AuthToken != null)
            //    userManager.loadCurrentUser(() => {
            //        if (userManager.logged)
            //            layouts.Application.current.navigate(context.returnUri != null ? context.returnUri : "");
            //    });
            //else
            viewModel.formVisible = true;
        };
        LoginView.typeName = "app.LoginView";
        return LoginView;
    }(layouts.controls.Page));
    app.LoginView = LoginView;
})(app || (app = {}));
//# sourceMappingURL=LoginView.js.map