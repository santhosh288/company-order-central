
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { getCollectionsFromStorage } from '@/utils/localStorage';
import { formatDate, formatCurrency } from '@/utils/helpers';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { CollectionDetails } from '@/types';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Plus } from 'lucide-react';

const CollectionsPage = () => {
  const navigate = useNavigate();
  const [collections, setCollections] = useState<CollectionDetails[]>([]);
  const [selectedCollection, setSelectedCollection] = useState<CollectionDetails | null>(null);

  useEffect(() => {
    // Load collections from localStorage
    const storedCollections = getCollectionsFromStorage();
    setCollections(storedCollections);
  }, []);

  // Get status badge color
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'processing':
        return <Badge variant="outline" className="bg-amber-100 text-amber-800 border-amber-200">Processing</Badge>;
      case 'approved':
        return <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-200">Approved</Badge>;
      case 'rejected':
        return <Badge variant="outline" className="bg-red-100 text-red-800 border-red-200">Rejected</Badge>;
      case 'collected':
        return <Badge variant="outline" className="bg-purple-100 text-purple-800 border-purple-200">Collected</Badge>;
      case 'awaiting quote':
        return <Badge variant="outline" className="bg-green-500 text-red-500 border-red-800-200">Awaiting Quote</Badge>;
      case 'awaiting approval':
        return <Badge variant="outline" className="bg-indigo-100 text-indigo-800 border-indigo-200">Awaiting Approval</Badge>;
      case 'completed':
        return <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">Completed</Badge>;
      case 'cancelled':
        return <Badge variant="outline" className="bg-red-500 text-green-800 border-red-800-200">Cancelled</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  return (
    <Layout requireAuth={true}>
      <div className="container px-4 py-8">
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold mb-2">Collection Requests</h1>
            <p className="text-gray-500">View and track all your collection requests.</p>
          </div>
          <Button onClick={() => navigate('/admin/collections/create')}>
            Create New
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Collection Requests</CardTitle>
            <CardDescription>
              A complete list of all collection requests placed
            </CardDescription>
          </CardHeader>
          <CardContent>
            {collections.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-500">There is no collection raised yet.</p>
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Collection ID</TableHead>
                    <TableHead>Collection Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Quote Requested?</TableHead>
                    <TableHead>Quoted Price</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {collections.map((collection) => (
                    <TableRow key={collection.id}>
                      <TableCell className="font-medium">
                        {collection.id}
                      </TableCell>
                      <TableCell>{formatDate(collection.collectionDate)}</TableCell>
                      <TableCell>{getStatusBadge(collection.status)}</TableCell>
                      <TableCell>{collection.requestedQuote?"Yes":"No"}</TableCell>
                      <TableCell>{collection.price>0?formatCurrency(collection.price):"N/A"}</TableCell>
                      <TableCell className="text-right">
                        <Dialog >
                          <DialogTrigger asChild>
                            <Button
                              className="hover:bg-blue-900 hover:text-white"
                              variant="outline"
                              size="sm"
                              onClick={() => setSelectedCollection(collection)}>
                              View Details
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-3xl">
                            <DialogHeader>
                              <DialogTitle>Collection Details</DialogTitle>
                              <DialogDescription>
                                Collection ID: {selectedCollection?.id} |
                                Date: {selectedCollection && formatDate(selectedCollection.createdAt)}
                              </DialogDescription>
                            </DialogHeader>

                            {selectedCollection && (
                              <div className="mt-4">
                                <div className="flex justify-between items-center mb-4">
                                  <h4 className="font-bold">Status: {getStatusBadge(selectedCollection.status)}</h4>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                  <div>
                                    <h4 className="font-bold mb-2">Collection Address</h4>
                                    <p>{selectedCollection.collectionAddress.firstName} {selectedCollection.collectionAddress.lastName}</p>
                                    <p>{selectedCollection.collectionAddress.addressLine1}</p>
                                    {selectedCollection.collectionAddress.addressLine2 && (
                                      <p>{selectedCollection.collectionAddress.addressLine2}</p>
                                    )}
                                    <p>
                                      {selectedCollection.collectionAddress.city},
                                      {selectedCollection.collectionAddress.district && ` ${selectedCollection.collectionAddress.district},`}
                                      {' '}
                                      {selectedCollection.collectionAddress.postalCode}
                                    </p>
                                    <p>{selectedCollection.collectionAddress.country}</p>
                                  </div>
                                </div>

                                <h4 className="font-bold mb-2">Collection Details</h4>

                                <p className="font-medium">Collection Date:
                                  {formatDate(selectedCollection.collectionDate)}</p>
                                {selectedCollection.actualCollectionDate && (
                                  <p className="font-medium text-lg">Actual Collection Date:
                                    {formatDate(selectedCollection.actualCollectionDate)}</p>
                                )}

                                <br/>
                                <h4 className="font-bold mb-2">Other Details</h4>

                                <p className="font-medium">Quote Requested: {selectedCollection.requestedQuote?"Yes":"No"}</p>
                                {selectedCollection.quoteDate && (
                                  <div>
                                    <p className="font-medium">
                                      Quote Date: {formatDate(selectedCollection.quoteDate)}</p>
                                    <p className="font-medium">Price: {formatCurrency(selectedCollection.price)}</p>
                                    <p className="font-medium">
                                      Quoted by: {selectedCollection.quoteBy?.firstName}&nbsp;{selectedCollection.quoteBy?.lastName}</p>
                                  </div>
                                )}

                              </div>
                            )}
                          </DialogContent>
                        </Dialog>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default CollectionsPage;
