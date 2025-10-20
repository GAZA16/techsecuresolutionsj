// server.js
import express from 'express';
import fetch from 'node-fetch'; // para Node <18
import cors from 'cors';
import bodyParser from 'body-parser';
import twilio from 'twilio';

const app = express();
app.use(cors());
app.use(bodyParser.json());

// ----------------------
// CONFIGURACIONES
// ----------------------
const PORT = 3000;
const OPENAI_API_KEY = 'TU_API_KEY_DE_OPENAI'; // <--- reemplaza con tu API Key real

// Twilio (opcional, si quieres enviar códigos SMS)
const TWILIO_ACCOUNT_SID = 'TU_ACCOUNT_SID';
const TWILIO_AUTH_TOKEN = 'TU_AUTH_TOKEN';
const TWILIO_NUMBER = '+1234567890'; // Número de Twilio
const client = twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);


// ----------------------
// ENDPOINT: ENVIAR CÓDIGO SMS (opcional)
// ----------------------
app.post('/enviar-codigo', async (req, res) => {
  const { telefono } = req.body;
  if (!telefono) return res.status(400).json({ success: false, error: 'Número de teléfono requerido.' });

  const codigo = Math.floor(100000 + Math.random() * 900000);

  try {
    await client.messages.create({
      body: `Tu código de verificación es: ${codigo}`,
      from: TWILIO_NUMBER,
      to: telefono
    });

    res.json({ success: true, codigo }); // Para pruebas

  } catch (err) {
    console.error('Error enviando SMS:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// ----------------------
// LEVANTAR SERVIDOR
// ----------------------
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
