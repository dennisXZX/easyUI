import React from 'react';
import Button, {ButtonSize, ButtonType} from "./components/Button/button";

function App() {
  return (
    <div className="App">
      <Button>fdsfds</Button>
      <Button btnType={ButtonType.Link} href='www.baidu.com'>fdsfds</Button>
      <Button btnType={ButtonType.Primary} size={ButtonSize.Large}>Hello</Button>
    </div>
  );
}

export default App;
