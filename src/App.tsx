import ProductCard from './components/ProductCard'
import { productList } from './data/index'
import { TProduct } from './types/TProduct'

function App() {
  const renderProductList = productList.map((product: TProduct) => (
    <ProductCard key={product.id} product={product} />
  ))
  return (
    <div>
      <div className="grid gap-3 p-2 m-5 rounded sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 ">
        {renderProductList}
      </div>
    </div>
  )
}

export default App
