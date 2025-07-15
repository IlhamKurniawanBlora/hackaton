import React, { useState, useEffect } from 'react';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  Settings,
  TrendingUp,
  Shield,
  Leaf,
  Zap,
  ChevronLeft,
  Info,
  BarChart3,
  Activity,
  Target,
  Clock,
  CheckCircle2,
  AlertTriangle
} from 'lucide-react';

// Data tanaman dengan gambar yang sesuai
const plantTypes = [
  {
    id: 'padi',
    name: 'Padi',
    image: '/simulations/padi.png',
    baseYield: 5.2,
    pestResistance: 60,
    growthTime: 120,
    optimalRadiation: 25
  },
  {
    id: 'jagung',
    name: 'Jagung',
    image: '/simulations/jagung.png',
    baseYield: 7.8,
    pestResistance: 45,
    growthTime: 90,
    optimalRadiation: 30
  },
  {
    id: 'kedelai',
    name: 'Kedelai',
    image: '/simulations/kedelai.png',
    baseYield: 3.5,
    pestResistance: 70,
    growthTime: 85,
    optimalRadiation: 20
  },
  {
    id: 'tomat',
    name: 'Tomat',
    image: '/simulations/tomat.png',
    baseYield: 45.0,
    pestResistance: 55,
    growthTime: 75,
    optimalRadiation: 35
  }
];

// Simulasi hasil berdasarkan dosis radiasi
const calculateResults = (plant, radiationDose) => {
  const optimalDose = plant.optimalRadiation;
  const deviation = Math.abs(radiationDose - optimalDose);
  
  // Efisiensi berdasarkan kedekatan dengan dosis optimal
  const efficiency = Math.max(0.3, 1 - (deviation / optimalDose) * 0.7);
  
  // Perhitungan hasil
  const yieldIncrease = efficiency * 100;
  const finalYield = plant.baseYield * (1 + yieldIncrease / 100);
  
  // Resistensi hama
  const pestResistanceBonus = efficiency * 40;
  const finalPestResistance = Math.min(95, plant.pestResistance + pestResistanceBonus);
  
  // Waktu pertumbuhan (radiasi optimal mengurangi waktu)
  const growthReduction = efficiency * 0.2;
  const finalGrowthTime = Math.max(plant.growthTime * 0.6, plant.growthTime * (1 - growthReduction));
  
  return {
    yieldIncrease: yieldIncrease.toFixed(1),
    finalYield: finalYield.toFixed(1),
    pestResistance: finalPestResistance.toFixed(1),
    growthTime: Math.round(finalGrowthTime),
    efficiency: (efficiency * 100).toFixed(1),
    mutation: radiationDose > optimalDose * 1.5 ? 'Berlebihan' : 
              radiationDose < optimalDose * 0.5 ? 'Tidak Optimal' : 'Optimal'
  };
};

function SimulationDetailPage() {
  const [selectedPlant, setSelectedPlant] = useState(plantTypes[0]);
  const [radiationDose, setRadiationDose] = useState(25);
  const [isSimulating, setIsSimulating] = useState(false);
  const [simulationProgress, setSimulationProgress] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [results, setResults] = useState(null);
  const [simulationHistory, setSimulationHistory] = useState([]);

  // Simulasi progress
  useEffect(() => {
    let interval;
    if (isSimulating) {
      interval = setInterval(() => {
        setSimulationProgress(prev => {
          if (prev >= 100) {
            setIsSimulating(false);
            setShowResults(true);
            const newResults = calculateResults(selectedPlant, radiationDose);
            setResults(newResults);
            
            // Tambah ke history
            const newHistory = {
              id: Date.now(),
              plant: selectedPlant,
              dose: radiationDose,
              timestamp: new Date().toLocaleTimeString(),
              results: newResults
            };
            setSimulationHistory(prev => [newHistory, ...prev.slice(0, 4)]);
            
            return 100;
          }
          return prev + 2;
        });
      }, 100);
    }
    return () => clearInterval(interval);
  }, [isSimulating, selectedPlant, radiationDose]);

  const startSimulation = () => {
    setIsSimulating(true);
    setSimulationProgress(0);
    setShowResults(false);
    setResults(null);
  };

  const resetSimulation = () => {
    setIsSimulating(false);
    setSimulationProgress(0);
    setShowResults(false);
    setResults(null);
    setRadiationDose(25);
  };

  const getRadiationColor = (dose) => {
    if (dose < 15) return 'text-green-600';
    if (dose < 30) return 'text-yellow-600';
    if (dose < 45) return 'text-orange-600';
    return 'text-red-600';
  };

  const getRadiationBg = (dose) => {
    if (dose < 15) return 'bg-green-100';
    if (dose < 30) return 'bg-yellow-100';
    if (dose < 45) return 'bg-orange-100';
    return 'bg-red-100';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-orange-50 pt-24">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => window.history.back()}
              className="flex items-center gap-2 text-gray-600 hover:text-green-600 transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
              Kembali
            </button>
            <div class="ml-3">
              <h1 className="text-2xl font-bold text-gray-900">
                Optimalisasi Hasil Pertanian melalui Teknologi Radiasi
              </h1>
              <p className="text-gray-600">Simulasi Interaktif - Eksperimen Virtual</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Panel Kontrol */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-green-100 rounded-lg">
                  <Settings className="w-6 h-6 text-green-600" />
                </div>
                <h2 className="text-xl font-bold text-gray-900">Panel Kontrol</h2>
              </div>

              {/* Pilihan Tanaman */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Pilih Jenis Tanaman
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {plantTypes.map(plant => (
                    <button
                      key={plant.id}
                      onClick={() => setSelectedPlant(plant)}
                      className={`p-3 rounded-xl border-2 transition-all ${
                        selectedPlant.id === plant.id 
                          ? 'border-green-500 bg-green-50 text-green-700' 
                          : 'border-gray-200 hover:border-green-300'
                      }`}
                    >
                      <div className="w-full h-16 bg-gray-200 rounded-lg mb-2 overflow-hidden">
                        <img 
                          src={plant.image} 
                          alt={plant.name}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.target.style.display = 'none';
                            e.target.nextSibling.style.display = 'flex';
                          }}
                        />
                        <div className="w-full h-full flex items-center justify-center" style={{display: 'none'}}>
                          <Leaf className="w-8 h-8 text-gray-400" />
                        </div>
                      </div>
                      <div className="text-sm font-medium">{plant.name}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Dosis Radiasi */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Dosis Radiasi (Gy)
                </label>
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <span className="text-sm text-gray-600">0</span>
                    <input
                      type="range"
                      min="0"
                      max="60"
                      value={radiationDose}
                      onChange={(e) => setRadiationDose(Number(e.target.value))}
                      className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                      disabled={isSimulating}
                    />
                    <span className="text-sm text-gray-600">60</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className={`px-3 py-1 rounded-full text-sm font-semibold ${getRadiationBg(radiationDose)}`}>
                      <span className={getRadiationColor(radiationDose)}>
                        {radiationDose} Gy
                      </span>
                    </div>
                    <div className="text-sm text-gray-600">
                      Optimal: {selectedPlant.optimalRadiation} Gy
                    </div>
                  </div>
                </div>
              </div>

              {/* Tombol Kontrol */}
              <div className="space-y-3">
                <button
                  onClick={startSimulation}
                  disabled={isSimulating}
                  className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white py-3 px-6 rounded-xl font-semibold transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  {isSimulating ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      Memproses...
                    </>
                  ) : (
                    <>
                      <Play className="w-5 h-5" />
                      Mulai Simulasi
                    </>
                  )}
                </button>
                
                <button
                  onClick={resetSimulation}
                  className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 px-6 rounded-xl font-semibold transition-colors flex items-center justify-center gap-2"
                >
                  <RotateCcw className="w-5 h-5" />
                  Reset
                </button>
              </div>
            </div>

            {/* Info Tanaman dengan Gambar */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-green-100 rounded-lg">
                  <Info className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="text-lg font-bold text-gray-900">Info Tanaman</h3>
              </div>

              {/* Gambar Tanaman Terpilih */}
              <div className="mb-4">
                <div className="w-full h-32 bg-gray-200 rounded-lg overflow-hidden">
                  <img 
                    src={selectedPlant.image} 
                    alt={selectedPlant.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'flex';
                    }}
                  />
                  <div className="w-full h-full flex items-center justify-center bg-gray-200" style={{display: 'none'}}>
                    <Leaf className="w-16 h-16 text-gray-400" />
                  </div>
                </div>
                <p className="text-center font-semibold text-gray-900 mt-2">{selectedPlant.name}</p>
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Hasil Awal:</span>
                  <span className="font-semibold">{selectedPlant.baseYield} ton/ha</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Resistensi Hama:</span>
                  <span className="font-semibold">{selectedPlant.pestResistance}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Masa Tumbuh:</span>
                  <span className="font-semibold">{selectedPlant.growthTime} hari</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Dosis Optimal:</span>
                  <span className="font-semibold text-green-600">{selectedPlant.optimalRadiation} Gy</span>
                </div>
              </div>
            </div>
          </div>

          {/* Area Visualisasi */}
          <div className="lg:col-span-2">
            {/* Progress Bar */}
            {(isSimulating || showResults) && (
              <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-orange-100 rounded-lg">
                    <Activity className="w-6 h-6 text-orange-600" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900">
                    {isSimulating ? 'Simulasi Berlangsung' : 'Simulasi Selesai'}
                  </h3>
                </div>
                
                <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
                  <div 
                    className="bg-gradient-to-r from-green-500 to-green-600 h-3 rounded-full transition-all duration-200"
                    style={{ width: `${simulationProgress}%` }}
                  ></div>
                </div>
                
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Progress: {simulationProgress}%</span>
                  <span>{isSimulating ? 'Memproses mutasi genetik...' : 'Selesai'}</span>
                </div>
              </div>
            )}

            {/* Hasil Simulasi dengan Gambar */}
            {showResults && results && (
              <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <BarChart3 className="w-6 h-6 text-green-600" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900">Hasil Simulasi</h3>
                </div>

                {/* Header dengan Gambar Tanaman */}
                <div className="flex items-center gap-4 mb-6 p-4 bg-gradient-to-r from-green-50 to-green-50 rounded-xl">
                  <div className="w-20 h-20 bg-gray-200 rounded-lg overflow-hidden flex-shrink-0">
                    <img 
                      src={selectedPlant.image} 
                      alt={selectedPlant.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'flex';
                      }}
                    />
                    <div className="w-full h-full flex items-center justify-center bg-gray-200" style={{display: 'none'}}>
                      <Leaf className="w-8 h-8 text-gray-400" />
                    </div>
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-gray-900">{selectedPlant.name}</h4>
                    <p className="text-gray-600">Dosis Radiasi: {radiationDose} Gy</p>
                    <p className="text-sm text-gray-500">Efisiensi: {results.efficiency}%</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Metrik Hasil */}
                  <div className="space-y-4">
                    <div className="p-4 bg-green-50 rounded-xl">
                      <div className="flex items-center gap-2 mb-2">
                        <TrendingUp className="w-5 h-5 text-green-600" />
                        <span className="font-semibold text-green-800">Peningkatan Hasil</span>
                      </div>
                      <div className="text-2xl font-bold text-green-600">
                        +{results.yieldIncrease}%
                      </div>
                      <div className="text-sm text-green-700">
                        {results.finalYield} ton/ha
                      </div>
                    </div>

                    <div className="p-4 bg-green-50 rounded-xl">
                      <div className="flex items-center gap-2 mb-2">
                        <Shield className="w-5 h-5 text-green-600" />
                        <span className="font-semibold text-green-800">Resistensi Hama</span>
                      </div>
                      <div className="text-2xl font-bold text-green-600">
                        {results.pestResistance}%
                      </div>
                      <div className="text-sm text-green-700">
                        Peningkatan signifikan
                      </div>
                    </div>

                    <div className="p-4 bg-orange-50 rounded-xl">
                      <div className="flex items-center gap-2 mb-2">
                        <Clock className="w-5 h-5 text-orange-600" />
                        <span className="font-semibold text-orange-800">Masa Tumbuh</span>
                      </div>
                      <div className="text-2xl font-bold text-orange-600">
                        {results.growthTime} hari
                      </div>
                      <div className="text-sm text-orange-700">
                        Lebih cepat dari normal
                      </div>
                    </div>
                  </div>

                  {/* Status Mutasi */}
                  <div className="space-y-4">
                    <div className={`p-4 rounded-xl ${
                      results.mutation === 'Optimal' ? 'bg-green-50' :
                      results.mutation === 'Berlebihan' ? 'bg-red-50' : 'bg-yellow-50'
                    }`}>
                      <div className="flex items-center gap-2 mb-2">
                        <div className={`p-1 rounded-full ${
                          results.mutation === 'Optimal' ? 'bg-green-200' :
                          results.mutation === 'Berlebihan' ? 'bg-red-200' : 'bg-yellow-200'
                        }`}>
                          {results.mutation === 'Optimal' ? 
                            <CheckCircle2 className="w-4 h-4 text-green-600" /> :
                            <AlertTriangle className="w-4 h-4 text-red-600" />
                          }
                        </div>
                        <span className="font-semibold">Status Mutasi</span>
                      </div>
                      <div className="text-lg font-bold mb-2">
                        {results.mutation}
                      </div>
                      <div className="text-sm text-gray-600">
                        Efisiensi: {results.efficiency}%
                      </div>
                    </div>

                    {/* Grafik Sederhana */}
                    <div className="p-4 bg-gray-50 rounded-xl">
                      <h4 className="font-semibold mb-3">Perbandingan Hasil</h4>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-gray-600 w-16">Normal:</span>
                          <div className="flex-1 bg-gray-200 rounded-full h-2">
                            <div className="bg-gray-400 h-2 rounded-full" style={{width: '50%'}}></div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-gray-600 w-16">Mutasi:</span>
                          <div className="flex-1 bg-gray-200 rounded-full h-2">
                            <div className="bg-green-500 h-2 rounded-full" style={{width: `${Math.min(100, 50 + parseFloat(results.yieldIncrease))}%`}}></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Riwayat Simulasi dengan Gambar */}
            {simulationHistory.length > 0 && (
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <Target className="w-6 h-6 text-purple-600" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900">Riwayat Eksperimen</h3>
                </div>

                <div className="space-y-3">
                  {simulationHistory.map((history) => (
                    <div key={history.id} className="p-4 bg-gray-50 rounded-xl">
                      <div className="flex items-center gap-4 mb-2">
                        <div className="w-12 h-12 bg-gray-200 rounded-lg overflow-hidden flex-shrink-0">
                          <img 
                            src={history.plant.image} 
                            alt={history.plant.name}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              e.target.style.display = 'none';
                              e.target.nextSibling.style.display = 'flex';
                            }}
                          />
                          <div className="w-full h-full flex items-center justify-center bg-gray-200" style={{display: 'none'}}>
                            <Leaf className="w-4 h-4 text-gray-400" />
                          </div>
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <span className="font-semibold text-gray-900">{history.plant.name}</span>
                              <span className="text-sm text-gray-500">• {history.dose} Gy</span>
                            </div>
                            <span className="text-sm text-gray-500">{history.timestamp}</span>
                          </div>
                          <div className="flex items-center gap-4 text-sm mt-1">
                            <span className="text-green-600">+{history.results.yieldIncrease}% hasil</span>
                            <span className="text-green-600">{history.results.pestResistance}% resistensi</span>
                            <span className="text-orange-600">{history.results.growthTime} hari</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SimulationDetailPage;