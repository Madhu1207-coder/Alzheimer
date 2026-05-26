const fs = require('fs');
const path = require('path');

function processDir(dir) {
    fs.readdirSync(dir).forEach(file => {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            processDir(fullPath);
        } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts') || fullPath.endsWith('.css')) {
            let content = fs.readFileSync(fullPath, 'utf8');
            // Remove animate-* classes
            let newContent = content.replace(/\banimate-[a-zA-Z0-9-]+\b/g, '');
            // Also remove any animation-delay-* classes if they exist
            newContent = newContent.replace(/\banimation-delay-[a-zA-Z0-9-]+\b/g, '');
            if (content !== newContent) {
                fs.writeFileSync(fullPath, newContent);
                console.log('Updated', fullPath);
            }
        }
    });
}

processDir('c:\\Users\\boopa\\Downloads\\Neuro_Jarvis\\components');
processDir('c:\\Users\\boopa\\Downloads\\Neuro_Jarvis\\app');
