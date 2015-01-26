import Ember from 'ember';

export default Ember.Route.extend({
  redirect: function() {
    if(this.get('session').isAuthenticated) {
      this.transitionTo('group');
    }
  }
});
