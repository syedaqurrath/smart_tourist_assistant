import { Clock, Map, Camera } from 'lucide-react';
import { TOUR_MODES, TourMode } from '../data/locations';

interface TourModeSelectorProps {
  selectedMode: string;
  onModeChange: (modeId: string) => void;
}

export function TourModeSelector({ selectedMode, onModeChange }: TourModeSelectorProps) {
  const modes: TourMode[] = Object.values(TOUR_MODES);

  const getIcon = (modeId: string) => {
    switch (modeId) {
      case 'complete':
        return <Map className="w-5 h-5" />;
      case 'express':
        return <Clock className="w-5 h-5" />;
      case 'photography':
        return <Camera className="w-5 h-5" />;
      default:
        return <Map className="w-5 h-5" />;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-4 border border-gray-200">
      <h3 className="font-bold text-lg text-amber-900 mb-4">Tour Options</h3>
      <div className="space-y-3">
        {modes.map((mode) => (
          <button
            key={mode.id}
            onClick={() => onModeChange(mode.id)}
            className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
              selectedMode === mode.id
                ? 'border-amber-600 bg-amber-50'
                : 'border-gray-200 bg-white hover:border-amber-300'
            }`}
          >
            <div className="flex items-start gap-3">
              <div className={`mt-1 ${selectedMode === mode.id ? 'text-amber-700' : 'text-gray-600'}`}>
                {getIcon(mode.id)}
              </div>
              <div className="flex-1">
                <div className="font-semibold text-gray-900 mb-1">{mode.name}</div>
                <div className="text-sm text-gray-600 mb-2">{mode.description}</div>
                <div className="flex items-center gap-4 text-xs text-gray-500">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {mode.duration}
                  </span>
                  <span>{mode.locations.length} stops</span>
                </div>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
