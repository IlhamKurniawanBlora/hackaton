import React, { useState, useEffect } from 'react';
import { ArrowLeft, Plus, Edit, Trash2, HelpCircle, Clock, Calendar, AlertCircle, Award } from 'lucide-react';
import { adminModuleService } from '~/utils/adminData';
import FormQuiz from '~/components/admin/FormQuiz';
import { useParams } from 'react-router-dom';

const ModuleQuizAdminPage = ({ moduleId }) => {
    const [module, setModule] = useState(null);
    const [quiz, setQuiz] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [error, setError] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    
    // Ambil moduleId dari params jika tidak ada di props
    const params = useParams();
    const effectiveModuleId = moduleId || params.moduleId;

    // Debugging: log state changes
    useEffect(() => {
        console.log('effectiveModuleId:', effectiveModuleId);
        console.log('module:', module);
        console.log('quiz:', quiz);
        console.log('isLoading:', isLoading);
        console.log('showForm:', showForm);
        console.log('error:', error);
        console.log('isSubmitting:', isSubmitting);
    }, [effectiveModuleId, module, quiz, isLoading, showForm, error, isSubmitting]);

    // Fetch module and quiz data
    const fetchModuleData = async () => {
        if (!effectiveModuleId) {
            setError('Module ID tidak ditemukan');
            setIsLoading(false);
            return;
        }

        setIsLoading(true);
        setError(null);

        try {
            console.log('Fetching module data for ID:', effectiveModuleId);
            
            // Fetch module data
            const moduleResult = await adminModuleService.getModuleById(effectiveModuleId);
            if (moduleResult.success) {
                setModule(moduleResult.data);
                console.log('Module data loaded:', moduleResult.data);
            } else {
                setError(moduleResult.error);
                console.error('Error loading module:', moduleResult.error);
                return;
            }

            // Fetch quiz data
            const quizResult = await adminModuleService.getQuizByModuleId(effectiveModuleId);
            if (quizResult.success) {
                setQuiz(quizResult.data);
                console.log('Quiz data loaded:', quizResult.data);
            } else {
                setError(quizResult.error);
                console.error('Error loading quiz:', quizResult.error);
            }
        } catch (err) {
            console.error('Exception while fetching module data:', err);
            setError('Terjadi kesalahan saat mengambil data module');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        console.log('Effect triggered with effectiveModuleId:', effectiveModuleId);
        if (effectiveModuleId) {
            fetchModuleData();
        } else {
            console.warn('No moduleId available');
            setError('Module ID tidak ditemukan');
            setIsLoading(false);
        }
    }, [effectiveModuleId]);

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('id-ID', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const handleBack = () => {
        window.history.back();
    };

    const handleAddQuiz = () => {
        setShowForm(true);
    };

    const handleEditQuiz = () => {
        setShowForm(true);
    };

    const handleDeleteQuiz = async () => {
        if (window.confirm('Apakah Anda yakin ingin menghapus quiz ini?')) {
            setIsSubmitting(true);
            
            try {
                const result = await adminModuleService.deleteQuiz(quiz.id);
                if (result.success) {
                    setQuiz(null);
                } else {
                    setError(result.error);
                }
            } catch (err) {
                setError('Terjadi kesalahan saat menghapus quiz');
            } finally {
                setIsSubmitting(false);
            }
        }
    };

    const handleSaveQuiz = async (formData) => {
        setIsSubmitting(true);
        
        try {
            const quizData = {
                ...formData,
                module_id: effectiveModuleId,
                id: quiz?.id || undefined
            };

            const result = await adminModuleService.createOrUpdateQuiz(quizData);
            if (result.success) {
                setQuiz(result.data);
                setShowForm(false);
            } else {
                setError(result.error);
            }
        } catch (err) {
            setError('Terjadi kesalahan saat menyimpan quiz');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleCancel = () => {
        setShowForm(false);
    };

    // Show loading state
    if (isLoading) {
        return (
            <div className="min-h-screen bg-gray-50 flex justify-center items-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    // Show error state
    if (error) {
        return (
            <div className="min-h-screen bg-gray-50 p-6">
                <div className="max-w-6xl mx-auto">
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                        <div className="flex items-center">
                            <AlertCircle className="text-red-500 mr-3" size={20} />
                            <div>
                                <h3 className="text-red-800 font-medium">Error</h3>
                                <p className="text-red-700 text-sm">{error}</p>
                                <p className="text-red-600 text-xs mt-1">
                                    Module ID: {effectiveModuleId || 'Tidak tersedia'}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // Show message if no module data
    if (!module) {
        return (
            <div className="min-h-screen bg-gray-50 p-6">
                <div className="max-w-6xl mx-auto">
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                        <div className="flex items-center">
                            <AlertCircle className="text-yellow-500 mr-3" size={20} />
                            <div>
                                <h3 className="text-yellow-800 font-medium">Module Tidak Ditemukan</h3>
                                <p className="text-yellow-700 text-sm">
                                    Module dengan ID {effectiveModuleId} tidak ditemukan.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <button
                        onClick={handleBack}
                        className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 mb-4"
                    >
                        <ArrowLeft size={20} />
                        <span>Kembali ke Daftar Module</span>
                    </button>
                    
                    <div className="bg-white rounded-lg shadow-md p-6">
                        <div className="flex items-start justify-between">
                            <div className="flex-1">
                                <h1 className="text-2xl font-bold text-gray-900 mb-2">
                                    Quiz: {module?.title}
                                </h1>
                                <p className="text-gray-600 mb-4">{module?.description}</p>
                                
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                                    <div className="flex items-center text-gray-500">
                                        <HelpCircle size={16} className="mr-2" />
                                        <span>{quiz?.questions?.length || 0} Pertanyaan</span>
                                    </div>
                                    <div className="flex items-center text-gray-500">
                                        <Award size={16} className="mr-2" />
                                        <span>Passing Score: {quiz?.passing_score || 0}%</span>
                                    </div>
                                    <div className="flex items-center text-gray-500">
                                        <Calendar size={16} className="mr-2" />
                                        <span>Dibuat: {formatDate(module?.created_at)}</span>
                                    </div>
                                </div>
                            </div>
                            
                            {module?.image_url && (
                                <div className="ml-6">
                                    <img
                                        src={module.image_url}
                                        alt={module.title}
                                        className="w-32 h-20 object-cover rounded-lg"
                                        onError={(e) => {
                                            e.target.style.display = 'none';
                                        }}
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Action Button */}
                <div className="mb-6">
                    {!quiz ? (
                        <button
                            onClick={handleAddQuiz}
                            disabled={isSubmitting}
                            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
                        >
                            <Plus size={16} />
                            <span>Buat Quiz</span>
                        </button>
                    ) : (
                        <div className="flex space-x-2">
                            <button
                                onClick={handleEditQuiz}
                                disabled={isSubmitting}
                                className="flex items-center space-x-2 px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 disabled:opacity-50 transition-colors"
                            >
                                <Edit size={16} />
                                <span>Edit Quiz</span>
                            </button>
                            <button
                                onClick={handleDeleteQuiz}
                                disabled={isSubmitting}
                                className="flex items-center space-x-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 transition-colors"
                            >
                                <Trash2 size={16} />
                                <span>Hapus Quiz</span>
                            </button>
                        </div>
                    )}
                </div>

                {/* Form */}
                {showForm && (
                    <div className="mb-6">
                        <FormQuiz
                            initialData={quiz}
                            onSave={handleSaveQuiz}
                            onCancel={handleCancel}
                            isLoading={isSubmitting}
                        />
                    </div>
                )}

                {/* Quiz Display */}
                {quiz && !showForm ? (
                    <div className="bg-white rounded-lg shadow-md p-6">
                        <div className="flex items-start justify-between mb-6">
                            <div className="flex-1">
                                <h2 className="text-xl font-bold text-gray-900 mb-2">{quiz.title}</h2>
                                <div className="flex items-center space-x-4 text-sm text-gray-500 mb-4">
                                    <div className="flex items-center">
                                        <Award size={14} className="mr-1" />
                                        <span>Passing Score: {quiz.passing_score}%</span>
                                    </div>
                                    <div className="flex items-center">
                                        <HelpCircle size={14} className="mr-1" />
                                        <span>{quiz.questions?.length || 0} Pertanyaan</span>
                                    </div>
                                    <div className="flex items-center">
                                        <Calendar size={14} className="mr-1" />
                                        <span>Dibuat: {formatDate(quiz.created_at)}</span>
                                    </div>
                                    <div className="flex items-center">
                                        <Clock size={14} className="mr-1" />
                                        <span>Update: {formatDate(quiz.updated_at)}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Questions List */}
                        <div className="space-y-4">
                            {quiz.questions?.map((question, index) => (
                                <div key={index} className="border border-gray-200 rounded-lg p-4">
                                    <div className="flex items-start space-x-3">
                                        <span className="bg-blue-100 text-blue-800 text-sm font-medium px-2 py-1 rounded">
                                            {index + 1}
                                        </span>
                                        <div className="flex-1">
                                            <h4 className="font-medium text-gray-900 mb-3">
                                                {question.question}
                                            </h4>
                                            <div className="space-y-2">
                                                {question.answers?.map((answer, answerIndex) => (
                                                    <div
                                                        key={answerIndex}
                                                        className={`flex items-center space-x-2 p-2 rounded ${
                                                            answerIndex === question.correct
                                                                ? 'bg-green-50 border border-green-200'
                                                                : 'bg-gray-50'
                                                        }`}
                                                    >
                                                        <span className="text-sm font-medium text-gray-500">
                                                            {String.fromCharCode(65 + answerIndex)}.
                                                        </span>
                                                        <span className={`text-sm ${
                                                            answerIndex === question.correct
                                                                ? 'text-green-800 font-medium'
                                                                : 'text-gray-700'
                                                        }`}>
                                                            {answer}
                                                        </span>
                                                        {answerIndex === question.correct && (
                                                            <span className="text-green-600 text-xs">
                                                                (Jawaban Benar)
                                                            </span>
                                                        )}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ) : !showForm && (
                    <div className="text-center py-12 bg-white rounded-lg shadow-md">
                        <HelpCircle size={48} className="mx-auto text-gray-400 mb-4" />
                        <h3 className="text-lg font-medium text-gray-900 mb-2">
                            Belum ada quiz
                        </h3>
                        <p className="text-gray-500">
                            Mulai dengan membuat quiz untuk module ini
                        </p>
                    </div>
                )}

                {/* Statistics */}
                {quiz && (
                    <div className="mt-8 bg-white rounded-lg shadow-md p-6">
                        <h3 className="text-lg font-bold text-gray-900 mb-4">Statistik Quiz</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="text-center">
                                <div className="text-2xl font-bold text-blue-600">
                                    {quiz.questions?.length || 0}
                                </div>
                                <div className="text-sm text-gray-500">Total Pertanyaan</div>
                            </div>
                            <div className="text-center">
                                <div className="text-2xl font-bold text-green-600">
                                    {quiz.passing_score}%
                                </div>
                                <div className="text-sm text-gray-500">Passing Score</div>
                            </div>
                            <div className="text-center">
                                <div className="text-2xl font-bold text-purple-600">
                                    {quiz.questions?.reduce((total, q) => total + q.answers?.length || 0, 0)}
                                </div>
                                <div className="text-sm text-gray-500">Total Pilihan</div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ModuleQuizAdminPage;