import { ChangeEvent, FormEvent, useState } from 'react'
import { v4 as uuid } from 'uuid'
import toast, { Toaster } from 'react-hot-toast'

import ProductCard from './components/ProductCard'
import ErrorMessage from './components/ErrorMessage'

import Modal from './UI/Modal'
import Button from './UI/Button'
import Input from './UI/Input'
import CircleColor from './UI/CircleColor'
import Select from './UI/Select'

import { TProduct } from './types/TProduct'
import { Terrors } from './types/TErrors'
import { TProductName } from './types/TProductName'

import { productObj } from './constants/product'
import { errorsObj } from './constants/errors'

import { formInputsList, productList, colors, categories } from './data/index'
import { productValidation } from './validations'

function App() {
  const [isOpen, setIsOpen] = useState(false)
  const [errors, setErrors] = useState<Terrors>(errorsObj)

  const [product, setProduct] = useState<TProduct>(productObj)
  const [products, setProducts] = useState<TProduct[]>(productList)
  const [tempColors, setTempColors] = useState<string[]>([])
  const [selectedCategory, setSelectedCategory] = useState(categories[0])

  const [productToEdit, setProductToEdit] = useState<TProduct>(productObj)
  const [productToEditIdx, setProductToEditIdx] = useState<number>(0)
  const [isOpenEditModal, setIsOpenEditModal] = useState(false)

  const [isOpenConfirmModal, setIsOpenConfirmModal] = useState(false)

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target
    setProduct((prev) => ({ ...prev, [name]: value }))
    setErrors((prev) => ({ ...prev, [name]: '' }))
  }

  const handleEditInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target
    setProductToEdit((prev) => ({ ...prev, [name]: value }))
    setErrors((prev) => ({ ...prev, [name]: '' }))
  }

  /* Handler */
  const openEditModal = () => {
    setIsOpenEditModal(true)
  }

  const closeEditModal = () => {
    setIsOpenEditModal(false)
  }

  const closeConfirmModal = () => setIsOpenConfirmModal(false)
  const openConfirmModal = () => setIsOpenConfirmModal(true)

  /* Render */

  const renderProductList = products.map((product, idx) => (
    <ProductCard
      key={product.id}
      product={product}
      setProductToEdit={setProductToEdit}
      openEditModal={openEditModal}
      idx={idx}
      setProductToEditIdx={setProductToEditIdx}
      openConfirmModal={openConfirmModal}
    />
  ))

  const renderProductEdit = (id: string, label: string, name: TProductName) => {
    return (
      <div className="flex flex-col mb-4 ">
        <label htmlFor={id}>{label}</label>
        <Input
          type="text"
          id={'id'}
          onChange={handleEditInputChange}
          name={name}
          value={productToEdit[name]}
        />

        <ErrorMessage msg={name} />
      </div>
    )
  }

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

      <ErrorMessage msg={errors[input.name]} />
    </div>
  ))

  const renderColors = colors.map((color) => (
    <CircleColor
      key={color}
      color={color}
      onClick={() => {
        
        if (tempColors.includes(color)) {
          setTempColors((prev) => prev.filter((c) => c !== color))
          return
        }

        if (productToEdit.colors.includes(color)) {
          setTempColors((prev) => prev.filter((item) => item !== color))
          return
        }
        setTempColors((prev) => [...prev, color])
      }}
    />
  ))

  /* ------ Handlers ------ */

  const closeModal = () => {
    setIsOpen(false)
  }

  const openModal = () => {
    setIsOpen(true)
  }

  const onCancel = () => {
    setProduct(productObj)
    setTempColors([])

    closeModal()
  }

  const removeProductHandler = () => {
    const filtered = products.filter(
      (product) => product.id !== productToEdit.id
    )

    setProducts(filtered)
    closeConfirmModal()

    toast('Product has been deleted successfully!', {
      icon: '👏',
      style: {
        backgroundColor: '#c2344d',
        color: 'white'
      }
    })
  }

  const submitHandler = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const { title, price, description, imageURL } = product

    const errors = productValidation({ title, price, description, imageURL })

    const hasError =
      Object.values(errors).some((value) => value === '') &&
      Object.values(errors).every((value) => value === '')

    if (!hasError) {
      setErrors(errors)
      return
    }

    setProduct(productObj)

    setProducts((prev) => [
      {
        ...product,
        id: uuid(),
        category: selectedCategory,
        colors: tempColors
      },
      ...prev
    ])

    setTempColors([])
    closeModal()

    toast('Product has been added successfully!', {
      icon: '👏',
      style: {
        backgroundColor: 'black',
        color: 'white'
      }
    })
  }

  const submitEditHandler = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const { title, price, description, imageURL } = productToEdit

    const errors = productValidation({ title, price, description, imageURL })

    const hasError =
      Object.values(errors).some((value) => value === '') &&
      Object.values(errors).every((value) => value === '')

    if (!hasError) {
      setErrors(errors)
      return
    }

    const updatedProducts = [...products]
    updatedProducts[productToEditIdx] = {
      ...productToEdit,
      colors: tempColors.concat(productToEdit.colors)
    }

    setProducts(updatedProducts)
    setTempColors([])
    closeEditModal()

    toast('Product has been updated successfully!', {
      icon: '👏',
      style: {
        backgroundColor: 'black',
        color: 'white'
      }
    })
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

      {/* ADD Modal */}
      <Modal closeModal={closeModal} isOpen={isOpen} title="ADD Product">
        <form onSubmit={submitHandler}>
          {renderFormInputList}

          <div className="flex flex-wrap items-center my-2 space-x-2 ">
            {tempColors.map((color) => (
              <span
                key={color}
                className="p-1 mb-1 mr-1 text-xs text-white rounded-md "
                style={{ backgroundColor: color }}
              >
                {color}
              </span>
            ))}
          </div>

          <Select
            selected={selectedCategory}
            setSelected={setSelectedCategory}
          />

          <div className="flex flex-wrap items-center mt-3 space-x-2 ">
            {renderColors}
          </div>

          <div className="flex items-center justify-between mt-2 space-x-2 ">
            <Button
              className="bg-indigo-600 hover:bg-indigo-800 "
              width="w-full"
            >
              Submit
            </Button>

            <Button
              onClick={onCancel}
              className="bg-gray-600 hover:bg-gray-800 "
              width="w-full"
            >
              Cancel
            </Button>
          </div>
        </form>
      </Modal>

      {/* EDIT Modal */}
      <Modal
        closeModal={closeEditModal}
        isOpen={isOpenEditModal}
        title="Edit This Product"
      >
        <form onSubmit={submitEditHandler}>
          {renderProductEdit('title', 'Product Title', 'title')}
          {renderProductEdit(
            'description',
            'Product description',
            'description'
          )}
          {renderProductEdit('imageURL', 'Product imageURL', 'imageURL')}
          {renderProductEdit('id', 'Product price', 'price')}
          <Select
            selected={productToEdit.category}
            setSelected={(value) =>
              setProductToEdit({ ...productToEdit, category: value })
            }
          />

          <div className="flex flex-wrap items-center space-x-1">
            {renderColors}
          </div>

          <div className="flex flex-wrap items-center space-x-1">
            {tempColors.concat(productToEdit.colors).map((color) => (
              <span
                key={color}
                className="p-1 mb-1 mr-1 text-xs text-white rounded-md"
                style={{ backgroundColor: color }}
              >
                {color}
              </span>
            ))}
          </div>

          <div className="flex items-center justify-between mt-2 space-x-2 ">
            <Button
              className="bg-indigo-600 hover:bg-indigo-800 "
              width="w-full"
            >
              Submit
            </Button>

            <Button
              onClick={closeEditModal}
              className="bg-gray-600 hover:bg-gray-800 "
              width="w-full"
            >
              Cancel
            </Button>
          </div>
        </form>
      </Modal>
    </main>
  )
}

export default App
