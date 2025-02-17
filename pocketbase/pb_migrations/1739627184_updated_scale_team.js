/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_841212504")

  // update collection data
  unmarshal({
    "indexes": [
      "CREATE INDEX `idx_ddw2ZauaFT` ON `scale_team` (`corrected`)"
    ]
  }, collection)

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_841212504")

  // update collection data
  unmarshal({
    "indexes": []
  }, collection)

  return app.save(collection)
})
