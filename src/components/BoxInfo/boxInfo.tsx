interface BoxInfoProps {
  novidades?: number;
  topico?: string;
  descricao?: string;
  valor?: string | number;
  exibirPorcentagem?: boolean;
}

export function BoxInfo({ novidades, topico, descricao, valor, exibirPorcentagem }: BoxInfoProps) {
  return (
    <div className="bg-white shadow-md rounded-xl p-6 mb-6 w-full max-w-xs sm:max-w-sm sm:h-auto sm:flex sm:flex-col sm:justify-between transition-all duration-300 hover:shadow-lg">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-lg font-semibold text-gray-800">
          {topico || 'Clientes'}
        </h1>
        <span
          className={`font-semibold px-3 py-1 rounded-full text-sm border ${
            novidades != null && novidades < 0
              ? 'text-red-700 bg-red-100 border-red-300'
              : 'text-green-700 bg-green-100 border-green-300'
          }`}
        >
          {novidades != null
            ? exibirPorcentagem
              ? `${novidades}%`
              : novidades
            : 0}
        </span>
      </div>
      <div className="flex justify-between items-center text-sm text-gray-700">
        <span className="w-14 text-center font-bold text-gray-900 text-base">
          {valor || 0}
        </span>
        <p className="text-[12px] sm:text-[13px] text-gray-600">
          {descricao || 'Comparado a 1 semana atrás.'}
        </p>
      </div>
    </div>
  );
}
