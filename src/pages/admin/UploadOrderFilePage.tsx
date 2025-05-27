
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Upload, FileText, CheckCircle, AlertCircle, Download, ArrowRight, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const UploadOrderFilePage = () => {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [validationStatus, setValidationStatus] = useState<'pending' | 'success' | 'error' | null>(null);
  const [validationMessage, setValidationMessage] = useState('');
  const { toast } = useToast();
  const navigate = useNavigate();

  const sampleFormats = {
    csv: `order_id,customer_name,product_name,quantity,price,order_date
ORD001,John Doe,Product A,2,29.99,2024-01-15
ORD002,Jane Smith,Product B,1,49.99,2024-01-16`,
    xml: `<?xml version="1.0" encoding="UTF-8"?>
<orders>
  <order>
    <order_id>ORD001</order_id>
    <customer_name>John Doe</customer_name>
    <product_name>Product A</product_name>
    <quantity>2</quantity>
    <price>29.99</price>
    <order_date>2024-01-15</order_date>
  </order>
</orders>`
  };

  const validateFileFormat = (file: File): boolean => {
    const fileExtension = file.name.split('.').pop()?.toLowerCase();
    
    if (!fileExtension || !['csv', 'xml'].includes(fileExtension)) {
      setValidationStatus('error');
      setValidationMessage('Please upload a valid CSV or XML file.');
      return false;
    }

    // For demo purposes, we'll assume the file is valid if it has the right extension
    // In a real app, you would parse and validate the file content here
    setValidationStatus('success');
    setValidationMessage(`${fileExtension.toUpperCase()} file format validated successfully.`);
    return true;
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setUploadedFile(file);
      setValidationStatus('pending');
      setValidationMessage('');
      
      // Validate file format
      setTimeout(() => {
        validateFileFormat(file);
      }, 1000);
    }
  };

  const handleRemoveFile = () => {
    setUploadedFile(null);
    setValidationStatus(null);
    setValidationMessage('');
    
    // Reset the file input
    const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
    if (fileInput) {
      fileInput.value = '';
    }

    toast({
      title: "File removed",
      description: "The uploaded file has been removed.",
    });
  };

  const handleUpload = async () => {
    if (!uploadedFile || validationStatus !== 'success') return;

    setIsUploading(true);
    
    try {
      // In a real app, you would upload the file to your server here
      // For demo purposes, we'll simulate an upload
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast({
        title: "Upload successful",
        description: "Your order file has been uploaded and processed successfully.",
      });

      // Navigate to the next page (you can implement this navigation)
      // For now, we'll just show a success message
      setTimeout(() => {
        toast({
          title: "Processing complete",
          description: "Redirecting to order processing page...",
        });
      }, 1000);
      
    } catch (error) {
      toast({
        title: "Upload failed",
        description: "There was an error uploading your file. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };

  const downloadSampleFile = (format: 'csv' | 'xml') => {
    const content = sampleFormats[format];
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `sample_orders.${format}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    toast({
      title: `Sample ${format.toUpperCase()} downloaded`,
      description: "Use this file as a reference for the correct format.",
    });
  };

  const handleProceedToProcessing = () => {
    toast({
      title: "Proceeding to order processing",
      description: "Redirecting to the order processing page...",
    });
    
    // Here you can add navigation logic to go to the next page
     navigate('/cart');
    
  };


  return (
    <Layout requireAuth={true} requireAdmin={true}>
    <div className="container px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Upload Order File</h1>
        <p className="text-gray-500">Upload your order file in CSV or XML format for processing.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Upload Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Upload className="h-5 w-5" />
              File Upload
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
              <Input
                type="file"
                accept=".csv,.xml"
                onChange={handleFileSelect}
                className="mb-4"
              />
              <p className="text-sm text-gray-500">
                Select a CSV or XML file to upload
              </p>
            </div>

            {uploadedFile && (
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  <span className="text-sm font-medium">{uploadedFile.name}</span>
                  <span className="text-xs text-gray-500">
                    ({(uploadedFile.size / 1024).toFixed(1)} KB)
                  </span>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleRemoveFile}
                  className="h-8 w-8 p-0 text-red-500 hover:text-red-700 hover:bg-red-50"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            )}

            {validationStatus && (
              <div className={`flex items-center gap-2 p-3 rounded-lg ${
                validationStatus === 'success' ? 'bg-green-50 text-green-700' :
                validationStatus === 'error' ? 'bg-red-50 text-red-700' :
                'bg-yellow-50 text-yellow-700'
              }`}>
                {validationStatus === 'success' && <CheckCircle className="h-4 w-4" />}
                {validationStatus === 'error' && <AlertCircle className="h-4 w-4" />}
                {validationStatus === 'pending' && <div className="animate-spin h-4 w-4 border-2 border-current border-t-transparent rounded-full" />}
                <span className="text-sm">{validationMessage || 'Validating file format...'}</span>
              </div>
            )}

            <Button
              onClick={handleUpload}
              disabled={!uploadedFile || validationStatus !== 'success' || isUploading}
              className="w-full"
            >
              {isUploading ? 'Uploading...' : 'Upload File'}
            </Button>


            {validationStatus === 'success' && (
              <Button
                onClick={handleProceedToProcessing}
                className="w-full mt-2 bg-green-600 hover:bg-green-700 text-white"
                variant="outline"
                
              >
                <ArrowRight className="h-4 w-4 mr-2" />
                Proceed to Order Processing
              </Button>
            )}

          </CardContent>
        </Card>

        {/* Sample Format Section */}
        <Card>
          <CardHeader>
            <CardTitle>Sample File Formats</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gray-500 text-sm">
            Please ensure that your file matches the required CSV or XML format.
            You can download the sample file formats provided below to understand the correct structure. These samples outline the mandatory fields and format expectations needed for successfully processing your order data. Uploads that do not follow the specified format may result in errors or failed submissions. Kindly refer to the sample files to prepare your data accordingly.
            </p>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <p className="font-medium">CSV Format</p>
                  <p className="text-sm text-gray-500">Comma-separated values</p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => downloadSampleFile('csv')}
                  className="flex items-center gap-2"
                >
                  <Download className="h-4 w-4" />
                  Download
                </Button>
              </div>

              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <p className="font-medium">XML Format</p>
                  <p className="text-sm text-gray-500">Extensible Markup Language</p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => downloadSampleFile('xml')}
                  className="flex items-center gap-2"
                >
                  <Download className="h-4 w-4" />
                  Download
                </Button>
              </div>
            </div>

            {/* <div className="mt-6 p-4 bg-blue-50 rounded-lg">
              <h4 className="font-medium text-blue-900 mb-2">Required Fields:</h4>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>• order_id</li>
                <li>• customer_name</li>
                <li>• product_name</li>
                <li>• quantity</li>
                <li>• price</li>
                <li>• order_date</li>
              </ul>
            </div> */}
          </CardContent>
        </Card>
      </div>
    </div>
    </Layout>
  );
};

export default UploadOrderFilePage;