import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjetosPageComponent } from './projetos-page.component';

describe('ProjetosPageComponent', () => {
  let component: ProjetosPageComponent;
  let fixture: ComponentFixture<ProjetosPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProjetosPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjetosPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
