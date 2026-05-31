import { useAuthStore } from "@/stores/authStore";
import type { RouteLocationNormalizedGeneric } from "vue-router";

export function requireAuth(to:RouteLocationNormalizedGeneric, 
                            from:RouteLocationNormalizedGeneric)
{
    const authStore = useAuthStore();
    
    if (!authStore.checkToken()){
        authStore.setIntention(to.fullPath)
        return '/login'
    }
    else
        return true;
}

export function requireAnon(to:RouteLocationNormalizedGeneric, 
                            from:RouteLocationNormalizedGeneric)
{
    const authStore = useAuthStore();
    
    if (authStore.checkToken())
        return from.fullPath
    else
        return true;
}