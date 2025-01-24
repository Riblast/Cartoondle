import { Injectable, OnModuleInit } from '@nestjs/common';
import * as admin from 'firebase-admin';
import * as dotenv from "dotenv";
dotenv.config()

@Injectable()
export class FirebaseService implements OnModuleInit {
  private static app: admin.app.App;
  private db: FirebaseFirestore.Firestore;

  onModuleInit() {
    if (!FirebaseService.app) {
      FirebaseService.app = admin.initializeApp({
        credential: admin.credential.cert({
          projectId: process.env.FIREBASE_PROJECT_ID,
          clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
          privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
          }),
      });
    }
    this.db = FirebaseService.app.firestore();
  }

  getFirestore(): FirebaseFirestore.Firestore {
    return this.db;
  }
}
