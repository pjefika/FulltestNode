import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class Util {    
    isLogado() : Promise<boolean> {
        if (typeof (Storage) !== 'undefined') {
            if(sessionStorage.getItem('user')){
                console.log("entrou get item")
                return Promise.resolve(true);
            }
        }
        return Promise.resolve(false);
    }
}