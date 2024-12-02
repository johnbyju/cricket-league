import { useEffect, useState } from 'react'
import loader from '/loader.png'
export default function LoadingScreen() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress >= 100) {
          clearInterval(timer)
          return 100
        }
        return prevProgress + 1
      })
    }, 30)

    return () => clearInterval(timer)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#5e2025] to-black flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="relative w-full aspect-square">
          <img
            src={loader}
            alt="Cricket Player"
            width={400}
            height={400}
            className="mx-auto opacity-55"
            priority
          />
        </div>
        
        <div className="space-y-4 w-full">
          <div className="h-1  bg-gray-800 rounded-full overflow-hidden">
            <div 
              className="h-full bg-orange-500 transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
          
          <div className=" text-center gap-5 text-white/80 text-sm">
            <span>Loading..</span>
            {/* <span>Loading. {'.'.repeat((progress % 2) + 1)}</span> */}
            <span>{progress}%</span>
          </div>
        </div>
      </div>
    </div>
  )
}

