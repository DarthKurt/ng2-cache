"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var cache_storage_abstract_service_1 = require("./storage/cache-storage-abstract.service");
var cache_session_storage_service_1 = require("./storage/session-storage/cache-session-storage.service");
var cache_local_storage_service_1 = require("./storage/local-storage/cache-local-storage.service");
var cache_memory_service_1 = require("./storage/memory/cache-memory.service");
var CACHE_PREFIX = 'CacheService';
var DEFAULT_STORAGE = 1 /* SESSION_STORAGE */;
var DEFAULT_ENABLED_STORAGE = 2 /* MEMORY */;
var CacheService = CacheService_1 = (function () {
    function CacheService(_storage) {
        this._storage = _storage;
        /**
         * Default cache options
         * @type CacheOptionsInterface
         * @private
         */
        this._defaultOptions = {
            expires: Number.MAX_VALUE,
            maxAge: Number.MAX_VALUE
        };
        /**
         * Cache prefix
         */
        this._prefix = CACHE_PREFIX;
        this._validateStorage();
    }
    /**
     * Set data to cache
     * @param key
     * @param value
     * @param options
     */
    CacheService.prototype.set = function (key, value, options) {
        var storageKey = this._toStorageKey(key);
        options = options ? options : this._defaultOptions;
        if (this._storage.setItem(storageKey, this._toStorageValue(value, options))) {
            if (!this._isSystemKey(key) && options.tag) {
                this._saveTag(options.tag, storageKey);
            }
            return true;
        }
        return false;
    };
    /**
     * Get data from cache
     * @param key
     * @returns {any}
     */
    CacheService.prototype.get = function (key) {
        var storageValue = this._storage.getItem(this._toStorageKey(key)), value = null;
        if (storageValue) {
            if (this._validateStorageValue(storageValue)) {
                value = storageValue.value;
            }
            else {
                this.remove(key);
            }
        }
        return value;
    };
    /**
     * Check if value exists
     * @param key
     * @returns {boolean}
     */
    CacheService.prototype.exists = function (key) {
        return !!this.get(key);
    };
    /**
     * Remove item from cache
     * @param key
     */
    CacheService.prototype.remove = function (key) {
        this._storage.removeItem(this._toStorageKey(key));
        this._removeFromTag(this._toStorageKey(key));
    };
    /**
     * Remove all from cache
     */
    CacheService.prototype.removeAll = function () {
        this._storage.clear();
    };
    /**
     * Get all tag data
     * @param tag
     * @returns {Array}
     */
    CacheService.prototype.getTagData = function (tag) {
        var _this = this;
        var tags = this.get(this._tagsStorageKey()) || {}, result = {};
        if (tags[tag]) {
            tags[tag].forEach(function (key) {
                var data = _this.get(_this._fromStorageKey(key));
                if (data) {
                    result[_this._fromStorageKey(key)] = data;
                }
            });
        }
        return result;
    };
    /**
     * Create a new instance of cache with needed storage
     * @param type
     * @returns {CacheService}
     */
    CacheService.prototype.useStorage = function (type) {
        var service = new CacheService_1(this._initStorage(type));
        service.setGlobalPrefix(this._getCachePrefix());
        return service;
    };
    /**
     * Remove all by tag
     * @param tag
     */
    CacheService.prototype.removeTag = function (tag) {
        var _this = this;
        var tags = this.get(this._tagsStorageKey()) || {};
        if (tags[tag]) {
            tags[tag].forEach(function (key) {
                _this._storage.removeItem(key);
            });
            delete tags[tag];
            this.set(this._tagsStorageKey(), tags);
        }
    };
    /**
     * Set global cache key prefix
     * @param prefix
     */
    CacheService.prototype.setGlobalPrefix = function (prefix) {
        this._prefix = prefix;
    };
    /**
     * Validate cache storage
     * @private
     */
    CacheService.prototype._validateStorage = function () {
        if (!this._storage) {
            this._storage = this._initStorage(DEFAULT_STORAGE);
        }
        if (!this._storage.isEnabled()) {
            this._storage = this._initStorage(DEFAULT_ENABLED_STORAGE);
        }
    };
    /**
     * Remove key from tags keys list
     * @param key
     * @private
     */
    CacheService.prototype._removeFromTag = function (key) {
        var tags = this.get(this._tagsStorageKey()) || {}, index;
        for (var tag in tags) {
            index = tags[tag].indexOf(key);
            if (index !== -1) {
                tags[tag].splice(index, 1);
                this.set(this._tagsStorageKey(), tags);
                break;
            }
        }
    };
    /**
     * Init storage by type
     * @param type
     * @returns {CacheStorageAbstract}
     */
    CacheService.prototype._initStorage = function (type) {
        var storage;
        switch (type) {
            case 1 /* SESSION_STORAGE */:
                storage = new cache_session_storage_service_1.CacheSessionStorage();
                break;
            case 0 /* LOCAL_STORAGE */:
                storage = new cache_local_storage_service_1.CacheLocalStorage();
                break;
            default: storage = new cache_memory_service_1.CacheMemoryStorage();
        }
        return storage;
    };
    CacheService.prototype._toStorageKey = function (key) {
        return this._getCachePrefix() + key;
    };
    CacheService.prototype._fromStorageKey = function (key) {
        return key.replace(this._getCachePrefix(), '');
    };
    /**
     * Prepare value to set to storage
     * @param value
     * @param options
     * @returns {{value: any, options: CacheOptionsInterface}}
     * @private
     */
    CacheService.prototype._toStorageValue = function (value, options) {
        return {
            value: value,
            options: this._toStorageOptions(options)
        };
    };
    /**
     * Prepare options to set to storage
     * @param options
     * @returns {CacheOptionsInterface}
     * @private
     */
    CacheService.prototype._toStorageOptions = function (options) {
        var storageOptions = {};
        storageOptions.expires = options.expires ? options.expires :
            (options.maxAge ? Date.now() + (options.maxAge * 1000) : this._defaultOptions.expires);
        storageOptions.maxAge = options.maxAge ? options.maxAge : this._defaultOptions.maxAge;
        return storageOptions;
    };
    /**
     * Validate storage value
     * @param value
     * @returns {boolean}
     * @private
     */
    CacheService.prototype._validateStorageValue = function (value) {
        return !!value.options.expires && value.options.expires > Date.now();
    };
    /**
     * check if its system cache key
     * @param key
     * @returns {boolean}
     * @private
     */
    CacheService.prototype._isSystemKey = function (key) {
        return [this._tagsStorageKey()].indexOf(key) !== -1;
    };
    /**
     * Save tag to list of tags
     * @param tag
     * @param key
     * @private
     */
    CacheService.prototype._saveTag = function (tag, key) {
        var tags = this.get(this._tagsStorageKey()) || {};
        if (!tags[tag]) {
            tags[tag] = [key];
        }
        else {
            tags[tag].push(key);
        }
        this.set(this._tagsStorageKey(), tags);
    };
    /**
     * Get global cache prefix
     * @returns {string}
     * @private
     */
    CacheService.prototype._getCachePrefix = function () {
        return this._prefix;
    };
    CacheService.prototype._tagsStorageKey = function () {
        return 'CacheService_tags';
    };
    return CacheService;
}());
CacheService = CacheService_1 = __decorate([
    core_1.Injectable(),
    __param(0, core_1.Optional()),
    __metadata("design:paramtypes", [cache_storage_abstract_service_1.CacheStorageAbstract])
], CacheService);
exports.CacheService = CacheService;
var CacheService_1;
