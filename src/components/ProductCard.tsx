import Button from '../UI/Button'
import { TProduct } from '../types/TProduct'
import Image from './Image'
import { textSlicer } from '../utils/TextSlicer'
type TProps = {
  product: TProduct
}

const ProductCard = ({ product }: TProps) => {
  if (!product) {
    return 'null' // or return a loading spinner, or some fallback UI
  }

  const { title, description, imageURL } = product
  return (
    <div className="flex flex-col p-3 text-lg text-center border-2 border-black rounded ">
      <Image src={product.imageURL} alt={product.title} className="rounded" />
      <h3 className="m-2 font-bold border border-black rounded ">{title}</h3>
      <p>{textSlicer(description)}</p>
      <div className="flex gap-2 pt-2 ">
        <span className="w-5 h-5 bg-indigo-600 rounded-full cursor-pointer" />
        <span className="w-5 h-5 bg-red-600 rounded-full cursor-pointer" />
        <span className="w-5 h-5 bg-green-600 rounded-full cursor-pointer" />
      </div>

      <div className="flex items-center justify-between">
        <span>$500.00</span>

        <Image src={imageURL} alt={title} className="w-10 h-10 rounded-full " />
      </div>
      <div className="flex items-center justify-between mt-5 space-x-2 ">
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
