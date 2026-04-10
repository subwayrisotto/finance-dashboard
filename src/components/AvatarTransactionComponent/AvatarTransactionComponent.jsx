import React from "react";
import styles from "./AvatarTransactionComponent.module.scss";

function AvatarTransaction(props) {
  const { title, icons } = props;

  const iconObj = icons.find(
    (icon) => icon.title?.toLowerCase() === title.toLowerCase(),
  );

  const getInitials = (name) => {
    const words = name.trim().split(" ");
    if (words.length === 1) return words[0][0].toUpperCase();
    return (words[0][0] + words[1][0]).toUpperCase();
  };

  return (
    <div className={styles.avatarCtn}>
      {iconObj ? (
        <img
          src={`/assets/icons/${iconObj.src}`}
          alt={title}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      ) : (
        <div className={styles.initialCtn}>
          <p>{getInitials(title)}</p>
        </div>
      )}
    </div>
  );
}

export default AvatarTransaction;
