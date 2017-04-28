# ng2-cache-service

Client side caching service for Angular2

## Installation

To install this library, run:

```bash
$ npm install ng2-cache-service --save
```

Usage:

```typescript

import { Component }    from '@angular/core';
import { CacheService } from 'ng2-cache-service';

declare var BUILD_VERSION: string;

@Component({
    selector: 'some-selector',
    template: '<div>Template</div>',
    providers: [ CacheService ]
})
export class ExampleComponent {

    constructor(private _cacheService: CacheService) {}

    public func() {

        //set global prefix as build version
        this._cacheService.setGlobalPrefix(BUILD_VERSION);

        //put some data to cache "forever"
        //returns true is data was cached successfully, otherwise - false
        let result: boolean = this._cacheService.set('key', ['some data']);

        //put some data to cache for 5 minutes (maxAge - in seconds)
        this._cacheService.set('key', ['some data'], {maxAge: 5 * 60});

        //put some data to cache for 1 hour (expires - timestamp with milliseconds)
        this._cacheService.set('key', {'some': 'data'}, {expires: Date.now() + 1000 * 60 * 60});

        //put some data to cache with tag "tag"
        this._cacheService.set('key', 'some data', {tag: 'tag'});
        
        //get some data by key, null - if there is no data or data has expired
        let data: any|null = this._cacheService.get('key');

        //check if data exists in cache
        let exists: boolean = this._cacheService.exists('key');

        //remove all data from cache with tag "tag"
        this._cacheService.removeTag('tag');

        //remove all from cache
        this._cacheService.removeAll();

        //get all data related to tag "tag" :
        // {'key' => 'key data', ...}
        this._cacheService.getTagData('tag');

    }
}

```

By default service store data in session storage, you could select local storage

To change storage to local storage:

```typescript

import { NgModule }                  from 'angular2/core';
import { LocalStorageServiceModule } from 'ng2-cache-service';

@NgModule({
    imports: [
        LocalStorageServiceModule
    ]
})

```

## License
ISC © [Evgeny Popodyanets](https://github.com/DarthKurt)

Originally forked from © [Romanov Evgeny](https://github.com/Jackson88)

