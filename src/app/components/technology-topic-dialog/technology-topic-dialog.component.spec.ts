import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TechnologyTopicDialogComponent } from './technology-topic-dialog.component';

describe('TechnologyTopicDialogComponent', () => {
  let component: TechnologyTopicDialogComponent;
  let fixture: ComponentFixture<TechnologyTopicDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TechnologyTopicDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TechnologyTopicDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
