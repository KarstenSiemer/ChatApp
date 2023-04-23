migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("xbi6jzel44eqgde")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "4nm3rlnz",
    "name": "users",
    "type": "relation",
    "required": false,
    "unique": false,
    "options": {
      "collectionId": "_pb_users_auth_",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": null,
      "displayFields": []
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("xbi6jzel44eqgde")

  // remove
  collection.schema.removeField("4nm3rlnz")

  return dao.saveCollection(collection)
})
