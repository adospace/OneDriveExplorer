

module app {

    export class NavigationPath {

        constructor() {

        }

        private _items = new layouts.ObservableCollection<NavigationItem>();
        get items(): layouts.ObservableCollection<NavigationItem> {
            return this._items;
        }

        private _views = new layouts.ObservableCollection<FolderView>();
        get views(): layouts.ObservableCollection<FolderView> {
            return this._views;
        }

        navigateTo(item: NavigationItem, owner: MainViewModel) {

            var indexOfItem = this._items.elements.indexOf(item);
            if (indexOfItem != -1) {
                while (indexOfItem < this._items.count) {
                    this._items.remove(this._items[this.items.count - 1]);
                    this._views.remove(this._views[this._views.count - 1]);
                }
            }

            this._items.add(item);
            this._views.add(new FolderView(item, owner)); 
        }

        get path(): string {
            var path: string = null;
            this._items.forEach((item, index) => {
                if (path == null)
                    path = item.name;
                else
                    path += "\\" + item.name;
            });
            return path;
        }
    }
}