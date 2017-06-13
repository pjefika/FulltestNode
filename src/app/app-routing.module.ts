import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CadastroComponent } from './cadastro/cadastro.component';
import { LoginComponent } from './login/login.component';
import { TemplateComponent } from './template/template.component';

const routes: Routes = [
    {
        path: '', redirectTo: 'fulltest/entrar', pathMatch: 'full'
    },
    {
        path: 'fulltest', redirectTo: 'fulltest/entrar', pathMatch: 'full'
    },
    {
        path: 'fulltest/entrar', component: LoginComponent
    },
    {
        path: 'fulltest/inicio', component: TemplateComponent
    }
]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule { 
    
}