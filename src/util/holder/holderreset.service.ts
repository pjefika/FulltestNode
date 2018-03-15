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
        this.variavelHolderService.cadastro = null;
        this.variavelHolderService.certification = null;
        this.variavelHolderService.cadastroLinha = null;
        this.variavelHolderService.confPorta = null;
        this.variavelHolderService.equipamentos = null;
        this.variavelHolderService.certificationValidManobra = null;
        this.variavelHolderService.certificationValidManobraAnalitico = null;
        this.variavelHolderService.listCertifications = null;
    }

    private resetSystemHolder() {
        this.systemHolderService.jaPesquisouAcs = false;

    }

}