import DS from 'ember-data';

export default DS.Model.extend({
  name        : DS.attr('string'),
  picture     : DS.attr('string'),
  temporary : DS.attr('boolean'),
  members     : DS.hasMany("user",       { async: true }),
  restaurants : DS.hasMany("restaurant", { async: true }),
  user        : DS.belongsTo("user",     { async: true }),
});
