migrate((db) => {
  const collection = new Collection({
    "id": "5d8n7q4b1wfzben",
    "created": "2023-04-03 09:29:35.563Z",
    "updated": "2023-04-03 09:29:35.563Z",
    "name": "messages",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "knjaejmm",
        "name": "user",
        "type": "relation",
        "required": true,
        "unique": false,
        "options": {
          "collectionId": "_pb_users_auth_",
          "cascadeDelete": false,
          "minSelect": null,
          "maxSelect": 1,
          "displayFields": []
        }
      },
      {
        "system": false,
        "id": "dsiffoai",
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
      },
      {
        "system": false,
        "id": "67pfnoea",
        "name": "chatID",
        "type": "relation",
        "required": false,
        "unique": false,
        "options": {
          "collectionId": "2esmyezovlmdi0j",
          "cascadeDelete": false,
          "minSelect": null,
          "maxSelect": 1,
          "displayFields": []
        }
      },
      {
        "system": false,
        "id": "fpzq7huv",
        "name": "content",
        "type": "text",
        "required": true,
        "unique": false,
        "options": {
          "min": 1,
          "max": 512,
          "pattern": ""
        }
      },
      {
        "system": false,
        "id": "0prgeyzm",
        "name": "sentAt",
        "type": "date",
        "required": true,
        "unique": false,
        "options": {
          "min": "",
          "max": ""
        }
      },
      {
        "system": false,
        "id": "rxy06czb",
        "name": "seenAt",
        "type": "date",
        "required": false,
        "unique": false,
        "options": {
          "min": "",
          "max": ""
        }
      },
      {
        "system": false,
        "id": "aw05jrbr",
        "name": "seenBy",
        "type": "date",
        "required": false,
        "unique": false,
        "options": {
          "min": "",
          "max": ""
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
  const collection = dao.findCollectionByNameOrId("5d8n7q4b1wfzben");

  return dao.deleteCollection(collection);
})
