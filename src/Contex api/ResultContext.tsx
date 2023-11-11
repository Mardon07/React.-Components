import { createContext } from 'react';
import { SearchResult } from '../types/types';

const ResultContext = createContext([] as SearchResult[]);

export default ResultContext;
