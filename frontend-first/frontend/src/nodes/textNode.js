import { useState, useMemo } from 'react';
import { BaseNode } from './BaseNode';

export const TextNode = ({ id, data }) => {

  const [text, setText] = useState(
    data?.text || ''
  );

  const variables = useMemo(() => {

    const regex =
      /{{\s*([a-zA-Z_$][a-zA-Z0-9_$]*)\s*}}/g;

    const matches =
      [...text.matchAll(regex)];

   const uniqueVars =
  [...new Set(
    matches.map(
      match=>match[1]
    )
  )];

return uniqueVars.map(
  variable => ({
    id:`${id}-${variable}`,
    label:variable
  })
);

  }, [text,id]);

  const lineCount =
    text.split('\n').length;

  const nodeHeight = Math.max(
    120,
    110 + lineCount * 24
  );

  return (

    <div
      style={{
        width:'320px',
        height:`${nodeHeight}px`
      }}
    >

      <BaseNode
        title="Text Node"

        inputs={variables}

        outputs={[
          {
            id:`${id}-output`
          }
        ]}
      >

        <div
          style={{
            display:'flex',
            flexDirection:'column',
            gap:'8px'
          }}
        >

          <label>
            Text
          </label>

          <textarea
            className="nodrag"

            value={text}

            onChange={(e)=>
              setText(
                e.target.value
              )
            }

            placeholder="Enter text..."

            style={{
              width:'100%',
              minHeight:'50px',

              height:`${Math.max(
                50,
                lineCount*24
              )}px`,

              resize:'none',

              padding:'8px',

              boxSizing:'border-box',

              borderRadius:'6px'
            }}
          />

        </div>

      </BaseNode>

    </div>
  );
};
