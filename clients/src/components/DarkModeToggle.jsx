export default function DarkModeToggle({ darkMode, setDarkMode }) {
  return (
    <button
      onClick={() => setDarkMode(prev => !prev)}
      className="rounded-lg border px-4 py-2 text-sm text-white"
    >
      {darkMode ? "🌙 Dark" : "☀️ Light"}
    </button>
  );
}
