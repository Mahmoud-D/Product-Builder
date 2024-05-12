import { InputHTMLAttributes } from 'react'

type TProps = InputHTMLAttributes<HTMLInputElement>

function Input({ ...rest }: TProps) {
  return (
    <input
      className="border-[1px] p-3 text-md rounded-md focus:outline-none focus:ring-2 focus:border-indigo-500 focus:ring-indigo-500 border-gray-300 shadow-md"
      {...rest}
    />
  )
}

export default Input
