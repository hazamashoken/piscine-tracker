/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_1724955765")

  // remove field
  collection.fields.removeById("json3309110367")

  // add field
  collection.fields.addAt(11, new Field({
    "exceptDomains": null,
    "hidden": false,
    "id": "url2895943165",
    "name": "image_url",
    "onlyDomains": null,
    "presentable": false,
    "required": false,
    "system": false,
    "type": "url"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_1724955765")

  // add field
  collection.fields.addAt(9, new Field({
    "hidden": false,
    "id": "json3309110367",
    "maxSize": 0,
    "name": "image",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "json"
  }))

  // remove field
  collection.fields.removeById("url2895943165")

  return app.save(collection)
})
