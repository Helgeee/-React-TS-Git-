import type { Param, Model } from "./ParamEditor";
import { ParamEditor } from "./ParamEditor";

const params: Param[] = [
  { id: 1, name: "Назначение", type: "string" },
  { id: 2, name: "Длина", type: "string" },
];

const model: Model = {
  paramValues: [
    { paramId: 1, value: "повседневное" },
    { paramId: 2, value: "макси" },
  ],
};

function App() {
  return (
    <div style={{ padding: 20 }}>
      <h1>Редактор параметров</h1>
      <ParamEditor params={params} model={model} />
    </div>
  );
}

export default App;
