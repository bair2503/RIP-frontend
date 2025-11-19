import { resolve } from 'path';
import { generateApi } from 'swagger-typescript-api';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Создаем простую Swagger спецификацию для генерации
const swaggerSpec = {
    openapi: "3.0.0",
    info: {
        title: "Calculator API",
        version: "1.0.0",
        description: "API for mathematical calculations"
    },
    paths: {
        "/api/services/": {
            "get": {
                "tags": ["services"],
                "summary": "Get services list",
                "parameters": [
                    {
                        "name": "search",
                        "in": "query",
                        "schema": { "type": "string" },
                        "required": false
                    },
                    {
                        "name": "category",
                        "in": "query",
                        "schema": { "type": "string" },
                        "required": false
                    },
                    {
                        "name": "min_price",
                        "in": "query",
                        "schema": { "type": "number" },
                        "required": false
                    },
                    {
                        "name": "max_price",
                        "in": "query",
                        "schema": { "type": "number" },
                        "required": false
                    }
                ],
                "responses": {
                    "200": {
                        "description": "Successful response",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "type": "array",
                                    "items": {
                                        "$ref": "#/components/schemas/Service"
                                    }
                                }
                            }
                        }
                    }
                }
            }
        },
        "/api/services/{id}/": {
            "get": {
                "tags": ["services"],
                "summary": "Get service by ID",
                "parameters": [
                    {
                        "name": "id",
                        "in": "path",
                        "required": true,
                        "schema": { "type": "integer" }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "Successful response",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "$ref": "#/components/schemas/Service"
                                }
                            }
                        }
                    }
                }
            }
        },
        "/api/orders/": {
            "post": {
                "tags": ["orders"],
                "summary": "Create new order",
                "requestBody": {
                    "required": true,
                    "content": {
                        "application/json": {
                            "schema": {
                                "$ref": "#/components/schemas/CreateOrderRequest"
                            }
                        }
                    }
                },
                "responses": {
                    "201": {
                        "description": "Order created successfully",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "$ref": "#/components/schemas/Order"
                                }
                            }
                        }
                    }
                }
            }
        },
        "/api/auth/login/": {
            "post": {
                "tags": ["auth"],
                "summary": "User login",
                "requestBody": {
                    "required": true,
                    "content": {
                        "application/json": {
                            "schema": {
                                "type": "object",
                                "properties": {
                                    "username": { "type": "string" },
                                    "password": { "type": "string" }
                                },
                                "required": ["username", "password"]
                            }
                        }
                    }
                },
                "responses": {
                    "200": {
                        "description": "Login successful",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "type": "object",
                                    "properties": {
                                        "username": { "type": "string" },
                                        "token": { "type": "string" }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        },
        "/api/auth/logout/": {
            "post": {
                "tags": ["auth"],
                "summary": "User logout",
                "responses": {
                    "200": {
                        "description": "Logout successful"
                    }
                }
            }
        }
    },
    components: {
        schemas: {
            Service: {
                type: "object",
                properties: {
                    id: { type: "integer" },
                    title: { type: "string" },
                    description: { type: "string" },
                    category: { type: "string" },
                    icon: { type: "string" },
                    price: { type: "number" },
                    created_date: { type: "string" },
                    image_url: { type: "string" }
                },
                required: ["id", "title", "description", "category"]
            },
            Order: {
                type: "object",
                properties: {
                    id: { type: "integer" },
                    user_name: { type: "string" },
                    service: { type: "integer" },
                    operand: { type: "string" },
                    result: { type: "string" },
                    status: { type: "string" },
                    created_date: { type: "string" },
                    get_status_display: { type: "string" }
                }
            },
            CreateOrderRequest: {
                type: "object",
                properties: {
                    user_name: { type: "string" },
                    service: { type: "integer" },
                    operand: { type: "string" },
                    result: { type: "string" },
                    status: { type: "string" }
                },
                required: ["user_name", "service", "operand"]
            }
        }
    }
};

// Генерируем API из объекта спецификации
generateApi({
    name: 'Api.ts',
    output: resolve(process.cwd(), './src/api'),
    spec: swaggerSpec,
    httpClientType: 'axios',
    generateResponses: true,
    generateRouteTypes: true,
    generateClient: true,
    singleHttpClient: true,
    cleanOutput: true,
    enumNamesAsValues: false,
    moduleNameFirstTag: true,
    generateUnionEnums: true,
    sortTypes: true
})
    .then(() => {
        console.log('✅ API сгенерирован успешно!');
    })
    .catch((error) => {
        console.error('❌ Ошибка генерации API:', error);
    });