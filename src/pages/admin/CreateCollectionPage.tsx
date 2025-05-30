
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { ArrowLeft, Calendar, MapPin, DollarSign } from 'lucide-react';

const collectionSchema = z.object({
  collectionDate: z.string().min(1, 'Collection date is required'),
  price: z.string().min(1, 'Price is required'),
  addressLine1: z.string().min(1, 'Address line 1 is required'),
  addressLine2: z.string().optional(),
  city: z.string().min(1, 'City is required'),
  postalCode: z.string().min(1, 'Postal code is required'),
  country: z.string().min(1, 'Country is required'),
  description: z.string().optional(),
});

type CollectionFormData = z.infer<typeof collectionSchema>;

const CreateCollectionPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CollectionFormData>({
    resolver: zodResolver(collectionSchema),
  });

  const onSubmit = async (data: CollectionFormData) => {
    try {
      // Here you would typically send the data to your backend
      console.log('Collection data:', data);
      
      // For demo purposes, just show success message
      toast({
        title: "Collection request created",
        description: "The collection request has been successfully created.",
      });
      
      // Navigate back to collections page
      navigate('/admin/collections');
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create collection request. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <Layout requireAuth={true} requireAdmin={true}>
      <div className="container px-4 py-8 max-w-2xl mx-auto">
        <div className="mb-6">
          <Button
            variant="ghost"
            onClick={() => navigate('/admin/collections')}
            className="mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Collections
          </Button>
          <h1 className="text-3xl font-bold">Create Collection Request</h1>
          <p className="text-gray-500">Schedule a new material collection</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Collection Details</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Collection Date */}
              <div className="space-y-2">
                <Label htmlFor="collectionDate" className="flex items-center">
                  <Calendar className="h-4 w-4 mr-2" />
                  Collection Date
                </Label>
                <Input
                  id="collectionDate"
                  type="date"
                  {...register('collectionDate')}
                />
                {errors.collectionDate && (
                  <p className="text-sm text-red-500">{errors.collectionDate.message}</p>
                )}
              </div>

              {/* Price */}
              <div className="space-y-2">
                <Label htmlFor="price" className="flex items-center">
                  <DollarSign className="h-4 w-4 mr-2" />
                  Estimated Price (£)
                </Label>
                <Input
                  id="price"
                  type="text"
                  placeholder="0.00"
                  {...register('price')}
                />
                {errors.price && (
                  <p className="text-sm text-red-500">{errors.price.message}</p>
                )}
              </div>

              {/* Collection Address */}
              <div className="space-y-4">
                <Label className="flex items-center text-base font-medium">
                  <MapPin className="h-4 w-4 mr-2" />
                  Collection Address
                </Label>
                
                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <Label htmlFor="addressLine1">Address Line 1</Label>
                    <Input
                      id="addressLine1"
                      {...register('addressLine1')}
                      placeholder="Street address"
                    />
                    {errors.addressLine1 && (
                      <p className="text-sm text-red-500">{errors.addressLine1.message}</p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="addressLine2">Address Line 2 (Optional)</Label>
                    <Input
                      id="addressLine2"
                      {...register('addressLine2')}
                      placeholder="Apartment, suite, etc."
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="city">City</Label>
                      <Input
                        id="city"
                        {...register('city')}
                        placeholder="City"
                      />
                      {errors.city && (
                        <p className="text-sm text-red-500">{errors.city.message}</p>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="postalCode">Postal Code</Label>
                      <Input
                        id="postalCode"
                        {...register('postalCode')}
                        placeholder="Postal code"
                      />
                      {errors.postalCode && (
                        <p className="text-sm text-red-500">{errors.postalCode.message}</p>
                      )}
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="country">Country</Label>
                    <Input
                      id="country"
                      {...register('country')}
                      placeholder="Country"
                      defaultValue="United Kingdom"
                    />
                    {errors.country && (
                      <p className="text-sm text-red-500">{errors.country.message}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="space-y-2">
                <Label htmlFor="description">Description (Optional)</Label>
                <Textarea
                  id="description"
                  {...register('description')}
                  placeholder="Additional details about the collection..."
                  rows={3}
                />
              </div>

              {/* Submit Button */}
              <div className="flex justify-end space-x-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => navigate('/admin/collections')}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? 'Creating...' : 'Create Collection Request'}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default CreateCollectionPage;
