import React from 'react';
import { NavLink } from 'react-router-dom';

interface NavLinkItem {
  to: string;
  label: string;
}

const navLinks: NavLinkItem[] = [
  { to: '/', label: 'Contacts' },
  { to: '/charts', label: 'Charts' }
];

export const SideNavigation: React.FC = () => {
  return (
    <nav className="bg-gray-800 text-white w-64 flex-shrink-0">
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-4">Navigation</h2>
        <ul>
          {navLinks.map((link) => (
            <li key={link.to} className="mb-2">
              <NavLink
                to={link.to}
                className={({ isActive, isPending }) =>
    isPending ? "text-white hover:text-blue-200" : isActive ? "text-blue-300" : "text-white hover:text-blue-200"
  }
              >
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default SideNavigation;
