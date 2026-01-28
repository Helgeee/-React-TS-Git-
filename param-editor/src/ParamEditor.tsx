import React from "react";

export interface Param {
  id: number;

  name: string;

  type: "string";
}

export interface ParamValue {
  paramId: number;

  value: string;
}

export interface Model {
  paramValues: ParamValue[];

  colors?: any[];
}

export interface Props {
  params: Param[];

  model: Model;
}

interface State {
  values: Record<number, string>;
}
