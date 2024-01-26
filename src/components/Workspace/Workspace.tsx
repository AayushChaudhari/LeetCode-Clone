import React, { useState } from 'react';
import Split from 'react-split';
import ProblemDescription from './ProblemDescription/ProblemDescription';
import Playground from './Playgroung/Playground';
import { Problem } from '../../../utils/types/problem';

type WorkspaceProps = {
    problem: Problem;
};

const Workspace:React.FC<WorkspaceProps> = ({problem}) => {
    const [solved,setSolved] = useState(false);

    return <Split className='split' minSize={0}>
        <ProblemDescription problem={problem} _solved={solved}/>
        <div className='bg-dark-fill-2'>
            <Playground problem={problem} setSolved={setSolved}/>
        </div>
    </Split>
}
export default Workspace;