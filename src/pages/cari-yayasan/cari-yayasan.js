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
import { Detail2Page } from '../detail2/detail2';
/**
 * Generated class for the CariYayasanPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var CariYayasanPage = (function () {
    function CariYayasanPage(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
    }
    CariYayasanPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad CariYayasanPage');
    };
    CariYayasanPage.prototype.detail2 = function () {
        //this.navCtrl.setRoot(Detail2Page);
        this.navCtrl.push(Detail2Page);
    };
    return CariYayasanPage;
}());
CariYayasanPage = __decorate([
    IonicPage(),
    Component({
        selector: 'page-cari-yayasan',
        templateUrl: 'cari-yayasan.html',
    }),
    __metadata("design:paramtypes", [NavController, NavParams])
], CariYayasanPage);
export { CariYayasanPage };
//# sourceMappingURL=cari-yayasan.js.map