import Ember from 'ember';

export default Ember.Controller.extend({
  name: null,
  needs: ['user', 'group/timer'],
  selectedItems: [],
  currentOrder: null,
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
      });
    },
    goToSummary: function() {
      var self = this,
          currentUser = this.get('controllers.user').get('currentUser'),
          currentOrder = this.get('controllers.group/timer').get('currentOrder'),
          selectedItems = this.get('selectedItems');

      var newItem = this.store.createRecord('order-item', {
        createdAt: new Date(),
        user: currentUser,
        order: currentOrder
      });
      selectedItems.forEach(function(i) {
        newItem.get('items').pushObject(i);
      });
      debugger;
      newItem.save().then(function(data) {
        self.transitionToRoute('group/summary', self.get('model').get('group').content.id, self.get('model').get('id'), currentOrder.id);
      });
    }
  }
});
