import React, { Component } from "react";
import { getMovies } from "../services/fakeMovieService";
import ListGroup from "./common/listGroup";
import MoviesTable from "./moviesTable";
import Search from "./common/search";
import Pagination from "./common/pagination";
import { paginate } from "../utils/paginate";
import { getGenres } from "../services/fakeGenreService";
import { Link } from "react-router-dom";
import _ from "lodash";
import { waitForElementToBeRemoved } from "@testing-library/react";

class Movies extends Component {
  state = {
    movies: [],
    genres: [],
    currentPage: 1,
    pageSize: 4,
    searchQuery: "",
    selectedGenre: null,
    sortColumn: { path: "title", order: "asc" }
  };

  componentDidMount() {
    const genres = [{ _id: "", name: "All Genres" }, ...getGenres()];
    this.setState({ movies: getMovies(), genres });
    console.log(genres);
  }

  updateData = config => {
    this.setState(config);
  };

  handleDelete = movieId => {
    const movies = this.state.movies.filter(m => m._id !== movieId);
    this.setState({ movies });
  };

  handleLike = movie => {
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movies[index] = { ...movies[index] };
    movies[index].liked = !movies[index].liked;
    this.setState({ movies });
  };

  handlePageChange = page => {
    this.setState({ currentPage: page });
  };

  handleGenreSelect = genre => {
    this.setState({ selectedGenre: genre, searchQuery: "", currentPage: 1 });
  };

  handleSort = sortColumn => {
    this.setState({ sortColumn });
  };

  handleSearch = query => {
    this.setState({ searchQuery: query, selectedGenre: null, currentPage: 1 });
  };

  getPageData = () => {
    const {
      pageSize,
      currentPage,
      movies,
      searchQuery,
      selectedGenre,
      sortColumn
    } = this.state;

    let filtered = movies;
    if (searchQuery) {
      filtered = movies.filter(m =>
        m.title.toLowerCase().startsWith(searchQuery.toLowerCase())
      );
    } else if (selectedGenre && selectedGenre._id) {
      filtered = movies.filter(m => m.genre._id === selectedGenre._id);
    }
    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

    const allMovies = paginate(sorted, currentPage, pageSize);

    return { totalCount: filtered.length, allMovies };
  };

  render() {
    const { length: count } = this.state.movies;
    const { pageSize, currentPage, searchQuery, sortColumn } = this.state;
    if (count === 0) return "There are no movies in the database.";

    const { totalCount, allMovies } = this.getPageData();
    return (
      <div className="row">
        <div className="col-3">
          <ListGroup
            items={this.state.genres}
            selectedItem={this.state.selectedGenre}
            onItemSelect={this.handleGenreSelect}
          />
        </div>

        <div className="col">
          <Link
            to="/movies/new"
            className="btn btn-primary"
            style={{
              marginBottom: 20
            }}
          >
            New Movie
          </Link>
          <p>Showing {totalCount} movies in the database.</p>

          <Search value={searchQuery} onChange={this.handleSearch} />

          <MoviesTable
            allMovies={allMovies}
            sortColumn={sortColumn}
            onLike={this.handleLike}
            onSort={this.handleSort}
            onDelete={this.handleDelete}
          />
          <Pagination
            itemsCount={totalCount}
            pageSize={pageSize}
            onPageChange={this.handlePageChange}
            currentPage={currentPage}
          />
        </div>
      </div>
    );
  }
}

export default Movies;
