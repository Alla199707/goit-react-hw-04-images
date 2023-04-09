import PropTypes from 'prop-types';
import { Component, useState } from 'react';
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
      alert('Please enter a request!');
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
// class Search extends Component {
//   state = {
//     searchText: '',
//   };

//   handleChange = event => {
//     this.setState({ searchText: event.currentTarget.value.toLowerCase() });
//   };

//   handleSubmit = e => {
//     e.preventDefault();

//     if (this.state.searchText.trim() === '') {
//       alert('Please enter a request!');
//       return;
//     }

//     this.props.createSearchText(this.state.searchText);
//     this.setState({ searchText: '' });
//   };

//   render() {
//     return (
//       <Header>
//         <Form onSubmit={this.handleSubmit}>
//           <Button type="submit">
//             <Label>
//               <BsSearch />
//             </Label>
//           </Button>
//           <Input
//             type="text"
//             autoComplete="off"
//             autoFocus
//             placeholder="Search images and photos"
//             onChange={this.handleChange}
//             value={this.state.searchText}
//           />
//         </Form>
//       </Header>
//     );
//   }
// }

Search.propTypes = {
  createSearchText: PropTypes.func.isRequired,
};

export default Search;
