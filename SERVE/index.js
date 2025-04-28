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

  const prompt = `Em um experimento recente, foi medida a viscosidade cinemática de um óleo lubrificante, obtendo o valor de ${viscosity} cSt a ${temperature}°C. Siga os passos abaixo para verificar a marca do óleo e buscar informações na internet:

1. **Busca do Datasheet:**
   - Pesquise na internet a ficha técnica (datasheet) do lubrificante da marca ${marca} usando motores de busca (como Google ou Bing) ou o site oficial do fabricante.
   - Verifique se a viscosidade cinemática especificada no datasheet a ${temperature}°C corresponde ao valor medido de ${viscosity} cSt.

2. **Verificação da Correspondência:**
   - Se o datasheet for encontrado e a viscosidade corresponder, liste as especificações técnicas do óleo conforme indicado abaixo.
   - Se o datasheet não for encontrado ou a viscosidade não corresponder, passe para a busca de óleos alternativos.

3. **Busca de Óleos Alternativos:**
   - Caso o datasheet da marca ${marca} não esteja disponível ou não haja correspondência, busque óleos lubrificantes industriais com a mesma especificação SAE (por exemplo, SAE 40, se aplicável).
   - Priorize óleos com viscosidade cinemática de ${viscosity} cSt a ${temperature}°C. Se não houver correspondência exata, inclua óleos com viscosidades próximas (dentro de ±10% do valor medido).

4. **Especificações Técnicas:**
   - Para cada óleo encontrado (original ou alternativo), forneça as seguintes informações, organizadas de forma estruturada, uma abaixo da outra, com até 65 caracteres por linha:
     - Nome do produto
     - Classificação API
     - Viscosidade cinemática (cSt a ${temperature}°C)
     - Viscosidade dinâmica (se disponível)
     - Densidade do óleo
     - Base (mineral, sintética, etc.)
     - Aplicações recomendadas
     - Temperaturas de operação
     - Provedor

5. **Destaque para Viscosidades Próximas:**
   - Se a viscosidade exata não for encontrada, inclua óleos com viscosidades próximas e indique a diferença percentual em relação ao valor medido.

6. **Formato das Informações:**
   - Apresente as informações de cada óleo de maneira clara e concisa, como no exemplo abaixo:

   **Exemplo:**
   - Nome do produto: Shell Helix SAE 40
   - Classificação API: SN
   - Viscosidade cinemática: 138 cSt a 40°C (diferença de 2% de 140 cSt)
   - Viscosidade dinâmica: Não disponível
   - Densidade do óleo: 0.87 g/cm³
   - Base: Mineral
   - Aplicações recomendadas: Motores a gasolina
   - Temperaturas de operação: -15°C a 145°C
   - Provedor: Shell

Por favor, siga estas instruções para garantir que os dados sejam coletados e apresentados de forma consistente e útil.`;

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
