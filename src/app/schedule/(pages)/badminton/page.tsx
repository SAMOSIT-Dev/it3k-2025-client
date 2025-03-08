'use client'

import PageTitle from '../../components/PageTitle'
import ScheduleCard from '../../components/ScheduleCard'
import Loading from '../../components/Loading'
import {
  MultiTypeSchedule,
  Place,
  ScheduleResponse,
} from '../../utils/types'
import useSWR from 'swr'
import * as endpoints from '../../utils/endpoints'
import { fetcher } from '../../utils/utils'
import VerticalFadeIn from '@/shared/components/animations/VerticalFadeIn'

export default function BadmintonSchedulePage() {
  const { data, isLoading } = useSWR<ScheduleResponse>(
    endpoints.schedule.badminton,
    fetcher
  )

  const formatedData: MultiTypeSchedule[] =
    data?.data.reduce<MultiTypeSchedule[]>((prev, curr) => {
      const exitsType = prev.find((v) => v.title == curr.type)
      if (exitsType) {
        exitsType.items.push(curr)
      } else {
        prev.push({ title: curr.type, items: [curr] })
      }
      return prev
    }, []) ?? []

  return (
    <div className="pt-[100px] w-screen px-8 md:px-24 lg:px-0 h-screen overflow-x-hidden min-w-0 overflow-y-scroll bg-black-300">
      <div className="w-auto lg:w-[1038.35px] mx-auto">
        <PageTitle title="Badminton" />
      </div>
      <section className="my-[100px] h-auto min-h-0 mx-auto w-auto lg:w-[1038.35px] relative z-20">
        {isLoading ? (
          <div className="mt-[200px]">
            <Loading />
          </div>
        ) : data?.success ? (
          formatedData.map((type) => (
            <div key={type.title}>
              <span className="lg:text-5xl text-2xl font-Prompt flex justify-center font-bold text-center text-white mx-auto my-14 md:my-[86px]">
                {type.title}
              </span>
              <div className="font-Prompt flex flex-col justify-center m-auto space-y-5 md:space-y-6 lg:space-y-[42px]">
                {type.items.map((item, i) => (
                  <VerticalFadeIn key={i} visibleThreshold={0.9}>
                    <ScheduleCard
                      key={i}
                      type={item.teamA && item.teamB ? 'match' : 'info'}
                      scheduleData={item}
                      placeType={Place.chord}
                    />
                  </VerticalFadeIn>
                ))}
              </div>
            </div>
          ))
        ) : (
          <p className="my-[200px] font-bold md:text-2xl text-white text-center">
            No Upcoming Match
          </p>
        )}
      </section>
    </div>
  )
}
