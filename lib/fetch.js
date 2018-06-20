const request = require('request');

module.exports = cmd => {
  let uri = `https://www.goodreads.com/search.xml?key=${process.env.KEY}&q=${cmd.name}`;
  request(uri, function(error, response, body) {
    console.log('error:', error); // Print the error if one occurred
    console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
    console.log('body:', body); // Print the HTML for the Google homepage.
  });
};
