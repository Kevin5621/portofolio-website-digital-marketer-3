import React, { useEffect, useRef } from 'react';

/* ====================================================================
   TEXT SLIDE UP COMPONENT
   Modular React Component for Text Slide Up Animation
   ==================================================================== */

export interface TextSlideUpProps {
  children: React.ReactNode;
  className?: string;
  size?: 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | '6xl' | '7xl' | '8xl' | '9xl' | 'responsive';
  weight?: 'thin' | 'extralight' | 'light' | 'normal' | 'medium' | 'semibold' | 'bold' | 'extrabold' | 'black';
  color?: 'primary' | 'secondary' | 'accent' | 'muted' | 'inverse' | 'success' | 'warning' | 'error' | 'info';
  delay?: 0 | 1 | 2 | 3 | 4 | 5;
  isHeading?: boolean;
  zoomStable?: boolean;
  onAnimationComplete?: () => void;
}

export const TextSlideUp: React.FC<TextSlideUpProps> = ({
  children,
  className = '',
  size = 'base',
  weight = 'normal',
  color = 'primary',
  delay = 0,
  isHeading = false,
  zoomStable = false,
  onAnimationComplete,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const textElements = entry.target.querySelectorAll('p');
            // Semua elemen akan di-animate pada waktu yang sama
            textElements.forEach((element) => {
              const delayTime = delay * 0.025; // Hanya delay dari props, bukan per baris
              setTimeout(() => {
                element.classList.add('text-slide-up');
              }, delayTime * 1000);
            });
            
            // Call onAnimationComplete setelah semua animasi selesai
            if (textElements.length > 0 && onAnimationComplete) {
              const delayTime = delay * 0.025;
              setTimeout(onAnimationComplete, (delayTime + 0.85) * 1000); // 0.85s animation duration
            }
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px',
      }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, [delay, onAnimationComplete]);

  // Build class names
  const containerClasses = [
    'text-slide-up-container',
    isHeading ? 'text-slide-up-heading' : '',
    size !== 'base' ? `text-slide-up-${size}` : '',
    weight !== 'normal' ? `text-slide-up-${weight}` : '',
    zoomStable ? 'text-slide-up-zoom-stable' : '',
    className,
  ].filter(Boolean).join(' ');

  const lineClasses = [
    'text-slide-up-line',
    color !== 'primary' ? `text-${color}` : '',
  ].filter(Boolean).join(' ');

  // Split children into lines if it's a string
  const renderContent = () => {
    if (typeof children === 'string') {
      return children.split('\n').map((line, index) => (
        <div key={index} className={lineClasses}>
          <p>{line.trim()}</p>
        </div>
      ));
    }

    // If children is React element, wrap it
    return (
      <div className={lineClasses}>
        <p>{children}</p>
      </div>
    );
  };

  return (
    <div ref={containerRef} className={containerClasses}>
      {renderContent()}
    </div>
  );
};

/* ====================================================================
   TEXT SLIDE UP HEADING COMPONENT
   Specialized component for heading text with slide up animation
   ==================================================================== */

export interface TextSlideUpHeadingProps extends Omit<TextSlideUpProps, 'isHeading'> {
  level?: 1 | 2 | 3 | 4 | 5 | 6;
}

export const TextSlideUpHeading: React.FC<TextSlideUpHeadingProps> = ({
  children,
  className = '',
  size = '8xl',
  weight = 'bold',
  color = 'primary',
  delay = 0,
  zoomStable = false,
  onAnimationComplete,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const textElements = entry.target.querySelectorAll('p');
            // Semua elemen akan di-animate pada waktu yang sama
            textElements.forEach((element) => {
              const delayTime = delay * 0.025; // Hanya delay dari props, bukan per baris
              setTimeout(() => {
                element.classList.add('text-slide-up');
              }, delayTime * 1000);
            });
            
            // Call onAnimationComplete setelah semua animasi selesai
            if (textElements.length > 0 && onAnimationComplete) {
              const delayTime = delay * 0.025;
              setTimeout(onAnimationComplete, (delayTime + 0.85) * 1000); // 0.85s animation duration
            }
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px',
      }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, [delay, onAnimationComplete]);

  // Build class names
  const containerClasses = [
    'text-slide-up-container',
    'text-slide-up-heading',
    size !== 'base' ? `text-slide-up-${size}` : '',
    weight !== 'normal' ? `text-slide-up-${weight}` : '',
    zoomStable ? 'text-slide-up-zoom-stable' : '',
    className,
  ].filter(Boolean).join(' ');

  const lineClasses = [
    'text-slide-up-line',
    color !== 'primary' ? `text-${color}` : '',
  ].filter(Boolean).join(' ');

  // Split children into lines if it's a string
  const renderContent = () => {
    if (typeof children === 'string') {
      return children.split('\n').map((line, index) => (
        <div key={index} className={lineClasses}>
          <p>{line.trim()}</p>
        </div>
      ));
    }

    // If children is React element, wrap it
    return (
      <div className={lineClasses}>
        <p>{children}</p>
      </div>
    );
  };

  return (
    <div ref={containerRef} className={containerClasses}>
      {renderContent()}
    </div>
  );
};

/* ====================================================================
   TEXT SLIDE UP PARAGRAPH COMPONENT
   Specialized component for paragraph text with slide up animation
   ==================================================================== */

export interface TextSlideUpParagraphProps extends Omit<TextSlideUpProps, 'isHeading'> {
  variant?: 'body' | 'lead' | 'small' | 'caption';
}

export const TextSlideUpParagraph: React.FC<TextSlideUpParagraphProps> = ({
  variant = 'body',
  children,
  className = '',
  weight = 'normal',
  color = 'primary',
  delay = 0,
  zoomStable = false,
  onAnimationComplete,
  ...props
}) => {
  const getSizeByVariant = (variant: string) => {
    switch (variant) {
      case 'lead': return 'lg';
      case 'small': return 'sm';
      case 'caption': return 'xs';
      default: return 'base';
    }
  };

  // Fungsi untuk memecah teks menjadi baris-baris berdasarkan lebar maksimum
  const splitTextIntoLines = (text: string, maxWidth: number = 60) => {
    // Jika teks sudah cukup pendek, tidak perlu dipecah
    if (text.length <= maxWidth) {
      return [text];
    }

    const words = text.split(' ');
    const lines: string[] = [];
    let currentLine = '';

    words.forEach((word) => {
      // Jika menambahkan kata ini akan melebihi maxWidth
      if ((currentLine + ' ' + word).length > maxWidth && currentLine.length > 0) {
        lines.push(currentLine.trim());
        currentLine = word;
      } else {
        currentLine += (currentLine ? ' ' : '') + word;
      }
    });

    // Tambahkan baris terakhir
    if (currentLine) {
      lines.push(currentLine.trim());
    }

    return lines;
  };

  // Render teks sebagai baris-baris terpisah dengan \n
  const renderParagraphText = () => {
    if (typeof children === 'string') {
      const lines = splitTextIntoLines(children);
      return lines.join('\n');
    }
    return children;
  };

  return (
    <TextSlideUp
      {...props}
      className={`text-slide-up-paragraph ${className}`}
      size={getSizeByVariant(variant)}
      weight={weight}
      color={color}
      delay={delay}
      zoomStable={zoomStable}
      onAnimationComplete={onAnimationComplete}
    >
      {renderParagraphText()}
    </TextSlideUp>
  );
};

/* ====================================================================
   TEXT SLIDE UP LIST COMPONENT
   Specialized component for list items with slide up animation
   ==================================================================== */

export interface TextSlideUpListProps extends Omit<TextSlideUpProps, 'isHeading' | 'children'> {
  type?: 'ul' | 'ol';
  items: string[];
}

export const TextSlideUpList: React.FC<TextSlideUpListProps> = ({
  items,
  className = '',
  size = 'base',
  weight = 'normal',
  color = 'primary',
  delay = 0,
  zoomStable = false,
  onAnimationComplete,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const textElements = entry.target.querySelectorAll('p');
            // Semua elemen akan di-animate pada waktu yang sama
            textElements.forEach((element) => {
              const delayTime = delay * 0.025; // Hanya delay dari props, bukan per baris
              setTimeout(() => {
                element.classList.add('text-slide-up');
              }, delayTime * 1000);
            });
            
            // Call onAnimationComplete setelah semua animasi selesai
            if (textElements.length > 0 && onAnimationComplete) {
              const delayTime = delay * 0.025;
              setTimeout(onAnimationComplete, (delayTime + 0.85) * 1000); // 0.85s animation duration
            }
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px',
      }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, [delay, onAnimationComplete]);

  // Build class names
  const containerClasses = [
    'text-slide-up-container',
    'text-slide-up-list',
    size !== 'base' ? `text-slide-up-${size}` : '',
    weight !== 'normal' ? `text-slide-up-${weight}` : '',
    zoomStable ? 'text-slide-up-zoom-stable' : '',
    className,
  ].filter(Boolean).join(' ');

  const lineClasses = [
    'text-slide-up-line',
    color !== 'primary' ? `text-${color}` : '',
  ].filter(Boolean).join(' ');

  // Render list items sebagai baris-baris terpisah
  const renderListContent = () => {
    return items.map((item, index) => (
      <div key={index} className={lineClasses}>
        <p>{item}</p>
      </div>
    ));
  };

  return (
    <div ref={containerRef} className={containerClasses}>
      {renderListContent()}
    </div>
  );
};

export default TextSlideUp; 