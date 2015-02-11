import Ember from 'ember';

export default Ember.Controller.extend({
  needs: ['group'],
  errorMsg: null,
  displayErrorMsg: false,
  fakeInit: function() {
    if(this.get('model').get('username')) {
      this.transitionToRoute('group');
    }
  },
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
          self.set('displayErrorMsg', false);
          self.get('controllers.group').set('displaySuccessMsg', true);
          self.get('controllers.group').set('successMsg', 'Your information was saved. Thank you for subscribing.');
          window.setTimeout(function() {
            window.$(".js-success").fadeTo(500, 0).slideUp(500, function() {
                self.get('controllers.group').set('displaySuccessMsg', false);
            });
          }, 4500);
          self.transitionToRoute('group');
        });
      }
    }
  }
});
