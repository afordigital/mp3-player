'use client'
import { useState } from 'react'
import { Play, SkipNext, Pause, SkipPrev } from 'iconoir-react'

import { Roboto } from '@next/font/google'

const roboto = Roboto({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-roboto'
})

export default function Home () {
  const [play, setPlay] = useState(false)
  return (
    <main
      className={`${roboto.variable} font-sans flex bg-[#c1b9d3] items-center justify-center h-screen`}
    >
      <div className='w-[350px] bg-white drop-shadow-lg'>
        <div className='w-[350px] h-[350px] bg-red-500'></div>
        <div className='flex flex-col items-center pt-4'>
          <p className='text-xl font-[600]'>Título de la canción</p>
          <p className='text-sm italic text-gray-400'>Artista</p>
          <div className='flex mt-4 space-x-2'>
            <SkipPrev className='cursor-pointer' />
            {!play ? (
              <Play
                className='cursor-pointer'
                onClick={() => {
                  setPlay(true)
                }}
              />
            ) : (
              <Pause
                className='cursor-pointer'
                onClick={() => setPlay(false)}
              />
            )}
            <SkipNext className='cursor-pointer' />
          </div>
          <div className='flex mt-4 py-2 text-[#411583] font-semibold w-full flex-col justify-center items-center bg-[#ececf3] text-[12px]'>
            <p>Cuando sólo hay un candidato,</p>
            <p>solo hay una elección</p>
          </div>
        </div>
      </div>
    </main>
  )
}
