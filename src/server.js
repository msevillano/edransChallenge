import Koa from 'koa';
import loadEnvVars from './core/envVars';
import logger from './core/logger';
import router from './router';

loadEnvVars();
const PORT = process.env.PORT;
const app = new Koa();

app.use(router.routes()).use(router.allowedMethods());

logger.debug('==============================');
logger.debug(`App: ${process.env.npm_package_name}`);
logger.debug(`Env: ${process.env.ENV}`);
logger.debug(`Port: ${PORT}`);
logger.debug('==============================');

app.listen(PORT);

