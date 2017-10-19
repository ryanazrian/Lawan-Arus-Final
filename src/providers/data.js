var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Storage } from '@ionic/storage';
var Data = (function () {
    function Data(http, storage) {
        this.http = http;
        this.storage = storage;
        this.HAS_LOGGED_IN = 'status_login';
        console.log('Hello data provider');
    }
    Data.prototype.login = function (data, role) {
        this.storage.set(this.HAS_LOGGED_IN, true);
        this.storage.set('user_data', data);
        this.storage.set('role', role);
    };
    ;
    Data.prototype.logout = function () {
        this.storage.remove(this.HAS_LOGGED_IN);
        this.storage.remove('user_data');
        this.storage.remove('role');
    };
    ;
    Data.prototype.isLogin = function () {
        return this.storage.get(this.HAS_LOGGED_IN).then(function (value) {
            return value;
        });
    };
    Data.prototype.getRole = function () {
        return this.storage.get('role').then(function (value) {
            return value;
        });
    };
    return Data;
}());
Data = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [Http, Storage])
], Data);
export { Data };
//# sourceMappingURL=data.js.map