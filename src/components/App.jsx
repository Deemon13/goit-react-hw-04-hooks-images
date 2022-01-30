import React, { Component } from 'react';

import { fetchImagesWithQuery } from 'services/fetch-images';

import { Layout } from './Layout/Layout';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Modal } from './Modal/Modal';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';
import { Notification } from './Notification/Notification';

export class App extends Component {
  state = {
    images: [],
    loading: false,
    error: null,
    searchBarQuery: '',
    page: 1,
    showModal: false,
  };

  componentDidUpdate(prevProps, prevState) {
    const prevQuery = prevState.searchBarQuery;
    const nextQuery = this.state.searchBarQuery;

    if (prevQuery !== nextQuery) {
      this.fetchImages();
    }

    if (!this.state.loading) {
      window.scrollTo({
        top: document.body.scrollHeight,
        behavior: 'smooth',
      });
    }
  }

  fetchImages = () => {
    const { searchBarQuery, page } = this.state;
    this.setState({ loading: true });
    fetchImagesWithQuery(searchBarQuery, page)
      .then(images =>
        this.setState(prevState => ({
          images: [...prevState.images, ...images],
          page: prevState.page + 1,
        }))
      )
      .catch(error => this.setState({ error }))
      .finally(() => this.setState({ loading: false }));
  };

  handleSubmitSearchBar = query => {
    this.setState({ searchBarQuery: query, page: 1, images: [] });
  };

  openModalImage = largeImage => {
    this.setState({ showModal: largeImage });
  };

  closeModalImage = () => {
    this.setState({ showModal: false });
  };

  render() {
    const { searchBarQuery, images, loading, error, showModal } = this.state;
    return (
      <Layout>
        <Searchbar onSubmitSearch={this.handleSubmitSearchBar} />
        {error && (
          <Notification
            message={`Whoops, something went wrong: ${error.message}`}
          />
        )}

        {!searchBarQuery && <Notification message="Input image for search" />}

        {images.length > 0 && (
          <ImageGallery images={images} onOpen={this.openModalImage} />
        )}

        {loading && <Loader />}

        {showModal && (
          <Modal closeModal={this.closeModalImage}>
            <img src={showModal} alt="" />
          </Modal>
        )}

        {images.length > 0 && !loading && (
          <Button onButtonClick={this.fetchImages}></Button>
        )}
      </Layout>
    );
  }
}
