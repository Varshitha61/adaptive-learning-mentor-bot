
import { useState } from 'react';
import AppLayout from '@/components/layout/AppLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/components/ui/use-toast';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const SettingsPage = () => {
  const { toast } = useToast();
  const [profileForm, setProfileForm] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    bio: 'Student passionate about mathematics and physics.',
  });
  
  const [notifications, setNotifications] = useState({
    emailUpdates: true,
    newContentAlerts: true,
    studyReminders: true,
    achievements: true,
  });
  
  const [preferences, setPreferences] = useState({
    difficulty: 'intermediate',
    studySessionLength: '25',
    breakLength: '5',
    topics: 'Mathematics, Physics, Computer Science',
  });
  
  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setProfileForm({
      ...profileForm,
      [e.target.name]: e.target.value
    });
  };
  
  const handleSaveProfile = () => {
    toast({
      title: 'Profile Updated',
      description: 'Your profile has been updated successfully.',
    });
  };
  
  const handleNotificationChange = (key: string) => {
    setNotifications({
      ...notifications,
      [key]: !notifications[key as keyof typeof notifications]
    });
  };
  
  const handlePreferenceChange = (key: string, value: string) => {
    setPreferences({
      ...preferences,
      [key]: value
    });
  };
  
  return (
    <AppLayout>
      <div className="space-y-6 max-w-3xl mx-auto">
        <div>
          <h1 className="text-3xl font-bold">Settings</h1>
          <p className="text-muted-foreground">
            Manage your account settings and preferences
          </p>
        </div>
        
        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList className="grid w-full max-w-md grid-cols-3">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="preferences">Learning Preferences</TabsTrigger>
          </TabsList>
          
          <TabsContent value="profile">
            <Card>
              <CardHeader>
                <CardTitle>Profile Information</CardTitle>
                <CardDescription>
                  Update your personal information
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    name="name"
                    value={profileForm.name}
                    onChange={handleProfileChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={profileForm.email}
                    onChange={handleProfileChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea
                    id="bio"
                    name="bio"
                    value={profileForm.bio}
                    onChange={handleProfileChange}
                    rows={4}
                  />
                </div>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button onClick={handleSaveProfile}>Save Changes</Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="notifications">
            <Card>
              <CardHeader>
                <CardTitle>Notification Settings</CardTitle>
                <CardDescription>
                  Customize how and when we notify you
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Email Updates</Label>
                      <p className="text-sm text-muted-foreground">
                        Receive weekly progress and updates via email
                      </p>
                    </div>
                    <Switch
                      checked={notifications.emailUpdates}
                      onCheckedChange={() => handleNotificationChange('emailUpdates')}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>New Content Alerts</Label>
                      <p className="text-sm text-muted-foreground">
                        Get notified when new courses or resources are available
                      </p>
                    </div>
                    <Switch
                      checked={notifications.newContentAlerts}
                      onCheckedChange={() => handleNotificationChange('newContentAlerts')}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Study Reminders</Label>
                      <p className="text-sm text-muted-foreground">
                        Receive reminders for scheduled study sessions
                      </p>
                    </div>
                    <Switch
                      checked={notifications.studyReminders}
                      onCheckedChange={() => handleNotificationChange('studyReminders')}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Achievement Notifications</Label>
                      <p className="text-sm text-muted-foreground">
                        Get notified when you earn new achievements
                      </p>
                    </div>
                    <Switch
                      checked={notifications.achievements}
                      onCheckedChange={() => handleNotificationChange('achievements')}
                    />
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button onClick={() => toast({ title: 'Notification settings saved' })}>
                  Save Preferences
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="preferences">
            <Card>
              <CardHeader>
                <CardTitle>Learning Preferences</CardTitle>
                <CardDescription>
                  Customize your learning experience
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="difficulty">Default Difficulty Level</Label>
                  <Select
                    value={preferences.difficulty}
                    onValueChange={(value) => handlePreferenceChange('difficulty', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select difficulty" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="beginner">Beginner</SelectItem>
                      <SelectItem value="intermediate">Intermediate</SelectItem>
                      <SelectItem value="advanced">Advanced</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="studySessionLength">
                    Default Study Session Length (minutes)
                  </Label>
                  <Input
                    id="studySessionLength"
                    type="number"
                    value={preferences.studySessionLength}
                    onChange={(e) => handlePreferenceChange('studySessionLength', e.target.value)}
                    min="5"
                    max="120"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="breakLength">
                    Default Break Length (minutes)
                  </Label>
                  <Input
                    id="breakLength"
                    type="number"
                    value={preferences.breakLength}
                    onChange={(e) => handlePreferenceChange('breakLength', e.target.value)}
                    min="1"
                    max="30"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="topics">Preferred Topics (comma separated)</Label>
                  <Textarea
                    id="topics"
                    value={preferences.topics}
                    onChange={(e) => handlePreferenceChange('topics', e.target.value)}
                    rows={2}
                  />
                </div>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button onClick={() => toast({ title: 'Learning preferences saved' })}>
                  Save Preferences
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
};

export default SettingsPage;
