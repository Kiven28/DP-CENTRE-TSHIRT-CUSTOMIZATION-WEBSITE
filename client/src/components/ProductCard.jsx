import React, { useEffect, useState } from 'react';

const ProductCard = ({ product, onRemove }) => {
  const handleRemoveClick = () => {
    if (window.confirm(`Are you sure you want to remove ${product.pName}?`)) {
      onRemove(product.id);
    }
  };

  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const response = await fetch(`http://localhost:8080/uploads/${product.pImage}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const blob = await response.blob();
        const url = URL.createObjectURL(blob);
        setImageUrl(url);
      } catch (error) {
        console.error('Error fetching image:', error);
      }
    };

    fetchImage();

    // Clean up URL object when component unmounts or when imageUrl changes
    return () => {
      if (imageUrl) {
        URL.revokeObjectURL(imageUrl);
      }
    };
  }, [imageUrl, product.pImage]);

  return (
    <div className="w-72 bg-white shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl relative m-4">
      {imageUrl && (
        <img
          src={imageUrl}
          alt="Product"
          className="h-80 w-72 object-cover rounded-t-xl"
        />
      )}

      <div className="px-4 py-3">
        <span className="text-gray-400 mr-3 uppercase text-xs">{product.pBrand}</span>
        <p className="text-lg font-bold text-black truncate block capitalize">
          {product.pName}
        </p>
       
      </div>
      <button
        onClick={handleRemoveClick}
        className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded-md"
      >
        Remove
      </button>
    </div>
  );
};

export default ProductCard;
