"use client";

import { useState, useEffect } from "react";
import { RefreshCw, TrendingUp, Coins, Target } from "lucide-react";

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
  const remaining = data ? maxSupply - data.supply : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-orange-900 to-amber-900 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-orange-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/2 -left-40 w-96 h-96 bg-amber-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute -bottom-40 right-1/3 w-80 h-80 bg-yellow-500/20 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
        <div className="w-full max-w-6xl">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-orange-500 to-amber-600 rounded-3xl shadow-2xl mb-6 transform hover:scale-110 transition-transform duration-300">
              <svg className="w-14 h-14 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.638 14.904c-1.602 6.43-8.113 10.34-14.542 8.736C2.67 22.05-1.244 15.525.362 9.105 1.962 2.67 8.475-1.243 14.9.358c6.43 1.605 10.342 8.115 8.738 14.548v-.002zm-6.35-4.613c.24-1.59-.974-2.45-2.64-3.03l.54-2.153-1.315-.33-.525 2.107c-.345-.087-.705-.167-1.064-.25l.526-2.127-1.32-.33-.54 2.165c-.285-.067-.565-.132-.84-.2l-1.815-.45-.35 1.407s.975.225.955.236c.535.136.63.486.615.766l-1.477 5.92c-.075.166-.24.406-.614.314.015.02-.96-.24-.96-.24l-.66 1.51 1.71.426.93.242-.54 2.19 1.32.327.54-2.17c.36.1.705.19 1.05.273l-.51 2.154 1.32.33.545-2.19c2.24.427 3.93.257 4.64-1.774.57-1.637-.03-2.58-1.217-3.196.854-.193 1.5-.76 1.68-1.93h.01zm-3.01 4.22c-.404 1.64-3.157.75-4.05.53l.72-2.9c.896.23 3.757.67 3.33 2.37zm.41-4.24c-.37 1.49-2.662.735-3.405.55l.654-2.64c.744.18 3.137.524 2.75 2.084v.006z" />
              </svg>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 tracking-tight">
              Bitcoin Supply Tracker
            </h1>
            <p className="text-xl text-orange-200/80 flex items-center justify-center gap-2">
              <span className="inline-block w-3 h-3 bg-red-500 rounded-full animate-pulse"></span>
              Suivi en temps réel
            </p>
          </div>

          {loading && !data ? (
            <div className="text-center py-20">
              <RefreshCw className="w-16 h-16 text-orange-400 animate-spin mx-auto mb-6" />
              <p className="text-orange-200 text-xl">Chargement des données...</p>
            </div>
          ) : error ? (
            <div className="text-center py-20 bg-white/10 backdrop-blur-lg rounded-3xl p-12 border border-white/20">
              <p className="text-red-400 text-xl mb-6">{error}</p>
              <button
                onClick={fetchBitcoinSupply}
                className="px-8 py-4 bg-gradient-to-r from-orange-500 to-amber-600 text-white font-bold rounded-xl hover:shadow-2xl hover:scale-105 transition-all duration-300"
              >
                Réessayer
              </button>
            </div>
          ) : data ? (
            <div className="space-y-6">
              {/* Main supply card */}
              <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 md:p-12 border border-white/20 shadow-2xl hover:shadow-orange-500/20 transition-all duration-300">
                <div className="text-center mb-8">
                  <p className="text-orange-200/70 text-lg mb-3 uppercase tracking-wider font-semibold">
                    BTC en circulation
                  </p>
                  <div className="text-6xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-amber-300 to-yellow-400 mb-4 tracking-tight">
                    {formatNumber(data.supply)}
                  </div>
                  <p className="text-3xl text-orange-100 font-light">BTC</p>
                </div>

                {/* Progress bar */}
                <div className="mb-8">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-orange-200/80 text-sm font-medium">Progression du minage</span>
                    <span className="text-orange-100 text-lg font-bold">{percentageMined}%</span>
                  </div>
                  <div className="relative h-6 bg-white/10 rounded-full overflow-hidden backdrop-blur-sm border border-white/20">
                    <div
                      className="absolute inset-0 bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-500 rounded-full transition-all duration-1000 ease-out shadow-lg"
                      style={{ width: `${percentageMined}%` }}
                    >
                      <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
                    </div>
                  </div>
                </div>

                {/* Stats grid */}
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:bg-white/10 transition-all duration-300">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-12 h-12 bg-orange-500/20 rounded-xl flex items-center justify-center">
                        <Target className="w-6 h-6 text-orange-400" />
                      </div>
                      <p className="text-orange-200/70 text-sm font-medium">Supply Maximum</p>
                    </div>
                    <p className="text-3xl font-bold text-white">{formatNumber(maxSupply)}</p>
                    <p className="text-orange-200/60 text-sm mt-1">BTC</p>
                  </div>

                  <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:bg-white/10 transition-all duration-300">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-12 h-12 bg-amber-500/20 rounded-xl flex items-center justify-center">
                        <Coins className="w-6 h-6 text-amber-400" />
                      </div>
                      <p className="text-orange-200/70 text-sm font-medium">Restant à miner</p>
                    </div>
                    <p className="text-3xl font-bold text-white">{formatNumber(remaining)}</p>
                    <p className="text-orange-200/60 text-sm mt-1">BTC</p>
                  </div>

                  <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:bg-white/10 transition-all duration-300">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-12 h-12 bg-yellow-500/20 rounded-xl flex items-center justify-center">
                        <TrendingUp className="w-6 h-6 text-yellow-400" />
                      </div>
                      <p className="text-orange-200/70 text-sm font-medium">Pourcentage miné</p>
                    </div>
                    <p className="text-3xl font-bold text-white">{percentageMined}%</p>
                    <p className="text-orange-200/60 text-sm mt-1">du total</p>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="flex flex-col sm:flex-row justify-between items-center gap-4 bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-orange-200/80 text-sm">
                    Mis à jour: {data.lastUpdate.toLocaleTimeString("fr-FR")}
                  </span>
                </div>
                <button
                  onClick={fetchBitcoinSupply}
                  disabled={loading}
                  className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-orange-500 to-amber-600 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-orange-500/50 hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <RefreshCw className={`w-5 h-5 ${loading ? "animate-spin" : ""}`} />
                  Actualiser
                </button>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
