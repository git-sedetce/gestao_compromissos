import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TarefasComponent } from './tarefas/tarefas.component';
import { ProjetosComponent } from './projetos/projetos.component';
import { authGuard } from '../services/auth/auth.guard';
import { ProjetosPageComponent } from './projetos-page/projetos-page.component';
import { ProjetosCronogramaComponent } from './projetos-cronograma/projetos-cronograma.component';
import { ProjetosResumoComponent } from './projetos-resumo/projetos-resumo.component';
import { ProjetosMembrosComponent } from './projetos-membros/projetos-membros.component';
import { ReunioesComponent } from './reunioes/reunioes.component';
import { ListarReunioesComponent } from './listar-reunioes/listar-reunioes.component';
import { CadastraMembroComponent } from './cadastra-membro/cadastra-membro.component';
import { SubTarefasComponent } from './sub-tarefas/sub-tarefas.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CadastraMembroProjetoComponent } from './cadastra-membro-projeto/cadastra-membro-projeto.component';

const routes: Routes = [
  { path: 'cadastroTarefa', component: TarefasComponent },
  {
    path: 'projetos',
    component: ProjetosComponent,
    canActivate: [authGuard],
    data: { roles: ['admin', 'Coordenador', 'Secretario'] },
  },
  { path: 'projetos-page', component: ProjetosPageComponent },
  { path: 'projetos/:id/cronograma', component: ProjetosCronogramaComponent },
  { path: 'projetos/:id/resumo', component: ProjetosResumoComponent },
  { path: 'projetos/:id/membros', component: ProjetosMembrosComponent },
  { path: 'projetos/:id/reunioes', component: ReunioesComponent },
  { path: 'projetos/:id/listarMeet', component: ListarReunioesComponent },
  {
    path: 'cadastra_membro',
    component: CadastraMembroComponent,
    canActivate: [authGuard],
    data: { roles: ['admin', 'Coordenador', 'Secretario'] },
  },
  { path: 'subTarefas', component: SubTarefasComponent },
  { path: 'dashboard', component: DashboardComponent },
  {
    path: 'membersproject/:id/cadastromembro',
    component: CadastraMembroProjetoComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProjetoRoutingModule {}
