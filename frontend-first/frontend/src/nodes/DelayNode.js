import { BaseNode } from './BaseNode';

export const DelayNode = ({ id }) => {

  return (
    <BaseNode
      title="Delay Node"
      inputs={[
        { id: `${id}-input` }
      ]}
      outputs={[
        { id: `${id}-output` }
      ]}
    >

      <div>
        Delay Processing
      </div>

    </BaseNode>
  );
};
