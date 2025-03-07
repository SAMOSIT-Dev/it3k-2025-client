import BackButton from '@/shared/components/BackButton'
import Background from '@/shared/components/Background'
import FootballLive from './components/FootballLive'

const Page = () => {
  return (
    <div className="mt-[100px] font-Prompt flex flex-col text-white w-full min-h-[calc(100dvh-102px)] items-center space-y-2 sm:space-y-4 lg:space-y-8">
      <div className="w-[90%]">
        <div className="mt-8 mb-4 md:mb-8 md:mt-8 flex flex-row items-center lg:-ml-4 md:-ml-2 -ml-1">
          <BackButton />
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold">Football</h1>
        </div>
        <FootballLive />
      </div>
      <Background />
    </div>
  )
}

export default Page
