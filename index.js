require('dotenv').config();
const program = require('commander');
const request = require('request');

module.exports = () => {
  program.version(require('./package').version).usage('<command> [options]');

  program
    .command('book')
    .option('-n, --name <name>')
    .action(cmd => {
      console.log(cleanArgs(cmd));
      let uri = `https://www.goodreads.com/search.xml?key=${process.env.KEY}&q=Ender%27s+Game`;
      console.log(uri);
      request(uri, function(error, response, body) {
        console.log('error:', error); // Print the error if one occurred
        console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
        console.log('body:', body); // Print the HTML for the Google homepage.
      });
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
