import React, { createContext, useState } from "react";
import classNames from "classnames";

export enum MenuMode {
  Horizontal = "horizontal",
  Vertical = "vertical",
}

type SelectCallback = (selectedIndex: number) => void;

export interface IMenuProps {
  className?: string;
  defaultIndex?: number;
  mode?: MenuMode;
  onSelect?: SelectCallback;
  style?: React.CSSProperties;
}

export interface IMenuContext {
  index: number;
  onSelect?: SelectCallback;
}

export const MenuContext = createContext<IMenuContext>({ index: 0 });

const Menu: React.FC<IMenuProps> = (props) => {
  const { children, className, defaultIndex, mode, onSelect, style } = props;

  const [currentActive, setCurrentActive] = useState(defaultIndex);

  const classes = classNames("menu", className, {
    "menu-vertical": mode === MenuMode.Vertical,
  });

  const handleClick = (index: number) => {
    setCurrentActive(index);

    if (onSelect) {
      onSelect(index);
    }
  };

  const menuContext: IMenuContext = {
    index: currentActive ? currentActive : 0,
    onSelect: handleClick,
  };

  return (
    <ul className={classes} style={style}>
      <MenuContext.Provider value={menuContext}>
        {children}
      </MenuContext.Provider>
    </ul>
  );
};

Menu.defaultProps = {
  defaultIndex: 0,
  mode: MenuMode.Horizontal,
};

export default Menu;
