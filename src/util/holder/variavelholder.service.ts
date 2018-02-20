import { Injectable } from '@angular/core';
import { Customer } from '../../viewmodel/customer/customer';
import { Fulltest } from '../../viewmodel/fulltest/fulltest';
import { Certification } from '../../viewmodel/fulltest/certification';
import { CadastroLinha } from '../../viewmodel/linha/cadlinha';

@Injectable()
export class VariavelHolderService {

    public instancia: string;

    public cadastro: Customer;

    public certification: Certification;

    public cadastroLinha: CadastroLinha;

    constructor() { }
}