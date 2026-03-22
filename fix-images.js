import fs from 'fs';

// Navbar
let nav = fs.readFileSync('src/components/navbar.tsx', 'utf8');
nav = nav.replace(/<img[\s\S]*?DevItLHMMSquareTransparentYellow\.png[\s\S]*?\/>/g, '{/* TODO: Missing Logo Image */}');
fs.writeFileSync('src/components/navbar.tsx', nav);

// Footer
let foot = fs.readFileSync('src/components/footer.tsx', 'utf8');
foot = foot.replace(/<img[\s\S]*?DevItLHMMSquareTransparentYellow\.png[\s\S]*?\/>/g, '{/* TODO: Missing Logo Image */}');
fs.writeFileSync('src/components/footer.tsx', foot);

// Services
let serv = fs.readFileSync('src/components/services.tsx', 'utf8');
if (!serv.includes('import Image')) {
  serv = serv.replace(/import \{ motion, useInView, AnimatePresence \} from "framer-motion";/, 'import { motion, useInView, AnimatePresence } from "framer-motion";\nimport Image from "next/image";');
}
serv = serv.replace(/image: serviceBranding\.src/g, 'image: serviceBranding');
serv = serv.replace(/image: serviceDevelopment\.src/g, 'image: serviceDevelopment');
serv = serv.replace(/image: serviceApps\.src/g, 'image: serviceApps');
serv = serv.replace(/image: serviceAnalytics\.src/g, 'image: serviceAnalytics');
serv = serv.replace(/<img\s*src=\{services\[activeIndex\]\.image\}\s*alt=\{services\[activeIndex\]\.title\}\s*className="w-full h-full object-cover"/g, '<Image src={services[activeIndex].image} alt={services[activeIndex].title} placeholder="blur" className="w-full h-full object-cover"');
serv = serv.replace(/<img\s*src=\{service\.image\}\s*alt=\{service\.title\}\s*className="w-full h-64 object-cover"\s*\/>/g, '<Image src={service.image} alt={service.title} placeholder="blur" className="w-full h-64 object-cover" />');
fs.writeFileSync('src/components/services.tsx', serv);

console.log('Images patched');
