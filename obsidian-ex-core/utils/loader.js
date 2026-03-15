const fs = require('fs');
const path = require('path');
const logger = require('./logger');

function getCommandFiles(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  return entries.flatMap((entry) => {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      return getCommandFiles(fullPath);
    }

    if (entry.isFile() && entry.name.endsWith('.js')) {
      return [fullPath];
    }

    return [];
  });
}

function loadCommands(commandsDir) {
  const commandMap = new Map();
  const commandFiles = getCommandFiles(commandsDir);

  for (const file of commandFiles) {
    delete require.cache[require.resolve(file)];
    const command = require(file);

    if (!command?.name || typeof command.execute !== 'function') {
      logger.warn({ file }, 'Skipping invalid command module');
      continue;
    }

    commandMap.set(command.name, command);
    logger.info({ command: command.name, file }, 'Loaded command');
  }

  return commandMap;
}

module.exports = {
  loadCommands
};
