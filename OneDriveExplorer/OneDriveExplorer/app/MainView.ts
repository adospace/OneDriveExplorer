module app {
    export class MainView extends layouts.controls.Page {
        static typeName: string = "app.MainView";
        get typeName(): string {
            return MainView.typeName;
        }

        constructor() {
            super();
        }

        public onNavigate(context: layouts.controls.NavigationContext) {
            var viewModel = new MainViewModel(this);
            this.dataContext = viewModel;



        }

    }
}
