import { TemplateComponent } from './../../template/template.component';
import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'subnav-component',
    templateUrl: 'subnav.component.html',
    styleUrls: ['subnav.component.css']
})

export class SubnavComponent implements OnInit {
    constructor(private templateComponent: TemplateComponent) { }

    @Input() menus: [{ nome: string, component: string }];

    @Input() liberarSubNav: boolean = false;

    ngOnInit() { }

    abrecomponent(l) {
        if (this.liberarSubNav) {
            switch (l.component) {
                case "full-test-component":
                    this.templateComponent.createRealizaFulltestComponent();
                    break;
                case "cadastro-component":
                    this.templateComponent.createCadastroComponent();
                    break;
            }
        }
    }

}