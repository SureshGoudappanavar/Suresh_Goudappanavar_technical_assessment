import { BaseNode } from './BaseNode';

export const MathNode = ({ id }) => {

  return (

    <div
      style={{
        width:'240px',
        height:'130px'
      }}
    >

      <BaseNode
        title="Math Node"

        inputs={[
          { id:`${id}-a` },
          { id:`${id}-b` }
        ]}

        outputs={[
          { id:`${id}-result` }
        ]}
      >

        <div>
          Math Calculator
        </div>

      </BaseNode>

    </div>
  );
};
