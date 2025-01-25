import TransactionList from "@/components/TransactionList";

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto py-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-8">Transactions</h1>
        <TransactionList />
      </div>
    </div>
  );
};

export default Home;