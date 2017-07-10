import { ObjectValid } from './../../viewmodel/objectValid';
import { Cadastro } from './../../viewmodel/cadastro';
import { Injectable } from '@angular/core';

@Injectable()
export class HolderService {

    cadastro: Cadastro;
    objectValid: ObjectValid;

    constructor() {}

}