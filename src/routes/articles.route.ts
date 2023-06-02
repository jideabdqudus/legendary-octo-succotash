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
    this.router.get(`${this.path}/lookup`, this.articles.searchArticle);
    this.router.get(`${this.path}/:id([a-zA-Z0-9-]+)`, this.articles.getArticleById);
    this.router.get(`${this.path}`, this.articles.getArticles);
    this.router.post(`${this.path}`, this.articles.createArticle);
    this.router.put(`${this.path}/:id([a-zA-Z0-9-]+)`, this.articles.updateArticle);
    this.router.delete(`${this.path}/:id([a-zA-Z0-9-]+)`, this.articles.deleteArticle);
  }
}
