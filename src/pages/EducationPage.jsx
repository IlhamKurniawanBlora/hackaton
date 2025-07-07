import React from 'react';
import { useParams } from 'react-router-dom';
import { getModuleWithQuiz } from '~/utils/educations';

const EducationPage = () => {
    const { moduleId } = useParams();
    const [module, setModule] = React.useState(null);
    const [moduleDetails, setModuleDetails] = React.useState([]);
    const [quiz, setQuiz] = React.useState(null);

    React.useEffect(() => {
        if (moduleId) {
            fetchModuleData();
        }
    }, [moduleId]);

    const fetchModuleData = async () => {
        const data = await getModuleWithQuiz(moduleId);
        setModule(data.module);
        setModuleDetails(data.moduleDetails);
        setQuiz(data.quiz);
    };

    return (
        <div>
            <h1>{module?.title}</h1>
            <p>{module?.description}</p>
            <ul>
                {moduleDetails.map((detail) => (
                    <li key={detail.id}>{detail.title}</li>
                ))}
            </ul>
            {quiz && (
                <div>
                    <h2>{quiz.title}</h2>
                    <p>Passing score: {quiz.passing_score}%</p>
                </div>
            )}
        </div>
    );
};

export default EducationPage;
