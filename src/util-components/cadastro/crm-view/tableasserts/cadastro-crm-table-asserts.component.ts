import { Component, OnInit, Input } from '@angular/core';
import { Customer } from '../../../../viewmodel/customer/customer';
import { SystemHolderService } from '../../../../util/holder/systemholder.service';

@Component({
    selector: 'cadastro-crm-table-asserts-component',
    templateUrl: 'cadastro-crm-table-asserts.component.html'
})

export class CadastroCrmTableAssertsComponent implements OnInit {

    @Input() public cadastro: Customer;

    private infoCadastro: boolean = false;
    private infoBloqueio: boolean = false;

    private validAssertFinish: boolean = false;

    constructor(public systemHolderService: SystemHolderService) { }

    public ngOnInit() {
        this.validAsserts();
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