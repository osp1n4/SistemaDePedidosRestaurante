import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export const usePageTitle = () => {
  const location = useLocation();

  useEffect(() => {
    let title = 'Rápido y Sabroso';

    if (location.pathname.includes('/mesero')) {
      title = 'Rápido y Sabroso - Mesero';
    } else if (location.pathname.includes('/cocina')) {
      title = 'Rápido y Sabroso - Cocina';
    } else if (location.pathname.includes('/admin')) {
      title = 'Rápido y Sabroso - Admin';
    } else if (location.pathname.includes('/login')) {
      title = 'Rápido y Sabroso - Login';
    }

    document.title = title;
  }, [location.pathname]);
};
