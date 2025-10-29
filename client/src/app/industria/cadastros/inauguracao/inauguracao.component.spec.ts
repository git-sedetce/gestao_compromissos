import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InauguracaoComponent } from './inauguracao.component';

describe('InauguracaoComponent', () => {
  let component: InauguracaoComponent;
  let fixture: ComponentFixture<InauguracaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InauguracaoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InauguracaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
