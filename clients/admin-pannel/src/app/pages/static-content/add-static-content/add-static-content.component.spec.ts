import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddStaticContentComponent } from './add-static-content.component';

describe('AddStaticContentComponent', () => {
  let component: AddStaticContentComponent;
  let fixture: ComponentFixture<AddStaticContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddStaticContentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddStaticContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
