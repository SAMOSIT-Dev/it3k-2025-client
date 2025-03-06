import React from 'react'
import ScoreUpdateForm from '../components/ScoreboardUpdateForm'

interface IProps {
  params: {
    id: string
  }
}

const page = ({ params: { id } }: IProps) => {
  return (
   <ScoreUpdateForm id={id} />
  )
}

export default page
