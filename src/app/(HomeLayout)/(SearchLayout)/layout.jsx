import SearchBar from "@/components/layout/SearchBar";

export const metadata = {
  title: "Picflix",
  description: "A fun social media platform for sharing photos and videos.",
};

export default function RootLayout({ children }) {
  return (
    <div className="flex flex-col mx-auto ">
      <SearchBar />
      {children}
    </div>
  );
}
