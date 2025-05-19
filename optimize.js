const { execSync, exec } = require('child_process');
const fs = require('fs-extra');
const path = require('path');

// Function to run a command and handle errors
function runCommand(command, options = {}) {
  return new Promise((resolve, reject) => {
    console.log(`Running: ${command}`);
    
    const proc = exec(command, { stdio: 'inherit', ...options });
    
    proc.stdout.on('data', (data) => {
      process.stdout.write(data);
    });
    
    proc.stderr.on('data', (data) => {
      process.stderr.write(data);
    });
    
    proc.on('close', (code) => {
      if (code === 0) {
        resolve(true);
      } else {
        console.error(`Command failed with exit code ${code}: ${command}`);
        resolve(false); // Don't reject so we can continue with next steps
      }
    });
  });
}

async function runOptimizations() {
  console.log('Starting website optimization process...');
  
  try {
    // Create scripts directory if it doesn't exist
    await fs.ensureDir('./scripts');
    
    // Get all script files
    const scriptFiles = await fs.readdir('./scripts');
    
    // Check if our scripts exist, otherwise warn
    const requiredScripts = [
      'image-optimization.js',
      'fix-image-paths.js',
      'mobile-optimize.js',
      'perf-boost.js',
      'router-fix.js'
    ];
    
    const missingScripts = requiredScripts.filter(
      script => !scriptFiles.includes(script)
    );
    
    if (missingScripts.length > 0) {
      console.warn('Some optimization scripts are missing:', missingScripts);
      console.warn('Please make sure all scripts are in the ./scripts directory');
    }
    
    let stepsCompleted = [];
    let stepsFailed = [];
    
    // Run each step, but continue if any fail
    
    console.log('\n========================================');
    console.log('1. OPTIMIZING IMAGES');
    console.log('========================================\n');
    const imageOptResult = await runCommand('node ./scripts/image-optimization.js');
    if (imageOptResult) stepsCompleted.push('Image Optimization');
    else stepsFailed.push('Image Optimization');
    
    console.log('\n========================================');
    console.log('2. FIXING IMAGE PATHS');
    console.log('========================================\n');
    const fixPathsResult = await runCommand('node ./scripts/fix-image-paths.js');
    if (fixPathsResult) stepsCompleted.push('Fix Image Paths');
    else stepsFailed.push('Fix Image Paths');
    
    console.log('\n========================================');
    console.log('3. OPTIMIZING FOR MOBILE');
    console.log('========================================\n');
    const mobileOptResult = await runCommand('node ./scripts/mobile-optimize.js');
    if (mobileOptResult) stepsCompleted.push('Mobile Optimization');
    else stepsFailed.push('Mobile Optimization');
    
    console.log('\n========================================');
    console.log('4. ENHANCING PERFORMANCE');
    console.log('========================================\n');
    const perfBoostResult = await runCommand('node ./scripts/perf-boost.js');
    if (perfBoostResult) stepsCompleted.push('Performance Enhancement');
    else stepsFailed.push('Performance Enhancement');
    
    console.log('\n========================================');
    console.log('5. FIXING ROUTER FOR GITHUB PAGES');
    console.log('========================================\n');
    const routerFixResult = await runCommand('node ./scripts/router-fix.js');
    if (routerFixResult) stepsCompleted.push('Router Fix');
    else stepsFailed.push('Router Fix');
    
    console.log('\n========================================');
    console.log('6. BUILDING OPTIMIZED PRODUCTION BUILD');
    console.log('========================================\n');
    const buildResult = await runCommand('npm run build');
    if (buildResult) stepsCompleted.push('Production Build');
    else stepsFailed.push('Production Build');
    
    // Only deploy if build was successful
    if (buildResult) {
      console.log('\n========================================');
      console.log('7. DEPLOYING TO GITHUB PAGES');
      console.log('========================================\n');
      const deployResult = await runCommand('npx gh-pages -d build');
      if (deployResult) stepsCompleted.push('GitHub Pages Deployment');
      else stepsFailed.push('GitHub Pages Deployment');
    } else {
      console.error('Skipping deployment due to build failure');
      stepsFailed.push('GitHub Pages Deployment (Skipped)');
    }
    
    // Final summary
    console.log('\n========================================');
    console.log('OPTIMIZATION SUMMARY');
    console.log('========================================');
    
    console.log('\nCompleted steps:');
    stepsCompleted.forEach(step => console.log(`✅ ${step}`));
    
    if (stepsFailed.length > 0) {
      console.log('\nFailed steps:');
      stepsFailed.forEach(step => console.log(`❌ ${step}`));
      
      console.log('\nPlease check the logs above for details on failures.');
      console.log('You may need to run individual steps manually to address specific issues.');
    } else {
      console.log('\n✨ All optimization steps completed successfully! ✨');
      console.log('Your site has been optimized and deployed to GitHub Pages');
    }
    
    console.log('\n========================================');
    
  } catch (error) {
    console.error('Error during optimization process:', error);
    process.exit(1);
  }
}

// Run optimizations
runOptimizations(); 