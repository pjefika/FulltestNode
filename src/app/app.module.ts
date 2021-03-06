import { AppLevelAlertComponent } from './../util/applevelalert/applevelalert.component';
import { DynamicRouterComponent } from './../util/dynamic-router/dynamic-router.component';
import { DynamicRouterHolderService } from './../util/dynamic-router/dynamic-router-holder.service';
import { ErrorLogComponent } from './../util/error-log/error-log.component';
import { TableAuxSerialComponent } from './../util/comp_complementares/configuracoesporta/gpon/table-aux-serial/table-aux-serial.component';
import { ConfiguracaoLinhaImsComponent } from './../co/configuracao-linha/ims/configuracao-linha-ims.component';
import { ConfiguracaoLinhaTdmComponent } from './../co/configuracao-linha/tdm/configuracao-linha-tdm.component';
import { DeletarLinhaComponent } from './../co/configuracao-linha/tdm/actions/linha/deletar/deletar-linha.component';
import { CriarLinhaComponent } from './../co/configuracao-linha/tdm/actions/linha/criar/criar-linha.component';
import { StatusPortaComponent } from './../co/configuracao-linha/tdm/actions/status-porta/status-porta.component';
import { StatusLinhaComponent } from './../co/configuracao-linha/tdm/actions/status-linha/status-linha.component';
import { ServicoLinhaComponent } from './../co/configuracao-linha/tdm/actions/servico/servico-linha.component';
import { NcosComponent } from './../co/configuracao-linha/tdm/actions/ncos/ncos.component';
import { ManobrarLinhaComponent } from './../co/configuracao-linha/tdm/actions/manobrar/manobrar-linha.component';
import { LinhaComponent } from './../co/configuracao-linha/tdm/actions/linha/linha.component';
import { CustgroupComponent } from './../co/configuracao-linha/tdm/actions/custgroup/custgroup.component';
import { DesativarAgrupamentoComponent } from './../co/configuracao-linha/tdm/actions/agrupamento/desativar/desativar-agrupamento.component';
import { AtivarAgrupamentoComponent } from './../co/configuracao-linha/tdm/actions/agrupamento/ativar/ativar-agrupamento.component';
import { ConsultarAgrupamentoComponent } from './../co/configuracao-linha/tdm/actions/agrupamento/consultar/consultar-agrupamento.component';
import { AgrupamentoComponent } from './../co/configuracao-linha/tdm/actions/agrupamento/agrupamento.component';
import { ConfiguracoesPortaGponComponent } from './../util/comp_complementares/configuracoesporta/gpon/configuracoes-porta-gpon.component';
import { ConfiguracoesPortaMetalicoComponent } from './../util/comp_complementares/configuracoesporta/metalico/configuracoes-porta-metalico.component';
import { ConfiguracoesPortaComponent } from './../util/comp_complementares/configuracoesporta/configuracoesporta.component';
import { TemplateGeralService } from './../template/util-service/template-geral.service';
import { TemplateCOService } from './../template/util-service/template-co.service';
import { TemplateCrmService } from './../template/util-service/tempalte-crm.service';
import { TemplateService } from './../template/util-service/template.service';
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

import { ConfiguracaoLinhaComponent } from './../co/configuracao-linha/configuracao-linha.component';
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
import { AcsComponent } from 'util/comp_complementares/acs/acs.component';
import { TableValidacoesComponent } from 'util/table-validacoes/table-validacoes.component';
import { ResumoInfosComponent } from 'util/resumoinfos/resumo-infos.component';
import { TableParametrosCpComponent } from 'util/comp_complementares/configuracoesporta/generic-table/parametros/table-parametros-cp.component';
import { TableEstadoPortaCpComponent } from 'util/comp_complementares/configuracoesporta/generic-table/estado-porta/table-estado-porta-cp.component';
import { TableLanCpComponent } from 'util/comp_complementares/configuracoesporta/generic-table/lan/table-lan-cp.component';
import { TableProfileCpComponent } from 'util/comp_complementares/configuracoesporta/generic-table/profile/table-profile-cp.component';
import { InfosDmComponent } from 'util/comp_complementares/infos-dm/infos-dm.component';

import { EnumService } from 'util/comp_complementares/enum.service';
import { CentraisNortelComponent } from 'util/comp_complementares/centrais-nortel/centrais-nortel.component';
import { InfoTecnicasComponent } from 'co/info-tecnicas/info-tecnicas.component';
import { EventoMassivoComponent } from 'util/comp_complementares/evento-massivo/evento-massivo.component';

import { ChartsModule } from 'ng2-charts';
import { ChartsComponent } from 'util/comp_complementares/charts/charts.component';
import { TableModulacaoCpComponent } from 'util/comp_complementares/configuracoesporta/generic-table/modulacao/table-modulacao-cp.component';

import { ConfiabRedeCpComponent } from 'util/comp_complementares/configuracoesporta/generic-table/confiab-rede/confiab-rede-cp.component';

import { AuthBandaComponent } from 'util/comp_complementares/configuracoesporta/generic-table/auth-banda/auth-banda-cp.component';
import { ProfileViewCpComponent } from 'util/comp_complementares/configuracoesporta/generic-table/profile-view/profile-view-cp.component';
import { VlanViewCpComponent } from 'util/comp_complementares/configuracoesporta/generic-table/vlan-view/vlan-view-cp.component';
import { ParametrosViewCpComponent } from 'util/comp_complementares/configuracoesporta/generic-table/parametros-view/parametros-view-cp.component';
import { GenericValidComponent } from 'util/comp_complementares/configuracoesporta/generic-table/generic-valid/generic-valid.component';
import { GenericStackBlockComponent } from 'co/cadastro/generic-stack-block/generic-stack-block.component';
import { ObjKeysPipe, KeyBeautifyingPipe, Capitalize } from 'util/obj-pipe/obj-pipe-service';
import { ListCertificationComponentComponent } from 'util/list-certification/list-certification.component';

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
        ConfiguracoesPortaComponent,
        ConfiguracoesPortaMetalicoComponent,
        ConfiguracoesPortaGponComponent,
        ConfiguracaoLinhaTdmComponent,
        ConfiguracaoLinhaImsComponent,
        TableAuxSerialComponent,
        ErrorLogComponent,
        DynamicRouterComponent,
        AppLevelAlertComponent,
        AcsComponent,
        TableValidacoesComponent,
        ResumoInfosComponent,
        TableParametrosCpComponent,
        TableEstadoPortaCpComponent,
        TableLanCpComponent,
        TableProfileCpComponent,
        InfosDmComponent,
        CentraisNortelComponent,
        ChartsComponent,
        InfoTecnicasComponent,
        EventoMassivoComponent,
        TableModulacaoCpComponent,
        ConfiabRedeCpComponent,
        GenericValidComponent,
        AuthBandaComponent,
        ProfileViewCpComponent,
        VlanViewCpComponent,
        ParametrosViewCpComponent,
        GenericStackBlockComponent,
        ObjKeysPipe,
        KeyBeautifyingPipe,
        Capitalize,
        ListCertificationComponentComponent
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
        Ng2OrderModule,
        ChartsModule
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
        TemplateService,
        TemplateCrmService,
        TemplateCOService,
        TemplateGeralService,
        DynamicRouterHolderService
    ],
    bootstrap: [AppComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    entryComponents: [
        PrincipalComponent,
        FulltestComponent,
        CadastroComponent,
        InfoTecnicasComponent,
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
        ConfiguracoesPortaComponent
    ]
})
export class AppModule { }