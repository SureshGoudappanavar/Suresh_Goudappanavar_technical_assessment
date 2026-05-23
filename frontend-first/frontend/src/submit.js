import { useStore } from './store';
import { useTheme } from './ThemeContext';

export const SubmitButton = () => {
    const { theme, currentTheme } = useTheme();

    const nodes = useStore(
        (state) => state.nodes
    );

    const edges = useStore(
        (state) => state.edges
    );

    const handleSubmit = async () => {

        try {

            const response = await fetch(
                'http://127.0.0.1:8000/pipelines/parse',
                {
                    method: 'POST',

                    headers: {
                        'Content-Type':
                            'application/json'
                    },

                    body: JSON.stringify({
                        nodes,
                        edges
                    })
                }
            );

            const data =
                await response.json();

            alert(
`Pipeline Analysis Results

✓ Nodes: ${data.num_nodes}
✓ Edges: ${data.num_edges}
✓ Valid DAG: ${data.is_dag ? 'Yes' : 'No'}`
            );

        }
        catch (error) {

            console.error(error);

            alert(
                '❌ Backend connection failed. Please ensure the backend server is running.'
            );
        }
    };

    return (

       <div
    style={{

        display:'flex',

        alignItems:'center',

        justifyContent:'space-between',

        padding:'16px 20px',

        background: theme.toolbarBg,

        borderTop:
        `2px solid ${theme.toolbarBorder}`,

        boxShadow: currentTheme === 'dark' 
            ? '0px -2px 8px rgba(0,0,0,0.3)' 
            : '0px -2px 8px rgba(15,23,42,0.04)',

        flexWrap:'wrap',
        gap:'12px',
        transition: 'all 0.3s ease'
    }}
>

            <div
                style={{
                    display:'flex',
                    gap:'16px',
                    fontSize:'14px',
                    color: theme.textSecondary,
                    fontWeight:'500'
                }}
            >
                <span>Nodes: <strong style={{color: theme.textPrimary}}>{nodes.length}</strong></span>
                <span>Edges: <strong style={{color: theme.textPrimary}}>{edges.length}</strong></span>
            </div>

            <button
                type="button"
                onClick={handleSubmit}

                style={{

                    padding:'14px 32px',

                    border:'none',

                    borderRadius:'12px',

                    background: theme.buttonGradient,

                    color:'white',

                    fontSize:'15px',

                    fontWeight:'700',

                    cursor:'pointer',

                    boxShadow: theme.buttonShadow,

                    transition:'all 0.2s ease',

                    letterSpacing:'0.02em'
                }}

                onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = theme.buttonHoverShadow;
                }}

                onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = theme.buttonShadow;
                }}
            >
                Submit Pipeline
            </button>

        </div>
    );
};
