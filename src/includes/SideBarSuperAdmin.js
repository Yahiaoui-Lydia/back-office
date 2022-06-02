import React, { useEffect, useState,useCallback } from "react";
import { Link } from 'react-router-dom';
import logout from '../utils/logout'
import {
  ProSidebar,
  Menu,
  MenuItem,
  SidebarHeader,
  SidebarFooter,
  SidebarContent,SubMenu
} from "react-pro-sidebar";

//import icons from react icons
import {FaFileInvoiceDollar,FaProductHunt,FaUserCog,FaUser,FaUserTie } from "react-icons/fa";
import {ImStatsDots}from 'react-icons/im'
import {FiLogOut } from "react-icons/fi";
import { BiCategoryAlt } from "react-icons/bi";


//import sidebar css from react-pro-sidebar module and our custom css
import "react-pro-sidebar/dist/css/styles.css";
// 

const SideBarSuperAdmin = (props) => {
  //create initial menuCollapse state using useState hook
  const [menuCollapse, setMenuCollapse] = useState(false);

  const show = useCallback(() => {
    setMenuCollapse(props.show)
  }, [props.show])
  useEffect(() => {
    show()
  }, [show])

  return (
    <>
      <div id="header">
        {/* collapsed props to change menu size using menucollapse state */}
        <ProSidebar collapsed={menuCollapse}>
          <SidebarHeader className='logo'>
            <div className="logotext logo">
              {/* small and big change using menucollapse state */}
              <p>{menuCollapse ? "Logo" : "Big Logo"}</p>
             
            </div>
          
          </SidebarHeader>
          <SidebarContent>
            <Menu iconShape="square" >
              <MenuItem  icon={<ImStatsDots />}>
                Tableau de bord
                <Link to="/" />
              </MenuItem>
              <MenuItem  icon={<FaUserCog />}>
                Administrateurs
                <Link to="/admins" />
              </MenuItem>
              <MenuItem icon={<FaUser />}>
                Client B2C
                <Link to="/b2c" />
              </MenuItem>
              <SubMenu title="Clients B2B" icon={<FaUserTie />}>
                <MenuItem>Demande d'inscription<Link to="/b2b" /></MenuItem>
                <MenuItem>Liste Clients B2B<Link to="/listb2b" /></MenuItem>
                </SubMenu>
              <MenuItem icon={<FaProductHunt/>}>
               Produits
                <Link to="/produits" />
              </MenuItem>
              <MenuItem icon={<BiCategoryAlt />}>
               Categories
                <Link to="/categories" />
                </MenuItem>
              
                <SubMenu title="Devis" icon={<FaFileInvoiceDollar />}>
                <MenuItem>Devis validés<Link to="/devisValide" /></MenuItem>
                <MenuItem>Devis non validés<Link to="/devisNonValide" /></MenuItem>
                </SubMenu>
           


            </Menu>
          </SidebarContent>
          <SidebarFooter>
            <Menu iconShape="square">
              <MenuItem icon={<FiLogOut />} onClick={logout}>Logout</MenuItem>
            </Menu>
            
          </SidebarFooter>
        </ProSidebar>
      </div>
    </>
  );
};

export default SideBarSuperAdmin;
