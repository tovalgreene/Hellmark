import React, { useState, useEffect } from 'react'; // Fixed useEffect
import Layout from '../components/Layout';
import { getProducts } from '../utils/api';
import Cart from './Cart';

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  // You need to define the state for cartItems and open if you're using them for Cart component
  const [cartItems, setCartItems] = useState([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    // Fetch products when the component is mounted
    getProducts()
      .then(data => {
        setProducts(data); // Set the products in the state
        setIsLoading(false); // Loading is complete
      })
      .catch(err => {
        setError(err.message); // Handle any errors
        setIsLoading(false);
      });
  }, []);

  // Define addToCartHandler function if it's being used
  const addToCartHandler = (productId) => {
    // Logic to add product to cart
    // For example, you might want to find the product by ID and then set it in cartItems state
    const productToAdd = products.find(product => product.id === productId);
    if (productToAdd) {
      setCartItems(prevItems => [...prevItems, productToAdd]);
    }
  };

  if (isLoading) {
    return <Layout><div>Loading...</div></Layout>; // Wrap loading in Layout for consistent styling
  }

  if (error) {
    return <Layout><div>Error: {error}</div></Layout>; // Wrap error in Layout as well
  }

  return (
    <Layout>
      <div>
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
          {products.map((product) => (
            <div key={product.id} style={{ margin: '10px', border: '1px solid #ddd', padding: '10px', display: 'flex', flexDirection: 'column' }}>
              <h3>{product.title}</h3>
              <img src={product.image} alt={product.title} style={{ maxWidth: '100%', maxHeight: '150px' }} />
              <p>${product.price}</p>
              <button onClick={() => addToCartHandler(product.id)}>Add to Cart</button>
            </div>
          ))}
        </div>
        <Cart open={open} setOpen={setOpen} cartItems={cartItems} updateCart={setCartItems} />
      </div>
    </Layout>
  );
}

export default Shop;
