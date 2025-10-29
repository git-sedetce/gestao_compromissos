import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastraMembroProjetoComponent } from './cadastra-membro-projeto.component';

describe('CadastraMembroProjetoComponent', () => {
  let component: CadastraMembroProjetoComponent;
  let fixture: ComponentFixture<CadastraMembroProjetoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CadastraMembroProjetoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CadastraMembroProjetoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
