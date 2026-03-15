const path = require('path');
const { loadCommands } = require('../../utils/loader');
const CommandLog = require('../../database/models/CommandLog');
const logger = require('../../utils/logger');
const config = require('../../config/config');

const commandsPath = path.join(__dirname, '../../commands');
const commands = loadCommands(commandsPath);

async function commandHandler(messageContext) {
  const { message, phone } = messageContext;

  if (!message || !message.startsWith(config.commandPrefix)) {
    return { text: 'Message ignored: no command prefix.' };
  }

  const content = message.slice(config.commandPrefix.length).trim();
  const [commandNameRaw, ...args] = content.split(/\s+/);
  const commandName = commandNameRaw?.toLowerCase();

  if (!commandName) {
    return { text: 'No command provided.' };
  }

  const command = commands.get(commandName);

  if (!command) {
    return { text: `Unknown command: ${commandName}` };
  }

  const ctx = {
    ...messageContext,
    args,
    commands,
    logger
  };

  const result = await command.execute(ctx);

  await CommandLog.create({
    command: command.name,
    user: phone || 'anonymous'
  });

  logger.info(
    { command: command.name, user: phone || 'anonymous' },
    'Command executed and logged'
  );

  return result;
}

module.exports = {
  commandHandler,
  commands
};
