import { Component, OnInit } from '@angular/core';
import { IndustriaService } from '../../services/industria.service';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables)

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  proxima_inauguracao!: any[];
  data_evento!: any;
  evento!: any;
  empresa!: any;
  municipio!: any;
  regiao!: any;

  lista_inauguracao_realizadas!: any[];
  lista_inauguracao_futuras!: any[];
  lista_ing_realizadas_regiao!: any[];
  lista_ing_futuras_regiao!: any[];

  lista_empresas_fdi_regiao!: any[];
  lista_soma_investimento_fdi_regiao!: any[];
  lista_qtde_empregos_fdi_regiao!: any[];

  lista_empresas_atraidas_regiao!: any[];
  lista_soma_investimento_atraido_regiao!: any[];
  lista_qtde_empregos_atraidos_regiao!: any[];

  constructor(private industriaService: IndustriaService) {}

  ngOnInit(): void {
    this.getNextIng();
    this.getInauguracaoRealizada();
    this.getInauguracaoFutura();
    this.getInauguracaoRealizadaRegiao();
    this.getInauguracaoFuturaRegiao();
    this.getEmpresaFdiRegiao();
    this.getInvestimentoFdi();
    this.getEmpregosFdi();
    this.getEmpresaAtracaoRegiao();
    this.getInvestimentoAtracao();
    this.getEmpregosAtracao();

  }

  getNextIng(): void {
    this.industriaService.getNextInauguracao('proximaInauguracao').subscribe(
      (data) => {
        this.proxima_inauguracao = data;
        this.data_evento = data.data_inauguracao;
        this.evento = data.tipo;
        this.empresa = data.ass_inauguracao_empresa.nome_fantasia;
        this.municipio = data.ass_inauguracao_city.nome_municipio;
        this.regiao = data.ass_inauguracao_city.ass_cidade_regiao.nome;
        // console.log('proxima_inauguracao', this.proxima_inauguracao);
      },
      (error) => console.error('Error fetching project details:', error)
    );
  }

  getInauguracaoRealizada(): void{
      this.industriaService.statisticsIndustry('inauguracaoRealizadas').subscribe(
        (dataChart: any[]) => {
          this.lista_inauguracao_realizadas = dataChart;

          let ano: any[] = [];
          let quantidade: any[] = [];

          if(this.lista_inauguracao_realizadas !=null){
            this.lista_inauguracao_realizadas.map(dtchart =>{
              quantidade.push(dtchart.quantidade);
              ano.push(dtchart.ano);
            });
            this.Renderbarchart_01(ano,quantidade);
          }
          // console.log('lista_projetos_por_coord_1', this.lista_projetos_por_coord_1)
        }
      );
    }

    Renderbarchart_01(labeldata: any, valuedata: any) {
      this.Renderchart_01(labeldata, valuedata, 'barchart1', 'bar');
    }

    Renderchart_01(labeldata: any, valuedata: any, chartid: string, charttype: any) {
      const mychar = new Chart(chartid, {
        type: charttype,
        data: {
          labels: labeldata,
          datasets: [
            {
              label: 'Quantidade',
              data: valuedata,
              backgroundColor: '#cf0638',
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

    getInauguracaoFutura(): void{
      this.industriaService.statisticsIndustry('inauguracaoFuturas').subscribe(
        (dataChart: any[]) => {
          this.lista_inauguracao_futuras = dataChart;

          let ano: any[] = [];
          let quantidade: any[] = [];

          if(this.lista_inauguracao_futuras !=null){
            this.lista_inauguracao_futuras.map(dtchart =>{
              ano.push(dtchart.ano);
              quantidade.push(dtchart.quantidade);
            });
            this.Renderbarchart_02(ano, quantidade);
          }
          // console.log('lista_projetos_por_coord_1', this.lista_projetos_por_coord_1)
        }
      );
    }

    Renderbarchart_02(labeldata: any, valuedata: any) {
      this.Renderchart_02(labeldata, valuedata, 'barchart2', 'bar');
    }

    Renderchart_02(labeldata: any, valuedata: any, chartid: string, charttype: any) {
      const mychar = new Chart(chartid, {
        type: charttype,
        data: {
          labels: labeldata,
          datasets: [
            {
              label: 'Quantidade',
              data: valuedata,
              backgroundColor: '#fecd23',
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

    getInauguracaoRealizadaRegiao(): void{
      this.industriaService.statisticsIndustry('ingRealizadasRegiao').subscribe(
        (dataChart: any[]) => {
          this.lista_ing_realizadas_regiao = dataChart;

          let regiao: any[] = [];
          let quantidade: any[] = [];

          if(this.lista_ing_realizadas_regiao !=null){
            this.lista_ing_realizadas_regiao.map(dtchart =>{
              regiao.push(dtchart.regiao);
              quantidade.push(dtchart.quantidade);
            });
            this.Renderbarchart_03(regiao, quantidade );
          }
          // console.log('lista_projetos_por_coord_1', this.lista_projetos_por_coord_1)
        }
      );
    }

    Renderbarchart_03(labeldata: any, valuedata: any) {
      this.Renderchart_03(labeldata, valuedata, 'barchart3', 'bar');
    }

    Renderchart_03(labeldata: any, valuedata: any, chartid: string, charttype: any) {
      const mychar = new Chart(chartid, {
        type: charttype,
        data: {
          labels: labeldata,
          datasets: [
            {
              label: 'Região',
              data: valuedata,
              backgroundColor: '#0a996f',
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

    getInauguracaoFuturaRegiao(): void{
      this.industriaService.statisticsIndustry('ingFuturasRegiao').subscribe(
        (dataChart: any[]) => {
          this.lista_ing_futuras_regiao = dataChart;

          let regiao: any[] = [];
          let quantidade: any[] = [];

          if(this.lista_ing_futuras_regiao !=null){
            this.lista_ing_futuras_regiao.map(dtchart =>{
              regiao.push(dtchart.regiao);
              quantidade.push(dtchart.quantidade);
            });
            this.Renderbarchart_04(regiao, quantidade);
          }
          // console.log('lista_projetos_por_coord_1', this.lista_projetos_por_coord_1)
        }
      );
    }

    Renderbarchart_04(labeldata: any, valuedata: any) {
      this.Renderchart_04(labeldata, valuedata, 'barchart4', 'bar');
    }

    Renderchart_04(labeldata: any, valuedata: any, chartid: string, charttype: any) {
      const mychar = new Chart(chartid, {
        type: charttype,
        data: {
          labels: labeldata,
          datasets: [
            {
              label: 'Região',
              data: valuedata,
              backgroundColor: '#0a6789',
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

    getEmpresaFdiRegiao(): void{
      this.industriaService.statisticsIndustry('countCompanyRegiao').subscribe(
        (dataChart: any[]) => {
          this.lista_empresas_fdi_regiao = dataChart;

          let regiao: any[] = [];
          let empresas: any[] = [];

          if(this.lista_empresas_fdi_regiao !=null){
            this.lista_empresas_fdi_regiao.map(dtchart =>{
              regiao.push(dtchart.regiao);
              empresas.push(dtchart.empresa_id);
            });
            this.Renderbarchart_05(regiao, empresas);
          }
          // console.log('lista_projetos_por_coord_1', this.lista_projetos_por_coord_1)
        }
      );
    }

    Renderbarchart_05(labeldata: any, valuedata: any) {
      this.Renderchart_05(labeldata, valuedata, 'barchart5', 'bar');
    }

    Renderchart_05(labeldata: any, valuedata: any, chartid: string, charttype: any) {
      const mychar = new Chart(chartid, {
        type: charttype,
        data: {
          labels: labeldata,
          datasets: [
            {
              label: 'Região',
              data: valuedata,
              backgroundColor: '#fea667',
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

    getInvestimentoFdi(): void{
      this.industriaService.statisticsIndustry('somaInvestimentoRegiao').subscribe(
        (dataChart: any[]) => {
          this.lista_soma_investimento_fdi_regiao = dataChart;

          let regiao: any[] = [];
          let valor: any[] = [];

          if(this.lista_soma_investimento_fdi_regiao !=null){
            this.lista_soma_investimento_fdi_regiao.map(dtchart =>{
              regiao.push(dtchart.regiao);
              valor.push(dtchart.valor_investimento);
            });
            this.Renderbarchart_06(regiao, valor);
          }
          // console.log('lista_projetos_por_coord_1', this.lista_projetos_por_coord_1)
        }
      );
    }

    Renderbarchart_06(labeldata: any, valuedata: any) {
      this.Renderchart_06(labeldata, valuedata, 'barchart6', 'bar');
    }

    Renderchart_06(labeldata: any, valuedata: any, chartid: string, charttype: any) {
      const mychar = new Chart(chartid, {
        type: charttype,
        data: {
          labels: labeldata,
          datasets: [
            {
              label: 'Região',
              data: valuedata,
              backgroundColor: '#ffe461',
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

    getEmpregosFdi(): void{
      this.industriaService.statisticsIndustry('somaEmpregosRegiao').subscribe(
        (dataChart: any[]) => {
          this.lista_soma_investimento_fdi_regiao = dataChart;

          let regiao: any[] = [];
          let empregos: any[] = [];

          if(this.lista_soma_investimento_fdi_regiao !=null){
            this.lista_soma_investimento_fdi_regiao.map(dtchart =>{
              regiao.push(dtchart.regiao);
              empregos.push(dtchart.empregos_gerados);
            });
            this.Renderbarchart_07(regiao, empregos);
          }
          // console.log('lista_projetos_por_coord_1', this.lista_projetos_por_coord_1)
        }
      );
    }

    Renderbarchart_07(labeldata: any, valuedata: any) {
      this.Renderchart_07(labeldata, valuedata, 'barchart7', 'bar');
    }

    Renderchart_07(labeldata: any, valuedata: any, chartid: string, charttype: any) {
      const mychar = new Chart(chartid, {
        type: charttype,
        data: {
          labels: labeldata,
          datasets: [
            {
              label: 'Região',
              data: valuedata,
              backgroundColor: '#f4d092',
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

    getEmpresaAtracaoRegiao(): void{
      this.industriaService.statisticsIndustry('countCompanyAtRegiao').subscribe(
        (dataChart: any[]) => {
          this.lista_empresas_atraidas_regiao = dataChart;

          let regiao: any[] = [];
          let empresas: any[] = [];

          if(this.lista_empresas_atraidas_regiao !=null){
            this.lista_empresas_atraidas_regiao.map(dtchart =>{
              regiao.push(dtchart.regiao);
              empresas.push(dtchart.empresa_id);
            });
            this.Renderbarchart_08(regiao, empresas);
          }
          // console.log('lista_projetos_por_coord_1', this.lista_projetos_por_coord_1)
        }
      );
    }

    Renderbarchart_08(labeldata: any, valuedata: any) {
      this.Renderchart_08(labeldata, valuedata, 'barchart8', 'bar');
    }

    Renderchart_08(labeldata: any, valuedata: any, chartid: string, charttype: any) {
      const mychar = new Chart(chartid, {
        type: charttype,
        data: {
          labels: labeldata,
          datasets: [
            {
              label: 'Região',
              data: valuedata,
              backgroundColor: '#0f7d7e',
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

    getInvestimentoAtracao(): void{
      this.industriaService.statisticsIndustry('somaInvestAtRegiao').subscribe(
        (dataChart: any[]) => {
          this.lista_soma_investimento_atraido_regiao = dataChart;

          let regiao: any[] = [];
          let valor: any[] = [];

          if(this.lista_soma_investimento_atraido_regiao !=null){
            this.lista_soma_investimento_atraido_regiao.map(dtchart =>{
              regiao.push(dtchart.regiao);
              valor.push(dtchart.valor_investimento);
            });
            this.Renderbarchart_09(regiao, valor);
          }
          // console.log('lista_projetos_por_coord_1', this.lista_projetos_por_coord_1)
        }
      );
    }

    Renderbarchart_09(labeldata: any, valuedata: any) {
      this.Renderchart_09(labeldata, valuedata, 'barchart9', 'bar');
    }

    Renderchart_09(labeldata: any, valuedata: any, chartid: string, charttype: any) {
      const mychar = new Chart(chartid, {
        type: charttype,
        data: {
          labels: labeldata,
          datasets: [
            {
              label: 'Região',
              data: valuedata,
              backgroundColor: '#76b5a0',
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

    getEmpregosAtracao(): void{
      this.industriaService.statisticsIndustry('somaEmpregosAtRegiao').subscribe(
        (dataChart: any[]) => {
          this.lista_qtde_empregos_atraidos_regiao = dataChart;

          let regiao: any[] = [];
          let empregos: any[] = [];

          if(this.lista_qtde_empregos_atraidos_regiao !=null){
            this.lista_qtde_empregos_atraidos_regiao.map(dtchart =>{
              regiao.push(dtchart.regiao);
              empregos.push(dtchart.empregos_gerados);
            });
            this.Renderbarchart_10(regiao, empregos);
          }
          // console.log('lista_projetos_por_coord_1', this.lista_projetos_por_coord_1)
        }
      );
    }

    Renderbarchart_10(labeldata: any, valuedata: any) {
      this.Renderchart_10(labeldata, valuedata, 'barchart10', 'bar');
    }

    Renderchart_10(labeldata: any, valuedata: any, chartid: string, charttype: any) {
      const mychar = new Chart(chartid, {
        type: charttype,
        data: {
          labels: labeldata,
          datasets: [
            {
              label: 'Região',
              data: valuedata,
              backgroundColor: ' #d33649',
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
