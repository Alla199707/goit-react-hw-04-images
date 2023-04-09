import { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Container } from './Container/Container.styled';
import Search from './Searchbar/Searchbar';
import fetchImages from '../services/API';
import ImageGallery from './ImageGallery/ImageGallery';
import ButtonLoadMore from './Button/Button';
import Modal from './Modal/Modal';
import Loader from './Loader/Loader';

export function App() {
  const [searchText, setSearchText] = useState('');
  const [images, setImages] = useState([]);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isShowModal, setIsShowModal] = useState(false);
  const [modalImage, setModalImage] = useState('');

  useEffect(() => {
    if (!searchText || !page) {
      return;
    }

    const createGallery = async () => {
      setIsLoading(true);

      try {
        const data = await fetchImages(searchText, page);

        if (data.hits.length === 0) {
          toast.error('Something went wrong. Please try again!');
        }
        setImages(images => [...images, ...data.hits]);
      } catch (error) {
        setError(error);
        toast.error('Oops something went wrong...');
      } finally {
        setIsLoading(false);
      }
    };
    createGallery();
  }, [searchText, page]);

  const createSearchText = searchText => {
    setSearchText(searchText);
    setImages([]);
    setPage(1);
  };

  const imageClick = imageUrl => {
    setModalImage(imageUrl);
    setIsShowModal(true);
  };

  const toggleModal = () => {
    setIsShowModal(!isShowModal);
  };

  const onLoadMore = () => {
    setPage(prevState => prevState + 1);
  };

  const lengthImages = images.length >= 12;
  return (
    <Container>
      <Search createSearchText={createSearchText} />
      {error}
      {images.length > 0 && (
        <ImageGallery items={images} getItemClick={imageClick} />
      )}
      {isLoading && <Loader />}
      {!isLoading && lengthImages && (
        <ButtonLoadMore onLoadMore={() => onLoadMore} />
      )}
      {isShowModal && <Modal image={modalImage} onClose={toggleModal} />}
      <ToastContainer />
    </Container>
  );
}
