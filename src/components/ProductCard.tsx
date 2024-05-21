import Button from '../UI/Button'
import { TProduct } from '../types/TProduct'
import Image from './Image'
import { textSlicer } from '../utils/TextSlicer'
import CircleColor from '../UI/CircleColor'
type TProps = {
  product: TProduct
}

const ProductCard = ({ product }: TProps) => {
  if (!product) {
    return 'null' // or return a loading spinner, or some fallback UI
  }

  const { title, description, price, colors, category } = product

  const renderColors = colors.map((color) => (
    <CircleColor key={color} color={color} />
  ))
  return (
    <div className="flex flex-col p-2 mx-auto text-lg text-center border-2 border-black rounded md:max-w-lg mx-w-sm">
      <Image
        src={product.imageURL}
        alt={product.title}
        className="w-full rounded-md h-52 lg:object-cover "
      />
      <h3 className="mt-5 font-bold border border-black rounded ">
        {textSlicer(title, 25)}
      </h3>

      <p>{textSlicer(description)}</p>

      <div className="flex flex-wrap items-center my-2 space-x-2 ">
        {renderColors}
      </div>

      <div className="flex items-center justify-between mt-auto ">
        <span>${price}</span>

        <Image
          src={imageURL}
          alt={title}
          className="object-bottom w-10 h-10 rounded-full "
        />
      </div>
      <div className="flex items-center justify-between mt-4 space-x-2 ">
        <Button className="bg-indigo-600" width="w-full">
          EDIT
        </Button>
        <Button className="bg-red-600" width="w-full">
          DELETE
        </Button>
      </div>
    </div>
  )
}

export default ProductCard
