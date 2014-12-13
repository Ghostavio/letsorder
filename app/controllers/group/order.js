import Ember from 'ember';

export default Ember.Controller.extend({
  itemName: null,
  needs: ['user'],
  actions: {
    addItem: function() {
      var self = this,
          currentUser = this.get('controllers.user').get('currentUser');
      debugger;
      var newItem = this.store.createRecord('menuItem', {
        name: this.get('itemName'),
        user: currentUser,
        restaurant: self.get('model'),
        group: self.get('model').get('group').content
      });

      newItem.save().then(function(data){
        // self.get('model').get('restaurants').pushObject(data);
        // self.get('model').save();
        self.setProperties({
          name: null
        });
        // self.transitionToRoute('group/restaurants', self.get('model').get('id'));
      });
    }
  }
});
