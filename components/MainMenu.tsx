import React, { useState, useEffect, useMemo } from 'react';
import { getProducts, getProductById } from '../services/productService';
import SideNav from './SideNav';
import ProductsGrid from './ProductsGrid';
import ProductDetail from './ProductDetail';
import LoadingSpinner from './LoadingSpinner';
import { translations } from '../translations';
import HomeSlider from './HomeSlider';
import { useAppContext } from '../contexts/AppContext';
import Cart from './Cart';
import AccessibilityMenu from './AccessibilityMenu';
import MadoMateAssistant from './MadoMateAssistant';
import { DynamicMenuBuilder } from '../services/system';
import { useWeather } from '../hooks/useWeather';
import NotificationBar from './NotificationBar';
import FireIcon from './icons/FireIcon';
import MobileHeader from './MobileHeader';
import FeedbackModal from './FeedbackModal';
import { menuCategories as allMenuCategories } from '../data/menuData';
import RobotIcon from './icons/RobotIcon';
import { useSoundEffects } from '../hooks/useSoundEffects';
import { useSensoryFeedback } from '../hooks/useSensoryFeedback';
import CategoryHeader from './CategoryHeader';
import FilterModal from './FilterModal';
import ControlBar from './ControlBar';

const MainMenu = () => {
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAccessibilityOpen, setIsAccessibilityOpen] = useState(false);
  const [isAssistantOpen, setIsAssistantOpen] = useState(false);
  const [isSideNavCollapsed, setIsSideNavCollapsed] = useState(false);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState(false);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [dynamicMenu, setDynamicMenu] = useState(null);

  const [sortOption, setSortOption] = useState('featured');
  const [viewMode, setViewMode] = useState('grid');
  const [activeTags, setActiveTags] = useState(new Set());
  const [openMainCategory, setOpenMainCategory] = useState(null);

  const appContext = useAppContext();
  const { language, setLanguage, cart, darkMode } = appContext;
  const { weather } = useWeather("Fatih, TR");
  const { playInteractionSound } = useSoundEffects();
  const { triggerInteraction } = useSensoryFeedback();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const prods = await getProducts();
        setProducts((prods as any[]) || []);
      } catch (e) {
        setError(translations.menuError[language]);
        console.error("Failed to load menu data:", e);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [language]);

  useEffect(() => {
    if (products.length > 0) {
      const now = new Date();
      const hour = now.getHours();
      let timeOfDay;
      if (hour >= 5 && hour < 12) timeOfDay = 'morning';
      else if (hour >= 12 && hour < 17) timeOfDay = 'afternoon';
      else if (hour >= 17 && hour < 21) timeOfDay = 'evening';
      else timeOfDay = 'latenight';

      const dayNames = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
      const dayOfWeek = dayNames[now.getDay()];

      const context = {
        locale: language,
        currentDate: now,
        timeOfDay: timeOfDay,
        dayOfWeek: dayOfWeek,
        isWeekend: [0, 6].includes(now.getDay()),
        isHoliday: false,
        currentWeather: weather ? {
          condition: weather.condition,
          temperature: parseInt(weather.temp, 10),
        } : undefined,
        userPreferences: {
          dietaryRestrictions: [],
          allergens: [],
        },
      };

      const menuBuilder = new DynamicMenuBuilder();
      const menu = menuBuilder.buildMenu(products, context);
      setDynamicMenu(menu);
    }
  }, [products, weather, language]);


  const { allTags, filteredProducts, currentCategoryName } = useMemo(() => {
    const tags = new Set<string>();
    products.forEach(p => p.tags.forEach(t => tags.add(t)));
    const allTags = Array.from(tags);

    let prods = [...products];

    if (selectedCategory !== 'all' && openMainCategory) {
        const mainCat = allMenuCategories.menu_categories.find(mc => mc.id === openMainCategory);
        const isSubCategory = mainCat?.subcategories?.some(sc => sc.id === selectedCategory);
        
        if (isSubCategory) {
             prods = prods.filter(p => p.categoryId === selectedCategory);
        } else {
            const subCategoryIds = mainCat?.subcategories?.map(sc => sc.id) || [];
             if(subCategoryIds.length > 0) {
                 prods = prods.filter(p => subCategoryIds.includes(p.categoryId));
             } else {
                 prods = prods.filter(p => p.categoryId === openMainCategory);
             }
        }
    }

    if (searchTerm) {
      prods = prods.filter(p => p.name[language].toLowerCase().includes(searchTerm.toLowerCase()));
    }
    
    if (activeTags.size > 0) {
        prods = prods.filter(p => Array.from(activeTags).every(tag => p.tags.includes(tag)));
    }

    switch (sortOption) {
      case 'price-asc':
        prods.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        prods.sort((a, b) => b.price - a.price);
        break;
      case 'name-asc':
        prods.sort((a, b) => a.name[language].localeCompare(b.name[language]));
        break;
      case 'name-desc':
        prods.sort((a, b) => b.name[language].localeCompare(a.name[language]));
        break;
      case 'featured':
      default:
        prods.sort((a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0));
        break;
    }

    let categoryName = translations.allProducts[language];
    if (selectedCategory !== 'all') {
        let found = false;
        for (const mainCat of allMenuCategories.menu_categories) {
            if (mainCat.id === selectedCategory) {
            categoryName = mainCat.name[language];
            found = true;
            break;
            }
            if(mainCat.subcategories) {
                const subCat = mainCat.subcategories.find(sc => sc.id === selectedCategory);
                if (subCat) {
                categoryName = subCat.name[language];
                found = true;
                break;
                }
            }
        }
        if (!found) { // It might be a main category without subcategories
            const mainCat = allMenuCategories.menu_categories.find(mc => mc.id === selectedCategory);
            if (mainCat) {
                categoryName = mainCat.name[language];
            }
        }
    }


    return { allTags, filteredProducts: prods, currentCategoryName: categoryName };
  }, [products, selectedCategory, openMainCategory, searchTerm, language, sortOption, activeTags]);

  const handleCategorySelect = (id) => {
      setSearchTerm('');
      setSelectedCategory(id);
      if(id === 'all') {
        setOpenMainCategory(null);
      }
      setIsMobileNavOpen(false);
  };

  const handleAssistantSearch = (term) => {
    setSearchTerm(term);
    setSelectedCategory('all');
  };

  const handleAssistantCategory = (categoryId) => {
    setSearchTerm('');
    setSelectedCategory(categoryId);
  };
  
  const handleAssistantProduct = async (productId) => {
    const product = await getProductById(productId);
    if (product) {
      setSelectedProduct(product);
    }
  };

  if (loading) {
    return React.createElement('div', { style: { display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh' } }, React.createElement(LoadingSpinner, { size: "lg" }));
  }

  if (error) {
    return React.createElement('div', { style: { display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh', color: 'red' } }, error);
  }

  const cartItemCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  const controlBarComponent = (
    React.createElement(ControlBar, {
        searchTerm,
        onSearchChange: setSearchTerm,
        sortOption,
        onSortChange: setSortOption,
        viewMode,
        onViewModeChange: setViewMode,
        onFilterClick: () => setIsFilterModalOpen(true),
        language,
        onCartClick: () => setIsCartOpen(true),
        cartItemCount: cartItemCount
    })
  );

  const showHomePage = selectedCategory === 'all' && !searchTerm && dynamicMenu;

  const homePageContent = (
    React.createElement(React.Fragment, null,
      React.createElement(HomeSlider, { 
          products: dynamicMenu ? dynamicMenu.featuredProducts.slice(0, 5) : [],
          onProductSelect: setSelectedProduct, 
          language: language 
      }),
      controlBarComponent,
      React.createElement('div', { className: "section-title", style: { marginTop: '2rem' } },
        React.createElement(FireIcon, null),
        React.createElement('h2', null, translations.featured[language])
      ),
      React.createElement(ProductsGrid, {
        products: dynamicMenu ? dynamicMenu.featuredProducts : [],
        onProductSelect: setSelectedProduct,
        language: language,
        viewMode: 'grid'
      }),
      React.createElement('div', { className: "section-title", style: { marginTop: '2rem' } },
        React.createElement('h2', null, translations.products[language])
      ),
      React.createElement(ProductsGrid, {
        products: dynamicMenu ? dynamicMenu.regularProducts : [],
        onProductSelect: setSelectedProduct,
        language: language,
        viewMode: 'grid'
      })
    )
  );

  const categoryPageContent = (
    React.createElement(React.Fragment, null,
      React.createElement(CategoryHeader, {
          categoryName: currentCategoryName,
          productsForCategory: filteredProducts,
          language: language
      }),
      controlBarComponent,
      React.createElement(ProductsGrid, {
        products: filteredProducts,
        onProductSelect: setSelectedProduct,
        language: language,
        viewMode: viewMode
      })
    )
  );


  return React.createElement('div', { className: 'main-menu-container' },
    isMobileNavOpen && React.createElement('div', { className: 'mobile-overlay', onClick: () => setIsMobileNavOpen(false) }),
    React.createElement(SideNav, {
      menuCategories: allMenuCategories.menu_categories,
      selectedCategory: selectedCategory,
      onCategorySelect: handleCategorySelect,
      openMainCategory: openMainCategory,
      setOpenMainCategory: setOpenMainCategory,
      language: language,
      setLanguage: setLanguage,
      isCollapsed: isSideNavCollapsed,
      onToggleCollapse: () => setIsSideNavCollapsed(prev => !prev),
      isMobile: window.innerWidth <= 768,
      isOpenOnMobile: isMobileNavOpen,
      onOpenFeedback: () => setIsFeedbackModalOpen(true),
      darkMode: darkMode
    }),
    React.createElement('div', { className: `main-content-wrapper ${isSideNavCollapsed ? 'expanded' : ''}`, style:{flex: 1, display: 'flex', flexDirection:'column'} },
      React.createElement(MobileHeader, {
          onMenuClick: () => setIsMobileNavOpen(true),
          onCartClick: () => setIsCartOpen(true),
          cartItemCount: cartItemCount
      }),
      React.createElement('main', { className: 'main-content' },
        React.createElement(NotificationBar, {
          specialMessage: dynamicMenu?.specialDayMessage,
          weatherMessage: dynamicMenu?.weatherMessage
        }),
        showHomePage ? homePageContent : categoryPageContent
      ),
    ),
    React.createElement(Cart, { isOpen: isCartOpen, onClose: () => setIsCartOpen(false) }),
    React.createElement(AccessibilityMenu, {
      isOpen: isAccessibilityOpen,
      onToggle: () => setIsAccessibilityOpen(prev => !prev),
      ...appContext
    }),
    selectedProduct && React.createElement(ProductDetail, {
      product: selectedProduct,
      onClose: () => setSelectedProduct(null),
      language: language
    }),
    isFeedbackModalOpen && React.createElement(FeedbackModal, {
        onClose: () => setIsFeedbackModalOpen(false),
        language: language
    }),
    React.createElement(FilterModal, {
        isOpen: isFilterModalOpen,
        onClose: () => setIsFilterModalOpen(false),
        allTags: allTags,
        activeTags: activeTags,
        setActiveTags: setActiveTags,
        language: language
    }),
    React.createElement('button', { 
        className: 'madomate-fab', 
        onClick: () => {
            triggerInteraction('medium');
            playInteractionSound();
            setIsAssistantOpen(true);
        }, 
        'aria-label': 'Open AI Assistant' 
    },
      React.createElement(RobotIcon, { width: 32, height: 32 })
    ),
    React.createElement(MadoMateAssistant, {
      isOpen: isAssistantOpen,
      onClose: () => setIsAssistantOpen(false),
      language: language,
      allProducts: products,
      onSearch: handleAssistantSearch,
      onCategorySelect: handleAssistantCategory,
      onProductSelect: handleAssistantProduct
    })
  );
};

export default MainMenu;