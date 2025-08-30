import { useTrigger } from "@/hooks/useTriggers";
import { useNavigate } from "react-router";

export default function SetupGeneric() {
  const navigate = useNavigate();

  useTrigger<string>("navigateTo", (to) => navigate(to));

  return null;
}
