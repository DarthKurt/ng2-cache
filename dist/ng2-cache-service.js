"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var cache_local_storage_service_1 = require("./src/services/storage/local-storage/cache-local-storage.service");
var cache_service_1 = require("./src/services/cache.service");
var cache_storage_abstract_service_1 = require("./src/services/storage/cache-storage-abstract.service");
var cache_service_2 = require("./src/services/cache.service");
exports.CacheService = cache_service_2.CacheService;
var LocalStorageServiceModule = (function () {
    function LocalStorageServiceModule() {
    }
    return LocalStorageServiceModule;
}());
LocalStorageServiceModule = __decorate([
    core_1.NgModule({
        providers: [cache_service_1.CacheService, { provide: cache_storage_abstract_service_1.CacheStorageAbstract, useClass: cache_local_storage_service_1.CacheLocalStorage }]
    })
], LocalStorageServiceModule);
exports.LocalStorageServiceModule = LocalStorageServiceModule;
