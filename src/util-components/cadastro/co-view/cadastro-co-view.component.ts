import { Component, OnInit, Input } from '@angular/core';
import { Customer } from '../../../viewmodel/customer/customer';
import { SystemHolderService } from '../../../util/holder/systemHolder.service';

@Component({
    selector: 'cadastro-co-view-component',
    templateUrl: 'cadastro-co-view.component.html'
})

export class CadastroCoViewComponent implements OnInit {

    @Input() public cadastro: Customer;

    constructor(public systemHolderService: SystemHolderService) { }

    public ngOnInit() { }

    public hasStackBlockDetail(obj: any) {
        if (obj.key == "rede" ||
            obj.key == "linha" ||
            obj.key == "radius" ||
            obj.key == "servicos") {
            return true
        }
        return false
    }

    public hasStackBlockAtAll(obj: any) {
        if (obj.key == "redeExterna" ||
            obj.key == "asserts" ||
            obj.key == "eventos") {
            return false
        }
        return true
    }

}