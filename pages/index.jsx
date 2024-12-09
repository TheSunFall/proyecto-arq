import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import "chart.js/auto";
import Layout from "@/components/layout";

export default function Dashboard() {
  const [datos, setDatos] = useState([]);
  

  useEffect(() => {
    // Llamar a la API para obtener datos
    const fetchData = async () => {
      const response = await fetch("/api/obtenerDatos");
      const data = await response.json();
      setDatos(data);
    };

    fetchData();
  }, []);

  

  // Extraer datos para gráficos
  const fechas = datos.map(d => d.fecha);
  const lluvia = datos.map(d => d.lluvia);
  const humedad = datos.map(d => d.humedad);
  const nivelAgua = datos.map(d => d.nivel_agua);

  return (
    <Layout>
      <div className="p-8">
      <h1>Datos de Sensores</h1>
      <div className="w-3/4 h-full">
        <Line
          data={{
            labels: fechas,
            datasets: [
              { label: "Lluvia", data: lluvia, borderColor: "blue", fill: false },
              { label: "Humedad", data: humedad, borderColor: "green", fill: false },
              { label: "Nivel de Agua", data: nivelAgua, borderColor: "red", fill: false },
            ],
          }}
          options={{
            responsive: true,
            plugins: { legend: { position: "top" } },
          }}
        />
      </div>
    </div>
    </Layout>
  );
}