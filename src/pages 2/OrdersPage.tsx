import type { FC } from 'react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import type { OrderItem } from '../types';

const OrdersPage: FC = () => {
  const [orderData, setOrderData] = useState<OrderItem[]>([]);

  useEffect(() => {
    const savedOrderData = sessionStorage.getItem('orderData');
    if (savedOrderData) {
      setOrderData(JSON.parse(savedOrderData));
    } else {
      // Mock данные для демонстрации
      const mockOrderData: OrderItem[] = [
        {
          serviceTitle: 'Факториал',
          date: new Date().toLocaleDateString('ru-RU'),
          result: '120'
        }
      ];
      setOrderData(mockOrderData);
      sessionStorage.setItem('orderData', JSON.stringify(mockOrderData));
    }
  }, []);

  const displayOrderItems = (data: OrderItem[]) => {
    if (data.length === 0) {
      return <div className="empty-message">Заявка пуста</div>;
    }

    return data.map((item, index) => (
      <div key={index} className="order-item">
        <div className="item-header">
          <strong>{item.serviceTitle}</strong>
          <span className="calculation-date">{item.date}</span>
        </div>
        <div className="item-category">Результат:</div>
        <div className="item-result">{item.result}</div>
      </div>
    ));
  };

  const saveOrder = () => {
    if (orderData.length === 0) {
      alert('Заявка пуста!');
      return;
    }

    alert(`Заявка сохранена! Количество вычислений: ${orderData.length}`);
    sessionStorage.removeItem('orderData');
    setOrderData([]);
  };

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
                <li><Link to="/">Главная</Link></li>
                <li><Link to="/services">Услуги</Link></li>
                <li><a href="#" className="active">Мои заявки</a></li>
              </ul>
            </nav>
          </div>
        </div>
      </header>

      <div className="container main-content">
        <h1 className="page-title">Моя заявка</h1>

        <div id="order-items-container">
          {displayOrderItems(orderData)}
        </div>

        <div className="total-section">
          <span className="total-label">Всего вычислений:</span>
          <span className="total-amount" id="total-count">{orderData.length}</span>
        </div>

        <div className="order-actions">
          <button className="btn btn-primary" onClick={saveOrder}>
            Сохранить заявку
          </button>
          <Link to="/services" className="btn btn-secondary">
            Вернуться к вычислениям
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OrdersPage;