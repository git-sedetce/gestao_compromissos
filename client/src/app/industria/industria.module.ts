import { ToastrModule } from 'ngx-toastr';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IndustriaRoutingModule } from './industria-routing.module';
import { AtracaoComponent } from './cadastros/atracao/atracao.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxMaskModule } from 'ngx-mask';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgxPaginationModule } from 'ngx-pagination';
import { HttpClientModule } from '@angular/common/http';
import { FdiComponent } from './cadastros/fdi/fdi.component';
import { HomeComponent } from './home/home.component';
import { SimaComponent } from './cadastros/sima/sima.component';
import { InauguracaoComponent } from './cadastros/inauguracao/inauguracao.component';
import { EditarEmpresasComponent } from './editar/editar-empresas/editar-empresas.component';
import { EditarSimaComponent } from './editar/editar-sima/editar-sima.component';
import { EditarInauguracaoComponent } from './editar/editar-inauguracao/editar-inauguracao.component';
import { CadastroEmpresaComponent } from './cadastros/cadastro-empresa/cadastro-empresa.component';



@NgModule({
  declarations: [
    AtracaoComponent,
    FdiComponent,
    HomeComponent,
    CadastroEmpresaComponent,
    SimaComponent,
    InauguracaoComponent,
    EditarEmpresasComponent,
    EditarSimaComponent,
    EditarInauguracaoComponent
  ],
  imports: [
    CommonModule,
    IndustriaRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
    NgxMaskModule.forChild(),
    FontAwesomeModule,
    NgxPaginationModule,
    HttpClientModule
  ]
})
export class IndustriaModule { }
