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

  // --- Track visible section to highlight active item ---
  useEffect(() => {
    const elements = SECTIONS.map((s) => document.getElementById(s.id)).filter(
      Boolean,
    ) as HTMLElement[];

    if (observerRef.current) observerRef.current.disconnect();

    observerRef.current = new IntersectionObserver(
      (entries) => {
        // prefer the section closest to the top
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      {
        root: null,
        // Top-biased detection so the item becomes active when it hits the top area
        rootMargin: '-1px 0px -80% 0px',
        threshold: [0, 0.1, 0.25, 0.5, 1],
      },
    );

    elements.forEach((el) => observerRef.current!.observe(el));
    return () => observerRef.current?.disconnect();
  }, []);

  // --- Prevent body scroll when drawer is open ---
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  // --- Close on Esc & backdrop click handled below ---
  useEffect(() => {
    if (!open) return;
    const onEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('keydown', onEsc);
    return () => document.removeEventListener('keydown', onEsc);
  }, [open]);

  const items = useMemo(() => SECTIONS, []);

  const handleClick = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;

    // Bring section to the very top (no previous section visible)
    const headerOffset = 0; // keep 0 because we removed scroll-margin-top in sections
    const top = el.getBoundingClientRect().top + window.scrollY - headerOffset;
    window.scrollTo({ top, behavior: 'smooth' });

    setOpen(false); // auto-close the drawer
  };

  return (
    /**
     * Sticky trigger aligned to your container. The drawer itself is portal-like
     * (position: fixed) so it overlays the whole viewport.
     */
    <div className="sticky top-0 z-40 h-0">
      <div className="relative">
        {/* Trigger button */}
        <button
          ref={buttonRef}
          type="button"
          aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
          aria-expanded={open}
          aria-controls="menu-drawer"
          onClick={() => setOpen((v) => !v)}
          className={clsx(
            'absolute right-0 translate-y-3',
            'h-10 w-10 rounded-md',
            'bg-white border border-gray-300 shadow-sm',
            'hover:bg-gray-50 active:bg-gray-100',
            'text-gray-800 select-none',
            'flex items-center justify-center',
            'focus:outline-none focus:ring-2 focus:ring-blue-500',
          )}
        >
          <span className="text-xl leading-none">≡</span>
        </button>
      </div>

      {/* Backdrop (scrim) */}
      <div
        onClick={() => setOpen(false)}
        className={clsx(
          'fixed inset-0 bg-black/40 transition-opacity',
          open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none',
        )}
      />

      {/* Drawer panel */}
      <div
        id="menu-drawer"
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label="Menú de secciones"
        className={clsx(
          'fixed inset-y-0 right-0 w-[78vw] max-w-sm',
          'bg-white shadow-2xl ring-1 ring-black/10',
          'transition-transform duration-300 ease-out',
          open ? 'translate-x-0' : 'translate-x-full',
          'flex flex-col',
        )}
      >
        {/* Header inside drawer */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
          <span className="text-sm font-semibold text-gray-700">Secciones</span>
          <button
            onClick={() => setOpen(false)}
            className="h-8 w-8 rounded-md flex items-center justify-center text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="Cerrar menú"
          >
            ✕
          </button>
        </div>

        {/* Items */}
        <nav className="flex-1 overflow-y-auto py-2">
          <ul className="px-2 space-y-1">
            {items.map((item) => {
              const isActive = active === item.id;
              return (
                <li key={item.id}>
                  <button
                    onClick={() => handleClick(item.id)}
                    className={clsx(
                      'w-full text-left px-3 py-3 rounded-md text-[15px] font-medium transition',
                      isActive ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:bg-gray-100',
                    )}
                  >
                    {item.label}
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Optional footer snippet (muted) */}
        <div className="px-4 py-3 border-t border-gray-100 text-xs text-gray-500">
          Usa Esc para cerrar • Pulsa en una sección para navegar
        </div>
      </div>
    </div>
  );
}
