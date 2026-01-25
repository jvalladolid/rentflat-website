// src/components/MenuSection.tsx
'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import clsx from 'clsx';

type Section = { id: string; label: string };

const SECTIONS: Section[] = [
  { id: 'hero', label: 'Inicio' },
  { id: 'gallery', label: 'Galería' },
  { id: 'description', label: 'Descripción' },
  { id: 'neighborhood', label: 'Servicios' },
];

export function MenuSection() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>('hero');
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const panelRef = useRef<HTMLDivElement | null>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  // Track visible section to highlight active item
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
      { root: null, rootMargin: '0px 0px -40% 0px', threshold: [0, 0.25, 0.5, 0.75, 1] },
    );

    elements.forEach((el) => observerRef.current!.observe(el));
    return () => observerRef.current?.disconnect();
  }, []);

  // Close on outside click / Esc
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
      setOpen(false); // close panel, button stays visible
    }
  };

  return (
    /**
     * Sticky overlay that takes no layout height, so it doesn't move the Hero down.
     * Because this wrapper is rendered INSIDE your container (max-w-5xl mx-auto px-6),
     * the button aligns to the container’s right edge—not the viewport edge.
     */
    <div className="sticky top-0 z-40 h-0">
      <div className="relative">
        {/* Square 3D-like trigger: absolutely positioned so it doesn't affect layout */}
        <button
          ref={buttonRef}
          type="button"
          aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
          aria-expanded={open}
          aria-controls="menu-popover"
          onClick={() => setOpen((v) => !v)}
          className={clsx(
            'absolute right-0 translate-y-3', // top-right corner inside container, slight offset from top
            'h-9 w-9 rounded-md', // square shape
            'bg-linear-to-b from-white to-gray-100', // subtle 3D gradient
            'border border-gray-300', // 3D edge
            'shadow-sm shadow-gray-300', // light outer shadow
            'hover:shadow hover:from-white hover:to-gray-50',
            'active:shadow-inner active:from-gray-50 active:to-gray-100',
            'text-gray-800 select-none',
            'flex items-center justify-center',
            'focus:outline-none focus:ring-2 focus:ring-blue-500',
          )}
        >
          <span className="text-lg leading-none">≡</span>
        </button>

        {/* Popover under the button; also absolute, so no layout shift */}
        <div
          id="menu-popover"
          ref={panelRef}
          className={clsx(
            'absolute right-0 translate-y-12 w-44 rounded-lg bg-white',
            'border border-gray-200 shadow-lg ring-1 ring-black/5 overflow-hidden',
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
      </div>
    </div>
  );
}
