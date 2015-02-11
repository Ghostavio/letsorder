import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    setupUser: function() {
      var self = this,
          currentUser = this.get('model');
      currentUser.setProperties({ username: this.get('username'), phone: this.get('phone') });
      currentUser.save().then(function(){
        self.transitionToRoute('group');
      });
    }
  }
});
