import { NumericFormat } from "react-number-format";

export default function ConfigModalML({ onClose }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-60">
      <div className="bg-white p-6 rounded-lg w-[90%] max-w-[600px] shadow-lg">
        <h2 className="text-xl font-bold text-center mb-6 text-gray-800">CONFIGURAÇÕES DE INTEGRAÇÃO - MERCADO LIVRE</h2>

        <div className="space-y-4">
          {/* Margem de Lucro Desejada */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Lucro Desejado</label>
            <div className="flex items-center border rounded-md overflow-hidden">
              <div className="bg-gray-100 text-black px-3 py-2 text-sm font-medium">%</div>
              <NumericFormat
                className="flex-1 px-3 py-2 outline-none"
                thousandSeparator="."
                decimalSeparator=","
                allowNegative={false}
                decimalScale={2}
                fixedDecimalScale
                placeholder="0,00"
              />
            </div>
          </div>

          {/* Lucro Mínimo */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Lucro Mínimo</label>
            <div className="flex items-center border rounded-md overflow-hidden">
              <div className="bg-gray-100 text-black px-3 py-2 text-sm font-medium">%</div>
              <NumericFormat
                className="flex-1 px-3 py-2 outline-none"
                thousandSeparator="."
                decimalSeparator=","
                allowNegative={false}
                decimalScale={2}
                fixedDecimalScale
                placeholder="0,00"
              />
            </div>
          </div>

          {/* Lucro Máximo */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Lucro Máximo</label>
            <div className="flex items-center border rounded-md overflow-hidden">
              <div className="bg-gray-100 text-black px-3 py-2 text-sm font-medium">%</div>
              <NumericFormat
                className="flex-1 px-3 py-2 outline-none"
                thousandSeparator="."
                decimalSeparator=","
                allowNegative={false}
                decimalScale={2}
                fixedDecimalScale
                placeholder="0,00"
              />
            </div>
          </div>

          {/* Imposto CNPJ */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Imposto CNPJ</label>
            <div className="flex items-center border rounded-md overflow-hidden">
              <div className="bg-gray-100 text-black px-3 py-2 text-sm font-medium">%</div>
              <NumericFormat
                className="flex-1 px-3 py-2 outline-none"
                thousandSeparator="."
                decimalSeparator=","
                allowNegative={false}
                decimalScale={2}
                fixedDecimalScale
                placeholder="0,00"
              />
            </div>
          </div>

          {/* Custos Extras */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Extra</label>
            <div className="flex items-center border rounded-md overflow-hidden">
              <div className="bg-gray-100 text-black px-3 py-2 text-sm font-medium">R$</div>
              <NumericFormat
                className="flex-1 px-3 py-2 outline-none"
                thousandSeparator="."
                decimalSeparator=","
                allowNegative={false}
                decimalScale={2}
                fixedDecimalScale
                placeholder="0,00"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end mt-6">
          <button
            onClick={onClose}
            className="bg-gray-800 text-white px-5 py-2 rounded hover:bg-gray-700 transition"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
}
