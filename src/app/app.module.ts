import { ToastyComponent } from './util/toasty/toasty.component';
import {ToastyModule} from 'ng2-toasty';
import { MomentModule } from 'angular2-moment';
import { AlertComponent } from './util/alert/alert.component';
import { LoadingComponent } from './util/loading/loading.component';
import { CadastroWizardComponent } from './cadastro/cadastro-wizard.component';
import { FulltestComponent } from './fulltest/fulltest.component';
import { FulltestService } from './fulltest/fulltest.service';
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
import { PrincipalComponent } from './principal/principal.component';

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
        LoginComponent,
        PrincipalComponent,
        FulltestComponent,
        CadastroWizardComponent,
        LoadingComponent,
        AlertComponent,
        ToastyComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        ClarityModule.forRoot(),
        BrowserAnimationsModule,
        AppRoutingModule,
        MomentModule,
        ToastyModule.forRoot()
    ],
    providers: [
        CadastroService,
        LoginService,
        FulltestService,
        Util
    ],
    bootstrap: [AppComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    entryComponents: [
        CadastroComponent,
        LoginComponent,
        PrincipalComponent,
        CadastroWizardComponent,
        LoadingComponent,
        AlertComponent,
        ToastyComponent
    ]
})

export class AppModule { }