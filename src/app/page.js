'use client'
import { useEffect, useRef, useState } from 'react'
import { Play, SkipNext, Pause, SkipPrev } from 'iconoir-react'
import { Roboto } from '@next/font/google'
import { Menu } from 'lucide-react'
import { useGetMusic } from './customHooks/useGetMusic'

const roboto = Roboto({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-roboto'
})

export default function Home () {
  const [play, setPlay] = useState(false)
  const [currentSong, setCurrentSong] = useState(0)
  const [isMenuOpened, setIsMenuOpened] = useState(false)
  const { data, isLoading, isError } = useGetMusic()
  const song = data?.[currentSong]

  const audioRef = useRef(new Audio())

  useEffect(() => {
    audioRef.current.src = song?.songData
  }, [song])

  if (!song) return null

  // const audio = new Audio(urlAudio)
  // const currentTime = audio.currentTime
  // const totalTime = audio.duration
  // Para modificar el volumen... audioRef.current.volume = 0.5 // valor entre [0, 1]
  // Para modificar el tiempo del audio... audioRef.current.currenTime = 10 // pondrá la canción al segundo 10

  const nextSong = () => {
    if (currentSong < data.length - 1) {
      setCurrentSong(currentSong + 1)
    }
  }

  const previousSong = () => {
    if (currentSong > 0) {
      setCurrentSong(currentSong - 1)
    }
  }

  return (
    <main
      className={`${roboto.variable} font-sans flex justify-center bg-[#c1b9d3] items-center h-screen`}
    >
      <section className='grid grid-cols-2 h-fit'>
        <section className='flex justify-end drop-shadow-lg h-fit'>
          <section className='w-[350px] bg-white'>
            <Menu
              className='absolute right-4 top-4'
              onClick={() => {
                setIsMenuOpened(!isMenuOpened)
              }}
            />
            <article
              style={{
                backgroundImage: `url(${song?.songThumbnail})`,
                backgroundSize: 'cover'
              }}
              className='w-[350px] h-[350px]'
            ></article>
            <article className='flex flex-col items-center pt-4'>
              <p className='text-xl font-[600]'>{song?.songTitle}</p>
              <p className='text-sm italic text-gray-400'>
                {song?.channelName}
              </p>
              <div className='flex mt-4 space-x-2'>
                <SkipPrev
                  onClick={() => {
                    previousSong()
                  }}
                />
                {!play ? (
                  <Play
                    onClick={() => {
                      setPlay(true)
                      audioRef.current.play()
                    }}
                  />
                ) : (
                  <Pause
                    onClick={() => {
                      setPlay(false)
                      audioRef.current.pause()
                    }}
                  />
                )}
                <SkipNext
                  className='cursor-pointer'
                  onClick={() => nextSong()}
                />
              </div>
              <div className='flex mt-4 py-2 text-[#411583] font-semibold w-full flex-col justify-center items-center bg-[#ececf3] text-[12px]'>
                <p>Cuando sólo hay un candidato,</p>
                <p>solo hay una elección</p>
              </div>
            </article>
          </section>
        </section>
        {isMenuOpened && (
          <ol className='bg-[#ececf3] text-slate-500 h-fit max-h-[180px] min-w-[200px] list-decimal space-y-1 divide-y-2 divide-slate-200 py-4 px-8 w-fit'>
            {data?.map((song, index) => (
              <li
                key={index}
                className='hover:bg-slate-300'
                onClick={() => setCurrentSong(index)}
              >
                {song?.songTitle}
              </li>
            ))}
          </ol>
        )}
      </section>
    </main>
  )
}
