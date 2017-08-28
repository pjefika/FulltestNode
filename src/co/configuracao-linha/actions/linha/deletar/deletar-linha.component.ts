import { DeletarLinhaService } from './deletar-linha.service';
import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'deletar-linha-component',
    templateUrl: 'deletar-linha.component.html',
    styleUrls: ['deletar-linha.component.css'],
    providers: [DeletarLinhaService]
})

export class DeletarLinhaComponent implements OnInit {

    @Input() ativo: boolean = false;

    private abrirModal: boolean = false;

    constructor() { }

    ngOnInit() { }

    public deletarLinha() {

    }

}