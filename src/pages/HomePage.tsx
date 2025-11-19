import type { FC } from 'react';
import { Container, Carousel } from 'react-bootstrap';
import { Navbar } from '../components/Navbar';

const HomePage: FC = () => {
  return (
    <div>
      <Navbar />
      <Container className="main-content mt-5">
        <div className="hero-section text-center">
          <h1 className="page-title">Вычислительный калькулятор</h1>
          <p className="page-subtitle">
            Производите сложные математические вычисления с лёгкостью.
            Наш сервис предлагает различные математические операции для ваших нужд.
          </p>
        </div>

        {/* Карусель с стилизованными блоками */}
        <Carousel className="mt-4 home-carousel">
          <Carousel.Item>
            <div className="carousel-item-content">
              <div className="math-icon factorial-icon">
                <i className="fas fa-exclamation-circle"></i>
              </div>
              <div className="carousel-text">
                <h3>Факториал</h3>
                <p>Рассчитайте n! за секунду</p>
                <div className="math-formula">n! = 1 × 2 × 3 × ... × n</div>
              </div>
            </div>
          </Carousel.Item>

          <Carousel.Item>
            <div className="carousel-item-content">
              <div className="math-icon nod-icon">
                <i className="fas fa-divide"></i>
              </div>
              <div className="carousel-text">
                <h3>НОД</h3>
                <p>Найдите наибольший общий делитель чисел</p>
                <div className="math-formula">НОД(a, b) = ?</div>
              </div>
            </div>
          </Carousel.Item>

          <Carousel.Item>
            <div className="carousel-item-content">
              <div className="math-icon fibonacci-icon">
                <i className="fas fa-infinity"></i>
              </div>
              <div className="carousel-text">
                <h3>Числа Фибоначчи</h3>
                <p>Вычислите последовательность Фибоначчи</p>
                <div className="math-formula">F(n) = F(n-1) + F(n-2)</div>
              </div>
            </div>
          </Carousel.Item>

          <Carousel.Item>
            <div className="carousel-item-content">
              <div className="math-icon equation-icon">
                <i className="fas fa-superscript"></i>
              </div>
              <div className="carousel-text">
                <h3>Квадратное уравнение</h3>
                <p>Решайте ax²+bx+c=0 с шагом в одно нажатие</p>
                <div className="math-formula">ax² + bx + c = 0</div>
              </div>
            </div>
          </Carousel.Item>
        </Carousel>
      </Container>
      <footer className="text-center mt-5">
        <p>© 2025 Вычислительный калькулятор. Все права защищены.</p>
      </footer>
    </div>
  );
};

export default HomePage;