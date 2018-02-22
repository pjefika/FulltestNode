import { Injectable } from '@angular/core';
import { SystemHolderService } from '../util/holder/systemHolder.service';

@Injectable()
export class TemplateService {

    constructor(public systemHolderService: SystemHolderService) { }

    public setFalseMenus() {
        this.systemHolderService.subnavAtivo = false;
        this.systemHolderService.sideNavAtivo = false;
        // Colocar menus em false.
    }

}