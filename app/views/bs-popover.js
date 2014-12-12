import Ember from 'ember';

export default Ember.View.extend({
  tagName: 'buttons',
  classNames: ['btn', 'btn-lg', 'btn-danger'],
  attributeBindings: ['title'],
  didInsertElement: function() {
    this.$().tooltip();
  }
});
