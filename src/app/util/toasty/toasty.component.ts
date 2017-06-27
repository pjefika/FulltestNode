import { Component, OnInit, Input } from '@angular/core';
import { ToastyService, ToastyConfig, ToastOptions, ToastData } from 'ng2-toasty';

@Component({
    selector: 'toasty-component',
    templateUrl: 'toasty.component.html',
    styleUrls: ['toasty.component.css']
})

export class ToastyComponent implements OnInit {

    @Input() toastyInfo: {
        titulo: string;
        msg: string;
        theme: string;
    }

    constructor(private toastyService: ToastyService, private toastyConfig: ToastyConfig) {
        this.toastyConfig.position = "top-right";
     }

    ngOnInit() { }

    addToasty() {
        var toastOptions: ToastOptions = {
            title: this.toastyInfo.titulo,
            msg: this.toastyInfo.msg,
            showClose: true,
            theme: this.toastyInfo.theme,
            timeout: 5000,
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
    }
}