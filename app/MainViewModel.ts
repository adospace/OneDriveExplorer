

module app {
    export class MainViewModel extends layouts.DepObject {
        static typeName: string = "app.MainViewModel";
        get typeName(): string {
            return MainViewModel.typeName;
        }

        constructor(public view: MainView) {
            super();
        }


    }
}