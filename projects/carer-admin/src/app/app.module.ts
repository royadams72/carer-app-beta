import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { reducers, metaReducers } from './state/reducers';
import { EffectsModule } from '@ngrx/effects';
import { AppEffects } from './state/effects/app.effects';
import { NurseEffects } from './state/effects/nurse.effects';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from '../environments/environment';
import { NursesService } from './shared/services/nurses/nurses.service';
import { NavigationComponent } from './shared/components/navigation/navigation.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './core/modules/material-module';
import { FormService } from './shared/services/forms/form.service';


@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireModule,
    AngularFirestoreModule,
    StoreModule.forRoot(reducers, { metaReducers }),
    StoreDevtoolsModule.instrument({ maxAge: 25 }),
    EffectsModule.forRoot([AppEffects, NurseEffects]),
    BrowserAnimationsModule,
    MaterialModule
  ],
  providers: [NursesService, FormService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
