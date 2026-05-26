const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'components/pages/CDSSDashboard.tsx');
let content = fs.readFileSync(filePath, 'utf8');

// Convert Cyan/Magenta theme to Gold theme
content = content.replace(/text-neon-cyan/g, 'text-neon-gold');
content = content.replace(/text-neon-magenta/g, 'text-neon-amber');
content = content.replace(/bg-neon-cyan/g, 'bg-neon-gold shadow-neon-gold');
content = content.replace(/bg-neon-magenta/g, 'bg-neon-amber shadow-neon-amber');
content = content.replace(/border-neon-cyan/g, 'border-neon-gold/50');
content = content.replace(/border-neon-magenta/g, 'border-neon-amber/50');
content = content.replace(/shadow-neon-cyan/g, 'shadow-neon-gold');
content = content.replace(/shadow-neon-magenta/g, 'shadow-neon-amber');

// Tone down Lime a bit for the gold theme or make it amber? 
// Actually, let's keep some lime for specific status, but ensure it's high contrast.
content = content.replace(/text-neon-lime/g, 'text-neon-gold neon-text-gold');
content = content.replace(/bg-neon-lime/g, 'bg-neon-gold/20 shadow-neon-gold');

// Ensure text visibility
content = content.replace(/text-slate-100/g, 'text-white');
content = content.replace(/text-slate-400/g, 'text-amber-100/70');
content = content.replace(/text-slate-300/g, 'text-amber-50');

// Fix specific status colors in getRiskColor
content = content.replace(/return 'text-neon-lime'/g, "return 'text-neon-gold neon-text-gold'");
content = content.replace(/return 'text-yellow-600'/g, "return 'text-neon-amber neon-text-amber'");
content = content.replace(/return 'text-red-600'/g, "return 'text-neon-red neon-text-red'");

fs.writeFileSync(filePath, content, 'utf8');
console.log('Successfully updated CDSSDashboard.tsx to Gold theme');
