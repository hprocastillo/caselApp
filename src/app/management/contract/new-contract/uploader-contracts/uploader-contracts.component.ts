import {Component, Input} from '@angular/core';
import firebase from "firebase/app";
import User = firebase.User;

@Component({
  selector: 'app-uploader-contracts',
  templateUrl: './uploader-contracts.component.html',
  styleUrls: ['./uploader-contracts.component.scss']
})
export class UploaderContractsComponent {
  @Input() codeContract: string | any;
  @Input() user = {} as User;
  // @ts-ignore
  isHovering: boolean;

  files: File[] = [];

  toggleHover(event: boolean) {
    this.isHovering = event;
  }

  onDrop(files: FileList) {
    for (let i = 0; i < files.length; i++) {
      // @ts-ignore
      this.files.push(files.item(i));
    }
  }
}
