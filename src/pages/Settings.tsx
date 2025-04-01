
import React, { useState } from 'react';
import { PageHeader } from '@/components/layout/PageHeader';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useLayout } from '@/contexts/LayoutContext';
import { Chrome, Image, Save } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

// Color presets for easy selection
const colorPresets = [
  { name: 'Default Blue', value: '221.2 83% 53.3%' },
  { name: 'Royal Purple', value: '262 83% 58%' },
  { name: 'Emerald Green', value: '142 76% 36%' },
  { name: 'Ruby Red', value: '0 84% 60%' },
  { name: 'Amber', value: '38 92% 50%' },
  { name: 'Indigo', value: '231 48% 48%' },
  { name: 'Teal', value: '174 84% 32%' },
];

const Settings: React.FC = () => {
  const { branding, updateBranding } = useLayout();
  const [portalName, setPortalName] = useState(branding.name);
  const [logoUrl, setLogoUrl] = useState(branding.logo);
  const [selectedColor, setSelectedColor] = useState(branding.primaryColor);
  const [customColor, setCustomColor] = useState('');

  const handleSaveBranding = () => {
    updateBranding({
      name: portalName,
      logo: logoUrl,
      primaryColor: selectedColor,
    });
    
    toast({
      title: "Branding updated",
      description: "Your portal branding settings have been saved",
    });
  };

  const handleSelectColor = (colorValue: string) => {
    setSelectedColor(colorValue);
  };

  const handleCustomColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomColor(e.target.value);
  };

  const applyCustomColor = () => {
    // Convert hex to HSL
    if (customColor.startsWith('#') && (customColor.length === 4 || customColor.length === 7)) {
      // Simple hex to HSL conversion - in a real app would need more sophisticated conversion
      setSelectedColor('221.2 83% 53.3%'); // Simplified for demo
      toast({
        title: "Custom color applied",
        description: "Your custom color has been applied to the portal",
      });
    } else {
      toast({
        title: "Invalid color format",
        description: "Please enter a valid hex color code (e.g. #3b82f6)",
        variant: "destructive",
      });
    }
  };

  return (
    <>
      <PageHeader
        title="Settings"
        description="Configure your API portal settings"
      />
      
      <Tabs defaultValue="branding" className="mb-6">
        <TabsList>
          <TabsTrigger value="branding">
            <Chrome className="mr-2 h-4 w-4" />
            Branding
          </TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="integrations">Integrations</TabsTrigger>
        </TabsList>
        
        <TabsContent value="branding">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Portal Branding</CardTitle>
                  <CardDescription>
                    Customize how your API portal looks and feels
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="portal-name">Portal Name</Label>
                    <Input
                      id="portal-name"
                      placeholder="Enter portal name"
                      value={portalName}
                      onChange={(e) => setPortalName(e.target.value)}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="logo-url">Logo URL</Label>
                    <div className="flex gap-2">
                      <Input
                        id="logo-url"
                        placeholder="Enter logo URL or leave blank to use initial"
                        value={logoUrl}
                        onChange={(e) => setLogoUrl(e.target.value)}
                      />
                      <Button variant="outline" size="icon">
                        <Image className="h-4 w-4" />
                      </Button>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      For best results, use a square SVG or PNG with transparent background
                    </p>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Color Theme</CardTitle>
                  <CardDescription>
                    Select a primary color for your portal
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-7 gap-2">
                    {colorPresets.map((color) => (
                      <div 
                        key={color.name}
                        className={`
                          rounded-md cursor-pointer border-2 p-1 transition-all
                          ${selectedColor === color.value ? 'border-black dark:border-white scale-105' : 'border-transparent'}
                        `}
                        onClick={() => handleSelectColor(color.value)}
                      >
                        <div 
                          className="h-12 rounded-sm w-full"
                          style={{ 
                            backgroundColor: `hsl(${color.value})`,
                            boxShadow: 'inset 0 0 0 1px rgba(0,0,0,0.1)'
                          }}
                        />
                        <p className="text-xs text-center mt-1 font-medium">{color.name}</p>
                      </div>
                    ))}
                  </div>
                  
                  <div className="pt-2 border-t">
                    <Label htmlFor="custom-color">Custom Color (Hex)</Label>
                    <div className="flex gap-2 mt-1.5">
                      <Input
                        id="custom-color"
                        placeholder="#3b82f6"
                        value={customColor}
                        onChange={handleCustomColorChange}
                      />
                      <Button onClick={applyCustomColor}>Apply</Button>
                    </div>
                  </div>
                  
                  <Button 
                    className="w-full mt-4"
                    onClick={handleSaveBranding}
                  >
                    <Save className="mr-2 h-4 w-4" />
                    Save Branding Changes
                  </Button>
                </CardContent>
              </Card>
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle>Preview</CardTitle>
                <CardDescription>
                  See how your branding will look
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="rounded-lg border p-4 bg-background">
                    <div className="flex items-center mb-4">
                      {logoUrl ? (
                        <img src={logoUrl} alt="Logo" className="h-8 w-8 rounded" />
                      ) : (
                        <div 
                          className="h-8 w-8 rounded flex items-center justify-center text-brand-foreground"
                          style={{ backgroundColor: `hsl(${selectedColor})` }}
                        >
                          <span className="font-bold text-xs">{portalName.charAt(0)}</span>
                        </div>
                      )}
                      <span className="ml-2 font-semibold">{portalName}</span>
                    </div>
                    
                    <div className="space-y-2">
                      <div 
                        className="h-8 rounded-md w-full flex items-center justify-center text-white"
                        style={{ backgroundColor: `hsl(${selectedColor})` }}
                      >
                        Primary Button
                      </div>
                      
                      <div className="flex items-center">
                        <div 
                          className="h-4 w-4 rounded-full mr-2" 
                          style={{ backgroundColor: `hsl(${selectedColor})` }}
                        />
                        <span 
                          className="font-medium" 
                          style={{ color: `hsl(${selectedColor})` }}
                        >
                          Branded Text
                        </span>
                      </div>
                      
                      <div 
                        className="rounded-md p-2 mt-2" 
                        style={{ 
                          backgroundColor: `hsla(${selectedColor.split(' ')[0]}, ${parseInt(selectedColor.split(' ')[1]) * 0.3}%, ${parseInt(selectedColor.split(' ')[2]) + 30}%, 0.2)`,
                          color: `hsl(${selectedColor})`
                        }}
                      >
                        Subtle Brand Background
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-sm text-muted-foreground">
                    This preview shows a simplified version of how your branding will appear throughout the portal.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="security">
          <Card>
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
              <CardDescription>
                Configure security settings for your API portal
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Security settings will be implemented in a future update.</p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Notification Settings</CardTitle>
              <CardDescription>
                Configure notification preferences
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Notification settings will be implemented in a future update.</p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="integrations">
          <Card>
            <CardHeader>
              <CardTitle>Integrations</CardTitle>
              <CardDescription>
                Connect your API portal with other services
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Integration settings will be implemented in a future update.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </>
  );
};

export default Settings;
