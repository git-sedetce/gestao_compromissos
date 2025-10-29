import { HomeComponent } from './components/paginas/home/home.component';
import { RegisterComponent } from './components/register/register.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { ResetSenhaComponent } from './components/reset-senha/reset-senha.component';
import { TarefasComponent } from './projetos/tarefas/tarefas.component';
import { ProjetosComponent } from './projetos/projetos/projetos.component';
import { ProjetosPageComponent } from './projetos/projetos-page/projetos-page.component';
import { ProjetosResumoComponent } from './projetos/projetos-resumo/projetos-resumo.component';
import { ProjetosCronogramaComponent } from './projetos/projetos-cronograma/projetos-cronograma.component';
import { ReunioesComponent } from './projetos/reunioes/reunioes.component';
import { SubTarefasComponent } from './projetos/sub-tarefas/sub-tarefas.component';
import { DashboardComponent } from './projetos/dashboard/dashboard.component';
import { CadastraMembroComponent } from './projetos/cadastra-membro/cadastra-membro.component';
import { CadastroParceiroComponent } from './components/paginas/cadastro-parceiro/cadastro-parceiro.component';
import { CadastraMembroProjetoComponent } from './projetos/cadastra-membro-projeto/cadastra-membro-projeto.component';
import { authGuard } from './services/auth/auth.guard';
import { ListaUserComponent } from './components/lista-user/lista-user.component';
import { ProjetosMembrosComponent } from './projetos/projetos-membros/projetos-membros.component';
import { ListarReunioesComponent } from './projetos/listar-reunioes/listar-reunioes.component';

const routes: Routes = [

  { path: 'cadastro', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'resetsenha', component: ResetSenhaComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'cadastra_parceiro', component: CadastroParceiroComponent, canActivate:[authGuard], data:{ roles:['admin', 'Coordenador', 'Secretario']} },
  { path: 'listUsers', component: ListaUserComponent, canActivate:[authGuard], data:{ roles:['admin']}  },

  //Módulo Indústria

  { path:'industria', loadChildren: ()  => import('./industria/industria.module').then(ind => ind.IndustriaModule) },

    //Módulo Compromisso

  { path:'commitment', loadChildren: ()  => import('./compromisso/compromisso.module').then(commit => commit.CompromissoModule) },

  //Módulo Projeto

  { path:'projeto', loadChildren: ()  => import('./projetos/projetos.module').then(prjt => prjt.ProjetosModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
