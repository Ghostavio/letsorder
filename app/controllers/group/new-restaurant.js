import Ember from 'ember';

export default Ember.Controller.extend({
  name: null,
  needs: ['user'],
  actions: {
    createRestaurant: function() {
      var self = this,
          currentUser = this.get('controllers.user').get('currentUser');
      var newRestaurant = this.store.createRecord('restaurant', {
        name: this.get('name'),
        phone: this.get('phone'),
        website: this.get('website'),
        menuLink: this.get('menuLink'),
        user: currentUser,
        group: self.get('model')
      });
      newRestaurant.save().then(function(data){
        self.setProperties({
          name: null,
          phone: null,
          website: null,
          menuLink: null
        });
        self.transitionToRoute('group/restaurants', self.get('model').get('id'));
      });
    }
  }
});
