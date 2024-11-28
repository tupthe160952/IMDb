import React, { useEffect, useState } from 'react';
import '../../styles/Navbar.css';

const Navbar: React.FC = () => {
    const [openDropdown, setOpenDropdown] = useState<string | null>(null);
    const [selectedItem, setSelectedItem] = useState<string | null>(null);

    const toggleDropdown = (dropdown: string) => {
        setOpenDropdown(openDropdown === dropdown ? null : dropdown);
    };

    const handleItemClick = (itemName: string) => {
        setSelectedItem(itemName);
    };

    const menuItems = [
        {
            title: 'Movie Management',
            items: [
                { name: 'Add Movie', url: '/admin/addMovie' },
                { name: 'List Movie', url: '/admin/listMovie' }
            ],
        },
        {
            title: 'Celebrity Management',
            items: [
                { name: 'Add Celebrity', url: '/admin/addCeleb' },
                { name: 'List Celebrity', url: '/admin/listCeleb' }
            ],
        },
        {
            title: 'User Management',
            items: [
                { name: 'List User', url: '/admin/listUser' }
            ],
        },
    ];

    useEffect(() => {
        // Kiểm tra URL hiện tại để giữ dropdown mở nếu URL trùng với một mục trong menu
        const currentPath = window.location.pathname;
        const matchingMenu = menuItems.find((menu) =>
            menu.items.some((item) => item.url === currentPath)
        );
        if (matchingMenu) {
            setOpenDropdown(matchingMenu.title);
        }
    }, [window.location.pathname]);

    return (
        <div className="navbar-container bg-dark text-light p-3">
            <a href="/">
                <div className="navbar-logo">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/IMDB_Logo_2016.svg/2560px-IMDB_Logo_2016.svg.png" alt="IMDb logo" />
                </div>
            </a>
            <ul className="list-unstyled">
                <li className="mb-3">
                    <a href="/admin" className="text-light text-decoration-none d-flex justify-content-between align-items-center">
                        <h2>Dashboard</h2>
                    </a>
                </li>
                <hr />
                <li className="mb-3">
                    <span className="text-muted">THEME</span>
                    <ul className="list-unstyled ps-3 mt-2">
                        {menuItems.map((menu) => (
                            <li className="mb-2" key={menu.title}>
                                <h5
                                    className="d-flex align-items-center text-white list-group-item"
                                    style={{ cursor: 'pointer' }}
                                    onClick={() => toggleDropdown(menu.title)}
                                >
                                    {menu.title}
                                    <i
                                        className={`ms-auto bi ${openDropdown === menu.title
                                            ? 'bi-chevron-up'
                                            : 'bi-chevron-down'
                                            }`}></i>
                                </h5>
                                {openDropdown === menu.title && (
                                    <ul className="nav flex-column ms-3 mt-2">
                                        {menu.items.map((item) => (
                                            <li className="nav-item" key={item.name}>
                                                <a
                                                    className={`nav-link text-white ${selectedItem === item.name ? 'bg-primary' : ''}`}
                                                    href={item.url}
                                                    onClick={() => handleItemClick(item.name)}
                                                >
                                                    {item.name}
                                                </a>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                                <hr />
                            </li>
                        ))}
                    </ul>
                </li>
            </ul>
        </div>
    );
};

export default Navbar;
