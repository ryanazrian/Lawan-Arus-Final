var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { HistoryPage } from '../history/history';
/**
 * Generated class for the YayasanPostPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var YayasanPostPage = (function () {
    function YayasanPostPage(navCtrl, navParams, alerCtrl, fire, firedata) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.alerCtrl = alerCtrl;
        this.fire = fire;
        this.firedata = firedata;
    }
    YayasanPostPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad YayasanPostPage');
    };
    YayasanPostPage.prototype.doAlert = function () {
        var alert = this.alerCtrl.create({
            title: 'Terima Kasih',
            subTitle: 'Terima Kasih sudah meminta sumbangan, Tunggu donatur menyumbangkan barangnya',
            buttons: ['Ok']
        })
            .present();
    };
    YayasanPostPage.prototype.post = function () {
        var user = this.fire.auth.currentUser;
        this.firedata.list('/data_barang_yayasan/')
            .push({ user: user.uid, nama_barang: this.nama_barang.value, jenis_barang: this.jenis_barang, volume_barang: this.volume_barang.value, keterangan: this.keterangan.value });
        console.log('got data', user);
        /*      console.log(this.nama_barang.value);
              console.log(this.volume_barang.value);
              console.log(this.berat_barang.value);
              console.log(this.keterangan.value);
              console.log(this.jenis_barang);*/
        this.doAlert();
        this.navCtrl.push(HistoryPage);
    };
    return YayasanPostPage;
}());
__decorate([
    ViewChild('nama_barang'),
    __metadata("design:type", Object)
], YayasanPostPage.prototype, "nama_barang", void 0);
__decorate([
    ViewChild('berat_barang'),
    __metadata("design:type", Object)
], YayasanPostPage.prototype, "berat_barang", void 0);
__decorate([
    ViewChild('volume_barang'),
    __metadata("design:type", Object)
], YayasanPostPage.prototype, "volume_barang", void 0);
__decorate([
    ViewChild('keterangan'),
    __metadata("design:type", Object)
], YayasanPostPage.prototype, "keterangan", void 0);
YayasanPostPage = __decorate([
    IonicPage(),
    Component({
        selector: 'page-yayasan-post',
        templateUrl: 'yayasan-post.html',
    }),
    __metadata("design:paramtypes", [NavController,
        NavParams,
        AlertController,
        AngularFireAuth,
        AngularFireDatabase])
], YayasanPostPage);
export { YayasanPostPage };
//# sourceMappingURL=yayasan-post.js.map