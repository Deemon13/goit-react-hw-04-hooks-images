import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {
  Headerform,
  SearchForm,
  SearchFormButton,
  SearchFormButtonLabel,
  SearchFormInput,
  SeachImage,
} from './Searchbar.styled';

export class Searchbar extends Component {
  state = {
    query: '',
  };

  handleQueryChange = event => {
    this.setState({ query: event.currentTarget.value.toLowerCase().trim() });
  };

  handleSubmit = event => {
    event.preventDefault();
    if (this.state.query.trim() === '') {
      alert('Empty search!');
      return;
    }
    this.props.onSubmitSearch(this.state.query);
    this.setState({ query: '' });
  };

  render() {
    return (
      <Headerform>
        <SearchForm onSubmit={this.handleSubmit}>
          <SearchFormButton type="submit">
            <SeachImage />
            <SearchFormButtonLabel>Search</SearchFormButtonLabel>
          </SearchFormButton>

          <SearchFormInput
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            onChange={this.handleQueryChange}
            value={this.state.query}
          />
        </SearchForm>
      </Headerform>
    );
  }
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func,
};
