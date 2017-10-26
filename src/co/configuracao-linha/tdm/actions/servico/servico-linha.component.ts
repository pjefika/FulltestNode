import { DynamicRouterHolderService } from './../../../../../util/dynamic-router/dynamic-router-holder.service';
import { ConfiguracaoLinhaComponent } from './../../../configuracao-linha.component';
import { HolderService } from './../../../../../util/holder/holder.service';
import { ToastyComponent } from './../../../../../util/toasty/toasty.component';
import { Servico } from './../../../../../viewmodel/cadastro-linha/servicos';
import { FormGroup, FormBuilder, FormArray, FormControl } from '@angular/forms';
import { element } from 'protractor';;
import { ServicoLinhaService } from './servico-linha.service';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'servico-linha-component',
    templateUrl: 'servico-linha.component.html',
    styleUrls: ['servico-linha.component.css'],
    providers: [ServicoLinhaService]
})

export class ServicoLinhaComponent implements OnInit {

    private toggleComando: boolean;

    private listaDeServicos: Servico[];

    private formServicosSelecionada: FormGroup;
    private listaDeServicosSelecionada: string[] = [];

    private nomeButton: string = "Alterar";
    private disableButton: boolean = false;

    public alertMsg: {
        msg: string;
        alertType: string;
    }
    public alertAtivo: boolean = false;
    public alertCloseable: boolean = true;

    private showServicos: boolean = true;

    constructor(
        private servicoLinhaService: ServicoLinhaService,
        private toastyComponent: ToastyComponent,
        public holderService: HolderService,
        private fb: FormBuilder,
        public dynamicRouterHolderService: DynamicRouterHolderService) { }

    ngOnInit() {
        this.listaDeServicos = this.holderService.listaDeServicos;
        this.formServicosSelecionada = this.fb.group({
            servicos: this.fb.array([])
        });
        this.validaServicosDoCliente();
        if (this.holderService.cadastroLinha.status === "NOT_CREATED") {
            this.callAlert("A linha não está criada, realize a criação da mesma no Menu Linha > Criar Linha.", "alert-warning");
            this.showServicos = false;
        }
    }

    public validaServicosDoCliente() {
        this.holderService.cadastroLinha.servicos.forEach(elementA => {
            this.listaDeServicos.forEach(elementB => {
                if (elementA.nome === elementB.nome) {
                    this.addandremoveservicefromlist(elementA.nome, true);
                }
            });
        });
    }

    public seeifchecked(servico: string): boolean {
        let valid = false;
        this.holderService.cadastroLinha.servicos.forEach(element => {
            if (servico === element.nome) {
                valid = true;
            }
        });
        return valid;
    }

    public atualizaListaDeServicos(servico: string, isChecked: boolean) {
        if (isChecked) {
            this.addandremoveservicefromlist(servico, true);
        } else {
            this.addandremoveservicefromlist(servico, false);
        }
    }

    public addandremoveservicefromlist(servico: string, action: boolean) {
        const servicosFormArray = <FormArray>this.formServicosSelecionada.controls.servicos;
        if (action) {
            servicosFormArray.push(new FormControl(servico));
        } else {
            let index = servicosFormArray.controls.findIndex(x => x.value == servico)
            servicosFormArray.removeAt(index);
        }
    }

    public setServicos() {
        let lstServSelect = this.formServicosSelecionada.value.servicos;
        this.nomeButton = "Alterando Serviços, Aguarde...";
        this.disableButton = true;
        this.servicoLinhaService.setEditarServicos(this.holderService.cadastro, lstServSelect)
            .then(data => {
                this.holderService.cadastroLinha = data;
                this.nomeButton = "Alterar";
                this.disableButton = false;
                this.callToasty("Sucesso.", "Serviços Alterados com sucesso.", "success", 5000);
                this.dynamicRouterHolderService.component = ConfiguracaoLinhaComponent;
            }, error => {
                this.callToasty("Ops, aconteceu algo.", error.mError, "error", 5000);
                this.nomeButton = "Alterar";
                this.disableButton = false;
            });
    }

    private callToasty(titulo: string, msg: string, theme: string, timeout?: number) {
        this.toastyComponent.toastyInfo = {
            titulo: titulo,
            msg: msg,
            theme: theme,
            timeout: timeout
        }
        this.toastyComponent.addToasty();
    }

    public callAlert(msg, type) {
        this.alertMsg = {
            msg: msg,
            alertType: type
        }
        this.alertAtivo = true;
        this.alertCloseable = false;
    }

}