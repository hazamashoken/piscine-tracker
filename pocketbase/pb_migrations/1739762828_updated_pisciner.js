/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_1724955765")

  // add field
  collection.fields.addAt(13, new Field({
    "hidden": false,
    "id": "bool3006763624",
    "name": "is_pisciner",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "bool"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_1724955765")

  // remove field
  collection.fields.removeById("bool3006763624")

  return app.save(collection)
})
