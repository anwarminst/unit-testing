const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 6000;

app.use(cors());
app.options('*', cors()); // Handle preflight
app.use(bodyParser.json());

// Helper to read/write JSON file
const getData = () => JSON.parse(fs.readFileSync('data.json', 'utf-8'));
const saveData = (data) => fs.writeFileSync('data.json', JSON.stringify(data, null, 2));

// GET all items
app.get('/items', (req, res) => {
  const data = getData();
  res.json(data);
});

// GET item by ID
app.get('/items/:id', (req, res) => {
  const data = getData();
  const item = data.find(i => i.id === parseInt(req.params.id));
  if (!item) return res.status(404).json({ message: 'Item not found' });
  res.json(item);
});

// POST create new item
app.post('/items', (req, res) => {
  const data = getData();
  const newItem = { ...req.body, id: Date.now() };
  data.push(newItem);
  saveData(data);
  res.status(201).json(newItem);
});

// PUT update item
app.put('/items/:id', (req, res) => {
  let data = getData();
  const id = parseInt(req.params.id);
  const index = data.findIndex(i => i.id === id);
  if (index === -1) return res.status(404).json({ message: 'Item not found' });

  data[index] = { ...data[index], ...req.body };
  saveData(data);
  res.json(data[index]);
});

// DELETE item
app.delete('/items/:id', (req, res) => {
  let data = getData();
  const id = parseInt(req.params.id);
  const index = data.findIndex(i => i.id === id);
  if (index === -1) return res.status(404).json({ message: 'Item not found' });

  const deletedItem = data.splice(index, 1);
  saveData(data);
  res.json(deletedItem[0]);
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
