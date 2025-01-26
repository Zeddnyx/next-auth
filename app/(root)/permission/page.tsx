import { USER } from "@/lib/constants";
import { hasPermision } from "@/lib/utils";

export default function Page() {
  return (
    <div
      className={
        "h-[calc(100vh-16px-var(--h-navbar))] overflow-scroll no-scrollbar"
      }
    >
      {hasPermision(USER, "create:comments") && <div>create</div>}
      {hasPermision(USER, "delete:comments") && <div>delete</div>}
    </div>
  );
}
