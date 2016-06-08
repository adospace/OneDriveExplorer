
window.onload = () => {
    layouts.DepObject.logBindingTraceToConsole = true;
    //remove preloader
    document.body.removeChild(document.body.firstElementChild);

    var currentApp = layouts.Application.current;
    var usersManager = app.UserManager.current;

    currentApp["OriginalPageLocation"] = window.location.host;

    //define uri mappings
    currentApp.map("/login", "app/LoginView");//mapping is case sensitive
    currentApp.map("", "app/MainView");

    //fallback for unauthenticated users
    currentApp.onBeforeNavigate = (ctx) => {
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