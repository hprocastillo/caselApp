import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {FileAttachment} from "../interfaces/file-attachment";
import {AngularFirestore, AngularFirestoreCollection} from "@angular/fire/firestore";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class FileAttachmentService {
  files: Observable<FileAttachment[]>;
  filesCollection: AngularFirestoreCollection<FileAttachment>;

  constructor(private readonly afs: AngularFirestore) {
    this.filesCollection = afs.collection<FileAttachment>('filesAttachments');
    this.files = this.filesCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as FileAttachment;
        const id = a.payload.doc.id;
        return {id, ...data};
      })));
  }

  saveFile(file: FileAttachment, fileId: string): Promise<void> {
    return new Promise(async (resolve, reject) => {
      try {
        const id = fileId || this.afs.createId();
        const data = {id, ...file};
        const result = await this.filesCollection.doc(id).set(data);
        resolve(result);
      } catch (err) {
        reject(err.message);
      }
    });
  }

  getFilesByCodeContract(codeContract: string) {
    return this.afs.collection<FileAttachment>('filesAttachments', ref => ref.where('codeContract', '==', codeContract))
      .snapshotChanges().pipe(map(actions => actions.map(a => {
        const data = a.payload.doc.data() as FileAttachment;
        const id = a.payload.doc.id;
        return {id, ...data};
      })));
  }

  getFileById(fileId: string) {
    return this.afs.collection<FileAttachment>('filesAttachments').doc(fileId).valueChanges();
  }

  getFiles(): any {
    return this.files;
  }

  deleteFile(fileId: string): Promise<void> {
    return new Promise(async (resolve, reject) => {
      try {
        const result = await this.filesCollection.doc(fileId).delete();
        resolve(result);
      } catch (err) {
        reject(err.message);
      }
    });
  }

}
