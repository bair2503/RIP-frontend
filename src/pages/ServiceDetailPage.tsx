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
        <Breadcrumbs items={[
          { label: 'Услуги', path: '/services' },
          { label: service.title }
        ]} />

        <Link to="/services" className="back-link">
          <i className="fas fa-arrow-left"></i> Назад к услугам
        </Link>

        <div className="service-detail">
          <div className="service-header">
            {/* Используем тот же класс что и на странице услуг */}
            <div className="category-image" style={{ width: '120px', height: '120px', flexShrink: 0 }}>
              <i className={`fas ${service.icon}`} style={{ fontSize: '48px' }}></i>
            </div>
            <div className="service-info">
              <h1 className="service-title">{service.title}</h1>
              <p className="service-description">{service.description}</p>
              <div className="service-meta">
              </div>
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