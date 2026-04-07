import React, { useState } from "react";
import navbarItems from "../../data/navbar";
import { Link, useLocation } from "react-router-dom";
import styles from "./NavBarComponent.module.scss";
import user from "../../data/user";

function NavBar() {
  const location = useLocation();
  const [activeId, setActiveId] = useState(
    navbarItems.find((item) => location.pathname.startsWith(item.link))?.id ||
      1,
  );

  return (
    <div className={styles.navbar}>
      <div className={styles.wrapper}>
        <div className={styles.navLogo}>
          <img src="/assets/logo.svg" alt="Logo" />
        </div>

        <nav className={styles.navContent}>
          <ul className={styles.navList}>
            {navbarItems.map((ni) => {
              return (
                <li
                  key={ni.id}
                  className={`${styles.navListItem} ${activeId === ni.id ? styles.navActive : ""}`}
                  onClick={() => setActiveId(ni.id)}
                >
                  <Link to={ni.link}>{ni.text}</Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className={styles.accountDetails}>
          <div className={styles.settings}>
            <img src="/assets/icons/settings.svg" alt="Settings Icon" />
          </div>
          <div className={styles.notifications}>
            <img
              src="/assets/icons/notifications.svg"
              alt="Notifications Icon"
            />
          </div>
          <div className={styles.avatar}>
            <img src={`/assets/avatars/${user.avatar}`} alt={user.name} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default NavBar;
