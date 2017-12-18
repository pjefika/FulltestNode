import { Component, OnInit, Input } from '@angular/core';
import { ChartService } from 'util/comp_complementares/charts/charts.service';
import { CallAlertService } from 'util/callalerts/call-alert.service';
import { ToastyComponent } from 'util/toasty/toasty.component';

@Component({
    selector: 'charts-component',
    templateUrl: 'charts.component.html',
    styleUrls: ['charts.component.css'],
    providers: [ChartService]
})

export class ChartsComponent extends CallAlertService implements OnInit {

    // lineChart
    // Adicionar informações de valores e a label Top para filtro.
    private lineChartData: Array<any> = [];

    // Adiciona as labels
    private lineChartLabels: Array<any>;

    // Cores do chart #0065AB / #003D79
    private lineChartColors: Array<any> = [
        { // grey
            backgroundColor: 'rgba(0,101,171,0.2)',
            borderColor: 'rgba(10,101,171,1)',
            pointBackgroundColor: 'rgba(0,101,171,1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(0,101,171,0.8)'
        },
        { // dark grey
            backgroundColor: 'rgba(0,61,121,0.2)',
            borderColor: 'rgba(0,61,121,1)',
            pointBackgroundColor: 'rgba(0,61,121,1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(0,61,121,1)'
        }
    ];

    // Chart Responsivo?
    private lineChartOptions: any = { responsive: true };

    // Input com o tipo do chart: line, bar, doughnut, radar, pie, polarArea
    @Input() public chartType: string;

    constructor(
        private chartService: ChartService,
        public toastyComponent: ToastyComponent) {
        super(toastyComponent);
    }

    public ngOnInit() {
        this.putDataInVariables();
    }

    private putDataInVariables() {
        // Adiciona as informações no grafico e adiciona as legendas.
        this.lineChartData = [
            { data: [0, 50, 80, 100, 120, 150, 150], label: 'Pacotes Up' },
            { data: [5, 12, 50, 300, 301, 320, 321], label: 'Pacotes Down' }
        ];
        // Adiciona valores das labels footer.
        this.lineChartLabels = ['09:00:00', '10:00:00', '11:00:00', '12:00:00', '13:00:00', '14:00:00', '15:00:00'];
    }

    // Evento de clicar no chart....
    public chartClicked(e: any): void {
        //console.log(e);
    }

}