"use client";

import { AnchorButton } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { CONTACT_US_PAGE_URL, HOME_PAGE_URL } from "@/utils/constants";
import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MouseEvent, useEffect, useRef, useState } from "react";
import Container from "./container";

const Header = () => {
  const pathname = usePathname();
  const barRef = useRef<HTMLDivElement>(null);
  const activeLinkRef = useRef<HTMLAnchorElement>(null);
  const [openApplicationDialog, setOpenApplicationDialog] = useState(false);

  const handleMouseEnter = (e: MouseEvent<HTMLAnchorElement>) => {
    if (barRef.current) {
      barRef.current.style.width = e.currentTarget.offsetWidth + "px";
      barRef.current.style.left = e.currentTarget.offsetLeft + "px";
      barRef.current.style.opacity = "1";
    }
  };
  const handleMouseLeave = () => {
    if (barRef.current) {
      if (activeLinkRef.current) {
        barRef.current.style.width = activeLinkRef.current?.offsetWidth + "px";
        barRef.current.style.left = activeLinkRef.current?.offsetLeft + "px";
      } else {
        barRef.current.style.opacity = "0";
      }
    }
  };

  useEffect(() => {
    if (barRef.current) {
      if (activeLinkRef.current) {
        barRef.current.style.width = activeLinkRef.current?.offsetWidth + "px";
        barRef.current.style.left = activeLinkRef.current?.offsetLeft + "px";
      } else {
        barRef.current.style.opacity = "0";
      }
    }
  }, [JSON.stringify(pathname)]);

  return (
    <HeaderWrapper>
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.6, ease: "easeOut" }}
        className="w-full flex flex-col z-999"
      >
        <Container className="bg-white border border-border-grey h-15 md:h-18 px-4 flex items-center justify-between shadow-[0px_4px_10px_0px_#00000014,0px_1px_4px_0px_#0000000A] rounded-std">
          <div className="flex items-center gap-3">
            {/* Mobile Menu */}
            {/* <MobileNavMenuDialog /> */}

            {/* LOGO */}
            <Link href={HOME_PAGE_URL}>
              <img
                src="/images/btt-logo.webp"
                alt="Ecom. Logo"
                className="inline-block h-[33] w-[66] md:h-[45] md:w-[99] object-contain"
              />
            </Link>
          </div>

          {/* Desktop Nav */}
          <nav
            className="hidden lg:flex h-full gap-3 relative"
            onMouseLeave={handleMouseLeave}
          >
            <div
              ref={barRef}
              className="absolute bg-primary w-0 h-1 bottom-0 rounded-md transition-all duration-500 pointer-events-none"
            />

            {/* {NAV_LINKS_KEYS.map((item) => {
              const isActive = item.href === pathname;

              return (
                <Link
                  key={item.key}
                  href={item.href}
                  onMouseEnter={handleMouseEnter}
                  className={cn(
                    "flex items-center font-medium text-sm text-dark-grey px-2.5 transition-colors",
                    "hover:text-black",
                    isActive && "text-primary font-semibold hover:text-primary"
                  )}
                  ref={isActive ? activeLinkRef : null}
                >
                  {c(`menu_items.${item.key}`)}
                </Link>
              );
            })} */}
          </nav>

          {/* Desktop CTA Group */}
          <div className="hidden lg:flex items-center gap-3">
            <AnchorButton variant="outline" href={CONTACT_US_PAGE_URL}>
              Contact Us
            </AnchorButton>
            {/* <Button
              variant="primary"
              onClick={() => setOpenApplicationDialog(true)}
            >
              Apply <LuArrowUpRight />
            </Button> */}
          </div>

          {/* Mobile CTA */}
          <AnchorButton
            variant="outline"
            href={CONTACT_US_PAGE_URL}
            size="small"
            className="flex lg:hidden"
          >
            Contact Us
          </AnchorButton>
        </Container>
      </motion.header>
    </HeaderWrapper>
  );
};

export default Header;

const HeaderWrapper = ({ children }: { children: React.ReactNode }) => {
  const [hidden, setHidden] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window?.scrollY;
      const width = window?.innerWidth;
      const hideHeight = width < 1024 ? 118 : 125;

      if (currentScrollY > lastScrollY && currentScrollY > hideHeight) {
        setHidden(true);
      } else {
        setHidden(false);
      }

      setLastScrollY(currentScrollY);
    };

    window?.addEventListener("scroll", handleScroll);
    return () => window?.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <div
      className={cn(
        "sticky top-6 transition-all duration-300 ease-in-out z-999",
        hidden && "-translate-y-full opacity-0",
      )}
    >
      {children}
    </div>
  );
};

export const NAV_LINKS_KEYS = [
  { key: "programs", href: "#!" },
  { key: "admission", href: "#!" },
  { key: "careers", href: "#!" },
  { key: "about_us", href: "#!" },
];
