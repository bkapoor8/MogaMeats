import { getServerSession } from "next-auth"
import { authOptions } from "../auth/config"
import { User } from "@/app/models/User"

export async function isAdmin() {
  const session = await getServerSession(authOptions);
  const userEmail = session?.user?.email;
  if (!userEmail) return false;
  const user = await User.findOne({ email: userEmail });
  if (!user) return false;
  return user.isAdmin;
}
