import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { Loader2 } from "lucide-react";

const Login = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("phone_number", phoneNumber);

      const response = await fetch("https://backend.autojualan.com/api/v1/auth/otp/", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to send OTP");
      }

      toast({
        title: "OTP Sent",
        description: "Please check your WhatsApp for the verification code",
      });

      navigate("/verify", { state: { phoneNumber } });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to send OTP. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-xl shadow-lg">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold text-gray-900">Welcome</h1>
          <p className="text-gray-500">Enter your WhatsApp number to continue</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Input
              type="tel"
              placeholder="WhatsApp Number"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="w-full"
              required
            />
          </div>
          <Button
            type="submit"
            className="w-full bg-whatsapp-primary hover:bg-whatsapp-secondary"
            disabled={loading}
          >
            {loading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              "Send OTP"
            )}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Login;