import { useTheme } from './ThemeContext';

export const DraggableNode = ({
    type,
    label
}) => {
    const { theme } = useTheme();

    const onDragStart =
    (event,nodeType)=>{

        const appData={
            nodeType
        };

        event.target.style.cursor=
        'grabbing';

        event.dataTransfer.setData(
            'application/reactflow',
            JSON.stringify(appData)
        );

        event.dataTransfer.effectAllowed=
        'move';
    };

    const getNodeColor = (type) => {
        const colors = {
            'customInput': '#10B981',
            'customOutput': '#EF4444',
            'llm': '#8B5CF6',
            'text': '#F59E0B',
            'api': '#3B82F6',
            'email': '#EC4899',
            'filter': '#14B8A6',
            'delay': '#F97316',
            'math': '#6366F1'
        };
        return colors[type] || '#2563EB';
    };

    return (

        <div
            className={type}

            draggable

            onDragStart={(event)=>
                onDragStart(
                    event,
                    type
                )
            }

            onDragEnd={(event)=>
                event.target.style.cursor=
                    'grab'
            }

            style={{

                cursor:'grab',

                minWidth:'100px',

                height:'65px',

                display:'flex',

                alignItems:'center',

                justifyContent:'center',

                flexDirection:'column',

                borderRadius:'12px',

                background: theme.draggableNodeBg,

                border:
                    `2px solid ${getNodeColor(type)}`,

                boxShadow: theme.draggableNodeShadow,

                fontWeight:'600',

                color: theme.textPrimary,

                transition:'all 0.2s ease',

                position:'relative',

                fontSize:'14px',

                userSelect:'none',

                WebkitUserSelect:'none',

                touchAction:'none'
            }}

            onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = theme.draggableNodeHoverShadow;
            }}

            onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = theme.draggableNodeShadow;
            }}
        >

            <div
                style={{
                    width:'8px',
                    height:'8px',
                    borderRadius:'50%',
                    background:getNodeColor(type),
                    marginBottom:'6px',
                    boxShadow: `0 0 8px ${getNodeColor(type)}80`
                }}
            />

            <span>
                {label}
            </span>

        </div>

    );
};
