/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_841212504")

  // remove field
  collection.fields.removeById("json3522489242")

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_841212504")

  // add field
  collection.fields.addAt(7, new Field({
    "hidden": false,
    "id": "json3522489242",
    "maxSize": 0,
    "name": "flag",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "json"
  }))

  return app.save(collection)
})
