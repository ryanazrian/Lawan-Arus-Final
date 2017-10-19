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
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
/**
 * Generated class for the YayasanBarangPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var YayasanBarangPage = (function () {
    function YayasanBarangPage(navCtrl, navParams, alerCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.alerCtrl = alerCtrl;
    }
    YayasanBarangPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad YayasanBarangPage');
    };
    YayasanBarangPage.prototype.minat = function () {
        var alert = this.alerCtrl.create({
            title: 'Terima Kasih',
            message: 'Silahkan tunggu konfirmasi Donatur',
            buttons: ['Ok']
        });
        alert.present();
    };
    return YayasanBarangPage;
}());
YayasanBarangPage = __decorate([
    IonicPage(),
    Component({
        selector: 'page-yayasan-barang',
        templateUrl: 'yayasan-barang.html',
    }),
    __metadata("design:paramtypes", [NavController, NavParams, AlertController])
], YayasanBarangPage);
export { YayasanBarangPage };
//# sourceMappingURL=yayasan-barang.js.map