module app {
    export class FolderView extends layouts.controls.UserControl {
        static typeName: string = "app.FolderView";
        get typeName(): string {
            return FolderView.typeName;
        }

        constructor(public item: NavigationItem, public owner: MainViewModel) {
            super();
            this.dataContext = this;
        }





        //static folderProperty = layouts.DepObject.registerProperty(FolderView.typeName, "Folder", 0, layouts.FrameworkPropertyMetadataOptions.None);
        //get folder(): NavigationItem {
        //    return <NavigationItem>this.getValue(FolderView.folderProperty);
        //}
        //set folder(value: NavigationItem) {
        //    this.setValue(FolderView.folderProperty, value);
        //}

    }
}