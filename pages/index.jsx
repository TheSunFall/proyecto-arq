import React, { useEffect, useState } from "react";
import GaugeChart from "@/components/Gauge";
import Layout from "@/components/layout";

export default function Control() {
  const [nivelAgua, setNivelAgua] = useState(0);
  const [humedad, setHumedad] = useState(0);
  const [lluvia, setLluvia] = useState(0);
  const fetchData = async () => {
    try {
      const response = await fetch("/api/datos");
      const result = await response.json();

      // Obtener la última lectura de nivel de agua (columna 2)
      const ultimaLectura = result.last6values?.slice(-1)[0];
      if (ultimaLectura) {
        setNivelAgua(parseFloat(ultimaLectura[3])); // Asigna el nivel de agua
        setHumedad(parseFloat(ultimaLectura[1])); // Asigna la humedad
        setLluvia(parseFloat(ultimaLectura[0])); // Asigna la lluvia
      }
    } catch (error) {
      console.error("Error al obtener datos:", error);
    }
  };
  // Simular obtener el nivel de agua desde la API
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Layout>
      <div className="w-10/12 h-5/6 grid grid-cols-2 grid-rows-[20%_40%_40%] gap-4 mx-auto py-8">
        <div className="col-start-1 self-center max-h-24 text-lg"><h1 style={{ textAlign: "center" }}>Datos de la última lectura</h1></div>
        <button className="col-start-2 row-start-1 self-center bg-pink-700 text-white p-2 rounded" onClick={fetchData}>
          Actualizar Datos
        </button>
        <div className="col-start-1 row-start-2 text-center"><GaugeChart val={humedad} colors={["#713f12", "#1e293b"]} /> Humedad del suelo</div>
        <div className="col-start-2 row-start-2 text-center"><GaugeChart val={lluvia} colors={["#65a30d", "#1e293b"]} />Lluvia</div>
        <div className="col-span-2 row-start-3 text-center"><GaugeChart val={nivelAgua} colors={["#0284c7", "#1e293b"]} />Nivel de agua del tanque</div>
      </div>


    </Layout>
  );
}