import { Md5 } from 'ts-md5/dist/md5';
import { Usuario } from './../viewmodel/usuario';
import { LoginService } from './../login/login.service';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class Util {

    constructor(private loginService: LoginService) { }

    public isLogado(): Promise<boolean> {
        let localObj = JSON.parse(sessionStorage.getItem("user"));
        if (typeof (Storage) !== "undefined" && localObj && localObj.token === Md5.hashStr("fulltest-app")) {
            return Promise.resolve(true);
        }
        return Promise.resolve(false);
    }

    public getNv(nv: number): boolean {
        let valid = false;
        if (this.isLogado()) {
            let usr = JSON.parse(sessionStorage.getItem('user'));
            if (usr.nv >= nv) {
                valid = true;
            }
        }
        return valid;
    }

    public isAtualizado(): boolean {
        const { version: appVersion } = require('../../package.json'); // Versão da aplicação na package.json
        let version: string = appVersion;
        let backVersion: string = "v2.0.0"; // Pegar versão do backend
        if (version != backVersion) { // Comparar
            return false;
        }
        return true;
    }

}