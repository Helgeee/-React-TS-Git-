import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import React from "react";

import { ParamEditor } from "./ParamEditor";
import type { Param, Model } from "./ParamEditor";

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

describe("ParamEditor", () => {
  it("renders inputs for all params", () => {
    render(<ParamEditor params={params} model={model} />);
    const inputs = screen.getAllByRole("textbox");
    expect(inputs).toHaveLength(2);
  });

  it("initializes values from model.paramValues", () => {
    render(<ParamEditor params={params} model={model} />);
    const inputs = screen.getAllByRole("textbox") as HTMLInputElement[];
    expect(inputs[0].value).toBe("повседневное");
    expect(inputs[1].value).toBe("макси");
  });

  it("returns correct model from getModel after changes", () => {
    const ref = React.createRef<ParamEditor>();
    render(<ParamEditor params={params} model={model} ref={ref} />);

    const inputs = screen.getAllByRole("textbox");
    fireEvent.change(inputs[0], { target: { value: "вечернее" } });

    const result = ref.current!.getModel();
    expect(result.paramValues).toEqual([
      { paramId: 1, value: "вечернее" },
      { paramId: 2, value: "макси" },
    ]);
  });
});
