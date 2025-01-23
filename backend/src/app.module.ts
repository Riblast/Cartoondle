import { Module } from '@nestjs/common';
import { CharactersModule } from './characters/characters.module';
import { FirebaseModule } from './firebase/firebase.module';

@Module({
  imports: [CharactersModule, FirebaseModule],
  controllers: [],
})
export class AppModule {}
