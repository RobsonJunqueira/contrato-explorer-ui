
import { ContractDetailView } from "@/components/contract/ContractDetailView";
import { useContracts } from "@/hooks/useContracts";
import { useToast } from "@/hooks/use-toast";
import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { LogIn, LogOut } from "lucide-react";

const ContractDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { allContracts, isLoading, error } = useContracts();
  const { toast } = useToast();
  const { isAuthenticated, logout } = useAuth();
  
  const contract = allContracts.find(c => c.id === id || c.num_contrato === id);

  useEffect(() => {
    if (error) {
      toast({
        title: "Erro ao carregar detalhes",
        description: "Não foi possível carregar os detalhes do contrato. Por favor, tente novamente.",
        variant: "destructive",
      });
    }
  }, [error, toast]);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-navy-900 text-white py-6">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold">Detalhes do Contrato</h1>
            <p className="text-navy-100 mt-2">Informações detalhadas sobre o contrato</p>
          </div>
          {isAuthenticated ? (
            <Button variant="outline" className="text-white border-white hover:bg-navy-800" onClick={logout}>
              <LogOut className="mr-2 h-4 w-4" />
              Sair
            </Button>
          ) : (
            <Button variant="outline" className="text-white border-white hover:bg-navy-800" asChild>
              <Link to="/login">
                <LogIn className="mr-2 h-4 w-4" />
                Login
              </Link>
            </Button>
          )}
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <ContractDetailView contract={contract} isLoading={isLoading} />
      </main>
    </div>
  );
};

export default ContractDetail;
