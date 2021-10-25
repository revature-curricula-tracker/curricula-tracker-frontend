import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TechnologyOverviewComponent } from './technology-overview.component';

describe('TechnologyOverviewComponent', () => {
  let component: TechnologyOverviewComponent;
  let fixture: ComponentFixture<TechnologyOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TechnologyOverviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TechnologyOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
