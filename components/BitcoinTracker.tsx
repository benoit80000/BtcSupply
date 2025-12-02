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
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #0f172a 0%, #78350f 50%, #78350f 100%)",
      position: "relative",
      overflow: "hidden",
    }}>
      {/* Animated background elements */}
      <div style={{
        position: "absolute",
        inset: 0,
        overflow: "hidden",
        pointerEvents: "none"
      }}>
        <div style={{
          position: "absolute",
          top: "-10rem",
          right: "-10rem",
          width: "20rem",
          height: "20rem",
          background: "rgba(249, 115, 22, 0.2)",
          borderRadius: "50%",
          filter: "blur(80px)",
          animation: "pulse 3s ease-in-out infinite"
        }}></div>
        <div style={{
          position: "absolute",
          top: "50%",
          left: "-10rem",
          width: "24rem",
          height: "24rem",
          background: "rgba(245, 158, 11, 0.2)",
          borderRadius: "50%",
          filter: "blur(80px)",
          animation: "pulse 4s ease-in-out infinite"
        }}></div>
        <div style={{
          position: "absolute",
          bottom: "-10rem",
          right: "33%",
          width: "20rem",
          height: "20rem",
          background: "rgba(234, 179, 8, 0.2)",
          borderRadius: "50%",
          filter: "blur(80px)",
          animation: "pulse 5s ease-in-out infinite"
        }}></div>
      </div>

      <div style={{
        position: "relative",
        zIndex: 10,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        padding: "1rem"
      }}>
        <div style={{ width: "100%", maxWidth: "1200px" }}>
          {/* Header */}
          <div style={{ textAlign: "center", marginBottom: "3rem" }}>
            <div style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              width: "6rem",
              height: "6rem",
              background: "linear-gradient(135deg, #f97316 0%, #d97706 100%)",
              borderRadius: "1.5rem",
              boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)",
              marginBottom: "1.5rem",
              transition: "transform 0.3s",
              cursor: "pointer"
            }}
            onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.1)"}
            onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
            >
              <svg style={{ width: "3.5rem", height: "3.5rem", color: "white" }} fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.638 14.904c-1.602 6.43-8.113 10.34-14.542 8.736C2.67 22.05-1.244 15.525.362 9.105 1.962 2.67 8.475-1.243 14.9.358c6.43 1.605 10.342 8.115 8.738 14.548v-.002zm-6.35-4.613c.24-1.59-.974-2.45-2.64-3.03l.54-2.153-1.315-.33-.525 2.107c-.345-.087-.705-.167-1.064-.25l.526-2.127-1.32-.33-.54 2.165c-.285-.067-.565-.132-.84-.2l-1.815-.45-.35 1.407s.975.225.955.236c.535.136.63.486.615.766l-1.477 5.92c-.075.166-.24.406-.614.314.015.02-.96-.24-.96-.24l-.66 1.51 1.71.426.93.242-.54 2.19 1.32.327.54-2.17c.36.1.705.19 1.05.273l-.51 2.154 1.32.33.545-2.19c2.24.427 3.93.257 4.64-1.774.57-1.637-.03-2.58-1.217-3.196.854-.193 1.5-.76 1.68-1.93h.01zm-3.01 4.22c-.404 1.64-3.157.75-4.05.53l.72-2.9c.896.23 3.757.67 3.33 2.37zm.41-4.24c-.37 1.49-2.662.735-3.405.55l.654-2.64c.744.18 3.137.524 2.75 2.084v.006z" />
              </svg>
            </div>
            <h1 style={{
              fontSize: "3.5rem",
              fontWeight: "bold",
              color: "white",
              marginBottom: "1rem",
              letterSpacing: "-0.025em"
            }}>
              Bitcoin Supply Tracker
            </h1>
            <p style={{
              fontSize: "1.25rem",
              color: "rgba(251, 146, 60, 0.8)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "0.5rem"
            }}>
              <span style={{
                display: "inline-block",
                width: "0.75rem",
                height: "0.75rem",
                background: "#ef4444",
                borderRadius: "50%",
                animation: "pulse 2s ease-in-out infinite"
              }}></span>
              Suivi en temps réel
            </p>
          </div>

          {loading && !data ? (
            <div style={{ textAlign: "center", padding: "5rem 0" }}>
              <RefreshCw style={{
                width: "4rem",
                height: "4rem",
                color: "#fb923c",
                margin: "0 auto 1.5rem",
                animation: "spin 1s linear infinite"
              }} />
              <p style={{ color: "rgba(251, 146, 60, 0.8)", fontSize: "1.25rem" }}>Chargement des données...</p>
            </div>
          ) : error ? (
            <div style={{
              textAlign: "center",
              padding: "5rem 0",
              background: "rgba(255, 255, 255, 0.1)",
              backdropFilter: "blur(16px)",
              borderRadius: "1.5rem",
              border: "1px solid rgba(255, 255, 255, 0.2)"
            }}>
              <p style={{ color: "#fca5a5", fontSize: "1.25rem", marginBottom: "1.5rem" }}>{error}</p>
              <button
                onClick={fetchBitcoinSupply}
                style={{
                  padding: "1rem 2rem",
                  background: "linear-gradient(to right, #f97316, #d97706)",
                  color: "white",
                  fontWeight: "bold",
                  borderRadius: "0.75rem",
                  border: "none",
                  cursor: "pointer",
                  fontSize: "1rem",
                  transition: "all 0.3s"
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "scale(1.05)";
                  e.currentTarget.style.boxShadow = "0 20px 25px -5px rgba(249, 115, 22, 0.5)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "scale(1)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                Réessayer
              </button>
            </div>
          ) : data ? (
            <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
              {/* Main supply card */}
              <div style={{
                background: "rgba(255, 255, 255, 0.1)",
                backdropFilter: "blur(20px)",
                borderRadius: "1.5rem",
                padding: "3rem",
                border: "1px solid rgba(255, 255, 255, 0.2)",
                boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
                transition: "all 0.3s"
              }}>
                <div style={{ textAlign: "center", marginBottom: "2rem" }}>
                  <p style={{
                    color: "rgba(251, 146, 60, 0.7)",
                    fontSize: "1.125rem",
                    marginBottom: "0.75rem",
                    textTransform: "uppercase",
                    letterSpacing: "0.1em",
                    fontWeight: "600"
                  }}>
                    BTC en circulation
                  </p>
                  <div style={{
                    fontSize: "5rem",
                    fontWeight: "900",
                    background: "linear-gradient(to right, #fb923c, #fbbf24, #fde047)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                    marginBottom: "1rem",
                    letterSpacing: "-0.05em"
                  }}>
                    {formatNumber(data.supply)}
                  </div>
                  <p style={{ fontSize: "1.875rem", color: "#fed7aa", fontWeight: "300" }}>BTC</p>
                </div>

                {/* Progress bar */}
                <div style={{ marginBottom: "2rem" }}>
                  <div style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "0.75rem"
                  }}>
                    <span style={{ color: "rgba(251, 146, 60, 0.8)", fontSize: "0.875rem", fontWeight: "500" }}>
                      Progression du minage
                    </span>
                    <span style={{ color: "#fed7aa", fontSize: "1.125rem", fontWeight: "bold" }}>
                      {percentageMined}%
                    </span>
                  </div>
                  <div style={{
                    position: "relative",
                    height: "1.5rem",
                    background: "rgba(255, 255, 255, 0.1)",
                    borderRadius: "9999px",
                    overflow: "hidden",
                    backdropFilter: "blur(4px)",
                    border: "1px solid rgba(255, 255, 255, 0.2)"
                  }}>
                    <div style={{
                      position: "absolute",
                      inset: 0,
                      background: "linear-gradient(to right, #f97316, #f59e0b, #eab308)",
                      borderRadius: "9999px",
                      width: `${percentageMined}%`,
                      transition: "width 1s ease-out",
                      boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)"
                    }}>
                      <div style={{
                        position: "absolute",
                        inset: 0,
                        background: "rgba(255, 255, 255, 0.2)",
                        animation: "pulse 2s ease-in-out infinite"
                      }}></div>
                    </div>
                  </div>
                </div>

                {/* Stats grid */}
                <div style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
                  gap: "1rem"
                }}>
                  <div style={{
                    background: "rgba(255, 255, 255, 0.05)",
                    backdropFilter: "blur(4px)",
                    borderRadius: "1rem",
                    padding: "1.5rem",
                    border: "1px solid rgba(255, 255, 255, 0.1)",
                    transition: "all 0.3s",
                    cursor: "pointer"
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.background = "rgba(255, 255, 255, 0.1)"}
                  onMouseLeave={(e) => e.currentTarget.style.background = "rgba(255, 255, 255, 0.05)"}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.75rem" }}>
                      <div style={{
                        width: "3rem",
                        height: "3rem",
                        background: "rgba(249, 115, 22, 0.2)",
                        borderRadius: "0.75rem",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center"
                      }}>
                        <Target style={{ width: "1.5rem", height: "1.5rem", color: "#fb923c" }} />
                      </div>
                      <p style={{ color: "rgba(251, 146, 60, 0.7)", fontSize: "0.875rem", fontWeight: "500" }}>
                        Supply Maximum
                      </p>
                    </div>
                    <p style={{ fontSize: "1.875rem", fontWeight: "bold", color: "white" }}>
                      {formatNumber(maxSupply)}
                    </p>
                    <p style={{ color: "rgba(251, 146, 60, 0.6)", fontSize: "0.875rem", marginTop: "0.25rem" }}>BTC</p>
                  </div>

                  <div style={{
                    background: "rgba(255, 255, 255, 0.05)",
                    backdropFilter: "blur(4px)",
                    borderRadius: "1rem",
                    padding: "1.5rem",
                    border: "1px solid rgba(255, 255, 255, 0.1)",
                    transition: "all 0.3s",
                    cursor: "pointer"
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.background = "rgba(255, 255, 255, 0.1)"}
                  onMouseLeave={(e) => e.currentTarget.style.background = "rgba(255, 255, 255, 0.05)"}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.75rem" }}>
                      <div style={{
                        width: "3rem",
                        height: "3rem",
                        background: "rgba(245, 158, 11, 0.2)",
                        borderRadius: "0.75rem",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center"
                      }}>
                        <Coins style={{ width: "1.5rem", height: "1.5rem", color: "#fbbf24" }} />
                      </div>
                      <p style={{ color: "rgba(251, 146, 60, 0.7)", fontSize: "0.875rem", fontWeight: "500" }}>
                        Restant à miner
                      </p>
                    </div>
                    <p style={{ fontSize: "1.875rem", fontWeight: "bold", color: "white" }}>
                      {formatNumber(remaining)}
                    </p>
                    <p style={{ color: "rgba(251, 146, 60, 0.6)", fontSize: "0.875rem", marginTop: "0.25rem" }}>BTC</p>
                  </div>

                  <div style={{
                    background: "rgba(255, 255, 255, 0.05)",
                    backdropFilter: "blur(4px)",
                    borderRadius: "1rem",
                    padding: "1.5rem",
                    border: "1px solid rgba(255, 255, 255, 0.1)",
                    transition: "all 0.3s",
                    cursor: "pointer"
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.background = "rgba(255, 255, 255, 0.1)"}
                  onMouseLeave={(e) => e.currentTarget.style.background = "rgba(255, 255, 255, 0.05)"}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.75rem" }}>
                      <div style={{
                        width: "3rem",
                        height: "3rem",
                        background: "rgba(234, 179, 8, 0.2)",
                        borderRadius: "0.75rem",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center"
                      }}>
                        <TrendingUp style={{ width: "1.5rem", height: "1.5rem", color: "#fde047" }} />
                      </div>
                      <p style={{ color: "rgba(251, 146, 60, 0.7)", fontSize: "0.875rem", fontWeight: "500" }}>
                        Pourcentage miné
                      </p>
                    </div>
                    <p style={{ fontSize: "1.875rem", fontWeight: "bold", color: "white" }}>
                      {percentageMined}%
                    </p>
                    <p style={{ color: "rgba(251, 146, 60, 0.6)", fontSize: "0.875rem", marginTop: "0.25rem" }}>du total</p>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                gap: "1rem",
                background: "rgba(255, 255, 255, 0.05)",
                backdropFilter: "blur(16px)",
                borderRadius: "1rem",
                padding: "1.5rem",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                flexWrap: "wrap"
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                  <div style={{
                    width: "0.5rem",
                    height: "0.5rem",
                    background: "#4ade80",
                    borderRadius: "50%",
                    animation: "pulse 2s ease-in-out infinite"
                  }}></div>
                  <span style={{ color: "rgba(251, 146, 60, 0.8)", fontSize: "0.875rem" }}>
                    Mis à jour: {data.lastUpdate.toLocaleTimeString("fr-FR")}
                  </span>
                </div>
                <button
                  onClick={fetchBitcoinSupply}
                  disabled={loading}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    padding: "0.75rem 1.5rem",
                    background: "linear-gradient(to right, #f97316, #d97706)",
                    color: "white",
                    fontWeight: "600",
                    borderRadius: "0.75rem",
                    border: "none",
                    cursor: loading ? "not-allowed" : "pointer",
                    opacity: loading ? 0.5 : 1,
                    transition: "all 0.3s",
                    fontSize: "0.875rem"
                  }}
                  onMouseEnter={(e) => {
                    if (!loading) {
                      e.currentTarget.style.transform = "scale(1.05)";
                      e.currentTarget.style.boxShadow = "0 10px 15px -3px rgba(249, 115, 22, 0.5)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "scale(1)";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                >
                  <RefreshCw style={{
                    width: "1.25rem",
                    height: "1.25rem",
                    animation: loading ? "spin 1s linear infinite" : "none"
                  }} />
                  Actualiser
                </button>
              </div>
            </div>
          ) : null}
        </div>
      </div>

      <style jsx>{`
        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
        }
      `}</style>
    </div>
  );
}
