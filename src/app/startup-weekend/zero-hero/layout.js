export const metadata = {
  title: "Zero ao Hero | Startup Weekend Anápolis",
  description: "Acompanhe a evolução dos times do Zero ao Hero no Startup Weekend Anápolis",
};

export default function ZeroHeroLayout({ children }) {
  return (
    <div className="zero-hero-layout">
      {children}
    </div>
  );
}
