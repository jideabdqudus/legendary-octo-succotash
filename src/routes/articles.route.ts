import { Router } from 'express';
import { ArticlesController } from '@controllers/articles.controller';
import { Routes } from '@interfaces/routes.interface';

export class ArticlesRoute implements Routes {
  public path = '/articles';
  public router = Router();
  public articles = new ArticlesController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.articles.getArticles);
  }
}
