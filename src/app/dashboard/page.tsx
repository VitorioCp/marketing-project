import { BoxInfo } from "@/components/BoxInfo/boxInfo";

export default function DashboardPage() {
  return (
    <main className="p-4 sm:p-6 md:p-10">
      <h1 className="text-2xl font-semibold mb-2">Dashboard</h1>
      <p className="mb-6 text-gray-600">Bem-vindo ao seu CRM, Vitório!</p>

      <div className="flex flex-col md:flex-row gap-5">
        <BoxInfo
          descricao="Ultima semana"
          valor={14}
          novidades={5}
          topico="Clientes"
        />
        <BoxInfo
          descricao="Ultima semana"
          valor={"R$2.500,00"}
          novidades={-8}
          topico="Receita"
          exibirPorcentagem={true}
        />
      </div>
    </main>
  );
}
