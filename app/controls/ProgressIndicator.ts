
module app.controls {
    export class ProgressIndicator extends layouts.FrameworkElement {
        static typeName: string = "app.controls.ProgressIndicator";
        get typeName(): string {
            return ProgressIndicator.typeName;
        }

        private _child: layouts.UIElement;
        get child(): layouts.UIElement {
            return this._child;
        }
        set child(value: layouts.UIElement) {
            if (this._child != value) {
                if (this._child != null && this._child.parent == this) {
                    this._child.parent = null;
                    this._child.attachVisual(null);
                }
                this._child = value;
                if (this._child != null) {
                    this._child.parent = this;
                    if (this._divElement != null)
                        this._child.attachVisual(this._divElement);
                }
                this.invalidateMeasure();
            }
        }

        protected _divElement: HTMLDivElement;
        attachVisualOverride(elementContainer: HTMLElement) {

            this._visual = this._divElement = document.createElement("div");

            if (this._child != null) {
                this._child.attachVisual(this._divElement);
            }
            super.attachVisualOverride(elementContainer);
        }

        protected visualConnected(elementContainer: HTMLElement): void {
            kendo.ui.progress($(this._divElement), this.isBusy);
            super.visualConnected(elementContainer);
        }

        protected measureOverride(constraint: layouts.Size): layouts.Size {
            var mySize = new layouts.Size();

            if (this._child != null) {
                this._child.measure(constraint);
                var childSize = this._child.desiredSize;

                mySize.width = childSize.width;
                mySize.height = childSize.height;
            }

            return mySize;
        }

        protected arrangeOverride(finalSize: layouts. Size): layouts.Size {
            var child = this._child;
            if (child != null) {
                child.arrange(new layouts.Rect(0, 0, finalSize.width, finalSize.height));
            }

            return finalSize;
        }

        protected layoutOverride() {
            super.layoutOverride();

            if (this._child != null)
                this._child.layout();
        }

        protected onDependencyPropertyChanged(property: layouts.DepProperty, value: any, oldValue: any) {
            if (property == ProgressIndicator.isBusyProperty) {
                kendo.ui.progress($(this._divElement), <boolean>value);
            }

            super.onDependencyPropertyChanged(property, value, oldValue);
        }

        static isBusyProperty = layouts.DepObject.registerProperty(ProgressIndicator.typeName, "IsBusy", false, layouts.FrameworkPropertyMetadataOptions.None);
        get isBusy(): boolean {
            return <boolean>this.getValue(ProgressIndicator.isBusyProperty);
        }
        set isBusy(value: boolean) {
            this.setValue(ProgressIndicator.isBusyProperty, value);
        }

        static busyMessageProperty = layouts.DepObject.registerProperty(ProgressIndicator.typeName, "Message", null, layouts.FrameworkPropertyMetadataOptions.None);
        get busyMessage(): boolean {
            return <boolean>this.getValue(ProgressIndicator.busyMessageProperty);
        }
        set busyMessage(value: boolean) {
            this.setValue(ProgressIndicator.busyMessageProperty, value);
        }

    }
}