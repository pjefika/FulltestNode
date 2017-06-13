import { ClrResponsiveNavControlMessage } from "./clrResponsiveNavControlMessage";
import { Observable } from "rxjs/Observable";
export declare class ClrResponsiveNavigationService {
    responsiveNavList: number[];
    private registerNavSubject;
    private controlNavSubject;
    readonly registeredNavs: Observable<number[]>;
    readonly navControl: Observable<ClrResponsiveNavControlMessage>;
    constructor();
    registerNav(navLevel: number): void;
    isNavRegistered(navLevel: number): boolean;
    unregisterNav(navLevel: number): void;
    sendControlMessage(controlCode: string, navLevel: number): void;
    closeAllNavs(): void;
}
