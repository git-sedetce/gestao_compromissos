import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FdiComponent } from './fdi.component';

describe('FdiComponent', () => {
  let component: FdiComponent;
  let fixture: ComponentFixture<FdiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FdiComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FdiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
