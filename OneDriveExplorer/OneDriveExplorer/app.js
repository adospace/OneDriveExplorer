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
window.onload = function () {
    layouts.DepObject.logBindingTraceToConsole = true;
    //remove preloader
    document.body.removeChild(document.body.firstElementChild);
    var currentApp = layouts.Application.current;
    var usersManager = app.UserManager.current;
    currentApp["OriginalPageLocation"] = window.location.host;
    //define uri mappings
    currentApp.map("/login", "app/LoginView"); //mapping is case sensitive
    currentApp.map("", "app/MainView");
    //fallback for unauthenticated users
    currentApp.onBeforeNavigate = function (ctx) {
        if (ctx.nextUri != "/login" &&
            !usersManager.logged) {
            ctx.cancel = true;
            ctx.returnUri = ctx.nextUri;
            //user must be logged in before go ahead
            ctx.nextUri = "/login";
        }
    };
    //navigate to main page
    currentApp.navigate();
};
function onAuthenticated(token, authWindow) {
    if (token) {
        if (authWindow) {
            authWindow.close();
        }
        app.UserManager.current.onAuthenticated(token);
    }
}
//# sourceMappingURL=app.js.map