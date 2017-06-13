import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CadastroComponent } from './cadastro/cadastro.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
    {
        path: '', redirectTo: '/fulltest/entrar', pathMatch: 'full'
    },
    {
        path: 'fulltest', redirectTo: '/fulltest/entrar', pathMatch: 'full'
    },
    {
        path: 'fulltest/entrar', component: LoginComponent
    },
    {
        path: 'fulltest/cadastro', component: CadastroComponent
    }
]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule { 
    
}