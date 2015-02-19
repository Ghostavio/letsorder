import DS from 'ember-data';

export default DS.Model.extend({
  street   : DS.attr('string'),
  postcode : DS.attr('string'),
  city     : DS.attr('string'),
  country  : DS.attr('string'),
  primary  : DS.attr('boolean'),
  group    : DS.belongsTo("group",   { async: true }),
  user     : DS.belongsTo("user",    { async: true })
});
