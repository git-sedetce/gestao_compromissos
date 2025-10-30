import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReuniaoComponent } from './reuniao/reuniao.component';
import { AcompanhamentoComponent } from './acompanhamento/acompanhamento.component';
import { CompromissoRoutingModule } from './compromisso-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { CadastroParticipantesComponent } from './cadastro-participantes/cadastro-participantes.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { MembroReuniaoComponent } from './membro-reuniao/membro-reuniao.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgxPrintModule } from 'ngx-print';
import { NgxMaskModule } from 'ngx-mask';
import { HomeComponent } from './home/home.component';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { QuillModule } from 'ngx-quill';
import { CadastroParceiroComponent } from '../components/paginas/cadastro-parceiro/cadastro-parceiro.component';



@NgModule({
  declarations: [
    ReuniaoComponent,
    AcompanhamentoComponent,
    CadastroParticipantesComponent,
    MembroReuniaoComponent,
    HomeComponent,
    CadastroParceiroComponent
  ],
  imports: [
    CommonModule,
    CompromissoRoutingModule,
    ReactiveFormsModule,
    AngularEditorModule,
    HttpClientModule,
    FormsModule,
    ToastrModule.forRoot(),
    NgxPaginationModule,
    FontAwesomeModule,
    NgxPrintModule,
    NgxMaskModule.forChild(),
    QuillModule.forRoot()
  ]
})
export class CompromissoModule { }
