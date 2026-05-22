/* eslint-disable react-refresh/only-export-components */
import {
  NavigationMenu as NavigationMenuRoot,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Link } from "@tanstack/react-router";

export type NavItem = {
  label: string;
  href: string;
  search?: Record<string, string>;
  description?: string;
};

export type NavCategory = {
  label: string;
  href: string;
  groups: {
    title?: string;
    items: NavItem[];
  }[];
};

const navigationItems: NavCategory[] = [
  {
    label: "Femme",
    href: "/femme",
    groups: [
      {
        title: "Vêtements",
        items: [
          { label: "Tous les articles", href: "/femme", description: "Découvrir toute la collection" },
          { label: "Robes", href: "/femme", search: { sub: "femme" } },
          { label: "Tops & Chemises", href: "/femme", search: { sub: "femme" } },
          { label: "Pantalons", href: "/femme", search: { sub: "femme" } },
        ],
      },
      {
        title: "Sacs & Accessoires",
        items: [
          { label: "Tous les sacs", href: "/femme/sacs" },
          { label: "Sacs Noir", href: "/sacs-femme/c/noir" },
          { label: "Sacs Blanc", href: "/sacs-femme/c/blanc" },
          { label: "Sacs Marron", href: "/sacs-femme/c/marron" },
        ],
      },
    ],
  },
  {
    label: "Mode",
    href: "/mode",
    groups: [
      {
        items: [
          { label: "Tous les articles", href: "/mode", description: "Explorer la collection mode" },
          { label: "Vêtements", href: "/femme" },
          { label: "Accessoires", href: "/mode", search: { sub: "accessoires" } },
          { label: "Nouveautés", href: "/mode" },
        ],
      },
    ],
  },
  {
    label: "Beauté",
    href: "/cosmetique",
    groups: [
      {
        items: [
          { label: "Tous les articles", href: "/cosmetique", description: "Nos soins & cosmétiques" },
          { label: "Soin visage", href: "/cosmetique", search: { sub: "visage" } },
          { label: "Soin corps", href: "/cosmetique", search: { sub: "corps" } },
          { label: "Maquillage", href: "/cosmetique", search: { sub: "maquillage" } },
        ],
      },
    ],
  },
];

export { navigationItems };

export function NavigationMenu() {
  return (
    <NavigationMenuRoot>
      <NavigationMenuList className="gap-1">
        {navigationItems.map((category) => (
          <NavigationMenuItem key={category.label}>
            <NavigationMenuTrigger className="bg-transparent text-xs uppercase tracking-luxury font-medium text-foreground/80 hover:text-foreground hover:bg-secondary/60 data-[state=open]:bg-secondary/60 data-[state=open]:text-foreground h-9 px-4 rounded-none">
              {category.label}
            </NavigationMenuTrigger>

            <NavigationMenuContent>
              <div className="grid gap-0 p-5 w-85 md:w-120 lg:w-140"
                style={{
                  gridTemplateColumns: category.groups.length > 1 ? `repeat(${category.groups.length}, 1fr)` : "1fr",
                }}
              >
                {category.groups.map((group, gIdx) => (
                  <div key={gIdx} className={`space-y-3 ${gIdx > 0 ? "border-l border-border/40 pl-5" : ""}`}>
                    {group.title && (
                      <h4 className="text-[11px] font-semibold uppercase tracking-luxury text-muted-foreground/70 pb-1">
                        {group.title}
                      </h4>
                    )}
                    <ul className="space-y-0.5">
                      {group.items.map((item) => (
                        <li key={item.label}>
                          <NavigationMenuLink asChild>
                            <Link
                              to={item.href}
                              search={(item.search || {}) as any}
                              className="group block select-none rounded-sm px-3 py-2.5 leading-none no-underline outline-none transition-colors hover:bg-accent/50 focus:bg-accent/50 cursor-pointer"
                            >
                              <span className="text-sm font-medium leading-none text-foreground group-hover:text-foreground">
                                {item.label}
                              </span>
                              {item.description && (
                                <p className="mt-1.5 text-xs leading-snug text-muted-foreground">
                                  {item.description}
                                </p>
                              )}
                            </Link>
                          </NavigationMenuLink>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              {/* Footer link */}
              <div className="border-t border-border/40 bg-secondary/30 px-5 py-3">
                <NavigationMenuLink asChild>
                  <Link
                    to={category.href}
                    className="text-xs font-medium text-muted-foreground hover:text-foreground transition-colors uppercase tracking-wider cursor-pointer"
                  >
                    Voir tout {category.label} →
                  </Link>
                </NavigationMenuLink>
              </div>
            </NavigationMenuContent>
          </NavigationMenuItem>
        ))}

        {/* Simple link without dropdown */}
        <NavigationMenuItem>
          <NavigationMenuLink asChild>
            <Link
              to="/a-propos"
              className="inline-flex h-9 items-center justify-center bg-transparent px-4 text-xs uppercase tracking-luxury font-medium text-foreground/80 hover:text-foreground hover:bg-secondary/60 transition-colors rounded-none"
            >
              À propos
            </Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenuRoot>
  );
}
