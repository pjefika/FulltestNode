import { Component, OnInit, Input } from '@angular/core';
import { Valid } from '../../../viewmodel/valid/valid';
import { VariavelHolderService } from '../../../util/holder/variavelholder.service';

@Component({
    selector: 'fulltest-valids-component',
    templateUrl: 'fulltest-valids.component.html'
})

export class FulltestValidsComponent implements OnInit {

    @Input() public valid: Valid;

    constructor(public variavelHolderService: VariavelHolderService) { }

    public ngOnInit() { }

}