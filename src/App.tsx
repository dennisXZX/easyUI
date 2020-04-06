import React from "react";
import Button, { ButtonSize, ButtonType } from "./components/Button/button";

function App() {
  return (
    <div className="App">
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
