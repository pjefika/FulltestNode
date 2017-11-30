import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'infos-dm-component',
    templateUrl: 'infos-dm.component.html',
    styleUrls: ['infos-dm.component.css']
})

export class InfosDmComponent implements OnInit {

    private modalInfoDm: boolean = false;

    constructor() { }

    public ngOnInit() { }

    public setInfosDm() {
        this.modalInfoDm = false;
        console.log("Concluido Info Dm");
    }

}