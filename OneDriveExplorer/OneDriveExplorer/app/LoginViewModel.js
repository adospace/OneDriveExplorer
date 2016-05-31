var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var app;
(function (app) {
    var LoginViewModel = (function (_super) {
        __extends(LoginViewModel, _super);
        function LoginViewModel(view, returnUri) {
            _super.call(this);
            this.view = view;
            this.returnUri = returnUri;
            this._error = layouts.Consts.stringEmpty;
            this._formVisible = false;
        }
        Object.defineProperty(LoginViewModel.prototype, "typeName", {
            get: function () {
                return LoginViewModel.typeName;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(LoginViewModel.prototype, "error", {
            get: function () {
                return this._error;
            },
            set: function (value) {
                if (this._error != value) {
                    var oldValue = this._error;
                    this._error = value;
                    this.onPropertyChanged("error", value, oldValue);
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(LoginViewModel.prototype, "formVisible", {
            get: function () {
                return this._formVisible;
            },
            set: function (value) {
                if (this._formVisible != value) {
                    var oldValue = this._formVisible;
                    this._formVisible = value;
                    this.onPropertyChanged("formVisible", value, oldValue);
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(LoginViewModel.prototype, "loginCommand", {
            get: function () {
                var _this = this;
                if (this._loginCommand == null)
                    this._loginCommand = new layouts.Command(function (cmd, p) { return _this.onLogin(); }, function (cmd, p) { return _this.canLogin(); });
                return this._loginCommand;
            },
            enumerable: true,
            configurable: true
        });
        LoginViewModel.prototype.onLogin = function () {
            var _this = this;
            this.formVisible = false;
            app.UserManager.current.login(function () {
                if (app.UserManager.current.logged) {
                    layouts.Application.current.navigate(_this.returnUri != null ? _this.returnUri : "");
                }
                else {
                    _this.formVisible = true;
                    _this.error = "Unable to login, please verify your credentials and try again";
                }
            });
            //this.error = layouts.Consts.stringEmpty;
            //this.userManager.login(this._username, this._password, () => {
            //    if (this.userManager.logged) {
            //        layouts.Application.current.navigate(this.returnUri != null ? this.returnUri : "");
            //    }
            //    else {
            //        this.formVisible = true;
            //        this.error = "Unable to login, please verify your credentials and try again";
            //    }
            //});
        };
        LoginViewModel.prototype.canLogin = function () {
            return true;
        };
        Object.defineProperty(LoginViewModel.prototype, "userManager", {
            get: function () {
                return app.UserManager.current;
            },
            enumerable: true,
            configurable: true
        });
        LoginViewModel.typeName = "app.LoginViewModel";
        return LoginViewModel;
    }(layouts.DepObject));
    app.LoginViewModel = LoginViewModel;
})(app || (app = {}));
//# sourceMappingURL=LoginViewModel.js.map