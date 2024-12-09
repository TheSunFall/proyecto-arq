import { google } from "googleapis";

const SCOPES = ["https://www.googleapis.com/auth/spreadsheets"];
const CREDENTIALS = require("../../../credenciales.json");

export default async function handler(req, res) {
    if (req.method === "POST") {
        try {
          const { lluvia, humedad, nivel_agua } = req.body;
    
          // Autenticación con Google Sheets
          const auth = new google.auth.GoogleAuth({
            credentials: CREDENTIALS,
            scopes: SCOPES,
          });
          const sheets = google.sheets({ version: "v4", auth });
    
          // ID de tu Google Sheet y nombre de la hoja
          const SPREADSHEET_ID = "1YIvqvY5XdCOUqH_CCwMd_p_JOFWgHv011DtkSdjXGR8";
          const SHEET_NAME = "Hoja1";
    
          // Agregar los datos a Google Sheets
          await sheets.spreadsheets.values.append({
            spreadsheetId: SPREADSHEET_ID,
            range: SHEET_NAME,
            valueInputOption: "RAW",
            requestBody: {
              values: [[lluvia, humedad, nivel_agua, new Date().toISOString()]],
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