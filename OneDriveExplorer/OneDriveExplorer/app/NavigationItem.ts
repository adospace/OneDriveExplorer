

module app {
    declare function filesize(size: number): string;

    export class NavigationItemModel {
        children: NavigationItemModel[];
        createdBy: { user: { displayName: string, id: string } };
        createdDateTime: Date;
        cTag: string;
        eTag: string;
        fileSystemInfo: { createDateTime: Date, lastModifiedDateTime: Date };
        folder: { childCount: number; };
        file: { hashes: { crc32Hash: string, sha1Hash: string }, mimeType: string }
        id: string;
        lastModifiedBy: { user: { displayName: string, id: string } };
        lastModifiedByDateTime: Date;
        name: string;
        size: number;
        webUrl: number;


    }

    export class NavigationItem extends layouts.DepObject {
        static typeName: string = "app.NavigationItem";
        get typeName(): string {
            return NavigationItem.typeName;
        }

        static Root = new NavigationItem(null, "root");

        constructor(public parent: NavigationItem, public name: string) {
            super();
            if (parent != null)
                parent._children.add(this);
        }

        private _children = new layouts.ObservableCollection<NavigationItem>();
        get children(): layouts.ObservableCollection<NavigationItem> {
            return this._children;
        }

        getPath(): string {
            if (this.parent == null)
                return "/";

            return this.parent.getPath() + this.name;
        }

        private _model: NavigationItemModel;
        get model(): NavigationItemModel {
            return this._model;
        }
        updateModel(value: NavigationItemModel) {
            if (this._model != value) {
                var oldValue = this._model;
                this._model = value;
                this.onPropertyChanged("model", value, oldValue);
            }
        }

        get friendlyName(): string {
            return this._model.name == "root" ? "Root" : this._model.name;
        }

        get hint(): string {
            return "{0} items, {1} - Last Modified {2}".format(this.children.count.toString(), this.sizeWithFormat, this.lastModifiedWithFormat);
        }

        get sizeWithFormat(): string {
            return filesize(this._model.size);
        }

        get createdWithFormat(): string {
            return moment(this._model.createdDateTime).calendar();
        }
        get lastModifiedWithFormat(): string {
            return moment(this._model.lastModifiedByDateTime).calendar();
        }

        get owner(): MainViewModel {
            return MainViewModel.Instance;
        }
    }


    export class FolderItem extends NavigationItem {
        static typeName: string = "app.FolderItem";
        get typeName(): string {
            return FolderItem.typeName;
        }

        constructor(public parent: NavigationItem, public name: string) {
            super(parent, name);
        }

    }

    export class FileItem extends NavigationItem {
        static typeName: string = "app.FileItem";
        get typeName(): string {
            return FileItem.typeName;
        }

        constructor(public parent: NavigationItem, public name: string) {
            super(parent, name);
        }



        get icon(): string {
            return "<i class=\"icons8-file\"></i>";
        }


    }

}