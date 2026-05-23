import { BaseNode } from './BaseNode';
import { useTheme } from '../ThemeContext';

export const LLMNode = ({ id }) => {
  const { theme } = useTheme();

  return (
    <BaseNode
      title="LLM Node"
      inputs={[
        { id: `${id}-prompt` }
      ]}
      outputs={[
        { id: `${id}-response` }
      ]}
    >

      <div
        style={{
          padding:'12px',
          background: theme.llmBg,
          borderRadius:'8px',
          border: `1.5px solid ${theme.llmBorder}`,
          fontSize:'13px',
          color: theme.llmText,
          fontWeight:'500',
          textAlign:'center'
        }}
      >
         AI Processing
      </div>

    </BaseNode>
  );
};
