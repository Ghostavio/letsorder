import Ember from 'ember';

export default Ember.Route.extend({
  model: function(params) {
    // var userID = this.get('session').content.userID;
    return this.store.find('order', params.order_id);
  }
});
