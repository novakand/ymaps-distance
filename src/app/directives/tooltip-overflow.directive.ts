import {
    AfterViewInit,
    booleanAttribute,
    Directive,
    ElementRef,
    HostListener,
    Input,
    NgZone,
    OnDestroy,
    TemplateRef,
    ViewContainerRef,
} from '@angular/core';
import { Tooltip, TooltipStyle } from 'primeng/tooltip';

@Directive({
    selector: '[tooltipOverflow]',
    standalone: true,
    providers: [TooltipStyle]
})
export class TooltipOverflowDirective extends Tooltip implements AfterViewInit, OnDestroy {

    private _originalEl: ElementRef;
    el: ElementRef;

    @Input({ transform: booleanAttribute }) showOnOverflowOnly: boolean = false;
    @Input() stickTo?: string;
    @Input('tooltipOverflow') content: string | TemplateRef<HTMLElement> | undefined;

    @Input('tooltipDisabled')
    get disabled(): boolean {
        return this._disabled as boolean;
    }
    set disabled(val: boolean) {
        this._disabled = val;
        this.deactivate();
    }

    constructor(
        el: ElementRef,
        viewContainer: ViewContainerRef,
        zone: NgZone
    ) {
        super(zone, viewContainer);
        this.el = el;
    }

    override ngAfterViewInit(): void {
        if (this.stickTo) {
      const handle = this.el.nativeElement.querySelector(this.stickTo);
      if (handle) {
        // «переназначаем» Tooltip на ручку слайдера
        this.el = new ElementRef(handle);
      }
    }
        super.ngAfterViewInit();
    }

    override ngOnDestroy(): void {
        super.ngOnDestroy();
    }

    @HostListener('mouseenter', ['$event'])
    onMouseEnter(e: MouseEvent) {
        if (this.showOnOverflowOnly && !this.isTextOverflowing()) return;
        super.onMouseEnter(e);
    }

    @HostListener('mouseleave', ['$event'])
    onMouseLeave(e: MouseEvent) {
        super.onMouseLeave(e);
    }

    private isTextOverflowing(): boolean {
        const element = this.el.nativeElement as HTMLElement;
        return element.scrollWidth > element.clientWidth;
    }

}
