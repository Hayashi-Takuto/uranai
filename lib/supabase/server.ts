import { cookies } from "next/headers";
import {
  createServerActionClient,
  createServerComponentClient,
  createRouteHandlerClient,
} from "@supabase/auth-helpers-nextjs";

export function getServerComponentClient() {
  return createServerComponentClient({ cookies });
}

export function getServerActionClient() {
  return createServerActionClient({ cookies });
}

export function getRouteHandlerClient() {
  return createRouteHandlerClient({ cookies });
}
