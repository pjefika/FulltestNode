import { ConfPorta } from './../../../viewmodel/confPorta/confPorta';
import { CadastroLinha } from './../../../viewmodel/cadastro-linha/cadastro-linha';
import { Util } from './../../util';
import { ObjectValid } from './../../../viewmodel/fulltest/objectValid';
import { Cadastro } from './../../../viewmodel/cadastro/cadastro';

import { Component, OnInit, Input } from '@angular/core';
import { ToastyComponent } from 'util/toasty/toasty.component';
import { HolderService } from 'util/holder/holder.service';

@Component({
    selector: 'popover-component',
    templateUrl: 'popover.component.html',
    styleUrls: ['popover.component.css']
})

export class PopoverComponent implements OnInit {

    private ativo: boolean = false;
    @Input() public cadastro: Cadastro;
    @Input() public objectValid: ObjectValid;
    @Input() public cadastroLinha: CadastroLinha;
    @Input() public confPorta: ConfPorta;

    private clipboardInfo: string;

    constructor(
        public util: Util,
        private toastyComponent: ToastyComponent,
        public holderService: HolderService) { }

    public ngOnInit() { }

    private copyTextToClipboard() {
        let id = "mycustom-clipboard-textarea-hidden-id";
        let existsTextarea = <HTMLInputElement>document.getElementById(id);
        if (!existsTextarea) {
            //console.log("Creating textarea");
            let textarea = document.createElement("textarea");
            textarea.id = id;
            // Place in top-left corner of screen regardless of scroll position.
            textarea.style.position = 'fixed';
            textarea.style.top = "0";
            textarea.style.left = "0";

            // Ensure it has a small width and height. Setting to 1px / 1em
            // doesn't work as this gives a negative w/h on some browsers.
            textarea.style.width = '1px';
            textarea.style.height = '1px';

            // We don't need padding, reducing the size if it does flash render.
            textarea.style.padding = "0";

            // Clean up any borders.
            textarea.style.border = 'none';
            textarea.style.outline = 'none';
            textarea.style.boxShadow = 'none';

            // Avoid flash of white box if rendered for any reason.
            textarea.style.background = 'transparent';
            document.querySelector("#someToHoldClipBoard").appendChild(textarea);
            //console.log("The textarea now exists :)");
            existsTextarea = <HTMLInputElement>document.getElementById(id);
        } else {
            //console.log("The textarea already exists :3")
        }

        existsTextarea.value = this.mountStringToCopy();
        existsTextarea.select();

        try {
            var status = document.execCommand('copy');
            if (!status) {
                this.callToasty("Ops, aconteceu algo.", "Não foi possivel copiar o texto", "error", 5000);
            } else {
                this.callToasty("Sucesso", "Texto copiado com sucesso.", "success", 5000);
            }
        } catch (err) {
            console.log('Unable to copy :::::: => Algo de errado não está certo.');
        }
    }

    private mountStringToCopy(): string {
        let infos: string;
        if (this.cadastro) {
            infos = JSON.stringify(this.cadastro);
        }
        if (this.objectValid) {
            infos = infos + JSON.stringify(this.objectValid);
        }
        if (this.cadastroLinha) {
            infos = infos + JSON.stringify(this.objectValid);
        }
        if (this.confPorta) {
            infos = infos + JSON.stringify(this.objectValid);
        }
        return infos;
    }

    private callToasty(titulo: string, msg: string, theme: string, timeout?: number) {
        this.toastyComponent.toastyInfo = {
            titulo: titulo,
            msg: msg,
            theme: theme,
            timeout: timeout
        }
        this.toastyComponent.addToasty();
    }

}