import React, { useState, useEffect } from "react";

const ConversionMoneda: React.FC = () => {
  const [valor, setValor] = useState<number>(() => {
    const guardado = localStorage.getItem("valor-cop");
    return guardado ? parseFloat(guardado) : 0;
  });
  const [moneda, setMoneda] = useState<string>("USD");
  const [resultado, setResultado] = useState<number | null>(null);

  const tasas: Record<string, number> = {
    USD: 0.00026, // Ejemplo: 1 COP = 0.00026 USD
    EUR: 0.00024,
    MXN: 0.0043,
  };

  const convertir = () => {
    const tasa = tasas[moneda];
    const conversion = valor * tasa;
    setResultado(conversion);
    localStorage.setItem("valor-cop", valor.toString());
  };

  useEffect(() => {
    // Limpieza si el valor cambia externamente
    if (isNaN(valor)) setValor(0);
  }, [valor]);

  return (
    <div className="p-4 border rounded-lg shadow-md bg-white dark:bg-slate-800">
      <h2 className="text-lg font-bold mb-2">Conversor de Moneda</h2>

      <div className="flex gap-2 mb-2">
        <input
          type="number"
          className="border p-2 rounded w-1/2"
          placeholder="Valor en COP"
          value={valor}
          onChange={(e) => setValor(parseFloat(e.target.value))}
          data-testid="input-cop"
        />
        <select
          className="border p-2 rounded w-1/2"
          value={moneda}
          onChange={(e) => setMoneda(e.target.value)}
          data-testid="select-moneda"
        >
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
          <option value="MXN">MXN</option>
        </select>
      </div>

      <button
        onClick={convertir}
        className="bg-emerald-600 text-white px-4 py-2 rounded hover:bg-emerald-700"
      >
        Convertir
      </button>

      {resultado !== null && (
        <div className="mt-4 font-mono text-lg" data-testid="resultado">
          {valor.toLocaleString()} COP = {resultado.toFixed(4)} {moneda}
        </div>
      )}
    </div>
  );
};

export default ConversionMoneda;
