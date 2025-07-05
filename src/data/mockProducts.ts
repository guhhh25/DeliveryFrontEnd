import { Product, Category } from '../types/product';

export const categories: Category[] = [
  { id: '1', name: 'Pizzas', icon: '🍕' },
  { id: '2', name: 'Burgers', icon: '🍔' },
  { id: '3', name: 'Sushi', icon: '🍣' },
  { id: '4', name: 'Saladas', icon: '🥗' },
  { id: '5', name: 'Sobremesas', icon: '🍰' },
  { id: '6', name: 'Bebidas', icon: '🥤' },
];

export const products: Product[] = [
  // Pizzas
  {
    id: '1',
    name: 'Pizza Margherita',
    description: 'Molho de tomate, mussarela fresca, manjericão e azeite',
    price: 32.90,
    image: 'https://images.unsplash.com/photo-1604382355076-af4b0eb60143?w=400&h=300&fit=crop',
    category: 'Pizzas',
    rating: 4.8,
    preparationTime: 25,
    isAvailable: true,
    restaurant: 'Pizzaria Bella Napoli'
  },
  {
    id: '2',
    name: 'Pizza Pepperoni',
    description: 'Molho de tomate, mussarela, pepperoni e orégano',
    price: 38.50,
    image: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?w=400&h=300&fit=crop',
    category: 'Pizzas',
    rating: 4.6,
    preparationTime: 30,
    isAvailable: true,
    restaurant: 'Pizzaria Bella Napoli'
  },
  {
    id: '3',
    name: 'Pizza Quatro Queijos',
    description: 'Molho de tomate, mussarela, parmesão, gorgonzola e provolone',
    price: 42.00,
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400&h=300&fit=crop',
    category: 'Pizzas',
    rating: 4.7,
    preparationTime: 28,
    isAvailable: true,
    restaurant: 'Pizzaria Bella Napoli'
  },

  // Burgers
  {
    id: '4',
    name: 'X-Burger Clássico',
    description: 'Hambúrguer artesanal, queijo, alface, tomate e molho especial',
    price: 24.90,
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=300&fit=crop',
    category: 'Burgers',
    rating: 4.5,
    preparationTime: 15,
    isAvailable: true,
    restaurant: 'Burger House'
  },
  {
    id: '5',
    name: 'X-Bacon',
    description: 'Hambúrguer artesanal, bacon crocante, queijo, alface e molho barbecue',
    price: 29.90,
    image: 'https://images.unsplash.com/photo-1553979459-d2229ba7433b?w=400&h=300&fit=crop',
    category: 'Burgers',
    rating: 4.9,
    preparationTime: 18,
    isAvailable: true,
    restaurant: 'Burger House'
  },
  {
    id: '6',
    name: 'Veggie Burger',
    description: 'Hambúrguer de grão-de-bico, queijo vegano, alface e molho de ervas',
    price: 26.50,
    image: 'https://images.unsplash.com/photo-1520072959219-c595dc870360?w=400&h=300&fit=crop',
    category: 'Burgers',
    rating: 4.3,
    preparationTime: 20,
    isAvailable: true,
    restaurant: 'Burger House'
  },

  // Sushi
  {
    id: '7',
    name: 'Combo Sushi 12 Peças',
    description: 'Salmon nigiri, atum nigiri, california roll e philadelphia roll',
    price: 45.90,
    image: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=400&h=300&fit=crop',
    category: 'Sushi',
    rating: 4.9,
    preparationTime: 35,
    isAvailable: true,
    restaurant: 'Sushi Master'
  },
  {
    id: '8',
    name: 'Temaki Salmon',
    description: 'Cone de alga nori recheado com arroz, salmão fresco e cream cheese',
    price: 18.90,
    image: 'https://images.unsplash.com/photo-1553621042-f6e147245754?w=400&h=300&fit=crop',
    category: 'Sushi',
    rating: 4.7,
    preparationTime: 25,
    isAvailable: true,
    restaurant: 'Sushi Master'
  },
  {
    id: '9',
    name: 'Sashimi Mix',
    description: 'Salmão, atum e peixe branco frescos, servidos com wasabi e gengibre',
    price: 52.00,
    image: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=400&h=300&fit=crop',
    category: 'Sushi',
    rating: 4.8,
    preparationTime: 30,
    isAvailable: true,
    restaurant: 'Sushi Master'
  },

  // Saladas
  {
    id: '10',
    name: 'Salada Caesar',
    description: 'Alface romana, croutons, parmesão, molho caesar e frango grelhado',
    price: 28.90,
    image: 'https://images.unsplash.com/photo-1546793665-c74683f339c1?w=400&h=300&fit=crop',
    category: 'Saladas',
    rating: 4.4,
    preparationTime: 12,
    isAvailable: true,
    restaurant: 'Salad Bar'
  },
  {
    id: '11',
    name: 'Salada Mediterrânea',
    description: 'Mix de folhas, tomate cereja, azeitonas, queijo feta e azeite de oliva',
    price: 24.50,
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=300&fit=crop',
    category: 'Saladas',
    rating: 4.6,
    preparationTime: 10,
    isAvailable: true,
    restaurant: 'Salad Bar'
  },

  // Sobremesas
  {
    id: '12',
    name: 'Cheesecake de Morango',
    description: 'Cheesecake cremoso com calda de morango e chantilly',
    price: 16.90,
    image: 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=400&h=300&fit=crop',
    category: 'Sobremesas',
    rating: 4.8,
    preparationTime: 5,
    isAvailable: true,
    restaurant: 'Doceria Sweet'
  },
  {
    id: '13',
    name: 'Brownie com Sorvete',
    description: 'Brownie quentinho servido com sorvete de baunilha e calda de chocolate',
    price: 19.90,
    image: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=400&h=300&fit=crop',
    category: 'Sobremesas',
    rating: 4.9,
    preparationTime: 8,
    isAvailable: true,
    restaurant: 'Doceria Sweet'
  },

  // Bebidas
  {
    id: '14',
    name: 'Smoothie de Frutas',
    description: 'Smoothie natural de morango, banana e laranja',
    price: 12.90,
    image: 'https://images.unsplash.com/photo-1505252585461-04db1eb84625?w=400&h=300&fit=crop',
    category: 'Bebidas',
    rating: 4.5,
    preparationTime: 5,
    isAvailable: true,
    restaurant: 'Juice Bar'
  },
  {
    id: '15',
    name: 'Limonada Suíça',
    description: 'Limonada natural com hortelã e adoçada com mel',
    price: 8.90,
    image: 'https://images.unsplash.com/photo-1621263764928-df1444c5e859?w=400&h=300&fit=crop',
    category: 'Bebidas',
    rating: 4.7,
    preparationTime: 3,
    isAvailable: true,
    restaurant: 'Juice Bar'
  }
]; 