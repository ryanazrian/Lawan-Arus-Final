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
 * Generated class for the Detail1Page page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var Detail1Page = (function () {
    function Detail1Page(navCtrl, navParams, alerCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.alerCtrl = alerCtrl;
    }
    Detail1Page.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad Detail1Page');
    };
    Detail1Page.prototype.doRadio = function () {
        var alert = this.alerCtrl.create({
            title: 'Terima Kasih',
            message: 'Yayasan Akan segera menghubungi anda',
            buttons: ['Ok']
        });
        alert.present();
    };
    return Detail1Page;
}());
Detail1Page = __decorate([
    IonicPage(),
    Component({
        selector: 'page-detail1',
        templateUrl: 'detail1.html',
    }),
    __metadata("design:paramtypes", [NavController, NavParams, AlertController])
], Detail1Page);
export { Detail1Page };
//# sourceMappingURL=detail1.js.map