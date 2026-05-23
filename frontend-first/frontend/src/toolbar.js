import { DraggableNode } from './draggableNode';
import { useTheme } from './ThemeContext';

export const PipelineToolbar = () => {
    const { theme, currentTheme, toggleTheme } = useTheme();

    return (

        <div
            style={{

                padding:'16px 20px',

                background: theme.toolbarBg,

                borderBottom:
                    `2px solid ${theme.toolbarBorder}`,

                boxShadow: currentTheme === 'dark' 
                    ? '0px 2px 8px rgba(0,0,0,0.3)' 
                    : '0px 2px 8px rgba(15,23,42,0.04)',

                maxHeight:'180px',
                overflowY:'auto',
                transition: 'all 0.3s ease'
            }}
        >

            <div
                style={{
                    display:'flex',
                    justifyContent:'space-between',
                    alignItems:'center',
                    marginBottom:'12px',
                    flexWrap:'wrap',
                    gap:'8px'
                }}
            >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <h2
                        style={{
                            margin:'0',
                            fontSize:'18px',
                            fontWeight:'700',
                            color: theme.textPrimary,
                            letterSpacing:'-0.02em'
                        }}
                    >
                        Pipeline Builder
                    </h2>

                    <button
                        onClick={toggleTheme}
                        style={{
                            padding: '8px 12px',
                            border: `1.5px solid ${theme.cardBorder}`,
                            borderRadius: '8px',
                            background: theme.inputBg,
                            color: theme.textPrimary,
                            cursor: 'pointer',
                            fontSize: '14px',
                            fontWeight: '600',
                            transition: 'all 0.2s ease',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '6px'
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.borderColor = theme.inputFocusBorder;
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.borderColor = theme.cardBorder;
                        }}
                    >
                        {currentTheme === 'dark' ? '☀️' : '🌙'}
                        {currentTheme === 'dark' ? 'Light' : 'Dark'}
                    </button>
                </div>

                <div
                    style={{
                        fontSize:'13px',
                        color: theme.textSecondary,
                        fontWeight:'500'
                    }}
                >
                    Drag nodes to canvas
                </div>
            </div>

            <div
                style={{

                    display:'flex',

                    flexWrap:'wrap',

                    gap:'10px'
                }}
            >

                <DraggableNode
                    type='customInput'
                    label='Input'
                />

                <DraggableNode
                    type='llm'
                    label='LLM'
                />

                <DraggableNode
                    type='customOutput'
                    label='Output'
                />

                <DraggableNode
                    type='text'
                    label='Text'
                />

                <DraggableNode
                    type='api'
                    label='API'
                />

                <DraggableNode
                    type='email'
                    label='Email'
                />

                <DraggableNode
                    type='filter'
                    label='Filter'
                />

                <DraggableNode
                    type='delay'
                    label='Delay'
                />

                <DraggableNode
                    type='math'
                    label='Math'
                />

            </div>

        </div>

    );
};
