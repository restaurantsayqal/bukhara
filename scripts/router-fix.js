const fs = require('fs-extra');
const path = require('path');
const glob = require('glob');

async function fixRouter() {
  console.log('Updating router configuration for GitHub Pages...');
  
  try {
    // Find index.js or similar main entry file
    const possibleMainFiles = [
      './src/index.js',
      './src/index.jsx',
      './src/main.js',
      './src/main.jsx',
      './src/App.js',
      './src/App.jsx'
    ];
    
    let mainFile;
    for (const file of possibleMainFiles) {
      if (await fs.pathExists(file)) {
        mainFile = file;
        break;
      }
    }
    
    if (!mainFile) {
      console.error('Could not find main entry file');
      process.exit(1);
    }
    
    console.log(`Found main entry file: ${mainFile}`);
    
    // Read the main file
    let content = await fs.readFile(mainFile, 'utf8');
    
    // Check if BrowserRouter is used
    if (content.includes('BrowserRouter')) {
      // Replace BrowserRouter with HashRouter
      content = content.replace(
        /import\s*{\s*([^}]*BrowserRouter[^}]*)\s*}\s*from\s*['"]react-router-dom['"]/g,
        (match, importList) => {
          return match.replace('BrowserRouter', 'HashRouter');
        }
      );
      
      content = content.replace(
        /<BrowserRouter([^>]*)>/g,
        '<HashRouter$1>'
      );
      
      content = content.replace(
        /<\/BrowserRouter>/g,
        '</HashRouter>'
      );
      
      // Update any variable declarations
      content = content.replace(
        /const\s+(\w+)\s*=\s*BrowserRouter/g,
        'const $1 = HashRouter'
      );
      
      await fs.writeFile(mainFile, content, 'utf8');
      console.log(`Updated router in ${mainFile}`);
    }
    
    // Check all other files that might use the router
    const jsxFiles = await glob.glob('./src/**/*.{js,jsx}');
    
    for (const filePath of jsxFiles) {
      if (filePath === mainFile) continue;
      
      const fileContent = await fs.readFile(filePath, 'utf8');
      
      if (fileContent.includes('BrowserRouter')) {
        // Replace BrowserRouter with HashRouter
        let updatedContent = fileContent.replace(
          /import\s*{\s*([^}]*BrowserRouter[^}]*)\s*}\s*from\s*['"]react-router-dom['"]/g,
          (match, importList) => {
            return match.replace('BrowserRouter', 'HashRouter');
          }
        );
        
        updatedContent = updatedContent.replace(
          /<BrowserRouter([^>]*)>/g,
          '<HashRouter$1>'
        );
        
        updatedContent = updatedContent.replace(
          /<\/BrowserRouter>/g,
          '</HashRouter>'
        );
        
        // Update any variable declarations
        updatedContent = updatedContent.replace(
          /const\s+(\w+)\s*=\s*BrowserRouter/g,
          'const $1 = HashRouter'
        );
        
        if (updatedContent !== fileContent) {
          await fs.writeFile(filePath, updatedContent, 'utf8');
          console.log(`Updated router in ${filePath}`);
        }
      }
    }
    
    // Update homepage in package.json
    const packageJsonPath = './package.json';
    if (await fs.pathExists(packageJsonPath)) {
      const packageJson = await fs.readJson(packageJsonPath);
      packageJson.homepage = "https://restaurantsayqal.github.io/bukhara";
      await fs.writeJson(packageJsonPath, packageJson, { spaces: 2 });
      console.log('Updated homepage in package.json');
    }
    
    console.log('Router fix completed!');
  } catch (error) {
    console.error('Error fixing router:', error);
    process.exit(1);
  }
}

// Main execution
fixRouter(); 