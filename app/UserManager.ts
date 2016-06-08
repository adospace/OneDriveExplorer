module app {

    declare function odauth(wasClicked : boolean);

    export class UserManager extends layouts.DepObject {
        static typeName: string = "app.UserManager";
        get typeName(): string {
            return UserManager.typeName;
        }

        constructor() {
            super();
            if (UserManager._current != null)
                throw new Error("UserManager already initialized");
            UserManager._current = this;
        }

        //singleton user manager
        private static _current: UserManager;
        //get user manager
        static get current(): UserManager {
            if (UserManager._current == null)
                UserManager._current = new UserManager();

            return UserManager._current;
        }

        private _token : string = null;
        public get AuthToken(): string {
            return this._token;
        }
        private setAuthToken(value: string) {
            this._token = value;
        }

        get logged(): boolean {
            return this._token != null;
        }

        private _isBusy: boolean;
        get isBusy(): boolean {
            return this._isBusy;
        }
        set isBusy(value: boolean) {
            if (this._isBusy != value) {
                var oldValue = this._isBusy;
                this._isBusy = value;
                this.onPropertyChanged("isBusy", value, oldValue);
            }
        }

        private _authenticatedInternalCallback: () => void;
        public login(completed: () => void) {

            this.isBusy = true;
            this._authenticatedInternalCallback = completed;

            odauth(true);

        }

        public onAuthenticated(token: string) {
            this.isBusy = false;

            this.setAuthToken(token);

            this._authenticatedInternalCallback();
        }

        public logout() {
            this.setAuthToken(null);
        }


    }

} 