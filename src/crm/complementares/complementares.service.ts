import { Http } from '@angular/http';
import { Injectable } from '@angular/core';

@Injectable()
export class ComplementaresService {

    private headers = new Headers({ 'Content-Type': 'text/plain' });
    private Url = '';  // URL to ...

    
    constructor(private http: Http) { }


    private handleError(error: any): Promise<any> {
        //console.error('Ocorreu o seguinte erro: ', error); // for demo purposes only
        let er: any;
        if (error.message === "Timeout has occurred") {
            er = {
                tError: "Timeout",
                mError: "Tempo de busca excedido, por favor realize a busca novamente, caso o problema persista informe ao administrador do sistema."
            }
        } else {
            let erJson: any = error.json();
            er = {
                tError: "",
                mError: erJson.message
            }
        }
        return Promise.reject(er);
    }
}