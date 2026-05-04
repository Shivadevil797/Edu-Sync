const fs = require('fs');
const path = require('path');

function walk(dir) {
    fs.readdirSync(dir).forEach(file => {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            walk(fullPath);
        } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts')) {
            let content = fs.readFileSync(fullPath, 'utf8');
            // Match from "package@version" or from 'package@version'
            let newContent = content.replace(/from\s+(['"])([^'"]+)@[\d.]+\1/g, (match, quote, pkg) => {
                return `from ${quote}${pkg}${quote}`;
            });
            
            // Fix credentials imports
            newContent = newContent.replace(/from\s+(['"])\.\/credentials\1/g, (match, quote) => {
                return `from ${quote}@/components/credentials${quote}`;
            });

            if (content !== newContent) {
                fs.writeFileSync(fullPath, newContent);
                console.log('Fixed:', fullPath);
            }
        }
    });
}

walk('src');
