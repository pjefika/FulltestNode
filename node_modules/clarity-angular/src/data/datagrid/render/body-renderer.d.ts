import { ElementRef, OnDestroy } from "@angular/core";
import { DatagridRenderOrganizer } from "./render-organizer";
import { DomAdapter } from "./dom-adapter";
export declare class DatagridBodyRenderer implements OnDestroy {
    private el;
    private organizer;
    private domAdapter;
    constructor(el: ElementRef, organizer: DatagridRenderOrganizer, domAdapter: DomAdapter);
    private subscription;
    ngOnDestroy(): void;
    private computeScrollbarWidth();
}
