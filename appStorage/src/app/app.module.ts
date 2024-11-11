import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { environment } from "../environments/environment";
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth'; 
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';  // Importa FormsModule y ReactiveFormsModule

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
	
    IonicModule.forRoot(),
    AppRoutingModule,
    FormsModule,  // Importa FormsModule para formularios de plantilla
    ReactiveFormsModule,  // Importa ReactiveFormsModule para formularios reactivos
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideFirebaseApp(() => initializeApp({
		apiKey: "AIzaSyDp4RCs8UwhBrTNivTVoBkbDwQ_s1LYxLI",
		authDomain: "b-1accc.firebaseapp.com",
		projectId: "b-1accc",
		storageBucket: "b-1accc.firebasestorage.app",
		messagingSenderId: "606986248368",
		appId: "1:606986248368:web:df6c0a16fa5bc4ed9a9b75",
		measurementId: "G-QDN8GEEH17"
	  
    })),
    provideFirestore(() => getFirestore()),
	provideAuth(() => getAuth())
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
