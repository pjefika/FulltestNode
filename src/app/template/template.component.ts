import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Util } from '../util/util';
import { CadastroComponent } from '../cadastro/cadastro.component';
import { TestComponent } from '../test/test.component';
import { DynamicComponent } from '../dynamiccomponent/dynamic.component'


@Component({
  selector: 'template-full',
  templateUrl: 'template.component.html',
  styleUrls: ['template.component.css']
})

export class TemplateComponent implements OnInit {

  constructor(private router: Router, private util: Util) { }

  componentData = null;

  ngOnInit(): void {
    this.util.isLogado().then((result: boolean) => {
      if (!result) {
        this.router.navigate(['./fulltest/entrar']);
      }
    })
  }

  sair(): void {
    sessionStorage.clear();
    this.router.navigate(['./fulltest/entrar']);
  }

  createCadastroComponent() {
    this.componentData = {
      component: CadastroComponent,
      inputs: {
        input: 0
      }
    }
  }

  createFulltestComponent() {
    this.componentData = {
      component: TestComponent,
      inputs: {
        input: 1
      }
    }
  }
}