import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {ContractGoal} from "../interfaces/contract-goal";
import {AngularFirestore, AngularFirestoreCollection} from "@angular/fire/firestore";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class ContractGoalService {
  contractGoals: Observable<ContractGoal[]>;
  contractGoalsCollection: AngularFirestoreCollection<ContractGoal>;

  constructor(private readonly afs: AngularFirestore) {
    this.contractGoalsCollection = afs.collection<ContractGoal>('contractGoals', ref => ref.orderBy('description', 'desc'));
    this.contractGoals = this.contractGoalsCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as ContractGoal;
        const id = a.payload.doc.id;
        return {id, ...data};
      })));
  }


  saveContractGoal(contractGoal: ContractGoal, contractGoalId: string): Promise<void> {
    return new Promise(async (resolve, reject) => {
      try {
        const id = contractGoalId || this.afs.createId();
        const data = {id, ...contractGoal};
        const result = await this.contractGoalsCollection.doc(id).set(data);
        resolve(result);
      } catch (err) {
        reject(err.message);
      }
    });
  }

  getContractGoalById(contractId: string) {
    return this.afs.collection<ContractGoal>('contractGoals').doc(contractId).valueChanges();
  }

  getContractGoals(): any {
    return this.contractGoals;
  }

  deleteContractGoal(contractGoalId: string | undefined): Promise<void> {
    return new Promise(async (resolve, reject) => {
      try {
        const result = await this.contractGoalsCollection.doc(contractGoalId).delete();
        resolve(result);
      } catch (err) {
        reject(err.message);
      }
    });
  }

}
