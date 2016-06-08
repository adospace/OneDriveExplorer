

module app {
    export class LoginViewModel extends layouts.DepObject {
        static typeName: string = "app.LoginViewModel";
        get typeName(): string {
            return LoginViewModel.typeName;
        }

        constructor(public view: app.LoginView, public returnUri: string) {
            super();
        }

        private _error: string = layouts.Consts.stringEmpty;
        get error(): string {
            return this._error;
        }
        set error(value: string) {
            if (this._error != value) {
                var oldValue = this._error;
                this._error = value;
                this.onPropertyChanged("error", value, oldValue);
            }
        }


        private _formVisible: boolean = false;
        get formVisible(): boolean {
            return this._formVisible;
        }
        set formVisible(value: boolean) {
            if (this._formVisible != value) {
                var oldValue = this._formVisible;
                this._formVisible = value;
                this.onPropertyChanged("formVisible", value, oldValue);
            }
        }

        private _loginCommand: layouts.Command;
        get loginCommand(): layouts.Command {
            if (this._loginCommand == null)
                this._loginCommand = new layouts.Command((cmd, p) => this.onLogin(), (cmd, p) => this.canLogin());
            return this._loginCommand;
        }

        onLogin() {
            this.formVisible = false;
            UserManager.current.login(() => {
                if (UserManager.current.logged) {
                    layouts.Application.current.navigate(this.returnUri != null ? this.returnUri : "");
                }
                else {
                    this.formVisible = true;
                    this.error = "Unable to login, please verify your credentials and try again";
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
        }

        canLogin(): boolean {
            return true;
        }


        get userManager(): UserManager {
            return UserManager.current;
        }
    }

}