import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatiContentComponent } from './stati-content.component';

describe('StatiContentComponent', () => {
  let component: StatiContentComponent;
  let fixture: ComponentFixture<StatiContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StatiContentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StatiContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
