import { Injectable } from '@angular/core';
import { SuperService } from '../superservice/super.service';

@Injectable()
export class DirectUrlsService extends SuperService {

    // IPS: 
    //  "http://10.40.195.81:8080/"  QA
    //  "http://10.40.198.168:8080/"; Produção CO
    //  "http://10.200.35.67:80/" Produção Eng
    //  "http://dprcuradm0111:8080/"; Produção CRM

    public url: string;

    // Urls swarm de Produção e QA
    public urlSwarmQA: string = "http://10.40.196.182";
    public urlSwarmProd: string = "http://10.40.198.168";

    public urlNQA: string = "http://10.40.195.81:8080/";
    public urlNProd: string = "http://10.40.198.168:8080/";
    public urlNSixtySeven: string = "http://10.200.35.67:80/";

    // Portas para referenciar o deploy    
    public stealerQA: string = this.urlSwarmQA + ":7171/";
    public stealerProd: string = this.urlSwarmProd + ":7171/";

    public fulltestQA: string = this.urlSwarmQA + ":7172/";
    public fulltestProd: string = this.urlSwarmProd + ":7172/";

    // Paths names para os projetos.
    public pathFulltestAPI = "fulltestAPI/";
    public pathStealerAPI = "stealerAPI/";
    public pathAuth = "efikaAuth/";
    public pathDmsAPI = "dmsAPI/";
    public pathAcs = "acs/";
    public pathCustomerAPI = "customerAPI/";

    constructor() {
        super();
    }
}