import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CardsFormPage } from './cards-form.page';

describe('CardsFormPage', () => {
  let component: CardsFormPage;
  let fixture: ComponentFixture<CardsFormPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardsFormPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CardsFormPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
