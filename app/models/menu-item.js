import DS from 'ember-data';

export default DS.Model.extend({
  name       : DS.attr('string'),
  price      : DS.attr('number'),
  favUsers   : DS.hasMany("user",         { async: true }),
  restaurant : DS.belongsTo("restaurant", { async: true }),
  user       : DS.belongsTo("user",       { async: true })
});
