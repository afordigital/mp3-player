'use client'
import { useEffect, useRef, useState } from 'react'
import { Roboto } from '@next/font/google'
import { Menu as MenuIcon } from 'lucide-react'
import { useGetMusic } from './customHooks/useGetMusic'
import { Menu } from './components/Menu'
import { Commands } from './components/Commands'

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

  const menuRef = useRef(null)
  const audioRef = useRef()

  useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio()
    }
    audioRef.current.src = song?.songData
    setSeconds(0)
    audioRef.current.play()
  }, [song])

  const [seconds, setSeconds] = useState(audioRef?.current?.currentTime)

  // const currentTime = audio.currentTime
  // const totalTime = audio.duration
  // Para modificar el volumen... audioRef.current.volume = 0.5 // valor entre [0, 1]
  // Para modificar el tiempo del audio... audioRef.current.currenTime = 10 // pondrá la canción al segundo 10

  useEffect(() => {
    audioRef.current.addEventListener('timeupdate', () => {
      setSeconds(parseInt(audioRef?.current?.currentTime))
    })
  }, [audioRef])

  const togglePlay = () => {
    setPlay(!play)
    play ? audioRef.current.pause() : audioRef.current.play()
  }

  const nextSong = () => {
    if (currentSong < data.length - 1) {
      setCurrentSong(currentSong + 1)
      setPlay(true)
    }
  }

  const previousSong = () => {
    if (currentSong > 0) {
      setCurrentSong(currentSong - 1)
      setPlay(true)
    }
  }

  const handleClickOutside = event => {
    if (
      menuRef.current &&
      !menuRef.current.contains(event.target) &&
      isMenuOpened
    ) {
      setIsMenuOpened(false)
    }
  }

  useEffect(() => {
    document.addEventListener('click', handleClickOutside)
    return () => {
      document.removeEventListener('click', handleClickOutside)
    }
  }, [isMenuOpened])

  if (!song) return null

  return (
    <main
      className={`${roboto.variable} font-sans flex justify-center bg-[#c1b9d3] items-center h-screen`}
    >
      <section className='grid grid-cols-2 h-fit'>
        <section className='flex justify-end drop-shadow-lg h-fit'>
          <section className='w-[350px] bg-white'>
            <MenuIcon
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
              className='relative w-[350px] h-[350px]'
            >
              <div className='absolute bottom-0 w-full bg-red-500 h-[50px]'>
                <div className='flex items-center justify-around h-full text-white'>
                  <span>{seconds}</span>
                  <span>{parseInt(audioRef.current.duration)}</span>
                </div>
              </div>
            </article>
            <Commands
              previousSong={previousSong}
              nextSong={nextSong}
              audioRef={audioRef}
              song={song}
              play={play}
              setPlay={setPlay}
              togglePlay={togglePlay}
            />
          </section>
        </section>
        {isMenuOpened && (
          <Menu
            data={data}
            setCurrentSong={setCurrentSong}
            isOpen={isMenuOpened}
            setIsMenuOpened={setIsMenuOpened}
            menuRef={menuRef}
          />
        )}
      </section>
    </main>
  )
}
