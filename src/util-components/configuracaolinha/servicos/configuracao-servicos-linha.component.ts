import { Component, OnInit } from '@angular/core';
import { SuperComponentService } from '../../../util/supercomponent/supercomponent.service';
import { ToastyComponent } from '../../toasty/toasty.component';
import { ConfiguracaoManobraLinhaService } from '../manobralinha/configuracao-manobra-linha.service';
import { VariavelHolderService } from '../../../util/holder/variavelholder.service';
import { DynamicRouterService } from '../../dynamicrouter/dynamic-router.service';
import { ConfiguracaoLinhaComponent } from '../configuracao-linha.component';
import { ConfiguracaoServicosLinhaService } from './configuracao-servicos-linha.service';
import { ServicoLinha } from '../../../viewmodel/linha/servicolinha';
import { FormGroup, FormBuilder, FormArray, FormControl } from '@angular/forms';
import { SystemHolderService } from '../../../util/holder/systemholder.service';

@Component({
    selector: 'configuracao-servicos-linha-component',
    templateUrl: 'configuracao-servicos-linha.component.html',
    styleUrls: ['configuracao-servicos-linha.component.css'],
    providers: [ConfiguracaoServicosLinhaService, ConfiguracaoManobraLinhaService]
})

export class ConfiguracaoServicosLinhaComponent extends SuperComponentService implements OnInit {

    private isLoading: boolean = false;

    private listaDeServicos: ServicoLinha[];

    private formServicosSelecionada: FormGroup;

    private btnSetServicoNome: string = "Alterar";
    private btnSetServicoDisabled: boolean = false;

    constructor(private configuracaoServicosLinhaService: ConfiguracaoServicosLinhaService,
        private configuracaoManobraLinhaService: ConfiguracaoManobraLinhaService,
        public toastyComponent: ToastyComponent,
        public systemHolderService: SystemHolderService,
        public variavelHolderService: VariavelHolderService,
        public dynamicRouterService: DynamicRouterService,
        private fb: FormBuilder) {
        super(toastyComponent, systemHolderService);
    }

    public ngOnInit() {
        this.validaLinha();
    }

    private validaLinha() {
        if (super.validaSeLinhaEstaCriada(this.variavelHolderService.cadastroLinha)) {
            this.getServicos();
        } else {
            super.callToasty("Ops, ocorreu um erro.", "Linha não está criada, por favor realize a criação da linha.", "error", 5000);
            this.dynamicRouterService.component = ConfiguracaoLinhaComponent;
        }
    }

    private veSeEstaCheck(servico: string): boolean {
        let valid = false;
        if (this.variavelHolderService.cadastroLinha) {
            this.variavelHolderService.cadastroLinha.servicos.forEach(element => {
                if (servico === element.nome) {
                    valid = true;
                }
            });
        }
        return valid;
    }

    private addandremoveservicefromlist(servico: string, action: boolean) {
        const servicosFormArray = <FormArray>this.formServicosSelecionada.controls.servicos;
        if (action) {
            servicosFormArray.push(new FormControl(servico));
        } else {
            let index = servicosFormArray.controls.findIndex(x => x.value == servico)
            servicosFormArray.removeAt(index);
        }
    }

    private atualizaListaDeServicos(servico: string, isChecked: boolean) {
        if (isChecked) {
            this.addandremoveservicefromlist(servico, true);
        } else {
            this.addandremoveservicefromlist(servico, false);
        }
    }

    private getServicos() {
        this.isLoading = true;
        this.configuracaoServicosLinhaService
            .getServicos()
            .then(resposta => {
                this.listaDeServicos = resposta;
            }, erro => {
                super.callToasty("Ops, ocorreu um erro.", erro.mError, "error", 5000);
            })
            .then(() => {
                this.isLoading = false;
                this.formServicosSelecionada = this.fb.group({
                    servicos: this.fb.array([])
                });
                this.validaServicosDoCliente();
            });
    }

    private validaServicosDoCliente() {
        this.variavelHolderService.cadastroLinha.servicos.forEach(elementA => {
            this.listaDeServicos.forEach(elementB => {
                if (elementA.nome === elementB.nome) {
                    this.addandremoveservicefromlist(elementA.nome, true);
                }
            });
        });
    }

    private setServicos() {
        console.log(this.listaDeServicos)
        console.log(this.formServicosSelecionada.value.servicos)
        this.btnSetServicoNome = "Aguarde...";
        this.btnSetServicoDisabled = true;
        let lstServSelect: any[] = [];
        let s: string[] = this.formServicosSelecionada.value.servicos
        this.listaDeServicos.forEach(x=>{
            if(s.includes(x.nome)){
                lstServSelect.push(x)
            }
        })

        this.configuracaoServicosLinhaService
            .setEditarServicos(this.variavelHolderService.cadastro, lstServSelect)
            .then(resposta => {
                this.variavelHolderService.cadastroLinha = resposta;
                super.callToasty("Sucesso.", "Serviços Alterados com sucesso.", "success", 5000);
                this.dynamicRouterService.component = ConfiguracaoLinhaComponent;
            }, erro => {
                super.callToasty("Ops, aconteceu algo.", erro.mError, "error", 5000);
            })
            .then(() => {
                this.btnSetServicoNome = "Alterar";
                this.btnSetServicoDisabled = false;
            });
    }

}