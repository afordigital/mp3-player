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
  const [currentSong, setCurrentSong] = useState(0)
  const [isMenuOpened, setIsMenuOpened] = useState(false)
  const { data, isLoading, isError } = useGetMusic()
  const song = data?.[currentSong]

  const audioRef = useRef()

  useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio()
    }
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
              className='w-[350px] h-[350px]'
            ></article>
            <Commands
              previousSong={previousSong}
              nextSong={nextSong}
              audioRef={audioRef}
              song={song}
            />
          </section>
        </section>
        {isMenuOpened && (
          <Menu
            data={data}
            setCurrentSong={setCurrentSong}
            isOpen={isMenuOpened}
          />
        )}
      </section>
    </main>
  )
}
