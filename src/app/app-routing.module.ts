import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TemplateComponent } from '../template/template.component';
import { LoginComponent } from '../login/login.component';

const routes: Routes = [
    { path: 'entrar', component: LoginComponent },
    { path: '', component: TemplateComponent },
]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule {

}