
import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Report } from '@/types';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface ReportCardProps {
  report: Report;
  onDownload: (reportId: string, format: 'pdf' | 'excel') => void;
}

const ReportCard: React.FC<ReportCardProps> = ({ report, onDownload }) => {
  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <CardTitle className="text-lg">{report.name}</CardTitle>
      </CardHeader>
      
      <CardContent className="flex-grow">
        <p className="text-gray-500">{report.description}</p>
      </CardContent>
      
      <CardFooter className="border-t pt-4 flex justify-between">
        <span className="text-sm text-gray-500">
          {report.type === 'order' && 'Order Data'}
          {report.type === 'inventory' && 'Inventory Data'}
          {report.type === 'user' && 'User Data'}
        </span>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">Download</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => onDownload(report.id, 'pdf')}>
              PDF Format
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onDownload(report.id, 'excel')}>
              Excel Format
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardFooter>
    </Card>
  );
};

export default ReportCard;
