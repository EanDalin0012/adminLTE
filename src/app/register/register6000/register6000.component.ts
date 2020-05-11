import { Component, OnInit } from '@angular/core';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@Component({
  selector: 'app-register6000',
  templateUrl: './register6000.component.html',
  styleUrls: ['./register6000.component.css']
})
export class Register6000Component implements OnInit {
  public Editor = ClassicEditor;
  constructor() { }

  ngOnInit(): void {
  }

}
