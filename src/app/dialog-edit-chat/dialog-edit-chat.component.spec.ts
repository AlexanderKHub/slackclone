import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogEditChatComponent } from './dialog-edit-chat.component';

describe('DialogEditChatComponent', () => {
  let component: DialogEditChatComponent;
  let fixture: ComponentFixture<DialogEditChatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogEditChatComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogEditChatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
