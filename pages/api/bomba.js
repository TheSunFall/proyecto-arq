let estadoBomba = false; // Variable global que controla el estado de la bomba
let modoAutomatico = false; // Variable global que controla el modo manual
let humedadSuelo = 100;

export default function handler(req, res) {
    if (req.method === "GET") {
        res.status(200).json({ 
            modoAutomatico: modoAutomatico, 
            bombaEncendida: estadoBomba,
            humedad: humedadSuelo
        });

    } else if (req.method === "POST") {
        const { nuevaHumedad, nuevoModo, nuevoEstadoBomba } = req.body;

        if (typeof nuevaHumedad === "number") humedadSuelo = nuevaHumedad;
        if (typeof nuevoModo === "boolean") modoAutomatico = nuevoModo;
        if (typeof nuevoEstadoBomba === "boolean" && !modoAutomatico) estadoBomba = nuevoEstadoBomba;

        res.status(200).json({
            message: "Valores actualizados",
            bombaEncendida: estadoBomba,
            modoAutomatico,
            humedadSuelo,
        });
    } else {
        res.status(405).json({ error: "Método no permitido" });
    }
}