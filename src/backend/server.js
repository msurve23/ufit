import express from 'express';
import PouchDB from 'pouchdb';
import bodyParser from 'body-parser';

const app = express();
const db = new PouchDB('ufit-db');
const PORT = 3000;

app.use(bodyParser.json());

app.post('/api/users', async (req, res) => {
    try {
        const newUser = req.body;
        const result = await db.post(newUser);
        res.status(201).send({ message: 'User added', result });
    } catch (error) {
        res.status(500).send({ error: 'Could not add user' });
    }
});

app.get('/api/users/me', async (req, res) => {
    res.status(200).send({ username: 'user' });
});

app.post('/api/logout', (req, res) => {
    res.status(200).send({ message: 'Logout successful' });
});

app.get('/api/users', async (req, res) => {
    try {
        const result = await db.allDocs({ include_docs: true });
        res.status(200).send(result.rows.map(row => row.doc));
    } catch (error) {
        res.status(500).send({ error: 'Could not get users' });
    }
});

app.get('/api/users/:id', async (req, res) => {
    try {
        const item = await db.get(req.params.id);
        res.status(200).send(item);
    } catch (error) {
        res.status(404).send({ error: 'User not found' });
    }
});

app.put('/api/users/:id', async (req, res) => {
    try {
        const item = await db.get(req.params.id);
        const updatedItem = { ...item, ...req.body };
        const result = await db.put(updatedItem);
        res.status(200).send({ message: 'User updated', result });
    } catch (error) {
        res.status(500).send({ error: 'Could not update user' });
    }
});

app.delete('/api/users/:id', async (req, res) => {
    try {
        const item = await db.get(req.params.id);
        await db.remove(item);
        res.status(200).send({ message: 'User deleted' });
    } catch (error) {
        res.status(404).send({ error: 'User not found' });
    }
});

app.get('/api/crowdrating', async (req, res) => {
    try {
        const rating = await db.get('crowdrating') || { rating: 0 };
        res.status(200).send(rating);
    } catch (error) {
        res.status(500).send({ error: 'Could not get crowd rating' });
    }
});

app.put('/api/crowdrating', async (req, res) => {
    try {
        let rating = await db.get('crowdrating').catch(() => ({ _id: 'crowdrating' }));
        rating = { ...rating, ...req.body };
        const result = await db.put(rating);
        res.status(200).send({ message: 'Crowd rating updated', result });
    } catch (error) {
        res.status(500).send({ error: 'Could not update crowd rating' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
