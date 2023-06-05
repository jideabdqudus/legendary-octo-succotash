import { Container } from 'typedi';
import { NextFunction, Request, Response } from 'express';
import { DynamoService } from '@services/dynamo.service';

export class NotesController {
  public dynamo = Container.get(DynamoService);

  public getNotes = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const notesData: any = await this.dynamo.getDynamo();
      res.status(200).json({ success: true, message: 'getNotes', notes: notesData.Items });
    } catch (error) {
      next(error);
    }
  };

  public getNoteById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const id = req.params.id;
      const notesData: any = await this.dynamo.getDynamoById(id);
      res.status(200).json({ success: true, message: 'getNoteById', data: notesData.Item });
    } catch (error) {
      next(error);
    }
  };

  public createNote = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const body = req.body;
      const notesData: any = await this.dynamo.addOrUpdateDynamo(body);
      res.status(200).json({ success: true, message: 'createNote', data: notesData.Item });
    } catch (error) {
      next(error);
    }
  };

  public updateNote = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const id = req.params.id;
      const note = req.body;
      note.id = id;

      if (!note) {
        throw new Error('Please add all the required fields');
      }
      const notesData: any = await this.dynamo.addOrUpdateDynamo(note);
      res.status(200).json({ success: true, message: 'updateNote', data: notesData.Item });
    } catch (error) {
      next(error);
    }
  };

  public deleteNote = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const id = req.params.id;
      const notesData: any = await this.dynamo.deleteDynamoById(id);
      res.status(200).json({ success: true, message: 'deleteNote', data: notesData.Item });
    } catch (error) {
      next(error);
    }
  };
}
