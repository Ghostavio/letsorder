import Ember from 'ember';

export default Ember.Controller.extend({
  needs: ['user', 'group/order'],
  actions: {
    setOrder: function() {
      var self = this,
          currentUser = this.get('controllers.user').get('currentUser');
      var newOrder = this.store.createRecord('order', {
        createdAt: new Date(),
        timer: 15,
        organizer: currentUser,
        restaurant: self.get('model'),
        group: self.get('model').get('group').content
      });
      newOrder.save().then(function(data){
        this.get('controllers.order').set('currentOrder', data);
        self.transitionToRoute('group/order', self.get('model').get('group').content.id, self.get('model').get('id'), data.id);
      });
    }
  }
});
