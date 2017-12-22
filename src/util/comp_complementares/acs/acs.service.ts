import { Injectable } from '@angular/core';
import { UrlService } from 'util/url-service/url.service';
import { Equipamento } from 'viewmodel/acs/equipamento';
import { SuperService } from 'util/superservice/super.service';

@Injectable()
export class AcsService extends SuperService {

    constructor(private urlService: UrlService) {
        super();
    }

    public getEquipamentoAssoc(input: string) {
        let usr = JSON.parse(localStorage.getItem('user'));
        let _data: { criterio: string, input: string, executor: string };
        _data = { criterio: "SUBSCRIBER", input: input, executor: usr.user };
        this.infoResquest = {
            rqst: "post",
            command: this.urlService.pathAcs + "search/search",
            _data: _data,
            timeout: 60000
        };
        return this.urlService.request(this.infoResquest)
            .then(response => {
                return response as Equipamento[]
            })
            .catch(super.handleError);
    }

    public abreSearchDevice(deviceId: number) {
        this.infoResquest = {
            rqst: "",
            command: "",
            _data: deviceId,
            otherUrl: "http://efika/acs/searchEqp/", // Trocar link para produção quando for lançado...
            timeout: 60000
        };
        this.urlService.linkurl(this.infoResquest);
    }

    public getMock(){
        let leJson : string = "[{\"activated\":true,\"alarmsEnabled\":true,\"captured\":false,\"commonUniqueIdentifier\":null,\"community\":null,\"connectionRequestPassword\":\"42e7599590c703a7bdafbcf6c77d14cd\",\"connectionRequestURL\":\"http://200.146.13.114:7547/tr69\",\"connectionRequestUsername\":\"ACC6627E4008-DSL-100HN-T1-NV-E04136\",\"currentTime\":1513962268000,\"customAttribute1\":\"AC:C6:62:7E:40:08\",\"customAttribute10\":null,\"customAttribute2\":null,\"customAttribute3\":null,\"customAttribute4\":null,\"customAttribute5\":null,\"customAttribute6\":null,\"customAttribute7\":null,\"customAttribute8\":null,\"customAttribute9\":null,\"deleted\":false,\"deviceClass\":null,\"deviceGUID\":21400616,\"deviceId\":{\"OUI\":\"E04136\",\"productClass\":\"DSL-100HN-T1-NV\",\"protocol\":\"DEVICE_PROTOCOL_DSLFTR069v1\",\"serialNumber\":\"ACC6627E4008\"},\"dynamicVariables\":[{\"encrypt\":false,\"name\":\"inform.itoss.activation.msg\",\"sensitive\":false,\"value\":\"{'operation':'PROVISIONING','mac':'AC:C6:62:7E:40:08','pclass':'DSL-100HN-T1-NV','guid':'21400616','serialNumber':'ACC6627E4008','subscriberId':'CTA-813PE2SDIL-013','parentId':'','parentMac':'','parentIp':'null','timestamp':'2017-12-08T17:23:14.621-02:00'}\"}],\"firstContactTime\":1508504207304,\"HTTPPublicPassword\":\"1508504213061a\",\"HTTPPublicUsername\":\"1508504213060u\",\"IPAddress\":\"200.146.13.114\",\"lastActivationTime\":1508504227235,\"lastCapturedBy\":null,\"lastCapturedTime\":null,\"lastContactTime\":1513973072027,\"macAddress\":\"AC:C6:62:7E:40:08\",\"managed\":true,\"manufacturer\":\"MitraStar\",\"model\":\"Device:1\",\"modelName\":\"DSL-100HN-T1-NV\",\"PPPPassword\":null,\"PPPUsername\":null,\"port\":0,\"portMappingRetryCount\":0,\"serviceTagArray\":[{\"copyOnFactoryReset\":false,\"factoryResetValue\":null,\"name\":\"inform.itoss.activation.status\",\"value\":\"final_notification_sent_at[2017-12-08T17:23:14.668-02:00]_status[OK]\"},{\"copyOnFactoryReset\":false,\"factoryResetValue\":null,\"name\":\"notifyIT\",\"value\":\"true\"}],\"softwareVersion\":\"BR_SO_113WUK0b8\",\"subscriberID\":\"CTA-813PE2SDIL-013\",\"type\":0,\"userTagArray\":null,\"domainName\":null}]";
        return JSON.parse(leJson) as Equipamento[];
    }

}