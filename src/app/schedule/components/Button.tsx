import { ComponentProps } from 'react'
import { cn } from '../utils/utils'

interface ButtonProps extends ComponentProps<'button'> {
  active?: boolean
}

const Button: React.FC<ButtonProps> = ({
  className,
  active = false,
  children,
  ...props
}) => {
  return (
    <button
      {...props}
      data-active={active}
      className={cn(
        className,
        'lg:h-[39px] lg:w-[175px] h-auto lg:text-xl text-sm p-[.4rem_.8rem] w-[130px] bg-transparent duration-500 ease-in-out transition font-medium border rounded-[10px] border-red-500 flex justify-center items-center',
        'data-[active=true]:bg-red-500 data-[active=true]:outline-none data-[active=true]:shadow-[0_0_10px_#E90000,_0_0_7px_#E90000]',
        'hover:bg-red-500 hover:outline-none hover:shadow-[0_0_10px_#E90000,_0_0_7px_#E90000]',
      )}>
      {children}
    </button>
  )
}

export default Button
