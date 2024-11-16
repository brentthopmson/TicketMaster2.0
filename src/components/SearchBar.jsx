import React from 'react';

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: props.value || '',
    };
  }

  onChange = (e) => {
    const { value } = e.target;
    this.setState({ value });
    if (typeof this.props.onChange === 'function') {
      this.props.onChange(value);
    }
  };

  onSubmit = (e) => {
    e.preventDefault();
    if (typeof this.props.onSubmit === 'function') {
      this.props.onSubmit(this.state.value);
    }
  };

  render() {
    return (
      <div className="bg-white px-4 py-3 shadow sticky top-0 z-50 flex items-center">
        {/* Logo */}
        <a
          href="/"
          aria-label="Link to homepage"
          className="flex-none mr-4"
          onClick={this.props.onLogoClick}
        >
          <svg
            className="fill-current text-blue-600"
            width="30"
            height="30"
            viewBox="0 0 21 41"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M1.185 9.225h5.477l1.298-6.39L16.088 0l-1.863 9.225H21l-1.186 5.909H13.04L10.274 28.7c-.169.723-.339 1.81-.339 3.014 0 1.87 1.186 3.014 2.88 3.014 1.355 0 2.71-.3 3.67-.723l-1.3 6.27c-1.299.302-2.766.725-4.064.725-5.137 0-8.75-2.17-8.75-8.14 0-2.411.452-4.763.96-7.234l2.145-10.492H0l1.185-5.909"></path>
          </svg>
        </a>

        {/* Input and Search Button */}
        <form className="flex flex-1 items-center relative" onSubmit={this.onSubmit}>
          <input
            className="w-full px-4 py-2 rounded-l border border-gray-300 focus:ring focus:ring-blue-300 focus:outline-none"
            value={this.state.value}
            onChange={this.onChange}
            placeholder="Search for events, artists, or venues"
            aria-label="Search"
          />
          <button
            type="submit"
            className="px-4 bg-blue-600 text-white rounded-r focus:outline-none hover:bg-blue-700 transition"
          >
            <svg
              className="w-5 h-5"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
            >
              <path
                fill="currentColor"
                d="M11 6.5a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0zm.933 5.368l3.93 3.93a.5.5 0 0 1-.707.708l-3.93-3.93a5.5 5.5 0 1 1 .707-.708z"
              />
            </svg>
          </button>
        </form>
      </div>
    );
  }
}

export default SearchBar;
