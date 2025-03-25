import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { appProviders } from './app/app.routes';  // ✅ Import appProviders

bootstrapApplication(AppComponent, {
  providers: [
    ...appProviders,  // ✅ Use providers from routes.ts
    provideHttpClient(withInterceptorsFromDi())  // ✅ Ensure HttpClient works
  ]
}).catch(err => console.error(err));
