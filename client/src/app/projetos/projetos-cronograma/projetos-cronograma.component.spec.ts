import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjetosCronogramaComponent } from './projetos-cronograma.component';

describe('ProjetosCronogramaComponent', () => {
  let component: ProjetosCronogramaComponent;
  let fixture: ComponentFixture<ProjetosCronogramaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProjetosCronogramaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjetosCronogramaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
