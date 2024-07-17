import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Catalogue = () => {
  const [catalogueItems, setCatalogueItems] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/catalogue');
        if (response.ok) {
          const data = await response.json();
          const sortedProducts = data.sort((a, b) => new Date(b.pDateRelease) - new Date(a.pDateRelease));
          setCatalogueItems(sortedProducts);
        } else {
          throw new Error('Failed to fetch data');
        }
      } catch (error) {
        console.error('Error fetching catalogue data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen">
      <div className="max-w-7xl mx-auto p-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-10">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-yellow-500 border-b pb-2 ">CATALOGUE</h1>
          <Link to="/" className="text-black shadow-lg shadow-yellow-500/50 hover:shadow-none bg-yellow-500   w-fit px-4 py-2 font-bold text-xs customize-button rounded transition duration-300">
            GO BACK
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {catalogueItems.map(item => (
            <div key={item.id} className="backdrop-blur-lg bg-opacity-50 backdrop-filter shadow-md rounded-xl overflow-hidden transition duration-500 hover:shadow-xl hover:scale-105">
              <a href="#">
                <img src={`http://localhost:8080/uploads/${item.pImage}`} alt={item.pName} className="h-80 w-full object-cover rounded-t-xl" />
                <div className="p-4">
                  <span className="text-white uppercase text-xs">{item.pBrand}</span>
                  <p className="text-lg font-bold text-white truncate capitalize mt-2">{item.pName}</p>
                 
                </div>
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Catalogue;
