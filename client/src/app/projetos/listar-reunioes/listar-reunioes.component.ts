import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CadastroProjetosService } from '../../services/cadastro-projetos.service';
import { ReuniaoService } from '../../services/reuniao.service';

@Component({
  selector: 'app-listar-reunioes',
  templateUrl: './listar-reunioes.component.html',
  styleUrl: './listar-reunioes.component.css'
})
export class ListarReunioesComponent implements OnInit {

  profile_id!: any;
  user_id!: any;
  authenticated: boolean = false;
  projeto: any;
  lista_reunioes!: any[];
  have_meet: boolean = false;
  pauta:any;
  ata:any;
  meetName!:any;

  constructor(
    private route: ActivatedRoute,
    private serviceProject: CadastroProjetosService,
    private serviceMeet: ReuniaoService
  ) { }

  ngOnInit(): void {
    const projectId = this.route.snapshot.paramMap.get('id');
    if (projectId) {
      this.getProjectDetails(Number(projectId));
    } else {
      console.error('ProjectID is not provided in the route');
    }

    this.pegarReunioes(Number(projectId));
    this.getPerfil();
  }

  getPerfil(){
    if (typeof localStorage !== 'undefined') {
      const token = localStorage.getItem('access_token');
      if (token) {
        const payload = JSON.parse(atob(token!.split('.')[1]));
        this.profile_id = payload._profile_id;
        this.user_id = payload._id;
        this.authenticated =true;
      }
    }
  }

  getProjectDetails(id: number): void {
    this.serviceProject.getProjetoDetalhes(id).subscribe(
      (data) => {
        this.projeto = data;
        // console.log('projeto-resumo', this.projeto)
      },
      (error) => console.error('Error fetching project details:', error)
    );
  }

  pegarReunioes(id: number) {
    this.serviceMeet.reunioesByAta(Number(id)).subscribe(
      (data) => {
        if(data.length > 0){
          this.have_meet = true;
          // console.log('meet', data);
          this.lista_reunioes = data;
        }else{
          this.have_meet = false;
        }
      },
      (error) => {
        console.error('Error ao criar a lista de reuniões', error);
      }
    );
  }

  verAta(reuniaoId: any) {
    // console.log('reunião', reuniaoId);
    this.serviceMeet.pegarAta(reuniaoId).subscribe(
      (data) => {
        this.pauta = data.ass_register_meet.pauta;
        this.meetName = data.ass_register_meet.nome_reuniao;
        this.ata = data.ata;
        // console.log('meet', data);
      },
      (error) => {
        console.error('Error ao criar a lista de reuniões', error);
      }
    );
  }

}
