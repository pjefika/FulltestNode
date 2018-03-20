import { Injectable } from '@angular/core';
import { SuperService } from '../../../util/superservice/super.service';
import { InfoNortelConection } from '../../../viewmodel/linha/centrais-nortel/infos-nortel-conection';
import { Http } from '@angular/http';
import { LinkService } from '../../../util/urlservice/link.service';

@Injectable()
export class CentraisNortelService extends SuperService {

    constructor(public http: Http) {
        super(http);
    }

    public getContextDMS(): Promise<InfoNortelConection[]> {
        this.infoRequest = {
            requestType: "GET",
            url: this.mountLink(this.getLinksMock(), "dmsAPI", "contextDMS/"),
            timeout: 60000
        };
        return super.request(this.infoRequest)
            .then(resposta => {
                return resposta as InfoNortelConection[];
            })
            .catch(super.handleError);
    }

    public connection(conection: string): Promise<InfoNortelConection[]> {
        this.infoRequest = {
            requestType: "GET",
            url: this.mountLink(this.getLinksMock(), "dmsAPI", "contextDMS/connection"),
            _data: conection,
            timeout: 60000
        };
        return super.request(this.infoRequest)
            .then(resposta => {
                return resposta as InfoNortelConection[];
            })
            .catch(super.handleError);
    }

    public connectSwitch(ip: string): Promise<InfoNortelConection> {
        let _data: { ip: string };
        _data = { ip: ip }
        this.infoRequest = {
            requestType: "POST",
            url: this.mountLink(this.getLinksMock(), "dmsAPI", "contextDMS/connectSwitch"),
            _data: _data,
            timeout: 60000
        };
        return super.request(this.infoRequest)
            .then(resposta => {
                return resposta as InfoNortelConection;
            })
            .catch(super.handleError);
    }

    public disconnectSwitch(ip: string): Promise<InfoNortelConection> {
        let _data: { ip: string };
        _data = { ip: ip }
        this.infoRequest = {
            requestType: "POST",
            url: this.mountLink(this.getLinksMock(), "dmsAPI", "contextDMS/disconnectSwitch"),
            _data: _data,
            timeout: 60000
        };
        return super.request(this.infoRequest)
            .then(resposta => {
                return resposta as InfoNortelConection;
            })
            .catch(super.handleError);
    }

}