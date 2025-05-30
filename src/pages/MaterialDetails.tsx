
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { formatCurrency } from '@/utils/helpers';
import { materials } from '@/data/mockData';
import { useCart } from '@/contexts/CartContext';
import { ArrowLeft, Download, ShoppingCart } from 'lucide-react';

const MaterialDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  
  const material = materials.find(m => m.id === id);

  if (!material) {
    return (
      <Layout requireAuth={true}>
        <div className="container px-4 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-600">Material not found</h1>
            <Button onClick={() => navigate('/catalog')} className="mt-4">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Catalog
            </Button>
          </div>
        </div>
      </Layout>
    );
  }

  const images = material.images || [material.image];

  const handleAddToCart = () => {
    addToCart(material, quantity);
  };

  const handleDownloadPdf = () => {
    if (material.pdfUrl) {
      // Create a temporary link and trigger download
      const link = document.createElement('a');
      link.href = material.pdfUrl;
      link.download = `${material.name}-guide.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <Layout requireAuth={true}>
      <div className="container px-4 py-8">
        {/* Back Button */}
        <Button 
          variant="ghost" 
          onClick={() => navigate('/catalog')}
          className="mb-6"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Catalog
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Image Gallery */}
          <div className="space-y-4">
            {/* Main Image */}
            <Dialog>
              <DialogTrigger asChild>
                <div className="cursor-pointer">
                  <img
                    src={images[selectedImageIndex]}
                    alt={material.name}
                    className="w-full h-96 object-cover rounded-lg shadow-lg hover:shadow-xl transition-shadow"
                  />
                </div>
              </DialogTrigger>
              <DialogContent className="max-w-4xl">
                <div className="relative">
                  <img
                    src={images[selectedImageIndex]}
                    alt={material.name}
                    className="w-full h-auto max-h-[80vh] object-contain"
                  />
                  {images.length > 1 && (
                    <div className="flex justify-center mt-4 space-x-2">
                      {images.map((_, index) => (
                        <Button
                          key={index}
                          variant={index === selectedImageIndex ? "default" : "outline"}
                          size="sm"
                          onClick={() => setSelectedImageIndex(index)}
                        >
                          {index + 1}
                        </Button>
                      ))}
                    </div>
                  )}
                </div>
              </DialogContent>
            </Dialog>

            {/* Thumbnail Images */}
            {images.length > 1 && (
              <div className="flex space-x-2 overflow-x-auto">
                {images.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`${material.name} ${index + 1}`}
                    className={`w-20 h-20 object-cover rounded cursor-pointer border-2 transition-all ${
                      index === selectedImageIndex 
                        ? 'border-blue-500' 
                        : 'border-gray-200 hover:border-gray-400'
                    }`}
                    onClick={() => setSelectedImageIndex(index)}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold mb-2">{material.name}</h1>
              <p className="text-gray-600 text-lg">{material.description}</p>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-3xl font-bold text-blue-600">
                {formatCurrency(material.price)}
              </span>
              <span className={`text-lg ${material.quantity > 0 ? 'text-green-600' : 'text-red-500'}`}>
                {material.quantity > 0 ? `${material.quantity} in stock` : 'Out of stock'}
              </span>
            </div>

            {/* Detailed Description */}
            {material.detailedDescription && (
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-3">Product Details</h3>
                  <p className="text-gray-700 leading-relaxed">{material.detailedDescription}</p>
                </CardContent>
              </Card>
            )}

            {/* Specifications */}
            {material.specifications && (
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-3">Specifications</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {Object.entries(material.specifications).map(([key, value]) => (
                      <div key={key} className="flex justify-between border-b pb-2">
                        <span className="font-medium text-gray-600">{key}:</span>
                        <span className="text-gray-800">{value}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Add to Cart Section */}
            <Card>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <label htmlFor="quantity" className="font-medium">Quantity:</label>
                    <div className="w-24">
                      <Input
                        id="quantity"
                        type="number"
                        min="1"
                        max={material.quantity}
                        value={quantity}
                        onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                        disabled={material.quantity <= 0}
                      />
                    </div>
                  </div>

                  <div className="flex space-x-3">
                    <Button
                      onClick={handleAddToCart}
                      disabled={material.quantity <= 0}
                      className="flex-1"
                      size="lg"
                    >
                      <ShoppingCart className="mr-2 h-5 w-5" />
                      {material.quantity <= 0 ? 'Out of Stock' : 'Add to Cart'}
                    </Button>

                    {material.pdfUrl && (
                      <Button
                        variant="outline"
                        onClick={handleDownloadPdf}
                        size="lg"
                      >
                        <Download className="mr-2 h-5 w-5" />
                        Download Guide
                      </Button>
                    )}
                  </div>

                  {material.quantity > 0 && (
                    <p className="text-sm text-gray-500">
                      Total: {formatCurrency(material.price * quantity)}
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default MaterialDetails;
