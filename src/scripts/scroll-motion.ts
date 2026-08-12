import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const SELECTORS = {
  sections: 'main > section',
  title: 'h1, h2',
  subtitle: 'h1 + *, h2 + p',
  images: 'main img',
};

function initScrollMotion() {
  const sections = gsap.utils.toArray<HTMLElement>(SELECTORS.sections);
  if (!sections.length) return;

  const media = gsap.matchMedia();

  media.add(
    {
      motion: '(prefers-reduced-motion: no-preference)',
      desktop: '(min-width: 768px)',
    },
    (context) => {
      const { motion, desktop } = context.conditions as {
        motion: boolean;
        desktop: boolean;
      };

      if (!motion) {
        gsap.set([SELECTORS.title, SELECTORS.subtitle, SELECTORS.images], {
          clearProps: 'all',
        });
        return;
      }

      sections.forEach((section, index) => {
        section.classList.add('scroll-scene');

        const frame = section.firstElementChild as HTMLElement | null;
        const title = section.querySelector<HTMLElement>(SELECTORS.title);
        const subtitle = section.querySelector<HTMLElement>(SELECTORS.subtitle);
        const layers = gsap.utils.toArray<HTMLElement>(
          section.querySelectorAll(':scope h1 .vp-word, :scope h2 > span, :scope [data-i18n]'),
        ).filter((element) => element !== title && element !== subtitle);

        const intro = gsap.timeline({
          defaults: { duration: 1, ease: 'power3.out' },
          scrollTrigger: {
            trigger: section,
            start: index === 0 ? 'top 92%' : 'top 78%',
            toggleActions: 'play none none reverse',
          },
        });

        if (title) {
          intro.from(title, {
            yPercent: 75,
            autoAlpha: 0,
            rotationX: desktop ? -12 : 0,
            transformOrigin: 'left bottom',
          });
        }

        if (subtitle) {
          intro.from(
            subtitle,
            { y: 24, autoAlpha: 0, duration: 0.8 },
            title ? '-=0.62' : 0,
          );
        }

        if (layers.length) {
          intro.from(
            layers.slice(0, 12),
            {
              y: 18,
              autoAlpha: 0,
              stagger: { each: 0.045, from: 'start' },
              duration: 0.65,
            },
            '-=0.5',
          );
        }

        if (frame && index > 0) {
          gsap.fromTo(
            frame,
            { y: desktop ? 24 : 12, autoAlpha: 0.76 },
            {
              y: 0,
              autoAlpha: 1,
              ease: 'none',
              scrollTrigger: {
                trigger: section,
                start: 'top bottom',
                end: 'top 55%',
                scrub: 0.65,
              },
            },
          );
        }
      });

      gsap.utils.toArray<HTMLImageElement>(SELECTORS.images).forEach((image) => {
        gsap.fromTo(
          image,
          { scale: 1.28, yPercent: 7 },
          {
            scale: 1,
            yPercent: -4,
            ease: 'none',
            transformOrigin: '50% 50%',
            scrollTrigger: {
              trigger: image,
              start: 'top 92%',
              end: 'bottom 35%',
              scrub: 0.8,
            },
          },
        );
      });

      const progress = document.querySelector<HTMLElement>('[data-scroll-progress]');
      if (progress) {
        gsap.to(progress, {
          ...(desktop ? { scaleY: 1 } : { scaleX: 1 }),
          ease: 'none',
          transformOrigin: desktop ? 'top center' : 'left center',
          scrollTrigger: {
            trigger: document.documentElement,
            start: 0,
            end: 'max',
            scrub: 0.15,
          },
        });
      }

      const refresh = () => ScrollTrigger.refresh();
      document.fonts?.ready.then(refresh);
      window.addEventListener('load', refresh, { once: true });

      return () => window.removeEventListener('load', refresh);
    },
  );

  return () => media.revert();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initScrollMotion, { once: true });
} else {
  initScrollMotion();
}
