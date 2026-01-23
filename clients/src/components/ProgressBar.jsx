export default function ProgressBar({ current = 1, total = 1 }) {
  const percent = Math.round((current / total) * 100);

  return (
    <div className="mb-6">
      <div className="h-2 w-full rounded-full bg-gray-700">
        <div
          className="h-2 rounded-full bg-gradient-to-r from-purple-500 to-indigo-500 transition-all"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}
