import Ember from 'ember';

export default Ember.Controller.extend({
  name: null,
  needs: ['user'],
  // selectedFriends: [],
  actions: {
    createRoom: function() {
      var self = this,
          currentUser = this.get('controllers.user').get('currentUser');
          // selectedFriends = this.get('selectedFriends'),
      var newRoom = this.store.createRecord('group', {
        name: this.get('name'),
        user: currentUser
      });
      // newRoom.get('members').pushObject(currentUser);
      // selectedFriends.forEach(function(i) {
      //   newRoom.get('members').pushObject(i);
      // });
      newRoom.save().then(function(data){
        currentUser.get('groups').pushObject(data);
        currentUser.save();
        self.setProperties({
          name: null
        });
        self.transitionToRoute('group');
      });
    }
  }
});
