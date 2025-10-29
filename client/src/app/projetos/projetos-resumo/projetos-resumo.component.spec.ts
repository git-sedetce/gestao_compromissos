import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjetosResumoComponent } from './projetos-resumo.component';

describe('ProjetosResumoComponent', () => {
  let component: ProjetosResumoComponent;
  let fixture: ComponentFixture<ProjetosResumoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProjetosResumoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjetosResumoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
