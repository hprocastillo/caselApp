import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {User} from "../interfaces/user";
import {AngularFirestore, AngularFirestoreCollection} from "@angular/fire/firestore";
import {map} from "rxjs/operators";
import {Alert} from "../interfaces/alert";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  users: Observable<User[]>;
  usersCollection: AngularFirestoreCollection<User>;

  constructor(private readonly afs: AngularFirestore) {
    this.usersCollection = afs.collection<User>('users');
    this.users = this.usersCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as User;
        const id = a.payload.doc.id;
        return {id, ...data};
      })));
  }

  getUserById(userId: string) {
    return this.afs.collection<User>('users', ref => ref.where('id', '==', userId))
      .snapshotChanges().pipe(
        map(actions => actions.map(a => {
          const data = a.payload.doc.data() as User;
          const id = a.payload.doc.id;
          return {id, ...data};
        })));
  }

  getUsers(): any {
    return this.users;
  }

  updateToken(userId: string, token: any): Promise<void> {
    return new Promise(async (resolve, reject) => {
      try {
        const result = await this.usersCollection.doc(userId).update({userToken: token});
        resolve(result);
      } catch (err) {
        reject(err.message);
      }
    });
  }
}
