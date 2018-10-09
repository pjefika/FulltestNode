//Angular Imports
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
//Clarity Imports
import { ClarityModule } from 'clarity-angular';
//Rounting & App Configuration
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
//Componentes de Configurações
import { MomentModule } from 'angular2-moment';
import { ToastyModule } from 'ng2-toasty';
import { VariavelHolderService } from '../util/holder/variavelholder.service';
import { ObjKeysPipe, KeyBeautifyingPipe, Capitalize } from '../util/objpipe/objpipe.service';
import { Ng2OrderModule } from 'ng2-order-pipe'

import { RequestModule } from 'HttpEasyRequestForPostGet';

//Componentes do Sistema
import { TemplateComponent } from '../template/template.component';
import { LoginComponent } from '../login/login.component';
import { UtilService } from '../util/util.service';
import { SuperService } from '../util/superservice/super.service';
import { DynamicComponent } from '../util-components/dynamiccomponent/dynamic.component';
import { DynamicRouterComponent } from '../util-components/dynamicrouter/dynamic-router.component';
import { DynamicRouterService } from '../util-components/dynamicrouter/dynamic-router.service';
import { PrincipalComponent } from '../principal/principal.component';
import { PrincipalWizardComponent } from '../principal/wizard/principal-wizard.component';
import { ToggleComponent } from '../util-components/toggle/toggle.component';
import { GenericStackBlockComponent } from '../util-components/cadastro/co-view/generic-stack-block/generic-stack-block.component';
import { CadastroCoViewComponent } from '../util-components/cadastro/co-view/cadastro-co-view.component';
import { ToastyComponent } from '../util-components/toasty/toasty.component';
import { CadastroComponent } from '../util-components/cadastro/cadastro.component';
import { CadastroWizardComponent } from '../util-components/cadastro/wizard/cadastro-wizard.component';
import { AlertService } from '../util/alert/alert.service';
import { EnumService } from '../util/enum/enum.service';
import { SuperComponentService } from '../util/supercomponent/supercomponent.service';
import { LoadingComponent } from '../util-components/loading/loading.component';
import { SubnavComponent } from '../util-components/subnav/subnav.component';
import { FulltestComponent } from '../util-components/fulltest/fulltest.component';
import { InfoGeralFulltestComponent } from '../util-components/fulltest/infogeralfulltest/info-geral-fulltest.component';
import { InfoFulltestTableComponent } from '../util-components/fulltest/infofulltesttable/info-fulltest-table.component';
import { FulltestValidsComponent } from '../util-components/fulltest/validscomponentes/fulltest-valids.component';
import { FulltestConfiabilidadeRedeComponent } from '../util-components/fulltest/validscomponentes/confiabilidade-rede/fulltest-confiabilidade-rede.component';
import { AlertComponent } from '../util-components/alert/alert.component';
import { FulltestAutenticacaoBandaComponent } from '../util-components/fulltest/validscomponentes/autenticacao-banda/fulltest-autenticacao-banda.component';
import { FulltestParametrosComponent } from '../util-components/fulltest/validscomponentes/parametros/fulltest-parametros.component';
import { FulltestModulacaoComponent } from '../util-components/fulltest/validscomponentes/modulacao/fulltest-modulacao.component';
import { FulltestProfileComponent } from '../util-components/fulltest/validscomponentes/profile/fulltest-profile.component';
import { FulltestVlanComponent } from '../util-components/fulltest/validscomponentes/vlan/fulltest-vlan.component';
import { FulltestSerialOntOltComponent } from '../util-components/fulltest/validscomponentes/serialontolt/fulltest-serial-ont-olt.component';
import { ResumoInfosComponent } from '../util-components/resumoinfos/resumo-infos.component';
import { ConfiguracaoLinhaComponent } from '../util-components/configuracaolinha/configuracao-linha.component';
import { SidenavComponent } from '../util-components/sidenav/sidenav.component';
import { ConfiguracaoLinhaTdmComponent } from '../util-components/configuracaolinha/linha-tdm/configuracao-linha-tdm.component';
import { ConfiguracaoLinhaCustgroupComponent } from '../util-components/configuracaolinha/linha-tdm/acao/custgroup/configuracao-linha-custgroup.component';
import { ConfiguracaoLinhaNcosComponent } from '../util-components/configuracaolinha/linha-tdm/acao/ncos/configuracao-linha-ncos.component';
import { ConfiguracaoManobraLinhaComponent } from '../util-components/configuracaolinha/manobralinha/configuracao-manobra-linha.component';
import { ConfiguracaoLinhaCreateDeleteComponent } from '../util-components/configuracaolinha/linhacreatedelete/configuracao-linha-create-delete.component';
import { LinhaDeleteComponent } from '../util-components/configuracaolinha/linhacreatedelete/delete/linha-delete.component';
import { LinhaCreateComponent } from '../util-components/configuracaolinha/linhacreatedelete/create/linha-create.component';
import { ConfiguracaoServicosLinhaComponent } from '../util-components/configuracaolinha/servicos/configuracao-servicos-linha.component';
import { ConfiguracaoPortaComponent } from '../util-components/configuracaoporta/configuracao-porta.component';
import { ConfiguracaoPortaMetalicoComponent } from '../util-components/configuracaoporta/metalico/configuracao-porta-metalico.component';
import { ConfiguracaoEstadoPortaComponent } from '../util-components/configuracaoporta/validscomponentes/configuracao-estado-porta.component';
import { ConfiguracaoLinhaImsComponent } from '../util-components/configuracaolinha/linha-ims/configuracao-linha-ims.component';
import { AcsComponent } from '../util-components/acs/acs.component';
import { CadastroCrmViewComponent } from '../util-components/cadastro/crm-view/cadastro-crm-view.component';
import { CadastroCrmTableAssertsComponent } from '../util-components/cadastro/crm-view/tableasserts/cadastro-crm-table-asserts.component';
import { ValidadorManobraComponent } from '../util-components/validadormanobra/validador-manobra.component';
import { ValidadorInfoFulltestTableComponent } from '../util-components/validadormanobra/validadormanobrafulltestgeral/validador-info-fulltest-table.component';
import { ValidadorManobraFulltestTableComponent } from '../util-components/validadormanobra/validadormanobrafulltesttable/validador-manobra-fulltest-table.component';
import { ValidacoesManobraTableComponent } from '../util-components/validadormanobra/validacoesmanobratable/validacoes-manobra-table.component';
import { ConfiguracaoPortaGponComponent } from '../util-components/configuracaoporta/gpon/configuracao-porta-gpon.component';
import { LogListCertificationComponent } from '../util-components/loglistcertification/log-list-certification.component';
import { InfoDmComponent } from '../util-components/insertinfodm/info-dm.component';
import { SystemHolderService } from '../util/holder/systemholder.service';
import { ValidsTVComponent } from '../util-components/fulltest/validstv/valids-tv.component';
import { LogListManobraComponent } from '../util-components/loglistmanobra/log-list-manobra.component';

@NgModule({
	declarations: [
		/**
		* Aqui é adicionado os componentes do sistema.
		*/
		DynamicComponent, // Componente dinamico não mecher...
		DynamicRouterComponent, // Componente Router dinamico não mecher...
		AppComponent,
		TemplateComponent,
		LoginComponent,
		/**
		 * Pipes
		 */
		ObjKeysPipe,
		KeyBeautifyingPipe,
		Capitalize,
		/**
		 * Componentes que serão inseridos na tela.
		 */
		PrincipalComponent,
		AlertComponent,
		PrincipalWizardComponent,
		ToggleComponent,
		CadastroCoViewComponent,
		GenericStackBlockComponent,
		ToastyComponent,
		CadastroComponent,
		ResumoInfosComponent,
		CadastroWizardComponent,
		LoadingComponent,
		SubnavComponent,
		SidenavComponent,
		FulltestComponent,
		InfoGeralFulltestComponent,
		InfoFulltestTableComponent,
		FulltestValidsComponent,
		FulltestConfiabilidadeRedeComponent,
		FulltestAutenticacaoBandaComponent,
		FulltestParametrosComponent,
		FulltestModulacaoComponent,
		FulltestProfileComponent,
		FulltestVlanComponent,
		FulltestSerialOntOltComponent,
		ConfiguracaoLinhaComponent,
		ConfiguracaoLinhaTdmComponent,
		ConfiguracaoLinhaImsComponent,
		ConfiguracaoLinhaCustgroupComponent,
		ConfiguracaoLinhaNcosComponent,
		ConfiguracaoManobraLinhaComponent,
		ConfiguracaoLinhaCreateDeleteComponent,
		LinhaDeleteComponent,
		LinhaCreateComponent,
		ConfiguracaoServicosLinhaComponent,
		ConfiguracaoPortaComponent,
		ConfiguracaoPortaMetalicoComponent,
		ConfiguracaoEstadoPortaComponent,
		AcsComponent,
		CadastroCrmViewComponent,
		CadastroCrmTableAssertsComponent,
		ValidadorManobraComponent,
		ValidacoesManobraTableComponent,
		ConfiguracaoPortaGponComponent,
		LogListCertificationComponent,
		InfoDmComponent,

		ValidadorInfoFulltestTableComponent,
		ValidadorManobraFulltestTableComponent,

		ValidsTVComponent,
		LogListManobraComponent
	],
	imports: [
		/**
		* Aqui é para importar as configurações e componentes globais. \/ *Não mecher*
		*/
		BrowserModule,
		FormsModule,
		ReactiveFormsModule,
		HttpModule,
		ClarityModule.forRoot(),
		BrowserAnimationsModule,
		AppRoutingModule,
		MomentModule,
		ToastyModule.forRoot(),
		Ng2OrderModule,
		RequestModule
	],
	providers: [
		/**
		* Aqui ira as services globais do sistema
		*/
		VariavelHolderService,
		SystemHolderService,
		UtilService,
		SuperService,
		DynamicRouterService,
		AlertService,
		EnumService,
		SuperComponentService,
		ToastyComponent
	],
	bootstrap: [AppComponent],
	schemas: [CUSTOM_ELEMENTS_SCHEMA],
	entryComponents: [
		/**
		* Aqui vai os componetes que são chamados pelos arquivos .ts ou chamados por cód.
		*/
		PrincipalComponent,
		AlertComponent,
		CadastroComponent,
		CadastroCoViewComponent,
		GenericStackBlockComponent,
		LoadingComponent,
		SubnavComponent,
		SidenavComponent,
		FulltestComponent,
		InfoGeralFulltestComponent,
		InfoFulltestTableComponent,
		FulltestValidsComponent,
		FulltestConfiabilidadeRedeComponent,
		FulltestAutenticacaoBandaComponent,
		FulltestParametrosComponent,
		FulltestModulacaoComponent,
		FulltestProfileComponent,
		FulltestVlanComponent,
		FulltestSerialOntOltComponent,
		ResumoInfosComponent,
		ConfiguracaoLinhaComponent,
		ConfiguracaoManobraLinhaComponent,
		ConfiguracaoLinhaCreateDeleteComponent,
		LinhaDeleteComponent,
		LinhaCreateComponent,
		ConfiguracaoServicosLinhaComponent,
		ConfiguracaoPortaComponent,
		ConfiguracaoPortaMetalicoComponent,
		ConfiguracaoEstadoPortaComponent,
		CadastroCrmViewComponent,
		CadastroCrmTableAssertsComponent,
		ValidadorManobraComponent,
		ValidacoesManobraTableComponent,
		ConfiguracaoPortaGponComponent,
		LogListCertificationComponent,

		ValidadorInfoFulltestTableComponent,
		ValidadorManobraFulltestTableComponent,
		LogListManobraComponent
	]
})

export class AppModule { }
