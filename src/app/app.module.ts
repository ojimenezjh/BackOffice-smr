import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

// FORMS NGMODEL
import { FormsModule } from '@angular/forms'
import { CommonModule } from '@angular/common/';

// IMPORT API
import { HttpClientModule } from '@angular/common/http';
import { IonicStorageModule } from '@ionic/storage';

// IMPORT PAGES
import { NavigationPage } from './pages/navigation/navigation.page';
import { CardsListPage } from './pages/cards-list/cards-list.page';
import { RegisterPage } from './pages/auth/register/register.page';
import { ViewCardPage } from './pages/cards-list/view-card/view-card.page';
import { CardsFormPage } from './pages/cards-form/cards-form.page';
import { StatisticsPage } from './pages/statistics/statistics.page';

// IMPORT SERVICES
import { ProductService } from '../services/product.service';
import { CardsService } from '../services/cards.service';
import { AuthService } from '../services/auth.service';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { NFC, Ndef } from '@ionic-native/nfc/ngx';

// CDK
import {DragDropModule} from '@angular/cdk/drag-drop';
import { ChartsModule } from 'ng2-charts';
import { LoginPage } from './pages/auth/login/login.page';


@NgModule({
  declarations: [AppComponent, NavigationPage, CardsListPage, RegisterPage, ViewCardPage, CardsFormPage, StatisticsPage ],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, HttpClientModule, IonicStorageModule.forRoot(), FormsModule, NoopAnimationsModule, DragDropModule, ChartsModule],
  providers: [
    NFC,
    Ndef,
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    CardsService,
    ProductService,
    AuthService,
    LoginPage,
    CardsListPage
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
