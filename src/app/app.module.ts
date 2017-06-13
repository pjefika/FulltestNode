import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpModule }    from '@angular/http';
import { ClarityModule } from "clarity-angular";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { AppComponent } from './app.component';

import { TemplateComponent } from './template/template.component';
import { CadastroComponent } from './cadastro/cadastro.component';
import { DynamicComponent } from './dynamiccomponent/dynamic.component';
import { CadastroService } from './cadastro/cadastro.service';



@NgModule({
  declarations: [
    AppComponent,
    TemplateComponent,
    CadastroComponent,
    DynamicComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ClarityModule.forRoot(),
    BrowserAnimationsModule
  ],
  providers: [
    CadastroService
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
