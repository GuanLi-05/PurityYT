"use client";

// Yes the error code is hard coded, im too lazy
export default function DashboardText({ error }) {
  return (
    error ? (
      <div
        className="h-[40rem] w-full rounded-md flex md:items-center md:justify-center antialiased bg-grid-white/[0.02] relative overflow-hidden">
        <div className=" p-4 max-w-7xl  mx-auto relative z-10  w-full pt-20 md:pt-0">
          <h1
            className="text-4xl md:text-7xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-400 bg-opacity-50">
            404 error
          </h1>
          <p
            className="mt-4 font-normal text-base text-neutral-300 max-w-lg text-center mx-auto">
            Something went wrong.
          </p>
        </div>
      </div>
    ) : (
      <div
        className="h-[40rem] w-full rounded-md flex md:items-center md:justify-center antialiased bg-grid-white/[0.02] relative overflow-hidden">
        <div className=" p-4 max-w-7xl  mx-auto relative z-10  w-full pt-20 md:pt-0">
          <h1
            className="text-4xl md:text-7xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-400 bg-opacity-50">
            Search <br /> without all the clutter.
          </h1>
          <p
            className="mt-4 font-normal text-base text-neutral-300 max-w-lg text-center mx-auto">
            Results will be automatically filtered, {Math.random() < 0.5 ? <span>allowing you to dive straight into the content that matters most.</span> : <span>helping you to concentrate on what truly matters.</span>}
          </p>
        </div>
      </div>
    )
  );
}
