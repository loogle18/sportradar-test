const { ArgumentParser } = require('argparse');

const parser = new ArgumentParser({ description: 'Sportradar mini-game.' });

const main = () => {
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
      console.log('Start');
      process.exit(0);
    case 'update':
      console.log('Update');
      process.exit(0);
    case 'finish':
      console.log('Finish');
      process.exit(0);
    case 'summary':
      console.log('Summary');
      process.exit(0);
    case 'test':
      console.log('Testing...');
      process.exit(0);
    default:
      process.exit(1);
  }
};

main();
