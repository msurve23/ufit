import express from 'express';
import PouchDB from 'pouchdb';
import bodyParser from 'body-parser';

const app = express();
const PORT = process.env.PORT || 3000;
const db = new PouchDB('ufit-db');

app.use(bodyParser.json());

app.post('/api/items', async (req, res) => {
    const newItem = req.body;
    try {
        const response = await db.post(newItem);
        res.status(201).json({ message: 'Item created', item: response });
    } catch (error) {
        res.status(500).json({ error: 'Failed to create item' });
    }
});

app.get('/api/items', async (req, res) => {
    try {
        const response = await db.allDocs({ include_docs: true });
        res.status(200).json(response.rows.map(row => row.doc));
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch items' });
    }
});

app.get('/api/items/:id', async (req, res) => {
    try {
        const item = await db.get(req.params.id);
        res.status(200).json(item);
    } catch (error) {
        res.status(404).json({ error: 'Item not found' });
    }
});


app.put('/api/items/:id', async (req, res) => {
    try {
        const item = await db.get(req.params.id);
        const updatedItem = await db.put({ ...item, ...req.body });
        res.status(200).json({ message: 'Item updated', item: updatedItem });
    } catch (error) {
        res.status(500).json({ error: 'Failed to update item' });
    }
});

app.delete('/api/items/:id', async (req, res) => {
    try {
        const item = await db.get(req.params.id);
        await db.remove(item);
        res.status(200).json({ message: 'Item deleted' });
    } catch (error) {
        res.status(404).json({ error: 'Item not found' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
