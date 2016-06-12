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

        //auth_token=>EwCIAq1DBAAUGCCXc8wU/zFu9QnLdZXy+YnElFkAAeWrSBcGgdJujhwAepsd94j/3zfoXq6/kVH03fgL0VUbDml5boLW/sJh2jfoGTbZbzwmd1iUpWG5r2rJIEvddjCzGjfkcfucqgSuAJ1RsvvDPITKti5yWScLi+s5qMInueugwB5tp0Nb6I/EgEgqf/ztcc0C/s78RFyY0LKvkJTFsEzY0io3ANFVljsvUVpH7Qti+1EpawAr3bXqLkmCb7hLiY/8M9xRT1//1BDBrFfimg1KxcULyot14u7uYRvM1nf5idXBwL5FbpOTSwVrXhyzMi+TK6Y67bRm+lBH3+sMTUxqTIXxOsDrp8dedA1beTure41CzdFOSTTUYzFrvFADZgAACLIc5VL7QCv8WAEfmpwIs00nSz5b9+vy0zACWjvCIkxcnzWzdeylSceTnFPgeJfC1RfiPLPttE5gBcBu2DoYaKOi9GYIsNGOegA99m0TEjBlEWQLALVfTARfCnQyXCM/bmmL0MCbdIZmOgtISRhTYpztUXHEgRRKRlb9GcSD0uLsWXO/uTEq0ikV92h8btZDdBnU083SvQpigB1ph8jkJFvZqKGE7J9h2YJikPqv88Lmn9O2JaHTvPQX2svrv58M8gfXY0m4V9TbN6p+wdXpZ5aQ5x8nmMrYJg4kS7RN20QjQ23kqlMC9SabItVLLNj6HZCEx4aNc+ZsJBHF4i+e48/YqVxiqhj71gFsERH8hwIXZG+dSkZ10OZXNfvwrWaTybQORhQ81aQr+AP9cOFipGoDLQbLJeFr4R2ZgUQ10RCg+w6YhVQTF1HR7RIJ+0Nq3QrO6yNMfeiiJHxX+WYlaCrm7GcB
        private _token: string = "EwCIAq1DBAAUGCCXc8wU/zFu9QnLdZXy+YnElFkAAeWrSBcGgdJujhwAepsd94j/3zfoXq6/kVH03fgL0VUbDml5boLW/sJh2jfoGTbZbzwmd1iUpWG5r2rJIEvddjCzGjfkcfucqgSuAJ1RsvvDPITKti5yWScLi+s5qMInueugwB5tp0Nb6I/EgEgqf/ztcc0C/s78RFyY0LKvkJTFsEzY0io3ANFVljsvUVpH7Qti+1EpawAr3bXqLkmCb7hLiY/8M9xRT1//1BDBrFfimg1KxcULyot14u7uYRvM1nf5idXBwL5FbpOTSwVrXhyzMi+TK6Y67bRm+lBH3+sMTUxqTIXxOsDrp8dedA1beTure41CzdFOSTTUYzFrvFADZgAACLIc5VL7QCv8WAEfmpwIs00nSz5b9+vy0zACWjvCIkxcnzWzdeylSceTnFPgeJfC1RfiPLPttE5gBcBu2DoYaKOi9GYIsNGOegA99m0TEjBlEWQLALVfTARfCnQyXCM/bmmL0MCbdIZmOgtISRhTYpztUXHEgRRKRlb9GcSD0uLsWXO/uTEq0ikV92h8btZDdBnU083SvQpigB1ph8jkJFvZqKGE7J9h2YJikPqv88Lmn9O2JaHTvPQX2svrv58M8gfXY0m4V9TbN6p+wdXpZ5aQ5x8nmMrYJg4kS7RN20QjQ23kqlMC9SabItVLLNj6HZCEx4aNc+ZsJBHF4i+e48/YqVxiqhj71gFsERH8hwIXZG+dSkZ10OZXNfvwrWaTybQORhQ81aQr+AP9cOFipGoDLQbLJeFr4R2ZgUQ10RCg+w6YhVQTF1HR7RIJ+0Nq3QrO6yNMfeiiJHxX+WYlaCrm7GcB";
        public get AuthToken(): string {
            return this._token;
        }
        private setAuthToken(value: string) {
            this._token = value;
            console.debug("auth_token=>{0}".format(value));
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