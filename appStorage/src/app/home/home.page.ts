import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera';
import { AlertController, LoadingController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';
import { AvatarService } from '../services/avatar.service';
import { DocumentData } from '@angular/fire/firestore';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage {
  profile: DocumentData | null = null;

  constructor(
    private avatarService: AvatarService,
    private authService: AuthService,
    private router: Router,
    private loadingController: LoadingController,
    private alertController: AlertController
  ) {
    this.loadUserProfile();
  }

  loadUserProfile() {
    this.avatarService.getUserProfile().subscribe(
      (data) => {
        if (data) {
          this.profile = data;
        } else {
          console.warn('User profile not found');
        }
      },
      (error) => {
        console.error('Error loading user profile:', error);
      }
    );
  }

  async logout() {
    try {
      await this.authService.logout();
      this.router.navigateByUrl('/', { replaceUrl: true });
    } catch (error) {
      console.error('Logout failed', error);
    }
  }

  async changeImage() {
    try {
      const image: Photo = await Camera.getPhoto({
        quality: 90,
        allowEditing: false,
        resultType: CameraResultType.Base64,
        source: CameraSource.Photos
      });

      if (image) {
        const loading = await this.loadingController.create();
        await loading.present();

        const result = await this.avatarService.uploadImage(image);
        loading.dismiss();

        if (!result) {
          const alert = await this.alertController.create({
            header: 'Upload failed',
            message: 'There was a problem uploading your avatar.',
            buttons: ['OK']
          });
          await alert.present();
        }
      }
    } catch (error) {
      console.error('Error changing image', error);
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'There was an issue with the image upload. Please try again.',
        buttons: ['OK']
      });
      await alert.present();
    }
  }
}
