import {NgModule}              from '@angular/core';
import {CacheLocalStorage}     from './src/services/storage/local-storage/cache-local-storage.service';
import {CacheMemoryStorage}    from './src/services/storage/memory/cache-memory.service';
import {CacheOptionsInterface} from './src/interfaces/cache-options.interface';
import {CacheService}          from './src/services/cache.service';
import {CacheSessionStorage}   from './src/services/storage/session-storage/cache-session-storage.service';
import {CacheStorageAbstract}  from './src/services/storage/cache-storage-abstract.service';
import {CacheStoragesEnum}     from './src/enums/cache-storages.enum';

export {CacheService}          from './src/services/cache.service';

@NgModule({
    providers: [ CacheService, {provide: CacheStorageAbstract, useClass: CacheLocalStorage} ]
})
export class LocalStorageServiceModule {}