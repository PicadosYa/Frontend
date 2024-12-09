import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Global } from "../../helpers/Global";


export const DashboardActions = () => {
  const [selectedExport, setSelectedExport] = useState(null);

  const handleExportCSV = async () => {
    if (!selectedExport) return;
    const rawToken = localStorage.getItem("token"); // Recupera el token
    const token = rawToken.replace(/"/g, "");
    try {
      const response = await fetch(`${Global.endpoints.backend}reservations/reservations-per-owner?format=csv`, {
          method: 'GET',
          headers: {
              'Authorization': `Bearer ${token}`
              }
      });

      if (!response.ok) {
          throw new Error('Error exporting reservations');
      }

      const contentType = response.headers.get("Content-Type");
      const blob = await response.blob();

      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      document.body.appendChild(link);
      link.click();

      URL.revokeObjectURL(link.href);
      link.remove();
  } catch (error) {
      console.error('Failed to export reservations:', error);
  }
    console.log(`Exportando CSV de ${selectedExport}...`);
  };

  const handlePrintPDF = async () => {
    const rawToken = localStorage.getItem("token"); // Recupera el token
    const token = rawToken.replace(/"/g, "");
    try {
      const response = await fetch(`${Global.endpoints.backend}reservations/reservations-per-owner?format=pdf`, {
          method: 'GET',
          headers: {
              'Authorization': `Bearer ${token}`
              }
      });

      if (!response.ok) {
          throw new Error('Error exporting reservations');
      }

      const contentType = response.headers.get("Content-Type");
      const blob = await response.blob();

      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      document.body.appendChild(link);
      link.click();

      URL.revokeObjectURL(link.href);
      link.remove();
  } catch (error) {
      console.error('Failed to export reservations:', error);
  }
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