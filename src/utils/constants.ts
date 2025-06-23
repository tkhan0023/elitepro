import { Category, MenuItem } from '@/types';

export const CATEGORIES: Category[] = [
  {
    title: "Men's Fashion",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    link: "/men"
  },
  {
    title: "Women's Fashion",
    image: "https://images.unsplash.com/photo-1494790108755-2616c75107de?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    link: "/women"
  },
  {
    title: "Kids Collection",
    image: "https://images.unsplash.com/photo-1503919545889-aef636e10ad4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    link: "/kids"
  },
  {
    title: "Beauty & Wellness",
    image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    link: "/beauty"
  }
];

export const WOMEN_MENU: MenuItem[] = [
  {
    title: "Clothing",
    link: "/women/clothing",
    items: [
      { title: "Sarees", link: "/women/sarees" },
      { title: "Kurtees", link: "/women/kurtees" },
      { title: "Dresses", link: "/women/dresses" },
      { title: "Tops", link: "/women/tops" }
    ]
  },
  {
    title: "Footwear",
    link: "/women/footwear",
    items: [
      { title: "Sandals", link: "/women/footwear/sandals" },
      { title: "Heels", link: "/women/footwear/heels" },
      { title: "Flats", link: "/women/footwear/flats" },
      { title: "Sneakers", link: "/women/footwear/sneakers" }
    ]
  },
  {
    title: "Jewelry",
    link: "/women/jewelry",
    items: [
      { title: "Traditional Jewelry", link: "/women/jewelry/traditional" },
      { title: "Modern Jewelry", link: "/women/jewelry/modern" },
      { title: "Earrings", link: "/women/jewelry/earrings" },
      { title: "Necklaces", link: "/women/jewelry/necklaces" }
    ]
  }
];

export const FEATURED_ITEMS = [
  {
    title: "New Arrivals",
    image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    link: "/women/new-arrivals"
  },
  {
    title: "Sale",
    image: "https://images.unsplash.com/photo-1607083206968-13611e3d76db?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    link: "/women/sale"
  }
]; 