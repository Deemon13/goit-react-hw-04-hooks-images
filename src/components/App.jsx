import { useState, useEffect } from 'react';

import { fetchImagesWithQuery } from 'services/fetch-images';

import { Layout } from './Layout/Layout';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Modal } from './Modal/Modal';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';
import { Notification } from './Notification/Notification';

const Status = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};

export function App() {
  const [images, setImages] = useState([]);
  const [status, setStatus] = useState(Status.IDLE);
  const [searchBarQuery, setSearchBarQuery] = useState('');
  const [page, setPage] = useState(1);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (!searchBarQuery) {
      return;
    }

    setStatus(Status.PENDING);

    fetchImagesWithQuery(searchBarQuery, page)
      .then(images => {
        if (images.length === 0) {
          setStatus(Status.REJECTED);
          return Promise.reject();
        }
        setImages(prevState => [...prevState, ...images]);
        setStatus(Status.RESOLVED);
      })
      .catch(() => {
        setStatus(Status.REJECTED);
      });
  }, [searchBarQuery, page]);

  if (status === Status.RESOLVED) {
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: 'smooth',
    });
  }

  const handleSubmitSearchBar = query => {
    setSearchBarQuery(query);
    setPage(1);
    setImages([]);
  };

  const openModalImage = largeImage => {
    setShowModal(largeImage);
  };

  const closeModalImage = () => {
    setShowModal(false);
  };

  return (
    <Layout>
      <Searchbar onSubmitSearch={handleSubmitSearchBar} />
      {status === Status.REJECTED && (
        <Notification
          message={`Whoops, something went wrong with you query: '${searchBarQuery}' `}
        />
      )}

      {!searchBarQuery && <Notification message="Input image for search" />}

      {images.length > 0 && (
        <ImageGallery images={images} onOpen={openModalImage} />
      )}

      {status === Status.PENDING && <Loader />}

      {showModal && (
        <Modal closeModal={closeModalImage}>
          <img src={showModal} alt="" />
        </Modal>
      )}

      {images.length > 0 && status === Status.RESOLVED && (
        <Button onButtonClick={() => setPage(page => page + 1)}></Button>
      )}
    </Layout>
  );
}
