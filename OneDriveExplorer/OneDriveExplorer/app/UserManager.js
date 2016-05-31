var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var app;
(function (app) {
    var UserManager = (function (_super) {
        __extends(UserManager, _super);
        function UserManager() {
            _super.call(this);
            this._token = null;
            if (UserManager._current != null)
                throw new Error("UserManager already initialized");
            UserManager._current = this;
        }
        Object.defineProperty(UserManager.prototype, "typeName", {
            get: function () {
                return UserManager.typeName;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(UserManager, "current", {
            //get user manager
            get: function () {
                if (UserManager._current == null)
                    UserManager._current = new UserManager();
                return UserManager._current;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(UserManager.prototype, "AuthToken", {
            get: function () {
                return this._token;
            },
            enumerable: true,
            configurable: true
        });
        UserManager.prototype.setAuthToken = function (value) {
            this._token = value;
        };
        Object.defineProperty(UserManager.prototype, "logged", {
            get: function () {
                return this._token != null;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(UserManager.prototype, "isBusy", {
            get: function () {
                return this._isBusy;
            },
            set: function (value) {
                if (this._isBusy != value) {
                    var oldValue = this._isBusy;
                    this._isBusy = value;
                    this.onPropertyChanged("isBusy", value, oldValue);
                }
            },
            enumerable: true,
            configurable: true
        });
        UserManager.prototype.login = function (completed) {
            this.isBusy = true;
            this._authenticatedInternalCallback = completed;
            odauth(true);
        };
        UserManager.prototype.onAuthenticated = function (token) {
            this.isBusy = false;
            this.setAuthToken(token);
            this._authenticatedInternalCallback();
        };
        UserManager.prototype.logout = function () {
            this.setAuthToken(null);
        };
        UserManager.typeName = "app.UserManager";
        return UserManager;
    }(layouts.DepObject));
    app.UserManager = UserManager;
})(app || (app = {}));
//# sourceMappingURL=UserManager.js.map