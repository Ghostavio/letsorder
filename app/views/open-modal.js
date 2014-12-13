import Ember from 'ember';

export default Ember.View.extend({
  tagName: 'a',
  classNames: ['restaurant-name'],
  click: function() {
    $('.overlay').show();
  }
});
