import Ember from 'ember';

export default Ember.View.extend({
  tagName: 'button',
  classNames: ['btn btn-sm select-friend'],
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
