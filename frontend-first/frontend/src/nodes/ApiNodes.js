import { BaseNode } from './BaseNode';

export const ApiNode = ({ id }) => {

  return (
    <BaseNode
      title="API Node"
      inputs={[
        { id: `${id}-url` }
      ]}
      outputs={[
        { id: `${id}-response` }
      ]}
    >

      <div>
        API Request Component
      </div>

    </BaseNode>
  );
};
