import React, { useState, useEffect } from 'react';
import SearchBar from '../Components/SearchBar';
import SearchResults from '../Components/SearchResults';
import Pagination from '../Components/Pagination';
import { getSearchResults } from '../api/request';
import { Outlet, useNavigate, useParams } from 'react-router-dom';
import type { RootState } from '../store/store';
import { useSelector, useDispatch } from 'react-redux';
import { getPeoples, setLoading } from '../store/slices/result.slice';
import { useGetSearchResultsQuery } from '../store/api/apiSlices';

const SearchApp: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const term = useSelector((state: RootState) => state.searchTerm.term);

  const [currentPage, setCurrentPage] = useState<number>(+id!);
  const { data: results } = useGetSearchResultsQuery({
    searchTerm: term,
    page: currentPage,
  });

  const dispatch = useDispatch();
  const [error, setError] = useState<string | null>(null);
  const [itemsPerPage, setItemsPerPage] = useState<number>(10);

  useEffect(() => {
    results && dispatch(getPeoples(results?.results));
    dispatch(setLoading(false));
  }, [dispatch, results]);

  useEffect(() => {
    performAPICall(term, currentPage);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [itemsPerPage, currentPage]);

  const performAPICall = async (term: string, page: number) => {
    dispatch(setLoading(true));
    try {
      const { results: responseResults } = await getSearchResults(
        term,
        page,
        itemsPerPage
      );
      setError(null);

      dispatch(getPeoples(responseResults));
    } catch (error) {
      setError('An error occurred');
      dispatch(getPeoples([]));
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handlePageChange = (page: number) => {
    navigate(`/page/${page}`);
    setCurrentPage(page);
    dispatch(setLoading(true));
  };

  const handleItemsPerPageChange = (newItemsPerPage: number) => {
    setItemsPerPage(newItemsPerPage);
  };

  const throwError = () => {
    setError('Error has occurred!');
  };

  return (
    <div className="search-app">
      <h1>Star Wars Search</h1>

      <div>
        <SearchBar onThrowError={throwError} />
        <SearchResults error={error} />
        <Pagination
          currentPage={currentPage}
          onPageChange={handlePageChange}
          onItemsPerPageChange={handleItemsPerPageChange}
        />
        <main className="main-data-container">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default SearchApp;
