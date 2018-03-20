import { Injectable } from '@angular/core';
import { SuperService } from '../superservice/super.service';
import { Http } from '@angular/http';
import { LinkService } from '../urlservice/link.service';

@Injectable()
export class EnumService extends SuperService {

    constructor(public http: Http) {
        super(http);
    }

    public getEnumTv(): Promise<String[]> {
        this.infoRequest = {
            requestType: "GET",
            url: this.mountLink(this.getLinksMock(), "fulltestAPI", "listEnums/tecTv"),
            timeout: 10000
        };
        return super.request(this.infoRequest)
            .then(resposta => {
                return resposta as String[];
            })
            .catch(super.handleErrorKing);
    }

    public getEnumVoz(): Promise<String[]> {
        this.infoRequest = {
            requestType: "GET",
            url: this.mountLink(this.getLinksMock(), "fulltestAPI", "listEnums/tecVoz"),
            timeout: 10000
        };
        return super.request(this.infoRequest)
            .then(resposta => {
                return resposta as String[];
            })
            .catch(super.handleErrorKing);
    }

    public getEnumVelocidades(): Promise<String[]> {
        this.infoRequest = {
            requestType: "GET",
            url: this.mountLink(this.getLinksMock(), "fulltestAPI", "listEnums/velocidades"),
            timeout: 10000
        };
        return super.request(this.infoRequest)
            .then(resposta => {
                return resposta as String[];
            })
            .catch(super.handleErrorKing);
    }

}