export const Menu = ({ data, setCurrentSong, isOpen }) => {
  const menuClassName = isOpen ? 'slide-in' : 'slide-in-hidden'

  return (
    <ol
      className={`bg-[#ececf3] text-slate-500 h-fit max-h-[180px] min-w-[200px] list-decimal space-y-1 divide-y-2 divide-slate-200 py-4 px-8 w-fit ${menuClassName}`}
    >
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
  )
}
