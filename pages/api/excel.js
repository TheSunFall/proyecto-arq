import { google } from "googleapis";

const SCOPES = ["https://www.googleapis.com/auth/spreadsheets"];
const auth = new google.auth.GoogleAuth({
  credentials: {
    client_email: process.env.GOOGLE_CLIENT_EMAIL,
    client_id: process.env.GOOGLE_CLIENT_ID,
    private_key: process.env.GOOGLE_PRIVATE_KEY.split("\\n").join("\n"),
  },
  scopes: SCOPES,
});
const sheets = google.sheets({ version: "v4", auth });

// ID de tu Google Sheet y nombre de la hoja
const SPREADSHEET_ID = process.env.SPREADSHEET_ID;
const SHEET_NAME = "Historial";

export default async function handler(req, res) {
  if (req.method === "GET") {
    const rows = await getLastRows();
    const start = rows[0] - 6 ? rows[0] - 6 : 2;
    const LAST_6_RANGE = `Historial!A${start}:E${rows[0]}`;
    try {
      const response = await sheets.spreadsheets.values.get({
        spreadsheetId: SPREADSHEET_ID,
        range: LAST_6_RANGE,
      });

      let data = response.data.values || [];

      // Obtener solo los últimos 6 registros (suponiendo que la primera fila son encabezados)
      const last6values = data; // Extrae las últimas 6 filas
      res.status(200).json({ last6values });
    } catch (error) {
      console.error("Error guardando los datos:", error);
      res.status(500).json({ error: "Error interno del servidor" });
    }
  } else if (req.method === "POST") {
    try {
      const { lluvia, humedad, estadoBomba, nivelAgua, fecha } = req.body;

      let stringEstado = estadoBomba ? "Encendida" : "Apagada";

      // Agregar los datos a Google Sheets
      await sheets.spreadsheets.values.append({
        spreadsheetId: SPREADSHEET_ID,
        range: SHEET_NAME,
        valueInputOption: "RAW",
        requestBody: {
          values: [[lluvia, humedad, stringEstado, nivelAgua, fecha]],
        },
      });

      // Responder al ESP32
      res.status(200).json({ message: "Datos guardados correctamente" });
    } catch (error) {
      console.error("Error guardando los datos:", error);
      res.status(500).json({ error: "Error interno del servidor" });
    }
  } else {
    res.status(405).json({ error: "Método no permitido" });
  }
}

async function getLastRows() {
  const response = await sheets.spreadsheets.values.get({
    spreadsheetId: SPREADSHEET_ID,
    range: "Historial!H2",
  });
  return response.data.values[0];
}
