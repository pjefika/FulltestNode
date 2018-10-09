import { Component, OnInit, Input } from '@angular/core';
import { ValidsTVService } from './valids-tv.service';
import { SuperComponentService } from '../../../util/supercomponent/supercomponent.service';
import { ToastyComponent } from '../../toasty/toasty.component';
import { SystemHolderService } from '../../../util/holder/systemholder.service';
import { VariavelHolderService } from '../../../util/holder/variavelholder.service';
import { Block } from '../../../viewmodel/block/block';

@Component({
    selector: 'valids-tv-component',
    templateUrl: 'valids-tv.component.html',
    styleUrls: ['valids-tv.component.css'],
    providers: [ValidsTVService]
})

export class ValidsTVComponent extends SuperComponentService implements OnInit {

    public isLoading: boolean = false;
    public whatisloading: string;

    public blockTv: Block;

    constructor(private validsTVService: ValidsTVService,
        public toastyComponent: ToastyComponent,
        public systemHolderService: SystemHolderService,
        public variavelHolderService: VariavelHolderService) {
        super(toastyComponent, systemHolderService);
    }

    public ngOnInit() {

    }

    public docertification() {
        if (this.systemHolderService.ableMock) {
            this.doSetCertificationCOnewTVMock();
        } else {
            // this.doSetCertificationCOnewTVMock();
            this.doSetCertificationCOnewTV();
        }
    }

    private doSetCertificationCOnewTV() {
        this.isLoading = true;
        this.whatisloading = "Realizando teste HPNA";
        this.validsTVService
            .setcertificationbyid(this.variavelHolderService.cadastro, this.variavelHolderService.certification.id)
            .then(resposta => {
                this.variavelHolderService.certificationTV = resposta;
            }, error => {
                super.callToasty("Ops, Aconteceu algo.", error.mError, "error", 10000);
            })
            .then(() => {
                this.getinfoblocktv();
            });
    }

    private doSetCertificationCOnewTVMock() {
        this.isLoading = true;
        this.whatisloading = "Realizando teste HPNA";
        this.validsTVService
            .setcertificationbyidMock()
            .then(resposta => {
                this.variavelHolderService.certificationTV = resposta;
            }, error => {
                super.callToasty("Ops, Aconteceu algo.", error.mError, "error", 10000);
            })
            .then(() => {
                this.getinfoblocktv();
            });
    }

    public getinfoblocktv() {
        this.variavelHolderService.certificationTV.blocks.forEach(b => {
            if (b.nome.name === "HPNA") {
                this.blockTv = b;
            }
        });
        this.isLoading = false;
    }
}