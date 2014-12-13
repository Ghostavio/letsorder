import Ember from 'ember';

export default Ember.View.extend({
  tagName: 'buttons',
  classNames: ['btn', 'btn-lg', 'btn-danger'],
  attributeBindings: ['title', 'content'],
  didInsertElement: function() {
    this.$().modal('show');
  }
});
