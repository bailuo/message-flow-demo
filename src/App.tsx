import Chat from "./pages/chatroom";
import MockBar from "./component/mockbar";
import eventBus from "./utils/EventBus";
import "./App.less";
function App() {
  return (
    <div className="App">
      <MockBar eventBus={eventBus} />
      <Chat eventBus={eventBus} />
    </div>
  );
}

export default App;
