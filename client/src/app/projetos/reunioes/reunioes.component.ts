import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CadastroProjetosService } from '../../services/cadastro-projetos.service';
import { ToastrService } from 'ngx-toastr';
import { CadastroReunioes } from '../../models/cadastro-reunioes.model';
import { NgForm } from '@angular/forms';
import { SecretariaCoordenadoriaService } from '../../services/secretaria-coordenadoria.service';
import { ReuniaoService } from '../../services/reuniao.service';
// import { AngularEditorConfig } from '@kolkov/angular-editor';

@Component({
  selector: 'app-reunioes',
  templateUrl: './reunioes.component.html',
  styleUrl: './reunioes.component.css',
})
export class ReunioesComponent implements OnInit {
  @ViewChild('formReuniao') formReuniao!: NgForm;
  reuniao!: CadastroReunioes;

  lista_projetos!: any[];
  lista_coord!: any[];
  lista_sexec!: any[];
  lista_periodicidade!: any[];
  secretaria_executiva!: any;
  horario_termino!: any;
  maxChars = 5000;
  have_task!: boolean;
  have_sub_task!: boolean;

  //futuramente deve-se guardar o nome da pessoa que agendou a reunião, a variável de ve vim de acordo com o usuário logado

  constructor(
    private router: Router,
    private serviceProject: CadastroProjetosService,
    private serviceReuniao: ReuniaoService,
    private sexec_coord_service: SecretariaCoordenadoriaService,
    private toastr: ToastrService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.reuniao = new CadastroReunioes();
    const id = this.route.snapshot.paramMap.get('id');
    this.serviceProject.getProjectWithCronogramasETarefas(Number(id)).subscribe(
      data => {
        // console.log('projeto', data);
        this.reuniao.projeto_id = data.id;
      },
      error => {
        console.error('Error fetching project data', error);
      }
    );

    this.getProjeto();
    this.getCoordenadoria();
    this.getPeriodicidade();

     // Inicializa `horario_inicial` formatado como `HH:mm`
     const now = new Date();
    //  this.reuniao.horario_inicial = new Date();
     this.reuniao.horario_inicial = this.formatTime(now);
  }

  getProjeto() {
    this.serviceProject.getProjetos('allProject').subscribe(
      (proj: any[]) => {
        this.lista_projetos = proj;
        // console.log('proj', proj)
      },
      (erro: any) => console.error('erro', erro)
    );
  }

  getCoordenadoria() {
    this.sexec_coord_service.coordenadoria('coordenadoria').subscribe(
      (cd: any[]) => {
        this.lista_coord = cd;
        // console.log('cd', cd)
      },
      (erro: any) => console.error('erro', erro)
    );
  }

  getPeriodicidade() {
    this.serviceReuniao.getPeriodicidade('listaPeriodicidade').subscribe(
      (period: any[]) => {
        this.lista_periodicidade = period;
        // console.log('this.lista_periodicidade', this.lista_periodicidade)
      },
      (erro: any) => console.error('erro', erro)
    );
  }

  // calculaHoraFinal(duracao: any){
  //   const hora = new Date();
  //   hora?.setHours(hora.getHours() + duracao)

  //   this.reuniao.horario_final = hora
  //   console.log('hora', hora)
  //   console.log('hora_encerramento', this.reuniao.horario_final)

  // }

  calculaDuracao() {
    if (this.reuniao.horario_inicial && this.reuniao.horario_final) {
      try{
        const horarioInicial = new Date(`1970-01-01T${this.reuniao.horario_inicial}:00`);
      const horarioFinal = new Date(`1970-01-01T${this.reuniao.horario_final}:00`);
      // const duracaoMinutos = parseInt(this.reuniao.duracao, 10);

      // if (isNaN(duracaoMinutos)) {
      //   throw new Error('Duração inválida');
      // }

      // Atualiza a duração em minutos
      const diferencaMilissegundos = horarioFinal.getTime() - horarioInicial.getTime();
      this.reuniao.duracao = (diferencaMilissegundos / 60000).toString(); // Converte para minutos e para string
      // console.log('duração', this.reuniao.duracao)

      // console.log('duracaoMinutos', duracaoMinutos)
      // const horarioFinal = new Date(horarioInicial.getTime() + duracaoMinutos * 60000);
      // console.log('horarioFinal', horarioFinal)
      // Formata `horario_final` para `HH:mm`
      // this.reuniao.horario_final = this.formatTime(horarioFinal);
      }catch (error: any) {
        console.error('Erro ao calcular o horário final:', error.message);
      }
    }
  }

  foundSexec(coord: any, form: any) {
    this.sexec_coord_service
      .pegar_coordenadoria_by_id('coordenadoriaById/', coord)
      .subscribe((cd: any) => {
        // console.log('coordenadorias', cd)
        // console.log('sexec_id', cd.sexec_id)
        this.pegarSecretaria(cd.sexec_id);
      });
  }

  pegarSecretaria(id: any) {
    this.sexec_coord_service.pegar_secretaria('secretaria/', id).subscribe(
      (id_sec: any) => {
        // console.log('secretaria', id_sec)
        this.reuniao.sexec_id = id_sec.id;
        this.secretaria_executiva = id_sec.secretaria;
      },
      (erro: any) => console.error(erro)
    );
  }

  saveReuniao(){
    // console.log('reunião', this.reuniao)
    this.calculaDuracao();
    this.reuniao.ata_registrada = false;
    this.serviceReuniao.cadastrarReuniao(this.reuniao).subscribe({
      next: (res: any) => {
        // console.log('reunião', this.reuniao)
        this.toastr.success('Reunião cadstrada com sucesso!');
        this.formReuniao.reset();
        this.router.navigate(['/projeto/projetos-page'])
      },
      error: (e) => (this.toastr.error(e))
    })
  }

  // Helper para formatar uma data como `HH:mm`
  private formatTime(date: Date): string {
    const horas = date.getHours().toString().padStart(2, '0');
    const minutos = date.getMinutes().toString().padStart(2, '0');
    return `${horas}:${minutos}`;
  }

//   editorConfig: AngularEditorConfig = {
//     editable: true,
//       spellcheck: false,
//       height: '20rem',
//       minHeight: '5rem',
//       maxHeight: 'auto',
//       width: 'auto',
//       minWidth: '0',
//       translate: 'no',
//       enableToolbar: true,
//       showToolbar: true,
//       placeholder: 'Digite a pauta da reunião aqui...',
//       defaultParagraphSeparator: 'p',
//       defaultFontName: '',
//       defaultFontSize: '',
//       fonts: [
//         {class: 'arial', name: 'Arial'},
//         {class: 'times-new-roman', name: 'Times New Roman'},
//         {class: 'calibri', name: 'Calibri'},
//         {class: 'comic-sans-ms', name: 'Comic Sans MS'}
//       ],
//       customClasses: [
//       {
//         name: 'quote',
//         class: 'quote',
//       },
//       {
//         name: 'redText',
//         class: 'redText'
//       },
//       {
//         name: 'titleText',
//         class: 'titleText',
//         tag: 'h1',
//       },
//     ],
//     uploadUrl: 'v1/image',
//     uploadWithCredentials: false,
//     sanitize: false,
//     toolbarPosition: 'top',
//     toolbarHiddenButtons: [
//       ['strikeThrough', 'subscript', 'superscript'],
//       ['insertImage', 'insertVideo']
//     ]
// };


}
