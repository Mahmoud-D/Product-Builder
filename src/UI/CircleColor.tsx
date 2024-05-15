import { HTMLAttributes } from 'react'
type TProps = HTMLAttributes<HTMLSpanElement> & {
  color: string
}

const CircleColor = ({ color, ...rest }: TProps) => {
  return (
    <span
      className="block w-5 h-5 rounded-full cursor-pointer "
      style={{ background: color }}
      {...rest}
    />
  )
}

export default CircleColor
