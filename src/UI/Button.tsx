import { ButtonHTMLAttributes, ReactNode } from 'react'

type TButton = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode
  className?: string
  width?: 'w-full' | 'w-fit'
}

const Button = ({ children, onClick, className, width, ...rest }: TButton) => {
  return (
    <button
      onClick={onClick}
      className={`${className} ${width} rounded-md text-white p-2`}
      {...rest}
    >
      {children}
    </button>
  )
}

export default Button
