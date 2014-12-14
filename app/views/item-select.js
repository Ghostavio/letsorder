import Ember from 'ember';

export default Ember.View.extend({
  tagName: 'li',
  classNames: ['order-name no-style'],
  click: function() {
    var selectedItems = this.get('controller').get('selectedItems'),
        item = this.get('item');
    if(!this.$().hasClass('selected-friend')) {
        selectedItems.pushObject(item);
        this.$().addClass('selected-friend');
      } else {
        selectedItems.popObject(item);
        this.$().removeClass('selected-friend');
      }
  }
});
