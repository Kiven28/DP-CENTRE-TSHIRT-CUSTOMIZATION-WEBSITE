// AdminPage.js
import React, { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import AdminProductForm from '../components/AdminProductForm';
import axios from 'axios';
import { Link } from 'react-router-dom';
import state from '../store'; // Import your valtio state
import { useSnapshot } from 'valtio';

const AdminPage = () => {
  const snap = useSnapshot(state); // Use valtio snapshot

  const [products, setProducts] = useState([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/catalogue');
        const sortedProducts = response.data.sort((a, b) => new Date(b.pDateRelease) - new Date(a.pDateRelease));
        setProducts(sortedProducts);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, [showModal]);

  const handleRemoveProduct = async (productId) => {
    try {
      await axios.delete(`http://localhost:8080/api/catalogue/${productId}`);
      setProducts(products.filter(product => product.id !== productId));
    } catch (error) {
      console.error('Error removing product:', error);
    }
  };

  if (!snap.isAuthenticated) {
    return <p>Access Denied. Please log in.</p>; // Show access denied message if not authenticated
  }

  return (
    <div className="text-center p-10">
      <h1 className="font-bold text-4xl mb-4">Admin</h1>
      <div className="mt-5 flex justify-center space-x-4">
        <Link
          to="/"
          className="bg-yellow-500 hover:bg-yellow-600 text-white py-2 px-4 rounded-md shadow-md transition duration-300 ease-in-out"
        >
          Home
        </Link>
        <Link
          to="/catalogue"
          className="bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded-md shadow-md transition duration-300 ease-in-out"
        >
          Catalogue
        </Link>
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 overflow-auto bg-gray-500 bg-opacity-75 flex justify-center items-center p-4">
          <div className="bg-white p-8 rounded-lg max-w-md w-full">
            <h2 className="text-2xl font-bold mb-4">Add New Product</h2>
            <AdminProductForm onSubmit={() => setShowModal(false)} onCancel={() => setShowModal(false)} />
          </div>
        </div>
      )}

      <section className="mt-10 mb-5 overflow-y-auto max-h-screen">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          <div
            className="w-72  bg-white shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl flex items-center justify-center cursor-pointer m-4"
            onClick={() => setShowModal(true)}
          >
            <svg className="h-12 w-12 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
              <path
                fillRule="evenodd"
                d="M10 3a1 1 0 0 1 1 1v5h5a1 1 0 1 1 0 2h-5v5a1 1 0 1 1-2 0v-5H4a1 1 0 1 1 0-2h5V4a1 1 0 0 1 1-1z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          {products.length > 0 ? (
            products.map((product) => (
              <ProductCard key={product.id} product={product} onRemove={handleRemoveProduct} />
            ))
          ) : (
            <div className="flex items-center justify-center bg-white p-8 rounded-lg shadow-md text-gray-600">
              <p className="text-xl">No products added yet.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default AdminPage;
