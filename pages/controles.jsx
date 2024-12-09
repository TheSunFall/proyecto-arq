import { useState, useEffect } from "react";
import Layout from "@/components/layout";
import Toggle from "@/components/Toggle";

export default function ControlBomba() {
    const [estado, setEstado] = useState(false);
    const [modoAutomatico, setModoAutomatico] = useState(false);
    const [humedad, setHumedad] = useState(0);

    // Consultar el estado actual del servidor
    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch("/api/bomba");
            const data = await response.json();
            setEstado(data.bombaEncendida);
            setModoAutomatico(data.modoAutomatico);
            setHumedad(data.humedad);
        };
        fetchData();
    }, []);

    // Actualizar el estado o el modo
    const cambiarModo = async () => {
        let nuevoModo = !modoAutomatico;
        setModoAutomatico(nuevoModo);
        console.log(nuevoModo);
        await fetch("/api/bomba", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ nuevoModo }),
        });
    };

    const cambiarEstadoBomba = async () => {
        let nuevoEstado = !estado;
        setEstado(nuevoEstado);
        await fetch("/api/bomba", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ nuevoEstadoBomba: nuevoEstado }),
        });
    };


    return (
        <Layout>
            <h1>Control de la Bomba</h1>
            <p>Estado de la bomba: {estado ? "Activada" : "Desactivada"}</p>
            <p>Modo actual: {modoAutomatico ? "Automático" : "Manual"}</p>
            <p>Cambiar a modo automático</p>
            <Toggle estado={modoAutomatico} handler={cambiarModo}></Toggle>
            {!modoAutomatico && (
                <>
                    <p>Activar bomba</p>
                    <Toggle estado={estado} handler={cambiarEstadoBomba}></Toggle>
                </>
            )}
        </Layout>
    );
}