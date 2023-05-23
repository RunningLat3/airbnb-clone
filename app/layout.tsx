import { Nunito } from "next/font/google";

import ToasterProvider from "@/app/providers/ToasterProvider";

import "./globals.css";
import Navbar from "@/app/components/navbar/Navbar";
import LoginModal from "./components/modals/LoginModal";
import RegisterModal from "@/app/components/modals/RegisterModal";
import RentModal from "./components/modals/RentModal";

import getCurrentUser from "./actions/getCurrentUser";

const font = Nunito({ subsets: ["latin"] });

export const metadata = {
  title: "Airbnb",
  description: "Airbnb clone using nextjs, tailwind, prisma, mongodb",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentUser = await getCurrentUser();
  return (
    <html lang="en">
      <body className={font.className}>
        <ToasterProvider />
        <RentModal />
        <LoginModal />
        <RegisterModal />
        <Navbar currentUser={currentUser} />
        <div className="pb-20 pt-28">{children}</div>
      </body>
    </html>
  );
}
