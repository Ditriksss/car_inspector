import { Logger } from "tslog";

const logger: Logger = new Logger();
logger.settings.minLevel = 'fatal';

export default logger;