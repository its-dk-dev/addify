import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from "angularfire2/firestore";
import { Observable } from "rxjs";
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { map, publish } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
    vendorList: AngularFirestoreCollection<any[]>;
    publisherList: AngularFirestoreCollection<any[]>;
    publishers: Observable<any[]>;

    constructor(private angularFireStore: AngularFirestore) {
      this.vendorList = this.angularFireStore.collection("/vendor");
      this.publisherList = this.angularFireStore.collection("/publisher");
      this.publishers = this.publisherList.snapshotChanges().pipe(
        map(actions =>
          actions.map(a => {
            const data = a.payload.doc.data();
            const id = a.payload.doc.id;
            return { id, ...data };
          })
        )
      );
    }

    addVendor(vendor) {
      this.vendorList.doc(vendor.id).set(vendor);
    }

    addPublisher(publisher) {
      this.publisherList.doc(publisher.id).set(publisher);
    }

    getVendor(id) {
      return this.vendorList.doc(id).valueChanges();
    }

    getPublisher(id) {
      return this.publisherList.doc(id).valueChanges();
    }

    getVendor1(id) {
      return this.vendorList.doc(id).snapshotChanges();
      console.log('i am in firebase ts');
    }

    getPublisher1(id) {
      return this.publisherList.doc(id).snapshotChanges();
      console.log('i am in firebase ts');
    }

    getPublishers() {
      return this.publisherList.valueChanges();
    }

    bidForm(id,docId,bid_data) {
      return this.vendorList.doc(id).collection('bid').doc(docId).set(bid_data);
    }

    deleteBid(vid, bid) {
      return this.vendorList.doc(vid).collection('bid').doc(bid).delete();
    }

    getBidDocId(vid)
    {
      return this.vendorList.doc(vid).collection('bid').ref.doc().id;
    }

    addMessage(uid,msg,flag)
    {
      console.log(msg);

      if(flag === "vendor")
        return this.vendorList.doc(uid).collection('chat').add(msg);
      else
        return this.publisherList.doc(uid).collection('chat').add(msg);

    }

    getVendorBidRequestArray(vid,b_id){
      return this.vendorList.doc(vid).collection('bid').doc(b_id).valueChanges();
    }

    getBid(id) {
      return this.vendorList.doc(id).collection('bid').snapshotChanges().pipe(
        map(changes => {
          return changes.map(doc => {
            return{
              id: doc.payload.doc.id,
              data: doc.payload.doc.data()
            }
          })
        })
      );
    }

    setBidRequestIDToPublisher(pid,vid,bid_req)
    {
      return this.publisherList.doc(pid).collection('bid_requests').doc(vid).set(bid_req);
    }

    getPublisherBidRequestsIds(pid) {
      return this.publisherList.doc(pid).collection('bid_requests').snapshotChanges().pipe(
        map(changes => {
            return changes.map(doc => {
                return{
                    id: doc.payload.doc.id,
                }
            })
        })
      );
    }

    getMyChat(flag,uid){
      if(flag === "vendor")
      {
          return this.vendorList.doc(uid).collection('chat').snapshotChanges().pipe(
            map(changes => {
                return changes.map(doc => {
                    return{
                        id: doc.payload.doc.id,
                        data: doc.payload.doc.data()
                    }
                })
            })
        );
      }
      if(flag === "publisher")
      {
          return this.publisherList.doc(uid).collection('chat').snapshotChanges().pipe(
            map(changes => {
                return changes.map(doc => {
                    return{
                        id: doc.payload.doc.id,
                        data: doc.payload.doc.data()
                    }
                })
            })
        );
      }
    }

    getYourChat(flag,cid){
      if(flag === "vendor")
      {
          return this.publisherList.doc(cid).collection('chat').snapshotChanges().pipe(
            map(changes => {
                return changes.map(doc => {
                    return{
                        id: doc.payload.doc.id,
                        data: doc.payload.doc.data()
                    }
                })
            })
        );
      }
      if(flag === "publisher")
      {
          return this.vendorList.doc(cid).collection('chat').snapshotChanges().pipe(
            map(changes => {
                return changes.map(doc => {
                    return{
                        id: doc.payload.doc.id,
                        data: doc.payload.doc.data()
                    }
                })
            })
        );
      }
    }
}
