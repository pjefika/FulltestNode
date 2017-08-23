import { HolderService } from './../holder/holder.service';
import { TemplateComponent } from './../../template/template.component';
import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'sidenav-component',
    templateUrl: 'sidenav.component.html',
    styleUrls: ['sidenav.component.css']
})

export class SidenavComponent implements OnInit {

    constructor(
        private templateComponent: TemplateComponent,
        public holderService: HolderService) { }

    @Input() menus: [{ nome: string, component: string }];

    private howSideNavIsActive: string;

    ngOnInit() { }

    public abrecomponent(l) {
        if (this.holderService.liberarSideNav) {
            this.howSideNavIsActive = l.component;
            switch (l.component) {
                case "agrupamento-component":


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
    }

    sideNavActive(l): Boolean {
        let active = false;
        if (l.component === this.howSideNavIsActive) {
            active = true;
        }
        return active;
    }
}