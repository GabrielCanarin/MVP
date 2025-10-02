import React, { useState, useEffect } from 'react';
import { ShoppingCart, User, Package, TrendingUp, Plus, Edit, Trash2, Star, ArrowLeft, Eye, EyeOff } from 'lucide-react';
import cervejaImg from '../public/cerveja.jpg';
import vinhoImg from '../public/vinho.jpeg'

// Dados mockados
const mockUsers = [
  { id: 1, email: 'user@brinde.com', password: '123', name: 'João Silva', role: 'user' },
  { id: 2, email: 'produtor@brinde.com', password: '123', name: 'Maria Santos', role: 'producer' }
];

const mockProducts = [
  {
    id: 1,
    name: 'Vinho Tinto Artesanal',
    type: 'wine',
    price: 45.90,
    image: vinhoImg,
    description: 'Vinho tinto encorpado com notas de frutas vermelhas',
    producer: 'Vinícola Serra',
    rating: 4.5,
    reviews: [
      { id: 1, user: 'Ana Costa', rating: 5, comment: 'Excelente vinho, muito saboroso!' },
      { id: 2, user: 'Carlos Lima', rating: 4, comment: 'Bom custo benefício' }
    ]
  },
  {
    id: 2,
    name: 'Cerveja IPA Artesanal',
    type: 'beer',
    price: 12.50,
    image: cervejaImg,
    description: 'IPA com amargor equilibrado e aroma cítrico',
    producer: 'Cervejaria Vale',
    rating: 4.8,
    reviews: [
      { id: 1, user: 'Pedro Souza', rating: 5, comment: 'Melhor IPA da região!' }
    ]
  }
];

const mockSales = [
  { id: 1, product: 'Vinho Tinto Artesanal', quantity: 3, total: 137.70, date: '2025-01-15' },
  { id: 2, product: 'Cerveja IPA Artesanal', quantity: 8, total: 100.00, date: '2025-01-14' }
];

const BrindeApp = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [currentScreen, setCurrentScreen] = useState('login');
  const [products, setProducts] = useState(mockProducts);
  const [cart, setCart] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [activeTab, setActiveTab] = useState('products');
  const [producerTab, setProducerTab] = useState('sales');
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: '',
    type: 'wine',
    price: '',
    description: '',
    producer: '',
    image: ''
  });
  const [editingProduct, setEditingProduct] = useState(null);
  const [newReview, setNewReview] = useState({ rating: 5, comment: '' });

  const styles = {
    container: {
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    },
    header: {
      background: 'rgba(15, 15, 15, 0.95)',
      backdropFilter: 'blur(10px)',
      padding: '1rem 0.5rem',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
      flexWrap: 'wrap',
      gap: '0.5rem'
    },
    logo: {
      fontSize: '1.5rem',
      fontWeight: 'bold',
      color: '#fff',
      minWidth: 'fit-content'
    },
    nav: {
      display: 'flex',
      gap: '0.5rem',
      flexWrap: 'wrap',
      justifyContent: 'flex-end'
    },
    navButton: {
      background: 'none',
      border: 'none',
      color: 'rgba(255, 255, 255, 0.8)',
      cursor: 'pointer',
      padding: '0.5rem 0.75rem',
      borderRadius: '0.5rem',
      transition: 'all 0.3s ease',
      fontSize: '0.875rem',
      display: 'flex',
      alignItems: 'center',
      gap: '0.25rem',
      whiteSpace: 'nowrap'
    },
    activeNavButton: {
      background: 'rgba(255, 255, 255, 0.1)',
      color: 'white',
      backdropFilter: 'blur(10px)'
    },
    main: {
      padding: '1rem 0.5rem',
      minHeight: 'calc(100vh - 80px)'
    },
    card: {
      background: 'rgba(255, 255, 255, 0.02)',
      backdropFilter: 'blur(20px)',
      borderRadius: '1rem',
      padding: '1.5rem',
      margin: '1rem 0',
      border: '1px solid rgba(255, 255, 255, 0.08)',
      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)'
    },
    input: {
      width: '92%',
      padding: '0.75rem',
      borderRadius: '0.75rem',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      background: 'rgba(255, 255, 255, 0.05)',
      color: 'white',
      marginBottom: '1rem',
      transition: 'all 0.3s ease',
      backdropFilter: 'blur(10px)'
    },
    button: {
      background: 'linear-gradient(135deg, #333333, #1a1a1a)',
      color: 'white',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      padding: '0.75rem 1.5rem',
      borderRadius: '0.75rem',
      cursor: 'pointer',
      fontWeight: '500',
      transition: 'all 0.3s ease',
      width: '100%',
      backdropFilter: 'blur(10px)'
    },
    productGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
      gap: '1rem'
    },
    productCard: {
      background: 'rgba(255, 255, 255, 0.03)',
      backdropFilter: 'blur(20px)',
      borderRadius: '1rem',
      padding: '1rem',
      border: '1px solid rgba(255, 255, 255, 0.08)',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      boxShadow: '0 4px 16px rgba(0, 0, 0, 0.2)'
    },
    productImage: {
      width: '100%',
      height: '200px',
      objectFit: 'cover',
      borderRadius: '0.5rem',
      marginBottom: '1rem'
    },
    price: {
      fontSize: '1.2rem',
      fontWeight: '600',
      color: '#e8e8e8'
    },
    text: {
      color: 'rgba(255, 255, 255, 0.95)'
    },
    textSecondary: {
      color: 'rgba(255, 255, 255, 0.6)'
    },
    tabButton: {
      background: 'none',
      border: 'none',
      color: 'rgba(255, 255, 255, 0.6)',
      cursor: 'pointer',
      padding: '0.5rem 0.75rem',
      borderBottom: '2px solid transparent',
      fontSize: '0.875rem',
      whiteSpace: 'nowrap',
      transition: 'all 0.3s ease'
    },
    activeTab: {
      color: 'rgba(255, 255, 255, 0.95)',
      borderBottom: '2px solid rgba(255, 255, 255, 0.4)'
    },
    cartItem: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '1rem',
      background: 'rgba(255, 255, 255, 0.03)',
      backdropFilter: 'blur(10px)',
      borderRadius: '0.75rem',
      marginBottom: '0.5rem',
      border: '1px solid rgba(255, 255, 255, 0.05)'
    },
    reviewCard: {
      background: 'rgba(255, 255, 255, 0.03)',
      backdropFilter: 'blur(10px)',
      padding: '1rem',
      borderRadius: '0.75rem',
      marginBottom: '0.5rem',
      border: '1px solid rgba(255, 255, 255, 0.05)'
    },
    stars: {
      display: 'flex',
      gap: '0.2rem',
      marginBottom: '0.5rem'
    },
    star: {
      color: '#ffd700',
      cursor: 'pointer'
    }
  };

  const login = () => {
    const user = mockUsers.find(u =>
      u.email === loginData.email && u.password === loginData.password
    );
    if (user) {
      setCurrentUser(user);
      setCurrentScreen('products');
    } else {
      alert('Credenciais inválidas');
    }
  };

  const logout = () => {
    setCurrentUser(null);
    setCurrentScreen('login');
    setCart([]);
  };

  const addToCart = (product) => {
    const existingItem = cart.find(item => item.id === product.id);
    if (existingItem) {
      setCart(cart.map(item =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
    alert('Produto adicionado ao carrinho!');
  };

  const removeFromCart = (productId) => {
    setCart(cart.filter(item => item.id !== productId));
  };

  const updateCartQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
    } else {
      setCart(cart.map(item =>
        item.id === productId ? { ...item, quantity } : item
      ));
    }
  };

  const getCartTotal = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const addProduct = () => {
    if (!newProduct.name || !newProduct.price) {
      alert('Preencha todos os campos obrigatórios');
      return;
    }

    const product = {
      id: Date.now(),
      ...newProduct,
      price: parseFloat(newProduct.price),
      rating: 0,
      reviews: [],
      image: newProduct.image || 'https://images.unsplash.com/photo-1506377872008-6645d6ec2806?w=300&h=300&fit=crop'
    };

    setProducts([...products, product]);
    setNewProduct({
      name: '',
      type: 'wine',
      price: '',
      description: '',
      producer: '',
      image: ''
    });
    alert('Produto adicionado com sucesso!');
  };

  const updateProduct = () => {
    setProducts(products.map(p =>
      p.id === editingProduct.id ? editingProduct : p
    ));
    setEditingProduct(null);
    alert('Produto atualizado com sucesso!');
  };

  const deleteProduct = (productId) => {
    if (confirm('Tem certeza que deseja excluir este produto?')) {
      setProducts(products.filter(p => p.id !== productId));
    }
  };

  const addReview = () => {
    if (!newReview.comment.trim()) {
      alert('Escreva um comentário');
      return;
    }

    const review = {
      id: Date.now(),
      user: currentUser.name,
      rating: newReview.rating,
      comment: newReview.comment
    };

    const updatedProducts = products.map(p =>
      p.id === selectedProduct.id
        ? { ...p, reviews: [...p.reviews, review] }
        : p
    );

    setProducts(updatedProducts);
    setSelectedProduct({
      ...selectedProduct,
      reviews: [...selectedProduct.reviews, review]
    });

    setNewReview({ rating: 5, comment: '' });
    alert('Avaliação adicionada com sucesso!');
  };

  const renderStars = (rating, interactive = false, onRate = null) => {
    return (
      <div style={styles.stars}>
        {[1, 2, 3, 4, 5].map(star => (
          <Star
            key={star}
            size={16}
            style={{
              ...styles.star,
              fill: star <= rating ? '#ffd700' : 'none',
              cursor: interactive ? 'pointer' : 'default'
            }}
            onClick={() => interactive && onRate && onRate(star)}
          />
        ))}
      </div>
    );
  };

  // Tela de Login
  if (currentScreen === 'login') {
    return (
      <div style={styles.container}>
        <div style={styles.main}>
          <div style={{ ...styles.card, maxWidth: '400px', margin: '2rem auto' }}>
            <h1 style={{ ...styles.logo, fontSize: '2.5rem', textAlign: 'center', marginBottom: '1rem' }}>
              Brinde
            </h1>
            <h2 style={{ ...styles.textSecondary, textAlign: 'center', marginBottom: '2rem', fontSize: '1rem', fontWeight: '400' }}>
              Portal de Vinhos e Cervejas Artesanais
            </h2>

            <input
              type="email"
              placeholder="Email"
              value={loginData.email}
              onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
              style={styles.input}
            />

            <div style={{ position: 'relative', marginBottom: '1rem' }}>
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Senha"
                value={loginData.password}
                onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                style={styles.input}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: 'absolute',
                  right: '0.75rem',
                  top: '0.75rem',
                  background: 'none',
                  border: 'none',
                  color: 'rgba(255,255,255,0.7)',
                  cursor: 'pointer'
                }}
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>

            <button onClick={login} style={styles.button}>
              Entrar
            </button>

            <div style={{ ...styles.textSecondary, fontSize: '0.85rem', marginTop: '1.5rem', textAlign: 'center' }}>
              <p style={{ marginBottom: '0.5rem', opacity: '0.7' }}>Usuários de teste:</p>
              <p style={{ fontSize: '0.8rem' }}>Usuário comum: user@brinde.com / 123</p>
              <p style={{ fontSize: '0.8rem' }}>Produtor: produtor@brinde.com / 123</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // App principal
  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1 style={styles.logo}>Brinde</h1>
        <nav style={styles.nav}>
          <button
            style={{
              ...styles.navButton,
              ...(currentScreen === 'products' ? styles.activeNavButton : {})
            }}
            onClick={() => setCurrentScreen('products')}
          >
            <Package size={16} />
            <span style={{ display: window.innerWidth < 480 ? 'none' : 'inline' }}>Produtos</span>
          </button>

          <button
            style={{
              ...styles.navButton,
              ...(currentScreen === 'cart' ? styles.activeNavButton : {})
            }}
            onClick={() => setCurrentScreen('cart')}
          >
            <ShoppingCart size={16} />
            <span>({cart.length})</span>
          </button>

          {currentUser.role === 'producer' && (
            <button
              style={{
                ...styles.navButton,
                ...(currentScreen === 'producer' ? styles.activeNavButton : {})
              }}
              onClick={() => setCurrentScreen('producer')}
            >
              <TrendingUp size={16} />
              <span style={{ display: window.innerWidth < 480 ? 'none' : 'inline' }}>Produtor</span>
            </button>
          )}

          <button onClick={logout} style={styles.navButton}>
            <User size={16} />
            <span style={{ display: window.innerWidth < 480 ? 'none' : 'inline' }}>Sair</span>
          </button>
        </nav>
      </header>

      <main style={styles.main}>
        {/* Tela de Produtos */}
        {currentScreen === 'products' && !selectedProduct && (
          <div>
            <div style={{ display: 'flex', marginBottom: '1rem', overflowX: 'auto', paddingBottom: '0.5rem' }}>
              <button
                style={{
                  ...styles.tabButton,
                  ...(activeTab === 'products' ? styles.activeTab : {})
                }}
                onClick={() => setActiveTab('products')}
              >
                Todos os Produtos
              </button>
              <button
                style={{
                  ...styles.tabButton,
                  ...(activeTab === 'wines' ? styles.activeTab : {})
                }}
                onClick={() => setActiveTab('wines')}
              >
                Vinhos
              </button>
              <button
                style={{
                  ...styles.tabButton,
                  ...(activeTab === 'beers' ? styles.activeTab : {})
                }}
                onClick={() => setActiveTab('beers')}
              >
                Cervejas
              </button>
            </div>

            <div style={styles.productGrid}>
              {products
                .filter(product =>
                  activeTab === 'products' ||
                  (activeTab === 'wines' && product.type === 'wine') ||
                  (activeTab === 'beers' && product.type === 'beer')
                )
                .map(product => (
                  <div
                    key={product.id}
                    style={styles.productCard}
                    onClick={() => setSelectedProduct(product)}
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      style={styles.productImage}
                    />
                    <h3 style={styles.text}>{product.name}</h3>
                    <p style={styles.textSecondary}>{product.description}</p>
                    <p style={styles.textSecondary}>Produtor: {product.producer}</p>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1rem' }}>
                      <span style={styles.price}>R$ {product.price.toFixed(2)}</span>
                      {renderStars(product.rating)}
                    </div>
                  </div>
                ))
              }
            </div>
          </div>
        )}

        {/* Detalhes do Produto */}
        {currentScreen === 'products' && selectedProduct && (
          <div>
            <button
              onClick={() => setSelectedProduct(null)}
              style={{ ...styles.navButton, marginBottom: '1rem' }}
            >
              <ArrowLeft size={16} /> Voltar
            </button>

            <div style={styles.card}>
              <div style={{
                display: 'grid',
                gridTemplateColumns: window.innerWidth < 768 ? '1fr' : '300px 1fr',
                gap: '2rem'
              }}>
                <img
                  src={selectedProduct.image}
                  alt={selectedProduct.name}
                  style={{
                    width: '100%',
                    maxWidth: window.innerWidth < 768 ? '100%' : '300px',
                    borderRadius: '0.5rem',
                    margin: window.innerWidth < 768 ? '0 auto' : '0'
                  }}
                />
                <div>
                  <h2 style={styles.text}>{selectedProduct.name}</h2>
                  <p style={styles.textSecondary}>{selectedProduct.description}</p>
                  <p style={styles.textSecondary}>Produtor: {selectedProduct.producer}</p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', margin: '1rem 0' }}>
                    <span style={styles.price}>R$ {selectedProduct.price.toFixed(2)}</span>
                    {renderStars(selectedProduct.rating)}
                    <span style={styles.textSecondary}>({selectedProduct.reviews.length} avaliações)</span>
                  </div>
                  <button
                    onClick={() => addToCart(selectedProduct)}
                    style={styles.button}
                  >
                    Adicionar ao Carrinho
                  </button>
                </div>
              </div>
            </div>

            {/* Avaliações */}
            <div style={styles.card}>
              <h3 style={styles.text}>Avaliações</h3>

              {selectedProduct.reviews.map(review => (
                <div key={review.id} style={styles.reviewCard}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <strong style={styles.text}>{review.user}</strong>
                    {renderStars(review.rating)}
                  </div>
                  <p style={styles.textSecondary}>{review.comment}</p>
                </div>
              ))}

              {/* Adicionar Avaliação */}
              <div style={{ marginTop: '2rem' }}>
                <h4 style={styles.text}>Deixe sua avaliação:</h4>
                <div style={{ marginBottom: '1rem' }}>
                  <label style={styles.text}>Nota:</label>
                  {renderStars(newReview.rating, true, (rating) =>
                    setNewReview({ ...newReview, rating })
                  )}
                </div>
                <textarea
                  placeholder="Escreva seu comentário..."
                  value={newReview.comment}
                  onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                  style={{ ...styles.input, height: '100px', resize: 'vertical' }}
                />
                <button onClick={addReview} style={styles.button}>
                  Adicionar Avaliação
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Tela do Carrinho */}
        {currentScreen === 'cart' && (
          <div style={styles.card}>
            <h2 style={styles.text}>Carrinho de Compras</h2>

            {cart.length === 0 ? (
              <p style={styles.textSecondary}>Seu carrinho está vazio</p>
            ) : (
              <>
                {cart.map(item => (
                  <div key={item.id} style={styles.cartItem}>
                    <div>
                      <h4 style={styles.text}>{item.name}</h4>
                      <p style={styles.price}>R$ {item.price.toFixed(2)}</p>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                      <button
                        onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                        style={{ ...styles.navButton, padding: '0.25rem 0.5rem' }}
                      >
                        -
                      </button>
                      <span style={styles.text}>{item.quantity}</span>
                      <button
                        onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                        style={{ ...styles.navButton, padding: '0.25rem 0.5rem' }}
                      >
                        +
                      </button>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        style={{ ...styles.navButton, color: '#fca5a5' }}
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                ))}

                <div style={{ marginTop: '2rem', textAlign: 'right' }}>
                  <h3 style={styles.text}>
                    Total: <span style={styles.price}>R$ {getCartTotal().toFixed(2)}</span>
                  </h3>
                  <button
                    style={{ ...styles.button, width: '200px', marginTop: '1rem' }}
                    onClick={() => {
                      alert('Compra finalizada com sucesso!');
                      setCart([]);
                    }}
                  >
                    Finalizar Compra
                  </button>
                </div>
              </>
            )}
          </div>
        )}

        {/* Tela do Produtor */}
        {currentScreen === 'producer' && (
          <div>
            <div style={{ display: 'flex', marginBottom: '1rem', overflowX: 'auto', paddingBottom: '0.5rem' }}>
              <button
                style={{
                  ...styles.tabButton,
                  ...(producerTab === 'sales' ? styles.activeTab : {})
                }}
                onClick={() => setProducerTab('sales')}
              >
                Vendas
              </button>
              <button
                style={{
                  ...styles.tabButton,
                  ...(producerTab === 'manage' ? styles.activeTab : {})
                }}
                onClick={() => setProducerTab('manage')}
              >
                Gerenciar Produtos
              </button>
            </div>

            {/* Aba de Vendas */}
            {producerTab === 'sales' && (
              <div style={styles.card}>
                <h2 style={styles.text}>Histórico de Vendas</h2>
                {mockSales.map(sale => (
                  <div key={sale.id} style={styles.cartItem}>
                    <div>
                      <h4 style={styles.text}>{sale.product}</h4>
                      <p style={styles.textSecondary}>Data: {sale.date}</p>
                    </div>
                    <div>
                      <p style={styles.text}>Qtd: {sale.quantity}</p>
                      <p style={styles.price}>R$ {sale.total.toFixed(2)}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Aba de Gerenciar Produtos */}
            {producerTab === 'manage' && (
              <div>
                {/* Formulário de Novo Produto */}
                <div style={styles.card}>
                  <h2 style={styles.text}>
                    {editingProduct ? 'Editar Produto' : 'Adicionar Novo Produto'}
                  </h2>

                  <input
                    type="text"
                    placeholder="Nome do produto"
                    value={editingProduct ? editingProduct.name : newProduct.name}
                    onChange={(e) => editingProduct
                      ? setEditingProduct({ ...editingProduct, name: e.target.value })
                      : setNewProduct({ ...newProduct, name: e.target.value })
                    }
                    style={styles.input}
                  />

                  <select
                    value={editingProduct ? editingProduct.type : newProduct.type}
                    onChange={(e) => editingProduct
                      ? setEditingProduct({ ...editingProduct, type: e.target.value })
                      : setNewProduct({ ...newProduct, type: e.target.value })
                    }
                    style={{ ...styles.input, width: "100%" }}
                  >
                    <option value="wine">Vinho</option>
                    <option value="beer">Cerveja</option>
                  </select>

                  <input
                    type="number"
                    placeholder="Preço"
                    value={editingProduct ? editingProduct.price : newProduct.price}
                    onChange={(e) => editingProduct
                      ? setEditingProduct({ ...editingProduct, price: e.target.value })
                      : setNewProduct({ ...newProduct, price: e.target.value })
                    }
                    style={styles.input}
                  />

                  <input
                    type="text"
                    placeholder="Produtor"
                    value={editingProduct ? editingProduct.producer : newProduct.producer}
                    onChange={(e) => editingProduct
                      ? setEditingProduct({ ...editingProduct, producer: e.target.value })
                      : setNewProduct({ ...newProduct, producer: e.target.value })
                    }
                    style={styles.input}
                  />

                  <input
                    type="url"
                    placeholder="URL da imagem (opcional)"
                    value={editingProduct ? editingProduct.image : newProduct.image}
                    onChange={(e) => editingProduct
                      ? setEditingProduct({ ...editingProduct, image: e.target.value })
                      : setNewProduct({ ...newProduct, image: e.target.value })
                    }
                    style={styles.input}
                  />

                  <textarea
                    placeholder="Descrição"
                    value={editingProduct ? editingProduct.description : newProduct.description}
                    onChange={(e) => editingProduct
                      ? setEditingProduct({ ...editingProduct, description: e.target.value })
                      : setNewProduct({ ...newProduct, description: e.target.value })
                    }
                    style={{ ...styles.input, height: '100px', resize: 'vertical' }}
                  />

                  <div style={{ display: 'flex', gap: '1rem', flexDirection: window.innerWidth < 768 ? 'column' : 'row' }}>
                    <button
                      onClick={editingProduct ? updateProduct : addProduct}
                      style={styles.button}
                    >
                      {editingProduct ? 'Atualizar Produto' : 'Adicionar Produto'}
                    </button>

                    {editingProduct && (
                      <button
                        onClick={() => setEditingProduct(null)}
                        style={{ ...styles.button, background: 'rgba(220, 38, 38, 0.2)', borderColor: 'rgba(220, 38, 38, 0.3)', color: '#fca5a5' }}
                      >
                        Cancelar
                      </button>
                    )}
                  </div>
                </div>

                {/* Lista de Produtos */}
                <div style={styles.card}>
                  <h3 style={styles.text}>Meus Produtos</h3>
                  <div style={styles.productGrid}>
                    {products.map(product => (
                      <div key={product.id} style={styles.productCard}>
                        <img
                          src={product.image}
                          alt={product.name}
                          style={styles.productImage}
                        />
                        <h4 style={styles.text}>{product.name}</h4>
                        <p style={styles.price}>R$ {product.price.toFixed(2)}</p>
                        <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem', flexDirection: window.innerWidth < 768 ? 'column' : 'row' }}>
                          <button
                            onClick={() => setEditingProduct(product)}
                            style={{ ...styles.navButton, flex: 1, justifyContent: 'center' }}
                          >
                            <Edit size={16} /> Editar
                          </button>
                          <button
                            onClick={() => deleteProduct(product.id)}
                            style={{ ...styles.navButton, flex: 1, color: '#fca5a5', justifyContent: 'center' }}
                          >
                            <Trash2 size={16} /> Excluir
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default BrindeApp;