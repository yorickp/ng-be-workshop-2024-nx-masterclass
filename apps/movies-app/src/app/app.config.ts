import { provideHttpClient } from '@angular/common/http';
import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideFastSVG } from '@push-based/ngx-fast-svg';
import { ENVIRONMENT_TOKEN } from '@nx-workshop/shared/util-env-token';

import { environment } from '../environments/environment';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    { provide: ENVIRONMENT_TOKEN, useValue: environment },
    provideHttpClient(),
    provideRouter(routes),
    provideFastSVG({
      url: (name: string) => `assets/svg-icons/${name}.svg`,
      defaultSize: '12',
    }),
  ],
};
