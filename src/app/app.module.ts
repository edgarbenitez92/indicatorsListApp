import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

// Importants
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// Pages
import { HomeComponent } from './pages/home/home.component';
import { IndicatorDetailsComponent } from './pages/indicator-details/indicator-details.component';

// Pipes
import { IndicatorValuePipe } from './pipes/indicator-value.pipe';

// Shared
import { NavbarComponent } from './shared/navbar/navbar.component';
import { SpinnerComponent } from './shared/spinner/spinner.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    IndicatorDetailsComponent,
    IndicatorValuePipe,
    NavbarComponent,
    SpinnerComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
