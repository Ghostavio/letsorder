import Ember from 'ember';

export default Ember.Controller.extend({
  errorMsg: null,
  displayErrorMsg: false,
  actions: {
    setupUser: function() {
      var self = this,
          currentUser = this.get('model');
      if(!this.get('content.username')) {
        this.set('errorMsg', 'Please enter your username.');
        this.set('displayErrorMsg', true);
      } else {
        currentUser.setProperties({ username: this.get('content.username'), phone: this.get('content.phone') });
        currentUser.save().then(function(){
          self.transitionToRoute('group');
          self.set('displayErrorMsg', false);
        });
      }
    }
  }
});
