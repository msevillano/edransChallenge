import winston from 'winston';
const colorize = winston.format.colorize();

const logConfig = {
  levels: {
    debug: 5,
    info: 4,
    warn: 3,
    fail: 2,
    error: 1,
    fatal: 0,
  },
  colors: {
    debug: 'white',
    info: 'green',
    warn: 'yellow',
    fail: 'orange',
    error: 'red',
    fatal: 'magenta',
  },
};

winston.addColors(logConfig.colors);

const logger = winston.createLogger({
  levels: logConfig.levels,
  format: winston.format.combine(
      winston.format.timestamp(),
      winston.format.printf((msg) =>
        colorize.colorize(msg.level, `${msg.timestamp} - ${msg.level}: ${msg.message}`)
      )
  ),
  transports: [
    new winston.transports.Console( {
      level: 'debug',
      handleExceptions: true,
      json: false,
      colorize: true,
    },),
  ],
});

export default logger;
