const subscriptions = {};
const getIdGenerator = () => {
  let lastId = 0;
  const getNextUniqueId = () => {
    lastId += 1;
    return lastId;
  };
  return getNextUniqueId;
};
const getNextUniqueId = getIdGenerator();

const subscribe = (eventType, callback) => {
  const id = getNextUniqueId();

  if (!subscriptions[eventType]) subscriptions[eventType] = {};

  subscriptions[eventType][id] = callback;

  return {
    unsubscribe: () => {
      delete subscriptions[eventType][id];
      if (Object.keys(subscriptions[eventType]).length === 0)
        delete subscriptions[eventType];
    },
  };
};

const publish = (eventType, arg) => {
  if (!subscriptions[eventType]) return;

  Object.keys(subscriptions[eventType]).forEach((key) =>
    subscriptions[eventType][key](arg)
  );
};

export default { publish, subscribe };
