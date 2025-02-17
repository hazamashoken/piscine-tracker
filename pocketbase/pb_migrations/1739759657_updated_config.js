/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_3818476082")

  // add field
  collection.fields.addAt(2, new Field({
    "hidden": false,
    "id": "number2942129633",
    "max": null,
    "min": null,
    "name": "campus_id",
    "onlyInt": false,
    "presentable": false,
    "required": false,
    "system": false,
    "type": "number"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_3818476082")

  // remove field
  collection.fields.removeById("number2942129633")

  return app.save(collection)
})
