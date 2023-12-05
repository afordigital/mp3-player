import { useEffect, useState } from 'react'

export const useGetMusic = () => {
  const [data, setData] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(null)

  useEffect(() => {
    getMusic()
    async function getMusic () {
      try {
        setIsLoading(true)
        const response = await fetch('api/songs')
        const data = await response.json()
        setData(data)
        setIsLoading(false)
      } catch (err) {
        setIsError(err)
      }
    }
  }, [])

  return { data, isLoading, isError }
}
