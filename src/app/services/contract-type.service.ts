import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {ContractType} from "../interfaces/contract-type";
import {AngularFirestore, AngularFirestoreCollection} from "@angular/fire/firestore";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class ContractTypeService {

  contractTypes: Observable<ContractType[]>;
  contractTypesCollection: AngularFirestoreCollection<ContractType>;

  constructor(private readonly afs: AngularFirestore) {
    this.contractTypesCollection = afs.collection<ContractType>('contractTypes', ref => ref.orderBy('name', 'asc'));
    this.contractTypes = this.contractTypesCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as ContractType;
        const id = a.payload.doc.id;
        return {id, ...data};
      })));
  }


  saveContractType(contractType: ContractType, contractTypeId: string): Promise<void> {
    return new Promise(async (resolve, reject) => {
      try {
        const id = contractTypeId || this.afs.createId();
        const data = {id, ...contractType};
        const result = await this.contractTypesCollection.doc(id).set(data);
        resolve(result);
      } catch (err) {
        reject(err.message);
      }
    });
  }

  getContractTypeById(contractTypeId: string) {
    return this.afs.collection<ContractType>('contractTypes').doc(contractTypeId).valueChanges();
  }

  getContractTypes(): any {
    return this.contractTypes;
  }

  deleteContractType(contractTypeId: string | undefined): Promise<void> {
    return new Promise(async (resolve, reject) => {
      try {
        const result = await this.contractTypesCollection.doc(contractTypeId).delete();
        resolve(result);
      } catch (err) {
        reject(err.message);
      }
    });
  }
}
