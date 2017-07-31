import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'not-found-component',
    templateUrl: 'notfound.component.html',
    styleUrls: ['notfound.component.css']
})

export class NotFoundComponent implements OnInit {

    img = "./assets/imagens/efikalogo.png";

    constructor() { }

    ngOnInit() { }


}