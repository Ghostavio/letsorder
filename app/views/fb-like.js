import Ember from 'ember';

export default Ember.View.extend({
  tagName: 'div',
  classNames: ['fb-like'],
  attributeBindings: ['data-href', 'data-layout', 'data-action', 'data-show-faces', 'data-share'],
  didInsertElement: function() {
    window.FB.XFBML.parse();
  }
});
