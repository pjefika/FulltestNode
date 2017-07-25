import { ManobraService } from './../co/manobra/manobra.service';
import { PopoverService } from './../util/popover/popover.service';
import { PopoverComponent } from './../util/popover/popover.component';
import { ToggleComponent } from './../template/toggle/toggle.component';
import { AssocontService } from './../util/comp_complementares/assocont/assocont.service';
import { AssocontComponent } from './../util/comp_complementares/assocont/assocont.component';
import { ResetService } from './../util/comp_complementares/portreset/reset.service';
import { ResetComponent } from './../util/comp_complementares/portreset/reset.component';
import { ComplementaresComponent } from './../crm/complementares/complementares.component';
import { ComplementaresService } from './../crm/complementares/complementares.service';
import { FulltestCrmService } from './../crm/fulltestcrm/fulltestcrm.service';
import { FulltestService } from './../co/fulltest/fulltest.service';
import { FullltestCrmComponent } from './../crm/fulltestcrm/fulltestcrm.component';
import { ManobraComponent } from './../co/manobra/manobra.component';
import { FulltestComponent } from './../co/fulltest/fulltest.component';
import { CadastroCrmService } from './../crm/cadastrofulltestcrm/cadastrocrm.service';
import { CadastroService } from './../co/cadastro/cadastro.service';
import { CadastroCrmComponent } from './../crm/cadastrofulltestcrm/cadastrocrm.component';
import { CadastroWizardComponent } from './../co/cadastro/wizard/cadastro-wizard.component';
import { CadastroComponent } from './../co/cadastro/cadastro.component';
import { LogerService } from './../util/loger/loger.service';
import { AdmComponent } from './../adm/adm.component';
import { HolderService } from './../util/holder/holder.service';
import { AlertComponent } from './../util/alert/alert.component';
import { BrancoComponent } from './../branco/branco.component';
import { LoadingComponent } from './../util/loading/loading.component';
import { ToastyComponent } from './../util/toasty/toasty.component';
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
        ManobraComponent,
        AlertComponent,
        CadastroCrmComponent,
        FullltestCrmComponent,
        AdmComponent,
        PopoverComponent,
        ComplementaresComponent,
        ResetComponent,
        AssocontComponent,
        ToggleComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        ClarityModule.forRoot(),
        BrowserAnimationsModule,
        AppRoutingModule,
        MomentModule,
        ToastyModule.forRoot(),
    ],
    providers: [
        Util,
        LoginService,
        CadastroService,
        FulltestService,
        ToastyComponent,
        HolderService,
        CadastroCrmService,
        FulltestCrmService,
        AdmComponent,
        LogerService,
        PopoverService,
        ComplementaresService,
        ResetService,
        AssocontService,
        ManobraService
    ],
    bootstrap: [AppComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    entryComponents: [
        PrincipalComponent,
        FulltestComponent,
        CadastroComponent,
        BrancoComponent,
        CadastroCrmComponent,
        ComplementaresComponent,
        ManobraComponent
    ]
})
export class AppModule { }