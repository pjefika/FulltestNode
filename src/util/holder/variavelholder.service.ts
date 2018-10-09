import { Injectable } from '@angular/core';
import { Customer } from '../../viewmodel/customer/customer';
import { Fulltest } from '../../viewmodel/fulltest/fulltest';
import { Certification } from '../../viewmodel/fulltest/certification';
import { CadastroLinha } from '../../viewmodel/linha/cadlinha';
import { ConfPorta } from '../../viewmodel/confporta/confporta';
import { Equipamento } from '../../viewmodel/acs/equipamento';
import { Analitico } from '../../viewmodel/manobrar/analitico';
import { FulltestTV } from '../../viewmodel/fulltest-tv/fulltest-tv';
import { ListManobraCertification } from '../../viewmodel/manobrar/listmanobra';

@Injectable()
export class VariavelHolderService {

    public instancia: string;

    public cadastro: Customer;

    public certification: Certification;

    public certificationTV: Certification;

    public cadastroLinha: CadastroLinha;

    public confPorta: ConfPorta;

    public equipamentos: Equipamento[];

    public certificationValidManobra: Fulltest;

    public certificationValidManobraAnalitico: Analitico;

    public listCertifications: Certification[];

    public listCertificationManobra: ListManobraCertification[];

    public idfulltest: string;

    public idfulltestTV: string;

    constructor() { }
}