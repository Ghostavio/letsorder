import Ember from 'ember';

export default Ember.Controller.extend({
  selectedFriends: [],
  actions: {
    selectFriend: function(friend) {
      console.log('SELECT', friend);
    }
  }
});
