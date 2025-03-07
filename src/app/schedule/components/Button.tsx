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
        'lg:h-[39px] lg:w-[175px] h-auto lg:text-xl text-sm py-1 w-[130px] bg-transparent data-[active=true]:bg-red-500/80  ease-linear duration-300 transition-colors font-medium border rounded-[10px] border-red-600 flex justify-center items-center'
      )}>
      {children}
    </button>
  )
}

export default Button
