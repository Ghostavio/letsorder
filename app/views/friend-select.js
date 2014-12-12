import Ember from 'ember';

export default Ember.View.extend({
  tagName: 'li',
  classNames: ['friend-name no-style'],
  click: function() {
    var selectedFriends = this.get('controller').get('selectedFriends'),
        friend = this.get('friend');
    if(!this.$().hasClass('selected-friend')) {
        selectedFriends.pushObject(friend);
        this.$().addClass('selected-friend');
      } else {
        selectedFriends.popObject(friend);
        this.$().removeClass('selected-friend');
      }
  }
});
