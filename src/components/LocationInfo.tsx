import { MapPin, Clock, Navigation, Camera, Volume2 } from 'lucide-react';
import { Location } from '../data/locations';

interface LocationInfoProps {
  location: Location;
  isPhotoTour?: boolean;
}

export function LocationInfo({ location, isPhotoTour }: LocationInfoProps) {
  const playVoiceInstruction = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(location.voiceInstruction);
      utterance.rate = 0.9;
      utterance.pitch = 1.0;
      utterance.volume = 1.0;
      window.speechSynthesis.speak(utterance);
    } else {
      alert('Voice instructions are not supported in your browser.');
    }
  };

  return (
    <div className="h-full overflow-y-auto space-y-6 pr-2">
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-3xl font-bold text-amber-900 flex items-center gap-2">
            <MapPin className="w-8 h-8" />
            {location.name}
          </h2>
          <button
            onClick={playVoiceInstruction}
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-lg hover:from-green-700 hover:to-green-800 transition-all shadow-md"
            title="Play voice instruction"
          >
            <Volume2 className="w-5 h-5" />
            <span className="font-semibold">Listen</span>
          </button>
        </div>
      </div>

      <div className="bg-amber-50 p-4 rounded-lg border-l-4 border-amber-600">
        <h3 className="font-semibold text-amber-900 mb-2">Overview</h3>
        <p className="text-gray-800 leading-relaxed">{location.description}</p>
      </div>

      <div className="bg-yellow-50 p-4 rounded-lg border-l-4 border-yellow-600">
        <h3 className="font-semibold text-yellow-900 mb-2">Historical Significance</h3>
        <p className="text-gray-800 leading-relaxed">{location.historicalSignificance}</p>
      </div>

      {location.architecturalFeatures.length > 0 && (
        <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-600">
          <h3 className="font-semibold text-blue-900 mb-3">Architectural Features</h3>
          <ul className="space-y-2">
            {location.architecturalFeatures.map((feature, index) => (
              <li key={index} className="flex items-start gap-2 text-gray-800">
                <span className="text-blue-600 mt-1">•</span>
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {isPhotoTour && (
        <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-4 rounded-lg border-l-4 border-purple-600">
          <h3 className="font-semibold text-purple-900 mb-2 flex items-center gap-2">
            <Camera className="w-5 h-5" />
            Photography Tips
          </h3>
          <p className="text-gray-800 mb-2">
            <strong>Best Spot:</strong> {location.bestPhotoSpot}
          </p>
          {location.id === 'main_tomb' && (
            <div className="mt-3 text-sm text-gray-700 space-y-1">
              <p><strong>Camera Settings:</strong></p>
              <ul className="ml-4 space-y-1">
                <li>• Wide aperture (f/8-f/11) for sharp details</li>
                <li>• ISO 100-400 for daylight shots</li>
                <li>• HDR mode helps with contrast</li>
              </ul>
            </div>
          )}
        </div>
      )}

      {location.visitorTips.length > 0 && (
        <div className="bg-green-50 p-4 rounded-lg border-l-4 border-green-600">
          <h3 className="font-semibold text-green-900 mb-3">Visitor Tips</h3>
          <ul className="space-y-2">
            {location.visitorTips.map((tip, index) => (
              <li key={index} className="flex items-start gap-2 text-gray-800">
                <span className="text-green-600 mt-1">✓</span>
                <span>{tip}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {location.walkingTime !== 'N/A' && (
        <div className="bg-cyan-50 p-4 rounded-lg border-l-4 border-cyan-600">
          <h3 className="font-semibold text-cyan-900 mb-3 flex items-center gap-2">
            <Navigation className="w-5 h-5" />
            Navigation to Next Stop
          </h3>
          <p className="text-gray-800 mb-2">
            <strong>Directions:</strong> {location.nextDirections}
          </p>
          <div className="flex gap-4 text-sm mt-3">
            <div className="flex items-center gap-1">
              <MapPin className="w-4 h-4 text-cyan-600" />
              <span><strong>Distance:</strong> {location.walkingDistance}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4 text-cyan-600" />
              <span><strong>Time:</strong> {location.walkingTime}</span>
            </div>
          </div>
        </div>
      )}

      <div className="bg-gray-50 p-4 rounded-lg border border-gray-300">
        <h3 className="font-semibold text-gray-700 mb-2 flex items-center gap-2">
          <Camera className="w-5 h-5" />
          Location View
        </h3>
        <div className="rounded-lg overflow-hidden shadow-md">
          <img
            src={location.imageUrl}
            alt={location.name}
            className="w-full h-64 object-cover"
            loading="lazy"
          />
        </div>
        <p className="text-xs text-gray-600 mt-2 italic">
          {location.name} - {location.bestPhotoSpot}
        </p>
      </div>
    </div>
  );
}
