import DS from 'ember-data';
import config from '../config/environment';

export default DS.FirebaseAdapter.extend({
  firebase: new window.Firebase('https://' + config.modulePrefix + '.firebaseio.com')
});

// export default DS.ActiveModelAdapter.extend({
//   host: config.apiUrl
// });
