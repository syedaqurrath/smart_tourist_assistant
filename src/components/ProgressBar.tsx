interface ProgressBarProps {
  current: number;
  total: number;
  tourName: string;
}

export function ProgressBar({ current, total, tourName }: ProgressBarProps) {
  const percentage = ((current + 1) / total) * 100;

  return (
    <div className="space-y-2">
      <div className="text-center text-amber-900 font-semibold text-lg">
        Stop {current + 1} of {total} | {tourName}
      </div>
      <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-amber-500 to-amber-700 transition-all duration-500 ease-out"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
