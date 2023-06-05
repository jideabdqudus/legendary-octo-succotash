import { App } from '@/app';
import { NotesRoute } from '@routes/notes.route';
import { ValidateEnv } from '@utils/validateEnv';
import { ArticlesRoute } from '@routes/articles.route';

ValidateEnv();

const app = new App([new ArticlesRoute(), new NotesRoute()]);

app.listen();
