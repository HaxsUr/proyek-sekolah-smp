import { LoginForm } from "./components/login-form";

export default function LoginPage() {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="w-full max-w-md space-y-4">
        <div className="text-center">
          <h1 className="text-3xl font-bold">Login Admin</h1>
          <p className="text-gray-500 dark:text-gray-400">
            Masukkan kredensial Anda untuk mengakses dasbor.
          </p>
        </div>
        <LoginForm />
      </div>
    </div>
  );
}