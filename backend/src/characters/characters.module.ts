import { Module } from '@nestjs/common';
import { CharactersService } from './characters.service';
import { CharactersController } from './characters.controller';
import { FirebaseService } from 'src/firebase/firebase.service';

@Module({
  providers: [CharactersService, FirebaseService],
  controllers: [CharactersController]
})
export class CharactersModule {}
