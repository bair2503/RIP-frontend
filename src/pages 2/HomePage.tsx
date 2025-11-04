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
                <li><Link to="/orders">Мои заявки</Link></li>
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

        <div className="features-section">
          <h2>Наши возможности</h2>
          <div className="features-grid">
            <div className="feature">
              <i className="fas fa-calculator"></i>
              <h3>Математические вычисления</h3>
              <p>Факториал, НОД, числа Фибоначчи и многое другое</p>
            </div>
            <div className="feature">
              <i className="fas fa-bolt"></i>
              <h3>Быстрые результаты</h3>
              <p>Мгновенное получение результатов вычислений</p>
            </div>
            <div className="feature">
              <i className="fas fa-history"></i>
              <h3>История заявок</h3>
              <p>Сохраняйте и просматривайте историю ваших вычислений</p>
            </div>
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