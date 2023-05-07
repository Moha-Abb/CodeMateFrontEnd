import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContacttComponent } from './contactt.component';

describe('ContacttComponent', () => {
  let component: ContacttComponent;
  let fixture: ComponentFixture<ContacttComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContacttComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContacttComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
