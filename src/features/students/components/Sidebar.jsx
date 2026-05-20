"use client";

import React from "react";
import { 
  LuLayoutDashboard, 
  LuUsers, 
  LuGraduationCap, 
  LuFileChartPie, 
  LuSettings,
  LuMenu,
  LuX 
} from "react-icons/lu";

/**
 * Sidebar component that handles navigation and mobile drawer states.
 */
export function Sidebar({ isOpen, onToggle, currentPath = "students" }) {
  const navItems = [
    { label: "Dashboard", id: "dashboard", icon: LuLayoutDashboard },
    { label: "Student Directory", id: "students", icon: LuUsers },
    { label: "Faculty", id: "faculty", icon: LuGraduationCap },
    { label: "Reports", id: "reports", icon: LuFileChartPie },
    { label: "Settings", id: "settings", icon: LuSettings },
  ];

  return (
    <>
      {/* Mobile Toggle Button */}
      <button 
        className="mobile-nav-toggle" 
        onClick={onToggle}
        aria-label={isOpen ? "Close menu" : "Open menu"}
      >
        {isOpen ? <LuX size={24} /> : <LuMenu size={24} />}
      </button>

      {/* Backdrop for mobile */}
      {isOpen && <div className="sidebar-overlay" onClick={onToggle} />}

      <aside className={`sidebar ${isOpen ? "open" : ""}`}>
        <div className="sidebar-brand">
          <div className="brand-icon">E</div>
          <div className="brand-content">
            <strong>EduAdmin</strong>
            <p>Registry Office</p>
          </div>
        </div>

        <nav className="sidebar-nav">
          {navItems.map(({ label, id, icon: Icon }) => (
            <button 
              key={id}
              className={`nav-item ${currentPath === id ? "active" : ""}`}
            >
              <Icon className="nav-icon" size={20} />
              <span>{label}</span>
            </button>
          ))}
        </nav>

        <div className="sidebar-footer">
          <div className="user-profile">
            <div className="user-avatar">AD</div>
            <div className="user-info">
              <strong>Admin User</strong>
              <p>System Manager</p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
