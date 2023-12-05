import { useState } from 'react'
import { Play, SkipNext, Pause, SkipPrev } from 'iconoir-react'

export const Commands = ({ previousSong, nextSong, audioRef, song }) => {
  const [play, setPlay] = useState(false)

  return (
    <article className='flex flex-col items-center pt-4'>
      <p className='text-xl font-[600]'>{song?.songTitle}</p>
      <p className='text-sm italic text-gray-400'>{song?.channelName}</p>
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
        <SkipNext className='cursor-pointer' onClick={() => nextSong()} />
      </div>
      <div className='flex mt-4 py-2 text-[#411583] font-semibold w-full flex-col justify-center items-center bg-[#ececf3] text-[12px]'>
        <p>Cuando sólo hay un candidato,</p>
        <p>solo hay una elección</p>
      </div>
    </article>
  )
}
