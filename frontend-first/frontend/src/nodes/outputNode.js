import { BaseNode } from './BaseNode';
import { useTheme } from '../ThemeContext';

export const OutputNode = ({ id }) => {
  const { theme } = useTheme();

  return (
    <BaseNode
      title="Output Node"
      inputs={[
        { id: `${id}-input` }
      ]}
    >

      <div
        style={{
          padding:'12px',
          background: theme.outputBg,
          borderRadius:'8px',
          border: `1.5px dashed ${theme.outputBorder}`,
          textAlign:'center',
          fontSize:'13px',
          color: theme.outputText,
          fontWeight:'500'
        }}
      >
        Final Output
      </div>

    </BaseNode>
  );
};
