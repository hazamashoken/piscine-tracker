/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_3527326047")

  // remove field
  collection.fields.removeById("relation2567390792")

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_3527326047")

  // add field
  collection.fields.addAt(3, new Field({
    "cascadeDelete": false,
    "collectionId": "pbc_1724955765",
    "hidden": false,
    "id": "relation2567390792",
    "maxSelect": 1,
    "minSelect": 0,
    "name": "tutor",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "relation"
  }))

  return app.save(collection)
})
