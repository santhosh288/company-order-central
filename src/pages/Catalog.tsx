
import React, { useState, useEffect } from 'react';
import Layout from '@/components/layout/Layout';
import MaterialFilter from '@/components/catalog/MaterialFilter';
import MaterialList from '@/components/catalog/MaterialList';
import { materialGroups, materials } from '@/data/mockData';
import { useCart } from '@/contexts/CartContext';
import { Material } from '@/types';
import { filterBySearchTerm } from '@/utils/helpers';

const Catalog = () => {
  const { addToCart } = useCart();
  const [selectedGroup, setSelectedGroup] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredMaterials, setFilteredMaterials] = useState<Material[]>(materials);

  // Apply filters when selection or search term changes
  useEffect(() => {
    let result = [...materials];

    // Filter by group
    if (selectedGroup) {
      result = result.filter(material => material.groupId === selectedGroup);
    }

    // Filter by search term
    result = filterBySearchTerm(result, searchTerm);

    setFilteredMaterials(result);
  }, [selectedGroup, searchTerm]);

  const handleAddToCart = (material: Material, quantity: number) => {
    addToCart(material, quantity);
  };

  return (
    <Layout requireAuth={true}>
      <div className="container px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Materials Catalog</h1>
          <p className="text-gray-500">Browse our full range of available materials.</p>
        </div>

        <div className="flex flex-col md:flex-row">
          <div className="w-full md:w-64 mb-6 md:mb-0 md:mr-6">
            <MaterialFilter
              groups={materialGroups}
              selectedGroup={selectedGroup}
              onGroupSelect={setSelectedGroup}
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
            />
          </div>
          
          <div className="flex-1">
            <MaterialList
              materials={filteredMaterials}
              onAddToCart={handleAddToCart}
            />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Catalog;
