import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom'
import Loading from '../../components/Loading';
import { getDateFromTimeStamp } from '../../Helpers';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { isModalOpen, openModal } from '../../store/modal';
import { clearErrors, deleteProduct, onDeleteSuccess, productsState } from '../../store/products';

type ProductProps = {
  id: string,
  name: string,
  avatar: string,
  createdAt: string,
  price: number,
  category: string,
  description: string,
  developerEmail: string
}

type From = {
  hash: string,
  key: string,
  pathname: string,
  search: string,
  state: null
}

type State = {
  details: ProductProps,
  from: From
}

const Product: React.FC = () => {
  const navigate = useNavigate();
  const isOpen = useAppSelector(isModalOpen);
  const dispatch = useAppDispatch();
  const location = useLocation();
  const { deleteStatus } = useAppSelector(productsState);

  const [productDetails, setProductDetails] = useState<ProductProps>({
    id: "string",
    name: "string",
    avatar: "string",
    createdAt: "string",
    price: 0,
    category: "string",
    description: "string",
    developerEmail: "string"
  });

  useEffect(() => {
    if (location.state) {
      const { details } = location.state as State;
      setProductDetails(details);
    } else {
      //Navigate to /products if an url is directly entered to navigate to product details on a newly opened tab
      navigate('/products');
    }
  }, [location, navigate]);

  useEffect(() => {
    if (deleteStatus === 'failed') { // Set error to '' after error modal pops up
      dispatch(clearErrors());
    } else if (deleteStatus === 'success') { //If status is success set status back to idle and navigate to /products
      dispatch(onDeleteSuccess());
      navigate('/products', { state: { from: location } });
    }
  }, [deleteStatus, dispatch, location, navigate])

  return (
    <div className="flex flex-grow mt-10 flex-col items-center">
      <div className="flex flex-col flex-grow w-11/12 sm:w-8/12 items-center">
        <div className="flex flex-row w-full justify-between p-2">
          <div className="flex w-48 h-48 sm:h-52 justify-center bg-white rounded-lg items-center mr-6">
            <img alt={`img-${productDetails.id}`} src={`${productDetails.avatar}`} className="h-24" />
          </div>
          <div className="flex flex-col h-48 sm:h-52 w-full justify-between px-1 py-">
            {/* Slicing the name, email and price because of there is no length constraint for the inputs taken from user.
             I know that is not the best practice but its a work around for the demo. */}
            <header className="font-bold text-gray-600 text-md sm:text-lg md:text-2xl overflow-hidden">{productDetails.name.slice(0, 50)}</header>
            <header className="font-semibold text-gray-600 text-sm sm:text-md md:text-xl">{`Created at ${getDateFromTimeStamp(parseInt(productDetails.createdAt))}`}</header>
            <header className="font-semibold text-gray-600 text-sm sm:text-md md:text-xl">{`Added by ${productDetails.developerEmail}`}</header>
            <header className="font-semibold text-gray-600 text-sm sm:text-md md:text-xl">{`$${productDetails.price.toLocaleString('en-US', { minimumFractionDigits: 2 })}`}</header>
          </div>
        </div>
        <div className="w-full h-2 my-1 px-4">
          <div className="w-full h-full border-b-2 border-gray-500" />
        </div>
        <div className="w-full flex flex-col flex-grow p-2">
          <header className="font-semibold text-gray-700 text-sm sm:text-md md:text-xl">Description</header>
          <header className="flex-wrap text-gray-700 text-xs md:text-base">{productDetails.description}</header>
        </div>
      </div>
      {
        deleteStatus === 'loading' ? (
          <div className="fixed bottom-10 w-14 right-0 md:right-14">
            <Loading />
          </div>
        ) : (
          <img
            data-cy="delete-product-btn"
            alt="add-product"
            src={"/delete.png"}
            //Check if modal is button and hide the delete button
            className={`fixed bottom-10 w-14 right-0 md:right-14 delay-150 hover:scale-125 duration-300 hover:cursor-pointer z-30 ${isOpen ? 'hidden' : ''}`}
            onClick={() => dispatch(openModal({ //Open the modal with given details
              title: 'Delete Product',
              text: `Are you sure want to delete ${productDetails.name}`,
              isConfirmButtonActive: true,
              confirmButtonText: 'Yes',
              onConfirm: () => dispatch(deleteProduct(productDetails.id))
            }))}
          />
        )
      }

    </div>
  );
}

export default Product;
