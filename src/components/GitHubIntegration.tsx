
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { setupGitCredentials, showGitHubInfo } from '@/utils/gitConfig';

export function GitHubIntegration() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isConfigured, setIsConfigured] = useState(false);

  const handleSetupCredentials = () => {
    if (!name || !email) {
      return;
    }
    
    setupGitCredentials({ name, email });
    setIsConfigured(true);
    showGitHubInfo();
  };

  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>GitHub Integration</CardTitle>
        <CardDescription>Configure your GitHub identity</CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Name</Label>
              <Input 
                id="name" 
                placeholder="Your Name" 
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="email">Email</Label>
              <Input 
                id="email" 
                placeholder="your.email@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>
        </form>
        {isConfigured && (
          <div className="mt-4 p-3 bg-green-100 text-green-800 rounded-md">
            Credentials prepared! Use the GitHub button in the top-right corner to connect.
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={showGitHubInfo}>
          How it works
        </Button>
        <Button onClick={handleSetupCredentials}>Save Credentials</Button>
      </CardFooter>
    </Card>
  );
}
