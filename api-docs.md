# V-Todo API Documentation

## Data Structures

> You can just copy them into your typescript frontend uwu

```ts
export interface Todo {
    id: i64;
    name: string;
    deadline: u64; // Date in UNIX Timestamp
    description: string;
    done: boolean;
}

export interface TodoDtoCreate {
    name: string;           // Required
    deadline: u64;          // Required
    description: string;    // Required
    done: boolean;          // Optional, default: false
}

// Unfortunately V doesn't fully support optional values on structs yet
// So to update our Todo we need to provide full Todo object.
// Also framework that I use - VEX doesn't allow
// More then one param route, so you must provide id here aswell.
export interface TodoDtoUpdate {
    id: i64;                // Required
    name: string;           // Required
    deadline: u64;          // Required
    description: string;    // Required
    done: boolean;          // Required
}

export interface ApiError {
    error: string;
    status_code: number;
}
```

## Routes
### `GET /todos`
Will list all todos
#### Returns
200 OK: `Todo[]`

### `GET /todos:id`
Will return Todo of specified id.
#### Returns
* 200 OK: `Todo`
* 404 Not Found: `ApiError`

### `POST /todos`
Will add new todo.
#### Body
`TodoDtoCreate`
#### Returns
* 201 Created: `Todo`
* 400 Bad request: `ApiError`

### `PUT /todos`
Updates todo. You must specify id in body, coz of VEX Framework limitations. Read more in `TodoDtoUpdate` data structure.
#### Body
`TodoDtoUpdate`
#### Returns
* 200 OK: `Todo`
* 400 Bad request: `ApiError`
* 404 Not found: `ApiError`

### DELETE `/todos`
Deletes todo. You must specify id in query, coz of VEX Framework limitations.
#### Query
* `id` `string` ***REQUIRED***
#### Returns
* 204 No Content
* 400 Bad request: `ApiError`
* 404 Not found: `ApiError`
