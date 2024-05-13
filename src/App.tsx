import ProductCard from './components/ProductCard'
import { productList } from './data/index'
import { TProduct } from './types/TProduct'

function App() {
  const renderProductList = productList.map((product: TProduct) => (
    <ProductCard key={product.id} product={product} />
  ))
  return (
    <main className="container mx-auto ">
      <div className="grid gap-3 p-2 m-5 rounded sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 ">
        {renderProductList}
      </div>
      <Modal closeModal={closeModal} isOpen={isOpen}>
        {renderFormInputList}
        <div className="flex items-center justify-between space-x-2 ">
          <Button
            onClick={closeModal}
            className="bg-indigo-600 hover:bg-indigo-800 "
            width="w-full"
          >
            Submit
          </Button>
          <Button
            onClick={closeModal}
            className="bg-gray-600 hover:bg-gray-800 "
            width="w-full"
          >
            Cancel
          </Button>
        </div>
      </Modal>
    </main>
  )
}

export default App
