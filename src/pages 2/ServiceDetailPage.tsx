import type { FC } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import { servicesData } from '../data/mockData';
import Breadcrumbs from '../components/Breadcrumbs';

const ServiceDetailPage: FC = () => {
  const { id } = useParams<{ id: string }>();
  const serviceId = parseInt(id || '1');
  const service = servicesData.find(s => s.id === serviceId) || servicesData[0];

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
                <li><Link to="/services">Услуги</Link></li>
                <li><a href="#" className="active">Детали услуги</a></li>
              </ul>
            </nav>
          </div>
        </Container>
      </header>

      <Container className="main-content">
        {/* <Breadcrumbs items={[
          { label: 'Услуги', path: '/services' },
          { label: service.title }
        ]} /> */}
        
        <Link to="/services" className="back-link">
          <i className="fas fa-arrow-left"></i> Назад к услугам
        </Link>

        <div className="service-detail">
          <div className="service-header">
            <div className="service-icon">
              {service.image_url ? (
                <img 
                  src={service.image_url} 
                  alt={service.title}
                  style={{ width: '64px', height: '64px', objectFit: 'cover', borderRadius: '8px' }}
                />
              ) : (
                <i className={`fas ${service.icon}`}></i>
              )}
            </div>
            <div>
              <h1 className="service-title">{service.title}</h1>
              <p className="service-description">{service.description}</p>
              <div className="service-meta">Категория: {service.category}</div>
            </div>
          </div>

          <div className="calculation-info">
            <h3>Пример вычисления:</h3>
            <p>Для демонстрации работы этой услуги перейдите в заявку:</p>
            <div className="card-actions">
              <Link to={`/orders`} className="btn btn-primary">
                <i className="fas fa-shopping-cart"></i> Посмотреть пример заявки
              </Link>
            </div>
          </div>
        </div>
      </Container>

      <footer>
        <Container>
          <p>© 2025 Вычислительный калькулятор. Все права защищены.</p>
        </Container>
      </footer>
    </div>
  );
};

export default ServiceDetailPage;