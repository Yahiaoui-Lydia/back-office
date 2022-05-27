import React, { memo } from 'react';
import PublicRoutes from './PublicRoutes';
import isLoggedIn from '../utils/isLoggedIn';
import AdminRoutes from './AdminRoutes';
import SuperAdminRoutes from './SuperAdminRoutes'

function Router() {
   
    if (isLoggedIn) {
        if(isLoggedIn ()==='admin'){
            
            return(<AdminRoutes />) 
        }
        if(isLoggedIn ()==='superadmin'){
            
            return(<SuperAdminRoutes />) 
        }
      
        return <PublicRoutes />
     }  
    return <PublicRoutes />

}

export default memo(Router);