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
import { HistoryPage } from '../history/history';
import { ProfilYayasanPage } from '../profil-yayasan/profil-yayasan';
import { Home1Page } from '../home1/home1';
import { YayasanPostPage } from '../yayasan-post/yayasan-post';
//import { SumbanganPage } from '../sumbangan/sumbangan';
var TabsYayasanPage = (function () {
    function TabsYayasanPage() {
        this.tab1Root = Home1Page;
        this.tab2Root = YayasanPostPage;
        this.tab3Root = HistoryPage;
        this.tab4Root = ProfilYayasanPage;
    }
    return TabsYayasanPage;
}());
TabsYayasanPage = __decorate([
    Component({
        templateUrl: 'tabs-yayasan.html'
    }),
    __metadata("design:paramtypes", [])
], TabsYayasanPage);
export { TabsYayasanPage };
//# sourceMappingURL=tabs-yayasan.js.map