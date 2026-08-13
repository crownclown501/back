const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;

// Permite que tu app de Angular haga peticiones a este servidor
app.use(cors());

app.get('/api/noticias-sat', async (req, res) => {
  // Ahora toma la llave de las variables de entorno de Render
  const API_KEY = process.env.API_KEY; 
  
  if (!API_KEY) {
    return res.status(500).json({ error: 'La API Key no está configurada en el servidor.' });
  }

  const query = '"SAT" OR "contabilidad financiera" OR "reforma fiscal"';
  const url = `https://gnews.io/api/v4/search?q=${encodeURIComponent(query)}&lang=es&country=mx&max=12&apikey=${API_KEY}`;

  try {
    // La imagen muestra que Render usa Node v24.14.1, por lo que 'fetch' nativo funcionará perfectamente sin librerías extra.
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
  console.log(`Servidor backend corriendo en el puerto ${PORT}`);
});
