export default function Load() {
  return (
    <div className="flex items-center justify-center space-x-2 h-8">
      <span
        className="w-2 h-2 rounded-full bg-gray-600 dark:bg-gray-300 animate-bounce"
        style={{ animationDelay: "0s" }}
      />
      <span
        className="w-2 h-2 rounded-full bg-gray-600 dark:bg-gray-300 animate-bounce"
        style={{ animationDelay: "0.15s" }}
      />
      <span
        className="w-2 h-2 rounded-full bg-gray-600 dark:bg-gray-300 animate-bounce"
        style={{ animationDelay: "0.3s" }}
      />
    </div>
  );
}
