import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcceptRequestFRriendComponent } from './accept-request-frriend.component';

describe('AcceptRequestFRriendComponent', () => {
  let component: AcceptRequestFRriendComponent;
  let fixture: ComponentFixture<AcceptRequestFRriendComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AcceptRequestFRriendComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AcceptRequestFRriendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
