
import { ContractDetailView } from "@/components/ContractDetailView";
import { useContracts } from "@/hooks/useContracts";
import { useToast } from "@/components/ui/use-toast";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

const ContractDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { allContracts, isLoading, error } = useContracts();
  const { toast } = useToast();
  
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
        <div className="container mx-auto px-4">
          <h1 className="text-2xl md:text-3xl font-bold">Detalhes do Contrato</h1>
          <p className="text-navy-100 mt-2">Informações detalhadas sobre o contrato</p>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <ContractDetailView contract={contract} isLoading={isLoading} />
      </main>
    </div>
  );
};

export default ContractDetail;
