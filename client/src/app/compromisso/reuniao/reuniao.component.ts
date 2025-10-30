import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CadastroReunioes } from '../../models/cadastro-reunioes.model';
import { CadastroProjetosService } from '../../services/cadastro-projetos.service';
import { ReuniaoService } from '../../services/reuniao.service';
import { SecretariaCoordenadoriaService } from '../../services/secretaria-coordenadoria.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { Audit } from '../../models/audit.model';
import { AuditService } from '../../services/audit.service';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-reuniao',
  templateUrl: './reuniao.component.html',
  styleUrl: './reuniao.component.css'
})
export class ReuniaoComponent {
  @ViewChild('formReuniao') formReuniao!: NgForm;
    reuniao!: CadastroReunioes;
    registro!: Audit

    lista_projetos!: any[];
    getUser!: any;
    lista_periodicidade!: any[];
    secretaria_executiva!: any;
    horario_termino!: any;
    maxChars = 5000;


    profile_id!: any;
    user_name!: any;

    constructor(
        private router: Router,
        private serviceReuniao: ReuniaoService,
        private sexec_coord_service: SecretariaCoordenadoriaService,
        private auditService: AuditService,
        private toastr: ToastrService,
        private serviceUser: UsersService,
      ) {}

      ngOnInit(): void {
        this.reuniao = new CadastroReunioes();
        this.registro = new Audit();

        this.getPerfil();

         // Inicializa `horario_inicial` formatado como `HH:mm`
         const now = new Date();
        //  this.reuniao.horario_inicial = new Date();
         this.reuniao.horario_inicial = this.formatTime(now);
      }

      getPerfil(){
        const token = localStorage.getItem('access_token');
        const payload = JSON.parse(atob(token!.split('.')[1]));
        this.profile_id = payload._profile_id;
        this.registro.user_id = payload._id;
        this.user_name = payload._user_name;
        // console.log('payload', payload);
        this.getCoordSexec(payload._id);
      }

    getCoordSexec(id: number) {
      this.sexec_coord_service.pegar_coord_sexec_by_user('coordsexecByUserId/', id).subscribe(
        (cd: any[]) => {
          this.getUser = cd;
          // console.log('getUser', this.getUser)
          this.reuniao.coord_id = this.getUser.coord_id;
          this.reuniao.sexec_id = this.getUser.sexec_id;
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
          console.log('reunião', this.reuniao)
          this.toastr.success('Reunião cadstrada com sucesso!');
          this.formReuniao.reset();
          this.router.navigate(['/commitment/acompanhamento']);
        },
        error: (e) => console.error(e) //(this.toastr.error(e)
      })
      this.saveRegister();
    }

    startMeet(){
      // console.log('reunião', this.reuniao)
      this.calculaDuracao();
      this.reuniao.ata_registrada = false;
      this.serviceReuniao.cadastrarReuniao(this.reuniao).subscribe({
        next: (res: any) => {
          // console.log('reunião', this.reuniao)
          this.toastr.success('Reunião cadstrada com sucesso!');
          this.formReuniao.reset();
          this.router.navigate(['/commitment/membersmeet', res.id, 'cadastro']);
          // if(this.have_task){
          //   this.router.navigate(['/commitment/membersmeet', res.id, 'cadastro']);
          // }else{
          //   this.router.navigate(['/commitment/acompanhamento']);
          // }
        },
        error: (e) => (this.toastr.error(e))
      })
      this.saveRegister();
    }

    saveRegister(): void {
      this.registro.tipo_acao = 'Cadastro de Reunião'
      this.registro.acao = `A Reunião ${this.reuniao.nome_reuniao} foi cadastrado pelo usuário ${this.user_name}`;
      this.auditService.cadastrarRegistros(this.registro).subscribe({
      next: (res: any) => {
        // console.log('registro', res)
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

}
