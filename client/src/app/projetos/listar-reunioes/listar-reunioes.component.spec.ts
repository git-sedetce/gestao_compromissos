import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarReunioesComponent } from './listar-reunioes.component';

describe('ListarReunioesComponent', () => {
  let component: ListarReunioesComponent;
  let fixture: ComponentFixture<ListarReunioesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListarReunioesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListarReunioesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
