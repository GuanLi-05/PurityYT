export default function Load() {
  return (
    <>
      <style jsx>{`
        @keyframes big-bounce-pause {
          0%, 20%, 100% {
            transform: translateY(0);
          }
          10% {
            transform: translateY(-20px);
          }
        }
        .big-bounce-pause {
          animation: big-bounce-pause 2s ease-in-out infinite;
        }
      `}</style>

      <div
        className="fixed inset-0 flex items-center justify-center bg-transparent z-50"
      >
        <div className="flex items-center justify-center space-x-2 h-8">
          <span
            className="w-2 h-2 rounded-full bg-gray-600 dark:bg-gray-300 big-bounce-pause"
            style={{ animationDelay: "0s" }}
          />
          <span
            className="w-2 h-2 rounded-full bg-gray-600 dark:bg-gray-300 big-bounce-pause"
            style={{ animationDelay: "0.3s" }}
          />
          <span
            className="w-2 h-2 rounded-full bg-gray-600 dark:bg-gray-300 big-bounce-pause"
            style={{ animationDelay: "0.6s" }}
          />
        </div>
      </div>
    </>
  );
}
