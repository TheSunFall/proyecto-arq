let estadoCache = false; // Variable global que controla el estado de la bomba
let humedadCache = 0; // Variable global que controla la humedad del suelo
let aguaCache = 0; // Variable global que controla el nivel de agua
let lluviaCache = 0; // Variable global que controla la lluvia

export default function handler(req, res) {
  if (req.method === "GET") {
    res.status(200).json({
      estadoBomba: estadoCache,
      humedadSuelo: humedadCache,
      nivelAgua: aguaCache,
      nivelLluvia: lluviaCache,
    });
  } else if (req.method === "POST") {
    const { estadoBomba, humedadSuelo, nivelAgua, nivelLluvia } =
      req.body;

    if (typeof estadoBomba === "boolean") estadoCache = estadoBomba;
    if (typeof humedadSuelo === "number") humedadCache = humedadSuelo;
    if (typeof nivelAgua === "number") aguaCache = nivelAgua;
    if (typeof nivelLluvia === "number") lluviaCache = nivelLluvia;

    res.status(200).json({
      message: "Valores actualizados"
    });
  } else {
    res.status(405).json({ error: "Método no permitido" });
  }
}
