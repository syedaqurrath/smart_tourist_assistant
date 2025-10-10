import { ChevronLeft, ChevronRight, RotateCcw } from 'lucide-react';

interface TourControlsProps {
  currentIndex: number;
  totalStops: number;
  onPrevious: () => void;
  onNext: () => void;
  onReset: () => void;
  nextLocationName?: string;
}

export function TourControls({
  currentIndex,
  totalStops,
  onPrevious,
  onNext,
  onReset,
  nextLocationName
}: TourControlsProps) {
  const isAtStart = currentIndex === 0;
  const isAtEnd = currentIndex === totalStops - 1;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-4">
        <button
          onClick={onPrevious}
          disabled={isAtStart}
          className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-amber-700 text-white rounded-lg font-semibold hover:bg-amber-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
        >
          <ChevronLeft className="w-5 h-5" />
          Previous
        </button>

        <button
          onClick={onReset}
          className="px-4 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-all"
          title="Reset Tour"
        >
          <RotateCcw className="w-5 h-5" />
        </button>

        <button
          onClick={onNext}
          disabled={isAtEnd}
          className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-amber-700 text-white rounded-lg font-semibold hover:bg-amber-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
        >
          Next
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {!isAtEnd && nextLocationName && (
        <div className="text-center p-3 bg-blue-50 text-blue-800 rounded-lg text-sm">
          <strong>Next Stop:</strong> {nextLocationName}
        </div>
      )}

      {isAtEnd && (
        <div className="text-center p-3 bg-green-50 text-green-800 rounded-lg">
          <strong>Tour Complete!</strong> Thank you for visiting the Taj Mahal virtually.
        </div>
      )}
    </div>
  );
}
