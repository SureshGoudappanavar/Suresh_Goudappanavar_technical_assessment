import { Handle, Position } from 'reactflow';
import { useTheme } from '../ThemeContext';

export const BaseNode = ({
  title,
  children,
  inputs=[],
  outputs=[]
}) => {
  const { theme } = useTheme();

  return (

    <div
      style={{
        width:'100%',
        height:'100%',
        background: theme.nodeBg,
        border: `2px solid ${theme.nodeBorder}`,
        borderRadius:'16px',
        padding:'16px',
        boxSizing:'border-box',

        boxShadow: theme.nodeShadow,

        position:'relative',

        fontFamily:
          'Inter, -apple-system, BlinkMacSystemFont, sans-serif',

        transition:'all 0.2s ease'
      }}

      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = theme.nodeHoverShadow;
        e.currentTarget.style.borderColor = theme.cardHoverBorder;
      }}

      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = theme.nodeShadow;
        e.currentTarget.style.borderColor = theme.nodeBorder;
      }}
    >

      {inputs.map((input,index)=>(

        <Handle
          key={input.id}
          type="target"
          position={Position.Left}
          id={input.id}

          style={{
            top:70 + index*35,

            width:'12px',
            height:'12px',

            background:'#3B82F6',
            border:'3px solid white',
            boxShadow:'0px 2px 8px rgba(59,130,246,0.4)'
          }}
        />

      ))}

      <h3
        style={{
          margin:'0 0 14px 0',
          fontSize:'18px',
          fontWeight:'700',
          color: theme.textPrimary,
          letterSpacing:'-0.02em'
        }}
      >
        {title}
      </h3>

      {children}

      {outputs.map((output,index)=>(

        <Handle
          key={output.id}
          type="source"
          position={Position.Right}
          id={output.id}

          style={{
            top:70 + index*35,

            width:'12px',
            height:'12px',

            background:'#3B82F6',
            border:'3px solid white',
            boxShadow:'0px 2px 8px rgba(59,130,246,0.4)'
          }}
        />

      ))}

    </div>

  );
};
