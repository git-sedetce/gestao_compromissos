import { Component, OnInit } from '@angular/core';
import { StatisticsService } from '../../../services/statistics.service';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables)

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{

  lista_projetos_por_coord_1!: any[];
  lista_projetos_por_coord_2!: any[];
  lista_projetos_por_coord_3!: any[];
  lista_projetos_por_coord_4!: any[];

  lista_projetos_por_sexec_1!: any[];
  lista_projetos_por_sexec_2!: any[];
  lista_projetos_por_sexec_3!: any[];
  lista_projetos_por_sexec_4!: any[];

  lista_compromissos_por_coord_1!: any[];
  lista_compromissos_por_coord_2!: any[];
  lista_compromissos_por_coord_3!: any[];
  lista_compromissos_por_coord_4!: any[];

  lista_compromissos_por_sexec_1!: any[];
  lista_compromissos_por_sexec_2!: any[];
  lista_compromissos_por_sexec_3!: any[];
  lista_compromissos_por_sexec_4!: any[];

  lista_tarefas_por_coord_1!: any[];
  lista_tarefas_por_sexec_1!: any[];

  constructor( private statisticsService: StatisticsService){}

  ngOnInit(): void {
    this.getChartPjCrd1();
    this.getChartPjCrd2();
    this.getChartPjCrd3();
    this.getChartPjCrd4();

    this.getChartPjSxc1();
    this.getChartPjSxc2();
    this.getChartPjSxc3();
    this.getChartPjSxc4();

    this.getChartCmtCrd1();
    this.getChartCmtCrd2();
    this.getChartCmtCrd3();
    this.getChartCmtCrd4();

    this.getChartCmtSxc1();
    this.getChartCmtSxc2();
    this.getChartCmtSxc3();
    this.getChartCmtSxc4();

    this.getChartTskCrd1();
    this.getChartTskSxc1();

  }

  getChartPjCrd1(): void{
    this.statisticsService.getProjectCoordSt1('countProjectCoordSt1').subscribe(
      (dataChart: any[]) => {
        this.lista_projetos_por_coord_1 = dataChart;

        let qtdStatus: any[] = [];
        let coordenadoria: any[] = [];

        if(this.lista_projetos_por_coord_1 !=null){
          this.lista_projetos_por_coord_1.map(dtchart =>{
            qtdStatus.push(dtchart.qtd_status);
            coordenadoria.push(dtchart.ass_project_coordenadoria.sigla);
          });
          this.Renderbarchart(coordenadoria, qtdStatus);
        }
        // console.log('lista_projetos_por_coord_1', this.lista_projetos_por_coord_1)
      }
    );
  }

  Renderbarchart(labeldata: any, valuedata: any) {
    this.Renderchart(labeldata, valuedata, 'barchart1', 'bar');
  }

  Renderchart(labeldata: any, valuedata: any, chartid: string, charttype: any) {
    const mychar = new Chart(chartid, {
      type: charttype,
      data: {
        labels: labeldata,
        datasets: [
          {
            label: 'Projetos Não Iniciados',
            data: valuedata,
            backgroundColor: '#F3C623',
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  }

  getChartPjCrd2(): void{
    this.statisticsService.getProjectCoordSt2('countProjectCoordSt2').subscribe(
      (dataChart: any[]) => {
        this.lista_projetos_por_coord_2 = dataChart;

        let qtdStatus: any[] = [];
        let coordenadoria: any[] = [];

        if(this.lista_projetos_por_coord_2 !=null){
          this.lista_projetos_por_coord_2.map(dtchart =>{
            qtdStatus.push(dtchart.qtd_status);
            coordenadoria.push(dtchart.ass_project_coordenadoria.sigla);
          });
          this.Renderbarchart2(coordenadoria, qtdStatus);
        }
        // console.log('lista_projetos_por_coord_2', this.lista_projetos_por_coord_2)
      }
    );
  }

  Renderbarchart2(labeldata: any, valuedata: any) {
    this.Renderchart2(labeldata, valuedata, 'barchart2', 'bar');
  }

  Renderchart2(labeldata: any, valuedata: any, chartid: string, charttype: any) {
    const mychar = new Chart(chartid, {
      type: charttype,
      data: {
        labels: labeldata,
        datasets: [
          {
            label: 'Projetos em andamento',
            data: valuedata,
            backgroundColor: '#339966',
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  }

  getChartPjCrd3(): void{
    this.statisticsService.getProjectCoordSt3('countProjectCoordSt3').subscribe(
      (dataChart: any[]) => {
        this.lista_projetos_por_coord_3 = dataChart;

        let qtdStatus: any[] = [];
        let coordenadoria: any[] = [];

        if(this.lista_projetos_por_coord_3 !=null){
          this.lista_projetos_por_coord_3.map(dtchart =>{
            qtdStatus.push(dtchart.qtd_status);
            coordenadoria.push(dtchart.ass_project_coordenadoria.sigla);
          });
          this.Renderbarchart3(coordenadoria, qtdStatus);
        }
        // console.log('lista_projetos_por_coord_3', this.lista_projetos_por_coord_3)
      }
    );
  }

  Renderbarchart3(labeldata: any, valuedata: any) {
    this.Renderchart3(labeldata, valuedata, 'barchart3', 'bar');
  }

  Renderchart3(labeldata: any, valuedata: any, chartid: string, charttype: any) {
    const mychar = new Chart(chartid, {
      type: charttype,
      data: {
        labels: labeldata,
        datasets: [
          {
            label: 'Projetos Paralisados',
            data: valuedata,
            backgroundColor: '#FF4545',
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  }

  getChartPjCrd4(): void{
    this.statisticsService.getProjectCoordSt4('countProjectCoordSt4').subscribe(
      (dataChart: any[]) => {
        this.lista_projetos_por_coord_4 = dataChart;

        let qtdStatus: any[] = [];
        let coordenadoria: any[] = [];

        if(this.lista_projetos_por_coord_4 !=null){
          this.lista_projetos_por_coord_4.map(dtchart =>{
            qtdStatus.push(dtchart.qtd_status);
            coordenadoria.push(dtchart.ass_project_coordenadoria.sigla);
          });
          this.Renderbarchart4(coordenadoria, qtdStatus);
        }
        // console.log('lista_projetos_por_coord_4', this.lista_projetos_por_coord_4)
      }
    );
  }

  Renderbarchart4(labeldata: any, valuedata: any) {
    this.Renderchart4(labeldata, valuedata, 'barchart4', 'bar');
  }

  Renderchart4(labeldata: any, valuedata: any, chartid: string, charttype: any) {
    const mychar = new Chart(chartid, {
      type: charttype,
      data: {
        labels: labeldata,
        datasets: [
          {
            label: 'Projetos Concluidos',
            data: valuedata,
            backgroundColor: '#3F7FBF',
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  }


  getChartPjSxc1(): void{
    this.statisticsService.getProjectSexecSt1('countProjectSexecSt1').subscribe(
      (dataChart: any[]) => {
        this.lista_projetos_por_sexec_1 = dataChart;

        let qtdStatus: any[] = [];
        let sexec: any[] = [];

        if(this.lista_projetos_por_sexec_1 !=null){
          this.lista_projetos_por_sexec_1.map(dtchart =>{
            qtdStatus.push(dtchart.qtd_status);
            sexec.push(dtchart.ass_project_sexec.sigla);
          });
          this.RenderbarchartSxc1(sexec, qtdStatus);
        }
        // console.log('lista_projetos_por_sexec_1', this.lista_projetos_por_sexec_1)
      }
    );
  }

  RenderbarchartSxc1(labeldata: any, valuedata: any) {
    this.RenderchartSxc1(labeldata, valuedata, 'barchartSexec1', 'bar');
  }

  RenderchartSxc1(labeldata: any, valuedata: any, chartid: string, charttype: any) {
    const mychar = new Chart(chartid, {
      type: charttype,
      data: {
        labels: labeldata,
        datasets: [
          {
            label: 'Projetos Não Iniciados',
            data: valuedata,
            backgroundColor: '#F3C623',
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  }

  getChartPjSxc2(): void{
    this.statisticsService.getProjectSexecSt2('countProjectSexecSt2').subscribe(
      (dataChart: any[]) => {
        this.lista_projetos_por_sexec_2 = dataChart;

        let qtdStatus: any[] = [];
        let sexec: any[] = [];

        if(this.lista_projetos_por_sexec_2 !=null){
          this.lista_projetos_por_sexec_2.map(dtchart =>{
            qtdStatus.push(dtchart.qtd_status);
            sexec.push(dtchart.ass_project_sexec.sigla);
          });
          this.RenderbarchartSxc2(sexec, qtdStatus);
        }
        // console.log('lista_projetos_por_sexec_2', this.lista_projetos_por_sexec_2)
      }
    );
  }

  RenderbarchartSxc2(labeldata: any, valuedata: any) {
    this.RenderchartSxc2(labeldata, valuedata, 'barchartSexec2', 'bar');
  }

  RenderchartSxc2(labeldata: any, valuedata: any, chartid: string, charttype: any) {
    const mychar = new Chart(chartid, {
      type: charttype,
      data: {
        labels: labeldata,
        datasets: [
          {
            label: 'Projetos em andamento',
            data: valuedata,
            backgroundColor: '#339966',
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  }

  getChartPjSxc3(): void{
    this.statisticsService.getProjectSexecSt3('countProjectSexecSt3').subscribe(
      (dataChart: any[]) => {
        this.lista_projetos_por_sexec_3 = dataChart;

        let qtdStatus: any[] = [];
        let sexec: any[] = [];

        if(this.lista_projetos_por_sexec_3 !=null){
          this.lista_projetos_por_sexec_3.map(dtchart =>{
            qtdStatus.push(dtchart.qtd_status);
            sexec.push(dtchart.ass_project_sexec.sigla);
          });
          this.RenderbarchartSxc3(sexec, qtdStatus);
        }
        // console.log('lista_projetos_por_sexec_3', this.lista_projetos_por_sexec_3)
      }
    );
  }

  RenderbarchartSxc3(labeldata: any, valuedata: any) {
    this.RenderchartSxc3(labeldata, valuedata, 'barchartSexec3', 'bar');
  }

  RenderchartSxc3(labeldata: any, valuedata: any, chartid: string, charttype: any) {
    const mychar = new Chart(chartid, {
      type: charttype,
      data: {
        labels: labeldata,
        datasets: [
          {
            label: 'Projetos Paralisados',
            data: valuedata,
            backgroundColor: '#FF4545',
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  }

  getChartPjSxc4(): void{
    this.statisticsService.getProjectSexecSt4('countProjectSexecSt4').subscribe(
      (dataChart: any[]) => {
        this.lista_projetos_por_sexec_4 = dataChart;

        let qtdStatus: any[] = [];
        let sexec: any[] = [];

        if(this.lista_projetos_por_sexec_4 !=null){
          this.lista_projetos_por_sexec_4.map(dtchart =>{
            qtdStatus.push(dtchart.qtd_status);
            sexec.push(dtchart.ass_project_sexec.sigla);
          });
          this.RenderbarchartSxc4(sexec, qtdStatus);
        }
        // console.log('lista_projetos_por_sexec_4', this.lista_projetos_por_sexec_4)
      }
    );
  }

  RenderbarchartSxc4(labeldata: any, valuedata: any) {
    this.RenderchartSxc4(labeldata, valuedata, 'barchartSexec4', 'bar');
  }

  RenderchartSxc4(labeldata: any, valuedata: any, chartid: string, charttype: any) {
    const mychar = new Chart(chartid, {
      type: charttype,
      data: {
        labels: labeldata,
        datasets: [
          {
            label: 'Projetos Concluidos',
            data: valuedata,
            backgroundColor: '#3F7FBF',
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  }

  // Gráficos de Compromisso

  getChartCmtCrd1(): void{
    this.statisticsService.getCommitCoordSt('countCommitCoordSt1').subscribe(
      (dataChart: any[]) => {
        this.lista_compromissos_por_coord_1 = dataChart;
        // console.log('dataChart', this.lista_compromissos_por_coord_1);

        let qtdCommit: any[] = [];
        let coordenadoria: any[] = [];

        if(this.lista_compromissos_por_coord_1 !=null){
          this.lista_compromissos_por_coord_1.map(dtchart =>{
            qtdCommit.push(dtchart.qtd_compromissos);
            coordenadoria.push(dtchart.ass_commitment_coord.sigla);
          });
          this.RenderbarchartCmtCrd1(coordenadoria, qtdCommit);
        }
        // console.log('lista_projetos_por_coord_1', this.lista_projetos_por_coord_1)
      }
    );
  }

  RenderbarchartCmtCrd1(labeldata: any, valuedata: any) {
    this.RenderchartCmtCrd1(labeldata, valuedata, 'barchartcmtcrd1', 'bar');
  }

  RenderchartCmtCrd1(labeldata: any, valuedata: any, chartid: string, charttype: any) {
    const mychar = new Chart(chartid, {
      type: charttype,
      data: {
        labels: labeldata,
        datasets: [
          {
            label: 'Compromissos Cadastrados',
            data: valuedata,
            backgroundColor: '#F3C623',
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  }

  getChartCmtCrd2(): void{
    this.statisticsService.getCommitCoordSt('countCommitCoordSt2').subscribe(
      (dataChart: any[]) => {
        this.lista_compromissos_por_coord_2 = dataChart;
        // console.log('dataChart', this.lista_compromissos_por_coord_2);

        let qtdStatus: any[] = [];
        let coordenadoria: any[] = [];

        if(this.lista_compromissos_por_coord_2 !=null){
          this.lista_compromissos_por_coord_2.map(dtchart =>{
            qtdStatus.push(dtchart.qtd_status);
            coordenadoria.push(dtchart.ass_commitment_coord.sigla);
          });
          this.RenderbarchartCmtCrd2(coordenadoria, qtdStatus);
        }
        // console.log('lista_projetos_por_coord_1', this.lista_projetos_por_coord_1)
      }
    );
  }

  RenderbarchartCmtCrd2(labeldata: any, valuedata: any) {
    this.RenderchartCmtCrd2(labeldata, valuedata, 'barchartcmtcrd2', 'bar');
  }

  RenderchartCmtCrd2(labeldata: any, valuedata: any, chartid: string, charttype: any) {
    const mychar = new Chart(chartid, {
      type: charttype,
      data: {
        labels: labeldata,
        datasets: [
          {
            label: 'Compromissos Não Iniciados',
            data: valuedata,
            backgroundColor: '#FF4545',
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  }

  getChartCmtCrd3(): void{
    this.statisticsService.getCommitCoordSt('countCommitCoordSt3').subscribe(
      (dataChart: any[]) => {
        this.lista_compromissos_por_coord_3 = dataChart;

        let qtdStatus: any[] = [];
        let coordenadoria: any[] = [];

        if(this.lista_compromissos_por_coord_3 !=null){
          this.lista_compromissos_por_coord_3.map(dtchart =>{
            qtdStatus.push(dtchart.qtd_status);
            coordenadoria.push(dtchart.ass_commitment_coord.sigla);
          });
          this.RenderbarchartCmtCrd3(coordenadoria, qtdStatus);
        }
        // console.log('lista_projetos_por_coord_1', this.lista_projetos_por_coord_1)
      }
    );
  }

  RenderbarchartCmtCrd3(labeldata: any, valuedata: any) {
    this.RenderchartCmtCrd3(labeldata, valuedata, 'barchartcmtcrd3', 'bar');
  }

  RenderchartCmtCrd3(labeldata: any, valuedata: any, chartid: string, charttype: any) {
    const mychar = new Chart(chartid, {
      type: charttype,
      data: {
        labels: labeldata,
        datasets: [
          {
            label: 'Compromissos Em Andamento',
            data: valuedata,
            backgroundColor: '#339966',
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  }

  getChartCmtCrd4(): void{
    this.statisticsService.getCommitCoordSt('countCommitCoordSt4').subscribe(
      (dataChart: any[]) => {
        this.lista_compromissos_por_coord_4 = dataChart;

        let qtdStatus: any[] = [];
        let coordenadoria: any[] = [];

        if(this.lista_compromissos_por_coord_4 !=null){
          this.lista_compromissos_por_coord_4.map(dtchart =>{
            qtdStatus.push(dtchart.qtd_status);
            coordenadoria.push(dtchart.ass_commitment_coord.sigla);
          });
          this.RenderbarchartCmtCrd4(coordenadoria, qtdStatus);
        }
        // console.log('lista_projetos_por_coord_1', this.lista_projetos_por_coord_1)
      }
    );
  }

  RenderbarchartCmtCrd4(labeldata: any, valuedata: any) {
    this.RenderchartCmtCrd4(labeldata, valuedata, 'barchartcmtcrd4', 'bar');
  }

  RenderchartCmtCrd4(labeldata: any, valuedata: any, chartid: string, charttype: any) {
    const mychar = new Chart(chartid, {
      type: charttype,
      data: {
        labels: labeldata,
        datasets: [
          {
            label: 'Compromissos Concluídos',
            data: valuedata,
            backgroundColor: '#3F7FBF',
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  }

  getChartCmtSxc1(): void{
    this.statisticsService.getCommitSexecSt('countCommitSexecSt1').subscribe(
      (dataChart: any[]) => {
        this.lista_compromissos_por_sexec_1 = dataChart;

        let qtd_compromissos: any[] = [];
        let sexec: any[] = [];

        if(this.lista_compromissos_por_sexec_1 !=null){
          this.lista_compromissos_por_sexec_1.map(dtchart =>{
            qtd_compromissos.push(dtchart.qtd_compromissos);
            sexec.push(dtchart.ass_commitment_sexec.sigla);
          });
          this.RenderbarchartCmtSxc1(sexec, qtd_compromissos);
        }
        // console.log('lista_projetos_por_sexec_1', this.lista_projetos_por_sexec_1)
      }
    );
  }

  RenderbarchartCmtSxc1(labeldata: any, valuedata: any) {
    this.RenderchartCmtSxc1(labeldata, valuedata, 'barchartCmtSexec1', 'bar');
  }

  RenderchartCmtSxc1(labeldata: any, valuedata: any, chartid: string, charttype: any) {
    const mychar = new Chart(chartid, {
      type: charttype,
      data: {
        labels: labeldata,
        datasets: [
          {
            label: 'Compromissos Cadastrados',
            data: valuedata,
            backgroundColor: '#F3C623',
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  }

  getChartCmtSxc2(): void{
    this.statisticsService.getCommitSexecSt('countCommitSexecSt2').subscribe(
      (dataChart: any[]) => {
        this.lista_compromissos_por_sexec_2 = dataChart;

        let qtdStatus: any[] = [];
        let sexec: any[] = [];

        if(this.lista_compromissos_por_sexec_2 !=null){
          this.lista_compromissos_por_sexec_2.map(dtchart =>{
            qtdStatus.push(dtchart.qtd_status);
            sexec.push(dtchart.ass_commitment_sexec.sigla);
          });
          this.RenderbarchartCmtSxc2(sexec, qtdStatus);
        }
        // console.log('lista_projetos_por_sexec_1', this.lista_projetos_por_sexec_1)
      }
    );
  }

  RenderbarchartCmtSxc2(labeldata: any, valuedata: any) {
    this.RenderchartCmtSxc2(labeldata, valuedata, 'barchartCmtSexec2', 'bar');
  }

  RenderchartCmtSxc2(labeldata: any, valuedata: any, chartid: string, charttype: any) {
    const mychar = new Chart(chartid, {
      type: charttype,
      data: {
        labels: labeldata,
        datasets: [
          {
            label: 'Compromissos Não Iniciados',
            data: valuedata,
            backgroundColor: '#FF4545',
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  }

  getChartCmtSxc3(): void{
    this.statisticsService.getCommitSexecSt('countCommitSexecSt3').subscribe(
      (dataChart: any[]) => {
        this.lista_compromissos_por_sexec_3 = dataChart;

        let qtdStatus: any[] = [];
        let sexec: any[] = [];

        if(this.lista_compromissos_por_sexec_3 !=null){
          this.lista_compromissos_por_sexec_3.map(dtchart =>{
            qtdStatus.push(dtchart.qtd_status);
            sexec.push(dtchart.ass_commitment_sexec.sigla);
          });
          this.RenderbarchartCmtSxc3(sexec, qtdStatus);
        }
        // console.log('lista_projetos_por_sexec_1', this.lista_projetos_por_sexec_1)
      }
    );
  }

  RenderbarchartCmtSxc3(labeldata: any, valuedata: any) {
    this.RenderchartCmtSxc3(labeldata, valuedata, 'barchartCmtSexec3', 'bar');
  }

  RenderchartCmtSxc3(labeldata: any, valuedata: any, chartid: string, charttype: any) {
    const mychar = new Chart(chartid, {
      type: charttype,
      data: {
        labels: labeldata,
        datasets: [
          {
            label: 'Compromissos em Andamentos',
            data: valuedata,
            backgroundColor: '#339966',
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  }

  getChartCmtSxc4(): void{
    this.statisticsService.getCommitSexecSt('countCommitSexecSt4').subscribe(
      (dataChart: any[]) => {
        this.lista_compromissos_por_sexec_4 = dataChart;

        let qtdStatus: any[] = [];
        let sexec: any[] = [];

        if(this.lista_compromissos_por_sexec_4 !=null){
          this.lista_compromissos_por_sexec_4.map(dtchart =>{
            qtdStatus.push(dtchart.qtd_status);
            sexec.push(dtchart.ass_commitment_sexec.sigla);
          });
          this.RenderbarchartCmtSxc4(sexec, qtdStatus);
        }
        // console.log('lista_projetos_por_sexec_1', this.lista_projetos_por_sexec_1)
      }
    );
  }

  RenderbarchartCmtSxc4(labeldata: any, valuedata: any) {
    this.RenderchartCmtSxc4(labeldata, valuedata, 'barchartCmtSexec4', 'bar');
  }

  RenderchartCmtSxc4(labeldata: any, valuedata: any, chartid: string, charttype: any) {
    const mychar = new Chart(chartid, {
      type: charttype,
      data: {
        labels: labeldata,
        datasets: [
          {
            label: 'Compromissos Concluídos',
            data: valuedata,
            backgroundColor: '#3F7FBF',
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  }


  // Gráficos de Tarefa

  getChartTskCrd1(): void{
    this.statisticsService.getTaskCoordSt('countTaskCoordSt1').subscribe(
      (dataChart: any[]) => {
        this.lista_tarefas_por_coord_1 = dataChart;
        // console.log('dataChart', this.lista_tarefas_por_coord_1);

        let qtdTask: any[] = [];
        let coordenadoria: any[] = [];

        if(this.lista_tarefas_por_coord_1 !=null){
          this.lista_tarefas_por_coord_1.map(dtchart =>{
            qtdTask.push(dtchart.qtd_task);
            coordenadoria.push(dtchart.sigla);
          });
          this.RenderbarchartTskCrd1(coordenadoria, qtdTask);
        }
        // console.log('lista_projetos_por_coord_1', this.lista_projetos_por_coord_1)
      }
    );
  }

  RenderbarchartTskCrd1(labeldata: any, valuedata: any) {
    this.RenderchartTskCrd1(labeldata, valuedata, 'barchart_taskcrd1', 'bar');
  }

  RenderchartTskCrd1(labeldata: any, valuedata: any, chartid: string, charttype: any) {
    const mychar = new Chart(chartid, {
      type: charttype,
      data: {
        labels: labeldata,
        datasets: [
          {
            label: 'Tarefas Cadastradas',
            data: valuedata,
            backgroundColor: '#339966',
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  }


  getChartTskSxc1(): void{
    this.statisticsService.getTaskSexecSt('countTaskSexecSt1').subscribe(
      (dataChart: any[]) => {
        this.lista_tarefas_por_sexec_1 = dataChart;
        // console.log('dataChart', this.lista_tarefas_por_sexec_1);

        let qtdTask: any[] = [];
        let sexec: any[] = [];

        if(this.lista_tarefas_por_sexec_1 !=null){
          this.lista_tarefas_por_sexec_1.map(dtchart =>{
            qtdTask.push(dtchart.qtd_task);
            sexec.push(dtchart.sigla);
          });
          this.RenderbarchartTskSxc1(sexec, qtdTask);
        }
        // console.log('lista_projetos_por_sexec_1', this.lista_projetos_por_sexec_1)
      }
    );
  }

  RenderbarchartTskSxc1(labeldata: any, valuedata: any) {
    this.RenderchartTskSxc1(labeldata, valuedata, 'barchart_tasksexec1', 'bar');
  }

  RenderchartTskSxc1(labeldata: any, valuedata: any, chartid: string, charttype: any) {
    const mychar = new Chart(chartid, {
      type: charttype,
      data: {
        labels: labeldata,
        datasets: [
          {
            label: 'Tarefas Cadastradas',
            data: valuedata,
            backgroundColor: '#3F7FBF',
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  }

}
