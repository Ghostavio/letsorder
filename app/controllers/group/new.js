import Ember from 'ember';

export default Ember.Controller.extend({
  name: null,
  needs: ['user'],
  selectedFriends: [],
  actions: {
    createGroup: function() {
      var self = this,
          currentUser = this.get('controllers.user').get('currentUser'),
          selectedFriends = this.get('selectedFriends');
      var newGroup = this.store.createRecord('group', {
        name: this.get('name'),
        user: currentUser
      });
      newGroup.get('members').pushObject(currentUser);
      selectedFriends.forEach(function(i) {
        newGroup.get('members').pushObject(i);
        i.get('groups').pushObject(newGroup);
      });
      newGroup.save().then(function(data){
        currentUser.get('groups').pushObject(data);
        currentUser.save();
        selectedFriends.forEach(function(i) {
          i.save();
        });
        self.setProperties({
          name: null
        });
        self.transitionToRoute('group');
      });
    }
  }
});
