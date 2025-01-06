"use client"

import { useEffect, useRef, useState } from "react"
import { AdventEvent } from "advent-event"

export function TestPage() {

  const [time, _setTime] = useState<number>()
  const tzRef = useRef<number>(0)
  const setTime = (newVal: number, tz?: number) => {
    _setTime(newVal)
    tzRef.current = tz ?? tzRef.current
    const watch = nodeId("daynight")
    if (!watch) return
    const localMidnight = new Date(newVal + (tzRef.current * 60 * 60 * 1000)).setUTCHours(0, 0, 0, 0)
    const secondsSinceMidnight = ((newVal + (tzRef.current * 60 * 60 * 1000) - localMidnight) / 1000) % 86_400
    console.log(tzRef.current, secondsSinceMidnight * 360)

    const percent = secondsSinceMidnight / 86_400

    watch.style.opacity = `1`
    watch.style.rotate = `${ percent * 360 + 180 }deg`

    const moon = nodeId("moon")
    if (!moon) return
    moon.style.rotate = `${ (1 - percent) * 360 + 180 }deg`

  }
  useEffect(() => setTime(new Date().getTime()), [])

  const init = {
    startDate: `2024-12-01T12:00:00+07:00`,
    duration: `24`,
  }

  const adventRef = useRef<AdventEvent>(new AdventEvent(
    new Date(init.startDate),
    parseInt(init.duration),
  ))
  const [configInput, setConfigInput] = useState(init)
  const changeConfigInput = (name: keyof typeof configInput) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const valstring = e.currentTarget.value
    const newConfig = {
      ...configInput,
      [name]: valstring,
    }
    // newConfig.duration = parseInt(newConfig.duration).toString()
    setConfigInput(newConfig)
    codeError.current = null
    try {
      adventRef.current = new AdventEvent(
        new Date(newConfig.startDate),
        parseInt(newConfig.duration),
      )
    } catch (error) {
      codeError.current = error instanceof Error ? error.message : "Unknown error"
    }
  }
  const codeError = useRef<string>(null)

  const [warping, setWarping] = useState(false)

  if (!time) return null

  const firstDayTimestamp = adventRef.current.getTime(1)
  const countdownToFirstDay = firstDayTimestamp - time // or adventRef.current.getCountdown(1, new Date(time))
  const lastDayTimestamp = adventRef.current.getTime(adventRef.current.length)
  const isLastDayUnlocked = adventRef.current.isLastDayUnlocked(new Date(time))
  const lastUnlockedDay = adventRef.current.getLastUnlockedDay(new Date(time))
  const nextDay = lastUnlockedDay + 1
  const countdownToNextDay = adventRef.current.getCountdown(nextDay, new Date(time))
  const length = adventRef.current.length
  const isDayUnlocked = (day: number) => adventRef.current.isUnlocked(day, new Date(time))
  const isNextLockedDay = (day: number) => adventRef.current.getLastUnlockedDay(new Date(time)) + 1 === day

  return (
    <div className="mt-4 font-mono flex flex-col lg:flex-row gap-8 [&_label]:text-sm">

      <div className="grow flex flex-col">
        {/* Input / Code Block */}
        <div className="min-h-12 text-lg bg-zinc-800 rounded-md border-white/5 border p-4 whitespace-pre font-medium tracking-tight [&_input]:bg-white/10 [&_input]:rounded-r-md [&_input]:px-1">
          <span className="text-code-keyword">const </span>
          <span className="text-code-identifier">advent</span>
          <span className="text-code-keyword"> = new </span>
          <span className="text-code-method">AdventEvent</span>
          <span className="text-code-identifier">(</span>
          <div className="flex items-stretch">
            <span>{`  `}</span>
            <span className="text-[0.9em] font-sans p-2 py-0.5 bg-white/10 text-white/40 rounded-l-md">startTime:</span>
            <input className="grow text-code-string" value={configInput.startDate} onChange={changeConfigInput('startDate')} />
          </div>
          <div className="flex items-stretch">
            <span>{`  `}</span>
            <span className="text-[0.9em] font-sans p-2 py-0.5 bg-white/10 text-white/40 rounded-l-md">duration (days):</span>
            <input className="grow text-code-method" value={configInput.duration} onChange={changeConfigInput('duration')} />
          </div>
          <span className="text-code-identifier">)</span>

          {
            codeError.current && (
              <div className="text-sm text-red-400 border-t border-t-white/10 pt-2 mt-2 -m-4 p-2">
                {codeError.current}
              </div>
            )
          }
        </div>

        {/* Status */}
        <div className="h-24 mt-8 shrink-0">
          {
            time <= firstDayTimestamp ?
              <div className="text-lg text-purple-500">
                Advent has not started yet <FrozenCountdown time={countdownToFirstDay} />
              </div>
              : time > (lastDayTimestamp + 1000 * 60 * 60 * 24 * 5)
                ? <div className="text-lg text-red-500">
                  Advent is over
                </div> : time > lastDayTimestamp
                  ? <div className="text-lg text-yellow-400">All days is unlocked</div>
                  : <div className="text-lg text-green-500">
                    Advent is not over yet. <br />Next day in <FrozenCountdown time={countdownToNextDay} />
                  </div>
          }
          <div>
            Last unlocked day: {lastUnlockedDay}
          </div>
        </div>

        {/* Result */}
        <div className="flex flex-wrap gap-2">
          {Array.from({ length: length }, (_, i) => {
            if (isDayUnlocked(i + 1)) {
              return <div key={i} className="transition-all w-24 h-24 bg-white text-black/80 p-2 rounded-md flex items-center justify-center">
                {i + 1}
              </div>
            }
            if (isNextLockedDay(i + 1)) {
              return <div key={i} className="transition-all w-24 h-24 bg-red-800 text-white/80 p-2 rounded-md flex flex-col items-center justify-center relative">
                {i + 1}<br />
                <div className="text-xs absolute bottom-2 left-2 tracking-tighter">
                  {FrozenCountdown({ time: countdownToNextDay }).replace("0d ", "")}
                </div>
              </div>
            }

            return (
              <div key={i} className="transition-all w-24 h-24 bg-red-800 text-white/80 p-2 rounded-md flex items-center justify-center">
                {i + 1}<br />
              </div>
            )
          })}
        </div>

      </div>

      {/* Mock */}
      <div className=" lg:w-2/5 flex-none shrink-0">
        <TimeTraveler time={time} setTime={setTime} />
        <button disabled={warping} className="p-4 rounded-md bg-slate-500/50 mt-2 disabled:brightness-50 disabled:pointer-events-none" onClick={() => {

          function easeInOutQuad(t: number) {
            return t < 0.5
              ? 8 * t ** 4
              : 1 - Math.pow(-2 * t + 2, 4) / 2;
          }

          function warpTime(startTime: Date, endTime: Date, duration: number, updateCallback: (time: number) => void) {
            const startTimestamp = startTime.getTime();
            const endTimestamp = endTime.getTime();
            const totalDifference = endTimestamp - startTimestamp;

            if (Math.abs(totalDifference) < 1000) return

            const start = performance.now();
            setWarping(true)

            const interval = setInterval(() => {
              const now = performance.now();
              const elapsed = (now - start) / 1000; // Convert to seconds
              const progress = Math.min(elapsed / duration, 1); // Normalize progress to [0, 1]

              // Apply the easing function
              const easedProgress = easeInOutQuad(progress);

              // Calculate the new time
              const currentTimestamp = startTimestamp + totalDifference * easedProgress;
              // const currentTime = new Date(currentTimestamp);

              // Call the update callback with the current time
              updateCallback(currentTimestamp);

              // Clear the interval when we reach the end
              if (progress === 1) {
                clearInterval(interval);
                setWarping(false)
              }
            }, 16); // Approximately 60fps
          }

          warpTime(new Date(time),
            isLastDayUnlocked
              ? new Date(adventRef.current.getTime(1))
              : new Date(adventRef.current.getTime(nextDay)), 2 /** seconds */, (time) => {
                console.log(time)
                setTime(time)
              })
        }}>
          {
            warping
              ? "Warping..."
              : isLastDayUnlocked ? "Go to start of Advent" : "Go To Next Day"
          }
        </button>
      </div>

    </div>
  )

}

function FrozenCountdown({ time }: { time: number }) {
  const days = Math.floor(time / 1000 / 60 / 60 / 24)
  const hours = Math.floor(time / 1000 / 60 / 60) % 24
  const minutes = Math.floor(time / 1000 / 60) % 60
  const seconds = Math.floor(time / 1000) % 60

  return `${ days }d ${ hours }h ${ minutes }m ${ seconds }s`
}


function TimeTraveler(
  { time, setTime }: { time: number, setTime: (time: number, tz?: number) => void }
) {

  useEffect(() => {
    const interval = setInterval(() => setTime(time + 1000), 1000)
    return () => clearInterval(interval)
  }, [time])

  const years = [-2, -1, 0, 1, 2].map(y => new Date(Date.UTC(new Date().getFullYear() + y, 0, 1)).getTime())
  const today = (~~(new Date().getTime() / 1000 / 60 / 60 / 24) * 24 * 60 * 60 * 1000)
  const year = new Date(time).getUTCFullYear()
  const month = new Date(time).getUTCMonth()
  const daysInMonth = new Date(year, month + 1, 0).getUTCDate()
  const date = new Date(time).getUTCDate()
  const hour = new Date(time).getUTCHours()

  const months = Array.from({ length: 12 }, (_, i) => {
    return new Date(Date.UTC(year, i, 1)).getTime()
  })

  const days = Array.from({ length: daysInMonth }, (_, i) => {
    return new Date(Date.UTC(year, month, i + 1)).getTime()
  })

  const hours = Array.from({ length: 24 }, (_, i) => {
    return new Date(Date.UTC(year, month, date, i)).getTime()
  })

  const minutes = Array.from({ length: 60 }, (_, i) => {
    return new Date(Date.UTC(year, month, date, hour, i)).getTime()
  })

  const [tz, setTz] = useState<number>(0)
  const changeTz = (e: React.ChangeEvent<HTMLInputElement>) => {
    // limit to -12 and 12
    const val = Math.min(12, Math.max(-12, parseInt(e.currentTarget.value)))
    setTz(val)
    setTime(time, val)
  }


  return (
    <>
      <div className=" flex flex-col gap-2 pb-8 rounded-2xl [&_label]:pt-1 [&_label]:-mb-1 relative">
        {/* <div className="text-lg font-semibold -mt-1.5 mb-1 text-slate-200/50">Time Traveler</div> */}
        <div>
          <div className="text-sm">
            Current UTC time: <span className="font-sans">{new Date(time).toLocaleString("en", {
              timeZone: "UTC",
            })}</span>
          </div>
          <div className="text-sm">
            Current local time: <span className="font-sans">{new Date(time).toLocaleString("en", {
              timeZone: `Etc/GMT${ tz > 0 ? "-" : "+" }${ Math.abs(tz) }`,
            })}</span>
          </div>
        </div>

        <label>Year: {year}</label>
        <input
          type="range"
          onChange={(e) => setTime(e.currentTarget.valueAsNumber, tz)}
          min={today - 1000 * 60 * 60 * 24 * 365 * 2}
          max={today + 1000 * 60 * 60 * 24 * 365 * 2}
          value={time}
          list="years"
        />
        <datalist id="years">
          {years.map((y, i) => <option key={i} value={y}></option>)}
        </datalist>

        <label>Month: {new Date(time).toLocaleString('default', { month: "long" })}</label>
        <input
          type="range"
          onChange={(e) => setTime(e.currentTarget.valueAsNumber, tz)}
          min={months[0]}
          max={months[11]}
          value={time}
          list="months"
        />
        <datalist id="months">
          {months.map((y, i) => <option key={i} value={y}></option>)}
        </datalist>

        <label>Day: {new Date(time).toLocaleString('en', { day: "numeric", timeZone: "UTC" })}</label>
        <input
          type="range"
          onChange={(e) => setTime(e.currentTarget.valueAsNumber, tz)}
          min={days[0]}
          max={days.at(-1)}
          value={time}
          list="days"
        />
        <datalist id="days">
          {days.map((y, i) => <option key={i} value={y}></option>)}
        </datalist>

        <label>Time: {new Date(time).toLocaleString('default', { timeStyle: 'short', timeZone: "UTC" })} (Local: {new Date(time).toLocaleString('default', { timeStyle: 'short', timeZone: `Etc/GMT${ tz > 0 ? "-" : "+" }${ Math.abs(tz) }` })})</label>
        <input
          type="range"
          onChange={(e) => setTime(e.currentTarget.valueAsNumber, tz)}
          min={hours[0]}
          max={hours.at(-1)}
          value={time}
          list="hours"
        />
        <datalist id="hours">
          {hours.map((y, i) => <option key={i} value={y}></option>)}
        </datalist>

        <label>Minute: {new Date(time).toLocaleString('default', { minute: '2-digit' })}</label>
        <input
          type="range"
          onChange={(e) => setTime(e.currentTarget.valueAsNumber, tz)}
          min={minutes[0]}
          max={minutes.at(-1)}
          value={time}
        />

        <label>Timezone Offset: {tz}</label>
        <input
          type="range"
          onChange={changeTz}
          min={-12} max={12} step={1}
          value={tz}
        />

      </div>
    </>
  )
}

const nodeId = (id: string) => {
  return document.getElementById(id)
} 