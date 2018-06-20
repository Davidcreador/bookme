require('dotenv').config();
const program = require('commander');

// libs
const fetch = require('./lib/fetch');

module.exports = () => {
  program.version(require('./package').version).usage('<command> [options]');

  program
    .command('book')
    .option('-n, --name <name>')
    .action(cmd => {
      fetch(cleanArgs(cmd));
    });

  // Program parses all the args and executes them
  program.parse(process.argv);

  // commander passes the Command object itself as options,
  // extract only actual options into a fresh object.
  function cleanArgs(cmd) {
    const args = {};
    cmd.options.forEach(o => {
      const key = o.long.replace(/^--/, '');
      // if an option is not present and Command has a method with the same name
      // it should not be copied
      if (typeof cmd[key] !== 'function') {
        args[key] = cmd[key];
      }
    });
    return args;
  }
};
