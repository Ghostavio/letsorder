import Ember from 'ember';

export default Ember.View.extend({
  tagName: 'a',
  classNames: ['btn', 'btn-lg', 'btn-default'],
  attributeBindings: [''],
  didInsertElement: function() {
    this.$().dropdown();
  }
});
