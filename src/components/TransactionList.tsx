import { useState } from "react";
import { Search, DollarSign } from "lucide-react";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// Mock data - replace with real data later
const transactions = [
  {
    id: 1,
    customer: "John Doe",
    amount: 250000,
    date: "2024-02-20",
    status: "completed",
  },
  {
    id: 2,
    customer: "Jane Smith",
    amount: 175000,
    date: "2024-02-19",
    status: "pending",
  },
  // Add more mock transactions as needed
];

const TransactionList = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredTransactions = transactions.filter((transaction) =>
    transaction.customer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(amount);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-whatsapp-light text-whatsapp-secondary";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4 space-y-4">
      <div className="flex items-center space-x-2 bg-white rounded-lg shadow-sm p-2">
        <Search className="w-5 h-5 text-gray-400" />
        <Input
          type="text"
          placeholder="Search transactions..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="border-none focus-visible:ring-0 focus-visible:ring-offset-0"
        />
      </div>

      <div className="bg-white rounded-lg shadow-sm">
        <ScrollArea className="h-[600px] rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Customer</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTransactions.map((transaction) => (
                <TableRow key={transaction.id}>
                  <TableCell className="font-medium">
                    {transaction.customer}
                  </TableCell>
                  <TableCell className="font-medium">
                    <div className="flex items-center space-x-1">
                      <DollarSign className="w-4 h-4 text-whatsapp-secondary" />
                      <span>{formatAmount(transaction.amount)}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    {new Date(transaction.date).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                        transaction.status
                      )}`}
                    >
                      {transaction.status}
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </ScrollArea>
      </div>
    </div>
  );
};

export default TransactionList;