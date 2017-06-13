import { Component } from '@angular/core';

import { CadastroComponent } from '../cadastro/cadastro.component';

import { DynamicComponent } from '../dynamiccomponent/dynamic.component'


@Component({
  selector: 'template-full',
  templateUrl: 'template.component.html',
  styleUrls: ['template.component.css']
})

export class TemplateComponent {

  componentData = null;

  createCadastroComponent() {
    //console.log("entrou")
    this.componentData = {
      component: CadastroComponent,
      inputs: {
        showNum: 9
      }
    }
  }

}