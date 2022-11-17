const fs = require('fs');
const readline = require('readline');

const utils = require('./utils');
const { MEMO_PATH } = require('./constants');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const start = (memo) => {
  rl.question('Home team name:', function(home) {
    if (home.length < 3) {
      console.log('Home team name must be at least 3 characters long!');
      process.exit(1);
    }
    rl.question('Away team name:', function(away) {
      if (away.length < 3) {
        console.log('Away team name must be at least 3 characters long!');
        process.exit(1);
      }
      memo.match = {
        home: {
          name: home,
          score: 0
        },
        away: {
          name: away,
          score: 0
        }
      };
      fs.writeFileSync(MEMO_PATH, JSON.stringify(memo));
      rl.close();
      process.exit(0);
    });
  });
};

const update = (memo) => {
  rl.question('Home team score:', function(home) {
    if (!utils.isNumeric(home)) {
      console.log('Home team score must be a positive whole number!');
      process.exit(1);
    }
    rl.question('Away team score:', function(away) {
      if (!utils.isNumeric(away)) {
        console.log('Away team score must be a positive whole number!');
        process.exit(1);
      }
      memo.match.home.score += Number(home);
      memo.match.away.score += Number(away);
      fs.writeFileSync(MEMO_PATH, JSON.stringify(memo));
      rl.close();
      process.exit(0);
    });
  });
};

const finish = (memo) => {
  const { home, away } = memo.match;
  console.log(`Game is finished! Score is: ${home.score} (${home.name}) : ${away.score} (${away.name})`);
  memo.history.push(memo.match);
  memo.match = { home: {}, away: {} };
  fs.writeFileSync(MEMO_PATH, JSON.stringify(memo));
  process.exit(0);
};

const summary = (memo) => {
  const sortedHistory = [...memo.history].sort((a, b) => (b.home.score + b.away.score) - (a.home.score + a.away.score));
  const summary = sortedHistory.map((match, index) => {
   return `${index + 1}. ${match.home.name} ${match.home.score} - ${match.away.name} ${match.away.score}`;
  });
  console.log(`Here's summary:`);
  console.log(summary.join('\n'));
  process.exit(0);
};


module.exports = {
  start,
  update,
  finish,
  summary
};
