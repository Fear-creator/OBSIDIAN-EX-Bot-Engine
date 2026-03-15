module.exports = {
  name: 'help',
  description: 'List all available commands.',
  async execute(ctx) {
    const names = [...ctx.commands.values()]
      .map((command) => `!${command.name} - ${command.description}`)
      .sort();

    return {
      text: names.join('\n')
    };
  }
};
