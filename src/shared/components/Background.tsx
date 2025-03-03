const Background = () => {
  return (
    <div className="fixed -top-[100px] left-0 right-0 bottom-0 -z-50 bg-[#0a0a12] overflow-hidden">
      <div className="absolute inset-0 bg-black"></div>

      <div className="absolute right-[-5%] bottom-[-5%] w-[50vw] h-[30vh] bg-red-700 blur-[200px] opacity-35 rotate-[-15deg]"></div>
      <div className="absolute left-[-10%] bottom-[-10%] w-[60vw] h-[10vh] bg-red-600 blur-[180px] opacity-40 rotate-[20deg]"></div>

      <div className="absolute left-[10%] bottom-[-5%] w-[20vw] h-[20vh] bg-blue-400 blur-[160px] opacity-30 rotate-[-10deg]"></div>
      <div className="absolute right-[15%] bottom-[8%] w-[35vw] h-[20vh] bg-blue-600 blur-[180px] opacity-25 rotate-[15deg]"></div>
    </div>
  )
}

export default Background
