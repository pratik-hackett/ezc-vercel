import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "@/store/store";
import { clearUser } from "@/store/slices/authSlice";
import { authService } from "@/services/authService";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import { LogOut, Home, Package } from "lucide-react";

export function CustomerMenuBar() {
  const user = useSelector((state: RootState) => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await authService.logout();
    } catch {}
    dispatch(clearUser());
    navigate("/");
  };

  return (
    <header className="h-16 bg-background border-b border-border/60 flex items-center justify-between px-4">
      <div className="flex items-center gap-2">
        <Button variant="ghost" onClick={() => navigate("/customer")}>
          <Home className="h-4 w-4 mr-2" /> Home
        </Button>
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Avatar>
            <AvatarFallback>{user?.eu_first_name?.[0]}{user?.eu_last_name?.[0]}</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => navigate("/customer/quotations")}>
            <Package className="h-4 w-4 mr-2" /> Quotations
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleLogout}>
            <LogOut className="h-4 w-4 mr-2" /> Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
}
