import express from 'express';
import PouchDB from 'pouchdb';
import bodyParser from 'body-parser';

const app = express();
const db = new PouchDB('ufit-db');
const PORT = 3000;

app.use(bodyParser.json());

// Login route
app.post('/api/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        // Fetch users from the database
        const result = await db.allDocs({ include_docs: true });
        const users = result.rows.map(row => row.doc);

        // Check if a user with the provided username and password exists
        const user = users.find(user => user.username === username && user.password === password);

        if (user) {
            res.status(200).send({ message: 'Login successful' });
        } else {
            res.status(401).send({ error: 'Invalid credentials' });
        }
    } catch (error) {
        res.status(500).send({ error: 'Login failed' });
    }
});

// Create (POST) - Add a new user
app.post('/api/users', async (req, res) => {
    try {
        const newUser = req.body;
        const result = await db.post(newUser);
        res.status(201).send({ message: 'User added', result });
    } catch (error) {
        res.status(500).send({ error: 'Could not add user' });
    }
});

// Read (GET) - Retrieve all users from the collection
app.get('/api/users', async (req, res) => {
    try {
        const result = await db.allDocs({ include_docs: true });
        res.status(200).send(result.rows.map(row => row.doc));
    } catch (error) {
        res.status(500).send({ error: 'Could not get users' });
    }
});

// Read (GET) - Retrieve a single user by ID
app.get('/api/users/:id', async (req, res) => {
    try {
        const user = await db.get(req.params.id);
        res.status(200).send(user);
    } catch (error) {
        res.status(404).send({ error: 'User not found' });
    }
});

// Update (PUT) - Update an existing user
app.put('/api/users/:id', async (req, res) => {
    try {
        const user = await db.get(req.params.id);
        const updatedUser = { ...user, ...req.body };
        const result = await db.put(updatedUser);
        res.status(200).send({ message: 'User updated', result });
    } catch (error) {
        res.status(500).send({ error: 'Could not update user' });
    }
});

// Delete (DELETE) - Remove a user by ID
app.delete('/api/users/:id', async (req, res) => {
    try {
        const user = await db.get(req.params.id);
        await db.remove(user);
        res.status(200).send({ message: 'User deleted' });
    } catch (error) {
        res.status(404).send({ error: 'User not found' });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
