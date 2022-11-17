const fs = require('fs');
const { ArgumentParser } = require('argparse');
const constants = require('./constants');
const utils = require('./utils');
const game = require('./game');
const tests = require('./tests');

const parser = new ArgumentParser({ description: 'Sportradar mini-game.' });

const main = () => {
  utils.createFileIfNeeded(constants.MEMO_PATH, JSON.stringify(constants.defaultMemo));
  const memo = JSON.parse(fs.readFileSync(constants.MEMO_PATH));
  const group = parser.add_mutually_exclusive_group({required: true});
  group.add_argument('--start', { action: 'store_true', help: 'start new game' });
  group.add_argument('--update', { action: 'store_true', help: 'update score for current game' });
  group.add_argument('--finish', { action: 'store_true', help: 'finish current game' });
  group.add_argument('--summary', { action: 'store_true', help: 'get a summary of games by total score' });
  group.add_argument('--test', { action: 'store_true', help: 'run tests' });
  const args = parser.parse_args();
  const command = Object.keys(args).find((k) => args[k]);

  if (command === 'test') {
    console.log('Testing...');
    tests.run();
    console.log('All tests passed successfully!');
    process.exit(0);
  } else {
    game.run(command, memo);
  }
};

main();
