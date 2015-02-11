import Ember from 'ember';

export default Ember.View.extend({
  tagName: 'span',
  classNames: ['text-center'],
  didInsertElement: function() {
    var model = this.get('controller').get('model');
    setInterval(function(){ if(model.get('timer') > 0) { model.decrementProperty('timer', 1); } }, 1000);
  }
});
