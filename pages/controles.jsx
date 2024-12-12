import { useState, useEffect } from "react";
import Layout from "@/components/layout";
import Toggle from "@/components/Toggle";

export default function ControlBomba() {
  const [estado, setEstado] = useState(false);
  const [modoAutomatico, setModoAutomatico] = useState(false);

  // Consultar el estado actual del servidor
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/api/bomba");
      const data = await response.json();
      setEstado(data.bombaEncendida);
      setModoAutomatico(data.modoAutomatico);
    };

    // Solo establecer el intervalo si estado es falso
    let interval;
    if (modoAutomatico) {
      interval = setInterval(() => {
        fetchData();
      }, 5000);
    }

    // Ejecutar fetchData una vez al montar el componente
    fetchData();

    // Limpiar intervalo al desmontar el componente o cuando estado cambie a true
    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [modoAutomatico]); // Añadir estado como dependencia

  // Actualizar el estado o el modo
  const cambiarModo = async () => {
    let nuevoModo = !modoAutomatico;
    setModoAutomatico(nuevoModo);
    console.log(nuevoModo);
    await fetch("/api/bomba", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        nuevoModo: nuevoModo,
      }),
    });
  };

  const cambiarEstadoBomba = async () => {
    let nuevoEstado = !estado;
    setEstado(nuevoEstado);
    await fetch("/api/bomba", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        nuevoEstadoBomba: nuevoEstado,
      }),
    });
  };

  return (
    <Layout>
      <div className="p-4 space-y-4 w-11/12 mx-auto">
        <h1>Control de la Bomba</h1>

        <p>
          Estado de la bomba:{" "}
          <span className={estado ? "bg-lime-700" : "bg-red-700"}>
            {" "}
            {estado ? "Activada" : "Desactivada"}{" "}
          </span>
        </p>
        <p>Modo actual: {modoAutomatico ? "Automático" : "Manual"}</p>
        <p>Cambiar a modo automático</p>
        <Toggle estado={modoAutomatico} handler={cambiarModo}></Toggle>
        {!modoAutomatico && (
          <>
            <p>Activar bomba</p>
            <Toggle estado={estado} handler={cambiarEstadoBomba}></Toggle>
          </>
        )}
      </div>
    </Layout>
  );
}
