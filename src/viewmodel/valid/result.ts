export class Result {
    nome: string;
    type?: string;

    // Estado da porta.
    adminState?: boolean;
    operState?: boolean;

    // Parâmetros
    snrDown?: number;
    snrUp?: number;
    atnDown?: number;
    atnUp?: number;
    velSincDown?: number;
    velSincUp?: number;
    velMaxDown?: number;
    velMaxUp?: number;
    snrDown1?: number;
    snrDown2?: number;
    snrUp1?: number;
    snrUp2?: number;
    atnDown1?: number;
    atnDown2?: number;
    atnUp1?: number;
    atnUp2?: number;

    // Confiabilidade de rede
    pctDown?: number;
    pctUp?: number;
    crcDown?: number;
    crcUp?: number;
    fecDown?: number;
    fecUp?: number;
    resync?: number;
    tempoMedicao?: number;
    crcOk?: boolean;
    pctSuficiente?: boolean;

    // Modulação
    modulacao?: string;
    modulEnum?: string;

    // Profile
    profileUp?: number;
    profileDown?: number;
    down?: string;
    up?: string

    // Vlan Banda Larga
    cvlan?: number;
    svlan?: number;
    // -- Duplicado no conf rede utiliza o mesmo -- 
    // pctDown?: number;
    // pctUp?: number;
    state?: string;

    // Mac
    mac?: string;

    // Associação Serial ONT
    serial?: string;
    idOnt?: string;
    slot?: number;
    porta?: number

    // Parâmetros Ópticos
    potOnt?: number;
    potOlt?: number;

}