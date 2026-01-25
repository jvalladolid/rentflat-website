// src/components/MenuSection.tsx
'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import clsx from 'clsx';

type Section = { id: string; label: string };

// Centralize the section list so both the observer and UI use the same source.
const SECTIONS: Section[] = [
  { id: 'hero', label: 'Inicio' },
  { id: 'gallery', label: 'Galería' },
  { id: 'description', label: 'Descripción' },
  { id: 'neighborhood', label: 'Servicios' },
];

// Keep button aligned with the title level (same as your scroll offset: 24 = 6rem)
const TOP_OFFSET_REM = 24; // Tailwind `top-24` equivalent

export function MenuSection() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>('hero');
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const panelRef = useRef<HTMLDivElement | null>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  // Track which section is in view
  useEffect(() => {
    const elements = SECTIONS.map((s) => document.getElementById(s.id)).filter(
      Boolean,
    ) as HTMLElement[];

    if (observerRef.current) observerRef.current.disconnect();

    observerRef.current = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) setActive(visible[0].target.id);
      },
      {
        root: null,
        rootMargin: '0px 0px -40% 0px',
        threshold: [0, 0.25, 0.5, 0.75, 1],
      },
    );

    elements.forEach((el) => observerRef.current!.observe(el));
    return () => observerRef.current?.disconnect();
  }, []);

  // Close when clicking outside or pressing Esc
  useEffect(() => {
    if (!open) return;
    const onDocClick = (e: MouseEvent) => {
      const t = e.target as Node;
      if (panelRef.current?.contains(t)) return;
      if (buttonRef.current?.contains(t)) return;
      setOpen(false);
    };
    const onEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('mousedown', onDocClick);
    document.addEventListener('keydown', onEsc);
    return () => {
      document.removeEventListener('mousedown', onDocClick);
      document.removeEventListener('keydown', onEsc);
    };
  }, [open]);

  const items = useMemo(() => SECTIONS, []);

  const handleClick = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setOpen(false); // close panel, but the fixed button stays visible
    }
  };

  // Inline style for precise top offset (matches Tailwind top-24 by default)
  const topPx = `calc(${TOP_OFFSET_REM / 4}rem)`; // 24 → 6rem

  return (
    <>
      {/* Fixed small "≡" button, same on mobile & desktop */}
      <button
        ref={buttonRef}
        type="button"
        aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
        aria-expanded={open}
        aria-controls="menu-popover"
        onClick={() => setOpen((v) => !v)}
        style={{ top: topPx }}
        className={clsx(
          'fixed right-6 z-50', // fixed so it always stays on screen
          'h-9 w-9 rounded-full border shadow-sm',
          'bg-white text-gray-800 hover:bg-gray-50',
          'flex items-center justify-center',
          'focus:outline-none focus:ring-2 focus:ring-blue-500',
        )}
      >
        {/* Use literal ≡ glyph per your request */}
        <span className="text-lg leading-none">≡</span>
      </button>

      {/* Popover panel next to the button */}
      <div
        id="menu-popover"
        ref={panelRef}
        style={{ top: topPx }}
        className={clsx(
          'fixed right-6 z-50 mt-2',
          'w-44 rounded-lg border bg-white shadow-md ring-1 ring-black/5 overflow-hidden',
          'transition transform origin-top-right',
          open ? 'opacity-100 scale-100' : 'pointer-events-none opacity-0 scale-95',
        )}
      >
        <ul className="py-1">
          {items.map((item) => {
            const isActive = active === item.id;
            return (
              <li key={item.id}>
                <button
                  onClick={() => handleClick(item.id)}
                  className={clsx(
                    'w-full text-left px-3 py-2 text-sm',
                    isActive ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:bg-gray-100',
                  )}
                >
                  {item.label}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
}
