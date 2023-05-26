import { Container } from 'typedi';
import { NextFunction, Request, Response } from 'express';
import { NeptuneService } from '@services/neptune.service';

export class ArticlesController {
  public neptune = Container.get(NeptuneService);

  public getArticles = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const endpoint = '/gremlin?gremlin=' + encodeURIComponent('g.V()');
      const articlesData: any = await this.neptune.getNeptune(endpoint);
      res.status(200).json({ success: true, message: 'getArticles', data: [articlesData] });
    } catch (error) {
      next(error);
    }
  };

  public getArticleById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const id = req.params.id;
      const endpoint = '/gremlin?gremlin=' + encodeURIComponent(`g.V('${id}')`);
      const articlesData: any = await this.neptune.getNeptune(endpoint);
      res.status(200).json({ success: true, message: 'getArticleById', data: [articlesData] });
    } catch (error) {
      next(error);
    }
  };

  public createArticle = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { title, content } = req.body;
      const query = `g.addV('article').property('title', '${title}').property('content', '${content}')`;
      const body = {
        gremlin: query,
      };
      const articlesData: any = await this.neptune.postNeptune('/gremlin?gremlin', body);
      res.status(200).json({ data: [articlesData], message: 'createArticle' });
    } catch (error) {
      next(error);
    }
  };

  public updateArticle = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const id = req.params.id;
      const { title, content } = req.body;
      const query = `/gremlin?gremlin=g.V('${id}').property(single, 'title', '${title}').property(single, 'content', '${content}')`;
      const updatedData: any = await this.neptune.getNeptune(query);
      res.status(200).json({ status: true, message: 'updateArticle', data: [updatedData] });
    } catch (error) {
      next(error);
    }
  };

  public deleteArticle = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const id = req.params.id;
      const endpoint = `/gremlin?gremlin=g.V('${encodeURIComponent(id)}').drop()`;
      const articlesData: any = await this.neptune.getNeptune(endpoint);
      res.status(200).json({ success: true, message: 'deleteArticle', data: [articlesData] });
    } catch (error) {
      next(error);
    }
  };

  public searchArticle = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const search = req.query.search || '';
      const by = req.query.by || '';
      let endpoint;
      if (search === 'title') endpoint = `/gremlin?gremlin=${encodeURIComponent(`g.V().has('${search}','${by}')`)}`;
      if (search === 'content') endpoint = `/gremlin?gremlin=${encodeURIComponent(`g.V().has('${search}','${by}')`)}`;
      const articlesData: any = await this.neptune.getNeptune(endpoint);
      res.status(200).json({ success: true, message: 'searchArticle', data: [articlesData] });
    } catch (error) {
      next(error);
    }
  };
}
