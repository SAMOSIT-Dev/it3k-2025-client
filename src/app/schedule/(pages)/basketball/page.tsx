'use client'

import StaggeredFadeIn from '@/shared/components/animations/StaggeredFadeIn'
import PageTitle from '../../components/PageTitle'
import ScheduleCard from '../../components/ScheduleCard'
import Loading from '../../components/Loading'
import * as endpoints from '../../utils/endpoints'
import useSWR from 'swr'
import { fetcher } from '../../utils/utils'
import { ScheduleResponse } from '../../utils/types'

export default function BasketballSchedulePage() {
  const { data, isLoading } = useSWR<ScheduleResponse>(
    endpoints.schedule.basketball,
    fetcher
  )

  return (
    <div className="pt-[100px] w-screen px-8 md:px-24 lg:px-0 h-screen overflow-x-hidden min-w-0 overflow-y-scroll bg-black-300">
      <div className="w-auto lg:w-[1038.35px] mx-auto">
        <PageTitle title="Basketball" />
      </div>
      <div className="my-[100px] h-auto min-h-0 mx-auto w-auto lg:w-[1038.35px] relative z-20">
        <div className="font-Prompt">
          {isLoading ? (
            <div className="mt-[200px]">
              <Loading />
            </div>
          ) : data?.success ? (
            <StaggeredFadeIn otherStyle="flex flex-col justify-center m-auto  space-y-5 md:space-y-6 lg:space-y-[42px]">
              {data?.data.map((data, i) => (
                <ScheduleCard
                  key={i}
                  type={data?.teamA && data.teamB ? 'match' : 'info'}
                  scheduleData={data}
                />
              ))}
            </StaggeredFadeIn>
          ) : (
            <p className="my-[200px] font-bold md:text-2xl text-white text-center">
              No Upcoming Match
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
