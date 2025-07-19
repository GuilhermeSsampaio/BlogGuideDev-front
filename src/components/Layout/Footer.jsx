import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ROUTES } from "../../routes/constants";

export default function Footer() {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState(location.pathname);

  const tabs = [
    {
      id: ROUTES.HOME,
      label: "Blog",
      icon: "bi-journal-text",
      path: ROUTES.HOME,
    },
    {
      id: ROUTES.IDEIAS,
      label: "Ideias",
      icon: "bi-lightbulb",
      path: ROUTES.IDEIAS,
    },
    {
      id: ROUTES.SOBRE,
      label: "Sobre",
      icon: "bi-info-circle",
      path: ROUTES.SOBRE,
    },
  ];

  return (
    <>
      {/* Copyright */}
      <div
        className="container azul jersey-25-regular text-center py-3"
        style={{ fontSize: "1.2rem" }}
      >
        © 2025 - Guilherme Sampaio
      </div>

      {/* tab navigation */}
      <div className="d-block d-md-none fixed-bottom bg-white border-top shadow">
        <div className="container-fluid">
          <div className="row">
            {tabs.map((tab) => (
              <div key={tab.id} className="col-4 p-0">
                <Link
                  to={tab.path}
                  className={`btn w-100 border-0 py-3 d-flex flex-column align-items-center text-decoration-none ${
                    location.pathname === tab.path
                      ? "text-primary"
                      : "text-muted"
                  }`}
                  onClick={() => setActiveTab(tab.id)}
                  style={{ backgroundColor: "transparent", fontSize: "0.8rem" }}
                >
                  <i
                    className={`${tab.icon} mb-1`}
                    style={{ fontSize: "1.5rem" }}
                  ></i>
                  <span className="jersey-25-regular">{tab.label}</span>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="d-block d-md-none" style={{ height: "80px" }}></div>
    </>
  );
}
