const fs = require('fs');
const { ArgumentParser } = require('argparse');
const constants = require('./constants');
const utils = require('./utils');
const game = require('./game');

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
  switch (command) {
    case 'start':
      if (utils.isCurrentMatch(memo)) {
        console.log(`There's already current match between ${memo.match.home.name} and ${memo.match.away.name}!`);
        process.exit(1);
      }
      game.start(memo);
      break;
    case 'update':
      if (!utils.isCurrentMatch(memo)) {
        console.log("There's no current match. Please start a match first.");
        process.exit(1);
      }
      game.update(memo);
      break;
    case 'finish':
      if (!utils.isCurrentMatch(memo)) {
        console.log("There's no current match. Please start a match first.");
        process.exit(1);
      }
      game.finish(memo);
      break;
    case 'summary':
      if (utils.isCurrentMatch(memo)) {
        console.log(`There's a match between ${memo.match.home.name} and ${memo.match.away.name}! Please finish the match first.`);
        process.exit(1);
      }
      if (!utils.isAnyHistory(memo)) {
        console.log(`There's no history! Please start and finish at least one match first.`);
        process.exit(1);
      }
      game.summary(memo);
      break;
    case 'test':
      console.log('Testing...');
      process.exit(0);
    default:
      process.exit(1);
  }
};

main();
