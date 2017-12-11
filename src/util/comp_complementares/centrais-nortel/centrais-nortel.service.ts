import { Injectable } from '@angular/core';
import { SuperService } from 'util/superservice/super.service';
import { UrlService } from 'util/url-service/url.service';
import { InfoNortelConection } from 'viewmodel/nortel-conections/infos-nortel-conection';

@Injectable()
export class CentraisNortelService extends SuperService {

    constructor(private urlService: UrlService) {
        super();
    }

    public getContextDMS(): Promise<InfoNortelConection[]> {
        this.infoResquest = {
            rqst: "get",
            command: this.urlService.pathDmsAPI + "contextDMS/",
            timeout: 1200000
        }
        return this.urlService.request(this.infoResquest)
            .then(data => {
                return data as InfoNortelConection[]
            })
            .catch(super.handleError);
    }

    public connection(conection: string): Promise<InfoNortelConection[]> {
        this.infoResquest = {
            rqst: "get",
            command: this.urlService.pathDmsAPI + "contextDMS/connection/",
            _data: conection,
            timeout: 12000000
        }
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
            command: this.urlService.pathDmsAPI + "contextDMS/connectSwitch",
            _data: _data,
            timeout: 1200000
        }
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
            command: this.urlService.pathDmsAPI + "contextDMS/disconnectSwitch",
            _data: _data,
            timeout: 1200000
        }
        return this.urlService.request(this.infoResquest)
            .then(data => {
                return data as InfoNortelConection
            })
            .catch(super.handleError);
    }

}