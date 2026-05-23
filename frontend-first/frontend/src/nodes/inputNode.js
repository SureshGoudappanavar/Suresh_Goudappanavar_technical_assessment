import { useState } from 'react';
import { BaseNode } from './BaseNode';
import { useTheme } from '../ThemeContext';

export const InputNode = ({ id, data }) => {
  const { theme } = useTheme();

  const [inputName, setInputName] = useState(
    data?.inputName || id.replace('customInput-', 'input_')
  );

  const [inputType, setInputType] = useState(
    data?.inputType || 'Text'
  );

  return (

    <BaseNode
      title="Input Node"

      outputs={[
        {
          id:`${id}-value`
        }
      ]}
    >

      <div
        style={{
          display:'flex',
          flexDirection:'column',
          gap:'12px'
        }}
      >

        <label
          style={{
            fontSize:'13px',
            fontWeight:'600',
            color: theme.textSecondary
          }}
        >

          Name:

          <input
            className="nodrag"

            type="text"

            value={inputName}

            onChange={(e)=>
              setInputName(
                e.target.value
              )
            }

            style={{
              width:'100%',
              padding:'10px 12px',
              marginTop:'6px',
              borderRadius:'8px',
              border: `1.5px solid ${theme.inputBorder}`,
              fontSize:'14px',
              outline:'none',
              transition:'border-color 0.2s ease',
              fontFamily:'inherit',
              background: theme.inputBg,
              color: theme.inputText
            }}

            onFocus={(e) => e.target.style.borderColor = theme.inputFocusBorder}
            onBlur={(e) => e.target.style.borderColor = theme.inputBorder}
          />

        </label>

        <label
          style={{
            fontSize:'13px',
            fontWeight:'600',
            color: theme.textSecondary
          }}
        >

          Type:

          <select
            className="nodrag"

            value={inputType}

            onChange={(e)=>
              setInputType(
                e.target.value
              )
            }

            style={{
              width:'100%',
              padding:'10px 12px',
              marginTop:'6px',
              borderRadius:'8px',
              border: `1.5px solid ${theme.inputBorder}`,
              fontSize:'14px',
              outline:'none',
              cursor:'pointer',
              background: theme.inputBg,
              transition:'border-color 0.2s ease',
              fontFamily:'inherit',
              color: theme.inputText
            }}

            onFocus={(e) => e.target.style.borderColor = theme.inputFocusBorder}
            onBlur={(e) => e.target.style.borderColor = theme.inputBorder}
          >

            <option>Text</option>
            <option>File</option>

          </select>

        </label>

      </div>

    </BaseNode>

  );
};
