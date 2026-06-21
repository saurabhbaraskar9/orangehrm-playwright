export class Logger {
  private readonly context: string;

  constructor(context: string) {
    this.context = context;
  }

  private format(level: string, message: string): string {
    const timestamp = new Date().toISOString();
    return `[${timestamp}] [${level.toUpperCase()}] [${this.context}] ${message}`;
  }

  info(message: string): void {
    console.log('\x1b[36m%s\x1b[0m', this.format('info', message));
  }

  warn(message: string): void {
    console.warn('\x1b[33m%s\x1b[0m', this.format('warn', message));
  }

  error(message: string): void {
    console.error('\x1b[31m%s\x1b[0m', this.format('error', message));
  }

  success(message: string): void {
    console.log('\x1b[32m%s\x1b[0m', this.format('success', message));
  }

  debug(message: string): void {
    if (process.env.DEBUG === 'true') {
      console.debug('\x1b[90m%s\x1b[0m', this.format('debug', message));
    }
  }
}