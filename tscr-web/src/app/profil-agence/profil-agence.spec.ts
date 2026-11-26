import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProfilAgence } from './profil-agence';

describe('ProfilAgence', () => {
  let component: ProfilAgence;
  let fixture: ComponentFixture<ProfilAgence>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfilAgence],
    }).compileComponents();

    fixture = TestBed.createComponent(ProfilAgence);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
