import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarInauguracaoComponent } from './editar-inauguracao.component';

describe('EditarInauguracaoComponent', () => {
  let component: EditarInauguracaoComponent;
  let fixture: ComponentFixture<EditarInauguracaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditarInauguracaoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditarInauguracaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
