import { Injectable, OnModuleInit } from '@nestjs/common';
import * as admin from 'firebase-admin';


@Injectable()
export class FirebaseService implements OnModuleInit {
  private static app: admin.app.App;
  private db: FirebaseFirestore.Firestore;

  onModuleInit() {
    if (!FirebaseService.app) {
      FirebaseService.app = admin.initializeApp({
        credential: admin.credential.cert(require('../../firebase-adminsdk.json')),
      });
    }
    this.db = FirebaseService.app.firestore();
  }

  getFirestore(): FirebaseFirestore.Firestore {
    return this.db;
  }
}
