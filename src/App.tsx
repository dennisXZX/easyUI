import React from "react";
import Button, { ButtonSize, ButtonType } from "./components/Button/button";
import Menu, { MenuMode } from "./components/Menu/menu";
import MenuItem from "./components/Menu/menu-item";

function App() {
  return (
    <div className="App">
      <Menu onSelect={(index) => console.log(index)} mode={MenuMode.Vertical}>
        <MenuItem index={0}>link 1</MenuItem>
        <MenuItem index={1}>link 2</MenuItem>
        <MenuItem index={2}>link 3</MenuItem>
      </Menu>

      <Button autoFocus onClick={() => console.log("hello")} className="hello">
        Test
      </Button>
      <Button btnType={ButtonType.Link} href="www.baidu.com">
        Test
      </Button>
      <Button btnType={ButtonType.Primary} size={ButtonSize.Large}>
        Hello
      </Button>
      <Button btnType={ButtonType.Danger} size={ButtonSize.Small}>
        Hello
      </Button>
    </div>
  );
}

export default App;
