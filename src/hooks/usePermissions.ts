import { useUser } from '@/contexts/UserContext';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { toast } from '@/components/ui/use-toast';

export const usePermissions = (requiredPermission: keyof UserPermissions) => {
  const { permissions } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (!permissions[requiredPermission]) {
      toast({
        title: "Access Denied",
        description: "You don't have permission to access this feature",
        variant: "destructive",
      });
      navigate('/');
    }
  }, [permissions, requiredPermission, navigate]);

  return permissions[requiredPermission];
};