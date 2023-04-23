migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("xbi6jzel44eqgde")

  collection.listRule = ""
  collection.viewRule = ""
  collection.updateRule = "@request.data.name = null || @request.data.name = name"

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "ieniacc7",
    "name": "name",
    "type": "text",
    "required": true,
    "unique": false,
    "options": {
      "min": 2,
      "max": 64,
      "pattern": ""
    }
  }))

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "4nm3rlnz",
    "name": "users",
    "type": "relation",
    "required": true,
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

  collection.listRule = null
  collection.viewRule = null
  collection.updateRule = null

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "ieniacc7",
    "name": "name",
    "type": "text",
    "required": false,
    "unique": false,
    "options": {
      "min": 2,
      "max": 64,
      "pattern": ""
    }
  }))

  // update
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
})
