import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {FileAttachmentService} from "../../../services/file-attachment.service";
import {Subject} from "rxjs";
import {takeUntil} from "rxjs/operators";
import {FileAttachment} from "../../../interfaces/file-attachment";

@Component({
  selector: 'app-files-attachments',
  templateUrl: './files-attachments.component.html',
  styleUrls: ['./files-attachments.component.scss']
})
export class FilesAttachmentsComponent implements OnInit, OnDestroy {
  @Input() codeContract: string | any;
  files: FileAttachment[] = [];
  private unsubscribe$ = new Subject<void>();

  constructor(private fileAttachmentSvc: FileAttachmentService) {
  }

  ngOnInit(): void {
    if (this.codeContract) {
      this.fileAttachmentSvc.getFilesByCodeContract(this.codeContract)
        .pipe(
          takeUntil(this.unsubscribe$)
        ).subscribe(
        (res: FileAttachment[]) => {
          this.files = res;
        });
    }
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
