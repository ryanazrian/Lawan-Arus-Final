var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Home1Page } from './home1';
var Home1PageModule = (function () {
    function Home1PageModule() {
    }
    return Home1PageModule;
}());
Home1PageModule = __decorate([
    NgModule({
        declarations: [
            Home1Page,
        ],
        imports: [
            IonicPageModule.forChild(Home1Page),
        ],
        exports: [
            Home1Page
        ]
    })
], Home1PageModule);
export { Home1PageModule };
//# sourceMappingURL=home1.module.js.map