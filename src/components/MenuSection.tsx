// src/components/MenuSection.tsx
'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { Menu, X } from 'lucide-react';
import clsx from 'clsx';

type Section = {
  id: string;
  label: string;
};

const SECTIONS: Section[] = [
  { id: 'hero', label: 'Inicio' },
  { id: 'gallery', label: 'Galería' },
  { id: 'description', label: 'Descripción' },
  { id: 'neighborhood', label: 'Servicios' },
];

export function MenuSection() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>('hero');
  const observerRef = useRef<IntersectionObserver | null>(null);

  // Observe sections to set active link as user scrolls
  useEffect(() => {
    const sections = SECTIONS.map((s) => document.getElementById(s.id)).filter(
      Boolean,
    ) as HTMLElement[];

    if (observerRef.current) observerRef.current.disconnect();

    observerRef.current = new IntersectionObserver(
      (entries) => {
        // pick the entry nearest to top (largest intersection ratio) and visible
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) {
          setActive(visible[0].target.id);
        }
      },
      {
        // Trigger when 50% of the section is visible; tweak as desired
        root: null,
        rootMargin: '0px 0px -40% 0px',
        threshold: [0, 0.25, 0.5, 0.75, 1],
      },
    );

    sections.forEach((el) => observerRef.current!.observe(el));
    return () => observerRef.current?.disconnect();
  }, []);

  const items = useMemo(() => SECTIONS, []);

  const handleClick = (id: string) => {
    // Smooth scroll to section and close mobile menu
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setOpen(false);
    }
  };

  return (
    <nav className="sticky top-0 z-40 -mx-6 px-6 bg-white/80 backdrop-blur supports-backdrop-filter:bg-white/60 border-b">
      <div className="max-w-5xl mx-auto flex items-center justify-between py-3">
        {/* Brand / Title (optional) */}
        <div className="font-semibold">Índice</div>

        {/* Desktop menu */}
        <ul className="hidden md:flex items-center gap-4">
          {items.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => handleClick(item.id)}
                className={clsx(
                  'text-sm px-3 py-2 rounded-md transition-colors',
                  active === item.id
                    ? 'bg-blue-50 text-blue-700'
                    : 'text-gray-700 hover:bg-gray-100',
                )}
              >
                {item.label}
              </button>
            </li>
          ))}
        </ul>

        {/* Mobile toggle */}
        <button
          className="md:hidden p-2 rounded-md hover:bg-gray-100"
          aria-label="Abrir menú"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile sheet */}
      <div
        className={clsx(
          'md:hidden overflow-hidden transition-[max-height] duration-300',
          open ? 'max-h-64' : 'max-h-0',
        )}
      >
        <ul className="pb-3 grid grid-cols-1 gap-1">
          {items.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => handleClick(item.id)}
                className={clsx(
                  'w-full text-left px-3 py-2 rounded-md',
                  active === item.id
                    ? 'bg-blue-50 text-blue-700'
                    : 'text-gray-700 hover:bg-gray-100',
                )}
              >
                {item.label}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
