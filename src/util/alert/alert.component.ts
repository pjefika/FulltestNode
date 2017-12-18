import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { HolderService } from 'util/holder/holder.service';

@Component({
    selector: 'alert-component',
    templateUrl: 'alert.component.html',
    styleUrls: ['alert.component.css']
})

export class AlertComponent implements OnInit, OnChanges {

    @Input() public msg: any;
    @Input() public ativo: boolean = false;
    @Input() public closeable: boolean = true;

    constructor(
        public holderService: HolderService) { }

    public ngOnInit() { }

    public ngOnChanges(simpleChanges: SimpleChanges) {
        if (simpleChanges.msg) {
            if (simpleChanges.msg.currentValue != simpleChanges.msg.previousValue) {
                this.appendMessages(simpleChanges.msg.currentValue.msg, simpleChanges.msg.currentValue.alertType);
            }
        }
    }

    private appendMessages(msg: string, theme: string) {
        let now: number = Date.now();
        if (!this.holderService.oldToastyMessages) {
            this.holderService.oldToastyMessages = [{ msg: msg, type: theme, time: now }]
        } else {
            this.holderService.oldToastyMessages.push({ msg: msg, type: theme, time: now });
        }
    }

}