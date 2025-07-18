echo '{
    "info": {
        "name": "Zareshop API",
        "schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
    },
    "item": [
        {
            "name": "Products",
            "item": [
                {
                    "name": "Get All Products",
                    "request": {
                        "method": "GET",
                        "url": "{{base_url}}/products"
                    },
                    "response": []
                },
                {
                    "name": "Get Product by ID",
                    "request": {
                        "method": "GET",
                        "url": {
                            "raw": "{{base_url}}/products/:id",
                            "host": ["{{base_url}}"],
                            "path": ["products", ":id"],
                            "variable": [{ "key": "id" }]
                        }
                    },
                    "response": []
                },
                {
                    "name": "Create Product",
                    "request": {
                        "method": "POST",
                        "url": "{{base_url}}/products",
                        "header": [{ "key": "Content-Type", "value": "application/json" }],
                        "body": {
                            "mode": "raw",
                            "raw": "{ \"name\": \"Sample Product\", \"price\": 100.0, \"description\": \"Sample description\" }"
                        }
                    },
                    "response": []
                },
                {
                    "name": "Update Product",
                    "request": {
                        "method": "PUT",
                        "url": {
                            "raw": "{{base_url}}/products/:id",
                            "host": ["{{base_url}}"],
                            "path": ["products", ":id"],
                            "variable": [{ "key": "id" }]
                        }
                    },
                    "response": []
                },
                {
                    "name": "Delete Product",
                    "request": {
                        "method": "DELETE",
                        "url": {
                            "raw": "{{base_url}}/products/:id",
                            "host": ["{{base_url}}"],
                            "path": ["products", ":id"],
                            "variable": [{ "key": "id" }]
                        }
                    },
                    "response": []
                }
            ]
        },
        {
            "name": "Users",
            "item": [
                {
                    "name": "Get All Users",
                    "request": {
                        "method": "GET",
                        "url": "{{base_url}}/users"
                    },
                    "response": []
                },
                {
                    "name": "Get User by ID",
                    "request": {
                        "method": "GET",
                        "url": {
                            "raw": "{{base_url}}/users/:id",
                            "host": ["{{base_url}}"],
                            "path": ["users", ":id"],
                            "variable": [{ "key": "id" }]
                        }
                    },
                    "response": []
                },
                {
                    "name": "Update User Profile",
                    "request": {
                        "method": "PUT",
                        "url": {
                            "raw": "{{base_url}}/users/:id",
                            "host": ["{{base_url}}"],
                            "path": ["users", ":id"],
                            "variable": [{ "key": "id" }]
                        }
                    },
                    "response": []
                },
                {
                    "name": "Delete User",
                    "request": {
                        "method": "DELETE",
                        "url": {
                            "raw": "{{base_url}}/users/:id",
                            "host": ["{{base_url}}"],
                            "path": ["users", ":id"],
                            "variable": [{ "key": "id" }]
                        }
                    },
                    "response": []
                }
            ]
        }
    ]
}' > postman_collection.json
