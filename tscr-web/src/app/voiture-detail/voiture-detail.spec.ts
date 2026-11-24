import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VoitureDetail } from './voiture-detail';

describe('VoitureDetail', () => {
  let component: VoitureDetail;
  let fixture: ComponentFixture<VoitureDetail>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VoitureDetail],
    }).compileComponents();

    fixture = TestBed.createComponent(VoitureDetail);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
