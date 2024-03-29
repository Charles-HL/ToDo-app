import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/root/app.module';
import { environment } from './environments/environment.prod';
import { enableProdMode } from '@angular/core';

if (environment.production) {
  enableProdMode();
  window.console.debug = () => { } // Disable debug logs on production
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
