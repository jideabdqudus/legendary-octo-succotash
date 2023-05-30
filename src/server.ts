import { App } from '@/app';
import { ArticlesRoute } from '@routes/articles.route';
import { ValidateEnv } from '@utils/validateEnv';

ValidateEnv();

const app = new App([new ArticlesRoute()]);

app.listen();
