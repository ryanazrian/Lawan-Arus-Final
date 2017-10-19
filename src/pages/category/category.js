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
import { SingleItem } from '../../pages/single-item/single-item';
// Service import for items
import { ItemApi } from '../../services/service';
// The component imports the specific parts from the html and scss file.
// The Http provider is included to make the API call to the service.
var CategoryPage = (function () {
    function CategoryPage(navCtrl, navParams, itemApi, loadingController) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.itemApi = itemApi;
        this.loadingController = loadingController;
        //this.category = this.navParams.data;
        this.passedCategory = this.navParams.get('category');
    }
    // ------------------------------------------------------------------------------------------
    // FUNCTIONS
    // ------------------------------------------------------------------------------------------
    // This is where the data loads from the service.
    // It happens when the view loads for the first time.
    CategoryPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        var loader = this.loadingController.create({
            content: "Getting items.."
        });
        loader.present();
        // Get the JSON data from our itemApi
        this.itemApi.getItems().then(function (data) {
            loader.dismiss();
            _this.items = data;
            _this.items = _this.items.filter(function (item) { return item.category == _this.passedCategory; });
        });
    };
    // This function is an event to listen to clicks on elements.
    // The SingleItem Page has been included to be passed in this function.
    CategoryPage.prototype.itemTapped = function ($event, item) {
        this.navCtrl.push(SingleItem, item);
    };
    return CategoryPage;
}());
CategoryPage = __decorate([
    Component({
        selector: 'page-category',
        templateUrl: 'category.html',
        providers: [Http]
    }),
    __metadata("design:paramtypes", [NavController,
        NavParams,
        ItemApi,
        LoadingController])
], CategoryPage);
export { CategoryPage };
//# sourceMappingURL=category.js.map