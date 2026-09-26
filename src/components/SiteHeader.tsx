import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { ClipboardCheck, Menu } from "lucide-react";
import { cn } from "@/lib/utils";
import { haptic } from "@/lib/native";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerClose,
} from "@/components/ui/drawer";
import logo from "@/assets/logo-red-violeta.png";

const NAV = [
  { to: "/", label: "Inicio" },
  { to: "/sobre-nosotros", label: "Sobre Nosotros" },
  { to: "/servicios", label: "Servicios" },
  { to: "/colegios", label: "Colegios" },
  { to: "/#talleres-presupuestos", label: "Talleres y Presupuestos" },
  { to: "/agentes", label: "Agentes 24/7" },
  { to: "/acceso", label: "Acceso alumnado" },
  { to: "/contacto", label: "Contactar" },
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/85 pt-safe px-safe backdrop-blur">
      <div className="mx-auto grid max-w-6xl grid-cols-[minmax(0,1fr)_auto] items-center gap-3 px-4 py-2.5 sm:px-5 sm:py-3">
        <Link
          to="/"
          className="flex min-w-0 items-center gap-2 active:opacity-70"
          onClick={() => setOpen(false)}
        >
          <span className="hidden items-center gap-1.5 rounded-full bg-primary/10 px-2.5 py-1 text-[10px] font-semibold text-primary xl:inline-flex">
            <span className="relative flex size-1.5">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex size-1.5 rounded-full bg-primary" />
            </span>
            Atención inmediata por IA 24/7
          </span>
          <img
            src={logo}
            alt="Red Violeta Ciberprevención"
            width={40}
            height={40}
            className="size-9 shrink-0 object-contain sm:size-10"
          />
          <span className="min-w-0 leading-tight">
            <span className="block truncate text-sm font-semibold tracking-tight">
              Red Violeta
            </span>
            <span className="block truncate text-[11px] text-muted-foreground">
              Ciberprevención
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {NAV.filter((n) => n.to !== "/acceso").map((n) => (
            <Link
              key={n.to}
              to={n.to}
              activeProps={{ className: "text-primary bg-primary/5" }}
              className="rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors hover:text-primary active:bg-primary/10"
            >
              {n.label}
            </Link>
          ))}
          <Link
            to="/acceso"
            className="ml-2 rounded-lg border-[1.5px] border-primary px-4 py-[7px] text-sm font-medium text-primary transition-colors hover:bg-primary/5 active:scale-95"
          >
            Acceso alumnado
          </Link>
          <Link
            to="/test"
            className="ml-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-transform hover:opacity-90 active:scale-95"
          >
            Test gratuito
          </Link>
        </nav>

        <button
          className="rounded-xl border border-border p-2.5 transition-transform active:scale-90 active:bg-accent lg:hidden"
          aria-label="Abrir menú"
          onClick={() => {
            void haptic("light");
            setOpen(true);
          }}
        >
          <Menu className="size-5" />
        </button>
      </div>

      {/* Menú móvil como hoja inferior deslizable (bottom sheet) */}
      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerContent className="lg:hidden">
          <DrawerHeader className="pb-2 text-left">
            <DrawerTitle className="text-base">Navegación</DrawerTitle>
          </DrawerHeader>
          <nav className="touch-scroll flex max-h-[60svh] flex-col overflow-y-auto px-4 pb-2">
            {NAV.map((n) => (
              <DrawerClose asChild key={n.to}>
                <Link
                  to={n.to}
                  onClick={() => void haptic("light")}
                  activeProps={{ className: "text-primary bg-primary/5" }}
                  className={cn(
                    "rounded-xl px-4 py-3.5 text-[15px] text-muted-foreground transition-colors active:bg-accent",
                  )}
                >
                  {n.label}
                </Link>
              </DrawerClose>
            ))}
          </nav>
          <div className="px-4 pb-4 pb-safe">
            <DrawerClose asChild>
              <Link
                to="/test"
                onClick={() => void haptic("medium")}
                className="flex items-center justify-center gap-2 rounded-2xl bg-primary px-4 py-3.5 text-sm font-semibold text-primary-foreground transition-transform active:scale-95"
              >
                <ClipboardCheck className="size-4" /> Test orientativo gratuito
              </Link>
            </DrawerClose>
          </div>
        </DrawerContent>
      </Drawer>
    </header>
  );
}
