import { Cake, Gift, Star, Sparkles, Heart } from "lucide-react";

const wishes = [
  {
    icon: Cake,
    title: "Endless Joy",
    message: "May your year be filled with moments that make your heart sing and your soul dance.",
  },
  {
    icon: Gift,
    title: "Beautiful Surprises",
    message: "May life bring you wonderful surprises and blessings beyond your wildest dreams.",
  },
  {
    icon: Star,
    title: "Dreams Come True",
    message: "May all your wishes and dreams unfold in the most magical ways possible.",
  },
  {
    icon: Sparkles,
    title: "Radiant Happiness",
    message: "May your smile continue to light up the world and spread happiness everywhere.",
  },
];

const WishesSection = () => {
  return (
    <section className="py-24 px-4 bg-background/80 backdrop-blur-sm relative">
      {/* Subtle background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-primary/5 blur-3xl rounded-full" />
      
      <div className="max-w-5xl mx-auto relative z-10">
        <div className="text-center mb-16 animate-fade-in-up">
          <Gift className="w-10 h-10 mx-auto text-gold mb-5 animate-float" />
          <h2 className="font-script text-5xl md:text-6xl text-primary mb-3">
            Birthday Wishes
          </h2>
          <p className="font-body text-muted-foreground mt-4 tracking-wide">
            May this year bring you...
          </p>
          <div className="flex items-center justify-center gap-3 mt-6">
            <div className="w-16 h-px bg-gradient-to-r from-transparent to-gold" />
            <Star className="w-3 h-3 text-gold fill-gold" />
            <div className="w-16 h-px bg-gradient-to-l from-transparent to-gold" />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6 md:gap-8">
          {wishes.map((wish, index) => (
            <div
              key={wish.title}
              className="luxury-card p-7 md:p-8 hover:shadow-glow transition-all duration-500 animate-fade-in-up group"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <div className="flex items-start gap-5">
                <div className="p-4 rounded-2xl bg-gradient-to-br from-primary/10 to-rose-gold/10 border border-primary/10 group-hover:border-gold/30 transition-colors duration-300">
                  <wish.icon className="w-7 h-7 text-primary" />
                </div>
                <div>
                  <h3 className="font-heading text-xl font-semibold text-foreground mb-2">
                    {wish.title}
                  </h3>
                  <p className="font-elegant text-lg text-muted-foreground leading-relaxed">
                    {wish.message}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-14 animate-fade-in-up animation-delay-500">
          <div className="inline-flex items-center gap-4 px-8 py-4 bg-secondary/60 rounded-full border border-rose-medium/30">
            <Heart className="w-5 h-5 text-primary fill-primary/80 animate-heartbeat" />
            <span className="font-elegant text-lg text-secondary-foreground italic">
              You deserve all the happiness in the world
            </span>
            <Heart className="w-5 h-5 text-primary fill-primary/80 animate-heartbeat animation-delay-200" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default WishesSection;
