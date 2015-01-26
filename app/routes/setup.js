import Ember from 'ember';

export default Ember.Route.extend({
  model: function() {
    var userID = this.get('session').content.userID;
    return this.store.find('user', userID);
  }
});
