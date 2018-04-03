import { Component, OnInit, Input } from '@angular/core';
import { Customer } from '../../../viewmodel/customer/customer';
import { Assert } from '../../../viewmodel/asserts/assert';
import { SystemHolderService } from '../../../util/holder/systemholder.service';

@Component({
    selector: 'cadastro-crm-view-component',
    templateUrl: 'cadastro-crm-view.component.html',
    styleUrls: ['cadastro-crm-view.component.css']
})

export class CadastroCrmViewComponent implements OnInit {

    @Input() public cadastro: Customer;

    private infoCadastro: boolean = false;
    private infoBloqueio: boolean = false;

    private validAssertFinish: boolean = false;

    constructor(public systemHolderService: SystemHolderService) { }

    public ngOnInit() {
        this.validAsserts();
        // console.log(this.cadastro);
    }

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

    public validAsserts() {
        let tbsradius: boolean = false;
        let circuito: boolean = false;
        this.cadastro.asserts.forEach(assert => {
            if (assert.asserts == "HAS_BLOQUEIO_RADIUS") {
                this.infoBloqueio = assert.value;
            }
            if (assert.asserts === "DIVERGENCIA_TBS_RADIUS") {
                tbsradius = assert.value;
            }
            if (assert.asserts === "CIRCUITO_ATIVO") {
                circuito = assert.value;
            }
        });

        if (!tbsradius && circuito) {
            this.infoCadastro = true;
        }

        this.validAssertFinish = true;
    }

}