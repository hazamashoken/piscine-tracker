/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_841212504")

  // add field
  collection.fields.addAt(5, new Field({
    "cascadeDelete": false,
    "collectionId": "pbc_1724955765",
    "hidden": false,
    "id": "relation3236327732",
    "maxSelect": 1,
    "minSelect": 0,
    "name": "corrector",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "relation"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_841212504")

  // remove field
  collection.fields.removeById("relation3236327732")

  return app.save(collection)
})
