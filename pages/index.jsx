import React, { useEffect, useState } from "react";
import GaugeChart from "@/components/Gauge";
import Layout from "@/components/layout";

export default function Control() {
  const [estadoBomba, setEstadoBomba] = useState(false);
  const [nivelAgua, setNivelAgua] = useState(0);
  const [humedad, setHumedad] = useState(0);
  const [lluvia, setLluvia] = useState(0);
  const fetchData = async () => {
    try {
      const response = await fetch("/api/datos");
      const result = await response.json();

      setEstadoBomba(result.estadoBomba);
      setNivelAgua(result.nivelAgua);
      setHumedad(result.humedadSuelo);
      setLluvia(result.nivelLluvia);
    } catch (error) {
      console.error("Error al obtener datos:", error);
    }
  };
  // Simular obtener el nivel de agua desde la API
  useEffect(() => {
    let interval = setInterval(() => {
      fetchData();
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Layout>
      <div className="w-10/12 h-5/6 grid grid-cols-2 grid-rows-[20%_40%_40%] gap-4 mx-auto py-8">
        <div className="col-start-1 self-center max-h-24 text-lg items-center">
          <h1 style={{ textAlign: "center" }}>Datos de la última lectura</h1>
        </div>
        <div className="col-start-1 row-start-2 text-center">
          <GaugeChart val={humedad} colors={["#713f12", "#C0BDCB"]} /> Humedad
          del suelo: {humedad}%
        </div>
        <div className="col-start-2 row-start-2 text-center self-center">
          {" "}
          Estado de la bomba:{" "}
          <span className={estadoBomba ? "font-bold text-lime-700" : "font-bold text-red-700"}>
            {" "}
            {estadoBomba ? "Activada" : "Desactivada"}{" "}
          </span>
        </div>
        <div className="col-start-1 row-start-3 text-center">
          <GaugeChart val={lluvia} colors={["#65a30d", "#C0BDCB"]} />
          Lluvia: {lluvia}%
        </div>
        <div className="col-start-2 row-start-3 text-center">
          <GaugeChart val={nivelAgua} colors={["#0284c7", "#C0BDCB"]} />
          Nivel de agua del tanque: {nivelAgua}%
        </div>
      </div>
    </Layout>
  );
}
