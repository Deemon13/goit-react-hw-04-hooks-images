import { useState, useEffect } from 'react';

import { fetchImagesWithQuery } from 'services/fetch-images';

import { Layout } from './Layout/Layout';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Modal } from './Modal/Modal';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';
import { Notification } from './Notification/Notification';

export function App() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchBarQuery, setSearchBarQuery] = useState('');
  const [page, setPage] = useState(1);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    // setLoading(true);
    if (!searchBarQuery) {
      return;
    }

    // setLoading(true);

    fetchImages(searchBarQuery, page);
    // .finally(setLoading(false));
    // setLoading(false);
  }, [searchBarQuery, page]);

  const fetchImages = (query, page) => {
    fetchImagesWithQuery(query, page)
      .then(
        images => {
          console.log('then');
          if (images.length !== 0) {
            console.log('no error');
            setImages(prevState => [...prevState, ...images]);
          }
          console.log('error');
          setError(error);
          return;
        }
        // setLoading(false);
        // return;
        // }
        // setLoading(false);
        // return;
      )
      .catch(error => {
        console.log('error');
        setError(error);
      })
      .finally(() => {
        console.log('finally');
        setLoading(false);
      });
  };

  if (!loading) {
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
      {error && (
        <Notification
          message={`Whoops, something went wrong: ${error.message}`}
        />
      )}

      {!searchBarQuery && <Notification message="Input image for search" />}

      {images.length > 0 && (
        <ImageGallery images={images} onOpen={openModalImage} />
      )}

      {loading && <Loader />}

      {showModal && (
        <Modal closeModal={closeModalImage}>
          <img src={showModal} alt="" />
        </Modal>
      )}

      {images.length > 0 && !loading && (
        <Button onButtonClick={() => setPage(page => page + 1)}></Button>
      )}
    </Layout>
  );
}
