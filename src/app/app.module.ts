import { AlertComponent } from './../util/alert/alert.component';
import { ManobraComponent } from './../manobra/manobra.component';
import { FulltestCrmService } from './../cadastrofulltestcrm/fulltestcrm.service';
import { FulltestCrmComponent } from './../cadastrofulltestcrm/fulltestcrm.component';
import { BrancoComponent } from './../branco/branco.component';
import { FulltestService } from './../fulltest/fulltest.service';
import { FulltestComponent } from './../fulltest/fulltest.component';
import { LoadingComponent } from './../util/loading/loading.component';
import { ToastyComponent } from './../util/toasty/toasty.component';
import { CadastroService } from './../cadastro/cadastro.service';
import { CadastroWizardComponent } from './../cadastro/wizard/cadastro-wizard.component';
import { CadastroComponent } from './../cadastro/cadastro.component';
import { PrincipalWizardComponent } from './../principal/wizard/principal-wizard.component';
import { PrincipalComponent } from './../principal/principal.component';
import { DynamicComponent } from './../dynamiccomponent/dynamic.component';
import { SidenavComponent } from './../util/sidenav/sidenav.component';
import { SubnavComponent } from './../util/subnav/subnav.component';
import { TemplateComponent } from './../template/template.component';
import { LoginService } from './../login/login.service';
import { Util } from './../util/util';
import { LoginComponent } from './../login/login.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { ClarityModule } from "clarity-angular";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MomentModule } from 'angular2-moment';
import { ToastyModule } from 'ng2-toasty';

import { AppComponent } from './app.component';

@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        TemplateComponent,
        SubnavComponent,
        SidenavComponent,
        DynamicComponent,
        PrincipalComponent,
        PrincipalWizardComponent,
        CadastroComponent,
        CadastroWizardComponent,
        LoadingComponent,
        FulltestComponent,
        ToastyComponent,
        BrancoComponent,
        FulltestCrmComponent,
        ManobraComponent,
        AlertComponent
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
        Util,
        LoginService,
        CadastroService,
        FulltestService,
        FulltestCrmService,
        ToastyComponent
    ],
    bootstrap: [AppComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    entryComponents: [
        PrincipalComponent,
        CadastroComponent,
        FulltestComponent,
        BrancoComponent,
        FulltestCrmComponent
    ]
})
export class AppModule { }