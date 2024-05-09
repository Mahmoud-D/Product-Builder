type Tprops = {
  src: string
  alt: string
  width?: number
  height?: number
  className?: string
}

const Image = ({ src, alt, className }: Tprops) => {
  return (
    <div>
      <img src={src} alt={alt} className={className} />
    </div>
  )
}

export default Image
