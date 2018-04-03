import { Component, OnInit } from '@angular/core';
import { CadastroService } from './cadastro.service';
import { SuperComponentService } from '../../util/supercomponent/supercomponent.service';
import { Customer } from '../../viewmodel/customer/customer';
import { ToastyComponent } from '../toasty/toasty.component';
import { VariavelHolderService } from '../../util/holder/variavelholder.service';
import { SystemHolderService } from '../../util/holder/systemholder.service';

@Component({
    selector: 'cadastro-component',
    templateUrl: 'cadastro.component.html',
    styleUrls: ['cadastro.component.css'],
    providers: [CadastroService]
})

export class CadastroComponent extends SuperComponentService implements OnInit {

    public cadastro: Customer;

    private isLoading: boolean = false;

    constructor(public variavelHolderService: VariavelHolderService,
        private cadastroService: CadastroService,
        public toastyComponent: ToastyComponent,
        public systemHolderService: SystemHolderService) {
        super(toastyComponent, systemHolderService);
    }

    public ngOnInit() {
        super.disableresumoinfo();
        // Se cadastro não existe faz consulta -- Se existe pega da holder..
        this.doCadastro();
    }

    private doCadastro() {
        if (this.variavelHolderService.instancia) {
            this.variavelHolderService.instancia = this.variavelHolderService.instancia.trim();
            if (this.variavelHolderService.cadastro) {
                this.cadastro = this.variavelHolderService.cadastro;
            } else {
                if (this.variavelHolderService.instancia.length >= 10) {
                    if (this.systemHolderService.ableMock) {
                        this.getCadastroMock();
                    } else {
                        this.getCadastro();
                    }
                } else {
                    this.mountInstanciaInvalida();
                }
            }
        } else {
            this.mountInstanciaInvalida();
        }
    }

    private mountInstanciaInvalida() {
        super.callToasty("Ops, aconteceu algo.", "Por favor insira uma instância valida.", "warning", 5000);
    }

    private getCadastro() {
        this.isLoading = true;
        this.cadastroService
            .getCadastro(this.variavelHolderService.instancia)
            .then(resposta => {
                this.cadastro = resposta;
                if (super.ifIsCadastro(this.cadastro)) {
                    this.variavelHolderService.cadastro = this.cadastro;
                } else {
                    this.callAlert("alert-danger", "Atenção não existe informações de cadastro em nossas bases.");
                    this.systemHolderService.modalWizardCadastroIsOpen = true; // Validar...
                }
            }, erro => {
                this.callToasty("Ops, aconteceu algo.", erro.mError, "error", 5000);
            })
            .then(() => {
                this.isLoading = false;
            });
    }

    private getCadastroMock() {
        this.isLoading = true;
        setTimeout(() => {
            this.cadastro = this.cadastroService.getCadastroMock();
            if (super.ifIsCadastro(this.cadastro)) {
                this.variavelHolderService.cadastro = this.cadastro;
            }
            this.isLoading = false;
        }, 1000);
    }
}