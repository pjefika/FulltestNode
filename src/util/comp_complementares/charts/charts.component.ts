import { Component, OnInit } from '@angular/core';
import { ChartService } from 'util/comp_complementares/charts/charts.service';

@Component({
    selector: 'charts-component',
    templateUrl: 'charts.component.html',
    styleUrls: ['charts.component.css'],
    providers: [ChartService]
})

export class ChartsComponent implements OnInit {

    constructor(
        private chartService: ChartService) { }

    public ngOnInit() { }

    // lineChart
    // Adicionar informações de valores e a label Top para filtro.
    public lineChartData: Array<any> = [
        { data: [0, 50, 80, 100, 120, 150, 150], label: 'Pacotes Up' },
        { data: [5, 12, 50, 300, 301, 320, 321], label: 'Pacotes Down' }
    ];

    // Aqui é a Label Bottom 
    public lineChartLabels: Array<any> = ['09:00:00', '10:00:00', '11:00:00', '12:00:00', '13:00:00', '14:00:00', '15:00:00'];

    public lineChartColors: Array<any> = [
        { // grey
            backgroundColor: 'rgba(148,159,177,0.2)',
            borderColor: 'rgba(148,159,177,1)',
            pointBackgroundColor: 'rgba(148,159,177,1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(148,159,177,0.8)'
        },
        { // dark grey
            backgroundColor: 'rgba(77,83,96,0.2)',
            borderColor: 'rgba(77,83,96,1)',
            pointBackgroundColor: 'rgba(77,83,96,1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(77,83,96,1)'
        }
    ];

    public lineChartOptions: any = {
        responsive: true
    };

    public lineChartLegend: boolean = true;

    // events
    public chartClicked(e: any): void {
        console.log(e);
    }

    public chartHovered(e: any): void {
        //console.log(e);
    }
}