

module app {
    export class MainViewModel extends layouts.DepObject {
        static typeName: string = "app.MainViewModel";
        get typeName(): string {
            return MainViewModel.typeName;
        }

        static Instance: MainViewModel;

        constructor(public view: MainView) {
            super();

            MainViewModel.Instance = this;

            this.navigateToItem(NavigationItem.Root);
        }

        private _leftMenuWidth: number = 250;
        private _oldLeftMenuWidth: number = 250;
        get leftMenuWidth(): number {
            return this._leftMenuWidth;
        }
        set leftMenuWidth(value: number) {
            if (this._leftMenuWidth != value) {
                var oldValue = this._leftMenuWidth;
                this._leftMenuWidth = value;
                this._oldLeftMenuWidth = value
                this.onPropertyChanged("leftMenuWidth", value, oldValue);
            }
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

        private _toggleMenuCommand: layouts.Command;
        get toggleMenuCommand(): layouts.Command {
            if (this._toggleMenuCommand == null)
                this._toggleMenuCommand = new layouts.Command((cmd, p) => this.onToggleMenu(), (cmd, p) => true);
            return this._toggleMenuCommand;
        }

        onToggleMenu() {
            if (this._leftMenuWidth > 48) {
                var dummy = this._leftMenuWidth;
                this.leftMenuWidth = 48;
                this._oldLeftMenuWidth = dummy;
            }
            else
                this.leftMenuWidth = this._oldLeftMenuWidth;
        }

        private _currentPath: NavigationPath;
        get currentPath(): NavigationPath {
            return this._currentPath;
        }
        set currentPath(value: NavigationPath) {
            if (this._currentPath != value) {
                var oldValue = this._currentPath;
                this._currentPath = value;
                this.onPropertyChanged("currentPath", value, oldValue);
            }
        }

        private _paths = new layouts.ObservableCollection<NavigationPath>();
        get paths(): layouts.ObservableCollection<NavigationPath> {
            return this._paths;
        }


        private _navigateToItemCommand: layouts.Command;
        get navigateToItemCommand(): layouts.Command {
            if (this._navigateToItemCommand == null)
                this._navigateToItemCommand = new layouts.Command((cmd, p) => this.navigateToItem(p), (cmd, p) => true);
            return this._navigateToItemCommand;
        }

        navigateToItem(item: NavigationItem) {
            
            var odurl = "https://api.onedrive.com/v1.0/drive/root{0}?expand=children&access_token={1}".format(item.parent == null ? "" : ":" + encodeURIComponent(item.getPath()) + ":", UserManager.current.AuthToken);
            console.log(odurl);

            this.isBusy = true;

            $.ajax
                ({
                    type: "GET",
                    url: odurl,
                    dataType: 'json',
                    headers: {
                    },
                    success: (itemModel: NavigationItemModel) => {

                        item.updateModel(itemModel);

                        itemModel.children.forEach((childItemModel, index) => {
                            var childItem = childItemModel.folder != null ? new FolderItem(item, childItemModel.name) : new FileItem(item, childItemModel.name);
                            childItem.updateModel(childItemModel);
                        });

                        if (this.currentPath == null) {
                            var newPath = new NavigationPath();
                            newPath.navigateTo(item, this);
                            this._paths.add(newPath);
                            this.currentPath = newPath;
                        }
                        else
                            this.currentPath.navigateTo(item, this);


                    },
                    error: (jqXHR, textStatus, err) => {

                        //alert("Unable to get application details");
                    },
                    complete: () => {

                        this.isBusy = false;
                    }
                });

        }
    }
}