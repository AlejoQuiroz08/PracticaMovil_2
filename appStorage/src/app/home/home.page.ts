import { Component } from '@angular/core';

import { Router } from '@angular/router';

import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

import { AlertController, LoadingController } from '@ionic/angular';

import { AuthService } from '../services/auth.service';

import { AvatarService } from '../services/avatar.service';

  

@Component({

selector: 'app-home',

templateUrl: 'home.page.html',

styleUrls: ['home.page.scss'],

})

export class HomePage {

profile: any = null;

  

constructor(

private avatarService: AvatarService,

private authService: AuthService,

private router: Router,

private loadingController: LoadingController,

private alertController: AlertController

) {

this.loadUserProfile();

}

  

private loadUserProfile(): void {

this.avatarService.getUserProfile().subscribe(

(data) => {

this.profile = data;

},

(error) => {

console.error('Error loading user profile:', error);

this.showAlert('Error', 'There was an issue loading your profile.');

}

);

}

  

async logout(): Promise<void> {

try {

await this.authService.logout();

await this.router.navigateByUrl('/', { replaceUrl: true });

} catch (error) {

console.error('Error logging out:', error);

this.showAlert('Logout Failed', 'There was an error while logging you out.');

}

}

  

async changeImage(): Promise<void> {

try {

const image = await Camera.getPhoto({

quality: 90,

allowEditing: false,

resultType: CameraResultType.Base64,

source: CameraSource.Photos, // Camera, Photos or Prompt!

});

  

if (image) {

const loading = await this.loadingController.create();

await loading.present();

  

const result = await this.avatarService.uploadImage(image);

loading.dismiss();

  

if (!result) {

await this.showAlert('Upload Failed', 'There was a problem uploading your avatar.');

}

}

} catch (error) {

console.error('Error changing image:', error);

await this.showAlert('Error', 'There was a problem accessing the camera or uploading the image.');

}

}

  

private async showAlert(header: string, message: string): Promise<void> {

const alert = await this.alertController.create({

header,

message,

buttons: ['OK'],

});

await alert.present();

}

}