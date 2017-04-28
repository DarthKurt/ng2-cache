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
var CacheMemoryStorage = (function (_super) {
    __extends(CacheMemoryStorage, _super);
    function CacheMemoryStorage() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._data = {};
        return _this;
    }
    CacheMemoryStorage.prototype.getItem = function (key) {
        return this._data[key] ? this._data[key] : null;
    };
    CacheMemoryStorage.prototype.setItem = function (key, value) {
        this._data[key] = value;
        return true;
    };
    CacheMemoryStorage.prototype.removeItem = function (key) {
        delete this._data[key];
    };
    CacheMemoryStorage.prototype.clear = function () {
        this._data = [];
    };
    CacheMemoryStorage.prototype.type = function () {
        return 2 /* MEMORY */;
    };
    CacheMemoryStorage.prototype.isEnabled = function () {
        return true;
    };
    return CacheMemoryStorage;
}(cache_storage_abstract_service_1.CacheStorageAbstract));
CacheMemoryStorage = __decorate([
    core_1.Injectable()
], CacheMemoryStorage);
exports.CacheMemoryStorage = CacheMemoryStorage;
