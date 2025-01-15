export type UserRole = 
  | 'owner'
  | 'general_manager'
  | 'manager'
  | 'driver'
  | 'front_of_house'
  | 'cook';

export interface UserProfile {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  active: boolean;
  createdAt: Date;
  lastLogin?: Date;
  phoneNumber?: string;
  emergencyContact?: {
    name: string;
    phone: string;
    relationship: string;
  };
}

export interface UserPermissions {
  canManageUsers: boolean;
  canManageRoles: boolean;
  canViewReports: boolean;
  canManageMenu: boolean;
  canManageOrders: boolean;
  canProcessPayments: boolean;
  canAssignDrivers: boolean;
  canViewKitchen: boolean;
}

export const getRolePermissions = (role: UserRole): UserPermissions => {
  switch (role) {
    case 'owner':
      return {
        canManageUsers: true,
        canManageRoles: true,
        canViewReports: true,
        canManageMenu: true,
        canManageOrders: true,
        canProcessPayments: true,
        canAssignDrivers: true,
        canViewKitchen: true,
      };
    case 'general_manager':
      return {
        canManageUsers: true,
        canManageRoles: false,
        canViewReports: true,
        canManageMenu: true,
        canManageOrders: true,
        canProcessPayments: true,
        canAssignDrivers: true,
        canViewKitchen: true,
      };
    case 'manager':
      return {
        canManageUsers: false,
        canManageRoles: false,
        canViewReports: true,
        canManageMenu: true,
        canManageOrders: true,
        canProcessPayments: true,
        canAssignDrivers: true,
        canViewKitchen: true,
      };
    case 'driver':
      return {
        canManageUsers: false,
        canManageRoles: false,
        canViewReports: false,
        canManageMenu: false,
        canManageOrders: false,
        canProcessPayments: false,
        canAssignDrivers: false,
        canViewKitchen: false,
      };
    case 'front_of_house':
      return {
        canManageUsers: false,
        canManageRoles: false,
        canViewReports: false,
        canManageMenu: false,
        canManageOrders: true,
        canProcessPayments: true,
        canAssignDrivers: false,
        canViewKitchen: true,
      };
    case 'cook':
      return {
        canManageUsers: false,
        canManageRoles: false,
        canViewReports: false,
        canManageMenu: false,
        canManageOrders: false,
        canProcessPayments: false,
        canAssignDrivers: false,
        canViewKitchen: true,
      };
    default:
      return {
        canManageUsers: false,
        canManageRoles: false,
        canViewReports: false,
        canManageMenu: false,
        canManageOrders: false,
        canProcessPayments: false,
        canAssignDrivers: false,
        canViewKitchen: false,
      };
  }
};