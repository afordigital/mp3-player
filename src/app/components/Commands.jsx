import { Play, SkipNext, Pause, SkipPrev } from 'iconoir-react'

export const Commands = ({
  previousSong,
  nextSong,
  audioRef,
  song,
  play,
  setPlay,
  togglePlay
}) => {
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
        {!play ? <Play onClick={togglePlay} /> : <Pause onClick={togglePlay} />}
        <SkipNext onClick={() => nextSong()} />
      </div>
      <div>
        <input
          type='range'
          id='volume'
          name='volume'
          min='0'
          max='100'
          defaultValue='100'
          onChange={event => {
            audioRef.current.volume = event.target.value / 100
          }}
        />
        <label for='volume'></label>
      </div>
      <div className='flex mt-4 py-2 text-[#411583] font-semibold w-full flex-col justify-center items-center bg-[#ececf3] text-[12px]'>
        <p>Cuando sólo hay un candidato,</p>
        <p>solo hay una elección</p>
      </div>
    </article>
  )
}
