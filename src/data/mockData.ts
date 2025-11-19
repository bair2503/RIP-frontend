import type { Service, } from '../types';

export const servicesData: Service[] = [
  {
    id: 1,
    title: 'Факториал',
    description: 'Вычисление факториала числа. Факториал n! представляет собой произведение всех натуральных чисел от 1 до n.',
    category: 'Математика',
    icon: 'fa-exclamation-circle',
    created_date: '2024-01-15',
    image_url: '/images/factorial.svg'
  },
  {
    id: 2,
    title: 'НОД',
    description: 'Нахождение наибольшего общего делителя (НОД) двух чисел с помощью алгоритма Евклида.',
    category: 'Числа',
    icon: 'fa-divide',
    created_date: '2024-01-16',
    image_url: '/images/nod.svg'
  },
  {
    id: 3,
    title: 'Числа Фибоначчи',
    description: 'Вычисление n-го числа Фибоначчи или последовательности Фибоначчи.',
    category: 'Числа',
    icon: 'fa-infinity',
    created_date: '2024-01-17'
  },
  {
    id: 4,
    title: 'Квадратное уравнение',
    description: 'Решение квадратного уравнения ax² + bx + c = 0 с нахождением корней.',
    category: 'Алгебра',
    icon: 'fa-superscript',
    created_date: '2024-01-18',
    image_url: '/images/equation.svg'
  }
];