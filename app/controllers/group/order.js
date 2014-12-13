import Ember from 'ember';

export default Ember.Controller.extend({
  name: null,
  needs: ['user'],
  selectedItems: [],
  actions: {
    addItem: function() {
      var self = this,
          currentUser = this.get('controllers.user').get('currentUser');
      var newItem = this.store.createRecord('menu-item', {
        name: this.get('name'),
        user: currentUser,
        restaurant: self.get('model'),
        group: self.get('model').get('group').content
      });
      newItem.save().then(function(data){
        self.get('model').get('items').pushObject(data);
        self.get('model').save();
        self.setProperties({
          name: null
        });
        // self.transitionToRoute('group/restaurants', self.get('model').get('id'));
      });
    }
  }
});
