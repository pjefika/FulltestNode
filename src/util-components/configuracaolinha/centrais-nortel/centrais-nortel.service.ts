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
            command: this.urlService.pathDmsAPI + "contextDMS/",
            otherUrl: "http://10.200.35.67:80/",
            timeout: 60000
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
            otherUrl: "http://10.200.35.67:80/",
            timeout: 60000
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
            otherUrl: "http://10.200.35.67:80/",
            timeout: 60000
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
            otherUrl: "http://10.200.35.67:80/",
            timeout: 60000
        }
        return this.urlService.request(this.infoResquest)
            .then(data => {
                return data as InfoNortelConection
            })
            .catch(super.handleError);
    }

}