const getTimestamp = () => new Date().toISOString();

export const logger = {
  info: (message, data = {}) => {
    console.log(`[${getTimestamp()}] [INFO] ${message}`, data);
  },
  error: (message, error) => {
    console.error(`[${getTimestamp()}] [ERROR] ${message}`, error);
    if (error?.stack) {
      console.error(`[${getTimestamp()}] [STACK] ${error.stack}`);
    }
  },
  debug: (message, data = {}) => {
    if (process.env.NODE_ENV !== 'production') {
      console.debug(`[${getTimestamp()}] [DEBUG] ${message}`, data);
    }
  }
};