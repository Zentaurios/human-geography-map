// Cleanup script to remove performance optimization files
const fs = require('fs');
const path = require('path');

const performanceDir = './src/lib/performance';

// Remove performance directory if it exists
if (fs.existsSync(performanceDir)) {
    fs.rmSync(performanceDir, { recursive: true, force: true });
    console.log('✅ Removed /src/lib/performance directory');
}

// Remove performance providers
const providersToRemove = [
    './src/components/providers/performance-provider.tsx',
    './src/components/providers/minimal-performance-provider.tsx'
];

providersToRemove.forEach(file => {
    if (fs.existsSync(file)) {
        fs.unlinkSync(file);
        console.log(`✅ Removed ${file}`);
    }
});

console.log('🎉 Performance optimization cleanup complete!');
