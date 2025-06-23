
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import { useState } from 'react';

const ProductListing = () => {
  const [sortBy, setSortBy] = useState('relevance');
  const [filters, setFilters] = useState({
    gender: [],
    category: ['shirts'],
    priceRange: [],
    brands: [],
    colors: [],
    sizes: []
  });

  const products = Array.from({ length: 12 }, (_, i) => ({
    id: i + 1,
    title: `Men's ${['Striped', 'Solid', 'Checkered', 'Printed'][i % 4]} Shirt`,
    brand: ['NETPLAY', 'FYEROGLER', 'BASICS', 'AJIO'][i % 4],
    price: Math.floor(Math.random() * 500) + 200,
    originalPrice: Math.floor(Math.random() * 500) + 600,
    discount: Math.floor(Math.random() * 60) + 30,
    image: `https://images.unsplash.com/photo-${1596755094514 + i}?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80`,
    rating: +(Math.random() * 2 + 3).toFixed(1),
    reviews: Math.floor(Math.random() * 500) + 50,
    isBestseller: i % 5 === 0
  }));

  const filterOptions = [
    {
      title: 'Gender',
      options: [
        { label: 'Men', count: '112,122' },
        { label: 'Women', count: '2' }
      ]
    },
    {
      title: 'Category',
      options: [
        { label: 'Shirts', count: '112,124', checked: true },
        { label: 'T-shirts', count: '4' }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <nav className="text-xs text-gray-600 mb-4">
          <span>Home / Men / Western Wear / </span>
          <span className="text-gray-900 font-medium">Shirts</span>
        </nav>
        
        <div className="flex flex-col lg:flex-row gap-8">
          <aside className="lg:w-1/4 space-y-6">
            <div className="bg-white rounded-lg p-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Refine By</h3>
                <span className="text-gray-500">↑</span>
              </div>
              
              {filterOptions.map((filter, index) => (
                <div key={index} className="border-t border-gray-200 pt-4 mt-4">
                  <div className="flex justify-between items-center mb-3">
                    <h4 className="text-sm font-medium text-gray-900">{filter.title}</h4>
                    <span className="text-gray-500">↓</span>
                  </div>
                  
                  <div className="space-y-2">
                    {filter.options.map((option, optionIndex) => (
                      <label key={optionIndex} className="flex items-center text-sm text-gray-600">
                        <input 
                          type="checkbox" 
                          className="mr-2 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                          defaultChecked={option.checked}
                        />
                        {option.label} ({option.count})
                      </label>
                    ))}
                  </div>
                </div>
              ))}
              
              {['Price', 'Brands', 'Occasion', 'Discount', 'Colors', 'Size & Fit', 'Tags', 'Rating'].map((filter) => (
                <div key={filter} className="border-t border-gray-200 pt-4 mt-4">
                  <div className="flex justify-between items-center">
                    <h4 className="text-sm font-medium text-gray-900">{filter}</h4>
                    <span className="text-gray-500">+</span>
                  </div>
                </div>
              ))}
            </div>
          </aside>
          
          <section className="lg:w-3/4">
            <div className="mb-6">
              <p className="text-xs text-gray-600 uppercase mb-1">Men's</p>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Shirts</h2>
              <p className="text-sm text-gray-600 leading-relaxed">
                Shirts are the foundation of a sharp wardrobe, combining style and comfort for every occasion. 
                Whether you prefer crisp formal shirts or relaxed casual styles, choosing the right fit and fabric 
                is key to looking your best.
                <button className="text-blue-600 hover:underline ml-1">Read More</button>
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 bg-white p-4 rounded-lg">
              <p className="text-sm text-gray-900 font-medium">112,127 Items Found</p>
              
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-600">SORT BY</span>
                  <select 
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="border border-gray-300 rounded-md py-1 px-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="relevance">Relevance</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="newest">Newest</option>
                  </select>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </section>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ProductListing;
