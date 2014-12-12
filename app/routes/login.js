import Ember from 'ember';

export default Ember.Route.extend({
  actions: {
    // action to trigger authentication with Facebook
    authenticateWithFacebook: function() {
      this.get('session').authenticate('authenticator:facebook', this);
    }
  }
});
