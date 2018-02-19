import { Component, OnInit, Input } from '@angular/core';
import { Fulltest } from '../../../viewmodel/fulltest/fulltest';
import { Certification } from '../../../viewmodel/fulltest/certification';

@Component({
    selector: 'info-geral-fulltest-component',
    templateUrl: 'info-geral-fulltest.component.html'
})

export class InfoGeralFulltestComponent implements OnInit {

    @Input() public certification: Certification;

    constructor() { }

    public ngOnInit() { }

}