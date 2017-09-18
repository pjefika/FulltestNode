import { element } from 'protractor';
import { HolderService } from './../../../../util/holder/holder.service';
import { ToastyComponent } from './../../../../util/toasty/toasty.component';
import { Servico } from './../../../../viewmodel/cadastro-linha/servicos';
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
    private listaDeServicosSelecionada: string[] = [];

    private nomeButton: string = "Alterar";
    private disableButton: boolean = false;

    constructor(
        private servicoLinhaService: ServicoLinhaService,
        private toastyComponent: ToastyComponent,
        public holderService: HolderService) { }

    ngOnInit() {
        //this.getServicos();
        this.listaDeServicos = this.holderService.listaDeServicos;
    }

    public getServicos() {
        this.servicoLinhaService.getServicos()
            .then(data => {
                this.listaDeServicos = data;
            }, error => {
                this.callToasty("Ops, aconteceu algo.", error.mError, "error", 10000);
            });
    }

    public validaServicosDoCliente(servico: Servico): boolean {
        let valid: boolean = false;
        this.holderService.cadastroLinha.servicos.forEach(element => {
            if (element.desc === servico.desc) {
                valid = true;
                if (this.listaDeServicosSelecionada.length === 0) {
                    this.atualizaListaDeServicos(servico.nome);
                }
            }
        });
        return valid;
    }

    public atualizaListaDeServicos(servico: string) {
        if (this.listaDeServicosSelecionada.indexOf(servico) === -1) {
            this.listaDeServicosSelecionada.push(servico);
        } else {
            let index: number = this.listaDeServicosSelecionada.indexOf(servico);
            this.listaDeServicosSelecionada.splice(index, 1);
        }
    }

    public setServicos() {
        this.nomeButton = "Alterando Serviços, Aguarde...";
        this.disableButton = true;
        this.servicoLinhaService.setEditarServicos(this.holderService.cadastro.linha, this.listaDeServicosSelecionada)
            .then(data => {
                this.holderService.cadastroLinha = data;
                this.nomeButton = "Alterar";
                this.disableButton = false;
                this.callToasty("Sucesso.", "Serviços Alterados com sucesso.", "success", 10000);
            }, error => {
                this.callToasty("Ops, aconteceu algo.", error.mError, "error", 10000);
                this.nomeButton = "Alterar";
                this.disableButton = false;
            });
    }

    private callToasty(titulo: string, msg: string, theme: string, timeout?: number) {
        this.toastyComponent.toastyInfo = {
            titulo: titulo,
            msg: msg,
            theme: theme
        }
        this.toastyComponent.addToasty();
    }

}