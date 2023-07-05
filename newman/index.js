/* eslint-disable global-require */
// eslint-disable-next-line import/no-extraneous-dependencies
const newman = require('newman');

newman.run({
  collection: require('./Notes API Test.postman_collection.json'),
  environment: require('./Notes API Test.postman_environment.json'), // Menentukan environment di sini
  reporters: 'cli',
}, (err) => {
  if (err) { throw err; }
  console.log('collection run complete!');
});
