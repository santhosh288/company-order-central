
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import ReportCard from '@/components/admin/ReportCard';
import { reports } from '@/data/mockData';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

const ReportsPage = () => {
  const [availableReports] = useState(reports);
  const { toast } = useToast();
  
  const handleDownloadReport = (reportId: string, format: 'pdf' | 'excel') => {
    // In a real app, this would trigger a download via API
    const report = availableReports.find(r => r.id === reportId);
    if (!report) return;
    
    toast({
      title: `Downloading ${report.name}`,
      description: `Your ${format.toUpperCase()} report is being prepared for download.`,
    });
    
    // Simulate download delay
    setTimeout(() => {
      toast({
        title: "Download complete",
        description: `${report.name} has been downloaded successfully.`,
      });
    }, 2000);
  };

  return (
    <Layout requireAuth={true} requireAdmin={true}>
      <div className="container px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Reports</h1>
          <p className="text-gray-500">Generate and download detailed reports for your company.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {availableReports.map(report => (
            <ReportCard
              key={report.id}
              report={report}
              onDownload={handleDownloadReport}
            />
          ))}
        </div>

        {/* Custom Report Builder */}
        <div className="mt-10">
          <Card>
            <CardHeader>
              <CardTitle>Custom Report Builder</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-500 mb-4">
                Build custom reports with specific filters and parameters.
              </p>
              <p className="text-gray-500 text-sm italic">
                This feature will be available in a future update.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default ReportsPage;
