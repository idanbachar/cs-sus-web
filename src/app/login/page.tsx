import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { LoginForm } from "@/components/auth/LoginForm";

export default function LoginPage() {
  return (
    <div className="app-shell">
      <Header />
      <main className="page-wrap">
        <section className="tracking-placeholder" style={{ maxWidth: "640px" }}>
          <h1 style={{ fontFamily: "var(--font-heading)", fontSize: "3rem", margin: 0 }}>
            Login With Steam
          </h1>
          <p style={{ color: "#a7b6ce", marginTop: "0.4rem", marginBottom: "1rem" }}>
            Secure Steam OpenID login. You will be redirected to Steam and back.
          </p>
          <LoginForm />
        </section>
      </main>
      <Footer />
    </div>
  );
}
