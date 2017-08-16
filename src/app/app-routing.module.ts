import { NotFoundComponent } from './../util/404notfound/notfound.component';
import { TemplateComponent } from './../template/template.component';
import { LoginComponent } from './../login/login.component';

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
    {
        path: 'entrar', component: LoginComponent
    },
    {
        path: '', component: TemplateComponent
    },
    {
        path: '**', component: NotFoundComponent
    }
]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule {

}