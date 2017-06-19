import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { ClarityModule } from "clarity-angular";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { AppComponent } from './app.component';

import { TemplateComponent } from './template/template.component';
import { CadastroComponent } from './cadastro/cadastro.component';
import { DynamicComponent } from './dynamiccomponent/dynamic.component';
import { LoginComponent } from './login/login.component';

import { CadastroService } from './cadastro/cadastro.service';
import { LoginService } from './login/login.service';
import { Util } from './util/util';


import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [
    AppComponent,
    TemplateComponent,
    CadastroComponent,
    DynamicComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ClarityModule.forRoot(),
    BrowserAnimationsModule,
    AppRoutingModule
  ],
  providers: [
    CadastroService,
    LoginService,
    Util
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
