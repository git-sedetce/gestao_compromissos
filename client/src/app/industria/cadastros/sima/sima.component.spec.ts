import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SimaComponent } from './sima.component';

describe('SimaComponent', () => {
  let component: SimaComponent;
  let fixture: ComponentFixture<SimaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SimaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SimaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
