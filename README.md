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

### Add a New User
- **URL**: `/api/users`
- **Method**: `POST`
- **What to Send**:
    ```json
    {
        "username": "username",
        "password": "pass1234",
        "confirm": "pass1234"
    }
    ```
- **Output**:
    ```json
    {
        "message": "User created",
        "user": {
            "username": "username"
        }
    }
    ```

### Get User by ID
- **URL**: `/api/users/:id`
- **Method**: `GET`
- **Output**:
    ```json
    {
       "_id": "user1",
        "username": "username",
    }
    ```

### Update an User
- **URL**: `/api/users/:id`
- **Method**: `PUT`
- **What to Send**:
    ```json
    {
        "password": "newpassword",
        "confirm": "newpassword",
    }
    ```
- **Output**:
    ```json
    {
        "message": "User updated"
    }
    ```

### Delete an User
- **URL**: `/api/users/:id`
- **Method**: `DELETE`
- **Output**:
    ```json
    {
        "message": "User deleted"
    }
    ```

