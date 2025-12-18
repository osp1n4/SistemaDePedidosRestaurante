import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Button } from './ui/button';
import { CheckCircle2, Clock, Bell } from 'lucide-react';
import type { ActiveOrder } from '../hooks/useActiveOrders';

interface OrderReadyNotificationProps {
  order: ActiveOrder | null;
  open: boolean;
  onMarkAsDelivered: (orderId: string) => void;
  onSnooze: () => void;
  onClose: () => void;
}

export function OrderReadyNotification({
  order,
  open,
  onMarkAsDelivered,
  onSnooze,
  onClose
}: OrderReadyNotificationProps) {
  const [countdown, setCountdown] = useState(30);

  // Play sound when notification opens
  useEffect(() => {
    if (open && order) {
      // Play notification sound
      const audio = new Audio('/notification.mp3');
      audio.volume = 0.5;
      audio.play().catch(err => console.log('Audio play failed:', err));
    }
  }, [open, order]);

  // Countdown timer for auto-close
  useEffect(() => {
    if (!open) return;
    
    const interval = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [open]);

  if (!order) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="flex items-center gap-3 mb-2">
            <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center">
              <Bell className="h-6 w-6 text-green-600 animate-pulse" />
            </div>
            <div>
              <DialogTitle className="text-xl font-bold text-gray-900">
                ¡Orden Lista!
              </DialogTitle>
              <DialogDescription className="text-gray-600">
                La orden está lista para ser entregada
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-4">
          {/* Order Details */}
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">Mesa:</span>
              <span className="text-lg font-bold text-gray-900">{order.table}</span>
            </div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">Pedido:</span>
              <span className="text-sm font-semibold text-gray-900">{order.id}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700">Artículos:</span>
              <span className="text-sm font-semibold text-gray-900">{order.itemCount}</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-2">
            <Button
              onClick={() => onMarkAsDelivered(order.fullId)}
              className="w-full bg-green-600 hover:bg-green-700 h-12 text-base"
            >
              <CheckCircle2 className="w-5 h-5 mr-2" />
              Marcar como Entregada
            </Button>

            <Button
              onClick={onSnooze}
              variant="outline"
              className="w-full h-12 text-base"
            >
              <Clock className="w-5 h-5 mr-2" />
              Posponer 30 segundos
            </Button>
          </div>

          {/* Auto-close countdown */}
          <div className="text-center text-xs text-gray-500">
            Esta notificación se cerrará en {countdown} segundos
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
