import { CacheOptionsInterface } from '../interfaces/cache-options.interface';
import { CacheStoragesEnum } from '../enums/cache-storages.enum';
import { CacheStorageAbstract } from './storage/cache-storage-abstract.service';
export declare class CacheService {
    private _storage;
    /**
     * Default cache options
     * @type CacheOptionsInterface
     * @private
     */
    private _defaultOptions;
    /**
     * Cache prefix
     */
    private _prefix;
    constructor(_storage: CacheStorageAbstract);
    /**
     * Set data to cache
     * @param key
     * @param value
     * @param options
     */
    set(key: string, value: any, options?: CacheOptionsInterface): boolean;
    /**
     * Get data from cache
     * @param key
     * @returns {any}
     */
    get(key: string): any;
    /**
     * Check if value exists
     * @param key
     * @returns {boolean}
     */
    exists(key: string): boolean;
    /**
     * Remove item from cache
     * @param key
     */
    remove(key: string): void;
    /**
     * Remove all from cache
     */
    removeAll(): void;
    /**
     * Get all tag data
     * @param tag
     * @returns {Array}
     */
    getTagData(tag: string): {
        [key: string]: any;
    };
    /**
     * Create a new instance of cache with needed storage
     * @param type
     * @returns {CacheService}
     */
    useStorage(type: CacheStoragesEnum): CacheService;
    /**
     * Remove all by tag
     * @param tag
     */
    removeTag(tag: string): void;
    /**
     * Set global cache key prefix
     * @param prefix
     */
    setGlobalPrefix(prefix: string): void;
    /**
     * Validate cache storage
     * @private
     */
    private _validateStorage();
    /**
     * Remove key from tags keys list
     * @param key
     * @private
     */
    private _removeFromTag(key);
    /**
     * Init storage by type
     * @param type
     * @returns {CacheStorageAbstract}
     */
    private _initStorage(type);
    private _toStorageKey(key);
    private _fromStorageKey(key);
    /**
     * Prepare value to set to storage
     * @param value
     * @param options
     * @returns {{value: any, options: CacheOptionsInterface}}
     * @private
     */
    private _toStorageValue(value, options);
    /**
     * Prepare options to set to storage
     * @param options
     * @returns {CacheOptionsInterface}
     * @private
     */
    private _toStorageOptions(options);
    /**
     * Validate storage value
     * @param value
     * @returns {boolean}
     * @private
     */
    private _validateStorageValue(value);
    /**
     * check if its system cache key
     * @param key
     * @returns {boolean}
     * @private
     */
    private _isSystemKey(key);
    /**
     * Save tag to list of tags
     * @param tag
     * @param key
     * @private
     */
    private _saveTag(tag, key);
    /**
     * Get global cache prefix
     * @returns {string}
     * @private
     */
    private _getCachePrefix();
    private _tagsStorageKey();
}
