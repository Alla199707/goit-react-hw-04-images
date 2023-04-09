import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import { useState } from 'react';
import { BsSearch } from 'react-icons/bs';
import { Button, Form, Header, Input, Label } from './Searchbar.styled';

function Search({ createSearchText }) {
  const [searchText, setSearchText] = useState('');

  const handleChange = event => {
    setSearchText(event.currentTarget.value.toLowerCase());
  };

  const handleSubmit = e => {
    e.preventDefault();

    if (searchText.trim() === '') {
      toast('Please enter a request!');
      return;
    }
    createSearchText(searchText);
    setSearchText('');
  };

  return (
    <Header>
      <Form onSubmit={handleSubmit}>
        <Button type="submit">
          <Label>
            <BsSearch />
          </Label>
        </Button>
        <Input
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          onChange={handleChange}
          value={searchText}
        />
      </Form>
    </Header>
  );
}
Search.propTypes = {
  createSearchText: PropTypes.func.isRequired,
};

export default Search;
