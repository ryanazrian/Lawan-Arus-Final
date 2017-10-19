import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { IonicStorageModule } from '@ionic/storage';
import { Camera, File } from 'ionic-native';
import { BarangProvider } from '../providers/data_barang_yayasan';
import { Geolocation, GeolocationOptions ,Geoposition ,PositionError }  from '@ionic-native/geolocation';

// Http import
import { HttpModule } from '@angular/http';

// Page imports
import { CategoryPage } from '../pages/category/category';
import { ListPage } from '../pages/list/list';
import { HomePage } from '../pages/home/home';
import { ProfilPage } from '../pages/profil/profil';
import { TabsPage } from '../pages/tabs-donatur/tabs';
import { SingleItem } from '../pages/single-item/single-item';
import { LoginPage } from '../pages/login-donatur/login';
import { SumbangPage } from '../pages/sumbang/sumbang';
import { MainPage } from '../pages/main/main';
import { DetailPage } from '../pages/detail/detail';
import { PeminatPage } from '../pages/peminat/peminat';
import { Detail1Page } from '../pages/detail1/detail1';
import { YayasanKebutuhanPage } from '../pages/yayasan-kebutuhan/yayasan-kebutuhan';
import { YayasanJenisPage } from '../pages/yayasan-jenis/yayasan-jenis';
import { YayasanBarangPage } from '../pages/yayasan-barang/yayasan-barang';
import { RegisterPage } from '../pages/register-donatur/register';
import { CariYayasanPage } from '../pages/cari-yayasan/cari-yayasan';
import { Detail2Page } from '../pages/detail2/detail2';
import { LoginYayasanPage } from '../pages/login-yayasan/login-yayasan';
import { RegisterYayasanPage } from '../pages/register-yayasan/register-yayasan';
import { SettingsPage } from '../pages/settings/settings';
import { HistoryPage } from '../pages/history/history';
import { SumbanganPage } from '../pages/sumbangan/sumbangan';
import { TabsYayasanPage } from '../pages/tabs-yayasan/tabs-yayasan';
import { Home1Page } from '../pages/home1/home1';
import { YayasanPostPage } from '../pages/yayasan-post/yayasan-post';
import { LoginKurirPage } from '../pages/login-kurir/login-kurir';
import { RegisterKurirPage } from '../pages/register-kurir/register-kurir';
import { KurirPilihPage } from '../pages/kurir-pilih/kurir-pilih';
import { History2Page } from '../pages/history2/history2';
import { Home2Page } from '../pages/home2/home2';
import { KurirPage } from '../pages/kurir/kurir';
import { TabsKurirPage } from '../pages/tabs-kurir/tabs-kurir';
import { Settings2Page } from '../pages/settings2/settings2';
import { LoggedInPage } from '../pages/logged-in/logged-in';
import { EditDonaturPage } from '../pages/edit-donatur/edit-donatur';
import { ProfilYayasanPage } from '../pages/profil-yayasan/profil-yayasan';
import { EditYayasanPage } from '../pages/edit-yayasan/edit-yayasan';
import { Data } from '../providers/data';
import { PetaPage } from '../pages/peta/peta';

// Service imports
import { ItemApi } from '../services/item-api.service';

// Native imports
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

const firebaseAuth = {
    apiKey: "AIzaSyBmdA3mJHxTCx3rINnd5qxxu8o9I_Lm1yU",
    authDomain: "sumbangin-ab4f6.firebaseapp.com",
    databaseURL: "https://sumbangin-ab4f6.firebaseio.com",
    projectId: "sumbangin-ab4f6",
    storageBucket: "sumbangin-ab4f6.appspot.com",
    messagingSenderId: "461064119857"
  };

@NgModule({
  declarations: [
    MyApp,
    CategoryPage,
    ListPage,
    ProfilPage,
    HomePage,
    SingleItem,
    TabsPage,
    LoginPage,
    SumbangPage,
    MainPage,
    DetailPage,
    PeminatPage,
    Detail1Page,
    YayasanKebutuhanPage,
    YayasanJenisPage,
    YayasanBarangPage,
    RegisterPage,
    CariYayasanPage,
    Detail2Page,
    LoginYayasanPage,
    RegisterYayasanPage,
    SettingsPage,
    SumbanganPage,
    HistoryPage,
    TabsYayasanPage,
    Home1Page,
    YayasanPostPage,
    LoginKurirPage,
    RegisterKurirPage,
    KurirPilihPage,
    History2Page,
    Home2Page,
    KurirPage,
    TabsKurirPage,
    Settings2Page,
    LoggedInPage,
    EditDonaturPage,
    ProfilYayasanPage,
    EditYayasanPage,
    PetaPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseAuth),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    CategoryPage,
    ProfilPage,
    ListPage,
    HomePage,
    SingleItem,
    TabsPage,
    LoginPage,
    SumbangPage,
    MainPage,
    DetailPage,
    PeminatPage,
    Detail1Page,
    YayasanKebutuhanPage,
    YayasanJenisPage,
    YayasanBarangPage,
    RegisterPage,
    CariYayasanPage,
    Detail2Page,
    LoginYayasanPage,
    RegisterYayasanPage,
    SettingsPage,
    SumbanganPage,
    HistoryPage,
    TabsYayasanPage,
    Home1Page,
    YayasanPostPage,
    LoginKurirPage,
    RegisterKurirPage,
    KurirPilihPage,
    History2Page,
    Home2Page,
    KurirPage,
    TabsKurirPage,
    Settings2Page,
    LoggedInPage,
    EditDonaturPage,
    ProfilYayasanPage,
    EditYayasanPage,
    PetaPage
  ],
  providers: [
    StatusBar, //save data
    SplashScreen,
    ItemApi,
    HttpModule,
    Data,
    Camera,
    BarangProvider,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    Geolocation
  ]
})
export class AppModule {}
