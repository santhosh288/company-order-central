import { useState } from "react";
import {Link} from "react-router-dom";

const AdminToolsMenu = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="relative inline-block text-left group">
            {/* Button */}
            <p className="px-4 py-2 rounded-md text-sm font-medium hover:text-blue-700 transition cursor-pointer"
                onClick={() => setIsOpen(!isOpen)}>
                Admin Tools
            </p>

            {/* Dropdown Items */}
            {isOpen && (
                <div className="absolute mt-2 w-48 bg-white border rounded-md shadow-lg z-50">
                    <ul className="py-2">
                        <li className="px-3 py-2 rounded-md text-sm font-medium text-gray-600 hover:text-white hover:bg-blue-600 cursor-pointer">
                            <Link to="/admin/orders">Manage Orders</Link>
                        </li>
                        <li className="px-3 py-2 rounded-md text-sm font-medium text-gray-600 hover:text-white hover:bg-blue-600 cursor-pointer">
                            <Link to="/admin/reports">Reports</Link>
                        </li>
                        <li className="px-3 py-2 rounded-md text-sm font-medium text-gray-600 hover:text-white hover:bg-blue-600 cursor-pointer">
                            <Link to="/admin/upload-orders">Upload Order File</Link>
                        </li>
                        <li className="px-3 py-2 rounded-md text-sm font-medium text-gray-600 hover:text-white hover:bg-blue-600 cursor-pointer">
                            <Link to="/admin/ship-notifications">Ship Notifications (PO)</Link>
                        </li>
                        <li className="px-3 py-2 rounded-md text-sm font-medium text-gray-600 hover:text-white hover:bg-blue-600 cursor-pointer">
                            <Link to="/admin/collections">Collections</Link>
                        </li>
                    </ul>
                </div>
            )}
        </div>
    );
};

export default AdminToolsMenu;