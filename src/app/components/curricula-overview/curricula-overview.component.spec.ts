import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurriculaOverviewComponent } from './curricula-overview.component';

describe('CurriculaOverviewComponent', () => {
  let component: CurriculaOverviewComponent;
  let fixture: ComponentFixture<CurriculaOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CurriculaOverviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CurriculaOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
