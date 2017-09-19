import { PrincipalComponent } from './../../principal/principal.component';
import { BrancoComponent } from './../../branco/branco.component';
import { Injectable } from '@angular/core';

import 'rxjs/add/operator/toPromise';
import 'rxjs/Rx';

@Injectable()
export class TemplateService {

    private componentData = null;

    constructor() { }

    public emptyComponentData(): any {
        this.componentData = {
            component: BrancoComponent,
            inputs: {
                nothing: null
            }
        }
        return this.componentData;
    }

    public createPrincipalComponent(): any {
        this.componentData = {
            component: PrincipalComponent,
            inputs: {
                nothing: null
            }
        }
        return this.componentData;
    }

}