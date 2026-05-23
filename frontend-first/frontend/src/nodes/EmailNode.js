import { BaseNode } from './BaseNode';

export const EmailNode = ({ id }) => {

  return (

    <div
      style={{
        width:'250px',
        height:'150px'
      }}
    >

      <BaseNode
        title="Email Node"

        inputs={[
          { id:`${id}-to` },
          { id:`${id}-body` }
        ]}

        outputs={[
          { id:`${id}-status` }
        ]}
      >

        <div>
          Email Sender
        </div>

      </BaseNode>

    </div>
  );
};
