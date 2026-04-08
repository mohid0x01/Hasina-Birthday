import confetti from "canvas-confetti";
import { Heart, PartyPopper, Sparkles, Star } from "lucide-react";
import { useState } from "react";

const SurpriseButton = () => {
  const [hasClicked, setHasClicked] = useState(false);
  const [showMessage, setShowMessage] = useState(false);

  const triggerConfetti = () => {
    setHasClicked(true);
    
    const duration = 5000;
    const animationEnd = Date.now() + duration;
    const colors = ["#E11D48", "#FB7185", "#FFC0CB", "#D4AF37", "#FF69B4", "#FFB6C1"];

    const frame = () => {
      confetti({
        particleCount: 4,
        angle: 60,
        spread: 60,
        origin: { x: 0, y: 0.65 },
        colors: colors,
      });
      confetti({
        particleCount: 4,
        angle: 120,
        spread: 60,
        origin: { x: 1, y: 0.65 },
        colors: colors,
      });

      if (Date.now() < animationEnd) {
        requestAnimationFrame(frame);
      }
    };

    // Initial big burst
    confetti({
      particleCount: 120,
      spread: 120,
      origin: { y: 0.55 },
      colors: colors,
      scalar: 1.2,
    });

    // Side cannons
    frame();

    // Show love message after delay
    setTimeout(() => {
      setShowMessage(true);
    }, 1800);

    // Final celebration burst
    setTimeout(() => {
      confetti({
        particleCount: 180,
        spread: 200,
        origin: { y: 0.45 },
        colors: colors,
        shapes: ["circle", "square"],
        scalar: 1.3,
      });
    }, 2500);
  };

  return (
    <section className="py-20 px-4 bg-background/80 backdrop-blur-sm relative">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-primary/5 blur-3xl" />
      
      <div className="max-w-2xl mx-auto text-center relative z-10">
        {!hasClicked ? (
          <div className="animate-fade-in-up">
            <PartyPopper className="w-12 h-12 mx-auto text-gold mb-5 animate-float" />
            <h2 className="font-script text-4xl md:text-5xl text-primary mb-4">
              A Special Surprise
            </h2>
            <p className="font-body text-muted-foreground mb-10 tracking-wide">
              Click the button below for something magical! ✨
            </p>
            <button
              onClick={triggerConfetti}
              className="group relative inline-flex items-center gap-4 px-12 py-6 rounded-full font-body font-semibold text-lg overflow-hidden transition-all duration-500 hover:scale-105 animate-glow-pulse"
              style={{
                background: "linear-gradient(135deg, hsl(340 82% 52%) 0%, hsl(340 85% 42%) 40%, hsl(30 60% 50%) 100%)",
                color: "white",
              }}
            >
              {/* Shimmer effect */}
              <div className="absolute inset-0 animate-shimmer opacity-40" />
              
              <Sparkles className="w-6 h-6 relative z-10" />
              <span className="relative z-10">Click for Surprise!</span>
              <Heart className="w-6 h-6 relative z-10 group-hover:animate-heartbeat fill-white/30" />
            </button>
          </div>
        ) : (
          <div className={`transition-all duration-1000 ${showMessage ? 'animate-scale-in' : 'opacity-0'}`}>
            <div className="luxury-card p-10 md:p-14 relative">
              {/* Corner decorations */}
              <div className="absolute top-4 left-4 w-10 h-10 border-t-2 border-l-2 border-gold/40 rounded-tl-lg" />
              <div className="absolute top-4 right-4 w-10 h-10 border-t-2 border-r-2 border-gold/40 rounded-tr-lg" />
              <div className="absolute bottom-4 left-4 w-10 h-10 border-b-2 border-l-2 border-gold/40 rounded-bl-lg" />
              <div className="absolute bottom-4 right-4 w-10 h-10 border-b-2 border-r-2 border-gold/40 rounded-br-lg" />
              
              <div className="flex justify-center gap-3 mb-8">
                {[...Array(5)].map((_, i) => (
                  <Heart
                    key={i}
                    className="w-8 h-8 text-primary fill-primary/80 animate-heartbeat"
                    style={{ animationDelay: `${i * 0.12}s` }}
                  />
                ))}
              </div>
              
              <h3 className="font-script text-5xl md:text-6xl text-primary mb-8">
                Happy Birthday, My Love!
              </h3>
              
              <p className="font-elegant text-xl md:text-2xl text-foreground/85 italic leading-relaxed mb-8">
                You mean the world to me, Ayesha. Every day with you is a blessing, 
                and I'm so grateful to celebrate another year of your beautiful life.
              </p>
              
              <div className="flex items-center justify-center gap-2 mb-6">
                <Star className="w-4 h-4 text-gold fill-gold" />
                <p className="font-script text-3xl text-gradient-gold">
                  I love you forever and always
                </p>
                <Star className="w-4 h-4 text-gold fill-gold" />
              </div>
              
              <p className="font-body text-muted-foreground text-sm tracking-wide">
                — Your Mohid 💕
              </p>
            </div>
            
            <button
              onClick={triggerConfetti}
              className="mt-8 text-primary hover:text-rose-dark transition-colors font-body inline-flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              Click for more confetti!
              <Sparkles className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default SurpriseButton;
