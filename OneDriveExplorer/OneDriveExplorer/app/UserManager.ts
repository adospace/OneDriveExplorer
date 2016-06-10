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

        //auth_token=>EwCIAq1DBAAUGCCXc8wU/zFu9QnLdZXy+YnElFkAAS8vliDHxAi0odu3bsxOnCK0a3t0FWEhJ4eceuexGeNEmtwEzioj018f1pohkGaHlHFL/nNnwSJfd7QjUdNujHgQe0zgJbbyxHY4rtGhi1iJRfwl/RpnNcZEvpD/xGe5ydycn6mjZ9ilSPKHPK/oWbsQ8g64mBTEV+KrbS9dkwsQtE5EdJGh15fKk9/LvC+crIn7e0fVDr44R2i/5q8U07yghKhdmlcnPUh9bO+hVBmqGeXl9Jwg9b33Ha+wNctNjIww4RkmQ9uy15HTw+hp9aNsl9oQrDrAIrTc7ADjY8Q3rEhhhBCi3u+Ge+GQAid77TL31E9gskFNZzPs7S3quXkDZgAACDWd2gkQp/ulWAHfuNcY3iULGWdOUzHHEyBQkV2XPRe03bF4nzmg/Y+7tc9YEV92x5zqt6ATvIE4pJmB2gPa3q//3WAONhtpImNyK3CuchLbrKU+FEwA0Suse1LpDwK6w5c4tgTfdjyDr56L56LRhIxWgSfKOpKk7GHO1T3kYKnNWllS0r7Aa24WFhlMAfWdR6tuspyD5eYa0d/0qvobTIDMXCPFVJpXF7NnqzvpKKutGrozmuGMVqwlmmXqdc49DPlt/AgeC/8x53CLqt9nBMZc/jQMd4JeLoO8Y2dDE/PIbZPDuMcnmzXqKObT7h/XelWTvbnDAo5s/YdK33wnLngIcWN/gmzQ6qsI2vdDhutLBtdyh3eCz5J04cNXqgiPHyWB7uISlAYd0tUjubsypzRlG75VPqubDcZpn/fNiAWWIP+wQJDU96q2tWah/HSpcy7kqlLJCXnrdWv5koCeD2mT4mcB
        private _token: string;// = "EwCIAq1DBAAUGCCXc8wU/zFu9QnLdZXy+YnElFkAAS8vliDHxAi0odu3bsxOnCK0a3t0FWEhJ4eceuexGeNEmtwEzioj018f1pohkGaHlHFL/nNnwSJfd7QjUdNujHgQe0zgJbbyxHY4rtGhi1iJRfwl/RpnNcZEvpD/xGe5ydycn6mjZ9ilSPKHPK/oWbsQ8g64mBTEV+KrbS9dkwsQtE5EdJGh15fKk9/LvC+crIn7e0fVDr44R2i/5q8U07yghKhdmlcnPUh9bO+hVBmqGeXl9Jwg9b33Ha+wNctNjIww4RkmQ9uy15HTw+hp9aNsl9oQrDrAIrTc7ADjY8Q3rEhhhBCi3u+Ge+GQAid77TL31E9gskFNZzPs7S3quXkDZgAACDWd2gkQp/ulWAHfuNcY3iULGWdOUzHHEyBQkV2XPRe03bF4nzmg/Y+7tc9YEV92x5zqt6ATvIE4pJmB2gPa3q//3WAONhtpImNyK3CuchLbrKU+FEwA0Suse1LpDwK6w5c4tgTfdjyDr56L56LRhIxWgSfKOpKk7GHO1T3kYKnNWllS0r7Aa24WFhlMAfWdR6tuspyD5eYa0d/0qvobTIDMXCPFVJpXF7NnqzvpKKutGrozmuGMVqwlmmXqdc49DPlt/AgeC/8x53CLqt9nBMZc/jQMd4JeLoO8Y2dDE/PIbZPDuMcnmzXqKObT7h/XelWTvbnDAo5s/YdK33wnLngIcWN/gmzQ6qsI2vdDhutLBtdyh3eCz5J04cNXqgiPHyWB7uISlAYd0tUjubsypzRlG75VPqubDcZpn/fNiAWWIP+wQJDU96q2tWah/HSpcy7kqlLJCXnrdWv5koCeD2mT4mcB";
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