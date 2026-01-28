/* eslint-disable react-refresh/only-export-components */

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
}

export interface Props {
  params: Param[];
  model: Model;
}

interface State {
  values: Record<number, string>;
}

type ParamRendererProps = {
  value: string;
  onChange: (value: string) => void;
};

const StringParamRenderer: React.FC<ParamRendererProps> = ({
  value,
  onChange,
}) => (
  <input type="text" value={value} onChange={(e) => onChange(e.target.value)} />
);

const paramRenderers: Record<Param["type"], React.FC<ParamRendererProps>> = {
  string: StringParamRenderer,
};

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
  // обработчик изменения поля
  private handleChange = (paramId: number, value: string) => {
    this.setState((prevState) => ({
      values: {
        ...prevState.values,
        [paramId]: value,
      },
    }));
  };

  public getModel(): Model {
    return {
      ...this.props.model,
      paramValues: Object.entries(this.state.values).map(
        ([paramId, value]) => ({
          paramId: Number(paramId),
          value,
        }),
      ),
    };
  }

  render() {
    const { params } = this.props;
    const { values } = this.state;

    return (
      <div>
        {params.map((param) => {
          const Renderer = paramRenderers[param.type];

          return (
            <div key={param.id} style={{ marginBottom: 8 }}>
              <label style={{ marginRight: 8 }}>{param.name}</label>
              <Renderer
                value={values[param.id]}
                onChange={(value) => this.handleChange(param.id, value)}
              />
            </div>
          );
        })}
      </div>
    );
  }
}
