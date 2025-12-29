import { Sparkle } from 'lucide-react';

const sparklePositions = [
  { top: '5%', left: '8%', size: 12, delay: '0s' },
  { top: '12%', left: '25%', size: 8, delay: '0.5s' },
  { top: '8%', left: '45%', size: 14, delay: '1s' },
  { top: '15%', left: '65%', size: 10, delay: '1.5s' },
  { top: '6%', left: '80%', size: 16, delay: '2s' },
  { top: '22%', left: '12%', size: 10, delay: '0.3s' },
  { top: '28%', left: '35%', size: 8, delay: '0.8s' },
  { top: '18%', left: '55%', size: 12, delay: '1.3s' },
  { top: '25%', left: '75%', size: 14, delay: '1.8s' },
  { top: '30%', left: '92%', size: 10, delay: '2.3s' },
  { top: '38%', left: '5%', size: 14, delay: '0.6s' },
  { top: '42%', left: '22%', size: 8, delay: '1.1s' },
  { top: '35%', left: '48%', size: 10, delay: '1.6s' },
  { top: '45%', left: '68%', size: 16, delay: '2.1s' },
  { top: '40%', left: '88%', size: 12, delay: '0.4s' },
  { top: '55%', left: '10%', size: 10, delay: '0.9s' },
  { top: '58%', left: '32%', size: 14, delay: '1.4s' },
  { top: '52%', left: '52%', size: 8, delay: '1.9s' },
  { top: '60%', left: '72%', size: 12, delay: '2.4s' },
  { top: '56%', left: '95%', size: 10, delay: '0.7s' },
  { top: '68%', left: '3%', size: 12, delay: '1.2s' },
  { top: '72%', left: '28%', size: 10, delay: '1.7s' },
  { top: '65%', left: '58%', size: 14, delay: '2.2s' },
  { top: '75%', left: '78%', size: 8, delay: '0.2s' },
  { top: '70%', left: '90%', size: 16, delay: '0.5s' },
  { top: '82%', left: '15%', size: 14, delay: '1s' },
  { top: '85%', left: '40%', size: 10, delay: '1.5s' },
  { top: '78%', left: '62%', size: 12, delay: '2s' },
  { top: '88%', left: '82%', size: 8, delay: '2.5s' },
  { top: '92%', left: '50%', size: 10, delay: '0.8s' },
];

export const SparkleBackground = () => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {sparklePositions.map((pos, i) => (
        <Sparkle
          key={i}
          className="absolute sparkle text-primary/40"
          style={{
            top: pos.top,
            left: pos.left,
            width: pos.size,
            height: pos.size,
            animationDelay: pos.delay,
          }}
        />
      ))}
    </div>
  );
};