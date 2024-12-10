import React, { useEffect, useRef } from "react";
import { Chart, ArcElement, Tooltip, Legend, DoughnutController } from "chart.js";

// Registrar los elementos necesarios de Chart.js
Chart.register(ArcElement, Tooltip, Legend, DoughnutController);

export default function GaugeChart({ val, colors }) {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    const ctx = chartRef.current.getContext("2d");

    // Destruir la instancia previa si existe
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    // Configuración del gráfico de medidor
    chartInstance.current = new Chart(ctx, {
      type: "doughnut",
      data: {
        datasets: [
          {
            data: [val, 100 - val], // Nivel de agua y "vacío"
            backgroundColor: colors, // Azul para el nivel de agua, gris para el vacío
            borderWidth: 0,
            cutout: "80%", // Grosor de la "dona"
            circumference: 180, // Solo la mitad superior (semicírculo)
            rotation: 270, // Empieza desde la parte inferior
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          tooltip: { enabled: false }, // Desactiva el tooltip
          legend: { display: false }, // Oculta la leyenda
        },
        animation: {
          animateRotate: true,
          animateScale: false,
        },
      },
    });

    // Limpiar la instancia del gráfico al desmontar
    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [val, colors]);

  return (
      <div className="max-w-96 mx-auto text-center">
        <canvas ref={chartRef}></canvas>
      </div>
  );
}