import { Component, OnInit } from '@angular/core';
import { FileRestrictions, SelectEvent, RemoveEvent, UploadEvent } from '@progress/kendo-angular-upload';
@Component({
  selector: 'app-register5110',
  templateUrl: './register5110.component.html',
  styleUrls: ['./register5110.component.css']
})
export class Register5110Component implements OnInit {
  modal;
  productName: string;
  constructor() {}
  ngOnInit(): void {
    if (this.modal) {
      this.productName = this.modal.message.productName;
    }
    console.log(this.modal.message);
  }
  public events: string[] = [];
  public imagePreviews: any[] = [];
  public uploadRestrictions: FileRestrictions = {
    allowedExtensions: ['.jpg', '.png']
  };

  public uploadSaveUrl = 'saveUrl'; // should represent an actual API endpoint
  public uploadRemoveUrl = 'removeUrl'; // should represent an actual API endpoint

  public clearEventHandler(val): void {
    console.log('Clearing the file upload', val);
    this.imagePreviews = [];
  }

  public completeEventHandler(val) {
    this.log(`All files processed`);
  }

  public removeEventHandler(e: RemoveEvent): void {
    this.log(`Removing ${e.files[0].name}`);

    const index = this.imagePreviews.findIndex(item => item.uid === e.files[0].uid);

    if (index >= 0) {
      this.imagePreviews.splice(index, 1);
    }
  }


  public selectEventHandler(e: SelectEvent): void {
    const that = this;

    e.files.forEach((file) => {
      that.log(`File selected: ${file.name}`);

      if (!file.validationErrors) {
        const reader = new FileReader();

        reader.onload = function (ev) {
          const image = {
            src: ev.target['result'],
            uid: file.uid
          };

          that.imagePreviews.unshift(image);
        };

        reader.readAsDataURL(file.rawFile);
      }
    });
  }

  private log(event: string): void {
    console.log('event', event);
    this.events.unshift(`${event}`);
  }

  close() {
    this.modal.close();
  }

  uploadEventHandler(e: UploadEvent) {
    e.data = {
      userID : 1,
      customerNo: 1,
      corporateUserProfileImageURL: '',
      userFile : e.files[0].rawFile
    };
    console.log('e.data', e, this.imagePreviews);
  }
}
