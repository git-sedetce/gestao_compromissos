import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from '../services/auth/auth.guard';
import { ReuniaoComponent } from './reuniao/reuniao.component';
import { AcompanhamentoComponent } from './acompanhamento/acompanhamento.component';
import { CadastroParticipantesComponent } from './cadastro-participantes/cadastro-participantes.component';
import { MembroReuniaoComponent } from './membro-reuniao/membro-reuniao.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [

  {
    path: 'home',
    component: HomeComponent,
    canActivate: [authGuard],
    data: { roles: ['Admin', 'Coordenador', 'Colaborador', 'Secretario'] },
  },
  {
    path: 'reuniao',
    component: ReuniaoComponent,
    canActivate: [authGuard],
    data: { roles: ['Admin', 'Coordenador', 'Colaborador', 'Secretario'] },
  },
  {
    path: 'acompanhamento',
    component: AcompanhamentoComponent,
    canActivate: [authGuard],
    data: { roles: ['Admin', 'Coordenador', 'Colaborador', 'Secretario'] },
  },
  {
    path: 'membersmeet/:id/cadastro',
    component: CadastroParticipantesComponent,
    canActivate: [authGuard],
    data: { roles: ['Admin', 'Coordenador', 'Colaborador', 'Secretario'] },
  },
  {
    path: 'meet/:id/task',
    component: MembroReuniaoComponent,
    canActivate: [authGuard],
    data: { roles: ['Admin', 'Coordenador', 'Colaborador', 'Secretario'] },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CompromissoRoutingModule {}
