import { useState } from 'react';
import { LOCATIONS, TOUR_MODES } from './data/locations';
import { TajMahalMap } from './components/TajMahalMap';
import { LocationInfo } from './components/LocationInfo';
import { TourControls } from './components/TourControls';
import { ProgressBar } from './components/ProgressBar';
import { Chatbot } from './components/Chatbot';
import { TourModeSelector } from './components/TourModeSelector';
import { useAuth } from './context/AuthContext';

function App() {
  const [tourMode, setTourMode] = useState('complete');
  const [tourIndex, setTourIndex] = useState(0);
  const { user, signOut } = useAuth();

  const currentTour = TOUR_MODES[tourMode];
  const tourLocations = currentTour.locations;
  const currentLocationId = tourLocations[tourIndex];
  const currentLocation = LOCATIONS[currentLocationId];

  const playVoiceInstruction = (instruction: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(instruction);
      utterance.rate = 0.9;
      utterance.pitch = 1.0;
      utterance.volume = 1.0;
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleNext = () => {
    if (tourIndex < tourLocations.length - 1) {
      const nextIndex = tourIndex + 1;
      setTourIndex(nextIndex);
      const nextLocation = LOCATIONS[tourLocations[nextIndex]];
      setTimeout(() => {
        playVoiceInstruction(nextLocation.voiceInstruction);
      }, 500);
    }
  };

  const handlePrevious = () => {
    if (tourIndex > 0) {
      const prevIndex = tourIndex - 1;
      setTourIndex(prevIndex);
      const prevLocation = LOCATIONS[tourLocations[prevIndex]];
      setTimeout(() => {
        playVoiceInstruction(prevLocation.voiceInstruction);
      }, 500);
    }
  };

  const handleReset = () => {
    setTourIndex(0);
    const firstLocation = LOCATIONS[tourLocations[0]];
    setTimeout(() => {
      playVoiceInstruction(firstLocation.voiceInstruction);
    }, 500);
  };

  const handleModeChange = (newMode: string) => {
    setTourMode(newMode);
    setTourIndex(0);
  };

  const nextLocationName = tourIndex < tourLocations.length - 1
    ? LOCATIONS[tourLocations[tourIndex + 1]].name
    : undefined;
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50">
      <header className="bg-gradient-to-r from-amber-800 to-orange-700 py-6 text-white shadow-lg">
        <div className="container mx-auto flex flex-col gap-4 px-4 text-center md:flex-row md:items-center md:justify-between md:text-left">
          <div>
            <h1 className="mb-2 text-4xl font-bold">
              Smart Tourist Assistant
            </h1>
            <p className="text-amber-100">
              Explore the world's most beautiful monument from anywhere
            </p>
          </div>
          <div className="rounded-lg bg-white/10 px-5 py-3 text-sm">
            <p className="text-amber-100">
              Signed in as <span className="font-semibold text-white">{user?.email}</span>
            </p>
            <button
              onClick={() => signOut()}
              className="mt-2 w-full rounded-md bg-white/90 px-4 py-2 text-xs font-semibold text-amber-800 transition hover:bg-white"
            >
              Sign out
            </button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <aside className="lg:col-span-1 space-y-6">
            <TourModeSelector selectedMode={tourMode} onModeChange={handleModeChange} />
            <Chatbot />
          </aside>

          <main className="lg:col-span-3 space-y-6">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <ProgressBar
                current={tourIndex}
                total={tourLocations.length}
                tourName={currentTour.name}
              />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
              <div className="lg:col-span-3">
                <div className="bg-white rounded-lg shadow-lg p-4" style={{ height: '600px' }}>
                  <h2 className="text-xl font-bold text-gray-800 mb-4">Interactive Map</h2>
                  <div style={{ height: 'calc(100% - 2rem)' }}>
                    <TajMahalMap
                      currentLocation={currentLocationId}
                      tourLocations={tourLocations}
                    />
                  </div>
                  <div className="mt-4 text-xs text-gray-600 space-y-1">
                    <p><strong>Map Legend:</strong></p>
                    <div className="flex gap-4">
                      <span>🔴 Current Location</span>
                      <span>🟢 Completed</span>
                      <span>🔵 Upcoming</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-2">
                <div className="bg-white rounded-lg shadow-lg p-6" style={{ height: '600px' }}>
                  <LocationInfo
                    location={currentLocation}
                    isPhotoTour={tourMode === 'photography'}
                  />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-6">
              <TourControls
                currentIndex={tourIndex}
                totalStops={tourLocations.length}
                onPrevious={handlePrevious}
                onNext={handleNext}
                onReset={handleReset}
                nextLocationName={nextLocationName}
              />
            </div>
          </main>
        </div>
      </div>

      <footer className="bg-gray-800 text-white py-8 mt-12">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-xl font-semibold mb-2">Smart Tourist Assistant</h3>
          <p className="text-gray-300 mb-1">UNESCO World Heritage Site since 1983</p>
          <p className="text-sm text-gray-400">
            This virtual tour is designed to complement your actual visit to the Taj Mahal
          </p>
          <p className="text-xs text-gray-500 mt-4">
            Open: Sunrise to Sunset (Closed Fridays) | Agra, Uttar Pradesh, India
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
