import { Component, OnInit } from '@angular/core';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
@Component({
  selector: 'app-register6000',
  templateUrl: './register6000.component.html',
  styleUrls: ['./register6000.component.css']
})
export class Register6000Component implements OnInit {
  public Editor = ClassicEditor;
  public config = {
      language: 'de'
  };
  constructor() { }

  ngOnInit(): void {
    ClassicEditor.create( document.querySelector( '#editor' ), {
      image: {
          toolbar: ['imageTextAlternative',  'ckfinder', 'imageUpload', '|', 'heading', '|', 'bold', 'italic', '|', 'undo', 'redo' ]
      },
      ckfinder: {
        uploadUrl: '/ckfinder/core/connector/php/connector.php?command=QuickUpload&type=Files&responseType=json'
    }
    }).then(res => {} )
    .catch( err => {
      console.log('errr');
    } );
  }

}
