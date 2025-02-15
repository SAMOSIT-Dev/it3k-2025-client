import BasketBallCard from './component/BastketballCard'

const BasketBall = () => {
  const mock = [
    {
      id: 1,
      teamA: 'KMUTT',
      teamB: 'KMITL',
      time: '17.00-20.00',
      scoreAQ1: 32,
      scoreAQ2: 32,
      scoreBQ1: 0,
      scoreBQ2: 0,
      scoreAT: 102,
      scoreBT: 0
    },
    {
      id: 1,
      teamA: 'KMUTT',
      teamB: 'KMITL',
      time: '17.00-20.00',
      scoreAQ1: 32,
      scoreAQ2: 32,
      scoreBQ1: 0,
      scoreBQ2: 0,
      scoreAT: 102,
      scoreBT: 0
    },
    {
      id: 1,
      teamA: 'KMUTT',
      teamB: 'KMITL',
      time: '17.00-20.00',
      scoreAQ1: 32,
      scoreAQ2: 32,
      scoreBQ1: 0,
      scoreBQ2: 0,
      scoreAT: 102,
      scoreBT: 0
    }
  ]
  return (
    <div className=" flex flex-col w-full h-full justify-center items-center space-y-2 sm:space-y-4 lg:space-y-8 bg-black-300">
      {mock.map((data, index) => {
        return <BasketBallCard data={data} key={index} />
      })}
    </div>
  )
}
export default BasketBall
