var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TabsKurirPage } from '../tabs-kurir/tabs-kurir';
import { RegisterKurirPage } from '../register-kurir/register-kurir';
/**
 * Generated class for the LoginKurirPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var LoginKurirPage = (function () {
    function LoginKurirPage(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
    }
    LoginKurirPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad LoginKurirPage');
    };
    LoginKurirPage.prototype.login = function () {
        //this.navCtrl.setRoot(TabsPage);
        this.navCtrl.push(TabsKurirPage);
    };
    LoginKurirPage.prototype.daftar = function () {
        //this.navCtrl.setRoot(TabsPage);
        this.navCtrl.push(RegisterKurirPage);
    };
    return LoginKurirPage;
}());
LoginKurirPage = __decorate([
    IonicPage(),
    Component({
        selector: 'page-login-kurir',
        templateUrl: 'login-kurir.html',
    }),
    __metadata("design:paramtypes", [NavController, NavParams])
], LoginKurirPage);
export { LoginKurirPage };
//# sourceMappingURL=login-kurir.js.map