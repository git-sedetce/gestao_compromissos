import { Component, OnInit } from '@angular/core';
import { CadastroProjetosService } from '../../services/cadastro-projetos.service';
import { TarefaService } from '../../services/tarefa.service';
import { SubTarefaService } from '../../services/subtarefa.service';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-gantt',
  templateUrl: './gantt.component.html',
  styleUrl: './gantt.component.css',
})
export class GanttComponent implements OnInit {
  lista_tarefa!: any[];
  task_list!: any[];

  constructor(
    private route: ActivatedRoute,
    private cadastroProjetosService: CadastroProjetosService,
    private tarefaService: TarefaService,
    private subTarefaService: SubTarefaService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {}

  getTarefa() {
    this.tarefaService.getTarefa('allTarefa').subscribe(
      (cr: any[]) => {
        this.lista_tarefa = cr;
        // console.log('lista_tarefa', this.lista_tarefa);
      },
      (erro: any) => console.error('erro', erro)
    );
  }

  getTask() {
    this.subTarefaService.getTarefa('allTask').subscribe(
      (tsk: any[]) => {
        this.task_list = tsk;
        // console.log('task_list', this.task_list);
      },
      (erro: any) => console.error('erro', erro)
    );
  }
}
