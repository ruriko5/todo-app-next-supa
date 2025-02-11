import Link from "next/link";
import { UserAvatar } from "./user-avatar";

export const Header = () => {
  return (
    <header className="sticky top-0 bg-white flex items-center justify-between p-4 shadow-sm">
      <Link href={"/"}>
        <h1 className="font-bold text-2xl">Todo App</h1>
      </Link>
      <UserAvatar />
    </header>
  );
};
