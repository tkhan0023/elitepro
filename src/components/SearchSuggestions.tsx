import { useNavigate } from 'react-router-dom';
import { Search, TrendingUp, Tag, Percent } from 'lucide-react';
import { useEffect, useState, useCallback } from 'react';

// Product categories and their common search patterns
const SEARCH_PATTERNS = {
  shirts: {
    patterns: ['shi', 'shir', 'shirt'],
    variations: ['formal shirts', 'casual shirts', "men's shirts", 'designer shirts'],
    suggestions: [
      'affordable shirts',
      'best seller shirts',
      'premium shirts',
      'trending shirts',
      'discount shirts',
      'casual shirts',
      'formal shirts'
    ]
  },
  tshirts: {
    patterns: ['tsh', 'tshi', 'tee', 't-sh', 't sh'],
    variations: ['t-shirts', 'tee shirts', 'casual t-shirts', 'graphic tees'],
    suggestions: [
      'affordable t-shirts',
      'best seller t-shirts',
      'premium t-shirts',
      'trending t-shirts',
      'discount t-shirts',
      'casual t-shirts',
      'graphic t-shirts'
    ]
  },
  tops: {
    patterns: ['top', 'tops'],
    variations: ['women tops', 'party tops', 'casual tops', 'designer tops'],
    suggestions: [
      'affordable tops',
      'best seller tops',
      'premium tops',
      'trending tops',
      'discount tops',
      'party tops',
      'casual tops'
    ]
  },
  dresses: {
    patterns: ['dre', 'dress'],
    variations: ['party dresses', 'casual dresses', 'maxi dresses', 'designer dresses'],
    suggestions: [
      'affordable dresses',
      'best seller dresses',
      'premium dresses',
      'trending dresses',
      'discount dresses',
      'party dresses',
      'casual dresses'
    ]
  },
  sarees: {
    patterns: ['sar', 'sare', 'sari'],
    variations: ['silk sarees', 'designer sarees', 'party sarees', 'traditional sarees'],
    suggestions: [
      'affordable sarees',
      'best seller sarees',
      'premium sarees',
      'trending sarees',
      'discount sarees',
      'silk sarees',
      'designer sarees'
    ]
  },
  kurtis: {
    patterns: ['kur', 'kurt', 'kurta'],
    variations: ['embroidered kurtis', 'printed kurtis', 'designer kurtis', 'traditional kurtis'],
    suggestions: [
      'affordable kurtis',
      'best seller kurtis',
      'premium kurtis',
      'trending kurtis',
      'discount kurtis',
      'embroidered kurtis',
      'printed kurtis'
    ]
  },
  jeans: {
    patterns: ['jea', 'jean'],
    variations: ['denim jeans', 'slim fit jeans', 'straight jeans', 'ripped jeans'],
    suggestions: [
      'affordable jeans',
      'best seller jeans',
      'premium jeans',
      'trending jeans',
      'discount jeans',
      'slim fit jeans',
      'ripped jeans'
    ]
  },
  trousers: {
    patterns: ['tro', 'trou', 'pant'],
    variations: ['formal trousers', 'casual trousers', 'pleated trousers'],
    suggestions: [
      'affordable trousers',
      'best seller trousers',
      'premium trousers',
      'trending trousers',
      'discount trousers',
      'formal trousers',
      'casual trousers'
    ]
  }
};

const FILTER_KEYWORDS = {
  affordable: {
    maxPrice: 500,
    sortBy: 'price-low-high'
  },
  cheap: {
    maxPrice: 500,
    sortBy: 'price-low-high'
  },
  premium: {
    minPrice: 1000,
    sortBy: 'price-high-low'
  },
  luxury: {
    minPrice: 2000,
    sortBy: 'price-high-low'
  },
  popular: {
    bestSeller: true,
    sortBy: 'rating'
  },
  trending: {
    bestSeller: true,
    sortBy: 'rating'
  },
  best: {
    bestSeller: true,
    sortBy: 'rating'
  },
  discount: {
    sortBy: 'discount'
  },
  deal: {
    sortBy: 'discount'
  },
  offer: {
    sortBy: 'discount'
  }
};

// Helper function to calculate string similarity (Levenshtein distance)
const calculateSimilarity = (str1: string, str2: string): number => {
  const track = Array(str2.length + 1).fill(null).map(() =>
    Array(str1.length + 1).fill(null));
  for (let i = 0; i <= str1.length; i += 1) {
    track[0][i] = i;
  }
  for (let j = 0; j <= str2.length; j += 1) {
    track[j][0] = j;
  }
  for (let j = 1; j <= str2.length; j += 1) {
    for (let i = 1; i <= str1.length; i += 1) {
      const indicator = str1[i - 1] === str2[j - 1] ? 0 : 1;
      track[j][i] = Math.min(
        track[j][i - 1] + 1,
        track[j - 1][i] + 1,
        track[j - 1][i - 1] + indicator
      );
    }
  }
  return 1 - track[str2.length][str1.length] / Math.max(str1.length, str2.length);
};

// Helper function to predict category based on input
const predictCategory = (input: string): string[] => {
  const normalizedInput = input.toLowerCase().trim();
  if (normalizedInput.length < 3) return [];

  const predictions: { category: string; confidence: number }[] = [];

  Object.entries(SEARCH_PATTERNS).forEach(([category, { patterns }]) => {
    // Check for exact pattern matches first
    const hasPatternMatch = patterns.some(pattern => 
      normalizedInput.includes(pattern) || pattern.includes(normalizedInput)
    );

    if (hasPatternMatch) {
      predictions.push({ category, confidence: 1 });
      return;
    }

    // Calculate similarity with each pattern
    const maxSimilarity = Math.max(
      ...patterns.map(pattern => calculateSimilarity(normalizedInput, pattern))
    );

    if (maxSimilarity > 0.6) {
      predictions.push({ category, confidence: maxSimilarity });
    }
  });

  // Sort by confidence and return top categories
  return predictions
    .sort((a, b) => b.confidence - a.confidence)
    .slice(0, 2)
    .map(p => p.category);
};

// Helper function to get suggestions based on partial input
const getSuggestions = (input: string): string[] => {
  const normalizedInput = input.toLowerCase().trim();
  if (normalizedInput.length < 2) return [];

  let suggestions: string[] = [];
  let exactMatches: string[] = [];
  let partialMatches: string[] = [];

  Object.entries(SEARCH_PATTERNS).forEach(([category, { patterns, suggestions: categorySuggestions }]) => {
    // Check if input matches any pattern
    const matchesPattern = patterns.some(pattern => 
      normalizedInput.includes(pattern) || pattern.includes(normalizedInput)
    );

    if (matchesPattern) {
      categorySuggestions.forEach(suggestion => {
        if (suggestion.toLowerCase().includes(normalizedInput)) {
          exactMatches.push(suggestion);
        } else if (suggestion.toLowerCase().includes(category)) {
          partialMatches.push(suggestion);
        }
      });
    }
  });

  // Combine matches, removing duplicates
  suggestions = [...new Set([...exactMatches, ...partialMatches])];
  return suggestions.slice(0, 7); // Limit to 7 suggestions
};

type SearchSuggestionsProps = {
  query: string;
  visible: boolean;
  onSelect: (suggestion: string) => void;
};

const SearchSuggestions = ({ query, visible, onSelect }: SearchSuggestionsProps) => {
  const navigate = useNavigate();
  const [debouncedQuery, setDebouncedQuery] = useState(query);
  const [suggestions, setSuggestions] = useState<string[]>([]);

  // Extract filters from query
  const getFiltersFromQuery = (query: string) => {
    const words = query.toLowerCase().split(' ');
    let filters: Record<string, any> = {};

    words.forEach(word => {
      const filterConfig = FILTER_KEYWORDS[word as keyof typeof FILTER_KEYWORDS];
      if (filterConfig) {
        filters = { ...filters, ...filterConfig };
      }
    });

    return filters;
  };

  // Create URL with filters
  const createFilteredUrl = (baseUrl: string, filters: Record<string, any>) => {
    const params = new URLSearchParams();
    
    if (filters.sortBy) {
      params.set('sortBy', filters.sortBy);
    }
    if (filters.maxPrice) {
      params.set('maxPrice', filters.maxPrice.toString());
    }
    if (filters.minPrice) {
      params.set('minPrice', filters.minPrice.toString());
    }
    if (filters.bestSeller) {
      params.set('bestSeller', 'true');
    }

    const queryString = params.toString();
    return queryString ? `${baseUrl}?${queryString}` : baseUrl;
  };

  // Debounce the search query with shorter delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query);
    }, 150); // Reduced to 150ms for more responsive feel

    return () => clearTimeout(timer);
  }, [query]);

  // Update suggestions when debounced query changes
  useEffect(() => {
    if (debouncedQuery.trim().length >= 2) {
      const newSuggestions = getSuggestions(debouncedQuery);
      setSuggestions(newSuggestions);
    } else {
      setSuggestions([]);
    }
  }, [debouncedQuery]);

  if (!visible || !query.trim()) return null;

  const filters = getFiltersFromQuery(debouncedQuery);
  const suggestionItems: Array<{
    type: string;
    icon: JSX.Element;
    text: string;
    onClick: () => void;
  }> = [];

  // Add suggestions based on the query
  suggestions.forEach(suggestion => {
    const suggestionFilters = getFiltersFromQuery(suggestion);
    const combinedFilters = { ...filters, ...suggestionFilters };
    
    // Determine category from suggestion
    const category = Object.keys(SEARCH_PATTERNS).find(cat => 
      suggestion.toLowerCase().includes(cat)
    );

    let icon = <Search className="w-4 h-4 text-gray-500" />;
    if (suggestion.toLowerCase().startsWith('trending')) {
      icon = <TrendingUp className="w-4 h-4 text-blue-500" />;
    } else if (suggestion.toLowerCase().startsWith('affordable')) {
      icon = <Tag className="w-4 h-4 text-green-500" />;
    } else if (suggestion.toLowerCase().startsWith('discount')) {
      icon = <Percent className="w-4 h-4 text-red-500" />;
    }

    suggestionItems.push({
      type: 'suggestion',
      icon,
      text: suggestion,
      onClick: () => {
        if (category) {
          switch (category) {
            case 'shirts':
              navigate(createFilteredUrl('/men/shirts', combinedFilters));
              break;
            case 'tshirts':
              navigate(createFilteredUrl('/men/tshirts', combinedFilters));
              break;
            case 'jeans':
              navigate(createFilteredUrl('/men/jeans', combinedFilters));
              break;
            case 'trousers':
              navigate(createFilteredUrl('/men/trousers', combinedFilters));
              break;
            case 'tops':
              navigate(createFilteredUrl('/women/tops', combinedFilters));
              break;
            case 'dresses':
              navigate(createFilteredUrl('/women/dresses', combinedFilters));
              break;
            case 'sarees':
              navigate(createFilteredUrl('/women/sarees', combinedFilters));
              break;
            case 'kurtis':
              navigate(createFilteredUrl('/women/kurtis', combinedFilters));
              break;
            default:
              navigate(createFilteredUrl('/search', {
                ...combinedFilters,
                q: suggestion,
                category: category.charAt(0).toUpperCase() + category.slice(1)
              }));
          }
        } else {
          navigate(createFilteredUrl('/search', {
            ...combinedFilters,
            q: suggestion
          }));
        }
      }
    });
  });

  // If we have no suggestions but query is long enough, show generic search
  if (suggestionItems.length === 0 && query.trim().length >= 3) {
    suggestionItems.push({
      type: 'category',
      icon: <Search className="w-4 h-4 text-gray-500" />,
      text: `Search "${query}" in all categories`,
      onClick: () => navigate(createFilteredUrl('/search', {
        ...filters,
        q: query
      }))
    });
  }

  return (
    <div className="absolute top-full left-0 right-0 mt-1 bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden z-50">
      <div className="p-2">
        {suggestionItems.map((suggestion, index) => (
          <button
            key={index}
            onClick={() => {
              suggestion.onClick();
              onSelect(suggestion.text);
            }}
            className="w-full text-left px-3 py-2 hover:bg-gray-50 rounded flex items-center gap-3 group transition-colors"
          >
            {suggestion.icon}
            <span className="text-sm text-gray-700 group-hover:text-gray-900">{suggestion.text}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default SearchSuggestions; 