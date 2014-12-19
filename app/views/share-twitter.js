import Ember from 'ember';

export default Ember.View.extend({
  tagName: 'a',
  classNames: 'twitter-share-button',
  attributeBindings: ['data-size', 'data-url', 'data-text', 'data-hashtags']
});
