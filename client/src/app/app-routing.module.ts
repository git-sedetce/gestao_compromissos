import { HomeComponent } from './components/paginas/home/home.component';
import { RegisterComponent } from './components/register/register.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { ResetSenhaComponent } from './components/reset-senha/reset-senha.component';
import { CadastroParceiroComponent } from './components/paginas/cadastro-parceiro/cadastro-parceiro.component';
import { authGuard } from './services/auth/auth.guard';
import { ListaUserComponent } from './components/lista-user/lista-user.component';

const routes: Routes = [

  { path: 'cadastro', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'resetsenha', component: ResetSenhaComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'cadastra_parceiro', component: CadastroParceiroComponent, canActivate:[authGuard], data:{ roles:['admin', 'Coordenador', 'Secretario']} },
  { path: 'listUsers', component: ListaUserComponent, canActivate:[authGuard], data:{ roles:['admin']}  },

    //Módulo Compromisso

  { path:'commitment', loadChildren: ()  => import('./compromisso/compromisso.module').then(commit => commit.CompromissoModule) },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
