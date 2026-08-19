type LogLevel = "info" | "warn" | "error" | "debug";

class Logger {
  private formatMessage(level: LogLevel, message: string, data?: unknown) {
    const timestamp = new Date().toISOString();
    return {
      timestamp,
      level,
      message,
      ...(data ? { data } : {}),
    };
  }

  info(message: string, data?: unknown) {
    console.log(JSON.stringify(this.formatMessage("info", message, data)));
  }

  warn(message: string, data?: unknown) {
    console.warn(JSON.stringify(this.formatMessage("warn", message, data)));
  }

  error(message: string, data?: unknown) {
    console.error(JSON.stringify(this.formatMessage("error", message, data)));
  }

  debug(message: string, data?: unknown) {
    if (process.env.NODE_ENV !== "production") {
      console.debug(JSON.stringify(this.formatMessage("debug", message, data)));
    }
  }
}

export const logger = new Logger();
