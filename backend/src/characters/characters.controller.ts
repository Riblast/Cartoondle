import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CharactersService } from './characters.service';
import { Character } from './characters.dto';

@Controller('characters')
export class CharactersController {
  constructor(private readonly charactersService: CharactersService) {}

  @Get()
  async findAll() {
    return this.charactersService.findAll();
  }

  @Get('/names')
  async getCharactersNames() {
    return this.charactersService.getCharactersNames()
  }

  @Get('/daily')
  async getCharacterOfTheDay() {
    return this.charactersService.getCharacterOfTheDay();
  }

  @Get('/:id')
  async findOne(@Param('id') id: string) {
    return this.charactersService.findOne(id);
  }

  @Post('/create')
  async create(@Body() body: Character) {
    return this.charactersService.create(body);
  }

  @Post('/createMultiple')
  async createMultiple(@Body() body: Character[]) {
    return this.charactersService.createMultiple(body);
  }
  
  @Delete('/:id')
  async remove(@Param('id') id: string) {
    return this.charactersService.remove(id);
  }
}
