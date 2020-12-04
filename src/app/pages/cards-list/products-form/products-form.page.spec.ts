import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ProductsFormPage } from './products-form.page';

describe('ProductsFormPage', () => {
  let component: ProductsFormPage;
  let fixture: ComponentFixture<ProductsFormPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductsFormPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ProductsFormPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
