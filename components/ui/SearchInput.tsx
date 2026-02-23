"use client";
import { Search, Loader2, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { Product, ProductApiResponse } from "@/types/product";
import { productAPI } from "@/lib/productAPI";
import { useRouter } from "next/navigation";

interface SearchProps {
  placeholder?: string;
  button?: boolean;
  onSearch?: (val: string) => void;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  showDropdown?: boolean;
}

interface ProductSearchResult {
  id: number;
  name: string;
  description: string;
  slug: string;
  price?: number;
  sku?: string;
  in_stock?: boolean;
}

export const SearchInput = ({
  placeholder = "Search for medicines...",
  button,
  onSearch,
  value,
  onChange,
  showDropdown = true,
}: SearchProps) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [suggestions, setSuggestions] = useState<ProductSearchResult[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Debounced search - wait 300ms after user stops typing
  useEffect(() => {
    const timer = setTimeout(() => {
      const searchTerm = value?.trim();
      if (searchTerm && searchTerm.length >= 2 && showDropdown) {
        fetchSuggestions(searchTerm);
      } else {
        setSuggestions([]);
        setIsOpen(false);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [value, showDropdown]);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        !inputRef.current?.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const fetchSuggestions = async (query: string) => {
    setIsLoading(true);
    try {
      // Call backend API: GET /products/search?q={query}&limit=5&page=1
      const response: ProductApiResponse = await productAPI.searchProducts({
        q: query,
        limit: 5,
        page: 1,
      });

      // Transform backend response to search results
      // Backend returns: { data: Product[], meta: { page, limit, total, pages } }
      // Each Product has: product_translations[] with name, description
      const results: ProductSearchResult[] = response.data
        .filter((product) => product.is_active) // Only show active products
        .map((product) => {
          const translation = product.product_translations[0];
          return {
            id: product.id,
            name: translation?.name || "Untitled Product",
            description: translation?.description?.replace(/<[^>]*>/g, '').substring(0, 80) || "",
            slug: product.slug,
            price: product.price ? Number(product.price) : undefined,
            sku: product.sku,
            in_stock: product.in_stock,
          };
        });

      setSuggestions(results);
      setIsOpen(results.length > 0);
      setHighlightedIndex(-1);
    } catch (error) {
      console.error("Failed to fetch suggestions:", error);
      setSuggestions([]);
      setIsOpen(false);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(e);
    onSearch?.(e.target.value);
    setIsOpen(true);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!isOpen || suggestions.length === 0) return;

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setHighlightedIndex((prev) =>
          prev < suggestions.length - 1 ? prev + 1 : 0
        );
        break;
      case "ArrowUp":
        e.preventDefault();
        setHighlightedIndex((prev) =>
          prev > 0 ? prev - 1 : suggestions.length - 1
        );
        break;
      case "Enter":
        e.preventDefault();
        if (highlightedIndex >= 0 && highlightedIndex < suggestions.length) {
          handleProductSelect(suggestions[highlightedIndex]);
        }
        break;
      case "Escape":
        setIsOpen(false);
        inputRef.current?.blur();
        break;
    }
  };

  const handleProductSelect = (product: ProductSearchResult) => {
    // Navigate to product detail page using slug
    router.push(`/products/${product.slug}`);
    setIsOpen(false);
    setSuggestions([]);
    inputRef.current?.blur();
  };

  const clearSearch = () => {
    onChange?.({
      target: { value: "" },
    } as React.ChangeEvent<HTMLInputElement>);
    setSuggestions([]);
    setIsOpen(false);
    inputRef.current?.focus();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const searchTerm = value?.trim();
    if (searchTerm) {
      // Navigate to products page with search query
      router.push(`/products?q=${encodeURIComponent(searchTerm)}`);
      setIsOpen(false);
      setSuggestions([]);
    }
  };

  return (
    <div className="relative w-full max-w-2xl mx-auto" ref={dropdownRef}>
      <form onSubmit={handleSubmit}>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative group"
        >
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400 group-focus-within:text-blue-600 transition-colors" />
          </div>
          <input
            ref={inputRef}
            type="text"
            className="block w-full pl-12 pr-20 py-4 bg-white border border-gray-200 rounded-full shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-gray-700"
            placeholder={placeholder}
            value={value}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            onFocus={() => suggestions.length > 0 && setIsOpen(true)}
          />
          <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
            {isLoading && (
              <Loader2 className="h-5 w-5 text-blue-500 animate-spin" />
            )}
            {value && !isLoading && (
              <button
                type="button"
                onClick={clearSearch}
                className="p-1 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="h-4 w-4 text-gray-400" />
              </button>
            )}
            {button && (
              <button
                type="submit"
                className="btn-gradient text-white px-6 py-2 rounded-full font-medium transition-colors"
              >
                Search
              </button>
            )}
          </div>
        </motion.div>
      </form>

      {/* Search Results Dropdown */}
      <AnimatePresence>
        {isOpen && showDropdown && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden z-50"
          >
            {isLoading ? (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="h-6 w-6 text-blue-500 animate-spin" />
                <span className="ml-2 text-gray-500">Searching products...</span>
              </div>
            ) : suggestions.length > 0 ? (
              <ul className="max-h-96 overflow-y-auto">
                {suggestions.map((product, index) => (
                  <li
                    key={product.id}
                    onClick={() => handleProductSelect(product)}
                    className={`px-4 py-4 flex justify-between cursor-pointer transition-colors border-b border-gray-50 last:border-b-0 ${
                      index === highlightedIndex
                        ? "bg-blue-50"
                        : "hover:bg-gray-50"
                    }`}
                  >
                    <div className="w-full flex gap-4">
                      <div className="flex flex-col min-w-0 flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <p className="font-semibold text-gray-900 truncate">
                            {product.name}
                          </p>
                          {product.in_stock !== undefined && (
                            <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${product.in_stock ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                              {product.in_stock ? 'In Stock' : 'Out of Stock'}
                            </span>
                          )}
                        </div>
                        {product.description && (
                          <p className="text-sm text-gray-500 truncate mt-0.5">
                            {product.description}
                          </p>
                        )}
                        {product.sku && (
                          <p className="text-xs text-gray-400 mt-1">SKU: {product.sku}</p>
                        )}
                      </div>
                      <div className="flex flex-col items-end gap-1">
                        {product.price && (
                          <p className="text-blue-600 font-bold text-lg whitespace-nowrap">
                            £{product.price.toFixed(2)}
                          </p>
                        )}
                        <p className="text-xs text-gray-400">Click to view</p>
                      </div>
                    </div>
                  </li>
                ))}
                <li
                  onClick={() => {
                    const searchTerm = value?.trim();
                    if (searchTerm) {
                      router.push(`/products?q=${encodeURIComponent(searchTerm)}`);
                      setIsOpen(false);
                    }
                  }}
                  className="px-4 py-3 text-center text-blue-600 font-medium hover:bg-blue-50 cursor-pointer transition-colors border-t border-gray-100"
                >
                  View all results →
                </li>
              </ul>
            ) : (
              <div className="flex items-center justify-center py-8 text-gray-500">
                No products found
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};