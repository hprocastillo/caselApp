import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-format-file',
  templateUrl: './format-file.component.html',
  styleUrls: ['./format-file.component.scss']
})
export class FormatFileComponent implements OnInit {
  @Input() filePath: string | any;
  @Input() downloadURL: string | any;
  imageUrl: string = '';
  fileName: string = '';

  constructor() {
  }

  ngOnInit(): void {
    if (this.filePath) {
      const extension = this.filePath.slice(-3);
      this.fileName = this.filePath.slice(24);
      switch (extension) {
        case 'PDF':
          this.imageUrl = './assets/images/formatFiles/pdf.svg';
          break;
        case 'DOC':
          this.imageUrl = './assets/images/formatFiles/doc.svg';
          break;
        case 'OCX':
          this.imageUrl = './assets/images/formatFiles/doc.svg';
          break;
        case 'XLS':
          this.imageUrl = './assets/images/formatFiles/xls.svg';
          break;
        case 'LSX':
          this.imageUrl = './assets/images/formatFiles/xls.svg';
          break;
        case 'PPT':
          this.imageUrl = './assets/images/formatFiles/ppt.svg';
          break;
        case 'PTX':
          this.imageUrl = './assets/images/formatFiles/ppt.svg';
          break;
        case 'PEG':
          this.imageUrl = './assets/images/formatFiles/jpg.svg';
          break;
        case 'JPG':
          this.imageUrl = './assets/images/formatFiles/jpg.svg';
          break;
        case 'PNG':
          this.imageUrl = './assets/images/formatFiles/png.svg';
          break;
        case 'GIF':
          this.imageUrl = './assets/images/formatFiles/gif.svg';
          break;
        case 'ZIP':
          this.imageUrl = './assets/images/formatFiles/zip.svg';
          break;
        case 'RAR':
          this.imageUrl = './assets/images/formatFiles/zip.svg';
          break;
        default:
          break;
      }
    }
  }

}
