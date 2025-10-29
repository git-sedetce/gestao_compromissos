import { Component, ElementRef, Input, OnInit, ViewChild, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ReuniaoService } from '../../services/reuniao.service';
import { Ata } from '../../models/ata.model';
import { NgForm } from '@angular/forms';
import { AngularEditorConfig } from '@kolkov/angular-editor';

@Component({
  selector: 'app-ver-reunioes',
  templateUrl: './ver-reunioes.component.html',
  styleUrl: './ver-reunioes.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush // Tente usar OnPush
})
export class VerReunioesComponent implements OnInit {

   @ViewChild('formInsertAta') formInsertAta!: NgForm

  @Input() projetoId!: number;
  profile_id!: any;
  user_id!: any;
  authenticated: boolean = false;
  have_meet: boolean = false;

  lista_reunioes!: any[];
  cadastroAta!: Ata;
  pauta!: any;
  id_meet!: any;

  maxChars = 5000;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService,
    private serviceMeet: ReuniaoService
  ) {}

  ngOnInit(): void {
    const projetoId = this.route.snapshot.paramMap.get('id');

    this.getPerfil();
    this.pegarReunioes(Number(projetoId));
    this.cadastroAta = new Ata();
  }

  getPerfil() {
    if (typeof localStorage !== 'undefined') {
      const token = localStorage.getItem('access_token');
      if (token) {
        const payload = JSON.parse(atob(token!.split('.')[1]));
        this.profile_id = payload._profile_id;
        this.user_id = payload._id;
        this.authenticated = true;
      }
    }
  }
  pegarReunioes(id: number) {
    this.serviceMeet.reunioesByprojeto(Number(id)).subscribe(
      (data) => {
        if(data.length > 0){
          this.have_meet = true;
          // console.log('meet', data);
          this.lista_reunioes = data;
        }else{
          this.have_meet = false;
        }

      },
      (error) => {
        console.error('Error ao criar a lista de reuniões', error);
      }
    );
  }

  inserirAta(reuniao: any) {
    // console.log('reunião', reuniao);
    this.pauta = reuniao.pauta;
    this.id_meet = reuniao.id;
  }

  cadastrarAta(id: number) {

    // console.log('reuniao_id', id);

    this.serviceMeet.cadastrar_ata(this.cadastroAta, Number(id)).subscribe({
      next: (res: any) => {
        // console.log('res', res);
        this.toastr.success('Ata de reunião cadastrada com sucesso!');
        this.router.navigate(['/projeto/projetos-page']);
      },
      error: (e) => {
        console.error(e);
        this.toastr.error('Problemas ao cadastrar ata');
      },
    });
  }


  editorConfig: AngularEditorConfig = {
      editable: true,
        spellcheck: false,
        height: '20rem',
        minHeight: '5rem',
        maxHeight: 'auto',
        width: 'auto',
        minWidth: '0',
        translate: 'no',
        enableToolbar: true,
        showToolbar: true,
        placeholder: 'Digite a pauta da reunião aqui...',
        defaultParagraphSeparator: 'p',
        defaultFontName: '',
        defaultFontSize: '',
        fonts: [
          {class: 'arial', name: 'Arial'},
          {class: 'times-new-roman', name: 'Times New Roman'},
          {class: 'calibri', name: 'Calibri'},
          {class: 'comic-sans-ms', name: 'Comic Sans MS'}
        ],
        customClasses: [
        {
          name: 'quote',
          class: 'quote',
        },
        {
          name: 'redText',
          class: 'redText'
        },
        {
          name: 'titleText',
          class: 'titleText',
          tag: 'h1',
        },
      ],
      uploadUrl: 'v1/image',
      uploadWithCredentials: false,
      sanitize: false,
      toolbarPosition: 'top',
      toolbarHiddenButtons: [
        ['strikeThrough', 'subscript', 'superscript'],
        ['insertImage', 'insertVideo']
      ]
  };
}
