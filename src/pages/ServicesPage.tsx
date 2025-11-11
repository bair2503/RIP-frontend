import type { FC } from 'react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { servicesApi } from '../api/servicesApi';
import type { Service } from '../types';
import Breadcrumbs from '../components/Breadcrumbs';

const ServicesPage: FC = () => {
  const [allServices, setAllServices] = useState<Service[]>([]);
  const [displayedServices, setDisplayedServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('Все');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeSearch, setActiveSearch] = useState<string>('');
  
  const categories = ['Все', 'Математика', 'Числа', 'Алгебра'];

  // Загружаем услуги при монтировании компонента
  useEffect(() => {
    loadServices();
  }, []);

  // Применяем фильтры при изменении категории или активного поиска
  useEffect(() => {
    applyFilters();
  }, [allServices, selectedCategory, activeSearch]);

  const loadServices = async () => {
    setLoading(true);
    try {
      const data = await servicesApi.getServices();
      setAllServices(data);
    } catch (error) {
      console.error('Error loading services:', error);
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = () => {
    let filtered = [...allServices];

    // Применяем фильтр по категории (если выбрана не "Все")
    if (selectedCategory !== 'Все') {
      filtered = filtered.filter(service =>
        service.category === selectedCategory
      );
    }

    // Применяем активный поиск (если есть активный поисковый запрос)
    if (activeSearch.trim()) {
      const searchLower = activeSearch.toLowerCase();
      filtered = filtered.filter(service =>
        service.title.toLowerCase().includes(searchLower) ||
        service.description.toLowerCase().includes(searchLower) ||
        service.category.toLowerCase().includes(searchLower)
      );
    }

    setDisplayedServices(filtered);
  };

  const handleSearch = () => {
    setActiveSearch(searchQuery);
  };

  const handleClearSearch = () => {
    setSearchQuery('');
    setActiveSearch('');
  };

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
  };

  const handleClearCategory = () => {
    setSelectedCategory('Все');
  };

  const handleClearAll = () => {
    setSelectedCategory('Все');
    setSearchQuery('');
    setActiveSearch('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div>
      <header>
        <Container>
          <div className="header-content">
            <div className="logo">
              <i className="fas fa-calculator"></i>
              <span>Вычислительный калькулятор</span>
            </div>
            <nav>
              <ul>
                <li><Link to="/">Главная</Link></li>
                <li><a href="#" className="active">Услуги</a></li>
              </ul>
            </nav>
          </div>
        </Container>
      </header>

      <div className="cart-container">
        <Link to="" className="cart-link">
          <div className="cart-icon">
            <i className="fas fa-shopping-cart"></i>
            <span className="cart-count">1</span>
          </div>
        </Link>
      </div>

      <Container className="main-content">
        <Breadcrumbs items={[{ label: 'Услуги' }]} />
        
        <h1 className="page-title">Математические вычисления</h1>
        <p className="page-subtitle">Выберите тип вычисления для расчета</p>

        {/* Поиск */}
        <div className="search-form">
          <div className="search-container">
            <input
              type="text"
              className="search-input"
              placeholder="Поиск услуг..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={handleKeyPress}
            />
            <button className="search-button" onClick={handleSearch}>
              Найти
            </button>
            {activeSearch && (
              <button 
                className="search-clear-button"
                onClick={handleClearSearch}
                title="Очистить поиск"
              >
                <i className="fas fa-times"></i>
              </button>
            )}
          </div>
        </div>

        {/* Красивые фильтры по категориям */}
        <Card className="mb-4 filter-card">
          <Card.Body>
            <Row className="align-items-center">
              <Col md={8}>
                <div className="filter-section">
                  <div className="filter-label">
                    <i className="fas fa-filter"></i>
                    Фильтр по категориям:
                  </div>
                  <div className="category-buttons">
                    {categories.map(category => (
                      <button
                        key={category}
                        className={`category-btn ${selectedCategory === category ? 'active' : ''}`}
                        onClick={() => handleCategorySelect(category)}
                      >
                        {category}
                        {selectedCategory === category && (
                          <i className="fas fa-check"></i>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              </Col>
              <Col md={4} className="text-end">
                <div className="filter-actions">
                  {selectedCategory !== 'Все' && (
                    <Button 
                      variant="outline-secondary" 
                      onClick={handleClearCategory}
                      className="clear-category-btn"
                      size="sm"
                    >
                      <i className="fas fa-times"></i> Очистить категорию
                    </Button>
                  )}
                  <Button 
                    variant="outline-danger" 
                    onClick={handleClearAll}
                    className="clear-all-btn"
                    size="sm"
                  >
                    <i className=""></i> 
                  </Button>
                </div>
              </Col>
            </Row>

            {/* Индикатор активного фильтра */}
            
          </Card.Body>
        </Card>

        {loading ? (
          <div className="text-center">
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Загрузка...</span>
            </div>
          </div>
        ) : (
          <div className="categories-grid">
            {displayedServices.map(service => (
              <ServiceCard key={service.id} service={service} />
            ))}
            
            {displayedServices.length === 0 && (
              <div className="no-services">
                <i className="fas fa-search"></i>
                <h3>Услуги не найдены</h3>
                <p>Попробуйте изменить поисковый запрос или категорию</p>
              </div>
            )}
          </div>
        )}
      </Container>

      <footer>
        <Container>
          <p>© 2025 Вычислительный калькулятор. Все права защищены.</p>
        </Container>
      </footer>
    </div>
  );
};

// Компонент карточки услуги (без изменений)
const ServiceCard: FC<{ service: Service }> = ({ service }) => {
  return (
    <div className="category-card">
      <div className="category-image">
        {service.image_url ? (
          <img
            src={service.image_url}
            alt={service.title}
            className="category-image-img"
            onError={(e) => {
              // Если изображение не загрузилось, показываем иконку
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
              // Находим родительский элемент и добавляем иконку
              const parent = target.parentNode as HTMLElement;
              if (parent) {
                const icon = document.createElement('i');
                icon.className = `fas ${service.icon}`;
                parent.appendChild(icon);
              }
            }}
          />
        ) : (
          <i className={`fas ${service.icon}`}></i>
        )}
      </div>
      <div className="category-content">
        <h3 className="category-title">{service.title}</h3>
        <p className="category-description">{service.description}</p>
        <div className="category-meta">
          <span>Категория: {service.category}</span>
        </div>
        <div className="card-actions">
          <Link to={`/service/${service.id}`} className="btn btn-details">
            Подробнее
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ServicesPage;