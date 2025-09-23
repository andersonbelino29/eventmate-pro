import { LoginForm } from "@/components/auth/LoginForm";
import { Button } from "@/components/ui/button";
import { Building2, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-primary/5 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Back to Home */}
        <div className="mb-8">
          <Link to="/">
            <Button variant="ghost" className="mb-4">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Voltar ao Início
            </Button>
          </Link>
        </div>

        <LoginForm />

        <div className="text-center mt-8 text-sm text-muted-foreground">
          <p>
            Não tem uma conta?{' '}
            <Link to="/pricing" className="text-primary hover:underline">
              Comece gratuitamente
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;