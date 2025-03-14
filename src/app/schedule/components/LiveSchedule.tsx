'use client'

import ScheduleCard from './ScheduleCard'
import { useEffect, useRef, useState } from 'react'
import { Swiper, SwiperClass, SwiperSlide } from 'swiper/react'
import Button from './Button'
import useSWR from 'swr'
import * as endponts from '../utils/endpoints'
import { fetcher } from '../utils/utils'
import Loading from './Loading'
import { Schedule, ScheduleResponse } from '../utils/types'

type Location = 'field' | 'gym'

export default function LiveSchedule() {
  const [filter, setFilter] = useState<Location>('field')
  const swiperRef = useRef<SwiperClass>(null)
  const [containerHeight, setContainerHeight] = useState<number | null>(null)
  const [filteredResponse, setFilteredResponse] = useState<Schedule[]>([])
  const { data, isLoading } = useSWR<ScheduleResponse>(
    endponts.schedule.schedules,
    fetcher
  )
  const [date, setDate] = useState<Date>(new Date())

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDate(new Date())
    }, 1000)
    return () => clearTimeout(timeout)
  }, [date])

  useEffect(() => {
    const updateHeight = () => {
      if (swiperRef.current) {
        const index = swiperRef.current.activeIndex
        const slides = swiperRef.current.slides
        if (slides?.length > 1) {
          const firstTwoHeights =
            slides[index].offsetHeight + slides[index + 1].offsetHeight + 19
          setContainerHeight(firstTwoHeights)
        }
      }
    }

    updateHeight()

    window.addEventListener('resize', updateHeight)
    return () => window.removeEventListener('resize', updateHeight)
  }, [filteredResponse, isLoading])

  const handleFilterButton = (location: Location) => {
    swiperRef.current?.slideTo(0)
    setFilter(location)
  }

  useEffect(() => {
    const currentTime = new Date().getHours()
    const locations: Record<Location, string> = {
      field: 'Football Field',
      gym: 'Gymnasium'
    }
    if (data) {
      let filteredData = data.data.filter(
        (v) =>
          parseInt(v.period.start.split('T')[1].split(':')[0]) >= currentTime &&
          parseInt(v.period.end.split('T')[1].split(':')[0]) >= currentTime
      )
      if (filter) {
        filteredData = data.data.filter(
          (v) =>
            locations[filter] == v.location &&
            parseInt(v.period.start.split('T')[1].split(':')[0]) >=
              currentTime &&
            parseInt(v.period.end.split('T')[1].split(':')[0]) >= currentTime
        )
      }
      setFilteredResponse(filteredData)
    }
  }, [filter, data, date])

  return (
    <div id="match" className="min-w-0 h-auto min-h-0 relative">
      <div className="flex flex-col relative font-Prompt m-auto px-8 md:px-24 lg:px-0 z-[12] h-auto min-h-0 mx-auto w-auto lg:w-[1038.35px] text-center text-white">
        <div className="relative w-auto h-auto mx-auto px-10 py-5 sm:py-10">
          <span className="font-bold text-3xl md:text-5xl flex justify-center after:bg-[#FF0000] after:-z-[1] before:content-['Schedule'] before:z-10 after:blur-[70px] relative after:absolute after:w-full after:h-full"></span>
        </div>
        <div className="flex w-full flex-col space-y-5 sm:space-y-0 items-center sm:flex-row lg:mt-[55px] justify-between mx-auto">
          <h2 className="font-bold text-xl lg:text-4xl relative z-10">
            Upcoming Events
          </h2>
          <div className="flex items-center space-x-2">
            <Button
              active={filter == 'field'}
              onClick={() => handleFilterButton('field')}>
              Football Field
            </Button>
            <Button
              active={filter == 'gym'}
              onClick={() => handleFilterButton('gym')}>
              Gymnasium
            </Button>
          </div>
        </div>
        {isLoading ? (
          <Loading />
        ) : data?.success ? (
          filteredResponse.length > 0 ? (
            filteredResponse.length > 2 ? (
              <>
                <div
                  className="flex flex-col justify-center items-center mt-5 md:mt-[30px]"
                  style={{ height: containerHeight || 'auto' }}>
                  <Swiper
                    slidesPerView="auto"
                    direction="vertical"
                    spaceBetween={19}
                    slidesOffsetAfter={0}
                    onSwiper={(swiper) => (swiperRef.current = swiper)}
                    className="!w-full h-full">
                    {filteredResponse.map((item, i) => (
                      <SwiperSlide key={i} className="!h-auto">
                        <ScheduleCard
                          type={!item.teamA && !item.teamB ? 'info' : 'match'}
                          scheduleData={item}
                        />
                      </SwiperSlide>
                    ))}
                  </Swiper>
                </div>

                <div className="before:w-full before:h-[1px] mt-4 md:mt-8 flex flex-col items-center before:bg-white before:flex">
                  <button
                    className="mt-[14px]"
                    onClick={() => swiperRef.current?.slideNext()}>
                    <i className="">
                      <svg
                        width="26"
                        height="26"
                        viewBox="0 0 26 26"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M3.24997 5.41668H22.75C22.9474 5.4173 23.1409 5.47175 23.3097 5.57417C23.4785 5.67659 23.6161 5.8231 23.7078 5.99794C23.7996 6.17278 23.8418 6.36932 23.8302 6.5664C23.8185 6.76348 23.7533 6.95365 23.6416 7.11643L13.8916 21.1998C13.4875 21.7837 12.5146 21.7837 12.1095 21.1998L2.35947 7.11643C2.24661 6.95399 2.18043 6.76373 2.16812 6.56631C2.1558 6.3689 2.19782 6.17189 2.28961 5.99669C2.3814 5.82148 2.51945 5.67478 2.68876 5.57252C2.85808 5.47026 3.05218 5.41636 3.24997 5.41668Z"
                          fill="white"
                          fillOpacity="0.9"
                        />
                      </svg>
                    </i>
                  </button>
                </div>
              </>
            ) : (
              <div className="flex flex-col justify-center items-center space-y-[19px] md:space-y-[24px] mt-5 md:mt-[30px] h-max">
                {filteredResponse.map((item, i) => (
                  <ScheduleCard
                    type={!item.teamA && !item.teamB ? 'info' : 'match'}
                    key={i}
                    scheduleData={item}
                  />
                ))}
              </div>
            )
          ) : (
            <p className="my-12">No Upcoming Event</p>
          )
        ) : (
          <p className="my-12">No Upcoming Event</p>
        )}
      </div>
    </div>
  )
}
