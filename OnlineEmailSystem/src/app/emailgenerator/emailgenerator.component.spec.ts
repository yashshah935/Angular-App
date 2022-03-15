import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailgeneratorComponent } from './emailgenerator.component';

describe('EmailgeneratorComponent', () => {
  let component: EmailgeneratorComponent;
  let fixture: ComponentFixture<EmailgeneratorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmailgeneratorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmailgeneratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
