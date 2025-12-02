"use client";

import { useState, useEffect } from "react";
import { RefreshCw } from "lucide-react";

interface BitcoinData {
  supply: number;
  lastUpdate: Date;
}

export default function BitcoinTracker() {
  const [data, setData] = useState<BitcoinData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchBitcoinSupply = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/supply");

      if (!response.ok) {
        throw new Error("Erreur lors de la récupération des données");
      }

      const result = await response.json();
      setData({
        supply: result.supply,
        lastUpdate: new Date(result.timestamp),
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Une erreur est survenue");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBitcoinSupply();
    const interval = setInterval(fetchBitcoinSupply, 30000);
    return () => clearInterval(interval);
  }, []);

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat("fr-FR", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(num);
  };

  const maxSupply = 21000000;
  const percentageMined = data ? ((data.supply / maxSupply) * 100).toFixed(4) : "0";

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-500 via-amber-500 to-yellow-500 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-md w-full">
        <div className="text-center mb-8">
          <div className="inline-block bg-gradient-to-r from-orange-500 to-amber-500 rounded-full p-4 mb-4">
            <svg
              className="w-16 h-16 text-white"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M23.638 14.904c-1.602 6.43-8.113 10.34-14.542 8.736C2.67 22.05-1.244 15.525.362 9.105 1.962 2.67 8.475-1.243 14.9.358c6.43 1.605 10.342 8.115 8.738 14.548v-.002zm-6.35-4.613c.24-1.59-.974-2.45-2.64-3.03l.54-2.153-1.315-.33-.525 2.107c-.345-.087-.705-.167-1.064-.25l.526-2.127-1.32-.33-.54 2.165c-.285-.067-.565-.132-.84-.2l-1.815-.45-.35 1.407s.975.225.955.236c.535.136.63.486.615.766l-1.477 5.92c-.075.166-.24.406-.614.314.015.02-.96-.24-.96-.24l-.66 1.51 1.71.426.93.242-.54 2.19 1.32.327.54-2.17c.36.1.705.19 1.05.273l-.51 2.154 1.32.33.545-2.19c2.24.427 3.93.257 4.64-1.774.57-1.637-.03-2.58-1.217-3.196.854-.193 1.5-.76 1.68-1.93h.01zm-3.01 4.22c-.404 1.64-3.157.75-4.05.53l.72-2.9c.896.23 3.757.67 3.33 2.37zm.41-4.24c-.37 1.49-2.662.735-3.405.55l.654-2.64c.744.18 3.137.524 2.75 2.084v.006z" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Bitcoin en Circulation
          </h1>
          <p className="text-gray-600">Suivi en temps réel</p>
        </div>

        {loading && !data ? (
          <div className="text-center py-8">
            <RefreshCw className="w-8 h-8 text-orange-500 animate-spin mx-auto" />
            <p className="text-gray-600 mt-4">Chargement...</p>
          </div>
        ) : error ? (
          <div className="text-center py-8">
            <p className="text-red-500 mb-4">{error}</p>
            <button
              onClick={fetchBitcoinSupply}
              className="px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
            >
              Réessayer
            </button>
          </div>
        ) : data ? (
          <>
            <div className="bg-gradient-to-r from-orange-50 to-amber-50 rounded-2xl p-6 mb-6">
              <div className="text-center">
                <p className="text-gray-600 text-sm mb-2">BTC Disponibles</p>
                <p className="text-5xl font-bold text-gray-800 mb-1">
                  {formatNumber(data.supply)}
                </p>
                <p className="text-gray-500 text-sm">BTC</p>
              </div>
            </div>

            <div className="space-y-4 mb-6">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Supply Maximum</span>
                <span className="font-semibold text-gray-800">
                  {formatNumber(maxSupply)} BTC
                </span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-gray-600">Restant à miner</span>
                <span className="font-semibold text-gray-800">
                  {formatNumber(maxSupply - data.supply)} BTC
                </span>
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-600">Pourcentage miné</span>
                  <span className="font-semibold text-gray-800">
                    {percentageMined}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-orange-500 to-amber-500 h-full rounded-full transition-all duration-500"
                    style={{ width: `${percentageMined}%` }}
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-between items-center text-sm text-gray-500 pt-4 border-t border-gray-200">
              <span>
                Mis à jour: {data.lastUpdate.toLocaleTimeString("fr-FR")}
              </span>
              <button
                onClick={fetchBitcoinSupply}
                disabled={loading}
                className="text-orange-500 hover:text-orange-600 transition-colors disabled:opacity-50"
              >
                <RefreshCw
                  className={`w-4 h-4 ${loading ? "animate-spin" : ""}`}
                />
              </button>
            </div>
          </>
        ) : null}
      </div>
    </div>
  );
}
