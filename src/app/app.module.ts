import { TemplateCOService } from './../template/util-service/template-co.service';
import { TemplateCrmService } from './../template/util-service/tempalte-crm.service';
import { TemplateService } from './../template/util-service/template.service';
import { HolderRouterComponent } from './../util/component-holder/holder-router.component';
import { HolderCompsService } from './../util/component-holder/services/holder-comps.service';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule, FormControl, FormGroup, FormArray, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MomentModule } from 'angular2-moment';
import { ClarityModule } from 'clarity-angular';
import { DndModule } from 'ng2-dnd';
import { ToastyModule } from 'ng2-toasty';
import { Ng2OrderModule } from 'ng2-order-pipe'

import { AdmComponent } from './../adm/adm.component';
import { BrancoComponent } from './../branco/branco.component';
import { CadastroComponent } from './../co/cadastro/cadastro.component';
import { CadastroService } from './../co/cadastro/cadastro.service';
import { CadastroWizardComponent } from './../co/cadastro/wizard/cadastro-wizard.component';
import { AgrupamentoComponent } from './../co/configuracao-linha/actions/agrupamento/agrupamento.component';
import { AtivarAgrupamentoComponent } from './../co/configuracao-linha/actions/agrupamento/ativar/ativar-agrupamento.component';
import { ConsultarAgrupamentoComponent } from './../co/configuracao-linha/actions/agrupamento/consultar/consultar-agrupamento.component';
import { DesativarAgrupamentoComponent } from './../co/configuracao-linha/actions/agrupamento/desativar/desativar-agrupamento.component';
import { CustgroupComponent } from './../co/configuracao-linha/actions/custgroup/custgroup.component';
import { CriarLinhaComponent } from './../co/configuracao-linha/actions/linha/criar/criar-linha.component';
import { DeletarLinhaComponent } from './../co/configuracao-linha/actions/linha/deletar/deletar-linha.component';
import { LinhaComponent } from './../co/configuracao-linha/actions/linha/linha.component';
import { ManobrarLinhaComponent } from './../co/configuracao-linha/actions/manobrar/manobrar-linha.component';
import { NcosComponent } from './../co/configuracao-linha/actions/ncos/ncos.component';
import { ServicoLinhaComponent } from './../co/configuracao-linha/actions/servico/servico-linha.component';
import { StatusLinhaComponent } from './../co/configuracao-linha/actions/status-linha/status-linha.component';
import { StatusPortaComponent } from './../co/configuracao-linha/actions/status-porta/status-porta.component';
import { ConfiguracaoLinhaComponent } from './../co/configuracao-linha/configuracao-linha.component';
import { ConfiguracaoLinhaService } from './../co/configuracao-linha/configuracao-linha.service';
import { FulltestComponent } from './../co/fulltest/fulltest.component';
import { FulltestService } from './../co/fulltest/fulltest.service';
import { ManobraComponent } from './../co/manobra/manobra.component';
import { ManobraService } from './../co/manobra/manobra.service';
import { CadastroCrmComponent } from './../crm/cadastrofulltestcrm/cadastrocrm.component';
import { CadastroCrmService } from './../crm/cadastrofulltestcrm/cadastrocrm.service';
import { ComplementaresComponent } from './../crm/complementares/complementares.component';
import { ComplementaresService } from './../crm/complementares/complementares.service';
import { FullltestCrmComponent } from './../crm/fulltestcrm/fulltestcrm.component';
import { FulltestCrmService } from './../crm/fulltestcrm/fulltestcrm.service';
import { DynamicComponent } from './../dynamiccomponent/dynamic.component';
import { LoginComponent } from './../login/login.component';
import { LoginService } from './../login/login.service';
import { PrincipalComponent } from './../principal/principal.component';
import { PrincipalWizardComponent } from './../principal/wizard/principal-wizard.component';
import { TemplateComponent } from './../template/template.component';
import { ToggleComponent } from './../template/toggle/toggle.component';
import { NotFoundComponent } from './../util/404notfound/notfound.component';
import { AlertComponent } from './../util/alert/alert.component';
import { AssocontComponent } from './../util/comp_complementares/assocont/assocont.component';
import { AssocontService } from './../util/comp_complementares/assocont/assocont.service';
import { FulltestTableComponent } from './../util/comp_complementares/fulltest_table/fulltest-table.component';
import { PopoverComponent } from './../util/comp_complementares/popover/popover.component';
import { ResetComponent } from './../util/comp_complementares/portreset/reset.component';
import { ResetService } from './../util/comp_complementares/portreset/reset.service';
import { HolderService } from './../util/holder/holder.service';
import { LoadingComponent } from './../util/loading/loading.component';
import { LogerService } from './../util/loger/loger.service';
import { SidenavComponent } from './../util/sidenav/sidenav.component';
import { SubnavComponent } from './../util/subnav/subnav.component';
import { TableCadastroComponent } from './../util/table-cadastro/table-cadastro.component';
import { ToastyComponent } from './../util/toasty/toasty.component';
import { UrlService } from './../util/url-service/url.service';
import { Util } from './../util/util';
import { AppRoutingModule } from './app-routing.module';
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
        ToggleComponent,
        FulltestTableComponent,
        NotFoundComponent,
        TableCadastroComponent,
        ConfiguracaoLinhaComponent,
        AgrupamentoComponent,
        ConsultarAgrupamentoComponent,
        AtivarAgrupamentoComponent,
        DesativarAgrupamentoComponent,
        CustgroupComponent,
        LinhaComponent,
        ManobrarLinhaComponent,
        NcosComponent,
        ServicoLinhaComponent,
        StatusLinhaComponent,
        StatusPortaComponent,
        CriarLinhaComponent,
        DeletarLinhaComponent,
        HolderRouterComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        HttpModule,
        ClarityModule.forRoot(),
        BrowserAnimationsModule,
        AppRoutingModule,
        MomentModule,
        ToastyModule.forRoot(),
        DndModule.forRoot(),
        Ng2OrderModule
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
        ComplementaresService,
        ResetService,
        AssocontService,
        ManobraService,
        UrlService,
        ConfiguracaoLinhaService,
        HolderCompsService,
        TemplateService,
        TemplateCrmService,
        TemplateCOService
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
        ManobraComponent,
        ConfiguracaoLinhaComponent,
        AgrupamentoComponent,
        CustgroupComponent,
        LinhaComponent,
        ManobrarLinhaComponent,
        NcosComponent,
        ServicoLinhaComponent,
        StatusLinhaComponent,
        StatusPortaComponent,
    ]
})
export class AppModule { }