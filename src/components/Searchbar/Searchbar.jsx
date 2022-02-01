import { useState } from 'react';
import PropTypes from 'prop-types';

import {
  Headerform,
  SearchForm,
  SearchFormButton,
  SearchFormButtonLabel,
  SearchFormInput,
  SeachImage,
} from './Searchbar.styled';

export function Searchbar({ onSubmitSearch }) {
  const [query, setQuery] = useState('');

  const handleQueryChange = event => {
    setQuery(event.currentTarget.value.toLowerCase().trim());
  };

  const handleSubmit = event => {
    event.preventDefault();
    if (query.trim() === '') {
      alert('Empty search!');
      return;
    }
    onSubmitSearch(query);
    setQuery('');
  };

  return (
    <Headerform>
      <SearchForm onSubmit={handleSubmit}>
        <SearchFormButton type="submit">
          <SeachImage />
          <SearchFormButtonLabel>Search</SearchFormButtonLabel>
        </SearchFormButton>

        <SearchFormInput
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          onChange={handleQueryChange}
          value={query}
        />
      </SearchForm>
    </Headerform>
  );
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func,
};
