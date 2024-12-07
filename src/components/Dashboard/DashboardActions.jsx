import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export const DashboardActions = () => {
  const [selectedExport, setSelectedExport] = useState(null);

  const handleExportCSV = () => {
    if (!selectedExport) return;

    // Implementar la logica del exportado CSV
    console.log(`Exportando CSV de ${selectedExport}...`);
  };

  const handlePrintPDF = () => {
    // Implementar la impresion del PDF
    console.log("Imprimiendo PDF...");
  };

  const getExportLabel = (type) => {
    switch (type) {
      case "ventas":
        return "Ventas Mensuales";
      case "reservas":
        return "Reservas por Hora";
      case "clientes":
        return "Lista de Clientes";
      default:
        return "Seleccionar Datos";
    }
  };

  return (
    <div className="flex flex-col backdrop-blur-xl bg-dashboard-glass rounded-lg border border-white/10">
      <div className="flex justify-between items-center p-4">
        <div className="flex gap-2 items-center">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                {selectedExport
                  ? getExportLabel(selectedExport)
                  : "Seleccionar Datos"}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => setSelectedExport("ventas")}>
                Ventas Mensuales
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSelectedExport("reservas")}>
                Reservas por Hora
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSelectedExport("clientes")}>
                Lista de Clientes
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button
            variant="default"
            onClick={handleExportCSV}
            disabled={!selectedExport}
            className="bg-dashboard-accent hover:bg-dashboard-accent/90"
          >
            Exportar
          </Button>
        </div>

        <div>
          <Button onClick={handlePrintPDF}>Imprimir PDF</Button>
        </div>
      </div>

      <div className="flex justify-center items-center p-4 border-t border-white/10">
        <div className="w-32 h-12 flex items-center justify-center text-white/50">
          Logo
        </div>
      </div>
    </div>
  );
};

export default DashboardActions;