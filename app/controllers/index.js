import Ember from 'ember';

export default Ember.Controller.extend({
  email: null,
  actions: {
    subscribeEmail: function() {
      var self = this;
      var newSubscription = this.store.createRecord('subscribe', {
        email: this.get('email'),
      });
      newSubscription.save().then(function() {
        self.set('email', null);
        window.$('.js-subscribe-success').removeClass('vis-hid');
      });
    }
  }
});
