import React from 'react';
import image from '../assets/images/misc/logo.png';
import { Link } from 'react-router-dom';

function SideBar(){
    return(
        <React.Fragment>
            {/*<!-- Sidebar -->*/}
            <ul className="navbar-nav bg-gradient-secondary sidebar sidebar-dark accordion" id="accordionSidebar">

                {/*<!-- Sidebar - Brand -->*/}
                <Link className="sidebar-brand d-flex align-items-center justify-content-center" to="/">
                    <div className="sidebar-brand-icon">
                        <img className="w-50" src={image} alt="Diseñart"/>
                    </div>
                </Link>

                {/*<!-- Divider -->*/}
                <hr className="sidebar-divider my-0"/>

                {/*<!-- Nav Item - Dashboard -->*/}
                <li className="nav-item active">
                    <Link className="nav-link" to="/">
                        <i className="fas fa-fw fa-tachometer-alt"></i>
                        <span>Dashboard de DISEÑART</span></Link>
                </li>

                {/*<!-- Divider -->*/}
                <hr className="sidebar-divider"/>

                {/*<!-- Heading -->*/}
                <div className="sidebar-heading">Vistas</div>

                {/*<!-- Nav Item - Search -->*/}
                <li className="nav-item">
                <Link className="nav-link" to="/products">
                        <i className="fas fa-fw fa-search"></i>
                        <span> Buscar producto</span>
                    </Link>
                </li>

                {/*<!-- Nav Item - Users -->*/}
                <li className="nav-item">
                    <Link className="nav-link collapsed" to="/users">
                        <i className="fas fa-fw fa-folder"></i>
                        <span>Usuarios</span>
                    </Link>
                </li>

                {/*<!-- Nav Item - Last Products -->*/}
                <li className="nav-item">
                    <Link className="nav-link" to="/lastProducts">
                        <i className="fas fa-fw fa-chart-area"></i>
                        <span>Destacados</span></Link>
                </li>

                {/*<!-- Nav Item - Products -->*/}
                <li className="nav-item">
                    <Link className="nav-link" to="/productsList">
                        <i className="fas fa-fw fa-table"></i>
                        <span>Listado de productos</span></Link>
                </li>

                {/*<!-- Nav Item - Create -->*/}
                <li className="nav-item">
                    <Link className="nav-link" to="/products/create">
                        <i className="fas fa-fw fa-plus"></i>
                        <span>Crear producto</span></Link>
                </li>

                {/*<!-- Divider -->*/}
                <hr className="sidebar-divider d-none d-md-block"/>
            </ul>
            {/*<!-- End of Sidebar -->*/}
            
        </React.Fragment>
    )
}
export default SideBar;