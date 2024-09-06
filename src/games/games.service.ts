import { Injectable, NotFoundException } from '@nestjs/common';
import { Game } from './interface/game.interface';
 
@Injectable()
export class GamesService {
  private games: Game[] = [];
  private nextId = 1;
 
  findAll(): Game[] {
    return this.games;
  }
 
  findOne(id: number): Game {
    const game = this.games.find(game => game.id === id);
    if (!game) {
      throw new NotFoundException(`Game with ID ${id} not found`);
    }
    return game;
  }
 
  create(newGame: Omit<Game, 'id'>): Game {
    const game: Game = {
      id: this.nextId++,
      ...newGame,
    };
    this.games.push(game);
    return game;
  }
 
  update(id: number, updateGame: Partial<Omit<Game, 'id'>>): Game {

    console.log('entrando na ATTTTT', updateGame);
    const index = this.games.findIndex(game => game.id === id);
    if (index === -1) {
      throw new NotFoundException(`Game with ID ${id} not found`);
    }
    this.games[index] = { ...this.games[index], ...updateGame };
    return this.games[index];
  }
 
  remove(id: number): void {
    const index = this.games.findIndex(game => game.id === id);
    if (index === -1) {
      throw new NotFoundException(`Game with ID ${id} not found`);
    }
    this.games.splice(index, 1);
  }
}
