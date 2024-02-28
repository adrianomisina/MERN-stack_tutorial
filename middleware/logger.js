const { format } = require('date-fns');
const { v4 } = require('uuid');
const { mkdir, appendFile } = require('fs').promises;
const { existsSync } = require('fs');
const path = require('path');

const logEvents = async (message, logFileName) => {
  const dateTime = format(new Date(), 'yyyyMMdd\tHH:mm:ss');
  const logItem = `${dateTime}\t${v4()}\t${message}\n`;

  const logsDir = path.join(__dirname, '..', 'logs');
  if (!existsSync(logsDir)) {
    await mkdir(logsDir);
  }

  try {
    await appendFile(path.join(logsDir, logFileName), logItem);
  } catch (err) {
    console.log(err);
  }
};

const logger = (req, res, next) => {
  const logMessage = `${req.method}\t${req.url}\t${req.headers.origin}`;
  logEvents(logMessage, 'reqLog.log');
  console.log(`${req.method} ${req.path}`);
  next();
};

module.exports = { logEvents, logger };
