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
  // state = {
  //   images: [],
  //   loading: false,
  //   error: null,
  //   searchBarQuery: '',
  //   page: 1,
  //   showModal: false,
  // };

  useEffect(() => {
    if (searchBarQuery === '') {
      return;
    }
    fetchImages();
    if (!loading) {
      window.scrollTo({
        top: document.body.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, []);

  // componentDidUpdate(prevProps, prevState) {
  //   const prevQuery = prevState.searchBarQuery;
  //   const nextQuery = this.state.searchBarQuery;

  //   if (prevQuery !== nextQuery) {
  //     this.fetchImages();
  //   }

  //   if (!this.state.loading) {
  //     window.scrollTo({
  //       top: document.body.scrollHeight,
  //       behavior: 'smooth',
  //     });
  //   }
  // }

  const fetchImages = () => {
    // const { searchBarQuery, page } = this.state;
    setLoading(true);
    fetchImagesWithQuery(searchBarQuery, page)
      .then(images => setImages(prevState => [...prevState, ...images]))
      // setPage(page + 1);

      .catch(error => setError(error))
      .finally(() => setLoading(false));
  };

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

  // const { searchBarQuery, images, loading, error, showModal } = this.state;
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
        <Button onButtonClick={fetchImages}></Button>
      )}
    </Layout>
  );
}
