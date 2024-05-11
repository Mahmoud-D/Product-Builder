import { InputHTMLAttributes } from 'react'

type TProps = InputHTMLAttributes<HTMLInputElement>

function Input({ ...rest }: TProps) {
  return (
    <input
      className="w-full p-2 border-2 border-gray-600 rounded-md"
      {...rest}
    />
  )
}

export default Input
