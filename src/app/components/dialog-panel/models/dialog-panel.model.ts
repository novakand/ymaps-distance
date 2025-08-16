import { OverlayRef } from "@angular/cdk/overlay";

export class DialogDrawer<T = any> {
  constructor(
    public data: T,
    public overlayRef: OverlayRef
  ) { }
}
