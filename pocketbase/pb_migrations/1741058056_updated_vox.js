/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_480270823")

  // remove field
  collection.fields.removeById("number3529047816")

  // add field
  collection.fields.addAt(3, new Field({
    "cascadeDelete": false,
    "collectionId": "pbc_1724955765",
    "hidden": false,
    "id": "relation242765889",
    "maxSelect": 999,
    "minSelect": 0,
    "name": "vote_from",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "relation"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_480270823")

  // add field
  collection.fields.addAt(3, new Field({
    "hidden": false,
    "id": "number3529047816",
    "max": null,
    "min": null,
    "name": "voted",
    "onlyInt": false,
    "presentable": false,
    "required": false,
    "system": false,
    "type": "number"
  }))

  // remove field
  collection.fields.removeById("relation242765889")

  return app.save(collection)
})
