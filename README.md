# UFit
## Project Setup
To get started with the project, follow
these steps:
1. **Install Node.js**

2. **Clone the Repository:**
```sh
git clone <https://github.com/msurve23/ufit.git>
```

3. **Open the Project Folder**:
    - Go into the project folder by running this:
    ```
    cd ufit
    ```
4. **Install What You Need**:
    - Run this command to install everything the app needs:
    ```
    npm install
    ```
5. **Start the App**:
    - Turn on the app by running this:
    ```
    npm start
    ```
6. **Use the App**:
    - Open your web browser and go to this address: `http://localhost:3000`.

## API Instructions

### Add a New Item
- **URL**: `/api/items`
- **Method**: `POST`
- **What to Send**:
    ```json
    {
        "_id": "item1",
        "name": "Item Name",
        "description": "Item Description"
    }
    ```
- **Output**:
    ```json
    {
        "message": "Item created"
    }
    ```

### See All Items
- **URL**: `/api/items`
- **Method**: `GET`
- **Output**:
    ```json
    [
        {
            "_id": "item1",
            "name": "Item Name",
            "description": "Item Description"
        }
    ]
    ```

### Get Item by ID
- **URL**: `/api/items/:id`
- **Method**: `GET`
- **Output**:
    ```json
    {
        "_id": "item1",
        "name": "Item Name",
        "description": "Item Description"
    }
    ```

### Update an Item
- **URL**: `/api/items/:id`
- **Method**: `PUT`
- **What to Send**:
    ```json
    {
        "name": "Updated Name",
        "description": "Updated Description"
    }
    ```
- **Output**:
    ```json
    {
        "message": "Item updated"
    }
    ```

### Delete an Item
- **URL**: `/api/items/:id`
- **Method**: `DELETE`
- **Output**:
    ```json
    {
        "message": "Item deleted"
    }
    ```

