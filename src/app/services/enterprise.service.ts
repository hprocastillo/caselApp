import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {Enterprise} from "../interfaces/enterprise";
import {AngularFirestore, AngularFirestoreCollection} from "@angular/fire/firestore";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class EnterpriseService {
  enterprises: Observable<Enterprise[]>;
  enterprisesCollection: AngularFirestoreCollection<Enterprise>;

  constructor(private readonly afs: AngularFirestore) {
    this.enterprisesCollection = afs.collection<Enterprise>('enterprises', ref => ref.orderBy('name', 'asc'));
    this.enterprises = this.enterprisesCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Enterprise;
        const id = a.payload.doc.id;
        return {id, ...data};
      })));
  }

  saveEnterprise(enterprise: Enterprise, enterpriseId: string): Promise<void> {
    return new Promise(async (resolve, reject) => {
      try {
        const id = enterpriseId || this.afs.createId();
        const data = {id, ...enterprise};
        const result = await this.enterprisesCollection.doc(id).set(data);
        resolve(result);
      } catch (err) {
        reject(err.message);
      }
    });
  }

  getEnterpriseById(enterpriseId: string) {
    return this.afs.collection<Enterprise>('enterprises').doc(enterpriseId).valueChanges();
  }

  getEnterprises(): any {
    return this.enterprises;
  }

  deleteEnterprise(enterpriseId: string | undefined): Promise<void> {
    return new Promise(async (resolve, reject) => {
      try {
        const result = await this.enterprisesCollection.doc(enterpriseId).delete();
        resolve(result);
      } catch (err) {
        reject(err.message);
      }
    });
  }
}
