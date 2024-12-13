import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import "chart.js/auto";
import Layout from "@/components/layout";

export default function Dashboard() {
  const [datos, setDatos] = useState([]);

  const fetchData = async () => {
    const response = await fetch("/api/excel");
    const datos = (await response.json())["last6values"];
    console.log(datos);
    setDatos(datos);
  };

  useEffect(() => {
    // Llamar a la API para obtener datos
    fetchData();
  }, []);

  // Extraer datos para gráficos
  if (datos.length === 0)
    return (
      <p className="inline-block bg-teal-800 text-gray-100 text-3xl text-center align-middle pt-48 w-screen h-screen">
        Cargando datos...
      </p>
    );

  // Preparar datos para Chart.js
  const fechas = datos.map((fila) => fila[4]); // Columna de fechas
  console.log(fechas);
  const lluvia = datos.map((fila) => parseFloat(fila[0])); // Columna de lluvia
  const humedad = datos.map((fila) => parseFloat(fila[1])); // Columna de humedad
  const nivelAgua = datos.map((fila) => parseFloat(fila[3])); // Columna de nivel de agua

  const chartData = {
    labels: fechas,
    datasets: [
      {
        label: "Sensor de Lluvia",
        data: lluvia,
        borderColor: "blue",
        backgroundColor: "rgba(0, 0, 255, 0.1)",
      },
      {
        label: "Humedad del Suelo",
        data: humedad,
        borderColor: "green",
        backgroundColor: "rgba(0, 255, 0, 0.1)",
      },
      {
        label: "Nivel de Agua",
        data: nivelAgua,
        borderColor: "red",
        backgroundColor: "rgba(255, 0, 0, 0.1)",
      },
    ],
  };

  return (
    <Layout>
      <div className="text-center mx-auto w-10/12 p-8">
        <h2>Últimas 6 Lecturas de Sensores</h2>
        <Line data={chartData} className="min-w-96" />
        <button onClick={fetchData} className="bg-primary text-slate-100 m-4 p-4 rounded-md hover:bg-active hover:text-slate-700 active:text-slate-700 active:bg-clicked active:font-bold">Actualizar datos</button>
      </div>
    </Layout>
  );
}
