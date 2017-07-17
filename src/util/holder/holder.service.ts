import { ObjectValid } from './../../viewmodel/fulltest/objectValid';
import { Cadastro } from './../../viewmodel/cadastro/cadastro';
import { Injectable } from '@angular/core';

@Injectable()
export class HolderService {

    cadastro: Cadastro;
    objectValid: ObjectValid;
    eachFulltest: string;

    constructor() { }

}