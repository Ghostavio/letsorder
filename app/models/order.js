import DS from 'ember-data';

export default DS.Model.extend({
  timer        : DS.attr('number'),
  createdAt    : DS.attr('date'),
  deliveryInfo : DS.attr('string'),
  items        : DS.hasMany("order-item",   { async: true }),
  restaurant   : DS.belongsTo("restaurant", { async: true }),
  group        : DS.belongsTo("group",      { async: true }),
  organizer    : DS.belongsTo("user",       { async: true })
});
