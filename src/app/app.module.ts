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
import { SystemHolderService } from '../util/holder/systemHolder.service';
import { ObjKeysPipe, KeyBeautifyingPipe, Capitalize } from '../util/objpipe/objpipe.service';
import { Ng2OrderModule } from 'ng2-order-pipe'
//Componentes
import { TemplateComponent } from '../template/template.component';
import { LoginComponent } from '../login/login.component';
import { UtilService } from '../util/util.service';
import { UrlService } from '../util/urlservice/url.service';
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
		ConfiguracaoLinhaCustgroupComponent,
		ConfiguracaoLinhaNcosComponent
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
		Ng2OrderModule
	],
	providers: [
		/**
		* Aqui ira as services globais do sistema
		*/
		VariavelHolderService,
		SystemHolderService,
		UtilService,
		UrlService,
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
		ConfiguracaoLinhaComponent
	]
})

export class AppModule { }
