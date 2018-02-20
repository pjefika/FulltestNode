import { Injectable } from '@angular/core';
import { SystemHolderService } from './systemHolder.service';
import { VariavelHolderService } from './variavelholder.service';

@Injectable()
export class HolderResetService {

    constructor(public systemHolderService: SystemHolderService,
        public variavelHolderService: VariavelHolderService) { }


    public reset() {
        this.resetVariavelHolder();
        this.resetSystemHolder();
    }

    private resetVariavelHolder() {
        // this.variavelHolderService.instancia = null;
        this.variavelHolderService.cadastro = null;
        this.variavelHolderService.certification = null;
    }

    private resetSystemHolder() {

    }

}