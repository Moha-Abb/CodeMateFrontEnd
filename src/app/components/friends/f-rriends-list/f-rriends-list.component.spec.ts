import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FRriendsListComponent } from './f-rriends-list.component';

describe('FRriendsListComponent', () => {
  let component: FRriendsListComponent;
  let fixture: ComponentFixture<FRriendsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FRriendsListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FRriendsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
