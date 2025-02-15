/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_1233680144")

  // update collection data
  unmarshal({
    "indexes": [
      "CREATE INDEX `idx_UTcWA4GG2z` ON `location_stat` (`user`)"
    ]
  }, collection)

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_1233680144")

  // update collection data
  unmarshal({
    "indexes": []
  }, collection)

  return app.save(collection)
})
