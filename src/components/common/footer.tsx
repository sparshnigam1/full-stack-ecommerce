"use client";

import LocationPinOutlinedIcon from "@/components/icons/locationPinOutlinedIcon";
import MailOutlinedIcon from "@/components/icons/mailOutlinedIcon";
import PhoneOutlinedIcon from "@/components/icons/phoneOutlinedIcon";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import moment from "moment";
import Link from "next/link";
import { ReactNode } from "react";
import { BiLogoInstagramAlt } from "react-icons/bi";
import { FaFacebookF, FaLinkedinIn, FaTiktok } from "react-icons/fa6";
import { LuExternalLink } from "react-icons/lu";
import { RiWhatsappFill } from "react-icons/ri";
import { Separator } from "../ui/separator";
import Container from "./container";

interface FooterLinkGroupType {
  group_heading: string;
  group_links: { text: string; href: string }[];
}

const Footer = () => {
  const footerLinks: FooterLinkGroupType[] = [
    {
      group_heading: "About",
      group_links: [
        { text: "About Ecommerce", href: "/about-us" },
        { text: "Our Mission & Vision", href: "#" },
        { text: "Careers", href: "#" },
        { text: "Contact Us", href: "/contact-us" },
      ],
    },
    {
      group_heading: "Products",
      group_links: [
        { text: "Mobiles", href: "#" },
        { text: "Electronics", href: "#" },
        { text: "Fashion", href: "#" },
        { text: "Furniture", href: "#" },
        { text: "Grocery", href: "#" },
      ],
    },
    {
      group_heading: "Help",
      group_links: [
        { text: "Payments", href: "#" },
        { text: "Shipping", href: "#" },
        { text: "Cancellation & Returns", href: "#" },
        { text: "FAQ", href: "#" },
      ],
    },
    {
      group_heading: "Consumer Policies",
      group_links: [
        { text: "Terms Of Use", href: "#" },
        { text: "Security", href: "#" },
        { text: "Privacy", href: "#" },
      ],
    },
  ];

  return (
    <footer className="flex flex-col gap-6 md:gap-0 pb-6 pt-6.5 md:pt-11">
      {/* Company Contact Info Mobile */}
      <Container className="flex md:hidden flex-col items-center justify-center gap-3">
        <Link href="/">
          <img
            src="/images/btt-logo.webp"
            alt="Ecom. Logo"
            className="inline-block h-[60] w-[132] object-contain"
          />
        </Link>
        <h4 className="text-primary text-center font-medium text-base max-w-77.5">
          Ecommerce
        </h4>
      </Container>

      <Separator />

      {/* Footer links Desktop*/}
      <Container className="hidden pb-16 pt-15 border-b border-border-grey md:flex gap-x-15 xl:gap-x-25 gap-y-10">
        <div className="w-full max-w-66 flex flex-col gap-4">
          <div className="flex flex-col gap-3">
            <Link href="/">
              <img
                src="/images/btt-logo.webp"
                alt="Ecom. Logo"
                className="inline-block h-[60] w-[132] object-contain"
              />
            </Link>
            <h4 className="text-primary text-5.5 font-medium text-base">
              Ecommerce
            </h4>
          </div>
          <div className="flex flex-col items-start gap-3.5">
            {CONTACT_LINKS.map((groupLink, i) => (
              <Link
                key={groupLink.text}
                href={groupLink.href}
                target={!!groupLink?.external ? "_blank" : ""}
                className="text-dark-grey transition-all duration-500 flex items-start gap-2 group"
              >
                {!!groupLink.icon && (
                  <span className="translate-y-1">{groupLink.icon}</span>
                )}
                <p className="group-hover:underline text-sm">
                  <span className="">
                    {groupLink.text}
                    {CONTACT_LINKS.length == i + 1 && " "}
                  </span>
                  <span className="inline-block -translate-y-px">
                    {CONTACT_LINKS.length == i + 1 && (
                      <LuExternalLink className="inline-block text-primary w-4 h-4" />
                    )}
                  </span>
                </p>
              </Link>
            ))}
          </div>
        </div>

        <div className="w-full pt-18 md:grid grid-cols-2 lg:grid-cols-4 gap-x-14 gap-y-10">
          {footerLinks?.map((item) => (
            <div key={item.group_heading} className="flex flex-col gap-4">
              <h4 className="text-5.5 font-medium text-base">
                {item.group_heading}
              </h4>
              <div className="flex flex-col items-start gap-3.5">
                {item.group_links.map((groupLink) => (
                  <Link
                    key={groupLink.text}
                    href={groupLink.href}
                    // target={!!groupLink?.external ? "_blank" : ""}
                    className="text-dark-grey transition-all duration-500 flex items-start gap-2 group"
                  >
                    {/* {!!groupLink.icon && (
                      <span className="translate-y-1">{groupLink.icon}</span>
                    )} */}
                    <span className="group-hover:underline text-sm">
                      {groupLink.text}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Container>

      {/* Footer links Mobile */}
      <Container className="flex md:hidden flex-col gap-5 border-b border-border-grey pb-4 px-3">
        <div className="w-full flex flex-col gap-4">
          <h4 className="font-medium text-base">Connect</h4>
          <div className="flex flex-col items-start gap-3 max-w-70">
            {CONTACT_LINKS.map((groupLink, i) => (
              <Link
                key={groupLink.text}
                href={groupLink.href}
                target={!!groupLink?.external ? "_blank" : ""}
                className="w-full text-dark-grey transition-all duration-500 flex items-center gap-3 group"
              >
                {!!groupLink.icon && (
                  <span className="flex items-center justify-center w-full max-w-12 h-12 rounded-full border border-light-grey">
                    {groupLink.icon}
                  </span>
                )}
                <div className="w-full flex items-center gap-3">
                  <p className="group-hover:underline text-sm">
                    <span>
                      {groupLink.text}
                      {CONTACT_LINKS.length == i + 1 && " "}
                    </span>
                    <span className="inline-block -translate-y-px">
                      {CONTACT_LINKS.length == i + 1 && (
                        <LuExternalLink className="inline-block text-primary w-4 h-4" />
                      )}
                    </span>
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>

        <Accordion
          type="single"
          collapsible
          className="w-full"
          defaultValue="item-1"
        >
          {footerLinks.map((linkGroup, idx) => (
            <AccordionItem
              key={linkGroup.group_heading}
              value={`item-${idx + 1}`}
            >
              <AccordionTrigger className="text-base">
                {linkGroup.group_heading}
              </AccordionTrigger>
              <AccordionContent className="flex flex-col items-start gap-4 text-sm">
                {linkGroup.group_links.map((linkItem) => (
                  <Link
                    key={linkItem.text}
                    href={linkItem.href}
                    // target={!!link?.external ? "_blank" : ""}
                    className="text-dark-grey transition-all duration-500 flex items-start gap-2"
                  >
                    {/* {!!link.icon && (
                      <span className="translate-y-0.5"> {link.icon}</span>
                    )} */}
                    <span className="hover:underline">{linkItem.text}</span>
                  </Link>
                ))}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </Container>

      {/* copyright section with social icons */}
      <Container className="flex flex-col md:flex-row gap-6 items-center justify-between mt-8 md:mt-9.5">
        <p className="text-sm text-dark-grey text-center md:text-left">
          &copy; {moment().format("YYYY")} Ecommerce. All Rights Reserved.
        </p>

        <div className="flex flex-col md:flex-row items-center text-center md:text-left gap-3 md:gap-5.2">
          <p className="font-light text-xs md:text-sm">Follow Us on:</p>

          <div className="flex items-center gap-5.5 text-primary">
            <Link href="#!" target="_blank">
              <FaFacebookF className="h-5 w-5" />
            </Link>
            <Link href="#!" target="_blank">
              <BiLogoInstagramAlt className="h-6 w-6" />
            </Link>
            <Link href="#!" target="_blank">
              <FaTiktok className="h-5 w-5" />
            </Link>
            <Link href="#!" target="_blank">
              <FaLinkedinIn className="h-5 w-5" />
            </Link>
            <Link href="#!" target="_blank">
              <RiWhatsappFill className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;

const CONTACT_LINKS: {
  text: string;
  href: string;
  icon?: ReactNode;
  external?: boolean;
}[] = [
  {
    text: "info@ecommerce.com",
    href: "mailto:info@ecommerce.com",
    icon: <MailOutlinedIcon />,
    external: true,
  },
  {
    text: "+91 1234567890",
    href: "tel:+911234567890",
    icon: <PhoneOutlinedIcon />,
    external: true,
  },
  {
    text: "Loren Ipsum",
    href: "#!",
    icon: <LocationPinOutlinedIcon className="-ml-1.5 translate-x-0.5" />,
    external: true,
  },
];
