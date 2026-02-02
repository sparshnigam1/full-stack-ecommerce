import Footer from "@/components/common/footer";
import Header from "@/components/common/header";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="w-full min-h-screen flex flex-col bg-background pt-6">
      <Header />
      <main className="flex-1 overflow-x-hidden">
        {children}
        <Footer />
      </main>
    </div>
  );
}
