import { Injectable } from '@angular/core';
import { Md5 } from 'ts-md5/dist/md5';
import 'rxjs/add/operator/toPromise';
import { Router } from '@angular/router';
import { SystemHolderService } from './holder/systemholder.service';

declare var require: any

@Injectable()
export class UtilService {

    constructor(private router: Router,
        public systemHolderService: SystemHolderService) { }

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

    public getVersion(): string {
        const { version: appVersion } = require('../../package.json'); // Versão da aplicação na package.json
        let version: string = appVersion;
        return version;
    }

    // public isAtualizado() {
    //     const { version: appVersion } = require('../../package.json'); // Versão da aplicação na package.json
    //     let version: string = appVersion;
    //     let backVersion: string = "v2.0.0"; // Pegar versão do backend
    //     if (version != backVersion) { // Comparar
    //         return false;
    //     }
    //     return true;
    // }

    /** 
    * Usuario é CO ou CRM
    * True = CRM
    * Falso = CO
    */
    public validUser(): Boolean {
        // console.log(this.systemHolderService.qualCadastro);
        let valid: boolean = false;
        if (sessionStorage.getItem('user')) {
            let usr = JSON.parse(sessionStorage.getItem('user'));
            if (usr.nv === 1 || this.systemHolderService.qualCadastro === "CRM") {
                valid = true;
            }
        }
        return valid;
    }

    // Navega para menu passado por parametro.
    public navigate(route: string) {
        this.router.navigate([route]);
    }

}