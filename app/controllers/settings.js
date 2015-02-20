import Ember from 'ember';

export default Ember.Controller.extend({
  needs: ['user'],
  actions: {
    createAddress: function() {
      var self = this,
          currentUser = this.get('controllers.user').get('currentUser');
      var newAddress = this.store.createRecord('address', {
        street   : this.get('street'),
        postcode : this.get('postcode'),
        city     : this.get('city'),
        country  : this.get('country'),
        user: currentUser
      });
      newAddress.save().then(function(){
        currentUser.save();
        self.setProperties({
          street: null,
          postcode: null,
          city: null,
          country: null,
        });
        self.set('addAddress', !self.get('addAddress'));
      });
    },
    removeAddress: function(address) {
      var  currentUser = this.get('controllers.user').get('currentUser');
      address.destroyRecord();
      currentUser.save();
    },
    toggleAddAddress: function() {
      this.set('addAddress', !this.get('addAddress'));
    }
  }
});
