import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { SystemHolderService } from '../../util/holder/systemHolder.service';
import { Mensagem } from '../../viewmodel/alertmessage/mensagem';

@Component({
    selector: 'alert-component',
    templateUrl: 'alert.component.html',
    styleUrls: ['alert.component.css']
})

export class AlertComponent implements OnInit, OnChanges {

    @Input() public mensagem: Mensagem;
    @Input() public ativo: boolean = false;
    @Input() public closeable: boolean = true;

    constructor(public systemHolderService: SystemHolderService) { }

    public ngOnInit() { }

    public ngOnChanges(simpleChanges: SimpleChanges) {
        if (simpleChanges.mensagem) {
            if (simpleChanges.mensagem.currentValue != simpleChanges.mensagem.previousValue) {
                this.addMsg(simpleChanges.mensagem);
            }
        }
    }

    /**
     * adiciona mensagem ao local log de informações.
     */
    private addMsg(mensagem: any) {
        let now: number = Date.now();
        if (!this.systemHolderService.mensagemAntigas) {
            this.systemHolderService.mensagemAntigas = [mensagem]
        } else {
            this.systemHolderService.mensagemAntigas.push(mensagem);
        }
    }


}