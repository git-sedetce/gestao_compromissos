import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MembroReuniaoComponent } from './membro-reuniao.component';

describe('MembroReuniaoComponent', () => {
  let component: MembroReuniaoComponent;
  let fixture: ComponentFixture<MembroReuniaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MembroReuniaoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MembroReuniaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
