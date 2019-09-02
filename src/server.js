import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import loadEnvVars from './core/envVars';
import dbConnection from './core/dbConnection';
import logger from './core/logger';
import router from './router';

loadEnvVars();
dbConnection(process.env.MONGO_DB).then(() => logger.info('connected to DB'))
    .catch(() => logger.error('DB is unavailable on given connectionString'));
const PORT = process.env.PORT;
const app = new Koa();

app.use(bodyParser());
app.use(router.routes()).use(router.allowedMethods());

logger.debug('==============================');
logger.debug(`App: ${process.env.npm_package_name}`);
logger.debug(`Env: ${process.env.ENV}`);
logger.debug(`Port: ${PORT}`);
logger.debug('==============================');

app.listen(PORT);

