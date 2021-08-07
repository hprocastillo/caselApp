import {Component, Input, OnInit} from '@angular/core';
import {AngularFireStorage, AngularFireUploadTask} from "@angular/fire/storage";
import {AngularFirestore} from "@angular/fire/firestore";
import {Observable} from "rxjs";
import {finalize, tap} from "rxjs/operators";
import firebase from "firebase/app";
import User = firebase.User;

@Component({
  selector: 'app-upload-contract',
  templateUrl: './upload-contract.component.html',
  styleUrls: ['./upload-contract.component.scss']
})
export class UploadContractComponent implements OnInit {
  @Input() codeContract: string | any;
  today = new Date();
  @Input() user = {} as User;
  @Input() index: any;
  // @ts-ignore
  @Input() file: File;
  // @ts-ignore
  task: AngularFireUploadTask;
  // @ts-ignore
  percentage: Observable<number>;
  // @ts-ignore
  snapshot: Observable<any>;
  // @ts-ignore
  downloadURL: string;

  constructor(private storage: AngularFireStorage, private db: AngularFirestore) {
  }

  ngOnInit() {
    this.startUpload(this.codeContract.toUpperCase(), this.user.uid, this.user.displayName, this.user.email, this.user.photoURL);
  }

  startUpload(codeContract: string, userId: any, userDisplayName: any, userEmail: any, userPhotoUrl: any) {

    // The storage path
    const path = `contracts/${Date.now()}_${this.file.name}`;

    // Reference to storage bucket
    const ref = this.storage.ref(path);

    // The main task
    this.task = this.storage.upload(path, this.file);

    // Progress monitoring
    // @ts-ignore
    this.percentage = this.task.percentageChanges();

    this.snapshot = this.task.snapshotChanges().pipe(
      tap(console.log),
      // The file's download URL
      finalize(async () => {
        this.downloadURL = await ref.getDownloadURL().toPromise();
        await this.db.collection('filesAttachments').add({
          downloadURL: this.downloadURL,
          path,
          codeContract,
          createdAt: this.today,
          updatedAt: this.today,
          userId,
          userDisplayName,
          userEmail,
          userPhotoUrl
        });
      }),
    );
  }

  isActive(snapshot: any) {
    return snapshot.state === 'running' && snapshot.bytesTransferred < snapshot.totalBytes;
  }
}
