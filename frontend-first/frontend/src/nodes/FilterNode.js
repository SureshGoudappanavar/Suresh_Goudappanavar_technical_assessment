import { BaseNode } from './BaseNode';

export const FilterNode = ({ id }) => {

  return (
    <BaseNode
      title="Filter Node"
      inputs={[
        { id: `${id}-input` }
      ]}
      outputs={[
        { id: `${id}-filtered` }
      ]}
    >

      <div>
        Filter Logic
      </div>

    </BaseNode>
  );
};
