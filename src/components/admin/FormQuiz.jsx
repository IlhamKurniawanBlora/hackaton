import React, { useState, useEffect } from 'react';
import { Plus, X, Trash2, Check, AlertCircle } from 'lucide-react';

const FormQuiz = ({ initialData, onSave, onCancel, isLoading }) => {
    const [formData, setFormData] = useState({
        title: '',
        passing_score: 70,
        questions: [
            {
                question: '',
                answers: ['', '', '', ''],
                correct: 0
            }
        ]
    });

    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (initialData) {
            setFormData({
                title: initialData.title || '',
                passing_score: initialData.passing_score || 70,
                questions: initialData.questions || [
                    {
                        question: '',
                        answers: ['', '', '', ''],
                        correct: 0
                    }
                ]
            });
        }
    }, [initialData]);

    const validateForm = () => {
        const newErrors = {};

        // Validate title
        if (!formData.title.trim()) {
            newErrors.title = 'Judul quiz wajib diisi';
        }

        // Validate passing score
        if (formData.passing_score < 1 || formData.passing_score > 100) {
            newErrors.passing_score = 'Passing score harus antara 1-100';
        }

        // Validate questions
        if (formData.questions.length === 0) {
            newErrors.questions = 'Minimal harus ada 1 pertanyaan';
        }

        formData.questions.forEach((question, qIndex) => {
            if (!question.question.trim()) {
                newErrors[`question_${qIndex}`] = 'Pertanyaan wajib diisi';
            }

            // Check if all answers are filled
            const emptyAnswers = question.answers.filter(answer => !answer.trim());
            if (emptyAnswers.length > 0) {
                newErrors[`answers_${qIndex}`] = 'Semua pilihan jawaban wajib diisi';
            }

            // Check if correct answer is valid
            if (question.correct < 0 || question.correct >= question.answers.length) {
                newErrors[`correct_${qIndex}`] = 'Pilih jawaban yang benar';
            }
        });

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            onSave(formData);
        }
    };

    const handleQuestionChange = (index, value) => {
        const newQuestions = [...formData.questions];
        newQuestions[index].question = value;
        setFormData({ ...formData, questions: newQuestions });
        
        // Clear error for this question
        if (errors[`question_${index}`]) {
            const newErrors = { ...errors };
            delete newErrors[`question_${index}`];
            setErrors(newErrors);
        }
    };

    const handleAnswerChange = (questionIndex, answerIndex, value) => {
        const newQuestions = [...formData.questions];
        newQuestions[questionIndex].answers[answerIndex] = value;
        setFormData({ ...formData, questions: newQuestions });
        
        // Clear error for this answer group
        if (errors[`answers_${questionIndex}`]) {
            const newErrors = { ...errors };
            delete newErrors[`answers_${questionIndex}`];
            setErrors(newErrors);
        }
    };

    const handleCorrectAnswerChange = (questionIndex, answerIndex) => {
        const newQuestions = [...formData.questions];
        newQuestions[questionIndex].correct = answerIndex;
        setFormData({ ...formData, questions: newQuestions });
        
        // Clear error for this correct answer
        if (errors[`correct_${questionIndex}`]) {
            const newErrors = { ...errors };
            delete newErrors[`correct_${questionIndex}`];
            setErrors(newErrors);
        }
    };

    const addQuestion = () => {
        setFormData({
            ...formData,
            questions: [
                ...formData.questions,
                {
                    question: '',
                    answers: ['', '', '', ''],
                    correct: 0
                }
            ]
        });
    };

    const removeQuestion = (index) => {
        if (formData.questions.length > 1) {
            const newQuestions = formData.questions.filter((_, i) => i !== index);
            setFormData({ ...formData, questions: newQuestions });
            
            // Clear related errors
            const newErrors = { ...errors };
            delete newErrors[`question_${index}`];
            delete newErrors[`answers_${index}`];
            delete newErrors[`correct_${index}`];
            setErrors(newErrors);
        }
    };

    const addAnswer = (questionIndex) => {
        const newQuestions = [...formData.questions];
        newQuestions[questionIndex].answers.push('');
        setFormData({ ...formData, questions: newQuestions });
    };

    const removeAnswer = (questionIndex, answerIndex) => {
        const newQuestions = [...formData.questions];
        if (newQuestions[questionIndex].answers.length > 2) {
            newQuestions[questionIndex].answers.splice(answerIndex, 1);
            
            // Adjust correct answer index if needed
            if (newQuestions[questionIndex].correct >= answerIndex) {
                newQuestions[questionIndex].correct = Math.max(0, newQuestions[questionIndex].correct - 1);
            }
            
            setFormData({ ...formData, questions: newQuestions });
        }
    };

    return (
        <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">
                    {initialData ? 'Edit Quiz' : 'Buat Quiz Baru'}
                </h2>
                <button
                    onClick={onCancel}
                    className="p-2 text-gray-400 hover:text-gray-600"
                    disabled={isLoading}
                >
                    <X size={20} />
                </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Quiz Title */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Judul Quiz *
                    </label>
                    <input
                        type="text"
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 ${
                            errors.title ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="Masukkan judul quiz"
                        disabled={isLoading}
                    />
                    {errors.title && (
                        <p className="mt-1 text-sm text-red-600 flex items-center">
                            <AlertCircle size={14} className="mr-1" />
                            {errors.title}
                        </p>
                    )}
                </div>

                {/* Passing Score */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Passing Score (%) *
                    </label>
                    <input
                        type="number"
                        min="1"
                        max="100"
                        value={formData.passing_score}
                        onChange={(e) => setFormData({ ...formData, passing_score: parseInt(e.target.value) || 70 })}
                        className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 ${
                            errors.passing_score ? 'border-red-500' : 'border-gray-300'
                        }`}
                        disabled={isLoading}
                    />
                    {errors.passing_score && (
                        <p className="mt-1 text-sm text-red-600 flex items-center">
                            <AlertCircle size={14} className="mr-1" />
                            {errors.passing_score}
                        </p>
                    )}
                </div>

                {/* Questions */}
                <div>
                    <div className="flex items-center justify-between mb-4">
                        <label className="block text-sm font-medium text-gray-700">
                            Pertanyaan *
                        </label>
                        <button
                            type="button"
                            onClick={addQuestion}
                            className="flex items-center space-x-1 px-3 py-1 bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm"
                            disabled={isLoading}
                        >
                            <Plus size={14} />
                            <span>Tambah Pertanyaan</span>
                        </button>
                    </div>

                    {errors.questions && (
                        <p className="mb-4 text-sm text-red-600 flex items-center">
                            <AlertCircle size={14} className="mr-1" />
                            {errors.questions}
                        </p>
                    )}

                    <div className="space-y-6">
                        {formData.questions.map((question, qIndex) => (
                            <div key={qIndex} className="border border-gray-200 rounded-lg p-4">
                                <div className="flex items-start justify-between mb-3">
                                    <span className="bg-green-100 text-green-800 text-sm font-medium px-2 py-1 rounded">
                                        Pertanyaan {qIndex + 1}
                                    </span>
                                    {formData.questions.length > 1 && (
                                        <button
                                            type="button"
                                            onClick={() => removeQuestion(qIndex)}
                                            className="p-1 text-red-600 hover:bg-red-50 rounded"
                                            disabled={isLoading}
                                        >
                                            <Trash2 size={14} />
                                        </button>
                                    )}
                                </div>

                                {/* Question Text */}
                                <div className="mb-4">
                                    <textarea
                                        value={question.question}
                                        onChange={(e) => handleQuestionChange(qIndex, e.target.value)}
                                        className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 ${
                                            errors[`question_${qIndex}`] ? 'border-red-500' : 'border-gray-300'
                                        }`}
                                        placeholder="Masukkan pertanyaan"
                                        rows="3"
                                        disabled={isLoading}
                                    />
                                    {errors[`question_${qIndex}`] && (
                                        <p className="mt-1 text-sm text-red-600 flex items-center">
                                            <AlertCircle size={14} className="mr-1" />
                                            {errors[`question_${qIndex}`]}
                                        </p>
                                    )}
                                </div>

                                {/* Answers */}
                                <div>
                                    <div className="flex items-center justify-between mb-2">
                                        <label className="text-sm font-medium text-gray-700">
                                            Pilihan Jawaban
                                        </label>
                                        {question.answers.length < 6 && (
                                            <button
                                                type="button"
                                                onClick={() => addAnswer(qIndex)}
                                                className="flex items-center space-x-1 px-2 py-1 bg-green-600 text-white rounded text-xs hover:bg-green-700"
                                                disabled={isLoading}
                                            >
                                                <Plus size={12} />
                                                <span>Tambah Pilihan</span>
                                            </button>
                                        )}
                                    </div>

                                    {errors[`answers_${qIndex}`] && (
                                        <p className="mb-2 text-sm text-red-600 flex items-center">
                                            <AlertCircle size={14} className="mr-1" />
                                            {errors[`answers_${qIndex}`]}
                                        </p>
                                    )}

                                    <div className="space-y-2">
                                        {question.answers.map((answer, aIndex) => (
                                            <div key={aIndex} className="flex items-center space-x-3">
                                                <input
                                                    type="text"
                                                    value={answer}
                                                    onChange={(e) => handleAnswerChange(qIndex, aIndex, e.target.value)}
                                                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 ${
                                                        errors[`answers_${qIndex}`] ? 'border-red-500' : 'border-gray-300'
                                                    }`}
                                                    placeholder={`Jawaban ${aIndex + 1}`}
                                                    disabled={isLoading}
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => removeAnswer(qIndex, aIndex)}
                                                    className="p-1 text-red-600 hover:bg-red-50 rounded"
                                                    disabled={isLoading}
                                                >
                                                    <Trash2 size={14} />
                                                </button>
                                                {question.answers.length > 2 && (
                                                    <button
                                                        type="button"
                                                        onClick={() => handleCorrectAnswerChange(qIndex, aIndex)}
                                                        className={`p-1 text-green-600 hover:bg-green-50 rounded ${
                                                            question.correct === aIndex ? 'bg-green-100' : ''
                                                        }`}
                                                        disabled={isLoading}
                                                    >
                                                        <Check size={14} />
                                                    </button>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Correct Answer */}
                                {question.answers.length > 1 && (
                                    <div className="mt-4">
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Jawaban Benar
                                        </label>
                                        <select
                                            value={question.correct}
                                            onChange={(e) => handleCorrectAnswerChange(qIndex, parseInt(e.target.value))}
                                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                                            disabled={isLoading}
                                        >
                                            {question.answers.map((_, index) => (
                                                <option key={index} value={index}>
                                                    Pilihan {index + 1}
                                                </option>
                                            ))}
                                        </select>
                                        {errors[`correct_${qIndex}`] && (
                                            <p className="mt-1 text-sm text-red-600 flex items-center">
                                                <AlertCircle size={14} className="mr-1" />
                                                {errors[`correct_${qIndex}`]}
                                            </p>
                                        )}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-end space-x-4">
                    <button
                        type="button"
                        onClick={onCancel}
                        className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100"
                        disabled={isLoading}
                    >
                        Batal
                    </button>
                    <button
                        type="submit"
                        className={`px-4 py-2 rounded-lg text-white ${
                            isLoading ? 'bg-green-300 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700'
                        }`}
                        disabled={isLoading}
                    >
                        {isLoading ? 'Menyimpan...' : 'Simpan'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default FormQuiz;