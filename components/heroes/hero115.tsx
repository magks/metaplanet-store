'use client';
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { Settings } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

interface Hero115Props {
  button?: {
    text: string;
    url: string;
  };
  backgroundImage?: string;
  backgroundOpacity?: number;
  debugMode?: boolean;
}

const Hero115 = ({
  button = {
    text: "Shop All",
    url: "/collections/all",
  },
  backgroundImage = "/images/metaplanet-mockup-ai-hall-of-metaplanet-portrait-rightcornercrop.png",
  backgroundOpacity = 0.9,
  debugMode = false, // Set to false for production
}: Hero115Props) => {
  // Debug state
  const [showDebug, setShowDebug] = useState(debugMode);
  const [bgSize, setBgSize] = useState("80%");
  const [bgPositionX, setBgPositionX] = useState(35);
  const [bgWidth, setBgWidth] = useState(63);
  const [bgHeight, setBgHeight] = useState(63);
  const [bgPositionY, setBgPositionY] = useState(63);
  const [opacity, setOpacity] = useState(backgroundOpacity);
  const [gradientColor1, setGradientColor1] = useState({ r: 101, g: 30, b: 240, a: 0.2 });
  const [gradientColor2, setGradientColor2] = useState({ r: 1, g: 1, b: 0, a: 0.2 });

  const backgroundStyleDebug = {
    backgroundImage: `linear-gradient(rgba(${gradientColor1.r}, ${gradientColor1.g}, ${gradientColor1.b}, ${gradientColor1.a}), rgba(${gradientColor2.r}, ${gradientColor2.g}, ${gradientColor2.b}, ${gradientColor2.a})), url(${backgroundImage})`,
    backgroundSize: `${bgWidth}% ${bgHeight}%`,
    backgroundPosition: `right ${bgPositionX}% bottom ${bgPositionY}%`,
    backgroundRepeat: 'no-repeat',
    opacity: opacity,
  };

  // sky1 style
  /*
  const backgroundStyle = {
  backgroundImage: `linear-gradient(rgba(101, 30, 240, 0.2), rgba(1, 1, 0, 0.2)), url(${backgroundImage})`,
  backgroundSize: '100% 84% ',
  backgroundPosition: 'right 48% bottom 288%',
  backgroundRepeat: 'no-repeat',
  opacity: 1,
  };
  */


  // cartoon shop style
  
  const backgroundStyle = {
  backgroundImage: `linear-gradient( rgba(1, 1, 0, 0.5),rgba(101, 30, 240, 0.3)), url(${backgroundImage})`,
 // backgroundSize: '100% 97% ',
 // backgroundPosition: 'right 48% bottom 89%',
  backgroundRepeat: 'no-repeat',
  opacity: 1,
  };
  

  const generateCodeString = () => {
    return `style={{
  backgroundImage: \`linear-gradient(rgba(${gradientColor1.r}, ${gradientColor1.g}, ${gradientColor1.b}, ${gradientColor1.a}), rgba(${gradientColor2.r}, ${gradientColor2.g}, ${gradientColor2.b}, ${gradientColor2.a})), url(\${backgroundImage})\`,
  backgroundSize: '${bgWidth}% ${bgHeight}% ',
  backgroundPosition: 'right ${bgPositionX}% bottom ${bgPositionY}%',
  backgroundRepeat: 'no-repeat',
  opacity: ${opacity},
}}`;
  };

  return (
    <section className="relative overflow-hidden min-h-[96vh] max-h-[210vh] flex flex-col">
      {/* Debug Panel */}
      {debugMode && (
        <>
          <button 
            onClick={() => setShowDebug(!showDebug)}
            className="fixed top-4 right-4 z-50 bg-black/80 text-white p-2 rounded-lg backdrop-blur-sm border border-white/20"
          >
            <Settings className="size-5" />
          </button>
          
          {showDebug && (
            <div className="fixed top-16 right-4 z-50 bg-black/90 text-white p-4 rounded-lg backdrop-blur-md border border-white/20 max-w-xs max-h-[80vh] overflow-y-auto">
              <h3 className="font-bold mb-4 text-sm">Image Debug Panel</h3>
              
              {/* Background Size */}
              {/*
              <div className="mb-4">
                <label className="block text-xs mb-1">Background Size:</label>
                <select 
                  value={bgSize} 
                  onChange={(e) => setBgSize(e.target.value)}
                  className="w-full bg-white/10 border border-white/20 rounded px-2 py-1 text-xs"
                >
                  <option value="100%">100%</option>
                  <option value="cover">cover</option>
                  <option value="contain">contain</option>
                  <option value="120%">120%</option>
                  <option value="150%">150%</option>
                  <option value="80%">80%</option>
                  <option value="200%">200%</option>
                </select>
              </div>
              */}
              {/* Bg Width */}
              <div className="mb-4">
                <label className="block text-xs mb-1">Background Width: {bgWidth}%</label>
                <input 
                  type="range" 
                  min="-300" 
                  max="300" 
                  value={bgWidth}
                  onChange={(e) => setBgWidth(Number(e.target.value))}
                  className="w-full"
                />
              </div>
              {/* Bg Height */}
              <div className="mb-4">
                <label className="block text-xs mb-1">Background Height: {bgHeight}%</label>
                <input 
                  type="range" 
                  min="-300" 
                  max="300" 
                  value={bgHeight}
                  onChange={(e) => setBgHeight(Number(e.target.value))}
                  className="w-full"
                />
              </div>

              {/* Position X */}
              <div className="mb-4">
                <label className="block text-xs mb-1">Position X: {bgPositionX}%</label>
                <input 
                  type="range" 
                  min="-300" 
                  max="300" 
                  value={bgPositionX}
                  onChange={(e) => setBgPositionX(Number(e.target.value))}
                  className="w-full"
                />
              </div>

              {/* Position Y */}
              <div className="mb-4">
                <label className="block text-xs mb-1">Position Y: {bgPositionY}%</label>
                <input 
                  type="range" 
                  min="-300" 
                  max="300" 
                  value={bgPositionY}
                  onChange={(e) => setBgPositionY(Number(e.target.value))}
                  className="w-full"
                />
              </div>

              {/* Opacity */}
              <div className="mb-4">
                <label className="block text-xs mb-1">Opacity: {opacity}</label>
                <input 
                  type="range" 
                  min="0" 
                  max="1" 
                  step="0.1"
                  value={opacity}
                  onChange={(e) => setOpacity(Number(e.target.value))}
                  className="w-full"
                />
              </div>

              {/* Gradient Color 1 */}
              <div className="mb-4">
                <label className="block text-xs mb-1">Gradient Color 1:</label>
                <div className="grid grid-cols-4 gap-1">
                  <input 
                    type="number" 
                    placeholder="R" 
                    value={gradientColor1.r}
                    onChange={(e) => setGradientColor1({...gradientColor1, r: Number(e.target.value)})}
                    className="bg-white/10 border border-white/20 rounded px-1 py-1 text-xs"
                  />
                  <input 
                    type="number" 
                    placeholder="G" 
                    value={gradientColor1.g}
                    onChange={(e) => setGradientColor1({...gradientColor1, g: Number(e.target.value)})}
                    className="bg-white/10 border border-white/20 rounded px-1 py-1 text-xs"
                  />
                  <input 
                    type="number" 
                    placeholder="B" 
                    value={gradientColor1.b}
                    onChange={(e) => setGradientColor1({...gradientColor1, b: Number(e.target.value)})}
                    className="bg-white/10 border border-white/20 rounded px-1 py-1 text-xs"
                  />
                  <input 
                    type="number" 
                    placeholder="A" 
                    step="0.1"
                    min="0"
                    max="1"
                    value={gradientColor1.a}
                    onChange={(e) => setGradientColor1({...gradientColor1, a: Number(e.target.value)})}
                    className="bg-white/10 border border-white/20 rounded px-1 py-1 text-xs"
                  />
                </div>
              </div>

              {/* Gradient Color 2 */}
              <div className="mb-4">
                <label className="block text-xs mb-1">Gradient Color 2:</label>
                <div className="grid grid-cols-4 gap-1">
                  <input 
                    type="number" 
                    placeholder="R" 
                    value={gradientColor2.r}
                    onChange={(e) => setGradientColor2({...gradientColor2, r: Number(e.target.value)})}
                    className="bg-white/10 border border-white/20 rounded px-1 py-1 text-xs"
                  />
                  <input 
                    type="number" 
                    placeholder="G" 
                    value={gradientColor2.g}
                    onChange={(e) => setGradientColor2({...gradientColor2, g: Number(e.target.value)})}
                    className="bg-white/10 border border-white/20 rounded px-1 py-1 text-xs"
                  />
                  <input 
                    type="number" 
                    placeholder="B" 
                    value={gradientColor2.b}
                    onChange={(e) => setGradientColor2({...gradientColor2, b: Number(e.target.value)})}
                    className="bg-white/10 border border-white/20 rounded px-1 py-1 text-xs"
                  />
                  <input 
                    type="number" 
                    placeholder="A" 
                    step="0.1"
                    min="0"
                    max="1"
                    value={gradientColor2.a}
                    onChange={(e) => setGradientColor2({...gradientColor2, a: Number(e.target.value)})}
                    className="bg-white/10 border border-white/20 rounded px-1 py-1 text-xs"
                  />
                </div>
              </div>

              {/* Generated Code */}
              <div className="mb-4">
                <label className="block text-xs mb-1">Generated Code:</label>
                <textarea 
                  value={generateCodeString()}
                  readOnly
                  className="w-full bg-white/10 border border-white/20 rounded px-2 py-1 text-xs h-32 font-mono"
                  onClick={(e) => e.currentTarget.select()}
                />
                <p className="text-xs mt-1 text-white/70">Click to select all</p>
              </div>

              <button 
                onClick={() => navigator.clipboard?.writeText(generateCodeString())}
                className="w-full bg-blue-600/80 hover:bg-blue-600 text-white text-xs py-2 px-3 rounded"
              >
                Copy Code to Clipboard
              </button>
            </div>
          )}
        </>
      )}

      {/* Background Image with Dynamic Styling 
      style={debugMode ? backgroundStyleDebug : backgroundStyle }*
      */}
      <div 
        className="absolute inset-0 z-0 md:top-0"
          

      >
        <Image
    className="relative w-full object-cover

    "
    src={backgroundImage}
    alt="Hero image"
    fill
    priority
  />
      </div>


      {/* Optional subtle overlay */}
      {/*
      <div className="absolute inset-0 z-10 bg-gradient-to-b from-background/10 via-transparent to-background/20" />
       */}
      {/* Main Hero Content */}
      <div className="relative z-20  items-center justify-center pt-30 ">
        <div className="container">
          <div className="flex flex-col items-center justify-center text-center">
            <Button size="lg" className="text-lg px-8 py-6 bg-black/60 backdrop-blur-md border border-white/20 text-white hover:bg-black/70 shadow-lg hover:text-white" asChild>
              <Link href={button.url} className="text-white hover:text-white">
                {button.text}
              </Link>
            </Button>
          </div>
        </div>
      </div>
      
      {/* Feature Cards Section */}
      {/*
      <div className="relative z-20 py-16 bg-background/95 backdrop-blur-sm">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="flex flex-col items-center gap-3 p-6 rounded-lg bg-card border border-border/20 shadow-sm">
              <div className="size-10 rounded-full bg-primary/10 flex items-center justify-center">
                <Zap className="size-5 text-primary" />
              </div>
              <h3 className="font-semibold text-lg">Premium Quality</h3>
              <p className="text-sm text-muted-foreground text-center">Carefully curated merchandise with superior materials</p>
            </div>
            
            <div className="flex flex-col items-center gap-3 p-6 rounded-lg bg-card border border-border/20 shadow-sm">
              <div className="size-10 rounded-full bg-primary/10 flex items-center justify-center">
                <Wifi className="size-5 text-primary" />
              </div>
              <h3 className="font-semibold text-lg">Global Shipping</h3>
              <p className="text-sm text-muted-foreground text-center">Worldwide delivery with secure packaging</p>
            </div>
            
            <div className="flex flex-col items-center gap-3 p-6 rounded-lg bg-card border border-border/20 shadow-sm">
              <div className="size-10 rounded-full bg-primary/10 flex items-center justify-center">
                <Shield className="size-5 text-primary" />
              </div>
              <h3 className="font-semibold text-lg">Secure Payments</h3>
              <p className="text-sm text-muted-foreground text-center">Safe and encrypted payment processing</p>
            </div>
          </div>
        </div>

      </div>      
      */
      }
    </section>
  );
};

export { Hero115 };
