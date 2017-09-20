import { LinhaComponent } from './../linha.component';
import { Len } from './../../../../../viewmodel/cadastro-linha/len';
import { TemplateComponent } from './../../../../../template/template.component';
import { ToastyComponent } from './../../../../../util/toasty/toasty.component';
import { CadastroLinha } from './../../../../../viewmodel/cadastro-linha/cadastro-linha';
import { HolderService } from './../../../../../util/holder/holder.service';
import { ListarLinhaService } from './../../../general-services/listar-linha.service';
import { DeletarLinhaService } from './deletar-linha.service';
import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'deletar-linha-component',
    templateUrl: 'deletar-linha.component.html',
    styleUrls: ['deletar-linha.component.css'],
    providers: [DeletarLinhaService, ListarLinhaService]
})

export class DeletarLinhaComponent implements OnInit {

    @Input() ativo: boolean = false;
    private abrirModal: boolean = false;
    private doActionSearching: boolean = false;
    private cadastroLinha: CadastroLinha;
    private nameBtnActionModal: string = "Sim";

    constructor(
        private deletarLinhaService: DeletarLinhaService,
        private listarLinhaService: ListarLinhaService,
        public holderService: HolderService,
        private toastyComponent: ToastyComponent,
        private linhaComponent: LinhaComponent) { }

    ngOnInit() { }

    public deletarLinha() {
        this.doActionSearching = true;
        this.nameBtnActionModal = "Aguarde";
        this.deletarLinhaService.setDeletarLinha(this.holderService.cadastro.linha, this.holderService.cadastroLinha)
            .then(data => {
                this.cadastroLinha = data;
                if (this.cadastroLinha.status == "NOT_CREATED") {
                    this.callToasty("Linha Deletada com sucesso.", "Por favor realize a configuração da linha!", "success", 5000);
                    this.abrirModal = false;
                    this.linhaComponent.qualComando = "criar";
                    this.linhaComponent.comandoSelecionado();
                }
                this.doActionSearching = false;
                this.nameBtnActionModal = "Sim";
            }, error => {
                this.callToasty("Ops, aconteceu algo.", error.mError, "error", 5000);
                this.doActionSearching = false;
                this.nameBtnActionModal = "Sim";
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

}