import { Injectable } from '@nestjs/common';
import { FirebaseService } from 'src/firebase/firebase.service';
import { Character } from './characters.dto';

@Injectable()
export class CharactersService {
  private readonly collection = 'characters';

  constructor(private readonly firebaseService: FirebaseService) {}

  async findAll(): Promise<any> {
    const db = this.firebaseService.getFirestore();
    const snapshot = await db.collection(this.collection).get();
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  }

  async findOne(id: string): Promise<any> {
    const db = this.firebaseService.getFirestore();
    const doc = await db.collection(this.collection).doc(id).get();
    if (!doc.exists) {
      throw new Error(`Character with id ${id} not found`);
    }
    return { id: doc.id, ...doc.data() };
  }

  async create(data: Character): Promise<any> {
    const db = this.firebaseService.getFirestore();
    const docRef = await db.collection(this.collection).add(data);
    return { id: docRef.id, ...data };
  }

  async createMultiple(data: Character[]): Promise<any[]> {
    const db = this.firebaseService.getFirestore();
    const docRef = db.collection(this.collection)
    data.forEach(async (character) => {
      await docRef.add(character);
    });
    return  data;
  }

  async remove(id: string): Promise<void> {
    const db = this.firebaseService.getFirestore();
    await db.collection(this.collection).doc(id).delete();
  }

  async getCharacterOfTheDay(): Promise<Character> {
    const characters = await this.findAll();
    if (characters.length === 0) {
      throw new Error('No characters found');
    }

    const now = new Date();
    const utcTime = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()));
    const today = Math.floor(utcTime.getTime() / (1000 * 60 * 60 * 24));
    const index = today % characters.length;

    return characters[index];
  }
  async getCharactersNames(): Promise<Character[]> {
    const characters = await this.findAll()
    const names = characters.map((character) => ({ id: character.id, name: character.name, show: character.attributes.show }))
    return names
  }
}
