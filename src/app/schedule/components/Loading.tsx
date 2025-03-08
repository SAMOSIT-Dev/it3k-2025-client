import Image from 'next/image'

export default function Loading() {
  return (
    <div className="relative flex w-auto m-auto justify-center items-center gap-5 my-24">
      <div className="size-16 md:size-24 relative">
        <Image
          className="animate-[bounce_1s_infinite_100ms]"
          src="/images/pop.png"
          fill
          alt="pop_loading"
        />
      </div>
      <div className="size-16 md:size-24 relative">
        <Image
          className="animate-[bounce_1s_infinite_200ms]"
          src="/images/pop.png"
          fill
          alt="pop_loading-1"
        />
      </div>
      <div className="size-16 md:size-24 relative">
        <Image
          className="animate-[bounce_1s_infinite_300ms]"
          src="/images/pop.png"
          fill
          alt="pop_loading-2"
        />
      </div>
    </div>
  )
}
