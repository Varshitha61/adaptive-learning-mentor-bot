
/**
 * Git Configuration Helper
 * 
 * This file provides utility functions to help configure Git credentials
 * before uploading your project to GitHub.
 */

interface GitCredentials {
  name: string;
  email: string;
}

/**
 * Sets up Git credentials for the current repository
 * @param credentials User's Git credentials (name and email)
 */
export const setupGitCredentials = async (credentials: GitCredentials): Promise<void> => {
  try {
    console.log(`Setting up Git credentials for: ${credentials.name} <${credentials.email}>`);
    
    // In a real implementation, this would execute Git commands to set user name and email
    // But since we're in a browser environment, this is for informational purposes
    
    console.log(`
    The following Git commands would normally be executed:
    
    git config user.name "${credentials.name}"
    git config user.email "${credentials.email}"
    
    To set your credentials when connecting to GitHub:
    1. Click on the GitHub button in the Lovable interface
    2. When prompted, enter these credentials
    3. Or update them in your GitHub account settings
    `);
    
  } catch (error) {
    console.error("Failed to set Git credentials:", error);
  }
};

/**
 * Displays information about GitHub integration
 */
export const showGitHubInfo = (): void => {
  console.log(`
  GitHub Integration with Lovable:
  
  1. Click the GitHub button in the top right corner of the Lovable interface
  2. Connect your GitHub account
  3. Create a new repository or select an existing one
  4. Push your project to GitHub
  5. Your name will appear on commits if configured correctly
  
  For more details, refer to: https://docs.lovable.dev/user-guides/github-integration
  `);
};
