import Head from 'next/head'
import { formatDuration, intervalToDuration, addMinutes, isAfter } from 'date-fns'
import Image from "next/image"
import { useState, useEffect } from 'react';
import jBishopWaterBackground from "../public/backgrounds/jeremy-bishop-QtIXL7C4bB0-unsplash.jpg"

import styles from './index.module.css'
import { Button } from '@/components/button';

const backgrounds = [
  {
    src: jBishopWaterBackground,
    credit: "Jeremy Bishop",
    link: "https://unsplash.com/@jeremybishop?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText",
    source: "Unsplash",
    alt: "water at sunset by Jeremy Bishop",
    dark: true
  }
]

const FIFTY_MINUTES = 50;
const TWENTY_FIVE_MINUTES = 25;
const TEN_MINUTES = 10
const FIVE_MINUTES = 5
const breaks: { [key: string]: number } = {
  [FIFTY_MINUTES.toString()]: TEN_MINUTES,
  [TWENTY_FIVE_MINUTES.toString()]: FIVE_MINUTES
}

export default function Home() {

  const [isBreak, setIsBreak] = useState<boolean>(false)
  const [selectedTimer, setSelectedTimer] = useState(FIFTY_MINUTES)
  const [end, setEnd] = useState<Date | number>(addMinutes(new Date(), selectedTimer))
  const [started, setStarted] = useState<boolean>(false)
  const [formattedDuration, setFormattedDuration] = useState<string>()

  const [audio] = useState<HTMLAudioElement | undefined>(typeof Audio !== "undefined" ? new Audio('/audio/Kasper-Bowl-4-Articulation-2-Microphone-1-5s.mp3') : undefined)

  useEffect(() => { 
    const updateDuration = () => {
        const start = new Date()
        const duration = intervalToDuration({
          start, 
          end
        })

        if (isAfter(start, end) && !isBreak) {
          setIsBreak(true)
          if (audio) {
            audio.volume = 0.2
            audio.play()        
          }
          setStarted(false)
        } else if (isAfter(start, end) && isBreak) {
          setIsBreak(false)
          setStarted(false)
          setEndTime(selectedTimer)
        }

        setFormattedDuration(formatDuration(duration, { format: ['hours', 'minutes', 'seconds'] }))
      }

      if (started) { 
        const interval = setInterval(() => {
          updateDuration()
        }, 1000);
        return () => clearInterval(interval);
      }
  }, [started, end, audio, isBreak, selectedTimer])

  const handleStart = () => {
    const duration = isBreak ? breaks[selectedTimer] : selectedTimer
    setEndTime(duration)
    setStarted(true)
  }

  const handleSetTimer = (duration: number) => {
    setSelectedTimer(duration)
    setEndTime(duration)
  }

  const setEndTime = (duration: number) => {
    setEnd(addMinutes(new Date(), duration))
  }

  return(
    <div className={`px-8 py-8 flex flex-col min-h-screen ${backgrounds[0].dark ? styles.lightText : styles.darkText}`}>
      <Head>
        <title>Ambient Pomodoro</title>
        <meta name="description" content="Ambient sounds with a pomodor timer for complete focus." />
        <link
          rel="icon"
          href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🍅</text></svg>"
        />
      </Head>

      <main className={`flex flex-grow flex-col justify-between ${styles.content}`}>
        <div className='flex justify-center'>
          <div className='flex flex-row flex-grow justify-between'>
            <div>
              <p>
                {isBreak ? breaks[selectedTimer] : selectedTimer} minutes of {isBreak ? 'break' : 'focus'}
              </p>
            </div>
           
            <div><h1>Ambient Pomodoro</h1></div>
          </div>
        </div>
        <div className='flex justify-center'>
          {started && !isBreak &&
            <p>Focus</p>
          }
          {isBreak && 
            <div>
              <p>Break</p>
            </div>
          }
          {!started && !isBreak &&
            <div className='space-x-4'>
              <Button aria-label="Fifty minute focus" onClick={() => handleSetTimer(FIFTY_MINUTES)}>{FIFTY_MINUTES}</Button>
              <Button aria-label="twenty five minute focus" onClick={() => handleSetTimer(TWENTY_FIVE_MINUTES)} >{TWENTY_FIVE_MINUTES}</Button>
            </div>
          }
        </div>
        <div className='flex justify-center'>
          {!started &&
            <Button aria-label={`start ${isBreak ? 'break': 'focus'}`} onClick={handleStart}>Start</Button>
          }
          {started && formattedDuration &&
            <p>{formattedDuration}</p>
          }
        </div>
      </main >
      <footer className={`${styles.content} pt-8 grid justify-items-end`}>
        <div>
          <p className='text-xs'>Photo by <a href="">{backgrounds[0].credit}</a> via <a href={backgrounds[0].link}>{backgrounds[0].source}</a></p>
        </div>
      </footer>
       <Image
          className={styles.backgroundImage}
          src={backgrounds[0].src}
          alt={backgrounds[0].alt}
          layout="fill"
          objectFit='cover'
          objectPosition='center'
      />
    </div >
  );  
}