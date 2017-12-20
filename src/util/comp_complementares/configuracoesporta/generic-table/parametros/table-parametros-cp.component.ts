import { Component, OnInit, Input } from '@angular/core';
import { HolderService } from 'util/holder/holder.service';

@Component({
    selector: 'table-parametros-cp-component',
    templateUrl: 'table-parametros-cp.component.html',
    styleUrls: ['table-parametros-cp.component.css']
})

export class TableParametrosCpComponent implements OnInit {

    @Input() public parametros: any;

    constructor(public holderService: HolderService) { }

    public ngOnInit() {        

    }



}