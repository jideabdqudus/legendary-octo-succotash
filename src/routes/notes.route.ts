import { Router } from 'express';
import { Routes } from '@interfaces/routes.interface';
import { NotesController } from '@controllers/notes.controller';

export class NotesRoute implements Routes {
  public path = '/notes';
  public router = Router();
  public notes = new NotesController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.notes.getNotes);
    this.router.get(`${this.path}/:id`, this.notes.getNoteById);
    this.router.post(`${this.path}`, this.notes.createNote);
    this.router.post(`${this.path}/:id`, this.notes.updateNote);
    this.router.delete(`${this.path}/:id`, this.notes.deleteNote);
  }
}
