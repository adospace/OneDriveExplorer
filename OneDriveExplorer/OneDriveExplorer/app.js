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
    var FolderView = (function (_super) {
        __extends(FolderView, _super);
        function FolderView(item, owner) {
            _super.call(this);
            this.item = item;
            this.owner = owner;
            this.dataContext = this;
        }
        Object.defineProperty(FolderView.prototype, "typeName", {
            get: function () {
                return FolderView.typeName;
            },
            enumerable: true,
            configurable: true
        });
        FolderView.typeName = "app.FolderView";
        return FolderView;
    }(layouts.controls.UserControl));
    app.FolderView = FolderView;
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
            this._leftMenuWidth = 250;
            this._oldLeftMenuWidth = 250;
            this._paths = new layouts.ObservableCollection();
            MainViewModel.Instance = this;
            this.navigateToItem(app.NavigationItem.Root);
        }
        Object.defineProperty(MainViewModel.prototype, "typeName", {
            get: function () {
                return MainViewModel.typeName;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MainViewModel.prototype, "leftMenuWidth", {
            get: function () {
                return this._leftMenuWidth;
            },
            set: function (value) {
                if (this._leftMenuWidth != value) {
                    var oldValue = this._leftMenuWidth;
                    this._leftMenuWidth = value;
                    this._oldLeftMenuWidth = value;
                    this.onPropertyChanged("leftMenuWidth", value, oldValue);
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MainViewModel.prototype, "isBusy", {
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
        Object.defineProperty(MainViewModel.prototype, "toggleMenuCommand", {
            get: function () {
                var _this = this;
                if (this._toggleMenuCommand == null)
                    this._toggleMenuCommand = new layouts.Command(function (cmd, p) { return _this.onToggleMenu(); }, function (cmd, p) { return true; });
                return this._toggleMenuCommand;
            },
            enumerable: true,
            configurable: true
        });
        MainViewModel.prototype.onToggleMenu = function () {
            if (this._leftMenuWidth > 48) {
                var dummy = this._leftMenuWidth;
                this.leftMenuWidth = 48;
                this._oldLeftMenuWidth = dummy;
            }
            else
                this.leftMenuWidth = this._oldLeftMenuWidth;
        };
        Object.defineProperty(MainViewModel.prototype, "currentPath", {
            get: function () {
                return this._currentPath;
            },
            set: function (value) {
                if (this._currentPath != value) {
                    var oldValue = this._currentPath;
                    this._currentPath = value;
                    this.onPropertyChanged("currentPath", value, oldValue);
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MainViewModel.prototype, "paths", {
            get: function () {
                return this._paths;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MainViewModel.prototype, "navigateToItemCommand", {
            get: function () {
                var _this = this;
                if (this._navigateToItemCommand == null)
                    this._navigateToItemCommand = new layouts.Command(function (cmd, p) { return _this.navigateToItem(p); }, function (cmd, p) { return true; });
                return this._navigateToItemCommand;
            },
            enumerable: true,
            configurable: true
        });
        MainViewModel.prototype.navigateToItem = function (item) {
            var _this = this;
            var odurl = "https://api.onedrive.com/v1.0/drive/root{0}?expand=children&access_token={1}".format(item.parent == null ? "" : ":" + item.getPath() + ":", app.UserManager.current.AuthToken);
            this.isBusy = true;
            $.ajax({
                type: "GET",
                url: odurl,
                dataType: 'json',
                headers: {},
                success: function (itemModel) {
                    item.updateModel(itemModel);
                    itemModel.children.forEach(function (childItemModel, index) {
                        var childItem = childItemModel.folder != null ? new app.FolderItem(item, childItemModel.name) : new app.FileItem(item, childItemModel.name);
                        childItem.updateModel(childItemModel);
                    });
                    if (_this.currentPath == null) {
                        var newPath = new app.NavigationPath();
                        newPath.navigateTo(item, _this);
                        _this._paths.add(newPath);
                        _this.currentPath = newPath;
                    }
                    else
                        _this.currentPath.navigateTo(item, _this);
                },
                error: function (jqXHR, textStatus, err) {
                    //alert("Unable to get application details");
                },
                complete: function () {
                    _this.isBusy = false;
                }
            });
        };
        MainViewModel.typeName = "app.MainViewModel";
        return MainViewModel;
    }(layouts.DepObject));
    app.MainViewModel = MainViewModel;
})(app || (app = {}));
var app;
(function (app) {
    var NavigationItemModel = (function () {
        function NavigationItemModel() {
        }
        return NavigationItemModel;
    }());
    app.NavigationItemModel = NavigationItemModel;
    var NavigationItem = (function (_super) {
        __extends(NavigationItem, _super);
        function NavigationItem(parent, name) {
            _super.call(this);
            this.parent = parent;
            this.name = name;
            this._children = new layouts.ObservableCollection();
            if (parent != null)
                parent._children.add(this);
        }
        Object.defineProperty(NavigationItem.prototype, "typeName", {
            get: function () {
                return NavigationItem.typeName;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(NavigationItem.prototype, "children", {
            get: function () {
                return this._children;
            },
            enumerable: true,
            configurable: true
        });
        NavigationItem.prototype.getPath = function () {
            if (this.parent == null)
                return "/";
            return this.parent.getPath() + this.name;
        };
        Object.defineProperty(NavigationItem.prototype, "model", {
            get: function () {
                return this._model;
            },
            enumerable: true,
            configurable: true
        });
        NavigationItem.prototype.updateModel = function (value) {
            if (this._model != value) {
                var oldValue = this._model;
                this._model = value;
                this.onPropertyChanged("model", value, oldValue);
            }
        };
        Object.defineProperty(NavigationItem.prototype, "friendlyName", {
            get: function () {
                return this._model.name == "root" ? "Root" : this._model.name;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(NavigationItem.prototype, "hint", {
            get: function () {
                return "{0} items, {1} - Last Modified {2}".format(this.children.count.toString(), this.sizeWithFormat, this.lastModifiedWithFormat);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(NavigationItem.prototype, "sizeWithFormat", {
            get: function () {
                return filesize(this._model.size);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(NavigationItem.prototype, "createdWithFormat", {
            get: function () {
                return moment(this._model.createdDateTime).calendar();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(NavigationItem.prototype, "lastModifiedWithFormat", {
            get: function () {
                return moment(this._model.lastModifiedByDateTime).calendar();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(NavigationItem.prototype, "owner", {
            get: function () {
                return app.MainViewModel.Instance;
            },
            enumerable: true,
            configurable: true
        });
        NavigationItem.typeName = "app.NavigationItem";
        NavigationItem.Root = new NavigationItem(null, "root");
        return NavigationItem;
    }(layouts.DepObject));
    app.NavigationItem = NavigationItem;
    var FolderItem = (function (_super) {
        __extends(FolderItem, _super);
        function FolderItem(parent, name) {
            _super.call(this, parent, name);
            this.parent = parent;
            this.name = name;
        }
        Object.defineProperty(FolderItem.prototype, "typeName", {
            get: function () {
                return FolderItem.typeName;
            },
            enumerable: true,
            configurable: true
        });
        FolderItem.typeName = "app.FolderItem";
        return FolderItem;
    }(NavigationItem));
    app.FolderItem = FolderItem;
    var FileItem = (function (_super) {
        __extends(FileItem, _super);
        function FileItem(parent, name) {
            _super.call(this, parent, name);
            this.parent = parent;
            this.name = name;
        }
        Object.defineProperty(FileItem.prototype, "typeName", {
            get: function () {
                return FileItem.typeName;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FileItem.prototype, "icon", {
            get: function () {
                return "<i class=\"icons8-file\"></i>";
            },
            enumerable: true,
            configurable: true
        });
        FileItem.typeName = "app.FileItem";
        return FileItem;
    }(NavigationItem));
    app.FileItem = FileItem;
})(app || (app = {}));
var app;
(function (app) {
    var NavigationPath = (function () {
        function NavigationPath() {
            this._items = new layouts.ObservableCollection();
            this._views = new layouts.ObservableCollection();
        }
        Object.defineProperty(NavigationPath.prototype, "items", {
            get: function () {
                return this._items;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(NavigationPath.prototype, "views", {
            get: function () {
                return this._views;
            },
            enumerable: true,
            configurable: true
        });
        NavigationPath.prototype.navigateTo = function (item, owner) {
            var indexOfItem = this._items.elements.indexOf(item);
            if (indexOfItem != -1) {
                while (indexOfItem < this._items.count) {
                    this._items.remove(this._items[this.items.count - 1]);
                    this._views.remove(this._views[this._views.count - 1]);
                }
            }
            this._items.add(item);
            this._views.add(new app.FolderView(item, owner));
        };
        Object.defineProperty(NavigationPath.prototype, "path", {
            get: function () {
                var path = null;
                this._items.forEach(function (item, index) {
                    if (path == null)
                        path = item.name;
                    else
                        path += "\\" + item.name;
                });
                return path;
            },
            enumerable: true,
            configurable: true
        });
        return NavigationPath;
    }());
    app.NavigationPath = NavigationPath;
})(app || (app = {}));
var app;
(function (app) {
    var UserManager = (function (_super) {
        __extends(UserManager, _super);
        function UserManager() {
            _super.call(this);
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
            console.debug("auth_token=>{0}".format(value));
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
    //redirect to debug
    if (window.location.href.indexOf("https://79.33.4.122") != 0) {
        window.location.href = "https://79.33.4.122/OneDriveExplorer";
        return;
    }
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