import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubTarefasComponent } from './sub-tarefas.component';

describe('SubTarefasComponent', () => {
  let component: SubTarefasComponent;
  let fixture: ComponentFixture<SubTarefasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SubTarefasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubTarefasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
