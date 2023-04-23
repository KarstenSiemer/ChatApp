migrate((db) => {
  const collection = new Collection({
    "id": "2esmyezovlmdi0j",
    "created": "2023-04-03 09:01:40.608Z",
    "updated": "2023-04-03 09:01:40.608Z",
    "name": "chats",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "lgxrxjad",
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
  const collection = dao.findCollectionByNameOrId("2esmyezovlmdi0j");

  return dao.deleteCollection(collection);
})
