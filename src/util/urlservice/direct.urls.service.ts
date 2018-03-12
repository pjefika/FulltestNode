import { Injectable } from '@angular/core';
import { ExceptionService } from '../exceptionservice/exception.service';

@Injectable()
export class DirectUrlsService extends ExceptionService {

    // IPS: 
    //  "http://10.40.195.81:8080/"  QA
    //  "http://10.40.198.168:8080/"; Produção CO
    //  "http://10.200.35.67:80/" Produção Eng
    //  "http://dprcuradm0111:8080/"; Produção CRM

    public url: string;

    // Urls swarm de Produção e QA
    public urlSwarmQA: string = "http://10.40.196.182"; // QA
    public urlSwarmProd: string = "http://10.40.198.168"; // Produção

    public urlNQA: string = "http://10.40.195.81:8080/";
    public urlNProd: string = "http://10.40.198.168:8080/";
    public urlNSixtySeven: string = "http://10.200.35.67:80/";

    // Portas para referenciar o deploy    
    public customerQA: string = this.urlSwarmQA + ":7171/";
    public customerProd: string = this.urlSwarmProd + ":7171/";

    public fulltestQA: string = this.urlSwarmQA + ":7172/";
    public fulltestProd: string = this.urlSwarmProd + ":7172/";

    public stealerQA: string = this.urlSwarmQA + ":7173/";
    public stealerProd: string = this.urlSwarmProd + ":7173/";

    // Paths names para os projetos.
    public pathAuth = "efikaAuth/";
    public pathDmsAPI = "dmsAPI/";
    public pathAcs = "acs/";

    constructor() { super() }
}