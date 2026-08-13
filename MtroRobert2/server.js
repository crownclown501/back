const express = require('express');
const cors = require('cors');
const app = express();
const PORT= process.env.PORT || 3000;

// Permite que tu app de Angular (usualmente en localhost:4200) haga peticiones a este servidor
app.use(cors());

app.get('/api/noticias-sat', async (req, res) => {
  // Tu API Key se queda segura en el backend (idealmente en un archivo .env)
  const API_KEY = '9acb3561422cee5120870b383ed50e25'; 
  const query = '"SAT" OR "contabilidad financiera" OR "reforma fiscal"';
  const url = `https://gnews.io/api/v4/search?q=${encodeURIComponent(query)}&lang=es&country=mx&max=12&apikey=${API_KEY}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    
    // GNews devuelve el arreglo de noticias dentro de la propiedad 'articles'.
    // Mandamos directamente ese arreglo al frontend.
    res.json(data.articles || []); 
  } catch (error) {
    console.error('Error al obtener noticias de GNews:', error);
    res.status(500).json({ error: 'Error interno del servidor al procesar las noticias' });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor backend corriendo en https://github.com/crownclown501/back/tree/0a5173813a3e445e9f1a0c889a236f24a4a9e9f3/MtroRobert2:${PORT}/`);
});
