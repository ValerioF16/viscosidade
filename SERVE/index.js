const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.post('/api/viscosidade', async (req, res) => {
  const { viscosity, marca ,temperature = "40°C" } = req.body;

  const prompt = `Busque a ficha técnica (datasheet) do lubrificante ${marca} e 
liste óleos lubrificantes industriais com uma viscosidade cinemática 
de ${viscosity} cSt a ${temperature}°C. Se não houver correspondência 
exata, procure óleos com viscosidades cinemáticas próximas. Para cada 
óleo encontrado, forneça as especificações técnicas abaixo, de forma 
estruturada, uma abaixo da outra, com até 65 caracteres por linha:

- Nome do produto  
- Classificação API  
- Viscosidade cinemática (cSt a ${temperature}°C)  
- Viscosidade dinâmica (se disponível)  
- Densidade do óleo  
- Base (mineral, sintética, etc.)  
- Aplicações recomendadas  
- Temperaturas de operação  
- Provedor  

Organize as informações de cada óleo de maneira clara e concisa. 
Se a viscosidade exata não for encontrada, inclua óleos com viscosidades 
próximas e destaque essa proximidade.`;

  try {
    const response = await axios.post(
      'https://openrouter.ai/api/v1/chat/completions',
      {
        model: 'deepseek/deepseek-chat',
        messages: [
          { role: 'system', content: 'Você é um assistente que fornece informações sobre óleos com base em sua viscosidade.' },
          { role: 'user', content: prompt }
        ],
        stream: false
      },
      {
        headers: {
          'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );

    res.json(response.data.choices[0].message.content);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao consultar API do OpenRouter.' });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
