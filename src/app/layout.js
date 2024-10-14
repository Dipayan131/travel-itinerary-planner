import "./globals.css";

export const metadata = {
  title: 'Travel Itinerary Planner',
  description: 'Plan your travel itineraries with ease!',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <main>{children}</main>
      </body>
    </html>
  );
}