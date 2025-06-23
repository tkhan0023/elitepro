import { Link } from 'react-router-dom';

const FeaturedCategories = () => {
  const categories = [
    {
      title: "Men's Fashion",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      link: "/men/shirts",
      disabled: false
    },
    {
      title: "Women's Fashion",
      image: "https://images.pexels.com/photos/994234/pexels-photo-994234.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      link: "/women/kurtis",
      disabled: false
    },
    {
      title: "Kids Collection",
      image: "https://images.unsplash.com/photo-1503919545889-aef636e10ad4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      link: "/kids",
      disabled: true
    },
    {
      title: "Beauty & Wellness",
      image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      link: "/beauty",
      disabled: true
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="font-display text-3xl font-medium text-center mb-12 text-gray-800">Shop by Category</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            category.disabled ? (
              <div 
                key={index}
                className="group relative overflow-hidden rounded-lg shadow-lg cursor-not-allowed select-none"
              >
                <div className="aspect-square relative">
                  <img 
                    src={category.image}
                    alt={category.title}
                    className="w-full h-full object-cover filter grayscale"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-50"></div>
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
                    <h3 className="text-lg font-normal text-white mb-2">{category.title}</h3>
                    <span className="text-sm bg-white/20 px-3 py-1 rounded-full">Coming Soon</span>
                  </div>
                </div>
              </div>
            ) : (
              <Link 
                key={index}
                to={category.link}
                className="group relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <div className="aspect-square relative">
                  <img 
                    src={category.image}
                    alt={category.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-30 group-hover:bg-opacity-40 transition-opacity duration-300"></div>
                  <div className="absolute bottom-4 left-4 text-white">
                    <h3 className="text-lg font-normal text-white">{category.title}</h3>
                  </div>
                </div>
              </Link>
            )
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedCategories;
