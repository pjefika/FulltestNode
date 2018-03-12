export class InfoRequest {
    rqst?: string; // POST ou GET.
    command?: string; // Nome do comando.
    _data?: any; // Data para passar no POST ou GET.
    otherUrl?: string; // Informar outra URL.
    path?: string; // Caminho para o comando.
    timeout?: number; // Informa o timeout para parar o request.
}