import { NextFunction, Request, Response } from 'express';
import { Container } from 'typedi';
import { NeptuneService } from '@services/neptune.service';

export class ArticlesController {
  public neptune = Container.get(NeptuneService);

  public getArticles = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const endpoint = '/gremlin?gremlin=' + encodeURIComponent('g.V().limit(10)');
      const articlesData: any = await this.neptune.getNeptune(endpoint);
      res.status(200).json({ data: [articlesData], message: 'getArticles' });
    } catch (error) {
      next(error);
    }
  };

  public getArticleById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const id = req.params.id;
      const endpoint = '/gremlin?gremlin=' + encodeURIComponent('g.V(' + id + ')');
      const articlesData: any = await this.neptune.getNeptune(endpoint);
      res.status(200).json({ data: [articlesData], message: 'getArticleById' });
    } catch (error) {
      next(error);
    }
  };

  public createArticle = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const body = req.body;
      const endpoint = '/gremlin?gremlin=' + encodeURIComponent('g.addV("article").property("title", "' + body.title + '")');
      const articlesData: any = await this.neptune.postNeptune(endpoint, body);
      res.status(200).json({ data: [articlesData], message: 'createArticle' });
    } catch (error) {
      next(error);
    }
  };

  public updateArticle = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const id = req.params.id;
      const body = req.body;
      const endpoint = '/gremlin?gremlin=' + encodeURIComponent('g.V(' + id + ').property("title", "' + body.title + '")');
      const articlesData: any = await this.neptune.putNeptune(endpoint, body);
      res.status(200).json({ data: [articlesData], message: 'updateArticle' });
    } catch (error) {
      next(error);
    }
  };

  public deleteArticle = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const id = req.params.id;
      const endpoint = '/gremlin?gremlin=' + encodeURIComponent('g.V(' + id + ').drop()');
      const articlesData: any = await this.neptune.putNeptune(endpoint, null);
      res.status(200).json({ data: [articlesData], message: 'deleteArticle' });
    } catch (error) {
      next(error);
    }
  };

  public getArticleByTitle = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const title = req.params.title;
      const endpoint = '/gremlin?gremlin=' + encodeURIComponent('g.V().has("title", "' + title + '")');
      const articlesData: any = await this.neptune.getNeptune(endpoint);
      res.status(200).json({ data: [articlesData], message: 'getArticleByTitle' });
    } catch (error) {
      next(error);
    }
  };
}
