import "./globals.css";

export const metadata = {
    title: "Terminal"
};

export default function RootLayout({children}) {
    return (<html lang="nl">
    <body>
    {children}
    </body>
    </html>);
}