import { HolderService } from './../holder/holder.service';
import { Component, OnInit, Input } from '@angular/core';
import { ToastyService, ToastyConfig, ToastOptions, ToastData } from 'ng2-toasty';

@Component({
    selector: 'toasty-component',
    templateUrl: 'toasty.component.html',
    styleUrls: ['toasty.component.css']
})

export class ToastyComponent implements OnInit {

    @Input() public toastyInfo: {
        titulo: string;
        msg: string;
        theme: string;
        timeout?: number;
    }

    constructor(
        private toastyService: ToastyService,
        private toastyConfig: ToastyConfig,
        public holderService: HolderService) {
        this.toastyConfig.position = "top-right";
    }

    public ngOnInit() { }

    public addToasty() {
        let toastOptions: ToastOptions = {
            title: this.toastyInfo.titulo,
            msg: this.toastyInfo.msg,
            showClose: true,
            theme: this.toastyInfo.theme,
            timeout: this.toastyInfo.timeout,
            onAdd: (toast: ToastData) => {
                //console.log('Toast ' + toast.id + ' has been added!');
            },
            onRemove: function (toast: ToastData) {
                //console.log('Toast ' + toast.id + ' has been removed!');
            }
        };

        switch (toastOptions.theme) {
            case 'default':
                this.toastyService.default(toastOptions);
                break;
            case 'info':
                this.toastyService.info(toastOptions);
                break;
            case 'success':
                this.toastyService.success(toastOptions);
                break;
            case 'wait':
                this.toastyService.wait(toastOptions);
                break;
            case 'error':
                this.toastyService.error(toastOptions);
                break;
            case 'warning':
                this.toastyService.warning(toastOptions);
                break;
        }

        this.appendErrorsMessages(this.toastyInfo.msg, this.toastyInfo.theme);
    }

    private appendErrorsMessages(msg: string, theme: string) {
        let now: number = Date.now();

        if (!this.holderService.oldToastyMessages) {
            this.holderService.oldToastyMessages = [{ msg: msg, type: theme, time: now }]
        } else {
            this.holderService.oldToastyMessages.push({ msg: msg, type: theme, time: now });
        }
    }
}