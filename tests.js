const fs = require('fs');
const assert = require('assert');
const game = require('./game');
const utils = require('./utils');

const assertWithThrow = (assertFn) => {
  try {
    assertFn();
  } catch (err) {
    if (!(err instanceof utils.InGameError)) {
      throw err;
    }
  }
};

const testIsNumeric = () => {
  assert(utils.isNumeric('1'));
  assert(utils.isNumeric(23));
  assert(!utils.isNumeric(-51));
  assert(!utils.isNumeric('-12'));
  assert(!utils.isNumeric('2.4'));
  assert(!utils.isNumeric('Number'));
};

const testIsObjEmpty = () => {
  assert(!utils.isObjEmpty({ key: 'value' }));
  assert(utils.isObjEmpty({}));
};

const testIsCurrentMatch = () => {
  assert(!utils.isCurrentMatch({
    match: {
      home: {},
      away: {}
    },
    history: []
  }));
  assert(utils.isCurrentMatch({
    match: {
      home: {
        name: 'Italy',
        score: 1
      },
      away: {
        name: 'Germany',
        score: 0
      }
    },
    history: []
  }));
};

const testIsAnyHistory = () => {
  assert(!utils.isAnyHistory({
    history: []
  }));
  assert(utils.isAnyHistory({
    history: [{
      home: {
        name: 'Italy',
        score: 1
      },
      away: {
        name: 'Germany',
        score: 0
      }
    }]
  }));
};

const testCreateFileIfNeeded = () => {
  const path = './test.txt';
  const data = 'Created!';
  assert(!fs.existsSync(path));
  utils.createFileIfNeeded(path, data);
  assert(fs.existsSync(path));
  assert.equal(fs.readFileSync(path), data);
  fs.unlinkSync(path);
};

const testUtils = () => {
  testIsNumeric();
  testIsObjEmpty();
  testIsCurrentMatch();
  testIsAnyHistory();
  testCreateFileIfNeeded();
};

const testGame = () => {
  assertWithThrow(() => {
    assert.throws(game.run('run', {} ))
  });
  assertWithThrow(() => {
    assert.throws(game.run('start', {
      match: {
        home: {
          name: 'Italy',
          score: 1
        },
        away: {
          name: 'Germany',
          score: 0
        }
      },
      history: []
    }));
  });
  assertWithThrow(() => {
    assert.throws(game.run('update', {
      match: {
        home: {},
        away: {}
      },
      history: []
    }));
  });
  assertWithThrow(() => {
    assert.throws(game.run('finish', {
      match: {
        home: {},
        away: {}
      },
      history: []
    }));
  });
  assertWithThrow(() => {
    assert.throws(game.run('summary', {
      match: {
        home: {
          name: 'Italy',
          score: 1
        },
        away: {
          name: 'Germany',
          score: 0
        }
      },
      history: [{
        home: {
          name: 'Italy',
          score: 1
        },
        away: {
          name: 'Germany',
          score: 0
        }
      }]
    }));
  });
  assertWithThrow(() => {
    assert.throws(game.run('summary', {
      match: {
        home: {},
        away: {}
      },
      history: []
    }));
  });
};

const run = () => {
  testUtils();
  testGame();
};

module.exports = {
  run
};
