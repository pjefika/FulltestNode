import { TemplateComponent } from './../template/template.component';
import { LoginComponent } from './../login/login.component';

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
    {
        path: '', redirectTo: 'fulltest/entrar', pathMatch: 'full'
    },
    {
        path: 'fulltest/entrar', component: LoginComponent
    },
    {
        path: 'fulltest', component: TemplateComponent
    }
    //Identificar NotFoundPage e mostrar na tela.
]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule { 
    
}