import { Suspense } from "react";
import { Container } from "@/components/Container";
import { LoginForm } from "@/components/LoginForm";

export const metadata = { title: "Admin login" };

export default function AdminLoginPage() {
  return (
    <Container className="py-24 md:py-32">
      <div className="mx-auto max-w-md">
        <h1 className="text-2xl font-semibold tracking-tight text-black md:text-3xl">
          Admin
        </h1>
        <p className="mt-2 text-sm leading-relaxed text-black/60">
          Sign in with the admin password. A secure cookie is set for this browser
          only.
        </p>
        <Suspense
          fallback={
            <p className="mt-10 text-sm text-black/60">Loading…</p>
          }
        >
          <LoginForm />
        </Suspense>
      </div>
    </Container>
  );
}
