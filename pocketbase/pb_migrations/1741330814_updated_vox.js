/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_480270823")

  // add field
  collection.fields.addAt(4, new Field({
    "hidden": false,
    "id": "number61476415",
    "max": null,
    "min": null,
    "name": "vox2",
    "onlyInt": false,
    "presentable": false,
    "required": false,
    "system": false,
    "type": "number"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_480270823")

  // remove field
  collection.fields.removeById("number61476415")

  return app.save(collection)
})
