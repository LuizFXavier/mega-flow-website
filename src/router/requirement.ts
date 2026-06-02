import { useAuthStore } from "@/stores/authStore";
import { useUserStore } from "@/stores/userStore";
import type { RouteLocationNormalizedGeneric } from "vue-router";

export function requireAuth(to:RouteLocationNormalizedGeneric, 
                            from:RouteLocationNormalizedGeneric)
{
    const authStore = useAuthStore();
    
    if (!authStore.checkToken()){
        authStore.setIntention(to.fullPath)
        return '/login'
    }
    else{
        const userStore = useUserStore()
        
        if(!userStore.checkUser()){
            userStore.setUserFromToken(authStore.token!)
        }
        return true;
    }
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