migrate((db) => {
  const collection = new Collection({
    "id": "6a7ssbqqn6aaadd",
    "created": "2023-04-03 08:50:09.130Z",
    "updated": "2023-04-03 08:50:09.130Z",
    "name": "users_group",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "bp27u4ts",
        "name": "groupID",
        "type": "relation",
        "required": false,
        "unique": false,
        "options": {
          "collectionId": "xbi6jzel44eqgde",
          "cascadeDelete": false,
          "minSelect": null,
          "maxSelect": 1,
          "displayFields": []
        }
      }
    ],
    "indexes": [],
    "listRule": null,
    "viewRule": null,
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {}
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("6a7ssbqqn6aaadd");

  return dao.deleteCollection(collection);
})
