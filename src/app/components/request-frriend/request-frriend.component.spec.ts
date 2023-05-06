import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestFRriendComponent } from './request-frriend.component';

describe('RequestFRriendComponent', () => {
  let component: RequestFRriendComponent;
  let fixture: ComponentFixture<RequestFRriendComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RequestFRriendComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RequestFRriendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
