import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Switch } from "@/components/ui/switch";
import { 
  Settings as SettingsIcon, 
  Printer, 
  Bell, 
  Lock,
  User,
  Save
} from "lucide-react";

const Settings = () => {
  const settingsSections = [
    {
      title: "General",
      icon: SettingsIcon,
      settings: [
        { label: "Restaurant Name", type: "text", value: "RestaurantPOS" },
        { label: "Currency", type: "select", value: "USD" },
        { label: "Time Zone", type: "select", value: "UTC-8" },
      ]
    },
    {
      title: "Printer Settings",
      icon: Printer,
      settings: [
        { label: "Default Printer", type: "select", value: "Kitchen Printer" },
        { label: "Receipt Footer Text", type: "textarea", value: "Thank you for dining with us!" },
      ]
    },
    {
      title: "Notifications",
      icon: Bell,
      settings: [
        { label: "Order Notifications", type: "toggle", value: true },
        { label: "Low Stock Alerts", type: "toggle", value: true },
      ]
    },
    {
      title: "Security",
      icon: Lock,
      settings: [
        { label: "Require PIN for Void", type: "toggle", value: true },
        { label: "Session Timeout (minutes)", type: "number", value: "30" },
      ]
    },
    {
      title: "User Profile",
      icon: User,
      settings: [
        { label: "Name", type: "text", value: "Admin User" },
        { label: "Email", type: "email", value: "admin@restaurant.com" },
      ]
    },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-pos-text">Settings</h1>
      
      <ScrollArea className="h-[calc(100vh-12rem)]">
        <div className="space-y-6 pr-4">
          {settingsSections.map((section) => {
            const Icon = section.icon;
            return (
              <Card key={section.title} className="p-6 bg-slate-800">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="p-2 bg-slate-700 rounded-lg">
                    <Icon className="h-6 w-6 text-pos-accent" />
                  </div>
                  <h2 className="text-xl font-semibold text-pos-text">{section.title}</h2>
                </div>
                
                <div className="space-y-4">
                  {section.settings.map((setting) => (
                    <div key={setting.label} className="grid gap-2">
                      <Label htmlFor={setting.label} className="text-pos-text">
                        {setting.label}
                      </Label>
                      {setting.type === 'toggle' ? (
                        <Switch
                          id={setting.label}
                          checked={setting.value as boolean}
                          onCheckedChange={() => {}}
                          className="bg-slate-700"
                        />
                      ) : (
                        <Input
                          id={setting.label}
                          type={setting.type}
                          value={setting.value as string}
                          className="bg-slate-700 border-slate-600 text-pos-text"
                        />
                      )}
                    </div>
                  ))}
                </div>
              </Card>
            );
          })}
        </div>
      </ScrollArea>

      {/* Save Button - Fixed at bottom */}
      <div className="fixed bottom-4 right-4 md:right-8">
        <Card className="p-4 bg-pos-accent hover:bg-amber-600 transition-colors cursor-pointer flex items-center space-x-2">
          <Save className="h-5 w-5 text-slate-900" />
          <span className="font-semibold text-slate-900">Save Changes</span>
        </Card>
      </div>
    </div>
  );
};

export default Settings;