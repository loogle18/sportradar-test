const fs = require('fs');

const isNumeric = (value) => {
  return /^\d+$/.test(value);
};

const isObjEmpty = (obj) => {
  return Object.keys(obj).length === 0;
};

const isCurrentMatch = (data) => {
  return !isObjEmpty(data.match?.home) && !isObjEmpty(data.match?.away);
};

const isAnyHistory = (data) => {
  return data.history?.length > 0;
};

const createFileIfNeeded = (path, data) => {
  if (!fs.existsSync(path)) {
    fs.writeFileSync(path, data);
  }
};

class InGameError extends Error {
  constructor(message) {
    super(message);
    this.name = 'InGameError';
  }
}


module.exports = {
  isNumeric,
  isObjEmpty,
  isCurrentMatch,
  isAnyHistory,
  createFileIfNeeded,
  InGameError
};
