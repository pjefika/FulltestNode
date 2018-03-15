import { Injectable } from '@angular/core';
import { SuperService } from '../../../util/superservice/super.service';
import { UrlService } from '../../../util/urlservice/url.service';
import { InfoNortelConection } from '../../../viewmodel/linha/centrais-nortel/infos-nortel-conection';

@Injectable()
export class CentraisNortelService extends SuperService {

    constructor(private urlService: UrlService) {
        super();
    }

    public getContextDMS(): Promise<InfoNortelConection[]> {
        this.infoResquest = {
            rqst: "get",
            path: "contextDMS/",
            command: "dmsAPI",
            timeout: 120000
        };
        return this.urlService.request(this.infoResquest)
            .then(data => {
                return data as InfoNortelConection[]
            })
            .catch(super.handleError);
    }

    public connection(conection: string): Promise<InfoNortelConection[]> {
        this.infoResquest = {
            rqst: "get",
            path: "contextDMS/connection/",
            command: "dmsAPI",
            _data: conection,
            timeout: 120000
        };
        return this.urlService.request(this.infoResquest)
            .then(data => {
                return data as InfoNortelConection[]
            })
            .catch(super.handleError);
    }

    public connectSwitch(ip: string): Promise<InfoNortelConection> {
        let _data: { ip: string };
        _data = { ip: ip }
        this.infoResquest = {
            rqst: "post",
            path: "contextDMS/connectSwitch",
            command: "dmsAPI",
            _data: _data,
            timeout: 120000
        };
        return this.urlService.request(this.infoResquest)
            .then(data => {
                return data as InfoNortelConection
            })
            .catch(super.handleError);
    }

    public disconnectSwitch(ip: string): Promise<InfoNortelConection> {
        let _data: { ip: string };
        _data = { ip: ip }
        this.infoResquest = {
            rqst: "post",
            path: "contextDMS/disconnectSwitch",
            command: "dmsAPI",
            _data: _data,
            timeout: 120000
        };
        return this.urlService.request(this.infoResquest)
            .then(data => {
                return data as InfoNortelConection
            })
            .catch(super.handleError);
    }

}