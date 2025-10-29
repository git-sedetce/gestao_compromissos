import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjetosMembrosComponent } from './projetos-membros.component';

describe('ProjetosMembrosComponent', () => {
  let component: ProjetosMembrosComponent;
  let fixture: ComponentFixture<ProjetosMembrosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProjetosMembrosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProjetosMembrosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
