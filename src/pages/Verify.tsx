import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { Loader2 } from "lucide-react";

const Verify = () => {
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const phoneNumber = location.state?.phoneNumber;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("phone_number", phoneNumber);
      formData.append("otp", otp);

      const response = await fetch("https://backend.autojualan.com/api/v1/auth/login/", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Invalid OTP");
      }

      toast({
        title: "Success",
        description: "OTP verified successfully",
      });

      navigate("/register", { state: { phoneNumber } });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Invalid OTP. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-xl shadow-lg">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold text-gray-900">Verify OTP</h1>
          <p className="text-gray-500">Enter the 6-digit code sent to your WhatsApp</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Input
              type="text"
              placeholder="Enter 6-digit OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              maxLength={6}
              className="w-full text-center text-2xl tracking-widest"
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
              "Verify OTP"
            )}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Verify;