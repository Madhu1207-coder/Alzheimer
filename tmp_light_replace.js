const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'components/pages/CDSSDashboard.tsx');
let content = fs.readFileSync(filePath, 'utf8');

// Replace old theme classes with light medical theme ones
content = content.replace(/text-slate-100/g, 'text-slate-900');
content = content.replace(/text-slate-400/g, 'text-slate-500');
content = content.replace(/text-slate-300/g, 'text-slate-600');
content = content.replace(/text-blue-200/g, 'text-slate-500');

content = content.replace(/text-neon-cyan/g, 'text-medical-teal font-bold');
content = content.replace(/text-neon-magenta/g, 'text-medical-deep');
content = content.replace(/text-neon-lime/g, 'text-green-600');

content = content.replace(/bg-neon-cyan\/5/g, 'bg-medical-teal/5');
content = content.replace(/bg-neon-magenta\/5/g, 'bg-slate-100');
content = content.replace(/bg-neon-lime\/5/g, 'bg-green-50');

content = content.replace(/border-neon-cyan\/40/g, 'border-medical-teal/20');
content = content.replace(/border-neon-magenta\/40/g, 'border-slate-200');
content = content.replace(/border-neon-lime\/40/g, 'border-green-200');

content = content.replace(/shadow-neon-cyan/g, 'shadow-soft');
content = content.replace(/shadow-neon-magenta/g, 'shadow-soft');
content = content.replace(/shadow-neon-lime/g, 'shadow-soft');

// Update risk colors logic
content = content.replace(/return 'text-neon-lime'/g, "return 'text-green-600'");
content = content.replace(/'bg-neon-lime shadow-\[0_0_8px_rgba\(57,255,20,0.8\)\] text-slate-900 border-none '/g, "'bg-green-500 '");
content = content.replace(/case_\.status === 'Stage 1' \? 'bg-gray-100 text-slate-200'/g, "case_.status === 'Stage 1' ? 'bg-slate-100 text-slate-600'");

// Update header button
content = content.replace(/bg-neon-cyan shadow-\[0_0_8px_rgba\(0,243,255,0.8\)\] text-slate-900 border-none text-white/g, "bg-medical-teal text-white shadow-soft");

fs.writeFileSync(filePath, content, 'utf8');
console.log('Successfully updated CDSSDashboard.tsx to Light theme basic classes');
