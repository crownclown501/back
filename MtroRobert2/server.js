require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3000;

app.use(cors());

app.get('/api/noticias-sat', async (req, res) => {
  const API_KEY = process.env.GNEWS_API_KEY;
  const query = '"SAT" OR "contabilidad financiera" OR "reforma fiscal"';
  const url = `https://gnews.io/api/v4/search?q=${encodeURIComponent(query)}&lang=es&country=mx&max=12&apikey=${API_KEY}`;
  
  try {
    const response = await fetch(url);
    const data = await response.json();
    res.json(data.articles || []);
  } catch (error) {
    console.error('Error al obtener noticias de GNews:', error);
    res.status(500).json({ error: 'Error interno del servidor al procesar las noticias' });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor backend corriendo en http://localhost:${PORT}/`);
});
