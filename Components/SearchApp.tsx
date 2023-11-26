import React, { useState, useEffect } from 'react';
import SearchBar from './SearchBar';
import SearchResults from './SearchResults';
import Pagination from './Pagination';
import { getSearchResults } from '../pages/api/request';
import type { RootState } from '../src/store/store';
import { useSelector, useDispatch } from 'react-redux';
import { getPeoples, setLoading } from '../src/store/slices/result.slice';
import { useGetSearchResultsQuery } from '../src/store/api/apiSlices';
import { useRouter } from 'next/router';

interface SearchAppProps {
  children?: React.ReactNode;
}
const SearchApp: React.FC<SearchAppProps> = ({ children }) => {
  const router = useRouter();

  const term = useSelector((state: RootState) => state.searchTerm.term);

  const [currentPage, setCurrentPage] = useState<number>(
    router?.query?.id ? +router.query.id : 1
  );

  const dispatch = useDispatch();
  const [error, setError] = useState<string | null>(null);
  const [itemsPerPage, setItemsPerPage] = useState<number>(10);
  const { data: results } = useGetSearchResultsQuery({
    searchTerm: term,
    page: currentPage,
  });
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
    router.push(`/page/${page}`);
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
    <>
      <div className="search-app">
        <div>
          <h1>Star Wars Search</h1>

          <SearchBar onThrowError={throwError} />
          <SearchResults error={error} />
          <Pagination
            currentPage={currentPage}
            onPageChange={handlePageChange}
            onItemsPerPageChange={handleItemsPerPageChange}
          />
        </div>
        <main className="main-data-container">{children}</main>
      </div>
    </>
  );
};

export default SearchApp;
