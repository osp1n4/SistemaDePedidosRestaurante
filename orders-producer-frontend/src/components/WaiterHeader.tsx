import { Input } from './ui/input';
import { Search, LogOut } from 'lucide-react';
import { Button } from './ui/button';

interface WaiterHeaderProps {
  currentDate?: string;
  userEmail?: string;
  onLogout?: () => void;
}

export function WaiterHeader({ currentDate = new Date().toLocaleDateString('es-CO', { 
  weekday: 'long', 
  month: 'long', 
  day: 'numeric', 
  year: 'numeric' 
}), userEmail, onLogout }: WaiterHeaderProps) {
  return (
    <div className="bg-white border-b border-gray-200">
      <div className="max-w-[1600px] mx-auto px-6 py-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Menú de Productos</h1>
            <p className="text-sm text-gray-500 mt-1">{currentDate}</p>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="relative w-64 hidden md:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Buscar..."
                className="pl-10"
              />
            </div>
            
            <div className="flex items-center gap-3 border-l border-gray-200 pl-4">
              {userEmail && (
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">{userEmail}</p>
                </div>
              )}
              {onLogout && (
                <Button
                  onClick={onLogout}
                  variant="outline"
                  size="sm"
                  className="gap-2"
                >
                  <LogOut className="size-4" />
                  Cerrar Sesión
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
