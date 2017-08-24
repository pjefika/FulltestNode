import { ConfiguracaoLinhaComponent } from './../../co/configuracao-linha/configuracao-linha.component';
import { HolderService } from './../holder/holder.service';
import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'sidenav-component',
    templateUrl: 'sidenav.component.html',
    styleUrls: ['sidenav.component.css'],
    providers: [ConfiguracaoLinhaComponent]
})

export class SidenavComponent implements OnInit {

    constructor(
        private configuracaoLinhaComponent: ConfiguracaoLinhaComponent,
        public holderService: HolderService) { }

    @Input() menus: [{ nome: string, component: string }];

    private howSideNavIsActive: string;

    ngOnInit() { }

    public abrecomponent(l) {
        if (this.holderService.liberarSideNav) {
            this.howSideNavIsActive = l.component;
            this.configuracaoLinhaComponents(l);
        }
    }

    private configuracaoLinhaComponents(l) {
        switch (l.component) {
            case "agrupamento-component":
                this.configuracaoLinhaComponent.createAgrupamentoComponent();
                break;
            case "custgroup-component":

                break;
            case "ncos-component":

                break;
            case "linha-component":

                break;
            case "servico-component":

                break;
            case "status-portas-component":

                break;
            case "manobrar-component":

                break;
            case "status-linha-component":

                break;
        }
    }

    public sideNavActive(l): Boolean {
        let active = false;
        if (l.component === this.howSideNavIsActive) {
            active = true;
        }
        return active;
    }
}