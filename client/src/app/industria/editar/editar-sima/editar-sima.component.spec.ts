import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarSimaComponent } from './editar-sima.component';

describe('EditarSimaComponent', () => {
  let component: EditarSimaComponent;
  let fixture: ComponentFixture<EditarSimaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditarSimaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditarSimaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
