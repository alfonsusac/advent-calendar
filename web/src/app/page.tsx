import type { SVGProps } from "react";
import { TestPage } from "./client";

export default function Home() {
  return (
    <div className="p-8 min-h-screen flex flex-col items-center bg-white/5" id="page">
      <div className="w-full max-w-lg lg:max-w-none relative">
        <div className="absolute w-40 h-20 -top-2 overflow-hidden" >
          <div className="w-40 h-40 absolute opacity-0" id="daynight">
            <div className="w-40 h-40 rounded-full flex flex-col items-center justify-between" >
              <LucideSun className="w-12 h-12" />
              <LucideMoon className="w-12 h-12" id="moon" />
            </div>
            <div className="absolute top-0 left-0 blur-md w-40 h-40 rounded-full flex flex-col items-center justify-between" >
              <LucideSun className="w-12 h-12" />
              <LucideMoon className="w-12 h-12" />
            </div>
          </div>
        </div>
        <div className="text-4xl tracking-tighter font-mono pt-20 pb-4">
          <div className="flex items-end flex-wrap gap-x-2">
            <div className="shrink-0">
              advent-event.js
            </div>
            <span className="tracking-normal inline-block text-lg">
              v0.1.3
            </span>
          </div>
          <div className="text-lg font-sans tracking-normal">
            {/* subtitle */}
            A simple library to create an advent calendar with Typescript
          </div>
        </div>
        <TestPage />
        <footer>
          <div className="text-center text-xs opacity-60 mt-20">
            <p>© {new Date().getFullYear()} <a href="https://x.com/alfonsusac" target="_blank" className="hover:underline">alfonsusac</a></p>
            <p>Released under the <a href="https://opensource.org/licenses/MIT" target="_blank" className="hover:underline">MIT License</a></p>
          </div>
        </footer>
      </div>
    </div>
  );
}


function LucideSun(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" {...props}><g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"><circle cx="12" cy="12" r="4"></circle><path d="M12 2v2m0 16v2M4.93 4.93l1.41 1.41m11.32 11.32l1.41 1.41M2 12h2m16 0h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"></path></g></svg>
  )
}


function LucideMoon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" {...props}><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3a6 6 0 0 0 9 9a9 9 0 1 1-9-9"></path></svg>
  )
}
