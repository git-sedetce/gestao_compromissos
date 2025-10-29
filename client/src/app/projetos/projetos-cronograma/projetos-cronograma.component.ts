import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CadastroProjetosService } from '../../services/cadastro-projetos.service';
import { TarefaService } from '../../services/tarefa.service';
import { SubTarefaService } from '../../services/subtarefa.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CadastroTarefa } from '../../models/cadastro-tarefa.model';
import { CadastroSubTarefas } from '../../models/cadastro-sub-tarefa.model';
import {
  faChartSimple,
  faEdit,
  faTrash,
  faCaretDown,
  faAngleDown,
  faAngleRight,
  faCalendarXmark,
  faPlus,
} from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';
import { Audit } from '../../models/audit.model';
import { AuditService } from '../../services/audit.service';

declare var bootstrap: any;

@Component({
  selector: 'app-projetos-cronograma',
  templateUrl: './projetos-cronograma.component.html',
  styleUrls: ['./projetos-cronograma.component.css'],
})
export class ProjetosCronogramaComponent implements OnInit {
  faEdit = faEdit;
  faTrash = faTrash;
  faChartSimple = faChartSimple;
  faCaretDown = faCaretDown;
  faAngleDown = faAngleDown;
  faAngleRight = faAngleRight;
  faCalendarXmark = faCalendarXmark;
  faPlus = faPlus;

  projeto: any;
  taskVisibility: boolean[] = [];
  taskStatusEdit: { [key: number]: boolean } = {};
  subtaskStatusEdit: { [key: number]: boolean } = {};
  statuses: any[] = [];
  taskSelectedStatus: { [key: number]: number } = {};
  subtaskSelectedStatus: { [key: number]: number } = {};
  cronogramaToDelete: number | null = null;
  tarefaToDelete: number | null = null;

  formCronograma!: FormGroup;
  formTarefa!: FormGroup;
  cronogramaObj: CadastroTarefa = new CadastroTarefa();
  taskObj: CadastroSubTarefas = new CadastroSubTarefas();
  profile_id!: any;
  user_name!: any;
  tipo_atualização!: string;
  nome_tarefa!: string;
  projeto_id!: any;
  authenticated: boolean = false;

  registro!: Audit;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private cadastroProjetosService: CadastroProjetosService,
    private tarefaService: TarefaService,
    private subTarefaService: SubTarefaService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private auditService: AuditService
  ) {}

  ngOnInit() {
    this.projeto_id = this.route.snapshot.paramMap.get('id');

    this.carregarTarefas(Number(this.projeto_id));
    this.carregarStatus();

    this.registro = new Audit();
    this.forms();
    this.getPerfil();
  }

  cadastrarTarefa() {
    this.router.navigate(['/projeto/cadastroTarefa']);
  }

  carregarTarefas(id: number) {
    this.cadastroProjetosService
      .getProjectWithCronogramasETarefas(Number(id))
      .subscribe(
        (data) => {
          // console.log('projeto', data);
          this.projeto = data;
          this.taskVisibility = new Array(data.ass_project_tarefa.length).fill(
            false
          );
        },
        (error) => {
          console.error('Error fetching project data', error);
        }
      );
  }

  carregarStatus() {
    this.cadastroProjetosService.getStatus('allStatus').subscribe(
      (data) => {
        this.statuses = data;
      },
      (error) => {
        console.error('Error fetching statuses', error);
      }
    );
  }

  getPerfil() {
    const token = localStorage.getItem('access_token');
    const payload = JSON.parse(atob(token!.split('.')[1]));
    this.profile_id = payload._profile_id;
    this.registro.user_id = payload._id;
    this.user_name = payload._user_name;
    this.authenticated = true;
    // console.log('Profile ID:', this.profile_id);
  }

  forms(): void {
    this.formCronograma = this.formBuilder.group({
      id: [''],
      nome_ordem: [''],
      responsavel_id: [''],
      status_id: [''],
      data_inicial: [''],
      prazo: [''],
      data_conclusao: [''],
      execucao: [''],
      projeto_id: [''],
    });

    this.formTarefa = this.formBuilder.group({
      id: [''],
      nome_sub_tarefa: [''],
      responsavel_id: [''],
      status_id: [''],
      data_inicial: [''],
      prazo: [''],
      data_conclusao: [''],
      execucao: [''],
      tarefa_id: [''],
    });
  }

  toggleTasks(index: number) {
    this.taskVisibility[index] = !this.taskVisibility[index];
  }

  editStatus(type: 'task' | 'subtask', id: number) {
    if (type === 'task') {
      this.taskStatusEdit[id] = true;
      const task = this.projeto.ass_project_tarefa.find(
        (t: any) => t.id === id
      );
      this.taskSelectedStatus[id] = task.ass_tarefa_status.id;
    } else {
      this.subtaskStatusEdit[id] = true;
      const subtask = this.projeto.ass_project_tarefa
        .flatMap((t: any) => t.ass_tarefa_task)
        .find((st: any) => st.id === id);
      this.subtaskSelectedStatus[id] = subtask.ass_task_status.id;
    }
  }

  updateCronogramaStatus(
    type: 'task' | 'subtask',
    id: number,
    statusId: number
  ) {
    if (type === 'task') {
      this.tarefaService.updateTarefaStatus(id, statusId).subscribe(
        (updatedItem: any) => {
          const taskIndex = this.projeto.ass_project_tarefa.findIndex(
            (t: any) => t.id === id
          );
          this.projeto.ass_project_tarefa[taskIndex] = updatedItem;
          this.taskStatusEdit[id] = false;
        },
        (error: any) => {
          console.error('Error updating task status', error);
        }
      );
    } else {
      this.subTarefaService.updateSubTarefaStatus(id, statusId).subscribe(
        (updatedItem: any) => {
          this.projeto.ass_project_tarefa.forEach((task: any) => {
            const subtaskIndex = task.ass_tarefa_task.findIndex(
              (st: any) => st.id === id
            );
            if (subtaskIndex !== -1) {
              task.ass_tarefa_task[subtaskIndex] = updatedItem;
            }
          });
          this.subtaskStatusEdit[id] = false;
        },
        (error: any) => {
          console.error('Error updating subtask status', error);
        }
      );
    }
  }

  chartTask() {}

  editCronograma(cronograma: any) {
    this.cronogramaObj.id = cronograma.id;
    this.formCronograma.patchValue({
      nome_ordem: cronograma.nome_ordem,
      responsavel_id: cronograma.responsavel_id,
      status_id: cronograma.status_id,
      data_inicial: cronograma.data_inicial,
      prazo: cronograma.prazo,
      data_conclusao: cronograma.data_conclusao,
      execucao: cronograma.execucao,
      projeto_id: cronograma.projeto_id,
    });
  }

  updateCronograma() {
    this.cronogramaObj.nome_ordem = this.formCronograma.value.nome_ordem;
    this.cronogramaObj.data_inicial = this.formCronograma.value.data_inicial;
    this.cronogramaObj.prazo = this.formCronograma.value.prazo;
    this.cronogramaObj.data_conclusao =
      this.formCronograma.value.data_conclusao;

    this.nome_tarefa = this.formCronograma.value.nome_ordem;

    this.tarefaService
      .atualizaTarefa(this.cronogramaObj, Number(this.cronogramaObj.id))
      .subscribe((res) => {
        this.tipo_atualização = 'Atualização da tarefa';
        this.toastr.success('Atualiação realizada com sucesso!!!');

        const myModal = bootstrap.Modal.getInstance(
          document.getElementById('modalEditCronograma') as HTMLElement
        );
        if (myModal) {
          myModal.hide();
        }

        // Limpa form
        this.formCronograma.reset();

        this.saveRegister(this.tipo_atualização);

        // Atualiza página
        // window.location.reload();
        this.carregarTarefas(Number(this.projeto_id));
      });
  }

  confirmDeleteCronograma(cronogramaId: number) {
    this.cronogramaToDelete = cronogramaId;
    const myModal = new bootstrap.Modal(
      document.getElementById('confirmDeleteCronogramaModal') as HTMLElement
    );
    myModal.show();
  }

  deleteCronograma() {
    if (this.cronogramaToDelete !== null) {
      this.tarefaService.deletarTarefa(this.cronogramaToDelete).subscribe(
        () => {
          this.projeto.ass_project_cronograma =
            this.projeto.ass_project_cronograma.filter(
              (cronograma: any) => cronograma.id !== this.cronogramaToDelete
            );
          this.cronogramaToDelete = null;
          const myModal = bootstrap.Modal.getInstance(
            document.getElementById(
              'confirmDeleteCronogramaModal'
            ) as HTMLElement
          );
          if (myModal) {
            myModal.hide();
          }
          this.saveRegister(this.tipo_atualização);

          // Atualiza página
          // window.location.reload();
          this.carregarTarefas(Number(this.projeto_id));
        },
        (error) => {
          console.error('Error deleting cronograma', error);
        }
      );
    }
  }

  editTarefa(tarefa: any) {
    this.taskObj.id = tarefa.id;
    this.formTarefa.patchValue({
      nome_sub_tarefa: tarefa.nome_sub_tarefa,
      responsavel_id: tarefa.responsavel_id,
      status_id: tarefa.status_id,
      data_inicial: tarefa.data_inicial,
      prazo: tarefa.prazo,
      data_conclusao: tarefa.data_conclusao,
      execucao: tarefa.execucao,
      tarefa_id: tarefa.projeto_id,
    });
  }

  updateTask() {
    this.taskObj.nome_sub_tarefa = this.formTarefa.value.nome_sub_tarefa;
    this.taskObj.data_inicial = this.formTarefa.value.data_inicial;
    this.taskObj.prazo = this.formTarefa.value.prazo;
    this.taskObj.data_conclusao = this.formTarefa.value.data_conclusao;

    this.nome_tarefa = this.formTarefa.value.nome_sub_tarefa;

    this.tarefaService
      .atualizaSubTarefa(this.taskObj, Number(this.taskObj.id))
      .subscribe((res) => {
        this.tipo_atualização = 'Atualização da Subtarefa';
        this.toastr.success('Atualiação realizada com sucesso!!!');

        const myModal = bootstrap.Modal.getInstance(
          document.getElementById('modalEditTask') as HTMLElement
        );
        if (myModal) {
          myModal.hide();
        }
        // Limpa Form
        this.formTarefa.reset();

        this.saveRegister(this.tipo_atualização);

        // Atualiza página
        this.carregarTarefas(Number(this.projeto_id));
      });
  }

  confirmModal!: any;

  confirmDeleteTarefa(id: number) {
    this.tarefaToDelete = id;
    const el = document.getElementById('confirmDeleteTarefaModal');
    this.confirmModal = new bootstrap.Modal(el);
    this.confirmModal.show();
  }

  deleteTarefa() {
    if (this.tarefaToDelete !== null) {
      this.subTarefaService.deletarSubTarefa(this.tarefaToDelete).subscribe(
        () => {
          // Remove da tabela
          this.projeto.ass_project_cronograma.forEach((cronograma: any) => {
            cronograma.ass_cronograma_task =
              cronograma.ass_cronograma_task.filter(
                (tarefa: any) => tarefa.id !== this.tarefaToDelete
              );
          });

          this.tipo_atualização = 'Deletar Subtarefa';
          this.tarefaToDelete = null;

          // Fecha o modal
          if (this.confirmModal) {
            this.confirmModal.hide();
          }

          this.saveRegister(this.tipo_atualização);
          this.carregarTarefas(Number(this.projeto_id));
        },
        (error) => {
          console.error('Error deleting tarefa', error);
        }
      );
    }
  }

  saveRegister(tipo: string): void {
    this.registro.tipo_acao = tipo;
    this.registro.acao = `A ${tipo} ${this.nome_tarefa} foi atualizada pelo usuário ${this.user_name}`;
    this.auditService.cadastrarRegistros(this.registro).subscribe({
      next: (res: any) => {
        // console.log('registro', res)
      },
      error: (e) => this.toastr.error(e),
    });
  }
}
