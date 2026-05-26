const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'components/pages/CDSSDashboard.tsx');
let content = fs.readFileSync(filePath, 'utf8');

// Global structural replaces
content = content.replace(/bg-white rounded-lg shadow-md/g, 'card');
content = content.replace(/text-gray-900/g, 'text-slate-100');
content = content.replace(/text-gray-800/g, 'text-slate-200');
content = content.replace(/text-gray-700/g, 'text-slate-300');
content = content.replace(/text-gray-600/g, 'text-slate-400');
content = content.replace(/text-gray-500/g, 'text-slate-500');

content = content.replace(/text-blue-600/g, 'text-neon-cyan');
content = content.replace(/text-blue-500/g, 'text-neon-cyan');
content = content.replace(/bg-blue-500/g, 'bg-neon-cyan shadow-[0_0_8px_rgba(0,243,255,0.8)] text-slate-900 border-none');
content = content.replace(/border-blue-200/g, 'border-neon-cyan/40 shadow-neon-cyan');
content = content.replace(/bg-blue-50/g, 'bg-neon-cyan/5');

content = content.replace(/text-purple-600/g, 'text-neon-magenta');
content = content.replace(/text-purple-500/g, 'text-neon-magenta');
content = content.replace(/bg-purple-500/g, 'bg-neon-magenta shadow-[0_0_8px_rgba(255,0,255,0.8)] text-slate-900 border-none');
content = content.replace(/border-purple-200/g, 'border-neon-magenta/40 shadow-neon-magenta');
content = content.replace(/bg-purple-50/g, 'bg-neon-magenta/5');

content = content.replace(/text-green-600/g, 'text-neon-lime');
content = content.replace(/text-green-500/g, 'text-neon-lime');
content = content.replace(/bg-green-500/g, 'bg-neon-lime shadow-[0_0_8px_rgba(57,255,20,0.8)] text-slate-900 border-none');
content = content.replace(/border-green-200/g, 'border-neon-lime/40 shadow-neon-lime');
content = content.replace(/bg-green-50/g, 'bg-neon-lime/5');

content = content.replace(/border-gray-200/g, 'border-slate-800');
content = content.replace(/bg-gray-50/g, 'bg-slate-900/50');
content = content.replace(/hover:bg-gray-50/g, 'hover:bg-slate-800/50');

fs.writeFileSync(filePath, content, 'utf8');
console.log('Successfully updated CDSSDashboard.tsx');
