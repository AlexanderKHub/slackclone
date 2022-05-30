import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogAddDirectMessageComponent } from './dialog-add-direct-message.component';

describe('DialogAddDirectMessageComponent', () => {
  let component: DialogAddDirectMessageComponent;
  let fixture: ComponentFixture<DialogAddDirectMessageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogAddDirectMessageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogAddDirectMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
