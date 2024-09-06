import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { GamesService } from './games.service';
import { Game } from './interface/game.interface';
 

@Controller('games') 
export class GamesController {
  constructor(private readonly gamesService: GamesService) {}
 
  @Get()
  findAll(): Game[] {
    return this.gamesService.findAll();
  }
 
  @Get(':id')
  findOne(@Param('id') id: string): Game {
    return this.gamesService.findOne(+id); 
  }
 
  @Post()
  create(@Body() newGame: Omit<Game, 'id'>): Game {
    return this.gamesService.create(newGame);
  }
 
  @Put(':id')
  update(@Param('id') id: string, @Body() updateGame: Partial<Omit<Game, 'id'>>): Game {
    return this.gamesService.update(+id, updateGame); 
  }
 
  @Delete(':id')
  remove(@Param('id') id: string): void {
    this.gamesService.remove(+id); 
}
}