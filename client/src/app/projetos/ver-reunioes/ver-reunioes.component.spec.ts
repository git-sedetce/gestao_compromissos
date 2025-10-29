import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerReunioesComponent } from './ver-reunioes.component';

describe('VerReunioesComponent', () => {
  let component: VerReunioesComponent;
  let fixture: ComponentFixture<VerReunioesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VerReunioesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VerReunioesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
