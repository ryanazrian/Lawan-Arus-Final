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
import { NavController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';
// Service import for items
import { ItemApi } from '../../services/service';
var SingleItem = (function () {
    function SingleItem(navCtrl, navParams, itemApi) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.itemApi = itemApi;
        this.item = this.navParams.data;
        console.log(this.item);
    }
    return SingleItem;
}());
SingleItem = __decorate([
    Component({
        selector: 'page-single-item',
        templateUrl: 'single-item.html',
        providers: [Http]
    }),
    __metadata("design:paramtypes", [NavController,
        NavParams,
        ItemApi])
], SingleItem);
export { SingleItem };
//# sourceMappingURL=single-item.js.map