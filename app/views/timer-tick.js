import Ember from 'ember';

export default Ember.View.extend({
  tagName: 'buttons',
  classNames: ['btn', 'btn-lg', 'btn-danger'],
  didInsertElement: function() {
    var model = this.get('controller').get('model');
    setInterval(function(){ if(model.get('timer') > 0) { model.decrementProperty('timer', 1); } }, 1000);
  }
});
