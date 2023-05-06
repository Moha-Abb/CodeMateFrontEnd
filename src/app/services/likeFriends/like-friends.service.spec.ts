import { TestBed } from '@angular/core/testing';

import { LikeFriendsService } from './like-friends.service';

describe('LikeFriendsService', () => {
  let service: LikeFriendsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LikeFriendsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
