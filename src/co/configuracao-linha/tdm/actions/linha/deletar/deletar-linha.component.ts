import { ToastyComponent } from './../../../../../../util/toasty/toasty.component';
import { HolderService } from './../../../../../../util/holder/holder.service';
import { CadastroLinha } from './../../../../../../viewmodel/cadastro-linha/cadastro-linha';
import { LinhaComponent } from './../linha.component';
import { ListarLinhaService } from './../../../general-services/listar-linha.service';
import { DeletarLinhaService } from './deletar-linha.service';
import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CallAlertService } from 'util/callalerts/call-alert.service';

@Component({
    selector: 'deletar-linha-component',
    templateUrl: 'deletar-linha.component.html',
    styleUrls: ['deletar-linha.component.css'],
    providers: [DeletarLinhaService, ListarLinhaService]
})

export class DeletarLinhaComponent extends CallAlertService implements OnInit, OnChanges {

    @Input() ativo: boolean = false;
    private abrirModal: boolean = false;
    private doActionSearching: boolean = false;
    private cadastroLinha: CadastroLinha;
    private nameBtnActionModal: string = "Sim";
    private delLinhaDisabled: boolean = false;

    constructor(
        private deletarLinhaService: DeletarLinhaService,
        private listarLinhaService: ListarLinhaService,
        public holderService: HolderService,
        public toastyComponent: ToastyComponent,
        private linhaComponent: LinhaComponent) { super(toastyComponent); }

    public ngOnInit() {
        // if (this.holderService.cadastro.linha.tipo === "NOT_CREATED") {
        //     this.delLinhaDisabled = true;
        // }
    }

    public ngOnChanges(changes: SimpleChanges) {
        if (changes.ativo.currentValue != changes.ativo.previousValue && changes.ativo.currentValue) {
            this.seeIfChange();
        }
    }

    private seeIfChange() {
        if (this.holderService.cadastro.linha.tipo === "NOT_CREATED") {
            super.callAlert(true, "alert-warning", "Linha já está deletada.");
            this.delLinhaDisabled = true;
        }
    }

    public deletarLinha() {
        this.doActionSearching = true;
        this.nameBtnActionModal = "Aguarde";
        this.deletarLinhaService.setDeletarLinha(this.holderService.cadastro.linha, this.holderService.cadastroLinha)
            .then(data => {
                this.cadastroLinha = data;
                this.holderService.cadastroLinha = this.cadastroLinha;
                if (this.cadastroLinha.status == "NOT_CREATED") {
                    super.callToasty("Linha Deletada com sucesso.", "Por favor realize a configuração da linha!", "success", 5000);
                    this.abrirModal = false;
                    this.linhaComponent.qualComando = "criar";
                    this.linhaComponent.comandoSelecionado();
                }
                this.doActionSearching = false;
                this.nameBtnActionModal = "Sim";
            }, error => {
                super.callToasty("Ops, aconteceu algo.", error.mError, "error", 5000);
                this.doActionSearching = false;
                this.nameBtnActionModal = "Sim";
            });
    }

}