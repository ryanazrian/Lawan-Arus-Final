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
import { Home2Page } from '../home2/home2';
import { Settings2Page } from '../settings2/settings2';
import { KurirPage } from '../kurir/kurir';
import { History2Page } from '../history2/history2';
var TabsKurirPage = (function () {
    function TabsKurirPage() {
        this.tab1Root = Home2Page;
        this.tab2Root = KurirPage;
        this.tab3Root = History2Page;
        this.tab4Root = Settings2Page;
    }
    return TabsKurirPage;
}());
TabsKurirPage = __decorate([
    Component({
        templateUrl: 'tabs-kurir.html'
    }),
    __metadata("design:paramtypes", [])
], TabsKurirPage);
export { TabsKurirPage };
//# sourceMappingURL=tabs-kurir.js.map