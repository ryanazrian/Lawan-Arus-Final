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
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { Http } from '@angular/http';
// Import pages to allow links to the page
// import { SingleItem } from '../../pages/single-item/single-item';
import { PeminatPage } from '../../pages/peminat/peminat';
// Service import for items
import { ItemApi } from '../../services/service';
// The component imports the specific parts from the html and scss file.
// The Http provider is included to make the API call to the service.
var History2Page = (function () {
    // The navController and the ItemApi Service is injected into the constructor
    function History2Page(navCtrl, params, itemApi, loadingController) {
        this.navCtrl = navCtrl;
        this.params = params;
        this.itemApi = itemApi;
        this.loadingController = loadingController;
    }
    // ------------------------------------------------------------------------------------------
    // FUNCTIONS
    // ------------------------------------------------------------------------------------------
    // This is where the data loads from the service.
    // It happens when the view loads for the first time.
    History2Page.prototype.ionViewDidLoad = function () {
        var _this = this;
        var loader = this.loadingController.create({
            content: "Getting items.."
        });
        loader.present();
        this.itemApi.getItems().then(function (data) {
            loader.dismiss();
            _this.items = data;
        });
    };
    // The getItems function is called everytime the searchbar input changes
    History2Page.prototype.getItems = function (searchbar) {
        var _this = this;
        // set q to the value of the searchbar
        var q = searchbar.srcElement.value;
        // if the value is an empty string don't filter the items
        if (!q) {
            // Show loader when search is cancelled
            var loader_1 = this.loadingController.create({
                content: "Getting items.."
            });
            loader_1.present();
            // fetch the data and dismiss loader
            this.itemApi.getItems().then(function (data) {
                loader_1.dismiss();
                _this.items = data;
            });
        }
        this.items = this.items.filter(function (v) {
            if (v.title && q) {
                if (v.title.toLowerCase().indexOf(q.toLowerCase()) > -1) {
                    return true;
                }
                return false;
            }
        });
    };
    // End of Searchbar Code
    // This function is an event to listen to clicks on elements.
    // The SingleItem Page has been included to be passed in this function.
    History2Page.prototype.itemTapped = function ($event, item) {
        this.navCtrl.push(PeminatPage);
    };
    return History2Page;
}());
History2Page = __decorate([
    Component({
        selector: 'page-history2',
        templateUrl: 'history2.html',
        providers: [Http]
    })
    // The generic export class is created with the page name.
    ,
    __metadata("design:paramtypes", [NavController,
        NavParams,
        ItemApi,
        LoadingController])
], History2Page);
export { History2Page };
//# sourceMappingURL=history2.js.map