import { ChangeEvent, useState } from 'react'
import ProductCard from './components/ProductCard'
import { formInputsList, productList } from './data/index'
import { TProduct } from './types/TProduct'
import Modal from './UI/Modal'
import Button from './UI/Button'
import Input from './UI/Input'

function App() {
  const [isOpen, setIsOpen] = useState(false)

  const [product, setProduct] = useState<TProduct>({
    title: '',
    description: '',
    imageURL: '',
    price: '',
    colors: [],
    category: {
      name: '',
      imageURL: ''
    }
  })

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target
    setProduct((prev) => ({ ...prev, [name]: value }))
  }

  const renderProductList = productList.map((product: TProduct) => (
    <ProductCard key={product.id} product={product} />
  ))

  const renderFormInputList = formInputsList.map((input) => (
    <div className="flex flex-col mb-4 " key={input.id}>
      <label htmlFor={input.id}>{input.label}</label>
      <Input
        type="text"
        id={input.id}
        onChange={handleInputChange}
        name={input.name}
        value={product[input.name]}
      />
    </div>
  ))

  /* ------ Handlers ------ */
  const closeModal = () => {
    setIsOpen(false)
  }

  const openModal = () => {
    setIsOpen(true)
  }

  return (
    <main className="container mx-auto ">
      <Button
        onClick={openModal}
        className="mt-5 bg-indigo-600 hover:bg-indigo-800 "
        width="w-full"
      >
        Add
      </Button>
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
