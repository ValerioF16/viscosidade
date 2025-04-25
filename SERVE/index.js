const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

app.post('/api/viscosidade', async (req, res) => {
  const { viscosity, marca ,temperature = "40°C" } = req.body;

  const prompt = `Busque a ficha tecnica do lubrificante ${marca} e Liste óleos lubricantes industriais com uma viscosidade cinemática de
//    ${viscosity} cSt a ${temperature} e forneça suas especificações técnicas. Organize as informaçõos de forma estrutura uma abaixo da 
// outra e as informações dos oleos devem conter: nome do produto, 
// classificação APi,  
// viscosidade cinetica, 
// base, 
// aplicação
// , temperatura de operação
//  e provedor repito 
// Nao crie linhas muito grandes de texto se for preciso quebre no max 65 carateres por linha`;

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
