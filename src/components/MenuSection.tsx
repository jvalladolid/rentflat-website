// src/components/MenuSection.tsx
'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { Menu as MenuIcon, X } from 'lucide-react';
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

  // Track visible section to show active item
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

  // Close on outside click
  useEffect(() => {
    if (!open) return;
    const onDocClick = (e: MouseEvent) => {
      const target = e.target as Node;
      if (panelRef.current?.contains(target)) return;
      if (buttonRef.current?.contains(target)) return;
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
      setOpen(false);
    }
  };

  return (
    <div className="relative">
      {/* Small top button (right aligned) */}
      <div className="sticky top-2 z-50">
        <div className="flex justify-end">
          <button
            ref={buttonRef}
            type="button"
            aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
            aria-expanded={open}
            aria-controls="menu-popover"
            onClick={() => setOpen((v) => !v)}
            className={clsx(
              'inline-flex items-center justify-center',
              'h-10 w-10 rounded-full shadow-sm border bg-white',
              'text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500',
            )}
          >
            {open ? <X className="h-5 w-5" /> : <MenuIcon className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Popover panel */}
      <div
        id="menu-popover"
        ref={panelRef}
        className={clsx(
          'absolute right-0 mt-2 w-44 rounded-lg border bg-white shadow-md',
          'ring-1 ring-black/5 overflow-hidden',
          'transition transform origin-top-right',
          open ? 'scale-100 opacity-100' : 'pointer-events-none scale-95 opacity-0',
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
  );
}
