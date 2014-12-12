import DS from 'ember-data';

export default DS.Model.extend({
  name         : DS.attr('string'),
  picture      : DS.attr('string'),
  members      : DS.hasMany("user",  { async: true }),
  restraurants : DS.hasMany("restraurant", { async: true }),
  user         : DS.belongsTo("user", { async: true }),
});
