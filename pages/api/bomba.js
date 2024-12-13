let estadoBomba = false; // Variable global que controla el estado de la bomba
let modoAutomatico = true; // Variable global que controla el modo manual

export default function handler(req, res) {
  if (req.method === "GET") {
    res.status(200).json({
      modoAutomatico: modoAutomatico,
      bombaEncendida: estadoBomba,
    });
  } else if (req.method === "POST") {
    const { nuevoModo, nuevoEstadoBomba } = req.body;

    if (typeof nuevoModo === "boolean") modoAutomatico = nuevoModo;
    if (typeof nuevoEstadoBomba === "boolean") estadoBomba = nuevoEstadoBomba;

    res.status(200).json({
      message: "Valores actualizados",
      bombaEncendida: estadoBomba,
      modoAutomatico: modoAutomatico,
    });
  } else {
    res.status(405).json({ error: "Método no permitido" });
  }
}

