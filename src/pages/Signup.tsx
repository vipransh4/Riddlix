import SignupForm from "../components/SignupForm";
import Snow from "@/components/Snow";

export default function Signup() {
  return (
    <div className="relative min-h-screen bg-background overflow-hidden">
      <Snow />
      <div className="flex items-center justify-center min-h-screen">
        <SignupForm />
      </div>
    </div>
  );
}