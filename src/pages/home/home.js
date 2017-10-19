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
import { IonicPage, NavController, NavParams, App, AlertController } from 'ionic-angular';
import { DetailPage } from '../detail/detail';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { BarangProvider } from '../../providers/data_barang_yayasan';
/**
 * Generated class for the HomePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var HomePage = (function () {
    // public barang_yayasan:Array<any>;
    // public option={
    //   sourceType:Camera.PictureSourceType.SAVEPHOTOALBUM,
    //   mediaType:Camera.mediaType.ALLMEDIA,
    //   destinationType:Camera.DestinationType.FILE_URI
    // }
    // public Fbref:any;
    function HomePage(navCtrl, navParams, app, alertCtrl, fire, firedata, BarangProvider) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.app = app;
        this.alertCtrl = alertCtrl;
        this.fire = fire;
        this.firedata = firedata;
        this.BarangProvider = BarangProvider;
        //this.Fbref=firebase.storage().ref()
        var yayasan = this.firedata.list('/data_barang_yayasan/').subscribe(function (data) {
            console.log(data);
            _this.yayasan = data;
        });
    }
    // getMedia(){
    //   Camera.getPicture(this.option).then(fileuri=>{
    //     window.resolvelocalFileSystemURL("file://"+fileuri, FE=>{
    //       FE.file(file=>{
    //         const FR=new FileReader()
    //         FR.onloadend=(res:any)=>{
    //           let AF=res.target.result
    //           let blob=new Blob([new Uint8Array(AF)], {type:'video/mp4'})
    //           this.upload(blob)
    //         };
    //         FR.readAsArrayBuffer(file);
    //       })
    //     })
    //   })
    // }
    // upload(blob:Blob){
    //   this.Fbref.child('vid').put(blob);
    // }
    HomePage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad HomePage');
        //     this.BarangProvider.getBarang().on('value', eventListSnapshot => {
        //   this.barang_yayasan = [];
        //   eventListSnapshot.forEach( snap => {
        //     this.barang_yayasan.push({
        //       nama_barang: snap.val().nama_barang,
        //       volume_barang: snap.val().volume_barang,
        //       berat_barang: snap.val().volume_barang,
        //       jenis_barang: snap.val().jenis_barang,
        //     });
        //     return false;
        //   });
        // });
    };
    // detail(){
    // //this.navCtrl.setRoot(DetailPage);
    //   this.navCtrl.push(DetailPage);
    // }
    HomePage.prototype.itemTapped = function (data) {
        this.navCtrl.push(DetailPage, data);
    };
    return HomePage;
}());
HomePage = __decorate([
    IonicPage(),
    Component({
        selector: 'page-home',
        templateUrl: 'home.html',
    }),
    __metadata("design:paramtypes", [NavController,
        NavParams,
        App, AlertController,
        AngularFireAuth,
        AngularFireDatabase,
        BarangProvider])
], HomePage);
export { HomePage };
//# sourceMappingURL=home.js.map