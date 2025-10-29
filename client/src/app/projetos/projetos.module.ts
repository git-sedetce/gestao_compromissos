import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjetoRoutingModule } from './projeto-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgxMaskModule } from 'ngx-mask';
import { NgxPaginationModule } from 'ngx-pagination';
import { ToastrModule } from 'ngx-toastr';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { NgxPrintModule } from 'ngx-print';
import { CadastroParceiroComponent } from '../components/paginas/cadastro-parceiro/cadastro-parceiro.component';
import { CadastraMembroProjetoComponent } from './cadastra-membro-projeto/cadastra-membro-projeto.component';
import { CadastraMembroComponent } from './cadastra-membro/cadastra-membro.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { GanttComponent } from './gantt/gantt.component';
import { ProjetosCronogramaComponent } from './projetos-cronograma/projetos-cronograma.component';
import { ProjetosPageComponent } from './projetos-page/projetos-page.component';
import { ProjetosResumoComponent } from './projetos-resumo/projetos-resumo.component';
import { ProjetosComponent } from './projetos/projetos.component';
import { ReunioesComponent } from './reunioes/reunioes.component';
import { SubTarefasComponent } from './sub-tarefas/sub-tarefas.component';
import { TarefasComponent } from './tarefas/tarefas.component';
import { ProjetosMembrosComponent } from './projetos-membros/projetos-membros.component';
import { VerReunioesComponent } from './ver-reunioes/ver-reunioes.component';
import { ListarReunioesComponent } from './listar-reunioes/listar-reunioes.component';



@NgModule({
  declarations: [
    ProjetosComponent,
    ProjetosPageComponent,
    ProjetosResumoComponent,
    ProjetosCronogramaComponent,
    TarefasComponent,
    SubTarefasComponent,
    ReunioesComponent,
    DashboardComponent,
    CadastraMembroComponent,
    CadastroParceiroComponent,
    GanttComponent,
    CadastraMembroProjetoComponent,
    ProjetosMembrosComponent,
    VerReunioesComponent,
    ListarReunioesComponent
  ],
  imports: [
    CommonModule,
    ProjetoRoutingModule,
    AngularEditorModule,
    FormsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
    NgxMaskModule.forChild(),
    FontAwesomeModule,
    NgxPaginationModule,
    HttpClientModule,
    DragDropModule,
    NgxPrintModule,
    FontAwesomeModule,
    NgxPaginationModule
  ]
})
export class ProjetosModule { }
