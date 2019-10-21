import { Component, NgZone } from '@angular/core';
import { NavController, AlertController } from '@ionic/angular';
import { Task } from '../model/task';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage {
  // taskList: string[] = [];

  tasksToDo: Task[] = [];

  //picture: any;

  taskName: string;

  constructor(
    public navCtrl: NavController,
    public alertCtrl: AlertController,
    private camera: Camera,
    private zone: NgZone,
    private sanitizer: DomSanitizer,
  ) {}

  addTask() {
    if (this.taskName.length > 0) {
      const task = this.taskName;
      // this.taskList.push(task);
      const t: Task = new Task();
      t.details = this.taskName;
      t.picture = 'https://gravatar.com/avatar/dba6bae8c566f9d4041fb9cd9ada7741?d=identicon&f=y';
      this.tasksToDo.push(t);
      this.taskName = '';
    }
  }

  async updateTask(index) {
    const alert = await this.alertCtrl.create({
      header: 'Update Task?',
      message: 'Update your task details.',
      inputs: [{ name: 'editTask', placeholder: 'Task' }],
      buttons: [
        { text: 'Cancel', role: 'cancel' },
        {
          text: 'Update',
          handler: data => {
            // this.taskList[index] = data.editTask;
            this.tasksToDo[index].details = data.editTask;
          }
        }
      ]
    });
    await alert.present();
  }


  updatePhoto(index) {
    const options: CameraOptions = {
      quality: 100,
      targetWidth: 600, 
      sourceType: this.camera.PictureSourceType.CAMERA,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }

    console.log(index);
    this.camera.getPicture(options).then((imageData) => {
      const imageUrl: any = this.sanitizer.bypassSecurityTrustUrl('data:image/jpeg;base64,' + imageData);
      console.log('ImageUrl is - ' + imageUrl);
      this.tasksToDo[index].picture = imageUrl;
    }, (err) => {
     // Handle error
     console.log('Camera issue:' + err);
    });
  }

  deleteTask(index) {
    // this.taskList.splice(index, 1);
    this.tasksToDo.splice(index, 1);
  }
}
