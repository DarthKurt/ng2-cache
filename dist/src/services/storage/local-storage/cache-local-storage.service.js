"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var cache_storage_abstract_service_1 = require("../cache-storage-abstract.service");
/**
 * Service for storing data in local storage
 */
var CacheLocalStorage = (function (_super) {
    __extends(CacheLocalStorage, _super);
    function CacheLocalStorage() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CacheLocalStorage.prototype.getItem = function (key) {
        var value = localStorage.getItem(key);
        return value ? JSON.parse(value) : null;
    };
    CacheLocalStorage.prototype.setItem = function (key, value) {
        try {
            localStorage.setItem(key, JSON.stringify(value));
            return true;
        }
        catch (e) {
            return false;
        }
    };
    CacheLocalStorage.prototype.removeItem = function (key) {
        localStorage.removeItem(key);
    };
    CacheLocalStorage.prototype.clear = function () {
        localStorage.clear();
    };
    CacheLocalStorage.prototype.type = function () {
        return 0 /* LOCAL_STORAGE */;
    };
    CacheLocalStorage.prototype.isEnabled = function () {
        try {
            localStorage.setItem('test', 'test');
            localStorage.removeItem('test');
            return true;
        }
        catch (e) {
            return false;
        }
    };
    return CacheLocalStorage;
}(cache_storage_abstract_service_1.CacheStorageAbstract));
CacheLocalStorage = __decorate([
    core_1.Injectable()
], CacheLocalStorage);
exports.CacheLocalStorage = CacheLocalStorage;
