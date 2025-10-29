import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AtracaoComponent } from "./cadastros/atracao/atracao.component";
import { authGuard } from "../services/auth/auth.guard";
import { FdiComponent } from "./cadastros/fdi/fdi.component";
import { HomeComponent } from "./home/home.component";
import { SimaComponent } from "./cadastros/sima/sima.component";
import { InauguracaoComponent } from "./cadastros/inauguracao/inauguracao.component";
import { EditarInauguracaoComponent } from "./editar/editar-inauguracao/editar-inauguracao.component";
import { EditarSimaComponent } from "./editar/editar-sima/editar-sima.component";
import { EditarEmpresasComponent } from "./editar/editar-empresas/editar-empresas.component";
import { CadastroEmpresaComponent } from "./cadastros/cadastro-empresa/cadastro-empresa.component";

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
    canActivate:[authGuard], data:{ roles: ['admin', 'Coordenador', 'Secretario', 'Colaborador'] }
  },
  {
    path: 'atracao',
    component: AtracaoComponent,
    canActivate:[authGuard], data:{ roles: ['admin', 'Coordenador', 'Secretario', 'Colaborador'] }
  },
  {
    path: 'fdi',
    component: FdiComponent,
    canActivate:[authGuard], data:{ roles: ['admin', 'Coordenador', 'Secretario'] }
  },

  { path: 'empresa/:id/fdi', component: FdiComponent },

  {
    path: 'cadastroempresa',
    component: CadastroEmpresaComponent,
    canActivate:[authGuard], data:{ roles: ['admin', 'Coordenador', 'Secretario', 'Colaborador'] }
  },
  {
    path: 'cadastrosima',
    component: SimaComponent,
    canActivate:[authGuard], data:{ roles: ['admin', 'Coordenador', 'Secretario', 'Colaborador'] }
  },
  {
    path: 'cadastroinauguracao',
    component: InauguracaoComponent,
    canActivate:[authGuard], data:{ roles: ['admin', 'Coordenador', 'Secretario', 'Colaborador'] }
  },

  {
    path: 'editarcompany',
    component: EditarEmpresasComponent,
    canActivate:[authGuard], data:{ roles: ['admin', 'Coordenador', 'Secretario', 'Colaborador'] }
  },

  {
    path: 'editarsima',
    component: EditarSimaComponent,
    canActivate:[authGuard], data:{ roles: ['admin', 'Coordenador', 'Secretario', 'Colaborador'] }
  },

  {
    path: 'editarinauguracao',
    component: EditarInauguracaoComponent,
    canActivate:[authGuard], data:{ roles: ['admin', 'Coordenador', 'Secretario', 'Colaborador'] }
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IndustriaRoutingModule { }
