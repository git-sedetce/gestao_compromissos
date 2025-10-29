import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CadastroProjetosService } from '../../services/cadastro-projetos.service';
import { differenceInCalendarDays } from 'date-fns';

interface Project {
  id: number;
  ass_project_members: {
    name: string;
    data_inicio: string;
    previsao_conclusao: string;
    data_conclusao: string;
  };
  ass_project_status: { name: string };
  ass_project_users: { name: string };
}

@Component({
  selector: 'app-projetos-page',
  templateUrl: './projetos-page.component.html',
  styleUrls: ['./projetos-page.component.css']
})
export class ProjetosPageComponent implements OnInit {
  lista_projetos: Project[] = [];
  filteredProjects: Project[] = [];
  selectedStatus: string = '';
  selectedProjects: string = '';

  profile_id!: any;
  user_id!: any;
  user_name!: any;
  id_sexec!: any;
  authenticated: boolean = false;

  constructor (private http: HttpClient, private serviceProject: CadastroProjetosService,) {}

  ngOnInit(): void {
    this.getProjects();
    this.getPerfil();
  }

  getPerfil(){
    if (typeof localStorage !== 'undefined') {
      const token = localStorage.getItem('access_token');
      if (token) {
        const payload = JSON.parse(atob(token!.split('.')[1]));
        this.profile_id = payload._profile_id;
        this.user_id = payload._id;
        this.id_sexec = payload._sexec_id;
        this.authenticated = true;
        // console.log('payload', payload)
      }
    }
  }

  getProjects(): void {
    this.serviceProject.getUsersProjects().subscribe((projects: any[]) => {
      // console.log('projects', projects)
      this.lista_projetos = projects.map(project => ({
        id: project.ass_project_members.id,
        data_conclusao: project.updatedAt,
        ass_project_members: {
          name: project.ass_project_members.name,
          data_inicio: project.ass_project_members.data_inicio,
          previsao_conclusao: project.ass_project_members.previsao_conclusao,
          data_conclusao: project.ass_project_members.updatedAt
        },
        ass_project_status: project.ass_project_members.ass_project_status,
        ass_project_users: project.ass_project_users
      }));
      this.filteredProjects = this.lista_projetos;
      // console.log('filtro', this.filteredProjects)
    }, (erro: any) => console.error('erro', erro));
  }


  filterProjects(): void {
    if (this.selectedProjects === '') {
      this.filteredProjects = this.lista_projetos;
    } else {
      this.filteredProjects = this.lista_projetos.filter(project => project.ass_project_members.name === this.selectedProjects);
    }
  }

  filterProjectsStatus(): void {
    if (this.selectedStatus === '') {
      this.filteredProjects = this.lista_projetos;
    } else {
      this.filteredProjects = this.lista_projetos.filter(project => project.ass_project_status.name === this.selectedStatus);
    }
  }

  setStatus(status: string): void {
    this.selectedStatus = status;
    this.filterProjects();
  }

  barProgress(startDate: string, endDate: string, status: string): number {
    if (status === 'Concluído') {
      return 100;
    }

    if (status === 'Paralisado') {
      return 50
    }

    const start = new Date(startDate);
    const end = new Date(endDate);
    const now = new Date();

    if(now < start) {
      return 0;
    } else if (now > end) {
      return 100;
    }

    const totalDuration = differenceInCalendarDays(end, start);
    const currentDuration = differenceInCalendarDays(now, start);

    return Math.round((currentDuration / totalDuration) * 100);
  }

  normalizeDate(date: Date): Date {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate());
  }

  getStatusBar(project: Project): string {
    const now = this.normalizeDate(new Date());
    const endDate = this.normalizeDate(new Date(project.ass_project_members.previsao_conclusao));
    const daysToEnd = differenceInCalendarDays(endDate, now);

    if (project.ass_project_status.name === 'Em andamento') {
      if (daysToEnd <= 0) {
        return 'bg-danger';
      } else if (daysToEnd <= 5) {
        return 'bg-warning';
      } else {
        return 'bg-progress';
      }
    } else if (project.ass_project_status.name === 'Concluído') {
      return 'bg-completed';
    } else if (project.ass_project_status.name === 'Paralisado') {
      return 'bg-warning';
    } else {
      return 'bg-not-started';
    }
  }
}
