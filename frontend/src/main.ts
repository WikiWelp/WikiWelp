import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';

import { registerLicense } from '@syncfusion/ej2-base';
registerLicense('Ngo9BigBOggjHTQxAR8/V1JAaF5cX2pCfFN0Q35Zd0NwdUVHY1ZVRXxeQ1ZhSXxVdkJhXH5ddHVUR2VUUE19XEY=');

bootstrapApplication(App, appConfig)
  .catch((err) => console.error(err));
