import { useState, useRef, useCallback } from 'react';
import ReactFlow, { Controls, Background, MiniMap } from 'reactflow';
import { useStore } from './store';
import { shallow } from 'zustand/shallow';
import { InputNode } from './nodes/inputNode';
import { LLMNode } from './nodes/llmNode';
import { OutputNode } from './nodes/outputNode';
import { TextNode } from './nodes/textNode';

import { EmailNode } from './nodes/EmailNode';
import { FilterNode } from './nodes/FilterNode';
import { DelayNode } from './nodes/DelayNode';
import { MathNode } from './nodes/MathNode';

import 'reactflow/dist/style.css';
import { ApiNode } from './nodes/ApiNodes';
import { useTheme } from './ThemeContext';

const gridSize = 20;
const proOptions = { hideAttribution: true };
const nodeTypes = {
  customInput: InputNode,
  llm: LLMNode,
  customOutput: OutputNode,
  text: TextNode,
  api:ApiNode,
  email: EmailNode,
  filter: FilterNode,
  delay: DelayNode,
  math: MathNode,
};

const selector = (state) => ({
  nodes: state.nodes,
  edges: state.edges,
  getNodeID: state.getNodeID,
  addNode: state.addNode,
  onNodesChange: state.onNodesChange,
  onEdgesChange: state.onEdgesChange,
  onConnect: state.onConnect,
});

export const PipelineUI = () => {
    const { theme, currentTheme } = useTheme();
    const reactFlowWrapper = useRef(null);
    const [reactFlowInstance, setReactFlowInstance] = useState(null);
    const {
      nodes,
      edges,
      getNodeID,
      addNode,
      onNodesChange,
      onEdgesChange,
      onConnect
    } = useStore(selector, shallow);

    const onDrop = useCallback(
        (event) => {
          event.preventDefault();

          if (!reactFlowInstance || !reactFlowWrapper.current) {
            return;
          }
    
          const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
          if (event?.dataTransfer?.getData('application/reactflow')) {
            const appData = JSON.parse(event.dataTransfer.getData('application/reactflow'));
            const type = appData?.nodeType;
      
            // check if the dropped element is valid
            if (typeof type === 'undefined' || !type) {
              return;
            }
      
            const position = reactFlowInstance.project({
              x: event.clientX - reactFlowBounds.left,
              y: event.clientY - reactFlowBounds.top,
            });

            const nodeID = getNodeID(type);
            const newNode = {
              id: nodeID,
              type,
              position,
              data: {
                id: nodeID,
                nodeType: `${type}`
              },
            };
      
            addNode(newNode);
          }
        },
        [addNode, getNodeID, reactFlowInstance]
    );

    const onDragOver = useCallback((event) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = 'move';
    }, []);

    return (
        <>
        <div
            ref={reactFlowWrapper}
            style={{
                flex: 1,
                minHeight: 0,
                width: '100%',
                background: theme.canvasBg,
                transition: 'background 0.3s ease'
            }}
        >
            <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                onDrop={onDrop}
                onDragOver={onDragOver}
                onInit={setReactFlowInstance}
                nodeTypes={nodeTypes}
                proOptions={proOptions}
                snapGrid={[gridSize, gridSize]}
                connectionLineType='smoothstep'
            >
                <Background color={theme.gridColor} gap={18} />
                <Controls
                    style={{
                        background: theme.controlsBg,
                        border: `1px solid ${theme.controlsBorder}`,
                        borderRadius:'12px',
                        boxShadow: currentTheme === 'dark' 
                            ? '0px 4px 12px rgba(0,0,0,0.4)' 
                            : '0px 4px 12px rgba(15,23,42,0.1)'
                    }}
                />
                <MiniMap
                    nodeColor={(node) => {
                        switch (node.type) {
                            case 'customInput': return '#10B981';
                            case 'customOutput': return '#EF4444';
                            case 'llm': return '#8B5CF6';
                            case 'text': return '#F59E0B';
                            case 'api': return '#3B82F6';
                            case 'email': return '#EC4899';
                            case 'filter': return '#14B8A6';
                            case 'delay': return '#F97316';
                            case 'math': return '#6366F1';
                            default: return '#2563EB';
                        }
                    }}
                    maskColor={theme.minimapMask}
                    style={{
                        background: theme.minimapBg,
                        border: `2px solid ${theme.minimapBorder}`,
                        borderRadius:'12px',
                        boxShadow: currentTheme === 'dark' 
                            ? '0px 4px 16px rgba(0,0,0,0.5)' 
                            : '0px 4px 16px rgba(15,23,42,0.15)',
                        overflow:'hidden'
                    }}
                    nodeStrokeWidth={3}
                    nodeBorderRadius={8}
                />
            </ReactFlow>
        </div>
        </>
    )
}
