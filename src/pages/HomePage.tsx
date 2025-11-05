import type { FC } from 'react';
import { Link } from 'react-router-dom';

const HomePage: FC = () => {
  return (
    <div>
      <header>
        <div className="container">
          <div className="header-content">
            <div className="logo">
              <i className="fas fa-calculator"></i>
              <span>Вычислительный калькулятор</span>
            </div>
            <nav>
              <ul>
                <li><a href="#" className="active">Главная</a></li>
                <li><Link to="/services">Услуги</Link></li>
              </ul>
            </nav>
          </div>
        </div>
      </header>

      <div className="container main-content">
        <div className="hero-section">
          <h1 className="page-title">Добро пожаловать в Вычислительный калькулятор!</h1>
          <p className="page-subtitle">
            Производите сложные математические вычисления с легкостью. 
            Наш сервис предлагает различные математические операции для ваших нужд.
          </p>
          
          <div className="hero-actions">
            <Link to="/services" className="btn btn-primary">
              <i className="fas fa-play"></i> Начать вычисления
            </Link>
            <Link to="/orders" className="btn btn-secondary">
              <i className="fas fa-shopping-cart"></i> Мои заявки
            </Link>
          </div>
        </div>

        
      </div>

      <footer>
        <div className="container">
          <p>© 2025 Вычислительный калькулятор. Все права защищены.</p>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;