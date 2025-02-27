export default function HomePage() {
  return (
    <div className="relative isolate px-6 pt-14 lg:px-8">
      <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-44">
        <div className="text-center">
          <h1 className="text-5xl font-semibold tracking-tight text-balance sm:text-7xl">
            Meet Again
          </h1>
          <p className="mt-8 text-lg font-medium text-pretty  sm:text-xl/8">
            Did you see someone outside and you had THE eye contact.You know what I am talking about.Try to connect.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <a
              href="/new"
              className="rounded-md bg-light2 px-3.5 py-2.5 text-sm font-semibold text-dark shadow-xs hover:bg-light3 hover:text-light2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Connect
            </a>
            
          </div>
        </div>
      </div>
      
    </div>
  );
}
