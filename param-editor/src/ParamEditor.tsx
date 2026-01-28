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

export class ParamEditor extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    const initialValues: Record<number, string> = {};

    props.params.forEach((param) => {
      const valueFromModel = props.model.paramValues.find(
        (pv) => pv.paramId === param.id,
      );

      initialValues[param.id] = valueFromModel?.value ?? "";
    });

    this.state = {
      values: initialValues,
    };
  }
}
