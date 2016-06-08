
module app {
    export class LoginView extends layouts.controls.Page {
        static typeName: string = "app.LoginView";
        get typeName(): string {
            return LoginView.typeName;
        }

        constructor() {
            super();
        }

        public onNavigate(context: layouts.controls.NavigationContext) {
            var viewModel = new LoginViewModel(this, context.returnUri);
            this.dataContext = viewModel;

            //var userManager = UserManager.current;
            //if (userManager.AuthToken != null)
            //    userManager.loadCurrentUser(() => {
            //        if (userManager.logged)
            //            layouts.Application.current.navigate(context.returnUri != null ? context.returnUri : "");
            //    });
            //else
                viewModel.formVisible = true;

        }

    }

}  