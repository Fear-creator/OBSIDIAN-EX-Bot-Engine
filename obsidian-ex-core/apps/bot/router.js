const { commandHandler } = require('./commandHandler');

async function botRouter(payload) {
  return commandHandler({
    phone: payload.phone,
    message: payload.message,
    meta: payload.meta || {}
  });
}

module.exports = {
  botRouter
};
