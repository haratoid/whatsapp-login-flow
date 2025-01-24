import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-xl shadow-lg text-center">
        <h1 className="text-3xl font-bold text-gray-900">Welcome to AutoJualan!</h1>
        <p className="text-gray-500">You have successfully registered.</p>
        <Button
          onClick={() => navigate("/")}
          className="bg-whatsapp-primary hover:bg-whatsapp-secondary"
        >
          Logout
        </Button>
      </div>
    </div>
  );
};

export default Home;